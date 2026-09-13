import { Fragment } from 'react'
import { LEVELS } from '../data'

export default function RoadmapView({ isCovered, onNodeClick, selNode, selSub, coveredCount, totalTopics, pct }) {
  return (
    <section id="roadmap-view" className="view active">
      <div className="view-head">
        <span className="lvl-num mono">ROADMAP</span>
        <h2>System Design from zero to job-ready</h2>
        <p>
          A top-to-bottom graph of everything on this site. Click any node to see what the topic covers and which
          resources explain it. Some nodes have sub-nodes — the smaller dashed chips — that flag specific sub-topics
          worth learning.
        </p>
      </div>
      <div className="progress-wrap">
        <div className="progress-label mono">
          <span>Path progress</span>
          <span><b>{coveredCount} / {totalTopics} · {pct}%</b></span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: pct + '%' }} />
        </div>
      </div>
      <div className="r-hint">⌘ Click a node (or a sub-node) to open its topic card. Levels flow top → bottom.</div>
      <div className="roadmap-track">
        {LEVELS.map((level, li) => {
          const open = selNode && selNode.l === li
          return (
            <Fragment key={level.id}>
              <div id={`r-${level.id}`} className={`r-stage${open ? ' open' : ''}`}>
              <span className="r-head-dot"></span>
              <div className="r-stage-head">
                <span className="r-lvl-num mono">{level.label}</span>
                <h3>{level.title}</h3>
                <p>{level.desc}</p>
              </div>
              <div className="r-nodes">
                {level.topics.map((topic, ti) => {
                  const selected = selNode && selNode.l === li && selNode.i === ti
                  const covered = isCovered(topic)
                  return (
                    <div
                      key={ti}
                      className={`rnode${covered ? ' covered' : ''}${selected ? ' selected' : ''}`}
                      data-diff={topic.difficulty}
                    >
                      <button className="rnode-btn" type="button" onClick={() => onNodeClick(li, ti)}>
                        <span className="rnode-dot"></span>
                        <span className="rnode-name">
                          {topic.name}
                          <span className="mono-tag">{topic.category} · {topic.difficulty}</span>
                        </span>
                      </button>
                      {topic.sub && topic.sub.length > 0 && (
                        <div className="rsubs">
                          {topic.sub.map((s, si) => (
                            <button
                              key={si}
                              type="button"
                              className={`rsub${selected && selSub === s ? ' active' : ''}`}
                              title={`Open ${topic.name} and focus on ${s}`}
                              onClick={() => onNodeClick(li, ti, s)}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            {li < LEVELS.length - 1 && <div className="r-connector"></div>}
            </Fragment>
          )
        })}
      </div>
    </section>
  )
}