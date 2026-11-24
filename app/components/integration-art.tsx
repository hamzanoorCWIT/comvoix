"use client";
import { useId } from 'react';
import { MotionSvg } from './motion';

const accent = 'var(--brand-accent, #f9a21e)';
const ink = 'var(--art-primary, #f8fafc)';
const muted = 'var(--art-secondary, #94a3b8)';

function Avatar({ x, y, r, color = muted }: { x: number; y: number; r: number; color?: string }) {
  return <g transform={`translate(${x} ${y})`}><circle r={r} fill={color} fillOpacity=".22" /><circle cy={-r * .22} r={r * .34} fill={color} /><path d={`M${-r * .62} ${r * .85}q0-${r * .7} ${r * .62}-${r * .7}t${r * .62} ${r * .7}Z`} fill={color} /></g>;
}
function PhoneIcon({ x, y, size = 16, color = accent }: { x: number; y: number; size?: number; color?: string }) {
  return <path transform={`translate(${x} ${y}) scale(${size / 24})`} d="M6.5 3.5h3.5l1.8 5-2.6 1.8a12 12 0 0 0 5.5 5.5l1.8-2.6 5 1.8v3.5q0 1.7-1.7 1.7A17 17 0 0 1 4.8 5.2q0-1.7 1.7-1.7Z" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />;
}

/* CRM: a contact's activity timeline, with the latest call written in by itself. */
const activity = [
  { x: 96, title: 'Email', text: 'Proposal sent', icon: 'mail' },
  { x: 245, title: 'Meeting', text: 'Demo · 45 min', icon: 'calendar' },
  { x: 394, title: 'Note', text: 'Budget approved', icon: 'note' },
  { x: 543, title: 'Call', text: 'Just now · 02:14', icon: 'phone' },
] as const;
const timeline = 'M96 190H543';
// The last chip confirms ~3.9s in; the period leaves time for every light to hold before the cycle restarts in step.
const CRM_SPEED = '150', CRM_PERIOD = '5.6';

