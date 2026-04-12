import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'À propos',  href: '#about' },
  { label: 'Produits',  href: '#products' },
  { label: 'Services',  href: '#services' },
  { label: 'Impact',    href: '#impact' },
  { label: 'Guides',    href: '#guides' },
  { label: 'Contact',   href: '#contact' },
]

export default function Navigation() {
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
                  src="/logo_TunBra_png.png"
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
                  style={{ color: scrolled ? 'var(--g600)' : 'rgba(255,255,255,.78)' }}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="nav__cta">
              <a
                href="#contact"
                onClick={e => go(e, '#contact')}
                className={`btn btn-sm ${scrolled ? 'btn-pri' : 'btn-ghost'}`}
              >
                Nous contacter
              </a>
            </div>

            {/* Hamburger */}
            <button
              className="nav__burger"
              style={{ color: scrolled ? 'var(--text)' : '#fff' }}
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
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
            <img src="/logo_TunBra_png.png" alt="TunBra" style={{ height: 36, marginBottom: '1rem' }} />
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={e => go(e, l.href)} className="nav__link">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={e => go(e, '#contact')} className="btn btn-pri btn-lg">
              Nous contacter
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
