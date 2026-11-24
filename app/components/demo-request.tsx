import { ContactForm } from './contact-form';

export function DemoRequest({ product = 'Cloud PBX' }: { product?: string }) {
  return <ContactForm subject={`${product} demo request`} />;
}
