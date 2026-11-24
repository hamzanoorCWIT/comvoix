"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Logo } from "./visuals";
import { productLinks, solutionLinks } from "../navigation";

function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("comvoix-theme-change", callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener("comvoix-theme-change", callback); };
}
function themeSnapshot() {
  try { return localStorage.getItem("comvoix-theme") === "light" ? "light" : "dark"; } catch { return "dark"; }
}
export function SiteHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const theme = useSyncExternalStore(subscribeTheme, themeSnapshot, () => "dark");
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  useEffect(() => {
    function outside(event: PointerEvent) { if (!root.current?.contains(event.target as Node)) { setOpenDropdown(null); setMenu(false); } }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  function close() { setMenu(false); setOpenDropdown(null); }
  function toggleTheme() {
    try { localStorage.setItem("comvoix-theme", theme === "dark" ? "light" : "dark"); } catch { return; }
    window.dispatchEvent(new Event("comvoix-theme-change"));
  }
  return <header className="site-header" ref={root} onKeyDown={event => { if (event.key === "Escape") { close(); trigger.current?.focus(); } }}>
    <div className="nav-inner"><Link className="brand" href="/" aria-label="Comvoix home" onClick={close}><Logo /></Link>
      <nav id="site-navigation" className={menu ? "nav-open" : ""} aria-label="Main navigation">

        {[{ name: "Products", id: "products", links: productLinks }, { name: "Solutions", id: "solutions", links: solutionLinks }].map(group => <div key={group.id} className="products-navigation" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpenDropdown(null); }}>
          <button ref={openDropdown === group.id ? trigger : undefined} className="products-trigger" type="button" aria-expanded={openDropdown === group.id} aria-controls={`${group.id}-dropdown`} onClick={() => setOpenDropdown(openDropdown === group.id ? null : group.id)}>{group.name}<svg className="trigger-chevron" viewBox="0 0 12 12" aria-hidden="true"><path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          <div className="products-dropdown" id={`${group.id}-dropdown`} hidden={openDropdown !== group.id}>{group.links.map(item => <Link key={item.name} href={item.href} onClick={close} aria-current={pathname === item.href ? "page" : undefined}><strong>{item.name}</strong><span>{item.text}</span></Link>)}</div>
        </div>)}
        <Link href="/industries" onClick={close} aria-current={pathname === "/industries" ? "page" : undefined}>Industries</Link><Link href="/about" onClick={close} aria-current={pathname === "/about" ? "page" : undefined}>About Comvoix</Link><Link href="/platform" onClick={close} aria-current={pathname === "/platform" ? "page" : undefined}>Platform</Link><Link href="/contact" onClick={close} aria-current={pathname === "/contact" ? "page" : undefined}>Contact</Link>
      </nav>
      <div className="nav-actions">
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
          <span className={`theme-icons ${theme === "dark" ? "is-dark" : "is-light"}`} aria-hidden="true"><svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg><svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
          </span>
        </button>
        <Link href={(pathname.startsWith("/products/") || pathname.startsWith("/solutions/") || pathname === "/industries" || pathname === "/platform") ? "https://portal.comvoix.com/login" : "https://portal.comvoix.com/login"}
          target="_blank"
          rel="noopener noreferrer"
          className="button">Client Login</Link>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-controls="site-navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? "✕" : "☰"}</button>
      </div>
    </div>
  </header>;
}
