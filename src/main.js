import './styles/main.scss'
import { createApp } from './components/App.js'
import { getBodyClass } from './constants/classNames.js'
import { initRouter, isInnerPage, getPageData } from './router/index.js'
import { init as initCursor, destroy as destroyCursor } from './utils/cursor.js'

const DEBUG = true
function log(...args) {
  if (DEBUG) console.log('[Main]', ...args)
}

// Initialize the application as SPA
document.addEventListener('DOMContentLoaded', () => {
  log('DOMContentLoaded')
  const app = document.getElementById('app')
  if (app) {
    // Initialize SPA router with page change handler
    initRouter((page) => {
      log('Route change to:', page)
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

      log('Before innerHTML - destroying cursor')
      // Re-render app content
      app.innerHTML = createApp({ page, isInner })
      log('After innerHTML')

      // Reinitialize cursor after DOM update
      destroyCursor()
      initCursor()
      log('Cursor re-initialized')
    })

    // Initial cursor initialization
    log('Initial cursor init')
    initCursor()
  }
})
