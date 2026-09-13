import { LEVELS } from '../data'

export default function LevelRail() {
  return (
    <div className="level-rail" id="level-rail">
      {LEVELS.map(l => (
        <a key={l.id} href={`#${l.id}`}>{l.label} · {l.title}</a>
      ))}
    </div>
  )
}