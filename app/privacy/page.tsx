// import type { Metadata } from 'next';
// import { LegalPage, type LegalSection } from '../components/legal-page';

// export const metadata: Metadata = { title: 'Privacy Policy — Comvoix', description: 'How Comvoix collects, uses, shares and protects information across its website, business communication platform and telecommunications services.' };

// const sections: LegalSection[] = [
//   { title: '1. Our Commitment to Privacy', paragraphs: [
//     'Comvoix ("Comvoix," "we," "our," or "us") values the privacy of the people and organizations that interact with our website, business communication platform and telecommunications services. This Privacy Policy explains the categories of information we obtain, why we process it, when we disclose it and the safeguards we apply.',
//     'This notice covers website visitors, business contacts, account administrators, users and customers of our cloud calling, business number, SIP trunking and voice connectivity solutions, to the extent those services are offered by Comvoix.',
//   ] },
//   { title: '2. Business Verification and Compliance', paragraphs: [
//     'To provide communications services responsibly, we may collect information needed to verify business identity, evaluate intended traffic and service usage, prevent fraud, investigate suspected misuse and comply with applicable telecommunications rules or lawful requests. Verification may involve corporate registration, authorized contacts, ownership details, business activities and supporting records.',
//   ] },
//   { title: '3. Information We May Collect', bullets: [
//     'Contact and account details: names, business and email addresses, phone numbers, user roles and support correspondence.',
//     'Commercial information: selected services, invoices, payment details, billing records and transaction history.',
//     'Customer due diligence: registration records, company location, ownership or management details and intended communications use.',
//     'Technical and device information: IP addresses, browser and device attributes, access logs, security events and platform usage data.',
//     'Service and communications records: call detail records, routing information, phone numbers, call timestamps, duration, voicemail or other communications content where relevant to an enabled feature.',
//     'Cookies and similar technologies: preferences and website analytics or advertising data, to the extent these tools are actually deployed.',
//   ] },
//   { title: '4. Purposes of Processing', paragraphs: [
//     'We use collected information to establish and administer accounts, activate services, provide connectivity, process charges, deliver customer support, maintain operational quality, protect network security, prevent prohibited traffic, verify customers, satisfy legal requirements and communicate relevant service notices. Where legally permitted, we may also use contact details for product communications; unsubscribe choices will be respected as required by law.',
//   ] },
//   { title: '5. When Data May Be Shared', paragraphs: [
//     'Personal and business data may be provided to contracted technology, hosting, payment and network partners who support service delivery; to advisers involved in lawful business operations; to regulators, courts or law-enforcement bodies where legally required or allowed; and to parties involved in a legitimate company transaction. We do not authorize a vendor to use data for purposes unrelated to its contracted function. [CONFIRM COMVOIX POLICY REGARDING SALE/SHARING OF PERSONAL DATA.]',
//   ] },
//   { title: '6. Security', paragraphs: [
//     'Comvoix uses proportionate technical and organizational safeguards intended to protect information against unauthorized access, alteration, loss or misuse. Depending on the service, these may include role-based access, authentication controls, security logging, restricted administrative access and incident-response processes. No data system is entirely free of risk.',
//   ] },
//   { title: '7. Retention', paragraphs: [
//     'We keep personal and communications information for the period needed for service provision, invoicing, legal compliance, security, legitimate business records and dispute handling. Retention periods vary by data type and jurisdiction. [INSERT APPROVED RETENTION SCHEDULE, INCLUDING CALL RECORDS.]',
//   ] },
//   { title: '8. Privacy Rights and Choices', paragraphs: [
//     'Subject to applicable law, you may be entitled to request access, correction, deletion, portability or restrictions on the use of your information; withdraw a valid consent; object to certain processing; or stop promotional emails. We may need to verify the requester and retain records where legal obligations require it.',
//   ] },
//   { title: '9. Cookies and Website Analytics', paragraphs: [
//     'We use necessary website technologies and, where implemented and permitted, optional analytics or marketing tools. Visitors can review available choices through Cookie Preferences and relevant browser controls. A separate cookie settings notice describes cookie categories and options.',
//   ] },
//   { title: '10. International Processing and Data Location', paragraphs: [
//     'Customer information may be processed in locations used by our approved service providers and infrastructure partners, subject to applicable data protection requirements. [SPECIFY VERIFIED HOSTING COUNTRIES AND CROSS-BORDER TRANSFER SAFEGUARDS. DO NOT CLAIM US-ONLY STORAGE WITHOUT CONFIRMATION.]',
//   ] },
//   { title: '11. Policy Changes', paragraphs: [
//     'We may revise this notice as our products, data practices or legal duties change. The current version will show an updated effective date. Where law requires additional notice or consent, Comvoix will provide it.',
//   ] },
//   { title: 'Contact and Policy Requests', paragraphs: [
//     'For questions about this policy or to exercise applicable rights, contact Comvoix by email at support@comvoix.com, by phone at +1 302-485-5838, or by mail at our business mailing address:',
//   ], address: ['ComVoix, LLC', '1000 N West St, Suite 1200', 'Wilmington, DE 19801'] },
// ];

