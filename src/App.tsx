import { useEffect } from 'react'
import Saad from './assets/saad.jpg'
import './App.css'

type Project = {
  title: string
  description: string
  github: string
}

const projects: Project[] = [
  {
    title: 'Gamza - Full-Stack Chat Application',
    description:
      'Real-time chat app built with React, Express, MongoDB, and Socket.IO with secure authentication and production-ready architecture.',
    github: 'https://github.com/SaadRimeh/Chat_App_FullStack',
  },
  {
    title: 'XcodeFullStack - Backend API for Mobile App',
    description:
      'REST API for users, posts, comments, notifications, moderation workflows, Cloudinary uploads, and analytics insights.',
    github: 'https://github.com/SaadRimeh/Enginuity/tree/main/backend',
  },
  {
    title: 'LapGenius - Laptop E-commerce Platform',
    description:
      'Full-stack platform with responsive Arabic UI, AI-powered recommendations, admin tools, and real-time order handling.',
    github: 'https://github.com/SaadRimeh/LapGenius',
  },
  {
    title: 'React Native Wallet Backend',
    description:
      'Node.js and Express backend using Neon serverless Postgres for transaction processing, balance tracking, and summaries.',
    github: 'https://github.com/SaadRimeh/React-Native-wallet',
  },
  {
    title: 'TravelEase - Travel Booking Website',
    description:
      'Travel booking solution with Node.js backend and vanilla JS frontend for search, availability checks, booking, and cancellation flows.',
    github: 'https://github.com/SaadRimeh/fullstack-travelwebsite',
  },
  {
    title: 'NextScale API Gateway (Upcoming)',
    description:
      'Placeholder for a future project focused on secure service orchestration, observability, and high-throughput API routing.',
    github: 'https://github.com/SaadRimeh',
  },
]

const skills = [
  'User authentication & authorization systems',
  'Database management (MongoDB, SQL)',
  'Scalable & performant back-end design',
  'RESTful API integration with front-end applications',
  'React Native integration',
  'Server configuration & deployment',
  'Version control (Git & GitHub)',
]

function App() {
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

  return (
    <div className="page-shell">
      <div className="animated-bg" aria-hidden="true" />

      <header className="hero section reveal" id="home">
        <img
          className="profile-picture"
          src={Saad}
          alt="Saad Rimeh profile"
        />
        <p className="eyebrow">Node.js Developer</p>
        <h1>Saad Rimeh</h1>
        <p className="hero-summary">
          Motivated Node.js developer with experience in building scalable backend APIs and full-stack
          applications.
        </p>
        <div className="hero-meta" aria-label="Personal details">
          <p>Graduated Computer Engineer from Arab Academy for Science, Technology and Maritime Transport.</p>
          <p>Based in Latakia, Syria</p>
          <p>Date of birth: October, 4, 2001</p>
        </div>
        <a className="primary-btn" href="#projects">
          View Projects
        </a>
      </header>

      <main>
        <section className="section reveal" id="about">
          <h2>About & Experience</h2>
          <p>
            More than 2 years of professional experience in Back-End development using Node.js and building
            RESTful APIs for web and mobile applications, from requirement analysis to deployment and
            maintenance.
          </p>

          <div className="grid two-cols">
            <article className="info-card">
              <h3>Key Achievements</h3>
              <ul>
                <li>Developed more than 25 projects using Node.js, Express, and MongoDB.</li>
                <li>Built complete API systems and integrated them with React Native applications.</li>
                <li>Focused on security, server architecture, and scalability.</li>
              </ul>
            </article>

            <article className="info-card">
              <h3>Training & Certifications</h3>
              <p>Certified in Software Engineering from:</p> <br />
                 <p>Accenture Nordics</p><br />
                 <p>J.P. Morgan</p><br />
                 <p>Datacom</p>
            </article>
          </div>

          <article className="skills-card">
            <h3>Skills</h3>
            <div className="skills-list">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        </section>

        <section className="section reveal" id="projects">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.github} target="_blank" rel="noreferrer">
                  GitHub Link
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="contact">
          <h2>Contact</h2>
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
              href="https://wa.me/963943366764"
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
                <p>+963943366764</p>
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
    </div>
  )
}

export default App
