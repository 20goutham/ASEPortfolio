import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'
import { MdCode, MdOpenInNew } from 'react-icons/md'
import { PROJECTS } from '../constants'

function CaseStudyModal({ project, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={e => e.stopPropagation()}
          className="relative glass rounded-2xl border border-white/10 max-w-lg w-full p-5 sm:p-7 shadow-2xl shadow-black/50 max-h-[90vh] overflow-y-auto"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 glass rounded-lg flex items-center justify-center text-[#aaa6c3] hover:text-white transition-colors"
          >
            <FaTimes size={14} />
          </button>

          {/* Gradient bar */}
          <div className={`h-1 bg-gradient-to-r ${project.color} rounded-full mb-5`} />

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
          <p className="text-[#aaa6c3] text-sm mb-5">{project.description}</p>

          {/* Case study sections */}
          <div className="space-y-4">
            <div>
              <h4 className="text-[#915eff] font-semibold text-sm mb-2">Problem</h4>
              <p className="text-[#aaa6c3] text-sm leading-relaxed">{project.caseStudy?.problem}</p>
            </div>
            <div>
              <h4 className="text-[#06b6d4] font-semibold text-sm mb-2">Solution</h4>
              <p className="text-[#aaa6c3] text-sm leading-relaxed">{project.caseStudy?.solution}</p>
            </div>
            <div>
              <h4 className="text-green-400 font-semibold text-sm mb-2">Outcome</h4>
              <p className="text-[#aaa6c3] text-sm leading-relaxed">{project.caseStudy?.outcome}</p>
            </div>
          </div>

          {/* Key highlights */}
          <div className="mt-5 pt-4 border-t border-white/5">
            <p className="text-xs font-medium text-[#aaa6c3] uppercase tracking-wider mb-3">Key Features</p>
            <ul className="space-y-1.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#aaa6c3]">
                  <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${project.color} mt-1 flex-shrink-0`} />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tech.map(t => (
              <span key={t} className="px-2.5 py-1 glass rounded-lg text-xs text-[#aaa6c3] border border-white/5">{t}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Projects() {
  const [activeCase, setActiveCase] = useState(null)

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#915eff]/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title gradient-text">Projects</h2>
          <p className="section-subtitle">Things I've built</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-[#915eff]/30 transition-all duration-300 group flex flex-col"
            >
              <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}>
                      <MdCode size={20} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#915eff] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer"
                        className="w-8 h-8 glass rounded-lg flex items-center justify-center text-[#aaa6c3] hover:text-white transition-colors">
                        <FaGithub size={15} />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer"
                        className="w-8 h-8 glass rounded-lg flex items-center justify-center text-[#aaa6c3] hover:text-white transition-colors">
                        <FaExternalLinkAlt size={13} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-[#aaa6c3] text-sm leading-relaxed mb-4">{project.description}</p>

                <ul className="space-y-1.5 mb-5 flex-1">
                  {project.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-[#aaa6c3]">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${project.color} mt-1 flex-shrink-0`} />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(t => (
                    <span key={t} className="px-2.5 py-1 glass rounded-lg text-xs text-[#aaa6c3] border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Case study button */}
                <button
                  onClick={() => setActiveCase(project)}
                  className={`mt-auto w-full py-2 rounded-xl text-xs font-semibold border transition-all duration-200 flex items-center justify-center gap-1.5 bg-gradient-to-r ${project.color} bg-clip-text text-transparent border-white/10 hover:border-[#915eff]/40`}
                >
                  <MdOpenInNew size={14} className="text-[#915eff]" />
                  View Case Study
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {activeCase && <CaseStudyModal project={activeCase} onClose={() => setActiveCase(null)} />}
    </section>
  )
}
