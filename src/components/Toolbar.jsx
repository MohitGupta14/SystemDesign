export default function Toolbar({
  status, cat, coveredFilter, setStatus, setCat, clickCovered,
  visibleCount, totalTopics, coveredCount,
}) {
  const chip = (active, onClick, label) => (
    <button className={`chip${active ? ' active' : ''}`} onClick={onClick}>{label}</button>
  )

  return (
    <div className="toolbar" id="toolbar">
      {chip(status === 'all', () => setStatus('all'), 'All')}
      {chip(status === 'free', () => setStatus('free'), 'Free only')}
      {chip(status === 'paid', () => setStatus('paid'), 'Paid only')}
      <div className="sep"></div>
      {chip(coveredFilter === 'covered', () => clickCovered('covered'), 'Covered')}
      {chip(coveredFilter === 'remaining', () => clickCovered('remaining'), 'Remaining')}
      <div className="sep"></div>
      {chip(cat === 'all', () => setCat('all'), 'Every category')}
      {chip(cat === 'HLD', () => setCat('HLD'), 'HLD')}
      {chip(cat === 'LLD', () => setCat('LLD'), 'LLD')}
      {chip(cat === 'Case Study', () => setCat('Case Study'), 'Case studies')}
      {chip(cat === 'Pattern', () => setCat('Pattern'), 'Patterns')}
      <span className="count">{visibleCount} / {totalTopics} topics · {coveredCount} covered</span>
    </div>
  )
}