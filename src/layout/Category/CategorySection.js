export function CategorySection({ children = '', inline = false } = {}) {
  const className = `category-section${inline ? ' category-section--inline' : ''}`
  return `
    <div class="${className}">
      ${children}
    </div>
  `
}
