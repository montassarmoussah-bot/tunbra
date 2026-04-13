import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.35, delay: delay * 0.6 },
})

const partners = [
  {
    name:    'Université de Sousse',
    short:   'UNI\nSOUSSE',
    bg:      'linear-gradient(135deg,#1d4ed8,#3b82f6)',
    href:    'https://www.uss.rnu.tn',
  },
  {
    name:    'Assurance CTAMA',
    short:   'CTAMA',
    bg:      'linear-gradient(135deg,#b91c1c,#ef4444)',
    href:    'https://www.ctama.com.tn',
  },
  {
    name:    'GIZ Tunisie',
    short:   'GIZ',
    bg:      'linear-gradient(135deg,#15803d,#22c55e)',
    href:    'https://www.giz.de/en/worldwide/367.html',
  },
  {
    name:    'APII',
    short:   'APII',
    bg:      'linear-gradient(135deg,#0369a1,#06b6d4)',
    href:    'https://www.tunisieindustrie.nat.tn',
  },
  {
    name:    'Fondation Tunisie pour le Développement',
    short:   'ELIFE',
    bg:      'linear-gradient(135deg,#7c3aed,#a855f7)',
    href:    '#',
  },
  {
    name:    'CITESS',
    short:   'CITESS',
    bg:      'linear-gradient(135deg,#d97706,#f59e0b)',
    href:    '#',
  },
]

export default function Partners() {
  return (
    <section className="partners" id="partners">
      <div className="wrap">
        <motion.div className="partners__head" {...fadeUp(0)}>
          <div className="partners__label">Ils nous font confiance</div>
          <h2 className="partners__title">
            Nos <span className="grad-text">Partenaires & Références</span>
          </h2>
          <p className="partners__sub">
            Des institutions de premier plan qui nous accompagnent dans notre mission d'accessibilité.
          </p>
        </motion.div>

        <div className="partners__grid">
          {partners.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-card"
              {...fadeUp(0.1 + i * 0.07)}
            >
              <div className="partner-card__badge" style={{ background: p.bg }}>
                {p.short.split('\n').map((line, j) => (
                  <span key={j} style={{ display: 'block', lineHeight: 1.2 }}>{line}</span>
                ))}
              </div>
              <div className="partner-card__name">{p.name}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
