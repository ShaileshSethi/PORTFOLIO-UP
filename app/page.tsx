'use client';

import {
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
  Check,
  Code2,
  Copy,
  Mail,
  MousePointer2,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const roles = ['ENGINEER', 'BUILDER', 'AI EXPLORER', 'CREATOR'];

const projects = [
  {
    number: '01',
    name: 'SAFEZONES',
    type: 'EMERGENCY PLATFORM',
    summary: 'Real-time safety dashboard turning critical alerts into clear, fast action.',
    tech: ['NEXT.JS', 'WEBSOCKETS'],
    result: '3RD PLACE',
    color: 'green',
    link: 'https://safezones.vercel.app/',
    art: 'radar',
  },
  {
    number: '02',
    name: 'TELEPORT KILLER',
    type: 'CYBERPUNK GAME',
    summary: 'A neon combat experiment packed with custom glitches and arcade intensity.',
    tech: ['C++', 'UNREAL'],
    result: 'TOP 10',
    color: 'orange',
    link: 'https://www.jabali.ai/game/574e925c-814c-4655-b0c2-18d4b8d1f1de/create-from-scratch/teleport-killer/',
    art: 'portal',
  },
  {
    number: '03',
    name: 'VIBE CODE QUEST',
    type: 'AI LEARNING GAME',
    summary: 'An 8-bit adventure that teaches better prompting through play, not lectures.',
    tech: ['AI / ML', 'GAME DEV'],
    result: 'WINNER',
    color: 'lilac',
    link: 'https://app-b0pl8qd02cjl.appmedo.com/',
    art: 'pixels',
  },
  {
    number: '04',
    name: 'MEOWCARE',
    type: 'CARE DASHBOARD',
    summary: 'An accessible remote-care experience built around clarity and connection.',
    tech: ['REACT NATIVE', 'UX DESIGN'],
    result: 'BUILT WITH CARE',
    color: 'blue',
    link: 'https://vercel.com/shaileshtunes-6402s-projects/meowcare./2pxWGioMfUc4Yiykrn39S7X1VH2t',
    art: 'waves',
  },
];

const achievements = [
  ['2026', 'GOOGLE GEMINI', 'STUDENT AMBASSADOR — SHORTLISTED'],
  ['2026', 'HACK4RELIEF', '3RD PLACE'],
  ['2026', 'JABALI GAME JAM', 'TOP 10 FINALIST'],
  ['2026', 'VISIONARY PIXEL × ANDALA AI', 'WINNER'],
];

const skills = ['AI', 'GAME DEV', 'PROMPT ENGINEERING', 'PYTHON', 'C', 'HTML', 'CSS', 'JAVASCRIPT', 'CREATIVE UI / UX'];

export default function Home() {
  const [role, setRole] = useState(0);
  const [party, setParty] = useState(false);
  const [copied, setCopied] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [target, setTarget] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setRole((value) => (value + 1) % roles.length), 1800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.14 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!gameActive) return;
    const timer = window.setInterval(() => {
      setTime((value) => {
        if (value <= 1) {
          setGameActive(false);
          window.clearInterval(timer);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [gameActive]);

  function moveGlow(event: React.PointerEvent<HTMLElement>) {
    const bounds = heroRef.current?.getBoundingClientRect();
    if (!bounds) return;
    heroRef.current?.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    heroRef.current?.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  }

  function startGame() {
    setScore(0);
    setTime(15);
    setTarget({ x: 50, y: 50 });
    setGameActive(true);
  }

  function catchSpark() {
    setScore((value) => value + 1);
    setTarget({ x: 10 + Math.random() * 80, y: 12 + Math.random() * 72 });
  }

  async function copyEmail() {
    await navigator.clipboard.writeText('shaileshtunes@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className={party ? 'site party-mode' : 'site'}>
      <a className="skip-link" href="#work">Skip to projects</a>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Shailesh Sethi, home">
          <span className="brand-mark">SS</span>
          <span className="brand-copy">SHAILESH<br />SETHI</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#play">PLAY</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <button className="party-button" type="button" onClick={() => setParty((value) => !value)} aria-pressed={party}>
          <Sparkles aria-hidden="true" size={17} /> {party ? 'CALM IT DOWN' : 'PARTY MODE'}
        </button>
      </header>

      <section id="top" className="hero" ref={heroRef} onPointerMove={moveGlow}>
        <div className="pointer-glow" aria-hidden="true" />
        <div className="hero-meta">
          <p><span className="status-dot" /> AVAILABLE FOR MISCHIEF</p>
          <p>BASED IN INDIA <span>↗</span></p>
        </div>

        <h1 className="hero-title" aria-label="Ideas into digital reality">
          <span>IDEAS INTO</span>
          <span className="reality-line">DIGITAL <i>REALITY</i></span>
        </h1>

        <div className="orbit orbit-one" aria-hidden="true"><span>✦</span></div>
        <div className="orbit orbit-two" aria-hidden="true"><span>☺</span></div>
        <div className="sticker sticker-code" aria-hidden="true">&lt;/&gt;</div>
        <div className="sticker sticker-wow" aria-hidden="true">WOW!</div>

        <div className="hero-bottom">
          <p className="hero-intro">I&apos;m Shailesh—an <strong key={roles[role]}>{roles[role]}</strong> turning ambitious ideas into playful, high-performance digital experiences.</p>
          <a className="round-link" href="#work" aria-label="Jump to selected work"><ArrowDownRight size={34} /></a>
          <div className="drag-note"><MousePointer2 size={18} /> MOVE AROUND<br />THE PLAYGROUND</div>
        </div>

        <div className="ticker" aria-hidden="true">
          <div>CREATIVE FRONTEND <Asterisk /> AI EXPERIMENTS <Asterisk /> GAME DEV <Asterisk /> CREATIVE FRONTEND <Asterisk /> AI EXPERIMENTS <Asterisk /> GAME DEV <Asterisk /></div>
        </div>
      </section>

      <section id="work" className="work-section section-shell">
        <div className="section-heading reveal">
          <p className="eyebrow pink">{'{ SELECTED WORK }'}</p>
          <h2>Projects built to move,<br /><em>help</em> and surprise.</h2>
          <p className="section-note">FOUR BUILDS / MANY LATE NIGHTS</p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-${project.color} reveal`} key={project.name} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}>
              <div className={`project-art art-${project.art}`} aria-hidden="true">
                <span className="project-number">{project.number}</span>
                {project.art === 'radar' && <><i /><i /><i /><b /></>}
                {project.art === 'portal' && <><i /><i /><i /></>}
                {project.art === 'pixels' && Array.from({ length: 16 }).map((_, pixel) => <i key={pixel} />)}
                {project.art === 'waves' && <><i /><i /><i /><i /></>}
              </div>
              <div className="project-copy">
                <div className="project-kicker"><span>{project.type}</span><span>{project.result}</span></div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="project-footer">
                  <div>{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
                  <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}><ArrowUpRight /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about-section section-shell">
        <div className="about-intro reveal">
          <p className="eyebrow orange">{'{ THE DIRECTIVE }'}</p>
          <h2>CURIOUS BY DEFAULT.<br /><span>RESTLESS</span> BY DESIGN.</h2>
        </div>
        <div className="about-grid reveal">
          <div className="about-console" aria-hidden="true">
            <div className="console-top"><span /> <span /> <span /><b>shailesh.exe</b></div>
            <div className="console-body">
              <p><span>01</span> ambition = <i>&quot;high&quot;</i>;</p>
              <p><span>02</span> curiosity = <i>true</i>;</p>
              <p><span>03</span> boring = <i>false</i>;</p>
              <p><span>04</span> ship<span className="blink">_</span></p>
            </div>
            <Code2 className="console-icon" />
          </div>
          <div className="about-copy">
            <p className="lead">I don&apos;t just write code; I architect experiences.</p>
            <p>My sweet spot is where robust engineering meets immersive interface design. Every project is a chance to make something useful feel unforgettable.</p>
            <div className="about-tags"><span>PERFORMANCE</span><span>ARCHITECTURE</span><span>MOTION</span></div>
          </div>
        </div>
      </section>

      <section className="achievements-section">
        <div className="section-shell achievement-title reveal">
          <p className="eyebrow lilac">{'{ SIDE QUESTS COMPLETED }'}</p>
          <h2>A FEW NICE<br />PLOT TWISTS.</h2>
          <Trophy aria-hidden="true" />
        </div>
        <div className="achievement-list">
          {achievements.map(([year, title, result]) => (
            <div className="achievement-row reveal" key={title}>
              <span>{year}</span><strong>{title}</strong><em>{result}</em><ArrowUpRight aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      <section id="play" className="play-section section-shell">
        <div className="play-copy reveal">
          <p className="eyebrow blue">{'{ TINY ARCADE BREAK }'}</p>
          <h2>CATCH THE<br /><span>SPARK.</span></h2>
          <p>You have 15 seconds. Catch the runaway idea before it escapes the browser.</p>
          <button className="outline-button" type="button" onClick={startGame}>
            {gameActive ? <RotateCcw size={18} /> : <Play size={18} />}{gameActive ? 'RESTART' : time === 0 ? 'PLAY AGAIN' : 'START GAME'}
          </button>
        </div>
        <div className="game-card reveal">
          <div className="game-hud"><span>SCORE <b>{String(score).padStart(2, '0')}</b></span><span>TIME <b>{String(time).padStart(2, '0')}</b></span></div>
          <div className="game-field">
            <div className="game-grid" aria-hidden="true" />
            {gameActive ? (
              <button
                className="spark-target"
                type="button"
                aria-label="Catch the spark"
                onClick={catchSpark}
                style={{ left: `${target.x}%`, top: `${target.y}%` }}
              >✦</button>
            ) : (
              <div className="game-message">
                <span>{time === 0 ? (score > 9 ? 'SPARK MASTER!' : 'NICE CHASE!') : 'READY?'}</span>
                <small>{time === 0 ? `FINAL SCORE: ${score}` : 'PRESS START TO PLAY'}</small>
              </div>
            )}
          </div>
          <p className="game-tip">TIP: KEYBOARD WORKS TOO — TAB + ENTER</p>
        </div>
      </section>

      <section className="skills-section section-shell reveal">
        <div className="skills-copy">
          <p className="eyebrow green">{'{ TOOLBOX }'}</p>
          <h2>THINGS I<br />LIKE TO <span>PLAY WITH.</span></h2>
        </div>
        <div className="skill-cloud">
          {skills.map((skill, index) => <span key={skill} style={{ '--skill-index': index } as React.CSSProperties}>{skill}</span>)}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-orb" aria-hidden="true"><span>LET&apos;S GO</span></div>
        <div className="section-shell contact-inner reveal">
          <p className="eyebrow">{'{ TRANSMISSION OPEN }'}</p>
          <h2>GOT A WILD<br />IDEA? <em>SEND IT.</em></h2>
          <p>Open for opportunities, collaborations, and ambitious projects.</p>
          <div className="contact-actions">
            <a className="contact-mail" href="mailto:shaileshtunes@gmail.com?subject=Let%27s%20build%20something">SHAILESHTUNES@GMAIL.COM <ArrowUpRight /></a>
            <button className="copy-button" type="button" onClick={copyEmail} aria-label="Copy email address">{copied ? <Check /> : <Copy />}<span>{copied ? 'COPIED!' : 'COPY'}</span></button>
          </div>
          <div className="social-row">
            <a href="https://www.linkedin.com/in/shailesh-sethi-3aab58378/" target="_blank" rel="noreferrer"><ArrowUpRight /> LINKEDIN</a>
            <a href="https://github.com/shaileshsethi" target="_blank" rel="noreferrer"><Code2 /> GITHUB</a>
            <a href="mailto:shaileshtunes@gmail.com"><Mail /> EMAIL</a>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark">SS</span><span>BACK TO TOP</span></a>
        <p>© 2026 SHAILESH SETHI. BUILT WITH CODE, CURIOSITY & TOO MUCH COFFEE.</p>
        <span>PORTFOLIO / 2026</span>
      </footer>
    </main>
  );
}
