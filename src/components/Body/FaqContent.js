import { CategoryCaption } from '../../layout/Category/CategoryCaption.js'
import { CategorySection } from '../../layout/Category/CategorySection.js'

export function FaqContent() {
  return `
    ${CategoryCaption({ label: 'FAQ' })}
    ${CategorySection({
      children: `
        <div class="faq-list">
          <!-- Add your FAQ items here -->
        </div>
      `
    })}
  `
}
