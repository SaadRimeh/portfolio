import Icon from './Icon'

// Decorative, intentionally simplified product illustrations, not screenshots.
export default function ProjectVisual({ id }: { id: string }) {
  return (
    <div className={`project-visual visual-${id}`} aria-hidden="true">
      <span className="visual-caption">
        PRODUCT EXPLORATION /{' '}
        {id === 'nexus' ? 'DESKTOP' : id === 'ruscholar' ? 'WEB' : 'MOBILE'}
      </span>
      {id === 'nexus' && (
        <div className="editor-window">
          <div className="window-bar">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span>JS NEXUS</span>
            <Icon name="code" />
          </div>
          <div className="editor-body">
            <div className="editor-sidebar">
              <Icon name="layers" />
              <Icon name="search" />
              <Icon name="github" />
            </div>
            <div className="editor-content">
              <div className="editor-tab">
                JS <span>explore.js</span>
                <span>×</span>
              </div>
              <pre>
                <span className="code-comment">
                  // A little curiosity goes a long way.
                </span>
                {'\n\n'}
                <span className="code-purple">const</span>
                {' build = '}
                <span className="code-purple">async</span>
                {' () => {\n  '}
                <span className="code-purple">const</span>
                {' idea = '}
                <span className="code-green">'something useful'</span>
                {';\n  '}
                <span className="code-purple">await</span>
                {' bringToLife(idea);\n\n  '}
                <span className="code-purple">return</span>{' '}
                <span className="code-green">'keep creating'</span>
                {';\n};'}
              </pre>
              <div className="editor-terminal">
                <span>TERMINAL</span>
                <p>
                  <b>❯</b> Ready when you are.
                </p>
              </div>
            </div>
          </div>
          <div className="editor-status">
            <span>⎇ main</span>
            <span>Local AI · Ollama</span>
          </div>
        </div>
      )}
      {id === 'ruscholar' && (
        <>
          <span className="scholar-orbit orbit-one" />
          <span className="scholar-orbit orbit-two" />
          <div className="scholar-card">
            <span className="scholar-wordmark">
              r<span>u</span>scholar<span className="scholar-star">✳</span>
            </span>
            <span className="mini-label">A LITTLE LEARNING, EVERY DAY</span>
            <div className="translation">
              <span>знание</span>
              <Icon name="arrow" />
              <strong>knowledge</strong>
            </div>
            <div className="flashcard-line" />
            <p>Your next chapter starts with a word.</p>
            <span className="mini-cta">
              Keep learning <Icon name="arrow" />
            </span>
          </div>
          <div className="scholar-tag">
            <Icon name="check" /> Translate. Understand. Remember.
          </div>
        </>
      )}
      {id === 'salloum' && (
        <>
          <div className="barber-lettering">
            <span>THE ART OF</span>
            <strong>
              Looking
              <br />
              <em>your best.</em>
            </strong>
            <span>SALLOUM / BARBERSHOP</span>
          </div>
          <div className="phone phone-barber">
            <div className="phone-island" />
            <div className="barber-app">
              <div className="mini-nav">
                S. <span>EN / ع</span>
              </div>
              <span className="mini-label">YOUR NEXT APPOINTMENT</span>
              <h4>A fresh start.</h4>
              <div className="barber-art">
                <span>✂</span>
                <i />
              </div>
              <p>Find your signature style.</p>
              <div className="service-line">
                <span>Haircut & styling</span>
                <Icon name="external" />
              </div>
              <span className="mini-cta">
                Explore appointments <Icon name="arrow" />
              </span>
            </div>
          </div>
        </>
      )}
      {id === 'wateera' && (
        <>
          <div className="wateera-ring ring-one" />
          <div className="wateera-ring ring-two" />
          <div className="wateera-wordmark">
            وتيرة<span>wateera</span>
          </div>
          <div className="phone phone-wateera">
            <div className="phone-island" />
            <div className="wateera-app">
              <span className="mini-label">A LITTLE MORE INTENTIONAL</span>
              <h4>
                Make today
                <br />a good day.
              </h4>
              <div className="focus-widget">
                <Icon name="sun" />
                <span>
                  One thing at a time.<small>Your space to focus</small>
                </span>
              </div>
              <div className="mini-label day-label">YOUR DAILY RHYTHM</div>
              {[
                'Learn something new',
                'Make time to move',
                'Build what matters',
              ].map((task, i) => (
                <div className="task-line" key={task}>
                  <span
                    className={i === 0 ? 'mini-check checked' : 'mini-check'}
                  >
                    {i === 0 && <Icon name="check" />}
                  </span>
                  {task}
                </div>
              ))}
              <div className="mini-bottom-nav">
                <Icon name="layers" />
                <Icon name="sun" />
                <Icon name="globe" />
              </div>
            </div>
          </div>
          <span className="wateera-note">
            Your day.
            <br />
            At your pace.
          </span>
        </>
      )}
    </div>
  )
}
