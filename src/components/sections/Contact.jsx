import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.35, delay: delay * 0.6 },
})

const getContactInfo = (t) => [
  { Icon: Mail,   label: t('contact.info.email'),   value: 'contact@tunbra.com',          href: 'mailto:contact@tunbra.com' },
  { Icon: Phone,  label: t('contact.info.phone'),   value: '+216 24 909 710',                 href: 'tel:+21624909710' },
  { Icon: MapPin, label: t('contact.info.address'), value: 'Pépinière Mahdia Hiboun, 5111, B3, Tunisie', href: 'https://maps.google.com/?q=Pépinière+Mahdia+Hiboun+Tunisie' },
]

export default function Contact() {
  const { t } = useLanguage()
  const contactInfo = getContactInfo(t)
  const interests = t('contact.form.interestOptions')
  const [sent, setSent]       = useState(false)
  const [form, setForm]       = useState({ name: '', email: '', org: '', interest: '', message: '' })

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      // Save to Firebase for admin dashboard
      await addDoc(collection(db, 'messages'), {
        name: form.name,
        email: form.email,
        org: form.org,
        interest: form.interest,
        message: form.message,
        timestamp: serverTimestamp(),
        read: false
      })

      // Send email via Web3Forms (public key - safe to expose)
      const formData = new FormData()
      formData.append('access_key', 'a622fe6c-8c33-4e82-97a9-e978544c24d5')
      formData.append('subject', `New TunBraille Contact: ${form.interest}`)
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('organization', form.org)
      formData.append('interest', form.interest)
      formData.append('message', form.message)
      await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })

      setSent(true)
      setForm({ name: '', email: '', org: '', interest: '', message: '' })
      setTimeout(() => setSent(false), 6000)
    } catch (err) {
      console.error('Error sending message:', err)
      alert('Failed to send message. Please try again.')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="wrap">
        {/* Header */}
        <div className="sec-head">
          <motion.div {...fadeUp(0)}>
            <span className="pill pill--white">{t('contact.badge')}</span>
          </motion.div>
          <motion.h2 {...fadeUp(0.08)}>
            {(() => {
              const title = t('contact.title')
              const highlight = t('contact.highlight')
              const parts = title.split(highlight)
              if (parts.length === 1) return <>{title} <span className="grad-text">{highlight}</span></>
              return <>{parts[0]}<span className="grad-text">{highlight}</span>{parts[1] || ''}</>
            })()}
          </motion.h2>
          <motion.p {...fadeUp(0.15)}>
            {t('contact.subtitle')}
          </motion.p>
        </div>

        <div className="contact__grid">
          {/* Info */}
          <motion.div className="contact__info" {...fadeUp(0.22)}>
            <div className="cinfo-card">
              <h3>{t('contact.info.title')}</h3>
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
              <h3>{t('contact.info.response.title')}</h3>
              <p>{t('contact.info.response.text')}</p>
              <div className="cinfo-response__langs">
                <CheckCircle size={15} />
                {t('contact.info.response.langs')}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div {...fadeUp(0.3)}>
            {sent ? (
              <div className="contact__form contact__success">
                <div className="contact__success-ico"><CheckCircle size={32} /></div>
                <h3>{t('contact.form.success.title')}</h3>
                <p>{t('contact.form.success.text')}</p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={onSubmit}>
                <div className="frow frow--2">
                  <div className="ffield">
                    <label htmlFor="name">{t('contact.form.name')}</label>
                    <input id="name" name="name" type="text" required placeholder="" value={form.name} onChange={onChange} />
                  </div>
                  <div className="ffield">
                    <label htmlFor="email">{t('contact.form.email')}</label>
                    <input id="email" name="email" type="email" required placeholder="" value={form.email} onChange={onChange} />
                  </div>
                </div>

                <div className="frow frow--2">
                  <div className="ffield">
                    <label htmlFor="org">{t('contact.form.org')}</label>
                    <input id="org" name="org" type="text" placeholder="" value={form.org} onChange={onChange} />
                  </div>
                  <div className="ffield">
                    <label htmlFor="interest">{t('contact.form.interest')}</label>
                    <select id="interest" name="interest" required value={form.interest} onChange={onChange}>
                      <option value="">—</option>
                      {interests.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                </div>

                <div className="frow">
                  <div className="ffield">
                    <label htmlFor="message">{t('contact.form.message')}</label>
                    <textarea id="message" name="message" required rows={5} placeholder="" value={form.message} onChange={onChange} />
                  </div>
                </div>

                <button type="submit" className="btn btn-acc btn-lg" style={{ width: '100%' }}>
                  {t('contact.form.send')} <Send size={18} />
                </button>
                <p className="contact__form-note">{t('contact.form.privacy')}</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
