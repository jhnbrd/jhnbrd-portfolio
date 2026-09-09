import React, { useState } from 'react'
import { ThemeProvider, useTheme } from './hooks/useTheme'
import EditorialHeader from './components/EditorialHeader'
import EditorialHero from './components/EditorialHero'
import EditorialBio from './components/EditorialBio'
import DevJunctionSection from './components/DevJunctionSection'
import EditorialProjectsList from './components/EditorialProjectsList'
import EditorialProjectDrawer from './components/EditorialProjectDrawer'
import EditorialFooter from './components/EditorialFooter'
import MinimalistFreedomWallModal from './components/MinimalistFreedomWallModal'
import FloatingFreedomWallButton from './components/FloatingFreedomWallButton'

import {
  personal,
  stats,
  machines,
  homelab,
  featuredProjects,
} from './data/portfolio'

function AppContent() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isFreedomWallOpen, setIsFreedomWallOpen] = useState(false)
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen font-sans transition-colors duration-700 ${
      isDark ? 'bg-neutral-950 text-white' : 'bg-white text-black'
    }`}>
      <EditorialHeader 
        onOpenFreedomWall={() => setIsFreedomWallOpen(true)}
      />

      <EditorialHero />

      <EditorialBio personal={personal} />

      <DevJunctionSection personal={personal} />

      <EditorialProjectsList 
        projects={featuredProjects}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      <EditorialFooter personal={personal} />

      <EditorialProjectDrawer 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Cute Floating Freedom Wall button only visible on the last section */}
      <FloatingFreedomWallButton 
        onClick={() => setIsFreedomWallOpen(true)}
      />

      <MinimalistFreedomWallModal 
        isOpen={isFreedomWallOpen}
        onClose={() => setIsFreedomWallOpen(false)}
      />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
