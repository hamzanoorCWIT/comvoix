"use client";

import { useEffect, useRef, type SVGProps } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);
// Keep frame pacing steady after tab switches or long frames instead of jumping to catch up.
gsap.ticker.lagSmoothing(600, 40);

// One observer per illustration; no scroll handlers or React updates per frame.
export function MotionSvg(props: SVGProps<SVGSVGElement>) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current!;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const accents: gsap.core.Animation[] = [];
      svg.querySelectorAll<SVGCircleElement>("[data-motion-path]").forEach(dot => {
        gsap.set(dot, { attr: { cx: 0, cy: 0 } });
        const originalDuration = Number(dot.dataset.duration) || 4;
        const overrideDuration = Number(svg.dataset.motionDuration);
        const duration = overrideDuration > 0
          ? overrideDuration
          : Math.min(3.6, Math.max(1.8, originalDuration * .55));
        const path = dot.dataset.motionPath!;
        const geometry = document.createElementNS("http://www.w3.org/2000/svg", "path");
        geometry.setAttribute("d", path);
        const length = geometry.getTotalLength();
        const start = geometry.getPointAtLength(0);
        const end = geometry.getPointAtLength(length);
        const closed = Math.hypot(end.x - start.x, end.y - start.y) < 1;
        // data-motion-speed (units/s) keeps dots on routes of different lengths moving in step;
        // data-motion-period pads each loop to a shared cycle so they restart together.
        const speed = Number(dot.dataset.motionSpeed);
        const travel = speed > 0 ? length / speed : duration;
        // data-motion-delay starts a dot part-way through the shared period, so several routes can run one after another.
        const delay = Math.max(0, Number(dot.dataset.motionDelay) || 0);
        const period = Math.max(delay + travel, Number(dot.dataset.motionPeriod) || 0);
        const loop = gsap.timeline({ repeat: -1, paused: true });
        loop.to(dot, { motionPath: { path }, duration: travel, ease: "none" }, delay);
        if (period > delay + travel) loop.to({}, { duration: period - delay - travel }, delay + travel);
        if (!closed) {
          // Hide the reset on open routes with a soft fade; closed orbits remain continuously visible.
          const fade = Math.min(.45, travel * .25);
          loop.set(dot, { opacity: 0 }, 0);
          loop.fromTo(dot, { opacity: 0 }, { opacity: 1, duration: fade, ease: "sine.inOut" }, delay);
          loop.to(dot, { opacity: 0, duration: fade, ease: "sine.inOut" }, delay + travel - fade);
        }
        accents.push(loop);
      });
      // A stroke that is drawn in at data-motion-speed, holds, then clears at the end of data-motion-period,
      // so it lights up in step with a dot travelling the same route.
      svg.querySelectorAll<SVGPathElement>("[data-motion-reveal]").forEach(trace => {
        const length = trace.getTotalLength();
        const speed = Number(trace.dataset.motionSpeed) || 120;
        const travel = length / speed;
        const delay = Math.max(0, Number(trace.dataset.motionDelay) || 0);
        const period = Math.max(delay + travel + .7, Number(trace.dataset.motionPeriod) || 0);
        const loop = gsap.timeline({ repeat: -1, paused: true });
        loop.set(trace, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 }, 0);
        loop.fromTo(trace, { strokeDashoffset: length }, { strokeDashoffset: 0, duration: travel, ease: "none" }, delay);
        loop.to(trace, { opacity: 0, duration: .7, ease: "sine.inOut" }, period - .7);
        accents.push(loop);
      });
      // An overlay that lights up when a dot travelling data-motion-route (at data-motion-speed) reaches its end,
      // then clears with the rest of the cycle at data-motion-period.
      svg.querySelectorAll<SVGElement>("[data-motion-light]").forEach(light => {
        const route = light.dataset.motionRoute;
        if (!route) return;
        const geometry = document.createElementNS("http://www.w3.org/2000/svg", "path");
        geometry.setAttribute("d", route);
        const speed = Number(light.dataset.motionSpeed) || 120;
        const arrive = Math.max(0, Number(light.dataset.motionDelay) || 0) + geometry.getTotalLength() / speed;
        const period = Math.max(arrive + 1.1, Number(light.dataset.motionPeriod) || 0);
        const loop = gsap.timeline({ repeat: -1, paused: true });
        loop.set(light, { opacity: 0 }, 0);
        loop.to(light, { opacity: 1, duration: .4, ease: "sine.out" }, arrive);
        loop.to(light, { opacity: 0, duration: .7, ease: "sine.inOut" }, period - .7);
        accents.push(loop);
      });
      // A dashed stroke that slides along itself by data-motion-dash units, starting at data-motion-delay for
      // data-motion-duration seconds, inside the shared data-motion-period, so it can answer an arriving dot.
      svg.querySelectorAll<SVGElement>("[data-motion-dash]").forEach(track => {
        const distance = Number(track.dataset.motionDash) || 100;
        const delay = Math.max(0, Number(track.dataset.motionDelay) || 0);
        const duration = Number(track.dataset.motionDuration) || 1;
        const period = Math.max(delay + duration, Number(track.dataset.motionPeriod) || 0);
        const loop = gsap.timeline({ repeat: -1, paused: true });
        loop.fromTo(track, { strokeDashoffset: 0 }, { strokeDashoffset: -distance, duration, ease: "power2.inOut" }, delay);
        if (period > delay + duration) loop.to({}, { duration: period - delay - duration }, delay + duration);
        accents.push(loop);
      });
      // Composite the whole illustration instead of repeatedly transforming SVG text groups.
      const floats = !!svg.querySelector("[data-art-float]");
      if (floats) svg.classList.add("art-float-layer");
      svg.querySelectorAll<SVGElement>("[data-art-bar]").forEach((element, i) => {
        const bounds = (element as SVGGraphicsElement).getBBox();
        const origin = `${bounds.x + bounds.width / 2} ${bounds.y + bounds.height / 2}`;
        accents.push(gsap.to(element, { scaleY: .35, svgOrigin: origin, duration: .7 + (i % 5) * .16, delay: i * .06, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true }));
      });
      svg.querySelectorAll<SVGElement>("[data-art-pulse]").forEach((element, i) => {
        const targets = element.querySelector("text")
          ? Array.from(element.children).filter(child => child.tagName.toLowerCase() !== "text" && !child.querySelector("text"))
          : [element];
        if (!targets.length) return;
        accents.push(gsap.to(targets, { opacity: .55, duration: 2, delay: i * .25, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true }));
      });
      // Expanding rings that fade out, staggered so a ringing phone sends out a steady ripple.
      // Circles grow their radius (constant stroke); other shapes, like a pill button, scale from their centre.
      svg.querySelectorAll<SVGGraphicsElement>("[data-art-ripple]").forEach((ring, i) => {
        const growth = Number(ring.dataset.artRipple) || 1.8;
        const timing = { opacity: 0, duration: 2.4, delay: i * .8, repeat: -1, ease: "sine.out", paused: true };
        if (ring.tagName.toLowerCase() === "circle") {
          const radius = Number(ring.getAttribute("r")) || 30;
          accents.push(gsap.fromTo(ring, { attr: { r: radius }, opacity: .7 }, { attr: { r: radius * growth }, ...timing }));
        } else {
          accents.push(gsap.fromTo(ring, { scale: 1, opacity: .7, transformOrigin: "50% 50%" }, { scale: growth, ...timing }));
        }
      });
      // A short ring-shake burst, then a rest, like a handset ringing. data-art-ring holds the "x y" pivot.
      svg.querySelectorAll<SVGElement>("[data-art-ring]").forEach(element => {
        const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.6, paused: true });
        loop.set(element, { svgOrigin: element.dataset.artRing || "0 0" });
        for (let n = 0; n < 6; n++) loop.to(element, { rotation: n % 2 ? -9 : 9, duration: .07, ease: "sine.inOut" });
        loop.to(element, { rotation: 0, duration: .12, ease: "sine.out" });
        accents.push(loop);
      });
      // A slow rocking sway for a background sheet; data-art-sway holds the "x y" pivot.
      svg.querySelectorAll<SVGElement>("[data-art-sway]").forEach(element => {
        accents.push(gsap.fromTo(element,
          { rotation: -1.5, svgOrigin: element.dataset.artSway || "0 0" },
          { rotation: 1.5, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true },
        ));
      });
      // A call timer that ticks once per second from its static text (mm:ss); no React updates.
      svg.querySelectorAll<SVGTextElement>("[data-art-timer]").forEach(timer => {
        const [m, s] = (timer.textContent || "00:00").split(":").map(Number);
        let seconds = (m || 0) * 60 + (s || 0);
        const pad = (value: number) => String(value).padStart(2, "0");
        accents.push(gsap.to({}, {
          duration: 1, repeat: -1, paused: true, onRepeat: () => {
            seconds = (seconds + 1) % 3600;
            timer.textContent = `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`;
          },
        }));
      });
      // Meridian ellipses that narrow and widen out of phase so a wireframe globe appears to turn.
      // data-art-meridian holds the phase (0–1) along one revolution; the ellipse's rx is its full radius.
      const meridians = Array.from(svg.querySelectorAll<SVGEllipseElement>("[data-art-meridian]")).map(ellipse => ({
        ellipse,
        radius: Number(ellipse.dataset.artRadius) || Number(ellipse.getAttribute("rx")) || 50,
        phase: Number(ellipse.dataset.artMeridian) || 0,
      }));
      if (meridians.length) {
        const turn = { t: 0 };
        accents.push(gsap.to(turn, {
          t: 1, duration: 9, repeat: -1, ease: "none", paused: true, onUpdate: () => {
            meridians.forEach(({ ellipse, radius, phase }) => {
              ellipse.setAttribute("rx", (Math.abs(Math.cos((turn.t + phase) * Math.PI)) * radius).toFixed(2));
            });
          },
        }));
      }
      // A light band sweeping back and forth by data-art-scan units, e.g. across a gateway.
      svg.querySelectorAll<SVGElement>("[data-art-scan]").forEach(element => {
        accents.push(gsap.fromTo(element, { y: 0 }, { y: Number(element.dataset.artScan) || 100, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true }));
      });
      // Indicator lights that flash in a staggered wave (document order sets the stagger).
      svg.querySelectorAll<SVGElement>("[data-art-blink]").forEach((element, i) => {
        accents.push(gsap.fromTo(element,
          { opacity: .2 },
          { opacity: 1, duration: .45, delay: i * .14, repeat: -1, yoyo: true, repeatDelay: .9, ease: "sine.inOut", paused: true },
        ));
      });
      // Continuous rotation, e.g. a clock hand; data-art-spin holds the transform origin within the element's box.
      svg.querySelectorAll<SVGElement>("[data-art-spin]").forEach(element => {
        accents.push(gsap.fromTo(element,
          { rotation: 0, transformOrigin: element.dataset.artSpin || "50% 50%" },
          { rotation: 360, duration: 4, repeat: -1, ease: "none", paused: true },
        ));
      });
      svg.querySelectorAll<SVGElement>("[data-art-rock]").forEach(element => {
        accents.push(gsap.fromTo(element,
          { rotation: -6, y: 5, svgOrigin: "300 125" },
          { rotation: 6, y: -9, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true },
        ));
      });
      svg.querySelectorAll<SVGElement>("[data-art-trace]").forEach((element, i) => {
        accents.push(gsap.to(element, { strokeDashoffset: -100, duration: 2.6 + i * .6, repeat: -1, ease: "none", paused: true }));
      });
      svg.querySelectorAll<SVGGElement>("[data-art-journey]").forEach(group => {
        const line = group.querySelector("line");
        const dot = group.querySelector("circle");
        if (!line || !dot) return;
        // Matching endpoints and timing keep the solid trail attached on both legs.
        const timing = { duration: 1.6, repeat: -1, yoyo: true, repeatDelay: .15, ease: "sine.inOut", paused: true };
        accents.push(gsap.to(line, { attr: { x2: 442 }, ...timing }));
        const checkBorders = svg.querySelectorAll<SVGElement>("[data-journey-check]");
        const syncCheck = () => {
          checkBorders.forEach(border => {
            const start = Number(border.dataset.journeyStart);
            const progress = Math.max(0, Math.min(1, (Number(dot.getAttribute("cx")) - start) / 38));
            border.setAttribute("opacity", String(progress * progress * (3 - 2 * progress)));
          });
        };
        accents.push(gsap.to(dot, { attr: { cx: 442 }, ...timing, onUpdate: syncCheck }));
      });
      let visible = false;
      const sync = () => {
        const paused = !visible || document.hidden;
        if (floats) svg.style.animationPlayState = paused ? "paused" : "running";
        accents.forEach(tween => tween.paused(paused));
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      observer.observe(svg);
      document.addEventListener("visibilitychange", sync);
      return () => {
        observer.disconnect();
        if (floats) {
          svg.classList.remove("art-float-layer");
          svg.style.removeProperty("animation-play-state");
        }
        svg.querySelectorAll("[data-journey-check]").forEach(border => border.setAttribute("opacity", "0"));
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
      const sync = () => {
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
