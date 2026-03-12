// ===== AGRIBOT – Chatbot tư vấn nông nghiệp =====

const AGRIBOT_NAME = 'AgriBot';

// ===== KNOWLEDGE BASE =====
const KNOWLEDGE = [
  // --- Sản phẩm ---
  {
    patterns: ['tinh chất đạm', 'đạm cá', 'tinh chất cá', 'protein cá', 'amino acid cá'],
    answer: `🐟 <strong>Tinh chất đạm cá biển</strong> là sản phẩm hữu cơ vi sinh chiết xuất từ cá biển tươi.<br><br>
    ✅ <strong>Công dụng:</strong> Bổ sung dinh dưỡng cho cây trồng và vật nuôi, kích thích tăng trưởng tự nhiên.<br>
    📦 <strong>Giá:</strong> 320.000đ/lít<br>
    💡 <strong>Pha loãng:</strong> 1:200 với nước tưới, dùng 2 lần/tuần.<br><br>
    Bạn muốn thêm sản phẩm này vào giỏ hàng không?`,
    suggestions: ['Cách sử dụng', 'So sánh với phân bón hóa học', 'Thêm vào giỏ hàng']
  },
  {
    patterns: ['dịch cá', 'fish hydrolysate', 'nguyên liệu thức ăn', 'thức ăn thủy sản'],
    answer: `🦈 <strong>Dịch cá biển</strong> – nguyên liệu thức ăn chăn nuôi chất lượng cao.<br><br>
    ✅ Protein: 40-50% | Giàu khoáng chất tự nhiên<br>
    🐄 Dùng cho: Cá, tôm, heo, gà, vịt, bò<br>
    💰 Giá: 180.000đ/lít<br>
    📝 Cách dùng: Phối trộn 5-10% vào thức ăn tổng hợp.`,
    suggestions: ['Tỉ lệ phối trộn', 'Dịch cá và bột cá khác gì?', 'Mua số lượng lớn']
  },
  {
    patterns: ['nước mắm', 'mắm cá', 'fish sauce', 'mắm truyền thống'],
    answer: `🍶 <strong>Nước mắm truyền thống AquaBio</strong><br><br>
    ✨ Được ủ 12-18 tháng theo phương pháp cổ truyền<br>
    🐟 Nguyên liệu: Cá cơm / cá nục biển + muối tinh<br>
    💯 Đạm: 25-35°N – Không phụ gia, không chất bảo quản<br>
    💰 Giá: 95.000đ/chai 500ml`,
    suggestions: ['Đạm bao nhiêu?', 'Sử dụng thế nào?', 'Đặt mua hàng thùng']
  },
  {
    patterns: ['azpro', 'bột protein', 'bột dinh dưỡng', 'protein người', 'supplement'],
    answer: `💊 <strong>AZProTM – Bột protein dinh dưỡng</strong> dành cho người<br><br>
    🏋️ Protein: 80% mỗi khẩu phần | 120kcal/30g<br>
    ✅ Đủ 9 amino acid thiết yếu<br>
    👥 Phù hợp: Người tập gym, người cao tuổi, hồi phục bệnh<br>
    💰 Giá: 450.000đ/hộp 900g<br>
    📝 Dùng: 2 thìa/ngày, pha với nước/sữa`,
    suggestions: ['Khác whey protein gì?', 'Người cao tuổi uống được không?', 'Đặt mua']
  },
  {
    patterns: ['gel dạ dày', 'dạ dày thiên mộc', 'đau dạ dày', 'viêm loét dạ dày', 'ợ chua', 'acid dạ dày'],
    answer: `🌿 <strong>Gel dạ dày Thiên Mộc</strong> – Giải pháp tự nhiên cho dạ dày<br><br>
    🌱 Thành phần: Nghệ vàng, lá khôi tía, cam thảo, mật ong rừng<br>
    ✅ Giảm đau, ợ hơi, ợ chua, bảo vệ niêm mạc<br>
    💰 Giá: 185.000đ/hộp (20 gói × 15ml)<br>
    📝 Uống: 2 gói/ngày trước bữa ăn 30 phút, dùng liên tục 30 ngày<br><br>
    ⚠️ Lưu ý: Không thay thế thuốc kê đơn. Nếu triệu chứng nặng, hãy gặp bác sĩ.`,
    suggestions: ['Mua ở đâu?', 'Dùng được bao lâu?', 'Bổ phế Thiên Mộc']
  },
  {
    patterns: ['bổ phế', 'ho', 'viêm họng', 'đường hô hấp', 'phế', 'bổ phổi', 'long đờm'],
    answer: `🫁 <strong>Bổ phế Thiên Mộc</strong> – Dành cho ho, viêm họng, hô hấp<br><br>
    🌱 Thành phần: Cát cánh, bán hạ, bạch quả, húng chanh, mật ong, quất<br>
    ✅ Giảm ho, long đờm, làm dịu cổ họng tự nhiên<br>
    👨‍👩‍👧 Dùng được cả trẻ em từ 5 tuổi trở lên<br>
    💰 Giá: 195.000đ/hộp 20 gói<br>
    📝 Dùng: 2 lần/ngày, buổi sáng và tối trước khi ngủ`,
    suggestions: ['Trẻ em dùng liều nào?', 'Gel dạ dày Thiên Mộc', 'Đặt mua']
  },
  {
    patterns: ['xương khớp', 'đau khớp', 'viêm khớp', 'thoái hóa', 'glucosamine', 'collagen khớp'],
    answer: `🦴 <strong>Xương khớp Thiên Mộc</strong> – Tái tạo và bảo vệ khớp<br><br>
    💊 Glucosamine HCl + Collagen Type II + Đỗ trọng, Độc hoạt<br>
    ✅ Tái tạo sụn, giảm viêm, tăng độ linh hoạt khớp<br>
    💰 Giá: 250.000đ/hộp 60 viên<br>
    📝 Dùng: 3 viên/ngày sau bữa ăn, liên tục 2-3 tháng<br>
    👴 Phù hợp: Người trung niên, người lao động nặng, người cao tuổi`,
    suggestions: ['Collagen Type II là gì?', 'UTM Thiên Mộc', 'Đặt mua']
  },
  {
    patterns: ['utm', 'sinh lý nam', 'bổ thận', 'tráng dương', 'nam giới', 'mệt mỏi sinh lý'],
    answer: `🌺 <strong>UTM Thiên Mộc</strong> – Tăng cường sinh lý và sức khỏe nam giới<br><br>
    🌿 Thành phần: Nhục thung dung, ba kích thiên, dâm dương hoắc, kẽm, nhân sâm<br>
    ✅ Tăng sinh lý, giảm mệt mỏi, tăng năng lượng tổng thể<br>
    💰 Giá: 280.000đ/hộp 30 viên<br>
    📝 Dùng: 2 viên/ngày buổi sáng sau ăn<br>
    ⚠️ Không dùng cho người dưới 18 tuổi`,
    suggestions: ['Sau bao lâu thấy hiệu quả?', 'Xương khớp Thiên Mộc', 'Đặt mua']
  },

  // --- Nông nghiệp chuyên sâu ---
  {
    patterns: ['phân bón', 'bón phân', 'dinh dưỡng cây', 'kích thích cây', 'rau xanh', 'hoa quả', 'cây trồng'],
    answer: `🌱 <strong>Tư vấn dinh dưỡng cây trồng</strong><br><br>
    Đối với cây trồng, chúng tôi khuyên dùng <strong>Tinh chất đạm cá biển</strong>:<br><br>
    🌿 <strong>Rau xanh:</strong> Pha 1:300 tưới gốc 2 lần/tuần<br>
    🍅 <strong>Cây ăn quả:</strong> Pha 1:200 + phun lá 1 lần/tuần<br>
    🌾 <strong>Lúa:</strong> Pha 1:500 phun giai đoạn đẻ nhánh và làm đòng<br>
    🌺 <strong>Cây kiểng:</strong> Pha 1:400 tưới định kỳ 2 tuần/lần<br><br>
    💡 Sản phẩm hữu cơ 100%, an toàn cho người và môi trường!`,
    suggestions: ['Cách pha chế', 'Phân bón hóa học vs hữu cơ', 'Đặt mua tinh chất đạm']
  },
  {
    patterns: ['nuôi cá', 'ao cá', 'thức ăn cá', 'tôm', 'nuôi tôm', 'thủy sản'],
    answer: `🐠 <strong>Tư vấn nuôi trồng thủy sản</strong><br><br>
    Chúng tôi cung cấp <strong>Dịch cá biển</strong> làm thức ăn bổ sung:<br><br>
    🐟 <strong>Cá tra, cá rô phi:</strong> Trộn 8% dịch cá vào thức ăn viên<br>
    🦐 <strong>Tôm sú, tôm thẻ:</strong> Trộn 5% dịch cá, cho ăn 4 lần/ngày<br>
    🐡 <strong>Cá cảnh:</strong> Pha loãng 1:500 thêm vào nước tuần 1 lần<br><br>
    ✅ Giúp tăng trọng nhanh, giảm FCR, cải thiện màu sắc và sức đề kháng.<br><br>
    📱 Liên hệ để được tư vấn công thức phù hợp với trại của bạn!`,
    suggestions: ['Phòng bệnh cho cá', 'Cải thiện chất lượng nước ao', 'Mua dịch cá biển']
  },
  {
    patterns: ['bệnh cá', 'cá chết', 'cá bỏ ăn', 'cá nổi đầu', 'bệnh tôm'],
    answer: `⚠️ <strong>Xử lý bệnh thủy sản</strong><br><br>
    Một số dấu hiệu và nguyên nhân phổ biến:<br>
    🔴 <strong>Cá nổi đầu:</strong> Thiếu oxy – Tăng sục khí, kiểm tra mật độ<br>
    🔴 <strong>Cá bỏ ăn:</strong> Stress nhiệt độ/pH – Kiểm tra thông số nước<br>
    🔴 <strong>Cá có đốm trắng:</strong> Xuất huyết hoặc ký sinh trùng – Cách ly và dùng thuốc chuyên biệt<br><br>
    💡 <strong>Phòng ngừa tốt nhất:</strong> Bổ sung <strong>Dịch cá biển</strong> vào thức ăn giúp tăng miễn dịch tự nhiên cho cá.<br><br>
    ⚠️ Với bệnh nặng, hãy liên hệ cán bộ thú y thủy sản địa phương!`,
    suggestions: ['Cải thiện nước ao', 'Mua dịch cá biển', 'Liên hệ tư vấn trực tiếp']
  },
  {
    patterns: ['chất lượng nước', 'pH ao', 'oxy ao', 'nước ao', 'kiềm'],
    answer: `🌊 <strong>Quản lý chất lượng nước ao nuôi</strong><br><br>
    📊 <strong>Thông số lý tưởng:</strong><br>
    • pH: 7.0 – 8.5<br>
    • Oxy hòa tan (DO): ≥ 5 mg/L<br>
    • Nhiệt độ: 25-30°C (tôm/cá nhiệt đới)<br>
    • Độ kiềm: 80-120 mg/L CaCO₃<br><br>
    💡 <strong>Cách cải thiện:</strong><br>
    • Dùng vôi bột (CaCO₃) điều chỉnh pH<br>
    • Bổ sung men vi sinh định kỳ<br>
    • Tinh chất đạm cá biển hữu cơ giúp phát triển tảo có lợi tự nhiên`,
    suggestions: ['Nuôi cá tôm hiệu quả', 'Tinh chất đạm cá biển', 'Liên hệ chuyên gia']
  },

  // --- Giá cả, mua hàng ---
  {
    patterns: ['giá', 'bao nhiêu tiền', 'giá tiền', 'chi phí', 'giá bán'],
    answer: `💰 <strong>Bảng giá sản phẩm AquaBio</strong><br><br>
    <table style="width:100%;font-size:0.82rem;border-collapse:collapse;">
      <tr><td style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.1);">🐟 Tinh chất đạm cá biển</td><td style="text-align:right;color:#32e0c4;font-weight:700;">320.000đ/lít</td></tr>
      <tr><td style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.1);">🦈 Dịch cá biển</td><td style="text-align:right;color:#32e0c4;font-weight:700;">180.000đ/lít</td></tr>
      <tr><td style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.1);">🍶 Nước mắm truyền thống</td><td style="text-align:right;color:#32e0c4;font-weight:700;">95.000đ/chai</td></tr>
      <tr><td style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.1);">💊 AZProTM Protein</td><td style="text-align:right;color:#32e0c4;font-weight:700;">450.000đ/hộp</td></tr>
      <tr><td style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.1);">🌿 Gel dạ dày Thiên Mộc</td><td style="text-align:right;color:#32e0c4;font-weight:700;">185.000đ/hộp</td></tr>
      <tr><td style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.1);">🫁 Bổ phế Thiên Mộc</td><td style="text-align:right;color:#32e0c4;font-weight:700;">195.000đ/hộp</td></tr>
      <tr><td style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.1);">🦴 Xương khớp Thiên Mộc</td><td style="text-align:right;color:#32e0c4;font-weight:700;">250.000đ/hộp</td></tr>
      <tr><td style="padding:6px 0;">🌺 UTM Thiên Mộc</td><td style="text-align:right;color:#32e0c4;font-weight:700;">280.000đ/hộp</td></tr>
    </table>`,
    suggestions: ['Có giảm giá mua sỉ không?', 'Phí vận chuyển', 'Đặt hàng ngay']
  },
  {
    patterns: ['mua sỉ', 'số lượng lớn', 'đại lý', 'khuyến mãi', 'giảm giá'],
    answer: `🎁 <strong>Chính sách giá sỉ & đại lý</strong><br><br>
    📦 Mua từ 5 lít/hộp: <strong style="color:#32e0c4;">Giảm 5%</strong><br>
    📦 Mua từ 20 lít/hộp: <strong style="color:#32e0c4;">Giảm 10% + miễn ship</strong><br>
    📦 Đại lý phân phối: <strong style="color:#32e0c4;">Giảm 20-30%</strong><br><br>
    📞 Liên hệ: <strong>0900 000 000</strong> để được báo giá sỉ tốt nhất!`,
    suggestions: ['Phí vận chuyển', 'Hình thức thanh toán', 'Liên hệ ngay']
  },
  {
    patterns: ['ship', 'vận chuyển', 'giao hàng', 'khi nào nhận'],
    answer: `🚚 <strong>Thông tin vận chuyển</strong><br><br>
    📍 <strong>Nội thành TP.HCM, Hà Nội:</strong> 1-2 ngày<br>
    📍 <strong>Tỉnh thành lân cận:</strong> 2-3 ngày<br>
    📍 <strong>Miền Trung/Tây Nguyên:</strong> 3-5 ngày<br><br>
    💰 <strong>Phí ship:</strong><br>
    • Đơn < 500.000đ: 35.000đ<br>
    • Đơn ≥ 500.000đ: <strong style="color:#32e0c4;">MIỄN PHÍ 🎉</strong>`,
    suggestions: ['Hình thức thanh toán', 'Đặt hàng ngay', 'Giá sản phẩm']
  },
  {
    patterns: ['thanh toán', 'trả tiền', 'momo', 'vnpay', 'chuyển khoản', 'cod'],
    answer: `💳 <strong>Hình thức thanh toán</strong><br><br>
    ✅ <strong>COD:</strong> Trả tiền mặt khi nhận hàng<br>
    ✅ <strong>MoMo:</strong> Ví điện tử tiện lợi<br>
    ✅ <strong>VNPay:</strong> Cổng thanh toán trực tuyến<br>
    ✅ <strong>Chuyển khoản ngân hàng:</strong> Vietcombank – STK: 1234 5678 9012<br><br>
    📦 Đơn hàng được xác nhận trong vòng 30 phút sau khi đặt!`,
    suggestions: ['Phí vận chuyển', 'Đặt hàng ngay', 'Giảm giá mua sỉ']
  },
  {
    patterns: ['đổi trả', 'hoàn tiền', 'đổi hàng', 'bảo hành', 'trả hàng'],
    answer: `🔄 <strong>Chính sách đổi trả</strong><br><br>
    ✅ Đổi trả trong <strong>7 ngày</strong> nếu sản phẩm bị lỗi do nhà sản xuất<br>
    ✅ Hoàn tiền 100% nếu sản phẩm không đúng mô tả<br>
    ⚠️ Không áp dụng đổi trả với sản phẩm đã khui, đã dùng (trừ chất lượng bất thường)<br><br>
    📞 Liên hệ CSKH: <strong>0900 000 000</strong> trong giờ hành chính`,
    suggestions: ['Chính sách bảo hành', 'Liên hệ hỗ trợ', 'Đặt hàng ngay']
  },

  // --- Tổng hợp & Chào hỏi ---
  {
    patterns: ['xin chào', 'chào', 'hello', 'hi', 'bắt đầu', 'tư vấn'],
    answer: `👋 Xin chào! Mình là <strong>AgriBot</strong> – trợ lý tư vấn của AquaBio Việt Nam.<br><br>
    Mình có thể giúp bạn:<br>
    🐟 Tư vấn sản phẩm nông nghiệp & thủy sản<br>
    🌿 Tư vấn sản phẩm sức khỏe Thiên Mộc<br>
    💰 Thông tin giá cả, mua sỉ, vận chuyển<br>
    🌾 Kỹ thuật trồng trọt, nuôi trồng thủy sản<br><br>
    Bạn cần tư vấn về điều gì?`,
    suggestions: ['Sản phẩm cho nông nghiệp', 'Sản phẩm sức khỏe', 'Bảng giá']
  },
  {
    patterns: ['cảm ơn', 'thank', 'tốt quá', 'hay quá', 'ok', 'được rồi'],
    answer: `😊 Rất vui được giúp bạn! Nếu còn điều gì chưa rõ hoặc cần tư vấn thêm, cứ hỏi mình nhé.<br><br>
    📞 Bạn cũng có thể gọi trực tiếp: <strong>0900 000 000</strong> để gặp chuyên gia tư vấn!`,
    suggestions: ['Xem tất cả sản phẩm', 'Đặt hàng ngay']
  },
  {
    patterns: ['liên hệ', 'hotline', 'số điện thoại', 'email', 'địa chỉ'],
    answer: `📞 <strong>Thông tin liên hệ AquaBio Việt Nam</strong><br><br>
    📱 Hotline: <strong>0900 000 000</strong> (8:00 – 18:00)<br>
    ✉️ Email: <strong>info@aquabio.vn</strong><br>
    📍 Địa chỉ: Việt Nam<br>
    🌐 Website: aquabio.vn<br>
    📘 Facebook: fb.com/aquabiovn<br><br>
    💬 Hoặc chat ngay với mình tại đây, mình luôn sẵn sàng trả lời 24/7!`,
    suggestions: ['Gửi khiếu nại', 'Trở thành đại lý', 'Đặt hàng ngay']
  }
];

