import { Mail, Phone, MapPin, Heart } from 'lucide-react'

/* ── WhatsApp SVG icon ─────────────────────────────────────── */
const WhatsAppIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

/* ── LinkedIn SVG icon ─────────────────────────────────────── */
const LinkedInIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const cols = {
  Produits:  ['TunBra Printer Pro', 'Étiqueteuse Braille', 'Accessoires', 'Logiciels'],
  Services:  ['Transcription Braille', 'Impression éducative', 'Services institutionnels', 'Étiquettes personnalisées'],
  Entreprise: ['À propos', 'Notre impact', 'Carrières', 'Presse'],
  Support:   ['Centre d\'aide', 'Nous contacter', 'Garantie', 'Téléchargements'],
}

const scroll = (e, href) => {
  if (href.startsWith('#')) {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__main">

          {/* Brand */}
          <div>
            <a href="#" className="footer__logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
              <img src="/whitelogo.png" alt="TunBra" style={{ height: 60 }} />
            </a>
            <p className="footer__brand-desc">
              Pionnier de l'innovation accessible en Afrique. Des solutions Braille qui autonomisent
              les individus et transforment les communautés.
            </p>

            {/* Contact links */}
            <a href="mailto:contact@tunbra.com" className="footer__contact-link">
              <Mail size={15} /> contact@tunbra.com
            </a>
            <a href="tel:+21624909710" className="footer__contact-link">
              <Phone size={15} /> +216 24 909 710
            </a>
            <a
              href="https://wa.me/21624909710"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__contact-link"
            >
              <WhatsAppIcon size={15} /> WhatsApp : +216 24 909 710
            </a>
            <div className="footer__contact-link" style={{ alignItems: 'flex-start' }}>
              <MapPin size={15} style={{ flexShrink: 0, marginTop: 3 }} />
              <span>Pépinière Mahdia Hiboun, 5111, B3<br />Tunisie</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([title, items]) => (
            <div key={title} className="footer__col">
              <h4>{title}</h4>
              <div className="footer__links">
                {items.map(item => (
                  <a key={item} href="#" onClick={e => scroll(e, '#')}>{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <div className="footer__copy">
            © {new Date().getFullYear()} TunBra. Fait avec <Heart size={13} className="heart" fill="#ef4444" /> en Tunisie
          </div>

          {/* Social icons */}
          <div className="footer__socials">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/tunbra/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedInIcon size={15} />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/21624909710"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="WhatsApp"
              title="WhatsApp"
              style={{ '--hover-bg': '#25d366' }}
            >
              <WhatsAppIcon size={15} />
            </a>

            {/* Phone */}
            <a
              href="tel:+21624909710"
              className="footer__social"
              aria-label="Téléphone"
              title="+216 24 909 710"
            >
              <Phone size={15} />
            </a>
          </div>

          <div className="footer__legal">
            <a href="#">Politique de confidentialité</a>
            <a href="#">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
