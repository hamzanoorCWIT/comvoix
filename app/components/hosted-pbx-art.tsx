"use client";
import { useId } from 'react';
import { MotionSvg } from './motion';

const accent = 'var(--brand-accent, #f9a21e)';
const ink = 'var(--art-primary, #f8fafc)';
const muted = 'var(--art-secondary, #94a3b8)';

/* Hosted PBX: one business number, a menu, and the teams and features behind each choice. */
const menu = [
  { x: 150, key: '1', title: 'Sales', text: 'Ring group · 3 agents', icon: 'group' },
  { x: 340, key: '2', title: 'Support', text: 'Queue · callback offered', icon: 'queue' },
  { x: 530, key: '3', title: 'Billing', text: 'Ext. 412 · voicemail', icon: 'voicemail' },
] as const;
const branch = (x: number) => `M340 66V92H${x}V118`;
// The caller pressed 2: the dot follows that branch through the menu to the Support queue.
const chosen = 'M340 66V118M340 164V190';
const SPEED = '110', PERIOD = '3.4';
// Partial routes time the lights along the journey: the branch point, the menu, then the queue.
const PRESS = 'M340 66V92';
const MENU = 'M340 66V118';

function Icon({ kind, x, y }: { kind: 'group' | 'queue' | 'voicemail'; x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`} fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {kind === 'group' ? <><circle cx="8" cy="7.5" r="3.2" /><circle cx="15.5" cy="9" r="2.6" /><path d="M2 19q0-6 6-6t6 6M13 19q0-4 3-4t3 4" /></>
      : kind === 'queue' ? <><path d="M3 6h16M3 11h11M3 16h7" /><circle cx="17" cy="15" r="3" stroke={accent} /><path d="M17 15h1.3" stroke={accent} /><path d="M17 15v-1.9" stroke={accent} data-art-spin="50% 100%" /></>
      : <><circle cx="6.5" cy="12" r="3.5" /><circle cx="15.5" cy="12" r="3.5" /><path d="M6.5 15.5h9" /></>}
  </g>;
}

export function HostedPbxArt({ label }: { label: string }) {
  const id = useId();
  return <MotionSvg className="communication-art service-scene hosted-pbx-art" viewBox="0 0 680 300" role="img" aria-labelledby={id}>
    <title id={id}>{label}</title>

    {/* Main number */}
    <g data-art-float="true">
      <rect x="236" y="22" width="208" height="44" rx="14" className="art-surface" />
      {/* The main number rings: ripples spread out and the handset shakes. */}
      <g fill="none" stroke={accent} strokeWidth="1"><circle cx="254" cy="44" r="10" opacity="0" data-art-ripple="2.1" /><circle cx="254" cy="44" r="10" opacity="0" data-art-ripple="2.1" /></g>
      <circle cx="254" cy="44" r="10" fill={accent} fillOpacity=".15" /><g data-art-ring="254 44"><path transform="translate(254 44) scale(.5)" d="M-7-9h5l2.5 7-3.5 2.5a16 16 0 0 0 8 8l2.5-3.5 7 2.5v5q0 2-2 2A24 24 0 0 1-9-7q0-2 2-2Z" fill={accent} /></g>
      <text x="272" y="40" className="art-caption" fontSize="10" fontWeight="600">Main Number</text>
      <text x="272" y="54" fill={muted} fontSize="8.5">+1 (206) 555-0100 · Auto attendant</text>
      <circle cx="428" cy="44" r="3.5" fill={accent} data-art-pulse="true" />
    </g>

    {/* Menu branches, neutral at rest; the chosen branch lights up as the caller moves through it */}
    <g fill="none" stroke={muted} strokeWidth="1.5" strokeOpacity=".8">{menu.map(({ x }) => <path key={x} d={branch(x)} />)}{menu.map(({ x }) => <path key={`${x}-down`} d={`M${x} 164V190`} />)}</g>
    <path d={chosen} fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity=".8" strokeLinecap="round" opacity="0" data-motion-reveal="true" data-motion-speed={SPEED} data-motion-period={PERIOD} />
    <circle r="8" fill={accent} fillOpacity=".2" data-motion-path={chosen} data-motion-speed={SPEED} data-motion-period={PERIOD} />
    <circle r="3" fill={accent} data-motion-path={chosen} data-motion-speed={SPEED} data-motion-period={PERIOD} />
    {/* The badge appears as the call reaches the branch, so the keypress reads as part of the journey. */}
    <g transform="translate(350 78)" data-motion-light="true" data-motion-route={PRESS} data-motion-speed={SPEED} data-motion-period={PERIOD}><rect x="-4" y="-9" width="62" height="16" rx="8" className="art-surface" /><text x="27" y="3" textAnchor="middle" fill={accent} fontSize="7.5" fontWeight="700">Pressed 2</text></g>

    {/* The menu */}
    {menu.map(({ x, key, title }, i) => <g key={key} data-art-float="true">
      <rect x={x - 80} y="118" width="160" height="46" rx="12" fill="none" stroke={i === 1 ? accent : 'var(--art-border)'} strokeWidth={i === 1 ? 1.4 : 1.2} />
      <rect x={x - 66} y="129" width="24" height="24" rx="7" fill={i === 1 ? accent : 'var(--art-soft)'} stroke={i === 1 ? accent : 'var(--art-border)'} /><text x={x - 54} y="145.5" textAnchor="middle" fill={i === 1 ? '#fff' : ink} fontSize="11" fontWeight="700">{key}</text>
      <text x={x - 34} y="138" className="art-caption" fontSize="10" fontWeight="600">{title}</text>
      <text x={x - 34} y="151" fill={muted} fontSize="8">Press {key} for {title.toLowerCase()}</text>
      {i === 1 ? <rect x={x - 69} y="126" width="30" height="30" rx="9" fill="none" stroke={accent} strokeWidth="1.4" opacity="0" data-motion-light="true" data-motion-route={MENU} data-motion-speed={SPEED} data-motion-period={PERIOD} /> : null}
    </g>)}

    {/* Where each choice lands */}
    {menu.map(({ x, text, icon }, i) => <g key={x} data-art-float="true">
      <circle cx={x} cy="190" r="4.5" fill={muted} />{i === 1 ? <circle cx={x} cy="190" r="4.5" fill={accent} opacity="0" data-motion-light="true" data-motion-route={chosen} data-motion-speed={SPEED} data-motion-period={PERIOD} /> : null}
      <rect x={x - 80} y="190" width="160" height="56" rx="14" className="art-surface" />
      <rect x={x - 66} y="202" width="32" height="32" rx="10" className="art-surface" /><Icon kind={icon} x={x - 61} y={207} />
      <text x={x - 26} y="214" className="art-caption" fontSize="10" fontWeight="600">{['Sales Team', 'Support Queue', 'Billing'][i]}</text>
      <text x={x - 26} y="228" fill={muted} fontSize="8">{text}</text>
      {i === 1 ? <rect x={x - 80} y="190" width="160" height="56" rx="14" fill="none" stroke={accent} strokeOpacity=".75" strokeWidth="1.3" opacity="0" data-motion-light="true" data-motion-route={chosen} data-motion-speed={SPEED} data-motion-period={PERIOD} /> : null}
    </g>)}

    {/* Hours */}
    <rect x="218" y="262" width="244" height="24" rx="12" className="art-surface" />
    <circle cx="234" cy="274" r="3.5" fill={accent} data-art-pulse="true" />
    <text x="244" y="277.5" fontSize="8.8" xmlSpace="preserve"><tspan className="art-caption" fontWeight="600">Business hours</tspan><tspan fill={muted}>  ·  After hours to voicemail</tspan></text>
  </MotionSvg>;
}
