import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations'

const LanguageContext = createContext()

export const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇹🇳' },
]

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const [mounted, setMounted] = useState(false)

  // Detect device language on first load
  useEffect(() => {
    const saved = localStorage.getItem('tunbra-lang')
    if (saved && translations[saved]) {
      setLang(saved)
    } else {
      // Detect browser language
      const browserLang = navigator.language || navigator.userLanguage
      const code = browserLang?.split('-')[0]
      if (code === 'fr') setLang('fr')
      else if (code === 'ar') setLang('ar')
      else setLang('en')
    }
    setMounted(true)
  }, [])

  const setLanguage = (code) => {
    setLang(code)
    localStorage.setItem('tunbra-lang', code)
  }

  const t = (path) => {
    const keys = path.split('.')
    let value = translations[lang]
    for (const key of keys) {
      value = value?.[key]
    }
    return value || path
  }

  const isRTL = lang === 'ar'

  // Apply RTL to document
  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
      document.documentElement.lang = lang
    }
  }, [lang, isRTL, mounted])

  if (!mounted) return null

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t, isRTL, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
