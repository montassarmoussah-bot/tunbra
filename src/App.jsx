import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import Loader          from './components/Loader'
import ScrollProgress  from './components/ScrollProgress'
import Navigation      from './components/Navigation'
import Footer          from './components/Footer'
import Hero            from './components/sections/Hero'
import About           from './components/sections/About'
import Products        from './components/sections/Products'
import Services        from './components/sections/Services'
import Partners        from './components/sections/Partners'
import Guides          from './components/sections/Guides'
import Contact         from './components/sections/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {/* Loading screen — exits with slide-up animation */}
      <AnimatePresence>
        {loading && (
          <Loader key="loader" onDone={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main site (rendered beneath, revealed when loader exits) */}
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Products />
        <Services />
        <Partners />
        <Guides />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
