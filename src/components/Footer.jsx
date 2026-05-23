import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaHeart } from 'react-icons/fa'
import { PERSONAL_INFO } from '../constants'
import VisitorCount from './VisitorCount'

const SOCIALS = [
  { icon: FaGithub, href: PERSONAL_INFO.github, label: 'GitHub' },
  { icon: FaLinkedin, href: PERSONAL_INFO.linkedin, label: 'LinkedIn' },
  { icon: FaWhatsapp, href: `https://wa.me/${PERSONAL_INFO.whatsapp}`, label: 'WhatsApp' },
  { icon: FaEnvelope, href: '#contact', label: 'Email', onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#915eff]/10 rounded-full blur-[60px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#915eff] to-[#06b6d4] flex items-center justify-center text-white font-bold glow-purple cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            KGR
          </motion.div>

          {/* Name */}
          <p className="text-white font-semibold text-lg">{PERSONAL_INFO.name}</p>
          <p className="text-[#aaa6c3] text-sm">{PERSONAL_INFO.role} · {PERSONAL_INFO.location}</p>

          {/* Social links */}
          <div className="flex gap-4">
            {SOCIALS.map(({ icon: Icon, href, label, onClick }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                onClick={onClick ? (e) => { e.preventDefault(); onClick() } : undefined}
                className="w-10 h-10 glass rounded-xl flex items-center justify-center text-[#aaa6c3] hover:text-[#915eff] hover:border-[#915eff]/30 transition-all duration-200"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/5" />

          {/* Copyright */}
          <p className="text-[#aaa6c3] text-xs flex items-center gap-1.5">
            Built with <FaHeart size={11} className="text-[#915eff]" /> by Goutham Rathod · {new Date().getFullYear()}
          </p>

          <VisitorCount />
        </div>
      </div>
    </footer>
  )
}
