// CSS class name utilities - DRY class generation
export const cardModifiers = {
  home: 'card--home',
  inner: 'card--inner-page'
}

// Generate card class name
export const getCardClass = (isInner) =>
  `card ${isInner ? cardModifiers.inner : cardModifiers.home}`

// Generate section class name (e.g., card-header, card-body, card-footer)
export const getSectionClass = (baseName, isInner) =>
  `${baseName} ${isInner ? `${baseName}--inner-page` : `${baseName}--home`}`

// Generate body class for inner pages
export const getBodyClass = (isInner) =>
  isInner ? 'body--inner-page' : ''
