"use client";
import { useId } from 'react';
import { MotionSvg } from './motion';

const accent = 'var(--brand-accent, #f9a21e)';
const ink = 'var(--art-primary, #f8fafc)';
const muted = 'var(--art-secondary, #94a3b8)';

/** The Comvoix profile: the services we offer, fanned on the left, and what the company stands for on the right. */
const services = [
  { title: 'Voice Services', text: 'Inbound and outbound calling', icon: 'phone', tilt: -4, dx: 24, dy: -86 },
  { title: 'SIP Trunking', text: 'Connect your existing PBX', icon: 'trunk', tilt: -1.5, dx: 8, dy: -29 },
  { title: 'Business Numbers', text: 'Local, national, toll-free', icon: 'hash', tilt: 1, dx: -8, dy: 28 },
  { title: 'Cloud PBX', text: 'A phone system in the cloud', icon: 'cloud', tilt: 3.5, dx: -24, dy: 84 },
] as const;
const promises = [['Cloud voice', 'Flexible calling for every team'], ['Reliable connectivity', 'Monitored around the clock'], ['Built for growth', 'Scale capacity as you grow']] as const;
const link = 'M292 190H356';

function ServiceIcon({ kind, color }: { kind: string; color: string }) {
  return <g fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    {kind === 'phone' ? <path d="M6.5 3.5h3.5l1.8 5-2.6 1.8a12 12 0 0 0 5.5 5.5l1.8-2.6 5 1.8v3.5q0 1.7-1.7 1.7A17 17 0 0 1 4.8 5.2q0-1.7 1.7-1.7Z" />
      : kind === 'trunk' ? <><path d="M3 7h18M3 12h18M3 17h18" /><circle cx="7" cy="7" r="1.6" fill={color} stroke="none" /><circle cx="17" cy="12" r="1.6" fill={color} stroke="none" /><circle cx="10" cy="17" r="1.6" fill={color} stroke="none" /></>
      : kind === 'hash' ? <path d="M9 3.5 7 20.5M17 3.5l-2 17M4.5 8.5h16M3.5 14.5h16" />
      : <path d="M7 18a4.5 4.5 0 0 1-.5-9 6 6 0 0 1 11.5-1.5A4 4 0 0 1 18 18Z" />}
  </g>;
}

export function AboutArt({ label }: { label: string }) {
  const id = useId();
  return <MotionSvg className="communication-art about-art" viewBox="0 0 640 360" role="img" aria-labelledby={id}>
    <title id={id}>{label}</title>

    {/* What we offer, fanned like a hand of cards; the front card is Cloud PBX */}
    {services.map(({ title, text, icon, tilt, dx, dy }, i) => { const front = i === services.length - 1; return <g key={title} data-art-float="true" transform={`translate(${160 + dx} ${190 + dy}) rotate(${tilt})`}>
      <rect x="-96" y="-56" width="192" height="112" rx="16" fill={front ? 'var(--art-surface)' : 'var(--art-surface)'} stroke={front ? accent : 'var(--art-border)'} strokeWidth={front ? 1.6 : 1} />
      <rect x="-80" y="-40" width="34" height="34" rx="11" fill={front ? accent : 'var(--art-soft)'} fillOpacity={front ? .15 : 1} stroke={front ? accent : 'var(--art-border)'} strokeOpacity={front ? .5 : 1} />
      <g transform="translate(-75 -35)"><ServiceIcon kind={icon} color={front ? accent : ink} /></g>
      <text x="-36" y="-22" className="art-caption" fontSize="11" fontWeight="600">{title}</text>
      <text x="-36" y="-8" fill={muted} fontSize="8.5">{text}</text>
      <path d="M-80 14h150M-80 26h96" stroke={muted} strokeWidth="3" strokeLinecap="round" opacity={front ? .5 : .3} />
      {front ? <><circle cx="70" cy="40" r="3.5" fill={accent} data-art-pulse="true" /><text x="62" y="43.5" textAnchor="end" fill={accent} fontSize="8" fontWeight="700">Live</text></> : null}
    </g>; })}

    {/* One connection to the company */}
    <path d={link} fill="none" stroke={muted} strokeWidth="1.5" strokeOpacity=".8" />
    <path d={link} fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity=".9" strokeLinecap="round" opacity="0" data-motion-reveal="true" data-motion-speed="60" data-motion-period="3.4" />
    <circle r="3.5" fill={accent} data-motion-path={link} data-motion-speed="60" data-motion-period="3.4" />

    {/* Who we are */}
    <g data-art-float="true">
      <rect x="356" y="56" width="244" height="268" rx="20" className="art-surface" />
      <circle cx="356" cy="190" r="4.5" fill={muted} /><circle cx="356" cy="190" r="4.5" fill={accent} opacity="0" data-motion-light="true" data-motion-route={link} data-motion-speed="60" data-motion-period="3.4" />
      <rect x="378" y="78" width="44" height="44" rx="14" fill={accent} /><path transform="translate(389 89) scale(.92)" d="M6.5 3.5h3.5l1.8 5-2.6 1.8a12 12 0 0 0 5.5 5.5l1.8-2.6 5 1.8v3.5q0 1.7-1.7 1.7A17 17 0 0 1 4.8 5.2q0-1.7 1.7-1.7Z" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="434" y="96" className="art-caption" fontSize="14" fontWeight="700">Comvoix</text>
      <text x="434" y="112" fill={muted} fontSize="8.5">Communication for modern operations</text>
      <path d="M378 138h200" stroke="var(--art-border)" />
      {promises.map(([title, text], i) => <g key={title}>
        <circle cx="390" cy={166 + i * 44} r="9" fill={accent} fillOpacity=".15" /><path d={`m385.5 ${166 + i * 44} 3 3 6-6.5`} fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="408" y={163 + i * 44} className="art-caption" fontSize="10.5" fontWeight="600">{title}</text>
        <text x="408" y={177 + i * 44} fill={muted} fontSize="8.5">{text}</text>
      </g>)}
      <rect x="378" y="284" width="200" height="22" rx="11" fill="var(--art-soft)" stroke="var(--art-border)" />
      <circle cx="392" cy="295" r="3.5" fill={accent} data-art-pulse="true" /><text x="402" y="298.5" fill={muted} fontSize="8">From IP voice to cloud communication</text>
    </g>
  </MotionSvg>;
}
