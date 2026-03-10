import gsap from 'gsap'

export function initAnimations() {
  // Card fade-in animation
  gsap.fromTo('.card', 
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power1.out' }
  )

  // Stagger animation for branding elements
  gsap.fromTo('.branding-name, .branding-page',
    { opacity: 0, x: -50 },
    { 
      opacity: 1, 
      x: 0, 
      duration: 0.4, 
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.2
    }
  )

  // Stagger animation for link categories
  gsap.fromTo('.category',
    { opacity: 0, y: 10 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.4, 
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.5
    }
  )

  // Status section animation
  gsap.fromTo('.home-bottom',
    { opacity: 0, y: 10 },
    {
      opacity: 1,
      y: 0, 
      duration: 0.4,
      ease: 'power2.out',
      delay: 1
    }
  )
}
