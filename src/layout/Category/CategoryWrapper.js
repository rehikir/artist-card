export function CategoryWrapper({ children = '' } = {}) {
  return `
    <div class="category-wrapper">
      ${children}
    </div>
  `
}
