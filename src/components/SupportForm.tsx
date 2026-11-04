"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

type Field = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<Field, string>>;
const fields: { name: Field; label: string; max: number; autoComplete?: string }[] = [
  { name: "name", label: "Your name", max: 100, autoComplete: "name" },
  { name: "email", label: "Your email", max: 254, autoComplete: "email" },
  { name: "subject", label: "Subject", max: 160 },
  { name: "message", label: "Message", max: 5000 },
];

async function fetchFormToken(signal?: AbortSignal): Promise<string> {
  const response = await fetch("/api/support", {
    cache: "no-store",
    signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(15_000)]) : AbortSignal.timeout(15_000),
  });
  const result = await response.json();
  if (!response.ok || typeof result.token !== "string") {
    throw new Error(result.error || "The form could not connect. Please try again.");
  }
  return result.token;
}

export function SupportForm() {
  const [token, setToken] = useState("");
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const feedback = useRef<HTMLDivElement>(null);
  const submitting = useRef(false);

  async function loadToken(signal?: AbortSignal) {
    try {
      setToken(await fetchFormToken(signal));
    } catch (cause) {
      if (signal?.aborted) return;
      setError(cause instanceof Error ? cause.message : "The form could not connect. Please try again.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchFormToken(controller.signal)
      .then((value) => { if (!controller.signal.aborted) setToken(value); })
      .catch((cause: unknown) => {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "The form could not connect. Please try again.");
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setPending(true);
    setError("");
    setErrors({});
    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token }),
        signal: AbortSignal.timeout(20_000),
      });
      const result = await response.json();
      if (response.ok && result.success) setSent(true);
      else {
        setError(result.error || "Your message could not be sent. Please try again.");
        setErrors(result.fields ?? {});
        if (result.refreshToken) {
          setLoading(true);
          await loadToken();
        }
      }
    } catch {
      setError("We could not confirm your message was sent. Check your connection and retry with the same form.");
    } finally {
      submitting.current = false;
      setPending(false);
      requestAnimationFrame(() => feedback.current?.focus());
    }
  }

  return (
    <div>
      <div ref={feedback} tabIndex={-1} className="scroll-mt-6" aria-live="polite" aria-atomic="true">
        {sent ? (
          <div className="border border-amber-dim bg-bg-raised p-8" role="status">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Message sent</p>
            <h2 className="mt-4 font-display text-3xl font-medium text-ink">Thanks for writing.</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">Your message is on its way to me. I&apos;ll reply to the email address you provided.</p>
          </div>
        ) : error ? <p role="alert" className="mb-6 border-l-2 border-amber bg-bg-raised p-4 text-sm leading-relaxed text-ink">{error}</p> : null}
      </div>
      {!sent && (
        <form onSubmit={submit} aria-label="Contact Nathan" aria-busy={pending}>
          <fieldset disabled={pending} className="grid gap-6 sm:grid-cols-2">
            <legend className="sr-only">Your message</legend>
            {fields.map(({ name, label, max, autoComplete }) => {
              const shared = {
                id: name, name, required: true, maxLength: max, autoComplete,
                "aria-invalid": !!errors[name],
                "aria-describedby": errors[name] ? `${name}-error` : name === "message" ? "message-hint" : undefined,
                className: "mt-2 block w-full rounded-none border border-line-strong bg-bg-raised px-4 py-3 text-base text-ink transition-colors hover:border-ink-muted focus:border-amber focus:outline-amber disabled:opacity-60",
              };
              return (
                <div key={name} className={name === "subject" || name === "message" ? "sm:col-span-2" : ""}>
                  <label htmlFor={name} className="font-mono text-xs tracking-wider text-ink">{label}</label>
                  {name === "message" ? <textarea {...shared} rows={7} className={`${shared.className} min-h-44 resize-y`} /> : <input {...shared} type={name === "email" ? "email" : "text"} />}
                  {name === "message" && <p id="message-hint" className="mt-2 text-xs leading-relaxed text-ink-muted">What happened, and what were you trying to do? Include a product or course name if it helps. Up to 5,000 characters.</p>}
                  {errors[name] && <p id={`${name}-error`} className="mt-2 text-sm text-amber">{errors[name]}</p>}
                </div>
              );
            })}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Leave this empty</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button type="submit" disabled={pending || loading || !token} className="inline-flex min-h-12 items-center justify-center gap-6 bg-amber px-6 py-3 font-mono text-sm font-medium text-bg transition-colors hover:bg-ink disabled:cursor-wait disabled:opacity-50">
                {pending ? "Sending…" : loading ? "Connecting…" : "Send message"}<span aria-hidden="true">↗</span>
              </button>
              {!token && !loading && <button type="button" onClick={() => { setError(""); setLoading(true); void loadToken(); }} className="p-2 text-sm text-amber underline underline-offset-4">Reconnect form</button>}
              <p className="text-xs text-ink-muted">All fields required.</p>
            </div>
          </fieldset>
          <noscript><p className="mt-4 text-sm text-ink">This form needs JavaScript. You can email me using the link below.</p></noscript>
        </form>
      )}
      <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-ink-muted">Prefer email? <a href={`mailto:${site.email}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:text-amber">{site.email}</a></p>
    </div>
  );
}
