import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Braille dot patterns [d1,d2,d3,d4,d5,d6]
   Grid:  d1 d4
          d2 d5
          d3 d6                                  ── */
const BRAILLE = {
  T: [0,1,1,1,1,0],
  U: [1,0,1,0,0,1],
  N: [1,0,1,1,1,0],
  B: [1,1,0,0,0,0],
  R: [1,1,1,0,1,0],
  A: [1,0,0,0,0,0],
}
const LETTERS = ['T','U','N','B','R','A']

/* Render one braille cell */
function BrailleGrid({ dots }) {
  return (
    <div className="loader__braille-grid">
      {[0,1,2].map(row =>
        [0,1].map(col => {
          const active = dots[row + col * 3] === 1
          return (
            <motion.div
              key={`${row}-${col}`}
              className={`loader__dot ${active ? 'loader__dot--on' : 'loader__dot--off'}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.28,
                delay: (row + col * 3) * 0.055,
                type: 'spring',
                stiffness: 380,
                damping: 18,
              }}
            />
          )
        })
      )}
    </div>
  )
}

/* ── Main Loader ── */
export default function Loader({ onDone }) {
  const [phase, setPhase]           = useState('init')   // init→typing→converting→done→exit
  const [convertedCount, setCount]  = useState(0)
  const [progress, setProgress]     = useState(0)

  /* Phase timeline */
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('typing'),     150),
      setTimeout(() => setPhase('converting'), 1000),
      setTimeout(() => setPhase('done'),       2500),
      setTimeout(() => onDone(),               3600),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  /* Convert letters one by one during converting phase */
  useEffect(() => {
    if (phase !== 'converting' && phase !== 'done') return
    if (convertedCount >= LETTERS.length) return
    const id = setTimeout(() => setCount(c => c + 1), 230)
    return () => clearTimeout(id)
  }, [phase, convertedCount])

  /* Smooth progress bar */
  useEffect(() => {
    const start    = Date.now()
    const duration = 3400
    const id = setInterval(() => {
      const p = Math.min(((Date.now() - start) / duration) * 100, 100)
      setProgress(p)
      if (p >= 100) clearInterval(id)
    }, 25)
    return () => clearInterval(id)
  }, [])

  /* Lock body scroll while loading */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const isTyping     = phase !== 'init'
  const isConverting = phase === 'converting' || phase === 'done'
  const isDone       = phase === 'done'

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
      transition={{ duration: 0.3 }}
    >
      {/* Background braille dot texture */}
      <div className="loader__bg" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="ldots" x="0" y="0" width="40" height="56" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2.2" fill="white" />
              <circle cx="10" cy="24" r="2.2" fill="white" />
              <circle cx="10" cy="38" r="2.2" fill="white" />
              <circle cx="24" cy="10" r="2.2" fill="white" />
              <circle cx="24" cy="24" r="2.2" fill="white" />
              <circle cx="24" cy="38" r="2.2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ldots)" />
        </svg>
      </div>

      {/* Logo (appears when done) */}
      <motion.div
        className="loader__logo"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: isDone ? 1 : 0, y: isDone ? 0 : -8 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/logo_TunBra_png.png" alt="TunBra" />
      </motion.div>

      {/* TUNBRA word → braille conversion */}
      <div className="loader__word">
        {LETTERS.map((letter, i) => {
          const shown     = isTyping
          const converted = isConverting && convertedCount > i

          return (
            <motion.div
              key={letter}
              className="loader__cell"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 22 }}
              transition={{ duration: 0.35, delay: shown ? i * 0.09 : 0 }}
            >
              <AnimatePresence mode="wait">
                {!converted ? (
                  /* Letter */
                  <motion.div
                    key="ltr"
                    exit={{ opacity: 0, scale: 0.4, rotateX: 90, transition: { duration: 0.18 } }}
                    className="loader__letter"
                  >
                    {letter}
                  </motion.div>
                ) : (
                  /* Braille cell */
                  <motion.div
                    key="brl"
                    initial={{ opacity: 0, scale: 0.4, rotateX: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    <BrailleGrid dots={BRAILLE[letter]} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Small letter label under braille */}
              <motion.span
                className="loader__under-letter"
                initial={{ opacity: 0 }}
                animate={{ opacity: converted ? 0.5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {letter}
              </motion.span>
            </motion.div>
          )
        })}
      </div>

      {/* Status text */}
      <div className="loader__status">
        <AnimatePresence mode="wait">
          {isDone ? (
            <motion.span
              key="done"
              className="loader__status-done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              ✓ &nbsp;Système Braille initialisé
            </motion.span>
          ) : (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Conversion en cours
              <Blink />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="loader__bar-wrap">
        <div className="loader__bar" style={{ width: `${progress}%` }} />
      </div>
    </motion.div>
  )
}

/* Blinking cursor */
function Blink() {
  const [on, setOn] = useState(true)
  useEffect(() => {
    const id = setInterval(() => setOn(v => !v), 500)
    return () => clearInterval(id)
  }, [])
  return <span style={{ opacity: on ? 1 : 0, marginLeft: 2 }}>▌</span>
}
