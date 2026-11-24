import type { Metadata } from "next";
import { StatNumber } from "../../components/stat-number";
import Link from "next/link";
import { VoiceHeroArt } from "../../components/product-hero-art";
import { GlobalReachArt, VoiceStackArt } from "../../components/product-section-art";
import { DemoRequest } from "../../components/demo-request";
import { Waves } from "../../components/visuals";

export const metadata: Metadata = {
  title: "Voice Services — Comvoix",
  description: "Business-grade inbound and outbound voice connectivity through a flexible SIP network. Connect your PBX, route incoming calls and reach local and international destinations.",
};
const inbound = [
  ["Dependable Incoming Calls", "Support everyday customer interactions through reliable business-grade inbound voice services."],
  ["Adaptable Call Routing", "Direct incoming calls to the appropriate business system, department or location."],
  ["Integrated Business Numbers", "Connect your Comvoix business numbers directly to your existing communications environment."],
];
const outbound = [
  ["Local and International Reach", "Connect with customers through domestic, mobile and international calling destinations."],
  ["Quality-Focused Voice Routing", "Support clear and consistent communication through performance-oriented call routing."],
  ["Flexible Voice Capacity", "Adjust your outbound calling resources according to operational requirements."],
  ["High-Volume Call Support", "Manage demanding outbound communication workloads through scalable voice infrastructure."],
];
export default function VoiceServicesPage() {
  return <><Waves /><main className="pbx-page voice-services-page">
    <section className="container pbx-hero"><div className="product-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Products</span><span aria-hidden="true">/</span><span>Voice Services</span></div><div className="product-hero-copy"><span className="eyebrow"><i />Voice Services</span><h1>Reliable Inbound and Outbound <em>Voice Connectivity</em></h1><p>Keep your business connected with customers across local and international destinations. Comvoix delivers business-grade voice origination and termination through a flexible SIP-based network.</p><a href="#demo" className="button">Speak With Our Team <span className="action-arrow" aria-hidden="true">↗</span></a></div><div className="glass pbx-hero-art"><div className="panel-top"><code>every direction. one connection.</code></div><VoiceHeroArt /><div className="pbx-art-tags"><span>Voice origination</span><span>Voice termination</span><span>SIP network</span></div></div></section>
    <section className="container pbx-overview"><div><span className="eyebrow"><i />Connected from End to End</span><h2>Complete Voice Connectivity for <em>Business Communications</em></h2></div><div><p>Comvoix provides the voice services organizations need to manage incoming and outgoing calls through a unified SIP environment. Receive customer calls through your business numbers, connect them to your existing PBX and make outbound calls to domestic and international destinations using dependable voice infrastructure.</p><Link href="/products/sip-trunking" className="text-link">Explore SIP Trunking <span className="action-arrow" aria-hidden="true">↗</span></Link></div></section>
    <section className="container voice-inbound"><div className="voice-section-intro"><span className="eyebrow"><i />01 / Voice Origination</span><h2>Deliver Incoming Calls <em>Wherever They Need to Go</em></h2><p>Our voice origination services connect incoming customer calls to your business communication systems through flexible SIP routing. Route calls from business telephone numbers to compatible PBX systems, offices or designated endpoints while supporting consistent inbound connectivity.</p></div><div className="sip-three-grid">{inbound.map(([title,text],i)=><article className="glass sip-service-card" key={title}><span className="sip-card-index">0{i+1}</span><h3>{title}</h3><p>{text}</p>{i===2&&<Link href="/products/business-numbers" className="text-link">Explore Business Numbers <span className="action-arrow" aria-hidden="true">↗</span></Link>}</article>)}</div></section>
    <section className="container pbx-split"><div className="glass pbx-scene"><GlobalReachArt /></div><div><span className="eyebrow"><i />Conversations Without Borders</span><h2>Extend Your Business Conversations <em>Across Borders</em></h2><p>Maintain communication with customers, employees and partners in international markets through flexible voice connectivity. Whether you’re supporting overseas clients, operating distributed offices or handling increasing international call volumes, our network provides the foundation for scalable business calling.</p><a href="#demo" className="button button-secondary">Request a Demo <span className="action-arrow" aria-hidden="true">↗</span></a></div></section>
    <section className="container numbers-operations"><div><span className="eyebrow"><i />02 / Voice Termination</span><h2>Reach Customers Across <em>Local and Global Destinations</em></h2><p>Connect outbound business calls from your existing PBX through Comvoix’s voice network. Our voice termination services support organizations that require dependable call delivery, consistent voice quality and the flexibility to accommodate changing communication volumes.</p></div><div className="numbers-use-cases">{outbound.map(([title,text],i)=><article key={title}><span className="use-case-index">0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
    <section className="container voice-environment"><div className="glass pbx-reliability"><div><span className="eyebrow"><i />One Network. Every Conversation.</span><h2>One Connected Environment for <em>Business Voice</em></h2><p>Combine voice origination, voice termination and SIP connectivity through a network designed for continuous business communication. Our infrastructure supports flexible routing, ongoing monitoring and capacity adjustments to meet different calling requirements.</p></div><VoiceStackArt /></div></section>
    <section className="container numbers-network"><div className="pbx-centered"><span className="eyebrow"><i />Dependability, Every Day</span><h2>Consistent Connectivity for <em>Everyday Business Operations</em></h2></div><div className="pbx-stats">{[
      ['24/7','Monitoring','Continuous observation of network performance and infrastructure helps maintain service stability.'],
      ['99.97%','Uptime SLA','Our contractual infrastructure availability commitment supports dependable business connectivity.'],
      ['60+','Calling Destinations','Communicate across a broad range of international markets through supported voice destinations.'],
    ].map(([value,title,text])=><article key={title}><StatNumber value={value} /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="container pbx-final"><span className="eyebrow"><i />Keep the Conversation Going</span><h2>Build Stronger Connections With <em>Reliable Voice Services</em></h2><p>Explore inbound and outbound voice connectivity designed to support your business today and as it grows.</p><a href="#demo" className="button">Request a Demo <span className="action-arrow" aria-hidden="true">↗</span></a></section>
    <section className="container pbx-demo" id="demo"><div><span className="eyebrow"><i />Let’s Talk Voice Services</span><h2>Your conversations.<br/><em>Connected with confidence.</em></h2><p>Tell us about your inbound and outbound calling requirements, destinations and existing phone system.</p></div><div className="glass"><DemoRequest product="Voice Services"/></div></section>
  </main></>;
}
