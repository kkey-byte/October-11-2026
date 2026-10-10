import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const DATE = 'October 11, 2026';
const MESSAGE = 'Good morning! 🤍 I hope you have a nice day today. Don’t forget to eat on time, drink plenty of water, and take care of yourself. I hope everything goes well for you today, and may you find little reasons to smile throughout the day. Take care always! ♡';

function Heart({ className = '' }) {
  return <svg className={className} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true"><path d="M32 55S7 40 7 22C7 7 26 5 32 18 38 5 57 7 57 22c0 18-25 33-25 33Z" /></svg>;
}

function LoadingScreen({ leaving }) {
  return <section className={`intro ${leaving ? 'leaving' : ''}`} aria-label="A little gift for Dear"><div className="intro-heart"><Heart /><span className="mini-heart">♡</span><span className="mini-star">✧</span></div><p>to the girl who name Dear.</p><span className="intro-dots">· · ·</span></section>;
}

function DateScreen({ onNext }) {
  return <div className="date-content"><span className="eyebrow">A LITTLE MOMENT, JUST FOR YOU</span><p className="handwritten date-note">some days deserve a little sweetness.</p><button className="next-button" onClick={onNext} aria-label="Open your morning letter"><span aria-hidden="true">→</span></button><span className="next-hint">open your little letter</span></div>;
}

function LetterScreen({ onSurprise }) {
  return <section className="letter-card" aria-label="Your morning letter"><div className="letter-decoration" aria-hidden="true">♡</div><span className="eyebrow">A NOTE FOR DEAR</span><h1>Just a little reminder.</h1><p className="message">{MESSAGE}</p><div className="letter-bottom"><span className="handwritten">with a little love, always</span><button className="gift-button" onClick={onSurprise}>Click me <span aria-hidden="true">♡</span></button></div><div className="fold" aria-hidden="true" /></section>;
}

function SunflowerSurprise({ onReplay }) {
  return <section className="surprise" aria-label="A sunflower surprise"><div className="sunshine-heading"><span className="eyebrow">A SMALL GIFT FOR YOU</span><h1>A little sunshine,<br /><em>for Dear.</em></h1></div><div className="flower-scene"><div className="floating-notes" aria-hidden="true">{Array.from({ length: 13 }, (_, i) => <span key={i} className={`floating-note note-${i % 3}`} style={{ '--i': i, '--left': `${8 + ((i * 17) % 84)}%`, '--delay': `${i * .47}s`, '--duration': `${5 + i % 4}s` }}>{i % 5 === 0 ? '💌' : i % 4 === 0 ? '✧' : '♥'}</span>)}</div><svg className="sunflower" viewBox="0 0 400 470" role="img" aria-label="A yellow sunflower growing, opening its petals, and gently swaying"><ellipse className="ground" cx="200" cy="450" rx="83" ry="9" /><g className="flower-sway"><path className="stem" d="M200 450 Q194 355 200 185" /><path className="leaf leaf-left" d="M199 352C151 353 119 316 117 289 160 290 191 309 199 352Z" /><path className="leaf leaf-right" d="M198 307C237 310 276 273 280 242 236 245 207 267 198 307Z" /><path className="leaf-vein left-vein" d="M196 346 132 302" /><path className="leaf-vein right-vein" d="M202 302 265 257" /><g transform="translate(200 170)">{Array.from({ length: 16 }, (_, i) => <g key={i} transform={`rotate(${i * 22.5})`}><path className="petal" style={{ '--petal-delay': `${1.65 + i * .09}s` }} d="M0-19C-29-46-28-81 0-102 28-81 29-46 0-19Z" /></g>)}<g className="flower-center"><circle r="40" fill="#79513b" /><circle r="32" fill="#916347" />{Array.from({ length: 28 }, (_, i) => { const angle = i * 2.399; const r = 5 * Math.sqrt(i); return <circle key={i} cx={Math.cos(angle) * r} cy={Math.sin(angle) * r} r="2" fill="#b78859" />; })}</g></g></g></svg></div><p className="sunshine-caption">Sending a little sunshine your way. 🌻</p><button className="replay-button" onClick={onReplay}>Read your letter again <span aria-hidden="true">↩</span></button></section>;
}

function App() {
  const [stage, setStage] = useState('intro');
  const [leaving, setLeaving] = useState(false);
  const dateRef = useRef(null);
  const mainRef = useRef(null);
  useEffect(() => { const fade = setTimeout(() => setLeaving(true), 2700); const end = setTimeout(() => setStage('date'), 3200); return () => { clearTimeout(fade); clearTimeout(end); }; }, []);
  useEffect(() => { if (stage !== 'intro') mainRef.current?.focus({ preventScroll: true }); }, [stage]);
  function openLetter() {
    const before = dateRef.current.getBoundingClientRect();
    setStage('letter');
    requestAnimationFrame(() => { const after = dateRef.current.getBoundingClientRect(); if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) dateRef.current.animate([{ transform: `translate(${before.left - after.left}px, ${before.top - after.top}px) scale(${before.width / after.width})` }, { transform: 'translate(0, 0) scale(1)' }], { duration: 850, easing: 'cubic-bezier(.22,1,.36,1)' }); });
  }
  return <div className={`app stage-${stage}`}><div className="ambient ambient-one" /><div className="ambient ambient-two" /><header className="site-header"><span className="brand"><Heart /> just a little gesture</span><span className="header-note">made for Dear</span></header><main ref={mainRef} tabIndex="-1" className="main"><div className="experience"><div className="shared-date" ref={dateRef} style={{ visibility: stage === 'intro' || stage === 'sunflower' ? 'hidden' : 'visible' }}>{DATE}<span className="date-rule" /></div>{stage === 'date' && <DateScreen onNext={openLetter} />}{stage === 'letter' && <LetterScreen onSurprise={() => setStage('sunflower')} />}{stage === 'sunflower' && <SunflowerSurprise onReplay={() => setStage('letter')} />}</div></main><footer>a tiny digital gift <span aria-hidden="true">♡</span> a whole lot of warmth</footer>{stage === 'intro' && <LoadingScreen leaving={leaving} />}</div>;
}

createRoot(document.getElementById('root')).render(<App />);