// export default function PrivacyPage() {
//   return <LegalPage sectionNavigation title="Privacy Policy" meta={['Effective March 1, 2026']} sections={sections} />;
// }

import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '../components/legal-page';

export const metadata: Metadata = { title: 'Privacy Policy — Comvoix', description: 'How Comvoix collects, uses, shares and protects information across its website, business communication platform and telecommunications services.' };

const sections: LegalSection[] = [
  { title: '1. Our Commitment to Privacy', paragraphs: [
    'Comvoix ("Comvoix," "we," "our," or "us") values the privacy of the people and organizations that interact with our website, business communication platform and telecommunications services. This Privacy Policy explains the categories of information we obtain, why we process it, when we disclose it and the safeguards we apply.',
    'This notice covers website visitors, business contacts, account administrators, users and customers of our cloud calling, business number, SIP trunking and voice connectivity solutions, to the extent those services are offered by Comvoix.',
  ] },
  { title: '2. Business Verification and Compliance', paragraphs: [
    'To provide communications services responsibly, we may collect information needed to verify business identity, evaluate intended traffic and service usage, prevent fraud, investigate suspected misuse and comply with applicable telecommunications rules or lawful requests. Verification may involve corporate registration, authorized contacts, ownership details, business activities and supporting records.',
  ] },
  { title: '3. Information We May Collect', bullets: [
    'Contact and account details: names, business and email addresses, phone numbers, user roles and support correspondence.',
    'Commercial information: selected services, invoices, payment details, billing records and transaction history.',
    'Customer due diligence: registration records, company location, ownership or management details and intended communications use.',
    'Technical and device information: IP addresses, browser and device attributes, access logs, security events and platform usage data.',
    'Service and communications records: call detail records, routing information, phone numbers, call timestamps, duration, voicemail or other communications content where relevant to an enabled feature.',
    'Cookies and similar technologies: preferences and website analytics or advertising data, to the extent these tools are actually deployed.',
  ] },
  { title: '4. Purposes of Processing', paragraphs: [
    'We use collected information to establish and administer accounts, activate services, provide connectivity, process charges, deliver customer support, maintain operational quality, protect network security, prevent prohibited traffic, verify customers, satisfy legal requirements and communicate relevant service notices. Where legally permitted, we may also use contact details for product communications; unsubscribe choices will be respected as required by law.',
  ] },
  { title: '5. When Data May Be Shared', paragraphs: [
    'Personal and business data may be provided to contracted technology, hosting, payment and network partners who support service delivery; to advisers involved in lawful business operations; to regulators, courts or law-enforcement bodies where legally required or allowed; and to parties involved in a legitimate company transaction. We do not authorize a vendor to use data for purposes unrelated to its contracted function. [CONFIRM COMVOIX POLICY REGARDING SALE/SHARING OF PERSONAL DATA.]',
  ] },
  { title: '6. Security', paragraphs: [
    'Comvoix uses proportionate technical and organizational safeguards intended to protect information against unauthorized access, alteration, loss or misuse. Depending on the service, these may include role-based access, authentication controls, security logging, restricted administrative access and incident-response processes. No data system is entirely free of risk.',
  ] },
  { title: '7. Retention', paragraphs: [
    'We keep personal and communications information for the period needed for service provision, invoicing, legal compliance, security, legitimate business records and dispute handling. Retention periods vary by data type and jurisdiction. [INSERT APPROVED RETENTION SCHEDULE, INCLUDING CALL RECORDS.]',
  ] },
  { title: '8. Privacy Rights and Choices', paragraphs: [
    'Subject to applicable law, you may be entitled to request access, correction, deletion, portability or restrictions on the use of your information; withdraw a valid consent; object to certain processing; or stop promotional emails. We may need to verify the requester and retain records where legal obligations require it.',
  ] },
  { title: '9. Cookies and Website Analytics', paragraphs: [
    'We use necessary website technologies and, where implemented and permitted, optional analytics or marketing tools. Visitors can review available choices through Cookie Preferences and relevant browser controls. A separate cookie settings notice describes cookie categories and options.',
  ] },
  { title: '10. International Processing and Data Location', paragraphs: [
    'Customer information may be processed in locations used by our approved service providers and infrastructure partners, subject to applicable data protection requirements. [SPECIFY VERIFIED HOSTING COUNTRIES AND CROSS-BORDER TRANSFER SAFEGUARDS. DO NOT CLAIM US-ONLY STORAGE WITHOUT CONFIRMATION.]',
  ] },
  { title: '11. Policy Changes', paragraphs: [
    'We may revise this notice as our products, data practices or legal duties change. The current version will show an updated effective date. Where law requires additional notice or consent, Comvoix will provide it.',
  ] },
  { title: 'Contact and Policy Requests', paragraphs: [
    'For questions about this policy or to exercise applicable rights, contact Comvoix by email at {{contact:support}}, by phone at {{contact:phone}}, or by mail at our business mailing address:',
  ], address: ['ComVoix, LLC', '1000 N West St, Suite 1200', 'Wilmington, DE 19801'] },
];

export default function PrivacyPage() {
  return <LegalPage sectionNavigation title="Privacy Policy" meta={['Effective March 1, 2026']} sections={sections} />;
}
