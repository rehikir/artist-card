// Combined navigation configuration
import { siteConfig } from './site.js'

// Social media links
export const socialLinks = [
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
]

// Navigation links
export const navLinks = [
  { text: 'FAQ', href: null, disabled: false, route: 'faq' },
  {
    text: 'Rules & Terms',
    href: null,
    disabled: false,
    route: 'rules'
  },
  {
    text: 'Prices',
    href: null,
    disabled: false,
    route: 'prices'
  },
  { text: 'Contact me', href: null, disabled: true },
]

// Helper to get nav links with current page state
export const getNavLinks = (currentPage = 'home') => {
  return navLinks.map(link => {
    if (link.route) {
      // SPA navigation - use hash routing
      return {
        ...link,
        href: `#/${siteConfig.pages[link.route].path}`,
        disabled: currentPage === link.route
      }
    }
    return {
      ...link,
      disabled: link.disabled
    }
  })
}
