export function CategoryCaption({ label = '' }) {
  return `
    <div class="category-caption">
      <img src="./src/images/dashes.svg"/>
      <span class="category-caption-label">${label}::</span>
    </div>
  `
}
