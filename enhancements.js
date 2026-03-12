// ===== ENHANCEMENTS – Premium UX Features =====

// ===== 0. PERFORMANCE CORE =====
// Throttle: chạy fn tối đa 1 lần/frame
function throttleRAF(fn) {
  let rafId = null;
  return function(...args) {
    if (rafId) return;
    rafId = requestAnimationFrame(() => { fn.apply(this, args); rafId = null; });
  };
}
// Debounce: chạy sau khi dừng gọi trong `delay` ms
function debounce(fn, delay = 150) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

// Tắt animation khi tab ẩn – tiết kiệm CPU/GPU đáng kể
document.addEventListener('visibilitychange', () => {
  const paused = document.hidden ? 'paused' : 'running';
  document.querySelectorAll('.bubble, .product-emoji, .hero-card-floating').forEach(el => {
    el.style.animationPlayState = paused;
  });
});

// ===== 1. CUSTOM CURSOR WITH WATER RIPPLE =====
function initCustomCursor() {
  // Chỉ chạy trên desktop, không cảm ứng
  if ('ontouchstart' in window || window.matchMedia('(pointer:coarse)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  // Dùng throttleRAF – không sync style trực tiếp trong event
  document.addEventListener('mousemove', throttleRAF((e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  }), { passive: true });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover/click states
  const hoverEls = 'a, button, .product-card, .category-card, .filter-btn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverEls)) ring.classList.add('hovering');
  }, { passive: true });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverEls)) ring.classList.remove('hovering');
  }, { passive: true });
  document.addEventListener('mousedown', () => ring.classList.add('clicking'), { passive: true });
  document.addEventListener('mouseup',   () => ring.classList.remove('clicking'), { passive: true });
  document.addEventListener('mouseleave', () => { dot.style.opacity = 0; ring.style.opacity = 0; }, { passive: true });
  document.addEventListener('mouseenter', () => { dot.style.opacity = 1; ring.style.opacity = 1; }, { passive: true });

  initClickRipple();
}

function initClickRipple() {
  const canvas = document.createElement('canvas');
  canvas.id = 'ripple-canvas';
  document.body.insertBefore(canvas, document.body.firstChild);
  const ctx = canvas.getContext('2d', { alpha: true });  // alpha:true = compositing đúng

  const resize = debounce(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, 200);
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const ripples = [];
  let rafRunning = false;

  document.addEventListener('click', (e) => {
    ripples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.65 });
    // Chỉ khởi động RAF khi có ripple mới – dừng lại khi hết
    if (!rafRunning) { rafRunning = true; drawRipples(); }
  }, { passive: true });

  function drawRipples() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += 4;
      rp.alpha -= 0.028;
      if (rp.alpha <= 0) { ripples.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(76,187,133,${rp.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    // Dừng RAF khi không còn ripple – tiết kiệm GPU
    if (ripples.length > 0) {
      requestAnimationFrame(drawRipples);
    } else {
      rafRunning = false;
    }
  }
}

// ===== 2. ANIMATED COUNTER FOR HERO STATS =====
function initAnimatedCounters() {
  const counters = [
    { el: document.querySelector('.stat-value'), target: 500, suffix: '+', duration: 1800 },
    { el: document.querySelectorAll('.stat-value')[1], target: 8, suffix: '', duration: 900 },
    { el: document.querySelectorAll('.stat-value')[2], target: 10, suffix: '+', duration: 1200 }
  ];

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);

      const counter = counters.find(c => c.el === entry.target);
      if (!counter || counter.done) return;
      counter.done = true;

      const { el, target, suffix, duration } = counter;
      const start = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quart
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);
        el.textContent = current + suffix;
        el.classList.toggle('animating', progress > 0.85 && progress < 1);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => { if (c.el) observer.observe(c.el); });
}

