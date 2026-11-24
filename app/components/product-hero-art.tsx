"use client";
import { useId } from 'react';
import { MotionSvg } from './motion';

const accent = 'var(--brand-accent, #f9a21e)';
const ink = 'var(--art-primary, #f8fafc)';
const muted = 'var(--art-secondary, #94a3b8)';
const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

/* Business Numbers: numbers in every market, pinned on a globe, all answered by one business. */
const pins = [
  { x: 150, y: 96, city: 'Seattle', number: '+1 (206) 555-0102', type: 'Local', live: true },
  { x: 470, y: 78, city: 'London', number: '+44 20 7946 0102', type: 'National', live: false },
  { x: 540, y: 190, city: 'Dubai', number: '+971 4 555 0102', type: 'Local', live: true },
  { x: 110, y: 206, city: 'Nationwide', number: '+1 (800) 555-0102', type: 'Toll-free', live: false },
] as const;
const home = { x: 320, y: 300 };
const links = pins.map(({ x, y }) => `M${x} ${y + 14}Q${(x + home.x) / 2} ${home.y - 20} ${home.x + (x - home.x) * .18} ${home.y - 26}`);

export function NumbersHeroArt() {
  const id = useId();
  return <MotionSvg className="communication-art product-hero-art" viewBox="0 0 640 360" role="img" aria-labelledby={id}>
    <title id={id}>Business numbers for Seattle, London, Dubai and a toll-free line, all connected to one business account</title>

    {/* Globe grid */}
    <g fill="none" stroke={muted} strokeOpacity=".25">
      <ellipse cx="320" cy="150" rx="250" ry="118" /><ellipse cx="320" cy="150" rx="250" ry="70" /><ellipse cx="320" cy="150" rx="250" ry="24" />
      <ellipse cx="320" cy="150" rx="160" ry="118" /><ellipse cx="320" cy="150" rx="70" ry="118" /><path d="M320 32V268M70 150H570" />
    </g>

    {/* Routes home */}
    <g fill="none" stroke={muted} strokeWidth="1.3" strokeOpacity=".7" strokeDasharray="3 5">{links.map(d => <path key={d} d={d} />)}</g>
    {links.map((d, i) => <circle key={d} r="3" fill={accent} data-motion-path={d} data-duration={5 + i} />)}

    {/* Numbers */}
    {pins.map(({ x, y, city, number, type, live }) => <g key={city} data-art-float="true">
      <g transform={`translate(${x} ${y})`}>
        <circle r="13" fill={accent} fillOpacity={live ? .18 : .1} data-art-pulse={live ? 'true' : undefined} />
        <path d="M0 9c-5-5.5-7-9-7-12a7 7 0 0 1 14 0c0 3-2 6.5-7 12Z" fill={live ? accent : 'var(--art-surface)'} stroke={live ? accent : ink} strokeWidth="1.5" strokeLinejoin="round" /><circle cy="-3" r="2" fill={live ? '#fff' : ink} />
      </g>
      <rect x={x - 70} y={y - 52} width="140" height="34" rx="10" className="art-surface" />
      <text x={x - 58} y={y - 38} className="art-caption" fontSize="9.5" fontWeight="600" fontFamily={mono}>{number}</text>
      <text x={x - 58} y={y - 26} fill={muted} fontSize="7.5">{city} · {type}</text>
      {live ? <circle cx={x + 58} cy={y - 35} r="3" fill={accent} data-art-pulse="true" /> : null}
    </g>)}

    {/* Your business */}
    <g data-art-float="true">
      <rect x={home.x - 110} y={home.y - 26} width="220" height="52" rx="14" className="art-surface" />
      <g transform={`translate(${home.x - 90} ${home.y})`} fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M-7 9V-6q0-2 2-2h8q2 0 2 2v15M5-1h4q1 0 1 1v9M-7 9h18" /><path d="M-3-4h2M1-4h2M-3 0h2M1 0h2M-3 4h2M1 4h2" stroke={accent} /></g>
      <text x={home.x - 72} y={home.y - 3} className="art-caption" fontSize="10.5" fontWeight="600">Your Business</text>
      <text x={home.x - 72} y={home.y + 11} fill={muted} fontSize="8">Every number rings your team</text>
      <rect x={home.x + 50} y={home.y - 10} width="52" height="20" rx="10" fill={accent} fillOpacity=".15" /><text x={home.x + 76} y={home.y + 3.5} textAnchor="middle" fill={accent} fontSize="8" fontWeight="700">4 numbers</text>
    </g>
  </MotionSvg>;
}

/* SIP Trunking: the conversation between your PBX and Comvoix, step by step, then two-way media. */
const steps = [
  { y: 96, label: 'INVITE', dir: 'right' },
  { y: 128, label: '100 Trying', dir: 'left' },
  { y: 160, label: '180 Ringing', dir: 'left' },
  { y: 192, label: '200 OK', dir: 'left', ok: true },
  { y: 224, label: 'ACK', dir: 'right' },
] as const;
const LEFT = 150, RIGHT = 490;

