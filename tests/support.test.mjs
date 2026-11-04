import assert from "node:assert/strict";
import { test } from "node:test";
import { createFormToken, handleSupport, issueToken, validateFields } from "../src/lib/support.ts";

const now = 1_800_000_000_000;
const env = { RESEND_API_KEY: "test-only-secret", SUPPORT_FROM_EMAIL: "support@example.com", SUPPORT_TO_EMAIL: "owner@example.com" };
const fields = { name: "  Test Person  ", email: " person@example.com ", subject: " A question ", message: "  First line\nSecond line  ", website: "" };
const token = createFormToken(env.RESEND_API_KEY, now - 5000);
const body = { ...fields, token };
function request(data = body, headers = {}) {
  return new Request("https://amicklabs.com/api/support", {
    method: "POST",
    headers: { origin: "https://amicklabs.com", "content-type": "application/json", ...headers },
    body: typeof data === "string" ? data : JSON.stringify(data),
  });
}
const failFetch = async () => { assert.fail("Invalid request must not send email"); };
async function rejected(req, status, settings = env) {
  const response = await handleSupport(req, { env: settings, now, fetcher: failFetch });
  assert.equal(response.status, status);
  return response.json();
}

test("trims fields, preserves message newlines and bounds all four fields", () => {
  const result = validateFields(fields);
  assert.deepEqual(result.errors, {});
  assert.equal(result.values.name, "Test Person");
  assert.equal(result.values.message, "First line\nSecond line");
  for (const [name, max] of Object.entries({ name: 100, email: 254, subject: 160, message: 5000 })) {
    assert.ok(validateFields({ ...fields, [name]: "a".repeat(max + 1) }).errors[name]);
    assert.ok(validateFields({ ...fields, [name]: null }).errors[name]);
    assert.ok(validateFields({ ...fields, [name]: "   " }).errors[name]);
  }
  for (const email of ["invalid", "a@example.com\r\nBcc:other@example.com", "a@example.com,other@example.com", "Name <a@example.com>"]) {
    assert.ok(validateFields({ ...fields, email }).errors.email);
  }
  assert.ok(validateFields({ ...fields, subject: "Hello\nBcc: test" }).errors.subject);
  assert.ok(validateFields({ ...fields, message: "Hello\u0000" }).errors.message);
});

test("rejects cross-site and absent origins and non-JSON requests", async () => {
  await rejected(request(body, { origin: "https://elsewhere.example" }), 403);
  await rejected(request(body, { origin: "" }), 403);
  await rejected(request(body, { "sec-fetch-site": "cross-site" }), 403);
  await rejected(request(body, { "content-type": "text/plain" }), 415);
});

test("rejects malformed, non-object, oversized and honeypot requests", async () => {
  for (const data of ["{", "null", "[]"]) await rejected(request(data), 400);
  await rejected(request("x".repeat(24_001)), 413);
  await rejected(request(body, { "content-length": "24001" }), 413);
  await rejected(request({ ...body, website: "spam.example" }), 400);
  await rejected(request({ ...body, website: null }), 400);
});

test("returns field errors before attempting email", async () => {
  const result = await rejected(request({ ...body, name: "", email: "wrong" }), 422);
  assert.ok(result.fields.name);
  assert.ok(result.fields.email);
});

test("missing and invalid server configuration fail explicitly; token responses are not cached", async () => {
  for (const settings of [{}, { ...env, SUPPORT_FROM_EMAIL: "" }, { ...env, SUPPORT_TO_EMAIL: "invalid" }, { ...env, RESEND_API_KEY: "" }]) {
    const response = issueToken(settings);
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("cache-control"), "no-store");
    const result = await rejected(request(), 503, settings);
    assert.match(result.error, /not configured/);
  }
  const response = issueToken(env);
  assert.equal(response.status, 200);
  assert.equal(typeof (await response.json()).token, "string");
});

test("rejects forged, too-fast, expired, future and missing tokens", async () => {
  for (const invalid of ["forged", null, token.replace(/.$/, token.endsWith("0") ? "1" : "0"), createFormToken(env.RESEND_API_KEY, now), createFormToken(env.RESEND_API_KEY, now + 5000), createFormToken(env.RESEND_API_KEY, now - 3_600_001)]) {
    const result = await rejected(request({ ...body, token: invalid }), 400);
    assert.equal(result.refreshToken, true);
  }
});

test("sends only validated plain text to configured recipient with reply-to and stable retry key", async () => {
  const calls = [];
  const fetcher = async (url, options) => {
    calls.push({ url, options });
    return Response.json({ id: "email-receipt" });
  };
  for (let i = 0; i < 2; i++) {
    const response = await handleSupport(request(), { env, now, fetcher });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
  }
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  const email = JSON.parse(calls[0].options.body);
  assert.equal(email.from, env.SUPPORT_FROM_EMAIL);
  assert.deepEqual(email.to, [env.SUPPORT_TO_EMAIL]);
  assert.equal(email.reply_to, "person@example.com");
  assert.equal(email.subject, "[Amick Labs support] A question");
  assert.match(email.text, /From: Test Person\n/);
  assert.match(email.text, /First line\nSecond line$/);
  assert.equal(email.html, undefined);
  assert.equal(calls[0].options.headers.Authorization, `Bearer ${env.RESEND_API_KEY}`);
  assert.equal(calls[0].options.headers["Idempotency-Key"], calls[1].options.headers["Idempotency-Key"]);
  assert.ok(calls[0].options.signal instanceof AbortSignal);
});

test("provider rejection, throttling, network failures, timeouts and missing receipts never report success", async () => {
  for (const fetcher of [
    async () => Response.json({ message: "private provider details" }, { status: 403 }),
    async () => Response.json({}, { status: 429 }),
    async () => Response.json({}, { status: 500 }),
    async () => { throw new TypeError("Network failed"); },
    async () => { throw new DOMException("Timeout", "TimeoutError"); },
    async () => Response.json({}),
    async () => new Response("invalid JSON"),
  ]) {
    const response = await handleSupport(request(), { env, now, fetcher });
    assert.equal(response.status, 502);
    const result = await response.json();
    assert.ok(result.error);
    assert.equal(result.success, undefined);
    assert.ok(!JSON.stringify(result).includes("private provider details"));
  }
});
