import { getNavLinksFromConfig } from '../../config/pages.js'
import { Link } from '../../layout/Link/Link.js'

export function SideNav({ currentPage = 'home' } = {}) {
  const links = getNavLinksFromConfig(currentPage)

  return `
    <nav class="side-nav" aria-label="Page navigation">
      ${links.map(link => {
        const isActive = link.route === currentPage

        return Link({
          href: link.href,
          text: link.text,
          variant: 'alt',
          modifier: 'inverse',
          class: isActive ? 'is-active' : '',
          disabled: link.disabled
        })
      }).join('')}
    </nav>
  `
}
