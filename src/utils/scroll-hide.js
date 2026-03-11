const HIDDEN_CLASS = 'is-hidden'

let observers = []
let enabled = false

function createObserver(el) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          const rect = entry.target.getBoundingClientRect()
          if (rect.bottom < 0) {
            entry.target.classList.add(HIDDEN_CLASS)
          }
        } else {
          entry.target.classList.remove(HIDDEN_CLASS)
        }
      })
    },
    {
      rootMargin: '0px 0px -100% 0px',
      threshold: 0
    }
  )

  observer.observe(el)
  return observer
}

function init(selectors) {
  const isDesktop = window.matchMedia('(min-width: 48rem)').matches
  if (!isDesktop) return

  enabled = true
  const elements = document.querySelectorAll(selectors)

  elements.forEach((el) => {
    const observer = createObserver(el)
    observers.push(observer)
  })
}

function destroy() {
  observers.forEach((observer) => observer.disconnect())
  observers = []
  enabled = false
}

export { init, destroy }
