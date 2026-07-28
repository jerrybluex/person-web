import { useState, useEffect } from 'react'
import { Nav, Hero, Services, SystemLayers, Delivery, SiteFooter } from './sections/Sections'
import { Intake } from './sections/Intake'
import { Lab } from './sections/Lab'
import { Tools } from './sections/Tools'
import { HudStyle } from './components/hud'

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const isLab = currentHash === '#lab'
  const isTools = currentHash === '#tools'
  const isCustomPage = isLab || isTools

  // Scroll to anchor on the homepage after it mounts (especially when returning from other pages)
  useEffect(() => {
    if (!isCustomPage) {
      const targetId = currentHash ? currentHash.replace('#', '') : 'top'
      
      const timer = setTimeout(() => {
        if (targetId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          const element = document.getElementById(targetId)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }, 60) // Let the DOM update and render sections first
      return () => clearTimeout(timer)
    }
  }, [isCustomPage, currentHash])

  return (
    <>
      <HudStyle />
      <Nav currentHash={currentHash} />
      {isTools ? (
        <Tools />
      ) : isLab ? (
        <Lab />
      ) : (
        <>
          <Hero />
          <Services />
          <SystemLayers />
          <Delivery />
          <Intake />
        </>
      )}
      <SiteFooter />
    </>
  )
}

