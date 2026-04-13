import { motion } from 'framer-motion'
import { Check, ArrowRight, Zap } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.35, delay: delay * 0.6 },
})

const getProducts = (t) => [
  {
    id: 1,
    name:    'TunBra Braille Printer',
    tagline: t('products.items.printer.tagline'),
    desc:    t('products.items.printer.desc'),
    image:   '/withoutBG1.png',
    features: t('products.items.printer.features'),
    price:    null,
    badge:    'Best Seller',
    grad:     'linear-gradient(135deg,#3d54ea,#2934ae)',
    badgeBg:  '#3d54ea',
  },
  {
    id: 2,
    name:    'Logiciel TunBra',
    tagline: t('products.items.labeler.tagline'),
    desc:    t('products.items.labeler.desc'),
    image:   '/relife braille.png',
    features: ['Conversion de documents en Braille', 'Interface simple et accessible', 'Compatible Windows', '100 % gratuit'],
    price:    t('products.items.labeler.price'),
    badge:    t('products.items.labeler.badge'),
    grad:     'linear-gradient(135deg,#04b8e0,#0692b8)',
    badgeBg:  '#04b8e0',
  },
]

const logos = [
  { src: '/apii.jpg',                    alt: 'APII' },
  { src: '/center daffer.jpeg',          alt: 'Center Daffer' },
  { src: '/citess.jpeg',                 alt: 'CITESS' },
  { src: '/Coat_of_arms_of_Tunisia.svg', alt: 'Tunisie' },
  { src: '/giz-logo.jpeg',              alt: 'GIZ' },
  { src: '/images.png',                 alt: 'Partenaire' },
  { src: '/startup act.webp',           alt: 'Startup Act' },
  { src: '/maghroumine.jpg',            alt: 'Maghroumine' },
]

const RIBBON = { speed: 18, logoH: 100, gap: 52 }

export default function Products() {
  const { t } = useLanguage()
  const [ribbon] = useState(RIBBON)
  const products = getProducts(t)

  return (
    <section id="products" className="products">
        <div className="wrap">

          {/* Header */}
          <div className="sec-head">
            <motion.div {...fadeUp(0)}>
              <span className="pill pill--pri">{t('products.badge')}</span>
            </motion.div>
            <motion.h2 {...fadeUp(0.08)}>
              {(() => {
                const title = t('products.title')
                const highlight = t('products.highlight')
                const parts = title.split(highlight)
                if (parts.length === 1) return <>{title} <span className="grad-text">{highlight}</span></>
                return <>{parts[0]}<span className="grad-text">{highlight}</span>{parts[1] || ''}</>
              })()}
            </motion.h2>
            <motion.p {...fadeUp(0.15)}>
              {t('products.subtitle')}
            </motion.p>
          </div>

          {/* Cards */}
          <div className="products__grid">
            {products.map((p, i) => (
              <motion.div key={p.id} className="prod-card" {...fadeUp(0.2 + i * 0.12)}>

                <div className="prod-card__badge" style={{ background: p.badgeBg }}>{p.badge}</div>

                <div className="prod-card__head" style={{ background: p.grad }}>
                  <div className="prod-card__head-bg" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='40'%3E%3Ccircle cx='8' cy='8' r='2' fill='white'/%3E%3Ccircle cx='8' cy='20' r='2' fill='white'/%3E%3Ccircle cx='20' cy='8' r='2' fill='white'/%3E%3Ccircle cx='20' cy='20' r='2' fill='white'/%3E%3C/svg%3E")`,
                  }} />
                  <img src={p.image} alt={p.name} className="prod-card__img" draggable={false} />
                </div>

                <div className="prod-card__body">
                  <div className="prod-card__tag">{p.tagline}</div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <ul className="prod-card__feats">
                    {p.features.map(f => (
                      <li key={f} className="prod-card__feat">
                        <span className="prod-card__feat-check"><Check size={10} /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="prod-card__foot">
                    <div>
                      {p.price && (<><div className="prod-card__price-lbl">{t('products.price')}</div><div className="prod-card__price">{p.price}</div></>)}
                    </div>
                    <button className="btn btn-pri btn-sm">{t('products.learnMore')} <ArrowRight size={15} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Banner */}
          <motion.div className="products__banner" {...fadeUp(0.45)}>
            <div>
              <h3>{t('products.banner.title')}</h3>
              <p>{t('products.banner.desc')}</p>
            </div>
            <a href="#contact" className="btn btn-acc btn-lg"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <Zap size={18} /> {t('products.banner.cta')}
            </a>
          </motion.div>

        </div>

        {/* ── Full-width logo ribbon ── */}
        <div className="ribbon">
          <p className="ribbon__label">{t('products.ribbon')}</p>
          <div className="ribbon__mask">
            {/* Two copies for seamless loop */}
            <div
              className="ribbon__track"
              style={{
                animationDuration: `${ribbon.speed}s`,
                gap: `${ribbon.gap}px`,
              }}
            >
              {[...logos, ...logos, ...logos, ...logos].map((l, i) => (
                <div key={i} className="ribbon__item">
                  <img
                    src={l.src}
                    alt={l.alt}
                    style={{ height: `${ribbon.logoH}px` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
  )
}
