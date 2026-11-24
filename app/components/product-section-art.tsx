"use client";
import { useId } from 'react';
import { MotionSvg } from './motion';

const accent = 'var(--brand-accent, #f9a21e)';
const ink = 'var(--art-primary, #f8fafc)';
const muted = 'var(--art-secondary, #94a3b8)';
const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

/* SIP Trunking, "More from Your Phone System": the PBX you already run, with Comvoix services plugged in beside it. */
const modules = [
  { y: 48, title: 'Scalable Capacity', text: '24 → 48 channels, same hardware', icon: 'capacity' },
  { y: 140, title: 'Number Connectivity', text: 'Local, national and toll-free DIDs', icon: 'numbers' },
  { y: 232, title: 'Modern SIP Services', text: 'Secure signalling, HD codecs, failover', icon: 'services' },
] as const;
const plugs = modules.map(({ y }) => `M232 ${y + 40}H300`);

function ModuleIcon({ kind }: { kind: 'capacity' | 'numbers' | 'services' }) {
  return <g fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {kind === 'capacity' ? <><path d="M4 19v-5M9.5 19V9M15 19V4" /><path d="M19.5 19h-17" /><path d="M15 4h4M17 2v4" stroke={accent} /></>
      : kind === 'numbers' ? <><path d="M9 3.5 7 20.5M17 3.5l-2 17" /><path d="M4.5 8.5h16M3.5 14.5h16" stroke={accent} /></>
      : <><path d="M12 3 5 6v5c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9V6Z" /><path d="m9 11.5 2 2 4-4.5" stroke={accent} /></>}
  </g>;
}

export function PbxExtendArt() {
  const id = useId();
  return <MotionSvg className="communication-art product-section-art" viewBox="0 0 640 360" role="img" aria-labelledby={id}>
    <title id={id}>An existing IP PBX with Comvoix modules plugged in: scalable capacity, number connectivity and modern SIP services</title>

    {/* The PBX you keep */}
    <g data-art-float="true">
      <rect x="40" y="48" width="192" height="264" rx="18" className="art-surface" />
      <text x="58" y="74" className="art-caption" fontSize="11" fontWeight="600">Your IP PBX</text>
      <text x="58" y="88" fill={muted} fontSize="8">Kept exactly as it is</text>
      {[0, 1, 2, 3].map(i => <g key={i}>
        <rect x="58" y={104 + i * 38} width="156" height="28" rx="7" fill="var(--art-soft)" stroke="var(--art-border)" />
        <circle cx="72" cy={118 + i * 38} r="3" fill={i < 3 ? accent : muted} data-art-pulse={i < 3 ? 'true' : undefined} />
        {[0, 1, 2, 3, 4, 5, 6].map(j => <rect key={j} x={86 + j * 17} y={112 + i * 38} width="11" height="12" rx="2" fill="none" stroke={muted} strokeOpacity=".7" />)}
      </g>)}
      {/* Ports the modules plug into */}
      {modules.map(({ y }) => <rect key={y} x="222" y={y + 30} width="12" height="20" rx="3" fill="var(--art-surface)" stroke={accent} strokeWidth="1.4" />)}
      <rect x="58" y="268" width="156" height="26" rx="8" fill={accent} fillOpacity=".12" stroke={accent} strokeOpacity=".6" />
      <circle cx="72" cy="281" r="3" fill={accent} /><text x="80" y="284" fill={accent} fontSize="8.5" fontWeight="700">SIP trunk connected</text>
    </g>

    {/* Plugs */}
    <g fill="none" stroke={muted} strokeWidth="2" strokeOpacity=".8">{plugs.map(d => <path key={d} d={d} />)}</g>
    {plugs.map((d, i) => <circle key={d} r="3" fill={accent} data-motion-path={d.replace('M232', 'M300').replace('H300', 'H234')} data-duration={2.6 + i * .5} />)}

    {/* Comvoix modules */}
    {modules.map(({ y, title, text, icon }) => <g key={title} data-art-float="true">
      <rect x="300" y={y} width="300" height="80" rx="16" className="art-surface" />
      <rect x="316" y={y + 20} width="40" height="40" rx="12" className="art-surface" /><g transform={`translate(${325} ${y + 29})`}><ModuleIcon kind={icon} /></g>
      <text x="370" y={y + 34} className="art-caption" fontSize="11" fontWeight="600">{title}</text>
      <text x="370" y={y + 50} fill={muted} fontSize="8.5">{text}</text>
      <rect x="544" y={y + 30} width="40" height="20" rx="10" fill={accent} /><circle cx="574" cy={y + 40} r="7" fill="#fff" /><text x="552" y={y + 43.5} fill="#fff" fontSize="7" fontWeight="700">ON</text>
    </g>)}
    <text x="450" y="336" textAnchor="middle" fill={muted} fontSize="8.5">No platform migration · no new handsets · switched on remotely</text>
  </MotionSvg>;
}

