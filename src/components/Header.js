import { SocialLinks, NavLinks } from './index.js'

function renderBranding({ title, logoSrc, kirSrc }) {
  return `
    <a href="index.html" class="logo-link">
      <div class="branding-wrapper">
        <!-- rehi + kir -->
        <div class="branding-name">
          <span>rehi</span>
          <img src="${kirSrc}" alt="kir" class="branding-logo" />
        </div>

        <!-- Page title + fox avatar -->
        <div class="branding-page">
          <span class="branding-page-title">${title}</span>
          <img src="${logoSrc}" alt="fox logo" class="branding-logo" />
        </div>
      </div>
    </a>
  `
}

export function Header({ title = '', logoSrc = '', kirSrc = '', inner = false } = {}) {
  const className = `card-header ${inner ? 'card-header--inner-page' : 'card-header--home'}`
  return `
    <div class="${className}">
      ${renderBranding({ title, logoSrc, kirSrc })}
      <div class="category-wrapper">
        ${SocialLinks()}
        ${NavLinks()}
      </div>
    </div>
  `
}
