import { gsap } from 'gsap'
import { onHover, onLeave, CONTEXTS } from './cursor-context.js'

const HIT_AREA = 8, SNAP_DURATION = 0.2

let el, target, mouse = { x: 0, y: 0 }, rafId, enabled, context = CONTEXTS.IDLE

function update() {
  if (target) {
    const r = target.getBoundingClientRect()
    const halfW = (r.width + HIT_AREA) / 2
    const halfH = (r.height + HIT_AREA) / 2
    gsap.to(el, {
      x: r.left + r.width / 2,
      y: r.top + r.height / 2,
      '--bracket-x': halfW + 'px',
      '--bracket-y': halfH + 'px',
      duration: SNAP_DURATION,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }
  rafId = requestAnimationFrame(update)
}

function handleHover(e) {
  const result = e.type === 'mouseenter' ? onHover(e) : onLeave()
  target = result.target
  context = result.context
  el?.classList.toggle('cursor--active', !!target)
  
  if (target) {
    const r = target.getBoundingClientRect()
    const halfW = (r.width + HIT_AREA) / 2
    const halfH = (r.height + HIT_AREA) / 2
    gsap.to(el, {
      x: r.left + r.width / 2,
      y: r.top + r.height / 2,
      '--bracket-x': halfW + 'px',
      '--bracket-y': halfH + 'px',
      duration: SNAP_DURATION,
      ease: 'power2.out',
      overwrite: true
    })
  } else {
    gsap.to(el, {
      x: mouse.x,
      y: mouse.y,
      '--bracket-x': '12px',
      '--bracket-y': '12px',
      duration: 0.05,
      ease: 'none',
      overwrite: true
    })
  }
}

function onMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
  
  if (!target) {
    gsap.to(el, {
      x: mouse.x,
      y: mouse.y,
      duration: 0.05,
      ease: 'none',
      overwrite: 'auto'
    })
  }
}

function init() {
  el = document.querySelector('.cursor')
  if (!el) return

  enabled = window.matchMedia('(min-width: 48rem)').matches && window.matchMedia('(pointer: fine)').matches
  if (!enabled) return

  gsap.set(el, { x: 0, y: 0, '--bracket-x': '12px', '--bracket-y': '12px' })
  document.addEventListener('mousemove', onMouseMove, { passive: true })
  document.querySelectorAll('a, button, .link, [role="button"]').forEach(el => {
    el.addEventListener('mouseenter', handleHover)
    el.addEventListener('mouseleave', handleHover)
  })
  update()
}

function destroy() {
  cancelAnimationFrame(rafId)
  document.removeEventListener('mousemove', onMouseMove)
  document.querySelectorAll('a, button, .link, [role="button"]').forEach(el => {
    el.removeEventListener('mouseenter', handleHover)
    el.removeEventListener('mouseleave', handleHover)
  })
  el?.classList.remove('cursor--active')
  gsap.set(el, { x: 0, y: 0, '--bracket-x': '12px', '--bracket-y': '12px' })
}

export { init, destroy }
