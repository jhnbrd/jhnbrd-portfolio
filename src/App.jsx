import { useEffect, useState, useRef } from 'react'
import BootScreen from './components/BootScreen'
import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import StackSection from './components/StackSection'
import CredentialsSection from './components/CredentialsSection'
import GitHubSection from './components/GitHubSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

const SECTIONS = ['about', 'projects', 'stack', 'credentials', 'github', 'contact']

function useActiveSection(scrollRef) {
  const [active, setActive] = useState('about')

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return

    const observers = []

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        {
          root,
          threshold: 0,
          rootMargin: '-15% 0px -70% 0px',
        }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [scrollRef])

  return active
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const scrollRef = useRef(null)
  const activeSection = useActiveSection(scrollRef)

  return (
    <>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}

      <div
        className={`bg-background text-foreground font-mono transition-opacity duration-500 ${
          booted ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Fixed sidebar — desktop only */}
        <Sidebar activeSection={activeSection} />

        {/*
          Single scroll container for the whole page.
          On desktop: has margin-left to clear the fixed sidebar.
          scroll-snap is applied here via CSS class.
        */}
        <div
          ref={scrollRef}
          id="scroll-container"
          className="h-screen overflow-y-scroll scroll-snap-container lg:ml-56"
        >
          {/* Mobile sticky nav — lives inside scroll container so it sticks at container top */}
          <MobileNav activeSection={activeSection} />

          <main id="main-content">
            {/* Hero: first snap point, no scroll-margin needed */}
            <div className="scroll-snap-section">
              <HeroSection activeSection={activeSection} />
            </div>

            {/* Remaining sections: scroll-margin-top on mobile to clear sticky nav */}
            <div id="about" className="scroll-snap-section scroll-mt-14 lg:scroll-mt-0">
              <AboutSection />
            </div>

            <div id="projects" className="scroll-snap-section scroll-mt-14 lg:scroll-mt-0">
              <ProjectsSection />
            </div>

            <div id="stack" className="scroll-snap-section scroll-mt-14 lg:scroll-mt-0">
              <StackSection />
            </div>

            <div id="credentials" className="scroll-snap-section scroll-mt-14 lg:scroll-mt-0">
              <CredentialsSection />
            </div>

            <div id="github" className="scroll-snap-section scroll-mt-14 lg:scroll-mt-0">
              <GitHubSection />
            </div>

            <div id="contact" className="scroll-snap-section scroll-mt-14 lg:scroll-mt-0">
              <ContactSection />
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </>
  )
}
