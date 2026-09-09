import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function EditorialBio({ personal }) {
  return (
    <section id="about" className="w-full bg-white text-black py-28 sm:py-40 border-b border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
        {/* Top Manifesto Statement matching Screenshot 2 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 sm:mb-32"
        >
          <h2 className="text-3xl sm:text-5xl md:text-[3.25rem] font-bold tracking-tight text-black leading-[1.18] max-w-4xl">
            I believe in an engineering-first, user-centered approach, ensuring that every system I build is tailored to meet the specific operational needs of its users.
          </h2>
        </motion.div>

        {/* Hairline Divider & "This is me." Label */}
        <div className="w-full pt-4 border-t border-neutral-200 mb-12">
          <span className="text-xs italic text-neutral-400 font-serif">
            This is me.
          </span>
        </div>

        {/* Lower Two-Column Grid matching Screenshot 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16">
          {/* Left Column: Greeting & Pill Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 flex flex-col justify-between items-start space-y-8"
          >
            <h3 className="text-4xl sm:text-5xl font-light tracking-tight text-black">
              Hi, I'm Jhianne.
            </h3>

            {/* High-Contrast "Get in Touch" Pill Button exact match */}
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2.5 bg-black hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm px-7 py-3.5 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm"
            >
              <ArrowUpRight size={15} />
              <span>Get in Touch</span>
            </a>
          </motion.div>

          {/* Right Column: Narrative Paragraphs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 space-y-6 text-sm sm:text-[0.95rem] text-neutral-600 font-light leading-relaxed"
          >
            <p>
              I'm a backend developer and systems architect dedicated to turning complex architectures into resilient solutions. I specialize in building high-throughput APIs, cloud systems, and scalable database schemas.
            </p>
            <p>
              I'm involved in every step of the process: from schema discovery and system design to implementation, automated testing, and multi-machine staging. I focus on delivering high-quality, scalable results that drive reliable operations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
