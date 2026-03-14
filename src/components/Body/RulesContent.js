import { Category } from '../../layout/Category/Category.js'
import { pagesConfig } from '../../config/pages.js'

function renderRulesItems(items) {
  return items.map(item => `<span>( ${item} )</span>`).join('')
}

function renderPaymentTerms(terms) {
  return terms.map(term => `
    <div class="term-entry">
      <h3>${term.heading}</h3>
      ${term.note ? `<p class="term-note-text">${term.note}</p>` : ''}
    </div>
  `).join('')
}

function renderTrivia(items) {
  return items.map(item => `
    <div class="term-entry">
      <h3>${item.heading}</h3>
      ${item.note ? `<p class="term-note-text">${item.note}</p>` : ''}
    </div>
  `).join('')
}

export function RulesContent() {
  const pageData = pagesConfig.rules.content
  const { drawingPreferences, paymentTerms, trivia } = pageData
  const { do: doList, dont: dontList } = drawingPreferences

  return `
    ${Category({
      caption: 'Drawing Preferences',
      children: `
        <div class="rules-list">
          <h3 class="rules-subtitle">DO -</h3>
          <div class="rules-items">
            ${renderRulesItems(doList)}
          </div>
        </div>
        <div class="rules-list">
          <h3 class="rules-subtitle">DON'T -</h3>
          <div class="rules-items">
            ${renderRulesItems(dontList)}
          </div>
        </div>
      `
    })}

    ${Category({
      caption: 'Payment',
      children: `
        <div class="terms-list">
          ${renderPaymentTerms(paymentTerms)}
        </div>
      `
    })}

    ${Category({
      caption: 'Trivia',
      children: `
        <div class="terms-list">
          ${renderTrivia(trivia)}
        </div>
      `
    })}
  `
}
