import { memo, useId, type ReactNode } from 'react';
import { MotionSvg } from './motion';

const lime = 'var(--art-primary, #f8fafc)';
const blue = 'var(--art-secondary, #94a3b8)';
function Caption({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return <text x={x} y={y} className="art-caption" fontSize="12" fontFamily="var(--font-ubuntu), sans-serif">{children}</text>;
}
function Card({ x, y, w = 160, h = 70, children }: { x: number; y: number; w?: number; h?: number; children?: ReactNode }) {
  return <g transform={`translate(${x} ${y})`}><rect className="art-surface" width={w} height={h} rx="16" /><g>{children}</g></g>;
}
function Route({ path, color = lime, duration = 4 }: { path: string; color?: string; duration?: number }) {
  const start = path.match(/^M([\d.]+)[ ,]([\d.]+)/);
  return <><path d={path} fill="none" stroke={color} strokeOpacity=".3" strokeWidth="1.5"/><circle cx={Number(start?.[1] ?? 0)} cy={Number(start?.[2] ?? 0)} r="4" fill={color} data-motion-path={path} data-duration={duration}/></>;
}
function Person({ x, y }: { x: number; y: number }) {
  return <g fill="none" stroke={blue} strokeWidth="2"><circle cx={x} cy={y - 8} r="10"/><path d={`M${x - 17} ${y + 18}q0-21 17-21t17 21`}/></g>;
}
/* How APIs transform business messaging: an app event calls the Messaging API, which delivers a message to the customer.
   One shared cycle: the request reaches the API (202 Accepted), then the message lands on the phone and is marked delivered. */
const API_SPEED = '80', API_PERIOD = '5';
const API_REQUEST = 'M190 160H245', API_SEND = 'M395 160H470', API_SEND_DELAY = 1.5;
const accent = 'var(--brand-accent)';
const mono = 'ui-monospace, Menlo, monospace';
function ApiRoute({ path, delay = 0 }: { path: string; delay?: number }) {
  return <>
    <path d={path} fill="none" stroke={blue} strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="4 6" data-art-trace="true"/>
    <path d={path} fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" opacity="0" data-motion-reveal="true" data-motion-speed={API_SPEED} data-motion-period={API_PERIOD} data-motion-delay={delay}/>
    <circle r="8" fill={accent} fillOpacity=".2" opacity="0" data-motion-path={path} data-motion-speed={API_SPEED} data-motion-period={API_PERIOD} data-motion-delay={delay}/>
    <circle r="3.5" fill={accent} opacity="0" data-motion-path={path} data-motion-speed={API_SPEED} data-motion-period={API_PERIOD} data-motion-delay={delay}/>
  </>;
}
function ApiInsight() {
  return <>
    {/* 1. Your app: a stream of events, one of which triggers a message. */}
    <rect x="40" y="70" width="150" height="180" rx="16" className="art-surface"/>
    <text x="58" y="96" className="art-caption" fontSize="10" letterSpacing="1.4">YOUR APP</text>
    <path d="m172 86-6 9h5l-3 8 7-10h-5l3-7Z" fill={accent} data-art-pulse="true"/>
    <path d="M58 106h114" stroke="var(--art-border)"/>
    {['user.signup', 'order.shipped', 'invoice.paid'].map((event, i) => <g key={event}>
      <rect x="54" y={116 + i * 30} width="122" height="22" rx="7" fill="var(--art-soft)" stroke={i === 1 ? accent : 'var(--art-border)'}/>
      <text x="64" y={131 + i * 30} fill={i === 1 ? accent : blue} fontSize="9" fontFamily={mono}>{event}</text>
      {i === 1 ? <circle cx="165" cy={127 + i * 30} r="3" fill={accent} data-art-pulse="true"/> : null}
    </g>)}
    <text x="115" y="232" textAnchor="middle" fill={blue} fontSize="9">Event fired</text>
    <ApiRoute path={API_REQUEST}/>

    {/* 2. Messaging API: the request, a blinking cursor, and a status that turns to Accepted. */}
    <rect x="245" y="70" width="150" height="180" rx="16" className="art-surface"/>
    <text x="263" y="96" className="art-caption" fontSize="10" letterSpacing="1.4">MESSAGING API</text>
    <path d="M263 106h114" stroke="var(--art-border)"/>
    <text x="263" y="128" fill={accent} fontSize="9.5" fontFamily={mono} fontWeight="700">POST /messages</text>
    <text x="263" y="148" fill={blue} fontSize="9" fontFamily={mono}>{'{ to: customer,'}</text>
    <text x="263" y="165" fill={blue} fontSize="9" fontFamily={mono}>{'  text: update }'}</text>
    <rect x="352" y="157" width="5" height="10" rx="1" fill={accent} data-art-blink="true"/>
    <rect x="263" y="194" width="114" height="26" rx="13" fill="var(--art-soft)" stroke="var(--art-border)"/>
    <text x="320" y="211" textAnchor="middle" fill={blue} fontSize="9">Ready</text>
    <g opacity="0" data-motion-light="true" data-motion-route={API_REQUEST} data-motion-speed={API_SPEED} data-motion-period={API_PERIOD}>
      <rect x="263" y="194" width="114" height="26" rx="13" fill="var(--art-surface)"/>
      <rect x="263" y="194" width="114" height="26" rx="13" fill={accent} fillOpacity=".14" stroke={accent}/>
      <text x="320" y="211" textAnchor="middle" fill={accent} fontSize="9" fontWeight="700" fontFamily={mono}>202 Accepted</text>
    </g>
    <ApiRoute path={API_SEND} delay={API_SEND_DELAY}/>

    {/* 3. The customer's phone: the new message lands, then is marked delivered. */}
    <rect x="470" y="56" width="110" height="208" rx="22" className="art-surface"/>
    <rect x="512" y="64" width="26" height="4" rx="2" fill="var(--art-border)"/>
    <text x="525" y="86" textAnchor="middle" className="art-caption" fontSize="9" fontWeight="600">Messages</text>
    <path d="M482 94h86" stroke="var(--art-border)"/>
    <rect x="480" y="102" width="80" height="22" rx="9" fill={blue} fillOpacity=".15"/>
    <text x="488" y="116" fill={blue} fontSize="8">Order confirmed</text>
    <g opacity="0" data-motion-light="true" data-motion-route={API_SEND} data-motion-speed={API_SPEED} data-motion-period={API_PERIOD} data-motion-delay={API_SEND_DELAY}>
      <rect x="484" y="134" width="88" height="38" rx="11" fill={accent} fillOpacity=".16" stroke={accent} strokeOpacity=".8"/>
      <text x="493" y="150" className="art-caption" fontSize="8.5">Your order has</text>
      <text x="493" y="163" className="art-caption" fontSize="8.5">shipped today.</text>
    </g>
    <g opacity="0" data-motion-light="true" data-motion-route={API_SEND} data-motion-speed={API_SPEED} data-motion-period={API_PERIOD} data-motion-delay={API_SEND_DELAY + .8}>
      <text x="572" y="186" textAnchor="end" fill={accent} fontSize="8" fontWeight="700">Delivered ✓✓</text>
    </g>
    <rect x="480" y="230" width="90" height="20" rx="10" fill="none" stroke="var(--art-border)"/>
    <circle cx="560" cy="240" r="5" fill={accent} fillOpacity=".2"/><path d="m558 237 4 3-4 3" fill="none" stroke={accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>

    <text x="320" y="292" textAnchor="middle" className="art-caption" fontSize="11" letterSpacing="2" fontFamily="var(--font-ubuntu), sans-serif">MESSAGING DRIVEN BY YOUR APP</text>
  </>;
}
function Scene({ kind }: { kind: string }) {
  switch (kind) {
    case 'voice-api': return <>
      <Card x={55} y={62} w={270} h={192}><Caption x={23} y={32}>VOICE / API REQUEST</Caption><Caption x={23} y={78}>POST /calls</Caption><Caption x={23} y={108}>{'{ to: customer,'}</Caption><Caption x={38} y={137}>{'from: business }'}</Caption><path d="M23 164h142" stroke={lime} strokeWidth="3"/></Card><Route path="M325 155H420"/><circle cx="485" cy="155" r="64" className="art-surface"/><g data-art-pulse="true" fill="none" stroke={lime} strokeWidth="4"><path d="M460 139q0 42 42 42l9-13-17-9-7 9q-18-7-20-20l9-7-9-15Z"/></g><Caption x={428} y={252}>CALL INITIATED</Caption>
    </>;
    case 'numbers': return <>
      <Card x={165} y={32} w={310} h={256}><Caption x={24} y={33}>NUMBER DIRECTORY</Caption>{['+1 212 ••• 0142','+44 20 ••• 0186','+61 2 ••• 0128'].map((n,i)=><g key={n}><rect x="20" y={60+i*57} width="270" height="43" rx="10" fill={blue} fillOpacity=".1"/><Caption x={35} y={87+i*57}>{n}</Caption><circle cx="268" cy={82+i*57} r="5" fill={lime} data-art-pulse="true"/></g>)}</Card><Route path="M65 160H165"/><Route path="M475 160H575" color={blue}/>
    </>;
    case 'pbx-console': return <>
      <Card x={65} y={40} w={510} h={240}><Caption x={24} y={33}>PHONE SYSTEM / CONTROL ROOM</Caption><path d="M185 55v162" stroke={blue} strokeOpacity=".3"/>{['Extensions','Call groups','Schedules'].map((t,i)=><Caption key={t} x={24} y={85+i*51}>{t}</Caption>)}{[0,1,2].map(i=><g key={i}><rect x="210" y={65+i*51} width="270" height="34" rx="9" fill={lime} fillOpacity=".1"/><Caption x={224} y={87+i*51}>{['Team calling','Ring together','Business hours'][i]}</Caption><circle cx="460" cy={82+i*51} r="6" fill={lime} data-art-pulse="true"/></g>)}</Card>
    </>;
    case 'future-voice': return <>
      <g fill="none" stroke={blue} strokeWidth="1.5">
        <ellipse cx="320" cy="179" rx="218" ry="66" strokeDasharray="3 9" opacity=".35"/>
        <path d="M123 147q-23 32 0 64M517 147q23 32 0 64" opacity=".55" data-art-pulse="true"/>
      </g>
      <circle cx="102" cy="179" r="4" fill="var(--brand-accent)" data-motion-path="M102 179a218 66 0 1 0 436 0a218 66 0 1 0-436 0" data-duration="7"/>
      <g data-art-float="true">
        {/* Layered headband, cushioned earcups and a curved microphone boom. */}
        <path d="M224 185v-49a96 96 0 0 1 192 0v49" fill="none" stroke="var(--art-border)" strokeWidth="25" strokeLinecap="round"/>
        <path d="M224 176v-49a96 96 0 0 1 192 0v49" fill="none" stroke={lime} strokeWidth="18" strokeLinecap="round"/>
        <path d="M240 121a80 80 0 0 1 160 0" fill="none" stroke={blue} strokeWidth="7" strokeLinecap="round"/>
        <path d="M247 72a90 90 0 0 1 115-19" fill="none" stroke="var(--art-surface)" strokeWidth="2" opacity=".65"/>
        <g transform="rotate(-10 227 190)">
          <rect x="203" y="146" width="39" height="89" rx="18" fill={blue}/>
          <rect x="215" y="145" width="40" height="91" rx="18" className="art-surface"/>
          <path d="M226 162v57" stroke={lime} strokeWidth="3" strokeLinecap="round" opacity=".5"/>
          <path d="M209 170v32" stroke="var(--brand-accent)" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <g transform="rotate(10 413 190)">
          <rect x="399" y="146" width="39" height="89" rx="18" fill={blue}/>
          <rect x="385" y="145" width="40" height="91" rx="18" className="art-surface"/>
          <path d="M414 162v57" stroke={lime} strokeWidth="3" strokeLinecap="round" opacity=".5"/>
          <circle cx="432" cy="188" r="3" fill="var(--brand-accent)" data-art-pulse="true"/>
        </g>
        <path d="M420 222q0 43-83 43" fill="none" stroke={blue} strokeWidth="6" strokeLinecap="round"/>
        <rect x="304" y="257" width="43" height="16" rx="8" fill={lime}/>
        <path d="M313 265h12" stroke="var(--brand-accent)" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="320" cy="177" r="28" fill="var(--art-soft)" stroke="var(--art-border)"/>
        <path d="m307 177 9 9 17-19" fill="none" stroke="var(--brand-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" data-art-pulse="true"/>

      </g>
      <text x="320" y="308" textAnchor="middle" className="art-caption" fontSize="10" letterSpacing="2">BUILT AROUND YOUR CONVERSATION</text>
    </>;
    case 'global-insight': return <>
      <g fill="none" stroke={blue} strokeOpacity=".35"><path d="m73 130 50-55 65 15 38 50-22 52-45 10-17 59-35-23-10-58Zm210-45 72-35 44 32 72-12 80 49-18 47-76 4-34 78-54 15-29-67-50-19Z"/></g><Route path="M145 124Q290 0 448 137" duration={5}/><Route path="M448 137Q350 280 188 215" color={blue} duration={6}/>{[[145,124],[448,137],[188,215],[370,220]].map(([x,y])=><g key={x}><circle cx={x} cy={y} r="15" fill={lime} fillOpacity=".15"/><circle cx={x} cy={y} r="5" fill={lime} data-art-pulse="true"/></g>)}<Caption x={215} y={295}>A WORLD OF CONVERSATIONS</Caption>
    </>;
    case 'wholesale': return <>
      <Card x={52} y={100} w={130} h={120}><Caption x={20} y={30}>CARRIER A</Caption><path d="M20 55h90m-90 20h90m-90 20h90" stroke={blue} strokeWidth="4"/></Card><Card x={458} y={100} w={130} h={120}><Caption x={20} y={30}>CARRIER B</Caption><path d="M20 55h90m-90 20h90m-90 20h90" stroke={blue} strokeWidth="4"/></Card>{[115,160,205].map((y,i)=><Route key={y} path={`M182 ${y}Q320 ${y-65+i*65} 458 ${y}`} duration={3+i}/>)}<Caption x={220} y={277}>WHOLESALE INTERCONNECT</Caption>
    </>;
    case 'industries': return <>
      {[95,255,415].map((x,i)=><g key={x}><path d={`M${x} 260V${110-i*25}h110V260Z`} className="art-surface"/>{[0,1,2].map(r=><g key={r}>{[0,1,2].map(c=><rect key={c} x={x+17+c*28} y={133-i*25+r*35} width="15" height="17" rx="2" fill={i===1?lime:blue} fillOpacity=".3"/>)}</g>)}<Caption x={x+10} y={290}>{['BUSINESS','TEAMS','CUSTOMERS'][i]}</Caption></g>)}<Route path="M150 95Q310-25 470 45" duration={6}/><circle cx="310" cy="45" r="9" fill={lime} data-art-pulse="true"/>
    </>;
    case 'api-insight': return <ApiInsight/>;
    case 'planning': return <>
      <Card x={130} y={30} w={380} h={260}><Caption x={26} y={35}>COMMUNICATION BLUEPRINT</Caption>{['Map your channels','Connect your systems','Plan your capacity','Build for growth'].map((t,i)=><g key={t}><rect x="26" y={61+i*44} width="22" height="22" rx="5" fill={lime} fillOpacity=".16"/><path d={`m162 ${103+i*44} 5 5 9-11`} transform="translate(-130 -30)" fill="none" stroke={lime} strokeWidth="2" data-art-pulse="true"/><Caption x={64} y={77+i*44}>{t}</Caption></g>)}</Card>
    </>;


    case 'contact': return <>
      {/* Incoming conversations move from an ordered queue to an available agent. */}
      <path d="M75 60h234v219H75Z" fill="var(--art-soft)" stroke="var(--art-border)" transform="rotate(-5 192 170)"/>
      <Card x={61} y={43} w={250} h={228}>
        <Caption x={20} y={30}>INCOMING CONVERSATIONS</Caption>
        <path d="M20 44h210" stroke="var(--art-border)"/>
        {['Priority caller','Customer enquiry','New conversation'].map((title,i)=><g key={title}>
          <rect x="15" y={59+i*52} width="220" height="43" rx="10" fill="var(--art-soft)" stroke={i===0?'var(--brand-accent)':'var(--art-border)'}/>
          <circle cx="37" cy={80+i*52} r="12" fill="var(--art-surface)"/>
          <path d={`M${32} ${74+i*52}q-3 8 8 13l3-4-4-3-2 2-4-5 2-2Z`} fill="none" stroke={i===0?'var(--brand-accent)':blue} strokeWidth="1.5"/>
          <text x="59" y={78+i*52} className="art-caption" fontSize="10">{title}</text>
          <text x="59" y={91+i*52} fill={blue} fontSize="8">{i===0?'Connecting to the right team':'In your call queue'}</text>
          <text x="220" y={85+i*52} textAnchor="end" fill={i===0?'var(--brand-accent)':blue} fontSize="10">0{i+1}</text>
        </g>)}
      </Card>
      <Route path="M311 123H342Q357 123 357 143V162Q357 180 376 180H401" duration={2.8}/>
      <g data-art-float="true" data-art-card="">
      <g>
        <rect x="401" y="76" width="179" height="191" rx="22" className="art-surface"/>
        <text x="490" y="102" textAnchor="middle" className="art-caption" fontSize="10" letterSpacing="1.4">YOUR SUPPORT TEAM</text>
        <circle cx="490" cy="151" r="29" fill="var(--art-soft)" stroke="var(--art-border)"/>
        <Person x={490} y={148}/>
        <path d="M468 147v-3a22 22 0 0 1 44 0v14q0 9-12 9" fill="none" stroke={lime} strokeWidth="2"/>
        <rect x="464" y="145" width="6" height="12" rx="3" fill={lime}/>
        <rect x="510" y="145" width="6" height="12" rx="3" fill={lime}/>
        <circle cx="501" cy="167" r="2.5" fill="var(--brand-accent)"/>
        <text x="490" y="201" textAnchor="middle" className="art-caption" fontSize="12">Right agent. First time.</text>
        <rect x="432" y="216" width="116" height="29" rx="14" fill="var(--art-soft)" stroke="var(--art-border)"/>
        <circle cx="449" cy="231" r="3" fill="var(--brand-accent)" data-art-pulse="true"/>
        <text x="460" y="235" className="art-caption" fontSize="10">Call assigned</text>
      </g>
      <g>
        <rect x="318" y="38" width="101" height="32" rx="16" className="art-surface"/>
        <path d="m331 54 4 4 7-8" fill="none" stroke="var(--brand-accent)" strokeWidth="2" strokeLinecap="round"/>
        <text x="349" y="58" className="art-caption" fontSize="9">Smart routing</text>
      </g>
      </g>
      <text x="320" y="307" textAnchor="middle" className="art-caption" fontSize="10" letterSpacing="1.7">EVERY CALL FINDS THE RIGHT PERSON</text>
    </>;
    case 'voice': return <>
      <Route path="M267 112C320 42 379 42 438 106" duration={3}/>
      <Route path="M438 222C365 290 316 278 267 222" duration={4}/>
      <g data-art-float="true">
        <path d="M80 92h181l27 162H62Z" className="art-surface"/>
        <path d="M62 254h226v14H62Z" fill={blue} opacity=".3"/>
        <rect x="130" y="110" width="120" height="57" rx="7" fill="var(--art-soft)" stroke={blue}/>
        <text x="144" y="130" className="art-caption" fontSize="9">BUSINESS LINE</text>
        <circle cx="147" cy="149" r="3" fill="var(--brand-accent)" data-art-pulse="true"/>
        <text x="158" y="152" className="art-caption" fontSize="10">Call in progress</text>

        {[0,1,2,3].map(row=><g key={row}>{[0,1,2].map(col=><rect key={col} x={146+col*32} y={180+row*17} width="23" height="10" rx="3" fill={blue} opacity=".45"/>)}</g>)}
        <path d="M91 108q-13 2-13 16v99q0 14 13 16h14q11 0 11-12v-22q0-9-10-9v-48q10 0 10-9v-20q0-11-11-11Z" fill={lime}/>
        <path d="M101 239v9q0 29 27 29h22" fill="none" stroke={blue} strokeWidth="3" strokeDasharray="2 4"/>
      </g>
      <g data-art-float="true">
        <rect x="416" y="43" width="138" height="235" rx="23" className="art-surface"/>
        <rect x="425" y="53" width="120" height="214" rx="17" fill="var(--art-soft)"/>
        <path d="M467 61h35" stroke={blue} strokeWidth="4" strokeLinecap="round"/>
        <circle cx="485" cy="120" r="27" fill="var(--art-surface)" stroke={blue}/>
        <Person x={485} y={116}/>
        <text x="485" y="167" textAnchor="middle" className="art-caption" fontSize="12">Your Team</text>
        <circle cx="461" cy="185" r="3" fill="var(--brand-accent)" data-art-pulse="true"/>
        <text x="471" y="188" className="art-caption" fontSize="9">Connected</text>
        <circle cx="485" cy="227" r="17" fill="var(--art-surface)" stroke="var(--brand-accent)"/>
        <path d="M475 229q10-10 20 0m-20 0v4m20-4v4" fill="none" stroke="var(--brand-accent)" strokeWidth="3" strokeLinecap="round"/>
        <path d="M467 258h36" stroke={blue} strokeWidth="3" strokeLinecap="round"/>
      </g>
      <g data-art-pulse="true" fill="none" stroke="var(--brand-accent)" strokeWidth="2" strokeLinecap="round">
        <path d="M320 132q14 18 0 36m12-45q22 27 0 54m12-63q30 36 0 72"/>
      </g>
      <text x="320" y="312" textAnchor="middle" className="art-caption" fontSize="11" letterSpacing="2">ONE CALL. EVERY WORKPLACE.</text>
    </>;
    case 'network': return <>
      {[90, 145, 200].map((y, i) => <Card x={62} y={y} w={140} h={43} key={y}><circle cx="20" cy="22" r="4" fill={i === 1 ? blue : lime} data-art-pulse="true"/><Caption x={36} y={26}>SIP / 0{i + 1}</Caption><path d="M112 16h12m-12 6h12m-12 6h12" stroke={lime}/></Card>)}
      {[111,166,221].map((y,i) => <Route key={y} path={`M202 ${y}H270Q300 ${y} 320 160H426`} duration={3+i}/>)}
      <g fill="none" stroke={blue} strokeOpacity=".6"><circle cx="482" cy="160" r="74"/><ellipse cx="482" cy="160" rx="30" ry="74"/><ellipse cx="482" cy="160" rx="74" ry="28"/><path d="M408 160h148M482 86v148"/></g><circle cx="482" cy="86" r="5" fill={lime} data-art-pulse="true"/><Caption x={72} y={275}>YOUR INFRASTRUCTURE</Caption><Caption x={424} y={275}>GLOBAL VOICE</Caption>
    </>;
    case 'cloud': return <>
      <g data-art-float="true"><path d="M248 139h145a33 33 0 0 0 0-66 51 51 0 0 0-96-10 38 38 0 0 0-49 76Z" className="art-surface"/><Caption x={274} y={111}>CLOUD PBX</Caption></g>
      {[120,320,520].map((x,i) => <g key={x}><Route path={`M320 140V175H${x}V216`} duration={3+i}/><Card x={x-66} y={216} w={132} h={64}><Caption x={18} y={28}>EXT. 10{i+1}</Caption><path d="M20 43h55" stroke={lime} strokeWidth="3"/><circle cx="107" cy="42" r="4" fill={blue} data-art-pulse="true"/></Card></g>)}
    </>;
    case 'message': return <>
      <Card x={220} y={24} w={200} h={273}><rect x="70" y="12" width="60" height="5" rx="3" fill={lime} opacity=".4"/><Caption x={27} y={52}>MESSAGING API</Caption><g data-art-float="true"><rect x="20" y="78" width="145" height="49" rx="12" fill={lime} fillOpacity=".15"/><Caption x={33} y={107}>Order confirmed</Caption><rect x="48" y="144" width="134" height="49" rx="12" fill={blue} fillOpacity=".15"/><Caption x={61} y={174}>Thank you! ✓</Caption></g><Caption x={28} y={241}>✓✓ delivered</Caption></Card>
      <Route path="M73 119H220"/><Route path="M420 216H565" color={blue}/><Caption x={57} y={97}>{'{ app }'}</Caption><Caption x={467} y={247}>CUSTOMER</Caption>
    </>;
    case 'email': return <>
      <g data-art-float="true"><Card x={88} y={64} w={270} h={188}><Caption x={20} y={32}>TRANSACTIONAL EMAIL</Caption><path d="M25 61h220v100H25zm0 0 110 70 110-70" fill="none" stroke={lime} strokeWidth="2"/></Card></g>
      {[85,155,225].map((y,i) => <g key={y}><Route path={`M358 160Q400 160 425 ${y+18}H460`} duration={3+i}/><Card x={460} y={y} w={130} h={40}><Caption x={16} y={25}>{['SENT ↗','OPENED ✓','REPLIED ↵'][i]}</Caption></Card></g>)}
    </>;
    case 'verify': return <>
      <circle cx="228" cy="150" r="107" fill="none" stroke={lime} strokeOpacity=".15" strokeDasharray="4 8"/>
      <path d="m228 66 65 24v62c0 53-65 82-65 82s-65-29-65-82V90Z" className="art-surface"/><path d="m197 149 22 23 43-48" fill="none" stroke={lime} strokeWidth="7" strokeLinecap="round" data-art-pulse="true"/>
      <Card x={354} y={105} w={222} h={110}><Caption x={20} y={30}>VERIFY YOUR ACCOUNT</Caption>{[0,1,2,3].map(i=><g key={i}><rect x={20+i*46} y="48" width="36" height="40" rx="8" fill={lime} fillOpacity=".1"/><circle cx={38+i*46} cy="68" r="4" fill={lime} data-art-pulse="true"/></g>)}</Card><Caption x={177} y={282}>SECURE BY DESIGN</Caption>
    </>;
    case 'crm': return <>
      <Card x={78} y={50} w={310} h={222}><Caption x={22} y={32}>CUSTOMER WORKSPACE</Caption><Person x={42} y={77}/><path d="M78 68h150m-150 17h98" stroke={blue} strokeWidth="4"/>{[124,157,190].map((y,i)=><g key={y}><circle cx="28" cy={y} r="4" fill={lime}/><path d={`M45 ${y}h${220-i*35}`} stroke={lime} strokeOpacity=".3" strokeWidth="6"/></g>)}</Card>
      {[76,154,232].map((y,i)=><g key={y}><Route path={`M388 160Q420 160 448 ${y+21}`} duration={3+i}/><Card x={448} y={y} w={126} h={44}><Caption x={17} y={27}>{['CALL LOG','MESSAGES','CONTACTS'][i]}</Caption></Card></g>)}
    </>;
    case 'helpdesk': return <>
      {['NEW','ASSIGNED','RESOLVED'].map((name,i)=><g key={name}><Card x={43+i*193} y={56} w={170} h={213}><Caption x={18} y={30}>{name}</Caption>{[64,122].map((y,j)=><g key={y} data-art-float="true"><rect x="15" y={y} width="140" height="49" rx="9" fill={i===2?lime:blue} fillOpacity=".1"/><Caption x={27} y={y+29}>{i===2?'✓ ': '# '}{104+i*2+j}</Caption></g>)}</Card>{i<2&&<Route path={`M${213+i*193} 162h23`} duration={2+i}/>}</g>)}
    </>;
    case 'teams': return <>
      <path d="M160 92 475 90 450 235 185 242Z" fill="none" stroke={blue} strokeOpacity=".3"/>
      {[[110,48],[425,48],[135,200],[400,200]].map(([x,y],i)=><g key={x} data-art-float="true"><Card x={x} y={y} w={110} h={72}><Person x={30} y={32}/><Caption x={54} y={40}>0{i+1}</Caption></Card></g>)}
      <Card x={243} y={126} w={154} h={69}><Caption x={21} y={30}>SHARED SPACE</Caption><circle cx="30" cy="48" r="4" fill={lime} data-art-pulse="true"/><path d="M44 48h83" stroke={lime} strokeOpacity=".4"/></Card><Route path="M220 84Q320 84 320 126"/>
    </>;
    case 'signal': return <>
      <Card x={65} y={55} w={510} h={210}><Caption x={24} y={32}>VOICE INFRASTRUCTURE / SIGNAL MONITOR</Caption>{[80,120,160].map(y=><path key={y} d={`M24 ${y}h462`} stroke={blue} strokeOpacity=".12"/>)}<Route path="M90 190H155L175 160 195 204 223 116 245 223 270 169 295 190H345L370 153 390 201 411 174 440 190H550" duration={6}/><Caption x={24} y={191}>CONTINUOUS CONNECTIVITY</Caption></Card>
    </>;
    case 'journey': return <>
      <Route path="M100 200Q190 200 220 140T340 130 465 100H550" duration={6}/>{[[100,200],[265,123],[480,100]].map(([x,y],i)=><g key={x}><circle cx={x} cy={y} r="32" className="art-surface"/><text x={x} y={y+6} textAnchor="middle" fill={lime} fontSize="20">{['↗','↔','✓'][i]}</text><Caption x={x-35} y={y+63}>{['CONNECT','ENGAGE','RESOLVE'][i]}</Caption></g>)}
    </>;
    default: return <>
      <g fill="none" stroke={blue} strokeOpacity=".35"><ellipse cx="320" cy="160" rx="210" ry="95"/><ellipse cx="320" cy="160" rx="210" ry="95" transform="rotate(30 320 160)"/><ellipse cx="320" cy="160" rx="210" ry="95" transform="rotate(-30 320 160)"/></g><circle cx="320" cy="160" r="52" className="art-surface"/><text x="320" y="166" textAnchor="middle" fill={lime} fontFamily="var(--font-ubuntu), sans-serif" fontSize="16">COMVOIX</text><Route path="M110 160C110 33 530 33 530 160S110 287 110 160" duration={9}/><Route path="M138 55Q320 230 502 265Q320 90 138 55" color={blue} duration={7}/>
    </>;
  }
}

export const CommunicationArt = memo(function CommunicationArt({ kind = 'network', label }: { kind?: string; label: string }) {
  const id = useId();
  return <MotionSvg key={kind} data-motion-duration={kind === "crm" ? .65 : kind === "helpdesk" ? .35 : kind === "teams" ? .75 : undefined} className={`communication-art art-${kind}`} viewBox="0 0 640 320" role="img" aria-labelledby={`${id}-title`}>
    <title id={`${id}-title`}>{label}</title>
    <defs><radialGradient id={`${id}-glow`}><stop stopColor={lime} stopOpacity=".09"/><stop offset="1" stopColor={lime} stopOpacity="0"/></radialGradient><pattern id={`${id}-grid`} width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill={blue} opacity=".12"/></pattern></defs>
    <rect width="640" height="320" fill={`url(#${id}-grid)`}/><ellipse cx="320" cy="160" rx="300" ry="160" fill={`url(#${id}-glow)`}/><Scene kind={kind}/>
  </MotionSvg>;
});
