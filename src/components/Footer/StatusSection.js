import { Category } from '../index.js'
import { FooterWrapper } from '../../layout/Wrapper/FooterWrapper.js'

function renderStatusContent(message) {
  return `
    <div class="status">
      <span class="status-intro">HEYA.</span>
      <span class="status-text tt-none">${message}</span>
    </div>
  `
}

export function StatusSection({ maxSlots = 5, takenSlots = 0 } = {}) {
  const availableSlots = maxSlots - takenSlots
  const statusMessage = availableSlots > 0
    ? `Available slots: ${availableSlots}`
    : 'No slots available.'

  return Category({
    caption: 'Request Art',
    children: FooterWrapper({
      children: renderStatusContent(statusMessage)
    })
  })
}
