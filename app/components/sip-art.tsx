"use client";
import { useId } from "react";
import { MotionSvg } from "./motion";
const green = "var(--art-primary, #f8fafc)";
const blue = "var(--art-secondary, #94a3b8)";
export function SipArt({ scene }: { scene: "bridge" | "capacity" }) {
  const id = useId();
  const paths = scene === "bridge" ? ["M198 145H448", "M448 205H198"] : ["M170 110H250Q275 110 275 155H460", "M170 180H250Q275 180 275 195H460", "M170 250H250Q275 250 275 235H460"];
  return <MotionSvg className="communication-art sip-art" viewBox="0 0 640 360" role="img" aria-labelledby={id}>
    <title id={id}>{scene === "bridge" ? "Your existing IP PBX connects to SIP voice services with inbound and outbound calling" : "Calling capacity adapts across business locations through a shared SIP connection"}</title>
    <g fill="none" stroke={blue} strokeOpacity=".12">{[50,110,170,230,290].map(y=><path key={y} d={`M25 ${y}H615`}/>)}{[80,160,240,320,400,480,560].map(x=><path key={x} d={`M${x} 25V330`}/>)}</g>
    {scene === "bridge" ? <>
      <rect x="45" y="75" width="153" height="215" rx="20" className="art-surface"/><text x="66" y="108" fontSize="12" className="art-caption">YOUR IP PBX</text>
      {[130,175,220].map(y=><g key={y}><rect x="62" y={y} width="119" height="32" rx="7" fill={blue} fillOpacity=".1"/><circle cx="77" cy={y+16} r="4" fill={green} data-art-pulse="true"/><path d={`M95 ${y+12}h65m-65 8h45`} stroke={blue} strokeOpacity=".6"/></g>)}
      <rect x="448" y="90" width="148" height="185" rx="24" className="art-surface"/><text x="474" y="123" fontSize="12" className="art-caption">SIP SERVICES</text><g fill="none" stroke={green} strokeWidth="2"><path d="m482 175 40-24 40 24-40 24Zm0 20 40 24 40-24m-80 20 40 24 40-24"/></g>
      <text x="265" y="126" fontSize="11" className="art-caption">OUTBOUND →</text><text x="265" y="235" fontSize="11" className="art-caption">← INBOUND</text><rect x="258" y="156" width="122" height="37" rx="18" className="art-surface"/><text x="284" y="180" fontSize="12" fill={green}>SIP TRUNK</text><text x="169" y="332" fontSize="12" className="art-caption">KEEP YOUR SYSTEM. EXTEND YOUR CONNECTIVITY.</text>
    </> : <>
      {['OFFICE 01','OFFICE 02','OFFICE 03'].map((title,i)=><g key={title}><rect x="35" y={80+i*70} width="135" height="54" rx="12" className="art-surface"/><text x="56" y={112+i*70} fontSize="12" className="art-caption">{title}</text></g>)}
      <rect x="340" y="48" width="260" height="265" rx="22" className="art-surface"/><text x="361" y="80" fontSize="12" className="art-caption">CALLING CAPACITY</text>
      {[0,1,2,3,4,5].map((n)=><g key={n} data-art-pulse="true"><rect x={365+n*35} y={220-n*20} width="22" height={42+n*20} rx="5" fill={n%2?blue:green}/></g>)}<path d="M360 275h220" stroke={blue} strokeOpacity=".3"/><text x="362" y="296" fontSize="11" className="art-caption">CONFIGURED AROUND YOUR BUSINESS</text>
    </>}
    {paths.map((path,i)=><g key={path}><path d={path} fill="none" stroke={i%2?blue:green} strokeWidth="2" strokeOpacity=".35"/><circle cx={scene==='bridge'?(i?448:198):170} cy={scene==='bridge'?(i?205:145):110+i*70} r="4" fill={i%2?blue:green} data-motion-path={path} data-duration={3+i}/></g>)}
  </MotionSvg>;
}
