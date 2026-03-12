// ===== ADMIN PANEL – can.js =====

// -------- AUTH --------
const ADMIN_KEY = 'aquabio_admin_auth';
const ADMIN_PASS = 'xxx';   // đổi mật khẩu tại đây

function login() {
  const pass = document.getElementById('admin-pass').value;
  if (pass === ADMIN_PASS) {
    localStorage.setItem(ADMIN_KEY, '1');
    showApp();
  } else {
    document.getElementById('login-err').textContent = '❌ Mật khẩu không đúng. Thử lại!';
    setTimeout(() => document.getElementById('login-err').textContent = '', 3000);
  }
}

function logout() {
  localStorage.removeItem(ADMIN_KEY);
  location.reload();
}

function checkAuth() {
  if (localStorage.getItem(ADMIN_KEY)) { showApp(); }
}

function showApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-app').classList.add('active');
  initDashboard();
  initProductsTab();
  initContentTab();
  initBlogTab();
  // Khởi động orders polling + 2FA (được định nghĩa ở cuối file)
  if (typeof startOrderPolling === 'function') startOrderPolling();
  if (typeof load2FAState === 'function') load2FAState();
}

// -------- ADMIN TOAST --------
function adminToast(msg, type = 'success') {
  const t = document.getElementById('admin-toast');
  t.textContent = (type === 'success' ? '✅ ' : '❌ ') + msg;
  t.className = `admin-toast show ${type}`;
  setTimeout(() => t.classList.remove('show'), 3000);
}

// -------- PRODUCTS DATA --------
const BASE_PRODUCTS = [
  { id: 1, emoji: '🐟', name: 'Tinh chất đạm cá biển', category: 'aqua', badge: 'badge-aqua', badgeLabel: 'Thủy sản', price: 320000, unit: '/lít', shortDesc: 'Sản phẩm hữu cơ vi sinh dùng bổ sung dinh dưỡng cho cây trồng và vật nuôi.', fullDesc: 'Tinh chất đạm cá biển được chiết xuất từ cá biển tươi bằng công nghệ thủy phân sinh học...', ingredients: ['Cá biển tươi', 'Enzyme thủy phân sinh học', 'Khoáng chất vi lượng'], usage: 'Pha loãng 1:200 với nước tưới cây. Dùng 2 lần/tuần.', specs: 'Protein: 45-55% | pH: 5.5-6.5', target: 'Cây trồng, gia súc, thủy sản' },
  { id: 2, emoji: '🦈', name: 'Dịch cá biển', category: 'aqua', badge: 'badge-aqua', badgeLabel: 'Thủy sản', price: 180000, unit: '/lít', shortDesc: 'Nguyên liệu thức ăn thủy sản và gia súc giàu đạm và khoáng chất.', fullDesc: 'Dịch cá biển được sản xuất từ cá biển tươi qua quá trình thủy phân enzyme...', ingredients: ['Cá biển tươi', 'Enzyme thủy phân', 'Muối'], usage: 'Phối trộn vào thức ăn 5-10%.', specs: 'Protein: 40-50% | Độ ẩm: ≤10%', target: 'Cá tôm, heo, gà, vịt, bò' },
  { id: 3, emoji: '🍶', name: 'Nước mắm truyền thống', category: 'food', badge: 'badge-food', badgeLabel: 'Thực phẩm', price: 95000, unit: '/chai', shortDesc: 'Cá biển + muối lên men truyền thống – hương vị đậm đà, nguyên chất 100%.', fullDesc: 'Nước mắm truyền thống được sản xuất theo phương pháp lên men cổ truyền...', ingredients: ['Cá biển tươi', 'Muối biển tinh khiết'], usage: 'Dùng trực tiếp khi chấm, nêm nếm.', specs: 'Đạm: 25-35°N | Thời hạn: 24 tháng', target: 'Gia đình, nhà hàng' },
  { id: 4, emoji: '💊', name: 'AZProTM – Bột protein dinh dưỡng', category: 'aqua', badge: 'badge-aqua', badgeLabel: 'Dinh dưỡng', price: 450000, unit: '/hộp', shortDesc: 'Bột dinh dưỡng protein cao cấp dành cho người – giàu amino acid thiết yếu.', fullDesc: 'AZProTM là sản phẩm bột protein tinh chế từ nguồn cá biển và thực vật...', ingredients: ['Protein cá biển thủy phân', 'Protein đậu nành', 'Vitamin tổng hợp'], usage: 'Hòa 2 thìa (30g) vào 200ml nước. Uống 1-2 lần/ngày.', specs: 'Protein: 80% | Calories: 120kcal/30g', target: 'Người lớn, vận động viên' },
  { id: 5, emoji: '🌿', name: 'Gel dạ dày Thiên Mộc', category: 'health', badge: 'badge-health', badgeLabel: 'Thiên Mộc', price: 185000, unit: '/hộp', shortDesc: 'Thảo dược thiên nhiên hỗ trợ giảm đau dạ dày, bảo vệ niêm mạc.', fullDesc: 'Gel dạ dày Thiên Mộc được bào chế từ tổ hợp thảo dược quý...', ingredients: ['Nghệ vàng', 'Lá khôi tía', 'Cam thảo', 'Mật ong rừng'], usage: 'Uống 2 gói/ngày trước bữa ăn 30 phút.', specs: 'Dạng gel | 20 gói/hộp | 15ml/gói', target: 'Người bị đau dạ dày' },
  { id: 6, emoji: '🫁', name: 'Bổ phế Thiên Mộc', category: 'health', badge: 'badge-health', badgeLabel: 'Thiên Mộc', price: 195000, unit: '/hộp', shortDesc: 'Hỗ trợ giảm ho, long đờm, bổ phổi và tăng cường sức đề kháng.', fullDesc: 'Bổ phế Thiên Mộc là sự kết hợp của các thảo dược thuốc ho truyền thống...', ingredients: ['Cát cánh', 'Bán hạ', 'Bạch quả', 'Húng chanh', 'Mật ong'], usage: 'Uống 2 lần/ngày sáng và tối.', specs: 'Dạng hạt/cốm | 20 gói/hộp', target: 'Người bị ho, viêm họng' },
  { id: 7, emoji: '🦴', name: 'Xương khớp Thiên Mộc', category: 'health', badge: 'badge-health', badgeLabel: 'Thiên Mộc', price: 250000, unit: '/hộp', shortDesc: 'Hỗ trợ cải thiện đau nhức xương khớp, tái tạo sụn.', fullDesc: 'Viên xương khớp Thiên Mộc được chiết xuất từ cao đỗ trọng...', ingredients: ['Glucosamine HCl', 'Collagen Type II', 'Đỗ trọng'], usage: 'Uống 3 viên/ngày sau bữa ăn.', specs: 'Dạng viên nang | 60 viên/hộp | 500mg/viên', target: 'Người đau khớp, người cao tuổi' },
  { id: 8, emoji: '🌺', name: 'UTM Thiên Mộc', category: 'health', badge: 'badge-health', badgeLabel: 'Thiên Mộc', price: 280000, unit: '/hộp', shortDesc: 'Hỗ trợ tăng cường sinh lý, bổ thận tráng dương.', fullDesc: 'UTM Thiên Mộc là thực phẩm bảo vệ sức khỏe dành cho nam giới...', ingredients: ['Nhục thung dung', 'Ba kích thiên', 'Dâm dương hoắc', 'Kẽm Gluconate'], usage: 'Uống 2 viên/ngày buổi sáng sau ăn.', specs: 'Dạng viên nang | 30 viên/hộp', target: 'Nam giới trung niên' }
];

