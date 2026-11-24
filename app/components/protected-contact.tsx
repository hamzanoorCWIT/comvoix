'use client';

import { useState } from 'react';

export type ProtectedContactKey = 'support' | 'sales' | 'phone';
type Props = { contact: ProtectedContactKey; className?: string };

// Cache both pending and completed requests so repeated contacts across the page
// use the same fetch. A failed request is removed so the visitor can retry.
const contactRequests = new Map<ProtectedContactKey, Promise<string>>();

function fetchContact(contact: ProtectedContactKey): Promise<string> {
  const existing = contactRequests.get(contact);
  if (existing) return existing;

  const request = fetch('/api/contact-reveal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: contact }),
    cache: 'no-store',
  })
    .then(async (response) => {
      if (!response.ok) throw new Error('Contact unavailable');
      const data: unknown = await response.json();
      if (!data || typeof data !== 'object' || !('value' in data)
        || typeof data.value !== 'string' || !data.value) {
        throw new Error('Invalid contact response');
      }
      return data.value;
    })
    .catch((error: unknown) => {
      contactRequests.delete(contact);
      throw error;
    });

  contactRequests.set(contact, request);
  return request;
}

export function ProtectedContact({ contact, className }: Props) {
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function reveal() {
    if (loading) return;
    setLoading(true);
    setError(false);
    try { setValue(await fetchContact(contact)); }
    catch { setError(true); }
    finally { setLoading(false); }
  }

  if (value) {
    const href = contact === 'phone' ? `tel:${value}` : `mailto:${value}`;
    const label = contact === 'phone' ? value.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, '+1 $1-$2-$3') : value;
    return <a className={className} href={href}>{label}</a>;
  }

  return <span className={className} aria-live="polite">
    {error && 'Contact unavailable. '}
    <button className="contact-reveal" type="button" onClick={reveal} disabled={loading} aria-busy={loading}>
      {loading ? 'Loading…' : error ? 'Try again' : contact === 'phone' ? 'Show phone number' : `Show ${contact} email`}
    </button>
  </span>;
}
