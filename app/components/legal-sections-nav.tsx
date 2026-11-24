"use client";

import { useEffect, useRef, useState } from 'react';

export function LegalSectionsNav({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState<string | undefined>(sections[0]?.id);
  const navigation = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const elements = sections.map(section => document.getElementById(section.id));
    function update() {
      frame = 0;
      const threshold = (document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 80) + 48;
      let current: string | undefined = sections[0]?.id;
      for (const element of elements) {
        if (element && element.getBoundingClientRect().top <= threshold) current = element.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = sections.at(-1)?.id;
      setActive(current);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [sections]);

  useEffect(() => {
    const nav = navigation.current;
    const link = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!nav || !link || getComputedStyle(nav).position !== 'sticky') return;
    const bounds = nav.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    if (item.bottom > bounds.bottom) nav.scrollTop += item.bottom - bounds.bottom + 12;
    else if (item.top < bounds.top) nav.scrollTop -= bounds.top - item.top + 12;
  }, [active]);

  return <nav className="legal-section-nav" aria-label="Sections" ref={navigation}>
    <p className="legal-section-nav-label">Sections</p>
    <ol>{sections.map((section, index) => <li key={section.id}>
      <a href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined}>
        <span className="legal-section-number" aria-hidden="true">{index + 1}</span>
        <span>{section.title.replace(/^\d+\.\s*/, '')}</span>
      </a>
    </li>)}</ol>
  </nav>;
}
