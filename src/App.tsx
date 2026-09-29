import { useEffect, useMemo, useRef, useState } from 'react'
import Saad from './assets/saad.jpg'
import Icon from './components/Icon'
import ProjectVisual from './components/ProjectVisual'
import { categories, filterProjects, projects } from './data/projects'
import type { Category, Project } from './data/projects'
import './App.css'

const email = 'saad.rimeh.01@gmail.com'
const github = 'https://github.com/SaadRimeh'
const featured = projects.filter((project) => project.featured)
const navigation = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]
const capabilities = [
  {
    number: '01',
    icon: 'mobile' as const,
    title: 'Mobile experiences',
    description:
      'Cross-platform apps that feel considered, from the first tap to everyday use.',
    tools: ['React Native', 'Expo', 'TypeScript'],
  },
  {
    number: '02',
    icon: 'globe' as const,
    title: 'Web & desktop products',
    description:
      'Responsive interfaces and useful tools that make complex tasks feel simple.',
    tools: ['React', 'Electron', 'JavaScript'],
  },
  {
    number: '03',
    icon: 'layers' as const,
    title: 'The systems underneath',
    description:
      'APIs, authentication, and data models that connect the whole experience.',
    tools: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
  },
]

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} live app (new tab)`}
        >
          Live app <Icon name="external" />
        </a>
      )}
      <a
        href={`${github}/${project.repository}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} source on GitHub (new tab)`}
      >
        <Icon name="github" /> Source code
      </a>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('All projects')
  const [visibleCount, setVisibleCount] = useState(6)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  )
  const [toastVersion, setToastVersion] = useState(0)
  const searchRef = useRef<HTMLInputElement>(null)
  const pendingFocus = useRef<string | null>(null)
  const filtered = useMemo(
    () => filterProjects(query, category),
    [query, category],
  )
  const visibleProjects = filtered.slice(0, visibleCount)
  const hasFilters = Boolean(query || category !== 'All projects')

  useEffect(() => {
    let frame = 0
    const updateSection = () => {
      const sections = ['home', ...navigation.map((section) => section.id)]
      let current = 'home'
      const line = Math.min(window.innerHeight * 0.3, 240)
      for (const id of sections) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= line) current = id
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 8
      )
        current = 'contact'
      setActiveSection(current)
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateSection)
    }
    updateSection()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!pendingFocus.current) return
    document
      .getElementById(`project-${pendingFocus.current}`)
      ?.focus({ preventScroll: true })
    pendingFocus.current = null
  }, [visibleCount])

  useEffect(() => {
    if (copyStatus === 'idle') return
    const timeout = window.setTimeout(() => setCopyStatus('idle'), 4000)
    return () => window.clearTimeout(timeout)
  }, [copyStatus, toastVersion])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
    setToastVersion((version) => version + 1)
  }

  function clearFilters() {
    setQuery('')
    setCategory('All projects')
    setVisibleCount(6)
    searchRef.current?.focus()
  }

  function showMoreProjects() {
    pendingFocus.current = filtered[visibleCount]?.id ?? null
    setVisibleCount((count) => count + 6)
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner container">
          <a className="brand" href="#home" aria-label="Saad Rimeh, home">
            <span className="brand-mark">
              sr<span>.</span>
            </span>
            <span className="brand-name">
              Saad Rimeh<span>DEVELOPER & BUILDER</span>
            </span>
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            {navigation.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? 'location' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <a className="header-contact" href={`mailto:${email}`}>
            Let’s talk <Icon name="external" />
          </a>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section
          className="hero container"
          id="home"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> OPEN TO WORK & COLLABORATION
            </p>
            <p className="hero-intro">
              Hi, I’m Saad. A mobile & full-stack developer.
            </p>
            <h1 id="hero-title">
              Thoughtful software.
              <br />
              Built <em>end to end.</em>
            </h1>
            <p className="hero-description">
              I turn ideas into useful digital experiences. From the interface
              you touch to the systems behind it, I build for the details that
              matter.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore my work <Icon name="arrow" />
              </a>
              <a
                className="text-link"
                href={github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="github" /> Find me on GitHub{' '}
                <Icon name="external" />
              </a>
            </div>
            <div className="hero-footnote">
              <span>
                <Icon name="globe" /> Based in Latakia, Syria
              </span>
              <span>Working across mobile, web & desktop</span>
            </div>
          </div>
          <div className="portrait-composition">
            <div className="portrait-backdrop" />
            <div className="portrait-frame">
              <img
                src={Saad}
                alt="Saad Rimeh"
                width="480"
                height="600"
                fetchPriority="high"
              />
            </div>
            <span className="portrait-cross" aria-hidden="true">
              ✳
            </span>
            <div className="portrait-note">
              <span className="note-mark">
                <Icon name="code" />
              </span>
              <span>
                Good ideas deserve
                <br />
                <strong>thoughtful execution.</strong>
              </span>
            </div>
            <span className="portrait-caption">
              ENGINEER BY TRAINING. BUILDER BY NATURE.
            </span>
          </div>
        </section>

        <div className="technology-strip">
          <div className="container technology-inner">
            <span className="strip-label">MY EVERYDAY TOOLKIT</span>
            <div className="technology-names">
              <span>React Native</span>
              <span>TypeScript</span>
              <span>React</span>
              <span>Node.js</span>
              <span>PostgreSQL</span>
              <span>MongoDB</span>
            </div>
          </div>
        </div>

        <section
          className="work-section container section-space"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow section-label">01 / SELECTED WORK</p>
              <h2 id="work-title">
                Ideas turned into <em>real things.</em>
              </h2>
            </div>
            <p>
              A few projects that show how I think,
              <br className="desktop-break" /> build, and bring the pieces
              together.
            </p>
          </div>
          <div className="featured-grid">
            {featured.map((project, index) => (
              <article className="featured-card" key={project.id}>
                <ProjectVisual id={project.id} />
                <div className="featured-body">
                  <div className="project-meta">
                    <span>
                      {String(index + 1).padStart(2, '0')} / {project.category}
                    </span>
                    {project.live && (
                      <span className="live-label">
                        <span className="status-dot" /> LIVE APP
                      </span>
                    )}
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-description">{project.description}</p>
                  <ul
                    className="tags"
                    aria-label={`${project.title} technologies`}
                  >
                    {project.tags.slice(0, 4).map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <ProjectLinks project={project} />
                </div>
              </article>
            ))}
          </div>

          <div className="project-library" id="all-projects">
            <div className="library-heading">
              <div>
                <p className="eyebrow section-label">THE FULL COLLECTION</p>
                <h3>
                  More to explore
                  <span className="count-badge">{projects.length}</span>
                </h3>
              </div>
              <a
                className="text-link"
                href={`${github}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
              >
                All repositories <Icon name="external" />
              </a>
            </div>
            <div className="library-controls">
              <div
                className="filters"
                role="group"
                aria-label="Filter projects by category"
              >
                {categories.map((option) => (
                  <button
                    type="button"
                    key={option}
                    aria-pressed={category === option}
                    onClick={() => {
                      setCategory(option)
                      setVisibleCount(6)
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="search-field">
                <Icon name="search" />
                <label className="sr-only" htmlFor="project-search">
                  Search projects by name or technology
                </label>
                <input
                  ref={searchRef}
                  id="project-search"
                  type="search"
                  placeholder="Search projects or technologies"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setVisibleCount(6)
                  }}
                />
              </div>
            </div>
            <div className="results-summary">
              <p role="status" aria-live="polite" aria-atomic="true">
                Showing {Math.min(visibleCount, filtered.length)} of{' '}
                {filtered.length}{' '}
                {filtered.length === 1 ? 'project' : 'projects'}
                {category !== 'All projects' ? ` in ${category}` : ''}
                {query.trim() ? ` for “${query.trim()}”` : ''}
              </p>
              {hasFilters && (
                <button type="button" onClick={clearFilters}>
                  Clear filters <Icon name="close" />
                </button>
              )}
            </div>
            {filtered.length ? (
              <div className="library-grid">
                {visibleProjects.map((project) => (
                  <article className="library-card" key={project.id}>
                    <div className="library-card-top">
                      <span className="category-icon">
                        <Icon
                          name={
                            project.category === 'Mobile'
                              ? 'mobile'
                              : project.category === 'Web'
                                ? 'globe'
                                : project.category === 'Desktop'
                                  ? 'code'
                                  : 'layers'
                          }
                        />
                      </span>
                      <span className="category-label">{project.category}</span>
                    </div>
                    <h4 id={`project-${project.id}`} tabIndex={-1}>
                      {project.title}
                    </h4>
                    <p>{project.description}</p>
                    <ul
                      className="tags"
                      aria-label={`${project.title} technologies`}
                    >
                      {project.tags.slice(0, 3).map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <ProjectLinks project={project} />
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Icon name="search" />
                <h4>No projects found</h4>
                <p>
                  Try another name, a technology like “React”, or clear your
                  filters.
                </p>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={clearFilters}
                >
                  Reset filters <Icon name="arrow" />
                </button>
              </div>
            )}
            {filtered.length > visibleCount && (
              <div className="load-more">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={showMoreProjects}
                >
                  Show more projects{' '}
                  <span>+{Math.min(6, filtered.length - visibleCount)}</span>
                </button>
              </div>
            )}
          </div>
        </section>

        <section
          className="about-section section-space"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="container">
            <div className="about-intro">
              <div>
                <p className="eyebrow section-label">
                  02 / THE PERSON BEHIND THE CODE
                </p>
                <h2 id="about-title">
                  A builder’s mindset.
                  <br />
                  <em>An engineer’s foundation.</em>
                </h2>
              </div>
              <div className="about-copy">
                <p>
                  I’m a computer engineer based in Latakia, Syria, with a focus
                  on mobile and full-stack development. I enjoy understanding
                  the whole product: what people need, how it should feel, and
                  how the pieces work together.
                </p>
                <p>
                  My projects span education, personal finance, productivity,
                  and developer tools. I’m especially interested in offline
                  experiences, Arabic/English interfaces, and software that
                  makes everyday life a little easier.
                </p>
                <div className="education">
                  <span className="education-marker" />
                  <div>
                    <strong>Computer Engineering</strong>
                    <span>
                      Arab Academy for Science, Technology & Maritime Transport
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="capability-grid">
              {capabilities.map((item) => (
                <article className="capability" key={item.number}>
                  <div className="capability-top">
                    <Icon name={item.icon} />
                    <span>{item.number}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul className="tags" aria-label={`${item.title} tools`}>
                    {item.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="approach">
              <span className="eyebrow">HOW I LIKE TO WORK</span>
              <p>
                Understand the problem.<span aria-hidden="true">↗</span> Build
                with intention.<span aria-hidden="true">↗</span> Refine the
                details.
              </p>
            </div>
          </div>
        </section>

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="container">
            <div className="contact-heading">
              <div>
                <p className="eyebrow">
                  <span className="status-dot" /> OPEN TO WHAT’S NEXT
                </p>
                <h2 id="contact-title">
                  Have an idea?
                  <br />
                  Let’s make it <em>happen.</em>
                </h2>
              </div>
              <div className="contact-copy">
                <p>
                  A product to build, a problem to solve, or a team to join.
                  <br />
                  I’d love to hear what you have in mind.
                </p>
                <a className="button button-light" href={`mailto:${email}`}>
                  Start a conversation <Icon name="external" />
                </a>
              </div>
            </div>
            <div className="contact-details">
              <div className="email-contact">
                <span className="contact-label">DROP ME A LINE</span>
                <div>
                  <a href={`mailto:${email}`}>{email}</a>
                  <button
                    className="copy-button"
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    title="Copy email address"
                  >
                    <Icon name={copyStatus === 'copied' ? 'check' : 'copy'} />
                  </button>
                </div>
                <p className="copy-feedback" role="status" aria-live="polite">
                  {copyStatus === 'copied'
                    ? 'Email copied. Talk soon!'
                    : copyStatus === 'failed'
                      ? `Could not copy. You can select the address above or email ${email}.`
                      : ''}
                </p>
              </div>
              <div className="social-links">
                <a href={github} target="_blank" rel="noopener noreferrer">
                  GitHub <Icon name="external" />
                </a>
                <a
                  href="https://www.linkedin.com/in/saad-rimeh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn <Icon name="external" />
                </a>
                <a
                  href="https://wa.me/963992841046"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp <Icon name="external" />
                </a>
              </div>
            </div>
            <footer className="site-footer">
              <a className="footer-brand" href="#home">
                Saad Rimeh<span>.</span>
              </a>
              <p>
                © {new Date().getFullYear()} · Built with care, React &
                TypeScript.
              </p>
              <a className="back-to-top" href="#home">
                Back to top <Icon name="arrow" />
              </a>
            </footer>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
