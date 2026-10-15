import { useState, useEffect } from 'react'
import type { Page } from '../App'

interface NavbarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
          active ? 'text-[#5631A1]' : 'text-[#1A1A2E] hover:text-[#5631A1]'
        }`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {label}
        {active && (
          <span
            className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full"
            style={{ background: '#5631A1' }}
          />
        )}
      </button>
    )
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? 'glass-nav shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 group"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3"
            style={{
              background: 'linear-gradient(135deg, #5631A1, #FF6B6B)',
              boxShadow: '0 4px 14px rgba(86,49,161,0.4)',
            }}
          >
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
              KD
            </span>
          </div>
          <span
            className="font-bold text-[#1A1A2E] text-lg hidden sm:block"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Kiran<span style={{ color: '#5631A1' }}>.</span>Dev
          </span>
        </button>

        {/* Center nav — desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLink('home', 'Home')}
          {navLink('projects', 'Projects')}
        </div>

        {/* Right — desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => {
              onNavigate('home')
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }}
            className="px-5 py-2.5 rounded-full text-sm btn-primary"
          >
            Hire Me ✨
          </button>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#1A1A2E] rounded transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#1A1A2E] rounded transition-all duration-300 ${
              menuOpen ? 'opacity-0 w-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#1A1A2E] rounded transition-all duration-300 ${
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
        style={{ background: 'rgba(249,248,246,0.96)', borderTop: '1px solid rgba(86,49,161,0.1)' }}
      >
        <div className="px-6 py-5 flex flex-col gap-4">
          <button
            onClick={() => { onNavigate('home'); setMenuOpen(false) }}
            className={`text-left text-sm font-medium ${currentPage === 'home' ? 'text-[#5631A1]' : 'text-[#1A1A2E]'}`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Home
          </button>
          <button
            onClick={() => { onNavigate('projects'); setMenuOpen(false) }}
            className={`text-left text-sm font-medium ${currentPage === 'projects' ? 'text-[#5631A1]' : 'text-[#1A1A2E]'}`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Projects
          </button>
          <button
            onClick={() => {
              setMenuOpen(false)
              onNavigate('home')
              setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)
            }}
            className="px-5 py-2.5 rounded-full text-sm btn-primary text-center"
          >
            Hire Me ✨
          </button>
        </div>
      </div>
    </nav>
  )
}
