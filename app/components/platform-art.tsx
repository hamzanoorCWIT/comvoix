"use client";
import { useId } from 'react';
import { MotionSvg } from './motion';
const green = 'var(--art-primary, #f8fafc)';
const blue = 'var(--art-secondary, #94a3b8)';
const accent = 'var(--brand-accent, #f9a21e)';
const ink = green;
const muted = blue;
const modules = [
  { x: 106, title: 'Cloud PBX', text: 'Calling for every team', icon: 'cloud' },
  { x: 249, title: 'Business Numbers', text: 'Local, national, toll-free', icon: 'hash' },
  { x: 391, title: 'SIP Trunking', text: 'Your PBX, connected', icon: 'trunk' },
  { x: 534, title: 'Voice Services', text: 'Inbound and outbound', icon: 'phone' },
] as const;
const aiRoute = 'M320 66V84H165V100';
const handoff = 'M290 200H350';
const foundations = [['Flexible routing', 'Calls go where they belong'], ['Monitoring 24/7', 'Watched around the clock'], ['Secure by design', 'Encrypted signalling and media']] as const;

export function PlatformArt({ scene, label }: { scene: 'hub' | 'ai'; label: string }) {
  const id = useId();
  return <MotionSvg className="communication-art platform-art" viewBox="0 0 640 360" role="img" aria-labelledby={id}>
    <title id={id}>{label}</title>
    {scene === 'hub' ? <>
      {/* The platform as a deck: four services docked on top, the foundations underneath, every piece wired into the same bar. */}
      {modules.map(({ x, title, text, icon }, i) => <g key={title}>
        <path d={`M${x} 132V168`} stroke={muted} strokeWidth="1.5" strokeOpacity=".8" />
        <path d={`M${x} 132V168`} stroke={accent} strokeWidth="1.5" strokeOpacity=".9" strokeLinecap="round" opacity="0" data-motion-reveal="true" data-motion-speed="60" data-motion-delay={`${i * .55}`} data-motion-period="4.8" />
        <circle r="3" fill={accent} data-motion-path={`M${x} 132V168`} data-motion-speed="60" data-motion-delay={`${i * .55}`} data-motion-period="4.8" />
        <circle cx={x} cy="168" r="4" fill={muted} /><circle cx={x} cy="168" r="4" fill={accent} opacity="0" data-motion-light="true" data-motion-route={`M${x} 132V168`} data-motion-speed="60" data-motion-delay={`${i * .55}`} data-motion-period="4.8" />
        <g data-art-float="true">
          <rect x={x - 66} y="48" width="132" height="84" rx="16" className="art-surface" />
          <rect x={x - 52} y="62" width="32" height="32" rx="10" fill={i === 0 ? accent : 'var(--art-soft)'} fillOpacity={i === 0 ? .15 : 1} stroke={i === 0 ? accent : 'var(--art-border)'} strokeOpacity={i === 0 ? .5 : 1} />
          <g transform={`translate(${x - 48} 66)`} fill="none" stroke={i === 0 ? accent : ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {icon === 'cloud' ? <path d="M7 18a4.5 4.5 0 0 1-.5-9 6 6 0 0 1 11.5-1.5A4 4 0 0 1 18 18Z" />
              : icon === 'hash' ? <path d="M9 3.5 7 20.5M17 3.5l-2 17M4.5 8.5h16M3.5 14.5h16" />
              : icon === 'trunk' ? <><path d="M3 7h18M3 12h18M3 17h18" /><circle cx="7" cy="7" r="1.6" fill={ink} stroke="none" /><circle cx="17" cy="12" r="1.6" fill={ink} stroke="none" /><circle cx="10" cy="17" r="1.6" fill={ink} stroke="none" /></>
              : <path d="M6.5 3.5h3.5l1.8 5-2.6 1.8a12 12 0 0 0 5.5 5.5l1.8-2.6 5 1.8v3.5q0 1.7-1.7 1.7A17 17 0 0 1 4.8 5.2q0-1.7 1.7-1.7Z" />}
          </g>
          <text x={x - 52} y="114" className="art-caption" fontSize="10" fontWeight="600">{title}</text>
          <text x={x - 52} y="126" fill={muted} fontSize="7.6">{text}</text>
        </g>
      </g>)}

      <g data-art-float="true">
        <rect x="40" y="168" width="560" height="64" rx="18" fill={accent} fillOpacity=".08" stroke={accent} strokeWidth="1.4" />
        <g transform="translate(74 200)" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle r="17" className="art-surface" strokeWidth="1.2" /><circle r="8" /><path d="M-8 0h16M0-8q-4 3-4 8t4 8q4-3 4-8t-4-8" /><path d="M-5.5-4q5.5 2 11 0M-5.5 4q5.5-2 11 0" stroke={accent} /></g>
        <text x="104" y="196" className="art-caption" fontSize="11.5" fontWeight="700" letterSpacing="1">COMVOIX PLATFORM</text>
        <text x="104" y="211" fill={muted} fontSize="8.5">One environment for every business conversation</text>
        <rect x="486" y="188" width="96" height="24" rx="12" className="art-surface" /><circle cx="500" cy="200" r="3.5" fill={accent} data-art-pulse="true" /><text x="508" y="203.5" className="art-caption" fontSize="8.5" fontWeight="600">All connected</text>
      </g>

      {foundations.map(([title, text], i) => { const x = 140 + i * 180; return <g key={title}>
        <path d={`M${x} 232V262`} stroke={muted} strokeWidth="1.5" strokeOpacity=".6" />
        <g data-art-float="true">
          <rect x={x - 76} y="262" width="152" height="54" rx="14" className="art-surface" />
          <circle cx={x - 58} cy="289" r="4" fill={i === 1 ? accent : muted} data-art-pulse={i === 1 ? 'true' : undefined} />
          <text x={x - 46} y="286" className="art-caption" fontSize="10" fontWeight="600">{title}</text>
          <text x={x - 46} y="300" fill={muted} fontSize="8">{text}</text>
        </g>
      </g>; })}
    </> : <>
      {/* The AI era: a customer call answered by an AI voice agent, handed to a person with full context, on one network. */}
      <g data-art-float="true">
        <rect x="222" y="28" width="196" height="38" rx="19" className="art-surface" />
        <circle cx="244" cy="47" r="9" fill={accent} fillOpacity=".15" /><path transform="translate(237 40) scale(.6)" d="M6.5 3.5h3.5l1.8 5-2.6 1.8a12 12 0 0 0 5.5 5.5l1.8-2.6 5 1.8v3.5q0 1.7-1.7 1.7A17 17 0 0 1 4.8 5.2q0-1.7 1.7-1.7Z" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="260" y="44" className="art-caption" fontSize="9.5" fontWeight="600">Customer call</text>
        <text x="260" y="56" fill={muted} fontSize="7.5">+1 (206) 555-0102 · order status</text>
      </g>

      {/* Routes: into the AI agent first, then the handoff to the human agent */}
      {[aiRoute, handoff].map((d, i) => <g key={d}>
        <path d={d} fill="none" stroke={muted} strokeWidth="1.5" strokeOpacity=".8" />
        <path d={d} fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity=".9" strokeLinecap="round" opacity="0" data-motion-reveal="true" data-motion-speed="110" data-motion-delay={i ? '2.2' : '0'} data-motion-period="5.6" />
        <circle r="3.5" fill={accent} data-motion-path={d} data-motion-speed="110" data-motion-delay={i ? '2.2' : '0'} data-motion-period="5.6" />
      </g>)}
      <circle cx="165" cy="100" r="4" fill={muted} /><circle cx="165" cy="100" r="4" fill={accent} opacity="0" data-motion-light="true" data-motion-route={aiRoute} data-motion-speed="110" data-motion-period="5.6" />
      <circle cx="350" cy="200" r="4" fill={muted} /><circle cx="350" cy="200" r="4" fill={accent} opacity="0" data-motion-light="true" data-motion-route={handoff} data-motion-speed="110" data-motion-delay="2.2" data-motion-period="5.6" />
      <rect x="296" y="178" width="48" height="16" rx="8" className="art-surface" /><text x="320" y="189" textAnchor="middle" fill={accent} fontSize="7" fontWeight="700">Handoff</text>

      {/* AI voice agent */}
      <g data-art-float="true">
        <rect x="40" y="100" width="250" height="200" rx="18" className="art-surface" />
        <rect x="56" y="116" width="34" height="34" rx="11" fill={accent} fillOpacity=".15" stroke={accent} strokeOpacity=".5" />
        <path d="M73 123l2.2 5.8 5.8 2.2-5.8 2.2-2.2 5.8-2.2-5.8-5.8-2.2 5.8-2.2Z" fill={accent} /><circle cx="82" cy="121" r="1.6" fill={accent} />
        <text x="100" y="130" className="art-caption" fontSize="10.5" fontWeight="600">AI Voice Agent</text>
        <text x="100" y="143" fill={muted} fontSize="8">Answers instantly · 24/7</text>
        <rect x="56" y="162" width="190" height="30" rx="10" fill="var(--art-soft)" stroke="var(--art-border)" /><text x="66" y="175" className="art-caption" fontSize="8">“Hi, I can check that order for you.”</text><text x="66" y="186" fill={muted} fontSize="7">Intent: order status · 98%</text>
        <rect x="56" y="200" width="150" height="30" rx="10" fill={accent} fillOpacity=".1" stroke={accent} strokeOpacity=".6" /><text x="66" y="213" className="art-caption" fontSize="8">“Let me bring in a specialist.”</text><text x="66" y="224" fill={accent} fontSize="7" fontWeight="700">Handing off with context</text>
        <g fill={accent}>{[5, 9, 7, 12, 6, 10, 5, 8].map((h, i) => <rect key={i} x={56 + i * 5.2} y={262 - h / 2} width="2.4" height={h} rx="1.2" data-art-bar="true" />)}</g>
        <text x="104" y="265" fill={muted} fontSize="7.5">Natural voice · real-time</text>
      </g>

      {/* Human agent */}
      <g data-art-float="true">
        <rect x="350" y="100" width="250" height="200" rx="18" className="art-surface" />
        <g transform="translate(383 133)"><circle r="17" fill={muted} fillOpacity=".22" /><circle cy="-4" r="6" fill={ink} /><path d="M-11 14q0-12 11-12t11 12Z" fill={ink} /></g>
        <text x="410" y="130" className="art-caption" fontSize="10.5" fontWeight="600">Priya Shah</text>
        <text x="410" y="143" fill={muted} fontSize="8">Support specialist · Ext. 310</text>
        <rect x="366" y="162" width="218" height="30" rx="10" fill="var(--art-soft)" stroke="var(--art-border)" /><circle cx="380" cy="177" r="4" fill={accent} data-art-pulse="true" /><text x="390" y="174" className="art-caption" fontSize="8" fontWeight="600">Handoff received</text><text x="390" y="185" fill={muted} fontSize="7">Transcript, intent and customer record attached</text>
        <rect x="366" y="200" width="218" height="30" rx="10" fill="var(--art-soft)" stroke="var(--art-border)" /><text x="376" y="213" className="art-caption" fontSize="8">“Thanks, I have everything here.”</text><text x="376" y="224" fill={muted} fontSize="7">No repeating · 00:42 in call</text>
        <g fill={ink}>{[4, 8, 6, 11, 5, 9, 4, 7].map((h, i) => <rect key={i} x={366 + i * 5.2} y={262 - h / 2} width="2.4" height={h} rx="1.2" data-art-bar="true" />)}</g>
        <text x="414" y="265" fill={muted} fontSize="7.5">Human conversation · same line</text>
      </g>

      {/* The network both run on */}
      <rect x="40" y="316" width="560" height="30" rx="15" fill={accent} fillOpacity=".08" stroke={accent} strokeOpacity=".6" />
      <circle cx="58" cy="331" r="3.5" fill={accent} data-art-pulse="true" />
      <text x="68" y="334.5" className="art-caption" fontSize="8.5" fontWeight="700" letterSpacing="1">COMVOIX VOICE NETWORK</text>
      <text x="584" y="334.5" textAnchor="end" fill={muted} fontSize="8">SIP connectivity · carrier grade · high availability</text>
    </>}
  </MotionSvg>;
}
