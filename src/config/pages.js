/**
 * Pages Configuration - Single Source of Truth
 * All page definitions, components, and content data
 * 
 * To add/edit a page: modify this file only
 */

// Page components (eager imports for simplicity)
import { HomeContent } from '../components/Body/HomeContent.js'
import { RulesContent } from '../components/Body/RulesContent.js'
import { PricesContent } from '../components/Body/PricesContent.js'
import { FaqContent } from '../components/Body/FaqContent.js'
import { TestPageContent } from '../components/Body/TestPageContent.js'

export const pagesConfig = {
  home: {
    path: 'index.html',
    titleSuffix: 'Commissions',
    component: HomeContent
  },
  faq: {
    path: 'faq.html',
    titleSuffix: 'FAQ',
    component: FaqContent,
    content: {
      items: [
        // Add FAQ items here:
        // { question: 'Your question?', answer: 'Your answer.' }
      ]
    }
  },
  rules: {
    path: 'rules.html',
    titleSuffix: 'Rules & Terms',
    component: RulesContent,
    content: {
      drawingPreferences: {
        do: [
          'Scalie / Furry',
          'Nudity',
          'Soft Fetish',
          'OC Design',
          'Experimental or Abstract Piece',
          'Fanart',
        ],
        dont: [
          'Illegal Stuff',
          'Complex Shapes',
          'Feral',
          'Strong Fetish',
          'Complex Background'
        ]
      },
      paymentTerms: [
        { heading: '100% payment ONLY after approved sketch' },
        { heading: 'Payment via Boosty, crypto (TON, USDT TRC-20) or RUB' },
        { heading: 'Prices aren\'t final and Total cost is negotiable' },
        { heading: 'Supporters get 20% discount', note: '($20+ donation; active subscriber; mentor help)' },
        { heading: 'No refunds & no redraws' },
        { heading: 'Minor changes are free', note: '(i.e. wrong small detail on character; slight pose change; etc.)' }
      ],
      trivia: [
        { heading: 'Waiting time 7 days minimum and up to 2 months' },
        { heading: 'Complex scenes may lose quality or take longer time', note: '(action-packed scenes; weird perspective; complicated design; etc.)' },
        { heading: 'Artistic freedom is appreciated, but not mandatory' }
      ]
    }
  },
  prices: {
    path: 'prices.html',
    titleSuffix: 'Prices',
    component: PricesContent,
    content: {
      columns: [
        // Add price columns here:
        // { title: 'Sketches', entries: [{ name: 'Headshot', price: '$20' }] }
      ]
    }
  },
  testpage: {
    path: 'testpage.html',
    titleSuffix: 'Test Page',
    component: TestPageContent,
    content: {
      
    }
  },
  testpage123: {
    path: 'testpage123.html',
    titleSuffix: 'Page with an Extremely Long Title to Test Layout',
    component: TestPageContent,
    content: {
      
    }
  }
}

/**
 * Get navigation links derived from pages config
 * Auto-generates links for all pages except excluded ones
 * @param {string} currentPage - Current page key
 * @returns {Array} Navigation links array
 */
export const getNavLinksFromConfig = (currentPage) => {
  // Pages to exclude from auto-generated navigation
  const excludePages = []

  return Object.keys(pagesConfig)
    .filter((key) => !excludePages.includes(key))
    .map((key) => ({
      text: pagesConfig[key].titleSuffix,
      route: key,
      href: `#/${pagesConfig[key].path}`,
      disabled: currentPage === key
    }))
}
