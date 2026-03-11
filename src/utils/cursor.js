import { gsap } from 'gsap'

const HIT_AREA = 16
const SNAP_DURATION = 0.1

export function initCursor() {
  const cursor = document.querySelector('.cursor')
  if (!cursor) return

  // Reset state
  cursor.classList.remove('cursor--active')
  gsap.set(cursor, { 
    width: cursor.offsetWidth, 
    height: cursor.offsetHeight,
    x: 0,
    y: 0
  })

  let cursorW = cursor.offsetWidth
  let cursorH = cursor.offsetHeight
  const hitBox = HIT_AREA + Math.max(cursorW, cursorH) / 8

  let mouseX = 0, mouseY = 0, isActive = false, currentEl = null

  // Instant position follow
  const followMouse = () => {
    if (!isActive) {
      gsap.set(cursor, { x: mouseX, y: mouseY })
    }
  }

  // Cached elements
  let clickables = []
  const updateClickables = () => {
    clickables = [...document.querySelectorAll('a, button, .link')]
  }
  updateClickables()

  // Check overlap
  const isOver = (el) => {
    const r = el.getBoundingClientRect()
    return (
      mouseX >= r.left - hitBox &&
      mouseX <= r.right + hitBox &&
      mouseY >= r.top - hitBox &&
      mouseY <= r.bottom + hitBox
    )
  }

  // Main update loop
  const update = () => {
    const target = clickables.find(isOver)

    if (target && target !== currentEl) {
      currentEl = target
      const rect = target.getBoundingClientRect()

      if (!isActive) {
        isActive = true
        cursor.classList.add('cursor--active')
      }

      gsap.to(cursor, {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width + HIT_AREA,
        height: rect.height + HIT_AREA,
        duration: SNAP_DURATION,
        ease: 'power2.out',
        overwrite: true
      })
    } else if (!target && isActive) {
      isActive = false
      currentEl = null
      cursor.classList.remove('cursor--active')

      gsap.to(cursor, {
        width: cursorW,
        height: cursorH,
        duration: SNAP_DURATION,
        ease: 'power2.out',
        overwrite: true
      })
    }

    // Position update
    if (isActive && currentEl) {
      const rect = currentEl.getBoundingClientRect()
      gsap.set(cursor, {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      })
    } else {
      followMouse()
    }

    requestAnimationFrame(update)
  }

  // Mouse tracking
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    followMouse()
  }, { passive: true })

  window.addEventListener('scroll', updateClickables, { passive: true })
  window.addEventListener('resize', () => {
    cursorW = cursor.offsetWidth
    cursorH = cursor.offsetHeight
    updateClickables()
  })

  update()
}
