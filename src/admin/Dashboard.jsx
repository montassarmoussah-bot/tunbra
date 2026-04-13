import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const COLORS   = ['#3d54ea', '#04b8e0', '#22c55e', '#f59e0b', '#a855f7', '#ef4444', '#f97316', '#14b8a6']

export default function Dashboard() {
  const nav               = useNavigate()
  const [visits, setVisits] = useState([])
  const [loading, setLoading] = useState(true)

  // Auth guard
  useEffect(() => {
    if (!sessionStorage.getItem('admin_auth')) nav('/monta')
  }, [])

  // Load data from Firestore
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
  
  const countryData = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
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

      {/* Section 1: Counter + 2 Pie Charts */}
      <div style={s.topSection} className="dashboard-top-section">
        {/* Total Visits Counter */}
        <div style={s.counterCard} className="dashboard-counter">
          <div style={s.counterNum}>{total}</div>
          <div style={s.counterLbl}>Total Visits</div>
        </div>

        {/* Device Pie Chart */}
        <div style={s.pieCard} className="dashboard-pie">
          <h3 style={s.pieTitle}>Devices</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={devices} cx="50%" cy="50%" innerRadius={40} outerRadius={70}
                dataKey="value" label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}
                labelLine={false}>
                {devices.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background:'#1e293b', border:'none', color:'#f1f5f9', borderRadius:8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Countries Pie Chart */}
        <div style={s.pieCard} className="dashboard-pie">
          <h3 style={s.pieTitle}>Top Countries</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={countryData} cx="50%" cy="50%" innerRadius={40} outerRadius={70}
                dataKey="value" label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}
                labelLine={false}>
                {countryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background:'#1e293b', border:'none', color:'#f1f5f9', borderRadius:8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section 2: World Map */}
      <div style={s.mapCard}>
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

      {/* Section 3: Recent Visits Table */}
      <div style={s.tableCard}>
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

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .dashboard-top-section {
            grid-template-columns: 1fr !important;
          }
          .dashboard-counter {
            min-height: 140px !important;
          }
          .dashboard-pie {
            min-height: 250px !important;
          }
        }
      `}</style>
    </div>
  )
}

const s = {
  page:      { minHeight:'100vh', background:'#0f172a', fontFamily:'system-ui,sans-serif', padding:'1.5rem', color:'#f1f5f9' },
  header:    { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem' },
  h1:        { fontSize:'1.6rem', fontWeight:700, margin:0, color:'#f1f5f9' },
  sub:       { color:'#64748b', fontSize:'.85rem', marginTop:4 },
  logoutBtn: { background:'#1e293b', color:'#94a3b8', border:'1px solid #334155', borderRadius:8, padding:'.45rem 1rem', cursor:'pointer', fontSize:'.85rem' },
  
  // Top Section: Counter + 2 Pies
  topSection: { 
    display:'grid', 
    gridTemplateColumns:'200px 1fr 1fr', 
    gap:'1.25rem', 
    marginBottom:'1.5rem',
  },
  counterCard:{ 
    background:'#1e293b', 
    borderRadius:12, 
    padding:'1.5rem', 
    border:'1px solid #334155', 
    display:'flex', 
    flexDirection:'column', 
    justifyContent:'center', 
    alignItems:'center', 
    textAlign:'center',
    minHeight: '180px'
  },
  counterNum: { fontSize:'3.5rem', fontWeight:800, color:'#3d54ea', lineHeight:1 },
  counterLbl: { fontSize:'1rem', color:'#64748b', marginTop:'0.5rem' },
  pieCard:    { 
    background:'#1e293b', 
    borderRadius:12, 
    padding:'1rem', 
    border:'1px solid #334155',
    minHeight: '220px'
  },
  pieTitle:   { fontSize:'0.9rem', fontWeight:600, marginBottom:'0.5rem', color:'#cbd5e1', textAlign:'center' },
  
  // Map Section
  mapCard:    { background:'#1e293b', borderRadius:12, padding:'1.25rem 1.5rem', border:'1px solid #334155', marginBottom:'1.5rem' },
  cardTitle:  { fontSize:'1rem', fontWeight:600, marginBottom:'1rem', color:'#cbd5e1' },
  
  // Table Section
  tableCard:  { background:'#1e293b', borderRadius:12, padding:'1.25rem 1.5rem', border:'1px solid #334155', overflowX:'auto' },
  table:      { width:'100%', borderCollapse:'collapse', fontSize:'.85rem' },
  th:         { textAlign:'left', padding:'.6rem .75rem', color:'#64748b', fontWeight:600, borderBottom:'1px solid #334155' },
  tr:         { borderBottom:'1px solid #1e293b' },
  td:         { padding:'.6rem .75rem', color:'#cbd5e1' },
  badge:      { display:'inline-block', padding:'2px 8px', borderRadius:999, fontSize:'.75rem', fontWeight:600, color:'#fff' },
}