function getProducts() {
  const saved = localStorage.getItem('aquabio_admin_products');
  return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(BASE_PRODUCTS));
}
function saveProducts(prods) {
  localStorage.setItem('aquabio_admin_products', JSON.stringify(prods));
  localStorage.setItem('aquabio_products_v2', JSON.stringify(prods)); // sync main site
}

// -------- DASHBOARD --------
function initDashboard() {
  const prods = getProducts();
  const blogs = getBlogs();
  document.getElementById('stat-products').textContent = prods.length;
  document.getElementById('stat-blogs').textContent = blogs.length;
  document.getElementById('stat-cats').textContent = [...new Set(prods.map(p => p.category))].length;
  document.getElementById('stat-revenue').textContent = new Intl.NumberFormat('vi-VN').format(prods.reduce((s, p) => s + p.price, 0)) + 'đ';
}

// -------- NAV --------
function navigate(page) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.page-view').forEach(v => v.style.display = 'none');
  document.getElementById(`page-${page}`).style.display = 'block';
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  if (page === 'settings') loadBankConfig();
}

// -------- BANK CONFIG --------
function loadBankConfig() {
  const cfg = JSON.parse(localStorage.getItem('aquabio_bank_config') || '{}');
  if (cfg.bankId) { const sel = document.getElementById('set-bank-id'); if (sel) [...sel.options].forEach(o => o.selected = o.value === cfg.bankId); }
  if (cfg.acctNo) document.getElementById('set-bank-acct').value = cfg.acctNo;
  if (cfg.acctName) document.getElementById('set-bank-name').value = cfg.acctName;
}

