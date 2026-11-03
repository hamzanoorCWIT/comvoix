import { memo, useId } from 'react';
import { MotionSvg } from './motion';

/** Original vector artwork, using the existing site's colors and motion. */
export const CommunicationArt = memo(function CommunicationArt({ kind = 'network', label }: { kind?: string; label: string }) {
  const id = useId().replace(/:/g, '');
  const isMessage = ['message', 'email', 'crm'].includes(kind);
  return <MotionSvg className="communication-art" viewBox="0 0 640 320" role="img" aria-labelledby={`${id}-title`}>
    <title id={`${id}-title`}>{label}</title>
    <defs>
      <radialGradient id={`${id}-glow`}><stop stopColor="#c1ff4d" stopOpacity=".15"/><stop offset="1" stopColor="#c1ff4d" stopOpacity="0"/></radialGradient>
      <linearGradient id={`${id}-surface`} x2="1" y2="1"><stop stopColor="#222b1b"/><stop offset="1" stopColor="#0c100c"/></linearGradient>
      <pattern id={`${id}-dots`} width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#c1ff4d" opacity=".1"/></pattern>
    </defs>
    <rect width="640" height="320" fill={`url(#${id}-dots)`}/>
    <ellipse cx="320" cy="165" rx="230" ry="155" fill={`url(#${id}-glow)`}/>
    <g fill="none" stroke="#c1ff4d" strokeOpacity=".14"><ellipse cx="320" cy="160" rx="145" ry="120"/><ellipse cx="320" cy="160" rx="195" ry="145" strokeDasharray="2 8"/></g>
    <g fill="none" stroke="#899c70" strokeWidth="1.5"><path d="M130 88 C220 88 205 160 270 160 M130 234 C220 234 205 160 270 160 M370 160 C425 160 420 88 510 88 M370 160 C425 160 420 234 510 234"/></g>
    <circle r="4" fill="#c1ff4d" cx="130" cy="88" data-duration="4" data-motion-path="M130 88 C220 88 205 160 270 160 L370 160 C425 160 420 234 510 234" />
    <circle r="3" fill="#85cfe9" cx="130" cy="234" data-duration="5" data-motion-path="M130 234 C220 234 205 160 270 160 L370 160 C425 160 420 88 510 88" />
    <rect x="265" y="106" width="110" height="110" rx="29" fill={`url(#${id}-surface)`} stroke="#c1ff4d" strokeOpacity=".55"/>
    <g fill="none" stroke="#c1ff4d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      {isMessage ? <><rect x="289" y="139" width="62" height="42" rx="8"/>{kind === 'email' ? <path d="m291 143 29 22 29-22"/> : <><path d="m300 181-7 12v-15 M302 151h36 M302 163h23"/></>}</> : kind === 'verify' ? <><path d="m320 131 26 10v20c0 18-26 32-26 32s-26-14-26-32v-20z"/><path d="m307 161 9 9 17-20"/></> : kind === 'cloud' ? <><path d="M298 178h44a15 15 0 0 0 2-30 25 25 0 0 0-47-1 16 16 0 0 0 1 31Z"/><path d="M320 181v14m-17 0h34"/></> : kind === 'contact' ? <><path d="M292 164v-9a28 28 0 0 1 56 0v9 M293 160h9v22h-9z M339 160h9v22h-9z M348 179c0 12-9 14-23 14"/><path d="M319 193h8"/></> : kind === 'voice' ? <path d="M301 134c-9 4-9 14-1 28 8 15 20 26 33 27 8 1 14-6 13-11l-14-9-8 8c-10-5-16-13-21-23l8-7-7-13Z"/> : <><circle cx="320" cy="161" r="30"/><ellipse cx="320" cy="161" rx="13" ry="30"/><path d="M290 161h60 M295 146h50 M295 176h50"/></>}
    </g>
    {[[80,58,'VOICE'],[80,204,'MESSAGE'],[510,58,'TEAMS'],[510,204,'CLOUD']].map(([x,y,text]) => <g key={text} transform={`translate(${x},${y})`}><rect width="55" height="55" rx="15" fill="#131812" stroke="#ffffff20"/><path d="M16 28h5m5-10v20m6-26v32m6-22v12" stroke="#c1ff4d" strokeWidth="2" strokeLinecap="round"/><text x="27" y="74" textAnchor="middle" fill="#8a9681" fontSize="10" fontFamily="monospace">{text}</text></g>)}
    <text x="320" y="258" textAnchor="middle" fill="#dce6cf" fontSize="13" fontFamily="monospace">COMVOIX</text>
    <text x="320" y="279" textAnchor="middle" fill="#78866a" fontSize="10" fontFamily="monospace">connected communication</text>
  </MotionSvg>;
});
