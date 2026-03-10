// Combined navigation configuration
import { siteConfig } from './site.js'

// Social media links
export const socialLinks = [
  {
    href: 'https://x.com/rehikir',
    text: 'x.com/rehikir',
    iconSrc: '/images/x_logo.svg',
    iconAlt: 'X logo',
    target: '_blank',
    rel: 'noopener'
  },
  {
    href: 'https://boosty.to/rehikir',
    text: 'boosty.to/rehikir',
    iconSrc: '/images/boosty_logo.svg',
    iconAlt: 'Boosty logo',
    target: '_blank',
    rel: 'noopener'
  },
  {
    href: '#',
    text: 'snootbooru.com/...',
    iconSrc: '/images/snootbooru_logo.svg',
    iconAlt: 'Snootbooru logo',
    target: '_blank',
    rel: 'noopener'
  }
]

// Navigation links
export const navLinks = [
  { text: 'FAQ', href: null, disabled: true },
  {
    text: 'Rules & Terms',
    href: siteConfig.pages.rules.path,
    disabled: false
  },
  {
    text: 'Prices',
    href: siteConfig.pages.prices.path,
    disabled: false
  },
  { text: 'Contact me', href: null, disabled: true }
]

// Helper to get nav links with current page state
export const getNavLinks = (currentPage = 'home') => {
  return navLinks.map(link => ({
    ...link,
    disabled: link.href === null ||
              (link.href === siteConfig.pages.prices.path && currentPage === 'prices') ||
              (link.href === siteConfig.pages.rules.path && currentPage === 'rules')
  }))
}
