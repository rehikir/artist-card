/**
 * 404 Not Found Content Component
 */

import { Category } from '../../layout/Category/Category.js'

export function NotFoundContent() {
  return Category({
    caption: '404',
    children: '<p>Page not found.</p>'
  })
}
