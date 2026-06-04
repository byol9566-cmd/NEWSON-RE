// ── Sticky header shadow ──
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 10);
});

// ── Mobile nav toggle ──
function toggleNav() {
  const nav = document.getElementById('mobile-nav');
  const btn = document.getElementById('hamburger');
  const isOpen = nav.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
document.getElementById('mobile-nav')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) toggleNav();
});

// ── Bookmark ──
document.getElementById('bookmark-btn')?.addEventListener('click', e => {
  e.preventDefault();
  try { window.external.AddFavorite(location.href, document.title); }
  catch { alert('즐겨찾기를 추가하려면 Ctrl+D 를 눌러주세요.'); }
});

// ── Active nav highlight ──
(function() {
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('#nav a, #mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
})();
