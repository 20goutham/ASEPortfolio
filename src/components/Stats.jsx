import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { value: 1,  suffix: '+',  label: 'Years Experience',     desc: 'Professional software engineering'    },
  { value: 20, suffix: '%+', label: 'Pipeline Faster',      desc: 'Data pipeline optimization at Forsys' },
  { value: 30, suffix: '%',  label: 'CRM Overhead Reduced', desc: 'Through API-driven automation'        },
  { value: 5,  suffix: '+',  label: 'Projects Delivered',   desc: 'Across web, data & AI domains'        },
]

function CountUp({ target, suffix, duration = 1800 }) {
  const [count, setCount]   = useState(0)
  const ref      = useRef(null)
  const timerRef = useRef(null)
  const resetRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Cancel any pending reset
        clearTimeout(resetRef.current)
        // Restart count from 0
        clearInterval(timerRef.current)
        setCount(0)
        let start = 0
        const step = target / (duration / 16)
        timerRef.current = setInterval(() => {
          start += step
          if (start >= target) { setCount(target); clearInterval(timerRef.current) }
          else setCount(Math.floor(start))
        }, 16)
      } else {
        // 600ms cooldown before resetting so brief scroll-past doesn't flash
        resetRef.current = setTimeout(() => {
          clearInterval(timerRef.current)
          setCount(0)
        }, 600)
      }
    }, { threshold: 0.3 })

    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      clearInterval(timerRef.current)
      clearTimeout(resetRef.current)
    }
  }, [target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Stats() {
  return (
    <section className="py-12 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent1)]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent2)]/30 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass glass-hover p-5 rounded-2xl text-center"
            >
              <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-1">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
              <div className="text-[#aaa6c3] text-xs leading-relaxed">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
