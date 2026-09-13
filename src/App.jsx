import { useCallback, useEffect, useMemo, useState } from 'react'
import { LEVELS } from './data'
import Header from './components/Header'
import Hero from './components/Hero'
import Toolbar from './components/Toolbar'
import LevelRail from './components/LevelRail'
import PathView from './components/PathView'
import RoadmapView from './components/RoadmapView'
import ResourcesView from './components/ResourcesView'
import Footer from './components/Footer'
import TopicModal from './components/TopicModal'
import { loadCovered, saveCovered } from './utils'

const VIEWS = ['path', 'roadmap', 'resources']

function initialView() {
  const h = window.location.hash.replace('#', '')
  return VIEWS.includes(h) ? h : 'path'
}

export default function App() {
  const [view, setViewState] = useState(initialView)
  const [status, setStatus] = useState('all')
  const [cat, setCat] = useState('all')
  const [q, setQ] = useState('')
  const [coveredFilter, setCoveredFilter] = useState('all')
  const [covered, setCovered] = useState(loadCovered)
  const [modal, setModal] = useState(null)
  const [selNode, setSelNode] = useState(null)
  const [selSub, setSelSub] = useState(null)

  const coveredSet = useMemo(() => new Set(covered), [covered])

  const totalTopics = useMemo(
    () => LEVELS.reduce((n, l) => n + l.topics.length, 0),
    []
  )
  const totalFree = useMemo(
    () => LEVELS.flatMap(l => l.topics).flatMap(t => t.resources).filter(r => r.status === 'free').length,
    []
  )
  const pct = totalTopics ? Math.round((covered.length / totalTopics) * 100) : 0

  const setView = useCallback(v => {
    setViewState(v)
    history.replaceState(null, '', `#${v}`)
  }, [])

  const isCovered = useCallback(topic => coveredSet.has(topic.name), [coveredSet])
  const toggleCovered = useCallback(topic => {
    setCovered(prev => {
      const next = prev.includes(topic.name)
        ? prev.filter(n => n !== topic.name)
        : [...prev, topic.name]
      saveCovered(next)
      return next
    })
  }, [])

  const matchesFilters = useCallback(topic => {
    if (cat !== 'all' && topic.category !== cat) return false
    if (q && !topic.name.toLowerCase().includes(q)) return false
    if (coveredFilter === 'covered' && !coveredSet.has(topic.name)) return false
    if (coveredFilter === 'remaining' && coveredSet.has(topic.name)) return false
    if (status === 'all') return true
    return topic.resources.some(r => r.status === status)
  }, [cat, q, coveredFilter, coveredSet, status])

  const visibleCount = useMemo(
    () => LEVELS.reduce((n, l) => n + l.topics.filter(matchesFilters).length, 0),
    [matchesFilters]
  )

  const clickCovered = useCallback(val => {
    setCoveredFilter(prev => (prev === val ? 'all' : val))
  }, [])

  const openModal = useCallback(topic => {
    setSelNode(null)
    setSelSub(null)
    setModal({ topic })
  }, [])

  const openRoadmapModal = useCallback((l, i, sub) => {
    setSelNode({ l, i })
    setSelSub(sub || null)
    setModal({ topic: LEVELS[l].topics[i] })
  }, [])

  const closeModal = useCallback(() => {
    setModal(null)
    setSelNode(null)
    setSelSub(null)
  }, [])

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeModal])

  return (
    <>
      <div className="blueprint-bg"></div>
      <Header view={view} onNavigate={setView} q={q} onSearch={setQ} />
      {view === 'path' && (
        <>
          <Hero
            totalTopics={totalTopics}
            totalFree={totalFree}
            coveredCount={covered.length}
            pct={pct}
            onJump={setView}
            isCovered={isCovered}
            onOpen={openModal}
          />
          <Toolbar
            status={status}
            cat={cat}
            coveredFilter={coveredFilter}
            setStatus={setStatus}
            setCat={setCat}
            clickCovered={clickCovered}
            visibleCount={visibleCount}
            totalTopics={totalTopics}
            coveredCount={covered.length}
          />
          <LevelRail />
        </>
      )}
      <main>
        {view === 'path' && (
          <PathView
            matches={matchesFilters}
            statusFilter={status}
            isCovered={isCovered}
            onOpen={openModal}
            onToggleCovered={toggleCovered}
          />
        )}
        {view === 'roadmap' && (
          <RoadmapView
            isCovered={isCovered}
            onNodeClick={openRoadmapModal}
            selNode={selNode}
            selSub={selSub}
            coveredCount={covered.length}
            totalTopics={totalTopics}
            pct={pct}
          />
        )}
        {view === 'resources' && <ResourcesView />}
      </main>
      <Footer />
      {modal && (
        <TopicModal
          topic={modal.topic}
          subFocus={selSub}
          isCovered={isCovered(modal.topic)}
          onToggle={toggleCovered}
          onClose={closeModal}
        />
      )}
    </>
  )
}