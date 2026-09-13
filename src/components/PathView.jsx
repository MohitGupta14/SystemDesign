import { LEVELS } from '../data'
import TopicCard from './TopicCard'

export default function PathView({ matches, statusFilter, isCovered, onOpen, onToggleCovered }) {
  return (
    <section id="path-view" className="view active">
      {LEVELS.map(level => {
        const visible = level.topics.filter(matches)
        if (visible.length === 0) return null
        return (
          <div key={level.id} id={level.id} className="level-block">
            <div className="level-head">
              <span className="lvl-num mono">{level.label}</span>
              <h2>{level.title}</h2>
            </div>
            <p className="level-desc">{level.desc}</p>
            <div className="topic-grid">
              {visible.map(topic => (
                <TopicCard
                  key={topic.name}
                  topic={topic}
                  statusFilter={statusFilter}
                  isCovered={isCovered}
                  onOpen={onOpen}
                  onToggleCovered={onToggleCovered}
                />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}