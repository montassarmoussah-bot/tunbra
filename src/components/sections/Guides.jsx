import { motion } from 'framer-motion'
import { ArrowUpRight, BookOpen } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay },
})

const guides = [
  {
    lang:    '🇫🇷 Français',
    title:   'Guide d\'utilisation TunBra',
    desc:    'Manuel complet en français — installation, configuration et utilisation de votre imprimante TunBra.',
    href:    '/TunBra_Guide_FR (2).pdf',
    bg:      'linear-gradient(135deg,#1e3a8a,#3d54ea)',
    accent:  '#7e9bfa',
  },
  {
    lang:    '🇹🇳 عربي',
    title:   'دليل مستخدم TunBra',
    desc:    'دليل المستخدم الشامل باللغة العربية — التركيب والإعداد واستخدام طابعة TunBra.',
    href:    '/tunbra_user_manual_ar (2).pdf',
    bg:      'linear-gradient(135deg,#083345,#04b8e0)',
    accent:  '#5fe3fb',
  },
]

export default function Guides() {
  return (
    <section id="guides" className="guides">
      <div className="wrap">
        {/* Header */}
        <div className="sec-head">
          <motion.div {...fadeUp(0)}>
            <span className="pill pill--white">
              <BookOpen size={13} /> Documentation
            </span>
          </motion.div>
          <motion.h2 {...fadeUp(0.08)}>
            Téléchargez nos <span className="grad-text">Guides d'utilisation</span>
          </motion.h2>
          <motion.p {...fadeUp(0.15)}>
            Guides complets pour vous aider à tirer le meilleur parti de votre imprimante TunBra,
            disponibles en français et en arabe.
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
          Les fichiers PDF s'ouvrent dans un nouvel onglet · Format PDF · Gratuit
        </motion.p>
      </div>
    </section>
  )
}
