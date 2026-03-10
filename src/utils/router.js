// SPA Router for GitHub Pages
// Uses hash-based routing for compatibility with static hosting

import { ROUTES, ROUTE_PATTERNS } from '../constants/routes.js'
import { getPageTitle, getPageSuffix } from '../config/site.js'

// Get current route from hash
export const getCurrentRoute = () => {
  const hash = window.location.hash.replace('#/', '')
  
  for (const [route, pattern] of Object.entries(ROUTE_PATTERNS)) {
    if (hash === pattern || hash === `${pattern}.html`) return route
  }
  
  // Handle empty hash or home page
  if (hash === '' || hash === 'index.html') return ROUTES.HOME
  
  return ROUTES.HOME
}

// Navigate to a new route (updates hash)
export const navigate = (route) => {
  const page = ROUTE_PATTERNS[route] || 'index.html'
  window.location.hash = `/${page}`
}

// Check if route is an inner page
export const isInnerPage = (route) => route !== ROUTES.HOME

// Initialize router with popstate listener for back/forward buttons
export const initRouter = (onRouteChange) => {
  // Handle hash changes (including back/forward)
  window.addEventListener('hashchange', () => {
    const route = getCurrentRoute()
    onRouteChange(route)
  })

  // Handle initial load
  const route = getCurrentRoute()
  onRouteChange(route)
}

// Get page data for current route
export const getPageData = (route) => ({
  title: getPageTitle(route),
  pageSuffix: getPageSuffix(route),
  isInner: isInnerPage(route)
})
