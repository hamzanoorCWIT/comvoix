"use client";

import { useId } from 'react';
import { MotionSvg } from './motion';

const accent = 'var(--brand-accent, #f9a21e)';
const ink = 'var(--art-primary, #f8fafc)';
const muted = 'var(--art-secondary, #94a3b8)';
const border = 'var(--art-border)';
const extensions = [
  { name: 'Reception', extension: 'Ext. 101', x: 26, y: 106, path: 'M182 137C219 137 208 195 244 195', delay: 0 },
  { name: 'Sales', extension: 'Ext. 204', x: 496, y: 83, path: 'M444 181C477 181 464 114 496 114', delay: 1.7 },
  { name: 'Support', extension: 'Ext. 310', x: 496, y: 245, path: 'M444 231C477 231 464 276 496 276', delay: 3.5 },
];

function Phone({ x, y, size = 20, color = accent }: { x: number; y: number; size?: number; color?: string }) {
  return <path transform={`translate(${x} ${y}) scale(${size / 24})`} d="M5 2 2 5q1 14 17 17l3-3-5-6-4 3-5-5 3-4Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />;
}

export function BusinessVoipArt({ label }: { label: string }) {
  const id = useId();
  return <MotionSvg className="communication-art service-scene business-voip-art" viewBox="0 0 680 410" role="img" aria-labelledby={`${id}-title`}>
    <title id={`${id}-title`}>{label}</title>
    <defs>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".16" /><stop offset=".48" stopColor="#fff" stopOpacity=".025" /><stop offset="1" stopColor={muted} stopOpacity=".1" /></linearGradient>
      <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={muted} stopOpacity=".65" /><stop offset=".5" stopColor={muted} stopOpacity=".2" /><stop offset="1" stopColor={accent} stopOpacity=".35" /></linearGradient>
    </defs>
    {/* Floating call objects only: no floor, pedestal, or platform. */}
    {extensions.map(({ path, delay }) => <g key={path}>
      <path d={path} fill="none" stroke={muted} strokeOpacity=".4" strokeWidth="1.3" />
      <path d={path} fill="none" stroke={accent} strokeWidth="1.5" opacity="0" data-motion-reveal="true" data-motion-speed="65" data-motion-period="7" data-motion-delay={delay} />
      {/* A soft halo travels with each call so it reads as a signal, not just a dot. */}
      <circle r="8" fill={accent} fillOpacity=".22" opacity="0" data-motion-path={path} data-motion-speed="65" data-motion-period="7" data-motion-delay={delay} />
      <circle r="3" fill={accent} opacity="0" data-motion-path={path} data-motion-speed="65" data-motion-period="7" data-motion-delay={delay} />
    </g>)}
    {/* An offset glass sheet frames the central softphone and sways slowly behind it. */}
    <g data-art-sway="351 197">
      <rect x="251" y="51" width="200" height="293" rx="26" fill="var(--art-soft)" stroke={border} transform="rotate(5 351 197)" opacity=".5" />
    </g>
    <rect x="244" y="58" width="200" height="293" rx="26" fill="var(--art-surface)" fillOpacity=".85" stroke={`url(#${id}-edge)`} strokeWidth="1.3" />
    <rect x="244" y="58" width="200" height="293" rx="26" fill={`url(#${id}-glass)`} />
    <text x="264" y="86" fill={muted} fontSize="9" letterSpacing="1.6">BUSINESS LINE</text>
    <text x="411" y="86" textAnchor="end" fill={muted} fontSize="9" letterSpacing=".8" style={{ fontVariantNumeric: 'tabular-nums' }} data-art-timer="true">02:14</text>
    <circle cx="421" cy="82" r="3" fill={accent} data-art-pulse="true" />
    <path d="M264 101H424" stroke={border} />
    {/* Ringing ripples spread out from the handset. */}
    <g fill="none" stroke={accent} strokeWidth="1.2">
      <circle cx="344" cy="157" r="35" opacity="0" data-art-ripple="1.75" />
      <circle cx="344" cy="157" r="35" opacity="0" data-art-ripple="1.75" />
      <circle cx="344" cy="157" r="35" opacity="0" data-art-ripple="1.75" />
    </g>
    <circle cx="344" cy="157" r="35" fill="var(--art-soft)" stroke={border} />
    <circle cx="344" cy="157" r="27" fill="none" stroke={muted} strokeOpacity=".15" />
    <g data-art-ring="344 157"><Phone x={330} y={143} size={28} color={ink} /></g>
    <circle cx="371" cy="134" r="7" fill="var(--art-surface)" stroke={border} /><circle cx="371" cy="134" r="3" fill={accent} data-art-pulse="true" />
    <text x="344" y="215" textAnchor="middle" fill={ink} fontSize="19">Let’s talk business.</text>
    <text x="344" y="235" textAnchor="middle" fill={muted} fontSize="10">Your number. Your whole team.</text>
    <g fill={accent}>{[5, 9, 15, 8, 19, 12, 6, 13, 8].map((height, i) => <rect key={i} x={318 + i * 6} y={264 - height / 2} width="2.4" height={height} rx="1.2" data-art-bar="true" />)}</g>
    <g fill="var(--art-soft)" stroke={border}><circle cx="297" cy="309" r="15" /><circle cx="344" cy="309" r="15" /><circle cx="391" cy="309" r="15" /></g>
    <g stroke={ink} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="295" y="302" width="4" height="8" rx="2" /><path d="M292 308q0 6 5 6t5-6m-5 6v3M339 305h10m-3-3 3 3-3 3m3 5h-10m3-3-3 3 3 3" />
    </g>
    <Phone x={384} y={302} size={14} />
    {/* Compact extension tags keep the surrounding space open. */}
    {extensions.map(({ name, extension, x, y, path, delay }, i) => <g key={name}>
      <rect x={x} y={y} width="156" height="62" rx="16" fill="none" stroke={border} />
      <circle cx={x + 26} cy={y + 31} r="14" fill="var(--art-soft)" /><Phone x={x + 18} y={y + 23} size={16} color={muted} />
      <text x={x + 49} y={y + 26} fill={ink} fontSize="12">{name}</text>
      <text x={x + 49} y={y + 43} fill={muted} fontSize="9">{extension}</text>
      <circle cx={i === 0 ? x + 156 : x} cy={y + 31} r="3" fill={muted} />
      {/* The tag lights up (outline, icon and port) when the routed call reaches it. */}
      <g opacity="0" data-motion-light="true" data-motion-route={path} data-motion-speed="65" data-motion-period="7" data-motion-delay={delay}>
        <rect x={x} y={y} width="156" height="62" rx="16" fill="none" stroke={accent} strokeOpacity=".75" strokeWidth="1.3" />
        <circle cx={x + 26} cy={y + 31} r="14" fill={accent} fillOpacity=".14" />
        <Phone x={x + 18} y={y + 23} size={16} />
        <circle cx={i === 0 ? x + 156 : x} cy={y + 31} r="3" fill={accent} />
      </g>
    </g>)}
    <g transform="translate(55 262)">
      <path d="M0 0h20m-5-5 5 5-5 5M20 15H0m5-5-5 5 5 5" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="33" y="3" fill={ink} fontSize="11">Keep the conversation</text><text x="33" y="19" fill={muted} fontSize="10">moving with your team.</text>
    </g>
    <text x="344" y="385" textAnchor="middle" fill={muted} fontSize="11" letterSpacing=".4">One business identity. Every conversation.</text>
  </MotionSvg>;
}
