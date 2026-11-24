"use client";
import { useId } from 'react';
import { MotionSvg } from './motion';

const accent = 'var(--brand-accent, #f9a21e)';
const ink = 'var(--art-primary, #f8fafc)';
const muted = 'var(--art-secondary, #94a3b8)';

/* Small scenes for the insight cards. Each one tells its article's idea in a glance. */
const journey = [
  { x: 96, title: 'Call', text: 'Customer reaches out', icon: 'phone' },
  { x: 245, title: 'Right team', text: 'Routed first time', icon: 'route' },
  { x: 394, title: 'Context kept', text: 'No repeating', icon: 'notes' },
  { x: 543, title: 'Follow-up', text: 'Consistent next step', icon: 'check' },
] as const;
const journeyPath = `M96 150H543`;
// A slightly slower pace and longer hold so each step's light registers before the cycle clears.
const JOURNEY_SPEED = '120', JOURNEY_PERIOD = '5.5';
// Reliable voice infrastructure: the tower's signal reaches the panel, then each health check passes in turn.
const SIGNAL_LINK = 'M166 116C228 116 226 160 280 160';
const SIGNAL_SPEED = '90', SIGNAL_PERIOD = '4.5';
const HEARTBEAT = 'M398 84h30l5-9 6 16 6-20 6 13h10l4-5 4 5h30';
// Future of VoIP: one call travels desk phone → cloud → any device; partial routes time each stop's light.
const FUTURE_PATH = 'M110 150H530';
const FUTURE_SPEED = '120', FUTURE_PERIOD = '5';
const ORBIT = 'M530 96a54 54 0 1 1 0 108a54 54 0 1 1 0-108';
const FUTURE_NODES = [
  { icon: 'desk', title: 'Desk phone', text: 'Tied to one office', x: 110, hot: false, arrive: 'M110 150h1' },
  { icon: 'cloud', title: 'Cloud calling', text: 'Calls over your network', x: 320, hot: true, arrive: 'M110 150H280' },
  { icon: 'laptop', title: 'Any device', text: 'Office, home or mobile', x: 530, hot: false, arrive: 'M110 150H490' },
];

