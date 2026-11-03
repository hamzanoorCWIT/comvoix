"use client";

import { useEffect, useRef, useState, type ReactNode, type KeyboardEvent } from "react";
import { Logo, Mark, Waves, Workflow } from "./components/visuals";
import { PageMotion } from "./components/motion";
import { CommunicationArt } from "./components/communication-art";
import { articles, faqs, integrations, products, services } from "./content";

function Label({ children }: { children: ReactNode }) {
  return <span className="eyebrow"><i />{children}</span>;
}
function Heading({ label, title, text }: { label: string; title: ReactNode; text: string }) {
  return <div className="section-heading reveal"><div><Label>{label}</Label><h2>{title}</h2></div><p>{text}</p></div>;
}
function CTA({ children = "Get Started", secondary = false, href = "#start" }: { children?: ReactNode; secondary?: boolean; href?: string }) {
  return <a className={`button ${secondary ? "button-secondary" : ""}`} href={href}>{children}</a>;
}

type DialogContent = { title: string; description: string; paragraphs?: readonly string[]; art?: string };
const navigation = [["Home", "#home"], ["Wholesale Voice", "#wholesale-voice"], ["Business Communications", "#solutions"], ["Industries", "#industries"], ["About", "#about"]];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeProduct, setActiveProduct] = useState(0);
  const [showAllInsights, setShowAllInsights] = useState(false);
  const [info, setInfo] = useState<DialogContent | null>(null);
  const [email, setEmail] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const [enquiry, setEnquiry] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const contactDialog = useRef<HTMLDialogElement>(null);
  const product = products[activeProduct];

  useEffect(() => { if (info) dialog.current?.showModal(); else dialog.current?.close(); }, [info]);
  useEffect(() => { if (contactOpen) contactDialog.current?.showModal(); else contactDialog.current?.close(); }, [contactOpen]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("comvoix-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("comvoix-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => current === "dark" ? "light" : "dark");
  };

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
  function downloadEnquiry() {
    const blob = new Blob([`Comvoix sales enquiry\n\nWork email: ${email}\n\nRequirements:\n${enquiry}\n`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = "comvoix-enquiry.txt"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <>
    <Waves />
    <PageMotion />
    {/* <header><div className="nav-inner">
      <a className="brand" href="#home" aria-label="Comvoix home"><Logo /></a>
      <nav className={menu ? "nav-open" : ""} aria-label="Main navigation">{navigation.map(([name, href]) => <a href={href} key={name} onClick={() => setMenu(false)}>{name}</a>)}</nav>
      <div className="nav-actions"><span className="system-status"><i />voice · messaging · cloud</span><CTA /><button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? "✕" : "☰"}</button></div>
    </div></header> */}
    <header>
      <div className="nav-inner">

        <a className="brand" href="#home" aria-label="Comvoix home">
          <Logo />
        </a>

        <nav
          className={menu ? "nav-open" : ""}
          aria-label="Main navigation"
        >
          {navigation.map(([name, href]) => (
            <a
              href={href}
              key={name}
              onClick={() => setMenu(false)}
            >
              {name}
            </a>
          ))}
        </nav>

        <div className="nav-actions">

          <span className="system-status">
            <i />
            voice · messaging · cloud
          </span>

          {/* DARK / LIGHT MODE TOGGLE */}
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "dark"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>

          <CTA />

          <button
            className="menu-toggle"
            aria-label="Toggle navigation"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? "✕" : "☰"}
          </button>

        </div>
      </div>
    </header>
    <main>
      <section className="hero" id="home"><div className="hero-dots" /><div className="container hero-grid">
        <div className="hero-copy">
          <span className="beta"><i />GLOBAL COMMUNICATION SOLUTIONS</span>
          <h1 className="comvoix-heading">Scalable Communication Built for <em>Performance and Growth</em></h1>
          <p>Secure voice, messaging and collaboration solutions designed to keep modern businesses connected, productive and ready to grow.</p>
          <div className="hero-buttons">
            <CTA href="#solutions">Explore Solutions</CTA>
            <CTA secondary>Talk to Sales <span aria-hidden="true">↗</span>
            </CTA>
          </div>
          <code className="trial-note">Trusted communication solutions for modern businesses</code>
        </div>
        <Workflow />
      </div>
        <a href="#about" className="scroll-cue" aria-label="About Comvoix">↓</a>
      </section>

      <section className="integrations container" id="about">
        <Heading label="about Comvoix" title={<>Communication That Moves <em>Business Forward</em></>} text="Comvoix provides secure, scalable communication solutions that help businesses connect with customers, teams and partners through reliable voice, messaging and collaboration technologies." />
        <p className="introduction-copy">From business VoIP and contact centers to SIP trunking and cloud communications, we make business communication simpler, smarter and easier to scale.</p>
        <div className="app-track">{[["VO", "voice"], ["MS", "messaging"], ["SIP", "SIP trunking"], ["PBX", "cloud PBX"], ["API", "APIs"], ["CX", "contact center"], ["↗", "collaboration"]].map(([symbol, name], i) => <div className="app-item" key={name}><span className={i === 1 ? "app-active" : ""}>{symbol}</span><code>{name}</code></div>)}</div>
      </section>

      <section className="content-section container" id="solutions">
        <Heading label="business communications" title={<>Communication Solutions <em>Built for Business</em></>} text="Purpose-built communication services designed to improve connectivity, streamline operations and create better customer experiences." />
        {services.map((service, i) => <div className={`feature-row ${i % 2 === 1 ? "reversed" : ""}`} key={service.id} id={service.id}>
          {i % 2 === 1 && <div className="glass service-art reveal"><CommunicationArt kind={service.art} label={`${service.name}: connected voice, messaging, teams and cloud`} /></div>}
          <div className="feature-copy reveal"><code>0{i + 1}</code><h3>{service.name}</h3><p>{service.description}</p><button className="text-link" onClick={() => setInfo({ title: service.name, description: service.description, art: service.art })}>Explore Service <span aria-hidden="true">↗</span></button></div>
          {i % 2 === 0 && <div className="glass service-art reveal"><CommunicationArt kind={service.art} label={`${service.name}: connected voice, messaging, teams and cloud`} /></div>}
        </div>)}
      </section>

      <section className="manifesto-wrap"><div className="manifesto reveal"><code>[ global communication ]</code><h2>Connect <em>Without Limits</em></h2><p>Reliable communication solutions built to keep your business connected wherever it operates.</p><a href="#start" className="manifesto-link"><Mark dark /><span>Talk to Our Team ↗</span></a></div></section>

      <section className="container reliability" id="products">
        <Heading label="VoIP products" title={<>Powering Every <em>Business Conversation</em></>} text="Flexible communication products built to help businesses connect, engage and communicate across every channel." />
        <div className="product-tabs" role="tablist" aria-label="Communication products">{products.map((item, i) => <button key={item.name} id={`product-tab-${i}`} type="button" role="tab" aria-selected={activeProduct === i} aria-controls="product-panel" tabIndex={activeProduct === i ? 0 : -1} onClick={() => selectProduct(i)} onKeyDown={event => productKey(event, i)}>{item.name}</button>)}</div>
        <div className="two-cards" id="product-panel" role="tabpanel" aria-labelledby={`product-tab-${activeProduct}`} tabIndex={0}>
          <article className="glass reliability-card reveal"><h3>{product.name}</h3><p>{product.description}</p><code>built around your business</code><ul className="product-points">{integrations.map(item => <li key={item.name}><i /><div><strong>{item.name}</strong><p>{item.short}</p></div></li>)}</ul><button className="text-link" onClick={() => setInfo({ title: product.name, description: product.description, paragraphs: product.points, art: product.art })}>Learn More ↗</button></article>
          <article className="glass reliability-card product-visual reveal"><div className="panel-top"><code>{product.name}</code><span className="lime">● connected</span></div><CommunicationArt kind={product.art} label={`${product.name} connecting business applications with communication channels`} /><div className="product-capabilities">{product.points.map(point => <code key={point}>✓ {point}</code>)}</div></article>
        </div>
      </section>

      <section className="container daily" id="insights">
        <Heading label="ideas & perspectives" title={<>Insights</>} text="Ideas, trends and practical insights to help businesses navigate the future of communication." />
        <div className="daily-top">
          <article className="glass calendar featured-article reveal"><div className="panel-top"><code>featured insight</code><span className="next-run">business communication</span></div><CommunicationArt kind="network" label="Global business communication network linking voice, messaging and cloud systems" /><h3>{articles[0].title}</h3><p>{articles[0].description}</p><button className="text-link" onClick={() => showArticle(0)}>Read Insight ↗</button></article>
          <div className="glass hands-off insight-sidebar reveal"><code>explore the conversation</code>{articles.slice(4).map((article, i) => <article key={article.title}><code>0{i + 5}</code><h3>{article.title}</h3><button className="text-link" onClick={() => showArticle(i + 4)}>Read Insight ↗</button></article>)}</div>
        </div>
        <div className="daily-bottom">{articles.slice(1, 4).map((article, i) => <article className="glass small-panel insight-card reveal" key={article.title}><code>{article.category}</code><CommunicationArt kind={article.art} label={article.title} /><h3>{article.title}</h3><p>{article.description}</p><button className="text-link" onClick={() => showArticle(i + 1)}>Read Insight ↗</button></article>)}</div>
        <div className="section-action"><button className="button button-secondary" onClick={() => setShowAllInsights(!showAllInsights)} aria-expanded={showAllInsights} aria-controls="all-insights">{showAllInsights ? "Show Less" : "View All Insights"} ↗</button></div>
        {showAllInsights && <div id="all-insights" className="glass insight-index">{articles.map((article, i) => <button key={article.title} onClick={() => showArticle(i)}><span>{article.title}</span><span aria-hidden="true">↗</span></button>)}</div>}
      </section>

      <section className="container customers" id="integrations">
        <Heading label="seamless integrations" title={<>Connect the Tools Your Business <em>Already Uses</em></>} text="Bring communication into your existing workflows with integrations designed to simplify operations and keep your teams connected." />
        <div className="metrics integration-metrics">{integrations.map((item, i) => <article className="metric reveal" key={item.name}><code>0{i + 1} / connected workflows</code><CommunicationArt kind={item.art} label={item.name} /><h3>{item.name}</h3><p>{item.description}</p></article>)}</div>
        <div className="section-action"><button className="button button-secondary" onClick={() => setInfo({ title: 'Explore Integrations', description: 'Bring communication into your existing workflows with integrations designed to simplify operations and keep your teams connected.', paragraphs: integrations.map(item => `${item.name} — ${item.description}`), art: 'crm' })}>Explore Integrations ↗</button></div>
      </section>

      <section className="pricing-section" id="faq"><div className="container">
        <Heading label="here to help" title={<>Frequently Asked <em>Questions</em></>} text="Find out how Comvoix can support your business communication, connect your existing systems and help you get started." />
        <div className="glass estimator faq-intro reveal"><div id="wholesale-voice"><code>wholesale voice</code><h3>Voice connectivity for your business</h3><p>Discuss your voice connectivity, SIP infrastructure and capacity requirements with our team to find a solution that fits your business.</p></div><div className="estimate-result"><code>let’s talk</code><h3>Built around your requirements</h3><CTA>Talk to Sales</CTA></div></div>
        <div className="plans faq-grid">{faqs.map((faq, i) => <details className="glass plan faq-card reveal" key={faq.question}><summary><code>0{i + 1}</code><h3>{faq.question}</h3><span className="faq-plus" aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
      </div></section>

      <section className="container closing" id="start">
        {/* <div className="glass brand-card" id="industries">
          <a href="#home" className="brand"><Logo /></a>
          <div className="watermark"><Mark /></div>
          <p>Comvoix provides modern communication solutions that help businesses connect, communicate and grow with confidence.</p>
          <div className="social-row">
            <code>communication across industries</code>
            <button className="text-link" onClick={() => setInfo({ title: 'Communication for Your Industry', description: 'Every business has different communication requirements. Talk to our team about your customers, teams and existing infrastructure.', paragraphs: ['Customer-facing teams — connect inbound calls with customer communication and support workflows.', 'Distributed teams — bring business calling, messaging and collaboration into flexible ways of working.', 'Growing businesses — plan communication capacity and integrations around evolving requirements.'], art: 'network' })}>Explore ↗</button>
          </div>
        </div> */}
        <div className="glass brand-card" id="industries">

          <div className="brand-card-content">

            <span className="brand-card-label">
              CONNECTING BUSINESSES
            </span>

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
            <code>communication across industries</code>

            <a href="#solutions" className="text-link">
              Explore Solutions ↗
            </a>
          </div>

        </div>
        <div className="signup-card">
          <code>your next conversation</code>
          <h2>Ready to Transform Your <em>Business Communication?</em></h2>
          <p>Talk to our team about building a communication setup designed around your business, customers and future growth.</p>
          <form onSubmit={event => { event.preventDefault(); setContactOpen(true); }}>
            <label className="sr-only" htmlFor="email">Work email</label>
            <input id="email" type="email" placeholder="Work email" required autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} />
            <button className="button" type="submit">Get Started</button></form><button className="text-link signup-sales" onClick={() => setContactOpen(true)}>Talk to Sales ↗</button></div>
      </section>
    </main>
    <footer className="container"><div className="footer-status"><span><i />voice · messaging · collaboration</span><span><i />built for business</span><span><i />designed to grow with you</span></div>
      <div className="footer-main"><div className="footer-about"><a href="#home" className="brand"><Logo /></a><p>Comvoix provides modern communication solutions that help businesses connect, communicate and grow with confidence.</p><code>Let&apos;s build better communication.</code><a href="#start" className="text-link">Talk to Sales →</a></div>
        {[{ title: 'Company', links: [['About', '#about'], ['Industries', '#industries'], ['Insights', '#insights'], ['Contact', '#start']] }, { title: 'Solutions', links: [['Wholesale Voice', '#wholesale-voice'], ['Business VoIP', '#business-voip'], ['SIP Trunking', '#sip-trunking'], ['Hosted PBX', '#hosted-pbx'], ['Contact Center', '#contact-center']] }].map(group => <div className="footer-links" key={group.title}><code>{group.title}</code>{group.links.map(([text, href]) => <a key={text} href={href}>{text}</a>)}</div>)}
        <div className="footer-links">
          <code>Products</code>{products.slice(0, 5).map((item, i) => <a href="#products" key={item.name} onClick={() => selectProduct(i)}>{item.name}</a>)}</div>
        <div className="footer-links"><code>Support</code><a href="#faq">FAQs</a><button onClick={() => setContactOpen(true)}>Contact Support</button>{['Privacy Policy', 'Terms & Conditions'].map(title => <button key={title} onClick={() => setInfo({ title, description: `The official Comvoix ${title.toLowerCase()} has not been supplied for this website preview.`, paragraphs: ['No enquiry is sent from this preview. The enquiry form can create a local text file for you to keep.'] })}>{title}</button>)}</div>
      </div><div className="footer-bottom"><code>© 2026 Comvoix. All rights reserved.</code><code>Global communication solutions</code></div>
    </footer>
    <dialog ref={dialog} aria-labelledby="info-title" onCancel={() => setInfo(null)} onClick={event => { if (event.target === dialog.current) setInfo(null); }}><button className="dialog-close" aria-label="Close dialog" onClick={() => setInfo(null)}>✕</button><Mark /><h2 id="info-title">{info?.title}</h2><p>{info?.description}</p>{info?.art && <CommunicationArt kind={info.art} label={info.title} />}{info?.paragraphs?.map(paragraph => <p className="dialog-paragraph" key={paragraph}>{paragraph}</p>)}<button className="button" onClick={() => { setInfo(null); setContactOpen(true); }}>Talk to Our Team ↗</button></dialog>
    <dialog ref={contactDialog} aria-labelledby="contact-title" onCancel={() => setContactOpen(false)} onClick={event => { if (event.target === contactDialog.current) setContactOpen(false); }}><button className="dialog-close" aria-label="Close contact form" onClick={() => setContactOpen(false)}>✕</button><Label>let’s build better communication</Label><h2 id="contact-title">Talk to <em>Our Team</em></h2><p>Tell us about your business, existing systems and communication requirements.</p><form className="contact-form" onSubmit={event => { event.preventDefault(); downloadEnquiry(); }}><label htmlFor="contact-email">Work email</label><input id="contact-email" type="email" value={email} onChange={event => setEmail(event.target.value)} required autoComplete="email" /><label htmlFor="requirements">How can we help?</label><textarea id="requirements" value={enquiry} onChange={event => setEnquiry(event.target.value)} required rows={4} placeholder="Tell us about the solutions you need…" /><p className="contact-note">This preview is not connected to a sales inbox. Download your enquiry to keep a copy; no message will be sent.</p><button className="button" type="submit">Download Enquiry ↓</button></form></dialog>
  </>;
}
