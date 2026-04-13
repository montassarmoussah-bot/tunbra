import { useEffect, useRef } from 'react'
import { collection, addDoc, serverTimestamp, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

// Generate unique session ID
const generateSessionId = () => {
  return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
}

// Get or create session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('tunbra_session_id')
  if (!sessionId) {
    sessionId = generateSessionId()
    sessionStorage.setItem('tunbra_session_id', sessionId)
  }
  return sessionId
}

// Check if this is a unique visit (first time today)
const isUniqueVisit = () => {
  const today = new Date().toDateString()
  const lastVisit = localStorage.getItem('tunbra_last_visit')
  if (lastVisit !== today) {
    localStorage.setItem('tunbra_last_visit', today)
    return true
  }
  return false
}

// Get device type
function getDeviceType() {
  const ua = navigator.userAgent
  if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) return 'mobile'
  if (/iPad|Android(?!.*Mobi)/i.test(ua)) return 'tablet'
  return 'desktop'
}

// Get device info
function getDeviceInfo() {
  const ua = navigator.userAgent
  const platform = navigator.platform
  const screenSize = `${window.screen.width}x${window.screen.height}`
  const language = navigator.language || navigator.languages?.[0] || 'unknown'
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  
  // Extract OS
  let os = 'Unknown'
  if (ua.indexOf('Win') !== -1) os = 'Windows'
  else if (ua.indexOf('Mac') !== -1) os = 'macOS'
  else if (ua.indexOf('Linux') !== -1) os = 'Linux'
  else if (ua.indexOf('Android') !== -1) os = 'Android'
  else if (ua.indexOf('iOS') !== -1 || /iPad|iPhone|iPod/.test(ua)) os = 'iOS'
  
  // Extract browser
  let browser = 'Unknown'
  if (ua.indexOf('Chrome') !== -1 && ua.indexOf('Edg') === -1) browser = 'Chrome'
  else if (ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1) browser = 'Safari'
  else if (ua.indexOf('Firefox') !== -1) browser = 'Firefox'
  else if (ua.indexOf('Edg') !== -1) browser = 'Edge'
  else if (ua.indexOf('Opera') !== -1 || ua.indexOf('OPR') !== -1) browser = 'Opera'
  
  return { os, browser, platform, screenSize, language, timezone }
}

// Get referrer info
function getReferrerInfo() {
  const referrer = document.referrer
  if (!referrer) return { type: 'direct', source: 'Direct / None' }
  
  try {
    const url = new URL(referrer)
    const hostname = url.hostname
    
    // Social media
    if (hostname.includes('facebook.com')) return { type: 'social', source: 'Facebook' }
    if (hostname.includes('twitter.com') || hostname.includes('x.com')) return { type: 'social', source: 'Twitter/X' }
    if (hostname.includes('linkedin.com')) return { type: 'social', source: 'LinkedIn' }
    if (hostname.includes('instagram.com')) return { type: 'social', source: 'Instagram' }
    
    // Search engines
    if (hostname.includes('google.')) return { type: 'search', source: 'Google' }
    if (hostname.includes('bing.')) return { type: 'search', source: 'Bing' }
    if (hostname.includes('yahoo.')) return { type: 'search', source: 'Yahoo' }
    if (hostname.includes('duckduckgo.')) return { type: 'search', source: 'DuckDuckGo' }
    
    return { type: 'referral', source: hostname }
  } catch {
    return { type: 'referral', source: referrer }
  }
}

export default function useTrackVisit() {
  const hasTracked = useRef(false)
  const sessionId = useRef(getSessionId())
  
  useEffect(() => {
    // Prevent double tracking
    if (hasTracked.current) return
    hasTracked.current = true
    
    const track = async () => {
      try {
        // Get geolocation data
        const geo = await fetch('https://ipapi.co/json/').then(r => r.json()).catch(() => ({}))
        
        // Get device info
        const deviceInfo = getDeviceInfo()
        const referrerInfo = getReferrerInfo()
        const unique = isUniqueVisit()
        
        // Prepare visit data
        const visitData = {
          // Core tracking
          timestamp: serverTimestamp(),
          sessionId: sessionId.current,
          unique: unique,
          
          // Location data
          country: geo.country_name || 'Unknown',
          countryCode: geo.country_code || 'XX',
          city: geo.city || 'Unknown',
          region: geo.region || 'Unknown',
          lat: geo.latitude || 0,
          lng: geo.longitude || 0,
          timezone: geo.timezone || deviceInfo.timezone,
          
          // Device data
          device: getDeviceType(),
          os: deviceInfo.os,
          browser: deviceInfo.browser,
          platform: deviceInfo.platform,
          screenSize: deviceInfo.screenSize,
          language: deviceInfo.language,
          userAgent: navigator.userAgent.substring(0, 200), // Truncate for storage
          
          // Traffic source
          referrer: referrerInfo.source,
          referrerType: referrerInfo.type,
          
          // Page info
          page: window.location.pathname,
          hostname: window.location.hostname,
          
          // Network info (if available)
          ip: geo.ip || 'unknown',
          isp: geo.org || 'unknown',
        }
        
        // Save visit to Firestore
        await addDoc(collection(db, 'visits'), visitData)
        
        // Also update session document for real-time tracking
        const sessionRef = doc(db, 'sessions', sessionId.current)
        const sessionSnap = await getDoc(sessionRef)
        
        if (sessionSnap.exists()) {
          // Update existing session (page view)
          await setDoc(sessionRef, {
            pageViews: (sessionSnap.data().pageViews || 1) + 1,
            lastActive: serverTimestamp(),
            pagesVisited: [...(sessionSnap.data().pagesVisited || []), window.location.pathname].slice(-10),
          }, { merge: true })
        } else {
          // New session
          await setDoc(sessionRef, {
            sessionId: sessionId.current,
            startTime: serverTimestamp(),
            lastActive: serverTimestamp(),
            pageViews: 1,
            pagesVisited: [window.location.pathname],
            ...visitData,
          })
        }
        
        console.log('[TunBra Analytics] Visit tracked:', visitData.country, visitData.city)
        
      } catch (e) {
        // Silently fail — never break the site for tracking errors
        console.error('[TunBra Analytics] Tracking error:', e)
      }
    }
    
    track()
    
    // Track page views within session
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // User returned to tab
        const sessionRef = doc(db, 'sessions', sessionId.current)
        setDoc(sessionRef, { lastActive: serverTimestamp() }, { merge: true }).catch(() => {})
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])
}
