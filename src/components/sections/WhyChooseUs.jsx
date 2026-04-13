import { motion } from 'framer-motion'
import { DollarSign, MapPin, Lightbulb, Accessibility, Award, HeadphonesIcon } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.35, delay: delay * 0.6 },
})

const reasons = [
  { Icon: DollarSign,      title: 'Affordable Pricing',    desc: 'Up to 40% more cost-effective than international competitors without compromising quality.',              stat: '40%',  statLabel: 'Cost Savings',    bg: 'linear-gradient(135deg,#22c55e,#16a34a)' },
  { Icon: MapPin,          title: 'Local Manufacturing',   desc: 'Made in Tunisia with regional support centers for faster service and lower shipping costs.',               stat: '24h',  statLabel: 'Support Response', bg: 'linear-gradient(135deg,#3b82f6,#06b6d4)' },
  { Icon: Lightbulb,       title: 'Innovative R&D',        desc: 'Continuous investment in research to bring cutting-edge accessibility technology to market.',              stat: '15%',  statLabel: 'R&D Investment',  bg: 'linear-gradient(135deg,#a855f7,#7c3aed)' },
  { Icon: Accessibility,   title: 'Accessibility Focused', desc: 'Built by accessibility experts for real-world needs, not just technical specifications.',                  stat: '100%', statLabel: 'User-Centered',   bg: 'linear-gradient(135deg,#f97316,#d97706)' },
  { Icon: HeadphonesIcon,  title: 'After-Sales Support',   desc: 'Comprehensive warranty, training, and ongoing technical support for all products.',                       stat: '5yr',  statLabel: 'Warranty',        bg: 'linear-gradient(135deg,#04b8e0,#0692b8)' },
]

const partners = ['Ministry of Education', 'UNESCO Partner', 'Tunisia Export']

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="why">
      <div className="wrap">
        {/* Header */}
        <div className="sec-head">
          <motion.div {...fadeUp(0)}>
            <span className="pill pill--white">Why TunBraille</span>
          </motion.div>
          <motion.h2 {...fadeUp(0.08)}>
            The TunBraille <span className="grad-text">Advantage</span>
          </motion.h2>
          <motion.p {...fadeUp(0.15)}>
            We combine innovation, quality, and affordability to deliver the best Braille
            solutions for our customers.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="why__grid">
          {reasons.map((r, i) => (
            <motion.div key={r.title} className="why-card" {...fadeUp(0.2 + i * 0.08)}>
              <div className="why-card__ico" style={{ background: r.bg }}>
                <r.Icon size={24} />
              </div>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
              <div className="why-card__stat">
                <span className="why-card__num">{r.stat}</span>
                <span className="why-card__lbl">{r.statLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partners */}
        <motion.div className="why__partners" {...fadeUp(0.55)}>
          <p>Trusted by leading institutions across Africa and the MENA region</p>
          <div className="why__partner-list">
            {partners.map(p => <span key={p} className="why__partner">{p}</span>)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
