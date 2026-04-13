import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const go = (e, href) => {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

const videoBlock = (
  <motion.div
    className="hero__visual"
    initial={{ opacity: 0, scale: 0.88, y: 20 }}
    animate={{ opacity: 1, scale: 1,    y: 0 }}
    transition={{ duration: 0.4, delay: 0.08 }}
  >
    <div className="hero__frame">
      <div className="hero__video-wrap">
        <div className="hero__scan" aria-hidden />
        <video src="/video.mp4" autoPlay muted loop playsInline className="hero__video" data-always-play="true" />
        <div className="hero__video-glow" aria-hidden />
      </div>
    </div>
  </motion.div>
)

export default function Hero() {
  const { t } = useLanguage()
  return (
    <section className="hero">
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />

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

          {/* ── Text top: badge + title + subtitle ── */}
          <div className="hero__text-top">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="hero__badge">
                Made in
                <img src="/flag.webp" alt="Tunisia flag" className="hero__badge-flag" />
                Tunisia with love
                <img src="/heart.png" alt="heart" className="hero__badge-heart" />
              </div>
            </motion.div>

            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.04 }}
            >
              {(() => {
                const title = t('hero.title')
                const highlight = t('hero.highlight')
                const parts = title.split(highlight)
                if (parts.length === 1) {
                  // Highlight not in title, show title + space + highlight
                  return <>{title} <span className="hl">{highlight}</span></>
                }
                return <>{parts[0]}<span className="hl">{highlight}</span>{parts[1] || ''}</>
              })()}
            </motion.h1>

            <motion.p
              className="hero__sub"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
            >
              {t('hero.subtitle')}
            </motion.p>
          </div>

          {/* ── Video (mobile: between subtitle and CTAs; desktop: right column) ── */}
          {videoBlock}

          {/* ── Text bottom: CTAs + trust ── */}
          <div className="hero__text-bottom">
            <motion.div
              className="hero__ctas"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.18 }}
            >
              <a href="#products" onClick={e => go(e, '#products')} className="btn btn-acc btn-lg">
                {t('hero.ctaPrimary')} <ArrowRight size={18} />
              </a>
              <a href="#contact" onClick={e => go(e, '#contact')} className="btn btn-ghost btn-lg">
                <Play size={17} /> {t('hero.ctaSecondary')}
              </a>
            </motion.div>

            <motion.div
              className="hero__trust"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.42 }}
            >
              {[t('hero.stats.countries'), t('hero.stats.devices'), t('hero.stats.support')].map(s => (
                <div key={s} className="hero__trust-item">
                  <span className="hero__trust-dot" />
                  {s}
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      <div className="hero__scroll" aria-hidden>
        <div className="hero__scroll-wheel">
          <div className="hero__scroll-dot" />
        </div>
        SCROLL
      </div>
    </section>
  )
}
