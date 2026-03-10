import { CategoryCaption } from '../../layout/Category/CategoryCaption.js'
import { CategorySection } from '../../layout/Category/CategorySection.js'

export function PricesContent() {
  return `
    ${CategoryCaption({ label: 'Prices' })}
    ${CategorySection({
      children: `
        <!-- Add your pricing content here -->
      `
    })}
  `
}
