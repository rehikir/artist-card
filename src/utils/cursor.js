/**
 * Custom Cursor - GSAP-powered bracket cursor
 * Snaps to interactive elements on hover
 */

import { gsap } from 'gsap'

const HIT_AREA = 8
const SNAP_DURATION = 0.2
const FOLLOW_DURATION = 0.05

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
    ease: 'power1.out',
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

  if (!target && enabled) {
    gsap.to(element, {
      x: mouse.x,
      y: mouse.y,
      duration: FOLLOW_DURATION,
      ease: 'power1.out',
      overwrite: 'auto'
    })
  }
}

function onHover(e) {
  const isEnter = e.type === 'mouseenter'
  target = isEnter ? findTarget(e.target) : null

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
  element = document.querySelector('.cursor')
  if (!element) return

  enabled = shouldEnable()
  if (!enabled) return

  gsap.set(element, {
    x: mouse.x,
    y: mouse.y,
    '--bracket-x': '12px',
    '--bracket-y': '12px'
  })

  attachListeners()
  update()
}

export function destroy() {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }

  detachListeners()

  if (element) {
    element.classList.remove('cursor--active')
  }

  target = null
  enabled = false
}

export default { init, destroy }
