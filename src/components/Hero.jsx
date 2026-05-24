import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaCalendarAlt } from 'react-icons/fa'
import { MdBusinessCenter } from 'react-icons/md'
import { PERSONAL_INFO } from '../constants'
import profileImg from '../assets/goutham-opt.jpg'
import ScheduleModal from './ScheduleModal'
import TechSphere from './TechSphere'
import MagneticButton from './MagneticButton'

const TAGLINES = PERSONAL_INFO.taglines

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [displayed, setDisplayed]       = useState('')
  const [typing, setTyping]             = useState(true)
  const [showSchedule, setShowSchedule] = useState(false)

  // ── Typewriter ────────────────────────────────────────────
  useEffect(() => {
    const current = TAGLINES[taglineIndex]
    let timeout
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
      } else {
        timeout = setTimeout(() => setTyping(false), 1800)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
      } else {
        setTaglineIndex((taglineIndex + 1) % TAGLINES.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, typing, taglineIndex])

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {showSchedule && <ScheduleModal onClose={() => setShowSchedule(false)} />}

      {/* Background glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[var(--accent1)]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-[var(--accent2)]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[var(--accent1)]/5 rounded-full blur-[180px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative z-10 py-28 md:py-0 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">

          {/* ── Left content ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1 text-center md:text-left"
          >
            {/* Open to collaborate badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[var(--accent1)]/30 text-sm text-[var(--accent1)] mb-6 badge-pulse"
            >
              <MdBusinessCenter size={16} />
              Open to Collaborate &amp; Business Discussions
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#aaa6c3] text-lg mb-1"
            >
              Hi there, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              Khatravat{' '}
              <span className="gradient-text">Goutham</span>{' '}
              Rathod
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl font-semibold text-[#aaa6c3] mb-6 h-8"
            >
              <span className="text-[var(--accent1)]">{displayed}</span>
              <span className="animate-pulse text-[var(--accent2)]">|</span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-[#aaa6c3] text-base leading-relaxed max-w-xl mx-auto md:mx-0 mb-8"
            >
              Associate Software Engineer building data pipelines, AI integrations, and full-stack solutions.
              Based in <span className="text-white font-medium">Hyderabad, India</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex flex-wrap gap-3 justify-center md:justify-start mb-8"
            >
              <MagneticButton>
                <button
                  onClick={scrollToContact}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--accent1)] to-[var(--accent2)] text-white font-semibold hover:shadow-lg hover:shadow-[var(--accent1)]/30 transition-all duration-200"
                >
                  Get in Touch
                </button>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={() => setShowSchedule(true)}
                  className="px-5 py-3 rounded-xl glass border border-[var(--accent2)]/40 text-white font-semibold hover:border-[var(--accent2)] transition-all duration-200 flex items-center gap-2"
                >
                  <FaCalendarAlt className="text-[var(--accent2)]" size={15} />
                  Schedule a Call
                </button>
              </MagneticButton>

            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-4 justify-center md:justify-start"
            >
              {[
                { icon: FaGithub,   href: PERSONAL_INFO.github,   label: 'GitHub' },
                { icon: FaLinkedin, href: PERSONAL_INFO.linkedin,  label: 'LinkedIn' },
                { icon: FaWhatsapp, href: `https://wa.me/${PERSONAL_INFO.whatsapp}`, label: 'WhatsApp' },
                { icon: FaEnvelope, href: '#contact', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  onClick={href === '#contact' ? (e) => { e.preventDefault(); scrollToContact() } : undefined}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-[#aaa6c3] hover:text-[var(--accent1)] hover:border-[var(--accent1)]/40 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right — Profile photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="flex-shrink-0 flex justify-center"
          >
            <div className="relative">
              {/* ── TechSphere — rotating 3D globe behind the photo ── */}
              <div
                className="absolute hidden md:block pointer-events-none"
                style={{
                  width: 420, height: 420,
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: -1,
                  opacity: 0.55,
                  maskImage: 'radial-gradient(circle, white 40%, transparent 72%)',
                  WebkitMaskImage: 'radial-gradient(circle, white 40%, transparent 72%)',
                }}
              >
                <TechSphere />
              </div>

              {/* Outer spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute rounded-full border border-dashed border-[var(--accent1)]/30"
                style={{ inset: '-18px' }}
              />
              {/* Inner spinning ring (counter) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute rounded-full border border-dashed border-[var(--accent2)]/20"
                style={{ inset: '-8px' }}
              />

              {/* Glow behind photo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent1)]/40 to-[var(--accent2)]/40 blur-2xl scale-110" />

              {/* Photo */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-52 h-52 md:w-64 md:h-64 rounded-full p-[3px] bg-gradient-to-br from-[var(--accent1)] to-[var(--accent2)] shadow-2xl shadow-[var(--accent1)]/30"
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a1f]">
                  <img
                    src={profileImg}
                    alt="Khatravat Goutham Rathod"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </motion.div>

              {/* Role badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.0, type: 'spring' }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 glass rounded-full border border-[var(--accent2)]/40 text-xs font-semibold text-[var(--accent2)] whitespace-nowrap shadow-lg"
              >
                {PERSONAL_INFO.role}
              </motion.div>

              {/* Floating stat badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="absolute -left-14 top-8 glass px-3 py-2 rounded-xl border border-[var(--accent1)]/20 text-center hidden md:block"
              >
                <div className="text-lg font-bold gradient-text">1+</div>
                <div className="text-[10px] text-[#aaa6c3]">Years Exp.</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute -right-14 top-8 glass px-3 py-2 rounded-xl border border-[var(--accent2)]/20 text-center hidden md:block"
              >
                <div className="text-lg font-bold gradient-text">5+</div>
                <div className="text-[10px] text-[#aaa6c3]">Projects</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#aaa6c3] text-xs"
        >
          <span>Scroll down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-4 h-7 rounded-full border border-[#aaa6c3]/40 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-[var(--accent1)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
