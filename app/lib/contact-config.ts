import 'server-only';

export const contactKeys = ['support', 'sales', 'phone'] as const;
export type ContactKey = (typeof contactKeys)[number];

const config: Record<ContactKey, string | undefined> = {
  support: process.env.CONTACT_SUPPORT_EMAIL,
  sales: process.env.CONTACT_SALES_EMAIL,
  phone: process.env.CONTACT_PHONE_E164,
};

export function getContactValue(key: ContactKey): string | null {
  const value = config[key]?.trim();
  if (!value) return null;
  if (key === 'phone') return /^\+[1-9]\d{7,14}$/.test(value) ? value : null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : null;
}
