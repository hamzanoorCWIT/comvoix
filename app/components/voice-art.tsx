"use client";
import { useId } from "react";
import { MotionSvg } from "./motion";
const green = "var(--art-primary, #f8fafc)";
const blue = "var(--art-secondary, #94a3b8)";
export function VoiceArt({ scene }: { scene: "exchange" | "reach" | "fabric" }) {
  const id = useId();
  const paths = scene === "exchange" ? ["M70 100H190Q220 100 220 140H420Q450 140 450 100H570", "M570 240H450Q420 240 420 200H220Q190 200 190 240H70"] : scene === "reach" ? ["M95 270Q240 20 540 100", "M95 270Q285 95 540 185", "M95 270Q340 180 540 270"] : ["M95 175L215 75 425 75 545 175 425 275 215 275Z", "M95 175H545"];
  return <MotionSvg className="communication-art voice-service-art" viewBox="0 0 640 360" role="img" aria-labelledby={id}>
    <title id={id}>{scene === 'exchange' ? 'Inbound and outbound conversations travel through one voice exchange' : scene === 'reach' ? 'Business conversations reach domestic, mobile and international destinations' : 'Origination, SIP connectivity and termination form one monitored voice environment'}</title>
    <g fill="none" stroke={blue} strokeOpacity=".12">{[60,120,180,240,300].map(y=><path key={y} d={`M30 ${y}H610`}/>)}{[80,160,240,320,400,480,560].map(x=><path key={x} d={`M${x} 25V335`}/>)}</g>
    {paths.map((path,i)=><g key={path}><path d={path} fill="none" stroke={i%2?blue:green} strokeWidth="2" strokeOpacity=".4"/><circle cx={scene==='exchange'?(i?570:70):95} cy={scene==='exchange'?(i?240:100):scene==='reach'?270:175} r="4" fill={i%2?blue:green} data-motion-path={path} data-duration={5+i}/></g>)}
    {scene === 'exchange' ? <>
      <rect x="240" y="95" width="160" height="150" rx="28" className="art-surface"/><text x="320" y="127" textAnchor="middle" className="art-caption" fontSize="12">VOICE EXCHANGE</text>
      {[0,1,2,3,4,5,6,7,8].map(i=><rect key={i} x={274+i*11} y={151+(i%3)*5} width="5" height={42-(i%3)*10} rx="2" fill={i%2?blue:green} data-art-pulse="true"/>)}<text x="320" y="222" textAnchor="middle" className="art-caption" fontSize="11">ONE SIP ENVIRONMENT</text>
      {[[50,55,'INCOMING','CUSTOMERS'],[450,255,'OUTGOING','DESTINATIONS']].map(([x,y,t,s])=><g key={t} transform={`translate(${x} ${y})`}><g data-art-float="true"><rect width="140" height="65" rx="14" className="art-surface"/><text x="17" y="25" fontSize="12" fill={green}>{t}</text><text x="17" y="46" fontSize="10" className="art-caption">{s}</text></g></g>)}<text x="455" y="87" className="art-caption" fontSize="11">TO YOUR BUSINESS →</text><text x="45" y="270" className="art-caption" fontSize="11">← FROM YOUR BUSINESS</text>
    </> : scene === 'reach' ? <>
      <g fill="none" stroke={blue} strokeOpacity=".2"><path d="M55 300Q320-110 590 300M135 300Q320 0 510 300M215 300Q320 110 430 300"/></g><rect x="42" y="235" width="144" height="77" rx="17" className="art-surface"/><text x="65" y="266" className="art-caption" fontSize="12">YOUR BUSINESS</text><text x="65" y="291" fill={green} fontSize="11">Outbound calling ↗</text>
      {['DOMESTIC','MOBILE','INTERNATIONAL'].map((label,i)=><g key={label}><rect x="448" y={67+i*85} width="161" height="64" rx="14" className="art-surface"/><circle cx="468" cy={91+i*85} r="4" fill={green} data-art-pulse="true"/><text x="481" y={95+i*85} fontSize="11" className="art-caption">{label}</text><path d={`M467 ${111+i*85}h120`} stroke={blue} strokeOpacity=".4"/></g>)}
    </> : <>
      {[[95,175,'ORIGINATION'],[320,75,'MONITORING'],[545,175,'TERMINATION'],[320,275,'CAPACITY']].map(([x,y,label])=><g key={label}><rect x={Number(x)-76} y={Number(y)-30} width="152" height="60" rx="16" className="art-surface"/><circle cx={Number(x)-52} cy={Number(y)} r="4" fill={green} data-art-pulse="true"/><text x={Number(x)-40} y={Number(y)+4} fontSize="11" className="art-caption">{label}</text></g>)}<circle cx="320" cy="175" r="43" className="art-surface"/><text x="320" y="181" textAnchor="middle" fontSize="18" fill={green}>SIP</text>
    </>}
  </MotionSvg>;
}
