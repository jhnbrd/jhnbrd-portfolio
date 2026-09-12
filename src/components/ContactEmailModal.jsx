import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, ChevronDown, Check } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const FREQUENT_SUBJECTS = [
  'Project Inquiry & Development',
  'DevJunction Collaboration',
  'Backend Architecture & Consulting',
  'Contract & Engineering Role',
  'General Question / Chat',
  'Other',
]

export default function ContactEmailModal({ isOpen, onClose, recipientEmail = 'dev@jhnbrd.com' }) {
  const { isDark } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subjectOption: FREQUENT_SUBJECTS[0],
    customSubject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [sentSummary, setSentSummary] = useState(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setIsSubmitted(false)
      setIsSubmitting(false)
      setErrors({})
    }, 350)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Required'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Required'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Invalid email'
    }

    if (formData.subjectOption === 'Other' && !formData.customSubject.trim()) {
      newErrors.customSubject = 'Please specify subject'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    const finalSubject = formData.subjectOption === 'Other'
      ? formData.customSubject.trim()
      : formData.subjectOption

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: finalSubject,
          message: formData.message.trim(),
          style: 'memo',
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch email')
      }

      setSentSummary({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: finalSubject,
      })
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (err) {
      console.error('Email dispatch failed:', err)
      setIsSubmitting(false)
      setErrors((prev) => ({
        ...prev,
        submit: err.message || 'Dispatch failed. Please check connection.',
      }))
    }
  }

  const handleResetForm = () => {
    setIsSubmitted(false)
    setFormData({
      name: '',
      email: '',
      subjectOption: FREQUENT_SUBJECTS[0],
      customSubject: '',
      message: '',
    })
    setErrors({})
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Subtle Ambient Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Minimalist Editorial Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ type: 'spring', stiffness: 400, damping: 36 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-lg rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl border my-auto z-10 transition-colors duration-500 ${
              isDark 
                ? 'bg-neutral-950 border-neutral-800 text-white' 
                : 'bg-white border-neutral-200 text-black'
            }`}
          >
            {/* Header: Minimalist Typographic Bar */}
            <div className="flex items-start justify-between pb-6 sm:pb-8 border-b border-inherit">
              <div>
                <span className={`text-[11px] font-mono uppercase tracking-widest block mb-1.5 ${
                  isDark ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  Direct Dispatch · {recipientEmail}
                </span>
                <h3 id="contact-modal-title" className="text-2xl sm:text-3xl font-medium tracking-tight">
                  {isSubmitted ? 'Sent.' : "Let's talk."}
                </h3>
              </div>

              <button
                onClick={handleClose}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors -mr-1.5 -mt-1 ${
                  isDark 
                    ? 'text-neutral-400 hover:text-white hover:bg-neutral-900' 
                    : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
                }`}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="pt-6 sm:pt-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Two-column Sender Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <label 
                          htmlFor="modal-name" 
                          className={`text-[11px] font-mono uppercase tracking-wider ${
                            isDark ? 'text-neutral-500' : 'text-neutral-400'
                          }`}
                        >
                          01 / Name
                        </label>
                        {errors.name && (
                          <span className="text-[11px] font-mono text-neutral-400 italic">
                            {errors.name}
                          </span>
                        )}
                      </div>
                      <input
                        id="modal-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your name"
                        className={`w-full bg-transparent border-b py-2 text-sm font-light transition-colors outline-none rounded-none placeholder-neutral-500 ${
                          errors.name 
                            ? 'border-neutral-500' 
                            : isDark
                              ? 'border-neutral-800 focus:border-white text-white'
                              : 'border-neutral-200 focus:border-black text-black'
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <label 
                          htmlFor="modal-email" 
                          className={`text-[11px] font-mono uppercase tracking-wider ${
                            isDark ? 'text-neutral-500' : 'text-neutral-400'
                          }`}
                        >
                          02 / Email
                        </label>
                        {errors.email && (
                          <span className="text-[11px] font-mono text-neutral-400 italic">
                            {errors.email}
                          </span>
                        )}
                      </div>
                      <input
                        id="modal-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className={`w-full bg-transparent border-b py-2 text-sm font-light transition-colors outline-none rounded-none placeholder-neutral-500 ${
                          errors.email 
                            ? 'border-neutral-500' 
                            : isDark
                              ? 'border-neutral-800 focus:border-white text-white'
                              : 'border-neutral-200 focus:border-black text-black'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Subject Dropdown */}
                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <label 
                        htmlFor="modal-subject-select" 
                        className={`text-[11px] font-mono uppercase tracking-wider ${
                          isDark ? 'text-neutral-500' : 'text-neutral-400'
                        }`}
                      >
                        03 / Subject
                      </label>
                    </div>
                    <div className="relative">
                      <select
                        id="modal-subject-select"
                        value={formData.subjectOption}
                        onChange={(e) => handleInputChange('subjectOption', e.target.value)}
                        className={`w-full appearance-none bg-transparent border-b py-2 pr-8 text-sm font-light transition-colors outline-none rounded-none cursor-pointer ${
                          isDark
                            ? 'border-neutral-800 focus:border-white text-white'
                            : 'border-neutral-200 focus:border-black text-black'
                        }`}
                      >
                        {FREQUENT_SUBJECTS.map((subject) => (
                          <option 
                            key={subject} 
                            value={subject}
                            className={isDark ? 'bg-neutral-950 text-white' : 'bg-white text-black'}
                          >
                            {subject}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className={`absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none opacity-50`}
                      />
                    </div>
                  </div>

                  {/* Custom Subject (when 'Other' is selected) */}
                  <AnimatePresence>
                    {formData.subjectOption === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-baseline justify-between mb-1.5">
                          <label 
                            htmlFor="modal-custom-subject" 
                            className={`text-[11px] font-mono uppercase tracking-wider ${
                              isDark ? 'text-neutral-500' : 'text-neutral-400'
                            }`}
                          >
                            Specify Subject
                          </label>
                          {errors.customSubject && (
                            <span className="text-[11px] font-mono text-neutral-400 italic">
                              {errors.customSubject}
                            </span>
                          )}
                        </div>
                        <input
                          id="modal-custom-subject"
                          type="text"
                          value={formData.customSubject}
                          onChange={(e) => handleInputChange('customSubject', e.target.value)}
                          placeholder="Your custom subject line"
                          autoFocus
                          className={`w-full bg-transparent border-b py-2 text-sm font-light transition-colors outline-none rounded-none placeholder-neutral-500 ${
                            errors.customSubject
                              ? 'border-neutral-500'
                              : isDark
                                ? 'border-neutral-800 focus:border-white text-white'
                                : 'border-neutral-200 focus:border-black text-black'
                          }`}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Message */}
                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <label 
                        htmlFor="modal-message" 
                        className={`text-[11px] font-mono uppercase tracking-wider ${
                          isDark ? 'text-neutral-500' : 'text-neutral-400'
                        }`}
                      >
                        04 / Message
                      </label>
                      {errors.message && (
                        <span className="text-[11px] font-mono text-neutral-400 italic">
                          {errors.message}
                        </span>
                      )}
                    </div>
                    <textarea
                      id="modal-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Write your message or project requirements..."
                      className={`w-full bg-transparent border-b py-2 text-sm font-light transition-colors outline-none rounded-none resize-none leading-relaxed placeholder-neutral-500 ${
                        errors.message
                          ? 'border-neutral-500'
                          : isDark
                            ? 'border-neutral-800 focus:border-white text-white'
                            : 'border-neutral-200 focus:border-black text-black'
                      }`}
                    />
                  </div>

                  {errors.submit && (
                    <div className="pt-2 text-xs font-mono text-rose-400">
                      {errors.submit}
                    </div>
                  )}

                  {/* Footer Action Bar */}
                  <div className="pt-4 flex items-center justify-between">
                    <p className={`text-[11px] font-mono ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}>
                      Sender copy queued with letterhead
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm cursor-pointer ${
                        isDark 
                          ? 'bg-white hover:bg-neutral-200 text-black' 
                          : 'bg-black hover:bg-neutral-800 text-white'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send'}</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </form>
              ) : (
                /* Minimalist Sent State */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 py-2"
                >
                  <p className={`text-base sm:text-lg font-light leading-relaxed ${
                    isDark ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    Thank you, <span className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>{sentSummary?.name}</span>. Your message has been sent to Jhianne, and a copy has been queued for <span className="font-mono text-xs underline">{sentSummary?.email}</span>.
                  </p>

                  <div className={`pt-4 border-t ${isDark ? 'border-neutral-900' : 'border-neutral-100'}`}>
                    <p className={`text-xs font-mono leading-relaxed ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Subject: {sentSummary?.subject}
                      <br />
                      Expect a formal response within 24–48 hours.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className={`px-7 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
                        isDark 
                          ? 'bg-white hover:bg-neutral-200 text-black' 
                          : 'bg-black hover:bg-neutral-800 text-white'
                      }`}
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className={`text-xs font-mono underline hover:opacity-75 transition-opacity ${
                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                      }`}
                    >
                      Send another
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
