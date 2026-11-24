// import type { Metadata } from 'next';
// import { LegalPage, type LegalSection } from '../components/legal-page';

// export const metadata: Metadata = { title: 'Terms of Service — Comvoix', description: 'The terms governing the relationship between Comvoix and customers purchasing or using its telecommunications, cloud voice and associated platform services.' };

// const sections: LegalSection[] = [
//   { title: '1. Agreement and Eligibility', paragraphs: [
//     'These Terms of Service govern the relationship between Comvoix and the customer purchasing or using its telecommunications, cloud voice and associated platform services (the "Services"). By subscribing, accessing or using the Services, the customer agrees to these Terms and incorporated policies. Customers must maintain accurate registration details, any required authorized payment method and an internet connection suitable for internet-dependent services. Third-party connectivity remains outside our direct control.',
//   ] },
//   { title: '2. Authorized Administrators and Contacts', paragraphs: [
//     'Each customer may appoint administrators who can manage user access, numbers, service configuration and account changes within the permissions assigned to them. Account contacts may receive invoices, service notices and security notifications. The customer must ensure these designations and contact details remain current.',
//   ] },
//   { title: '3. Service Packages and Modifications', paragraphs: [
//     'Available functions, supported destinations and plan components may change to reflect operational, legal or commercial requirements. We will provide notice of material changes where required by contract or law. [CONFIRM NOTICE PERIODS AND ANY 30-DAY COMMITMENTS.]',
//   ] },
//   { title: '4. Rates, Usage Charges and Taxes', paragraphs: [
//     'The customer is responsible for subscription fees, activation or setup charges, usage-based call charges, number fees, porting costs and other rates stated in the applicable order, rate schedule or customer portal. Taxes, governmental assessments and regulatory surcharges may apply in addition. Changes in pricing will be communicated according to the governing agreement and applicable law.',
//   ] },
//   { title: '5. Payment, Invoices and Overdue Balances', paragraphs: [
//     'Invoices and payment deadlines are governed by the agreed billing arrangements. Failure to pay may result in restrictions or suspension after any required notice. Comvoix may seek lawful recovery of unpaid balances and charge late fees only where disclosed, agreed and permitted. [INSERT APPROVED LATE-FEE RATE, PAYMENT TERMS AND BILLING DISPUTE PROCESS.]',
//   ] },
//   { title: '6. Suspension, Cancellation and Refunds', paragraphs: [
//     'Customers may cancel services according to their order terms and the applicable notice period. Comvoix may restrict or terminate access for material breach, unlawful traffic, security threats, nonpayment or regulatory requirements, subject to applicable notice obligations. Any refund of unused prepaid funds and any nonrefundable charges must be described in the customer’s approved service agreement. [CONFIRM TERMINATION NOTICE AND REFUND POLICY.]',
//   ] },
//   { title: '7. Call Rating and Billing Units', paragraphs: [
//     'Call duration, charging triggers, billing increments and rounding rules are determined by the contracted rate schedule and technical billing methodology. Customers should review service-specific billing rules before activating chargeable traffic. [VERIFY WHETHER BILLING BEGINS AT SIP INVITE, ANSWER, OR ANOTHER EVENT.]',
//   ] },
//   { title: '8. Account Security and Unauthorized Traffic', paragraphs: [
//     'Customers must safeguard credentials, access permissions, SIP endpoints and connected equipment. They are responsible for charges attributable to activity conducted using their accounts as provided in the applicable agreement and permitted by law. Suspected compromise must be reported promptly; we may apply reasonable security restrictions to reduce fraud or harm.',
//   ] },
//   { title: '9. Feedback and Custom Development', paragraphs: [
//     'Customers may offer feedback about features and service improvements. Rights to suggestions, deliverables, custom integrations and their intellectual property should be governed by any written development or licensing agreement. [DO NOT ASSUME ALL CUSTOMER-SUGGESTED IP TRANSFERS TO COMVOIX WITHOUT EXPRESS AGREEMENT.]',
//   ] },
//   { title: '10. Emergency Calling', paragraphs: [
//     'Emergency calling support varies by service and geographic availability. Customers must review the emergency dialing specifications associated with each subscribed service and maintain an appropriate alternative where necessary. [CRITICAL: CONFIRM 911/E911 SUPPORT AND PROVIDE JURISDICTION-SPECIFIC DISCLOSURES BEFORE PUBLICATION.]',
//   ] },
//   { title: '11. Telephone Numbers and Porting', paragraphs: [
//     'Assignment, retention and transfer of telephone numbers depend on availability, service eligibility, local rules, provider processes and applicable porting regulations. Customers must provide valid authorization and accurate information when requesting number transfers. Timing may be affected by third-party carriers and regulatory requirements.',
//   ] },
//   { title: '12. International Destination Availability', paragraphs: [
//     'Calling capability can vary by country, destination type, sanctions restrictions, network interconnection and fraud controls. Some routes, including premium, satellite, maritime or sanctioned destinations, may be blocked or unavailable. Published coverage does not guarantee delivery to every number.',
//   ] },
//   { title: '13. Restrictions on Service Access', paragraphs: [
//     'Customers must not attempt to bypass access controls, reverse-engineer protected systems unlawfully, interfere with network stability, resell access without permission or use the platform in violation of applicable laws or the Acceptable Use Policy. Rights to use Comvoix systems are limited to those expressly granted.',
//   ] },
//   { title: '14. Confidential Information', paragraphs: [
//     'Nonpublic pricing, network configuration, software details, operational information and customer records disclosed in connection with the service should be protected against unauthorized disclosure, subject to legitimate legal exceptions. [INSERT APPROVED TERM OF CONFIDENTIALITY AND EXCLUSIONS.]',
//   ] },
//   { title: '15. Dispute Resolution', paragraphs: [
//     'Customer disputes should first be raised through the applicable support and billing escalation channels. Any mandatory arbitration requirements, venue, administering body and exceptions must be set out in a separately approved, enforceable clause. [INSERT LEGAL-APPROVED DISPUTE RESOLUTION LANGUAGE.]',
//   ] },
//   { title: '16. Jury Trial or Class Action Waiver', paragraphs: [
//     'Any jury-trial or class-action waiver, if intended, must be drafted and approved for the applicable jurisdiction and customers. [PLACEHOLDER: DO NOT PUBLISH AN UNREVIEWED WAIVER.]',
//   ] },
//   { title: '17. Limits on Liability', paragraphs: [
//     'To the extent allowed by applicable law, the parties may agree to exclude specified indirect losses and set a reasonable aggregate liability cap. These limits and their exceptions must be expressly disclosed in the signed agreement. [INSERT APPROVED LIABILITY CAP AND CARVE-OUTS; DO NOT ASSUME SIX MONTHS OF FEES.]',
//   ] },
//   { title: '18. Warranty Terms', paragraphs: [
//     'Service commitments, maintenance windows, uptime guarantees, credits and any warranty exclusions are controlled by the subscribed service agreement or SLA. Any disclaimer of implied warranties applies only where legally permitted. [VERIFY SERVICE WARRANTY AND SLA SCOPE.]',
//   ] },
//   { title: '19. Indemnification', paragraphs: [
//     'Responsibility for third-party claims relating to unlawful traffic, infringement, service misuse or contract violations should be allocated through an approved indemnity provision. [COUNSEL TO CONFIRM SCOPE, DEFENSE CONTROL AND EXCLUSIONS.]',
//   ] },
//   { title: '20. Regulatory and Lawful Use', paragraphs: [
//     'Customers are responsible for complying with the laws governing their calling campaigns and communications, including consent, caller identity, do-not-call restrictions, recording notifications and telemarketing standards. Comvoix may investigate credible misuse and restrict traffic when reasonably necessary to protect users, carriers and networks.',
//   ] },
//   { title: '21. Applicable Law and Jurisdiction', paragraphs: [
//     'The governing law and jurisdiction will be those named in the executed customer agreement. [INSERT VERIFIED COMVOIX LEGAL ENTITY, GOVERNING LAW AND VENUE; DO NOT REUSE THE REFERENCE PROVIDER’S MARYLAND TERMS AUTOMATICALLY.]',
//   ] },
//   { title: '22. Notices and Communications', paragraphs: [
//     'Service notices and requests may be delivered through the verified support email, approved service portal or other communication channel identified in the agreement. Customers should keep their administrative and billing contact details updated.',
//   ] },
//   { title: '23. Entire Agreement', paragraphs: [
//     'These Terms, the applicable signed service order, approved schedules and incorporated policies constitute the agreement for the subscribed Services, except where a signed document expressly provides otherwise.',
//   ] },
//   { title: '24. Severability', paragraphs: [
//     'If a provision is held unenforceable, the remaining terms remain effective to the extent permitted by law.',
//   ] },
//   { title: '25. No Waiver', paragraphs: [
//     'Failure to enforce a provision immediately does not automatically waive the right to enforce it in a future circumstance.',
//   ] },
//   { title: '26. Continuing Obligations', paragraphs: [
//     'Clauses intended by their nature to continue after an account closes—including confidentiality, outstanding payments, lawful-use responsibilities and approved liability provisions—remain effective to the extent enforceable.',
//   ] },
//   { title: '27. Contact Information', paragraphs: [
//     'Questions, contractual notices and account requests should be sent to support@comvoix.com, by phone to +1 302-485-5838, or by mail to our business mailing address:',
//   ], address: ['ComVoix, LLC', '1000 N West St, Suite 1200', 'Wilmington, DE 19801'] },
// ];

