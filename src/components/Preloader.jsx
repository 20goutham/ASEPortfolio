import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const LETTERS = 'WELCOME'.split('')

const PARTICLES = [
  { id: 0,  x: 8,  y: 12, s: 3, d: 3.1, dl: 0.0, c: 1 },
  { id: 1,  x: 92, y: 18, s: 2, d: 2.5, dl: 0.5, c: 2 },
  { id: 2,  x: 15, y: 80, s: 4, d: 3.8, dl: 0.2, c: 1 },
  { id: 3,  x: 85, y: 75, s: 2, d: 2.8, dl: 0.8, c: 2 },
  { id: 4,  x: 50, y: 5,  s: 3, d: 3.3, dl: 0.3, c: 1 },
  { id: 5,  x: 5,  y: 45, s: 2, d: 2.2, dl: 1.1, c: 2 },
  { id: 6,  x: 95, y: 50, s: 3, d: 3.6, dl: 0.6, c: 1 },
  { id: 7,  x: 25, y: 95, s: 2, d: 2.7, dl: 0.9, c: 2 },
  { id: 8,  x: 75, y: 92, s: 3, d: 3.0, dl: 0.4, c: 1 },
  { id: 9,  x: 40, y: 88, s: 2, d: 2.4, dl: 1.3, c: 2 },
  { id: 10, x: 60, y: 8,  s: 4, d: 3.5, dl: 0.1, c: 1 },
  { id: 11, x: 20, y: 35, s: 2, d: 2.9, dl: 0.7, c: 2 },
  { id: 12, x: 80, y: 30, s: 3, d: 3.2, dl: 1.0, c: 1 },
  { id: 13, x: 35, y: 15, s: 2, d: 2.6, dl: 1.2, c: 2 },
  { id: 14, x: 65, y: 60, s: 3, d: 3.7, dl: 0.3, c: 1 },
  { id: 15, x: 10, y: 65, s: 2, d: 2.3, dl: 0.8, c: 2 },
  { id: 16, x: 88, y: 62, s: 4, d: 3.4, dl: 0.5, c: 1 },
  { id: 17, x: 45, y: 70, s: 2, d: 2.8, dl: 1.4, c: 2 },
  { id: 18, x: 55, y: 30, s: 3, d: 3.1, dl: 0.2, c: 1 },
  { id: 19, x: 30, y: 55, s: 2, d: 2.5, dl: 0.9, c: 2 },
]

