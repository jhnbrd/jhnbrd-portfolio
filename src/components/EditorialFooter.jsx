import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, Linkedin, Github } from 'lucide-react'

export default function EditorialFooter({ personal }) {
  return (
    <footer id="contact" className="relative w-full bg-white text-black py-28 sm:py-36 overflow-hidden border-t border-neutral-200">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Subtle subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-4"
        >
          Let’s collaborate
        </motion.p>

        {/* Closing headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-950 max-w-2xl leading-[1.1] mb-12"
        >
          Want to build something together?
        </motion.h2>

        {/* High-Contrast Conversion Pill Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-20"
        >
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2.5 bg-black hover:bg-neutral-800 text-white font-medium px-8 py-4 rounded-full text-xs sm:text-sm shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <Mail size={15} />
            <span>{personal.email}</span>
            <ArrowUpRight size={15} />
          </a>

          <a
            href={personal.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-white hover:bg-neutral-50 text-black border border-neutral-300 font-medium px-8 py-4 rounded-full text-xs sm:text-sm transition-colors"
          >
            <Linkedin size={15} />
            <span>Connect on LinkedIn</span>
          </a>
        </motion.div>

        {/* Footer Meta */}
        <div className="w-full pt-10 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            © {new Date().getFullYear()} Jhianne Jose Berida · Davao City, PH
          </div>

          <div className="flex gap-6">
            <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">GitHub</a>
            <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">LinkedIn</a>
            <a href="https://dev.jhnbrd.com" className="hover:text-black transition-colors">dev.jhnbrd.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
