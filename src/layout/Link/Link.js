export function Link({ href = null, target = null, rel = null, iconSrc = null, iconAlt = null, text = '', variant = '' } = {}) {
  const isDisabled = !href
  const tag = isDisabled ? 'span' : 'a'
  const variantClass = variant ? `link--${variant}` : ''
  const classes = `link ${variantClass}${isDisabled ? ' link--disabled' : ''}`
  const attributes = isDisabled
    ? `class="${classes}"`
    : `href="${href}" class="${classes}" ${target ? `target="${target}"` : ''} ${rel ? `rel="${rel}"` : ''}`

  return `
    <${tag} ${attributes}>
      ${iconSrc ? `<span class="link-icon"><img src="${iconSrc}" alt="${iconAlt || 'icon'}" /></span>` : ''}
      <span class="link-text">${text}</span>
    </${tag}>
  `
}