// ===== 3. SOCIAL PROOF NOTIFICATION =====
const SOCIAL_PROOF_DATA = [
  { name: 'Anh Hùng', city: 'Đà Nẵng', product: 'Tinh chất đạm cá biển', emoji: '🐟', avatar: '🧑' },
  { name: 'Chị Lan', city: 'TP. Hồ Chí Minh', product: 'Gel dạ dày Thiên Mộc', emoji: '🌿', avatar: '👩' },
  { name: 'Bác Minh', city: 'Cần Thơ', product: 'Dịch cá biển', emoji: '🦈', avatar: '🧓' },
  { name: 'Chị Trang', city: 'Hà Nội', product: 'Xương khớp Thiên Mộc', emoji: '🦴', avatar: '👩‍🦱' },
  { name: 'Anh Tuấn', city: 'Bình Định', product: 'Nước mắm truyền thống', emoji: '🍶', avatar: '👨' },
  { name: 'Chị Ngọc', city: 'Lâm Đồng', product: 'AZProTM Protein', emoji: '💊', avatar: '👩‍🌾' },
  { name: 'Anh Phong', city: 'Kiên Giang', product: 'UTM Thiên Mộc', emoji: '🌺', avatar: '🧔' },
  { name: 'Chị Hoa', city: 'Nghệ An', product: 'Bổ phế Thiên Mộc', emoji: '🫁', avatar: '👩‍❤️‍👨' }
];

function initSocialProof() {
  const toast = document.createElement('div');
  toast.className = 'social-proof-toast';
  toast.id = 'social-proof-toast';
  document.body.appendChild(toast);

  let idx = 0;
  const minuteOptions = [2, 3, 5, 7, 8, 12, 15];

  function showNext() {
    const data = SOCIAL_PROOF_DATA[idx % SOCIAL_PROOF_DATA.length];
    const mins = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];

    toast.innerHTML = `
      <div class="sp-avatar">${data.avatar}</div>
      <div class="sp-content">
        <div class="sp-name">${data.name} – ${data.city}</div>
        <div class="sp-action">vừa đặt mua <span class="sp-product">${data.emoji} ${data.product}</span></div>
        <div class="sp-time">⏱ ${mins} phút trước</div>
      </div>`;

    toast.classList.add('show');
    idx++;

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }

  // First show after 6 seconds, then every 12 seconds
  setTimeout(() => {
    showNext();
    setInterval(showNext, 12000);
  }, 6000);
}

