import type { Metadata } from "next";
import { StatNumber } from '../../components/stat-number';
import Link from "next/link";
import { RemoteWorkArt, ReliabilityArt } from "../../components/cloud-pbx-art";
import { ProductSceneArt } from "../../components/product-scene-art";
import { DemoRequest } from "../../components/demo-request";
import { Waves } from "../../components/visuals";

export const metadata: Metadata = {
  title: "Cloud PBX — Comvoix",
  description: "A secure, flexible cloud phone system for connected businesses. Manage users, extensions and business calling across locations with Comvoix Cloud PBX.",
};

export default function CloudPbxPage() {
  return <><Waves /><main className="pbx-page">
    <section className="container pbx-hero">
      <div className="product-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Products</span><span aria-hidden="true">/</span><span>Cloud PBX</span></div><div className="product-hero-copy">
        <span className="eyebrow"><i />Cloud PBX</span><h1>Smarter Cloud PBX Solutions for <em>Connected Businesses</em></h1><p>Transform your business communication with a secure, flexible cloud phone system. Keep employees connected, streamline everyday calling and expand your communication capabilities as your organization grows.</p><a href="#demo" className="button">Schedule a Demo <span aria-hidden="true"><span className="action-arrow" aria-hidden="true">↗</span></span></a>
      </div><div className="glass pbx-hero-art"><div className="panel-top"><code>your business, connected</code><span className="lime">● Cloud PBX</span></div><ProductSceneArt kind="pbx-console" label="Cloud PBX: an extension update in the console, synced to every device"/><div className="pbx-art-tags"><span>Cloud powered</span><span>Flexible calling</span><span>Connected teams</span></div></div>
    </section>
    <section className="container pbx-overview" id="explore"><div><span className="eyebrow"><i />Built to Grow with You</span><h2>A Flexible Phone System Designed for <em>Business Growth</em></h2></div><div><p>Comvoix Cloud PBX brings essential business calling functions into a centralized, cloud-powered environment. Instead of depending on conventional telephone infrastructure, your organization can manage extensions, users and communication features through one convenient platform.</p><p>Whether your employees work on-site, remotely or across multiple offices, our solution helps maintain seamless connectivity and efficient communication.</p><div className="pbx-feature-list"><span>01 / Users</span><span>02 / Extensions</span><span>03 / Calling features</span></div></div></section>
    <section className="container pbx-split"><div className="glass pbx-scene"><RemoteWorkArt /></div><div><span className="eyebrow"><i />Work Without Boundaries</span><h2>Stay Connected From <em>Any Location</em></h2><p>Give your team the freedom to communicate effectively, wherever work takes them. Our cloud-based phone system enables business calls across supported devices, helping employees manage conversations and collaborate without being tied to a traditional office phone setup.</p><a className="text-link" href="#technology">Explore Cloud PBX <span aria-hidden="true"><span className="action-arrow" aria-hidden="true">↗</span></span></a></div></section>
    <section className="container pbx-technology" id="technology"><div className="pbx-centered"><span className="eyebrow"><i />Confidence in Every Connection</span><h2>Dependable Technology Behind <em>Every Business Call</em></h2><p>Our communication infrastructure is designed to deliver consistent performance, dependable connectivity and the flexibility organizations need to operate confidently.</p></div><div className="glass pbx-reliability"><div><ReliabilityArt /></div><div><h3>Why Choose Comvoix?</h3><p>Reliable communication requires more than a phone connection. Comvoix combines cloud-based technology, adaptable call routing and proactive infrastructure monitoring to support clear, uninterrupted business conversations. From individual workplaces to geographically distributed operations, our voice platform is built to support evolving business needs.</p></div></div>
      <div className="pbx-stats">{[
        ['24/7', 'Network Monitoring', 'Continuous observation of voice traffic and infrastructure helps identify potential issues and maintain dependable performance.'],
        ['99.97%', 'Uptime SLA', 'Our contractual infrastructure uptime commitment provides businesses with additional confidence in the reliability of their communication services.'],
        ['60+', 'Calling Destinations', 'Reach customers and business partners across more than 60 international calling destinations through our voice network.'],
      ].map(([number,title,text])=><article key={title}><StatNumber value={number} /><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className="container pbx-final"><span className="eyebrow"><i />Your Next Chapter Starts Here</span><h2>Give Your Business Communication the <em>Flexibility It Deserves</em></h2><p>Modernize your phone system with a cloud solution designed for connectivity, performance and growth.</p><a className="button" href="#demo">Request a Demo <span className="action-arrow" aria-hidden="true">↗</span></a></section>
    <section id="demo" className="container pbx-demo"><div><span className="eyebrow"><i />Let’s Talk Cloud PBX</span><h2>Your business.<br/><em>Your next conversation.</em></h2><p>Tell us about your team and your communication requirements.</p></div><div className="glass"><DemoRequest /></div></section>
  </main></>;
}
