// nav.js — injects shared nav and footer into every page

const NAV_HTML = `
<header>
  <nav>
    <a href="../index.html" class="nav-logo">
      <img src="../images/logo.jpeg" alt="Kgotsong Bothaville Connect Logo" onerror="this.style.display='none'">
      <span>Kgotsong<br><small style="font-size:0.65rem;color:var(--gold);font-family:'Mulish',sans-serif;letter-spacing:0.08em;text-transform:uppercase">Bothaville Connect</small></span>
    </a>
    <ul class="nav-links" id="navLinks">
      <li><a href="../index.html">Home</a></li>
      <li><a href="../pages/spotlight.html">Spotlight</a></li>
      <li><a href="../pages/directory.html">Directory</a></li>
      <li><a href="../pages/events.html">Events</a></li>
      <li><a href="../pages/opportunities.html">Opportunities</a></li>
      <li><a href="../pages/support.html" class="nav-cta">Get Involved</a></li>
    </ul>
    <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>
</header>`;

const FOOTER_HTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="../images/logo.jpeg" alt="Logo" onerror="this.style.display='none'">
        <h3 style="font-size:1.1rem;margin-bottom:0.5rem">Kgotsong Bothaville Connect</h3>
        <p>A digital platform sharing local businesses, community initiatives and opportunities. Est. 2026.</p>
      </div>
      <div class="footer-col">
        <h4>Pages</h4>
        <ul>
          <li><a href="../index.html">Home</a></li>
          <li><a href="../pages/spotlight.html">Community Spotlight</a></li>
          <li><a href="../pages/directory.html">Business Directory</a></li>
          <li><a href="../pages/events.html">Events</a></li>
          <li><a href="../pages/opportunities.html">Opportunities</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Community</h4>
        <ul>
          <li><a href="../pages/support.html">Submit Your Business</a></li>
          <li><a href="../pages/support.html">Partner With Us</a></li>
          <li><a href="../pages/events.html">Volunteer</a></li>
          <li><a href="../pages/events.html">Donate</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:0812120921">081 212 0921</a></li>
          <li><a href="mailto:pkoekoe@gmail.com">pkoekoe@gmail.com</a></li>
          <li><a href="#">Bothaville, Free State</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 Kgotsong Bothaville Connect. All rights reserved.</span>
      <span>Built with ❤️ for the community</span>
    </div>
  </div>
</footer>`;

// For index.html (root level) — different relative paths
const NAV_HTML_ROOT = NAV_HTML
  .replace(/href="\.\.\/index\.html"/g, 'href="index.html"')
  .replace(/href="\.\.\/pages\//g, 'href="pages/')
  .replace(/src="\.\.\/images\//g, 'src="images/');

const FOOTER_HTML_ROOT = FOOTER_HTML
  .replace(/href="\.\.\/index\.html"/g, 'href="index.html"')
  .replace(/href="\.\.\/pages\//g, 'href="pages/')
  .replace(/src="\.\.\/images\//g, 'src="images/');

document.addEventListener('DOMContentLoaded', () => {
  const isRoot = !window.location.pathname.includes('/pages/');
  const navEl = document.getElementById('nav-placeholder');
  const footEl = document.getElementById('footer-placeholder');
  if (navEl) navEl.outerHTML = isRoot ? NAV_HTML_ROOT : NAV_HTML;
  if (footEl) footEl.outerHTML = isRoot ? FOOTER_HTML_ROOT : FOOTER_HTML;
});