// ===== CHATBOT STATE =====
let chatOpen = false;
let isTyping = false;
let messageHistory = [];
// Anti-spam
let messageTimestamps = [];
const SPAM_LIMIT = 5;
const SPAM_WINDOW = 10000; // 10 seconds
const COOLDOWN = 12000; // 12 seconds
let inCooldown = false;

// ===== INIT =====
window.closeChatbot = function () {
  document.getElementById('chatbot-window').classList.remove('open');
  chatOpen = false;
};

// Override openChatbot to add greeting
const _origOpen = window.openChatbot;
window.openChatbot = function () {
  const win = document.getElementById('chatbot-window');
  chatOpen = true;
  win.classList.add('open');

  // Only show greeting if first time
  if (messageHistory.length === 0) {
    setTimeout(() => showTypingThenMessage(getGreeting()), 500);
  }
};

function getGreeting() {
  const hour = new Date().getHours();
  let greeting;
  if (hour < 12) greeting = 'Chào buổi sáng!';
  else if (hour < 18) greeting = 'Chào buổi chiều!';
  else greeting = 'Chào buổi tối!';

  return `${greeting} 😊 Mình là <strong>Thiên Mộc</strong> – trợ lý tư vấn nông nghiệp và sức khỏe của AquaBio.<br><br>
  Mình có thể giúp bạn tư vấn về:<br>
  🌾 Sản phẩm nông nghiệp & thủy sản<br>
  🌿 Dòng sức khỏe Thiên Mộc<br>
  💰 Giá cả, đặt hàng, vận chuyển<br><br>
  Bạn muốn hỏi về điều gì?`;
}

