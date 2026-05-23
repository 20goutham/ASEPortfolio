import { useEffect, useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Preloader from './components/Preloader'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CursorTrail from './components/CursorTrail'

// Below-the-fold sections loaded lazily
const Stats      = lazy(() => import('./components/Stats'))
const About      = lazy(() => import('./components/About'))
const Education  = lazy(() => import('./components/Education'))
const Experience = lazy(() => import('./components/Experience'))
const Projects   = lazy(() => import('./components/Projects'))
const Skills     = lazy(() => import('./components/Skills'))
const Contact    = lazy(() => import('./components/Contact'))
const Resume     = lazy(() => import('./components/Resume'))
const Footer     = lazy(() => import('./components/Footer'))
const ExitFeedback = lazy(() => import('./components/ExitFeedback'))

function SectionSkeleton() {
  return (
    <div className="w-full py-20 flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--accent1)', borderTopColor: 'transparent' }}
      />
    </div>
  )
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-6 z-40 w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--accent1)] to-[var(--accent2)] flex items-center justify-center text-white shadow-lg hover:-translate-y-1 transition-transform"
      aria-label="Scroll to top"
    >
      ↑
    </motion.button>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-white/5">
      <div
        className="h-full bg-gradient-to-r from-[var(--accent1)] to-[var(--accent2)] transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  const dismiss = () => setLoading(false)

  // Safety fallback — preloader calls dismiss itself at 3500ms
  useEffect(() => {
    const t = setTimeout(dismiss, 4200)
    return () => clearTimeout(t)
  }, [])

  return (
    <ThemeProvider>
      <AnimatePresence>
        {loading && <Preloader key="preloader" onDone={dismiss} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen font-poppins overflow-x-hidden" style={{ backgroundColor: 'var(--bg)' }}>
          <CursorTrail />
          <ParticleBackground />
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <Suspense fallback={<SectionSkeleton />}><Stats /></Suspense>
            <Suspense fallback={<SectionSkeleton />}><About /></Suspense>
            <Suspense fallback={<SectionSkeleton />}><Education /></Suspense>
            <Suspense fallback={<SectionSkeleton />}><Experience /></Suspense>
            <Suspense fallback={<SectionSkeleton />}><Projects /></Suspense>
            <Suspense fallback={<SectionSkeleton />}><Skills /></Suspense>
            <Suspense fallback={<SectionSkeleton />}><Contact /></Suspense>
            <Suspense fallback={<SectionSkeleton />}><Resume /></Suspense>
          </main>
          <Suspense fallback={null}><Footer /></Suspense>
          <ScrollToTop />
          <Suspense fallback={null}><ExitFeedback /></Suspense>
        </div>
      )}
    </ThemeProvider>
  )
}
