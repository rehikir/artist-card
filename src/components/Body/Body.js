import { getSectionClass } from '../../constants/classNames.js'

export function Body({ inner = false } = {}) {
  const className = getSectionClass('card-body', inner)
  return `<div class="${className}"></div>`
}
