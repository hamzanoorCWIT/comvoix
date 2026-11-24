"use client";
import { memo, useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
export { Waves } from "./particle-waves";
// import logo from "../../public/assets/images/logo.png";
// import lightLogo from "../../public/assets/images/logo-light.png";
import darkLogo from "../../public/assets/images/logo.png";
import lightLogo from "../../public/assets/images/logo-light.png";
import { MotionSvg } from "./motion";

// export function Logo() { return <Image className="brand-logo" src={logo} alt="Comvoix" sizes="(max-width: 760px) 128px, 144px" />; }
export function Logo() {
  return (
    <span className="theme-brand-logo">
      <Image
        className="brand-logo logo-dark"
        src={darkLogo}
        alt="Comvoix"
        sizes="(max-width: 760px) 128px, 144px"
      />

      <Image
        className="brand-logo logo-light"
        src={lightLogo}
        alt=""
        aria-hidden="true"
        sizes="(max-width: 760px) 128px, 144px"
      />
    </span>
  );
}

export function Mark({ dark = false }: {
  dark?: boolean;
}) {
  return <span className={`mark ${dark ? "mark-dark" : ""}`} aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="m8 8 8 8-8 8" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" opacity=".45" /><path d="m16 8 8 8-8 8" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>;
}
export const Workflow = memo(function Workflow() {
  const [zoom, setZoom] = useState(100);
  const panel = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  // Cursor tilt: the static wrapper is measured (never the rotating panel), targets are eased per frame.
  const motion = useRef({ target: [-7, 0, 0], current: [-7, 0, 0], frame: 0 });
  function animate() {
    const state = motion.current, el = panel.current;
    if (!el) return;
    let settled = true;
    state.current = state.current.map((value, i) => {
      const next = value + (state.target[i] - value) * .12;
      if (Math.abs(state.target[i] - next) > .01) settled = false;
      return next;
    });
    el.style.setProperty("--tilt-y", `${state.current[0].toFixed(2)}deg`);
    el.style.setProperty("--tilt-x", `${state.current[1].toFixed(2)}deg`);
    el.style.setProperty("--tilt-shift", `${state.current[2].toFixed(2)}%`);
    state.frame = settled ? 0 : requestAnimationFrame(animate);
  }
  function setTarget(target: number[]) {
    motion.current.target = target;
    if (!motion.current.frame) motion.current.frame = requestAnimationFrame(animate);
  }
  function tilt(event: PointerEvent<HTMLDivElement>) {
    const box = stage.current;
    if (!box || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = box.getBoundingClientRect();
    const x = Math.min(.5, Math.max(-.5, (event.clientX - rect.left) / rect.width - .5));
    const y = Math.min(.5, Math.max(-.5, (event.clientY - rect.top) / rect.height - .5));
    setTarget([-7 + (x > 0 ? x * 22 : x * 8), -y * 5, -Math.max(0, x) * 7]);
  }
  function resetTilt() { setTarget([-7, 0, 0]); }
  useEffect(() => () => cancelAnimationFrame(motion.current.frame), []);
  return <div className="workflow-stage" ref={stage} onPointerMove={tilt} onPointerLeave={resetTilt}><div className="workflow glass" ref={panel}><div className="workflow-top"><span>Global communications <b>│</b> <code>voice / messaging / cloud</code></span><code className="workflow-status">Connected</code></div><div className="workflow-canvas"><div className="canvas-tools"><button aria-label="Reset canvas zoom" onClick={() => setZoom(100)}>↖</button><button aria-label="Zoom in" onClick={() => setZoom(Math.min(125, zoom + 5))}>+</button><button aria-label="Zoom out" onClick={() => setZoom(Math.max(75, zoom - 5))}>−</button></div><code className="zoom">{zoom}%</code><div className="flow" style={{ transform: `scale(${zoom / 100})` }}><MotionSvg data-motion-duration="3" className="connections" viewBox="0 0 700 300" preserveAspectRatio="none"><path d="M196 150 C238 150 238 65 280 65 M196 150 C238 150 238 245 280 245 M490 65 C540 65 538 150 588 150 M490 245 C540 245 538 150 588 150" /><path className="active-path" d="M196 150 C238 150 238 65 280 65 M490 65 C540 65 538 150 588 150" /><circle r="3" className="flow-particle" cx="196" cy="150" data-duration="3" data-motion-path="M196 150 C238 150 238 65 280 65 L490 65 C540 65 538 150 588 150" /></MotionSvg><div className="flow-node trigger">Incoming call<code>voice gateway</code></div><span className="branch branch-true">voice</span><span className="branch branch-else">message</span><div className="flow-node condition">Smart routing<code>business VoIP</code></div><div className="flow-node warehouse">Send a message<code>messaging API</code></div><div className="flow-node finance">Your team<code>ready to connect</code><small>● Connected</small></div></div></div><div className="last-runs"><code>communication activity · illustration</code>{[["09:41:02", "voice connected", "voice"], ["09:38:57", "message delivered", "message"], ["09:31:14", "team connected", "cloud"]].map((r, i) => <div key={r[0]}><i className={i === 0 ? "live-dot" : ""} /><span>{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span></div>)}</div></div></div>; });
