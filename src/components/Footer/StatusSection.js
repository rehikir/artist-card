import { CategoryWrapper } from '../../layout/Category/CategoryWrapper.js'
import { CategorySection } from '../../layout/Category/CategorySection.js'
import { CategoryCaption } from '../../layout/Category/CategoryCaption.js'
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

  return `
    ${CategoryWrapper({
      children: `
        ${CategoryCaption({ label: 'Request Art' })}
        ${CategorySection({
          children: FooterWrapper({
            children: renderStatusContent(statusMessage)
          })
        })}
      `
    })}
  `
}
