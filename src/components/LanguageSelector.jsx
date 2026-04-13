import { useState } from 'react'
import { useLanguage, languages } from '../i18n/LanguageContext'
import { Globe, Check } from 'lucide-react'

export default function LanguageSelector() {
  const { lang, setLanguage, isRTL } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          background: 'rgba(255,255,255,.1)',
          border: '1px solid rgba(255,255,255,.22)',
          borderRadius: '999px',
          color: '#fff',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '.03em',
        }}
      >
        <Globe size={15} />
        <span>{lang.toUpperCase()}</span>
      </button>

      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 999 }}
            onClick={() => setOpen(false)}
          />
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              [isRTL ? 'left' : 'right']: 0,
              background: '#1a2550',
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: '12px',
              padding: '6px',
              minWidth: '160px',
              zIndex: 1000,
              boxShadow: '0 12px 40px rgba(0,0,0,.5)',
              overflow: 'hidden',
            }}
          >
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLanguage(l.code); setOpen(false) }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '9px 12px',
                  background: lang === l.code ? 'rgba(61,84,234,.35)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  gap: '8px',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize: '.7rem',
                    fontWeight: 700,
                    letterSpacing: '.05em',
                    opacity: .6,
                    minWidth: '22px',
                  }}>
                    {l.code.toUpperCase()}
                  </span>
                  <span style={{ fontWeight: 500 }}>{l.label}</span>
                </span>
                {lang === l.code && <Check size={14} color="#7c9cff" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
