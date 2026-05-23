import { useEffect, useRef } from 'react'

const TRAIL_COUNT = 8
const RING_LERP   = 0.12
const TRAIL_LERP  = [0.22, 0.19, 0.16, 0.13, 0.11, 0.09, 0.07, 0.055]

export default function CursorTrail() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const trailRefs = useRef([])
  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const trail   = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 })))
  const rafRef  = useRef(null)
  const hovRef  = useRef(false)

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none'

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }

      const el = e.target
      hovRef.current = el.closest('a, button, [role=button], input, textarea, select, label, [tabindex]') !== null
    }

    const onLeave = () => {
      pos.current = { x: -200, y: -200 }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    const tick = () => {
      const { x, y } = pos.current
      const isHov = hovRef.current

      // Main dot — snap
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px) scale(${isHov ? 0 : 1})`
      }

      // Ring — lerp + scale on hover
      ring.current.x += (x - ring.current.x) * RING_LERP
      ring.current.y += (y - ring.current.y) * RING_LERP
      if (ringRef.current) {
        const scale = isHov ? 1.8 : 1
        ringRef.current.style.transform = `translate(${ring.current.x - 13}px, ${ring.current.y - 13}px) scale(${scale})`
        ringRef.current.style.opacity   = isHov ? '0.35' : '0.55'
      }

      // Trailing dots — cascade lerp from previous position
      let prevX = x, prevY = y
      trail.current.forEach((t, i) => {
        t.x += (prevX - t.x) * TRAIL_LERP[i]
        t.y += (prevY - t.y) * TRAIL_LERP[i]
        const el = trailRefs.current[i]
        if (el) {
          const r = 3 - i * 0.28
          el.style.transform = `translate(${t.x - r}px, ${t.y - r}px)`
          el.style.opacity   = String((0.45 - i * 0.05) * (isHov ? 0.3 : 1))
        }
        prevX = t.x; prevY = t.y
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Hide on touch devices — they have no cursor
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <div aria-hidden="true" style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 9999 }}>
      {/* Main dot */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'var(--accent1)',
          boxShadow: '0 0 6px var(--accent1)',
          willChange: 'transform',
          transition: 'transform 0.05s',
        }}
      />

      {/* Hollow ring */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 26, height: 26,
          borderRadius: '50%',
          border: '1.5px solid var(--accent1)',
          willChange: 'transform',
          transition: 'opacity 0.2s, transform 0.08s',
        }}
      />

      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => {
        const r = 3 - i * 0.28
        return (
          <div
            key={i}
            ref={el => { trailRefs.current[i] = el }}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width:  r * 2,
              height: r * 2,
              borderRadius: '50%',
              background: 'var(--accent2)',
              willChange: 'transform',
            }}
          />
        )
      })}
    </div>
  )
}
