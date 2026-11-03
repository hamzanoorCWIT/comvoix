"use client";
import { memo, useState } from "react";
import Image from "next/image";
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
const wavePaths = Array.from({ length: 32 }, (_, i) => Array.from({ length: 65 }, (_, j) => {
  const u = j / 64, phase = u * Math.PI * 2, spread = (i - 16) / 16;
  const x = 1000 * (.76 + .21 * Math.sin(phase) + spread * (.065 + .055 * Math.cos(phase + 1)));
  return `${j ? "L" : "M"}${x.toFixed(2)},${(u * 980 - 90).toFixed(2)}`;
}).join(" "));

export function Waves() {
  return (
    <div className="light-waves" aria-hidden="true">
      <div className="wave-layer">
        <svg viewBox="0 0 1000 800" preserveAspectRatio="none">
          {wavePaths.map((d, i) => <path key={i} d={d} fill="none" stroke={i % 7 === 0 ? "#5bc1ff" : "#bff555"} strokeOpacity={.24 + i % 5 * .055} strokeWidth={i % 6 === 0 ? 1.5 : 1} vectorEffect="non-scaling-stroke" />)}
        </svg>
      </div>
    </div>
  )
}
export const Workflow = memo(function Workflow() { const [zoom, setZoom] = useState(100); return <div className="workflow glass"><div className="workflow-top"><span>Global communications <b>│</b> <code>voice / messaging / cloud</code></span><code className="lime">connected</code></div><div className="workflow-canvas"><div className="canvas-tools"><button aria-label="Reset canvas zoom" onClick={() => setZoom(100)}>↖</button><button aria-label="Zoom in" onClick={() => setZoom(Math.min(125, zoom + 5))}>+</button><button aria-label="Zoom out" onClick={() => setZoom(Math.max(75, zoom - 5))}>−</button></div><code className="zoom">{zoom}%</code><div className="flow" style={{ transform: `scale(${zoom / 100})` }}><MotionSvg className="connections" viewBox="0 0 700 300" preserveAspectRatio="none"><path d="M196 150 C238 150 238 65 280 65 M196 150 C238 150 238 245 280 245 M490 65 C540 65 538 150 588 150 M490 245 C540 245 538 150 588 150" /><path className="active-path" d="M196 150 C238 150 238 65 280 65 M490 65 C540 65 538 150 588 150" /><circle r="3" className="flow-particle" cx="196" cy="150" data-duration="3" data-motion-path="M196 150 C238 150 238 65 280 65 L490 65 C540 65 538 150 588 150" /></MotionSvg><div className="flow-node trigger">Incoming call<code>voice gateway</code></div><span className="branch branch-true">voice</span><span className="branch branch-else">message</span><div className="flow-node condition">Smart routing<code>business VoIP</code></div><div className="flow-node warehouse">Send a message<code>messaging API</code></div><div className="flow-node finance">Your team<code>ready to connect</code><small>● connected</small></div></div></div><div className="last-runs"><code>communication activity · illustration</code>{[["09:41:02", "voice connected", "voice"], ["09:38:57", "message delivered", "message"], ["09:31:14", "team connected", "cloud"]].map((r, i) => <div key={r[0]}><i className={i === 0 ? "live-dot" : ""} /><span>{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span></div>)}</div></div>; });
