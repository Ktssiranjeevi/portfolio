import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import ManagedContent from './components/ManagedContent'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import AdminPage from './pages/AdminPage'

export type Page = 'home' | 'projects' | 'admin'

const pageFromPath = (): Page => {
  const path = window.location.pathname.replace(/\/$/, '')
  if (path === '/projects') return 'projects'
  if (path === '/admin') return 'admin'
  return 'home'
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(pageFromPath)

  useEffect(() => {
    const syncPage = () => setCurrentPage(pageFromPath())
    window.addEventListener('popstate', syncPage)
    return () => window.removeEventListener('popstate', syncPage)
  }, [])

  const navigate = (page: Page) => {
    const path = page === 'projects' ? '/projects' : page === 'admin' ? '/admin' : '/'
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path)
    }
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1B1C1E' }}>
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      {currentPage === 'admin' ? <AdminPage onNavigate={navigate} /> : currentPage === 'home' ? (
        <><Home onNavigate={navigate} /><ManagedContent page="home" /></>
      ) : (
        <><ProjectsPage onNavigate={navigate} /><ManagedContent page="projects" /></>
      )}
    </div>
  )
}