/* Voice Services, "Conversations Without Borders": one business, calling a ring of destinations around the world. */
const places = [
  { a: 200, city: 'Sydney', time: '09:12', code: '+61' },
  { a: 232, city: 'Singapore', time: '07:12', code: '+65' },
  { a: 264, city: 'Dubai', time: '03:12', code: '+971' },
  { a: 296, city: 'Berlin', time: '01:12', code: '+49' },
  { a: 328, city: 'London', time: '00:12', code: '+44' },
  { a: 360, city: 'Toronto', time: '19:12', code: '+1' },
] as const;
const CX = 320, CY = 300, R = 182;
const spot = (a: number) => ({ x: CX + R * Math.cos(a * Math.PI / 180), y: CY + R * Math.sin(a * Math.PI / 180) });
const arcs = places.map(({ a }) => { const { x, y } = spot(a); return `M${CX} ${CY - 30}Q${(CX + x) / 2} ${(CY + y) / 2 - 60} ${x} ${y}`; });

export function GlobalReachArt() {
  const id = useId();
  return <MotionSvg className="communication-art product-section-art" viewBox="0 0 640 360" role="img" aria-labelledby={id}>
    <title id={id}>Calls from one business reaching Sydney, Singapore, Dubai, Berlin, London and Toronto across the Comvoix network</title>

    {/* Horizon rings */}
    <g fill="none" stroke={muted}>
      <path d={`M${CX - R} ${CY}A${R} ${R} 0 0 1 ${CX + R} ${CY}`} strokeOpacity=".3" />
      <path d={`M${CX - 124} ${CY}A124 124 0 0 1 ${CX + 124} ${CY}`} strokeOpacity=".25" strokeDasharray="2 6" />
      <path d={`M${CX - 66} ${CY}A66 66 0 0 1 ${CX + 66} ${CY}`} strokeOpacity=".2" />
    </g>

    {/* Calls out */}
    <g fill="none" stroke={muted} strokeWidth="1.3" strokeOpacity=".6">{arcs.map(d => <path key={d} d={d} />)}</g>
    {arcs.map((d, i) => <circle key={d} r="3" fill={accent} data-motion-path={d} data-duration={3.6 + (i % 3) * .7} />)}

    {/* Destinations */}
    {places.map(({ a, city, time, code }, i) => { const { x, y } = spot(a); const left = x < CX - 40, right = x > CX + 40; const tx = left ? x - 20 : right ? x + 20 : x; return <g key={city} data-art-float="true">
      <circle cx={x} cy={y} r="5" fill={i === 2 ? accent : 'var(--art-surface)'} stroke={i === 2 ? accent : muted} strokeWidth="1.4" data-art-pulse={i === 2 ? 'true' : undefined} />
      <rect x={left ? x - 118 : right ? x + 10 : x - 54} y={y - (left || right ? 34 : 50)} width="108" height="34" rx="10" className="art-surface" />
      <text x={tx} y={y - (left || right ? 20 : 36)} textAnchor={left ? 'end' : right ? 'start' : 'middle'} className="art-caption" fontSize="9.5" fontWeight="600">{city}</text>
      <text x={tx} y={y - (left || right ? 8 : 24)} textAnchor={left ? 'end' : right ? 'start' : 'middle'} fill={muted} fontSize="7.5" fontFamily={mono}>{code} · {time} local</text>
    </g>; })}

    {/* Home */}
    <g data-art-float="true">
      <circle cx={CX} cy={CY - 30} r="22" className="art-surface" /><circle cx={CX} cy={CY - 30} r="22" fill="none" stroke={accent} strokeWidth="1.6" />
      <g transform={`translate(${CX} ${CY - 30})`} fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M-7 9V-6q0-2 2-2h8q2 0 2 2v15M5-1h4q1 0 1 1v9M-7 9h18" /><path d="M-3-4h2M1-4h2M-3 0h2M1 0h2" stroke={accent} /></g>
      <rect x={CX - 96} y={CY + 6} width="192" height="40" rx="12" className="art-surface" />
      <text x={CX} y={CY + 22} textAnchor="middle" className="art-caption" fontSize="10" fontWeight="600">Your Business · Seattle</text>
      <text x={CX} y={CY + 36} textAnchor="middle" fill={muted} fontSize="8">60+ calling destinations · one network</text>
    </g>
  </MotionSvg>;
}

