"use client";

import { useEffect, useRef, type SVGProps } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

// One observer per illustration; no scroll handlers or React updates per frame.
export function MotionSvg(props: SVGProps<SVGSVGElement>) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current!;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ paused: true, repeat: -1 });
      svg.querySelectorAll<SVGCircleElement>("[data-motion-path]").forEach(dot => {
        gsap.set(dot, { attr: { cx: 0, cy: 0 } });
        timeline.to(dot, {
          motionPath: { path: dot.dataset.motionPath! },
          duration: Number(dot.dataset.duration), ease: "none",
        }, 0);
      });
      let visible = false;
      const sync = () => timeline.paused(!visible || document.hidden);
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      observer.observe(svg);
      document.addEventListener("visibilitychange", sync);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", sync);
      };
    });
    return () => media.revert();
  }, []);
  return <svg {...props} ref={ref} />;
}

export function PageMotion() {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const reveals = gsap.utils.toArray<HTMLElement>(".reveal")
        .filter(element => element.getBoundingClientRect().top >= window.innerHeight);
      const tweens = reveals.map(element => gsap.fromTo(element,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: .65, ease: "power2.out", paused: true, clearProps: "opacity,transform" },
      ));
      const lookup = new Map(reveals.map((element, i) => [element, tweens[i]]));
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        lookup.get(entry.target as HTMLElement)?.play();
        observer.unobserve(entry.target);
      }), { threshold: .05 });
      reveals.forEach(element => observer.observe(element));
      const waves = gsap.to(".wave-layer", {
        xPercent: -4, yPercent: -3, duration: 12, repeat: -1,
        yoyo: true, ease: "sine.inOut",
      });
      const sync = () => {
        waves.paused(document.hidden);
        tweens.forEach(tween => {
          if (tween.progress() > 0 && tween.progress() < 1) tween.paused(document.hidden);
        });
      };
      sync();
      document.addEventListener("visibilitychange", sync);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", sync);
      };
    });
    return () => media.revert();
  }, []);
  return null;
}
