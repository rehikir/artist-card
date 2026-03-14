/**
 * Prices Content Component
 * Renders price columns from pages config
 */

import { Category } from '../../layout/Category/Category.js'
import { pagesConfig } from '../../config/pages.js'

function renderPriceColumn(column) {
  const entries = column.entries || []
  const entriesHtml = entries.map(entry => `
    <div class="price-entry">
      <span class="price-name">${entry.name}</span>
      <span class="price-value">${entry.price}</span>
      ${entry.description ? `<p class="price-description">${entry.description}</p>` : ''}
    </div>
  `).join('')

  return `
    <div class="price-column">
      <h3 class="price-column-title">${column.title}</h3>
      ${entriesHtml}
    </div>
  `
}

export function PricesContent() {
  const pageData = pagesConfig.prices.content
  const columns = pageData.columns || []
  const columnsHtml = columns.length > 0
    ? columns.map(renderPriceColumn).join('')
    : '<h3>PRICES PAGE IS UNDER COSTRUCTION.</h3>'

  return `
    ${Category({
      caption: 'Prices',
      children: `
        <div class="price-columns">
          ${columnsHtml}
        </div>
      `
    })}
  `
}
