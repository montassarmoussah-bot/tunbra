import { useState, useEffect } from 'react'

const DEFAULTS = {
  logoH: 161,         // Logo height
  footerTop: -30,     // Footer top padding (CAN BE NEGATIVE)
  logoMb: -30,        // Space below logo (CAN BE NEGATIVE)
  descMt: 0,          // Space above paragraph
  descMb: 4,          // Space below paragraph
  contactGap: 3,      // Space between contact items
  colMt: 86,          // Push link columns down
  linkGap: 9,         // Space between links
  mainPb: 13,         // Main section bottom padding
}

const LABELS = {
  logoH: 'Logo Height (px)',
  footerTop: 'Footer Top Padding (px)',
  logoMb: 'Space Below Logo (px)',
  descMt: 'Space Above Paragraph (px)',
  descMb: 'Space Below Paragraph (px)',
  contactGap: 'Contact Items Gap (px)',
  colMt: 'Link Columns Top Margin (px)',
  linkGap: 'Links Gap (px)',
  mainPb: 'Section Bottom Padding (px)',
}

const RANGES = {
  logoH: [20, 200],
  footerTop: [-50, 100],   // Allows negative values!
  logoMb: [-50, 50],       // Allows negative values!
  descMt: [-20, 50],       // Allows negative values!
  descMb: [0, 50],
  contactGap: [0, 20],
  colMt: [0, 150],
  linkGap: [0, 20],
  mainPb: [0, 100],
}

function apply(values) {
  const root = document.documentElement
  root.style.setProperty('--fv3-logo-h', values.logoH + 'px')
  root.style.setProperty('--fv3-footer-top', values.footerTop + 'px')
  root.style.setProperty('--fv3-logo-mb', values.logoMb + 'px')
  root.style.setProperty('--fv3-desc-mt', values.descMt + 'px')
  root.style.setProperty('--fv3-desc-mb', values.descMb + 'px')
  root.style.setProperty('--fv3-contact-gap', values.contactGap + 'px')
  root.style.setProperty('--fv3-col-mt', values.colMt + 'px')
  root.style.setProperty('--fv3-link-gap', values.linkGap + 'px')
  root.style.setProperty('--fv3-main-pb', values.mainPb + 'px')
}

export default function DevSettingsV3() {
  const [open, setOpen] = useState(false)
  const [vals, setVals] = useState(DEFAULTS)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    apply(vals)
  }, [vals])

  const set = (key, val) => {
    setVals(prev => ({ ...prev, [key]: Number(val) }))
  }

  const reset = () => {
    setVals(DEFAULTS)
    apply(DEFAULTS)
  }

  const copy = () => {
    const css = Object.entries(vals).map(([k, v]) => `--fv3-${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${v}px;`).join('\n')
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div style={s.root}>
      {open && (
        <div style={s.panel}>
          <div style={s.head}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>⚙ Footer Layout</span>
            <button onClick={reset} style={s.resetBtn}>Reset All</button>
          </div>
          
          <div style={s.scrollArea}>
            {Object.entries(LABELS).map(([key, label]) => (
              <div key={key} style={s.row}>
                <div style={s.rowTop}>
                  <span style={s.lbl}>{label}</span>
                  <span style={s.val}>{vals[key]}px</span>
                </div>
                <input
                  type="range"
                  min={RANGES[key][0]}
                  max={RANGES[key][1]}
                  value={vals[key]}
                  onChange={e => set(key, e.target.value)}
                  style={s.slider}
                />
              </div>
            ))}
          </div>

          <button onClick={copy} style={s.copyBtn}>
            {copied ? '✓ CSS Copied!' : '📋 Copy CSS'}
          </button>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} style={{ ...s.fab, background: open ? '#e53e3e' : '#3d54ea' }}>
        {open ? '✕' : '⚙'}
      </button>
    </div>
  )
}

const s = {
  root: {
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '.75rem',
    fontFamily: 'system-ui,sans-serif',
  },
  panel: {
    background: '#1e293b',
    color: '#f1f5f9',
    borderRadius: 14,
    padding: '1rem',
    width: 320,
    maxHeight: '80vh',
    boxShadow: '0 8px 32px rgba(0,0,0,.45)',
    display: 'flex',
    flexDirection: 'column',
    gap: '.6rem',
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    borderBottom: '1px solid #334155',
    paddingBottom: 8,
  },
  scrollArea: {
    overflowY: 'auto',
    maxHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  resetBtn: {
    background: 'rgba(255,255,255,.12)',
    color: '#cbd5e1',
    border: 'none',
    borderRadius: 6,
    padding: '4px 12px',
    fontSize: 11,
    cursor: 'pointer',
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  rowTop: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  lbl: {
    fontSize: 11,
    color: '#94a3b8',
  },
  val: {
    fontSize: 11,
    color: '#7dd3fc',
    fontWeight: 700,
  },
  slider: {
    width: '100%',
    accentColor: '#3d54ea',
    cursor: 'pointer',
    height: 6,
  },
  copyBtn: {
    marginTop: 8,
    background: '#3d54ea',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 12,
    cursor: 'pointer',
    fontWeight: 600,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    border: 'none',
    color: '#fff',
    fontSize: 20,
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0,0,0,.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background .2s',
  },
}
