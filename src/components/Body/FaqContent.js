/**
 * FAQ Content Component
 * Renders FAQ items from pages config
 */

import { Category } from '../../layout/Category/Category.js'
import { pagesConfig } from '../../config/pages.js'

function renderFaqItem(item) {
  return `
    <div class="faq-item">
      <h3 class="faq-question">${item.question}</h3>
      <p class="faq-answer">${item.answer}</p>
    </div>
  `
}

export function FaqContent() {
  const pageData = pagesConfig.faq.content
  const items = pageData.items || []
  const faqHtml = items.length > 0
    ? items.map(renderFaqItem).join('')
    : '<h3>FAQ PAGE IS UNDER COSTRUCTION.</h3>'

  return `
    ${Category({
      caption: 'FAQ',
      children: `
        <div class="faq-list">
          ${faqHtml}
        </div>
      `
    })}
  `
}