// export default function TermsPage() {
//   return <LegalPage sectionNavigation title="Terms of Service" meta={['Updated March 1, 2026']} sections={sections} />;
// }


import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '../components/legal-page';

export const metadata: Metadata = { title: 'Terms of Service — Comvoix', description: 'The terms governing the relationship between Comvoix and customers purchasing or using its telecommunications, cloud voice and associated platform services.' };

const sections: LegalSection[] = [
  { title: '1. Agreement and Eligibility', paragraphs: [
    'These Terms of Service govern the relationship between Comvoix and the customer purchasing or using its telecommunications, cloud voice and associated platform services (the "Services"). By subscribing, accessing or using the Services, the customer agrees to these Terms and incorporated policies. Customers must maintain accurate registration details, any required authorized payment method and an internet connection suitable for internet-dependent services. Third-party connectivity remains outside our direct control.',
  ] },
  { title: '2. Authorized Administrators and Contacts', paragraphs: [
    'Each customer may appoint administrators who can manage user access, numbers, service configuration and account changes within the permissions assigned to them. Account contacts may receive invoices, service notices and security notifications. The customer must ensure these designations and contact details remain current.',
  ] },
  { title: '3. Service Packages and Modifications', paragraphs: [
    'Available functions, supported destinations and plan components may change to reflect operational, legal or commercial requirements. We will provide notice of material changes where required by contract or law. [CONFIRM NOTICE PERIODS AND ANY 30-DAY COMMITMENTS.]',
  ] },
  { title: '4. Rates, Usage Charges and Taxes', paragraphs: [
    'The customer is responsible for subscription fees, activation or setup charges, usage-based call charges, number fees, porting costs and other rates stated in the applicable order, rate schedule or customer portal. Taxes, governmental assessments and regulatory surcharges may apply in addition. Changes in pricing will be communicated according to the governing agreement and applicable law.',
  ] },
  { title: '5. Payment, Invoices and Overdue Balances', paragraphs: [
    'Invoices and payment deadlines are governed by the agreed billing arrangements. Failure to pay may result in restrictions or suspension after any required notice. Comvoix may seek lawful recovery of unpaid balances and charge late fees only where disclosed, agreed and permitted. [INSERT APPROVED LATE-FEE RATE, PAYMENT TERMS AND BILLING DISPUTE PROCESS.]',
  ] },
  { title: '6. Suspension, Cancellation and Refunds', paragraphs: [
    'Customers may cancel services according to their order terms and the applicable notice period. Comvoix may restrict or terminate access for material breach, unlawful traffic, security threats, nonpayment or regulatory requirements, subject to applicable notice obligations. Any refund of unused prepaid funds and any nonrefundable charges must be described in the customer’s approved service agreement. [CONFIRM TERMINATION NOTICE AND REFUND POLICY.]',
  ] },
  { title: '7. Call Rating and Billing Units', paragraphs: [
    'Call duration, charging triggers, billing increments and rounding rules are determined by the contracted rate schedule and technical billing methodology. Customers should review service-specific billing rules before activating chargeable traffic. [VERIFY WHETHER BILLING BEGINS AT SIP INVITE, ANSWER, OR ANOTHER EVENT.]',
  ] },
  { title: '8. Account Security and Unauthorized Traffic', paragraphs: [
    'Customers must safeguard credentials, access permissions, SIP endpoints and connected equipment. They are responsible for charges attributable to activity conducted using their accounts as provided in the applicable agreement and permitted by law. Suspected compromise must be reported promptly; we may apply reasonable security restrictions to reduce fraud or harm.',
  ] },
  { title: '9. Feedback and Custom Development', paragraphs: [
    'Customers may offer feedback about features and service improvements. Rights to suggestions, deliverables, custom integrations and their intellectual property should be governed by any written development or licensing agreement. [DO NOT ASSUME ALL CUSTOMER-SUGGESTED IP TRANSFERS TO COMVOIX WITHOUT EXPRESS AGREEMENT.]',
  ] },
  { title: '10. Emergency Calling', paragraphs: [
    'Emergency calling support varies by service and geographic availability. Customers must review the emergency dialing specifications associated with each subscribed service and maintain an appropriate alternative where necessary. [CRITICAL: CONFIRM 911/E911 SUPPORT AND PROVIDE JURISDICTION-SPECIFIC DISCLOSURES BEFORE PUBLICATION.]',
  ] },
  { title: '11. Telephone Numbers and Porting', paragraphs: [
    'Assignment, retention and transfer of telephone numbers depend on availability, service eligibility, local rules, provider processes and applicable porting regulations. Customers must provide valid authorization and accurate information when requesting number transfers. Timing may be affected by third-party carriers and regulatory requirements.',
  ] },
  { title: '12. International Destination Availability', paragraphs: [
    'Calling capability can vary by country, destination type, sanctions restrictions, network interconnection and fraud controls. Some routes, including premium, satellite, maritime or sanctioned destinations, may be blocked or unavailable. Published coverage does not guarantee delivery to every number.',
  ] },
  { title: '13. Restrictions on Service Access', paragraphs: [
    'Customers must not attempt to bypass access controls, reverse-engineer protected systems unlawfully, interfere with network stability, resell access without permission or use the platform in violation of applicable laws or the Acceptable Use Policy. Rights to use Comvoix systems are limited to those expressly granted.',
  ] },
  { title: '14. Confidential Information', paragraphs: [
    'Nonpublic pricing, network configuration, software details, operational information and customer records disclosed in connection with the service should be protected against unauthorized disclosure, subject to legitimate legal exceptions. [INSERT APPROVED TERM OF CONFIDENTIALITY AND EXCLUSIONS.]',
  ] },
  { title: '15. Dispute Resolution', paragraphs: [
    'Customer disputes should first be raised through the applicable support and billing escalation channels. Any mandatory arbitration requirements, venue, administering body and exceptions must be set out in a separately approved, enforceable clause. [INSERT LEGAL-APPROVED DISPUTE RESOLUTION LANGUAGE.]',
  ] },
  { title: '16. Jury Trial or Class Action Waiver', paragraphs: [
    'Any jury-trial or class-action waiver, if intended, must be drafted and approved for the applicable jurisdiction and customers. [PLACEHOLDER: DO NOT PUBLISH AN UNREVIEWED WAIVER.]',
  ] },
  { title: '17. Limits on Liability', paragraphs: [
    'To the extent allowed by applicable law, the parties may agree to exclude specified indirect losses and set a reasonable aggregate liability cap. These limits and their exceptions must be expressly disclosed in the signed agreement. [INSERT APPROVED LIABILITY CAP AND CARVE-OUTS; DO NOT ASSUME SIX MONTHS OF FEES.]',
  ] },
  { title: '18. Warranty Terms', paragraphs: [
    'Service commitments, maintenance windows, uptime guarantees, credits and any warranty exclusions are controlled by the subscribed service agreement or SLA. Any disclaimer of implied warranties applies only where legally permitted. [VERIFY SERVICE WARRANTY AND SLA SCOPE.]',
  ] },
  { title: '19. Indemnification', paragraphs: [
    'Responsibility for third-party claims relating to unlawful traffic, infringement, service misuse or contract violations should be allocated through an approved indemnity provision. [COUNSEL TO CONFIRM SCOPE, DEFENSE CONTROL AND EXCLUSIONS.]',
  ] },
  { title: '20. Regulatory and Lawful Use', paragraphs: [
    'Customers are responsible for complying with the laws governing their calling campaigns and communications, including consent, caller identity, do-not-call restrictions, recording notifications and telemarketing standards. Comvoix may investigate credible misuse and restrict traffic when reasonably necessary to protect users, carriers and networks.',
  ] },
  { title: '21. Applicable Law and Jurisdiction', paragraphs: [
    'The governing law and jurisdiction will be those named in the executed customer agreement. [INSERT VERIFIED COMVOIX LEGAL ENTITY, GOVERNING LAW AND VENUE; DO NOT REUSE THE REFERENCE PROVIDER’S MARYLAND TERMS AUTOMATICALLY.]',
  ] },
  { title: '22. Notices and Communications', paragraphs: [
    'Service notices and requests may be delivered through the verified support email, approved service portal or other communication channel identified in the agreement. Customers should keep their administrative and billing contact details updated.',
  ] },
  { title: '23. Entire Agreement', paragraphs: [
    'These Terms, the applicable signed service order, approved schedules and incorporated policies constitute the agreement for the subscribed Services, except where a signed document expressly provides otherwise.',
  ] },
  { title: '24. Severability', paragraphs: [
    'If a provision is held unenforceable, the remaining terms remain effective to the extent permitted by law.',
  ] },
  { title: '25. No Waiver', paragraphs: [
    'Failure to enforce a provision immediately does not automatically waive the right to enforce it in a future circumstance.',
  ] },
  { title: '26. Continuing Obligations', paragraphs: [
    'Clauses intended by their nature to continue after an account closes—including confidentiality, outstanding payments, lawful-use responsibilities and approved liability provisions—remain effective to the extent enforceable.',
  ] },
  { title: '27. Contact Information', paragraphs: [
    'Questions, contractual notices and account requests should be sent to {{contact:support}}, by phone to {{contact:phone}}, or by mail to our business mailing address:',
  ], address: ['ComVoix, LLC', '1000 N West St, Suite 1200', 'Wilmington, DE 19801'] },
];

export default function TermsPage() {
  return <LegalPage sectionNavigation title="Terms of Service" meta={['Updated March 1, 2026']} sections={sections} />;
}
