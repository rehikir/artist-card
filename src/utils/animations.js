/**
 * Page Transition Utilities
 * Simple fade transitions for page changes
 */

// Check for reduced motion preference
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Check if desktop (matches cursor criteria)
export const isDesktop = () => {
  return window.matchMedia('(min-width: 768px)').matches &&
         window.matchMedia('(pointer: fine)').matches
}

/**
 * Fade out an element
 * @param {Element} element - Element to fade out
 * @param {number} duration - Duration in ms
 * @returns {Promise} Resolves when fade completes
 */
export function fadeOut(element, duration = 200) {
  return new Promise((resolve) => {
    element.style.transition = `opacity ${duration}ms ease-in-out`
    element.style.opacity = '0'
    setTimeout(resolve, duration)
  })
}

/**
 * Fade in an element
 * @param {Element} element - Element to fade in
 * @param {number} duration - Duration in ms
 * @returns {Promise} Resolves when fade completes
 */
export function fadeIn(element, duration = 200) {
  return new Promise((resolve) => {
    element.style.transition = `opacity ${duration}ms ease-in-out`
    requestAnimationFrame(() => {
      element.style.opacity = '1'
      setTimeout(resolve, duration)
    })
  })
}

/**
 * Crossfade: fade out old content, swap, fade in new content
 * @param {Element} container - Container element
 * @param {Function} onChange - Function to swap content
 * @param {number} duration - Duration in ms
 * @returns {Promise} Resolves when transition completes
 */
export async function crossfade(container, onChange, duration = 200) {
  // Skip if reduced motion
  if (prefersReducedMotion()) {
    onChange()
    return Promise.resolve()
  }

  // Fade out
  await fadeOut(container, duration)
  
  // Swap content
  onChange()
  
  // Fade in
  await fadeIn(container, duration)
}

export default {
  prefersReducedMotion,
  isDesktop,
  fadeOut,
  fadeIn,
  crossfade
}
