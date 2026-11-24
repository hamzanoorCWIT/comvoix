"use client";
import { useMemo, useState, type ChangeEvent, type FormEvent, type FocusEvent } from "react";
import { Dropdown } from "./dropdown";
import { countries } from "countries-list";

type Values = { name: string; email: string; company: string; country: string; phoneCode: string; phone: string; notes: string };
type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = { name: "", email: "", company: "", country: "", phoneCode: "", phone: "", notes: "" };

// Letters (any script), spaces, apostrophes, hyphens and dots only; digits and symbols are not names.
const NAME = /^[\p{L}][\p{L}\p{M}' .-]{1,79}$/u;
// A practical address check: one @, a domain with a dot, no spaces.
const EMAIL = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (!NAME.test(values.name.trim())) errors.name = "Names can only contain letters, spaces, apostrophes and hyphens.";
  if (!values.email.trim()) errors.email = "Please enter your work email.";
  else if (!EMAIL.test(values.email.trim())) errors.email = "Enter a valid email address, such as name@company.com.";
  if (!values.company.trim()) errors.company = "Please enter your company name.";
  else if (values.company.trim().length < 2) errors.company = "Company names need at least 2 characters.";
  if (!values.country) errors.country = "Please choose your country.";
  if (!values.phoneCode) errors.phoneCode = "Choose a dialling code.";
  if (!values.phone) errors.phone = "Please enter your phone number.";
  else if (!/^\d{6,15}$/.test(values.phone)) errors.phone = "Phone numbers can only contain 6 to 15 digits.";
  if (values.notes.length > 1000) errors.notes = "Please keep your notes under 1,000 characters.";
  return errors;
}

