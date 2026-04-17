import { useEffect, useMemo, useState } from 'react'
import Saad from './assets/saad.jpg'
import './App.css'

type Project = {
  title: string
  description: string
  stack: string
  github: string
}

const projects: Project[] = [
  {
    title: 'Gamza - Full-Stack Chat Web Site',
    description:
      'Real-time chat platform built with React, Express, MongoDB, and Socket.IO, focused on secure authentication and production stability.',
    stack: 'React, Node.js, MongoDB, Socket.IO',
    github: 'https://github.com/SaadRimeh/Chat_App_FullStack',
  },
  {
    title: 'XcodeFullStack - Backend API for Mobile App',
    description:
      'REST API ecosystem for users, posts, comments, notifications, moderation workflows, Cloudinary uploads, and analytics insights.',
    stack: 'Node.js, Express, MongoDB, Cloudinary',
    github: 'https://github.com/SaadRimeh/Enginuity/tree/main/backend',
  },
  {
    title: 'LapGenius - Laptop E-commerce Platform',
    description:
      'Full-stack e-commerce solution with responsive Arabic UX, AI-powered recommendations, admin tooling, and real-time order handling.',
    stack: 'Node.js, React, MongoDB, Admin Tools',
    github: 'https://github.com/SaadRimeh/LapGenius',
  },
  {
    title: 'React Native Wallet Backend',
    description:
      'Node.js and Express backend using Neon serverless Postgres for transaction processing, balance tracking, and reporting summaries.',
    stack: 'Node.js, Express, Neon Postgres',
    github: 'https://github.com/SaadRimeh/React-Native-wallet',
  },
  {
    title: 'TravelEase - Travel Booking Website',
    description:
      'Travel booking workflow with Node.js backend and vanilla JavaScript frontend for search, availability, booking, and cancellation flows.',
    stack: 'Node.js, JavaScript, Booking Workflows',
    github: 'https://github.com/SaadRimeh/fullstack-travelwebsite',
  },
  {
    title: 'Institute Management System API',
    description:
      'Production-ready backend covering core academic and administrative processes with clean architecture and maintainable module boundaries.',
    stack: 'Node.js, Express, Scalable API Design',
    github: 'https://github.com/SaadRimeh/institute-management-system',
  },
]

