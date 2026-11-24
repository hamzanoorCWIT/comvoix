"use client";

import { useId } from 'react';
import { MotionSvg } from './motion';

const accent = 'var(--brand-accent, #f9a21e)';
const ink = 'var(--art-primary, #f8fafc)';
const muted = 'var(--art-secondary, #94a3b8)';
const border = 'var(--art-border)';
const channels = Array.from({ length: 7 }, (_, i) => {
  const start = 159 + i * 12, middle = 151 + i * 15, end = 172 + i * 8;
  const endX = 558 - Math.sqrt(58 ** 2 - (end - 196) ** 2);
  return {
    start, end, endX,
    path: `M171 ${start}C238 ${start} 255 ${middle} 327 ${middle}C399 ${middle} 455 ${end} ${endX} ${end}`,
    reverse: `M${endX} ${end}C455 ${end} 399 ${middle} 327 ${middle}C255 ${middle} 238 ${start} 171 ${start}`,
  };
});

export function SipTrunkArt({ label }: { label: string }) {
  const id = useId();
  return <MotionSvg className="communication-art service-scene sip-trunk-art" viewBox="0 0 680 390" role="img" aria-labelledby={`${id}-title`}>
    <title id={`${id}-title`}>{label}</title>
    <defs>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".15" /><stop offset=".5" stopColor="#fff" stopOpacity=".025" /><stop offset="1" stopColor={muted} stopOpacity=".12" /></linearGradient>
      <linearGradient id={`${id}-fiber`}><stop stopColor={muted} stopOpacity=".18" /><stop offset=".4" stopColor={muted} stopOpacity=".55" /><stop offset=".57" stopColor={accent} stopOpacity=".45" /><stop offset="1" stopColor={muted} stopOpacity=".25" /></linearGradient>
      <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={ink} stopOpacity=".45" /><stop offset=".45" stopColor={muted} stopOpacity=".2" /><stop offset=".72" stopColor={accent} stopOpacity=".4" /><stop offset="1" stopColor={muted} stopOpacity=".2" /></linearGradient>
      <radialGradient id={`${id}-globe`} cx="30%" cy="25%"><stop stopColor={muted} stopOpacity=".12" /><stop offset="1" stopColor={muted} stopOpacity=".015" /></radialGradient>
      <clipPath id={`${id}-world-clip`}><circle cx="558" cy="196" r="58" /></clipPath>
      <clipPath id={`${id}-gate-clip`}><rect x="286" y="86" width="82" height="190" rx="28" /></clipPath>
      <linearGradient id={`${id}-scan`} x1="0" y1="0" x2="0" y2="1"><stop stopColor={accent} stopOpacity="0" /><stop offset=".5" stopColor={accent} stopOpacity=".22" /><stop offset="1" stopColor={accent} stopOpacity="0" /></linearGradient>
    </defs>
    {/* Fine voice channels weave through a transparent vertical gateway. */}
    <g fill="none" stroke={`url(#${id}-fiber)`} strokeWidth="1.2">{channels.map(({ path }) => <path key={path} d={path} />)}</g>
    <path d="M173 143C250 139 265 132 329 134S444 153 499 154M173 247C250 251 265 259 329 258S444 239 499 238" fill="none" stroke={muted} strokeOpacity=".1" strokeDasharray="2 6" />
    {/* Existing phone infrastructure, drawn as a compact floating rack. */}
    <path d="M47 118 158 127q13 1 13 14v112q0 13-13 14l-111 9q-13 1-13-13V131q0-14 13-13Z" fill="var(--art-surface)" fillOpacity=".8" stroke={border} />
    <path d="M47 118 158 127q13 1 13 14v112q0 13-13 14l-111 9q-13 1-13-13V131q0-14 13-13Z" fill={`url(#${id}-glass)`} />
    <path d="m48 127 105 8M42 140v112" fill="none" stroke={ink} strokeOpacity=".12" strokeLinecap="round" />
    {[0, 1, 2].map(i => <g key={i}>
      <rect x="48" y={145 + i * 37} width="108" height="28" rx="7" fill="var(--art-soft)" stroke={border} />
      <circle cx="61" cy={159 + i * 37} r="2.5" fill={accent} data-art-blink="true" />
      {[0, 1, 2, 3].map(port => <rect key={port} x={83 + port * 16} y={154 + i * 37} width="9" height="10" rx="2" fill="none" stroke={muted} strokeOpacity=".5" />)}
    </g>)}
    <text x="102" y="302" textAnchor="middle" fill={ink} fontSize="12">Your existing PBX</text>
    <text x="102" y="320" textAnchor="middle" fill={muted} fontSize="9">Keep what works.</text>
    {/* Glass gateway, with no pedestal or floor. */}
    <rect x="293" y="89" width="82" height="190" rx="28" fill="var(--art-soft)" stroke={border} opacity=".3" transform="rotate(5 334 181)" />
    <rect x="286" y="86" width="82" height="190" rx="28" fill="var(--art-surface)" fillOpacity=".25" stroke={border} />
    {/* A light band sweeps through the gateway while it processes calls. */}
    <g clipPath={`url(#${id}-gate-clip)`}><rect x="286" y="86" width="82" height="28" fill={`url(#${id}-scan)`} data-art-scan="162" /></g>
    <rect x="286" y="86" width="82" height="190" rx="28" fill={`url(#${id}-glass)`} stroke={`url(#${id}-rim)`} strokeWidth=".8" />
    <path d="M301 111q0-10 12-10h23" fill="none" stroke={ink} strokeOpacity=".25" strokeLinecap="round" />
    <text x="327" y="123" textAnchor="middle" fill={ink} fontSize="12" letterSpacing="3">SIP</text>
    <path d="M313 262h28" stroke={muted} strokeOpacity=".3" strokeLinecap="round" />
    <text x="327" y="302" textAnchor="middle" fill={ink} fontSize="12">SIP gateway</text>
    <text x="327" y="320" textAnchor="middle" fill={muted} fontSize="9">Scale your conversations.</text>
    {/* Channel nodes inside the gateway flash in a wave, one per voice channel. */}
    {channels.map((_, i) => <circle key={i} cx="327" cy={151 + i * 15} r="1.8" fill={accent} data-art-blink="true" />)}
    {channels.map(({ path, reverse }, i) => <g key={path}>
      {i % 2 ? null : <circle r="6.5" fill={accent} fillOpacity=".2" opacity="0" data-motion-path={path} data-motion-speed="65" data-motion-period="8" data-motion-delay={i * .3} />}
      <circle r={i % 2 ? 1.8 : 2.4} fill={i % 2 ? ink : accent} opacity="0" data-motion-path={i % 2 ? reverse : path} data-motion-speed="65" data-motion-period="8" data-motion-delay={i * .3} />
    </g>)}
    {/* A wireframe globe expresses the IP voice network. */}
    <circle cx="558" cy="196" r="69" fill="none" stroke={muted} strokeOpacity=".18" strokeDasharray="2 8" data-art-trace="true" />
    <circle cx="558" cy="196" r="58" fill="var(--art-surface)" fillOpacity=".6" stroke={border} />
    <circle cx="558" cy="196" r="58" fill={`url(#${id}-globe)`} />
    <path d="M518 155a57 57 0 0 1 66-8" fill="none" stroke={ink} strokeOpacity=".25" strokeWidth="1.2" strokeLinecap="round" />
    <g clipPath={`url(#${id}-world-clip)`} fill="none" stroke={muted} strokeOpacity=".35" strokeWidth="1">
      {/* Four meridians turn out of phase so the globe slowly spins. */}
      {[.125, .375, .625, .875].map(phase => <ellipse key={phase} cx="558" cy="196" rx={(58 * Math.abs(Math.cos(phase * Math.PI))).toFixed(2)} ry="58" data-art-meridian={phase} data-art-radius="58" />)}
      <path d="M500 196h116" />
      <ellipse cx="558" cy="176" rx="56" ry="12" /><ellipse cx="558" cy="216" rx="56" ry="12" />
      <path d="M511 166Q570 126 607 215" stroke={accent} strokeOpacity=".65" strokeWidth="1.5" />
    </g>
    {channels.map(({ start, end, endX }, i) => <g key={start} fill={muted}>
      <circle cx="171" cy={start} r="1.8" />
      <circle cx={endX} cy={end} r="1.8" opacity={i % 2 ? .5 : .8} />
    </g>)}
    <circle cx="526" cy="164" r="4" fill={accent} data-art-pulse="true" /><circle cx="590" cy="212" r="3" fill={ink} /><circle cx="540" cy="229" r="3" fill={muted} />
    <text x="558" y="302" textAnchor="middle" fill={ink} fontSize="12">Comvoix voice network</text>
    <text x="558" y="320" textAnchor="middle" fill={muted} fontSize="9">Reach beyond your office.</text>
    <rect x="254" y="35" width="146" height="31" rx="15.5" fill="var(--art-soft)" fillOpacity=".5" stroke={border} strokeOpacity=".65" />
    <g fill="none" stroke={muted} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M266 47h13m-3-3 3 3-3 3M279 55h-13m3-3-3 3 3 3" /></g>
    <text x="291" y="54" fill={ink} fontSize="10">Two-way voice</text>
    <text x="340" y="372" textAnchor="middle" fill={ink} fontSize="12">More conversations. Fewer physical lines.</text>
  </MotionSvg>;
}
