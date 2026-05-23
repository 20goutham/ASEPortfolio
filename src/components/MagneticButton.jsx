import { useRef, useEffect } from 'react'

export default function MagneticButton({ children, strength = 0.38, className = '', style = {}, onClick, ...props }) {
  const wrapRef = useRef(null)
  const rafRef  = useRef(null)
  const cur     = useRef({ x: 0, y: 0 })
  const tgt     = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const onMove = (e) => {
      const r  = el.getBoundingClientRect()
      tgt.current = {
        x: (e.clientX - (r.left + r.width  / 2)) * strength,
        y: (e.clientY - (r.top  + r.height / 2)) * strength,
      }
    }
    const onLeave = () => { tgt.current = { x: 0, y: 0 } }

    // Continuous RAF lerp — smooth spring-back on leave
    const tick = () => {
      cur.current.x += (tgt.current.x - cur.current.x) * 0.14
      cur.current.y += (tgt.current.y - cur.current.y) * 0.14
      el.style.transform = `translate(${cur.current.x.toFixed(2)}px, ${cur.current.y.toFixed(2)}px)`
      rafRef.current = requestAnimationFrame(tick)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [strength])

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ display: 'inline-flex', willChange: 'transform', ...style }}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}
