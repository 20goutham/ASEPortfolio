import { motion } from 'framer-motion'
import { HiAcademicCap } from 'react-icons/hi'
import { MdLocationOn, MdCalendarToday } from 'react-icons/md'
import { EDUCATION } from '../constants'

export default function Education() {
  return (
    <section id="education" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#915eff]/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title gradient-text">Education</h2>
          <p className="section-subtitle">Academic foundation</p>
        </motion.div>

        {EDUCATION.map((edu, i) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="glass glass-hover p-5 sm:p-8 max-w-3xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#915eff] to-[#06b6d4] flex items-center justify-center flex-shrink-0 glow-purple">
                <HiAcademicCap size={28} className="text-white" />
              </div>

              <div className="flex-1">
                {/* Degree */}
                <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                <p className="gradient-text font-semibold text-lg mb-2">{edu.field}</p>

                {/* Institution */}
                <p className="text-[#aaa6c3] font-medium mb-3">{edu.institution}</p>

                {/* Meta row */}
                <div className="flex flex-wrap gap-4 mb-5 text-sm text-[#aaa6c3]">
                  <span className="flex items-center gap-1.5">
                    <MdCalendarToday size={14} className="text-[#915eff]" />
                    {edu.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#06b6d4] font-bold text-base">{edu.cgpa}</span>
                    <span>CGPA</span>
                  </span>
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  {edu.highlights.map((point, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm text-[#aaa6c3]">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#915eff] to-[#06b6d4] mt-1.5 flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
