// Shared scripts for Saturnalia'25
document.addEventListener('DOMContentLoaded', function () {
  const yearSpan = document.querySelector('[data-year]');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Simple active nav link highlighter
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.endsWith(path)) {
      a.classList.add('active');
    }
  });
});


