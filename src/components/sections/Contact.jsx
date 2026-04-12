import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, delay },
})

const contactInfo = [
  { Icon: Mail,   label: 'Email',   value: 'contact@tunbraille.com',          href: 'mailto:contact@tunbraille.com' },
  { Icon: Phone,  label: 'Phone',   value: '+216 71 123 456',                 href: 'tel:+21671123456' },
  { Icon: MapPin, label: 'Address', value: 'Technopole El Ghazela, Ariana, Tunisia', href: '#' },
]

const interests = ['Product Information', 'Braille Printing Services', 'Partnership Opportunity', 'Demo Request', 'Technical Support', 'Other']

export default function Contact() {
  const [sent, setSent]       = useState(false)
  const [form, setForm]       = useState({ name: '', email: '', org: '', interest: '', message: '' })

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 6000)
  }

  return (
    <section id="contact" className="contact">
      <div className="wrap">
        {/* Header */}
        <div className="sec-head">
          <motion.div {...fadeUp(0)}>
            <span className="pill pill--white">Get in Touch</span>
          </motion.div>
          <motion.h2 {...fadeUp(0.08)}>
            Ready to <span className="grad-text">Transform Accessibility</span>?
          </motion.h2>
          <motion.p {...fadeUp(0.15)}>
            Whether you're interested in our products, services, or partnership opportunities,
            we'd love to hear from you.
          </motion.p>
        </div>

        <div className="contact__grid">
          {/* Info */}
          <motion.div className="contact__info" {...fadeUp(0.22)}>
            <div className="cinfo-card">
              <h3>Contact Information</h3>
              {contactInfo.map(c => (
                <a key={c.label} href={c.href} className="cinfo-item">
                  <div className="cinfo-item__ico"><c.Icon size={18} /></div>
                  <div>
                    <div className="cinfo-item__lbl">{c.label}</div>
                    <div className="cinfo-item__val">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="cinfo-response">
              <h3>Response Time</h3>
              <p>We typically respond to all inquiries within 24 hours during business days.</p>
              <div className="cinfo-response__langs">
                <CheckCircle size={15} />
                Available in English, French &amp; Arabic
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div {...fadeUp(0.3)}>
            {sent ? (
              <div className="contact__form contact__success">
                <div className="contact__success-ico"><CheckCircle size={32} /></div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={onSubmit}>
                <div className="frow frow--2">
                  <div className="ffield">
                    <label htmlFor="name">Full Name *</label>
                    <input id="name" name="name" type="text" required placeholder="John Doe" value={form.name} onChange={onChange} />
                  </div>
                  <div className="ffield">
                    <label htmlFor="email">Email Address *</label>
                    <input id="email" name="email" type="email" required placeholder="john@example.com" value={form.email} onChange={onChange} />
                  </div>
                </div>

                <div className="frow frow--2">
                  <div className="ffield">
                    <label htmlFor="org">Organization</label>
                    <input id="org" name="org" type="text" placeholder="Your organization" value={form.org} onChange={onChange} />
                  </div>
                  <div className="ffield">
                    <label htmlFor="interest">Interest Type *</label>
                    <select id="interest" name="interest" required value={form.interest} onChange={onChange}>
                      <option value="">Select an option</option>
                      {interests.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                </div>

                <div className="frow">
                  <div className="ffield">
                    <label htmlFor="message">Message *</label>
                    <textarea id="message" name="message" required rows={5} placeholder="Tell us about your project or inquiry..." value={form.message} onChange={onChange} />
                  </div>
                </div>

                <button type="submit" className="btn btn-acc btn-lg" style={{ width: '100%' }}>
                  Send Message <Send size={18} />
                </button>
                <p className="contact__form-note">By submitting this form, you agree to our privacy policy.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
