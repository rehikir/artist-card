import { Category } from '../../layout/Category/Category.js'
import { Link } from '../../layout/Link/Link.js'
import { slotConfig } from '../../config/index.js'

export function ContactSection() {
  const { maxSlots, takenSlots } = slotConfig
  const hasAvailableSlots = maxSlots - takenSlots > 0

  return Category({
    caption: 'Request Art',
    inline: true,
    children: `
      ${Link({
        href: hasAvailableSlots ? 'https://forms.google.com/your-form-id' : null,
        text: 'Fill Form',
        target: '_blank',
        rel: 'noopener',
        variant: 'cta'
      })}
      ${Link({
        text: 'Contact me',
        variant: 'alt',
      })}
    `
  })
}
