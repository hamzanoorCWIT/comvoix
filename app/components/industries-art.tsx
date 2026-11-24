"use client";
import { useId } from 'react';
import { MotionSvg } from './motion';

const accent = 'var(--brand-accent, #f9a21e)';
const ink = 'var(--art-primary, #f8fafc)';
const muted = 'var(--art-secondary, #94a3b8)';
const sectors = [
  ['Restaurants', 'restaurants'], ['Healthcare', 'healthcare'], ['Retail', 'retail'], ['Real Estate', 'real-estate'], ['Technology', 'technology'],
  ['Services', 'professional'], ['Travel', 'travel'], ['Logistics', 'logistics'], ['Insurance', 'insurance'],
] as const;
// Nine industries on a ring around one platform; the signal reaches each in turn.
const CX = 320, CY = 178, RX = 236, RY = 118;
const spot = (i: number) => { const a = (-90 + i * 40) * Math.PI / 180; return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) }; };
const spokes = sectors.map((_, i) => { const { x, y } = spot(i); return `M${CX} ${CY}L${x} ${y}`; });
const SPEED = '150', PERIOD = '7.2';

/** One platform at the centre, every industry around it, connected one after another. Used on the Industries page banner. */
export function IndustriesArt({ label }: { label: string }) {
  const id = useId();
  return <MotionSvg className="communication-art industries-art" viewBox="0 0 640 360" role="img" aria-labelledby={id}>
    <title id={id}>{label}</title>
    <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke={muted} strokeOpacity=".3" strokeDasharray="2 6" />
    <ellipse cx={CX} cy={CY} rx={RX - 60} ry={RY - 32} fill="none" stroke={muted} strokeOpacity=".18" />

    {/* Spokes, neutral at rest; each lights up as the signal travels it */}
    <g fill="none" stroke={muted} strokeWidth="1.2" strokeOpacity=".55">{spokes.map(d => <path key={d} d={d} />)}</g>
    <g fill="none" stroke={accent} strokeWidth="1.4" strokeOpacity=".9" strokeLinecap="round">
      {spokes.map((d, i) => <path key={`${d}-t`} d={d} opacity="0" data-motion-reveal="true" data-motion-speed={SPEED} data-motion-delay={`${i * .72}`} data-motion-period={PERIOD} />)}
    </g>
    {spokes.map((d, i) => <circle key={d} r="3" fill={accent} data-motion-path={d} data-motion-speed={SPEED} data-motion-delay={`${i * .72}`} data-motion-period={PERIOD} />)}

    {/* The platform */}
    <g data-art-float="true">
      <rect x={CX - 78} y={CY - 34} width="156" height="68" rx="18" className="art-surface" />
      <rect x={CX - 78} y={CY - 34} width="156" height="68" rx="18" fill="none" stroke={accent} strokeOpacity=".6" />
      <circle cx={CX - 56} cy={CY} r="12" fill={accent} fillOpacity=".15" /><path transform={`translate(${CX - 64} ${CY - 8}) scale(.68)`} d="M6.5 3.5h3.5l1.8 5-2.6 1.8a12 12 0 0 0 5.5 5.5l1.8-2.6 5 1.8v3.5q0 1.7-1.7 1.7A17 17 0 0 1 4.8 5.2q0-1.7 1.7-1.7Z" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x={CX - 38} y={CY - 4} className="art-caption" fontSize="9" fontWeight="700" letterSpacing="1.2">COMVOIX</text>
      <text x={CX - 38} y={CY + 10} fill={muted} fontSize="7.5">One platform · every industry</text>
    </g>

    {/* Industries */}
    {sectors.map(([name, kind], i) => { const { x, y } = spot(i); const below = y > CY; return <g key={kind} data-art-float="true">
      <rect x={x - 22} y={y - 22} width="44" height="44" rx="13" className="art-surface" />
      <rect x={x - 22} y={y - 22} width="44" height="44" rx="13" fill="none" stroke={accent} strokeWidth="1.6" opacity="0" data-motion-light="true" data-motion-route={spokes[i]} data-motion-speed={SPEED} data-motion-delay={`${i * .72}`} data-motion-period={PERIOD} />
      <g transform={`translate(${x - 15} ${y - 12}) scale(.375)`} fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><IndustryGlyph kind={kind} /></g>
      <text x={x} y={below ? y + 36 : y - 28} textAnchor="middle" fill={muted} fontSize="8" fontWeight="600">{name}</text>
    </g>; })}
  </MotionSvg>;
}

export function IndustryGlyph({ kind }: { kind: string }) {
  return <>
    {kind === 'restaurants' ? <><path d="M26 10v18m-8-18v18m8 0q-8 0-8 0v26m8-26v26M18 10q-6 0-6 12 0 6 6 6" /><path d="M54 10q10 0 10 16v2H44v-2q0-16 10-16Zm0 18v26m-6 0h12" /></>
      : kind === 'healthcare' ? <><rect x="12" y="12" width="56" height="42" rx="10" /><path d="M40 22v22m-11-11h22" /></>
      : kind === 'retail' ? <><path d="M14 20h52l-6 32H20Zm10 0q0-12 16-12t16 12" /><path d="M30 38h20" /></>
      : kind === 'real-estate' ? <><path d="M12 32 40 10l28 22" /><path d="M20 28v26h40V28" /><path d="M34 54V38h12v16" /></>
      : kind === 'technology' ? <><rect x="12" y="12" width="56" height="34" rx="6" /><path d="M28 54h24m-12-8v8" /><path d="m30 24-6 5 6 5m20-10 6 5-6 5m-14 2 8-14" /></>
      : kind === 'professional' ? <><rect x="12" y="20" width="56" height="34" rx="6" /><path d="M30 20v-6h20v6m-38 14h56" /></>
      : kind === 'travel' ? <><path d="M12 54V22q0-8 8-8h40q8 0 8 8v32" /><path d="M12 38h56M26 30h8v8h-8zm20 0h8v8h-8z" /><path d="M32 54V46h16v8" /></>
      : kind === 'logistics' ? <><path d="M12 18h34v26H12Zm34 8h12l10 10v8H46" /><circle cx="24" cy="48" r="5" /><circle cx="58" cy="48" r="5" /></>
      : <><path d="M40 10q14 8 24 8 0 28-24 36Q16 46 16 18q10 0 24-8Z" /><path d="m30 32 7 7 13-14" /></>}
  </>;
}
export function IndustryIcon({ kind }: { kind: string }) {
  return <svg viewBox="0 0 80 64" className="sip-service-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><IndustryGlyph kind={kind} /></svg>;
}
