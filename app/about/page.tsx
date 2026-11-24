import type { Metadata } from 'next';
import { StatNumber } from '../components/stat-number';
import Link from 'next/link';
import { Waves } from '../components/visuals';
import { AboutArt } from '../components/about-art';
import { aboutHero, aboutStory, aboutPillars, aboutStats, aboutPrinciples, aboutSupport } from '../about-content';

export const metadata: Metadata = { title: 'About Comvoix — Comvoix', description: aboutHero.description };

export default function AboutPage() {
  return <><Waves /><main className="pbx-page about-page">
    <section className="container pbx-hero"><div className="product-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>About Comvoix</span></div><div className="product-hero-copy"><span className="eyebrow"><i />About Comvoix</span><h1>{aboutHero.heading} <em>{aboutHero.emphasis}</em></h1><p>{aboutHero.description}</p><a className="button" href="#support">Talk to Our Team <span className="action-arrow" aria-hidden="true">↗</span></a></div><div className="glass pbx-hero-art"><div className="panel-top"><code>comvoix / communication for modern operations</code></div><AboutArt label="Comvoix services evolving from IP voice to Cloud PBX, business numbers, SIP trunking and voice services" /><div className="pbx-art-tags"><span>Cloud voice</span><span>Reliable connectivity</span><span>Built for growth</span></div></div></section>
    <section className="container pbx-overview"><div><span className="eyebrow"><i />Who We Are</span><h2>{aboutStory.title} <em>{aboutStory.emphasis}</em></h2></div><div>{aboutStory.paragraphs.map(text => <p key={text}>{text}</p>)}</div></section>
    <section className="container about-pillars" aria-label="Mission and vision">{aboutPillars.map(pillar => <article className="glass sip-service-card" key={pillar.label}><span className="eyebrow"><i />{pillar.label}</span><h3>{pillar.title}</h3><p>{pillar.text}</p></article>)}</section>
    <section className="container about-performance"><div className="pbx-centered"><span className="eyebrow"><i />Our Performance</span><h2>Built on Dependable <em>Service Delivery</em></h2></div><div className="pbx-stats">{aboutStats.map(([number, title, text]) => <article key={title}><StatNumber value={number} /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="container about-principles"><div className="pbx-centered"><span className="eyebrow"><i />Our Values</span><h2>The Principles Behind <em>Everything We Do</em></h2><p>{aboutPrinciples.description}</p></div><div className="number-type-grid">{aboutPrinciples.items.map(([title, text], i) => <article className="glass number-type-card" key={title}><span className="sip-card-index">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="container pbx-final" id="support"><span className="eyebrow"><i />Here to Help</span><h2>{aboutSupport.title}</h2><p>{aboutSupport.description}</p>{aboutSupport.email ? <a className="button" href={`mailto:${aboutSupport.email}`}>Email {aboutSupport.email} <span className="action-arrow" aria-hidden="true">↗</span></a> : <Link className="button" href="/#start">Contact Support <span className="action-arrow" aria-hidden="true">↗</span></Link>}</section>
  </main></>;
}
