// ===== PRODUCT DATA =====
const PRODUCTS = [
  {
    id: 1,
    emoji: '🐟',
    name: 'Tinh chất đạm cá biển',
    category: 'aqua',
    badge: 'badge-aqua',
    badgeLabel: 'Thủy sản',
    price: 320000,
    unit: '/lít',
    shortDesc: 'Sản phẩm hữu cơ vi sinh dùng bổ sung dinh dưỡng cho cây trồng và vật nuôi.',
    fullDesc: 'Tinh chất đạm cá biển được chiết xuất từ cá biển tươi bằng công nghệ thủy phân sinh học. Sản phẩm chứa hàm lượng đạm amin tự do (Free Amino Acid) cao, dễ hấp thu, cung cấp dinh dưỡng tổng hợp cho cây trồng và vật nuôi. Hoàn toàn hữu cơ, không hóa chất tổng hợp.',
    ingredients: ['Cá biển tươi', 'Enzyme thủy phân sinh học', 'Khoáng chất vi lượng'],
    usage: 'Pha loãng 1:200 với nước tưới cây hoặc bổ sung vào thức ăn gia súc. Dùng 2 lần/tuần. Không sử dụng trực tiếp chưa pha loãng.',
    specs: 'Protein: 45-55% | pH: 5.5-6.5 | Đạm tổng: ≥50 g/L',
    target: 'Cây trồng, gia súc, gia cầm, thủy sản'
  },
  {
    id: 2,
    emoji: '🦈',
    name: 'Dịch cá biển',
    category: 'aqua',
    badge: 'badge-aqua',
    badgeLabel: 'Thủy sản',
    price: 180000,
    unit: '/lít',
    shortDesc: 'Nguyên liệu thức ăn thủy sản và gia súc, gia cầm – giàu đạm và khoáng chất.',
    fullDesc: 'Dịch cá biển được sản xuất từ cá biển tươi qua quá trình thủy phân enzyme và cô đặc. Sản phẩm có hàm lượng protein cao, bổ dưỡng, giúp tăng trưởng nhanh và nâng cao sức đề kháng cho gia súc, gia cầm và thủy sản. Là nguồn nguyên liệu đầu vào lý tưởng thay thế bột cá.',
    ingredients: ['Cá biển tươi', 'Enzyme thủy phân', 'Muối'],
    usage: 'Phối trộn vào thức ăn tổng hợp với tỉ lệ 5-10% tùy loại vật nuôi. Bảo quản nơi thoáng mát.',
    specs: 'Protein: 40-50% | Độ ẩm: ≤10% | Mùi tanh đặc trưng',
    target: 'Cá tôm, heo, gà, vịt, bò'
  },
  {
    id: 3,
    emoji: '🍶',
    name: 'Nước mắm truyền thống',
    category: 'food',
    badge: 'badge-food',
    badgeLabel: 'Thực phẩm',
    price: 95000,
    unit: '/chai',
    shortDesc: 'Cá biển + muối lên men truyền thống – hương vị đậm đà, nguyên chất 100%.',
    fullDesc: 'Nước mắm truyền thống được sản xuất theo phương pháp lên men cổ truyền từ cá biển và muối tinh. Ủ trong chum sành 12-18 tháng để đạt độ ngon và đạm tự nhiên cao nhất. Màu sắc đỏ nâu đẹp, hương thơm nồng nàn, vị ngọt hậu đặc trưng.',
    ingredients: ['Cá biển tươi (cá cơm, cá nục)', 'Muối biển tinh khiết'],
    usage: 'Dùng trực tiếp khi chấm, nêm nếm hoặc chế biến các món ăn. Sau khi mở, bảo quản ở nơi thoáng mát.',
    specs: 'Đạm: 25-35°N | Màu: Đỏ nâu đặc trưng | Thời hạn: 24 tháng',
    target: 'Gia đình, nhà hàng, cơ sở chế biến thực phẩm'
  },
  {
    id: 4,
    emoji: '💊',
    name: 'AZProTM – Bột protein dinh dưỡng',
    category: 'aqua',
    badge: 'badge-aqua',
    badgeLabel: 'Dinh dưỡng',
    price: 450000,
    unit: '/hộp',
    shortDesc: 'Bột dinh dưỡng protein cao cấp dành cho người – giàu amino acid thiết yếu.',
    fullDesc: 'AZProTM là sản phẩm bột protein tinh chế từ nguồn cá biển và thực vật, dành cho người dùng hàng ngày. Cung cấp đầy đủ 9 amino acid thiết yếu, hỗ trợ phát triển cơ bắp, phục hồi sức khỏe và tăng cường miễn dịch. Phù hợp cho người tập thể thao, người cao tuổi và người hồi phục bệnh.',
    ingredients: ['Protein cá biển thủy phân', 'Protein đậu nành', 'Vitamin tổng hợp', 'Khoáng chất'],
    usage: 'Hòa tan 2 thìa (30g) vào 200ml nước hoặc sữa. Uống 1-2 lần/ngày, tốt nhất sau bữa ăn hoặc sau tập luyện.',
    specs: 'Protein: 80% | Calories: 120kcal/30g | Hương vị: Vani nhẹ | Không đường',
    target: 'Người lớn, người cao tuổi, vận động viên'
  },
  {
    id: 5,
    emoji: '🌿',
    name: 'Gel dạ dày Thiên Mộc',
    category: 'health',
    badge: 'badge-health',
    badgeLabel: 'Thiên Mộc',
    price: 185000,
    unit: '/hộp',
    shortDesc: 'Thảo dược thiên nhiên hỗ trợ giảm đau dạ dày, bảo vệ niêm mạc, giảm ợ hơi, ợ chua.',
    fullDesc: 'Gel dạ dày Thiên Mộc được bào chế từ tổ hợp thảo dược quý như nghệ vàng, lá khôi, mật ong và cam thảo. Dạng gel mịn, thẩm thấu nhanh, bao phủ và bảo vệ niêm mạc dạ dày. Hỗ trợ cải thiện tình trạng đau dạ dày, viêm loét, ợ hơi, ợ chua do acid dạ dày cao.',
    ingredients: ['Nghệ vàng (Curcumin)', 'Lá khôi tía', 'Cam thảo', 'Mật ong rừng', 'Dạ cẩm'],
    usage: 'Uống 2 gói/ngày, uống trước bữa ăn 30 phút. Mỗi gói pha với 100ml nước ấm hoặc uống trực tiếp. Dùng liên tục 30 ngày.',
    specs: 'Dạng gel | 20 gói/hộp | 15ml/gói | Không chất bảo quản',
    target: 'Người bị đau dạ dày, viêm loét, acid dạ dày'
  },
  {
    id: 6,
    emoji: '🫁',
    name: 'Bổ phế Thiên Mộc',
    category: 'health',
    badge: 'badge-health',
    badgeLabel: 'Thiên Mộc',
    price: 195000,
    unit: '/hộp',
    shortDesc: 'Hỗ trợ giảm ho, long đờm, bổ phổi và tăng cường sức đề kháng đường hô hấp.',
    fullDesc: 'Bổ phế Thiên Mộc là sự kết hợp hoàn hảo của các thảo dược thuốc ho truyền thống Việt Nam như cát cánh, bán hạ, bạch quả và lá húng chanh. Sản phẩm giúp làm dịu cổ họng, giảm khô ho, long đờm tự nhiên và tăng cường chức năng phổi. Phù hợp cả người lớn và trẻ em.',
    ingredients: ['Cát cánh', 'Bán hạ', 'Bạch quả', 'Húng chanh', 'Mật ong', 'Quất tươi'],
    usage: 'Uống 2 lần/ngày vào sáng và tối trước khi ngủ. Pha 1 gói với nước ấm. Trẻ em uống 1 gói/ngày.',
    specs: 'Dạng hạt/cốm | 20 gói/hộp | 10g/gói | Hương quất mật ong',
    target: 'Người bị ho, viêm họng, phế quản, hen nhẹ'
  },
  {
    id: 7,
    emoji: '🦴',
    name: 'Xương khớp Thiên Mộc',
    category: 'health',
    badge: 'badge-health',
    badgeLabel: 'Thiên Mộc',
    price: 250000,
    unit: '/hộp',
    shortDesc: 'Hỗ trợ cải thiện đau nhức xương khớp, tái tạo sụn và tăng độ linh hoạt khớp.',
    fullDesc: 'Viên xương khớp Thiên Mộc được chiết xuất từ cao đỗ trọng, độc hoạt, tục đoạn kết hợp với Glucosamine và Collagen Type II. Sản phẩm hỗ trợ tái tạo sụn khớp, giảm viêm và đau nhức, cải thiện độ linh hoạt của khớp. Phù hợp người trung niên, người lao động nặng.',
    ingredients: ['Glucosamine HCl', 'Collagen Type II', 'Đỗ trọng', 'Độc hoạt', 'Tục đoạn', 'Ý dĩ'],
    usage: 'Uống 3 viên/ngày, chia 2-3 lần sau bữa ăn. Uống với nhiều nước. Sử dụng liên tục 2-3 tháng để thấy rõ kết quả.',
    specs: 'Dạng viên nang cứng | 60 viên/hộp | 500mg/viên',
    target: 'Người đau khớp, viêm khớp, thoái hoá khớp, người cao tuổi'
  },
  {
    id: 8,
    emoji: '🌺',
    name: 'UTM Thiên Mộc',
    category: 'health',
    badge: 'badge-health',
    badgeLabel: 'Thiên Mộc',
    price: 280000,
    unit: '/hộp',
    shortDesc: 'Hỗ trợ tăng cường sinh lý, bổ thận tráng dương và tăng cường sức khỏe toàn diện.',
    fullDesc: 'UTM Thiên Mộc là thực phẩm bảo vệ sức khỏe dành cho nam giới, được bào chế từ các thảo dược quý hiếm như nhục thung dung, ba kích thiên, dâm dương hoắc kết hợp với kẽm và magiê. Sản phẩm hỗ trợ cải thiện sinh lý nam, tăng cường năng lượng, giảm mệt mỏi và tăng chất lượng cuộc sống.',
    ingredients: ['Nhục thung dung', 'Ba kích thiên', 'Dâm dương hoắc', 'Kẽm Gluconate', 'Magiê', 'Nhân sâm'],
    usage: 'Uống 2 viên/ngày vào buổi sáng sau ăn. Uống kéo dài ít nhất 30 ngày để thấy hiệu quả rõ rệt.',
    specs: 'Dạng viên nang | 30 viên/hộp | Không dùng cho người dưới 18 tuổi',
    target: 'Nam giới trung niên, người suy nhược, mệt mỏi'
  }
];

