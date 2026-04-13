import { useEffect } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

function getDeviceType() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
}

export default function useTrackVisit() {
  useEffect(() => {
    const track = async () => {
      try {
        // Free IP geolocation — no key needed
        const geo = await fetch('https://ipapi.co/json/').then(r => r.json())
        await addDoc(collection(db, 'visits'), {
          timestamp:   serverTimestamp(),
          device:      getDeviceType(),
          country:     geo.country_name  || 'Unknown',
          countryCode: geo.country_code  || 'XX',
          city:        geo.city          || 'Unknown',
          lat:         geo.latitude      || 0,
          lng:         geo.longitude     || 0,
          ua:          navigator.userAgent,
        })
      } catch (e) {
        // Silently fail — never break the site for tracking errors
      }
    }
    track()
  }, [])
}
