import './styles/main.scss'
import { createApp, initApp } from './components/App.js'
import { siteConfig, getPageTitle } from './config/site.js'
import { getCurrentRoute, isInnerPage } from './constants/routes.js'
import { getBodyClass } from './constants/classNames.js'

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  if (app) {
    // Determine current page using centralized route detection
    const page = getCurrentRoute()
    const isInner = isInnerPage(page)

    // Set body class using centralized utility
    const bodyClass = getBodyClass(isInner)
    if (bodyClass) {
      document.body.classList.add(bodyClass)
    }

    // Set document title from centralized config
    document.title = getPageTitle(page)

    app.innerHTML = createApp({ page, isInner })
    initApp()
  }
})
