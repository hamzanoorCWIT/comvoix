"use client";
import { useId, type ReactNode } from 'react';
import { MotionSvg } from './motion';

const accent = 'var(--brand-accent, #f9a21e)';
const ink = 'var(--art-primary, #f8fafc)';
const muted = 'var(--art-secondary, #94a3b8)';
const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

// A request on the left becomes something a customer or team member sees on the right.
type Token = readonly [string, 'key' | 'str' | 'num' | 'plain'];
type Scene = { method: string; path: string; code: readonly (readonly Token[])[]; response: readonly [string, string]; frame: 'phone' | 'window'; screen: ReactNode };

const k = (t: string): Token => [t, 'key'], s = (t: string): Token => [t, 'str'], n = (t: string): Token => [t, 'num'], p = (t: string): Token => [t, 'plain'];
const tokenColor = { key: ink, str: accent, num: accent, plain: muted };

function Code({ lines }: { lines: readonly (readonly Token[])[] }) {
  return <g fontFamily={mono} fontSize="9.4">{lines.map((line, i) => <text key={i} x="42" y={110 + i * 18} xmlSpace="preserve">{line.map(([text, type], j) => <tspan key={j} fill={tokenColor[type]}>{text}</tspan>)}</text>)}</g>;
}
function Avatar({ x, y, r, color = muted }: { x: number; y: number; r: number; color?: string }) {
  return <g transform={`translate(${x} ${y})`}><circle r={r} fill={color} fillOpacity=".25" /><circle cy={-r * .22} r={r * .34} fill={color} /><path d={`M${-r * .62} ${r * .85}q0-${r * .7} ${r * .62}-${r * .7}t${r * .62} ${r * .7}Z`} fill={color} /></g>;
}
function Bars({ x, y, color }: { x: number; y: number; color: string }) {
  return <g fill={color}>{[7, 13, 10, 17, 8, 12, 6].map((h, i) => <rect key={i} x={x + i * 5} y={y - h / 2} width="2.4" height={h} rx="1.2" data-art-bar="true" />)}</g>;
}
function Bubble({ x, y, w, h, mine, children }: { x: number; y: number; w: number; h: number; mine?: boolean; children: ReactNode }) {
  return <g data-art-float="true"><path d={mine
    ? `M${x} ${y + 10}q0-10 10-10h${w - 20}q10 0 10 10v${h - 20}q0 10-10 10h${-(w - 20)}l-6 6v-6q-4 0-4-10Z`
    : `M${x + 10} ${y}h${w - 20}q10 0 10 10v${h - 20}q0 10-10 10h${-(w - 20)}l-6 6v-6q-4-1-4-10v${-(h - 20)}q0-10 10-10Z`}
    fill={mine ? accent : 'var(--art-surface)'} stroke={mine ? accent : 'var(--art-border)'} />{children}</g>;
}

