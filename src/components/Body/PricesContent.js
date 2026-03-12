import { Category } from '../../layout/Category/Category.js'

export function PricesContent() {
  return `
    ${Category({
      caption: 'Prices',
      children: `
        <div class="price-columns">
          <!-- Add your price columns here -->
        </div>
      `
    })}
  `
}
