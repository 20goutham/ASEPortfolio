import { useEffect, useRef } from 'react'

// Fibonacci lattice — evenly distributed points on unit sphere
const N = 100
const GOLDEN = (1 + Math.sqrt(5)) / 2
const SPHERE_PTS = Array.from({ length: N }, (_, i) => {
  const theta = Math.acos(1 - 2 * (i + 0.5) / N)
  const phi   = 2 * Math.PI * i / GOLDEN
  return [Math.sin(theta) * Math.cos(phi), Math.cos(theta), Math.sin(theta) * Math.sin(phi)]
})

// Pre-compute edges (connect nearby nodes — dot product threshold)
const EDGES = []
for (let a = 0; a < N; a++) {
  for (let b = a + 1; b < N; b++) {
    const d = SPHERE_PTS[a][0]*SPHERE_PTS[b][0] +
              SPHERE_PTS[a][1]*SPHERE_PTS[b][1] +
              SPHERE_PTS[a][2]*SPHERE_PTS[b][2]
    if (d > 0.60) EDGES.push([a, b])
  }
}

function hexToRgb(hex) {
  const h = hex.replace(/\s/g, '')
  if (!h.startsWith('#') || h.length < 7) return [145, 94, 255]
  return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]
}

export default function TechSphere() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx  = canvas.getContext('2d')
    const SIZE = 500
    canvas.width  = SIZE
    canvas.height = SIZE

    const root  = document.documentElement
    const TILT  = 0.28         // fixed X-axis tilt (radians)
    const FOV   = 4.2          // perspective strength
    const R     = SIZE * 0.38  // sphere radius in canvas pixels

    let angle = 0
    let raf

    // Lerped current colors (start at default nebula palette)
    const c = { r1:145, g1:94,  b1:255, r2:6, g2:182, b2:212 }
    const LERP = 0.035

    function draw() {
      ctx.clearRect(0, 0, SIZE, SIZE)

      // ── Read & lerp accent colors ──────────────────────────────
      const hex1 = getComputedStyle(root).getPropertyValue('--accent1').trim()
      const hex2 = getComputedStyle(root).getPropertyValue('--accent2').trim()
      const [tr1,tg1,tb1] = hexToRgb(hex1)
      const [tr2,tg2,tb2] = hexToRgb(hex2)
      c.r1 += (tr1 - c.r1) * LERP; c.g1 += (tg1 - c.g1) * LERP; c.b1 += (tb1 - c.b1) * LERP
      c.r2 += (tr2 - c.r2) * LERP; c.g2 += (tg2 - c.g2) * LERP; c.b2 += (tb2 - c.b2) * LERP

      // ── Project all points ─────────────────────────────────────
      const cosA = Math.cos(angle), sinA = Math.sin(angle)
      const cosT = Math.cos(TILT),  sinT = Math.sin(TILT)
      const cx = SIZE / 2, cy = SIZE / 2

      const proj = SPHERE_PTS.map(([x, y, z]) => {
        // Y-axis rotation
        const x1 = x * cosA + z * sinA
        const z1 = -x * sinA + z * cosA
        // X-axis tilt
        const y2 = y * cosT - z1 * sinT
        const z2 = y * sinT + z1 * cosT
        // Perspective divide
        const s  = FOV / (FOV + z2)
        const depth = (z2 + 1) / 2   // 0 = back, 1 = front
        return { px: cx + x1 * R * s, py: cy + y2 * R * s, depth }
      })

      // ── Draw edges (back → front) ──────────────────────────────
      EDGES
        .map(([a, b]) => ({ a, b, d: (proj[a].depth + proj[b].depth) / 2 }))
        .sort((x, y) => x.d - y.d)
        .forEach(({ a, b, d }) => {
          if (d < 0.1) return
          const alpha = d * d * 0.45
          const t = d
          const r = (c.r1 + (c.r2-c.r1) * t) | 0
          const g = (c.g1 + (c.g2-c.g1) * t) | 0
          const bl = (c.b1 + (c.b2-c.b1) * t) | 0
          ctx.beginPath()
          ctx.moveTo(proj[a].px, proj[a].py)
          ctx.lineTo(proj[b].px, proj[b].py)
          ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`
          ctx.lineWidth = 0.7
          ctx.stroke()
        })

      // ── Draw nodes ─────────────────────────────────────────────
      proj.forEach(({ px, py, depth }) => {
        if (depth < 0.1) return
        const alpha = depth * depth * 0.95
        const t  = depth
        const r  = (c.r1 + (c.r2-c.r1) * t) | 0
        const g  = (c.g1 + (c.g2-c.g1) * t) | 0
        const bl = (c.b1 + (c.b2-c.b1) * t) | 0
        const rad = 0.7 + depth * 2.2

        // Node dot
        ctx.beginPath()
        ctx.arc(px, py, rad, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${bl},${alpha})`
        ctx.fill()

        // Halo glow on front-facing nodes
        if (depth > 0.72) {
          ctx.beginPath()
          ctx.arc(px, py, rad * 3.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${bl},${(alpha * 0.12).toFixed(3)})`
          ctx.fill()
        }
      })

      angle += 0.0035
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