// Screens are drawn inside the phone screen (origin top-left at 396,36; 152 × 248) or the console window.
const screens: Record<string, Scene> = {
  message: {
    method: 'POST', path: '/v1/messages', response: ['202 Accepted', 'id: msg_8f3a'], frame: 'phone',
    code: [[p('{')], [k('  "to"'), p(': '), s('"+1 206 555 0102"'), p(',')], [k('  "from"'), p(': '), s('"Comvoix"'), p(',')], [k('  "text"'), p(': '), s('"Your order #1042')], [s('   has shipped"')], [p('}')]],
    screen: <>
      <Avatar x={420} y={66} r={9} color={accent} /><text x="436" y="63" className="art-caption" fontSize="9" fontWeight="600">Comvoix</text><text x="436" y="74" fill={muted} fontSize="7">Business messaging</text>
      <Bubble x={404} y={92} w={118} h={40}><text x="414" y="108" className="art-caption" fontSize="8">Your order #1042</text><text x="414" y="120" className="art-caption" fontSize="8">has shipped.</text></Bubble>
      <text x="404" y="146" fill={muted} fontSize="6.5">9:41 AM</text>
      <Bubble x={404} y={156} w={132} h={28}><text x="414" y="173" className="art-caption" fontSize="8">Track it: cvx.io/t/8f3a</text></Bubble>
      <Bubble x={464} y={198} w={72} h={26} mine><text x="476" y="215" fill="#fff" fontSize="8" fontWeight="600">Thanks!</text></Bubble>
      <text x="508" y="238" fill={muted} fontSize="6.5">Delivered ✓</text>
      <rect x="404" y="254" width="136" height="20" rx="10" fill="var(--art-surface)" stroke="var(--art-border)" /><text x="414" y="267" fill={muted} fontSize="7.5">Message</text><circle cx="528" cy="264" r="7" fill={accent} /><path d="m525 264 3-3 3 3M528 261v6" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </>,
  },
  email: {
    method: 'POST', path: '/v1/emails', response: ['202 Accepted', 'id: eml_27c1'], frame: 'phone',
    code: [[p('{')], [k('  "to"'), p(': '), s('"alex@company.com"'), p(',')], [k('  "subject"'), p(': '), s('"Welcome aboard"'), p(',')], [k('  "template"'), p(': '), s('"welcome"'), p(',')], [k('  "track_opens"'), p(': '), n('true')], [p('}')]],
    screen: <>
      <text x="408" y="68" className="art-caption" fontSize="11" fontWeight="700">Inbox</text><text x="520" y="68" fill={accent} fontSize="7.5" fontWeight="600">3 new</text>
      {[['Comvoix', 'Welcome aboard', 'Your account is ready to go', '9:41', true], ['Comvoix Billing', 'Receipt #1042', 'Thanks for your payment', '8:12', false], ['Comvoix', 'Password reset', 'Here is your reset link', 'Yesterday', false]].map(([from, subject, preview, time, fresh], i) => <g key={subject as string} data-art-float={i === 0 ? 'true' : undefined}>
        <rect x="402" y={82 + i * 58} width="140" height="50" rx="10" fill={fresh ? accent : 'var(--art-surface)'} fillOpacity={fresh ? .12 : 1} stroke={fresh ? accent : 'var(--art-border)'} strokeWidth={fresh ? 1.2 : 1} />
        <Avatar x={418} y={107 + i * 58} r={9} color={fresh ? accent : muted} />
        <text x="434" y={100 + i * 58} className="art-caption" fontSize="8" fontWeight="600">{from}</text><text x="536" y={100 + i * 58} textAnchor="end" fill={muted} fontSize="6.5">{time}</text>
        <text x="434" y={111 + i * 58} className="art-caption" fontSize="7.5">{subject}</text><text x="434" y={122 + i * 58} fill={muted} fontSize="6.5">{preview}</text>
        {fresh ? <circle cx="536" cy={113 + i * 58} r="2.5" fill={accent} data-art-pulse="true" /> : null}
      </g>)}
      <rect x="402" y="256" width="140" height="18" rx="9" fill="var(--art-surface)" stroke="var(--art-border)" /><text x="412" y="268" fill={muted} fontSize="7">Opened · tracked</text><path d="m524 265 3 3 6-6" stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>,
  },
  'voice-api': {
    method: 'POST', path: '/v1/calls', response: ['201 Created', 'status: in-progress'], frame: 'phone',
    code: [[p('{')], [k('  "to"'), p(': '), s('"+44 7911 100 002"'), p(',')], [k('  "from"'), p(': '), s('"+1 206 555 0102"'), p(',')], [k('  "say"'), p(': '), s('"Hello from Comvoix"'), p(',')], [k('  "record"'), p(': '), n('true')], [p('}')]],
    screen: <>
      <text x="472" y="66" textAnchor="middle" fill={muted} fontSize="7.5">Comvoix Voice</text>
      <circle cx="472" cy="112" r="30" fill={accent} fillOpacity=".12" stroke={accent} strokeOpacity=".5" data-art-pulse="true" /><Avatar x={472} y={112} r={22} color={ink} />
      <text x="472" y="160" textAnchor="middle" className="art-caption" fontSize="9.5" fontWeight="600">+44 7911 100 002</text>
      <text x="472" y="174" textAnchor="middle" fill={accent} fontSize="9" fontWeight="600">00:12</text>
      <Bars x={455} y={194} color={accent} />
      {[['mute', 434], ['keypad', 472], ['speaker', 510]].map(([name, x]) => <g key={name as string}><circle cx={x as number} cy="226" r="13" fill="var(--art-surface)" stroke="var(--art-border)" /><text x={x as number} y="248" textAnchor="middle" fill={muted} fontSize="6">{name}</text></g>)}
      <g transform="translate(434 226)" fill="none" stroke={ink} strokeWidth="1.5" strokeLinecap="round"><rect x="-2" y="-6" width="4" height="7" rx="2" /><path d="M-4.5-1q0 4.5 4.5 4.5T4.5-1M0 3.5v3" /></g>
      <g transform="translate(472 226)" fill={ink}>{[-4, 0, 4].map(dx => [-4, 0, 4].map(dy => <circle key={`${dx}${dy}`} cx={dx} cy={dy} r="1.2" />))}</g>
      <g transform="translate(510 226)" fill="none" stroke={ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M-5-2h2.5l3.5-3v10l-3.5-3H-5Z" /><path d="M3-2q2 2 0 4M5.5-4.5q4 4.5 0 9" /></g>
      <circle cx="472" cy="270" r="13" fill={accent} /><path transform="translate(474.8 271.8) rotate(135)" d="M-5-1.5h2l1 2.5-1.5 1a7 7 0 0 0 3.5 3.5l1-1.5 2.5 1v2q0 1-1 1a10 10 0 0 1-8.5-8.5q0-1 1-1Z" fill="#fff" />
    </>,
  },
  verify: {
    method: 'POST', path: '/v1/verify', response: ['200 OK', 'status: approved'], frame: 'phone',
    code: [[p('{')], [k('  "to"'), p(': '), s('"+1 206 555 0102"'), p(',')], [k('  "channel"'), p(': '), s('"sms"'), p(',')], [k('  "code_length"'), p(': '), n('6'), p(',')], [k('  "expires_in"'), p(': '), n('300')], [p('}')]],
    screen: <>
      <g transform="translate(472 84)"><circle r="18" fill={accent} fillOpacity=".12" /><path d="M0-11 -9-7.5v6c0 5.5 4 9.5 9 11.5 5-2 9-6 9-11.5v-6Z" fill="none" stroke={accent} strokeWidth="1.8" strokeLinejoin="round" /><path d="m-4 0 3 3 6-6" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></g>
      <text x="472" y="122" textAnchor="middle" className="art-caption" fontSize="9.5" fontWeight="600">Verify your number</text>
      <text x="472" y="135" textAnchor="middle" fill={muted} fontSize="6.8">Enter the code sent to +1 ••• 0102</text>
      {['4', '8', '2', '9', '1', '3'].map((digit, i) => <g key={i} data-art-float={i === 5 ? 'true' : undefined}><rect x={409 + i * 22} y="148" width="18" height="24" rx="5" fill="var(--art-surface)" stroke={i === 5 ? accent : 'var(--art-border)'} strokeWidth={i === 5 ? 1.4 : 1} /><text x={418 + i * 22} y="165" textAnchor="middle" className="art-caption" fontSize="11" fontWeight="700">{digit}</text></g>)}
      <rect x="409" y="190" width="126" height="24" rx="12" fill={accent} /><text x="472" y="205.5" textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="700">Verified ✓</text>
      <text x="472" y="230" textAnchor="middle" fill={muted} fontSize="6.8">Didn’t get a code? Resend</text>
      <text x="472" y="262" textAnchor="middle" fill={muted} fontSize="6.5">Code expires in 04:48</text>
    </>,
  },
  numbers: {
    method: 'GET', path: '/v1/numbers/available', response: ['200 OK', '12 numbers found'], frame: 'phone',
    code: [[p('{')], [k('  "country"'), p(': '), s('"US"'), p(',')], [k('  "type"'), p(': '), s('"local"'), p(',')], [k('  "area_code"'), p(': '), s('"206"'), p(',')], [k('  "features"'), p(': ['), s('"voice"'), p(', '), s('"sms"'), p(']')], [p('}')]],
    screen: <>
      <text x="408" y="66" className="art-caption" fontSize="10" fontWeight="700">Choose a number</text>
      <rect x="404" y="76" width="136" height="20" rx="10" fill="var(--art-surface)" stroke="var(--art-border)" /><circle cx="416" cy="86" r="3.5" fill="none" stroke={muted} strokeWidth="1.3" /><path d="m418.5 88.5 2.5 2.5" stroke={muted} strokeWidth="1.3" strokeLinecap="round" /><text x="426" y="89" fill={muted} fontSize="7.5">Seattle, WA · 206</text>
      {[['+1 (206) 555-0102', 'Local · Voice, SMS', true], ['+1 (206) 555-0148', 'Local · Voice, SMS', false], ['+1 (206) 555-0177', 'Local · Voice', false], ['+1 (800) 555-0102', 'Toll-free · Voice', false]].map(([number, meta, picked], i) => <g key={number as string} data-art-float={picked ? 'true' : undefined}>
        <rect x="404" y={106 + i * 38} width="136" height="32" rx="9" fill={picked ? accent : 'var(--art-surface)'} fillOpacity={picked ? .12 : 1} stroke={picked ? accent : 'var(--art-border)'} strokeWidth={picked ? 1.2 : 1} />
        <text x="414" y={120 + i * 38} className="art-caption" fontSize="8" fontWeight="600">{number}</text><text x="414" y={131 + i * 38} fill={muted} fontSize="6.5">{meta}</text>
        {picked ? <><circle cx="528" cy={122 + i * 38} r="6" fill={accent} /><path d="m525 122 2 2 4-4" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></> : <circle cx="528" cy={122 + i * 38} r="6" fill="none" stroke="var(--art-border)" />}
      </g>)}
      <rect x="404" y="258" width="136" height="20" rx="10" fill={accent} /><text x="472" y="271" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">Add to account</text>
    </>,
  },
  'pbx-console': {
    method: 'PUT', path: '/v1/pbx/extensions/204', response: ['200 OK', 'extension updated'], frame: 'window',
    code: [[p('{')], [k('  "name"'), p(': '), s('"Sales Team"'), p(',')], [k('  "ring"'), p(': '), s('"simultaneous"'), p(',')], [k('  "voicemail"'), p(': '), n('true'), p(',')], [k('  "members"'), p(': '), n('4')], [p('}')]],
    screen: <>
      {['Dashboard', 'Extensions', 'Call Flows', 'Numbers', 'Reports'].map((item, i) => <g key={item}><rect x="380" y={72 + i * 20} width="54" height="16" rx="5" fill={i === 1 ? accent : 'none'} fillOpacity={i === 1 ? .15 : 0} /><text x="387" y={83 + i * 20} fill={i === 1 ? accent : muted} fontSize="6.5" fontWeight={i === 1 ? 700 : 400}>{item}</text></g>)}
      <text x="448" y="80" className="art-caption" fontSize="9.5" fontWeight="700">Extensions</text><rect x="568" y="70" width="38" height="14" rx="7" fill={accent} /><text x="587" y="80" textAnchor="middle" fill="#fff" fontSize="6.5" fontWeight="700">+ Add</text>
      <text x="448" y="98" fill={muted} fontSize="6">EXT</text><text x="476" y="98" fill={muted} fontSize="6">NAME</text><text x="546" y="98" fill={muted} fontSize="6">STATUS</text>
      {[['101', 'Reception', 'On call', true], ['204', 'Sales Team', 'Ring all · 4', false], ['310', 'Support', 'Available', false], ['412', 'Finance', 'Voicemail', false]].map(([ext, name, status, live], i) => <g key={ext as string} data-art-float={i === 1 ? 'true' : undefined}>
        <rect x="444" y={106 + i * 30} width="164" height="24" rx="7" fill={i === 1 ? accent : 'var(--art-surface)'} fillOpacity={i === 1 ? .12 : 1} stroke={i === 1 ? accent : 'var(--art-border)'} strokeWidth={i === 1 ? 1.2 : 1} />
        <text x="450" y={121 + i * 30} fill={accent} fontSize="7.5" fontWeight="700" fontFamily={mono}>{ext}</text><text x="476" y={121 + i * 30} className="art-caption" fontSize="7.5" fontWeight="600">{name}</text>
        <circle cx="549" cy={118 + i * 30} r="2.5" fill={live ? accent : muted} data-art-pulse={live ? 'true' : undefined} /><text x="555" y={121 + i * 30} fill={live ? accent : muted} fontSize="6.5">{status}</text>
      </g>)}
      <rect x="444" y="232" width="164" height="18" rx="9" fill="var(--art-surface)" stroke="var(--art-border)" /><circle cx="456" cy="241" r="3" fill={accent} data-art-pulse="true" /><text x="464" y="244" fill={muted} fontSize="6.5">Changes saved · synced to all devices</text>
    </>,
  },
};

const route = (frame: 'phone' | 'window') => `M296 160L${frame === 'phone' ? 384 : 368} 160`;

export function ProductSceneArt({ kind, label }: { kind: string; label: string }) {
  const id = useId();
  const scene = screens[kind] ?? screens.message;
  const path = route(scene.frame);
  const end = scene.frame === 'phone' ? 384 : 368;
  return <MotionSvg key={kind} className="communication-art product-scene" viewBox="0 0 640 320" role="img" aria-labelledby={id}>
    <title id={id}>{label}</title>

    {/* Request card */}
    <rect x="24" y="40" width="272" height="240" rx="16" className="art-surface" />
    <rect x="40" y="56" width={scene.method.length * 7 + 14} height="20" rx="6" fill={accent} fillOpacity=".15" /><text x={47} y="70" fill={accent} fontSize="9" fontWeight="700" fontFamily={mono}>{scene.method}</text>
    <text x={scene.method.length * 7 + 62} y="70" className="art-caption" fontSize="9.5" fontFamily={mono}>{scene.path}</text>
    <path d="M40 88h240" stroke="var(--art-border)" />
    <Code lines={scene.code} />
    <rect x="40" y="232" width="240" height="30" rx="9" fill="var(--art-soft)" stroke="var(--art-border)" />
    <circle cx="56" cy="247" r="4" fill={accent} data-art-pulse="true" /><text x="66" y="250.5" className="art-caption" fontSize="8.5" fontWeight="600" fontFamily={mono}>{scene.response[0]}</text><text x={66 + scene.response[0].length * 5.6 + 8} y="250.5" fill={muted} fontSize="8" fontFamily={mono}>{scene.response[1]}</text>

    {/* The request travels to the device, lighting the line and the end dot as it arrives */}
    <path d={path} fill="none" stroke={muted} strokeWidth="1.5" strokeOpacity=".8" />
    <path d={path} fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity=".8" strokeLinecap="round" opacity="0" data-motion-reveal="true" data-motion-speed="120" data-motion-period="3.2" />
    <circle cx={end} cy="160" r="4.5" fill={muted} /><circle cx={end} cy="160" r="4.5" fill={accent} opacity="0" data-motion-light="true" data-motion-route={path} data-motion-speed="120" data-motion-period="3.2" />
    <circle r="3" fill={accent} data-motion-path={path} data-motion-speed="120" data-motion-period="3.2" />

    {scene.frame === 'phone' ? <g data-art-float="true">
      <rect x="388" y="28" width="168" height="264" rx="26" className="art-surface" />
      <rect x="396" y="36" width="152" height="248" rx="20" fill="var(--art-soft)" />
      <rect x="448" y="40" width="48" height="8" rx="4" className="art-surface" />
      <text x="408" y="52" className="art-caption" fontSize="6.5" fontWeight="600">9:41</text><g transform="translate(524 46)" fill={ink}><rect x="0" y="2" width="2" height="4" rx=".6" /><rect x="3" y="1" width="2" height="5" rx=".6" /><rect x="6" y="0" width="2" height="6" rx=".6" /><rect x="11" y="0" width="8" height="6" rx="1.5" fill="none" stroke={ink} strokeWidth=".8" /><rect x="12" y="1" width="5" height="4" rx=".6" /></g>
      {scene.screen}
    </g> : <g data-art-float="true">
      <rect x="372" y="40" width="244" height="240" rx="12" className="art-surface" />
      <path d="M372 60h244" stroke="var(--art-border)" />{[384, 394, 404].map((x, i) => <circle key={x} cx={x} cy="50" r="2.8" fill={i === 0 ? accent : muted} fillOpacity={i === 0 ? 1 : .5} />)}
      <rect x="430" y="44" width="140" height="12" rx="6" fill="var(--art-soft)" /><text x="500" y="52.5" textAnchor="middle" fill={muted} fontSize="6.5">console.comvoix.com</text>
      <path d="M372 60h68v220h-56q-12 0-12-12Z" fill="var(--art-soft)" />
      {scene.screen}
    </g>}
  </MotionSvg>;
}
