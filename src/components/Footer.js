import { StatusSection } from './index.js'

export function Footer(slotConfig, inner = false) {
  const className = `card-footer ${inner ? 'card-footer--inner-page' : 'card-footer--home'}`
  return `
    <div class="${className}">
      ${StatusSection(slotConfig)}
    </div>
  `
}