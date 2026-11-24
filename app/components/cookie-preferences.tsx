"use client";
import { useEffect, useRef, useState } from "react";
import { cookieCategories } from "../cookie-content";

export const OPEN_COOKIE_PREFERENCES = "comvoix-open-cookie-preferences";
const STORAGE_KEY = "comvoix-cookie-preferences";
type Choices = Record<string, boolean>;
const optional = cookieCategories.filter(c => !c.locked).map(c => c.id);
const withAll = (value: boolean): Choices => Object.fromEntries([["necessary", true], ...optional.map(id => [id, value])]);

function readChoices(): Choices {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    const choices = withAll(false);
    if (stored && typeof stored === "object") {
      for (const id of optional) choices[id] = (stored as Choices)[id] === true;
    }
    return choices;
  } catch { return withAll(false); }
}

/** Opens the Cookie Preferences dialog from anywhere on the site. */
export function openCookiePreferences() { window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES)); }

export function CookiePreferencesButton({ className, children = "Cookie Preferences" }: { className?: string; children?: React.ReactNode }) {
  return <button type="button" className={className} onClick={openCookiePreferences}>{children}</button>;
}

export function CookiePreferencesDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [choices, setChoices] = useState<Choices>(() => withAll(false));
  const [customizing, setCustomizing] = useState(true);

  useEffect(() => {
    function open() {
      setChoices(readChoices());
      setCustomizing(true);
      dialog.current?.showModal();
    }
    window.addEventListener(OPEN_COOKIE_PREFERENCES, open);
    open();
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES, open);
  }, []);

  function save(next: Choices) {
    const normalized = { ...next, necessary: true };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized)); } catch { /* Storage may be unavailable. */ }
    setChoices(normalized);
    dialog.current?.close();
  }

  return <dialog ref={dialog} className={`cookie-dialog${customizing ? "" : " cookie-dialog-compact"}`} aria-label="Cookie preferences" aria-describedby="cookie-description" onCancel={event => event.preventDefault()}>
    <p id="cookie-description">We use cookies to run this site and, with your permission, to understand how it&apos;s used and to measure our campaigns. Necessary cookies are always on. See our <a href="/privacy">Privacy Policy</a> for details.</p>
    {customizing && <div className="cookie-categories">{cookieCategories.map(category => <label key={category.id} className="cookie-category">
      <input type="checkbox" checked={category.locked || choices[category.id] === true} disabled={category.locked} onChange={event => setChoices({ ...choices, [category.id]: event.target.checked })} />
      <span><strong>{category.name}</strong><small>{category.text}</small></span>
    </label>)}</div>}
    <div className="cookie-actions">
      {customizing ? <>
        <button type="button" className="cookie-button cookie-button-primary" onClick={() => save(choices)}>Save preferences</button>
        <button type="button" className="cookie-button" onClick={() => save(withAll(true))}>Accept all</button>
        <button type="button" className="cookie-button cookie-button-back" onClick={() => setCustomizing(false)}>Back</button>
      </> : <>
        <button type="button" className="cookie-button" onClick={() => setCustomizing(true)}>Manage</button>
        <button type="button" className="cookie-button" onClick={() => save(withAll(false))}>Reject non-essential</button>
        <button type="button" className="cookie-button cookie-button-primary" onClick={() => save(withAll(true))}>Accept all</button>
      </>}
    </div>
  </dialog>;
}
