import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaTimes, FaPaperPlane, FaCheck, FaExclamationTriangle, FaCommentDots,
} from 'react-icons/fa'
import { MdPsychology, MdRateReview, MdPerson, MdEmail } from 'react-icons/md'
import emailjs from '@emailjs/browser'
import { PERSONAL_INFO } from '../constants'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || ''
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || ''

// sessionStorage key — only used to prevent the AUTO popup from re-firing
const AUTO_KEY = 'exit-feedback-auto-shown'

export default function ExitFeedback() {
  const [open, setOpen]       = useState(false)
  const [btnVisible, setBtnVisible] = useState(false)
  const [status, setStatus]   = useState('idle') // idle|sending|sent|error
  const [form, setForm]       = useState({ name: '', email: '', skills: '', feedback: '' })
  const autoFiredRef          = useRef(false)

  // ── Show floating button after user scrolls 300 px ───────────────
  useEffect(() => {
    const onScroll = () => setBtnVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Exit-intent auto-trigger (once per session) ──────────────────
  useEffect(() => {
    if (sessionStorage.getItem(AUTO_KEY)) return

    const fire = () => {
      if (autoFiredRef.current) return
      autoFiredRef.current = true
      sessionStorage.setItem(AUTO_KEY, '1')
      setOpen(true)
    }

    // Arm after 6 s so it doesn't bother someone who just arrived
    const timer = setTimeout(() => {

      // Desktop: cursor moves to top of viewport (toward browser chrome)
      const onMouseLeave = (e) => {
        if (e.clientY <= 10) fire()
      }
      document.addEventListener('mouseleave', onMouseLeave)

      // Mobile / scroll-to-bottom: page ≥ 88 % read
      const onScroll = () => {
        const pct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight
        if (pct >= 0.88) fire()
      }
      window.addEventListener('scroll', onScroll, { passive: true })

      // Cleanup stored so React can clean up correctly
      return () => {
        document.removeEventListener('mouseleave', onMouseLeave)
        window.removeEventListener('scroll', onScroll)
      }
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  // ── Reset form when modal opens ───────────────────────────────────
  const openModal = () => {
    setForm({ name: '', email: '', skills: '', feedback: '' })
    setStatus('idle')
    setOpen(true)
  }

  const closeModal = () => setOpen(false)

  const handleChange = (e) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.skills.trim() && !form.feedback.trim()) return

    setStatus('sending')

    const fromName  = form.name.trim()  || 'Anonymous Recruiter'
    const fromEmail = form.email.trim() || 'feedback@portfolio.visitor'

    const parts = []
    if (form.skills.trim())   parts.push(`SKILLS TO DEVELOP / UPSKILL:\n${form.skills.trim()}`)
    if (form.feedback.trim()) parts.push(`PORTFOLIO FEEDBACK:\n${form.feedback.trim()}`)
    const body =
      `📋 RECRUITER FEEDBACK\n\n` +
      parts.join('\n\n──────────────\n\n') +
      `\n\n─────\nPage: ${window.location.href}\nTime: ${new Date().toLocaleString()}`

    try {
      if (EMAILJS_SERVICE_ID) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          { from_name: fromName, from_contact: fromEmail, message: body, to_email: PERSONAL_INFO.email },
          EMAILJS_PUBLIC_KEY
        )
      }
      setStatus('sent')
      setTimeout(closeModal, 2800)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3500)
    }
  }

  return (
    <>
      {/* ── Always-visible floating button (bottom-left) ── */}
      <AnimatePresence>
        {btnVisible && !open && (
          <motion.button
            key="fab"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            whileHover={{ scale: 1.08 }}
            onClick={openModal}
            className="fixed bottom-8 left-5 z-[250] flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full text-white text-xs font-semibold shadow-lg group"
            style={{
              background: 'linear-gradient(135deg, var(--accent1), var(--accent2))',
              boxShadow: '0 0 18px color-mix(in srgb, var(--accent1) 40%, transparent)',
            }}
            aria-label="Leave feedback"
            title="Share your feedback"
          >
            <FaCommentDots size={15} />
            <span>Feedback</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[290] bg-black/40 backdrop-blur-[3px]"
              onClick={closeModal}
            />

            {/* Panel — slides up from bottom */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ type: 'spring', damping: 28, stiffness: 340 }}
              className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[300] w-[calc(100vw-2rem)] sm:w-[440px]"
            >
              <div
                className="glass rounded-2xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden"
                style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 92%, transparent)' }}
              >
                {/* Accent bar */}
                <div
                  className="h-1"
                  style={{ background: 'linear-gradient(90deg, var(--accent1), var(--accent2))' }}
                />

                <div className="p-5 sm:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--accent1), var(--accent2))' }}
                      >
                        <FaCommentDots size={17} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold leading-tight">
                          {status === 'sent' ? 'Thank you!' : 'Quick Feedback'}
                        </h3>
                        <p className="text-[11px] mt-0.5" style={{ color: 'var(--muted)' }}>
                          {status === 'sent'
                            ? 'Your input means a lot — truly.'
                            : 'Takes 30 sec · helps me grow · completely optional'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-7 h-7 glass rounded-lg flex items-center justify-center transition-all hover:text-white flex-shrink-0"
                      style={{ color: 'var(--muted)' }}
                    >
                      <FaTimes size={11} />
                    </button>
                  </div>

                  {/* ── Success state ── */}
                  {status === 'sent' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center py-5 gap-3 text-center"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                        style={{ background: 'linear-gradient(135deg, var(--accent1), var(--accent2))' }}
                      >
                        <FaCheck size={28} className="text-white" />
                      </div>
                      <p className="text-white font-semibold text-sm">Feedback received!</p>
                      <p className="text-xs max-w-xs" style={{ color: 'var(--muted)' }}>
                        Your insight helps me focus on what matters most. Genuinely appreciate you taking the time.
                      </p>
                    </motion.div>

                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">

                      {/* Skills */}
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                          <MdPsychology size={15} style={{ color: 'var(--accent1)' }} />
                          What skills should I develop?
                        </label>
                        <textarea
                          name="skills"
                          value={form.skills}
                          onChange={handleChange}
                          placeholder="e.g. Kubernetes, system design, LLM fine-tuning, AWS…"
                          rows={2}
                          className="w-full rounded-xl px-3 py-2.5 text-xs resize-none focus:outline-none"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: `1px solid rgba(255,255,255,0.10)`,
                            color: 'var(--text)',
                            transition: 'border-color 0.2s',
                          }}
                          onFocus={e => (e.target.style.borderColor = 'var(--accent1)')}
                          onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.10)')}
                        />
                      </div>

                      {/* Portfolio feedback */}
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                          <MdRateReview size={15} style={{ color: 'var(--accent2)' }} />
                          Feedback on this portfolio?
                          <span className="text-[10px] font-normal opacity-50">(optional)</span>
                        </label>
                        <textarea
                          name="feedback"
                          value={form.feedback}
                          onChange={handleChange}
                          placeholder="Design, content, structure, what stood out…"
                          rows={2}
                          className="w-full rounded-xl px-3 py-2.5 text-xs resize-none focus:outline-none"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.10)',
                            color: 'var(--text)',
                            transition: 'border-color 0.2s',
                          }}
                          onFocus={e => (e.target.style.borderColor = 'var(--accent2)')}
                          onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.10)')}
                        />
                      </div>

                      {/* Name + Email */}
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { name: 'name',  label: 'Name',  Icon: MdPerson, placeholder: 'Your name',      type: 'text'  },
                          { name: 'email', label: 'Email', Icon: MdEmail,  placeholder: 'your@email.com', type: 'email' },
                        ].map(({ name, label, Icon, placeholder, type }) => (
                          <div key={name}>
                            <label className="flex items-center gap-1 text-[10px] font-medium mb-1" style={{ color: 'var(--muted)' }}>
                              <Icon size={11} /> {label}
                              <span className="opacity-50">(optional)</span>
                            </label>
                            <input
                              type={type}
                              name={name}
                              value={form[name]}
                              onChange={handleChange}
                              placeholder={placeholder}
                              className="w-full rounded-xl px-3 py-2 text-xs focus:outline-none"
                              style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.10)',
                                color: 'var(--text)',
                                transition: 'border-color 0.2s',
                              }}
                              onFocus={e => (e.target.style.borderColor = 'var(--accent1)')}
                              onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.10)')}
                            />
                          </div>
                        ))}
                      </div>

                      {status === 'error' && (
                        <p className="text-xs flex items-center gap-1.5 text-amber-400">
                          <FaExclamationTriangle size={11} />
                          Couldn't send — please use the contact form.
                        </p>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-all"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: 'var(--muted)',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          Skip
                        </button>
                        <button
                          type="submit"
                          disabled={
                            status === 'sending' ||
                            (!form.skills.trim() && !form.feedback.trim())
                          }
                          className="flex-[2] py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40"
                          style={{ background: 'linear-gradient(135deg, var(--accent1), var(--accent2))' }}
                        >
                          {status === 'sending' ? (
                            <>
                              <div className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                              Sending…
                            </>
                          ) : (
                            <>
                              <FaPaperPlane size={11} />
                              Send Feedback
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[10px] text-center" style={{ color: 'var(--muted)', opacity: 0.45 }}>
                        Anonymous if you skip name &amp; email · goes directly to Goutham
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
