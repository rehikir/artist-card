export function Body({ inner = false } = {}) {
  const className = `card-body ${inner ? 'card-body--inner-page' : 'card-body--home'}`
  return `<div class="${className}"></div>`
}