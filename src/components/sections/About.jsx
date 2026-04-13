import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Lightbulb, Heart, Globe } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.35, delay: delay * 0.6 },
})

const getValues = (t) => [
  { Icon: Target,    title: t('about.values.mission.title'),    desc: t('about.values.mission.desc') },
  { Icon: Lightbulb, title: t('about.values.innovation.title'), desc: t('about.values.innovation.desc') },
  { Icon: Heart,     title: t('about.values.human.title'),      desc: t('about.values.human.desc') },
  { Icon: Globe,     title: t('about.values.global.title'),    desc: t('about.values.global.desc') },
]

const getStats = (t) => [
  { num: '2024',    label: t('about.stats.founded') },
  { num: 'Tunisia', label: t('about.stats.hq') },
  { num: '3+',      label: t('about.stats.team') },
  { num: 'ISO',     label: t('about.stats.certified') },
]

export default function About() {
  const { t } = useLanguage()
  const values = getValues(t)
  const stats = getStats(t)

  return (
    <section id="about" className="about">
      <div className="wrap">
        <div className="about__grid">
          {/* Text */}
          <div className="about__text">
            <motion.div {...fadeUp(0)}>
              <span className="pill pill--pri">{t('about.badge')}</span>
            </motion.div>

            <motion.h2 {...fadeUp(0.08)}>
              {(() => {
                const title = t('about.title')
                const highlight = t('about.highlight')
                const parts = title.split(highlight)
                if (parts.length === 1) return <>{title} <span className="grad-text">{highlight}</span></>
                return <>{parts[0]}<span className="grad-text">{highlight}</span>{parts[1] || ''}</>
              })()}
            </motion.h2>

            <motion.p {...fadeUp(0.15)}>
              {t('about.p1')}
            </motion.p>

            <motion.p {...fadeUp(0.2)}>
              {t('about.p2')}
            </motion.p>

            <motion.div className="about__partner-logos" {...fadeUp(0.26)}>
              {[
                { src: '/4.PNG', alt: 'SDG 4' },
                { src: '/10.PNG', alt: 'SDG 10' },
                { src: '/17.PNG', alt: 'SDG 17' },
              ].map(l => (
                <div key={l.alt} className="about__partner-logo">
                  <img src={l.src} alt={l.alt} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Value cards */}
          <div className="about__cards">
            {values.map((v, i) => (
              <motion.div key={v.title} className="val-card" {...fadeUp(0.1 + i * 0.08)}>
                <div className="val-card__ico">
                  <v.Icon size={22} />
                </div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div className="about__stats" {...fadeUp(0.4)}>
          {stats.map(s => (
            <div key={s.label}>
              <div className="about__stat-num">{s.num}</div>
              <div className="about__stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
