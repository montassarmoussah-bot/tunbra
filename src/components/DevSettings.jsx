import { useState, useEffect } from 'react'

const DEFAULTS = {
  logoH:        45,   // logo image height px
  logoPadV:     0,    // container vertical padding px
  logoPadH:     14,   // container horizontal padding px
  logoRadius:   22,   // container border-radius px
  heroExtra:    17,   // extra px above badge (added to 72px nav height)
}

function apply(vals) {
  const r = document.documentElement.style
  r.setProperty('--ds-logo-h',       vals.logoH       + 'px')
  r.setProperty('--ds-logo-pad-v',   vals.logoPadV    + 'px')
  r.setProperty('--ds-logo-pad-h',   vals.logoPadH    + 'px')
  r.setProperty('--ds-logo-radius',  vals.logoRadius  + 'px')
  r.setProperty('--ds-hero-extra',   vals.heroExtra   + 'px')
}

const sliders = [
  { key: 'logoH',      label: 'Logo height',              min: 10,  max: 200, unit: 'px' },
  { key: 'logoPadV',   label: 'Container pad top/bot',    min: 0,   max: 60,  unit: 'px' },
  { key: 'logoPadH',   label: 'Container pad left/right', min: 0,   max: 80,  unit: 'px' },
  { key: 'logoRadius', label: 'Container radius',         min: 0,   max: 80,  unit: 'px' },
  { key: 'heroExtra',  label: 'Space below nav',          min: 0,   max: 400, unit: 'px' },
]

export default function DevSettings() {
  const [open, setOpen]   = useState(false)
  const [vals, setVals]   = useState(DEFAULTS)
  const [copied, setCopied] = useState(false)

  useEffect(() => { apply(vals) }, [])

  const set = (key, val) => {
    const next = { ...vals, [key]: Number(val) }
    setVals(next)
    apply(next)
  }

  const copySettings = () => {
    const txt = Object.entries(vals).map(([k, v]) => `${k}: ${v}`).join('\n')
    navigator.clipboard.writeText(txt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div style={styles.root}>
      {open && (
        <div style={styles.panel}>
          <div style={styles.panelHead}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>⚙ Dev Settings</span>
            <button onClick={() => setVals(DEFAULTS) || apply(DEFAULTS)} style={styles.resetBtn}>Reset</button>
          </div>

          {sliders.map(s => (
            <div key={s.key} style={styles.row}>
              <div style={styles.rowTop}>
                <span style={styles.label}>{s.label}</span>
                <span style={styles.val}>{vals[s.key]}{s.unit}</span>
              </div>
              <input
                type="range"
                min={s.min}
                max={s.max}
                value={vals[s.key]}
                onChange={e => set(s.key, e.target.value)}
                style={styles.slider}
              />
            </div>
          ))}

          <button onClick={copySettings} style={styles.copyBtn}>
            {copied ? '✓ Copied!' : '📋 Copy settings to clipboard'}
          </button>
          <p style={styles.hint}>Paste the values in the chat — I'll make them permanent.</p>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        style={{ ...styles.fab, background: open ? '#e53e3e' : '#3d54ea' }}
        title="Dev Settings"
      >
        {open ? '✕' : '⚙'}
      </button>
    </div>
  )
}

const styles = {
  root: {
    position:  'fixed',
    bottom:    '1.5rem',
    right:     '1.5rem',
    zIndex:    9999,
    display:   'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap:       '0.75rem',
    fontFamily: 'system-ui, sans-serif',
  },
  panel: {
    background:   '#1e293b',
    color:        '#f1f5f9',
    borderRadius: 14,
    padding:      '1rem',
    width:        260,
    boxShadow:    '0 8px 32px rgba(0,0,0,.45)',
    display:      'flex',
    flexDirection:'column',
    gap:          '0.6rem',
  },
  panelHead: {
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'center',
    marginBottom:   4,
  },
  resetBtn: {
    background:   'rgba(255,255,255,.12)',
    color:        '#cbd5e1',
    border:       'none',
    borderRadius: 6,
    padding:      '2px 10px',
    fontSize:     11,
    cursor:       'pointer',
  },
  row: { display: 'flex', flexDirection: 'column', gap: 2 },
  rowTop: { display: 'flex', justifyContent: 'space-between' },
  label: { fontSize: 11, color: '#94a3b8' },
  val:   { fontSize: 11, color: '#7dd3fc', fontWeight: 700 },
  slider: { width: '100%', accentColor: '#3d54ea', cursor: 'pointer' },
  copyBtn: {
    marginTop:    8,
    background:   '#3d54ea',
    color:        '#fff',
    border:       'none',
    borderRadius: 8,
    padding:      '7px 12px',
    fontSize:     12,
    cursor:       'pointer',
    fontWeight:   600,
  },
  hint: {
    fontSize:  10,
    color:     '#64748b',
    textAlign: 'center',
    marginTop: 2,
  },
  fab: {
    width:        46,
    height:       46,
    borderRadius: '50%',
    border:       'none',
    color:        '#fff',
    fontSize:     20,
    cursor:       'pointer',
    boxShadow:    '0 4px 16px rgba(0,0,0,.35)',
    display:      'flex',
    alignItems:   'center',
    justifyContent:'center',
    transition:   'background .2s',
  },
}
