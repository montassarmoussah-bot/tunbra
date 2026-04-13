import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { 
  Accessibility, X, Check,
  // Smart Contrast 
  Contrast,
  // Animations on
  Sparkles,
  // Animations off
  Pause,
  // Voice navigation - head with sound
  AudioLines,
  // Inverted colors - monitor with invert
  Monitor,
  // Highlight links - link icon
  Link,
  // Grayscale
  Droplet,
  // Spacing - arrows
  ArrowLeftRight,
  // Hide images - image with X
  ImageOff
} from 'lucide-react'

// Smart Contrast Icon (custom combination)
const SmartContrastIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20" fill="currentColor" opacity="0.5"/>
    <circle cx="12" cy="12" r="3" fill="none" />
    <path d="M19 12h-2M5 12h2" />
  </svg>
)

// Inverted Colors Icon
const InvertedColorsIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <circle cx="12" cy="10" r="4" fill="currentColor" />
    <path d="M12 6v8" stroke="white" />
  </svg>
)

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, isRTL } = useLanguage()
  
  const [settings, setSettings] = useState({
    smartContrast: false,
    animations: true,
    noAnimations: false,
    voiceNav: false,
    invertedColors: false,
    highlightLinks: false,
    grayscale: false,
    moderateSpacing: false,
    hideImages: false,
  })

  const toggleSetting = useCallback((key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const resetAll = useCallback(() => {
    setSettings({
      smartContrast: false,
      animations: true,
      noAnimations: false,
      voiceNav: false,
      invertedColors: false,
      highlightLinks: false,
      grayscale: false,
      moderateSpacing: false,
      hideImages: false,
    })
  }, [])

  // Apply settings to body (NOT to the widget itself)
  useEffect(() => {
    const body = document.body
    
    // Smart Contrast - applies subtle contrast enhancement
    body.classList.toggle('a11y-smart-contrast', settings.smartContrast)
    
    // Animations - if false, reduce motion
    body.classList.toggle('a11y-reduce-motion', !settings.animations)
    
    // No Animations (forces reduce motion regardless of animations toggle)
    body.classList.toggle('a11y-force-reduce-motion', settings.noAnimations)
    
    // Pause all videos when no animations is enabled (skip always-play videos like hero)
    const videos = document.querySelectorAll('video:not(.a11y-widget-trigger *):not(.a11y-widget-panel *)')
    videos.forEach(video => {
      if (video.getAttribute('data-always-play') === 'true') return
      if (settings.noAnimations) {
        video.pause()
        video.setAttribute('data-a11y-paused', 'true')
      } else if (video.getAttribute('data-a11y-paused') === 'true') {
        video.removeAttribute('data-a11y-paused')
      }
    })
    
    // Voice Navigation mode (enhances focus visibility)
    body.classList.toggle('a11y-voice-nav', settings.voiceNav)
    
    // Inverted Colors
    body.classList.toggle('a11y-inverted', settings.invertedColors)
    
    // Highlight Links
    body.classList.toggle('a11y-highlight-links', settings.highlightLinks)
    
    // Grayscale
    body.classList.toggle('a11y-grayscale', settings.grayscale)
    
    // Moderate Spacing
    body.classList.toggle('a11y-spacing', settings.moderateSpacing)
    
    // Hide Images
    body.classList.toggle('a11y-hide-images', settings.hideImages)
    
    localStorage.setItem('tunbra-a11y-v2', JSON.stringify(settings))
  }, [settings])

  // Load saved settings
  useEffect(() => {
    const saved = localStorage.getItem('tunbra-a11y-v2')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  const activeCount = Object.entries(settings).filter(([k, v]) => {
    // Don't count animations as "active" when it's true (default)
    if (k === 'animations') return !v
    return v
  }).length

  const features = [
    { 
      key: 'smartContrast', 
      icon: SmartContrastIcon, 
      labelKey: 'a11y.smartContrast',
      hasInfo: false,
    },
    { 
      key: 'animations', 
      icon: Sparkles, 
      labelKey: 'a11y.animations',
      hasInfo: false,
    },
    { 
      key: 'noAnimations', 
      icon: Pause, 
      labelKey: 'a11y.noAnimations',
      hasInfo: false,
    },
    { 
      key: 'voiceNav', 
      icon: AudioLines, 
      labelKey: 'a11y.voiceNav',
      hasInfo: true,
    },
    { 
      key: 'invertedColors', 
      icon: InvertedColorsIcon, 
      labelKey: 'a11y.invertedColors',
      hasInfo: false,
    },
    { 
      key: 'highlightLinks', 
      icon: Link, 
      labelKey: 'a11y.highlightLinks',
      hasInfo: false,
    },
    { 
      key: 'grayscale', 
      icon: Droplet, 
      labelKey: 'a11y.grayscale',
      hasInfo: false,
    },
    { 
      key: 'moderateSpacing', 
      icon: ArrowLeftRight, 
      labelKey: 'a11y.moderateSpacing',
      hasInfo: false,
    },
    { 
      key: 'hideImages', 
      icon: ImageOff, 
      labelKey: 'a11y.hideImages',
      hasInfo: false,
    },
  ]

  // Check if feature is active (with special handling for animations)
  const isActive = (key) => {
    if (key === 'animations') return !settings[key] // Inverted: animations OFF means feature is "active"
    return settings[key]
  }

  return createPortal(
    <>
      {/* Floating Trigger Button - ISOLATED from all body effects */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="a11y-widget-trigger"
        style={{
          position: 'fixed',
          bottom: '20px',
          [isRTL ? 'left' : 'right']: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: activeCount > 0 ? '#3d54ea' : '#1e293b',
          border: `2px solid ${activeCount > 0 ? '#3d54ea' : '#334155'}`,
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          zIndex: 2147483647, // Maximum z-index
          fontSize: '16px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          lineHeight: 1,
          margin: 0,
          padding: 0,
          textTransform: 'none',
          letterSpacing: 'normal',
          // Reset all potential inherited styles
          transform: 'none',
          filter: 'none',
          opacity: 1,
          pointerEvents: 'auto',
        }}
        aria-label={t('a11y.title')}
      >
        {isOpen ? <X size={24} /> : <Accessibility size={24} />}
        {activeCount > 0 && !isOpen && (
          <span 
            className="a11y-widget-badge"
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#ef4444',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {activeCount}
          </span>
        )}
      </button>

      {/* Backdrop overlay - closes when clicking outside */}
      {isOpen && (
        <div
          className="a11y-widget-backdrop"
          onClick={(e) => {
            // Only close if clicking the backdrop itself, not the panel
            if (e.target === e.currentTarget) {
              setIsOpen(false)
            }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2147483645,
            background: 'transparent',
          }}
        />
      )}

      {/* Widget Panel - ISOLATED from all body effects */}
      {isOpen && (
        <div 
          className="a11y-widget-panel"
          onClick={(e) => e.stopPropagation()} // Prevent clicks from reaching backdrop
          style={{
            position: 'fixed',
            bottom: '90px',
            [isRTL ? 'left' : 'right']: '20px',
            width: '360px',
            maxWidth: 'calc(100vw - 40px)',
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
            background: '#f5f5f5',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            zIndex: 2147483646,
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            fontSize: '14px',
            lineHeight: '1.4',
            color: '#333',
            transform: 'none',
            filter: 'none',
            opacity: 1,
            letterSpacing: 'normal',
            wordSpacing: 'normal',
            textTransform: 'none',
            pointerEvents: 'auto',
          }}
        >
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '20px',
            direction: isRTL ? 'rtl' : 'ltr',
          }}>
            <h3 style={{ 
              margin: 0, 
              fontSize: '18px', 
              fontWeight: 600, 
              color: '#333',
              fontFamily: 'inherit',
            }}>
              {t('a11y.title')}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: '#666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
              }}
              aria-label={t('a11y.close')}
            >
              <X size={20} />
            </button>
          </div>

          {/* Features Grid - 3 columns */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '16px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {features.map(({ key, icon: Icon, labelKey, hasInfo }) => {
              const active = isActive(key)
              const label = t(labelKey)
              return (
                <button
                  key={key}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSetting(key)
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '16px 8px',
                    background: active ? '#fff' : '#fff',
                    border: `2px solid ${active ? '#666' : '#ddd'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    minHeight: '100px',
                    boxShadow: active ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                    direction: isRTL ? 'rtl' : 'ltr',
                  }}
                  aria-pressed={active}
                >
                  {/* Info icon */}
                  {hasInfo && (
                    <span style={{
                      position: 'absolute',
                      top: '8px',
                      [isRTL ? 'right' : 'left']: '8px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#e0e0e0',
                      color: '#666',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                    }}>
                      i
                    </span>
                  )}

                  {/* Checkmark for active state */}
                  {active && (
                    <span style={{
                      position: 'absolute',
                      top: '8px',
                      [isRTL ? 'left' : 'right']: '8px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#666',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Check size={12} />
                    </span>
                  )}

                  {/* Icon */}
                  <div style={{
                    color: active ? '#333' : '#666',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon size={28} />
                  </div>

                  {/* Label */}
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: active ? '#333' : '#666',
                    lineHeight: 1.3,
                    fontFamily: 'inherit',
                  }}>
                    {label}
                  </span>

                  {/* Progress indicator for some items */}
                  {(key === 'grayscale' || key === 'moderateSpacing' || key === 'noAnimations') && (
                    <div style={{
                      display: 'flex',
                      gap: '2px',
                      marginTop: '4px',
                    }}>
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          style={{
                            width: '16px',
                            height: '3px',
                            background: active ? '#666' : '#ddd',
                            borderRadius: '2px',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Reset Button */}
          {activeCount > 0 && (
            <button
              onClick={resetAll}
              style={{
                width: '100%',
                padding: '12px',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                color: '#666',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'inherit',
                transition: 'all 0.2s',
                direction: isRTL ? 'rtl' : 'ltr',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#999'
                e.currentTarget.style.color = '#333'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#ddd'
                e.currentTarget.style.color = '#666'
              }}
            >
              {t('a11y.resetAll')}
            </button>
          )}
        </div>
      )}

      {/* Global CSS - Applied to page content, widget is NEVER affected */}
      <style>{`
        /* ============================================
           ACCESSIBILITY FEATURES - Applied to page content only
           Widget is isolated by targeting body > * and excluding widget classes
           ============================================ */
        
        /* Smart Contrast - apply to all body children EXCEPT widget and decorative elements */
        body.a11y-smart-contrast > *:not(.a11y-widget-trigger):not(.a11y-widget-panel):not(script):not(style):not(.hero__dots) {
          filter: contrast(1.1) !important;
        }
        
        /* Inverted Colors - apply to all body children EXCEPT widget and decorative elements */
        body.a11y-inverted > *:not(.a11y-widget-trigger):not(.a11y-widget-panel):not(script):not(style):not(.hero__dots) {
          filter: invert(1) hue-rotate(180deg) !important;
        }
        
        /* Keep hero dots subtle in all modes - ISOLATE from parent filters */
        .hero__dots {
          opacity: 0.055 !important;
          filter: none !important;
        }
        
        body.a11y-inverted .hero__dots,
        body.a11y-force-reduce-motion .hero__dots,
        body.a11y-smart-contrast .hero__dots,
        body.a11y-grayscale .hero__dots {
          opacity: 0.04 !important;
          filter: none !important;
        }

        /* Higher-specificity override: wildcard opacity:1 must not affect hero dots */
        body.a11y-force-reduce-motion > *:not(.a11y-widget-trigger):not(.a11y-widget-panel) .hero__dots {
          opacity: 0.055 !important;
          filter: none !important;
        }
        
        /* Re-invert images/media inside inverted content so they look normal */
        body.a11y-inverted > *:not(.a11y-widget-trigger):not(.a11y-widget-panel) img,
        body.a11y-inverted > *:not(.a11y-widget-trigger):not(.a11y-widget-panel) video,
        body.a11y-inverted > *:not(.a11y-widget-trigger):not(.a11y-widget-panel) iframe {
          filter: invert(1) hue-rotate(180deg) !important;
        }
        
        /* Grayscale - apply to all body children EXCEPT widget and decorative elements */
        body.a11y-grayscale > *:not(.a11y-widget-trigger):not(.a11y-widget-panel):not(script):not(style):not(.hero__dots) {
          filter: grayscale(1) !important;
        }
        
        /* Keep hero dots subtle in grayscale mode */
        body.a11y-grayscale .hero__dots {
          opacity: 0.2 !important;
        }
        
        /* Re-apply color to images if they need to stay grayscale */
        body.a11y-grayscale > *:not(.a11y-widget-trigger):not(.a11y-widget-panel) img,
        body.a11y-grayscale > *:not(.a11y-widget-trigger):not(.a11y-widget-panel) video {
          filter: grayscale(1) !important;
        }
        
        /* Moderate Spacing - apply to body children EXCEPT widget */
        body.a11y-spacing > *:not(.a11y-widget-trigger):not(.a11y-widget-panel):not(script):not(style) {
          letter-spacing: 0.025em !important;
          word-spacing: 0.05em !important;
          line-height: 1.6 !important;
        }
        
        /* Also apply to descendants of those children */
        body.a11y-spacing > *:not(.a11y-widget-trigger):not(.a11y-widget-panel) * {
          letter-spacing: 0.025em !important;
          word-spacing: 0.05em !important;
          line-height: 1.6 !important;
        }
        
        /* Hide Images - hide all EXCEPT widget images */
        body.a11y-hide-images img:not(.a11y-widget-trigger *):not(.a11y-widget-panel *),
        body.a11y-hide-images video:not(.a11y-widget-trigger *):not(.a11y-widget-panel *),
        body.a11y-hide-images [class*="hero__visual"],
        body.a11y-hide-images [class*="about__partner"],
        body.a11y-hide-images [class*="products__grid"] img,
        body.a11y-hide-images [class*="services__grid"] img {
          display: none !important;
        }
        
        /* Highlight Links - apply to all EXCEPT widget */
        body.a11y-highlight-links a:not(.a11y-widget-panel a):not(.a11y-widget-trigger),
        body.a11y-highlight-links button:not(.a11y-widget-panel button):not(.a11y-widget-trigger),
        body.a11y-highlight-links [role="button"]:not(.a11y-widget-panel [role="button"]):not(.a11y-widget-trigger) {
          text-decoration: underline !important;
          text-underline-offset: 3px !important;
          text-decoration-thickness: 2px !important;
          text-decoration-color: #3d54ea !important;
        }
        
        /* Reduce Motion - apply to all EXCEPT widget */
        body.a11y-reduce-motion > *:not(.a11y-widget-trigger):not(.a11y-widget-panel):not(script):not(style) {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
        
        body.a11y-reduce-motion > *:not(.a11y-widget-trigger):not(.a11y-widget-panel) *,
        body.a11y-reduce-motion > *:not(.a11y-widget-trigger):not(.a11y-widget-panel) *::before,
        body.a11y-reduce-motion > *:not(.a11y-widget-trigger):not(.a11y-widget-panel) *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
        
        /* Force Reduce Motion (No Animations override) - FREEZE EVERYTHING */
        body.a11y-force-reduce-motion {
          scroll-behavior: auto !important;
        }
        
        body.a11y-force-reduce-motion > *:not(.a11y-widget-trigger):not(.a11y-widget-panel):not(script):not(style) {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }
        
        body.a11y-force-reduce-motion > *:not(.a11y-widget-trigger):not(.a11y-widget-panel) *,
        body.a11y-force-reduce-motion > *:not(.a11y-widget-trigger):not(.a11y-widget-panel) *::before,
        body.a11y-force-reduce-motion > *:not(.a11y-widget-trigger):not(.a11y-widget-panel) *::after {
          animation: none !important;
          transition: none !important;
          transform: none !important;
          opacity: 1 !important;
        }
        
        /* Freeze videos - show first frame only */
        body.a11y-force-reduce-motion video:not(.a11y-widget-trigger *):not(.a11y-widget-panel *) {
          animation: none !important;
          transition: none !important;
        }
        
        /* Disable scroll-triggered animations by freezing transforms */
        body.a11y-force-reduce-motion [class*="scroll"],
        body.a11y-force-reduce-motion [class*="animate"],
        body.a11y-force-reduce-motion [class*="fade"],
        body.a11y-force-reduce-motion [class*="slide"],
        body.a11y-force-reduce-motion [class*="reveal"] {
          animation: none !important;
          transition: none !important;
          transform: none !important;
          opacity: 1 !important;
        }
        
        /* Stop CSS scroll snap */
        body.a11y-force-reduce-motion {
          scroll-snap-type: none !important;
        }
        
        body.a11y-force-reduce-motion > * {
          scroll-snap-align: none !important;
        }
        
        /* Voice Navigation - Enhanced focus */
        body.a11y-voice-nav > *:not(.a11y-widget-trigger):not(.a11y-widget-panel):focus,
        body.a11y-voice-nav > *:not(.a11y-widget-trigger):not(.a11y-widget-panel) *:focus {
          outline: 3px solid #22c55e !important;
          outline-offset: 4px !important;
          background: rgba(34, 197, 94, 0.1) !important;
        }
        
        /* ============================================
           WIDGET PROTECTION - Force widget to stay normal
           ============================================ */
        
        /* ============================================
           WIDGET ISOLATION - All properties reset
           ============================================ */
        
        /* Widget trigger - hard reset all properties */
        .a11y-widget-trigger {
          all: initial !important;
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          width: 56px !important;
          height: 56px !important;
          border-radius: 50% !important;
          background: #1e293b !important;
          border: 2px solid #334155 !important;
          color: #fff !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4) !important;
          z-index: 2147483647 !important;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-size: 16px !important;
          line-height: 1 !important;
          letter-spacing: normal !important;
          word-spacing: normal !important;
          filter: none !important;
          transform: none !important;
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          margin: 0 !important;
          padding: 0 !important;
          text-transform: none !important;
        }
        
        /* Widget panel - hard reset all properties */
        .a11y-widget-panel {
          all: initial !important;
          position: fixed !important;
          bottom: 90px !important;
          right: 20px !important;
          width: 360px !important;
          max-width: calc(100vw - 40px) !important;
          max-height: calc(100vh - 120px) !important;
          overflow-y: auto !important;
          background: #f5f5f5 !important;
          border-radius: 16px !important;
          padding: 20px !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3) !important;
          z-index: 2147483646 !important;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
          font-size: 14px !important;
          line-height: 1.4 !important;
          color: #333 !important;
          letter-spacing: normal !important;
          word-spacing: normal !important;
          filter: none !important;
          transform: none !important;
          opacity: 1 !important;
          visibility: visible !important;
          display: block !important;
          box-sizing: border-box !important;
        }
        
        /* Widget children - reset inheritance */
        .a11y-widget-panel * {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
          letter-spacing: normal !important;
          word-spacing: normal !important;
          line-height: inherit !important;
          filter: none !important;
          transform: none !important;
        }
        
        /* Specific element sizes in widget */
        .a11y-widget-panel h3 {
          font-size: 18px !important;
          margin: 0 0 20px 0 !important;
          font-weight: 600 !important;
          color: #333 !important;
        }
        
        .a11y-widget-panel button {
          font-size: inherit !important;
        }
        
        .a11y-widget-panel button span {
          font-size: 13px !important;
        }
        
        /* Ensure widget is always on top and visible */
        .a11y-widget-trigger,
        .a11y-widget-panel,
        .a11y-widget-badge,
        .a11y-widget-backdrop {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
        }
        
        /* Backdrop must be above everything except widget panel */
        .a11y-widget-backdrop {
          z-index: 2147483645 !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          background: transparent !important;
        }
        
        /* Widget panel above backdrop */
        .a11y-widget-panel {
          z-index: 2147483646 !important;
        }
        
        /* Widget trigger on very top */
        .a11y-widget-trigger {
          z-index: 2147483647 !important;
        }
        
        /* Force widget to render in its own stacking context above all */
        .a11y-widget-trigger,
        .a11y-widget-panel {
          isolation: isolate !important;
        }
      `}</style>
    </>,
    document.body
  )
}
