import { CategoryWrapper, CategoryCaption, CategorySection } from '../../layout/Category/Category.js'
import { Link } from '../../layout/Link/Link.js'

export function renderLink(link) {
  return Link(link)
}

export function LinkList({ category = 'My Works', links = [], inline = false } = {}) {
  if (!Array.isArray(links)) links = []

  return CategoryWrapper({
    children: `
      ${category ? CategoryCaption({ label: category }) : ''}
      ${CategorySection({ 
        children: links.map(renderLink).join(''),
        inline 
      })}
    `
  })
}
