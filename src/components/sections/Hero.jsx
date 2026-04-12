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
          <div>
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
              Rendre l'<span className="hl">accessibilité</span> possible grâce à l'innovation Braille
            </motion.h1>

            <motion.p
              className="hero__sub"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
            >
              Imprimantes Braille de nouvelle génération et solutions d'accessibilité
              pour les écoles, institutions et entreprises à travers l'Afrique et au-delà.
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
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="hero__video-wrap">
              <video
                src="/video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="hero__video"
              />
              {/* Subtle border glow overlay */}
              <div className="hero__video-glow" aria-hidden />
            </div>

            {/* Floating accent badges */}
            <div className="hero__float hero__float--1">
              <svg viewBox="0 0 40 40" style={{ width: 36 }}>
                <circle cx="10" cy="10" r="3" fill="white" />
                <circle cx="10" cy="20" r="3" fill="white" />
                <circle cx="10" cy="30" r="3" fill="white" />
                <circle cx="20" cy="10" r="3" fill="white" />
                <circle cx="20" cy="20" r="3" fill="white" />
                <circle cx="30" cy="10" r="3" fill="white" />
              </svg>
            </div>
            <div className="hero__float hero__float--2">A+</div>
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
