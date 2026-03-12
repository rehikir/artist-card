import { LinkList } from './LinkList.js'
import { getNavLinks } from '../../config/index.js'

export function NavLinks({ currentPage = 'home' } = {}) {
  return LinkList({
    category: 'More Info',
    links: getNavLinks(currentPage),
    inline: true
  })
}