function saveBankConfig() {
  // Kiểm tra PIN nếu đang bật
  if (typeof _2faEnabled !== 'undefined' && _2faEnabled && !_2faUnlocked) {
    adminToast('🔐 Cần mở khóa PIN trước khi đổi thông tin ngân hàng!', 'error');
    document.getElementById('twofa-lock-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  const bankId = document.getElementById('set-bank-id').value;
  const acctNo = document.getElementById('set-bank-acct').value.trim().replace(/\s/g, '');
  const acctName = document.getElementById('set-bank-name').value.trim().toUpperCase();
  if (!acctNo || !acctName) { adminToast('Điền đầy đủ số TK và tên chủ TK!', 'error'); return; }

  const bankNames = {
    VCB: 'Vietcombank', TCB: 'Techcombank', MB: 'MB Bank',
    BIDV: 'BIDV', AGRIBANK: 'Agribank', ICB: 'VietinBank',
    ACB: 'ACB', VPB: 'VPBank', TPB: 'TPBank', STB: 'Sacombank',
    SHB: 'SHB', HDB: 'HDBank', VIB: 'VIB', OCB: 'OCB',
    MSB: 'MSB', SEAB: 'SeABank', EIB: 'Eximbank', LPB: 'LienVietPostBank',
    NAB: 'Nam A Bank', BAB: 'BacABank', NCB: 'NCB'
  };
  localStorage.setItem('aquabio_bank_config', JSON.stringify({ bankId, acctNo, acctName, bankName: bankNames[bankId] || bankId }));

  // Show preview QR
  const prev = document.getElementById('bank-preview');
  const img = document.getElementById('bank-qr-preview');
  const qrUrl = `https://img.vietqr.io/image/${bankId}-${acctNo}-compact2.png?accountName=${encodeURIComponent(acctName)}`;
  img.src = qrUrl; prev.style.display = 'block';

  adminToast('Đã lưu tài khoản ngân hàng! VietQR sẽ tự sinh khi checkout.');
}

// -------- PRODUCTS --------
let editingProductId = null;
let uploadedImageData = null;

function initProductsTab() { renderProductsTable(); }

function renderProductsTable(filter = '') {
  const prods = getProducts().filter(p =>
    !filter || p.name.toLowerCase().includes(filter.toLowerCase())
  );
  const tbody = document.getElementById('products-tbody');
  tbody.innerHTML = prods.map(p => `
    <tr>
      <td><span style="font-size:1.8rem">${p.img ? `<img src="${p.img}" style="width:44px;height:44px;object-fit:cover;border-radius:8px;">` : p.emoji}</span></td>
      <td>
        <div style="font-weight:600;font-size:0.88rem">${p.name}</div>
        <div style="font-size:0.76rem;color:var(--muted);margin-top:2px">${p.shortDesc.substring(0, 60)}...</div>
      </td>
      <td><span class="badge ${p.badge}">${p.badgeLabel}</span></td>
      <td style="font-family:'Source Code Pro',monospace;color:var(--gold)">${new Intl.NumberFormat('vi-VN').format(p.price)}đ</td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="btn btn-outline btn-sm" onclick="openEditProduct(${p.id})">✏️ Sửa</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddProduct() {
  editingProductId = null;
  uploadedImageData = null;
  document.getElementById('product-modal-title').textContent = '➕ Thêm sản phẩm mới';
  document.getElementById('pf-emoji').value = '🌿';
  document.getElementById('pf-name').value = '';
  document.getElementById('pf-category').value = 'aqua';
  document.getElementById('pf-price').value = '';
  document.getElementById('pf-unit').value = '/hộp';
  document.getElementById('pf-short').value = '';
  document.getElementById('pf-full').value = '';
  document.getElementById('pf-ingredients').value = '';
  document.getElementById('pf-usage').value = '';
  document.getElementById('pf-specs').value = '';
  document.getElementById('pf-target').value = '';
  document.getElementById('img-preview').style.display = 'none';
  document.getElementById('img-upload-label').textContent = '📁 Nhấn để tải ảnh sản phẩm (JPG/PNG/WebP)';
  document.getElementById('product-modal').classList.add('open');
}

function openEditProduct(id) {
  const p = getProducts().find(x => x.id === id);
  if (!p) return;
  editingProductId = id;
  uploadedImageData = p.img || null;
  document.getElementById('product-modal-title').textContent = '✏️ Chỉnh sửa sản phẩm';
  document.getElementById('pf-emoji').value = p.emoji;
  document.getElementById('pf-name').value = p.name;
  document.getElementById('pf-category').value = p.category;
  document.getElementById('pf-price').value = p.price;
  document.getElementById('pf-unit').value = p.unit;
  document.getElementById('pf-short').value = p.shortDesc;
  document.getElementById('pf-full').value = p.fullDesc;
  document.getElementById('pf-ingredients').value = p.ingredients.join(', ');
  document.getElementById('pf-usage').value = p.usage;
  document.getElementById('pf-specs').value = p.specs;
  document.getElementById('pf-target').value = p.target;
  if (p.img) {
    const prev = document.getElementById('img-preview');
    prev.src = p.img; prev.style.display = 'block';
    document.getElementById('img-upload-label').textContent = '✅ Ảnh đã tải';
  } else {
    document.getElementById('img-preview').style.display = 'none';
    document.getElementById('img-upload-label').textContent = '📁 Nhấn để đổi ảnh sản phẩm';
  }
  document.getElementById('product-modal').classList.add('open');
}

function handleImageUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    uploadedImageData = e.target.result;
    const prev = document.getElementById('img-preview');
    prev.src = uploadedImageData; prev.style.display = 'block';
    document.getElementById('img-upload-label').textContent = `✅ ${file.name}`;
  };
  reader.readAsDataURL(file);
}

function saveProduct() {
  const name = document.getElementById('pf-name').value.trim();
  const price = parseInt(document.getElementById('pf-price').value);
  if (!name || !price) { adminToast('Vui lòng điền đầy đủ Tên và Giá!', 'error'); return; }

  const cat = document.getElementById('pf-category').value;
  const badgeMap = { aqua: 'badge-aqua', health: 'badge-health', food: 'badge-food' };
  const labelMap = { aqua: 'Thủy sản', health: 'Thiên Mộc', food: 'Thực phẩm' };

  const product = {
    id: editingProductId || Date.now(),
    emoji: document.getElementById('pf-emoji').value || '🌿',
    img: uploadedImageData || null,
    name,
    category: cat,
    badge: badgeMap[cat],
    badgeLabel: labelMap[cat],
    price,
    unit: document.getElementById('pf-unit').value || '/hộp',
    shortDesc: document.getElementById('pf-short').value,
    fullDesc: document.getElementById('pf-full').value,
    ingredients: document.getElementById('pf-ingredients').value.split(',').map(s => s.trim()).filter(Boolean),
    usage: document.getElementById('pf-usage').value,
    specs: document.getElementById('pf-specs').value,
    target: document.getElementById('pf-target').value
  };

  let prods = getProducts();
  if (editingProductId) {
    prods = prods.map(p => p.id === editingProductId ? product : p);
    adminToast('Đã cập nhật sản phẩm!');
  } else {
    prods.push(product);
    adminToast('Đã thêm sản phẩm mới!');
  }
  saveProducts(prods);
  closeModal('product-modal');
  renderProductsTable();
  initDashboard();
}

function deleteProduct(id) {
  if (!confirm('Xoá sản phẩm này?')) return;
  const prods = getProducts().filter(p => p.id !== id);
  saveProducts(prods);
  renderProductsTable();
  initDashboard();
  adminToast('Đã xoá sản phẩm.');
}

// -------- SITE CONTENT --------
const CONTENT_FIELDS = [
  { key: 'hero_title', label: 'Hero – Tiêu đề chính', def: 'Tinh hoa từ Biển Cả & Thiên Nhiên' },
  { key: 'hero_sub', label: 'Hero – Mô tả phụ', def: 'Chúng tôi cung cấp các sản phẩm nông nghiệp, thủy sản và sức khỏe chất lượng cao.' },
  { key: 'hero_badge', label: 'Hero – Badge text', def: 'Sản phẩm hữu cơ – Chất lượng xuất khẩu' },
  { key: 'products_title', label: 'Sản phẩm – Tiêu đề section', def: 'Sản phẩm của chúng tôi' },
  { key: 'products_sub', label: 'Sản phẩm – Phụ đề', def: 'Từ đại dương đến bàn ăn của bạn' },
  { key: 'feat1_title', label: 'Tính năng 1 – Tiêu đề', def: '100% Hữu Cơ' },
  { key: 'feat2_title', label: 'Tính năng 2 – Tiêu đề', def: 'Công Nghệ Sinh Học' },
  { key: 'feat3_title', label: 'Tính năng 3 – Tiêu đề', def: 'Chứng Nhận Quốc Tế' },
  { key: 'feat4_title', label: 'Tính năng 4 – Tiêu đề', def: 'Giao Hàng Toàn Quốc' },
  { key: 'cta_title', label: 'CTA Banner – Tiêu đề', def: 'Sẵn sàng nâng cao năng suất?' },
  { key: 'cta_sub', label: 'CTA Banner – Phụ đề', def: 'Liên hệ ngay để được tư vấn miễn phí và nhận báo giá tốt nhất.' },
  { key: 'footer_desc', label: 'Footer – Mô tả thương hiệu', def: 'Doanh nghiệp chuyên cung cấp sản phẩm nông nghiệp sinh học và thực phẩm thiên nhiên chất lượng cao.' },
];

function getContent() {
  const saved = localStorage.getItem('aquabio_content');
  return saved ? JSON.parse(saved) : {};
}
function saveContent(obj) { localStorage.setItem('aquabio_content', JSON.stringify(obj)); }

function initContentTab() {
  const container = document.getElementById('content-fields');
  const content = getContent();
  container.innerHTML = CONTENT_FIELDS.map(f => `
    <div class="content-block">
      <div class="content-block-label">${f.label}</div>
      <textarea class="form-control" id="cf-${f.key}" rows="2" placeholder="${f.def}">${content[f.key] || ''}</textarea>
    </div>
  `).join('');
}

function saveAllContent() {
  const content = {};
  CONTENT_FIELDS.forEach(f => {
    const el = document.getElementById(`cf-${f.key}`);
    if (el && el.value.trim()) content[f.key] = el.value.trim();
  });
  saveContent(content);
  adminToast('Đã lưu nội dung! Reload trang chính để xem thay đổi.');
}

function resetContent() {
  if (!confirm('Khôi phục tất cả nội dung về mặc định?')) return;
  localStorage.removeItem('aquabio_content');
  initContentTab();
  adminToast('Đã khôi phục nội dung mặc định.');
}

// -------- BLOG --------
function getBlogs() {
  const saved = localStorage.getItem('aquabio_blogs');
  return saved ? JSON.parse(saved) : [];
}
function saveBlogs(blogs) { localStorage.setItem('aquabio_blogs', JSON.stringify(blogs)); }

let editingBlogId = null;

function initBlogTab() { renderBlogsTable(); }

function renderBlogsTable() {
  const blogs = getBlogs();
  const tbody = document.getElementById('blogs-tbody');
  if (!blogs.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:32px">Chưa có bài viết nào. Nhấn "+ Thêm bài viết" để bắt đầu.</td></tr>`;
    return;
  }
  tbody.innerHTML = blogs.map(b => `
    <tr>
      <td style="font-weight:600;font-size:0.88rem">${b.title}</td>
      <td><span class="badge badge-aqua">${b.category || 'Chung'}</span></td>
      <td style="font-size:0.78rem;color:var(--muted)">${new Date(b.createdAt).toLocaleDateString('vi-VN')}</td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="btn btn-outline btn-sm" onclick="openEditBlog(${b.id})">✏️ Sửa</button>
          <button class="btn btn-gold btn-sm" onclick="openAIAnalyze(${b.id})">🤖 AI</button>
          <button class="btn btn-danger btn-sm" onclick="deleteBlog(${b.id})">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddBlog() {
  editingBlogId = null;
  document.getElementById('blog-modal-title').textContent = '✍️ Thêm bài viết mới';
  document.getElementById('bf-title').value = '';
  document.getElementById('bf-category').value = 'aqua';
  document.getElementById('bf-summary').value = '';
  document.getElementById('bf-body').value = '';
  document.getElementById('blog-modal').classList.add('open');
}

function openEditBlog(id) {
  const blogs = getBlogs();
  const b = blogs.find(x => x.id === id);
  if (!b) return;
  editingBlogId = id;
  document.getElementById('blog-modal-title').textContent = '✏️ Chỉnh sửa bài viết';
  document.getElementById('bf-title').value = b.title;
  document.getElementById('bf-category').value = b.category || 'aqua';
  document.getElementById('bf-summary').value = b.summary || '';
  document.getElementById('bf-body').value = b.body;
  document.getElementById('blog-modal').classList.add('open');
}

function insertBlogFormat(tag) {
  const ta = document.getElementById('bf-body');
  const start = ta.selectionStart, end = ta.selectionEnd;
  const sel = ta.value.substring(start, end);
  const templates = {
    h2: `\n## ${sel || 'Tiêu đề'}\n`,
    h3: `\n### ${sel || 'Tiêu đề phụ'}\n`,
    bold: `**${sel || 'văn bản'}**`,
    italic: `*${sel || 'văn bản'}*`,
    list: `\n- ${sel || 'mục danh sách'}\n`,
    quote: `\n> ${sel || 'trích dẫn'}\n`,
    code: `\`${sel || 'code'}\``,
    hr: `\n---\n`,
    link: `[${sel || 'liên kết'}](https://)`
  };
  const ins = templates[tag] || sel;
  ta.value = ta.value.substring(0, start) + ins + ta.value.substring(end);
  ta.focus(); ta.selectionStart = ta.selectionEnd = start + ins.length;
}

function saveBlog() {
  const title = document.getElementById('bf-title').value.trim();
  const body = document.getElementById('bf-body').value.trim();
  if (!title || !body) { adminToast('Vui lòng điền Tiêu đề và Nội dung!', 'error'); return; }

  const blog = {
    id: editingBlogId || Date.now(),
    title,
    category: document.getElementById('bf-category').value,
    summary: document.getElementById('bf-summary').value.trim(),
    body,
    createdAt: editingBlogId ? getBlogs().find(b => b.id === editingBlogId)?.createdAt : Date.now(),
    updatedAt: Date.now()
  };

  let blogs = getBlogs();
  if (editingBlogId) {
    blogs = blogs.map(b => b.id === editingBlogId ? blog : b);
    adminToast('Đã cập nhật bài viết!');
  } else {
    blogs.push(blog);
    adminToast('Đã thêm bài viết mới!');
  }
  saveBlogs(blogs);
  closeModal('blog-modal');
  renderBlogsTable();
  initDashboard();
}

function deleteBlog(id) {
  if (!confirm('Xoá bài viết này?')) return;
  saveBlogs(getBlogs().filter(b => b.id !== id));
  renderBlogsTable(); initDashboard();
  adminToast('Đã xoá bài viết.');
}

// -------- AI ANALYSIS --------
let _lastAIBlogId = null;

function openAIAnalyze(blogId) {
  const b = getBlogs().find(x => x.id === blogId);
  if (!b) return;
  _lastAIBlogId = blogId;
  document.getElementById('ai-modal').classList.add('open');
  document.getElementById('ai-target-title').textContent = b.title;
  document.getElementById('ai-loading').style.display = 'block';
  document.getElementById('ai-result').style.display = 'none';

  // Simulate AI processing (1.2s delay cho cảm giác xử lý)
  setTimeout(() => {
    const analysis = analyzeContent(b);
    document.getElementById('ai-loading').style.display = 'none';
    document.getElementById('ai-result').style.display = 'block';
    document.getElementById('ai-score-val').textContent = analysis.score + '/10';
    document.getElementById('ai-keywords').innerHTML = analysis.keywords.map(k => `<span class="ai-tag">${k}</span>`).join('');
    document.getElementById('ai-summary-text').textContent = analysis.summary;
    document.getElementById('ai-suggestions').innerHTML = analysis.suggestions.map(s => `<li style="margin-bottom:6px">${s}</li>`).join('');
    document.getElementById('ai-rewrite').value = analysis.rewriteSummary;
    // ✅ Hiển thị nội dung đã cải thiện
    document.getElementById('ai-improved').value = analysis.improvedContent;
  }, 1200);
}

function analyzeContent(blog) {
  const text = (blog.title + ' ' + blog.body).toLowerCase();
  const wordCount = blog.body.split(/\s+/).filter(Boolean).length;

  // Keyword extraction
  const keywords = [];
  const kwMap = {
    'thủy sản': '🐟 Thủy sản', 'cá biển': '🐳 Cá biển', 'protein': '💪 Protein',
    'hữu cơ': '🌿 Hữu cơ', 'thiên nhiên': '🍃 Thiên nhiên', 'dạ dày': '🪁 Dạ dày',
    'xương khớp': '🦴 Xương khớp', 'sinh học': '🔬 Sinh học', 'enzyme': '⚗️ Enzyme',
    'vitamin': '💊 Vitamin', 'khoáng chất': '🧬 Khoáng chất', 'thảo dược': '🌺 Thảo dược',
    'dinh dưỡng': '🥗 Dinh dưỡng', 'nước mắm': '🍶 Nước mắm', 'lên men': '🧪 Lên men',
    'miễn dịch': '🛡️ Miễn dịch', 'collagen': '✨ Collagen', 'detox': '🌿 Detox',
    'nông nghiệp': '🌾 Nông nghiệp', 'hải sản': '🦐 Hải sản'
  };
  Object.keys(kwMap).forEach(k => { if (text.includes(k)) keywords.push(kwMap[k]); });

  // Scoring
  let score = 5;
  if (wordCount > 150) score++;
  if (wordCount > 300) score++;
  if (blog.summary && blog.summary.length > 30) score++;
  if (keywords.length > 3) score++;
  if (blog.body.includes('\n##') || blog.body.includes('\n-')) score++;
  score = Math.min(score, 10);

  // Summary generation
  const sentences = blog.body.replace(/[#*>`-]/g, '').split(/[.!?]/).filter(s => s.trim().length > 20);
  const topSentences = sentences.slice(0, 3).map(s => s.trim()).join('. ');
  const summary = topSentences ? topSentences + '.' : (blog.summary || 'Nội dung chưa đủ để tóm tắt tự động.');

  // Suggestions
  const suggestions = [];
  if (wordCount < 150) suggestions.push('📝 Nội dung ngắn – nên viết thêm ít nhất 150 từ để tăng SEO');
  if (!blog.summary || blog.summary.length < 30) suggestions.push('✍️ Thêm tóm tắt (summary) ngắn gọn 1-2 câu cho bài viết');
  if (!blog.body.includes('##') && !blog.body.includes('###')) suggestions.push('📋 Nên thêm tiêu đề phụ (H2/H3) để cấu trúc rõ ràng hơn');
  if (keywords.length < 3) suggestions.push('🔍 Bổ sung thêm từ khóa chuyên môn để tăng tính chuyên nghiệp');
  if (!blog.body.includes('-') && !blog.body.includes('•')) suggestions.push('📌 Thêm danh sách bullet points để nội dung dễ đọc hơn');
  if (!blog.body.toLowerCase().includes('liên hệ') && !blog.body.toLowerCase().includes('đặt hàng')) suggestions.push('🛒 Thêm lời kêu gọi hành động (CTA) cuối bài');
  if (!suggestions.length) suggestions.push('✅ Nội dung có chất lượng tốt! Tiếp tục duy trì phong cách này.');

  // Rewrite summary
  const kwText = keywords.slice(0, 2).map(k => k.replace(/[^\w\sÀ-ỹ]/gi, '')).join(' & ');
  const rewriteSummary = `${blog.title}${kwText ? ' – ' + kwText : ''}. ${summary.substring(0, 150)}${summary.length > 150 ? '...' : ''} Liên hệ AquaBio để biết thêm chi tiết và đặt hàng ngay hôm nay.`;

  // === CảI THIỆN NỘI DUNG CHO KHÁCH HÀNG ===
  const improvedContent = improveContent(blog, keywords);

  return { score, keywords: keywords.slice(0, 8), summary, suggestions, rewriteSummary, improvedContent };
}

// Hàm viết lại nội dung chuyên nghiệp, dễ hiểu cho khách hàng
function improveContent(blog, keywords = []) {
  const title = blog.title || 'Sản phẩm';
  const body = blog.body || '';
  const summary = blog.summary || '';

  // Chủ đề keywords – dùng để tạo intro phù hợp
  const kwLabels = keywords.slice(0, 3).map(k => k.replace(/[^\w\sÀ-ỹ]/gi, '').trim()).filter(Boolean);

  // Phát hiện loại nội dung
  const isHealth = /dạ dày|xương|bổ phế|thảo dược|sức khỏe|vitamin|sinh lý/.test(body.toLowerCase());
  const isFood = /nước mắm|thực phẩm|chế biến|bữa ăn|hương vị/.test(body.toLowerCase());
  const isAqua = /thủy sản|cá|tôm|gia súc|cây trồng|nông nghiệp/.test(body.toLowerCase());

  // Trích đoạn nội dung gốc sạch
  const cleanBody = body.replace(/#{1,3}\s*/g, '').replace(/[*_`>]/g, '').trim();
  const firstPara = cleanBody.split('\n').filter(l => l.trim().length > 30)[0] || cleanBody.substring(0, 200);

  // Intro phù hợp theo loại
  let intro = '';
  if (isHealth) intro = `Bạn đang tìm kiếm giải pháp tự nhiên cho sức khỏe? **${title}** từ AquaBio – Thiên Mộc chính là câu trả lời!`;
  else if (isFood) intro = `Hương vị truyền thống, chất lượng hiện đại – **${title}** mang đến trải nghiệm ẩm thực đích thực từ đại dương Việt Nam.`;
  else if (isAqua) intro = `Nâng cao năng suất và chất lượng nông – thủy sản của bạn với **${title}** – sản phẩm sinh học hữu cơ thuần Việt.`;
  else intro = `**${title}** – sản phẩm chất lượng cao từ AquaBio, được nghiên cứu và phát triển phù hợp với nhu cầu thực tế của người Việt.`;

  // Tạo phần lợi ích
  const benefits = [];
  if (isHealth) {
    benefits.push('✅ Thành phần thảo dược tự nhiên, an toàn cho sức khỏe');
    benefits.push('✅ Hỗ trợ cải thiện triệu chứng nhanh chóng và bền vững');
    benefits.push('✅ Không tác dụng phụ, phù hợp dùng lâu dài');
    benefits.push('✅ Được nhiều chuyên gia khuyên dùng');
  } else if (isFood) {
    benefits.push('✅ Nguyên liệu tươi, lên men tự nhiên truyền thống');
    benefits.push('✅ Không chất bảo quản, không phẩm màu nhân tạo');
    benefits.push('✅ Đậm đà hương vị, nâng tầm ẩm thực gia đình');
    benefits.push('✅ Phù hợp cho gia đình, nhà hàng, quán ăn');
  } else {
    benefits.push('✅ Công nghệ sinh học tiên tiến, hữu cơ hoàn toàn');
    benefits.push('✅ Tăng năng suất rõ rệt, an toàn cho môi trường');
    benefits.push('✅ Dễ sử dụng, tiết kiệm chi phí sản xuất');
    benefits.push('✅ Phù hợp quy mô hộ gia đình đến trang trại lớn');
  }

  // Ghép thành nội dung hoàn chỉnh
  const improved = [
    `## 🌟 ${intro}`,
    '',
    `### Giới thiệu`,
    firstPara + (summary ? '\n\n' + summary : ''),
    '',
    `### Lợi ích nổi bật`,
    ...benefits,
    '',
    `### Tại sao chọn AquaBio?`,
    '- 🔬 Kiểm định chất lượng nghiêm ngặt, đạt chuẩn vệ sinh an toàn thực phẩm',
    '- 🌿 100% nguyên liệu hữu cơ, sạch từ nguồn đến tay người dùng',
    '- 🚚 Giao hàng toàn quốc, đóng gói cẩn thận',
    '- 🤝 Hỗ trợ tư vấn miễn phí 24/7',
    '',
    `### Cam kết của chúng tôi`,
    `AquaBio cam kết mang đến sản phẩm **chất lượng – an toàn – hiệu quả**. Nếu không hài lòng trong 7 ngày đầu, chúng tôi hoàn tiền 100% – không câu hỏi.`,
    '',
    `---`,
    `📞 **Đặt hàng ngay hôm nay** – gọi hotline hoặc nhắn tin để được tư vấn và nhận ưu đãi độc quyền!`
  ].join('\n');

  return improved;
}

function applyAIRewrite() {
  const val = document.getElementById('ai-rewrite').value;
  adminToast('Đã sao chép gợi ý AI! Mở bài viết và dán vào ô tóm tắt.');
  navigator.clipboard?.writeText(val).catch(() => { });
}

function copyImprovedContent() {
  const val = document.getElementById('ai-improved').value;
  if (!val) return;
  navigator.clipboard?.writeText(val)
    .then(() => adminToast('✅ Đã sao chép nội dung đã cải thiện! Dán vào bài viết nhé.'))
    .catch(() => adminToast('Cần cấp quyền clipboard trong brƠwser.', 'error'));
}

function applyImprovedToBlog() {
  const val = document.getElementById('ai-improved').value;
  if (!val) { adminToast('Chưa có nội dung để áp dụng!', 'error'); return; }
  // Áp dụng vào textarea bài viết đang mở
  const bodyArea = document.getElementById('bf-body');
  if (bodyArea && document.getElementById('blog-modal').classList.contains('open')) {
    if (confirm('Áp dụng nội dung AI vào bài viết? Nội dung hiện tại sẽ được thay thế.')) {
      bodyArea.value = val;
      closeModal('ai-modal');
      adminToast('✅ Đã áp dụng nội dung AI vào bài viết!');
    }
  } else {
    // Blog modal không mở - chỉ copy
    navigator.clipboard?.writeText(val)
      .then(() => adminToast('✅ Đã sao chép! Mở bài viết và dán vào phần nội dung.'))
      .catch(() => adminToast('Không sao chép được. Vui lòng sao chép thủ công.', 'error'));
  }
}

// -------- MODAL HELPERS --------
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// -------- INIT --------
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();

  document.getElementById('admin-pass').addEventListener('keydown', e => {
    if (e.key === 'Enter') login();
  });

  // Default page
  if (localStorage.getItem(ADMIN_KEY)) navigate('dashboard');
});

// ======== ĐƠN HÀNG REALTIME ========
const ORDER_KEY = 'aquabio_orders';
let _lastOrderCount = -1;

function getOrders() { return JSON.parse(localStorage.getItem(ORDER_KEY) || '[]'); }
function saveOrders(a) { localStorage.setItem(ORDER_KEY, JSON.stringify(a)); }

function refreshOrdersUI() {
  const orders = getOrders();
  const pending = orders.filter(o => o.status === 'pending').length;

  const se = document.getElementById('stat-orders');
  if (se) se.textContent = pending;
  const badge = document.getElementById('nav-orders-badge');
  if (badge) { badge.textContent = pending; badge.style.display = pending > 0 ? 'inline-flex' : 'none'; }

  const listEl = document.getElementById('dashboard-orders-list');
  if (listEl) {
    const recent = orders.slice(0, 5);
    listEl.innerHTML = recent.length
      ? recent.map(o => `
          <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
            <span style="font-size:1.3rem">${orderStatusEmoji(o.status)}</span>
            <div style="flex:1;min-width:0">
              <div style="font-weight:600;font-size:0.85rem">#${o.id} – ${o.customer?.name || '?'}</div>
              <div style="font-size:0.75rem;color:var(--muted)">${timeAgo(o.createdAt)} · ${new Intl.NumberFormat('vi-VN').format(o.total)}đ</div>
            </div>
            <span class="order-status-badge status-${o.status}">${orderStatusLabel(o.status)}</span>
          </div>`).join('')
      : '<div style="color:var(--muted);font-size:0.85rem;padding:12px 0">Chưa có đơn hàng nào.</div>';
  }

  if (_lastOrderCount >= 0 && orders.length > _lastOrderCount) {
    const n = orders[0];
    adminToast(`📦 Đơn mới: #${n.id} – ${n.customer?.name} (${new Intl.NumberFormat('vi-VN').format(n.total)}đ)`);
    const prev = document.title;
    document.title = '(Đơn mới!) AquaBio Admin';
    setTimeout(() => { document.title = prev; }, 5000);
  }
  _lastOrderCount = orders.length;
  renderWeekChart();
}

function renderOrdersTable() {
  const filter = document.getElementById('order-filter')?.value || 'all';
  const orders = getOrders().filter(o => filter === 'all' || o.status === filter);
  const tbody = document.getElementById('orders-tbody');
  if (!tbody) return;
  const pmMap = { cod: 'COD', bank: 'Chuyển khoản', momo: 'MoMo', vnpay: 'VNPay' };
  tbody.innerHTML = orders.length
    ? orders.map(o => `<tr>
        <td><strong style="color:var(--primary)">#${o.id}</strong></td>
        <td>
          <div style="font-weight:600;font-size:0.85rem">${o.customer?.name || '?'}</div>
          <div style="font-size:0.75rem;color:var(--muted)">${o.customer?.phone || ''}</div>
          <div style="font-size:0.72rem;color:var(--muted);max-width:160px;white-space:normal">${o.customer?.address || ''}</div>
          ${o.customer?.note ? `<div style="font-size:0.72rem;color:var(--muted);font-style:italic">📝 ${o.customer.note}</div>` : ''}
        </td>
        <td style="font-size:0.78rem">${(o.items || []).map(i => `${i.emoji || ''} ${i.name} x${i.qty}`).join('<br>')}</td>
        <td style="font-family:monospace;color:var(--gold);white-space:nowrap">${new Intl.NumberFormat('vi-VN').format(o.total)}đ</td>
        <td style="font-size:0.78rem">
          ${pmMap[o.payment] || o.payment || '?'}
          ${o.paymentProof ? `<br><a href="${o.paymentProof}" target="_blank" style="display:inline-block;margin-top:4px"><img src="${o.paymentProof}" style="width:48px;height:48px;object-fit:cover;border-radius:6px;border:1px solid var(--border)" title="Xem chứng từ"></a>` : ''}
        </td>
        <td><span class="order-status-badge status-${o.status}">${orderStatusEmoji(o.status)} ${orderStatusLabel(o.status)}</span></td>
        <td style="font-size:0.75rem;color:var(--muted);white-space:nowrap">${timeAgo(o.createdAt)}</td>
        <td style="display:flex;flex-direction:column;gap:4px">
          <select class="form-control" style="font-size:0.78rem;padding:4px 8px" onchange="updateOrderStatus('${o.id}',this.value)">
            <option value="pending"   ${o.status === 'pending' ? 'selected' : ''}>⏳ Chờ</option>
            <option value="confirmed" ${o.status === 'confirmed' ? 'selected' : ''}>✅ Xác nhận</option>
            <option value="shipped"   ${o.status === 'shipped' ? 'selected' : ''}>🚚 Giao hàng</option>
            <option value="done"      ${o.status === 'done' ? 'selected' : ''}>🏆 Xong</option>
            <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>❌ Huỷ</option>
          </select>
          <button class="btn btn-danger btn-sm" onclick="deleteOrder('${o.id}')">🗑️ Xóa</button>
        </td>
      </tr>`).join('')
    : '<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--muted)">Chưa có đơn hàng nào. Đơn hàng tự động xuất hiện khi khách đặt.</td></tr>';
}

function updateOrderStatus(id, status) {
  const orders = getOrders(); const o = orders.find(x => x.id === id); if (!o) return;
  o.status = status; saveOrders(orders); refreshOrdersUI();
  adminToast(`Cập nhật #${id} → ${orderStatusLabel(status)}`);
}
function deleteOrder(id) {
  if (!confirm(`Xóa đơn hàng #${id}?`)) return;
  saveOrders(getOrders().filter(o => o.id !== id));
  renderOrdersTable(); refreshOrdersUI();
  adminToast('Đã xóa đơn hàng.');
}
function clearAllOrders() {
  if (!confirm('Xóa TẤT CẢ đơn hàng? Không thể khôi phục!')) return;
  saveOrders([]); renderOrdersTable(); refreshOrdersUI();
  adminToast('Đã xóa toàn bộ lịch sử đơn hàng.');
}
const orderStatusLabel = s => ({ pending: 'Chờ', confirmed: 'Xác nhận', shipped: 'Giao hàng', done: 'Hoàn thành', cancelled: 'Huỷ' }[s] || s);
const orderStatusEmoji = s => ({ pending: '⏳', confirmed: '✅', shipped: '🚚', done: '🏆', cancelled: '❌' }[s] || '📦');
function timeAgo(ts) {
  const d = Math.floor((Date.now() - ts) / 1000);
  if (d < 60) return d + 's trước'; if (d < 3600) return Math.floor(d / 60) + 'ph trước';
  if (d < 86400) return Math.floor(d / 3600) + 'h trước';
  return new Date(ts).toLocaleDateString('vi-VN');
}
function startOrderPolling() {
  refreshOrdersUI();
  setInterval(refreshOrdersUI, 10000);
  window.addEventListener('storage', e => { if (e.key === ORDER_KEY) refreshOrdersUI(); }, { passive: true });
}

// ======== BIỂU ĐỒ 7 NGÀY ========
function renderWeekChart() {
  const canvas = document.getElementById('week-chart'); if (!canvas) return;
  const ctx = canvas.getContext('2d'); const W = canvas.offsetWidth || 620; const H = 160;
  canvas.width = W; canvas.height = H; ctx.clearRect(0, 0, W, H);
  const orders = getOrders(); const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now); d.setDate(d.getDate() - i);
    const label = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][d.getDay()];
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const dayOrds = orders.filter(o => o.createdAt >= start && o.createdAt < start + 86400000);
    days.push({ label, count: dayOrds.length, revenue: dayOrds.reduce((s, o) => s + (o.total || 0), 0) });
  }
  const maxRev = Math.max(...days.map(d => d.revenue), 1);
  const pL = 48, pR = 12, pT = 18, pB = 32, cW = W - pL - pR, cH = H - pT - pB;
  const bW = Math.floor(cW / 7) - 6;
  ctx.strokeStyle = 'rgba(76,187,133,0.1)'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pT + (cH / 4) * i;
    ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(W - pR, y); ctx.stroke();
    const val = Math.round(maxRev * (1 - i / 4) / 1000);
    ctx.fillStyle = 'rgba(240,250,251,0.35)'; ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(val > 0 ? val + 'K' : '0', pL - 3, y + 3);
  }
  const pts = [];
  days.forEach((d, i) => {
    const x = pL + i * (cW / 7) + 3; const bH = d.revenue > 0 ? (d.revenue / maxRev) * cH : 2; const y = pT + cH - bH;
    const grad = ctx.createLinearGradient(x, y, x, pT + cH);
    grad.addColorStop(0, i === 6 ? 'rgba(232,196,106,0.9)' : 'rgba(76,187,133,0.8)');
    grad.addColorStop(1, i === 6 ? 'rgba(232,196,106,0.2)' : 'rgba(76,187,133,0.15)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.roundRect(x, y, bW, bH, [4, 4, 0, 0]); ctx.fill();
    if (d.count > 0) { ctx.fillStyle = '#f0fafb'; ctx.font = 'bold 9px Inter,sans-serif'; ctx.textAlign = 'center'; ctx.fillText(d.count, x + bW / 2, y - 3); }
    ctx.fillStyle = i === 6 ? 'rgba(232,196,106,0.9)' : 'rgba(240,250,251,0.55)';
    ctx.font = i === 6 ? 'bold 10px Inter,sans-serif' : '9px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(d.label, x + bW / 2, H - 5);
    pts.push({ x: x + bW / 2, y: d.revenue > 0 ? y : pT + cH });
  });
  if (pts.some(p => p.y < pT + cH)) {
    ctx.beginPath(); ctx.strokeStyle = 'rgba(232,196,106,0.6)'; ctx.lineWidth = 1.5; ctx.lineJoin = 'round';
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)); ctx.stroke();
    pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2); ctx.fillStyle = 'rgba(232,196,106,0.9)'; ctx.fill(); });
  }
}

