// import type { Metadata } from 'next';
// import { LegalPage, type LegalSection } from '../components/legal-page';
// import { CookiePreferencesButton } from '../components/cookie-preferences';
// import { cookieCategories } from '../cookie-content';

// export const metadata: Metadata = { title: 'Cookie Preferences — Comvoix', description: 'Comvoix uses essential cookies to make our website work. With your permission, we may also use optional technologies to understand website activity, remember certain preferences and improve relevant content.' };

// const sections: LegalSection[] = [
//   { title: 'Cookie Categories', bullets: cookieCategories.map(category => `${category.name} — ${category.status}: ${category.text}`) },
//   { title: 'Cookie Retention and Third Parties', paragraphs: [
//     'Some technologies may be set by approved third-party providers and retained for different periods. [INSERT REAL COOKIE INVENTORY: NAME, PROVIDER, PURPOSE, DURATION AND CATEGORY. PROVIDE LINKS TO RELEVANT VENDOR INFORMATION AS REQUIRED.]',
//   ] },
//   { title: 'Consent and Technical Behavior', paragraphs: [
//     'Optional scripts should not run before consent where prior consent is legally required. The settings control should remember users’ selections, support withdrawal and prevent optional tags from loading when disabled. Necessary cookies should remain limited to genuinely essential functions.',
//   ] },
//   { title: 'Related Information', paragraphs: [
//     'For more about how Comvoix handles information, please read the Privacy Policy. For privacy questions, email support@comvoix.com or call +1 302-485-5838.',
//   ], links: [['Privacy Policy', '/privacy']] },
// ];

// export default function CookiePreferencesPage() {
//   return <LegalPage
//     title="Cookie Preferences"
//     meta={['Publication status: Draft — legal and operational review required.']}
//     intro="Comvoix uses essential cookies to make our website work. With your permission, we may also use optional technologies to understand website activity, remember certain preferences and improve relevant content. You can review or update your choices at any time."
//     sections={sections}
//   >
//     <section className="legal-cta"><CookiePreferencesButton className="button">Customize Settings ↗</CookiePreferencesButton></section>
//   </LegalPage>;
// }

import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '../components/legal-page';
import { CookiePreferencesButton } from '../components/cookie-preferences';
import { cookieCategories } from '../cookie-content';

export const metadata: Metadata = { title: 'Cookie Preferences — Comvoix', description: 'Comvoix uses essential cookies to make our website work. With your permission, we may also use optional technologies to understand website activity, remember certain preferences and improve relevant content.' };

const sections: LegalSection[] = [
  { title: 'Cookie Categories', bullets: cookieCategories.map(category => `${category.name} — ${category.status}: ${category.text}`) },
  { title: 'Cookie Retention and Third Parties', paragraphs: [
    'Some technologies may be set by approved third-party providers and retained for different periods. [INSERT REAL COOKIE INVENTORY: NAME, PROVIDER, PURPOSE, DURATION AND CATEGORY. PROVIDE LINKS TO RELEVANT VENDOR INFORMATION AS REQUIRED.]',
  ] },
  { title: 'Consent and Technical Behavior', paragraphs: [
    'Optional scripts should not run before consent where prior consent is legally required. The settings control should remember users’ selections, support withdrawal and prevent optional tags from loading when disabled. Necessary cookies should remain limited to genuinely essential functions.',
  ] },
  { title: 'Related Information', paragraphs: [
    'For more about how Comvoix handles information, please read the Privacy Policy. For privacy questions, email {{contact:support}} or call {{contact:phone}}.',
  ], links: [['Privacy Policy', '/privacy']] },
];

export default function CookiePreferencesPage() {
  return <LegalPage
    title="Cookie Preferences"
    meta={['Publication status: Draft — legal and operational review required.']}
    intro="Comvoix uses essential cookies to make our website work. With your permission, we may also use optional technologies to understand website activity, remember certain preferences and improve relevant content. You can review or update your choices at any time."
    sections={sections}
  >
    <section className="legal-cta"><CookiePreferencesButton className="button">Customize Settings ↗</CookiePreferencesButton></section>
  </LegalPage>;
}
