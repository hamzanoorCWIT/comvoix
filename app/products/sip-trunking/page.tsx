import type { Metadata } from "next";
import Link from "next/link";
import { SipHeroArt } from "../../components/product-hero-art";
import { PbxExtendArt } from "../../components/product-section-art";
import { DemoRequest } from "../../components/demo-request";
import { Waves } from "../../components/visuals";

export const metadata: Metadata = {
  title: "SIP Trunking — Comvoix",
  description: "Connect your compatible IP PBX to flexible SIP voice services. Scale calling capacity, connect business numbers and support inbound and outbound communication with Comvoix.",
};
const capabilities = [
  ["Connect Your Current PBX", "Integrate SIP-based calling with your compatible existing phone infrastructure while maintaining familiar communication workflows."],
  ["Flexible Calling Capacity", "Increase or adjust available voice capacity as operational demand, employee requirements and business locations evolve."],
  ["Inbound and Outbound Connectivity", "Bring incoming and outgoing calls together through a unified SIP voice connection."],
  ["Business Number Management", "Connect your business telephone numbers with your SIP environment for more organized and consistent communication."],
];
const operations = [
  ["Preserve Existing Infrastructure", "Continue using compatible communication equipment and systems already integrated into your business."],
  ["Support Diverse Calling Requirements", "Configure voice connectivity to meet different customer communication and internal operational needs."],
  ["Connect Multiple Business Locations", "Bring separate offices and distributed communication environments together through SIP-based services."],
  ["Expand Capacity as Required", "Adapt calling resources to changing workloads without unnecessarily replacing existing systems."],
];
const complements = [
  ["Business Numbers", "Connect suitable local, national and international numbers to your SIP configuration."],
  ["Intelligent Call Routing", "Direct incoming business calls to the appropriate endpoints, teams or operational locations."],
  ["Two-Way Business Calling", "Support inbound and outbound communication within a single SIP-based environment."],
];
const benefits = [
  ["Compatible With Your PBX", "Connect modern SIP voice capabilities to supported IP PBX systems without completely restructuring your setup."],
  ["Responsive to Business Changes", "Adjust communication resources as call volumes, teams and organizational needs evolve."],
  ["Grow With Your Existing Phone System", "Support expansion while continuing to use the communication investment your company has already made."],
];
const faqs = [
  ["What does SIP Trunking do?", "SIP Trunking allows compatible business phone systems to transmit and receive voice calls over an internet-based connection rather than traditional telephone circuits."],
  ["Can I retain my current phone system?", "Yes. Organizations using compatible IP PBX systems can connect to SIP services without necessarily replacing their existing infrastructure."],
  ["Does SIP Trunking handle both incoming and outgoing calls?", "Yes. Our SIP connectivity supports inbound customer calls and outbound business calling through a compatible communications environment."],
  ["Can existing business numbers be connected?", "Business numbers can be integrated with your SIP configuration, subject to number availability and technical compatibility."],
  ["Is it suitable for companies operating from multiple locations?", "Yes. SIP-based voice connectivity can help organizations maintain consistent communication across different offices and business sites."],
  ["Can calling capacity increase as my organization expands?", "Yes. SIP services allow capacity to be configured according to changing business requirements and available service arrangements."],
  ["How can I verify whether my PBX is compatible?", "Our team can evaluate your existing PBX model, network configuration and calling requirements to determine a suitable SIP integration approach."],
  ["How do I activate SIP Trunking?", "Contact our specialists with details of your phone system, business locations and expected call requirements. We’ll help identify an appropriate configuration."],
];
export default function SipTrunkingPage() {
  return <><Waves /><main className="pbx-page sip-page">
    <section className="container pbx-hero"><div className="product-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Products</span><span aria-hidden="true">/</span><span>SIP Trunking</span></div><div className="product-hero-copy"><span className="eyebrow"><i />SIP Trunking</span><h1>Flexible SIP Trunking for <em>Modern Business Calling</em></h1><p>Connect your existing business phone system to dependable SIP-based voice services. Optimize communication expenses, improve connectivity and scale calling capacity without replacing your current PBX infrastructure.</p><a href="#demo" className="button">Request a Demo <span className="action-arrow" aria-hidden="true">↗</span></a></div><div className="glass pbx-hero-art"><div className="panel-top"><code>your infrastructure. new possibilities.</code></div><SipHeroArt /><div className="pbx-art-tags"><span>Existing IP PBX</span><span>SIP connectivity</span><span>Two-way calling</span></div></div></section>
    <section className="container pbx-overview"><div><span className="eyebrow"><i />Evolve Your Connection</span><h2>Modernize Your Calling Capabilities <em>While Keeping Your PBX</em></h2></div><div><p>Move beyond traditional telephone connections without rebuilding your entire communication environment. SIP Trunking enables compatible IP PBX systems to access modern voice connectivity through an internet-based infrastructure.</p><p>Continue using the phone system your employees already know while gaining flexibility in call capacity, business numbers and connectivity.</p></div></section>
    <section className="container sip-capabilities" aria-label="SIP Trunking capabilities"><div className="number-type-grid">{capabilities.map(([title,text],i)=><article className="glass number-type-card" key={title}><span className="sip-card-index">0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="container pbx-split"><div className="glass pbx-scene"><PbxExtendArt /></div><div><span className="eyebrow"><i />More from Your Phone System</span><h2>Bring Modern Voice Connectivity to <em>Your Existing Phone System</em></h2><p>Comvoix SIP Trunking helps organizations extend the functionality of their existing IP PBX without moving to an entirely different platform. Preserve the communication infrastructure that supports your daily operations while benefiting from scalable capacity, flexible number connectivity and modern SIP services.</p><a href="#demo" className="button button-secondary">Schedule a Demo <span className="action-arrow" aria-hidden="true">↗</span></a></div></section>
    <section className="container numbers-operations"><div><span className="eyebrow"><i />Configured for Your Business</span><h2>Voice Connectivity That Works <em>Around Your Business</em></h2><p>Create a SIP configuration suited to your current infrastructure, calling requirements and operational structure.</p></div><div className="numbers-use-cases">{operations.map(([title,text],i)=><article key={title}><span className="use-case-index">0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
    <section className="container sip-complements"><div className="pbx-centered"><span className="eyebrow"><i />Better Together</span><h2>Enhance Your SIP Environment With <em>Complementary Services</em></h2></div><div className="sip-three-grid">{complements.map(([title,text],i)=><article className="glass sip-service-card" key={title}><svg viewBox="0 0 80 64" className="sip-service-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">{i===0?<><rect x="10" y="10" width="60" height="44" rx="10"/><path d="m33 19-5 26m19-26-5 26M22 27h33M20 37h33"/></>:i===1?<><path d="M12 32h24V12h30M36 32h30M36 32v20h30"/><circle cx="12" cy="32" r="5"/><path d="m60 7 6 5-6 5m0 10 6 5-6 5m0 10 6 5-6 5"/></>:<><path d="M13 21h54l-10-9m10 31H13l10 9"/><path d="M13 21h54l-10 9m10 13H13l10-9"/></>}</svg><h3>{title}</h3><p>{text}</p>{i===0&&<Link className="text-link" href="/products/business-numbers">Explore Business Numbers <span className="action-arrow" aria-hidden="true">↗</span></Link>}</article>)}</div></section>
    <section className="container sip-fit"><div className="pbx-centered"><span className="eyebrow"><i />A Natural Next Step</span><h2>SIP Connectivity That Fits <em>Your Existing Operations</em></h2></div><div className="sip-three-grid">{benefits.map(([title,text],i)=><article key={title}><span className="sip-card-index">0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="container sip-faq"><div><span className="eyebrow"><i />Your Questions, Answered</span><h2>Frequently Asked <em>Questions</em></h2></div><div className="sip-faq-list">{faqs.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className="container pbx-final"><span className="eyebrow"><i />Keep What Works. Build What’s Next.</span><h2>Give Your Existing Phone System a <em>More Flexible Future</em></h2><p>Connect your business to scalable SIP voice services without starting your communications infrastructure from scratch.</p><a href="#demo" className="button">Request a Demo <span className="action-arrow" aria-hidden="true">↗</span></a></section>
    <section className="container pbx-demo" id="demo"><div><span className="eyebrow"><i />Let’s Talk SIP Trunking</span><h2>Your existing system.<br/><em>Your next connection.</em></h2><p>Tell us about your PBX model, business locations and calling requirements.</p></div><div className="glass"><DemoRequest product="SIP Trunking"/></div></section>
  </main></>;
}
