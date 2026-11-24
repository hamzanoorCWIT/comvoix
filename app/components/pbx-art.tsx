"use client";
import { useId } from "react";
import { MotionSvg } from "./motion";

export function PbxArt({ scene }: { scene: "hero" | "remote" | "network" }) {
  const id = useId();
  const green = "var(--art-primary, #f8fafc)";
  const blue = "var(--art-secondary, #94a3b8)";
  const titles = { hero: "Cloud phone system connecting your business calls", remote: "Office, home and mobile teams connected through the cloud", network: "Monitored voice infrastructure connecting international destinations" };
  const routes = scene === "hero" ? ["M150 160H265V125H340", "M340 125H450V70H525", "M340 125H450V230H525"] : scene === "remote" ? ["M120 220Q120 90 320 90", "M320 90Q520 90 520 220", "M320 90V245"] : ["M100 180Q180 20 320 160T550 120", "M100 180Q270 300 320 160T550 120"];
  return <MotionSvg className="communication-art pbx-art" viewBox="0 0 640 340" role="img" aria-labelledby={id}>
    <title id={id}>{titles[scene]}</title>
    <g fill="none" stroke={blue} strokeOpacity=".12">{[60,120,180,240,300].map(y=><path key={y} d={`M30 ${y}H610`}/>)}{[80,160,240,320,400,480,560].map(x=><path key={x} d={`M${x} 30V310`}/>)}</g>
    {routes.map((path,i)=><g key={path}><path d={path} fill="none" stroke={i%2?blue:green} strokeWidth="2" strokeOpacity=".4"/><circle cx={scene==='hero'?150:scene==='remote'?120:100} cy={scene==='hero'?160:scene==='remote'?220:180} r="5" fill={i%2?blue:green} data-motion-path={path} data-duration={4+i}/></g>)}
    {scene === "hero" ? <>
      <g data-art-float="true"><rect x="45" y="100" width="160" height="150" rx="20" className="art-surface"/><text x="65" y="130" className="art-caption" fontSize="12">BUSINESS CALL</text><circle cx="125" cy="178" r="26" fill={green} fillOpacity=".14"/><path d="M113 167q0 25 25 25l6-9-10-5-5 5q-9-3-10-11l5-4-7-8Z" fill="none" stroke={green} strokeWidth="2"/><text x="75" y="229" className="art-caption" fontSize="11">● Call connected</text></g>
      <rect x="265" y="67" width="145" height="120" rx="24" className="art-surface"/><path d="M299 125h76a18 18 0 0 0-5-35 29 29 0 0 0-54-1 19 19 0 0 0-17 36Z" fill="none" stroke={green} strokeWidth="2"/><text x="295" y="159" className="art-caption" fontSize="13">CLOUD PBX</text>
      {[45,205].map((y,i)=><g key={y}><rect x="475" y={y} width="130" height="70" rx="15" className="art-surface"/><circle cx="495" cy={y+24} r="4" fill={green} data-art-pulse="true"/><text x="507" y={y+28} className="art-caption" fontSize="11">{i?'REMOTE TEAM':'HEAD OFFICE'}</text><path d={`M494 ${y+48}h88`} stroke={blue} strokeWidth="3"/></g>)}<text x="270" y="287" className="art-caption" fontSize="12">One system. Every conversation.</text>
    </> : scene === "remote" ? <>
      <circle cx="320" cy="90" r="44" className="art-surface"/><path d="m299 87 14 14 29-29" fill="none" stroke={green} strokeWidth="4"/>
      <g data-art-float="true"><path d="m55 223 65-61 65 61v72H55Z" className="art-surface"/><path d="M104 295v-48h33v48" fill="none" stroke={blue} strokeWidth="2"/><text x="82" y="322" className="art-caption" fontSize="12">AT HOME</text></g>
      <rect x="252" y="208" width="136" height="85" rx="10" className="art-surface"/><path d="M235 302h170M270 227h100v47H270Z" fill="none" stroke={green} strokeWidth="2"/><text x="282" y="329" className="art-caption" fontSize="12">IN OFFICE</text>
      <g data-art-float="true"><rect x="480" y="180" width="80" height="125" rx="16" className="art-surface"/><path d="M505 193h30m-30 96h30" stroke={green} strokeWidth="3"/><circle cx="520" cy="242" r="15" fill={blue} fillOpacity=".2"/><text x="483" y="329" className="art-caption" fontSize="12">ON THE GO</text></g>
    </> : <>
      <circle cx="320" cy="160" r="76" className="art-surface"/><circle cx="320" cy="160" r="56" fill="none" stroke={blue} strokeDasharray="3 8"/><path d="M280 164h18l11-28 19 51 12-23h22" fill="none" stroke={green} strokeWidth="3"/><circle cx="320" cy="84" r="6" fill={green} data-art-pulse="true"/>
      {[[55,135,'VOICE IN'],[492,75,'VOICE OUT']].map(([x,y,t])=><g key={t}><rect x={x} y={y} width="105" height="80" rx="15" className="art-surface"/><text x={Number(x)+16} y={Number(y)+32} className="art-caption" fontSize="12">{t}</text><path d={`M${Number(x)+16} ${Number(y)+52}h70`} stroke={blue} strokeWidth="3"/></g>)}<text x="227" y="285" className="art-caption" fontSize="13">CONTINUOUSLY MONITORED</text>
    </>}
  </MotionSvg>;
}
