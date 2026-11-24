// import type { Metadata } from 'next';
// import { LegalPage, type LegalSection } from '../components/legal-page';

// export const metadata: Metadata = { title: 'CPNI Policy — Comvoix', description: 'How Comvoix accesses, uses, discloses and protects Customer Proprietary Network Information (CPNI) where United States CPNI rules apply.' };

// const sections: LegalSection[] = [
//   { title: 'Purpose and Regulatory Scope', paragraphs: [
//     'Where Comvoix provides telecommunications services subject to United States Customer Proprietary Network Information (CPNI) rules, we maintain protections consistent with applicable provisions of Section 222 of the Communications Act and FCC regulations, including 47 C.F.R. § 64.2001 et seq. This policy addresses how qualifying CPNI is accessed, used, disclosed and protected. [COUNSEL TO CONFIRM WHETHER THESE REGULATIONS APPLY TO COMVOIX AND EACH SERVICE.]',
//   ] },
//   { title: 'What Is CPNI?', paragraphs: [
//     'CPNI generally concerns information arising from a customer relationship with a telecommunications provider, including service type, technical configuration, quantity and destination of usage, call patterns and billing-related service details. Certain subscriber directory information is treated separately under applicable law.',
//   ] },
//   { title: 'Permitted Uses and Customer Authorization', paragraphs: [
//     'We restrict use of CPNI to purposes allowed by applicable law, such as supplying, maintaining and billing for subscribed services, unless the customer has provided a valid authorization or another legal basis applies. When approval is required, Comvoix will use the applicable consent mechanism, document the decision and honor changes to the customer’s selection.',
//   ] },
//   { title: 'Customer Authentication and Access Controls', paragraphs: [
//     'Before releasing sensitive account information, our personnel must follow approved customer authentication procedures. These can include pre-established account credentials, secure account portals, contact through a verified number of record, or delivery to an established address. Business accounts with dedicated representatives may be governed by approved contractual verification arrangements.',
//   ] },
//   { title: 'Account Change Notices', paragraphs: [
//     'Comvoix should notify account holders of material changes to key account access or authentication information in accordance with the rules that apply to the service. [VERIFY ACTUAL NOTICE CHANNELS, TIMING AND TRIGGERS.]',
//   ] },
//   { title: 'Workforce Training and Enforcement', paragraphs: [
//     'Personnel with access to CPNI are expected to complete appropriate training, follow need-to-know controls and escalate suspected misuse. Breaches of internal CPNI requirements may lead to corrective action, access suspension or disciplinary measures, as appropriate.',
//   ] },
//   { title: 'Marketing and Recordkeeping', paragraphs: [
//     'CPNI will not be used in sales or promotional campaigns where doing so would require authorization that has not been obtained. If Comvoix conducts a permitted CPNI-based campaign, relevant consent status, campaign purpose, categories of data used and required supporting records should be maintained for the period prescribed by law. [CONFIRM WHETHER COMVOIX USES CPNI FOR MARKETING.]',
//   ] },
//   { title: 'Outside Providers and Agents', paragraphs: [
//     'Vendors or agents receiving access to CPNI must be bound by appropriate confidentiality and information-security obligations. Sharing with partners, other carriers or independent contractors must follow the customer’s authorizations and applicable law.',
//   ] },
//   { title: 'Unauthorized Access and Incident Response', paragraphs: [
//     'Suspected CPNI breaches are investigated and escalated through the applicable incident-response process. Required notifications to public authorities and affected individuals must follow current legal obligations, which can depend on incident type, risk and governing rules. [REGULATORY COUNSEL TO CONFIRM CURRENT FEDERAL AND STATE NOTICE RULES; DO NOT PUBLISH FIXED 7-DAY TIMELINES WITHOUT REVIEW.]',
//   ] },
//   { title: 'Regulatory Certification', paragraphs: [
//     'Where applicable, Comvoix will maintain evidence of its compliance program and submit required CPNI certifications or other regulatory filings by the governing deadlines. [VERIFY FCC FILING REQUIREMENTS AND RESPONSIBLE OFFICER.]',
//   ] },
//   { title: 'Contact and Policy Requests', paragraphs: [
//     'For questions about this policy or to exercise applicable rights, contact Comvoix by email at support@comvoix.com, by phone at +1 302-485-5838, or by mail at our business mailing address:',
//   ], address: ['ComVoix, LLC', '1000 N West St, Suite 1200', 'Wilmington, DE 19801'] },
// ];

