import { motion } from 'framer-motion'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.35, delay: delay * 0.6 },
})

const getGuides = (t) => [
  {
    lang:    '🇫🇷 ' + t('guides.items.french.lang'),
    title:   t('guides.items.french.title'),
    desc:    t('guides.items.french.desc'),
    href:    '/TunBra_Guide_FR (2).pdf',
    bg:      'linear-gradient(135deg,#1e3a8a,#3d54ea)',
    accent:  '#7e9bfa',
  },
  {
    lang:    '🇹🇳 ' + t('guides.items.arabic.lang'),
    title:   t('guides.items.arabic.title'),
    desc:    t('guides.items.arabic.desc'),
    href:    '/tunbra_user_manual_ar (2).pdf',
    bg:      'linear-gradient(135deg,#083345,#04b8e0)',
    accent:  '#5fe3fb',
  },
]

export default function Guides() {
  const { t } = useLanguage()
  const guides = getGuides(t)

  return (
    <section id="guides" className="guides">
      <div className="wrap">
        {/* Header */}
        <div className="sec-head">
          <motion.div {...fadeUp(0)}>
            <span className="pill pill--white">
              <BookOpen size={13} /> {t('guides.badge')}
            </span>
          </motion.div>
          <motion.h2 {...fadeUp(0.08)}>
            {(() => {
              const title = t('guides.title')
              const highlight = t('guides.highlight')
              const parts = title.split(highlight)
              if (parts.length === 1) return <>{title} <span className="grad-text">{highlight}</span></>
              return <>{parts[0]}<span className="grad-text">{highlight}</span>{parts[1] || ''}</>
            })()}
          </motion.h2>
          <motion.p {...fadeUp(0.15)}>
            {t('guides.subtitle')}
          </motion.p>
        </div>

        {/* Guide cards */}
        <div className="guides__grid">
          {guides.map((g, i) => (
            <motion.a
              key={g.lang}
              href={g.href}
              target="_blank"
              rel="noopener noreferrer"
              className="guide-card"
              {...fadeUp(0.2 + i * 0.12)}
            >
              {/* Icon */}
              <div className="guide-card__icon" style={{ background: g.bg }}>
                <span style={{ fontSize: '2rem' }}>📄</span>
              </div>

              {/* Body */}
              <div className="guide-card__body">
                <div className="guide-card__lang" style={{ color: g.accent }}>
                  {g.lang}
                </div>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
              </div>

              {/* Arrow */}
              <div className="guide-card__arrow">
                <ArrowUpRight size={20} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Note */}
        <motion.p
          {...fadeUp(0.45)}
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            fontSize: '.85rem',
            color: 'rgba(255,255,255,.3)',
          }}
        >
          PDF · {t('guides.note')}
        </motion.p>
      </div>
    </section>
  )
}
