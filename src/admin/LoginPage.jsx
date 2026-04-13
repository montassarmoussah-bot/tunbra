import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PASSWORD = 'monta123'

export default function LoginPage() {
  const [pw, setPw]       = useState('')
  const [err, setErr]     = useState(false)
  const nav               = useNavigate()

  const submit = e => {
    e.preventDefault()
    if (pw === PASSWORD) {
      sessionStorage.setItem('admin_auth', '1')
      nav('/monta/dashboard')
    } else {
      setErr(true)
      setTimeout(() => setErr(false), 2000)
    }
  }

  return (
    <div style={s.page}>
      <form onSubmit={submit} style={s.card}>
        <div style={s.logo}>🔐</div>
        <h2 style={s.title}>Admin Access</h2>
        <p style={s.sub}>TunBra Analytics Dashboard</p>
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          style={{ ...s.input, borderColor: err ? '#ef4444' : '#334155' }}
          autoFocus
        />
        {err && <p style={s.err}>Wrong password</p>}
        <button type="submit" style={s.btn}>Enter Dashboard</button>
      </form>
    </div>
  )
}

const s = {
  page:  { minHeight:'100vh', background:'#0f172a', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'system-ui,sans-serif' },
  card:  { background:'#1e293b', borderRadius:16, padding:'2.5rem 2rem', width:320, display:'flex', flexDirection:'column', gap:'1rem', boxShadow:'0 20px 60px rgba(0,0,0,.5)' },
  logo:  { fontSize:36, textAlign:'center' },
  title: { color:'#f1f5f9', fontSize:'1.4rem', fontWeight:700, textAlign:'center', margin:0 },
  sub:   { color:'#64748b', fontSize:'.85rem', textAlign:'center', margin:0 },
  input: { background:'#0f172a', border:'1.5px solid', borderRadius:8, padding:'.7rem 1rem', color:'#f1f5f9', fontSize:'1rem', outline:'none' },
  err:   { color:'#ef4444', fontSize:'.82rem', margin:0 },
  btn:   { background:'linear-gradient(135deg,#3d54ea,#04b8e0)', color:'#fff', border:'none', borderRadius:8, padding:'.8rem', fontSize:'1rem', fontWeight:600, cursor:'pointer' },
}
