import './styles/main.scss'
import { createApp, initApp } from './components/App.js'
import { pages } from './config/pages.js'

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  if (app) {
    // Determine current page by pathname
    let page = 'home'
    if (window.location.pathname.includes('rules')) page = 'rules'
    if (window.location.pathname.includes('prices')) page = 'prices'

    const isInner = page !== 'home'
    document.body.classList.toggle('body--inner-page', isInner)

    // Set document title from config
    document.title = pages[page]?.title || pages.home.title

    app.innerHTML = createApp({ page, isInner })
    // Initialize app
    initApp()
  }
})