// ======== 2FA – Hệ thống PIN 6 số (đơn giản, đáng tin cậy) ========
// Không dùng TOTP phức tạp – tránh lỗi thuật toán và lệch đồng hồ
const TFA_KEY     = 'aquabio_2fa_pin';    // Lưu PIN đã hash
const TFA_SESSION = 'aquabio_2fa_session';
let _2faEnabled = false, _2faUnlocked = false;

// Tự xóa secret TOTP cũ nếu còn sót lại
localStorage.removeItem('aquabio_2fa_secret');

// Hash đơn giản để lưu PIN (không lưu plain text)
function hashPIN(pin) {
  let h = 0x12345678;
  for (let i = 0; i < pin.length; i++) {
    h = Math.imul(h ^ pin.charCodeAt(i), 0x9e3779b9);
    h ^= h >>> 16;
  }
  return (h >>> 0).toString(16).padStart(8, '0') + pin.length;
}

function load2FAState() {
  const saved = localStorage.getItem(TFA_KEY);
  _2faEnabled  = !!saved;
  _2faUnlocked = sessionStorage.getItem(TFA_SESSION) === '1';
  if (!saved && _2faUnlocked) {
    sessionStorage.removeItem(TFA_SESSION);
    _2faUnlocked = false;
  }
  render2FAUI();
  renderSettingsLock();
}