// ===== SEND MESSAGE =====
window.sendMessage = function () {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text || isTyping) return;

  // Anti-spam check
  const now = Date.now();
  messageTimestamps = messageTimestamps.filter(t => now - t < SPAM_WINDOW);

  if (inCooldown) {
    showBotMessage('⏳ Bạn đang gửi tin nhắn quá nhanh. Vui lòng chờ một chút nhé!', []);
    return;
  }

  if (messageTimestamps.length >= SPAM_LIMIT) {
    inCooldown = true;
    showBotMessage('⚠️ Bạn đã gửi quá nhiều tin nhắn liên tiếp. Mình sẽ nghỉ ngơi 12 giây rồi tiếp tục tư vấn nhé!', []);
    setTimeout(() => { inCooldown = false; messageTimestamps = []; }, COOLDOWN);
    return;
  }

  messageTimestamps.push(now);
  input.value = '';

  // Add user message
  addMessage(text, 'user');
  messageHistory.push({ role: 'user', text });

  // Bot response
  isTyping = true;
  showTypingIndicator();

  const delay = 800 + Math.random() * 600;
  setTimeout(() => {
    removeTypingIndicator();
    const { answer, suggestions } = findAnswer(text);
    showBotMessage(answer, suggestions);
    isTyping = false;
  }, delay);
};

