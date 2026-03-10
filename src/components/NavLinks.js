import { LinkList } from './index.js'
import { getNavLinks } from '../config/navLinks.js'

export function NavLinks({ currentPage = 'home' } = {}) {
  return LinkList({ category: 'More Info', links: getNavLinks(currentPage), inline: true })
}
