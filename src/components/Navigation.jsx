import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSelector from './LanguageSelector'

const getLinks = (t) => [
  { label: t('nav.about'),  href: '#about' },
  { label: t('nav.products'),  href: '#products' },
  { label: t('nav.services'),  href: '#services' },
  { label: t('nav.impact'),    href: '#impact' },
  { label: t('nav.guides'),    href: '#guides' },
  { label: t('nav.contact'),   href: '#contact' },
]

export default function Navigation() {
  const { t, isRTL } = useLanguage()
  const links = getLinks(t)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45 }}
        className={`nav ${scrolled ? 'nav--solid' : ''}`}
      >
        <div className="wrap">
          <div className="nav__inner">

            {/* Logo */}
            <a href="#" className="nav__logo" onClick={e => go(e, '#')}>
              <div className="nav__logo-img-wrap">
                <img
                  src="/whitelogo.png"
                  alt="TunBra logo"
                  className="nav__logo-img"
                />
              </div>
            </a>

            {/* Desktop links */}
            <div className="nav__links">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={e => go(e, l.href)}
                  className="nav__link"
                  style={{ color: 'rgba(255,255,255,.82)' }}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Language + CTA */}
            <div className="nav__cta" style={{ alignItems: 'center', gap: '12px' }}>
              <LanguageSelector />
              <a
                href="#contact"
                onClick={e => go(e, '#contact')}
                className="btn btn-sm btn-ghost"
              >
                {t('nav.cta')}
              </a>
            </div>

            {/* Hamburger */}
            <button
              className="nav__burger"
              style={{ color: '#fff' }}
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="nav__drawer"
          >
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={e => go(e, l.href)} className="nav__link">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={e => go(e, '#contact')} className="btn btn-pri btn-lg">
              {t('nav.cta')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
