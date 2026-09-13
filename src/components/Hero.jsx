import { LEVELS, SITES } from '../data'
import { bestFreeIndex } from '../utils'

const START_PICKS = [
  ['L1', 'Client-Server Architecture'],
  ['L0', 'Networking Essentials (HTTP, DNS, TCP)'],
  ['L1', 'Caching'],
  ['L1', 'Scalability'],
  ['L2', 'Sharding / Data Partitioning'],
  ['L2', 'Consistent Hashing'],
  ['L2', 'CAP Theorem'],
  ['L2', 'Rate Limiting'],
  ['L4', 'URL Shortener'],
  ['L4', 'Chat System'],
]

export default function Hero({ totalTopics, totalFree, coveredCount, pct, onJump, isCovered, onOpen }) {
  return (
    <div className="hero" id="hero">
      <span className="kicker">FOR ENGINEERS PREPPING SYSTEM DESIGN &amp; LLD</span>
      <h1>Every resource we could find, mapped to one learning path.</h1>
      <p className="lede">
        Five sites' worth of courses, collapsed into one order: what to learn first, which free lesson covers it best,
        and where the paid stuff sits if you want to go deeper.
      </p>
      <div className="hero-ctas">
        <a className="primary" href="#roadmap" onClick={e => { e.preventDefault(); onJump('roadmap') }}>View the Roadmap</a>
        <a href="#path" onClick={e => { e.preventDefault(); onJump('path') }}>Browse the Learning Path</a>
        <a href="#resources" onClick={e => { e.preventDefault(); onJump('resources') }}>See the Sources</a>
      </div>
      <div className="stats-row">
        <div className="stat"><b>{totalTopics}</b><span>canonical topics</span></div>
        <div className="stat"><b>{totalFree}</b><span>free resources linked</span></div>
        <div className="stat"><b>{coveredCount}</b><span>topics covered</span></div>
        <div className="stat"><b>{SITES.length}</b><span>source sites, one place</span></div>
      </div>

      <div className="progress-wrap">
        <div className="progress-label mono">
          <span>Your progress</span>
          <span><b>{coveredCount} / {totalTopics} · {pct}%</b></span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: pct + '%' }} />
        </div>
      </div>

      <div className="start-here">
        <h3>Start here — <span className="mono">if you only do ten things</span></h3>
        <ol className="step-line" id="start-here-list">
          {START_PICKS.map(([lvlId, name], i) => {
            const level = LEVELS.find(l => l.id === lvlId)
            const topic = level.topics.find(t => t.name === name)
            const idx = bestFreeIndex(topic.resources)
            const r = topic.resources[idx !== -1 ? idx : 0]
            const done = isCovered(topic)
            return (
              <li
                key={topic.name}
                className={done ? 'covered' : ''}
                onClick={e => {
                  if (e.target.closest('a')) return
                  onOpen(topic)
                }}
              >
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <a className="res-link" href={r.url} target="_blank" rel="noopener noreferrer">{topic.name}</a>
                <span className="via">via {r.site}</span>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}