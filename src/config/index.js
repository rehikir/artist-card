/**
 * Centralized Configuration Module
 * Single source of truth for all application configuration
 * with runtime validation for type safety
 */

import { defineConfig, shape, nonEmptyString, url, arrayOf, withDefault, typeOf } from '../utils/validate.js'
import { pagesConfig } from './pages.js'

// ===================================
// SITE CONFIGURATION
// ===================================

const siteSchema = shape({
  name: nonEmptyString(),
  tagline: nonEmptyString(),
  images: shape({
    logo: nonEmptyString(),
    kir: nonEmptyString(),
    dashes: nonEmptyString()
  })
})

export const siteConfig = defineConfig({
  name: 'rehikir',
  tagline: 'Commissions',

  images: {
    logo: './images/logo.svg',
    kir: './images/kir.svg',
    dashes: './images/dashes.svg'
  }
}, siteSchema, 'site')

// ===================================
// SOCIAL LINKS CONFIGURATION
// ===================================

const socialLinkSchema = shape({
  href: url(),
  text: nonEmptyString(),
  iconSrc: nonEmptyString(),
  iconAlt: nonEmptyString(),
  target: withDefault(typeOf('string'), '_blank'),
  rel: withDefault(typeOf('string'), 'noopener')
})

export const socialLinks = defineConfig([
  {
    href: 'https://x.com/rehikir',
    text: 'x.com/rehikir',
    iconSrc: './images/x_logo.svg',
    iconAlt: 'X logo',
    target: '_blank',
    rel: 'noopener'
  },
  {
    href: 'https://boosty.to/rehikir',
    text: 'boosty.to/rehikir',
    iconSrc: './images/boosty_logo.svg',
    iconAlt: 'Boosty logo',
    target: '_blank',
    rel: 'noopener'
  },
  {
    href: 'https://snootbooru.com/posts/query=rehikir',
    text: 'snootbooru.com/...',
    iconSrc: './images/snootbooru_logo.svg',
    iconAlt: 'Snootbooru logo',
    target: '_blank',
    rel: 'noopener'
  }
], arrayOf(socialLinkSchema), 'socialLinks')

// ===================================
// NAVIGATION LINKS CONFIGURATION (Header)
// ===================================

const navLinkSchema = shape({
  text: nonEmptyString(),
  href: withDefault(typeOf('string'), null),
  disabled: withDefault(typeOf('boolean'), false),
  route: withDefault(typeOf('string'), null),
  variant: withDefault(typeOf('string'), 'default')
})

// Manually curated header nav links (your control)
export const navLinks = defineConfig([
  { text: 'FAQ', route: 'faq', disabled: false },
  { text: 'Rules & Terms', route: 'rules', disabled: false },
  { text: 'Prices', route: 'prices', disabled: false },
  { text: 'Contacts', disabled: true, variant: 'cta' },
], arrayOf(navLinkSchema), 'navLinks')

// ===================================
// SLOT CONFIGURATION (Commission Slots)
// ===================================

const slotSchema = shape({
  maxSlots: typeOf('number'),
  takenSlots: typeOf('number')
})

export const slotConfig = defineConfig({
  maxSlots: 5,
  takenSlots: 5
}, slotSchema, 'slots')

// ===================================
// HELPER FUNCTIONS
// ===================================

/**
 * Get page title suffix by route key
 * @param {string} pageKey - Route key (home, rules, prices, faq)
 * @returns {string} Page title suffix
 */
export const getPageSuffix = (pageKey) => {
  const page = pagesConfig[pageKey] || pagesConfig.home
  return page.titleSuffix
}

/**
 * Get full page title
 * @param {string} pageKey - Route key
 * @returns {string} Full page title
 */
export const getPageTitle = (pageKey) => {
  return `${siteConfig.name} — ${getPageSuffix(pageKey)}`
}

/**
 * Get navigation links with current page state (header nav)
 * @param {string} currentPage - Current page key
 * @returns {Array} Updated navigation links
 */
export const getNavLinks = (currentPage = 'home') => {
  return navLinks.map((link) => {
    if (link.route) {
      return {
        ...link,
        href: `#/${pagesConfig[link.route].path}`,
        disabled: currentPage === link.route
      }
    }
    return { ...link }
  })
}

// ===================================
// DEFAULT EXPORT
// ===================================

export default {
  site: siteConfig,
  socialLinks,
  navLinks: getNavLinks(),
  slots: slotConfig,
  pages: pagesConfig,
  getPageSuffix,
  getPageTitle,
  getNavLinks
}
