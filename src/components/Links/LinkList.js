import { Category } from '../index.js'
import { Link } from '../../layout/Link/Link.js'

export function renderLink(link) {
  return Link(link)
}

export function LinkList({ category = 'My Works', links = [], inline = false } = {}) {
  if (!Array.isArray(links)) links = []

  return Category({
    caption: category,
    inline,
    children: links.map(renderLink).join('')
  })
}
