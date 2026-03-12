import { getNavLinksFromConfig } from '../../config/pages.js'
import { Link } from '../../layout/Link/Link.js'

export function VerticalNav({ currentPage = 'home' } = {}) {
  const links = getNavLinksFromConfig(currentPage)

  return `
    <nav class="vertical-nav" aria-label="Page navigation">
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
