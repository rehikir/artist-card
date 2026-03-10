import { LinkList } from './index.js'
import { socialLinks } from '../config/socialLinks.js'

export function SocialLinks() {
  return LinkList({ category: 'My Works', links: socialLinks })
}
