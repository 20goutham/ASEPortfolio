import { createContext, useContext, useState, useEffect, useRef } from 'react'

export const THEMES = [
  {
    id: 'nebula',
    label: 'Nebula',
    bg: '#050816',
    accent1: '#915eff',
    accent2: '#06b6d4',
    surface: 'rgba(145,94,255,0.05)',
    text: '#ffffff',
    muted: '#aaa6c3',
  },
  {
    id: 'midnight',
    label: 'Midnight',
    bg: '#020b18',
    accent1: '#3b82f6',
    accent2: '#818cf8',
    surface: 'rgba(59,130,246,0.05)',
    text: '#e0e7ff',
    muted: '#94a3b8',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    bg: '#020e1a',
    accent1: '#06b6d4',
    accent2: '#22d3ee',
    surface: 'rgba(6,182,212,0.05)',
    text: '#e0f7fa',
    muted: '#7dd3fc',
  },
  {
    id: 'royal',
    label: 'Royal',
    bg: '#020819',
    accent1: '#2563eb',
    accent2: '#60a5fa',
    surface: 'rgba(37,99,235,0.05)',
    text: '#eff6ff',
    muted: '#93c5fd',
  },
  {
    id: 'cobalt',
    label: 'Cobalt',
    bg: '#020713',
    accent1: '#4f46e5',
    accent2: '#a5b4fc',
    surface: 'rgba(79,70,229,0.05)',
    text: '#eef2ff',
    muted: '#a5b4fc',
  },
  {
    id: 'arctic',
    label: 'Arctic',
    bg: '#030c18',
    accent1: '#0ea5e9',
    accent2: '#38bdf8',
    surface: 'rgba(14,165,233,0.05)',
    text: '#f0f9ff',
    muted: '#7dd3fc',
  },
  {
    id: 'electric',
    label: 'Electric',
    bg: '#010810',
    accent1: '#00b4d8',
    accent2: '#48cae4',
    surface: 'rgba(0,180,216,0.05)',
    text: '#f0f9ff',
    muted: '#90e0ef',
  },
  {
    id: 'nord',
    label: 'Nord',
    bg: '#0d1117',
    accent1: '#5e81ac',
    accent2: '#88c0d0',
    surface: 'rgba(94,129,172,0.05)',
    text: '#eceff4',
    muted: '#a3b1c6',
  },
]

const ThemeContext = createContext()

function applyTheme(theme) {
  const root = document.documentElement
  root.style.setProperty('--bg',      theme.bg)
  root.style.setProperty('--accent1', theme.accent1)
  root.style.setProperty('--accent2', theme.accent2)
  root.style.setProperty('--surface', theme.surface)
  root.style.setProperty('--text',    theme.text)
  root.style.setProperty('--muted',   theme.muted)
  root.setAttribute('data-theme', theme.id)
  document.body.style.backgroundColor = theme.bg
  document.body.style.color           = theme.text
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeIdRaw] = useState(
    () => localStorage.getItem('portfolio-theme') || 'nebula'
  )
  const intervalRef = useRef(null)

  const theme = THEMES.find(t => t.id === themeId) || THEMES[0]

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('portfolio-theme', themeId)
  }, [themeId, theme])

  // ── Auto-cycle every 7 s ────────────────────────────────────────
  const startCycle = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setThemeIdRaw(current => {
        const idx = THEMES.findIndex(t => t.id === current)
        return THEMES[(idx + 1) % THEMES.length].id
      })
    }, 7000)
  }

  useEffect(() => {
    startCycle()
    return () => clearInterval(intervalRef.current)
  }, []) // eslint-disable-line

  // Manual change resets the 7-s timer so it doesn't fire immediately after
  const setThemeId = (id) => {
    setThemeIdRaw(id)
    startCycle()
  }

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
