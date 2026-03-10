import { Category, Link } from '../index.js'
import { slotConfig } from '../../config/slots.js'

export function ContactSection() {
  const { maxSlots, takenSlots } = slotConfig
  const hasAvailableSlots = maxSlots - takenSlots > 0

  return Category({
    caption: 'Request Art',
    inline: true,
    children: Link({
      href: hasAvailableSlots ? 'https://forms.google.com/your-form-id' : null,
      text: 'Fill Form',
      target: '_blank',
      rel: 'noopener',
      variant: 'cta'
    })
  })
}