/* Voice Services, "One Network. Every Conversation.": origination, the Comvoix network and termination as one stack. */
const flows = ['M200 96V140', 'M440 140V96', 'M200 220V264', 'M440 264V220'];

export function VoiceStackArt() {
  const id = useId();
  return <MotionSvg className="communication-art product-section-art" viewBox="0 0 640 360" role="img" aria-labelledby={id}>
    <title id={id}>Voice origination and voice termination connected through one Comvoix SIP network with routing, monitoring and capacity controls</title>

    {/* Origination */}
    <g data-art-float="true">
      <rect x="110" y="40" width="420" height="56" rx="16" className="art-surface" />
      <g transform="translate(140 68)" fill="none" stroke={accent} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle r="13" fill={accent} fillOpacity=".12" stroke="none" /><path d="M5-5-5 5M2 5h-7v-7" /></g>
      <text x="164" y="64" className="art-caption" fontSize="11" fontWeight="600">Voice Origination</text>
      <text x="164" y="78" fill={muted} fontSize="8.5">Incoming calls from your business numbers</text>
      <text x="508" y="72" textAnchor="end" fill={muted} fontSize="8" fontFamily={mono}>INBOUND</text>
    </g>

    {/* Flows between the layers */}
    <g fill="none" stroke={muted} strokeWidth="1.5" strokeOpacity=".8">{flows.map(d => <path key={d} d={d} />)}</g>
    {flows.map((d, i) => <circle key={d} r="3" fill={accent} data-motion-path={d} data-duration={2 + i * .3} />)}
    <g fill={muted}>{[[200, 136], [440, 100], [200, 260], [440, 224]].map(([x, y], i) => <path key={i} d={i % 2 ? `M${x - 3.5} ${y + 4}l3.5-4 3.5 4` : `M${x - 3.5} ${y - 4}l3.5 4 3.5-4`} fill="none" stroke={muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />)}</g>

    {/* The network */}
    <g data-art-float="true">
      <rect x="40" y="140" width="560" height="80" rx="18" fill={accent} fillOpacity=".08" stroke={accent} strokeWidth="1.4" />
      <g transform="translate(76 180)" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle r="20" className="art-surface" strokeWidth="1.2" /><circle r="9" /><path d="M-9 0h18M0-9q-4.5 3.5-4.5 9T0 9q4.5-3.5 4.5-9T0-9" /><path d="M-6.5-4.5q6.5 2.5 13 0M-6.5 4.5q6.5-2.5 13 0" stroke={accent} /></g>
      <text x="108" y="174" className="art-caption" fontSize="12" fontWeight="700">Comvoix SIP Network</text>
      <text x="108" y="189" fill={muted} fontSize="8.5">One connected environment for every business conversation</text>
      {[['Flexible routing', 'route'], ['Ongoing monitoring', 'monitor'], ['Capacity adjustments', 'capacity']].map(([label, kind], i) => <g key={label}>
        <rect x={300 + i * 98} y="196" width="96" height="18" rx="9" className="art-surface" />
        <circle cx={312 + i * 98} cy="205" r="3" fill={accent} data-art-pulse={kind === 'monitor' ? 'true' : undefined} />
        <text x={319 + i * 98} y="208" className="art-caption" fontSize="6.8" fontWeight="600">{label}</text>
      </g>)}
      <g fill={accent}>{[5, 9, 7, 12, 6, 10, 5].map((h, i) => <rect key={i} x={440 + i * 5.2} y={166 - h / 2} width="2.4" height={h} rx="1.2" data-art-bar="true" />)}</g>
      <text x="584" y="169" textAnchor="end" fill={accent} fontSize="8" fontWeight="700">Live</text>
    </g>

    {/* Termination */}
    <g data-art-float="true">
      <rect x="110" y="264" width="420" height="56" rx="16" className="art-surface" />
      <g transform="translate(140 292)" fill="none" stroke={ink} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle r="13" fill={muted} fillOpacity=".15" stroke="none" /><path d="M-5 5 5-5M-2-5h7v7" /></g>
      <text x="164" y="288" className="art-caption" fontSize="11" fontWeight="600">Voice Termination</text>
      <text x="164" y="302" fill={muted} fontSize="8.5">Outbound calls to local and international destinations</text>
      <text x="508" y="296" textAnchor="end" fill={muted} fontSize="8" fontFamily={mono}>OUTBOUND</text>
    </g>
  </MotionSvg>;
}