window.handleChatKey = function (e) {
  if (e.key === 'Enter') window.sendMessage();
};

window.sendSuggestion = function (text) {
  document.getElementById('chat-input').value = text;
  window.sendMessage();
};

// ===== DOMAIN BOUNDARY CHECK =====
// Các từ khoá NGOÀI phạm vi chuyên môn – sẽ từ chối
const OFF_TOPIC_SIGNALS = [
  'thời tiết', 'bão', 'mưa hôm nay', 'dự báo thời tiết',
  'bóng đá', 'bóng chuyền', 'thể thao', 'lịch thi đấu', 'kết quả bóng đá',
  'phim', 'âm nhạc', 'ca sĩ', 'diễn viên', 'kpop', 'anime', 'game online',
  'chính trị', 'bầu cử', 'chiến tranh', 'quân sự',
  'tình yêu', 'người yêu', 'quan hệ', 'ly hôn', 'hẹn hò',
  'tiền ảo', 'bitcoin', 'crypto', 'chứng khoán', 'cổ phiếu',
  'toán học', 'vật lý', 'hóa học', 'lịch sử', 'địa lý',
  'lập trình', 'code', 'javascript', 'python', 'phần mềm',
  'du lịch', 'khách sạn', 'vé máy bay', 'chỗ ở',
  'nấu ăn', 'công thức nấu', 'món ăn', 'nhà hàng'
];

