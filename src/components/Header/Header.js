import { getSectionClass } from '../../constants/classNames.js'
import { SocialLinks } from '../Links/SocialLinks.js'
import { NavLinks } from '../Links/NavLinks.js'

function renderBranding({ title, logoSrc, kirSrc }) {
  return `
    <a href="#/" class="logo-link">
      <div class="branding-wrapper">
        <div class="branding-name">
          <span>rehi</span>
          <img src="${kirSrc}" alt="kir" class="branding-logo" />
        </div>

        <div class="branding-page">
          <span class="branding-page-title">${title}</span>
          <img src="${logoSrc}" alt="fox logo" class="branding-logo" />
        </div>
      </div>
    </a>
  `
}

export function Header({
  title = '',
  logoSrc = '',
  kirSrc = '',
  inner = false,
  currentPage = 'home'
} = {}) {
  const className = getSectionClass('card-header', inner)

  return `
    <header class="${className}">
      ${renderBranding({ title, logoSrc, kirSrc })}
      <div class="category-wrapper">
        ${SocialLinks()}
        ${NavLinks({ currentPage })}
      </div>
    </header>
  `
}
