import { motion } from 'framer-motion'
import { Check, ArrowRight, Zap } from 'lucide-react'
import { useState } from 'react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.52, delay },
})

const products = [
  {
    id: 1,
    name:    'TunBra Braille Printer',
    tagline: 'Imprimante Braille Compacte',
    desc:    'Imprimante Braille compacte conçue pour convertir vos documents numériques en braille tactile — idéale pour les écoles, universités et particuliers.',
    image:   '/withoutBG1.png',
    features: [
      'Format papier A4 (120–200 g/m²)',
      'Connexion USB Type B',
      'Ajustement automatique du papier',
      'Alimentation 220V — simple et fiable',
    ],
    price:    null,
    badge:    'Best Seller',
    grad:     'linear-gradient(135deg,#3d54ea,#2934ae)',
    badgeBg:  '#3d54ea',
  },
  {
    id: 2,
    name:    'Logiciel TunBra',
    tagline: 'Logiciel de Conversion Braille Gratuit',
    desc:    "Convertissez n'importe quel document texte en braille en quelques clics. Logiciel intuitif fourni avec l'imprimante, disponible gratuitement.",
    image:   '/relife braille.png',
    features: [
      'Conversion de documents en Braille',
      'Interface simple et accessible',
      'Compatible Windows',
      '100 % gratuit',
    ],
    price:    'Gratuit',
    badge:    'Gratuit',
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
  const [ribbon] = useState(RIBBON)

  return (
    <section id="products" className="products">
        <div className="wrap">

          {/* Header */}
          <div className="sec-head">
            <motion.div {...fadeUp(0)}>
              <span className="pill pill--pri">Nos Produits</span>
            </motion.div>
            <motion.h2 {...fadeUp(0.08)}>
              Solutions Braille <span className="grad-text">Innovantes</span>
            </motion.h2>
            <motion.p {...fadeUp(0.15)}>
              Des imprimantes institutionnelles aux appareils portables personnels — nos produits
              allient technologie de pointe et qualité irréprochable.
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
                      {p.price && (<><div className="prod-card__price-lbl">Prix</div><div className="prod-card__price">{p.price}</div></>)}
                    </div>
                    <button className="btn btn-pri btn-sm">En savoir plus <ArrowRight size={15} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Banner */}
          <motion.div className="products__banner" {...fadeUp(0.45)}>
            <div>
              <h3>Besoin d'une solution Braille sur mesure ?</h3>
              <p>Nous collaborons avec les institutions pour développer des solutions d'impression Braille adaptées.</p>
            </div>
            <a href="#contact" className="btn btn-acc btn-lg"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <Zap size={18} /> Contacter notre équipe
            </a>
          </motion.div>

        </div>

        {/* ── Full-width logo ribbon ── */}
        <div className="ribbon">
          <p className="ribbon__label">Ils nous font confiance</p>
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
