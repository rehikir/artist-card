import { Category } from '../../layout/Category/Category.js'
import { slotConfig } from '../../config/index.js'

export function StatusSection() {
  const { maxSlots, takenSlots } = slotConfig
  const availableSlots = maxSlots - takenSlots
  const statusMessage = availableSlots > 0
    ? `Available slots: ${availableSlots}`
    : 'No slots available.'

  return Category({
    caption: 'Availability',
    children: `
      <div class="status">
        <span class="status-intro">HEYA.</span>
        <span class="status-text tt-none">${statusMessage}</span>
      </div>
    `
  })
}
