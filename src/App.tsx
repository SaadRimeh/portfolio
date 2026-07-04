import { useEffect, useMemo, useState } from 'react'
import Saad from './assets/saad.jpg'
import './App.css'

type Project = {
  title: string
  description: string
  stack: string
  github?: string
  live?: string
}

// Live projects always first, then the rest
const allProjects: Project[] = [
  {
    title: 'GetAlphaBit — AI Assessment Platform',
    description:
      'Full-stack AI-driven platform that generates technical placement tests, auto-grades submissions, and delivers structured analytics dashboards.',
    stack: 'React, Node.js, Express, MongoDB, OpenAI, Clerk',
    live: 'https://getalphabitfrontend.onrender.com/admin',
  },
  {
    title: 'Barbershop Booking App',
    description:
      'Full-stack barbershop platform: production-ready Node.js API with role management, calendar conflict prevention, Cloudinary uploads, stock-controlled reservations, and cron jobs. Paired with a React Native mobile app.',
    stack: 'Node.js, Express, MongoDB, Clerk, Cloudinary, React Native',
    github: 'https://github.com/SaadRimeh/barbershop',
    live: 'https://www.mediafire.com/file/p1y2oqtivo857ws/app-release.apk/file',
  },
  {
    title: 'JS Nexus — Browser-Based JS IDE',
    description:
      'Fully-featured browser-based JavaScript IDE with syntax highlighting, an integrated terminal, real-time AI code completion powered by Ollama, and a zero-config offline AI setup flow.',
    stack: 'JavaScript, Ollama, AI Integration',
    github: 'https://github.com/SaadRimeh/Js-Nexus',
  },
  {
    title: 'Saloum App — React Native Mobile App',
    description:
      'Cross-platform mobile application built with React Native and TypeScript, featuring a clean modern UI and seamless navigation experience for end users.',
    stack: 'React Native, TypeScript, Mobile',
    github: 'https://github.com/SaadRimeh/SaloumApp',
  },
  {
    title: 'Study Zoom — Online Learning Platform',
    description:
      'Online learning platform connecting students and instructors with video sessions, course management, interactive dashboards, and real-time collaboration features.',
    stack: 'TypeScript, React, Node.js, Education',
    github: 'https://github.com/SaadRimeh/Study-Zoom',
  },
  {
    title: 'LapGenius — Laptop E-commerce',
    description:
      'Full-stack e-commerce marketplace for laptops with Arabic UX, AI-powered recommendations, admin panel, real-time chat between buyers and sellers, and WebSocket notifications.',
    stack: 'Node.js, React, MongoDB, Socket.IO',
    github: 'https://github.com/SaadRimeh/LapGenius',
  },
  {
    title: 'Gamza — Real-Time Chat Platform',
    description:
      'Real-time chat web app with Socket.IO, secure authentication, persistent message history, read receipts, and production-stable WebSocket infrastructure.',
    stack: 'React, Node.js, MongoDB, Socket.IO',
    github: 'https://github.com/SaadRimeh/Chat_App_FullStack',
  },
  {
    title: 'Personal Finance Tracker',
    description:
      'Lightweight budgeting app to track income and expenses, set monthly budgets, and visualize spending trends with interactive charts — all in one intuitive dashboard.',
    stack: 'TypeScript, React, Data Visualization',
    github: 'https://github.com/SaadRimeh/personal-finance',
  },
  {
    title: 'Task Manager — React Native App',
    description:
      'Mobile task management app built with React Native. Users can add, edit, delete, and track tasks with deadlines and progress monitoring.',
    stack: 'React Native, JavaScript, Mobile',
    github: 'https://github.com/SaadRimeh/-Task-Manager',
  },
  {
    title: 'XcodeFullStack — Mobile App Backend',
    description:
      'REST API ecosystem covering users, posts, comments, notifications, moderation workflows, Cloudinary uploads, and analytics insights.',
    stack: 'Node.js, Express, MongoDB, Cloudinary',
    github: 'https://github.com/SaadRimeh/Enginuity/tree/main/backend',
  },
  {
    title: 'React Native Wallet Backend',
    description:
      'Serverless Neon Postgres backend for transaction processing, balance tracking, and financial reporting summaries.',
    stack: 'Node.js, Express, Neon Postgres',
    github: 'https://github.com/SaadRimeh/React-Native-wallet',
  },
  {
    title: 'TravelEase — Travel Booking Site',
    description:
      'Full-stack travel booking site with Node.js REST API backend and JS frontend covering search, availability, booking, and cancellation.',
    stack: 'Node.js, JavaScript, Booking Workflows',
    github: 'https://github.com/SaadRimeh/fullstack-travelwebsite',
  },
  {
    title: 'Institute Management System API',
    description:
      'Production-ready backend for academic and administrative processes with clean architecture and maintainable module boundaries.',
    stack: 'Node.js, Express, Scalable API Design',
    github: 'https://github.com/SaadRimeh/institute-management-system',
  },
]

