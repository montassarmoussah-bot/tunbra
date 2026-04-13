import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileText, School, Users, Globe } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.35, delay: delay * 0.6 },
})

function Counter({ end, suffix = '', duration = 2 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = null
    const step = ts => {
      if (!start) start = ts
      const p = Math.min((ts - start) / (duration * 1000), 1)
      setVal(Math.floor(p * end))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration])

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

const stats = [
  { Icon: FileText, end: 500000, suffix: '+', label: 'Documents Printed',  desc: 'Pages embossed in Braille', bg: 'linear-gradient(135deg,#3b82f6,#2563eb)' },
  { Icon: School,   end: 150,    suffix: '+', label: 'Schools Served',     desc: 'Educational institutions',   bg: 'linear-gradient(135deg,#22c55e,#16a34a)' },
  { Icon: Users,    end: 25000,  suffix: '+', label: 'Users Impacted',     desc: 'Lives transformed',           bg: 'linear-gradient(135deg,#a855f7,#7c3aed)' },
  { Icon: Globe,    end: 12,     suffix: '',  label: 'Countries Reached',  desc: 'Across Africa & MENA',        bg: 'linear-gradient(135deg,#f97316,#d97706)' },
]

export default function Impact() {
  return (
    <section id="impact" className="impact">
      <div className="wrap">
        {/* Header */}
        <div className="sec-head">
          <motion.div {...fadeUp(0)}>
            <span className="pill pill--green">Our Impact</span>
          </motion.div>
          <motion.h2 {...fadeUp(0.08)}>
            Making a{' '}
            <span style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Real Difference
            </span>
          </motion.h2>
          <motion.p {...fadeUp(0.15)}>
            Every document we print, every school we serve, and every life we touch brings us
            closer to a more inclusive world.
          </motion.p>
        </div>

        {/* Stat cards */}
        <div className="impact__grid">
          {stats.map((s, i) => (
            <motion.div key={s.label} className="stat-card" {...fadeUp(0.2 + i * 0.08)}>
              <div className="stat-card__glow" style={{ background: s.bg }} />
              <div className="stat-card__ico" style={{ background: s.bg }}>
                <s.Icon size={28} />
              </div>
              <div className="stat-card__num" style={{ background: s.bg, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <h4>{s.label}</h4>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Story */}
        <div className="impact__story">
          <motion.div className="impact__quote" {...fadeUp(0.3)}>
            <blockquote>
              "TunBraille transformed how we educate visually impaired students. Their printers are
              reliable, affordable, and their support is exceptional."
            </blockquote>
            <div className="impact__quote-author">
              <div className="impact__quote-avatar">SR</div>
              <div>
                <div className="impact__quote-name">Sarah Rahmani</div>
                <div className="impact__quote-role">Director, Tunis School for the Blind</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="impact__text" {...fadeUp(0.4)}>
            <h3>Join the Movement for Accessibility</h3>
            <p>
              Every day, we work toward a world where visual impairment is never a barrier to
              education, employment, or independence. Our technology is just the beginning — true
              impact comes from partnerships with educators, institutions, and advocates like you.
            </p>
            <div className="impact__bullets">
              {['Growing network of partners', 'Expanding across Africa', 'Continuous innovation'].map(b => (
                <div key={b} className="impact__bullet">
                  <span className="impact__bullet-dot" />
                  {b}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