function render2FAUI() {
  const tb = document.getElementById('twofa-toggle-btn');
  const ub = document.getElementById('twofa-unlock-btn');
  const qw = document.getElementById('twofa-qr-wrap');
  const vw = document.getElementById('twofa-verify-wrap');
  const sb = document.getElementById('twofa-session-badge');
  const sd = document.getElementById('twofa-status-display');
  if (!tb) return;

  // Cập nhật label input và label nút
  const inp = document.getElementById('twofa-code-input');
  const lbl = document.getElementById('twofa-input-label');

  if (_2faEnabled) {
    sd.innerHTML = '<span style="color:var(--primary);font-weight:600">🔒 Khóa PIN đang BẬT</span>';
    tb.textContent = 'Tắt khóa PIN'; tb.className = 'btn btn-danger';
    tb.onclick = toggleTwoFA;
    if (qw) qw.style.display = 'none';
    if (vw) vw.style.display = _2faUnlocked ? 'none' : 'block';
    if (ub) { ub.style.display = _2faUnlocked ? 'none' : 'flex'; ub.textContent = '🔓 Mở khóa bằng PIN'; }
    if (sb) sb.style.display = _2faUnlocked ? 'inline-flex' : 'none';
    if (lbl) lbl.textContent = 'Nhập PIN 6 chữ số của bạn:';
    if (inp) inp.placeholder = 'Nhập PIN 6 số';
  } else {
    sd.innerHTML = '<span style="color:var(--muted);font-size:0.88rem">⚠️ Chưa bật khóa PIN</span>';
    tb.textContent = 'Bật khóa PIN 6 số'; tb.className = 'btn btn-primary';
    tb.onclick = toggleTwoFA;
    if (qw) qw.style.display = 'none';
    if (vw) vw.style.display = 'none';
    if (ub) ub.style.display = 'none';
    if (sb) sb.style.display = 'none';
  }
}

