import { LEVELS, SITES } from '../data'
import Footer from './Footer'

export default function ResourcesView() {
  return (
    <section id="resources-view" className="view active">
      <div className="view-head">
        <span className="lvl-num mono">SOURCES</span>
        <h2>The sites this was built from</h2>
        <p>
          Every link on this page came from one of these five. Browse a site directly if you'd rather stay in its
          structure.
        </p>
      </div>
      <div className="site-grid">
        {SITES.map(s => {
          let free = 0, paid = 0, unknown = 0
          LEVELS.forEach(l => l.topics.forEach(t => t.resources.forEach(r => {
            if (r.site === s.name) {
              if (r.status === 'free') free++
              else if (r.status === 'paid') paid++
              else unknown++
            }
          })))
          return (
            <div key={s.name} className="site-card">
              <h3>{s.name}</h3>
              <a className="base" href={s.base} target="_blank" rel="noopener noreferrer">{s.base}</a>
              <p>{s.desc}</p>
              <div className="site-tally">
                <span><b>{free}</b> free</span>
                <span><b>{paid}</b> paid</span>
                {unknown > 0 && <span><b>{unknown}</b> unknown</span>}
              </div>
            </div>
          )
        })}
      </div>
      <Footer />
    </section>
  )
}