// Các từ khoá TRONG phạm vi chuyên môn (tối thiểu phải có 1 từ này hoặc khớp knowledge)
const DOMAIN_SIGNALS = [
  'ca biet', 'ca bien', 'nuoc mam', 'mam ca', 'dich ca', 'tinh chat',
  'dam ca', 'protein ca', 'azpro', 'bot protein', 'bot dinh duong',
  'da day', 'bo phe', 'xuong khop', 'utm', 'thien moc',
  'nong nghiep', 'cay trong', 'vat nuoi', 'gia suc', 'gia cam', 'thuy san',
  'ca tom', 'ao ca', 'nuoi ca', 'nuoi tom', 'biet ca', 'benh ca',
  'phan bon', 'bon phan', 'dinh duong cay', 'khuyen mai', 'giam gia',
  'ship', 'van chuyen', 'giao hang', 'mua si', 'dai ly',
  'thanh toan', 'dat hang', 'gia ban', 'gia tien', 'bao nhieu',
  'lien he', 'hotline', 'doi tra', 'bao hanh', 'hoan tien',
  'san pham', 'aquabio', 'chao', 'xin chao', 'hello', 'cam on',
  'tuoi cay', 'tiec nong', 'rau', 'lua', 'hoa qua'
];

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function isOffTopic(q) {
  return OFF_TOPIC_SIGNALS.some(sig => q.includes(normalize(sig)));
}

