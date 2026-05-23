import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdWork, MdLocationOn, MdCalendarToday, MdExpandMore } from 'react-icons/md'
import { EXPERIENCE } from '../constants'

export default function Experience() {
  const [expanded, setExpanded] = useState({ 0: true, 1: true })
  const [showMore, setShowMore]   = useState({})

  const toggle     = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))
  const toggleMore = (i) => setShowMore(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <section id="experience" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-[var(--accent2)]/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title gradient-text">Experience</h2>
          <p className="section-subtitle">Professional journey and internships</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 timeline-line hidden md:block" />

          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative md:pl-16 mb-6 last:mb-0"
            >
              {/* Timeline dot */}
              <div className="hidden md:flex absolute left-0 top-6 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent1)] to-[var(--accent2)] items-center justify-center glow-purple z-10">
                <MdWork size={20} className="text-white" />
              </div>

              {/* Card */}
              <div className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-[var(--accent1)]/20 transition-all">
                {/* Header */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left p-4 sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white">{exp.company}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                          exp.type === 'Full-time'
                            ? 'bg-[var(--accent1)]/20 text-[var(--accent1)]'
                            : 'bg-[var(--accent2)]/20 text-[var(--accent2)]'
                        }`}>
                          {exp.type}
                        </span>
                      </div>
                      <p className="gradient-text font-semibold text-sm sm:text-base mb-2">{exp.role}</p>
                      <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-[#aaa6c3]">
                        <span className="flex items-center gap-1">
                          <MdCalendarToday size={12} className="text-[var(--accent1)] flex-shrink-0" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MdLocationOn size={12} className="text-[var(--accent2)] flex-shrink-0" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expanded[i] ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#aaa6c3] mt-1 flex-shrink-0"
                    >
                      <MdExpandMore size={24} />
                    </motion.div>
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.tech.map(t => (
                      <span key={t} className="px-2 py-0.5 glass rounded-lg text-xs text-[#aaa6c3] border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {expanded[i] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-5 border-t border-white/5 pt-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          {(exp.domains.length > 2 ? exp.domains.slice(0, 2) : exp.domains).map((domain, j) => (
                            <motion.div
                              key={j}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: j * 0.1 }}
                              className="bg-white/[0.03] rounded-xl p-3 sm:p-4 border border-white/5"
                            >
                              <h4 className="text-[var(--accent1)] font-semibold text-sm mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[var(--accent1)] to-[var(--accent2)] flex-shrink-0" />
                                {domain.area}
                              </h4>
                              <ul className="space-y-2">
                                {domain.points.map((pt, k) => (
                                  <li key={k} className="flex items-start gap-2 text-xs text-[#aaa6c3] leading-relaxed">
                                    <span className="w-1 h-1 rounded-full bg-[var(--accent2)] mt-1.5 flex-shrink-0" />
                                    {pt}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>

                        {/* Hidden domains */}
                        {exp.domains.length > 2 && (
                          <>
                            <AnimatePresence>
                              {showMore[i] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.35 }}
                                  className="overflow-hidden"
                                >
                                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                                    {exp.domains.slice(2).map((domain, j) => (
                                      <motion.div
                                        key={j}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: j * 0.1 }}
                                        className="bg-white/[0.03] rounded-xl p-3 sm:p-4 border border-white/5"
                                      >
                                        <h4 className="text-[var(--accent1)] font-semibold text-sm mb-3 flex items-center gap-2">
                                          <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[var(--accent1)] to-[var(--accent2)] flex-shrink-0" />
                                          {domain.area}
                                        </h4>
                                        <ul className="space-y-2">
                                          {domain.points.map((pt, k) => (
                                            <li key={k} className="flex items-start gap-2 text-xs text-[#aaa6c3] leading-relaxed">
                                              <span className="w-1 h-1 rounded-full bg-[var(--accent2)] mt-1.5 flex-shrink-0" />
                                              {pt}
                                            </li>
                                          ))}
                                        </ul>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <button
                              onClick={() => toggleMore(i)}
                              className="mt-4 flex items-center gap-1.5 text-xs font-medium text-[var(--accent1)] hover:text-[var(--accent2)] transition-colors mx-auto"
                            >
                              <motion.span
                                animate={{ rotate: showMore[i] ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <MdExpandMore size={18} />
                              </motion.span>
                              {showMore[i] ? 'Show less' : `Show ${exp.domains.length - 2} more`}
                            </button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
