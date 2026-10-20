(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const ambient = document.createElement('div');
  ambient.className = 'ambient'; ambient.setAttribute('aria-hidden', 'true');
  document.body.prepend(ambient);
  const toggle = document.createElement('button');
  toggle.className = 'motion-toggle'; toggle.type = 'button'; document.body.append(toggle);
  let paused = reduce.matches;
  let cursor;
  function sync() {
    document.body.classList.toggle('motion-paused', paused);
    toggle.textContent = paused ? 'Включить анимацию' : 'Приостановить анимацию';
    toggle.setAttribute('aria-pressed', String(paused));
    document.body.classList.remove('cursor-ready');
    if (cursor) cursor.style.opacity = '0';
  }
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  reduce.addEventListener('change', () => { paused = reduce.matches; sync(); }); sync();
  const nav = document.querySelector('.nav');
  const scroll = () => nav?.classList.toggle('scrolled', scrollY > 40);
  addEventListener('scroll', scroll, {passive: true}); scroll();
  const targets = document.querySelectorAll('.reveal,.section-head,.service,.card,.step,.review-card,.additional-services article,.contact-channel-grid a,.page-portrait,.about-image,.quote .wrap,.referral-panel');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('on'); observer.unobserve(entry.target);
    }), {threshold: .06});
    targets.forEach(el => {
      el.classList.add('motion-reveal');
      const index = [...el.parentElement.children].indexOf(el);
      el.style.setProperty('--delay', `${Math.min(index, 3) * 70}ms`); observer.observe(el);
    });
  }
  document.querySelectorAll('.referral-panel').forEach(panel => {
    panel.querySelectorAll('li').forEach((item, index) => item.style.setProperty('--item-delay', `${180 + index * 130}ms`));
  });
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('motion-idle', document.hidden));
  if (!fine.matches) return;
  cursor = document.createElement('div'); cursor.className = 'glass-cursor';
  cursor.setAttribute('aria-hidden', 'true'); document.body.append(cursor);
  addEventListener('pointermove', event => {
    if (paused || reduce.matches || event.pointerType === 'touch') return;
    cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
    cursor.style.opacity = '1';
    cursor.classList.toggle('over', !!event.target.closest('a,button,input,summary'));
  }, {passive: true});
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  addEventListener('blur', () => { cursor.style.opacity = '0'; });
  addEventListener('pointerdown', () => cursor.classList.add('down'));
  addEventListener('pointerup', () => cursor.classList.remove('down'));
})();
