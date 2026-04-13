import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import Loader         from './components/Loader'
import ScrollProgress from './components/ScrollProgress'
import Navigation     from './components/Navigation'
import Footer         from './components/Footer'
import Hero           from './components/sections/Hero'
import About          from './components/sections/About'
import Products       from './components/sections/Products'
import Services       from './components/sections/Services'
import Guides         from './components/sections/Guides'
import Contact        from './components/sections/Contact'
import LoginPage      from './admin/LoginPage'
import Dashboard      from './admin/Dashboard'
import useTrackVisit  from './hooks/useTrackVisit'

function MainSite() {
  const [loading, setLoading] = useState(true)
  useTrackVisit()

  return (
    <>
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Products />
        <Services />
        <Guides />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/monta"            element={<LoginPage />} />
        <Route path="/monta/dashboard"  element={<Dashboard />} />
        <Route path="*"                 element={<MainSite />} />
      </Routes>
    </BrowserRouter>
  )
}
