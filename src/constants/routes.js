// Route detection logic - single source of truth for routing
export const ROUTES = {
  HOME: 'home',
  RULES: 'rules',
  PRICES: 'prices'
}

export const ROUTE_PATTERNS = {
  [ROUTES.RULES]: 'rules',
  [ROUTES.PRICES]: 'prices'
}

// Get current route from pathname
export const getCurrentRoute = (pathname = window.location.pathname) => {
  for (const [route, pattern] of Object.entries(ROUTE_PATTERNS)) {
    if (pathname.includes(pattern)) return route
  }
  return ROUTES.HOME
}

// Check if route is an inner page (not home)
export const isInnerPage = (route) => route !== ROUTES.HOME
