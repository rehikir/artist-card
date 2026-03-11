const SELECTORS = {
  interactive: 'a, button, .link, [role="button"]'
}

const CONTEXTS = {
  IDLE: 'idle',
  INTERACTIVE: 'interactive'
}

let currentContext = CONTEXTS.IDLE

function getContextType(element) {
  if (!element) return CONTEXTS.IDLE
  if (element.matches(SELECTORS.interactive)) return CONTEXTS.INTERACTIVE
  return CONTEXTS.IDLE
}

function findTarget(element) {
  if (!element) return null
  if (element.matches(SELECTORS.interactive)) return element
  return null
}

function setContext(context) {
  currentContext = context
}

function getContext() {
  return currentContext
}

function onHover(e) {
  const target = findTarget(e.target)
  const context = getContextType(target)
  setContext(context)
  return { target, context }
}

function onLeave() {
  setContext(CONTEXTS.IDLE)
  return { target: null, context: CONTEXTS.IDLE }
}

function init() {
  document.querySelectorAll(SELECTORS.interactive).forEach(el => {
    el.addEventListener('mouseenter', onHover)
    el.addEventListener('mouseleave', onLeave)
  })
}

function destroy() {
  document.querySelectorAll(SELECTORS.interactive).forEach(el => {
    el.removeEventListener('mouseenter', onHover)
    el.removeEventListener('mouseleave', onLeave)
  })
}

export { init, destroy, getContext, onHover, onLeave, CONTEXTS }
