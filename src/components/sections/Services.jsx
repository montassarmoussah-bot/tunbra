import { motion } from 'framer-motion'
import { FileText, GraduationCap, Building2, Tag, ArrowRight, Clock, Shield, Headphones } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, delay },
})

const services = [
  {
    Icon: FileText,
    title: 'Document Braille Transcription',
    desc: 'Convert any document to high-quality Braille format with accuracy and speed.',
    tags: ['All document formats', 'Grade 1 & 2 Braille', 'Math & Science notation', '48-hour turnaround'],
    bg: '#3b82f6',
  },
  {
    Icon: GraduationCap,
    title: 'Educational Material Printing',
    desc: 'Specialized Braille printing for textbooks, exams, and learning materials.',
    tags: ['Textbook conversion', 'Exam papers', 'Tactile graphics', 'Volume discounts'],
    bg: '#22c55e',
  },
  {
    Icon: Building2,
    title: 'Institutional Braille Conversion',
    desc: 'Enterprise solutions for government, NGOs, and corporate accessibility needs.',
    tags: ['Bulk processing', 'Secure handling', 'API integration', 'Dedicated support'],
    bg: '#a855f7',
  },
  {
    Icon: Tag,
    title: 'Custom Braille Labels',
    desc: 'Durable, professional Braille labels for products, signage, and facilities.',
    tags: ['Weather-resistant', 'Multiple sizes', 'Custom designs', 'Fast delivery'],
    bg: '#f97316',
  },
]

const perks = [
  { Icon: Clock,       title: 'Fast Turnaround',    desc: '48–72 hour standard delivery' },
  { Icon: Shield,      title: 'Quality Guaranteed', desc: 'ISO certified processes' },
  { Icon: Headphones,  title: 'Expert Support',     desc: 'Dedicated project managers' },
]

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="wrap">
        {/* Header */}
        <div className="sec-head">
          <motion.div {...fadeUp(0)}>
            <span className="pill pill--acc">Braille Services</span>
          </motion.div>
          <motion.h2 {...fadeUp(0.08)}>
            Professional{' '}
            <span className="grad-text">Braille Printing</span>{' '}
            Services
          </motion.h2>
          <motion.p {...fadeUp(0.15)}>
            From single documents to large-scale institutional projects, we deliver accurate,
            high-quality Braille materials on time.
          </motion.p>
        </div>

        {/* Service cards */}
        <div className="services__grid">
          {services.map((s, i) => (
            <motion.div key={s.title} className="svc-card" {...fadeUp(0.2 + i * 0.08)}>
              <div className="svc-card__ico" style={{ background: s.bg }}>
                <s.Icon size={24} />
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

        {/* Perks */}
        <motion.div className="services__perks" {...fadeUp(0.45)}>
          {perks.map(p => (
            <div key={p.title} className="services__perk">
              <div className="services__perk-ico"><p.Icon size={20} /></div>
              <div>
                <div className="services__perk-title">{p.title}</div>
                <div className="services__perk-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div className="services__cta" {...fadeUp(0.52)}>
          <button className="btn btn-acc btn-lg">
            Request Printing Service <ArrowRight size={18} />
          </button>
          <p>Free quote within 24 hours · No obligation</p>
        </motion.div>
      </div>
    </section>
  )
}
