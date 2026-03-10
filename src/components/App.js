import { siteConfig, getPageTitle, getPageSuffix } from '../config/site.js'
import { getCardClass } from '../constants/classNames.js'
import { Header } from './Header/Header.js'
import { Body } from './Body/Body.js'
import { Footer } from './Footer/Footer.js'

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

      ${Footer({ inner: isInner })}
    </div>
  `
}

// Initialize app (animations disabled for UX redesign)
export function initApp() {
  // Intentionally empty
}
