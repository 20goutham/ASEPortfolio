import { motion } from 'framer-motion'
import { HiDownload } from 'react-icons/hi'
import { FaEye } from 'react-icons/fa'

const HIGHLIGHTS = [
  'Full Stack Development',
  'Data Engineering',
  'AI / NLP Integration',
  'CRM Migrations',
  'REST API Design',
  'Python & ETL Pipelines',
  'React.js & Node.js',
  'Salesforce & Zoho',
]

export default function Resume() {
  return (
    <section id="resume" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#06b6d4]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#915eff]/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title gradient-text">Resume</h2>
          <p className="section-subtitle">My professional resume — ready to download</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass rounded-2xl overflow-hidden border border-white/10">
            {/* Gradient top bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#915eff] via-[#06b6d4] to-[#915eff]" />

            <div className="p-8 text-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#915eff] to-[#06b6d4] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#915eff]/30">
                <HiDownload size={30} className="text-white" />
              </div>

              {/* Name & title */}
              <h3 className="text-xl font-bold text-white mb-1">Khatravat Goutham Rathod</h3>
              <p className="gradient-text font-semibold mb-1">Associate Software Engineer</p>
              <p className="text-[#aaa6c3] text-sm mb-6">
                Full Stack &nbsp;·&nbsp; Data Engineering &nbsp;·&nbsp; AI / NLP &nbsp;·&nbsp; CRM Integrations
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <a
                  href="/resumes/resume.html"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#915eff] to-[#06b6d4] text-white font-semibold hover:shadow-lg hover:shadow-[#915eff]/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <FaEye size={16} />
                  View Resume
                </a>
                <a
                  href="/resumes/resume.html"
                  download="Goutham_Rathod_Resume.html"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl glass border border-[#915eff]/30 text-white font-semibold hover:border-[#915eff]/60 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <HiDownload size={18} />
                  Download
                </a>
              </div>

              {/* Print tip */}
              <p className="text-xs text-[#aaa6c3]/60">
                To save as PDF — open resume, press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[#aaa6c3] font-mono text-xs">Ctrl+P</kbd> → Save as PDF
              </p>
            </div>

            {/* Skills covered */}
            <div className="border-t border-white/5 p-6">
              <p className="text-xs text-[#aaa6c3] text-center mb-4 font-medium uppercase tracking-wider">
                Skills covered in this resume
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {HIGHLIGHTS.map((h, i) => (
                  <motion.span
                    key={h}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-1 glass rounded-lg text-xs text-[#aaa6c3] border border-white/5"
                  >
                    {h}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
