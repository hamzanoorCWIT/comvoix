"use client";

import { useEffect, useRef, useState, type ReactNode, type KeyboardEvent } from "react";
import { Waves, Workflow } from "./components/visuals";
import { AboutConnectionTrack } from "./components/about-connection-track";
import { PageMotion } from "./components/motion";
import { CommunicationArt } from "./components/communication-art";
import { ContactCenterArt } from "./components/contact-center-art";
import { BusinessVoipArt } from "./components/business-voip-art";
import { SipTrunkArt } from "./components/sip-trunk-art";
import { HostedPbxArt } from "./components/hosted-pbx-art";
import { ProductSceneArt } from "./components/product-scene-art";
import { InsightArt } from "./components/insight-art";
import { IntegrationArt } from "./components/integration-art";
import { ContactForm } from "./components/contact-form";
import { FeaturedInsightArt } from "./components/featured-insight-art";
import { articles, faqs, integrations, products, services } from "./content";
import Link from "next/link";
import { solutionLinks } from "./navigation";

function Label({ children }: { children: ReactNode }) {
  return <span className="eyebrow"><i />{children}</span>;
}
function Heading({ label, title, text }: { label: string; title: ReactNode; text: string }) {
  return <div className="section-heading reveal"><div><Label>{label}</Label><h2>{title}</h2></div><p>{text}</p></div>;
}
function ServiceArt({ art, name }: { art: string; name: string }) {
  if (art === "contact") return <ContactCenterArt label="Inbound Contact Center: incoming calls routed to the right team with intelligent routing, call handling and scalable operations" />;
  if (art === "voice") return <BusinessVoipArt label="Business VoIP: an active call on the business line, handled by a cloud phone system with team calling, call management and flexible work on any device" />;
  if (art === "network") return <SipTrunkArt label="SIP Trunking: existing PBX sites connected through a SIP trunk to scalable channels, reliable IP voice and your current phone system" />;
  if (art === "signal" || art === "future-voice" || art === "journey") return <InsightArt kind={art} label={name} />;
  if (art === "crm" || art === "helpdesk" || art === "teams") return <IntegrationArt kind={art} label={name} />;
  if (art === "cloud") return <HostedPbxArt label="Hosted PBX: a team directory of extensions connected through a cloud phone system to business calling, extensions and call features" />;
  return <CommunicationArt kind={art} label={`${name}: connected voice, messaging, teams and cloud`} />;
}
function CTA({ children = "Get Started", secondary = false, href = "#start" }: { children?: ReactNode; secondary?: boolean; href?: string }) {
  return <a className={`button ${secondary ? "button-secondary" : ""}`} href={href}>{children}</a>;
}

type DialogContent = { title: string; description: string; paragraphs?: readonly string[]; art?: string };

