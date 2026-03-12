import { getSectionClass } from '../../constants/classNames.js'
import { pagesConfig } from '../../config/pages.js'

// Build page content map from config (only pages with components)
const pageContent = Object.fromEntries(
  Object.entries(pagesConfig)
    .filter(([key, config]) => config.component !== null)
    .map(([key, config]) => [key, config.component])
)

export function Body({ inner = false, page = 'home' } = {}) {
  const className = getSectionClass('card-body', inner)
  const ContentComponent = pageContent[page]
  const content = ContentComponent ? ContentComponent() : ''

  return `<div class="${className}">${content}</div>`
}
