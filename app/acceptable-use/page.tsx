// import type { Metadata } from 'next';
// import { LegalPage, type LegalSection } from '../components/legal-page';

// export const metadata: Metadata = { title: 'Acceptable Use Policy — Comvoix', description: 'The standards customers and their authorized users must observe when accessing Comvoix voice, numbers, SIP, cloud communication and related services.' };

// const sections: LegalSection[] = [
//   { title: 'Purpose and Applicability', paragraphs: [
//     'This Acceptable Use Policy ("AUP") explains the standards customers and their authorized users must observe when accessing Comvoix voice, numbers, SIP, cloud communication and related services. Use of those services is conditional on lawful, responsible conduct and adherence to the applicable customer agreement.',
//   ] },
//   { title: 'Unacceptable Activities', paragraphs: [
//     'Customers must not conduct, enable, conceal or knowingly facilitate any of the following through Comvoix services:',
//   ], bullets: [
//     'Fraud, impersonation, misrepresentation, deceptive transactions, abuse, threats or unlawful exploitation of any individual.',
//     'Unlawful robocalls, autodialed communications, mass calling or marketing that violates applicable consent, identification, opt-out, calling-time or Do-Not-Call requirements.',
//     'Unlawful spoofing or falsification of calling line identity, or attempts to interfere with legally required caller-authentication measures such as STIR/SHAKEN.',
//     'Transmission of malware, harmful software or content designed to compromise systems, equipment or accounts.',
//     'Unauthorized access, credential abuse, denial-of-service activity or other actions that undermine system availability, integrity or confidentiality.',
//     'Routing intended to disguise the true source, originating party, location, nature or purpose of telephone traffic.',
//     'Infringing, harassing, defamatory, discriminatory or otherwise unlawful content or communications.',
//     'Use of protected health information in a manner that requires a business associate agreement unless Comvoix has explicitly agreed to such an arrangement in writing.',
//     'Reverse engineering or circumvention of technical protections in violation of applicable law or agreement terms.',
//     'Resale or sharing of service access beyond permitted account or contractual rights.',
//     'Failure to cooperate with lawful, reasonable inquiries relating to verification, suspected fraud, illegal traffic, traceback requests or compliance investigations.',
//   ] },
//   { title: 'Customer Responsibility', paragraphs: [
//     'Customers remain responsible for their employees, subcontractors, downstream users and any other parties using services or credentials under their control. They must maintain appropriate authorization for calling, record legally required consents and disclosures, and provide accurate traffic source information when properly requested.',
//   ] },
//   { title: 'Preventive Controls and Enforcement', paragraphs: [
//     'Where credible indicators of prohibited conduct or material security risk arise, Comvoix may monitor available service metadata, investigate the matter, restrict particular call routes, temporarily suspend access or terminate affected services, in accordance with the customer agreement and applicable law. Requests for information and corrective steps may be issued during an investigation.',
//   ] },
//   { title: 'Policy Updates', paragraphs: [
//     'Comvoix may revise this AUP to respond to legal requirements, threat patterns or service changes. Updated terms will be published or communicated in a manner consistent with the governing agreement and applicable notice obligations.',
//   ] },
//   { title: 'Abuse Reporting', paragraphs: [
//     'Report suspected service misuse or security concerns to support@comvoix.com or call +1 302-485-5838. Include relevant numbers, timestamps, call identifiers and a description of the concern where available.',
//   ] },
// ];

// export default function AcceptableUsePage() {
//   return <LegalPage sectionNavigation title="Acceptable Use Policy" meta={['Updated March 1, 2026']} sections={sections} />;
// }

import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '../components/legal-page';

export const metadata: Metadata = { title: 'Acceptable Use Policy — Comvoix', description: 'The standards customers and their authorized users must observe when accessing Comvoix voice, numbers, SIP, cloud communication and related services.' };

const sections: LegalSection[] = [
  { title: 'Purpose and Applicability', paragraphs: [
    'This Acceptable Use Policy ("AUP") explains the standards customers and their authorized users must observe when accessing Comvoix voice, numbers, SIP, cloud communication and related services. Use of those services is conditional on lawful, responsible conduct and adherence to the applicable customer agreement.',
  ] },
  { title: 'Unacceptable Activities', paragraphs: [
    'Customers must not conduct, enable, conceal or knowingly facilitate any of the following through Comvoix services:',
  ], bullets: [
    'Fraud, impersonation, misrepresentation, deceptive transactions, abuse, threats or unlawful exploitation of any individual.',
    'Unlawful robocalls, autodialed communications, mass calling or marketing that violates applicable consent, identification, opt-out, calling-time or Do-Not-Call requirements.',
    'Unlawful spoofing or falsification of calling line identity, or attempts to interfere with legally required caller-authentication measures such as STIR/SHAKEN.',
    'Transmission of malware, harmful software or content designed to compromise systems, equipment or accounts.',
    'Unauthorized access, credential abuse, denial-of-service activity or other actions that undermine system availability, integrity or confidentiality.',
    'Routing intended to disguise the true source, originating party, location, nature or purpose of telephone traffic.',
    'Infringing, harassing, defamatory, discriminatory or otherwise unlawful content or communications.',
    'Use of protected health information in a manner that requires a business associate agreement unless Comvoix has explicitly agreed to such an arrangement in writing.',
    'Reverse engineering or circumvention of technical protections in violation of applicable law or agreement terms.',
    'Resale or sharing of service access beyond permitted account or contractual rights.',
    'Failure to cooperate with lawful, reasonable inquiries relating to verification, suspected fraud, illegal traffic, traceback requests or compliance investigations.',
  ] },
  { title: 'Customer Responsibility', paragraphs: [
    'Customers remain responsible for their employees, subcontractors, downstream users and any other parties using services or credentials under their control. They must maintain appropriate authorization for calling, record legally required consents and disclosures, and provide accurate traffic source information when properly requested.',
  ] },
  { title: 'Preventive Controls and Enforcement', paragraphs: [
    'Where credible indicators of prohibited conduct or material security risk arise, Comvoix may monitor available service metadata, investigate the matter, restrict particular call routes, temporarily suspend access or terminate affected services, in accordance with the customer agreement and applicable law. Requests for information and corrective steps may be issued during an investigation.',
  ] },
  { title: 'Policy Updates', paragraphs: [
    'Comvoix may revise this AUP to respond to legal requirements, threat patterns or service changes. Updated terms will be published or communicated in a manner consistent with the governing agreement and applicable notice obligations.',
  ] },
  { title: 'Abuse Reporting', paragraphs: [
    'Report suspected service misuse or security concerns to {{contact:support}} or call {{contact:phone}}. Include relevant numbers, timestamps, call identifiers and a description of the concern where available.',
  ] },
];

export default function AcceptableUsePage() {
  return <LegalPage sectionNavigation title="Acceptable Use Policy" meta={['Updated March 1, 2026']} sections={sections} />;
}
