/**
 * Enhanced SPA Router with Middleware Support
 * Hash-based routing for GitHub Pages compatibility
 * with guards, transitions, and proper 404 handling
 */

import { siteConfig, getPageTitle } from '../config/index.js'

// ===================================
// ROUTE CONSTANTS
// ===================================

export const ROUTES = {
  HOME: 'home',
  RULES: 'rules',
  PRICES: 'prices',
  FAQ: 'faq',
  NOT_FOUND: 'notFound'
}

export const ROUTE_PATTERNS = {
  [ROUTES.RULES]: 'rules',
  [ROUTES.PRICES]: 'prices',
  [ROUTES.FAQ]: 'faq'
}

// Reverse mapping: pattern -> route
const PATTERN_TO_ROUTE = Object.entries(ROUTE_PATTERNS).reduce(
  (acc, [route, pattern]) => {
    acc[pattern] = route
    acc[`${pattern}.html`] = route
    return acc
  },
  {}
)

// ===================================
// ROUTER STATE
// ===================================

let currentRoute = ROUTES.HOME
const routeGuards = []
const routeTransitions = []
let onRouteChangeCallback = null
let isNavigating = false

// ===================================
// HELPER FUNCTIONS
// ===================================

/**
 * Get current route from hash
 * @returns {string} Current route key
 */
export const getCurrentRoute = () => {
  const hash = window.location.hash.replace('#/', '').replace('#', '')

  // Handle empty hash or home
  if (hash === '' || hash === 'index.html') {
    return ROUTES.HOME
  }

  // Check against known patterns
  for (const [pattern, route] of Object.entries(PATTERN_TO_ROUTE)) {
    if (hash === pattern) {
      return route
    }
  }

  // Unknown route = 404
  return ROUTES.NOT_FOUND
}

/**
 * Check if route is an inner page (not home)
 * @param {string} route - Route key
 * @returns {boolean} True if inner page
 */
export const isInnerPage = (route) => route !== ROUTES.HOME

/**
 * Get page path from route key
 * @param {string} route - Route key
 * @returns {string} Page path
 */
export const getPagePath = (route) => {
  if (route === ROUTES.HOME) return 'index.html'
  if (route === ROUTES.NOT_FOUND) return 'index.html'
  return siteConfig.pages[route]?.path || 'index.html'
}

/**
 * Navigate to a route
 * @param {string} route - Route key
 * @param {Object} options - Navigation options
 * @param {boolean} options.replace - Replace history instead of push
 */
export const navigate = (route, { replace = false } = {}) => {
  const path = getPagePath(route)
  const newHash = `#/${path}`

  if (replace) {
    window.location.replace(newHash)
  } else {
    window.location.hash = newHash
  }
}

/**
 * Get page data for rendering
 * @param {string} route - Route key
 * @returns {Object} Page data
 */
export const getPageData = (route) => {
  const isInner = isInnerPage(route)
  const pageConfig = siteConfig.pages[route] || siteConfig.pages.home

  return {
    route,
    title: getPageTitle(route),
    pageSuffix: pageConfig.titleSuffix,
    isInner,
    path: pageConfig.path
  }
}

// ===================================
// MIDDLEWARE SYSTEM
// ===================================

/**
 * Add a route guard (runs before navigation)
 * @param {Function} guard - Guard function (to, from, next)
 */
export const addGuard = (guard) => {
  routeGuards.push(guard)
}

/**
 * Add a route transition handler (runs during navigation)
 * @param {Function} transition - Transition function (to, from)
 */
export const addTransition = (transition) => {
  routeTransitions.push(transition)
}

/**
 * Execute guards sequentially
 * @param {string} to - Target route
 * @param {string} from - Source route
 * @returns {Promise<boolean>} True if navigation should proceed
 */
const executeGuards = async (to, from) => {
  for (const guard of routeGuards) {
    let shouldProceed = true
    await guard(to, from, (proceed = true) => {
      shouldProceed = proceed
    })
    if (!shouldProceed) return false
  }
  return true
}

/**
 * Execute transitions
 * @param {string} to - Target route
 * @param {string} from - Source route
 */
const executeTransitions = async (to, from) => {
  for (const transition of routeTransitions) {
    await transition(to, from)
  }
}

// ===================================
// ROUTER INITIALIZATION
// ===================================

/**
 * Initialize router with change handler
 * @param {Function} callback - Route change callback
 */
export const initRouter = (callback) => {
  onRouteChangeCallback = callback

  // Handle hash changes (including back/forward buttons)
  window.addEventListener('hashchange', async () => {
    if (isNavigating) return

    const from = currentRoute
    const to = getCurrentRoute()

    // Skip if route hasn't changed
    if (from === to) return

    // Execute guards
    const allowed = await executeGuards(to, from)
    if (!allowed) {
      // Revert hash if guard failed
      window.location.hash = `#/${getPagePath(from)}`
      return
    }

    // Update state
    currentRoute = to
    isNavigating = true

    // Execute transitions
    await executeTransitions(to, from)

    // Notify callback
    if (onRouteChangeCallback) {
      onRouteChangeCallback(to)
    }

    isNavigating = false
  })

  // Handle initial load
  currentRoute = getCurrentRoute()
  if (onRouteChangeCallback) {
    onRouteChangeCallback(currentRoute)
  }
}

/**
 * Get current route
 * @returns {string} Current route key
 */
export const getCurrentRouteKey = () => currentRoute

/**
 * Check if currently navigating
 * @returns {boolean} Navigation in progress
 */
export const getIsNavigating = () => isNavigating

// ===================================
// DEFAULT GUARDS
// ===================================

// Example guard: Log route changes
addGuard((to, from, next) => {
  console.log(`[Router] Navigating from "${from}" to "${to}"`)
  next()
})

export default {
  ROUTES,
  ROUTE_PATTERNS,
  getCurrentRoute,
  getCurrentRouteKey,
  isInnerPage,
  getPagePath,
  getPageData,
  navigate,
  initRouter,
  addGuard,
  addTransition,
  getIsNavigating
}