const skills = [
  'User authentication and authorization systems',
  'Database management (MongoDB and SQL)',
  'Scalable and performant backend architecture',
  'RESTful API integration with web and mobile apps',
  'React Native backend integration',
  'Server configuration and deployment',
  'Version control with Git and GitHub',
]

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
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return projects.filter((project) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        `${project.title} ${project.description} ${project.stack}`.toLowerCase().includes(normalizedSearch)

      const matchesStack =
        selectedStack === 'All' || project.stack.split(',').some((stackItem) => stackItem.trim() === selectedStack)

      return matchesSearch && matchesStack
    })
  }, [searchTerm, selectedStack])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.2 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.2, 0.4, 0.6],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollUi = () => {
      const currentScrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = documentHeight > 0 ? Math.min((currentScrollY / documentHeight) * 100, 100) : 0

      setScrollProgress(progress)
      setShowToTop(currentScrollY > 480)

      const delta = currentScrollY - lastScrollY
      if (Math.abs(delta) > 6) {
        if (currentScrollY < 80) {
          setIsHeaderVisible(true)
        } else {
          setIsHeaderVisible(delta < 0)
        }
      }

      lastScrollY = currentScrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollUi)
        ticking = true
      }
    }

    updateScrollUi()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!toastMessage) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage('')
    }, 2200)

    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('Saad.rimeh.01@gmail.com')
      setToastMessage('Email copied to clipboard.')
    } catch {
      setToastMessage('Copy failed. Please copy manually.')
    }
  }

  return (
    <div className="page-shell">
      <div className="luxury-noise" aria-hidden="true" />
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />

      <header className={`top-nav ${isHeaderVisible ? 'is-visible' : 'is-hidden'}`}>
        <a className="brand" href="#home" aria-label="Go to top">
          <span className="brand-mark" aria-hidden="true">
            SR
          </span>
          <span className="brand-copy">
            <strong>Saad Rimeh</strong>
            <small>Node.js Backend Engineer</small>
          </span>
        </a>
        <nav className="top-nav-links" aria-label="Primary navigation">
          <a className={activeSection === 'about' ? 'is-active' : ''} href="#about">
            About
          </a>
          <a className={activeSection === 'projects' ? 'is-active' : ''} href="#projects">
            Projects
          </a>
        </nav>
        <a className={`top-nav-cta ${activeSection === 'contact' ? 'is-active' : ''}`} href="#contact">
          Hire Me
        </a>
      </header>

      <section className="hero section reveal" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Node.js Developer</p>
          <h1>Building backend systems with clarity, speed, and long-term reliability.</h1>
          <p className="hero-summary">
            Motivated backend engineer with over 2 years of experience delivering scalable APIs and full-stack
            applications from requirement analysis to deployment.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#projects">
              View Projects
            </a>
            <a className="secondary-btn" href="#contact">
              Let&apos;s Connect
            </a>
          </div>
          <dl className="hero-stats" aria-label="Experience highlights">
            <div>
              <dt>2+</dt>
              <dd>Years Experience</dd>
            </div>
            <div>
              <dt>30+</dt>
              <dd>Projects Built</dd>
            </div>
            <div>
              <dt>100%</dt>
              <dd>API Focused</dd>
            </div>
          </dl>
        </div>

        <aside className="hero-panel" aria-label="Profile summary">
          <img className="profile-picture" src={Saad} alt="Saad Rimeh profile" />
          <div className="hero-meta">
            <p>Graduated Computer Engineer from Arab Academy for Science, Technology and Maritime Transport.</p>
            <p>Based in Latakia, Syria.</p>
            <p>Date of birth: October 4, 2001.</p>
          </div>
        </aside>
      </section>

      <main>
        <section className="section reveal" id="about">
          <div className="section-head">
            <p className="section-kicker">About</p>
            <h2>Precision engineering for products that need dependable backend foundations.</h2>
            <p className="section-intro">
              More than 2 years of professional experience in backend development with Node.js, building robust
              RESTful APIs for web and mobile products with an emphasis on security, maintainability, and scale.
            </p>
          </div>

          <div className="grid two-cols">
            <article className="info-card">
              <h3>Key Achievements</h3>
              <ul>
                <li>Developed over 30 projects using Node.js, Express, and MongoDB.</li>
                <li>Built complete API systems and integrated them with React Native applications.</li>
                <li>Prioritized security, clean architecture, and scalable server-side performance.</li>
              </ul>
            </article>

            <article className="info-card">
              <h3>Training and Certifications</h3>
              <p>Certified in software engineering by:</p>
              <ul className="plain-list">
                <li>Accenture Nordics</li>
                <li>J.P. Morgan</li>
                <li>Datacom</li>
              </ul>
            </article>
          </div>

          <article className="skills-card">
            <h3>Core Skills</h3>
            <div className="skills-list">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        </section>

        <section className="section reveal" id="projects">
          <div className="section-head">
            <p className="section-kicker">Selected Work</p>
            <h2>Featured Projects</h2>
            <p className="section-intro">
              A curated set of backend and full-stack projects demonstrating production-ready APIs, system design,
              and practical product delivery.
            </p>
          </div>

          <div className="project-tools" aria-label="Project filters">
            <label className="project-search-label" htmlFor="project-search">
              Search Projects
            </label>
            <input
              id="project-search"
              className="project-search"
              type="search"
              placeholder="Search by project name, description, or tech..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <div className="project-filters" role="group" aria-label="Filter projects by stack">
              {stackFilters.map((stackOption) => (
                <button
                  key={stackOption}
                  className={`filter-chip ${selectedStack === stackOption ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => setSelectedStack(stackOption)}
                >
                  {stackOption}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <p className="project-index">{String(index + 1).padStart(2, '0')}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p className="project-stack">{project.stack}</p>
                <a href={project.github} target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
              </article>
            ))}
          </div>
          {filteredProjects.length === 0 ? (
            <p className="project-empty">No projects matched this search or filter.</p>
          ) : null}
        </section>

        <section className="section reveal" id="contact">
          <div className="section-head">
            <p className="section-kicker">Contact</p>
            <h2>Open to impactful backend and full-stack opportunities.</h2>
            <p className="section-intro">
              If you are building products that value reliability and scalable architecture, I would be happy to
              connect.
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
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2v.5l9 6 9-6V7H3Zm18 11V9.9l-8.4 5.6a1 1 0 0 1-1.2 0L3 9.9V18h18Z" />
                </svg>
              </span>
              <div>
                <h3>Email</h3>
                <p>Saad.rimeh.01@gmail.com</p>
              </div>
            </a>

            <a
              href="https://wa.me/963992841046"
              target="_blank"
              rel="noreferrer"
              className="contact-item"
              aria-label="Message on WhatsApp"
            >
              <span className="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M12.04 2a9.96 9.96 0 0 0-8.62 14.95L2 22l5.2-1.36A10 10 0 1 0 12.04 2Zm0 18.17a8.1 8.1 0 0 1-4.12-1.12l-.3-.18-3.08.8.82-3-.2-.31A8.14 8.14 0 1 1 12.04 20.17Zm4.46-6.12c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.22-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.38.1-.5.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.42h-.46a.9.9 0 0 0-.64.3c-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.58 4.12 3.62.58.25 1.03.4 1.39.5.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.03.14-1.14-.06-.11-.22-.18-.46-.3Z" />
                </svg>
              </span>
              <div>
                <h3>WhatsApp</h3>
                <p>+963 992 841 046</p>
              </div>
            </a>

            <a
              href="https://github.com/SaadRimeh"
              target="_blank"
              rel="noreferrer"
              className="contact-item"
              aria-label="Visit GitHub profile"
            >
              <span className="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6V21c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.3.1 1.9 1.3 1.9 1.3 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6A4.7 4.7 0 0 1 5.7 8c-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0C17.4 4.6 18.4 5 18.4 5c.6 1.6.2 2.8.1 3.1a4.6 4.6 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
                </svg>
              </span>
              <div>
                <h3>GitHub</h3>
                <p>SaadRimeh</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      <button
        className={`to-top-btn ${showToTop ? 'show' : ''}`}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
      {toastMessage ? (
        <p className="floating-toast" role="status" aria-live="polite">
          {toastMessage}
        </p>
      ) : null}
    </div>
  )
}

export default App
