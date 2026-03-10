import { CategoryWrapper } from './CategoryWrapper.js'
import { CategoryCaption } from './CategoryCaption.js'
import { CategorySection } from './CategorySection.js'

export function Category({ caption = null, children = '', inline = false } = {}) {
  return CategoryWrapper({
    children: `
      ${caption ? CategoryCaption({ label: caption }) : ''}
      ${CategorySection({ children, inline })}
    `
  })
}