// ===== CART STATE =====
// Đọc sản phẩm: admin override trước, fallback hardcoded
function getActiveProducts() {
  const adminProds = localStorage.getItem('aquabio_products_v2');
  return adminProds ? JSON.parse(adminProds) : PRODUCTS;
}

let cart = JSON.parse(localStorage.getItem('aquabio_cart') || '[]');
let checkoutStep = 1;
let selectedPayment = 'cod';
let checkoutData = {};

function saveCart() {
  localStorage.setItem('aquabio_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cart-count');
  if(badge) {
    badge.textContent = total;
    badge.classList.toggle('visible', total > 0);
  }
}

// ===== PARTICLES – Tối ưu performance =====
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Giảm 60 → 30 particles – ít hơn 50% paint
  const COUNT = 30;
  const particles = Array.from({ length: COUNT }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    r:  Math.random() * 1.8 + 0.4,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    alpha: Math.random() * 0.4 + 0.15
  }));

  const CONNECT_DIST = 110;
  let rafId = null;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update vị trí
    particles.forEach(p => {
      p.x = (p.x + p.vx + canvas.width)  % canvas.width;
      p.y = (p.y + p.vy + canvas.height) % canvas.height;
    });

    // Vẽ điểm
    ctx.beginPath();
    particles.forEach(p => {
      ctx.moveTo(p.x + p.r, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    });
    ctx.fillStyle = 'rgba(76,187,133,0.5)';
    ctx.fill();

    // Vẽ đường nối – chỉ kiểm tra cặp gần (O(n²) nhưng n nhỏ hơn nhiều)
    for (let i = 0; i < particles.length - 1; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < CONNECT_DIST * CONNECT_DIST) {
          const alpha = 0.07 * (1 - Math.sqrt(dist2) / CONNECT_DIST);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(76,187,133,${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    rafId = requestAnimationFrame(animate);
  }

  // Tắt particle khi tab ẩn
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    } else {
      if (!rafId) animate();
    }
  });

  animate();
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== HEADER SCROLL – với passive:true =====
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ===== RENDER PRODUCTS =====
function renderProducts(filter = 'all') {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const allProds = getActiveProducts();
  const filtered = filter === 'all' ? allProds : allProds.filter(p => p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="no-products reveal"><span style="font-size:3rem;display:block;margin-bottom:16px;">🔍</span>Không tìm thấy sản phẩm.</div>';
    return;
  }

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card reveal reveal-delay-${(i % 4) + 1}">
      <div class="product-img-wrap" onclick="openProductDetail(${p.id})" style="cursor:pointer;" title="Xem chi tiết ${p.name}">
        ${p.img
          ? `<img src="${p.img}" alt="${p.name}" style="width:90px;height:90px;object-fit:cover;border-radius:12px;margin:auto">`
          : `<span class="product-emoji">${p.emoji}</span>`}
        <span class="product-badge ${p.badge}">${p.badgeLabel}</span>
      </div>
      <div class="product-card-body">
        <h3>${p.name}</h3>
        <p>${p.shortDesc}</p>
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
  
  // Re-observe new reveal elements
  setTimeout(() => {
    document.querySelectorAll('.product-card.reveal:not(.visible)').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
}

// ===== FILTER PRODUCTS =====
function filterProducts(cat, btn) {
  if (btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderProducts(cat);
  
  if (!btn) {
    // Called from category card – scroll to products
    document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
    // Activate proper filter button
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(b => b.classList.remove('active'));
    filterBtns.forEach(b => {
      if ((cat === 'aqua' && b.textContent.includes('Thủy')) ||
          (cat === 'health' && b.textContent.includes('Thiên'))) {
        b.classList.add('active');
      }
    });
  }
}

// ===== PRODUCT DETAIL MODAL =====
function openProductDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  
  document.getElementById('modal-product-name').textContent = p.name;
  document.getElementById('modal-product-emoji').textContent = p.emoji;
  document.getElementById('modal-product-body').innerHTML = `
    <div class="product-detail-grid">
      <div class="detail-section">
        <h4>Mô tả</h4>
        <p>${p.fullDesc}</p>
      </div>
      <div class="detail-section">
        <h4>Thành phần chính</h4>
        <div class="ingredient-tags">
          ${p.ingredients.map(ig => `<span class="ingredient-tag">✓ ${ig}</span>`).join('')}
        </div>
      </div>
      <div class="detail-section">
        <h4>Hướng dẫn sử dụng</h4>
        <p>${p.usage}</p>
      </div>
      <div class="detail-section">
        <h4>Đối tượng sử dụng</h4>
        <p>${p.target}</p>
      </div>
      <div class="detail-section">
        <h4>Thông số kỹ thuật</h4>
        <p>${p.specs}</p>
      </div>
      <div class="detail-price-row">
        <div>
          <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:4px;">Giá bán</div>
          <div class="detail-price">${formatPrice(p.price)}<span style="font-size:1rem;font-family:'Inter',sans-serif;font-weight:400;color:var(--text-muted);"> ${p.unit}</span></div>
        </div>
        <button class="btn btn-primary" onclick="addToCart(${p.id}); closeProductModal();">🛒 Thêm vào giỏ</button>
      </div>
    </div>
  `;
  
  document.getElementById('product-modal').classList.add('open');
}

function closeProductModal(e) {
  if (e && e.target !== document.getElementById('product-modal')) return;
  document.getElementById('product-modal').classList.remove('open');
}

// ===== CART =====
function addToCart(id) {
  const p = getActiveProducts().find(x => x.id === id);
  if (!p) return;
  
  const existing = cart.find(x => x.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  showToast(`${p.emoji} Đã thêm <strong>${p.name}</strong> vào giỏ hàng!`, '✅');
}

function openCart() {
  renderCart();
  document.getElementById('cart-modal').classList.add('open');
}

function closeCart(e) {
  if (e && e.target !== document.getElementById('cart-modal')) return;
  document.getElementById('cart-modal').classList.remove('open');
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <span class="empty-icon">🛒</span>
        <p>Giỏ hàng của bạn đang trống</p>
        <button class="btn btn-primary" style="margin-top:16px;" onclick="closeCart(); scrollToProducts();">Tiếp tục mua sắm</button>
      </div>`;
    return;
  }
  
  const total = getCartTotal();
  container.innerHTML = `
    <div class="cart-items">
      ${cart.map(item => {
        const p = getActiveProducts().find(x => x.id === item.id);
        if (!p) return '';
        // Hiện ảnh upload nếu có, không thì dùng emoji
        const thumb = p.img
          ? `<img src="${p.img}" style="width:44px;height:44px;object-fit:cover;border-radius:8px;flex-shrink:0">`
          : `<span style="font-size:2rem;width:44px;text-align:center;flex-shrink:0">${p.emoji}</span>`;
        return `
          <div class="cart-item">
            ${thumb}
            <div class="cart-item-info">
              <h4>${p.name}</h4>
              <p>${new Intl.NumberFormat('vi-VN').format(p.price)}đ</p>
            </div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">🗑️</button>
          </div>`;
      }).join('')}
    </div>
    <div class="cart-summary">
      <div class="cart-total">
        <span>Tổng cộng (${cart.reduce((s,i)=>s+i.qty,0)} sản phẩm):</span>
        <strong>${formatPrice(total)}</strong>
      </div>
      <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:16px;">🚚 Miễn phí vận chuyển đơn hàng trên 500.000đ</p>
      <button class="btn btn-primary btn-full" onclick="openCheckout()">💳 Thanh toán ngay</button>
    </div>`;
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty = Math.max(0, item.qty + delta);
  if (item.qty === 0) cart = cart.filter(x => x.id !== id);
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart();
  renderCart();
  showToast('Đã xóa sản phẩm khỏi giỏ hàng', '🗑️');
}

// ===== VIETQR =====
function generateVietQR() {
  const total = getCartTotal();
  const shipping = total >= 500000 ? 0 : 35000;
  const amount = total + shipping;
  const orderRef = 'AQUABIO' + Date.now().toString().slice(-6);

  // Đọc cấu hình ngân hàng từ admin (localStorage)
  const cfg = JSON.parse(localStorage.getItem('aquabio_bank_config') || '{}');
  const bankId  = cfg.bankId  || 'VCB';          // mặc định Vietcombank
  const acctNo  = cfg.acctNo  || '1234567890';   // STK mặc định
  const acctName= encodeURIComponent(cfg.acctName || 'AQUABIO VIET NAM');
  const desc    = encodeURIComponent(`${orderRef} THANH TOAN DON HANG`);

  const qrUrl = `https://img.vietqr.io/image/${bankId}-${acctNo}-compact2.png?amount=${amount}&addInfo=${desc}&accountName=${acctName}`;

  return `
    <img src="${qrUrl}" alt="VietQR"
      style="width:220px;height:220px;border-radius:12px;border:3px solid rgba(76,187,133,0.4);margin:0 auto;display:block"
      onerror="this.outerHTML='<div style=\\'padding:20px;color:var(--text-muted);font-size:0.82rem\\'>⚠️ Vui lòng cấu hình tài khoản ngân hàng trong Admin Panel (can.html)</div>'"
    >
    <div style="margin-top:10px;font-size:0.8rem;color:var(--text-muted)">
      🏦 ${cfg.bankName || 'Vietcombank'} &nbsp;·&nbsp; STK: <strong style="color:var(--text)">${acctNo}</strong>
    </div>
    <div style="font-size:0.88rem;color:var(--gold);font-weight:700;margin-top:6px">
      💰 ${new Intl.NumberFormat('vi-VN').format(amount)}đ
    </div>
  `;
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

// ===== CHECKOUT =====
function openCheckout() {
  closeCart();
  checkoutStep = 1;
  selectedPayment = 'cod';
  checkoutData = {};
  renderCheckoutStep();
  document.getElementById('checkout-modal').classList.add('open');
}

function closeCheckout(e) {
  if (e && e.target !== document.getElementById('checkout-modal')) return;
  document.getElementById('checkout-modal').classList.remove('open');
}

function updateStepUI() {
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById(`step-${i}`);
    el.className = 'checkout-step';
    if (i < checkoutStep) el.classList.add('done');
    else if (i === checkoutStep) el.classList.add('active');
  }
}

function renderCheckoutStep() {
  updateStepUI();
  const content = document.getElementById('checkout-content');
  
  if (checkoutStep === 1) {
    content.innerHTML = `
      <h4 style="margin-bottom:20px;font-family:'Inter',sans-serif;">Thông tin giao hàng</h4>
      <div class="form-grid-2">
        <div class="form-group">
          <label>Họ và tên *</label>
          <input type="text" id="f-name" placeholder="Nguyễn Văn A" value="${checkoutData.name||''}">
        </div>
        <div class="form-group">
          <label>Số điện thoại *</label>
          <input type="tel" id="f-phone" placeholder="0901 234 567" value="${checkoutData.phone||''}">
        </div>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="f-email" placeholder="email@example.com" value="${checkoutData.email||''}">
      </div>
      <div class="form-group">
        <label>Địa chỉ giao hàng *</label>
        <input type="text" id="f-address" placeholder="Số nhà, đường, phường/xã..." value="${checkoutData.address||''}">
      </div>
      <div class="form-grid-2">
        <div class="form-group">
          <label>Quận/Huyện</label>
          <input type="text" id="f-district" placeholder="Quận 1" value="${checkoutData.district||''}">
        </div>
        <div class="form-group">
          <label>Tỉnh/Thành phố</label>
          <select id="f-city">
            <option>TP. Hồ Chí Minh</option>
            <option>Hà Nội</option>
            <option>Đà Nẵng</option>
            <option>Cần Thơ</option>
            <option>Tỉnh khác</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Ghi chú</label>
        <textarea id="f-note" placeholder="Ghi chú đặc biệt cho đơn hàng...">${checkoutData.note||''}</textarea>
      </div>
      <div class="checkout-nav">
        <button class="btn btn-outline" onclick="closeCheckout()">Huỷ</button>
        <button class="btn btn-primary" onclick="nextCheckoutStep()">Tiếp theo →</button>
      </div>`;
  
  } else if (checkoutStep === 2) {
    content.innerHTML = `
      <h4 style="margin-bottom:20px;font-family:'Inter',sans-serif;">Phương thức thanh toán</h4>
      <div class="payment-methods">
        <div class="payment-method ${selectedPayment==='cod'?'selected':''}" onclick="selectPayment('cod',this)">
          <span class="pm-icon">💵</span>
          <div class="pm-name">Thanh toán khi nhận hàng</div>
          <div class="pm-desc">COD – Trả tiền mặt</div>
        </div>
        <div class="payment-method ${selectedPayment==='momo'?'selected':''}" onclick="selectPayment('momo',this)">
          <span class="pm-icon">💜</span>
          <div class="pm-name">MoMo</div>
          <div class="pm-desc">Ví điện tử MoMo</div>
        </div>
        <div class="payment-method ${selectedPayment==='vnpay'?'selected':''}" onclick="selectPayment('vnpay',this)">
          <span class="pm-icon">🏦</span>
          <div class="pm-name">VNPay</div>
          <div class="pm-desc">Cổng thanh toán VNPay</div>
        </div>
        <div class="payment-method ${selectedPayment==='bank'?'selected':''}" onclick="selectPayment('bank',this)">
          <span class="pm-icon">🏧</span>
          <div class="pm-name">Chuyển khoản</div>
          <div class="pm-desc">Internet Banking</div>
        </div>
      </div>
      ${selectedPayment === 'bank' ? `
        <div style="background:rgba(76,187,133,0.06);border:1px solid rgba(76,187,133,0.2);border-radius:16px;padding:20px;margin-top:20px;text-align:center">
          <h4 style="font-family:'Inter',sans-serif;font-size:0.9rem;margin-bottom:4px">📲 Quét mã QR để thanh toán</h4>
          <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:16px">Số tiền tự động điền – quét bằng app ngân hàng bất kỳ</p>
          ${generateVietQR()}
          <p style="font-size:0.75rem;color:var(--text-muted);margin-top:12px">
            💡 Nội dung chuyển khoản: <strong style="color:var(--accent)" id="qr-order-ref">AQUABIO-${Date.now().toString().slice(-6)}</strong>
          </p>
          <!-- UPLOAD CHỨNG TỪ THANH TOÁN -->
          <div style="margin-top:20px;border-top:1px solid rgba(76,187,133,0.2);padding-top:16px;text-align:left">
            <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:10px">
              📸 <strong style="color:var(--text-white)">Tải lên ảnh chứng từ chuyển khoản</strong> (tuỳ chọn – giúp admin xác nhận nhanh hơn)
            </p>
            <label for="payment-proof-upload" style="
              display:inline-flex;align-items:center;gap:8px;cursor:pointer;
              background:rgba(76,187,133,0.12);border:1px dashed rgba(76,187,133,0.5);
              border-radius:10px;padding:10px 16px;font-size:0.82rem;color:var(--accent);
              transition:background 0.2s">
              📂 Chọn ảnh chứng từ
            </label>
            <input type="file" id="payment-proof-upload" accept="image/*" style="display:none"
              onchange="previewPaymentProof(this)">
            <div id="payment-proof-preview" style="margin-top:12px;display:none;text-align:center">
              <img id="payment-proof-img" style="max-width:200px;max-height:200px;border-radius:10px;border:2px solid rgba(76,187,133,0.4);object-fit:cover">
              <div style="font-size:0.75rem;color:var(--accent);margin-top:6px">✅ Đã tải ảnh chứng từ</div>
            </div>
            <div style="margin-top:12px;padding:10px 14px;background:rgba(232,196,106,0.08);border-left:3px solid var(--gold);border-radius:0 8px 8px 0;font-size:0.78rem;color:var(--text-muted)">
              ⏳ Sau khi đặt hàng, đơn sẽ ở trạng thái <strong style="color:var(--gold)">Chờ admin xác nhận</strong>. Chúng tôi sẽ liên hệ trong 30 phút.
            </div>
          </div>
        </div>` : ''}
      <div class="checkout-nav" style="margin-top:24px;">
        <button class="btn btn-outline" onclick="checkoutStep=1;renderCheckoutStep()">← Quay lại</button>
        <button class="btn btn-primary" onclick="nextCheckoutStep()">Xác nhận →</button>
      </div>`;
  
  } else if (checkoutStep === 3) {
    const total = getCartTotal();
    const shipping = total >= 500000 ? 0 : 35000;
    content.innerHTML = `
      <h4 style="margin-bottom:20px;font-family:'Inter',sans-serif;">Xác nhận đơn hàng</h4>
      <div class="order-review">
        ${cart.map(item => {
          const p = PRODUCTS.find(x => x.id === item.id);
          return `<div class="order-review-item"><span>${p.emoji} ${p.name} x${item.qty}</span><strong>${formatPrice(p.price * item.qty)}</strong></div>`;
        }).join('')}
        <div class="order-review-item"><span>Phí vận chuyển</span><strong>${shipping === 0 ? 'Miễn phí 🎉' : formatPrice(shipping)}</strong></div>
        <div class="order-review-item"><span>Phương thức thanh toán</span><strong>${getPaymentName(selectedPayment)}</strong></div>
        <div class="order-review-item"><span>Giao đến</span><strong>${checkoutData.address || ''}, ${checkoutData.city || 'TP. HCM'}</strong></div>
      </div>
      <div class="order-review-total">
        <span>Tổng thanh toán:</span>
        <strong>${formatPrice(total + shipping)}</strong>
      </div>
      <div class="checkout-nav" style="margin-top:24px;">
        <button class="btn btn-outline" onclick="checkoutStep=2;renderCheckoutStep()">← Quay lại</button>
        <button class="btn btn-accent" onclick="placeOrder()">✅ Đặt hàng ngay</button>
      </div>`;
  }
}

function nextCheckoutStep() {
  if (checkoutStep === 1) {
    const name = document.getElementById('f-name').value.trim();
    const phone = document.getElementById('f-phone').value.trim();
    const address = document.getElementById('f-address').value.trim();
    if (!name || !phone || !address) {
      showToast('Vui lòng điền đầy đủ thông tin bắt buộc!', '⚠️');
      return;
    }
    checkoutData = {
      name,
      phone,
      email: document.getElementById('f-email').value,
      address,
      district: document.getElementById('f-district').value,
      city: document.getElementById('f-city').value,
      note: document.getElementById('f-note').value
    };
  }
  checkoutStep++;
  renderCheckoutStep();
}

function selectPayment(method, el) {
  selectedPayment = method;
  document.querySelectorAll('.payment-method').forEach(x => x.classList.remove('selected'));
  el.classList.add('selected');
  
  // Re-render to show bank info if needed
  if (method === 'bank' || method !== 'bank') {
    renderCheckoutStep();
    // Re-select the clicked one
    setTimeout(() => {
      document.querySelectorAll('.payment-method').forEach(m => {
        if (m.querySelector('.pm-name').textContent.includes(getPaymentNameShort(method))) {
          m.classList.add('selected');
        }
      });
    }, 10);
  }
}

function getPaymentName(method) {
  const map = { cod: '💵 Thanh toán khi nhận hàng', momo: '💜 Ví MoMo', vnpay: '🏦 VNPay', bank: '🏧 Chuyển khoản ngân hàng' };
  return map[method] || method;
}

function getPaymentNameShort(method) {
  const map = { cod: 'COD', momo: 'MoMo', vnpay: 'VNPay', bank: 'ngân hàng' };
  return map[method] || method;
}

// Preview ảnh chứng từ chuyển khoản
let _paymentProofBase64 = null;
function previewPaymentProof(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    _paymentProofBase64 = e.target.result;
    const preview = document.getElementById('payment-proof-preview');
    const img     = document.getElementById('payment-proof-img');
    if (preview && img) { img.src = e.target.result; preview.style.display = 'block'; }
  };
  reader.readAsDataURL(file);
}

function placeOrder() {
  const orderId = 'AB' + Date.now().toString().slice(-6);

  // Lưu đơn hàng vào localStorage để admin nhận realtime
  const orderItems = cart.map(item => {
    const p = getActiveProducts().find(x => x.id === item.id);
    return p ? { name: p.name, emoji: p.emoji, qty: item.qty, price: p.price } : null;
  }).filter(Boolean);
  const total = getCartTotal();
  const shipping = total >= 500000 ? 0 : 35000;
  const newOrder = {
    id: orderId,
    status: 'pending',
    createdAt: Date.now(),
    customer: {
      name:    checkoutData.name,
      phone:   checkoutData.phone,
      address: `${checkoutData.address || ''}, ${checkoutData.district || ''}, ${checkoutData.city || 'TP. Hồ Chí Minh'}`,
      note:    checkoutData.note || ''
    },
    items:        orderItems,
    payment:      selectedPayment,
    total:        total + shipping,
    shipping:     shipping,
    paymentProof: selectedPayment === 'bank' && _paymentProofBase64 ? _paymentProofBase64 : null
  };
  _paymentProofBase64 = null;  // reset sau khi lưu
  const existingOrders = JSON.parse(localStorage.getItem('aquabio_orders') || '[]');
  existingOrders.unshift(newOrder);   // mới nhất lên đầu
  localStorage.setItem('aquabio_orders', JSON.stringify(existingOrders));

  // UI thành công
  const content = document.getElementById('checkout-content');
  content.innerHTML = `
    <div class="success-animation">
      <span class="success-icon">🎉</span>
      <h3>Đặt hàng thành công!</h3>
      <p>Mã đơn hàng: <strong style="color:var(--accent);">#${orderId}</strong></p>
      <p>Cảm ơn <strong style="color:var(--text-white);">${checkoutData.name}</strong>! Chúng tôi sẽ liên hệ xác nhận qua SĐT <strong style="color:var(--accent);">${checkoutData.phone}</strong> trong vòng 30 phút.</p>
      <button class="btn btn-primary" style="margin-top:16px;" onclick="closeCheckout(); clearCart();">OK, Tiếp tục mua sắm</button>
    </div>`;

  document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.checkout-step').forEach(s => s.classList.add('done'));
  showToast(`🎉 Đặt hàng #${orderId} thành công!`, '✅');
}

function clearCart() {
  cart = [];
  saveCart();
}

// ===== TESTIMONIAL SLIDER =====
let currentSlide = 0;
function goToSlide(idx) {
  currentSlide = idx;
  const track = document.getElementById('testimonials-track');
  const cardWidth = track.children[0]?.offsetWidth || 360;
  track.style.transform = `translateX(-${idx * (cardWidth + 24)}px)`;
  
  document.querySelectorAll('.slider-dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}

function initSliderAuto() {
  setInterval(() => {
    const track = document.getElementById('testimonials-track');
    if (!track) return;
    const total = document.querySelectorAll('.slider-dot').length;
    goToSlide((currentSlide + 1) % total);
  }, 5000);
}

// ===== UTILS =====
function formatPrice(n) {
  return n.toLocaleString('vi-VN') + 'đ';
}

function scrollToProducts() {
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function openChatbot() {
  document.getElementById('chatbot-window').classList.add('open');
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  document.getElementById('mobile-nav').classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobile-nav').classList.remove('open');
}

// ===== TOAST =====
function showToast(msg, icon = '✅') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initScrollReveal();
  initHeaderScroll();
  renderProducts('all');
  updateCartCount();
  initSliderAuto();
});