// Settings KHÔNG bị khóa cứng – luôn có thể dùng
function renderSettingsLock() {
  const c  = document.getElementById('settings-unlocked-content');
  const lm = document.getElementById('settings-locked-msg');
  if (!c) return;
  const locked = _2faEnabled && !_2faUnlocked;
  c.style.opacity = locked ? '0.45' : '1';
  c.style.pointerEvents = 'auto'; // Luôn có thể dùng
  if (lm) lm.style.display = locked ? 'block' : 'none';
}

// Countdown không cần nữa (PIN không có thời hạn) – giữ stub để không lỗi
function start2FACountdown() {}
function renderQRFallback() {}

// Bật/Tắt PIN
async function toggleTwoFA() {
  if (!_2faEnabled) {
    // Đặt PIN mới
    const pin1 = prompt('Đặt PIN 6 chữ số mới để bảo vệ admin:\n(Ghi nhớ kỹ - không thể khôi phục nếu quên!)\n\nNhập PIN:');
    if (!pin1) return;
    if (!/^\d{6}$/.test(pin1)) { adminToast('❌ PIN phải đúng 6 chữ số!', 'error'); return; }

    const pin2 = prompt('Xác nhận lại PIN:');
    if (pin1 !== pin2) { adminToast('❌ PIN không khớp! Thử lại.', 'error'); return; }

    localStorage.setItem(TFA_KEY, hashPIN(pin1));
    sessionStorage.setItem(TFA_SESSION, '1');
    _2faEnabled = true; _2faUnlocked = true;
    load2FAState();
    adminToast('✅ Đã bật khóa PIN! Nhớ lưu PIN của bạn.');
  } else {
    // Tắt PIN – cần xác nhận bằng mật khẩu admin
    const pass = localStorage.getItem('aquabio_custom_pass') || ADMIN_PASS;
    const input = prompt('Nhập mật khẩu admin để tắt khóa PIN:');
    if (input === null) return;
    if (input !== pass) { adminToast('❌ Mật khẩu admin sai!', 'error'); return; }
    reset2FA();
    adminToast('✅ Đã tắt khóa PIN.');
  }
}

