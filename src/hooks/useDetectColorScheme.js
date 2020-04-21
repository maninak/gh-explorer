import { useState, useEffect } from 'react'

const colorSchemes = {
  DARK: '(prefers-color-scheme: dark)',
  LIGHT: '(prefers-color-scheme: light)'
}

export function useDetectColorScheme (defaultScheme = 'light') {
  const [scheme, setScheme] = useState(defaultScheme)

  useEffect(() => {
    // No support for detection
    if (!window.matchMedia) {
      return
    }

    const listener = e => {
      // No match = not interesting
      if (!e || !e.matches) {
        return
      }

      // Look for the matching color scheme
      // and update the hook state
      const schemeNames = Object.keys(colorSchemes)
      for (let i = 0; i < schemeNames.length; i++) {
        const schemeName = schemeNames[i]
        if (e.media === colorSchemes[schemeName]) {
          setScheme(schemeName.toLowerCase())
          break
        }
      }
    }

    // Loop through and setup listeners for the
    // media queries we want to monitor
    let activeMatches = []
    Object.keys(colorSchemes).forEach(schemeName => {
      const mq = window.matchMedia(colorSchemes[schemeName])
      mq.addListener(listener)
      activeMatches.push(mq)
      listener(mq)
    })

    return () => {
      activeMatches.forEach(mq => mq.removeListener(listener))
      activeMatches = []
    }
  }, [])

  return scheme
}