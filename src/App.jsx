import React, { useState } from 'react'
import EditorialHeader from './components/EditorialHeader'
import EditorialHero from './components/EditorialHero'
import EditorialBio from './components/EditorialBio'
import EditorialProjectsList from './components/EditorialProjectsList'
import EditorialProjectDrawer from './components/EditorialProjectDrawer'
import EditorialFooter from './components/EditorialFooter'
import MinimalistFreedomWallModal from './components/MinimalistFreedomWallModal'

// Keep src/data/portfolio.js as the single source of truth
import {
  personal,
  stats,
  machines,
  homelab,
  featuredProjects,
} from './data/portfolio'

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isFreedomWallOpen, setIsFreedomWallOpen] = useState(false)

  return (
    <div className="min-h-screen bg-editorial text-ink font-sans selection:bg-accent-neon selection:text-black">
      {/* Editorial Header with Status & Telemetry */}
      <EditorialHeader 
        onOpenFreedomWall={() => setIsFreedomWallOpen(true)}
      />

      {/* Hero Section: Void black (#070707), delicate grid, display typography, mint accent */}
      <EditorialHero 
        personal={personal} 
        stats={stats} 
      />

      {/* Bio Manifesto & Homelab Infrastructure: Pure editorial white (#ffffff), extreme whitespace, two-column split */}
      <EditorialBio 
        personal={personal} 
        homelab={homelab} 
        machines={machines} 
      />

      {/* Selected Projects: Interactive hover-list with monospace index, floating preview card, and hairline dividers */}
      <EditorialProjectsList 
        projects={featuredProjects}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Footer & CTA: Ambient pastel glow, high-contrast action pill buttons */}
      <EditorialFooter 
        personal={personal} 
      />

      {/* Project Case Study Drawer / Modal: Obsidian black, Problem/Outcome left, Separated Stack right, Framed UI bottom */}
      <EditorialProjectDrawer 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Live Minimalist WebSocket Freedom Wall Modal */}
      <MinimalistFreedomWallModal 
        isOpen={isFreedomWallOpen}
        onClose={() => setIsFreedomWallOpen(false)}
      />
    </div>
  )
}
