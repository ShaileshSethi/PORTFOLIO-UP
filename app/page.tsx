'use client';

import {
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
  Check,
  Code2,
  Copy,
  Folder,
  Mail,
  Monitor,
  MousePointer2,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  X,
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
  const [soundOn, setSoundOn] = useState(true);
  const [ready, setReady] = useState(false);
  const [osProject, setOsProject] = useState<number | null>(0);
  const [osWindowPosition, setOsWindowPosition] = useState({ x: 0, y: 0 });
  const [osDragging, setOsDragging] = useState(false);
  const [portalProject, setPortalProject] = useState<number | null>(null);
  const [portalLaunch, setPortalLaunch] = useState<number | null>(null);
  const [universeShift, setUniverseShift] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [time, setTime] = useState(15);
  const [target, setTarget] = useState({ x: 50, y: 50 });
  const [bursts, setBursts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [dragging, setDragging] = useState<'code' | 'wow' | null>(null);
  const [stickers, setStickers] = useState({ code: { x: 4, y: 31 }, wow: { x: 90, y: 70 } });
  const rootRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const osDragPoint = useRef({ x: 0, y: 0 });
  const portalCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setRole((value) => (value + 1) % roles.length), 1800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 850);
    const savedScore = Number(window.localStorage.getItem('spark-high-score') ?? 0);
    setHighScore(savedScore);
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      rootRef.current?.style.setProperty('--scroll-progress', `${total > 0 ? window.scrollY / total : 0}`);
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', updateProgress);
    };
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

  useEffect(() => {
    if (portalProject === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      portalCloseRef.current?.focus();
    }, 30);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setPortalProject(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [portalProject]);

  function moveGlow(event: React.PointerEvent<HTMLElement>) {
    const bounds = heroRef.current?.getBoundingClientRect();
    if (!bounds) return;
    heroRef.current?.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    heroRef.current?.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
    if (dragging) {
      const x = Math.min(94, Math.max(2, ((event.clientX - bounds.left) / bounds.width) * 100));
      const y = Math.min(86, Math.max(8, ((event.clientY - bounds.top) / bounds.height) * 100));
      setStickers((value) => ({ ...value, [dragging]: { x, y } }));
    }
  }

  function moveCursor(event: React.PointerEvent<HTMLElement>) {
    rootRef.current?.style.setProperty('--cursor-x', `${event.clientX}px`);
    rootRef.current?.style.setProperty('--cursor-y', `${event.clientY}px`);
  }

  function playTone(frequency: number, duration = 0.07, force = false) {
    if (!soundOn && !force) return;
    try {
      if (typeof window === 'undefined' || !window.AudioContext) return;
      const context = audioRef.current ?? new window.AudioContext();
      audioRef.current = context;
      if (context.state === 'suspended') void context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      gain.gain.setValueAtTime(0.045, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + duration);
    } catch {
      // Sound is enhancement-only; never block the interaction.
    }
  }

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    if (next) playTone(560, 0.1, true);
  }

  function toggleParty() {
    const next = !party;
    setUniverseShift(next ? 'BREACHING THE MAIN TIMELINE' : 'RESTORING THE MAIN TIMELINE');
    playTone(next ? 120 : 420, 0.35);
    window.setTimeout(() => {
      setParty(next);
      playTone(next ? 620 : 240, 0.18);
    }, 360);
    window.setTimeout(() => setUniverseShift(null), 1250);
  }

  function launchProject(index: number) {
    setPortalLaunch(index);
    playTone(130 + index * 35, 0.42);
    window.setTimeout(() => {
      setPortalLaunch(null);
      setPortalProject(index);
      playTone(480 + index * 55, 0.16);
    }, 820);
  }

  function launchFromDesktop(index: number) {
    launchProject(index);
  }

  function openDesktop() {
    playTone(330, 0.16);
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  }

  function moveOsWindow(event: React.PointerEvent<HTMLElement>) {
    if (!osDragging) return;
    const dx = event.clientX - osDragPoint.current.x;
    const dy = event.clientY - osDragPoint.current.y;
    osDragPoint.current = { x: event.clientX, y: event.clientY };
    setOsWindowPosition((position) => ({
      x: Math.max(-420, Math.min(420, position.x + dx)),
      y: Math.max(-220, Math.min(220, position.y + dy)),
    }));
  }

  function startGame() {
    playTone(360, 0.12);
    setScore(0);
    setTime(15);
    setTarget({ x: 50, y: 50 });
    setGameActive(true);
  }

  function catchSpark() {
    playTone(520 + score * 24, 0.08);
    navigator.vibrate?.(18);
    const burst = { id: Date.now(), x: target.x, y: target.y };
    setBursts((items) => [...items, burst]);
    window.setTimeout(() => setBursts((items) => items.filter((item) => item.id !== burst.id)), 620);
    setScore((value) => {
      const next = value + 1;
      if (next > highScore) {
        setHighScore(next);
        window.localStorage.setItem('spark-high-score', String(next));
      }
      return next;
    });
    setTarget({ x: 10 + Math.random() * 80, y: 12 + Math.random() * 72 });
  }

  async function copyEmail() {
    await navigator.clipboard.writeText('shaileshtunes@gmail.com');
    playTone(720, 0.1);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const selectedProject = portalProject === null ? null : projects[portalProject];
  const selectedOsProject = osProject === null ? null : projects[osProject];

  return (
    <main
      ref={rootRef}
      className={`${party ? 'site party-mode' : 'site'} ${ready ? 'is-ready' : 'is-loading'}`}
      onPointerMove={moveCursor}
    >
      {universeShift && (
        <div className="universe-shift" aria-live="assertive">
          <div className="shift-rings" aria-hidden="true"><i /><i /><i /><i /></div>
          <p>{universeShift}</p>
          <strong>REALITY.EXE</strong>
          <span>DO NOT REFRESH THE TIMELINE</span>
        </div>
      )}
      {portalLaunch !== null && (
        <div className={`portal-launch portal-${projects[portalLaunch].color}`} aria-live="polite">
          <div className="portal-tunnel" aria-hidden="true">{Array.from({ length: 7 }).map((_, index) => <i key={index} style={{ '--ring': index } as React.CSSProperties} />)}</div>
          <p>ENTERING PROJECT {projects[portalLaunch].number}</p>
          <strong>{projects[portalLaunch].name}</strong>
        </div>
      )}
      <div className={ready ? 'loading-screen is-gone' : 'loading-screen'} aria-hidden="true">
        <span className="loader-logo">SS</span>
        <p>LOADING THE FUN STUFF</p>
        <div><i /></div>
      </div>
      <div className="custom-cursor" aria-hidden="true"><i /></div>
      <div className="scroll-progress" aria-hidden="true" />
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
        <div className="nav-controls">
          <button className="os-button" type="button" onClick={openDesktop}>
            <Monitor size={17} /> <span>DESKTOP</span>
          </button>
          <button className="sound-button" type="button" onClick={toggleSound} aria-label={soundOn ? 'Turn sound effects off' : 'Turn sound effects on'} aria-pressed={soundOn}>
            {soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>
          <button className="party-button" type="button" onClick={toggleParty} aria-pressed={party}>
            <Sparkles aria-hidden="true" size={17} /> {party ? 'EXIT UNIVERSE' : 'PARTY MODE'}
          </button>
        </div>
      </header>

      <section id="top" className="hero" ref={heroRef} onPointerMove={moveGlow}>
        <div className="pointer-glow" aria-hidden="true" />
        <div className="hero-meta">
          <p><span className="status-dot" /> {party ? 'SYSTEM OVERRIDE ACTIVE' : 'AVAILABLE FOR MISCHIEF'}</p>
          <p>{party ? 'TIMELINE // 404' : 'BASED IN INDIA'} <span>↗</span></p>
        </div>

        <h1 className="hero-title" aria-label={party ? 'Alternate universe unlocked' : 'Ideas into digital reality'}>
          <span key={party ? 'accessing' : 'ideas'}>{party ? 'ACCESSING' : 'IDEAS INTO'}</span>
          <span className="reality-line" key={party ? 'alternate' : 'digital'}>{party ? 'ALT' : 'DIGITAL'} <i>{party ? 'UNIVERSE' : 'REALITY'}</i></span>
        </h1>

        <div className="orbit orbit-one" aria-hidden="true"><span>✦</span></div>
        <div className="orbit orbit-two" aria-hidden="true"><span>☺</span></div>
        <button
          className={`sticker sticker-code ${dragging === 'code' ? 'is-dragging' : ''}`}
          type="button"
          aria-label="Drag the code sticker"
          style={{ left: `${stickers.code.x}%`, top: `${stickers.code.y}%` }}
          onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDragging('code'); playTone(310); }}
          onPointerUp={() => setDragging(null)}
        >&lt;/&gt;</button>
        <button
          className={`sticker sticker-wow ${dragging === 'wow' ? 'is-dragging' : ''}`}
          type="button"
          aria-label="Drag the wow sticker"
          style={{ left: `${stickers.wow.x}%`, top: `${stickers.wow.y}%` }}
          onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDragging('wow'); playTone(390); }}
          onPointerUp={() => setDragging(null)}
        >WOW!</button>

        <div className="hero-bottom">
          <p className="hero-intro">I&apos;m Shailesh—an <strong key={roles[role]}>{roles[role]}</strong> turning ambitious ideas into playful, high-performance digital experiences.</p>
          <a className="round-link" href="#work" aria-label="Jump to selected work"><ArrowDownRight size={34} /></a>
          <div className="drag-note"><MousePointer2 size={18} /> DRAG THE STICKERS<br />MOVE THE LIGHT</div>
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

        <div
          className={`os-shell inline-os reveal ${party ? 'os-alt' : ''}`}
          onPointerMove={moveOsWindow}
          onPointerUp={() => setOsDragging(false)}
        >
          <div className="os-menubar">
            <div className="os-menu-brand"><span>SS</span><strong>PORTFOLIO OS</strong></div>
            <p>{party ? 'ALT TIMELINE CONNECTED' : 'CREATIVE SYSTEM ONLINE'}</p>
            <span className="os-live"><i /> LIVE DESKTOP</span>
          </div>
          <div className="os-workspace">
            <div className="os-wallpaper" aria-hidden="true"><span>BUILD</span><span>PLAY</span><span>REPEAT</span></div>
            <div className="os-icons" aria-label="Project folders">
              {projects.map((project, index) => (
                <button
                  type="button"
                  className={`os-icon os-icon-${project.color}`}
                  key={project.name}
                  onClick={() => { setOsProject(index); setOsWindowPosition({ x: 0, y: 0 }); playTone(410 + index * 40); }}
                >
                  <span><Folder /></span>
                  <strong>{project.name}</strong>
                </button>
              ))}
            </div>

            {selectedOsProject && (
              <article
                className={`os-window os-window-${selectedOsProject.color}`}
                style={{ left: `calc(50% + ${osWindowPosition.x}px)`, top: `calc(50% + ${osWindowPosition.y}px)` }}
              >
                <header
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    osDragPoint.current = { x: event.clientX, y: event.clientY };
                    setOsDragging(true);
                  }}
                  onPointerUp={() => setOsDragging(false)}
                >
                  <div><i /><i /><i /></div>
                  <span>{selectedOsProject.name.toLowerCase().replaceAll(' ', '-')}.project</span>
                  <button type="button" aria-label="Close project window" onClick={() => setOsProject(null)}><X size={15} /></button>
                </header>
                <div className="os-window-body">
                  <div className={`os-preview art-${selectedOsProject.art}`} aria-hidden="true"><b>{selectedOsProject.number}</b></div>
                  <div className="os-file-copy">
                    <span>{selectedOsProject.type}</span>
                    <h3>{selectedOsProject.name}</h3>
                    <p>{selectedOsProject.summary}</p>
                    <div>{selectedOsProject.tech.map((tech) => <i key={tech}>{tech}</i>)}</div>
                    <button type="button" onClick={() => launchFromDesktop(osProject!)}>ENTER PROJECT PORTAL <ArrowUpRight /></button>
                  </div>
                </div>
              </article>
            )}

            <div className="os-taskbar">
              <span><Monitor size={17} /> SS.OS</span>
              <button type="button" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>CONTACT.EXE</button>
              <time>2026 // ONLINE</time>
            </div>
          </div>
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
          <div className="game-hud"><span>SCORE <b>{String(score).padStart(2, '0')}</b></span><span>BEST <b>{String(highScore).padStart(2, '0')}</b></span><span>TIME <b>{String(time).padStart(2, '0')}</b></span></div>
          <div className="game-field">
            <div className="game-grid" aria-hidden="true" />
            {gameActive ? (
              <>
                <button
                  className="spark-target"
                  type="button"
                  aria-label="Catch the spark"
                  onClick={catchSpark}
                  style={{ left: `${target.x}%`, top: `${target.y}%` }}
                >✦</button>
                {bursts.map((burst) => (
                  <span className="spark-burst" aria-hidden="true" key={burst.id} style={{ left: `${burst.x}%`, top: `${burst.y}%` }}>
                    {Array.from({ length: 8 }).map((_, index) => <i key={index} style={{ '--ray': index } as React.CSSProperties} />)}
                  </span>
                ))}
              </>
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

      {selectedProject && (
        <>
          <div className="os-backdrop" aria-hidden="true" onClick={() => setPortalProject(null)} />
          <section className={`project-portal project-layer project-portal-${selectedProject.color}`} role="dialog" aria-modal="true" aria-labelledby="project-portal-title" aria-describedby="project-portal-description">
            <h2 id="project-portal-title" className="sr-only">{selectedProject.name} project</h2>
            <p id="project-portal-description" className="sr-only">Details and external link for {selectedProject.name}.</p>
            <div className="portal-bar">
              <span>PROJECT PORTAL // {selectedProject.number}</span>
              <button ref={portalCloseRef} type="button" className="portal-close" aria-label="Close project portal" onClick={() => setPortalProject(null)}><X /></button>
            </div>
            <div className="portal-body">
              <div className={`portal-visual portal-visual-${selectedProject.art}`} aria-hidden="true">
                <span>{selectedProject.number}</span><i /><i /><i />
              </div>
              <div className="portal-copy">
                <p>{selectedProject.type} <span>— {selectedProject.result}</span></p>
                <h2>{selectedProject.name}</h2>
                <strong>THE MISSION</strong>
                <p>{selectedProject.summary} Built as a focused experiment in making complex technology feel immediate, visual, and human.</p>
                <div className="portal-tech">{selectedProject.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
                <a href={selectedProject.link} target="_blank" rel="noreferrer">OPEN LIVE PROJECT <ArrowUpRight /></a>
              </div>
            </div>
            <div className="portal-foot"><span>SHAILESH SETHI // SELECTED WORK</span><span>ESC TO RETURN</span></div>
          </section>
        </>
      )}

      <footer>
        <a className="brand" href="#top"><span className="brand-mark">SS</span><span>BACK TO TOP</span></a>
        <p>© 2026 SHAILESH SETHI. BUILT WITH CODE, CURIOSITY & TOO MUCH COFFEE.</p>
        <span>PORTFOLIO / 2026</span>
      </footer>
    </main>
  );
}