// ── Cosmos canvas hook ────────────────────────────────────────────────────────
function useCosmosCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight

    // Read accent CSS vars once (preloader is short-lived)
    function readHex(varName) {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
      if (raw.startsWith('#')) {
        const h = raw.replace('#', '')
        return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) }
      }
      const m = raw.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/)
      if (m) return { r: +m[1], g: +m[2], b: +m[3] }
      return { r: 145, g: 94, b: 255 }
    }
    const c1 = readHex('--accent1')
    const c2 = readHex('--accent2')
    const rgb1 = (a) => `rgba(${c1.r},${c1.g},${c1.b},${a})`
    const rgb2 = (a) => `rgba(${c2.r},${c2.g},${c2.b},${a})`

    // ── Stars ──────────────────────────────────────────────────────────────
    const stars = Array.from({ length: 320 }, () => ({
      nx: Math.random(), ny: Math.random(),
      r:  Math.random() * 1.6 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.1,
      tSpeed: Math.random() * 0.022 + 0.005,
      tPhase: Math.random() * Math.PI * 2,
    }))

    // ── Nebula blobs ───────────────────────────────────────────────────────
    const nebulae = [
      { nx: 0.15, ny: 0.20, r: 0.40, alpha: 0.09, speed: 0.0004, phase: 0.0, ci: 0 },
      { nx: 0.85, ny: 0.75, r: 0.34, alpha: 0.07, speed: 0.0005, phase: 1.5, ci: 1 },
      { nx: 0.50, ny: 0.50, r: 0.50, alpha: 0.05, speed: 0.00025, phase: 2.3, ci: 0 },
      { nx: 0.75, ny: 0.12, r: 0.28, alpha: 0.07, speed: 0.0006, phase: 0.8, ci: 1 },
      { nx: 0.22, ny: 0.82, r: 0.26, alpha: 0.06, speed: 0.00035, phase: 3.1, ci: 1 },
    ]

    // ── Shooting stars ─────────────────────────────────────────────────────
    const meteors = []
    let nextMeteor = (Math.random() * 2 + 1) * 60  // first one appears within ~1-3 s

    function spawnMeteor() {
      if (meteors.length >= 4) return
      const angle = Math.PI / 5 + Math.random() * Math.PI / 8
      const speed = Math.random() * 11 + 9
      meteors.push({
        x: Math.random() * W * 1.1, y: -15,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        alpha: 0.95, trail: [],
      })
    }

    const draw = () => {
      W = canvas.width; H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Stars
      stars.forEach(s => {
        s.tPhase += s.tSpeed
        const alpha = s.baseAlpha + Math.sin(s.tPhase) * s.baseAlpha * 0.5
        const sx = s.nx * W, sy = s.ny * H

        if (s.r > 1.2) {
          const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.r * 5)
          grd.addColorStop(0, `rgba(210,225,255,${alpha * 0.4})`)
          grd.addColorStop(1, `rgba(180,200,255,0)`)
          ctx.beginPath(); ctx.arc(sx, sy, s.r * 5, 0, Math.PI * 2)
          ctx.fillStyle = grd; ctx.fill()
        }
        ctx.beginPath(); ctx.arc(sx, sy, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(215,230,255,${alpha})`; ctx.fill()
      })

      // Nebulae
      nebulae.forEach(n => {
        n.phase += n.speed
        const pulse = 1 + Math.sin(n.phase) * 0.14
        const cx = n.nx * W, cy = n.ny * H
        const r  = n.r * Math.min(W, H) * pulse
        const al = n.alpha + Math.sin(n.phase * 1.5) * 0.02
        const fill = n.ci === 0 ? rgb1 : rgb2

        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        grd.addColorStop(0,   fill(al))
        grd.addColorStop(0.4, fill(al * 0.5))
        grd.addColorStop(1,   fill(0))
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fillStyle = grd; ctx.fill()
      })

      // Shooting stars
      nextMeteor--
      if (nextMeteor <= 0) { spawnMeteor(); nextMeteor = (Math.random() * 4 + 3) * 60 }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        m.trail.unshift({ x: m.x, y: m.y })
        if (m.trail.length > 24) m.trail.pop()
        m.x += m.vx; m.y += m.vy; m.alpha -= 0.011

        if (m.alpha <= 0 || m.x > W + 120 || m.y > H + 120) { meteors.splice(i, 1); continue }

        for (let t = 0; t < m.trail.length - 1; t++) {
          const a = m.alpha * (1 - t / m.trail.length)
          ctx.beginPath()
          ctx.moveTo(m.trail[t].x, m.trail[t].y)
          ctx.lineTo(m.trail[t + 1].x, m.trail[t + 1].y)
          ctx.strokeStyle = `rgba(255,255,255,${a})`
          ctx.lineWidth = (1 - t / m.trail.length) * 3
          ctx.lineCap = 'round'; ctx.stroke()
        }

        const hg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 8)
        hg.addColorStop(0, `rgba(255,255,255,${m.alpha})`)
        hg.addColorStop(0.4, `rgba(200,220,255,${m.alpha * 0.5})`)
        hg.addColorStop(1, 'rgba(180,200,255,0)')
        ctx.beginPath(); ctx.arc(m.x, m.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = hg; ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(animId)
  }, [canvasRef])
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Preloader({ onDone }) {
  const canvasRef = useRef(null)
  useCosmosCanvas(canvasRef)

  useEffect(() => {
    const t = setTimeout(onDone, 3500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* ── Cosmos canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* ── Ambient gradient blobs (sit on top of canvas) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute rounded-full"
          style={{
            width: 700, height: 700,
            top: '50%', left: '30%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, var(--accent1), transparent 65%)',
          }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            bottom: '30%', right: '25%',
            transform: 'translate(50%, 50%)',
            background: 'radial-gradient(circle, var(--accent2), transparent 65%)',
          }}
        />
      </div>

      {/* ── Floating accent particles ── */}
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.s, height: p.s,
            background: p.c === 1 ? 'var(--accent1)' : 'var(--accent2)',
          }}
          animate={{ y: [-12, 12, -12], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: p.d, delay: p.dl, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Central logo ── */}
      <motion.div
        initial={{ scale: 0, rotate: -200, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.75, type: 'spring', stiffness: 180, damping: 14, delay: 0.1 }}
        className="relative mb-10 z-10"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full border border-dashed"
          style={{ inset: -30, borderColor: 'var(--accent1)', opacity: 0.25 }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full border"
          style={{ inset: -16, borderColor: 'var(--accent2)', opacity: 0.2 }}
        />
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-2xl blur-xl"
          style={{ background: 'linear-gradient(135deg, var(--accent1), var(--accent2))' }}
        />
        <div
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-white font-black shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, var(--accent1), var(--accent2))',
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          }}
        >
          KGR
        </div>
      </motion.div>

      {/* ── WELCOME letters ── */}
      <div className="flex items-end gap-1 sm:gap-2 mb-4 z-10 overflow-hidden">
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55 + i * 0.075, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-black tracking-widest leading-none"
            style={{
              fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
              color: 'var(--text)',
              textShadow: i % 2 === 0
                ? '0 0 40px var(--accent1)'
                : '0 0 40px var(--accent2)',
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* ── Tagline ── */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, duration: 0.55 }}
        className="text-sm sm:text-base font-light tracking-[0.35em] uppercase mb-3 z-10"
        style={{ color: 'var(--muted)' }}
      >
        Glad you're here
      </motion.p>

      {/* ── Divider ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.7, duration: 0.5 }}
        className="h-px w-32 sm:w-48 mb-3 z-10"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent1), var(--accent2), transparent)' }}
      />

      {/* ── Name ── */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.95, duration: 0.5 }}
        className="text-xs sm:text-sm font-semibold tracking-widest z-10"
        style={{
          background: 'linear-gradient(90deg, var(--accent1), var(--accent2))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        KHATRAVAT GOUTHAM RATHOD
      </motion.p>

      {/* ── Role ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.5 }}
        className="text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-1 z-10"
        style={{ color: 'var(--muted)', opacity: 0.6 }}
      >
        Associate Software Engineer
      </motion.p>

      {/* ── Progress bar ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.2, duration: 3.1, ease: 'linear' }}
          className="h-full"
          style={{ background: 'linear-gradient(90deg, var(--accent1), var(--accent2))' }}
        />
      </div>

      {/* ── Corner accents ── */}
      {[
        'top-6 left-6 border-t border-l',
        'top-6 right-6 border-t border-r',
        'bottom-6 left-6 border-b border-l',
        'bottom-6 right-6 border-b border-r',
      ].map((cls, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
          className={`absolute w-6 h-6 ${cls}`}
          style={{ borderColor: 'var(--accent1)', opacity: 0.35 }}
        />
      ))}
    </motion.div>
  )
}