function isInDomain(q) {
  return DOMAIN_SIGNALS.some(sig => q.includes(sig));
}

// ===== FIND ANSWER =====
function findAnswer(query) {
  const q = normalize(query);

  // 1. Từ chối ngay nếu rõ ràng ngoài phạm vi
  if (isOffTopic(q)) {
    return {
      answer: `🙏 Xin lỗi bạn, câu hỏi này nằm ngoài phạm vi tư vấn của mình.<br><br>
      Mình chỉ có thể hỗ trợ về:<br>
      🐟 Sản phẩm nông nghiệp & thủy sản AquaBio<br>
      🌿 Dòng sản phẩm sức khỏe Thiên Mộc<br>
      🌾 Kỹ thuật canh tác, nuôi trồng thủy sản<br>
      💰 Giá cả, đặt hàng, vận chuyển<br><br>
      Bạn có câu hỏi nào về các chủ đề trên không?`,
      suggestions: ['Sản phẩm cho nông nghiệp', 'Sản phẩm sức khỏe Thiên Mộc', 'Bảng giá']
    };
  }

  // 2. Tìm trong knowledge base (khớp TẤT CẢ từ của pattern, không chỉ 1 từ)
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE) {
    for (const pattern of entry.patterns) {
      const pNorm = normalize(pattern);
      // Score = số lượng từ của pattern xuất hiện trong câu hỏi
      const words = pNorm.split(' ');
      const matchCount = words.filter(w => w.length > 1 && q.includes(w)).length;
      const score = matchCount / words.length; // tỉ lệ khớp 0-1
      if (score >= 0.6 && matchCount > bestScore) { // phải khớp ít nhất 60%
        bestScore = matchCount;
        bestMatch = entry;
      }
    }
  }

  if (bestMatch) return { answer: bestMatch.answer, suggestions: bestMatch.suggestions || [] };

  // 3. Kiểm tra tên sản phẩm cụ thể (dùng slug 2+ từ, không dùng từ đơn)
  for (const p of PRODUCTS) {
    const pWords = normalize(p.name).split(' ').filter(w => w.length > 2);
    const matchedWords = pWords.filter(w => q.includes(w));
    if (matchedWords.length >= 2) { // phải khớp ít nhất 2 từ có nghĩa
      return {
        answer: `🔍 Bạn đang hỏi về <strong>${p.name}</strong>!<br><br>
        ${p.emoji} ${p.shortDesc}<br><br>
        💰 Giá: <strong style="color:#32e0c4;">${p.price.toLocaleString('vi-VN')}đ</strong>${p.unit}<br><br>
        Bạn muốn biết thêm chi tiết hay thêm vào giỏ hàng?`,
        suggestions: ['Thành phần chi tiết', 'Cách sử dụng', 'Thêm vào giỏ hàng']
      };
    }
  }

  // 4. Câu hỏi không xác định được chủ đề – từ chối lịch sự
  if (!isInDomain(q)) {
    return {
      answer: `🙏 Câu hỏi này mình chưa đủ thông tin để trả lời chính xác.<br><br>
      Để đảm bảo bạn nhận được câu trả lời đúng nhất, vui lòng liên hệ trực tiếp:<br>
      📞 Hotline: <strong>0900 000 000</strong> (8:00 – 18:00)<br>
      ✉️ Email: <strong>info@aquabio.vn</strong>`,
      suggestions: ['Sản phẩm nông nghiệp', 'Sản phẩm sức khỏe', 'Bảng giá']
    };
  }

  // 5. Trong domain nhưng không khớp – hỏi lại cho rõ
  return {
    answer: `🤔 Mình chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi cụ thể hơn không?<br><br>
    Ví dụ bạn có thể hỏi:<br>
    • <em>"Tinh chất đạm cá biển dùng như thế nào?"</em><br>
    • <em>"Gel dạ dày Thiên Mộc giá bao nhiêu?"</em><br>
    • <em>"Nuôi tôm thì dùng sản phẩm nào?"</em>`,
    suggestions: ['Bảng giá sản phẩm', 'Tư vấn nông nghiệp', 'Liên hệ hotline']
  };
}

