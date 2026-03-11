import { gsap } from 'gsap'

const HIT_AREA = 8
const SNAP_DURATION = 0.2
const SELECTORS = 'a, button, .link'

let el = null
let target = null
let mouse = { x: 0, y: 0 }
let rafId = null
let enabled = false
let cursorW = 0
let cursorH = 0

function findHitElement() {
  const hitBox = HIT_AREA
  const elements = document.querySelectorAll(SELECTORS)

  for (const el of elements) {
    const r = el.getBoundingClientRect()
    if (
      mouse.x >= r.left - hitBox &&
      mouse.x <= r.right + hitBox &&
      mouse.y >= r.top - hitBox &&
      mouse.y <= r.bottom + hitBox
    ) {
      return el
    }
  }
  return null
}

function update() {
  const hit = findHitElement()

  if (hit !== target) {
    target = hit
    if (hit) {
      el.classList.add('cursor--active')
      document.body.classList.remove('has-custom-cursor')
    } else {
      el.classList.remove('cursor--active')
      document.body.classList.add('has-custom-cursor')
    }
  }

  if (target) {
    const rect = target.getBoundingClientRect()
    const w = rect.width + HIT_AREA
    const h = rect.height + HIT_AREA
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    gsap.to(el, {
      x: centerX,
      y: centerY,
      '--outline-w': w + 'px',
      '--outline-h': h + 'px',
      duration: SNAP_DURATION,
      ease: 'power2.out',
      overwrite: true
    })
  } else {
    gsap.to(el, {
      x: mouse.x,
      y: mouse.y,
      '--outline-w': cursorW + 'px',
      '--outline-h': cursorH + 'px',
      duration: SNAP_DURATION,
      ease: 'power2.out',
      overwrite: true
    })
  }

  rafId = requestAnimationFrame(update)
}

function onMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function init() {
  el = document.querySelector('.cursor')
  if (!el) return

  const isDesktop = window.matchMedia('(min-width: 48rem)').matches
  const isFinePointer = window.matchMedia('(pointer: fine)').matches
  enabled = isDesktop && isFinePointer

  if (!enabled) return

  cursorW = el.offsetWidth
  cursorH = el.offsetHeight
  gsap.set(el, {
    x: 0,
    y: 0,
    '--outline-w': cursorW + 'px',
    '--outline-h': cursorH + 'px'
  })

  document.body.classList.add('has-custom-cursor')
  document.addEventListener('mousemove', onMouseMove, { passive: true })

  update()
}

function destroy() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null

  document.removeEventListener('mousemove', onMouseMove)
  document.body.classList.remove('has-custom-cursor')

  if (el) {
    el.classList.remove('cursor--active')
    gsap.set(el, {
      x: 0,
      y: 0,
      '--outline-w': cursorW + 'px',
      '--outline-h': cursorH + 'px'
    })
  }

  el = null
  target = null
  mouse = { x: 0, y: 0 }
  cursorW = 0
  cursorH = 0
  enabled = false
}

export { init, destroy }
