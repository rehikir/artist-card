/**
 * Custom Cursor - GSAP-powered bracket cursor
 * Snaps to interactive elements on hover
 */

import { gsap } from 'gsap'

const HIT_AREA = 8
const SNAP_DURATION = 0.2
const FOLLOW_DURATION = 0.05
const DEBUG = true

function log(...args) {
  if (DEBUG) console.log('[Cursor]', ...args)
}

let element = null
let target = null
let mouse = { x: 0, y: 0 }
let rafId = null
let enabled = false

function shouldEnable() {
  return window.matchMedia('(min-width: 768px)').matches &&
         window.matchMedia('(pointer: fine)').matches
}

function findTarget(el) {
  if (!el) return null
  if (el.matches('a, button, .link, [role="button"]')) return el
  return null
}

function snapToTarget(t) {
  const rect = t.getBoundingClientRect()
  const halfW = (rect.width + HIT_AREA) / 2
  const halfH = (rect.height + HIT_AREA) / 2

  gsap.to(element, {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    '--bracket-x': `${halfW}px`,
    '--bracket-y': `${halfH}px`,
    duration: SNAP_DURATION,
    ease: 'power2.out',
    overwrite: true
  })
}

function returnToFollow() {
  gsap.to(element, {
    x: mouse.x,
    y: mouse.y,
    '--bracket-x': '12px',
    '--bracket-y': '12px',
    duration: FOLLOW_DURATION,
    ease: 'none',
    overwrite: true
  })
}

function onMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
  log('mousemove', { x: mouse.x, y: mouse.y })

  if (!target && enabled) {
    gsap.to(element, {
      x: mouse.x,
      y: mouse.y,
      duration: FOLLOW_DURATION,
      ease: 'none',
      overwrite: 'auto'
    })
  }
}

function onHover(e) {
  const isEnter = e.type === 'mouseenter'
  log('hover', { type: e.type, target: isEnter ? e.target?.tagName : null })
  
  target = isEnter ? findTarget(e.target) : null
  log('target set:', target ? target.tagName : null)

  if (element) {
    element.classList.toggle('cursor--active', !!target)
  }

  if (target) {
    snapToTarget(target)
  } else {
    returnToFollow()
  }
}

function update() {
  if (!enabled) return

  if (target) {
    snapToTarget(target)
  }

  rafId = requestAnimationFrame(update)
}

function attachListeners() {
  document.addEventListener('mousemove', onMouseMove, { passive: true })
  document.addEventListener('mouseenter', onHover, true)
  document.addEventListener('mouseleave', onHover, true)
}

function detachListeners() {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseenter', onHover, true)
  document.removeEventListener('mouseleave', onHover, true)
}

export function init() {
  log('init() called')
  element = document.querySelector('.cursor')
  log('element found:', !!element)
  if (!element) return

  enabled = shouldEnable()
  log('enabled:', enabled)
  if (!enabled) return

  log('gsap.set with mouse pos:', mouse)
  gsap.set(element, {
    x: mouse.x,
    y: mouse.y,
    '--bracket-x': '12px',
    '--bracket-y': '12px'
  })

  attachListeners()
  update()
  log('init() complete')
}

export function destroy() {
  log('destroy() called')
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
    log('RAF cancelled')
  }

  detachListeners()
  log('listeners detached')

  if (element) {
    element.classList.remove('cursor--active')
  }

  target = null
  enabled = false
  log('destroy() complete')
}

export default { init, destroy }
