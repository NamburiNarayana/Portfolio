/* ── PARTICLE CANVAS ─────────────────────────── */
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const mouse = { x: null, y: null };
  const N = 75, LINK = 120, REPEL = 130;
  const COLORS = ['rgba(0,120,212,', 'rgba(0,180,216,', 'rgba(200,230,255,'];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - .5) * .45,
      vy: (Math.random() - .5) * .45,
      r: Math.random() * 1.8 + .8,
      col: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: N }, makeParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + '.75)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(0,120,212,' + (1 - d / LINK) * .12 + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      if (mouse.x !== null) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < REPEL) {
          const f = (REPEL - d) / REPEL * .018;
          p.vx += dx * f;
          p.vy += dy * f;
          const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (spd > 1.5) { p.vx = p.vx / spd * 1.5; p.vy = p.vy / spd * 1.5; }
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
  init();
  draw();
})();

/* ── TYPEWRITER ──────────────────────────────── */
(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const roles = ['Cloud Engineer', 'Data Engineer', 'DevOps Engineer'];
  let ri = 0, ci = 0, del = false;

  function tick() {
    const cur = roles[ri];
    el.textContent = del ? cur.slice(0, ci - 1) : cur.slice(0, ci + 1);
    del ? ci-- : ci++;

    if (!del && ci > cur.length) {
      del = true;
      setTimeout(tick, 2200);
      return;
    }
    if (del && ci === 0) {
      del = false;
      ri = (ri + 1) % roles.length;
    }
    setTimeout(tick, del ? 48 : 105);
  }
  setTimeout(tick, 900);
})();

/* ── ROLE TAB SWITCHER ───────────────────────── */
function switchRole(id) {
  document.querySelectorAll('.tab-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.role === id)
  );
  document.querySelectorAll('.role-panel').forEach(p =>
    p.classList.toggle('active', p.id === 'panel-' + id)
  );
  setTimeout(() => animateBars('#panel-' + id), 80);
}

/* called from about-card onclick */
function scrollTo(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ── SKILL BAR ANIMATION ─────────────────────── */
function animateBars(selector) {
  const panel = document.querySelector(selector);
  if (!panel) return;
  panel.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = bar.dataset.level + '%'; }, 60);
  });
}

/* Trigger once when expertise section enters viewport */
let expertiseFired = false;
const expertiseEl = document.getElementById('expertise');
if (expertiseEl) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !expertiseFired) {
      expertiseFired = true;
      animateBars('#panel-cloud');
    }
  }, { threshold: 0.15 }).observe(expertiseEl);
}

/* ── STATS COUNTER ───────────────────────────── */
function animateCounter(el, target) {
  const hasPlus = target.endsWith('+');
  const n = parseInt(target);
  let v = 0;
  const step = Math.max(1, Math.ceil(n / 80));
  const id = setInterval(() => {
    v = Math.min(v + step, n);
    el.textContent = v + (hasPlus ? '+' : '');
    if (v >= n) clearInterval(id);
  }, 20);
}

let statsFired = false;
const statsEl = document.getElementById('stats');
if (statsEl) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !statsFired) {
      statsFired = true;
      statsEl.querySelectorAll('.stat-value').forEach(el =>
        animateCounter(el, el.dataset.target)
      );
    }
  }, { threshold: 0.5 }).observe(statsEl);
}

/* ── SCROLL REVEAL ───────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── NAVBAR SCROLL + ACTIVE SECTION ─────────── */
const navbar  = document.getElementById('navbar');
const sections = Array.from(document.querySelectorAll('section[id]'));
const navAs    = Array.from(document.querySelectorAll('.nav-links li a'));

window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 60
    ? 'rgba(6,12,20,.96)'
    : 'rgba(6,12,20,.88)';

  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
}, { passive: true });

/* ── MOBILE NAV ──────────────────────────────── */
const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);
