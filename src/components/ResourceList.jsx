import { pillLabel } from '../utils'

export function Pill({ status }) {
  return <span className={`pill ${status}`}>{pillLabel(status)}</span>
}

export default function ResourceList({ resources, best = -1, dimStatus, className = 'res-list' }) {
  return (
    <ul className={className}>
      {resources.map((r, i) => {
        const dim = dimStatus && dimStatus !== 'all' && r.status !== dimStatus
        return (
          <li key={i} className={`res-item${dim ? ' dimmed' : ''}`} data-status={r.status}>
            <Pill status={r.status} />
            {i === best && <span className="rec-star" title="Recommended free pick">★</span>}
            <a className="res-link" href={r.url} target="_blank" rel="noopener noreferrer">
              {r.title}
              {r.conf === 'reconstructed' && (
                <span className="tilde" title="URL reconstructed from the site's pattern — not confirmed on the page">~</span>
              )}
            </a>
            <span className="site">{r.site}</span>
          </li>
        )
      })}
    </ul>
  )
}