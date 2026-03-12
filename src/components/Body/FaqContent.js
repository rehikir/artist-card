import { Category } from '../../layout/Category/Category.js'

export function FaqContent() {
  return `
    ${Category({
      caption: 'FAQ',
      children: `
        <div class="faq-list">
          <!-- Add your FAQ items here -->
        </div>
      `
    })}
  `
}
