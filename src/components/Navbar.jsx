import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdPalette } from 'react-icons/md'
import { NAV_LINKS, PERSONAL_INFO } from '../constants'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [active, setActive]       = useState('home')
  const [menuOpen, setMenuOpen]   = useState(false)
  const [toastLabel, setToastLabel] = useState(null)
  const toastTimer = useRef(null)
  const { theme, themeId, setThemeId, themes } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = NAV_LINKS.map(l => document.getElementById(l.id))
      const scrollPos = window.scrollY + 100
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i]
        if (el && el.offsetTop <= scrollPos) {
          setActive(NAV_LINKS[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
    setMenuOpen(false)
  }

  const cycleTheme = () => {
    const idx  = themes.findIndex(t => t.id === themeId)
    const next = themes[(idx + 1) % themes.length]
    setThemeId(next.id)
    clearTimeout(toastTimer.current)
    setToastLabel(next.label)
    toastTimer.current = setTimeout(() => setToastLabel(null), 1600)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#050816]/80 backdrop-blur-lg border-b border-white/10 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-[var(--accent1)] to-[var(--accent2)] flex items-center justify-center text-white font-bold text-xs md:text-sm glow-purple">
            {PERSONAL_INFO.initials}
          </div>
          <span className="hidden sm:block font-semibold text-white group-hover:text-[var(--accent1)] transition-colors text-sm md:text-base">
            {PERSONAL_INFO.shortName}
          </span>
        </button>

        {/* Available badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium available-badge-glow">
          <span className="relative flex items-center justify-center w-2.5 h-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" />
          </span>
          Available for Opportunities
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-0.5 lg:gap-1">
          {NAV_LINKS.map(link => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className={`px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${
                  active === link.id
                    ? 'text-[var(--accent1)] bg-[var(--accent1)]/10'
                    : 'text-[#aaa6c3] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Theme cycle button */}
        <div className="relative flex items-center">
          <AnimatePresence>
            {toastLabel && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="absolute right-11 whitespace-nowrap text-[11px] font-semibold px-2.5 py-1 rounded-lg border"
                style={{
                  color: theme.accent1,
                  borderColor: `${theme.accent1}40`,
                  backgroundColor: `${theme.bg}ee`,
                }}
              >
                {toastLabel}
              </motion.span>
            )}
          </AnimatePresence>

          <button
            onClick={cycleTheme}
            className="w-9 h-9 glass rounded-lg flex items-center justify-center text-[#aaa6c3] hover:text-[var(--accent1)] transition-all"
            aria-label="Cycle theme"
            title={`Theme: ${theme.label} — click to change`}
          >
            <span
              className="w-4 h-4 rounded-full border-2 border-white/20"
              style={{ background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})` }}
            />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 ml-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#050816]/98 backdrop-blur-lg border-b border-white/10"
          >
            <ul className="container-custom py-3 flex flex-col gap-0.5">
              {NAV_LINKS.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      active === link.id
                        ? 'text-[var(--accent1)] bg-[var(--accent1)]/10'
                        : 'text-[#aaa6c3] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}

              {/* Theme picker row */}
              <li className="pt-2 mt-1 border-t border-white/5">
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#aaa6c3]/50 font-medium">Theme</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#aaa6c3]">{theme.label}</span>
                    <button
                      onClick={() => { cycleTheme(); setMenuOpen(false) }}
                      className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg text-xs font-medium text-[var(--accent1)] border border-[var(--accent1)]/20"
                    >
                      <MdPalette size={13} />
                      Next
                    </button>
                  </div>
                </div>
                {/* Color swatches row */}
                <div className="flex gap-2 px-4 pb-2 overflow-x-auto scrollbar-none">
                  {themes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setThemeId(t.id); setMenuOpen(false) }}
                      title={t.label}
                      className={`w-6 h-6 rounded-full flex-shrink-0 border-2 transition-transform ${
                        themeId === t.id ? 'border-white scale-125' : 'border-transparent hover:scale-110'
                      }`}
                      style={{ background: `linear-gradient(135deg, ${t.accent1}, ${t.accent2})` }}
                    />
                  ))}
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
