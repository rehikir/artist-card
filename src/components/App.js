import { siteConfig, getPageSuffix } from '../config/index.js'
import { getCardClass } from '../constants/classNames.js'
import { Header } from './Header/Header.js'
import { Body } from './Body/Body.js'
import { Footer } from './Footer/Footer.js'
import { Cursor } from './Cursor/Cursor.js'

export function createApp({ page = 'home', isInner = false } = {}) {
  return `
    ${Cursor()}
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

// Initialize app
export function initApp() {
  // Intentionally empty
}
