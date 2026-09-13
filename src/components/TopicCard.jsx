import ResourceList from './ResourceList'
import { bestFreeIndex } from '../utils'

export default function TopicCard({ topic, statusFilter, isCovered, onOpen, onToggleCovered }) {
  const covered = isCovered(topic)
  const best = bestFreeIndex(topic.resources)

  return (
    <div
      className={`topic-card${covered ? ' covered' : ''}`}
      onClick={e => {
        if (e.target.closest('.mark-btn') || e.target.closest('a')) return
        onOpen(topic)
      }}
    >
      <div className="topic-top">
        <h4>{topic.name}</h4>
        <button
          type="button"
          className={`mark-btn${covered ? ' on' : ''}`}
          title={covered ? 'Mark as not covered' : 'Mark as covered'}
          onClick={e => { e.stopPropagation(); onToggleCovered(topic) }}
        >
          {covered ? '✓ Covered' : 'Mark done'}
        </button>
        <span className={`diff-badge diff-${topic.difficulty}`}>{topic.difficulty}</span>
      </div>
      <span className="topic-cat">{topic.category}</span>
      <p className="topic-about">{topic.about}</p>
      <ResourceList resources={topic.resources} best={best} dimStatus={statusFilter} />
      <span className="details-hint">CLICK CARD FOR DETAILS</span>
    </div>
  )
}