// ===== DOM HELPERS =====
function addMessage(text, role) {
  const msgs = document.getElementById('chatbot-messages');
  const el = document.createElement('div');
  el.className = `message ${role}`;

  if (role === 'bot') {
    el.innerHTML = `
      <div class="msg-avatar">🌿</div>
      <div class="msg-bubble">${text}</div>`;
  } else {
    el.innerHTML = `
      <div class="msg-avatar" style="background:linear-gradient(135deg,#0d7377,#32e0c4);">👤</div>
      <div class="msg-bubble">${text}</div>`;
  }

  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
}

function showBotMessage(text, suggestions = []) {
  const msgs = document.getElementById('chatbot-messages');
  const el = document.createElement('div');
  el.className = 'message bot';

  let suggestionsHTML = '';
  if (suggestions && suggestions.length > 0) {
    suggestionsHTML = `
      <div class="quick-suggestions">
        ${suggestions.map(s => `<button class="suggestion-chip" onclick="sendSuggestion('${s.replace(/'/g, "\\'")}')">💬 ${s}</button>`).join('')}
      </div>`;
  }

  el.innerHTML = `
    <div class="msg-avatar">🌿</div>
    <div>
      <div class="msg-bubble">${text}</div>
      ${suggestionsHTML}
    </div>`;

  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
  messageHistory.push({ role: 'bot', text });
}

function showTypingThenMessage(text, suggestions = []) {
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    showBotMessage(text, suggestions);
  }, 1000 + Math.random() * 500);
}

function showTypingIndicator() {
  const msgs = document.getElementById('chatbot-messages');
  const el = document.createElement('div');
  el.className = 'message bot';
  el.id = 'typing-indicator';
  el.innerHTML = `
    <div class="msg-avatar">🌿</div>
    <div class="msg-bubble">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>`;
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTypingIndicator() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}