export default function Home() {


  const [activeProduct, setActiveProduct] = useState(0);
  const [showAllInsights, setShowAllInsights] = useState(false);
  const [info, setInfo] = useState<DialogContent | null>(null);
  const [email, setEmail] = useState("");
  const [contactOpen, setContactOpen] = useState(false);

  const dialog = useRef<HTMLDialogElement>(null);
  const contactDialog = useRef<HTMLDialogElement>(null);
  const product = products[activeProduct];
  useEffect(() => {
    function selectFromHash(hash = window.location.hash) {
      const match = hash.match(/^#product-tab-([0-4])$/);
      if (match) setActiveProduct(Number(match[1]));
    }
    const frame = requestAnimationFrame(() => selectFromHash());
    const onHashChange = () => selectFromHash();
    const onLinkClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (link && link.origin === window.location.origin && link.pathname === '/') selectFromHash(link.hash);
    };
    window.addEventListener('hashchange', onHashChange);
    document.addEventListener('click', onLinkClick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', onHashChange);
      document.removeEventListener('click', onLinkClick);
    };
  }, []);

  // Every expanded FAQ card gets the same height: the height of the longest answer when open.
  // Closed cards keep their own compact height. Measured off-screen so nothing flashes open.
  function syncFaqHeights() {
    const cards = Array.from(document.querySelectorAll<HTMLDetailsElement>(".faq-card"));
    if (!cards.length) return;
    const probe = document.createElement("div");
    probe.style.cssText = `position:absolute;left:-10000px;top:0;width:${cards[0].offsetWidth}px;visibility:hidden;pointer-events:none`;
    document.body.appendChild(probe);
    const tallest = Math.max(...cards.map(card => {
      const copy = card.cloneNode(true) as HTMLElement;
      copy.setAttribute("open", "");
      copy.style.minHeight = "";
      copy.classList.remove("reveal");
      probe.replaceChildren(copy);
      return copy.offsetHeight;
    }));
    probe.remove();
    cards.forEach(card => { card.style.minHeight = card.open ? `${tallest}px` : ""; });
  }
  useEffect(() => {
    let timer = 0;
    const onResize = () => { window.clearTimeout(timer); timer = window.setTimeout(syncFaqHeights, 120); };
    window.addEventListener("resize", onResize);
    return () => { window.clearTimeout(timer); window.removeEventListener("resize", onResize); };
  }, []);
  useEffect(() => { if (info) dialog.current?.showModal(); else dialog.current?.close(); }, [info]);
  useEffect(() => { if (contactOpen) contactDialog.current?.showModal(); else contactDialog.current?.close(); }, [contactOpen]);

  function selectProduct(index: number, focus = false) {
    setActiveProduct(index);
    if (focus) document.getElementById(`product-tab-${index}`)?.focus();
  }
  function productKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % products.length;
    else if (event.key === "ArrowLeft") next = (index + products.length - 1) % products.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = products.length - 1;
    else return;
    event.preventDefault(); selectProduct(next, true);
  }
  function showArticle(index: number) {
    const article = articles[index];
    setInfo({ title: article.title, description: article.description, paragraphs: article.body, art: article.art });
  }


  return <>
    <Waves />
    <PageMotion />
    <main>
      <section className="hero" id="home"><div className="hero-dots" /><div className="container hero-grid">
        <div className="hero-copy">
          <span className="beta"><i />Global Communication Solutions</span>
          <h1 className="comvoix-heading">Scalable Communication Built for <em>Performance and Growth</em></h1>
          <p>Secure voice, messaging and collaboration solutions designed to keep modern businesses connected, productive and ready to grow.</p>
          <div className="hero-buttons">
            <CTA href="#solutions">Explore Solutions</CTA>
            <CTA secondary>Talk to Sales <span aria-hidden="true"><span className="action-arrow" aria-hidden="true">↗</span></span>
            </CTA>
          </div>
          <code className="trial-note">Trusted communication solutions for modern businesses</code>
        </div>
        <Workflow />
      </div>
        <a href="#about" className="scroll-cue" aria-label="About Comvoix"><svg viewBox="0 0 24 32" width="24" height="32" fill="none" aria-hidden="true"><path d="M12 3v24m-8-8 8 8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
      </section>

      <section className="integrations container" id="about">
        <Heading label="About Comvoix" title={<>Communication That Moves <em>Business Forward</em></>} text="Comvoix delivers secure, scalable communication solutions, from business VoIP and contact centers to SIP trunking and cloud communications, making business communication simpler, smarter and easier to scale." />
        <AboutConnectionTrack />
      </section>

      <section className="content-section container" id="solutions">
        <Heading label="Business Communications" title={<>Communication Solutions <em>Built for Business</em></>} text="Purpose-built communication services designed to improve connectivity, streamline operations and create better customer experiences." />
        {services.map((service, i) => <div className={`feature-row ${i % 2 === 1 ? "reversed" : ""}`} key={service.id} id={service.id}>
          {i % 2 === 1 && <div className="glass service-art reveal"><ServiceArt art={service.art} name={service.name} /></div>}
          <div className="feature-copy reveal"><code>0{i + 1}</code><h3>{service.name}</h3><p>{service.description}</p><Link className="text-link" href={service.href}>Explore Service <span aria-hidden="true"><span className="action-arrow" aria-hidden="true">↗</span></span></Link></div>
          {i % 2 === 0 && <div className="glass service-art reveal"><ServiceArt art={service.art} name={service.name} /></div>}
        </div>)}
      </section>

      <section className="manifesto-wrap container"><div className="manifesto reveal"><code>[ Global Communication ]</code><h2>Connect <em>Without Limits</em></h2><p>Reliable communication solutions built to keep your business connected wherever it operates.</p><a href="#start" className="manifesto-link"><span>Talk to Our Team <span className="action-arrow" aria-hidden="true">↗</span></span></a></div></section>

      <section className="container reliability" id="products">
        <Heading label="VoIP Products" title={<>Powering Every <em>Business Conversation</em></>} text="Flexible communication products built to help businesses connect, engage and communicate across every channel." />
        <div className="product-tabs" role="tablist" aria-label="Communication products">{products.map((item, i) => <button key={item.name} id={`product-tab-${i}`} type="button" role="tab" aria-selected={activeProduct === i} aria-controls="product-panel" tabIndex={activeProduct === i ? 0 : -1} onClick={() => selectProduct(i)} onKeyDown={event => productKey(event, i)}>{item.name}</button>)}</div>
        <div className="two-cards" id="product-panel" role="tabpanel" aria-labelledby={`product-tab-${activeProduct}`} tabIndex={0}>
          <article className="glass reliability-card reveal"><h3>{product.name}</h3><p>{product.description}</p><code>Built Around Your Business</code><ul className="product-points">{integrations.map(item => <li key={item.name}><i /><div><strong>{item.name}</strong><p>{item.short}</p></div></li>)}</ul><Link className="text-link" href={solutionLinks[activeProduct]?.href ?? "/products/cloud-pbx"}>Learn More <span className="action-arrow" aria-hidden="true">↗</span></Link></article>
          <article className="glass reliability-card product-visual reveal"><div className="panel-top"><code>{product.name}</code><span className="product-connection"><span aria-hidden="true">●</span> Connected</span></div><ProductSceneArt kind={product.art} label={`${product.name} connecting business applications with communication channels`} /><div className="product-capabilities">{product.points.map(point => <code key={point}><span className="product-check" aria-hidden="true">✓</span> {point}</code>)}</div></article>
        </div>
      </section>

      <section className="container daily" id="insights">
        <Heading label="Ideas & Perspectives" title={<>Insights</>} text="Ideas, trends and practical insights to help businesses navigate the future of communication." />
        <div className="daily-top">
          <article className="glass calendar featured-article reveal"><div className="panel-top"><code>Featured Insight</code><span className="next-run">Business Communication</span></div><FeaturedInsightArt /><h3>{articles[0].title}</h3><p>{articles[0].description}</p><button className="text-link" onClick={() => showArticle(0)}>Read Insight <span className="action-arrow" aria-hidden="true">↗</span></button></article>
          <div className="insight-sidebar">{articles.slice(4).map((article, i) => <article className="glass small-panel insight-card reveal" key={article.title}><code>{article.category}</code><h3>{article.title}</h3><p>{article.description}</p><button className="text-link" onClick={() => showArticle(i + 4)}>Read Insight <span className="action-arrow" aria-hidden="true">↗</span></button></article>)}</div>
        </div>
        <div className="daily-bottom">{articles.slice(1, 4).map((article, i) => <article className="glass small-panel insight-card reveal" key={article.title}><code>{article.category}</code><h3>{article.title}</h3><p>{article.description}</p><button className="text-link" onClick={() => showArticle(i + 1)}>Read Insight <span className="action-arrow" aria-hidden="true">↗</span></button></article>)}</div>
        <div className="section-action"><button className="button button-secondary" onClick={() => setShowAllInsights(!showAllInsights)} aria-expanded={showAllInsights} aria-controls="all-insights">{showAllInsights ? "Show Less" : "View All Insights"} <span className="action-arrow" aria-hidden="true">↗</span></button></div>
        {showAllInsights && <div id="all-insights" className="glass insight-index">{articles.map((article, i) => <button key={article.title} onClick={() => showArticle(i)}><span>{article.title}</span><span aria-hidden="true"><span className="action-arrow" aria-hidden="true">↗</span></span></button>)}</div>}
      </section>

      <section className="container customers" id="integrations">
        <Heading label="Seamless Integrations" title={<>Connect the Tools Your Business <em>Already Uses</em></>} text="Bring communication into your existing workflows with integrations designed to simplify operations and keep your teams connected." />
        <div className="metrics integration-metrics">{integrations.map((item, i) => <article className="metric reveal" key={item.name}><code><span className="workflow-number">0{i + 1}</span> / Connected Workflows</code><h3>{item.name}</h3><p>{item.description}</p></article>)}</div>
        <div className="section-action"><button className="button button-secondary" onClick={() => setInfo({ title: 'Explore Integrations', description: 'Bring communication into your existing workflows with integrations designed to simplify operations and keep your teams connected.', paragraphs: integrations.map(item => `${item.name} — ${item.description}`), art: 'crm' })}>Explore Integrations <span className="action-arrow" aria-hidden="true">↗</span></button></div>
      </section>

      <section className="pricing-section" id="faq"><div className="container">
        <Heading label="Here to Help" title={<>Frequently Asked <em>Questions</em></>} text="Find out how Comvoix can support your business communication, connect your existing systems and help you get started." />
        <div className="plans faq-grid">{faqs.map((faq, i) => <details className="glass plan faq-card reveal" key={faq.question} onToggle={syncFaqHeights}><summary><code>0{i + 1}</code><h3>{faq.question}</h3><span className="faq-plus" aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
      </div></section>

      <section className="container closing" id="start">
        {/* <div className="glass brand-card" id="industries">
          <a href="#home" className="brand"><Logo /></a>
          <p>Comvoix provides modern communication solutions that help businesses connect, communicate and grow with confidence.</p>
          <div className="social-row">
            <code>Communication Across Industries</code>
            <button className="text-link" onClick={() => setInfo({ title: 'Communication for Your Industry', description: 'Every business has different communication requirements. Talk to our team about your customers, teams and existing infrastructure.', paragraphs: ['Customer-facing teams — connect inbound calls with customer communication and support workflows.', 'Distributed teams — bring business calling, messaging and collaboration into flexible ways of working.', 'Growing businesses — plan communication capacity and integrations around evolving requirements.'], art: 'network' })}>Explore ↗</button>
          </div>
        </div> */}
        <div className="glass brand-card" id="industries">

          <div className="brand-card-content">

            <Label>Connecting Businesses</Label>

            <h3>
              Communication That
              <em> Connects</em>
            </h3>

            <p>
              Comvoix provides modern communication solutions
              that help businesses connect, communicate and
              grow with confidence.
            </p>

            <div className="brand-services">
              <span>Voice</span>
              <span>Messaging</span>
              <span>Cloud</span>
            </div>

          </div>

          <div className="social-row">
            <code>Communication Across Industries</code>

            <a href="#solutions" className="text-link">
              Explore Solutions <span className="action-arrow" aria-hidden="true">↗</span>
            </a>
          </div>

        </div>
        <div className="signup-card">
          <code>Your Next Conversation</code>
          <h2>Ready to Transform Your <em>Business Communication?</em></h2>
          <p>Talk to our team about building a communication setup designed around your business, customers and future growth.</p>
          <form onSubmit={event => { event.preventDefault(); setContactOpen(true); }}>
            <label className="sr-only" htmlFor="email">Work email</label>
            <input id="email" type="email" placeholder="Work email" required autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} />
            <button className="button" type="submit">Get Started</button></form><button className="text-link signup-sales" onClick={() => setContactOpen(true)}>Talk to Sales <span className="action-arrow" aria-hidden="true">↗</span></button></div>
      </section>
    </main>

    <dialog ref={dialog} aria-labelledby="info-title" onCancel={() => setInfo(null)} onClick={event => { if (event.target === dialog.current) setInfo(null); }}><button className="dialog-close" aria-label="Close dialog" onClick={() => setInfo(null)}>✕</button><h2 id="info-title">{info?.title}</h2><p>{info?.description}</p>{info?.art && (info.title === articles[0].title ? <FeaturedInsightArt /> : <ServiceArt art={info.art} name={info.title} />)}{info?.paragraphs?.map(paragraph => <p className="dialog-paragraph" key={paragraph}>{paragraph}</p>)}<button className="button" onClick={() => { setInfo(null); setContactOpen(true); }}>Talk to Our Team <span className="action-arrow" aria-hidden="true">↗</span></button></dialog>
    <dialog ref={contactDialog} aria-labelledby="contact-title" onCancel={() => setContactOpen(false)} onClick={event => { if (event.target === contactDialog.current) setContactOpen(false); }}><button className="dialog-close" aria-label="Close contact form" onClick={() => setContactOpen(false)}>✕</button><Label>Let’s Build Better Communication</Label><h2 id="contact-title">Talk to <em>Our Team</em></h2><p>Tell us about your business, existing systems and communication requirements.</p>{contactOpen && <ContactForm initialEmail={email} subject="Homepage sales enquiry" />}</dialog>
  </>;
}
