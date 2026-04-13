import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

const go = (e, href) => {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section className="hero">
      {/* Background orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />

      {/* Braille dot pattern */}
      <div className="hero__dots" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="bp" x="0" y="0" width="40" height="56" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2.5" fill="white" />
              <circle cx="10" cy="24" r="2.5" fill="white" />
              <circle cx="10" cy="38" r="2.5" fill="white" />
              <circle cx="24" cy="10" r="2.5" fill="white" />
              <circle cx="24" cy="24" r="2.5" fill="white" />
              <circle cx="24" cy="38" r="2.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bp)" />
        </svg>
      </div>

      <div className="wrap">
        <div className="hero__inner">

          {/* ── Text ── */}
          <div style={{ order: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="hero__badge">
                <span className="hero__badge-dot" />
                <Sparkles size={13} />
                Pionnier de l'innovation Braille en Afrique
              </div>
            </motion.div>

            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              L'<span className="hl">accessibilité</span> Braille, réinventée.
            </motion.h1>

            <motion.p
              className="hero__sub"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
            >
              Imprimantes Braille intelligentes pour les écoles, institutions et entreprises — fabriquées en Tunisie.
            </motion.p>

            <motion.div
              className="hero__ctas"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26 }}
            >
              <a href="#products" onClick={e => go(e, '#products')} className="btn btn-acc btn-lg">
                Découvrir nos produits <ArrowRight size={18} />
              </a>
              <a href="#contact" onClick={e => go(e, '#contact')} className="btn btn-ghost btn-lg">
                <Play size={17} /> Demander une démo
              </a>
            </motion.div>

            <motion.div
              className="hero__trust"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.42 }}
            >
              {['Certifié ISO', 'Fabriqué en Tunisie', 'Support 24/7'].map(t => (
                <div key={t} className="hero__trust-item">
                  <span className="hero__trust-dot" />
                  {t}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Video ── */}
          <motion.div
            className="hero__visual"
            style={{ order: 2 }}
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* Decorative frame */}
            <div className="hero__frame">
              {/* Corner brackets */}
              <span className="hero__corner hero__corner--tl" aria-hidden />
              <span className="hero__corner hero__corner--tr" aria-hidden />
              <span className="hero__corner hero__corner--bl" aria-hidden />
              <span className="hero__corner hero__corner--br" aria-hidden />

              <div className="hero__video-wrap">
                {/* Animated scan line */}
                <div className="hero__scan" aria-hidden />
                <video
                  src="/video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="hero__video"
                />
                <div className="hero__video-glow" aria-hidden />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden>
        <div className="hero__scroll-wheel">
          <div className="hero__scroll-dot" />
        </div>
        SCROLL
      </div>
    </section>
  )
}
