import { useState, useEffect } from 'react'
import type { Page } from '../App'

interface NavbarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const resumeUrl = '/assets/My%20resume/Siranjeevi.pdf'

  const navigateToAbout = () => {
    onNavigate('home')
    setMenuOpen(false)
    setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLink = (page: Page, label: string) => {
    const active = currentPage === page
    return (
      <button
        onClick={() => { onNavigate(page); setMenuOpen(false) }}
        className={`relative text-sm font-medium transition-colors duration-200 py-1 ${
          active ? 'text-[#C1FA5A]' : 'text-white/80 hover:text-white'
        }`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {label}
        {active && (
          <span
            className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full"
            style={{ background: '#C1FA5A' }}
          />
        )}
      </button>
    )
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav ${
        scrolled || menuOpen ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 group"
          aria-label="Go to home page"
        >
          <img src="/assets/Logos/Mylogo.png" alt="Portfolio logo" className="h-[50px] w-auto transition-transform duration-200 group-hover:scale-105" />
        </button>

        {/* Center nav â€” desktop */}
        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={navigateToAbout}
            className={`relative text-sm font-medium transition-colors duration-200 py-1 ${currentPage === 'home' ? 'text-[#C1FA5A]' : 'text-white/80 hover:text-white'}`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            About me
            {currentPage === 'home' && <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full" style={{ background: '#C1FA5A' }} />}
          </button>
          {navLink('projects', 'My Work')}
        </div>

        {/* Right â€” desktop */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-full text-sm btn-primary"
          >
            My Resume
          </a>
        </div>

        {/* Hamburger â€” mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
              menuOpen ? 'opacity-0 w-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64' : 'max-h-0'
        }`}
        style={{ background: 'rgba(27,28,30,0.98)', borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div className="px-6 py-5 flex flex-col gap-4">
          <button
            onClick={navigateToAbout}
            className={`text-left text-sm font-medium ${currentPage === 'home' ? 'text-[#C1FA5A]' : 'text-white/80'}`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            About me
          </button>
          <button
            onClick={() => { onNavigate('projects'); setMenuOpen(false) }}
            className={`text-left text-sm font-medium ${currentPage === 'projects' ? 'text-[#C1FA5A]' : 'text-white/80'}`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            My Work
          </button>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="px-5 py-2.5 rounded-full text-sm btn-primary text-center"
          >
            My Resume
          </a>
        </div>
      </div>
    </nav>
  )
}
