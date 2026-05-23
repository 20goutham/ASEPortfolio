import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa'
import { MdSend, MdCheck, MdError, MdBusinessCenter } from 'react-icons/md'
import { PERSONAL_INFO } from '../constants'

// ── EmailJS credentials ──────────────────────────────────────────────────────
// 1. Sign up free at https://emailjs.com
// 2. Create a service (Gmail) → copy Service ID
// 3. Create an email template with variables: {{from_name}}, {{from_contact}}, {{message}}
// 4. Copy Template ID and Public Key below
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY'
// ─────────────────────────────────────────────────────────────────────────────

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
const isPhone = (v) => /^[\+]?[\d\s\-\(\)]{7,15}$/.test(v.replace(/\s/g, ''))

export default function Contact() {
  const formRef = useRef()
  const [form, setForm]     = useState({ name: '', contact: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [mode, setMode]     = useState(null)   // null | 'email' | 'phone'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (name === 'contact') {
      if (isEmail(value))      setMode('email')
      else if (isPhone(value)) setMode('phone')
      else                     setMode(null)
    }
  }

  const sendViaWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Goutham! You have a new portfolio message.\n\nFrom: ${form.name}\nContact: ${form.contact}\n\nMessage:\n${form.message}`
    )
    window.open(`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${text}`, '_blank')
    setStatus('success')
    setForm({ name: '', contact: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  const sendViaEmail = async () => {
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
      // EmailJS not configured — fall back to WhatsApp
      sendViaWhatsApp()
      return
    }
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_contact: form.contact,
          message:      form.message,
          to_email:     PERSONAL_INFO.email,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', contact: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.contact || !form.message) return
    setStatus('loading')

    if (isPhone(form.contact)) {
      sendViaWhatsApp()
    } else {
      await sendViaEmail()
    }
  }

  const contactHint = mode === 'email'
    ? '📧 Will send you an email'
    : mode === 'phone'
    ? '💬 Will open a WhatsApp message'
    : null

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#915eff]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#06b6d4]/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title gradient-text">Get in Touch</h2>
          <p className="section-subtitle">Let's connect — for work, collaboration, or a chat</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass glass-hover p-6 rounded-2xl">
              <h3 className="text-white font-bold text-lg mb-2">Say Hello!</h3>
              <p className="text-[#aaa6c3] text-sm leading-relaxed">
                Whether you have a project idea, want to collaborate on something exciting, or just want to connect —
                reach out. Enter your <span className="text-white font-medium">email</span> to send me a message, or
                your <span className="text-white font-medium">phone number</span> to reach me on WhatsApp.
              </p>
            </div>

            {/* Open to business */}
            <div className="glass p-6 rounded-2xl border border-[#915eff]/20 bg-gradient-to-br from-[#915eff]/5 to-[#06b6d4]/5">
              <div className="flex items-start gap-3">
                <MdBusinessCenter size={22} className="text-[#915eff] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold mb-1">Open to Business Discussions</h4>
                  <p className="text-[#aaa6c3] text-sm">
                    Have a business idea or want to discuss a collaboration? I'm genuinely interested. Let's talk.
                  </p>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="glass p-5 rounded-2xl border border-white/5 space-y-3">
              <p className="text-white font-semibold text-sm mb-2">How it works</p>
              <div className="flex items-center gap-3 text-sm text-[#aaa6c3]">
                <div className="w-8 h-8 rounded-lg bg-[#915eff]/20 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope size={14} className="text-[#915eff]" />
                </div>
                <span>Enter your <strong className="text-white">email</strong> → I'll receive your message in my inbox</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#aaa6c3]">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <FaWhatsapp size={14} className="text-green-400" />
                </div>
                <span>Enter your <strong className="text-white">phone number</strong> → Opens WhatsApp with your message to me</span>
              </div>
            </div>

            {/* Direct WhatsApp */}
            <a
              href={`https://wa.me/${PERSONAL_INFO.whatsapp}?text=Hi Goutham, I visited your portfolio and would like to connect!`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 glass glass-hover p-4 rounded-xl border border-white/5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <FaWhatsapp size={20} className="text-green-400" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Quick WhatsApp</div>
                <div className="text-[#aaa6c3] text-xs">+91 {PERSONAL_INFO.whatsapp.slice(2)}</div>
              </div>
            </a>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass p-5 sm:p-8 rounded-2xl space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#aaa6c3] mb-1.5">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#aaa6c3]/50 text-sm focus:outline-none focus:border-[#915eff]/60 transition-all"
                />
              </div>

              {/* Email or Phone */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <label className="text-sm font-medium text-[#aaa6c3]">Email or Phone Number</label>
                  {mode === 'email' && (
                    <span className="flex items-center gap-1 text-[#915eff] text-xs font-normal">
                      <FaEnvelope size={11} /> Email detected
                    </span>
                  )}
                  {mode === 'phone' && (
                    <span className="flex items-center gap-1 text-green-400 text-xs font-normal">
                      <FaWhatsapp size={11} /> Phone detected
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="john@email.com  or  +91 9876543210"
                  required
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-[#aaa6c3]/50 text-sm focus:outline-none transition-all ${
                    mode === 'email' ? 'border-[#915eff]/50'
                    : mode === 'phone' ? 'border-green-500/50'
                    : 'border-white/10 focus:border-[#915eff]/60'
                  }`}
                />
                {contactHint && (
                  <p className="text-xs text-[#aaa6c3]/70 mt-1.5 pl-1">{contactHint}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-[#aaa6c3] mb-1.5">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Hi Goutham, I'd like to connect about..."
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#aaa6c3]/50 text-sm focus:outline-none focus:border-[#915eff]/60 transition-all resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 ${
                  status === 'success' ? 'bg-green-500'
                  : status === 'error' ? 'bg-red-500'
                  : mode === 'phone'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5'
                    : 'bg-gradient-to-r from-[#915eff] to-[#06b6d4] hover:shadow-lg hover:shadow-[#915eff]/30 hover:-translate-y-0.5 disabled:opacity-60'
                }`}
              >
                {status === 'loading' && (
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {status === 'success' && <MdCheck size={20} />}
                {status === 'error'   && <MdError size={20} />}
                {status === 'idle' && (
                  mode === 'phone' ? <FaWhatsapp size={18} /> : <MdSend size={18} />
                )}
                <span>
                  {status === 'loading' ? 'Sending...'
                  : status === 'success' ? 'Message Sent!'
                  : status === 'error'   ? 'Failed — try WhatsApp directly'
                  : mode === 'phone'     ? 'Send via WhatsApp'
                  : mode === 'email'     ? 'Send Email'
                  : 'Send Message'}
                </span>
              </button>

              <p className="text-xs text-[#aaa6c3]/60 text-center">
                {mode === 'phone'
                  ? 'WhatsApp will open with your message pre-filled'
                  : mode === 'email'
                  ? 'Message will be delivered to my inbox'
                  : 'Enter email for inbox delivery, phone for WhatsApp'}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
