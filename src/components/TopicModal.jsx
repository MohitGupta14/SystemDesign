import ResourceList from './ResourceList'
import { bestFreeIndex } from '../utils'

export default function TopicModal({ topic, subFocus, isCovered, onToggle, onClose }) {
  const best = bestFreeIndex(topic.resources)

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" aria-label="Close" onClick={onClose}>✕</button>
        <div className="modal-top">
          <span className="topic-cat mono">{topic.category} · {topic.difficulty}</span>
          <span className={`diff-badge diff-${topic.difficulty}`}>{topic.difficulty}</span>
        </div>
        <h2 className="modal-title" id="modal-title">{topic.name}</h2>
        <p className="modal-about">{topic.about}</p>
        {topic.sub && topic.sub.length > 0 && (
          <div className="modal-subs">
            <span className="modal-subs-lbl mono">SUB-TOPICS</span>
            {topic.sub.map((s, i) => (
              <span key={i} className={`modal-sub${subFocus === s ? ' active' : ''}`}>{s}</span>
            ))}
          </div>
        )}
        <h4 className="modal-res-h">RESOURCES</h4>
        <ResourceList className="res-list modal-res" resources={topic.resources} best={best} />
        <div className="modal-actions">
          <button
            type="button"
            className={`mark-covered-btn${isCovered ? ' on' : ''}`}
            onClick={() => onToggle(topic)}
          >
            {isCovered ? '✓ Covered — tap to undo' : 'Mark this topic as covered'}
          </button>
        </div>
      </div>
    </div>
  )
}