// Route detection logic - single source of truth for routing
export const ROUTES = {
  HOME: 'home',
  RULES: 'rules',
  PRICES: 'prices',
  FAQ: 'faq'
}

export const ROUTE_PATTERNS = {
  [ROUTES.RULES]: 'rules',
  [ROUTES.PRICES]: 'prices',
  [ROUTES.FAQ]: 'faq'
}

// Get current route from pathname (legacy, for reference)
export const getCurrentRouteFromPath = (pathname = window.location.pathname) => {
  for (const [route, pattern] of Object.entries(ROUTE_PATTERNS)) {
    if (pathname.includes(pattern)) return route
  }
  return ROUTES.HOME
}

// Check if route is an inner page (not home)
export const isInnerPage = (route) => route !== ROUTES.HOME
