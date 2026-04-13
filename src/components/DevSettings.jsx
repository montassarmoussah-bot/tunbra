import { useState, useEffect } from 'react'

const DEFAULTS = { footerLogoH: 80 }

function apply(vals) {
  document.documentElement.style.setProperty('--footer-logo-h', vals.footerLogoH + 'px')
}

export default function DevSettings() {
  const [open, setOpen]     = useState(false)
  const [vals, setVals]     = useState(DEFAULTS)
  const [copied, setCopied] = useState(false)

  useEffect(() => { apply(vals) }, [])

  const set = (key, val) => {
    const next = { ...vals, [key]: Number(val) }
    setVals(next)
    apply(next)
  }

  const copy = () => {
    navigator.clipboard.writeText(
      Object.entries(vals).map(([k,v]) => `${k}: ${v}`).join('\n')
    ).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) })
  }

  return (
    <div style={s.root}>
      {open && (
        <div style={s.panel}>
          <div style={s.head}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>⚙ Footer Logo</span>
            <button onClick={() => { setVals(DEFAULTS); apply(DEFAULTS) }} style={s.resetBtn}>Reset</button>
          </div>

          <div style={s.row}>
            <div style={s.rowTop}>
              <span style={s.lbl}>Footer logo height</span>
              <span style={s.val}>{vals.footerLogoH}px</span>
            </div>
            <input type="range" min={20} max={200} value={vals.footerLogoH}
              onChange={e => set('footerLogoH', e.target.value)} style={s.slider} />
          </div>

          <button onClick={copy} style={s.copyBtn}>{copied ? '✓ Copied!' : '📋 Copy values'}</button>
          <p style={s.hint}>Note: FooterV2 uses 80px by default</p>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)}
        style={{ ...s.fab, background: open ? '#e53e3e' : '#3d54ea' }}>
        {open ? '✕' : '⚙'}
      </button>
    </div>
  )
}

const s = {
  root:     { position:'fixed', bottom:'1.5rem', right:'1.5rem', zIndex:9999, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'.75rem', fontFamily:'system-ui,sans-serif' },
  panel:    { background:'#1e293b', color:'#f1f5f9', borderRadius:14, padding:'1rem', width:240, boxShadow:'0 8px 32px rgba(0,0,0,.45)', display:'flex', flexDirection:'column', gap:'.6rem' },
  head:     { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 },
  resetBtn: { background:'rgba(255,255,255,.12)', color:'#cbd5e1', border:'none', borderRadius:6, padding:'2px 10px', fontSize:11, cursor:'pointer' },
  row:      { display:'flex', flexDirection:'column', gap:2 },
  rowTop:   { display:'flex', justifyContent:'space-between' },
  lbl:      { fontSize:11, color:'#94a3b8' },
  val:      { fontSize:11, color:'#7dd3fc', fontWeight:700 },
  slider:   { width:'100%', accentColor:'#3d54ea', cursor:'pointer' },
  copyBtn:  { marginTop:8, background:'#3d54ea', color:'#fff', border:'none', borderRadius:8, padding:'7px 12px', fontSize:12, cursor:'pointer', fontWeight:600 },
  hint:     { fontSize:10, color:'#64748b', textAlign:'center', marginTop:2 },
  fab:      { width:46, height:46, borderRadius:'50%', border:'none', color:'#fff', fontSize:20, cursor:'pointer', boxShadow:'0 4px 16px rgba(0,0,0,.35)', display:'flex', alignItems:'center', justifyContent:'center', transition:'background .2s' },
}
