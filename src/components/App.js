import { siteConfig, getPageTitle, getPageSuffix } from '../config/site.js'
import { getCardClass } from '../constants/classNames.js'
import { Header } from './Header/Header.js'
import { Body } from './Body/Body.js'
import { Footer } from './Footer/Footer.js'
import { slotConfig } from '../config/slots.js'
import { initAnimations } from '../utils/animations.js'

export function createApp({ page = 'home', isInner = false } = {}) {
  return `
    <div class="${getCardClass(isInner)}">
      ${Header({
        title: getPageSuffix(page),
        logoSrc: siteConfig.images.logo,
        kirSrc: siteConfig.images.kir,
        inner: isInner,
        currentPage: page
      })}

      ${Body({ inner: isInner, page })}

      ${Footer({ ...slotConfig, inner: isInner })}
    </div>
  `
}

// Initialize app with animations
export function initApp() {
  initAnimations()
}
