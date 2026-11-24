import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '../components/legal-page';

export const metadata: Metadata = { title: 'Trust & Responsible Communications — Comvoix', description: 'Trustworthy calling starts with responsible customer access, transparent traffic and clear operating standards. Comvoix is committed to supporting legitimate business communication through structured review and appropriate safeguards.' };

const sections: LegalSection[] = [
  { title: 'Know the Businesses We Connect', paragraphs: [
    'Our customer onboarding approach may review registration records, operating locations, business activities, management or ownership details, websites and the declared purpose of the proposed communication services. Incomplete or inconsistent submissions can require further verification before access is granted.',
  ] },
  { title: 'A Defined Approval Process', paragraphs: [
    'Customer access is subject to an assessment of the submitted information and expected use. An application may be approved, approved subject to conditions, placed on hold for further documentation or declined when service risks cannot be acceptably addressed.',
    'Review  •  Verify  •  Assess  •  Decide',
  ] },
  { title: 'Responsible Calling Standards', bullets: [
    'Calling identity — Businesses should provide truthful information about the entity responsible for their communications.',
    'Consent and permissions — Customers should have an appropriate lawful basis for calling and be prepared to substantiate required consent.',
    'Traffic accountability — Customers should describe relevant calling sources, destinations, volumes and use cases accurately.',
  ] },
  { title: 'Responding to Concerning Activity', paragraphs: [
    'Comvoix may investigate suspicious usage and, where authorized by contract and law, restrict, block, suspend or discontinue traffic associated with fraudulent campaigns, unlawful robocalls, materially inaccurate onboarding data or failure to cooperate with legitimate compliance requests.',
  ] },
  { title: 'Compliance Controls', bullets: [
    'Customer due diligence: review business identity and intended services before activation.',
    'Caller authentication: apply STIR/SHAKEN and related measures where required and technically applicable [VERIFY DEPLOYMENT].',
    'Traceback cooperation: maintain procedures for legitimate traceback requests [VERIFY ANY PROMISED RESPONSE WINDOW BEFORE PUBLISHING].',
    'Documented response: use proportionate operational restrictions when abuse or material violations are identified.',
  ] },
  { title: 'Policies Supporting Transparency', paragraphs: [
    'Customers can review the Privacy Policy, CPNI Policy, Terms of Service and Acceptable Use Policy for fuller explanations of information handling, service responsibilities and permissible communication activities.',
  ], links: [['Privacy Policy', '/privacy'], ['CPNI Policy', '/cpni'], ['Terms of Service', '/terms'], ['Acceptable Use Policy', '/acceptable-use']] },
];

export default function TrustPage() {
  return <LegalPage sectionNavigation
    title="Trust & Responsible Communications"
    meta={[]}
    intro="Trustworthy calling starts with responsible customer access, transparent traffic and clear operating standards. Comvoix is committed to supporting legitimate business communication through structured review and appropriate safeguards."
    sections={sections}
    cta={{ text: 'Build business communication on accountability. Talk with the Comvoix team about your services, onboarding requirements and voice connectivity goals.', label: 'Speak With Our Team', href: '/#start' }}
  />;
}