export function SipHeroArt() {
  const id = useId();
  return <MotionSvg className="communication-art product-hero-art" viewBox="0 0 640 360" role="img" aria-labelledby={id}>
    <title id={id}>SIP call setup between an existing IP PBX and the Comvoix network: invite, ringing, answer and two-way media</title>

    {/* Endpoints */}
    {[[LEFT, 'Your IP PBX', 'On-premise · registered'], [RIGHT, 'Comvoix', 'SIP network · carrier grade']].map(([x, title, text], i) => <g key={title} data-art-float="true">
      <rect x={(x as number) - 90} y="22" width="180" height="48" rx="14" className="art-surface" />
      <rect x={(x as number) - 76} y="32" width="28" height="28" rx="9" className="art-surface" />
      <g transform={`translate(${(x as number) - 62} 46)`} fill="none" stroke={i ? accent : ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {i ? <><circle r="8" /><path d="M-8 0h16M0-8q-4.5 3.5-4.5 8T0 8q4.5-3.5 4.5-8T0-8" /></> : <><rect x="-8" y="-7" width="16" height="5" rx="1.5" /><rect x="-8" y="2" width="16" height="5" rx="1.5" /><circle cx="-5" cy="-4.5" r=".9" fill={accent} stroke="none" /><circle cx="-5" cy="4.5" r=".9" fill={accent} stroke="none" /></>}
      </g>
      <text x={(x as number) - 40} y="43" className="art-caption" fontSize="10.5" fontWeight="600">{title}</text>
      <text x={(x as number) - 40} y="57" fill={muted} fontSize="7.8">{text}</text>
      <path d={`M${x} 70V268`} stroke={muted} strokeOpacity=".5" strokeDasharray="2 5" />
    </g>)}

    {/* Signalling */}
    {steps.map(({ y, label, dir }, i) => { const ok = 'ok' in steps[i] && steps[i].ok; const path = dir === 'right' ? `M${LEFT} ${y}L${RIGHT} ${y}` : `M${RIGHT} ${y}L${LEFT} ${y}`; return <g key={label}>
      <path d={path} fill="none" stroke={ok ? accent : muted} strokeWidth="1.4" strokeOpacity=".8" />
      <path d={dir === 'right' ? `M${RIGHT - 7} ${y - 4}l7 4-7 4` : `M${LEFT + 7} ${y - 4}l-7 4 7 4`} fill="none" stroke={ok ? accent : muted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="276" y={y - 10} width="88" height="20" rx="10" className="art-surface" />
      <text x="320" y={y + 3.5} textAnchor="middle" fill={ok ? accent : ink} fontSize="8.5" fontWeight="700" fontFamily={mono}>{label}</text>
      <circle r="2.8" fill={accent} data-motion-path={path} data-duration={3 + i * .4} />
    </g>; })}

    {/* Media */}
    <rect x={LEFT} y="246" width={RIGHT - LEFT} height="22" rx="11" fill={accent} fillOpacity=".12" stroke={accent} strokeOpacity=".5" />
    <text x="320" y="260.5" textAnchor="middle" fill={accent} fontSize="8.5" fontWeight="700" letterSpacing="1">◀  TWO-WAY AUDIO · RTP  ▶</text>
    <g fill={accent}>{[6, 11, 8, 14, 7, 10, 6].map((h, i) => <rect key={i} x={LEFT + 14 + i * 5} y={257 - h / 2} width="2.2" height={h} rx="1.1" data-art-bar="true" />)}</g>
    <g fill={accent}>{[6, 11, 8, 14, 7, 10, 6].map((h, i) => <rect key={i} x={RIGHT - 48 + i * 5} y={257 - h / 2} width="2.2" height={h} rx="1.1" data-art-bar="true" />)}</g>

    {/* Session facts */}
    {[['Registered', 'Trunk online'], ['Codecs', 'G.711 · Opus'], ['Secure', 'TLS + SRTP'], ['Channels', '18 of 24 in use']].map(([title, text], i) => <g key={title} data-art-float="true">
      <rect x={60 + i * 134} y="290" width="122" height="44" rx="12" className="art-surface" />
      <circle cx={76 + i * 134} cy="312" r="3.5" fill={i === 0 ? accent : muted} data-art-pulse={i === 0 ? 'true' : undefined} />
      <text x={86 + i * 134} y="309" className="art-caption" fontSize="9" fontWeight="600">{title}</text>
      <text x={86 + i * 134} y="321" fill={muted} fontSize="7.5">{text}</text>
    </g>)}
  </MotionSvg>;
}

/* Voice Services: the live board of calls coming in and going out across the Comvoix network. */
const calls = [
  { dir: 'in', from: '+44 20 7946 0102', to: 'Support · Ext. 310', time: '04:12' },
  { dir: 'out', from: 'Sales · Ext. 204', to: '+971 50 123 4567', time: '01:48' },
  { dir: 'in', from: '+1 (206) 555-0148', to: 'Reception · Ext. 101', time: '00:36' },
  { dir: 'out', from: 'Billing · Ext. 412', to: '+49 30 901820', time: '06:05' },
  { dir: 'in', from: '+61 2 5550 0102', to: 'Sales · Ext. 204', time: '00:09' },
] as const;

export function VoiceHeroArt() {
  const id = useId();
  return <MotionSvg className="communication-art product-hero-art" viewBox="0 0 640 360" role="img" aria-labelledby={id}>
    <title id={id}>Live voice board: inbound origination and outbound termination calls across local and international destinations</title>

    {/* Direction split */}
    {[['Origination', 'Inbound calls', 642, 0], ['Termination', 'Outbound calls', 587, 1]].map(([title, text, count, i]) => <g key={title as string} data-art-float="true">
      <rect x={30 + (i as number) * 300} y="22" width="280" height="64" rx="16" className="art-surface" />
      <g transform={`translate(${56 + (i as number) * 300} 54)`} fill="none" stroke={accent} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle r="13" fill={accent} fillOpacity=".12" stroke="none" />{i ? <path d="M-5 5 5-5M-2-5h7v7" /> : <path d="M5-5-5 5M2 5h-7v-7" />}</g>
      <text x={78 + (i as number) * 300} y="48" className="art-caption" fontSize="10.5" fontWeight="600">{title}</text>
      <text x={78 + (i as number) * 300} y="62" fill={muted} fontSize="8">{text}</text>
      <text x={294 + (i as number) * 300} y="52" textAnchor="end" className="art-caption" fontSize="16" fontWeight="700">{count}</text>
      <text x={294 + (i as number) * 300} y="66" textAnchor="end" fill={muted} fontSize="7.5">active now</text>
    </g>)}
    <rect x="30" y="98" width="580" height="8" rx="4" fill={muted} fillOpacity=".25" /><rect x="30" y="98" width={580 * 642 / 1229} height="8" rx="4" fill={accent} />
    <text x="30" y="120" fill={muted} fontSize="7.5">52% inbound</text><text x="610" y="120" textAnchor="end" fill={muted} fontSize="7.5">48% outbound</text>

    {/* Live calls */}
    <rect x="30" y="132" width="580" height="206" rx="16" className="art-surface" />
    <text x="48" y="152" fill={muted} fontSize="7.5" fontWeight="600" letterSpacing="1">LIVE CALLS</text>
    <rect x="516" y="140" width="76" height="18" rx="9" fill={accent} fillOpacity=".15" /><circle cx="528" cy="149" r="3" fill={accent} data-art-pulse="true" /><text x="536" y="152.5" fill={accent} fontSize="8" fontWeight="700">SIP network</text>
    <g fill={muted} fontSize="6.5" letterSpacing=".5"><text x="48" y="170">DIRECTION</text><text x="150" y="170">FROM</text><text x="330" y="170">TO</text><text x="500" y="170">DURATION</text><text x="560" y="170">QUALITY</text></g>
    {calls.map(({ dir, from, to, time }, i) => <g key={from} data-art-float={i === 4 ? 'true' : undefined}>
      <rect x="40" y={178 + i * 31} width="560" height="26" rx="8" fill={i === 4 ? accent : 'var(--art-soft)'} fillOpacity={i === 4 ? .1 : 1} stroke={i === 4 ? accent : 'var(--art-border)'} strokeWidth={i === 4 ? 1.2 : 1} />
      <g transform={`translate(${56} ${191 + i * 31})`} fill="none" stroke={dir === 'in' ? accent : ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{dir === 'in' ? <path d="M4-4-4 4M1 4h-5v-5" /> : <path d="M-4 4 4-4M-1-4h5v5" />}</g>
      <text x="68" y={194 + i * 31} fill={dir === 'in' ? accent : ink} fontSize="8" fontWeight="600">{dir === 'in' ? 'Inbound' : 'Outbound'}</text>
      <text x="150" y={194 + i * 31} className="art-caption" fontSize="8.5" fontFamily={dir === 'in' ? mono : undefined}>{from}</text>
      <text x="330" y={194 + i * 31} className="art-caption" fontSize="8.5" fontFamily={dir === 'out' ? mono : undefined}>{to}</text>
      <text x="500" y={194 + i * 31} fill={muted} fontSize="8.5" fontFamily={mono}>{time}</text>
      <g fill={accent}>{[5, 9, 7, 11, 6].map((h, j) => <rect key={j} x={562 + j * 4.4} y={191 + i * 31 - h / 2} width="2" height={h} rx="1" data-art-bar="true" />)}</g>
    </g>)}
  </MotionSvg>;
}
