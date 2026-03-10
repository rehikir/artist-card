import { Header, Body, Footer } from './index.js'
import { slotConfig } from '../config/slots.js'
import { images } from '../config/pages.js'

export function createApp({ page = 'home', isInner = false } = {}) {
  const titles = {
    home: 'Commissions',
    rules: 'Rules & Terms',
    prices: 'Prices'
  }
  const title = titles[page] || 'Commissions'
  const cardClass = `card ${isInner ? 'card--inner-page' : 'card--home'}`

  return `
    <div class="${cardClass}">
      ${Header({
        title,
        logoSrc: images.logo,
        kirSrc: images.kir,
        inner: isInner
      })}

      ${Body({ inner: isInner })}

      ${Footer(slotConfig, isInner)}
    </div>
  `
}

// Initialize app (no animations for now)
export function initApp() {
  // Animations removed for reconsideration
}
