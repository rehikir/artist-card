import { getSectionClass } from '../../constants/classNames.js'
import { StatusSection } from './StatusSection.js'
import { ContactSection } from './ContactSection.js'

export function Footer({ inner = false } = {}) {
  const className = getSectionClass('card-footer', inner)

  return `
    <footer class="${className}">
      ${ContactSection()}
      ${StatusSection()}
    </footer>
  `
}
