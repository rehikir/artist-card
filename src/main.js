import './styles/main.scss'
import { createApp } from './components/App.js'
import { getBodyClass } from './constants/classNames.js'
import { initRouter, isInnerPage, getPageData } from './router/index.js'
import { init as initCursor, destroy as destroyCursor } from './utils/cursor.js'
import { crossfade } from './utils/animations.js'

// Transition state - prevent navigation during transition
let isTransitioning = false

// Initialize the application as SPA
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  if (app) {
    // Initialize SPA router with page change handler
    initRouter((page) => {
      // Ignore if already transitioning
      if (isTransitioning) return
      isTransitioning = true

      const isInner = isInnerPage(page)
      const { title } = getPageData(page)

      // Crossfade transition
      crossfade(app, () => {
        // Update body class
        document.body.className = ''
        const bodyClass = getBodyClass(isInner)
        if (bodyClass) {
          document.body.classList.add(bodyClass)
        }

        // Update document title
        document.title = title

        // Destroy cursor before DOM change
        destroyCursor()

        // Re-render app content
        app.innerHTML = createApp({ page, isInner })

        // Reinitialize cursor after DOM update
        initCursor()
      }, 200).then(() => {
        isTransitioning = false
      })
    })

    // Initial cursor initialization
    initCursor()
  }
})
