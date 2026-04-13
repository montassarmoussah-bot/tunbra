import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Lightbulb, Heart, Globe } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, delay },
})

const values = [
  { Icon: Target,    title: 'Our Mission',    desc: 'To democratize access to Braille technology across Africa and the MENA region, ensuring every visually impaired individual has the tools they need.' },
  { Icon: Lightbulb, title: 'Innovation First', desc: 'We combine cutting-edge engineering with deep accessibility expertise to create solutions that are both advanced and intuitive.' },
  { Icon: Heart,     title: 'Human-Centered',  desc: 'Every product starts with understanding the real needs of our users — technology that truly serves and empowers people.' },
  { Icon: Globe,     title: 'Global Impact',   desc: 'From Tunisia to the world, we are building a movement toward universal accessibility, one Braille solution at a time.' },
]

const stats = [
  { num: '2024',    label: 'Founded' },
  { num: 'Tunisia', label: 'Headquarters' },
  { num: '3+',      label: 'Team Members' },
  { num: 'ISO',     label: 'Certified' },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="wrap">
        <div className="about__grid">
          {/* Text */}
          <div className="about__text">
            <motion.div {...fadeUp(0)}>
              <span className="pill pill--pri">About TunBraille</span>
            </motion.div>

            <motion.h2 {...fadeUp(0.08)}>
              Pioneering{' '}
              <span className="grad-text">Accessible Innovation</span>{' '}
              in Africa
            </motion.h2>

            <motion.p {...fadeUp(0.15)}>
              Founded in Tunisia, TunBraille is on a mission to transform accessibility across the
              African continent and beyond. We believe that geography should never limit access to
              life-changing technology.
            </motion.p>

            <motion.p {...fadeUp(0.2)}>
              Our team of engineers, accessibility experts, and disability advocates work together
              to create affordable, high-quality Braille solutions that rival international competitors
              while remaining accessible to local markets.
            </motion.p>

            <motion.div className="about__partner-logos" {...fadeUp(0.26)}>
              {[
                { src: '/4.png', alt: 'SDG 4 - Quality Education' },
                { src: '/10.png', alt: 'SDG 10 - Reduced Inequalities' },
                { src: '/17.png', alt: 'SDG 17 - Partnerships' },
              ].map(l => (
                <div key={l.alt} className="about__partner-logo sdg-logo">
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
