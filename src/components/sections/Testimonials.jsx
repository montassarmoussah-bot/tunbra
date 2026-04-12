import { motion } from 'framer-motion'
import { Quote, Star, Building2, GraduationCap, HeartHandshake } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, delay },
})

const testimonials = [
  {
    quote: "TunBraille printers have revolutionized our ability to provide timely, high-quality Braille materials to our students. The cost savings alone allowed us to serve 40% more students.",
    author: 'Dr. Amal Ben Ali',
    role: 'Special Education Coordinator',
    org: 'Ministry of Education, Tunisia',
    Icon: GraduationCap,
  },
  {
    quote: "As an NGO working across multiple countries, we needed reliable, affordable Braille solutions. TunBraille delivered beyond our expectations with their exceptional service.",
    author: 'Jean-Marc Dubois',
    role: 'Program Director',
    org: 'African Accessibility Initiative',
    Icon: HeartHandshake,
  },
  {
    quote: "The build quality rivals international brands at a fraction of the cost. But what truly sets them apart is their local support team that understands our needs.",
    author: 'Kofi Mensah',
    role: 'IT Director',
    org: 'Ghana National Library',
    Icon: Building2,
  },
]

const partners = ['UNESCO', 'Ministry of Education', 'National Library', 'Red Crescent', 'Save the Children', 'World Blind Union']

export default function Testimonials() {
  return (
    <section id="testimonials" className="testi">
      <div className="wrap">
        {/* Header */}
        <div className="sec-head">
          <motion.div {...fadeUp(0)}>
            <span className="pill pill--purple">Testimonials</span>
          </motion.div>
          <motion.h2 {...fadeUp(0.08)}>
            Trusted by{' '}
            <span style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Leading Institutions
            </span>
          </motion.h2>
          <motion.p {...fadeUp(0.15)}>
            Hear from the educators, institutions, and organizations who trust TunBraille for their
            accessibility needs.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="testi__grid">
          {testimonials.map((t, i) => (
            <motion.div key={i} className="testi-card" {...fadeUp(0.2 + i * 0.1)}>
              <div className="testi-card__quote-ico"><Quote size={16} /></div>

              <div className="testi-card__stars">
                {[...Array(5)].map((_, j) => <Star key={j} size={14} className="testi-card__star" fill="#f59e0b" />)}
              </div>

              <p className="testi-card__text">"{t.quote}"</p>

              <div className="testi-card__author">
                <div className="testi-card__avatar"><t.Icon size={20} /></div>
                <div>
                  <div className="testi-card__name">{t.author}</div>
                  <div className="testi-card__role">{t.role}</div>
                  <div className="testi-card__org">{t.org}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partners */}
        <motion.div className="testi__partners" {...fadeUp(0.5)}>
          <p>Proudly serving partners across the region</p>
          <div className="testi__partner-list">
            {partners.map(p => <span key={p} className="testi__partner">{p}</span>)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
