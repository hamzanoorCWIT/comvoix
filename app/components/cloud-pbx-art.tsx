"use client";
import { useId } from 'react';
import { MotionSvg } from './motion';

const accent = 'var(--brand-accent, #f9a21e)';
const ink = 'var(--art-primary, #f8fafc)';
const muted = 'var(--art-secondary, #94a3b8)';

/* Stay Connected From Any Location: one incoming call, delivered from the cloud to three places at once. */
const places = [
  { x: 35, title: 'Head Office', meta: 'Seattle · Desk phone', device: 'desk' },
  { x: 235, title: 'Home Office', meta: 'Portland · Laptop', device: 'laptop' },
  { x: 435, title: 'On the Go', meta: 'Mobile app', device: 'mobile' },
] as const;
const drops = places.map(({ x }) => `M320 174C320 206 ${x + 85} 184 ${x + 85} 214`);
const SPEED = '120', PERIOD = '3.6';

function Device({ kind, x, y }: { kind: 'desk' | 'laptop' | 'mobile'; x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`} fill="none" stroke={ink} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    {kind === 'desk' ? <><rect x="-13" y="-6" width="26" height="16" rx="3" /><path d="M-13 2h26M-7-6v-5q0-3 3-3h8q3 0 3 3v5" /><path d="M-6 6h3M0 6h3M6 6h2" stroke={muted} /></>
      : kind === 'laptop' ? <><rect x="-12" y="-10" width="24" height="15" rx="2.5" /><path d="M-16 8h32" /><path d="M-5-3q5-4 10 0" stroke={accent} /><circle cy="0" r=".9" fill={accent} stroke="none" /></>
      : <><rect x="-7" y="-13" width="14" height="26" rx="3.5" /><path d="M-2-10h4M-1 9h2" /><path d="M-3 0q3-3 6 0" stroke={accent} /></>}
  </g>;
}

export function RemoteWorkArt() {
  const id = useId();
  return <MotionSvg className="communication-art cloud-pbx-art" viewBox="0 0 640 360" role="img" aria-labelledby={id}>
    <title id={id}>One business number ringing a desk phone, a laptop and a mobile at the same time through Cloud PBX</title>
    <g fill="none" stroke={muted} strokeOpacity=".12">{[60, 120, 180, 240, 300].map(y => <path key={y} d={`M20 ${y}H620`} />)}{[80, 160, 240, 320, 400, 480, 560].map(x => <path key={x} d={`M${x} 20V340`} />)}</g>

    {/* Cloud PBX */}
    <g data-art-float="true">
      <g transform="translate(243 -4) scale(7)"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="var(--art-surface)" /><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="none" stroke={muted} strokeWidth=".22" strokeOpacity=".8" strokeLinejoin="round" /></g>
      <text x="324" y="96" textAnchor="middle" className="art-caption" fontSize="8" fontWeight="700" letterSpacing="1.5">CLOUD PBX</text>
      <text x="324" y="110" textAnchor="middle" fill={muted} fontSize="7.5">One number · every device</text>
      <circle cx="372" cy="62" r="4" fill={accent} data-art-pulse="true" />
    </g>

    {/* The incoming call */}
    <rect x="236" y="148" width="168" height="26" rx="13" className="art-surface" />
    <g transform="translate(252 161)"><circle r="7" fill={accent} fillOpacity=".15" /><path transform="scale(.42)" d="M-7-9h5l2.5 7-3.5 2.5a16 16 0 0 0 8 8l2.5-3.5 7 2.5v5q0 2-2 2A24 24 0 0 1-9-7q0-2 2-2Z" fill={accent} /></g>
    <text x="266" y="165" className="art-caption" fontSize="9" fontWeight="600">Incoming</text><text x="312" y="165" fill={muted} fontSize="9">+1 (206) 555-0102</text>

    {/* Routes to each place: neutral at rest, orange as the call travels */}
    <g fill="none" stroke={muted} strokeWidth="1.5" strokeOpacity=".8">{drops.map(d => <path key={d} d={d} />)}</g>
    <g fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity=".8" strokeLinecap="round">{drops.map(d => <path key={`${d}-t`} d={d} opacity="0" data-motion-reveal="true" data-motion-speed={SPEED} data-motion-period={PERIOD} />)}</g>
    {drops.map(d => <circle key={d} r="3" fill={accent} data-motion-path={d} data-motion-speed={SPEED} data-motion-period={PERIOD} />)}

    {/* Places */}
    {places.map(({ x, title, meta, device }, i) => <g key={title} data-art-float="true">
      <rect x={x} y="214" width="170" height="122" rx="18" className="art-surface" />
      <circle cx={x + 85} cy="214" r="4.5" fill={muted} /><circle cx={x + 85} cy="214" r="4.5" fill={accent} opacity="0" data-motion-light="true" data-motion-route={drops[i]} data-motion-speed={SPEED} data-motion-period={PERIOD} />
      <rect x={x + 16} y="230" width="36" height="36" rx="11" className="art-surface" /><Device kind={device} x={x + 34} y={248} />
      <text x={x + 62} y="244" className="art-caption" fontSize="11" fontWeight="600">{title}</text>
      <text x={x + 62} y="258" fill={muted} fontSize="8.5">{meta}</text>
      <g transform={`translate(${x + 30} 306)`}>
        <circle r="12" fill="none" stroke={accent} strokeOpacity=".35" data-art-pulse="true" /><circle r="7" fill="none" stroke={accent} strokeOpacity=".6" data-art-pulse="true" /><circle r="3" fill={accent} />
      </g>
      <text x={x + 50} y="303" fill={accent} fontSize="9" fontWeight="600">Ringing</text>
      <text x={x + 50} y="315" fill={muted} fontSize="7.8">Ext. 204 · Sales Team</text>
      <g transform={`translate(${x + 140} 306)`} fill="none" stroke={muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M0 8c-5-5.5-7-9-7-12a7 7 0 0 1 14 0c0 3-2 6.5-7 12Z" /><circle cy="-4" r="2" /></g>
    </g>)}
  </MotionSvg>;
}

/* Why Choose Comvoix: a live monitoring dashboard for the voice platform. */
const quality = [44, 40, 46, 42, 48, 45, 50, 47, 52, 49, 54, 51, 55, 53, 57, 54, 58, 56, 60, 57, 61, 59, 62, 60];
const traffic = [34, 48, 56, 62, 70, 66, 78, 84, 90, 86, 94, 88, 96, 92, 84, 80, 74, 70, 62, 58, 52, 46, 40, 36];
const qualityLine = quality.map((v, i) => `${i === 0 ? 'M' : 'L'}${50 + i * 11.3} ${150 - v}`).join('');

export function ReliabilityArt() {
  const id = useId();
  return <MotionSvg className="communication-art cloud-pbx-art" viewBox="0 0 640 360" role="img" aria-labelledby={id}>
    <title id={id}>Voice platform monitoring dashboard: call quality, uptime, healthy routes and live traffic with no open alerts</title>

    {/* Call quality */}
    <g data-art-float="true">
      <rect x="30" y="30" width="300" height="150" rx="18" className="art-surface" />
      <text x="50" y="54" fill={muted} fontSize="8" fontWeight="600" letterSpacing="1">CALL QUALITY</text>
      <text x="50" y="80" className="art-caption" fontSize="20" fontWeight="700">4.4</text><text x="86" y="80" fill={muted} fontSize="9">MOS · Excellent</text>
      <rect x="254" y="44" width="58" height="18" rx="9" fill={accent} fillOpacity=".15" /><circle cx="266" cy="53" r="3" fill={accent} data-art-pulse="true" /><text x="273" y="56.5" fill={accent} fontSize="8" fontWeight="700">Live</text>
      <g fill="none" stroke={muted} strokeOpacity=".2">{[100, 125, 150].map(y => <path key={y} d={`M50 ${y}H310`} />)}</g>
      <path d={`${qualityLine}V150H50Z`} fill={accent} fillOpacity=".08" />
      <path d={qualityLine} fill="none" stroke={muted} strokeOpacity=".6" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <path d={qualityLine} fill="none" stroke={accent} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="200 100" data-art-trace="true" />
      <circle cx={50 + 23 * 11.3} cy={150 - 60} r="4" fill={accent} data-art-pulse="true" />
      <text x="50" y="168" fill={muted} fontSize="7">Last 24 hours</text><text x="310" y="168" textAnchor="end" fill={muted} fontSize="7">Jitter 4 ms · Packet loss 0.0%</text>
    </g>

    {/* Uptime */}
    <g data-art-float="true">
      <rect x="350" y="30" width="260" height="66" rx="18" className="art-surface" />
      <text x="370" y="54" fill={muted} fontSize="8" fontWeight="600" letterSpacing="1">UPTIME · 30 DAYS</text>
      <text x="590" y="56" textAnchor="end" className="art-caption" fontSize="13" fontWeight="700">99.97%</text>
      {Array.from({ length: 30 }, (_, i) => <rect key={i} x={370 + i * 7.4} y="66" width="5.2" height="14" rx="1.5" fill={i === 11 ? muted : accent} fillOpacity={i === 11 ? .5 : 1} />)}
    </g>

    {/* Routes */}
    <g data-art-float="true">
      <rect x="350" y="112" width="260" height="68" rx="18" className="art-surface" />
      <text x="370" y="134" fill={muted} fontSize="8" fontWeight="600" letterSpacing="1">VOICE ROUTES</text>
      {[['Primary', 'Healthy', accent], ['Secondary', 'Standby', muted], ['Failover', 'Ready', muted]].map(([name, state, color], i) => <g key={name}>
        <circle cx={378 + i * 80} cy="158" r="3.5" fill={color} data-art-pulse={i === 0 ? 'true' : undefined} />
        <text x={386 + i * 80} y="155" className="art-caption" fontSize="8.5" fontWeight="600">{name}</text><text x={386 + i * 80} y="166" fill={muted} fontSize="7.5">{state}</text>
      </g>)}
    </g>

    {/* Live traffic */}
    <g data-art-float="true">
      <rect x="30" y="198" width="580" height="132" rx="18" className="art-surface" />
      <text x="50" y="222" fill={muted} fontSize="8" fontWeight="600" letterSpacing="1">LIVE VOICE TRAFFIC</text>
      <text x="50" y="246" className="art-caption" fontSize="16" fontWeight="700">1,284</text><text x="96" y="246" fill={muted} fontSize="8.5">concurrent calls</text>
      <rect x="474" y="212" width="116" height="20" rx="10" className="art-surface" /><circle cx="488" cy="222" r="3.5" fill={accent} data-art-pulse="true" /><text x="496" y="225.5" className="art-caption" fontSize="8" fontWeight="600">Monitoring 24/7</text>
      {traffic.map((v, i) => <rect key={i} x={50 + i * 22.5} y={316 - v * .6} width="12" height={v * .6} rx="3" fill={i >= 20 ? accent : muted} fillOpacity={i >= 20 ? 1 : .45} data-art-bar="true" />)}
      <text x="590" y="246" textAnchor="end" fill={muted} fontSize="8.5">Alerts</text><text x="590" y="262" textAnchor="end" fill={accent} fontSize="13" fontWeight="700">0</text>
    </g>
  </MotionSvg>;
}