// Sort: live projects first
const projects = [...allProjects].sort((a, b) => {
  if (a.live && !b.live) return -1
  if (!a.live && b.live) return 1
  return 0
})

const techStack = [
  { name: 'Node.js', color: '#68d391' },
  { name: 'React', color: '#63b3ed' },
  { name: 'React Native', color: '#76e4f7' },
  { name: 'TypeScript', color: '#7f9cf5' },
  { name: 'JavaScript', color: '#f6e05e' },
  { name: 'Express', color: '#a0aec0' },
  { name: 'MongoDB', color: '#68d391' },
  { name: 'PostgreSQL', color: '#76e4f7' },
  { name: 'Socket.IO', color: '#fc8181' },
  { name: 'REST APIs', color: '#63b3ed' },
  { name: 'Cloudinary', color: '#f6ad55' },
  { name: 'Git & GitHub', color: '#a0aec0' },
]

const skills = [
  'Authentication & Authorization',
  'MongoDB & SQL Databases',
  'RESTful API Design',
  'Scalable Backend Architecture',
  'React Native Integration',
  'Socket.IO & Real-time Systems',
  'Cloudinary & File Storage',
  'Server Deployment & DevOps',
  'Version Control with Git',
  'Clean Code & Maintainability',
]

// Icons
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6V21c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.3.1 1.9 1.3 1.9 1.3 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6A4.7 4.7 0 0 1 5.7 8c-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0C17.4 4.6 18.4 5 18.4 5c.6 1.6.2 2.8.1 3.1a4.6 4.6 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
  </svg>
)

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
  </svg>
)