function CrmScene() {
  return <>
    <g data-art-float="true">
      <rect x="40" y="34" width="560" height="76" rx="16" className="art-surface" />
      <Avatar x={76} y={72} r={22} color={accent} />
      <circle cx="93" cy="89" r="4.5" fill={accent} stroke="var(--art-surface)" strokeWidth="2" data-art-pulse="true" />
      <text x="110" y="66" className="art-caption" fontSize="13" fontWeight="600">Alex Morgan</text>
      <text x="110" y="82" fill={muted} fontSize="9">Northwind Ltd · Account owner: Sales · Stage: Proposal</text>
      {/* The call starts here: the button rings and glows. */}
      <rect x="470" y="58" width="112" height="28" rx="14" fill="none" stroke={accent} strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0" data-art-ripple="1.12" />
      <rect x="470" y="58" width="112" height="28" rx="14" fill={accent} /><g data-art-ring="492 72"><PhoneIcon x={484} y={64} size={16} color="#fff" /></g><text x="506" y="76.5" fill="#fff" fontSize="9.5" fontWeight="700">Click to call</text>
    </g>
    <text x="40" y="140" fill={muted} fontSize="8" fontWeight="600" letterSpacing="1">ACTIVITY · LOGGED AUTOMATICALLY</text>
    <path d={timeline} fill="none" stroke={muted} strokeWidth="1.5" strokeOpacity=".8" />
    <path d={timeline} fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity=".9" strokeLinecap="round" opacity="0" data-motion-reveal="true" data-motion-speed={CRM_SPEED} data-motion-period={CRM_PERIOD} />
    <circle r="8" fill={accent} fillOpacity=".2" data-motion-path={timeline} data-motion-speed={CRM_SPEED} data-motion-period={CRM_PERIOD} />
    <circle r="3.5" fill={accent} data-motion-path={timeline} data-motion-speed={CRM_SPEED} data-motion-period={CRM_PERIOD} />
    {activity.map(({ x, title, text, icon }, i) => { const last = i === 3; return <g key={title} data-art-float={last ? 'true' : undefined}>
      <circle cx={x} cy="190" r="16" className="art-surface" /><circle cx={x} cy="190" r="16" fill="none" stroke={last ? accent : 'var(--art-border)'} strokeWidth={last ? 2 : 1.2} />
      {/* Each activity lights as the timeline reaches it. */}
      <g opacity="0" data-motion-light="true" data-motion-route={i ? `M96 190H${x - 16}` : 'M96 190h1'} data-motion-speed={CRM_SPEED} data-motion-period={CRM_PERIOD}>
        <circle cx={x} cy="190" r="16" fill={accent} fillOpacity=".2" stroke={accent} strokeWidth="1.6" />
        <circle cx={x} cy="190" r="21" fill="none" stroke={accent} strokeOpacity=".3" />
      </g>
      <g transform={`translate(${x - 8} 182) scale(.67)`} fill="none" stroke={last ? accent : ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {icon === 'mail' ? <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6.5L20.5 7" /></>
          : icon === 'calendar' ? <><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>
          : icon === 'note' ? <><rect x="4" y="3.5" width="16" height="17" rx="2.5" /><path d="M8 9h8M8 13h8M8 17h4" /></>
          : <path d="M6.5 3.5h3.5l1.8 5-2.6 1.8a12 12 0 0 0 5.5 5.5l1.8-2.6 5 1.8v3.5q0 1.7-1.7 1.7A17 17 0 0 1 4.8 5.2q0-1.7 1.7-1.7Z" />}
      </g>
      <rect x={x - 60} y="222" width="120" height="44" rx="10" fill={last ? accent : 'var(--art-surface)'} fillOpacity={last ? .1 : 1} stroke={last ? accent : 'var(--art-border)'} strokeWidth={last ? 1.4 : 1} />
      <text x={x} y="240" textAnchor="middle" className="art-caption" fontSize="10" fontWeight="600">{title}</text>
      <text x={x} y="254" textAnchor="middle" fill={last ? accent : muted} fontSize="8.5">{text}</text>
      <text x={x} y="162" textAnchor="middle" fill={muted} fontSize="7.5">{['Mon', 'Tue', 'Wed', 'Today'][i]}</text>
      {/* The new call is written into the record. */}
      {last ? <g opacity="0" data-motion-light="true" data-motion-route={timeline} data-motion-speed={CRM_SPEED} data-motion-period={CRM_PERIOD}>
        <rect x={x + 18} y="212" width="44" height="16" rx="8" fill={accent} /><path d={`m${x + 26} 220 2 2 3.5-4`} fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><text x={x + 35} y="223" fill="#fff" fontSize="7" fontWeight="700">Logged</text>
      </g> : null}
    </g>; })}
    {/* What the integration saved, confirmed one after another once the call is logged. */}
    {['Recording saved', 'Duration 02:14', 'Outcome: follow-up'].map((chip, i) => { const x = 130 + i * 130; return <g key={chip}>
      <rect x={x} y="280" width="120" height="20" rx="10" fill="none" stroke="var(--art-border)" />
      <text x={x + 60} y="293.5" textAnchor="middle" fill={muted} fontSize="8">{chip}</text>
      <g opacity="0" data-motion-light="true" data-motion-route={timeline} data-motion-speed={CRM_SPEED} data-motion-period={CRM_PERIOD} data-motion-delay={.3 + i * .3}>
        <rect x={x} y="280" width="120" height="20" rx="10" fill="var(--art-surface)" />
        <rect x={x} y="280" width="120" height="20" rx="10" fill={accent} fillOpacity=".12" stroke={accent} strokeOpacity=".8" />
        <text x={x + 60} y="293.5" textAnchor="middle" fill={accent} fontSize="8" fontWeight="700">✓ {chip}</text>
      </g>
    </g>; })}
  </>;
}

/* Helpdesk: a ticket board where the call moves the ticket forward. */
const columns = [
  { x: 40, title: 'New', tickets: [['#1044', 'Voicemail setup', false], ['#1045', 'Add a user', false]] },
  { x: 236, title: 'In progress', tickets: [['#1042', 'Can’t reach the office line', true]] },
  { x: 432, title: 'Resolved', tickets: [['#1039', 'Number porting', false], ['#1041', 'Call quality check', false]] },
] as const;
const move = 'M198 110H262';

function HelpdeskScene() {
  return <>
    {columns.map(({ x, title, tickets }, c) => <g key={title}>
      <rect x={x} y="34" width="168" height="252" rx="16" fill="var(--art-soft)" stroke="var(--art-border)" />
      <text x={x + 14} y="58" className="art-caption" fontSize="10" fontWeight="600">{title}</text>
      <rect x={x + 134} y="46" width="20" height="16" rx="8" fill={c === 1 ? accent : muted} fillOpacity={c === 1 ? 1 : .3} /><text x={x + 144} y="57.5" textAnchor="middle" fill={c === 1 ? '#fff' : ink} fontSize="8" fontWeight="700">{tickets.length}</text>
      {tickets.map(([id, text, hot], i) => <g key={id} data-art-float={hot ? 'true' : undefined}>
        <rect x={x + 12} y={74 + i * 68} width="144" height="58" rx="10" fill={hot ? accent : 'var(--art-surface)'} fillOpacity={hot ? .1 : 1} stroke={hot ? accent : 'var(--art-border)'} strokeWidth={hot ? 1.4 : 1} />
        <text x={x + 24} y={92 + i * 68} fill={hot ? accent : muted} fontSize="7.5" fontWeight="700" fontFamily="ui-monospace, Menlo, monospace">{id}</text>
        <text x={x + 24} y={106 + i * 68} className="art-caption" fontSize="9" fontWeight="600">{text}</text>
        {hot ? <><rect x={x + 24} y="112" width="92" height="14" rx="7" fill={accent} fillOpacity=".15" /><PhoneIcon x={x + 28} y={114} size={10} /><text x={x + 42} y="122" fill={accent} fontSize="7" fontWeight="700">Call attached · 02:14</text></>
          : <><Avatar x={x + 30} y={120 + i * 68} r={6} /><text x={x + 42} y={123 + i * 68} fill={muted} fontSize="7">{c === 2 ? 'Closed' : 'Unassigned'}</text></>}
      </g>)}
    </g>)}
    {/* The call pushed the ticket from New into In progress */}
    <path d={move} fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity=".9" strokeDasharray="3 4" />
    <path d="M256 106l6 4-6 4" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle r="3.5" fill={accent} data-motion-path={move} data-duration="3" />
    <g data-art-float="true">
      <rect x="236" y="160" width="168" height="64" rx="12" className="art-surface" />
      <Avatar x={258} y={180} r={10} color={accent} /><text x="276" y="177" className="art-caption" fontSize="8.5" fontWeight="600">Priya Shah</text><text x="276" y="189" fill={muted} fontSize="7.5">Called the customer back</text>
      <g fill={accent}>{[4, 8, 6, 10, 5, 8, 4].map((h, i) => <rect key={i} x={252 + i * 4.6} y={208 - h / 2} width="2" height={h} rx="1" data-art-bar="true" />)}</g>
      <text x="292" y="211" fill={muted} fontSize="7.5">Recording saved in the ticket</text>
    </g>
  </>;
}

/* Collaboration tools: the call shows up where the team is already talking, as a notification on top of the chat. */
function TeamsScene() {
  return <>
    {/* The chat behind */}
    <rect x="60" y="30" width="520" height="260" rx="18" className="art-surface" />
    <text x="84" y="56" className="art-caption" fontSize="10" fontWeight="600"># sales</text>
    {[[480, muted], [494, ink], [508, accent]].map(([x, c], i) => <circle key={i} cx={x as number} cy="52" r="5.5" fill={c as string} fillOpacity={i === 2 ? 1 : .6} stroke="var(--art-surface)" strokeWidth="1.5" />)}
    <text x="520" y="55.5" fill={muted} fontSize="7.5">3 online</text>
    <Avatar x={96} y={88} r={11} /><text x="116" y="84" className="art-caption" fontSize="9" fontWeight="600">Priya Shah</text><text x="178" y="84" fill={muted} fontSize="7">9:38</text>
    <text x="116" y="97" fill={muted} fontSize="8.5">Can someone take the Northwind call?</text>
    <Avatar x={96} y={232} r={11} color={accent} /><text x="116" y="228" className="art-caption" fontSize="9" fontWeight="600">Alex Morgan</text><text x="186" y="228" fill={muted} fontSize="7">9:39</text>
    <text x="116" y="241" fill={muted} fontSize="8.5">On it — taking the call now.</text>
    <rect x="84" y="256" width="472" height="22" rx="11" fill="var(--art-soft)" stroke="var(--art-border)" /><text x="96" y="270.5" fill={muted} fontSize="8">Message # sales</text>

    {/* Notification stack: the call on top */}
    <g data-art-float="true">
      <rect x="156" y="136" width="328" height="66" rx="14" className="art-surface" opacity=".5" />
      <rect x="144" y="128" width="352" height="70" rx="14" className="art-surface" opacity=".75" />
      <rect x="132" y="118" width="376" height="76" rx="14" fill={accent} fillOpacity=".1" stroke={accent} strokeWidth="1.4" />
      <circle cx="162" cy="156" r="16" fill={accent} fillOpacity=".15" /><circle cx="162" cy="156" r="22" fill="none" stroke={accent} strokeOpacity=".5" data-art-pulse="true" /><PhoneIcon x={152} y={146} size={20} />
      <text x="190" y="146" className="art-caption" fontSize="10.5" fontWeight="600">Incoming call · Northwind Ltd</text>
      <text x="190" y="160" fill={muted} fontSize="8.5">+1 (206) 555-0102 · ringing the sales team</text>
      <rect x="190" y="168" width="54" height="18" rx="9" fill={accent} /><text x="217" y="180.5" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">Answer</text>
      <rect x="250" y="168" width="60" height="18" rx="9" fill="none" stroke="var(--art-border)" /><text x="280" y="180.5" textAnchor="middle" className="art-caption" fontSize="8" fontWeight="600">Transfer</text>
      <text x="494" y="146" textAnchor="end" fill={accent} fontSize="8" fontWeight="700">now</text>
    </g>
  </>;
}

export function IntegrationArt({ kind, label }: { kind: string; label: string }) {
  const id = useId();
  return <MotionSvg className="communication-art integration-art" viewBox="0 0 640 320" role="img" aria-labelledby={id}>
    <title id={id}>{label}</title>
    {kind === 'crm' ? <CrmScene /> : kind === 'helpdesk' ? <HelpdeskScene /> : <TeamsScene />}
  </MotionSvg>;
}
