import { ArrowUpRight } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import LilimioRelease from './LilimioRelease'

export default function LilimioSection() {
  const { isDark } = useTheme()
  return (
    <section id="lilimio" aria-labelledby="lilimio-heading" className={`lilimio-section ${isDark ? 'bg-neutral-950 text-white' : 'bg-white text-black'}`}>
      <div className="lilimio-layout">
        <div className="lilimio-copy">
          <p className="lilimio-eyebrow">A product by DevJunction</p>
          <img className="lilimio-wordmark" src="/images/lilimio/wordmark.png" alt="lilimio." width="640" height="219" />
          <h2 id="lilimio-heading">Know the heat.<br />Find your shade.</h2>
          <p className="lilimio-description">Compare forecasts, plan outdoor time, and find nearby places to cool down.</p>
          <a className="lilimio-link" href="https://lilimio.jhnbrd.com" target="_blank" rel="noopener noreferrer">Explore lilimio <ArrowUpRight size={16} aria-hidden="true" /></a>
          <p className="lilimio-credit">Main developer · Jhianne Jose C. Berida</p>
          <LilimioRelease />
        </div>
        <figure className="lilimio-device">
          <div className="lilimio-phone-crop">
            <img src="/images/lilimio/reference-phone.png" alt="Lilimio home page in the supplied iPhone mockup, showing an illustrative heat index and outdoor planning controls." width="1122" height="1402" loading="lazy" decoding="async" draggable="false" />
          </div>
          <figcaption>App preview · illustrative weather</figcaption>
        </figure>
      </div>
    </section>
  )
}
