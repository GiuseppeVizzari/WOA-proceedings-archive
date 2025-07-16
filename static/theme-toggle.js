// Theme toggle logic
const toggleBtn = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.body.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

toggleBtn.addEventListener('click', toggleTheme);

// On load, set theme from localStorage or system preference
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    setTheme(saved);
  } else {
    setTheme(prefersDark ? 'dark' : 'light');
  }
})();

// Robust header height fix for main content
function setHeaderHeightVar() {
  const header = document.getElementById('site-header');
  if (header) {
    document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
  }
}
window.addEventListener('DOMContentLoaded', setHeaderHeightVar);
window.addEventListener('resize', setHeaderHeightVar);
window.addEventListener('orientationchange', setHeaderHeightVar);
window.addEventListener('load', setHeaderHeightVar);

// Use ResizeObserver for robust header height updates
(function() {
  const header = document.getElementById('site-header');
  if (header && window.ResizeObserver) {
    const ro = new ResizeObserver(() => {
      setHeaderHeightVar();
    });
    ro.observe(header);
  }
})(); 