import { useLanguage } from '../i18n/LanguageContext'
import { Mail, Phone, MapPin, Heart } from 'lucide-react'

const WhatsAppIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const LinkedInIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

export default function FooterV4() {
  const { t } = useLanguage()

  const scroll = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={s.footer}>
      <div style={s.container}>
        {/* Main Grid: Logo | Contact + Socials */}
        <div className="footer-grid" style={s.grid}>

          {/* Left Column - Big Logo */}
          <div style={s.logoCol}>
            <a href="#" onClick={scroll} style={s.logoLink}>
              <img src="/whitelogo.png" alt="TunBra" style={s.logo} />
            </a>
          </div>

          {/* Right Column - Contact & Socials */}
          <div className="footer-right" style={s.rightCol}>
            {/* Description */}
            <p style={s.description}>{t('footer.brand')}</p>
            
            {/* Contact Links */}
            <div className="footer-contact" style={s.contact}>
              <a href="mailto:tunbra.info@gmail.com" style={s.contactItem}>
                <Mail size={14} />
                <span>tunbra.info@gmail.com</span>
              </a>
              <a href="tel:+21624909710" style={s.contactItem}>
                <Phone size={14} />
                <span>+216 24 909 710</span>
              </a>
              <a href="https://wa.me/21624909710" target="_blank" rel="noopener noreferrer" style={s.contactItem}>
                <WhatsAppIcon size={14} />
                <span>WhatsApp</span>
              </a>
              <div style={{...s.contactItem, pointerEvents: 'none'}}>
                <MapPin size={14} />
                <span>Pépinière Mahdia Hiboun, 5111, B3, Tunisie</span>
              </div>
            </div>

            {/* Social Icons */}
            <div style={s.socials}>
              <a href="https://www.linkedin.com/company/tunbra/" target="_blank" rel="noopener noreferrer" style={s.socialIcon} aria-label="LinkedIn">
                <LinkedInIcon size={16} />
              </a>
              <a href="https://wa.me/21624909710" target="_blank" rel="noopener noreferrer" style={s.socialIcon} aria-label="WhatsApp">
                <WhatsAppIcon size={16} />
              </a>
              <a href="tel:+21624909710" style={s.socialIcon} aria-label="Phone">
                <Phone size={16} />
              </a>
              <a href="mailto:tunbra.info@gmail.com" style={s.socialIcon} aria-label="Email">
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div style={s.bottom}>
          <div style={s.copy}>
            © {new Date().getFullYear()} TunBra · {t('footer.copy')} <Heart size={10} style={{ color: '#ef4444', fill: '#ef4444' }} /> {t('footer.in')}
          </div>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          .footer-grid > div:first-child {
            display: flex;
            justify-content: center;
          }
          .footer-logo {
            height: 150px !important;
          }
          .footer-right {
            align-items: center !important;
          }
          .footer-contact {
            align-items: center !important;
          }
        }
      `}</style>
    </footer>
  )
}

const s = {
  footer: {
    background: '#060c1a',
    color: 'rgba(255,255,255,.45)',
    padding: '1rem 0 0.5rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    borderTop: '1px solid rgba(255,255,255,.05)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: '2rem',
    alignItems: 'start',
    marginBottom: '0.5rem',
  },
  logoCol: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  logoLink: {
    display: 'block',
    textDecoration: 'none',
    lineHeight: 0,
  },
  logo: {
    height: '200px',
    width: 'auto',
    display: 'block',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    alignItems: 'flex-start',
  },
  description: {
    fontSize: '0.85rem',
    lineHeight: '1.4',
    color: 'rgba(255,255,255,.5)',
    margin: 0,
    maxWidth: '400px',
  },
  contact: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    alignItems: 'flex-start',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,.55)',
    textDecoration: 'none',
    lineHeight: '1.3',
    transition: 'color 0.2s',
  },
  socials: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.25rem',
  },
  socialIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '0',
    background: 'rgba(255,255,255,.08)',
    border: '1px solid rgba(255,255,255,.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,.5)',
    textDecoration: 'none',
    transition: 'background 0.2s, color 0.2s, border-color 0.2s',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '0.5rem',
    borderTop: '1px solid rgba(255,255,255,.05)',
  },
  copy: {
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,.35)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
  },
}
