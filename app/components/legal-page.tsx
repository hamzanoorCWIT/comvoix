// import Link from 'next/link';
// import type { ReactNode } from 'react';
// import { LegalSectionsNav } from './legal-sections-nav';

// export type LegalSection = { title: string; paragraphs?: string[]; bullets?: string[]; address?: readonly string[]; links?: readonly (readonly [string, string])[] };
// export type LegalCta = { text: string; label: string; href: string };

// // Emails and phone numbers inside legal text become links; everything else is rendered as written.
// const CONTACT = /([\w.+-]+@[\w-]+\.[\w.-]+)|(\+1 \(\d{3}\) \d{3}-\d{4})/g;
// function rich(text: string): ReactNode {
//   const parts: ReactNode[] = []; let last = 0;
//   for (const match of text.matchAll(CONTACT)) {
//     const [hit, email, phone] = match; const at = match.index ?? 0;
//     if (at > last) parts.push(text.slice(last, at));
//     parts.push(email ? <a key={at} href={`mailto:${email}`}>{email}</a> : <a key={at} href={`tel:${phone!.replace(/[^\d+]/g, '')}`}>{hit}</a>);
//     last = at + hit.length;
//   }
//   if (last < text.length) parts.push(text.slice(last));
//   return parts.length ? parts : text;
// }

// export function LegalPage({ title, meta, intro, sections, cta, children, sectionNavigation = false }: { title: string; meta: string[]; intro?: string; sections: LegalSection[]; cta?: LegalCta; children?: ReactNode; sectionNavigation?: boolean }) {
//   const navigation = sections.map((section, index) => ({ id: `legal-section-${index + 1}`, title: section.title }));
//   return <main className={`pbx-page legal-page${sectionNavigation ? ' legal-page-with-nav' : ''}`}>
//     <div className="container legal-content">
//       <div className="product-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>{title}</span></div>
//       <h1>{title}</h1>
//       {meta.map(line => { const split = line.indexOf(': '); return <p className="legal-meta" key={line}>{split > 0 ? <><strong>{line.slice(0, split + 1)}</strong> {line.slice(split + 2)}</> : line}</p>; })}
//       {intro && <p className="legal-intro">{intro}</p>}
//       <div className={sectionNavigation ? 'legal-layout' : undefined}>
//       {sectionNavigation && <LegalSectionsNav sections={navigation} />}
//       <div className={sectionNavigation ? 'legal-article' : undefined}>
//       {sections.map((section, index) => <section key={section.title} id={sectionNavigation ? navigation[index].id : undefined} className={sectionNavigation ? 'legal-document-section' : undefined}>
//         <h2>{section.title}</h2>
//         {section.paragraphs?.map(text => <p key={text}>{rich(text)}</p>)}
//         {section.bullets && <ul>{section.bullets.map(item => <li key={item}>{rich(item)}</li>)}</ul>}
//         {section.address && <address className="legal-address">{section.address.map((line, i) => <span key={line}>{i > 0 && <br />}{i === 0 ? <strong>{line}</strong> : line}</span>)}</address>}
//         {section.links && <ul className="legal-links">{section.links.map(([label, href]) => <li key={href}><Link className="text-link" href={href}>{label} <span className="action-arrow" aria-hidden="true">↗</span></Link></li>)}</ul>}
//       </section>)}
//       {cta && <section className="legal-cta"><p>{cta.text}</p><Link className="button" href={cta.href}>{cta.label} <span className="action-arrow" aria-hidden="true">↗</span></Link></section>}
//       {children}
//       </div>
//       </div>
//     </div>
//   </main>;
// }

import Link from 'next/link';
import type { ReactNode } from 'react';
import { LegalSectionsNav } from './legal-sections-nav';
import { ProtectedContact, type ProtectedContactKey } from './protected-contact';

export type LegalSection = { title: string; paragraphs?: string[]; bullets?: string[]; address?: readonly string[]; links?: readonly (readonly [string, string])[] };
export type LegalCta = { text: string; label: string; href: string };

// Only explicit placeholders are replaced. Actual contact values stay server-side.
const TOKENS = /\{\{contact:(support|sales|phone)\}\}/g;
function rich(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKENS)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(<ProtectedContact key={start} contact={match[1] as ProtectedContactKey} />);
    last = start + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}

export function LegalPage({ title, meta, intro, sections, cta, children, sectionNavigation = false }: { title: string; meta: string[]; intro?: string; sections: LegalSection[]; cta?: LegalCta; children?: ReactNode; sectionNavigation?: boolean }) {
  const navigation = sections.map((section, index) => ({ id: `legal-section-${index + 1}`, title: section.title }));
  return <main className={`pbx-page legal-page${sectionNavigation ? ' legal-page-with-nav' : ''}`}>
    <div className="container legal-content">
      <div className="product-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>{title}</span></div>
      <h1>{title}</h1>
      {meta.map(line => { const split = line.indexOf(': '); return <p className="legal-meta" key={line}>{split > 0 ? <><strong>{line.slice(0, split + 1)}</strong> {line.slice(split + 2)}</> : line}</p>; })}
      {intro && <p className="legal-intro">{intro}</p>}
      <div className={sectionNavigation ? 'legal-layout' : undefined}>
        {sectionNavigation && <LegalSectionsNav sections={navigation} />}
        <div className={sectionNavigation ? 'legal-article' : undefined}>
          {sections.map((section, index) => <section key={section.title} id={sectionNavigation ? navigation[index].id : undefined} className={sectionNavigation ? 'legal-document-section' : undefined}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map(text => <p key={text}>{rich(text)}</p>)}
            {section.bullets && <ul>{section.bullets.map(item => <li key={item}>{rich(item)}</li>)}</ul>}
            {section.address && <address className="legal-address">{section.address.map((line, i) => <span key={line}>{i > 0 && <br />}{i === 0 ? <strong>{line}</strong> : line}</span>)}</address>}
            {section.links && <ul className="legal-links">{section.links.map(([label, href]) => <li key={href}><Link className="text-link" href={href}>{label} <span className="action-arrow" aria-hidden="true">↗</span></Link></li>)}</ul>}
          </section>)}
          {cta && <section className="legal-cta"><p>{cta.text}</p><Link className="button" href={cta.href}>{cta.label} <span className="action-arrow" aria-hidden="true">↗</span></Link></section>}
          {children}
        </div>
      </div>
    </div>
  </main>;
}
