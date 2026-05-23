import { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'

const API    = 'https://api.counterapi.dev/v1/gouthamrathod/portfolio/up'
const OFFSET = 14   // API starts at 1 → displayed starts at 15

export default function VisitorCount() {
  const [count, setCount] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(d => {
        const val = d?.count ?? d?.value
        if (typeof val === 'number') setCount(val + OFFSET)
        else setError(true)
      })
      .catch(() => setError(true))
  }, [])

  const label = error ? 15 : count === null ? '···' : count.toLocaleString()

  return (
    <span className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--muted)', opacity: 0.55 }}>
      <FaEye size={11} />
      {label} visits in the last 10 days
    </span>
  )
}
