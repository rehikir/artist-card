import './styles/main.scss'
import { createApp } from './components/App.js'
import { getPageTitle } from './config/site.js'
import { getBodyClass } from './constants/classNames.js'
import { initRouter, isInnerPage, getPageData } from './utils/router.js'
import { init as initCursor, destroy as destroyCursor } from './utils/cursor.js'

// Initialize the application as SPA
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  if (app) {
    // Initialize SPA router with page change handler
    initRouter((page) => {
      const isInner = isInnerPage(page)
      const { title } = getPageData(page)

      // Update body class
      document.body.className = ''
      const bodyClass = getBodyClass(isInner)
      if (bodyClass) {
        document.body.classList.add(bodyClass)
      }

      // Update document title
      document.title = title

      // Re-render app content
      app.innerHTML = createApp({ page, isInner })

      // Reinitialize cursor after DOM update
      destroyCursor()
      initCursor()
    })

    // Initial cursor initialization
    initCursor()
  }
})
