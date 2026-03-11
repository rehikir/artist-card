import { gsap } from 'gsap'

const HIT_AREA = 8, SNAP_DURATION = 0.2
const SELECTORS = 'a, button, .link'

let el, target, mouse = { x: 0, y: 0 }, rafId, enabled

function update() {
  if (target) {
    const r = target.getBoundingClientRect()
    gsap.to(el, { x: r.left + r.width/2, y: r.top + r.height/2, '--outline-w': r.width + HIT_AREA + 'px', '--outline-h': r.height + HIT_AREA + 'px', duration: SNAP_DURATION, ease: 'power2.out', overwrite: true })
  } else {
    gsap.to(el, { x: mouse.x, y: mouse.y, '--outline-w': el.offsetWidth + 'px', '--outline-h': el.offsetHeight + 'px', duration: SNAP_DURATION, ease: 'power2.out', overwrite: true })
  }
  rafId = requestAnimationFrame(update)
}

function onHover(e) {
  target = e.type === 'mouseenter' ? e.currentTarget : null
  el?.classList.toggle('cursor--active', !!target)
}

function onMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function init() {
  el = document.querySelector('.cursor')
  if (!el) return

  enabled = window.matchMedia('(min-width: 48rem)').matches && window.matchMedia('(pointer: fine)').matches
  if (!enabled) return

  gsap.set(el, { x: 0, y: 0, '--outline-w': el.offsetWidth + 'px', '--outline-h': el.offsetHeight + 'px' })
  document.body.classList.add('has-custom-cursor')
  document.addEventListener('mousemove', onMouseMove, { passive: true })
  document.querySelectorAll(SELECTORS).forEach(el => {
    el.addEventListener('mouseenter', onHover)
    el.addEventListener('mouseleave', onHover)
  })
  update()
}

function destroy() {
  cancelAnimationFrame(rafId)
  document.removeEventListener('mousemove', onMouseMove)
  document.body.classList.remove('has-custom-cursor')
  el?.classList.remove('cursor--active')
  gsap.set(el, { x: 0, y: 0 })
}

export { init, destroy }
