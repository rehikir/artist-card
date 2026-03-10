export function FooterWrapper({ children = '' } = {}) {
  return `
    <footer class="footer-wrapper">
      ${children}
    </footer>
  `
}
