import { motion } from 'framer-motion'
import { FileText, GraduationCap, Building2, Tag, ArrowRight, Clock, Headphones } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, delay },
})

const services = [
  {
    Icon: FileText,
    title: 'Transcription Braille',
    desc: 'Conversion de tout document en Braille avec précision et rapidité.',
    tags: ['Tous formats', 'Braille grade 1 & 2', 'Notation scientifique'],
    bg: '#3b82f6',
  },
  {
    Icon: GraduationCap,
    title: 'Impression éducative',
    desc: 'Impression Braille spécialisée pour manuels, examens et supports pédagogiques.',
    tags: ['Manuels scolaires', 'Copies d\'examen', 'Volume'],
    bg: '#22c55e',
  },
  {
    Icon: Building2,
    title: 'Solutions institutionnelles',
    desc: 'Solutions entreprises pour gouvernements, ONG et accessibilité corporate.',
    tags: ['Traitement en masse', 'API', 'Support dédié'],
    bg: '#a855f7',
  },
  {
    Icon: Tag,
    title: 'Étiquettes Braille',
    desc: 'Étiquettes Braille durables pour produits, signalisation et locaux.',
    tags: ['Résistant', 'Multi-tailles', 'Livraison rapide'],
    bg: '#f97316',
  },
]

const perks = [
  { Icon: Clock,      title: 'Livraison rapide',  desc: 'Standard 48–72h' },
  { Icon: Headphones, title: 'Support expert',     desc: 'Chefs de projet dédiés' },
]

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="wrap">
        <div className="sec-head">
          <motion.div {...fadeUp(0)}>
            <span className="pill pill--acc">Services Braille</span>
          </motion.div>
          <motion.h2 {...fadeUp(0.08)}>
            Services d'<span className="grad-text">Impression Braille</span>
          </motion.h2>
          <motion.p {...fadeUp(0.15)}>
            Du document unique aux projets institutionnels — des matériaux Braille précis, livrés à temps.
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
                  {s.tags.map(t => <span key={t} className="svc-card__tag">{t}</span>)}
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
          <button className="btn btn-acc btn-lg">
            Demander un devis <ArrowRight size={18} />
          </button>
          <p>Devis gratuit sous 24h · Sans engagement</p>
        </motion.div>
      </div>
    </section>
  )
}
