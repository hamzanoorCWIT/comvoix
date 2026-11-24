import Link from "next/link";
import Image from "next/image";
import { Logo } from "./visuals";
import { productLinks, solutionLinks } from "../navigation";
import { CookiePreferencesButton, CookiePreferencesDialog } from "./cookie-preferences";

export function SiteFooter() {
  const groups = [
    { title: "Company", links: [{name:"About Comvoix",href:"/about"},{name:"Industries",href:"/industries"},{name:"Insights",href:"/#insights"},{name:"Contact",href:"/contact"}] },
    { title: "Solutions", links: solutionLinks },
    { title: "Products", links: [...productLinks, {name:"Hosted PBX",href:"/#hosted-pbx"},{name:"Contact Center",href:"/#contact-center"}] },
  ];
  return <><footer className="container site-footer"><div className="footer-status"><span><i />voice · messaging · collaboration</span><span><i />built for business</span><span><i />designed to grow with you</span></div>
    <div className="footer-main"><div className="footer-about"><Link href="/" className="brand" aria-label="Comvoix home"><Logo /></Link><p>Comvoix provides modern communication solutions that help businesses connect, communicate and grow with confidence.</p><code>Let&apos;s build better communication.</code><Link href="/#start" className="text-link">Talk to Sales <span className="action-arrow" aria-hidden="true">→</span></Link></div>
      {groups.map(group=><div className="footer-links" key={group.title}><code>{group.title}</code>{group.links.map(item=><Link key={item.name} href={item.href}>{item.name}</Link>)}</div>)}
      <div className="footer-links"><code>Support</code><Link href="/privacy">Privacy Policy</Link><Link href="/cpni">CPNI Policy</Link><Link href="/terms">Terms of Service</Link><Link href="/acceptable-use">Acceptable Use Policy</Link><Link href="/trust">Trust &amp; Responsible Communications</Link><CookiePreferencesButton>Cookie Preferences</CookiePreferencesButton></div>
    </div><div className="footer-bottom"><code>© 2026 Comvoix. All rights reserved.</code><code>Global communication solutions</code></div>
    <div className="footer-wordmark" aria-hidden="true">
      <Image className="wordmark-dark" src="/assets/images/dotted-comvoix-logo-on-dark.png" alt="" width={2172} height={724} sizes="(max-width: 1240px) 100vw, 1180px" />
    </div>
  </footer><CookiePreferencesDialog /></>;
}
