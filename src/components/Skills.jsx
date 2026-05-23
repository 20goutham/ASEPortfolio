import { useState } from 'react'
import { motion } from 'framer-motion'
import { SKILLS, TOOLS } from '../constants'

const CATEGORIES = ['All', 'Core', 'Frontend', 'Backend', 'Database', 'Data', 'Tools']

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#915eff]/8 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title gradient-text">Skills</h2>
          <p className="section-subtitle">Technologies I work with</p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#915eff] to-[#06b6d4] text-white shadow-lg shadow-[#915eff]/20'
                  : 'glass text-[#aaa6c3] hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skill bars */}
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-12">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass glass-hover p-5 rounded-xl"
            >
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-white font-medium text-sm">{skill.name}</span>
                <span className="gradient-text font-bold text-sm">{skill.percent}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.07, ease: 'easeOut' }}
                  className="h-full skill-bar-fill rounded-full"
                />
              </div>
              <span className="text-xs text-[#aaa6c3] mt-1 inline-block">{skill.category}</span>
            </motion.div>
          ))}
        </div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center text-white font-semibold text-lg mb-6">
            Tools & <span className="gradient-text">Platforms</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {TOOLS.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 glass rounded-xl text-sm text-[#aaa6c3] border border-white/5 hover:border-[#915eff]/30 hover:text-white transition-all cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
