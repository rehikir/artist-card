import { CategoryCaption } from '../../layout/Category/CategoryCaption.js'
import { CategorySection } from '../../layout/Category/CategorySection.js'

export function RulesContent() {
  return `
    ${CategoryCaption({ label: 'Rules & Terms' })}
    ${CategorySection({
      children: `
        <!-- Add your rules content here -->
      `
    })}
  `
}
