"use client";
import { useEffect, useRef, useState } from "react";

function parse(value: string) {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], target: Number(match[2]), suffix: match[3], decimals: (match[2].split(".")[1] ?? "").length };
}

// Counts a stat such as "24/7", "99.97%" or "60+" up from zero once it scrolls into view.
export function StatNumber({ value }: { value: string }) {
  const parsed = parse(value);
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const el = ref.current, stat = parse(value);
    if (!el || !stat) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCurrent(stat.target); return; }
      const duration = 1600, start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        setCurrent(stat.target * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .4 });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  if (!parsed) return <strong>{value}</strong>;
  return <strong ref={ref} className="stat-number" aria-label={value}><span aria-hidden="true">{parsed.prefix}{current.toFixed(parsed.decimals)}{parsed.suffix}</span></strong>;
}
