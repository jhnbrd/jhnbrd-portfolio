import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * Wrapper that fades + slides children into view on scroll.
 * delay: Tailwind delay class e.g. 'delay-100'
 */
export default function Reveal({ children, className = '', delay = '', as: Tag = 'div' }) {
  const [ref, visible] = useScrollReveal()

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${delay} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
