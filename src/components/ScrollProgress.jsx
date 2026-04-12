import { useState, useEffect } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement
      const top = el.scrollTop || document.body.scrollTop
      const max = el.scrollHeight - el.clientHeight
      setPct(max > 0 ? (top / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-progress" aria-hidden>
      <div className="scroll-progress__bar" style={{ width: `${pct}%` }} />
    </div>
  )
}
