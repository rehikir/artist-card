import { Category } from '../../layout/Category/Category.js'

export function TestPageContent() {
  return Category({
    caption: 'Testing, testing',
    children: `<p>Test page. It\'s not supposed to be shown at header, but it\'s visible on the side navigation bar. Neat, amirite? Also, I\'m testing proper word-wrapping.</p>
    <p>It seems to work well for now, but I will, most likely, change some stuff to make this text more readable than it is while keeping consistency and all.</p>`
  })
}