// ===== 4. 3D CARD TILT EFFECT =====
function initCardTilt() {
  function applyTilt(card) {
    // Add shine layer
    if (!card.querySelector('.tilt-shine')) {
      const shine = document.createElement('div');
      shine.className = 'tilt-shine';
      card.appendChild(shine);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
      card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
      card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 40px rgba(50,224,196,0.25)`;

      // Move shine
      const shine = card.querySelector('.tilt-shine');
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.18), transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s ease';
      card.style.boxShadow = '';
    });
  }

  // Apply to existing cards and watch for new ones
  function attachToCards() {
    document.querySelectorAll('.product-card:not([data-tilt])').forEach(card => {
      card.setAttribute('data-tilt', '1');
      applyTilt(card);
    });
  }

  attachToCards();

  // For dynamically rendered cards
  const observer = new MutationObserver(attachToCards);
  const grid = document.getElementById('products-grid');
  if (grid) observer.observe(grid, { childList: true });
}

// ===== 5. LIVE SEARCH WITH INSTANT FILTER =====
function initLiveSearch() {
  // Insert search bar before filter buttons
  const filterDiv = document.getElementById('products-filter');
  if (!filterDiv) return;

  const searchWrapper = document.createElement('div');
  searchWrapper.className = 'search-wrapper';
  searchWrapper.innerHTML = `
    <input type="text" class="search-input" id="product-search" placeholder="🔍 Tìm kiếm sản phẩm... (vd: tinh chất, Thiên Mộc)">`;

  const resultCount = document.createElement('div');
  resultCount.className = 'search-result-count';
  resultCount.id = 'search-result-count';

  filterDiv.parentNode.insertBefore(searchWrapper, filterDiv);
  filterDiv.parentNode.insertBefore(resultCount, filterDiv);

  let activeCategory = 'all';

  const searchInput = document.getElementById('product-search');
  searchInput.addEventListener('input', () => {
    renderSearchResults(searchInput.value.trim(), activeCategory);
  });

  // Patch filterProducts to work with search
  const _origFilter = window.filterProducts;
  window.filterProducts = function(cat, btn) {
    activeCategory = cat;
    _origFilter(cat, btn);
    // Re-apply search if there's an active query
    const q = searchInput?.value.trim();
    if (q) renderSearchResults(q, cat);
  };
}

function renderSearchResults(query, category = 'all') {
  const countEl = document.getElementById('search-result-count');
  if (!query) {
    if (countEl) countEl.textContent = '';
    return;
  }

  const qNorm = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const filtered = PRODUCTS.filter(p => {
    const inCat = category === 'all' || p.category === category;
    const searchText = (p.name + ' ' + p.shortDesc + ' ' + p.badgeLabel).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return inCat && searchText.includes(qNorm);
  });

  // Render filtered results with highlighted text
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-products" style="grid-column:1/-1;text-align:center;padding:60px 0;">
        <span style="font-size:3rem;display:block;margin-bottom:16px;">🔍</span>
        <p>Không tìm thấy sản phẩm phù hợp với "<strong>${query}</strong>"</p>
      </div>`;
    if (countEl) countEl.textContent = `Không tìm thấy kết quả cho "${query}"`;
    return;
  }

  if (countEl) {
    countEl.innerHTML = `Tìm thấy <strong style="color:var(--accent);">${filtered.length}</strong> sản phẩm phù hợp với "<em>${query}</em>"`;
  }

  function highlight(text, q) {
    if (!q) return text;
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark style="background:rgba(50,224,196,0.25);color:var(--accent);border-radius:3px;padding:0 2px;">$1</mark>');
  }

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card reveal visible" style="animation-delay:${i * 0.06}s">
      <div class="product-img-wrap">
        <span class="product-emoji">${p.emoji}</span>
        <span class="product-badge ${p.badge}">${p.badgeLabel}</span>
      </div>
      <div class="product-card-body">
        <h3>${highlight(p.name, query)}</h3>
        <p>${highlight(p.shortDesc, query)}</p>
        <div class="product-footer">
          <div>
            <div class="product-price">${formatPrice(p.price)}<span>${p.unit}</span></div>
          </div>
          <div style="display:flex;gap:8px;flex-direction:column;">
            <button class="add-to-cart-btn" onclick="addToCart(${p.id})">+ Thêm giỏ</button>
            <button class="view-detail-btn" onclick="openProductDetail(${p.id})">Chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Re-apply tilt
  setTimeout(() => initCardTilt(), 50);
}

// ===== 6. BACK TO TOP BUTTON – ĐÃ TẮT =====
// function initBackToTop() { ... }

// ===== 7. SKELETON LOADING =====
function showProductSkeletons() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = Array(6).fill(`
    <div class="skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text-sm"></div>
        <div class="skeleton skeleton-price"></div>
      </div>
    </div>`).join('');
}

// ===== 8. FILTER BADGE COUNTS =====
function initFilterCounts() {
  const counts = {
    all: PRODUCTS.length,
    aqua: PRODUCTS.filter(p => p.category === 'aqua').length,
    health: PRODUCTS.filter(p => p.category === 'health').length,
    food: PRODUCTS.filter(p => p.category === 'food').length
  };

  document.querySelectorAll('.filter-btn').forEach(btn => {
    const onclick = btn.getAttribute('onclick') || '';
    const match = onclick.match(/'([^']+)'/);
    if (!match) return;
    const cat = match[1];
    const count = counts[cat];
    if (count !== undefined) {
      btn.innerHTML += ` <span class="filter-count">${count}</span>`;
    }
  });
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  // Show skeletons briefly before products load
  showProductSkeletons();
  setTimeout(() => {
    window.renderProducts('all');
    // initCardTilt(); // 3D tilt đã tắt
  }, 700);

  initAnimatedCounters();
  // initSocialProof(); // 👈 Tắt tạm – bật lại khi bắt đầu bán hàng
  initLiveSearch();
  // initBackToTop(); // đã tắt
  initFilterCounts();
});
