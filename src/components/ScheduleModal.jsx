import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaPhone, FaCalendarAlt, FaTimes } from 'react-icons/fa'
import { PERSONAL_INFO } from '../constants'

// Replace with your Calendly or Google Calendar appointment URL
// Free setup: https://calendly.com  →  use https://calendly.com/YOUR_USERNAME
// OR Google Calendar: Calendar Settings → Appointment schedules → copy the booking link
const BOOKING_LINK = 'https://calendly.com/khatravatgoutham/30min'

const OPTIONS = [
  {
    icon: FaCalendarAlt,
    label: 'Book a Meeting Slot',
    desc: 'Pick a free slot — blocks my calendar',
    color: 'from-[#06b6d4] to-blue-600',
    iconColor: 'text-[#06b6d4]',
    bg: 'bg-[#06b6d4]/10 border-[#06b6d4]/20',
    href: BOOKING_LINK,
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    desc: 'Chat or voice call on WhatsApp',
    color: 'from-green-500 to-emerald-600',
    iconColor: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    href: `https://wa.me/${PERSONAL_INFO.whatsapp}?text=Hi Goutham, I'd like to connect with you!`,
  },
  {
    icon: FaPhone,
    label: 'Phone Call',
    desc: `+91 ${PERSONAL_INFO.whatsapp.slice(2)}`,
    color: 'from-[#915eff] to-violet-600',
    iconColor: 'text-[#915eff]',
    bg: 'bg-[#915eff]/10 border-[#915eff]/20',
    href: `tel:+${PERSONAL_INFO.whatsapp}`,
  },
]

export default function ScheduleModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="relative glass rounded-2xl border border-white/10 max-w-sm w-full p-6 shadow-2xl shadow-black/50"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 glass rounded-lg flex items-center justify-center text-[#aaa6c3] hover:text-white transition-colors"
          >
            <FaTimes size={13} />
          </button>

          <div className="h-1 bg-gradient-to-r from-[var(--accent1)] to-[var(--accent2)] rounded-full mb-5" />

          <h3 className="text-xl font-bold text-white mb-1">Let's Connect</h3>
          <p className="text-[#aaa6c3] text-sm mb-5">Choose how you'd like to reach me</p>

          <div className="space-y-3">
            {OPTIONS.map(opt => (
              <motion.a
                key={opt.label}
                href={opt.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 4 }}
                className={`flex items-center gap-4 p-4 rounded-xl border ${opt.bg} transition-all duration-200 group`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${opt.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <opt.icon size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm">{opt.label}</div>
                  <div className="text-[#aaa6c3] text-xs truncate">{opt.desc}</div>
                </div>
                <span className="text-[#aaa6c3] text-lg group-hover:translate-x-1 transition-transform flex-shrink-0">→</span>
              </motion.a>
            ))}
          </div>

          <p className="text-xs text-[#aaa6c3]/50 text-center mt-5">
            I typically respond within a few hours
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
