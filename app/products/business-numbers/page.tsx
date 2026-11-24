import type { Metadata } from "next";
import Link from "next/link";
import { NumbersArt, NumberTypeIcon } from "../../components/numbers-art";
import { NumbersHeroArt } from "../../components/product-hero-art";
import { DemoRequest } from "../../components/demo-request";
import { StatNumber } from "../../components/stat-number";
import { Waves } from "../../components/visuals";

export const metadata: Metadata = {
  title: "Business Numbers — Comvoix",
  description: "Local, national, toll-free and international business numbers. Build a professional presence across markets and route incoming calls through one flexible Comvoix platform.",
};
const numberTypes = [
  { kind: "national", title: "National Numbers", text: "Create a consistent national business identity with phone numbers that are not limited to a particular city or geographical area." },
  { kind: "local", title: "Local Numbers", text: "Strengthen customer confidence with geographically recognizable numbers that help your company establish a familiar local presence." },
  { kind: "toll-free", title: "Toll-Free Numbers", text: "Make customer communication more convenient by offering numbers that allow callers to reach your business without direct calling charges." },
  { kind: "international", title: "International Numbers", text: "Connect with customers in overseas markets using international business numbers that route calls to your current operations." },
] as const;
const useCases = [
  ["International Market Expansion", "Establish a professional presence in new countries and regions without requiring physical offices."],
  ["Customer Service Operations", "Create dedicated contact numbers for departments such as sales, customer care and technical support."],
  ["Multi-Office Businesses", "Organize and manage business numbers across different offices, geographical locations and operational markets."],
  ["Distributed and Remote Teams", "Maintain consistent business accessibility even when employees work from separate locations."],
];

export default function BusinessNumbersPage() {
  return <><Waves /><main className="pbx-page numbers-page">
    <section className="container pbx-hero">
      <div className="product-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Products</span><span aria-hidden="true">/</span><span>Business Numbers</span></div><div className="product-hero-copy"><span className="eyebrow"><i />Business Numbers</span><h1>Professional Business Numbers for a <em>Connected World</em></h1><p>Build a stronger presence in important markets with local, national, toll-free and international phone numbers. Manage your business connectivity through one flexible Comvoix platform.</p><a className="button" href="#demo">Get Your Business Number <span aria-hidden="true"><span className="action-arrow" aria-hidden="true">↗</span></span></a></div>
      <div className="glass pbx-hero-art"><div className="panel-top"><code>local presence. global possibilities.</code></div><NumbersHeroArt /><div className="pbx-art-tags"><span>Your number</span><span>Your market</span><span>Your business</span></div></div>
    </section>
    <section className="container pbx-overview"><div><span className="eyebrow"><i />Closer to Your Customers</span><h2>Build a Local Presence in <em>Every Market</em></h2></div><div><p>Connect with customers across different locations without establishing physical offices in every region. Professional business numbers make your organization accessible through familiar contact options while directing incoming calls to your existing employees, locations or communication systems.</p><p>Whether you’re growing internationally or serving customers across multiple markets, our numbering solutions help maintain consistent accessibility.</p></div></section>
    <section className="container numbers-types"><div className="pbx-centered"><span className="eyebrow"><i />A Number That Fits</span><h2>Find the Right Number for <em>Every Business Need</em></h2></div><div className="number-type-grid">{numberTypes.map((item,i)=><article className="glass number-type-card" key={item.kind}><div className="number-card-top"><NumberTypeIcon kind={item.kind}/><span>0{i+1}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="container pbx-split numbers-routing"><div className="glass pbx-scene"><NumbersArt scene="routing"/></div><div><span className="eyebrow"><i />Connected Your Way</span><h2>One Business Number. <em>Multiple Connection Possibilities.</em></h2><p>Your business communication shouldn’t be restricted to a single office or physical telephone line. With Comvoix, incoming calls can be directed to the appropriate teams, offices or compatible phone systems based on your communication requirements.</p><a className="button button-secondary" href="#demo">Request a Demo <span className="action-arrow" aria-hidden="true">↗</span></a></div></section>
    <section className="container numbers-operations"><div className="numbers-operations-intro"><span className="eyebrow"><i />Ready for the Way You Work</span><h2>Business Numbers That <em>Adapt to Your Operations</em></h2><p>Whether you’re expanding into new territories, supporting distributed employees or managing customer enquiries, our business number solutions help keep your organization accessible.</p></div><div className="numbers-use-cases">{useCases.map(([title,text],i)=><article key={title}><span className="use-case-index">0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
    <section className="container numbers-network"><div className="pbx-centered"><span className="eyebrow"><i />Reliability at Every Connection</span><h2>A Voice Network Built for <em>Dependable Connectivity</em></h2></div><div className="pbx-stats">{[
      ['24/7','Monitoring','Proactive observation of network traffic and infrastructure supports reliable communication performance.'],
      ['99.97%','Uptime SLA','A defined infrastructure availability commitment helps support consistent business calling.'],
      ['60+','Calling Destinations','Extend your organization’s communication reach across more than 60 international destinations.'],
    ].map(([value,title,text])=><article key={title}><StatNumber value={value} /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="container pbx-final"><span className="eyebrow"><i />Be There When It Matters</span><h2>Make Your Business Accessible <em>Wherever Customers Need You</em></h2><p>Discover flexible business numbers designed to support local relationships and international growth.</p><a href="#demo" className="button">Request a Demo <span className="action-arrow" aria-hidden="true">↗</span></a></section>
    <section className="container pbx-demo" id="demo"><div><span className="eyebrow"><i />Let’s Talk Business Numbers</span><h2>Your next market.<br/><em>Your business number.</em></h2><p>Tell us about the markets, number types and call destinations your business needs.</p><Link className="text-link" href="/products/cloud-pbx">Explore Cloud PBX <span className="action-arrow" aria-hidden="true">↗</span></Link></div><div className="glass"><DemoRequest product="Business Numbers" /></div></section>
  </main></>;
}
