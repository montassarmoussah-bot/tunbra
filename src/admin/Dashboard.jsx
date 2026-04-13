import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const COLORS   = ['#3d54ea', '#04b8e0', '#22c55e', '#f59e0b', '#a855f7', '#ef4444']

export default function Dashboard() {
  const nav               = useNavigate()
  const [visits, setVisits] = useState([])
  const [loading, setLoading] = useState(true)

  // Auth guard
  useEffect(() => {
    if (!sessionStorage.getItem('admin_auth')) nav('/monta')
  }, [])

  // Load data
  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'visits'), orderBy('timestamp', 'desc')))
        setVisits(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      } catch (e) {
        console.error('Firestore error:', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const logout = () => { sessionStorage.removeItem('admin_auth'); nav('/monta') }

  // Derived stats
  const total   = visits.length
  const devices = [
    { name: 'Desktop', value: visits.filter(v => v.device === 'desktop').length },
    { name: 'Mobile',  value: visits.filter(v => v.device === 'mobile').length },
  ]

  const countryCounts = visits.reduce((acc, v) => {
    acc[v.country] = (acc[v.country] || 0) + 1
    return acc
  }, {})
  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }))

  const markers = visits
    .filter(v => v.lat && v.lng)
    .reduce((acc, v) => {
      const key = `${v.lat.toFixed(1)},${v.lng.toFixed(1)}`
      if (!acc[key]) acc[key] = { lat: v.lat, lng: v.lng, count: 0, country: v.country }
      acc[key].count++
      return acc
    }, {})

  const recentVisits = visits.slice(0, 20)

  if (loading) return (
    <div style={{ ...s.page, justifyContent:'center', alignItems:'center' }}>
      <p style={{ color:'#94a3b8', fontSize:'1.1rem' }}>Loading analytics…</p>
    </div>
  )

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.h1}>Analytics Dashboard</h1>
          <p style={s.sub}>TunBra — Visitor Intelligence</p>
        </div>
        <button onClick={logout} style={s.logoutBtn}>Logout</button>
      </div>

      <div style={s.grid}>

        {/* Stat cards */}
        <div style={s.statsRow}>
          {[
            { label: 'Total Visits',    value: total },
            { label: 'Desktop',         value: devices[0].value },
            { label: 'Mobile',          value: devices[1].value },
            { label: 'Countries',       value: Object.keys(countryCounts).length },
          ].map(c => (
            <div key={c.label} style={s.statCard}>
              <div style={s.statNum}>{c.value}</div>
              <div style={s.statLbl}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Device pie chart */}
        <div style={s.card}>
          <h3 style={s.cardTitle}>Device Split</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={devices} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                dataKey="value" label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}
                labelLine={false}>
                {devices.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background:'#1e293b', border:'none', color:'#f1f5f9', borderRadius:8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top countries bar chart */}
        <div style={s.card}>
          <h3 style={s.cardTitle}>Top Countries</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topCountries} layout="vertical" margin={{ left: 8, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" tick={{ fill:'#94a3b8', fontSize:11 }} />
              <YAxis type="category" dataKey="name" tick={{ fill:'#94a3b8', fontSize:11 }} width={90} />
              <Tooltip contentStyle={{ background:'#1e293b', border:'none', color:'#f1f5f9', borderRadius:8 }} />
              <Bar dataKey="value" fill="#3d54ea" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* World map */}
        <div style={{ ...s.card, gridColumn: '1 / -1' }}>
          <h3 style={s.cardTitle}>Visitor World Map</h3>
          <ComposableMap style={{ width:'100%', height:'auto' }}
            projectionConfig={{ scale: 140 }}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography key={geo.rsmKey} geography={geo}
                    fill="#1e293b" stroke="#334155" strokeWidth={0.5} />
                ))
              }
            </Geographies>
            {Object.values(markers).map((m, i) => (
              <Marker key={i} coordinates={[m.lng, m.lat]}>
                <circle r={Math.min(3 + m.count * 1.5, 12)} fill="#04b8e0" fillOpacity={0.75} stroke="#fff" strokeWidth={0.5} />
              </Marker>
            ))}
          </ComposableMap>
        </div>

        {/* Recent visits table */}
        <div style={{ ...s.card, gridColumn: '1 / -1', overflowX:'auto' }}>
          <h3 style={s.cardTitle}>Recent Visits</h3>
          <table style={s.table}>
            <thead>
              <tr>{['Time','Country','City','Device'].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {recentVisits.map(v => (
                <tr key={v.id} style={s.tr}>
                  <td style={s.td}>{v.timestamp?.toDate?.().toLocaleString() || '—'}</td>
                  <td style={s.td}>{v.country}</td>
                  <td style={s.td}>{v.city}</td>
                  <td style={s.td}>
                    <span style={{ ...s.badge, background: v.device === 'mobile' ? '#0369a1' : '#15803d' }}>
                      {v.device}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

const s = {
  page:      { minHeight:'100vh', background:'#0f172a', fontFamily:'system-ui,sans-serif', padding:'1.5rem', color:'#f1f5f9' },
  header:    { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem' },
  h1:        { fontSize:'1.6rem', fontWeight:700, margin:0, color:'#f1f5f9' },
  sub:       { color:'#64748b', fontSize:'.85rem', marginTop:4 },
  logoutBtn: { background:'#1e293b', color:'#94a3b8', border:'1px solid #334155', borderRadius:8, padding:'.45rem 1rem', cursor:'pointer', fontSize:'.85rem' },
  grid:      { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.25rem' },
  statsRow:  { display:'contents' },
  statCard:  { background:'#1e293b', borderRadius:12, padding:'1.25rem 1.5rem', border:'1px solid #334155' },
  statNum:   { fontSize:'2rem', fontWeight:800, color:'#3d54ea' },
  statLbl:   { fontSize:'.8rem', color:'#64748b', marginTop:4 },
  card:      { background:'#1e293b', borderRadius:12, padding:'1.25rem 1.5rem', border:'1px solid #334155' },
  cardTitle: { fontSize:'1rem', fontWeight:600, marginBottom:'1rem', color:'#cbd5e1' },
  table:     { width:'100%', borderCollapse:'collapse', fontSize:'.85rem' },
  th:        { textAlign:'left', padding:'.6rem .75rem', color:'#64748b', fontWeight:600, borderBottom:'1px solid #334155' },
  tr:        { borderBottom:'1px solid #1e293b' },
  td:        { padding:'.6rem .75rem', color:'#cbd5e1' },
  badge:     { display:'inline-block', padding:'2px 8px', borderRadius:999, fontSize:'.75rem', fontWeight:600, color:'#fff' },
}
