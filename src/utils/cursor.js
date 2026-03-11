import { gsap } from 'gsap'

const HIT_AREA = 16
const SNAP_DURATION = 0.1
const SELECTORS = 'a, button, .link'

let cursor = null
let isActive = false
let currentEl = null
let mouseX = 0, mouseY = 0
let cursorW = 0, cursorH = 0
let clickables = []
let rafId = null
let enabled = false

function updateClickables() {
  clickables = [...document.querySelectorAll(SELECTORS)]
}

function isOver(el) {
  const r = el.getBoundingClientRect()
  const hitBox = HIT_AREA + Math.max(cursorW, cursorH) / 8
  return (
    mouseX >= r.left - hitBox &&
    mouseX <= r.right + hitBox &&
    mouseY >= r.top - hitBox &&
    mouseY <= r.bottom + hitBox
  )
}

function followMouse() {
  if (!isActive) gsap.set(cursor, { x: mouseX, y: mouseY })
}

function activate(el) {
  currentEl = el
  isActive = true
  cursor.classList.add('cursor--active')

  const rect = el.getBoundingClientRect()
  gsap.to(cursor, {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    width: rect.width + HIT_AREA,
    height: rect.height + HIT_AREA,
    duration: SNAP_DURATION,
    ease: 'power2.out',
    overwrite: true
  })
}

function deactivate() {
  currentEl = null
  isActive = false
  cursor.classList.remove('cursor--active')

  gsap.to(cursor, {
    width: cursorW,
    height: cursorH,
    duration: SNAP_DURATION,
    ease: 'power2.out',
    overwrite: true
  })
}

function update() {
  const target = clickables.find(isOver)

  if (target && target !== currentEl) {
    activate(target)
  } else if (!target && isActive) {
    deactivate()
  }

  // Keep outline synced on scroll/resize
  if (isActive && currentEl) {
    const rect = currentEl.getBoundingClientRect()
    gsap.set(cursor, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    })
  } else {
    followMouse()
  }

  rafId = requestAnimationFrame(update)
}

function init() {
  cursor = document.querySelector('.cursor')
  if (!cursor) return

  // Only enable on desktop with fine pointer
  const isDesktop = window.matchMedia('(min-width: 48rem)').matches
  const isFinePointer = window.matchMedia('(pointer: fine)').matches
  enabled = isDesktop && isFinePointer

  if (!enabled) return

  // Reset state
  cursor.classList.remove('cursor--active')
  gsap.set(cursor, { width: cursor.offsetWidth, height: cursor.offsetHeight, x: 0, y: 0 })

  cursorW = cursor.offsetWidth
  cursorH = cursor.offsetHeight

  updateClickables()

  // Mouse tracking
  document.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('scroll', updateClickables, { passive: true })
  window.addEventListener('resize', onResize)

  update()
}

function destroy() {
  if (!cursor) return

  if (rafId) cancelAnimationFrame(rafId)
  rafId = null

  document.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('scroll', updateClickables)
  window.removeEventListener('resize', onResize)

  cursor.classList.remove('cursor--active')
  gsap.set(cursor, { width: cursorW, height: cursorH, x: 0, y: 0 })

  cursor = null
  isActive = false
  currentEl = null
  clickables = []
  enabled = false
}

function onMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
  followMouse()
}

function onResize() {
  cursorW = cursor.offsetWidth
  cursorH = cursor.offsetHeight
  updateClickables()
}

export { init, destroy }
