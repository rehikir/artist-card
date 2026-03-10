import { getSectionClass } from '../../constants/classNames.js'
import { StatusSection } from './StatusSection.js'

export function Footer({
  maxSlots = 5,
  takenSlots = 0,
  inner = false
} = {}) {
  const className = getSectionClass('card-footer', inner)

  return `
    <div class="${className}">
      ${StatusSection({ maxSlots, takenSlots })}
    </div>
  `
}
