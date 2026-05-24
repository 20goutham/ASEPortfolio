import { motion } from 'framer-motion'
import { FaPlane } from 'react-icons/fa'
import { MdBusinessCenter, MdPool, MdSportsTennis } from 'react-icons/md'
import { PERSONAL_INFO } from '../constants'

const interestIcons = { Badminton: MdSportsTennis, Swimming: MdPool, Travelling: FaPlane }

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }),
}

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#06b6d4]/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title gradient-text">About Me</h2>
          <p className="section-subtitle">Who I am beyond the code</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Bio card */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={fadeUp}
            className="glass glass-hover p-5 sm:p-8"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Hi, I'm <span className="gradient-text">Goutham</span>
            </h3>
            <p className="text-[#aaa6c3] leading-relaxed mb-6">
              {PERSONAL_INFO.bio}
            </p>
            <div className="flex items-center gap-2 text-sm text-[#aaa6c3]">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Based in {PERSONAL_INFO.location}</span>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Interests */}
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={fadeUp}
              className="glass glass-hover p-6"
            >
              <h4 className="text-white font-semibold mb-4">Interests & Hobbies</h4>
              <div className="flex gap-4 flex-wrap">
                {PERSONAL_INFO.interests.map(interest => {
                  const Icon = interestIcons[interest] || FaBadminton
                  return (
                    <div
                      key={interest}
                      className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-[#915eff]/20 text-sm text-[#aaa6c3] hover:text-[#915eff] hover:border-[#915eff]/40 transition-all"
                    >
                      <Icon size={16} className="text-[#915eff]" />
                      <span>{interest}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Open to collaborate */}
            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={fadeUp}
              className="glass p-6 border border-[#915eff]/30 rounded-2xl bg-gradient-to-br from-[#915eff]/10 to-[#06b6d4]/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#915eff] to-[#06b6d4] flex items-center justify-center flex-shrink-0">
                  <MdBusinessCenter size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Open to Business & Collaboration</h4>
                  <p className="text-[#aaa6c3] text-sm leading-relaxed">
                    Interested in technology, startups, and building impactful products. If you have a business idea,
                    a project in mind, or simply want to discuss possibilities — I'm always open to a conversation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={fadeUp}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { value: '1+', label: 'Years Exp.' },
                { value: '5+', label: 'Projects' },
                { value: '2', label: 'Internships' },
              ].map(stat => (
                <div key={stat.label} className="glass glass-hover p-4 text-center rounded-xl">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-[#aaa6c3] mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
