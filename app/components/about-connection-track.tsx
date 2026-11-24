"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const items = [["VO", "Voice"], ["MS", "Messaging"], ["SIP", "SIP Trunking"], ["PBX", "Cloud PBX"], ["API", "APIs"], ["CX", "Contact Center"], ["↗", "Collaboration"]];
const ns = "http://www.w3.org/2000/svg";

export function AboutConnectionTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const track = trackRef.current!;
    const svg = svgRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let context: gsap.Context | undefined;
    let timeline: gsap.core.Timeline | undefined;
    let visible = false;
    let frame = 0;
    let lastGeometry = "";
    const sync = () => { timeline?.paused(!visible || document.hidden); };
    const build = () => {
      const origin = track.getBoundingClientRect();
      const boxes = Array.from(track.querySelectorAll<HTMLElement>(".app-item > span")).map(icon => {
        const rect = icon.getBoundingClientRect();
        const style = getComputedStyle(icon);
        const inset = parseFloat(style.borderLeftWidth) / 2;
        return {
          x: rect.left - origin.left + track.scrollLeft + inset,
          y: rect.top - origin.top + inset,
          w: rect.width - inset * 2, h: rect.height - inset * 2,
          r: Math.max(0, Math.min(parseFloat(style.borderTopLeftRadius), rect.width / 2, rect.height / 2) - inset),
        };
      });
      const key = JSON.stringify([boxes, reduced.matches]);
      if (key === lastGeometry) return;
      lastGeometry = key;
      context?.revert();
      timeline = undefined;
      svg.replaceChildren();
      const last = boxes.at(-1)!;
      svg.setAttribute("width", String(Math.max(track.clientWidth, last.x + last.w + 4)));
      svg.setAttribute("height", String(track.clientHeight));
      const makePath = (d: string, className: string) => {
        const path = document.createElementNS(ns, "path");
        path.setAttribute("d", d);
        path.setAttribute("class", className);
        svg.append(path);
        return path;
      };
      const stages: SVGPathElement[][] = [];
      boxes.forEach(({ x, y, w, h, r }, i) => {
        const mid = y + h / 2, right = x + w, bottom = y + h;
        const upper = `M${x} ${mid}V${y+r}A${r} ${r} 0 0 1 ${x+r} ${y}H${right-r}A${r} ${r} 0 0 1 ${right} ${y+r}V${mid}`;
        const lower = `M${x} ${mid}V${bottom-r}A${r} ${r} 0 0 0 ${x+r} ${bottom}H${right-r}A${r} ${r} 0 0 0 ${right} ${bottom-r}V${mid}`;
        stages.push([makePath(upper, "connection-progress"), makePath(lower, "connection-progress")]);
        const next = boxes[i + 1];
        if (next) {
          const gap = `M${right} ${mid}H${next.x}`;
          makePath(gap, "connection-dashes");
          stages.push([makePath(gap, "connection-progress")]);
        }
      });
      const paths = stages.flat();
      const dots = [0, 1].map(() => {
        const dot = document.createElementNS(ns, "circle");
        dot.setAttribute("r", "3");
        dot.setAttribute("class", "connection-dot");
        dot.setAttribute("opacity", "0");
        svg.append(dot);
        return dot;
      });
      if (reduced.matches) return;
      context = gsap.context(() => {
        paths.forEach(path => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        });
        timeline = gsap.timeline({ paused: true, repeat: -1, repeatDelay: .25 });
        stages.forEach(stage => {
          const time = timeline!.duration();
          const duration = stage.length === 2 ? .9 : Math.max(.3, Math.min(.8, stage[0].getTotalLength() / 210));
          timeline!.set(dots[1], { opacity: stage.length === 2 ? 1 : 0 }, time);
          stage.forEach((path, i) => {
            const length = path.getTotalLength();
            const start = path.getPointAtLength(0);
            const progress = { value: 0 };
            timeline!.set(dots[i], { opacity: 1, attr: { cx: start.x, cy: start.y } }, time);
            // Let GSAP own the stroke throughout drawing and resetting each loop.
            timeline!.fromTo(path, { strokeDashoffset: length }, {
              strokeDashoffset: 0, duration, ease: "none", immediateRender: false,
            }, time);
            // Sample the very same circular-arc path used by the visible stroke.
            timeline!.fromTo(progress, { value: 0 }, {
              value: 1, duration, ease: "none", immediateRender: false,
              onUpdate: () => {
                const point = path.getPointAtLength(length * progress.value);
                dots[i].setAttribute("cx", String(point.x));
                dots[i].setAttribute("cy", String(point.y));
              },
            }, time);
          });
        });
        timeline.to(dots, { opacity: 0, duration: .2 });
        timeline.to(paths, { opacity: 0, duration: .45 }, "+=.6");
        timeline.set(paths, { strokeDashoffset: (_, element: SVGPathElement) => element.getTotalLength(), opacity: 1 });
      }, track);
      sync();
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(build); };
    const resize = new ResizeObserver(schedule);
    resize.observe(track);
    track.querySelectorAll(".app-item").forEach(item => resize.observe(item));
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    intersection.observe(track);
    reduced.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", sync);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      reduced.removeEventListener("change", schedule);
      document.removeEventListener("visibilitychange", sync);
      context?.revert();
    };
  }, []);
  return <div className="app-track connection-track" ref={trackRef}>
    {items.map(([symbol, name]) => <div className="app-item" key={name}><span>{symbol}</span><code>{name}</code></div>)}
    <svg ref={svgRef} className="connection-overlay" aria-hidden="true" />
  </div>;
}
