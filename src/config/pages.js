/**
 * Pages Configuration - Single Source of Truth
 * All page definitions and components
 */

// Page components (eager imports for simplicity)
import { HomeContent } from '../components/Body/HomeContent.js'
import { RulesContent } from '../components/Body/RulesContent.js'
import { PricesContent } from '../components/Body/PricesContent.js'
import { FaqContent } from '../components/Body/FaqContent.js'
import { NotFoundContent } from '../components/Body/NotFoundContent.js'

export const pagesConfig = {
  home: {
    path: 'index.html',
    titleSuffix: 'Commissions',
    component: HomeContent  // Empty for now, but slot exists
  },
  faq: {
    path: 'faq.html',
    titleSuffix: 'FAQ',
    component: FaqContent
  },
  rules: {
    path: 'rules.html',
    titleSuffix: 'Rules & Terms',
    component: RulesContent
  },
  prices: {
    path: 'prices.html',
    titleSuffix: 'Prices',
    component: PricesContent
  },
  notFound: {
    path: '404.html',
    titleSuffix: 'Page Not Found',
    component: NotFoundContent
  }
}

/**
 * Get navigation links derived from pages config (for future use)
 * Example: footer with expanded navigation
 * @param {string} currentPage - Current page key
 * @returns {Array} Navigation links array
 */
export const getNavLinksFromConfig = (currentPage) => {
  // Define which pages should appear in nav (manually curated)
  const navPages = ['faq', 'rules', 'prices']

  return navPages
    .filter((key) => pagesConfig[key])
    .map((key) => ({
      text: pagesConfig[key].titleSuffix,
      route: key,
      href: `#/${pagesConfig[key].path}`,
      disabled: currentPage === key
    }))
}
