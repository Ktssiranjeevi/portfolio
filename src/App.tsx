import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'

export type Page = 'home' | 'projects'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navigate = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F8F6' }}>
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      {currentPage === 'home' ? (
        <Home onNavigate={navigate} />
      ) : (
        <ProjectsPage onNavigate={navigate} />
      )}
    </div>
  )
}
