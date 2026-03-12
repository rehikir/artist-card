// Re-export from new router module
export {
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
} from '../router/index.js'
