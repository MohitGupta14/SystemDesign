const TABS = [
  { id: 'path', label: 'Learning Path' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'resources', label: 'Resources' },
]

export default function Header({ view, onNavigate, q, onSearch }) {
  return (
    <header>
      <div className="brand">
        <span className="dot">◆</span>System Design Atlas
        <small className="mono">v0.2</small>
      </div>
      <nav className="tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={view === t.id ? 'active' : ''}
            onClick={() => onNavigate(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <a
        className="gh-link mono"
        href="https://github.com/MohitGupta14/SystemDesign"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="gh-ico">⌥</span>github/MohitGupta14
      </a>
      <div className="search-wrap">
        <input
          id="search"
          type="text"
          placeholder="Search a topic — e.g. bloom filter"
          value={q}
          onChange={e => onSearch(e.target.value)}
        />
      </div>
    </header>
  )
}