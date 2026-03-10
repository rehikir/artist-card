import { LinkList } from './LinkList.js'
import { socialLinks } from '../../config/navigation.js'

export function SocialLinks() {
  return LinkList({ category: 'My Works', links: socialLinks })
}