export function ContactForm({ initialEmail = '', subject = 'Website enquiry' }: { initialEmail?: string; subject?: string }) {
  const [values, setValues] = useState<Values>({ ...initial, email: initialEmail });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [website, setWebsite] = useState("");

  const countryList = useMemo(() => Object.entries(countries)
    .map(([code, c]) => ({ code, name: c.name, phone: c.phone[0] }))
    .filter(c => c.phone)
    .sort((a, b) => a.name.localeCompare(b.name)), []);
  const dialCodes = useMemo(() => Array.from(new Set(countryList.map(c => c.phone))).sort((a, b) => a - b), [countryList]);
  const countryOptions = useMemo(() => countryList.map(c => ({ value: c.code, label: c.name })), [countryList]);
  const dialOptions = useMemo(() => dialCodes.map(code => ({ value: String(code), label: `+${code}` })), [dialCodes]);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validate(next));
  }
  function blur(event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const key = event.target.name as keyof Values;
    setTouched(t => ({ ...t, [key]: true }));
    setErrors(validate(values));
  }
  function touch(key: keyof Values) {
    setTouched(t => ({ ...t, [key]: true }));
    setErrors(validate(values));
  }
  function onCountry(code: string) {
    const match = countryList.find(c => c.code === code);
    const next = { ...values, country: code, phoneCode: match ? String(match.phone) : values.phoneCode };
    setValues(next);
    if (touched.country || touched.phoneCode) setErrors(validate(next));
  }
  function onPhone(event: ChangeEvent<HTMLInputElement>) {
    // Strip anything that is not a digit as it is typed or pasted, so letters never land in the field.
    update("phone", event.target.value.replace(/\D/g, "").slice(0, 15));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, company: true, country: true, phoneCode: true, phone: true, notes: true });
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setSending(true);
    setServerError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, name: values.name.trim(), email: values.email.trim(), notes: values.notes.trim(), website, subject }),
      });
      const result = await response.json().catch(() => ({})) as { ok?: boolean; error?: string; errors?: Errors };
      if (!response.ok || result.ok !== true) {
        if (result.errors) { setErrors(result.errors); form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(); }
        setServerError(result.error || "We couldn’t send your message right now. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setServerError("We couldn’t reach the server. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  const invalid = (key: keyof Values) => Boolean(touched[key] && errors[key]);
  const describe = (key: keyof Values) => invalid(key) ? `contact-${key}-error` : undefined;

  if (sent) {
    return <div className="contact-sent" role="status">
      <strong>Thank you, {values.name.trim()}.</strong>
      <p>Your message has been sent to our team. We’ll get back to you at {values.email.trim()}.</p>
      <button type="button" className="button button-secondary" onClick={() => { setValues(initial); setErrors({}); setTouched({}); setServerError(""); setSent(false); }}>Send another message</button>
    </div>;
  }

  return <form className="pbx-demo-form contact-form" onSubmit={submit} noValidate>
    <div>
      <label className="sr-only" htmlFor="contact-name">Full name</label>
      <input id="contact-name" name="name" autoComplete="name" value={values.name} onChange={e => update("name", e.target.value)} onBlur={blur} aria-invalid={invalid("name")} aria-describedby={describe("name")} placeholder="Full name" />
      {invalid("name") && <span className="field-error" id="contact-name-error">{errors.name}</span>}
    </div>
    <div>
      <label className="sr-only" htmlFor="contact-email">Work email</label>
      <input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={e => update("email", e.target.value.replace(/\s/g, ""))} onBlur={blur} aria-invalid={invalid("email")} aria-describedby={describe("email")} placeholder="Work email" />
      {invalid("email") && <span className="field-error" id="contact-email-error">{errors.email}</span>}
    </div>
    <div>
      <label className="sr-only" htmlFor="contact-company">Company</label>
      <input id="contact-company" name="company" autoComplete="organization" maxLength={120} value={values.company} onChange={e => update("company", e.target.value)} onBlur={blur} aria-invalid={invalid("company")} aria-describedby={describe("company")} placeholder="Company" />
      {invalid("company") && <span className="field-error" id="contact-company-error">{errors.company}</span>}
    </div>
    <div>
      <label className="sr-only" htmlFor="contact-country">Country</label>
<Dropdown id="contact-country" label="Country" placeholder="Country" value={values.country} options={countryOptions} onChange={onCountry} onBlur={() => touch("country")} invalid={invalid("country")} describedBy={describe("country")} />
      {invalid("country") && <span className="field-error" id="contact-country-error">{errors.country}</span>}
    </div>
    <div className="form-wide">
      <label className="sr-only" htmlFor="contact-phone">Phone number</label>
      <div className="phone-row">
<Dropdown id="contact-phone-code" className="dropdown-code" label="Country dialling code" placeholder="Code" value={values.phoneCode} options={dialOptions} onChange={v => update("phoneCode", v)} onBlur={() => touch("phoneCode")} invalid={invalid("phoneCode")} />
        <input id="contact-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" pattern="[0-9]*" value={values.phone} onChange={onPhone} onBlur={blur} aria-invalid={invalid("phone")} aria-describedby={describe("phone")} placeholder="Phone number" />
      </div>
      {(invalid("phoneCode") || invalid("phone")) && <span className="field-error" id="contact-phone-error">{errors.phone ?? errors.phoneCode}</span>}
    </div>
    <div className="form-wide">
      <label className="sr-only" htmlFor="contact-notes">Notes (optional)</label>
      <textarea id="contact-notes" name="notes" rows={4} maxLength={1000} value={values.notes} onChange={e => update("notes", e.target.value)} onBlur={blur} aria-invalid={invalid("notes")} aria-describedby={describe("notes")} placeholder="Any additional notes here..." />
      {invalid("notes") && <span className="field-error" id="contact-notes-error">{errors.notes}</span>}
    </div>
    {/* Honeypot for bots: hidden from people, never filled by them. */}
    <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} /></div>
    {serverError && <p className="form-wide field-error contact-server-error" role="alert">{serverError}</p>}
    <button type="submit" className="button" disabled={sending} aria-busy={sending}>{sending ? "Sending…" : "Send Message ↗"}</button>
  </form>;
}