function App() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStack, setSelectedStack] = useState('All')
  const [showToTop, setShowToTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [toastMessage, setToastMessage] = useState('')

  const stackFilters = useMemo(() => {
    const uniqueStacks = new Set<string>()
    for (const project of projects) {
      for (const stackItem of project.stack.split(',')) {
        uniqueStacks.add(stackItem.trim())
      }
    }
    return ['All', ...Array.from(uniqueStacks)]
  }, [])

  const filteredProjects = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    return projects.filter((p) => {
      const matchSearch = !q || `${p.title} ${p.description} ${p.stack}`.toLowerCase().includes(q)
      const matchStack = selectedStack === 'All' || p.stack.split(',').some((s) => s.trim() === selectedStack)
      return matchSearch && matchStack
    })
  }, [searchTerm, selectedStack])

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target) }
        }
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.2, 0.4, 0.6] },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const update = () => {
      const y = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(h > 0 ? Math.min((y / h) * 100, 100) : 0)
      setShowToTop(y > 480)
      const delta = y - lastY
      if (Math.abs(delta) > 6) {
        setIsHeaderVisible(y < 80 ? true : delta < 0)
      }
      lastY = y
      ticking = false
    }
    const onScroll = () => { if (!ticking) { window.requestAnimationFrame(update); ticking = true } }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!toastMessage) return
    const id = window.setTimeout(() => setToastMessage(''), 2200)
    return () => window.clearTimeout(id)
  }, [toastMessage])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('Saad.rimeh.01@gmail.com')
      setToastMessage('Email copied to clipboard ✓')
    } catch {
      setToastMessage('Copy failed — please copy manually.')
    }
  }

  return (
    <div className="page-shell">
      <div className="bg-grid" aria-hidden="true" />
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />

      {/* ── Nav ── */}
      <header className={`top-nav ${isHeaderVisible ? 'is-visible' : 'is-hidden'}`}>
        <a className="brand" href="#home" aria-label="Go to top">
          <span className="brand-mark" aria-hidden="true">SR</span>
          <span className="brand-copy">
            <strong>Saad Rimeh</strong>
            <small>Full Stack Developer</small>
          </span>
        </a>
        <nav className="top-nav-links" aria-label="Primary navigation">
          <a className={activeSection === 'about' ? 'is-active' : ''} href="#about">About</a>
          <a className={activeSection === 'projects' ? 'is-active' : ''} href="#projects">Projects</a>
          <a className={activeSection === 'contact' ? 'is-active' : ''} href="#contact">Contact</a>
        </nav>
        <a className={`top-nav-cta ${activeSection === 'contact' ? 'is-active' : ''}`} href="#contact">
          Hire Me
        </a>
      </header>

      {/* ── Hero ── */}
      <section className="hero section reveal" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Full Stack &amp; Mobile Developer</p>
          <h1>Building products from API to interface — with depth on every layer.</h1>
          <p className="hero-summary">
            Full Stack Developer with 2+ years of experience, specializing in scalable Node.js backends
            while building complete web and mobile applications with React, React Native, and TypeScript.
            From database design to deployment — I ship products that work.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#projects">View Projects</a>
            <a className="secondary-btn" href="#contact">Let&apos;s Connect</a>
          </div>
          <dl className="hero-stats" aria-label="Experience highlights">
            <div><dt>2+</dt><dd>Years Experience</dd></div>
            <div><dt>13+</dt><dd>Projects Shipped</dd></div>
            <div><dt>Full</dt><dd>Stack Coverage</dd></div>
          </dl>
        </div>

        <aside className="hero-panel" aria-label="Profile summary">
          <img className="profile-picture" src={Saad} alt="Saad Rimeh — Full Stack Developer" />
          <div className="hero-meta">
            <p>🎓 Computer Engineer — Arab Academy for Science, Technology &amp; Maritime Transport</p>
            <p>📍 <span>Latakia, Syria</span></p>
            <p>🗓️ Born October 4, 2001</p>
          </div>
        </aside>
      </section>

      <main>
        {/* ── Tech Stack Strip ── */}
        <section className="tech-strip-section reveal" aria-label="Technologies">
          <div className="section" style={{ paddingTop: '1rem', paddingBottom: '2.5rem' }}>
            <p className="tech-strip-label">Tech I work with daily</p>
            <div className="tech-strip">
              {techStack.map((t) => (
                <span key={t.name} className="tech-badge" style={{ '--badge-color': t.color } as React.CSSProperties}>
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section className="section reveal" id="about">
          <div className="section-head">
            <p className="section-kicker">About</p>
            <h2>Full Stack expertise — with backend depth.</h2>
            <p className="section-intro">
              I build complete products from the ground up. My core strength is backend architecture with
              <strong> Node.js &amp; Express</strong>, but I&apos;m equally comfortable shipping
              polished frontends with <strong>React</strong> and <strong>TypeScript</strong>, or crafting
              cross-platform mobile apps with <strong>React Native</strong>. Every layer, every time.
            </p>
          </div>

          <div className="grid two-cols">
            <article className="info-card">
              <h3>What I Build</h3>
              <ul>
                <li>Scalable REST APIs with Node.js, Express &amp; MongoDB / PostgreSQL.</li>
                <li>Full-stack web apps with React, TypeScript &amp; modern UI patterns.</li>
                <li>Cross-platform mobile apps with React Native &amp; TypeScript.</li>
                <li>Real-time features using Socket.IO and WebSocket infrastructure.</li>
              </ul>
            </article>

            <article className="info-card">
              <h3>Training &amp; Certifications</h3>
              <p>Certified in software engineering by:</p>
              <ul className="plain-list">
                <li>Accenture Nordics</li>
                <li>J.P. Morgan</li>
                <li>Datacom</li>
              </ul>
            </article>
          </div>

          <article className="skills-card" style={{ marginTop: '1rem' }}>
            <h3>Core Skills</h3>
            <div className="skills-list">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        </section>

        {/* ── Projects ── */}
        <section className="section reveal" id="projects">
          <div className="section-head">
            <p className="section-kicker">Selected Work</p>
            <h2>Featured Projects</h2>
            <p className="section-intro">
              A curated set of backend and full-stack projects demonstrating production-ready APIs,
              system design, and practical product delivery.
            </p>
          </div>

          <div className="project-tools" aria-label="Project filters">
            <label className="project-search-label" htmlFor="project-search">Search Projects</label>
            <input
              id="project-search"
              className="project-search"
              type="search"
              placeholder="Search by name, description, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="project-filters" role="group" aria-label="Filter by stack">
              {stackFilters.map((opt) => (
                <button
                  key={opt}
                  className={`filter-chip ${selectedStack === opt ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => setSelectedStack(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, i) => (
              <article className={`project-card${project.live ? ' project-card--live' : ''}`} key={project.title}>
                <div className="project-card-top">
                  <p className="project-index">{String(i + 1).padStart(2, '0')}</p>
                  {project.live && <span className="live-badge">● Live</span>}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p className="project-stack">{project.stack}</p>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      GitHub <ExternalIcon />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live Demo <ExternalIcon />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <p className="project-empty">No projects matched your search or filter.</p>
          )}
        </section>

        {/* ── Contact ── */}
        <section className="section reveal" id="contact">
          <div className="section-head">
            <p className="section-kicker">Contact</p>
            <h2>Open to impactful backend opportunities.</h2>
            <p className="section-intro">
              Building something that needs a reliable, scalable backend? I&apos;d love to connect.
            </p>
            <div className="contact-actions">
              <button className="copy-email-btn" type="button" onClick={handleCopyEmail}>
                Copy Email
              </button>
              <a className="contact-mail-btn" href="mailto:Saad.rimeh.01@gmail.com">
                Send Email
              </a>
            </div>
          </div>

          <div className="contact-grid">
            <a href="mailto:Saad.rimeh.01@gmail.com" className="contact-item" aria-label="Email Saad Rimeh">
              <span className="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2v.5l9 6 9-6V7H3Zm18 11V9.9l-8.4 5.6a1 1 0 0 1-1.2 0L3 9.9V18h18Z" />
                </svg>
              </span>
              <div>
                <h3>Email</h3>
                <p>Saad.rimeh.01@gmail.com</p>
              </div>
            </a>

            <a href="https://wa.me/963992841046" target="_blank" rel="noreferrer" className="contact-item" aria-label="Message on WhatsApp">
              <span className="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12.04 2a9.96 9.96 0 0 0-8.62 14.95L2 22l5.2-1.36A10 10 0 1 0 12.04 2Zm0 18.17a8.1 8.1 0 0 1-4.12-1.12l-.3-.18-3.08.8.82-3-.2-.31A8.14 8.14 0 1 1 12.04 20.17Zm4.46-6.12c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.22-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.38.1-.5.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.42h-.46a.9.9 0 0 0-.64.3c-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.58 4.12 3.62.58.25 1.03.4 1.39.5.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.03.14-1.14-.06-.11-.22-.18-.46-.3Z" />
                </svg>
              </span>
              <div>
                <h3>WhatsApp</h3>
                <p>+963 992 841 046</p>
              </div>
            </a>

            <a href="https://github.com/SaadRimeh" target="_blank" rel="noreferrer" className="contact-item" aria-label="Visit GitHub profile">
              <span className="icon" aria-hidden="true">
                <GithubIcon />
              </span>
              <div>
                <h3>GitHub</h3>
                <p>SaadRimeh</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/saad-rimeh" target="_blank" rel="noreferrer" className="contact-item" aria-label="Visit LinkedIn profile">
              <span className="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79ZM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68Zm1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                </svg>
              </span>
              <div>
                <h3>LinkedIn</h3>
                <p>in/saad-rimeh</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Saad Rimeh — Built with React &amp; TypeScript</p>
      </footer>

      <button
        className={`to-top-btn ${showToTop ? 'show' : ''}`}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>

      {toastMessage && (
        <p className="floating-toast" role="status" aria-live="polite">{toastMessage}</p>
      )}
    </div>
  )
}

export default App
