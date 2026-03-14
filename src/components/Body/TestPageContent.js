import { Category } from '../../layout/Category/Category.js'
import { Link } from '../../layout/Link/Link.js'

export function TestPageContent() {
  return Category({
    caption: 'About',
    children: `
    ${Link({
      href: 'https://github.com/rehikir/artist-card',
      text: 'Github Repository',
      target: '_blank',
      rel: 'noopener',
      variant: 'cta'
    })}
    ${Link({
      text: 'Telegram',
      target: '_blank',
      rel: 'noopener',
      variant: 'alt'
    })}
    <br>
    <h3>Hello. This is a working example of a fully customizable artist portfolio site.</h3>
<br>
<p>(We are on a test page — still working on adding content and visual features.)</p>
<p>Design and layout are all mine. AI is used to speed things up on the dev side. Haven't coded in ages lol.</p>
<p>For the record, I dislike AI as an art tool and the way big corpos keep putting it everywhere. But as a practical devtool with actual thought in it, it's fine. Some... are braindead when using it, though (like Microslop and AI farms).</p>
<p>Here, it's constantly curated and QA'd by me so none of that.</p>
<br>
<p>Anyway, the goal with this is a clean, easy to edit, fully vanilla JS app that artists can actually use that looks good out of the box, works anywhere and on any device.</p>
<p>Gallery, admin panel (or whatever else) are all possible to add easily. The app is fully modular, and the whole design and aesthetic can be made from scratch completely unique to one's needs without much trouble at all.</p>
<p>If you're an artist and this looks like something you'd want for yourself, hit me up on Discord:
<h3>@xxyy_me</h3>`
  })
}
