import { Mail, Phone, MapPin, Heart } from 'lucide-react'

/* ── WhatsApp SVG icon ─────────────────────────────────────── */
const WhatsAppIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

/* ── LinkedIn SVG icon ─────────────────────────────────────── */
const LinkedInIcon = ({ size = 14 }) => (
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

export default function FooterV2() {
  const scroll = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer-v2" style={styles.footer}>
      <div style={styles.wrap}>
        <div className="footer-v2-main" style={styles.main}>
          {/* Brand Column */}
          <div style={styles.brandCol}>
            <a href="#" onClick={scroll} style={styles.logoLink}>
              <img 
                src="/whitelogo.png" 
                alt="TunBra" 
                style={styles.logo} 
              />
            </a>
            <p style={styles.brandDesc}>
              Pionnier de l'innovation accessible en Afrique. Des solutions Braille qui autonomisent les individus et transforment les communautés.
            </p>

            {/* Contact - Compact */}
            <div style={styles.contactList}>
              <a href="mailto:contact@tunbra.com" style={styles.contactLink}>
                <Mail size={13} /> contact@tunbra.com
              </a>
              <a href="tel:+21624909710" style={styles.contactLink}>
                <Phone size={13} /> +216 24 909 710
              </a>
              <a href="https://wa.me/21624909710" target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
                <WhatsAppIcon size={13} /> WhatsApp : +216 24 909 710
              </a>
              <div style={styles.contactLink}>
                <MapPin size={13} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Pépinière Mahdia Hiboun, 5111, B3<br />Tunisie</span>
              </div>
            </div>
          </div>

          {/* Link Columns - Compact */}
          {Object.entries(cols).map(([title, items]) => (
            <div key={title} style={styles.col}>
              <h4 style={styles.colTitle}>{title}</h4>
              <div style={styles.links}>
                {items.map(item => (
                  <a key={item} href="#" onClick={scroll} style={styles.link}>{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar - Compact */}
        <div className="footer-v2-bottom" style={styles.bottom}>
          <div style={styles.copy}>
            © {new Date().getFullYear()} TunBra. Fait avec <Heart size={12} style={{ color: '#ef4444' }} fill="#ef4444" /> en Tunisie
          </div>

          <div style={styles.socials}>
            <a href="https://www.linkedin.com/company/tunbra/" target="_blank" rel="noopener noreferrer" style={styles.social} aria-label="LinkedIn">
              <LinkedInIcon size={14} />
            </a>
            <a href="https://wa.me/21624909710" target="_blank" rel="noopener noreferrer" style={styles.social} aria-label="WhatsApp">
              <WhatsAppIcon size={14} />
            </a>
            <a href="tel:+21624909710" style={styles.social} aria-label="Téléphone">
              <Phone size={14} />
            </a>
          </div>

          <div style={styles.legal}>
            <a href="#" style={styles.legalLink}>Politique de confidentialité</a>
            <a href="#" style={styles.legalLink}>Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: '#060c1a',
    color: 'rgba(255,255,255,.45)',
    paddingTop: '5px',  // Ultra compact
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  wrap: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  main: {
    display: 'grid',
    gap: '1.5rem',  // Reduced from 2.5rem
    paddingBottom: '2rem',  // Reduced from 4rem
    borderBottom: '1px solid rgba(255,255,255,.07)',
  },
  brandCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    marginBottom: '4px',
  },
  logo: {
    height: '80px',  // Compact logo
    width: 'auto',
    display: 'block',
  },
  brandDesc: {
    fontSize: '0.75rem',
    lineHeight: '1.3',
    maxWidth: '260px',
    marginTop: '4px',
    marginBottom: '8px',
    color: 'rgba(255,255,255,.4)',
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',  // Ultra tight
  },
  contactLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,.38)',
    textDecoration: 'none',
    lineHeight: '1.2',
    transition: 'color 0.2s',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
  },
  colTitle: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '8px',
    marginTop: 0,
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  link: {
    fontSize: '0.75rem',
    lineHeight: '1.3',
    color: 'rgba(255,255,255,.38)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  bottom: {
    paddingBlock: '1rem',  // Reduced from 1.5rem
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',  // Reduced from 1rem
    textAlign: 'center',
  },
  copy: {
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    color: 'rgba(255,255,255,.45)',
  },
  socials: {
    display: 'flex',
    gap: '0.4rem',
  },
  social: {
    width: '32px',   // Reduced from 34px
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,.07)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,.38)',
    textDecoration: 'none',
    transition: 'background 0.2s, color 0.2s',
  },
  legal: {
    display: 'flex',
    gap: '1rem',
  },
  legalLink: {
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,.28)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
}

// Inject responsive CSS for horizontal layout
const responsiveCSS = `
  .footer-v2-main {
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  }
  .footer-v2-bottom {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
  @media (max-width: 1024px) {
    .footer-v2-main {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 768px) {
    .footer-v2-main {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 480px) {
    .footer-v2-main {
      grid-template-columns: 1fr;
    }
    .footer-v2-bottom {
      flex-direction: column;
      text-align: center;
    }
  }
`
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = responsiveCSS
  document.head.appendChild(styleSheet)
}
