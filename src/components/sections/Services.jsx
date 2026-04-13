import { motion } from 'framer-motion'
import { FileText, GraduationCap, Building2, Tag, ArrowRight, Clock, Headphones } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.35, delay: delay * 0.6 },
})

const getServices = (t) => [
  {
    Icon: FileText,
    title: t('services.items.transcription.title'),
    desc: t('services.items.transcription.desc'),
    tags: t('services.items.transcription.tags'),
    bg: '#3b82f6',
  },
  {
    Icon: GraduationCap,
    title: t('services.items.education.title'),
    desc: t('services.items.education.desc'),
    tags: t('services.items.education.tags'),
    bg: '#22c55e',
  },
  {
    Icon: Building2,
    title: t('services.items.institutional.title'),
    desc: t('services.items.institutional.desc'),
    tags: t('services.items.institutional.tags'),
    bg: '#a855f7',
  },
  {
    Icon: Tag,
    title: t('services.items.labels.title'),
    desc: t('services.items.labels.desc'),
    tags: t('services.items.labels.tags'),
    bg: '#f97316',
  },
]

const getPerks = (t) => [
  { Icon: Clock,      title: t('services.perks.fast.title'),  desc: t('services.perks.fast.desc') },
  { Icon: Headphones, title: t('services.perks.expert.title'),  desc: t('services.perks.expert.desc') },
]

export default function Services() {
  const { t } = useLanguage()
  const services = getServices(t)
  const perks = getPerks(t)

  return (
    <section id="services" className="services">
      <div className="wrap">
        <div className="sec-head">
          <motion.div {...fadeUp(0)}>
            <span className="pill pill--acc">{t('services.badge')}</span>
          </motion.div>
          <motion.h2 {...fadeUp(0.08)}>
            {(() => {
              const title = t('services.title')
              const highlight = t('services.highlight')
              const parts = title.split(highlight)
              if (parts.length === 1) return <>{title} <span className="grad-text">{highlight}</span></>
              return <>{parts[0]}<span className="grad-text">{highlight}</span>{parts[1] || ''}</>
            })()}
          </motion.h2>
          <motion.p {...fadeUp(0.15)}>
            {t('services.subtitle')}
          </motion.p>
        </div>

        <div className="services__grid">
          {services.map((s, i) => (
            <motion.div key={s.title} className="svc-card" {...fadeUp(0.2 + i * 0.08)}>
              <div className="svc-card__ico" style={{ background: s.bg }}>
                <s.Icon size={18} />
              </div>
              <div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                <div className="svc-card__tags">
                  {s.tags.map(tag => <span key={tag} className="svc-card__tag">{tag}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="services__perks" {...fadeUp(0.42)}>
          {perks.map(p => (
            <div key={p.title} className="services__perk">
              <div className="services__perk-ico"><p.Icon size={18} /></div>
              <div>
                <div className="services__perk-title">{p.title}</div>
                <div className="services__perk-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div className="services__cta" {...fadeUp(0.5)}>
          <a href="#contact" className="btn btn-acc btn-lg" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
            {t('services.cta')} <ArrowRight size={18} />
          </a>
          <p>{t('services.note')}</p>
        </motion.div>
      </div>
    </section>
  )
}
