document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href]').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) return;
    if (link.getAttribute('target') === '_blank') return;

    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const target = this.href;
      document.body.style.transition = 'opacity 0.45s cubic-bezier(0.4,0,1,1), transform 0.45s cubic-bezier(0.4,0,1,1)';
      document.body.style.opacity = '0';
      document.body.style.transform = 'scale(0.92) translateY(30px)';
      setTimeout(function () { window.location.href = target; }, 470);
    });
  });
});
