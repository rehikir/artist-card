import { Category } from '../index.js'

export function RulesContent() {
  return `
    ${Category({
      caption: 'Rules & Terms',
      children: `
        <div class="rules-list">
          <!-- Add your rules here -->
        </div>
      `
    })}
  `
}
