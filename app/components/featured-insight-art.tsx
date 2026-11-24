"use client";

import { useId } from "react";
import { MotionSvg } from "./motion";

// Shared cycle: the inbound signal reaches the dial (~1.45s), then outbound signals leave together at OUT_DELAY.
// PERIOD leaves >1.1s after the last arrival so every light holds, then all loops restart in step.
const SPEED = "110", PERIOD = "6.2", OUT_DELAY = 2.9;

/** A live conversation instrument, with no decorative background layer. */
export function FeaturedInsightArt() {
  const id = useId();
  const accent = "var(--brand-accent)";
  const ink = "var(--art-primary)";
  const muted = "var(--art-secondary)";
  const surface = "var(--art-surface)";
  const border = "var(--art-border)";
  const routes = [
    "M180 116H226Q246 116 246 136V176H288",
    "M472 176H514Q534 176 534 156V103H574",
    "M468 226H510Q530 226 530 246V290H574",
  ];
  return <MotionSvg className="communication-art featured-insight-art" viewBox="0 0 760 380" role="img" aria-labelledby={`${id}-title`}>
    <title id={`${id}-title`}>Animated business conversation with a live voice waveform, flowing signals and message delivery</title>
    <defs>
      <linearGradient id={`${id}-face`} x1="0" y1="0" x2="0" y2="1">
        <stop stopColor={surface}/><stop offset="1" stopColor="var(--art-soft)"/>
      </linearGradient>
    </defs>
    {/* Each route draws an accent trace behind a glowing signal: in from the conversation, then out to delivery and the team. */}
    {routes.map((path, i) => { const delay = i === 0 ? 0 : OUT_DELAY; return <g key={path}>
      <path d={path} fill="none" stroke={border} strokeWidth="1.5"/>
      <path d={path} fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" opacity="0" data-motion-reveal="true" data-motion-speed={SPEED} data-motion-period={PERIOD} data-motion-delay={delay}/>
      <circle r="8" fill={accent} fillOpacity=".2" opacity="0" data-motion-path={path} data-motion-speed={SPEED} data-motion-delay={delay} data-motion-period={PERIOD}/>
      <circle cx={i === 0 ? 180 : 472} cy={i === 2 ? 226 : i === 0 ? 116 : 176} r="3.5" fill={accent} data-motion-path={path} data-motion-speed={SPEED} data-motion-delay={delay} data-motion-period={PERIOD}/>
    </g>; })}
    {/* Dashed voice instrument without the gray ring or outer border. */}
    <rect x="289" y="106" width="182" height="182" rx="34" fill={surface}/>
    <rect x="293" y="110" width="174" height="174" rx="31" fill="none" stroke={ink} opacity=".25" strokeDasharray="1.5 7.6" pathLength="400" strokeWidth="4" data-motion-dash="45.5" data-motion-delay="1.45" data-motion-duration="1.35" data-motion-period={PERIOD}/>
    <path d="M380 108v8M380 278v8M291 197h8M461 197h8" stroke={accent} strokeWidth="2" opacity=".85" strokeLinecap="round"/>
    <rect className="dial-face" x="301" y="118" width="158" height="158" rx="26" fill={`url(#${id}-face)`} stroke={border}/>
    <g transform="translate(0 72)">
      {[12, 22, 36, 20, 48, 62, 38, 72, 52, 30, 58, 42, 24, 36, 14].map((height, i) =>
        <rect key={i} className="dial-wave" x={322 + i * 8} y={125 - height / 2} width="4" height={height} rx="2" fill={accent} data-art-bar=""/>
      )}
    </g>
    <text x="380" y="158" textAnchor="middle" fill={muted} fontSize="8" letterSpacing="2">VOICE IN MOTION</text>
    <g data-art-pulse=""><circle cx="355" cy="243" r="3" fill={accent}/><text x="365" y="246" fill={ink} fontSize="9" letterSpacing="1.5">LIVE CALL</text></g>
    <text x="380" y="263" textAnchor="middle" fill={muted} fontSize="9" letterSpacing="1" style={{ fontVariantNumeric: "tabular-nums" }} data-art-timer="true">03:42</text>
    {/* The dial's frame glows while the conversation is live, from the signal's arrival to the end of the cycle. */}
    <rect x="301" y="118" width="158" height="158" rx="26" fill="none" stroke={accent} strokeOpacity=".55" strokeWidth="1.4" opacity="0" data-motion-light="true" data-motion-route={routes[0]} data-motion-speed={SPEED} data-motion-period={PERIOD}/>
    {/* Floating conversation cards carry their own surfaces; the canvas stays clear. */}
    <g data-art-float="">
      <rect x="48" y="62" width="156" height="111" rx="16" fill={surface} stroke={border}/>
      <rect x="62" y="76" width="30" height="30" rx="10" fill="var(--art-soft)" stroke={border}/>
      <path d="M70 84h14v11h-6l-5 4v-4h-3Z" fill="none" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
      <text x="103" y="88" fill={ink} fontSize="10" fontWeight="600">Conversation</text>
      <text x="103" y="101" fill={muted} fontSize="8">Every channel. Together.</text>
      <path d="M64 121h113M64 130h83" stroke={muted} strokeWidth="3" strokeLinecap="round" opacity=".5"/>
      {[0, 1, 2].map(i => <circle key={i} cx={68 + i * 10} cy="151" r="2.5" fill={accent} data-art-blink=""/>)}
      <rect x="48" y="62" width="156" height="111" rx="16" fill="none" stroke={accent} strokeOpacity=".7" strokeWidth="1.3" opacity="0" data-motion-light="true" data-motion-route="M180 116h1" data-motion-speed={SPEED} data-motion-period={PERIOD}/>
      <text x="188" y="154" textAnchor="end" fill={muted} fontSize="8">typing</text>
    </g>
    <g data-art-float="">
      <rect x="563" y="57" width="152" height="91" rx="16" fill={surface} stroke={border}/>
      {/* Delivery confirms when the outbound signal lands. */}
      <g opacity="0" data-motion-light="true" data-motion-route={routes[1]} data-motion-speed={SPEED} data-motion-period={PERIOD} data-motion-delay={OUT_DELAY}>
        <rect x="563" y="57" width="152" height="91" rx="16" fill={accent} fillOpacity=".06" stroke={accent} strokeOpacity=".7" strokeWidth="1.3"/>
        <circle cx="587" cy="83" r="17" fill="none" stroke={accent} strokeOpacity=".4"/>
      </g>
      <circle cx="587" cy="83" r="11" fill={accent}/>
      <path d="m582 83 3 3 6-6" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round"/>
      <text x="606" y="86" fill={ink} fontSize="10" fontWeight="600">Message delivered</text>
      <path d="M580 108h116M580 119h78" stroke={muted} strokeWidth="3" strokeLinecap="round" opacity=".5"/>
    </g>
    <g data-art-float="">
      <rect x="553" y="248" width="164" height="81" rx="16" fill={surface} stroke={border}/>
      <text x="569" y="270" fill={muted} fontSize="8" letterSpacing="1.2">CONNECTED TEAMS</text>
      <rect x="553" y="248" width="164" height="81" rx="16" fill="none" stroke={accent} strokeOpacity=".7" strokeWidth="1.3" opacity="0" data-motion-light="true" data-motion-route={routes[2]} data-motion-speed={SPEED} data-motion-period={PERIOD} data-motion-delay={OUT_DELAY}/>
      {[0, 1, 2].map(i => <g key={i} transform={`translate(${582 + i * 25} 298)`}>
        <circle r="15" fill={surface} stroke={muted}/><circle cy="-4" r="4" fill={muted}/><path d="M-8 8a8 8 0 0 1 16 0" fill={muted}/>
        {/* Team members join one by one once the call reaches them. */}
        <g opacity="0" data-motion-light="true" data-motion-route={routes[2]} data-motion-speed={SPEED} data-motion-period={PERIOD} data-motion-delay={OUT_DELAY + .15 + i * .2}>
          <circle r="15" fill={surface} stroke={accent} strokeWidth="1.4"/><circle cy="-4" r="4" fill={accent}/><path d="M-8 8a8 8 0 0 1 16 0" fill={accent}/>
        </g>
      </g>)}
      <circle cx="688" cy="298" r="4" fill={accent} data-art-pulse=""/>
    </g>
    <g data-art-float="">
      <rect x="101" y="253" width="142" height="48" rx="24" fill={ink}/>
      <g data-art-ring="129 277"><path d="M119 270c0 9 7 16 16 16l4-5-6-4-3 3-5-5 3-3-4-6Z" fill="none" stroke={surface} strokeWidth="1.5" strokeLinejoin="round"/></g>
      <text x="151" y="275" fill={surface} fontSize="10" fontWeight="600">Connected</text>
      <text x="151" y="288" fill={surface} fontSize="8" opacity=".7">A better conversation</text>
    </g>
  </MotionSvg>;
}
