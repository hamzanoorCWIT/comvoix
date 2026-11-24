"use client";

import { useEffect, useId, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import styles from './contact-center-art.module.css';

const accent = 'var(--brand-accent, #f9a21e)';
const ink = 'var(--art-primary, #f8fafc)';
const muted = 'var(--art-secondary, #94a3b8)';
const callers = [
  { number: '+1 (206) 555-0102', y: 170 },
  { number: '+44 7911 100 002', y: 230 },
  { number: '+971 50 123 4567', y: 290 },
];
const panelScale = .82;
const panelX = 0, panelY = 40;
const panelShape = 'M22 99 223 109Q240 110 240 127V317Q240 331 225 333L23 350Q8 351 8 336V115Q8 99 22 99Z';
const connectorStart = panelX + 236 * panelScale;
const connectorEnd = 306;
const connectorGap = connectorEnd - connectorStart;
const streams = callers.map(({ y }) => `M${connectorStart} ${panelY + y * panelScale}C${connectorStart + connectorGap * .45} ${panelY + y * panelScale} ${connectorEnd - connectorGap * .28} 218 ${connectorEnd} 218`);
const outgoing = 'M491 218C525 218 530 290 558 290S596 254 602 231';
gsap.registerPlugin(MotionPathPlugin);

function Person({ receiver = false }: { receiver?: boolean }) {
  return <g transform={receiver ? 'translate(602 211) scale(.65)' : 'translate(397 193)'}>
    <path d="M-27 38q0-25 27-25t27 25" fill={muted} fillOpacity=".1" stroke={muted} strokeWidth="2" />
    <ellipse cy="-4" rx="17" ry="22" fill="var(--art-surface)" stroke={muted} strokeWidth="2" />
    <path d="M-16-10q3-22 26-12l7 12q-12 0-17-8-5 10-16 8" fill={muted} fillOpacity=".65" />
    <g fill={ink}><circle cx="-6" cy="-4" r="1.5" /><circle cx="6" cy="-4" r="1.5" /></g>
    <ellipse data-mouth={receiver ? 'receiver' : 'caller'} cy="7" rx="4" ry="1" fill={ink} />
    <g data-headset={receiver ? 'receiver' : 'caller'} fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round">
      <path d="M-22 0v-9a22 22 0 0 1 44 0v9M22 7v7q0 9-17 9" />
      <rect x="-25" y="-3" width="7" height="15" rx="3" fill="var(--art-surface)" /><rect x="18" y="-3" width="7" height="15" rx="3" fill="var(--art-surface)" />
      <path d="M2 23h6" stroke={accent} strokeWidth="5" />
    </g>
  </g>;
}

export function ContactCenterArt({ label }: { label: string }) {
  const id = useId();
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current!;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const select = gsap.utils.selector(svg);
      const sequence = gsap.timeline({ paused: true, repeat: -1 });
      // Each number owns a complete call story before the next number is selected.
      callers.forEach((_, callerIndex) => {
      const timeline = gsap.timeline();
      const hidden = '[data-person], [data-headset], [data-caption], [data-stage], [data-call], [data-ring], [data-arrival], [data-signal]';
      timeline.set(select(hidden), { opacity: 0 }, 0)
        .set(select('[data-links]'), { opacity: 1, rotation: 0, svgOrigin: '397 196', scale: 1 }, 0)
        .set(select('[data-link-left]'), { x: -9 }, 0)
        .set(select('[data-link-right]'), { x: 9 }, 0)
        .set(select('[data-headset]'), { y: -23 }, 0)
        .set(select('[data-mouth]'), { attr: { ry: 1 } }, 0);
      timeline.set(select('[data-row-active]'), { opacity: 0 }, 0)
        .set(select(`[data-row-active="${callerIndex}"]`), { opacity: 1 }, 0)
        .set(select('[data-queue-bar]'), { scaleY: 1, fill: muted }, 0)
        .set(select(`[data-queue-row="${callerIndex}"] [data-queue-bar]`), { fill: accent }, 0);
      const dot = select(`[data-signal="${callerIndex}"]`);
      timeline.set(dot, { attr: { cx: 0, cy: 0 }, opacity: 1 }, .25)
        .fromTo(dot, { x: 0, y: 0 }, { motionPath: { path: streams[callerIndex] }, duration: 1.8, ease: 'power1.inOut', immediateRender: false }, .25)
        .to(dot, { opacity: 0, duration: .15 }, 2.05);
      timeline.fromTo(select('[data-arrival]'), { opacity: .7, scale: .9, svgOrigin: '397 218' }, { opacity: 0, scale: 1.15, duration: .8, immediateRender: false }, 2.3)
        .to(select('[data-links]'), { rotation: 180, duration: 1.1, ease: 'power2.inOut' }, 2.3)
        .to(select('[data-link-left], [data-link-right]'), { x: 0, duration: .55, ease: 'back.out(1.5)' }, 3)
        .to(select('[data-links]'), { opacity: 0, scale: .5, duration: .45 }, 3.7)
        .fromTo(select('[data-person="caller"]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .55, immediateRender: false }, 4)
        .to(select('[data-headset="caller"]'), { opacity: 1, y: 0, duration: .75, ease: 'back.out(1.4)' }, 4.7)
        .set(select('[data-call]'), { opacity: 1, x: 0, y: 0 }, 5.7)
        .to(select('[data-call]'), { motionPath: { path: outgoing }, duration: 1.8, ease: 'power1.inOut' }, 5.7)
        .to(select('[data-call]'), { opacity: 0, duration: .2 }, 7.5)
        .fromTo(select('[data-ring]'), { opacity: .8, scale: .8, svgOrigin: '602 213' }, { opacity: 0, scale: 1.3, duration: .55, repeat: 2, immediateRender: false }, 7.5)
        .to(select('[data-person="receiver"]'), { opacity: 1, duration: .4 }, 8.5)
        .to(select('[data-headset="receiver"]'), { opacity: 1, y: 0, duration: .65, ease: 'back.out(1.4)' }, 8.9);
      const stages = [[0, 2.3], [2.3, 5.6], [5.6, 9.6], [9.6, 19.5]];
      stages.forEach(([start, end], i) => {
        timeline.to(select(`[data-stage="${i}"]`), { opacity: 1, duration: .2 }, start)
          .to(select(`[data-stage="${i}"]`), { opacity: 0, duration: .2 }, end - .2);
      });
      [9.7, 12.9, 16.1].forEach((start, i) => {
        timeline.fromTo(select(`[data-caption="${i}"]`), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .45, immediateRender: false }, start)
          .to(select(`[data-caption="${i}"]`), { opacity: 0, y: -6, duration: .3 }, start + 2.8)
          .to(select(`[data-mouth="${i === 1 ? 'caller' : 'receiver'}"]`), { attr: { ry: 3.5 }, duration: .13, repeat: 15, yoyo: true, ease: 'sine.inOut' }, start + .2);
      });
      timeline.to(select('[data-person], [data-headset]'), { opacity: 0, duration: .5 }, 19.5)
        .to(select('[data-links]'), { opacity: 1, scale: 1, rotation: 360, duration: .5 }, 20);
      svg.querySelectorAll<SVGRectElement>(`[data-queue-row="${callerIndex}"] [data-queue-bar]`).forEach((element, i) => {
        const bounds = element.getBBox();
        timeline.fromTo(element, { scaleY: 1 }, {
          scaleY: .3, svgOrigin: `${bounds.x + bounds.width / 2} ${bounds.y + bounds.height / 2}`,
          duration: .4, repeat: 47, yoyo: true, ease: 'sine.inOut', immediateRender: false,
        }, (i % 5) * .1);
      });
      timeline.fromTo(select('[data-glass-sheen]'), { x: -220 }, { x: 280, duration: 5, ease: 'sine.inOut', immediateRender: false }, 0);
      sequence.add(timeline, callerIndex * 21);
      });
      let visible = false;
      const sync = () => sequence.paused(!visible || document.hidden);
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
      observer.observe(svg);
      document.addEventListener('visibilitychange', sync);
      return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); sequence.kill(); };
    });
    return () => media.revert();
  }, []);
  return <svg ref={ref} className={`communication-art service-scene ${styles.scene}`} viewBox="0 0 680 485" role="img" aria-labelledby={`${id}-title`}>
    <title id={`${id}-title`}>{label}</title>
    <defs>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffffff" stopOpacity=".16" /><stop offset=".45" stopColor="#ffffff" stopOpacity=".025" /><stop offset="1" stopColor="#ffffff" stopOpacity=".09" /></linearGradient>
      <linearGradient id={`${id}-sheen`}><stop stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".18" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <linearGradient id={`${id}-glass-edge`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".5" /><stop offset=".45" stopColor={muted} stopOpacity=".2" /><stop offset="1" stopColor="#fff" stopOpacity=".25" /></linearGradient>
      <clipPath id={`${id}-panel-clip`}><path d={panelShape} /></clipPath>
      <radialGradient id={`${id}-aura`}><stop stopColor={accent} stopOpacity=".09" /><stop offset=".55" stopColor={muted} stopOpacity=".04" /><stop offset="1" stopColor={muted} stopOpacity="0" /></radialGradient>
      <linearGradient id={`${id}-ribbon`} x1="0" y1="1" x2="1" y2="0"><stop stopColor={muted} stopOpacity=".02" /><stop offset=".35" stopColor={muted} stopOpacity=".3" /><stop offset=".57" stopColor={accent} stopOpacity=".38" /><stop offset=".75" stopColor={ink} stopOpacity=".45" /><stop offset="1" stopColor={muted} stopOpacity=".06" /></linearGradient>
      <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={ink} stopOpacity=".85" /><stop offset=".28" stopColor={muted} /><stop offset=".48" stopColor={accent} stopOpacity=".75" /><stop offset=".62" stopColor={accent} stopOpacity=".5" /><stop offset=".78" stopColor={ink} stopOpacity=".75" /><stop offset="1" stopColor={muted} /></linearGradient>
      <radialGradient id={`${id}-sphere`} cx="30%" cy="25%" r="80%"><stop stopColor="var(--art-soft)" /><stop offset=".7" stopColor="var(--art-surface)" /><stop offset="1" stopColor="var(--art-soft)" /></radialGradient>
      <linearGradient id={`${id}-line`}><stop stopColor={muted} stopOpacity=".2" /><stop offset="1" stopColor={muted} stopOpacity=".5" /></linearGradient>
    </defs>
    <ellipse cx="391" cy="225" rx="258" ry="205" fill={`url(#${id}-aura)`} />
    {/* Fine, woven signal ribbons create a sculptural silhouette. */}
    <g fill="none" stroke={`url(#${id}-ribbon)`} strokeWidth=".8">
      {Array.from({ length: 26 }, (_, i) => <path key={i} d={`M${156 + i * 1.7} ${355 + i * .55}C${215 + i * 2} ${335 - i * 2.5} ${204 + i * 2.8} ${91 - i * 1.5} ${386 + i * 3.1} ${78 + i * 1.2}S${654 - i * 1.2} ${229 + i * 2} ${567 - i * 2.1} ${309 + i * 1.1}`} />)}
    </g>
    <path d="M195 357C266 318 213 74 421 75S652 262 545 333" fill="none" stroke={muted} strokeOpacity=".2" strokeWidth="1" />
    <circle cx="195" cy="357" r="3" fill={accent} opacity="0" data-motion-path="M195 357C266 318 213 74 421 75S652 262 545 333" data-motion-speed="65" data-motion-period="13" />
    <g fill="none" stroke={`url(#${id}-line)`} strokeWidth="1.2">{streams.map(path => <path key={path} d={path} />)}</g>
    {streams.map((path, i) => <circle key={path} cx={panelX + 236 * panelScale} cy={panelY + callers[i].y * panelScale} r="3" fill={accent} opacity="0" data-signal={i} />)}
    <g transform={`translate(${panelX} ${panelY}) scale(${panelScale})`} className={styles.card}>
      <path d={panelShape} fill="var(--art-surface)" fillOpacity=".55" />
      <path className={styles.panelEdge} d={panelShape} fill={`url(#${id}-glass)`} stroke={`url(#${id}-glass-edge)`} strokeWidth="1.2" />
      <g clipPath={`url(#${id}-panel-clip)`}><path data-glass-sheen="true" d="M-160 85h85L100 365H15Z" fill={`url(#${id}-sheen)`} /></g>
      <path d="m25 110 192 9" fill="none" stroke={ink} strokeOpacity=".08" />
      <text x="26" y="132" fill={ink} fontSize="11" letterSpacing=".5">Incoming calls</text>
      <circle cx="191" cy="129" r="3" fill={accent} /><text x="200" y="132" fill={muted} fontSize="9">Live</text>
      {callers.map(({ number, y }, i) => <g key={number} data-queue-row={i}>
        <rect x="20" y={y - 22} width="208" height="45" rx="12" fill="var(--art-soft)" fillOpacity=".45" stroke="var(--art-border)" strokeOpacity=".65" />
        <rect data-row-active={i} opacity={i === 0 ? 1 : 0} x="20" y={y - 22} width="208" height="45" rx="12" fill={accent} fillOpacity=".1" stroke={accent} strokeWidth="1.4" />
        <circle cx="42" cy={y} r="13" fill="var(--art-surface)" fillOpacity=".5" stroke={muted} strokeOpacity=".3" />
        <path transform={`translate(42 ${y})`} d="M-5-7-8-4q1 10 12 12l3-3-4-5-3 2-4-4 2-3Z" fill="none" stroke={muted} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="62" y={y + 4} fill={ink} fontSize="11" fontWeight="400">{number}</text>
        {[7, 12, 18, 10, 5].map((height, bar) => <rect key={bar} data-queue-bar="true" x={198 + bar * 4.3} y={y - height / 2} width="2" height={height} rx="1" fill={i === 0 ? accent : muted} />)}
        <circle cx="236" cy={y} r="2.5" fill={muted} />
        <circle data-row-active={i} opacity={i === 0 ? 1 : 0} cx="236" cy={y} r="2.5" fill={accent} />
      </g>)}
      <text x="27" y="334" fill={muted} fontSize="8" letterSpacing="1.3">EVERY CALL, CONNECTED</text>
    </g>
    {/* Keep the outgoing ribbon behind the core so its content stays unobstructed. */}
    <g fill="none" stroke={`url(#${id}-ribbon)`} strokeWidth=".9">{Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${296 + i * 1.7} ${282 + i * 1.7}C${397 + i} ${387 - i * 2} ${500 + i * 1.4} ${300 - i * 2} 602 ${205 + i * 1.2}`} />)}</g>
    {/* A luminous voice core, with an elliptical metal rim. */}
    <circle cx="397" cy="218" r="91" fill={`url(#${id}-sphere)`} stroke="var(--art-border)" />
    <circle cx="397" cy="218" r="81" fill="none" stroke={muted} strokeOpacity=".1" />
    <circle data-arrival="true" cx="397" cy="218" r="94" fill="none" stroke={accent} strokeWidth="2" opacity="0" />
    <ellipse cx="397" cy="218" rx="100" ry="91" transform="rotate(-33 397 218)" fill="none" stroke={`url(#${id}-metal)`} strokeWidth="3" />
    <path d="M325 180C335 149 366 131 396 132" fill="none" stroke={ink} strokeOpacity=".55" strokeWidth="1.5" strokeLinecap="round" />
    {/* Interlocking links represent a connected conversation without a waveform. */}
    <circle cx="397" cy="196" r="35" fill={muted} fillOpacity=".06" />
    <g data-links="true"><g transform="rotate(-35 397 196)" fill="none" stroke={`url(#${id}-metal)`} strokeWidth="4.5" strokeLinecap="round">
      <rect data-link-left="true" x="370" y="185" width="34" height="22" rx="11" />
      <rect data-link-right="true" x="390" y="185" width="34" height="22" rx="11" />
    </g></g>
    <g data-person="caller" opacity="0"><Person /></g>
    <circle cx="426" cy="177" r="3" fill={accent} data-art-pulse="true" />
    <text x="397" y="250" fill={ink} textAnchor="middle" fontSize="10" fontWeight="600" letterSpacing="2">VOICE,</text>
    <text x="397" y="269" fill={ink} textAnchor="middle" fontSize="10" fontWeight="600" letterSpacing="2">CONNECTED</text>
    <circle cx="602" cy="213" r="32" fill="none" stroke={muted} strokeOpacity=".2" />
    <circle cx="602" cy="213" r="25" className="art-surface" stroke="var(--art-border)" />
    <circle data-ring="true" cx="602" cy="213" r="32" fill="none" stroke={accent} strokeWidth="2" opacity="0" />
    <g data-person="receiver"><Person receiver /></g>
    <path d={outgoing} fill="none" stroke={muted} strokeOpacity=".35" strokeDasharray="3 5" />
    <g data-call="true" opacity="0">
      <circle r="12" className="art-surface" stroke={accent} />
      <path d="M-5-6-7-3q1 8 10 10l3-2-3-4-3 2-4-4 2-3Z" fill={accent} />
    </g>
    <text x="602" y="268" textAnchor="middle" fill={muted} fontSize="10">Your team</text>
    <text x="62" y="57" fill={muted} fontSize="9" letterSpacing="2.7">MANY VOICES.</text>
    <text x="365" y="395" fill={ink} textAnchor="middle" fontSize="14" letterSpacing=".6">One seamless connection.</text>
    <path d="M335 412h60" stroke={muted} strokeOpacity=".4" strokeWidth="1.5" strokeLinecap="round" />
    {['Incoming voices', 'Making the connection', 'Calling your team…', 'Conversation in progress'].map((text, i) => <text key={text} data-stage={i} opacity="0" x="397" y="112" textAnchor="middle" fill={ink} fontSize="13" fontWeight="400" letterSpacing=".2">{text}</text>)}
    {[
      ['TEAM', 'Hello! How can I help you today?'],
      ['CALLER', 'I’d like to connect with your sales team.'],
      ['TEAM', 'Of course. You’re in the right place.'],
    ].map(([speaker, text], i) => <g key={speaker + i} data-caption={i} opacity="0">
      <rect x="154" y="429" width="422" height="40" rx="12" className="art-surface" stroke="var(--art-border)" />
      <text x="171" y="453" fill={muted} fontSize="9" fontWeight="600" letterSpacing="1">{speaker}</text>
      <text x="233" y="453" fill={ink} fontSize="11">{text}</text>
    </g>)}
  </svg>;
}