function Icon({ kind, color = ink }: { kind: string; color?: string }) {
  return <g fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    {kind === 'phone' ? <path d="M6.5 3.5h3.5l1.8 5-2.6 1.8a12 12 0 0 0 5.5 5.5l1.8-2.6 5 1.8v3.5q0 1.7-1.7 1.7A17 17 0 0 1 4.8 5.2q0-1.7 1.7-1.7Z" />
      : kind === 'route' ? <><circle cx="5.5" cy="18" r="2.5" /><circle cx="18.5" cy="6" r="2.5" /><path d="M8 18h5q3 0 3-3v-3q0-3-3-3h-2" stroke={accent} /></>
      : kind === 'notes' ? <><rect x="4" y="3.5" width="16" height="17" rx="2.5" /><path d="M8 9h8M8 13h8M8 17h4" stroke={accent} /></>
      : kind === 'check' ? <><circle cx="12" cy="12" r="8.5" /><path d="m8 12.5 2.7 2.7L16.5 9.5" stroke={accent} /></>
      : kind === 'desk' ? <><rect x="3" y="10" width="18" height="10" rx="2" /><path d="M3 15h18M8 10V6q0-2 2-2h4q2 0 2 2v4" /><path d="M8 18h2M12 18h2" stroke={accent} /></>
      : kind === 'cloud' ? <path d="M7 18a4.5 4.5 0 0 1-.5-9 6 6 0 0 1 11.5-1.5A4 4 0 0 1 18 18Z" />
      : kind === 'laptop' ? <><rect x="4" y="5" width="16" height="10" rx="2" /><path d="M2 18h20" /><path d="M9 10q3-3 6 0" stroke={accent} /></>
      : <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M10 5h4M11 19h2" /><path d="M9.5 12q2.5-2.5 5 0" stroke={accent} /></>}
  </g>;
}

export function InsightArt({ kind, label }: { kind: string; label: string }) {
  const id = useId();
  return <MotionSvg className="communication-art insight-art" viewBox="0 0 640 320" role="img" aria-labelledby={id}>
    <title id={id}>{label}</title>

    {kind === 'signal' ? <>
      {/* Reliable voice infrastructure: a steady signal, every layer healthy */}
      {/* Signal arcs light in a wave from the mast outward. */}
      <g fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round">
        {[30, 52, 74].map((r, i) => { const dx = r * Math.cos(Math.PI / 4), dy = r * Math.sin(Math.PI / 4); return <g key={r} strokeOpacity={.9 - i * .3} data-art-blink="true">
          <path d={`M${150 + dx} ${116 - dy}A${r} ${r} 0 0 1 ${150 + dx} ${116 + dy}`} /><path d={`M${150 - dx} ${116 - dy}A${r} ${r} 0 0 0 ${150 - dx} ${116 + dy}`} />
        </g>; })}
      </g>
      {/* The tower feeds a steady signal into the infrastructure panel. */}
      <path d={SIGNAL_LINK} fill="none" stroke={muted} strokeOpacity=".45" strokeWidth="1.4" strokeDasharray="4 6" data-art-trace="true" />
      <path d={SIGNAL_LINK} fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0" data-motion-reveal="true" data-motion-speed={SIGNAL_SPEED} data-motion-period={SIGNAL_PERIOD} />
      <circle r="7" fill={accent} fillOpacity=".2" opacity="0" data-motion-path={SIGNAL_LINK} data-motion-speed={SIGNAL_SPEED} data-motion-period={SIGNAL_PERIOD} />
      <circle r="3" fill={accent} opacity="0" data-motion-path={SIGNAL_LINK} data-motion-speed={SIGNAL_SPEED} data-motion-period={SIGNAL_PERIOD} />
      <g data-art-float="true">
        <path d="M150 120 132 232h36Z" className="art-surface" /><path d="M150 120v112M138 196h24M142 170h16" stroke={ink} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <g fill="none" stroke={accent} strokeWidth="1.2"><circle cx="150" cy="116" r="10" opacity="0" data-art-ripple="2.4" /><circle cx="150" cy="116" r="10" opacity="0" data-art-ripple="2.4" /></g>
        <circle cx="150" cy="116" r="8" fill={accent} /><circle cx="150" cy="116" r="14" fill="none" stroke={accent} strokeOpacity=".5" data-art-pulse="true" />
        <rect x="104" y="232" width="92" height="14" rx="7" className="art-surface" />
      </g>
      <g data-art-float="true">
        <rect x="280" y="60" width="316" height="200" rx="18" className="art-surface" />
        <text x="302" y="88" className="art-caption" fontSize="12" fontWeight="600">Infrastructure</text>
        {/* A live heartbeat keeps drawing across the header. */}
        <path d={HEARTBEAT} fill="none" stroke={muted} strokeOpacity=".3" strokeWidth="1.2" strokeLinejoin="round" />
        <path d={HEARTBEAT} fill="none" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0" data-motion-reveal="true" data-motion-speed="70" data-motion-period={SIGNAL_PERIOD} />
        <rect x="518" y="72" width="60" height="22" rx="11" fill={accent} fillOpacity=".15" /><circle cx="532" cy="83" r="3.5" fill={accent} data-art-pulse="true" /><text x="540" y="87" fill={accent} fontSize="9.5" fontWeight="700">Healthy</text>
        {[['Connectivity', 'Carrier-grade links'], ['Routing', 'Primary + failover'], ['Capacity', '18 of 24 channels'], ['Monitoring', '24/7 · 0 alerts']].map(([title, text], i) => <g key={title}>
          <rect x="302" y={106 + i * 36} width="272" height="28" rx="8" fill="var(--art-soft)" stroke="var(--art-border)" />
          <circle cx="318" cy={120 + i * 36} r="7" fill={accent} fillOpacity=".15" /><path d={`m314.5 ${120 + i * 36} 2.5 2.5 4.5-5`} fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Health checks pass one after another once the signal arrives. */}
          <g opacity="0" data-motion-light="true" data-motion-route={SIGNAL_LINK} data-motion-speed={SIGNAL_SPEED} data-motion-period={SIGNAL_PERIOD} data-motion-delay={.25 + i * .35}>
            <rect x="302" y={106 + i * 36} width="272" height="28" rx="8" fill="none" stroke={accent} strokeOpacity=".7" />
            <circle cx="318" cy={120 + i * 36} r="7" fill={accent} fillOpacity=".3" />
          </g>
          <text x="334" y={124 + i * 36} className="art-caption" fontSize="10.5" fontWeight="600">{title}</text>
          <text x="562" y={124 + i * 36} textAnchor="end" fill={muted} fontSize="9">{text}</text>
        </g>)}
      </g>
    </> : kind === 'future-voice' ? <>
      {/* The future of business VoIP: from the desk phone to the cloud to any device */}
      {/* The rail flows continuously; an accent trace and a glowing call travel it from desk phone to any device. */}
      <path d="M110 150H530" fill="none" stroke={muted} strokeWidth="1.5" strokeOpacity=".7" strokeDasharray="4 6" data-art-trace="true" />
      <path d={FUTURE_PATH} fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" opacity="0" data-motion-reveal="true" data-motion-speed={FUTURE_SPEED} data-motion-period={FUTURE_PERIOD} />
      <circle r="9" fill={accent} fillOpacity=".2" data-motion-path={FUTURE_PATH} data-motion-speed={FUTURE_SPEED} data-motion-period={FUTURE_PERIOD} />
      <circle r="3.5" fill={accent} data-motion-path={FUTURE_PATH} data-motion-speed={FUTURE_SPEED} data-motion-period={FUTURE_PERIOD} />
      {/* The "Flexible calling" signal feeds down into the cloud. */}
      <path d="M320 82V110" fill="none" stroke={accent} strokeOpacity=".6" strokeWidth="1.3" strokeDasharray="4 6" data-art-trace="true" />
      {/* The cloud broadcasts; any device has calls orbiting it. */}
      <g fill="none" stroke={accent} strokeWidth="1.2"><circle cx="320" cy="150" r="40" opacity="0" data-art-ripple="1.5" /><circle cx="320" cy="150" r="40" opacity="0" data-art-ripple="1.5" /><circle cx="320" cy="150" r="40" opacity="0" data-art-ripple="1.5" /></g>
      <circle cx="530" cy="150" r="54" fill="none" stroke={muted} strokeOpacity=".3" strokeDasharray="2 8" data-art-trace="true" />
      {[0, 1.6].map(delay => <circle key={delay} r="2.6" fill={accent} data-motion-path={ORBIT} data-motion-speed="34" data-motion-delay={delay} />)}
      {FUTURE_NODES.map(({ icon, title, text, x, hot, arrive }) => <g key={title} data-art-float="true">
        <circle cx={x} cy="150" r="40" className="art-surface" /><circle cx={x} cy="150" r="40" fill="none" stroke={hot ? accent : 'var(--art-border)'} strokeWidth={hot ? 2 : 1.2} />
        {/* Each stop lights up as the call reaches it. */}
        <g opacity="0" data-motion-light="true" data-motion-route={arrive} data-motion-speed={FUTURE_SPEED} data-motion-period={FUTURE_PERIOD}>
          <circle cx={x} cy="150" r="40" fill={accent} fillOpacity=".08" stroke={accent} strokeWidth="2" />
          <circle cx={x} cy="150" r="46" fill="none" stroke={accent} strokeOpacity=".35" />
        </g>
        <g transform={`translate(${x - 16} 134) scale(1.33)`}><Icon kind={icon} color={hot ? accent : ink} /></g>
        {icon === 'laptop' ? <g transform={`translate(${x + 10} 140) scale(.8)`}><Icon kind="mobile" /></g> : null}
        <text x={x} y="216" textAnchor="middle" className="art-caption" fontSize="11.5" fontWeight="600">{title}</text>
        <text x={x} y="232" textAnchor="middle" fill={muted} fontSize="9">{text}</text>
      </g>)}
      <g data-art-float="true">
        <rect x="236" y="48" width="168" height="34" rx="12" className="art-surface" />
        <g fill={accent}>{[6, 10, 8, 14, 9, 12, 7, 15].map((h, i) => <rect key={i} x={254 + i * 6} y={65 - h / 2} width="2.6" height={h} rx="1.3" data-art-bar="true" />)}</g>
        <text x="312" y="69" className="art-caption" fontSize="9.5" fontWeight="600">Flexible calling</text>
        <circle cx="390" cy="65" r="3" fill={accent} data-art-pulse="true" />
      </g>
      <text x="320" y="282" textAnchor="middle" fill={muted} fontSize="9">Network readiness · call management · support · integration</text>
    </> : <>
      {/* Better customer communication: a clear route from the first call to the follow-up */}
      <path d={journeyPath} fill="none" stroke={muted} strokeWidth="1.5" strokeOpacity=".8" />
      <path d={journeyPath} fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity=".9" strokeLinecap="round" opacity="0" data-motion-reveal="true" data-motion-speed={JOURNEY_SPEED} data-motion-period={JOURNEY_PERIOD} />
      <circle r="9" fill={accent} fillOpacity=".2" data-motion-path={journeyPath} data-motion-speed={JOURNEY_SPEED} data-motion-period={JOURNEY_PERIOD} />
      <circle r="3.5" fill={accent} data-motion-path={journeyPath} data-motion-speed={JOURNEY_SPEED} data-motion-period={JOURNEY_PERIOD} />
      {/* The customer's call rings at the first step. */}
      <g fill="none" stroke={accent} strokeWidth="1.2"><circle cx="96" cy="150" r="26" opacity="0" data-art-ripple="1.7" /><circle cx="96" cy="150" r="26" opacity="0" data-art-ripple="1.7" /></g>
      {journey.map(({ x, title, text, icon }, i) => <g key={title} data-art-float="true">
        <circle cx={x} cy="150" r="26" className="art-surface" /><circle cx={x} cy="150" r="26" fill="none" stroke={i === 0 ? accent : 'var(--art-border)'} strokeWidth={i === 0 ? 2 : 1.2} />
        <g transform={`translate(${x - 12} 138)`}><Icon kind={icon} color={i === 0 ? accent : ink} /></g>
        <text x={x} y="208" textAnchor="middle" className="art-caption" fontSize="11" fontWeight="600">{title}</text>
        <text x={x} y="223" textAnchor="middle" fill={muted} fontSize="8.8">{text}</text>
        <text x={x} y="100" textAnchor="middle" fill={muted} fontSize="8.5" fontFamily="ui-monospace, Menlo, monospace">0{i + 1}</text>
        {/* Each step lights up as the call reaches it: ring, icon, number and a small check badge. */}
        <g opacity="0" data-motion-light="true" data-motion-route={i ? `M96 150H${x - 26}` : 'M96 150h1'} data-motion-speed={JOURNEY_SPEED} data-motion-period={JOURNEY_PERIOD}>
          <circle cx={x} cy="150" r="26" fill={accent} fillOpacity=".1" stroke={accent} strokeWidth="2" />
          <circle cx={x} cy="150" r="32" fill="none" stroke={accent} strokeOpacity=".3" />
          <g transform={`translate(${x - 12} 138)`}><Icon kind={icon} color={accent} /></g>
          <text x={x} y="100" textAnchor="middle" fill={accent} fontSize="8.5" fontWeight="700" fontFamily="ui-monospace, Menlo, monospace">0{i + 1}</text>
          <circle cx={x + 19} cy="131" r="6.5" fill={accent} /><path d={`m${x + 16} 131 2 2 3.5-4`} fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>)}
      <g data-art-float="true">
        <rect x="200" y="252" width="240" height="26" rx="13" className="art-surface" />
        {/* The outcome lights once the journey completes. */}
        <rect x="200" y="252" width="240" height="26" rx="13" fill={accent} fillOpacity=".08" stroke={accent} strokeOpacity=".8" opacity="0" data-motion-light="true" data-motion-route={journeyPath} data-motion-speed={JOURNEY_SPEED} data-motion-period={JOURNEY_PERIOD} />
        <circle cx="216" cy="265" r="3.5" fill={accent} data-art-pulse="true" />
        <text x="226" y="268.5" className="art-caption" fontSize="9" fontWeight="600">Fewer handoffs</text><text x="300" y="268.5" fill={muted} fontSize="9">· no repeated explanations</text>
      </g>
    </>}
  </MotionSvg>;
}