// Mở khóa bằng PIN (hoặc mật khẩu admin)
async function unlockWith2FA() {
  const savedHash = localStorage.getItem(TFA_KEY);
  if (!savedHash) { load2FAState(); return; }

  const inp = document.getElementById('twofa-code-input');
  const val = (inp?.value || '').trim();

  // Thử PIN
  if (/^\d{6}$/.test(val)) {
    if (hashPIN(val) === savedHash) { doUnlock2FA(); return; }
    adminToast('❌ PIN sai! Thử lại hoặc nhập mật khẩu admin.', 'error');
    return;
  }

  // Bypass bằng mật khẩu admin
  const adminPass = localStorage.getItem('aquabio_custom_pass') || ADMIN_PASS;
  if (val === adminPass) { doUnlock2FA(); adminToast('✅ Mở khóa bằng mật khẩu admin!'); return; }

  adminToast('Nhập PIN 6 số hoặc mật khẩu admin!', 'error');
}

function doUnlock2FA() {
  sessionStorage.setItem(TFA_SESSION, '1');
  _2faUnlocked = true;
  const inp = document.getElementById('twofa-code-input');
  if (inp) inp.value = '';
  load2FAState();
  adminToast('✅ Đã xác thực – phiên làm việc an toàn!');
}

function reset2FA() {
  localStorage.removeItem(TFA_KEY);
  sessionStorage.removeItem(TFA_SESSION);
  _2faEnabled  = false;
  _2faUnlocked = false;
  load2FAState();
}
// showApp gốc đã khởi động polling + 2FA tại dòng 35-36.