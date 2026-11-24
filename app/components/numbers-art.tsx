"use client";
import { useId } from "react";
import { MotionSvg } from "./motion";
const green = "var(--art-primary, #f8fafc)";
const blue = "var(--art-secondary, #94a3b8)";
export function NumbersArt({ scene }: { scene: "presence" | "routing" }) {
  const id = useId();
  const paths = scene === "presence" ? ["M110 105Q220 20 320 165", "M530 98Q420 35 320 165", "M140 280Q260 300 320 165", "M515 270Q410 320 320 165"] : ["M215 170H310Q335 170 335 75H445", "M215 170H445", "M215 170H310Q335 170 335 265H445"];
  return <MotionSvg className="communication-art numbers-art" viewBox="0 0 640 360" role="img" aria-labelledby={id}>
    <title id={id}>{scene === "presence" ? "Business numbers create a presence in multiple markets through one platform" : "One business number routes calls to teams, offices and phone systems"}</title>
    <g fill="none" stroke={blue} strokeOpacity=".15">{[70,130,190,250,310].map(y=><path key={y} d={`M35 ${y}H605`}/>)}{[80,160,240,320,400,480,560].map(x=><path key={x} d={`M${x} 35V325`}/>)}</g>
    {paths.map((path,i)=><g key={path}><path d={path} fill="none" stroke={i%2?blue:green} strokeWidth="2" strokeOpacity=".35"/><circle cx={scene==='presence'?[110,530,140,515][i]:215} cy={scene==='presence'?[105,98,280,270][i]:170} r="4" fill={i%2?blue:green} data-motion-path={path} data-duration={4+i}/></g>)}
    {scene === "presence" ? <>
      <circle cx="320" cy="165" r="70" className="art-surface"/><text x="320" y="151" textAnchor="middle" fontSize="27" fill={green}>+</text><text x="320" y="179" textAnchor="middle" fontSize="13" className="art-caption">YOUR BUSINESS</text><text x="320" y="199" textAnchor="middle" fontSize="10" className="art-caption">ONE PLATFORM</text>
      {[[45,50,'LOCAL','Familiar presence'],[440,43,'NATIONAL','One national identity'],[45,248,'TOLL-FREE','Easy to reach'],[440,238,'INTERNATIONAL','Across borders']].map(([x,y,title,subtitle])=><g key={title} transform={`translate(${x} ${y})`}><g data-art-float="true"><rect width="160" height="76" rx="15" className="art-surface"/><circle cx="18" cy="23" r="4" fill={green} data-art-pulse="true"/><text x="30" y="27" fontSize="11" className="art-caption">{title}</text><text x="17" y="53" fontSize="11" className="art-caption">{subtitle}</text></g></g>)}
    </> : <>
      <rect x="35" y="110" width="180" height="120" rx="22" className="art-surface"/><text x="57" y="142" fontSize="11" className="art-caption">YOUR BUSINESS NUMBER</text><text x="58" y="180" fontSize="23" fill={green}>+•• ••• ••••</text><text x="57" y="209" fontSize="11" className="art-caption">Incoming conversation</text>
      {[['TEAMS','The right people'],['OFFICES','Your locations'],['PHONE SYSTEMS','Your existing setup']].map(([title,subtitle],i)=><g key={title}><rect x="445" y={35+i*95} width="165" height="77" rx="14" className="art-surface"/><circle cx="464" cy={59+i*95} r="4" fill={i===1?blue:green} data-art-pulse="true"/><text x="478" y={63+i*95} fontSize="11" className="art-caption">{title}</text><text x="461" y={88+i*95} fontSize="11" className="art-caption">{subtitle}</text></g>)}<text x="248" y="330" fontSize="12" className="art-caption">FLEXIBLE CALL DESTINATIONS</text>
    </>}
  </MotionSvg>;
}
export function NumberTypeIcon({ kind }: { kind: "national" | "local" | "toll-free" | "international" }) {
  return <svg className="number-type-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "national" ? <><path d="M14 51V12m0 3c12-10 21 10 36 0v23c-15 10-24-10-36 0M8 53h18"/><path d="m25 23 5 5 9-9"/></> : kind === "local" ? <><path d="M49 25c0 13-17 29-17 29S15 38 15 25a17 17 0 1 1 34 0Z"/><circle cx="32" cy="25" r="6"/></> : kind === "toll-free" ? <><rect x="9" y="14" width="46" height="36" rx="12"/><path d="M20 37V26h6m-6 5h5m7 6V26h5m-5 5h5m-5 6h5m6 0V26h5m-5 5h5m-5 6h5"/></> : <><circle cx="32" cy="32" r="22"/><path d="M10 32h44M32 10c-17 12-17 32 0 44 17-12 17-32 0-44M15 19h34M15 45h34"/></>}
  </svg>;
}
