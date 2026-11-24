"use client";

import { useEffect, useRef } from "react";
import { createRibbonRenderer, type RibbonSettings } from "./particle-wave-renderer";

export function Waves() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    // Own the canvas per effect, since a transferred canvas cannot be transferred again
    // when React Strict Mode replays setup or this component remounts.
    let canvas = document.createElement("canvas");
    canvas.className = "particle-waves";
    layer.appendChild(canvas);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let worker: Worker | undefined;
    let fallback: ReturnType<typeof createRibbonRenderer>;
    let updateFrame = 0;
    let rotationFrame = 0;
    let rotation = 0;
    let previousRotationTime = 0;
    let disposed = false;

    // Rotate only the presentation layer; scrolling must not restart the worker animation.
    const updateRotation = (now: number) => {
      rotationFrame = 0;
      const width = Math.max(layer.clientWidth, 1);
      const height = Math.max(layer.clientHeight, 1);
      // Keep turning with scroll distance rather than reversing in a bounded sway.
      const target = reducedMotion.matches ? 0 : window.scrollY / Math.max(window.innerHeight, 1) * 8;
      const elapsed = previousRotationTime ? Math.min(now - previousRotationTime, 64) : 16;
      previousRotationTime = now;
      rotation = reducedMotion.matches ? 0 : rotation + (target - rotation) * (1 - Math.exp(-elapsed / 180));
      if (Math.abs(target - rotation) < .001) rotation = target;
      const radians = rotation * Math.PI / 180;
      const sine = Math.abs(Math.sin(radians));
      const cosine = Math.abs(Math.cos(radians));
      // Keep zoom subtle even as the rotation continues through larger angles.
      const scale = Math.min(1.12, Math.max(1, cosine + height / width * sine, cosine + width / height * sine));
      canvas.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      if (rotation !== target) rotationFrame = requestAnimationFrame(updateRotation);
      else previousRotationTime = 0;
    };
    const scheduleRotation = () => {
      if (!rotationFrame) rotationFrame = requestAnimationFrame(updateRotation);
    };

    const settings = (): RibbonSettings => {
      const theme = getComputedStyle(layer);
      return {
        width: layer.clientWidth,
        height: layer.clientHeight,
        ratio: Math.min(window.devicePixelRatio || 1, 1.5),
        accent: theme.getPropertyValue("--brand-accent").trim(),
        primary: theme.getPropertyValue("--art-primary").trim(),
        light: document.documentElement.dataset.theme === "light",
        running: !document.hidden && !reducedMotion.matches,
      };
    };
    const update = () => {
      scheduleRotation();
      const next = settings();
      if (worker) worker.postMessage({ type: "update", settings: next });
      else {
        // Older browsers retain the ribbon without an expensive main-thread loop.
        fallback?.configure(next);
        fallback?.draw(0);
      }
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(updateFrame);
      updateFrame = requestAnimationFrame(update);
    };
    const activateFallback = () => {
      if (disposed) return;
      worker?.terminate();
      worker = undefined;
      const replacement = document.createElement("canvas");
      replacement.className = "particle-waves";
      canvas.replaceWith(replacement);
      canvas = replacement;
      fallback = createRibbonRenderer(canvas);
      update();
    };

    try {
      if (typeof Worker === "undefined" || !canvas.transferControlToOffscreen) {
        activateFallback();
      } else {
        worker = new Worker(new URL("./particle-waves.worker.ts", import.meta.url));
        worker.onerror = activateFallback;
        const offscreen = canvas.transferControlToOffscreen();
        worker.postMessage({ type: "init", canvas: offscreen }, [offscreen]);
        update();
      }
    } catch {
      activateFallback();
    }

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    const themeObserver = new MutationObserver(scheduleUpdate);
    resizeObserver.observe(layer);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    reducedMotion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("scroll", scheduleRotation, { passive: true });
    window.addEventListener("resize", scheduleRotation);

    return () => {
      disposed = true;
      cancelAnimationFrame(updateFrame);
      cancelAnimationFrame(rotationFrame);
      worker?.terminate();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      reducedMotion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("scroll", scheduleRotation);
      window.removeEventListener("resize", scheduleRotation);
      canvas.remove();
    };
  }, []);

  return <div className="light-waves" aria-hidden="true" ref={layerRef} />;
}