// export default function CpniPage() {
//   return <LegalPage sectionNavigation title="CPNI Policy" meta={['Updated March 1, 2026']} sections={sections} />;
// }


import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '../components/legal-page';

export const metadata: Metadata = { title: 'CPNI Policy — Comvoix', description: 'How Comvoix accesses, uses, discloses and protects Customer Proprietary Network Information (CPNI) where United States CPNI rules apply.' };

const sections: LegalSection[] = [
  { title: 'Purpose and Regulatory Scope', paragraphs: [
    'Where Comvoix provides telecommunications services subject to United States Customer Proprietary Network Information (CPNI) rules, we maintain protections consistent with applicable provisions of Section 222 of the Communications Act and FCC regulations, including 47 C.F.R. § 64.2001 et seq. This policy addresses how qualifying CPNI is accessed, used, disclosed and protected. [COUNSEL TO CONFIRM WHETHER THESE REGULATIONS APPLY TO COMVOIX AND EACH SERVICE.]',
  ] },
  { title: 'What Is CPNI?', paragraphs: [
    'CPNI generally concerns information arising from a customer relationship with a telecommunications provider, including service type, technical configuration, quantity and destination of usage, call patterns and billing-related service details. Certain subscriber directory information is treated separately under applicable law.',
  ] },
  { title: 'Permitted Uses and Customer Authorization', paragraphs: [
    'We restrict use of CPNI to purposes allowed by applicable law, such as supplying, maintaining and billing for subscribed services, unless the customer has provided a valid authorization or another legal basis applies. When approval is required, Comvoix will use the applicable consent mechanism, document the decision and honor changes to the customer’s selection.',
  ] },
  { title: 'Customer Authentication and Access Controls', paragraphs: [
    'Before releasing sensitive account information, our personnel must follow approved customer authentication procedures. These can include pre-established account credentials, secure account portals, contact through a verified number of record, or delivery to an established address. Business accounts with dedicated representatives may be governed by approved contractual verification arrangements.',
  ] },
  { title: 'Account Change Notices', paragraphs: [
    'Comvoix should notify account holders of material changes to key account access or authentication information in accordance with the rules that apply to the service. [VERIFY ACTUAL NOTICE CHANNELS, TIMING AND TRIGGERS.]',
  ] },
  { title: 'Workforce Training and Enforcement', paragraphs: [
    'Personnel with access to CPNI are expected to complete appropriate training, follow need-to-know controls and escalate suspected misuse. Breaches of internal CPNI requirements may lead to corrective action, access suspension or disciplinary measures, as appropriate.',
  ] },
  { title: 'Marketing and Recordkeeping', paragraphs: [
    'CPNI will not be used in sales or promotional campaigns where doing so would require authorization that has not been obtained. If Comvoix conducts a permitted CPNI-based campaign, relevant consent status, campaign purpose, categories of data used and required supporting records should be maintained for the period prescribed by law. [CONFIRM WHETHER COMVOIX USES CPNI FOR MARKETING.]',
  ] },
  { title: 'Outside Providers and Agents', paragraphs: [
    'Vendors or agents receiving access to CPNI must be bound by appropriate confidentiality and information-security obligations. Sharing with partners, other carriers or independent contractors must follow the customer’s authorizations and applicable law.',
  ] },
  { title: 'Unauthorized Access and Incident Response', paragraphs: [
    'Suspected CPNI breaches are investigated and escalated through the applicable incident-response process. Required notifications to public authorities and affected individuals must follow current legal obligations, which can depend on incident type, risk and governing rules. [REGULATORY COUNSEL TO CONFIRM CURRENT FEDERAL AND STATE NOTICE RULES; DO NOT PUBLISH FIXED 7-DAY TIMELINES WITHOUT REVIEW.]',
  ] },
  { title: 'Regulatory Certification', paragraphs: [
    'Where applicable, Comvoix will maintain evidence of its compliance program and submit required CPNI certifications or other regulatory filings by the governing deadlines. [VERIFY FCC FILING REQUIREMENTS AND RESPONSIBLE OFFICER.]',
  ] },
  { title: 'Contact and Policy Requests', paragraphs: [
    'For questions about this policy or to exercise applicable rights, contact Comvoix by email at {{contact:support}}, by phone at {{contact:phone}}, or by mail at our business mailing address:',
  ], address: ['ComVoix, LLC', '1000 N West St, Suite 1200', 'Wilmington, DE 19801'] },
];

export default function CpniPage() {
  return <LegalPage sectionNavigation title="CPNI Policy" meta={['Updated March 1, 2026']} sections={sections} />;
}
