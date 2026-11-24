import type { Metadata } from 'next';
import Link from 'next/link';
import { Waves } from '../components/visuals';
import { IndustriesArt, IndustryIcon } from '../components/industries-art';
import { DemoRequest } from '../components/demo-request';
import { industries, industriesHero, organizations, industriesClosing } from '../industries-content';

export const metadata: Metadata = { title: 'Industries — Comvoix', description: industriesHero.description };

export default function IndustriesPage() {
  return <><Waves /><main className="pbx-page industries-page">
    <section className="container pbx-hero"><div className="product-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Industries</span></div><div className="product-hero-copy"><span className="eyebrow"><i />Industries</span><h1>{industriesHero.heading} <em>{industriesHero.emphasis}</em></h1><p>{industriesHero.description}</p><a className="button" href="#demo">Request a Demo <span className="action-arrow" aria-hidden="true">↗</span></a></div><div className="glass pbx-hero-art"><div className="panel-top"><code>one platform / every industry</code></div><IndustriesArt label="Nine industries connected through one Comvoix communication platform" /><div className="pbx-art-tags"><span>Cloud calling</span><span>Business numbers</span><span>Voice connectivity</span></div></div></section>
    <section className="container industries-grid-section" aria-labelledby="industries-heading"><div className="pbx-centered"><span className="eyebrow"><i />Industries We Serve</span><h2 id="industries-heading">Communication Built Around <em>How Your Industry Works</em></h2></div><div className="sip-three-grid">{industries.map(industry => <article className="glass sip-service-card" key={industry.name}><IndustryIcon kind={industry.icon} /><h3>{industry.name}</h3><p>{industry.text}</p></article>)}</div></section>
    <section className="container numbers-operations industries-organizations"><div><span className="eyebrow"><i />Built for Every Conversation</span><h2>{organizations.title}</h2><p>{organizations.description}</p><a className="text-link" href="#demo">Discuss Your Requirements <span className="action-arrow" aria-hidden="true">↗</span></a></div><div className="numbers-use-cases">{organizations.items.map(([title, text], i) => <article key={title}><span className="use-case-index">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
    <section className="container pbx-final"><span className="eyebrow"><i />Your Industry, Your Requirements</span><h2>{industriesClosing.title}</h2><p>{industriesClosing.description}</p><a href="#demo" className="button">Request a Demo <span className="action-arrow" aria-hidden="true">↗</span></a></section>
    <section className="container pbx-demo" id="demo"><div><span className="eyebrow"><i />Let’s Talk About Your Industry</span><h2>Your operations.<br /><em>Your next connection.</em></h2><p>Tell us about your industry, locations, teams and the communication requirements behind your daily operations.</p></div><div className="glass"><DemoRequest product="Industries" /></div></section>
  </main></>;
}
