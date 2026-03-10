// Central site configuration - single source of truth
export const siteConfig = {
  name: 'rehikir',
  tagline: 'Commissions',

  pages: {
    home: { path: 'index.html', titleSuffix: 'Commissions' },
    rules: { path: 'rules.html', titleSuffix: 'Rules & Terms' },
    prices: { path: 'prices.html', titleSuffix: 'Prices' },
    faq: { path: 'faq.html', titleSuffix: 'FAQ' }
  },

  images: {
    logo: '/images/logo.svg',
    kir: '/images/kir.svg',
    dashes: '/images/dashes.svg'
  }
}

// Derived helper - generates full page title for document.title
export const getPageTitle = (pageKey) => {
  const page = siteConfig.pages[pageKey] || siteConfig.pages.home
  return `${siteConfig.name} — ${page.titleSuffix}`
}

// Get only the page suffix for header display (e.g., "Commissions", not "rehikir — Commissions")
export const getPageSuffix = (pageKey) => {
  const page = siteConfig.pages[pageKey] || siteConfig.pages.home
  return page.titleSuffix
}
