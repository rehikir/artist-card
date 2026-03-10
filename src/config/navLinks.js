// Navigation links configuration
export const navLinks = [
  { text: 'FAQ', href: null, disabled: true },
  { text: 'Rules & Terms', href: 'rules.html', disabled: false },
  { text: 'Prices', href: 'prices.html', disabled: false },
  { text: 'Contact me', href: null, disabled: true }
]

// Helper to get nav links with current page state
export function getNavLinks(currentPage = 'home') {
  return navLinks.map(link => ({
    ...link,
    disabled: link.href === null || 
              (link.href === 'prices.html' && currentPage === 'prices') ||
              (link.href === 'rules.html' && currentPage === 'rules')
  }))
}
