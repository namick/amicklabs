import { createHash, createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const LIMITS = { name: 100, email: 254, subject: 160, message: 5000 } as const;
export type Field = keyof typeof LIMITS;
export type FieldErrors = Partial<Record<Field, string>>;
type Config = { apiKey: string; from: string; to: string };
const MAX_BODY = 24_000;
const TOKEN_TTL = 60 * 60 * 1000;
const emailPattern = /^[^\s<>@,;"\\]+@[^\s<>@,;"\\]+\.[^\s<>@,;"\\]+$/;
const singleLine = /[\x00-\x1f\x7f]/;

function config(env: NodeJS.ProcessEnv): Config | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.SUPPORT_FROM_EMAIL?.trim();
  const to = env.SUPPORT_TO_EMAIL?.trim();
  if (!apiKey || !from || !to || !emailPattern.test(from) || !emailPattern.test(to)) return null;
  return { apiKey, from, to };
}

export function createFormToken(secret: string, now = Date.now()) {
  const payload = `${now}.${randomUUID()}`;
  return `${payload}.${createHmac("sha256", secret).update(payload).digest("hex")}`;
}

function validToken(token: unknown, secret: string, now: number): token is string {
  if (typeof token !== "string" || token.length > 160) return false;
  const [time, nonce, signature, extra] = token.split(".");
  if (extra || !/^\d{13}$/.test(time ?? "") || !/^[a-f0-9-]{36}$/.test(nonce ?? "") || !/^[a-f0-9]{64}$/.test(signature ?? "")) return false;
  const expected = createHmac("sha256", secret).update(`${time}.${nonce}`).digest();
  const age = now - Number(time);
  return timingSafeEqual(expected, Buffer.from(signature, "hex")) && age >= 3000 && age <= TOKEN_TTL;
}

export function validateFields(input: Record<string, unknown>) {
  const errors: FieldErrors = {};
  const values = {} as Record<Field, string>;
  for (const field of Object.keys(LIMITS) as Field[]) {
    const value = typeof input[field] === "string" ? input[field].trim() : "";
    values[field] = value;
    if (!value) errors[field] = `Please enter your ${field === "subject" ? "subject" : field}.`;
    else if (value.length > LIMITS[field]) errors[field] = `Use ${LIMITS[field]} characters or fewer.`;
    else if (field !== "message" && singleLine.test(value)) errors[field] = "Please use a single line of text.";
    else if (field === "message" && /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value)) errors[field] = "Please remove control characters from your message.";
    else if (field === "email" && !emailPattern.test(value)) errors[field] = "Please enter a valid email address.";
  }
  return { values, errors };
}

function reply(status: number, body: object) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export function issueToken(env: NodeJS.ProcessEnv = process.env) {
  const settings = config(env);
  if (!settings) return reply(503, { error: "The contact form is not configured yet. Please try again later." });
  return reply(200, { token: createFormToken(settings.apiKey) });
}

export async function handleSupport(request: Request, options: {
  env?: NodeJS.ProcessEnv;
  fetcher?: typeof fetch;
  now?: number;
} = {}) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin || request.headers.get("sec-fetch-site") === "cross-site") {
    return reply(403, { error: "Please send your message from the support page." });
  }
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") {
    return reply(415, { error: "Please send the form as JSON." });
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY) return reply(413, { error: "Your message is too large." });
  let input: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400, { error: "Please complete the form." });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) {
        await reader.cancel();
        return reply(413, { error: "Your message is too large." });
      }
      chunks.push(value);
    }
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return reply(400, { error: "Please complete the form." });
    input = parsed as Record<string, unknown>;
  } catch {
    return reply(400, { error: "The form could not be read. Please try again." });
  }
  if (typeof input.website !== "string" || input.website !== "") {
    return reply(400, { error: "The form could not be submitted." });
  }
  const { values, errors } = validateFields(input);
  if (Object.keys(errors).length) return reply(422, { error: "Please check the highlighted fields.", fields: errors });
  const settings = config(options.env ?? process.env);
  if (!settings) {
    console.error("Support email configuration is missing or invalid.");
    return reply(503, { error: "The contact form is not configured yet. Please try again later." });
  }
  if (!validToken(input.token, settings.apiKey, options.now ?? Date.now())) {
    return reply(400, { error: "Please wait a moment and try again. Your form may need a fresh session.", refreshToken: true });
  }
  try {
    const response = await (options.fetcher ?? fetch)("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${settings.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `support/${createHash("sha256").update(input.token).digest("hex")}`,
      },
      body: JSON.stringify({
        from: settings.from,
        to: [settings.to],
        reply_to: values.email,
        subject: `[Amick Labs support] ${values.subject}`,
        text: `From: ${values.name}\nEmail: ${values.email}\nSubject: ${values.subject}\n\n${values.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("Support email provider rejected request", { status: response.status });
      return reply(502, { error: "Your message could not be sent. Please try again later." });
    }
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string" || !result.id) throw new Error("Missing email receipt");
    return reply(200, { success: true });
  } catch {
    console.error("Support email request failed.");
    return reply(502, { error: "We could not confirm your message was sent. Please retry with the same form." });
  }
}
