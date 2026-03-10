import { Category } from '../index.js'

function renderLink(link) {
  const { href, target, rel, iconSrc, iconAlt, text } = link
  const isDisabled = !href
  const tag = isDisabled ? 'span' : 'a'
  const attributes = isDisabled
    ? 'class="link link--disabled"'
    : `href="${href}" class="link" ${target ? `target="${target}"` : ''} ${rel ? `rel="${rel}"` : ''}`

  return `
    <${tag} ${attributes}>
      ${iconSrc ? `<span class="link-icon"><img src="${iconSrc}" alt="${iconAlt || 'icon'}" /></span>` : ''}
      <span class="link-text">${text}</span>
    </${tag}>
  `
}

export function LinkList({ category = 'My Works', links = [], inline = false } = {}) {
  if (!Array.isArray(links)) links = []

  return Category({
    caption: category,
    inline,
    children: links.map(renderLink).join('')
  })
}
