/**
 * Render Utilities
 * Safe HTML rendering with XSS protection and DOM helpers
 */

// ===================================
// XSS PROTECTION
// ===================================

/**
 * Escape HTML special characters to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return str
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return str.replace(/[&<>"']/g, (char) => map[char])
}

/**
 * Sanitize HTML string (basic - allows safe tags)
 * For full sanitization, consider DOMPurify library
 * @param {string} html - HTML string
 * @returns {string} Sanitized HTML
 */
export function sanitizeHtml(html) {
  if (typeof html !== 'string') return ''
  // Remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')
}

// ===================================
// DOM HELPERS
// ===================================

/**
 * Safely set inner HTML with optional sanitization
 * @param {Element} element - Target element
 * @param {string} html - HTML string
 * @param {boolean} sanitize - Whether to sanitize (default: true)
 */
export function setInnerHtml(element, html, sanitize = true) {
  if (!element) {
    console.warn('setInnerHtml: element is null or undefined')
    return
  }
  element.innerHTML = sanitize ? sanitizeHtml(html) : html
}

/**
 * Create element from HTML string
 * @param {string} html - HTML string
 * @returns {Element} Created element
 */
export function createElementFromHtml(html) {
  const template = document.createElement('template')
  template.innerHTML = sanitizeHtml(html).trim()
  return template.content.firstElementChild
}

/**
 * Find element within a container
 * @param {Element} container - Container element
 * @param {string} selector - CSS selector
 * @returns {Element|null} Found element or null
 */
export function findElement(container, selector) {
  if (!container) return null
  return container.querySelector(selector)
}

/**
 * Find all elements within a container
 * @param {Element} container - Container element
 * @param {string} selector - CSS selector
 * @returns {NodeList} Found elements
 */
export function findElements(container, selector) {
  if (!container) return document.createElement('div').childNodes
  return container.querySelectorAll(selector)
}

// ===================================
// ATTRIBUTE HELPERS
// ===================================

/**
 * Build HTML attributes string from object
 * @param {Object} attrs - Attributes object
 * @returns {string} Attributes string
 */
export function buildAttributes(attrs) {
  if (!attrs || typeof attrs !== 'object') return ''

  return Object.entries(attrs)
    .filter(([_, value]) => value !== null && value !== undefined && value !== false)
    .map(([key, value]) => {
      // Handle boolean attributes (e.g., disabled, checked)
      if (value === true) return key
      // Handle data attributes
      if (key.startsWith('data')) {
        const dataKey = key.replace('data', 'data-').toLowerCase()
        return `${dataKey}="${escapeHtml(String(value))}"`
      }
      // Handle aria attributes
      if (key.startsWith('aria')) {
        const ariaKey = key.replace('aria', 'aria-').toLowerCase()
        return `${ariaKey}="${escapeHtml(String(value))}"`
      }
      // Standard attributes
      return `${key}="${escapeHtml(String(value))}"`
    })
    .join(' ')
}

// ===================================
// CLASS NAME HELPERS
// ===================================

/**
 * Build class name string from object or array
 * @param {Object|Array} classes - Classes object or array
 * @returns {string} Class name string
 */
export function classNames(classes) {
  if (!classes) return ''

  if (Array.isArray(classes)) {
    return classes.filter(Boolean).join(' ')
  }

  if (typeof classes === 'object') {
    return Object.entries(classes)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(' ')
  }

  return String(classes)
}

/**
 * Merge class names
 * @param  {...(string|Object|Array)} args - Class name sources
 * @returns {string} Merged class names
 */
export function mergeClassNames(...args) {
  return args
    .map((arg) => {
      if (typeof arg === 'string') return arg
      if (Array.isArray(arg)) return arg.join(' ')
      if (typeof arg === 'object' && arg !== null) {
        return Object.entries(arg)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(' ')
      }
      return ''
    })
    .filter(Boolean)
    .join(' ')
}

// ===================================
// EVENT HELPERS
// ===================================

/**
 * Add event listener with automatic cleanup
 * @param {Element} element - Target element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {Object} options - Event options
 * @returns {Function} Cleanup function
 */
export function addEvent(element, event, handler, options = {}) {
  if (!element) {
    console.warn('addEvent: element is null or undefined')
    return () => {}
  }

  element.addEventListener(event, handler, options)

  // Return cleanup function
  return () => {
    element.removeEventListener(event, handler, options)
  }
}

/**
 * Add multiple event listeners
 * @param {Element} element - Target element
 * @param {Array} events - Array of { event, handler, options }
 * @returns {Function} Cleanup function for all listeners
 */
export function addEvents(element, events) {
  if (!Array.isArray(events)) return () => {}

  const cleanups = events.map(({ event, handler, options = {} }) =>
    addEvent(element, event, handler, options)
  )

  return () => {
    cleanups.forEach((cleanup) => cleanup())
  }
}

// ===================================
// TEMPLATE HELPERS
// ===================================

/**
 * Create HTML string with tag and attributes
 * @param {string} tag - HTML tag name
 * @param {Object} attrs - Attributes object
 * @param {string} content - Inner HTML content
 * @returns {string} HTML string
 */
export function h(tag, attrs = {}, content = '') {
  const attrsString = buildAttributes(attrs)
  const selfClosing = ['img', 'br', 'hr', 'input', 'meta', 'link']
  const closing = selfClosing.includes(tag) ? '' : `</${tag}>`
  const inner = selfClosing.includes(tag) ? '' : (content || '')

  return `<${tag}${attrsString ? ` ${attrsString}` : ''}>${inner}${closing}`
}

/**
 * Render component to DOM element
 * @param {Function} component - Component function returning HTML string
 * @param {Element} container - Target container
 * @param {Object} props - Component props
 * @param {boolean} sanitize - Sanitize HTML (default: true)
 */
export function render(component, container, props = {}, sanitize = true) {
  if (!container) {
    console.error('render: container element is required')
    return
  }

  if (typeof component !== 'function') {
    console.error('render: component must be a function')
    return
  }

  const html = component(props)
  setInnerHtml(container, html, sanitize)
}

export default {
  escapeHtml,
  sanitizeHtml,
  setInnerHtml,
  createElementFromHtml,
  findElement,
  findElements,
  buildAttributes,
  classNames,
  mergeClassNames,
  addEvent,
  addEvents,
  h,
  render
}
