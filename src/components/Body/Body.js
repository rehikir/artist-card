import { getSectionClass } from '../../constants/classNames.js'
import { FaqContent } from './FaqContent.js'
import { RulesContent } from './RulesContent.js'
import { PricesContent } from './PricesContent.js'

const pageContent = {
  faq: FaqContent,
  rules: RulesContent,
  prices: PricesContent
}

export function Body({ inner = false, page = 'home' } = {}) {
  const className = getSectionClass('card-body', inner)
  const ContentComponent = pageContent[page]
  const content = ContentComponent ? ContentComponent() : ''

  return `<div class="${className}">${content}</div>`
}
