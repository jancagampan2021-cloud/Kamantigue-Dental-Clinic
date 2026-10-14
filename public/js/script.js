// ---------- Mobile nav toggle (used on every page) ----------
function setNav(open){
  const links = document.getElementById('navLinks');
  const btn = document.getElementById('navToggle');
  if (!links || !btn) return;
  links.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', String(open));
}

function toggleNav(){
  const links = document.getElementById('navLinks');
  setNav(!(links && links.classList.contains('open')));
}

function initNav(){
  const btn = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', toggleNav);
  links.addEventListener('click', e => { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });
  document.addEventListener('click', e => {
    if (!e.target.closest('header')) setNav(false);   // tap outside closes the menu
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) setNav(false); });
}


// ---------- Load shared header.html / footer.html into every page ----------
// Site root, worked out from this script's own URL (public/js/script.js -> two levels up).
// Works locally, at a domain root, and on GitHub Pages project sites (/repo-name/).
const SITE_ROOT = new URL('../../', document.currentScript.src).href;

// Turn root-relative links like "/src/about.html" into links under SITE_ROOT
function fixLinks(el) {
  el.querySelectorAll('a[href^="/"]').forEach(a => {
    a.setAttribute('href', SITE_ROOT + a.getAttribute('href').slice(1));
  });
}

async function loadIncludes() {
  const headerSlot = document.getElementById('header-placeholder');
  const footerSlot = document.getElementById('footer-placeholder');

  if(headerSlot) {
    const res = await fetch(SITE_ROOT + 'src/header.html');
    headerSlot.innerHTML = await res.text();
    fixLinks(headerSlot);

    const current = location.pathname.split('/').pop().replace('.html','') || 'index';
    document.querySelectorAll('.nav-list a').forEach(a => {
        if(a.dataset.page === current) a.classList.add('active');
    });

    initNav();
  }

  if(footerSlot){
    const res = await fetch(SITE_ROOT + 'src/footer.html');
    footerSlot.innerHTML = await res.text();
    fixLinks(footerSlot);

    // Set the year now that #year actually exists in the DOM
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', loadIncludes);