/**
 * VÕ LÂM CHIBI 3D · HỆ THỐNG GIAO DIỆN & TIỆN ÍCH PORT CHUẨN TỪ BẢN 2.5D
 * 1. Kéo thả Item & Skill vào các ô phím tắt (1-6, Q, W, E, R, Trái, Phải).
 * 2. Click chuột phải vào ô phím tắt để gỡ ra ("click phải để gỡ ra").
 * 3. Click chuột vào ô shortcut skill để mở bảng chọn skill hiện có của nhân vật.
 * 4. Bảng Nhân vật (C): Đầy đủ Thuộc tính, Tiềm năng cộng điểm, Trang bị Búp bê.
 * 5. Bảng Rương / Túi đồ (I): Lưới 40 ô, Lượng, Kim Nguyên Bảo, Sắp xếp, Gom lại, Sử dụng, Trang bị.
 * 6. Bảng Kỹ năng (K): Đầy đủ 12 phái, chiêu thức chủ động, bị động, gán phím, đổi phái.
 * 7. Bảng Bang hội (H), Cài Auto (O), Thư (L), Cài đặt (Esc).
 * 8. Quản lý Modal & Canh giữa màn hình: không bao giờ bị rớt xuống đáy hay che khuất thanh hotbar.
 */

(function() {
  "use strict";

  // =========================================================================
  // 1. DỮ LIỆU NHÂN VẬT, TRANG BỊ & HÀNH TRANG (INVENTORY & STATS)
  // =========================================================================
  const charStats = {
    name: "Hiệp Khách [GM]",
    title: "Võ Lâm Minh Chủ",
    rank: 1,
    unspentPoints: 15,
    str: 285,   // Sức mạnh (Ngoại công)
    dex: 240,   // Thân pháp (Chính xác, Né tránh)
    vit: 350,   // Sinh khí (Sinh lực)
    eng: 310,   // Nội công (Nội lực, Nội công kích)
    exp: 450000,
    maxExp: 1000000,
    money: 98500,
    knb: 250,
    speedRun: false
  };

  // Trang bị đã mặc trên người (Paperdoll)
  const equippedGear = {
    weapon: { id: "thanbinh_kiem", name: "Vô Danh Giới Kiếm", type: "weapon", tier: "hoangkim", icon: "🗡️", stats: "Lực công kích: +1250 - 1580 · Tốc đánh: +30% · Hút nội lực: 5%", desc: "Bảo kiếm hoàng kim trấn phái Võ Đang, chém sắt như chém bùn." },
    helm: { id: "non_kim", name: "Lưỡng Nghi Đạo Khôi", type: "helm", tier: "hoangkim", icon: "👑", stats: "Phòng thủ: +380 · Sinh lực: +1200 · Kháng Băng: +25%", desc: "Mũ đạo gia dệt từ tơ tằm ngàn năm." },
    armor: { id: "ao_kim", name: "Thái Cực Đạo Bào", type: "armor", tier: "hoangkim", icon: "🥋", stats: "Phòng thủ: +750 · Sinh lực: +2500 · Kháng Hỏa: +30%", desc: "Đạo bào thêu đồ hình Thái Cực Âm Dương." },
    belt: { id: "dai_kim", name: "Huyền Vũ Yêu Đái", type: "belt", tier: "hoangkim", icon: "🎗️", stats: "Phòng thủ: +240 · Thể lực: +800 · Tốc độ hồi phục: +20%", desc: "Đai lưng nạm ngọc huyền vũ phương Bắc." },
    boots: { id: "giay_phivan", name: "Phi Vân Ngoa", type: "boots", tier: "hoangkim", icon: "👞", stats: "Phòng thủ: +220 · Tốc độ chạy: +40% · Né tránh: +300", desc: "Giày da kỳ lân, đi nhẹ tựa mây bay gió cuốn." },
    bracers: { id: "houyen_kim", name: "Lôi Đình Hộ Uyển", type: "bracers", tier: "hoangkim", icon: "🧤", stats: "Phòng thủ: +260 · Kháng Lôi: +35% · Chí mạng: +10%", desc: "Hộ cổ tay bằng huyền thiết nung lửa sấm sét." },
    amulet: { id: "daychuyen_kim", name: "Phù Dung Hộ Hạng", type: "amulet", tier: "hoangkim", icon: "📿", stats: "Kháng tất cả: +20% · Sinh lực: +1500 · Hồi sinh lực: +15/giây", desc: "Dây chuyền ngọc phù dung hộ thân tránh tà khí." },
    ring1: { id: "nhan_hoangkim", name: "Càn Khôn Giới Chỉ", type: "ring", tier: "hoangkim", icon: "💍", stats: "Chí mạng: +18% · Hút sinh lực: 5% · Lực công: +450", desc: "Chiếc nhẫn càn khôn chứa sức mạnh vô song." },
    ring2: null,
    pendant: { id: "ngocboi_kim", name: "Thanh Long Ngọc Bội", type: "pendant", tier: "hoangkim", icon: "🧿", stats: "May mắn: +25 · Tỉ lệ rơi đồ hoàng kim: +15%", desc: "Ngọc bội hình rồng xanh mang lại đại cát đại lợi." },
    cape: { id: "phiphong", name: "Vô Cực Phi Phong", type: "cape", tier: "hoangkim", icon: "🧣", stats: "Tất cả thuộc tính: +50 · Hào quang chí tôn", desc: "Áo choàng rạng ngời hào quang hiệp khách thiên hạ." }
  };

  window.getEquippedGear3D = function() {
    return Object.fromEntries(Object.entries(equippedGear).map(([slot, item]) => [slot, item && { ...item }]));
  };

  function readStatAmount(pattern, text) {
    const match = String(text || "").match(pattern);
    return match ? (Number(String(match[1]).replace(/,/g, "")) || 0) : 0;
  }

  function skillDescription(skill) {
    const description = skill && (skill.d || skill.desc);
    return typeof description === "string" && description.trim()
      ? description.trim()
      : "Tuyệt kỹ võ công uy lực phi phàm.";
  }

  // Đồng bộ các chỉ số đang hiển thị trên bảng nhân vật/trang bị vào bộ chiến đấu 3D.
  function getHeroCombatStats() {
    let allAttributes = 0;
    let gearAttackMin = 0, gearAttackMax = 0;
    let gearHp = 0, gearMp = 0;
    const totals = { critAdd: 0, critDmg: 0, aspdPct: 0, castPct: 0, speedPct: 0, hpRegen: 0, mpRegen: 0, hpRegPt: 0, mpRegPt: 0, leech: 0, mpLeech: 0, atkOut: 0, atkIn: 0, atkOutPct: 0, atkInPct: 0, eleDmg: 0, dmgPoison: 0, eleIn: 0 };

    for (const item of Object.values(equippedGear)) {
      const text = item && item.stats || "";
      if (!text) continue;
      allAttributes += readStatAmount(/(?:^|[·,])\s*Tất cả thuộc tính:\s*\+?([\d,]+)/i, text);
      const attack = text.match(/Lực công(?: kích)?:\s*\+?([\d,]+)(?:\s*[-–]\s*\+?([\d,]+))?/i);
      if (attack) {
        const low = Number(String(attack[1]).replace(/,/g, "")) || 0;
        const high = attack[2] ? (Number(String(attack[2]).replace(/,/g, "")) || low) : low;
        gearAttackMin += low;
        gearAttackMax += high;
      }
      gearHp += readStatAmount(/(?:^|[·,])\s*Sinh lực:\s*\+?([\d,]+)(?!\s*%)/i, text);
      gearMp += readStatAmount(/(?:^|[·,])\s*Nội lực:\s*\+?([\d,]+)(?!\s*%)/i, text);
      totals.critAdd += readStatAmount(/Chí mạng:\s*\+?([\d.]+)(?=%)/i, text);
      totals.critDmg += readStatAmount(/Chí sát thương:\s*\+?([\d.]+)(?=%)/i, text);
      totals.aspdPct += readStatAmount(/Tốc đánh:\s*\+?([\d.]+)(?=%)/i, text);
      totals.speedPct += readStatAmount(/Tốc độ chạy:\s*\+?([\d.]+)(?=%)/i, text);
      totals.hpRegen += readStatAmount(/Hồi sinh lực:\s*\+?([\d.]+)(?=%\s*\/giây)/i, text);
      totals.mpRegen += readStatAmount(/Hồi nội lực:\s*\+?([\d.]+)(?=%\s*\/giây)/i, text);
      totals.hpRegPt += readStatAmount(/Hồi sinh lực:\s*\+?([\d.]+)(?=\s*\/giây)/i, text);
      totals.mpRegPt += readStatAmount(/Hồi nội lực:\s*\+?([\d.]+)(?=\s*\/giây)/i, text);
      totals.castPct += readStatAmount(/Tốc(?: độ)? xuất chiêu:\s*\+?([\d.]+)(?=%)/i, text);
      totals.leech += readStatAmount(/Hút sinh lực:\s*\+?([\d.]+)(?=%)/i, text);
      totals.mpLeech += readStatAmount(/Hút nội lực:\s*\+?([\d.]+)(?=%)/i, text);
      totals.atkOut += readStatAmount(/Sát thương vật lý ngoại công:\s*\+?([\d,]+)(?!\s*%)/i, text);
      totals.atkIn += readStatAmount(/Sát thương vật lý nội công:\s*\+?([\d,]+)(?!\s*%)/i, text);
      totals.atkOutPct += readStatAmount(/Sát thương vật lý ngoại công:\s*\+?([\d.]+)(?=%)/i, text);
      totals.atkInPct += readStatAmount(/Sát thương vật lý nội công:\s*\+?([\d.]+)(?=%)/i, text);
      const elementalAttack = readStatAmount(/(?:Băng|Thủy|Mộc|Hỏa|Lôi|Độc|Thổ|Kim) sát ngoại công:\s*\+?([\d,]+)/i, text);
      totals.eleDmg += elementalAttack;
      totals.dmgPoison += readStatAmount(/(?:Độc|Mộc) sát ngoại công:\s*\+?([\d,]+)/i, text);
      totals.eleIn += readStatAmount(/(?:Băng|Thủy|Hỏa|Lôi) sát nội công:\s*\+?([\d,]+)/i, text);
    }

    const strength = charStats.str + allAttributes;
    const dexterity = charStats.dex + allAttributes;
    const energy = charStats.eng + allAttributes;
    // Quy đổi lực công trang bị 3D về cùng thang thuộc tính công kích của bản 2.5D.
    const equipmentAttack = (gearAttackMin + gearAttackMax) / 200;
    const atkN = 0.3 * (strength + equipmentAttack);
    const atkI = 0.3 * ((window.hero && window.hero.faction === "quyen") ? Math.max(energy, strength) + equipmentAttack : energy + equipmentAttack);
    return {
      attackMin: strength * 14 + 1500 + gearAttackMin,
      attackMax: strength * 18 + 2200 + gearAttackMax,
      // Các trường atkN/atkI/atkM là đầu vào của công thức sát thương gốc 2.5D.
      atkN,
      atkI,
      atkM: 1,
      strength,
      dexterity,
      energy,
      accuracy: 40 + dexterity * 3 + (Number(window.hero && window.hero.lv) || 1) * 5,
      critFromAttributes: 5 + dexterity * 0.03,
      hpPt: gearHp + (charStats.vit + allAttributes - 350) * 5,
      mpPt: gearMp + (charStats.eng + allAttributes - 310) * 4,
      ...totals
    };
  }

  // 40 ô hành trang (Inventory)
  const inventoryItems = [
    { id: "hp_dai", name: "Kim Sáng Dược (Đại)", kind: "pot", potType: "hp", count: 48, icon: "🧪", col: "#d8442f", desc: "Hồi phục tức thì 600 Sinh Lực." },
    { id: "mp_dai", name: "Cửu Chuyển Hoàn Hồn Đan", kind: "pot", potType: "mp", count: 35, icon: "🧪", col: "#3c73bd", desc: "Hồi phục tức thì 500 Nội Lực." },
    { id: "all_pot", name: "Thừa Tiên Mật Lộ", kind: "pot", potType: "all", count: 18, icon: "🏺", col: "#d4a024", desc: "Hồi phục toàn bộ 100% Sinh Lực và Nội Lực." },
    { id: "antidote", name: "Hoắc Hương Giải Độc Hoàn", kind: "pot", potType: "antidote", count: 22, icon: "🌿", col: "#4caf50", desc: "Hóa giải toàn bộ trạng thái độc tính." },
    { id: "tld", name: "Tu Luyện Đan", kind: "item", count: 8, icon: "📜", col: "#a855f7", desc: "Nhân đôi (x2) điểm kinh nghiệm đánh quái trong 1 giờ." },
    { id: "ttl", name: "Tiên Thảo Lộ", kind: "item", count: 5, icon: "🍶", col: "#06b6d4", desc: "Tăng 50% tỉ lệ rơi bảo vật hoàng kim trong 2 giờ." },
    { id: "huyentinh", name: "Huyền Tinh Khoáng Thạch", kind: "mat", count: 24, icon: "💎", col: "#38bdf8", desc: "Nguyên liệu trân quý dùng cường hóa trang bị lên +10." },
    { id: "hop_tanthu", name: "Rương Quà Tân Thủ", kind: "box", count: 2, icon: "🎁", col: "#f59e0b", desc: "Mở nhận ngay 100,000 lượng và trang bị hoàng kim ngẫu nhiên." },
    { id: "kiem_xanh", name: "Thanh Phong Bảo Kiếm", kind: "gear", type: "weapon", tier: "xanh", icon: "🗡️", col: "#60a5fa", stats: "Lực công kích: +420 - 580 · Tốc đánh: +15%", desc: "Thanh kiếm tôi luyện bằng thép xanh sắc bén." },
    { id: "ao_xanh", name: "Bạch Hổ Chiến Giáp", kind: "gear", type: "armor", tier: "xanh", icon: "🥋", col: "#60a5fa", stats: "Phòng thủ: +350 · Sinh lực: +800", desc: "Áo giáp da hổ bền bỉ bảo vệ thân thể." },
    { id: "giay_xanh", name: "Đạp Tuyết Ngoa", kind: "gear", type: "boots", tier: "xanh", icon: "👞", col: "#60a5fa", stats: "Phòng thủ: +120 · Tốc độ chạy: +20%", desc: "Giày nhẹ bước nhanh trên tuyết trắng." }
  ];

  // =========================================================================
  // 2. BẢNG PHÍM TẮT (SHORTCUT SLOTS STATE & MAPPING)
  // =========================================================================
  // Slot 1..6: Potions/Items
  // Slot Q, W, E, R: Skills
  // Slot Left, Right: Mouse Skills
  const shortcutBarState = {
    "1": { type: "item", id: "hp_dai", name: "Sinh Lực", icon: "🧪", col: "#d8442f", potType: "hp" },
    "2": { type: "item", id: "mp_dai", name: "Nội Lực", icon: "🧪", col: "#3c73bd", potType: "mp" },
    "3": { type: "item", id: "all_pot", name: "Cửu Chuyển", icon: "🏺", col: "#d4a024", potType: "all" },
    "4": { type: "item", id: "antidote", name: "Giải Độc", icon: "🌿", col: "#4caf50", potType: "antidote" },
    "5": null,
    "6": null,
    "Q": null,
    "W": null,
    "E": null,
    "R": null,
    "left": null,
    "right": null
  };

  // =========================================================================
  // 3. QUẢN LÝ MODAL (MODAL BACKDROP, CENTERING & ESC CLOSE)
  // =========================================================================
  const ALL_MODAL_IDS = [
    "helpGuideModal", "npcDialogModal", "charModal", "bagModal",
    "skillModal", "guildModal", "autoModal", "mailModal", "settingsModal",
    "factionModal", "xaPhuModal", "mapModal", "skillSelectorPopup"
  ];

  function getBackdrop() {
    let bd = document.getElementById("modalBackdrop");
    if (!bd) {
      bd = document.createElement("div");
      bd.id = "modalBackdrop";
      bd.style.cssText = "position:fixed; inset:0; background:rgba(0,0,0,0.62); backdrop-filter:blur(3px); z-index:1100; display:none;";
      bd.onclick = () => window.closeAllModals3D();
      document.body.appendChild(bd);
    }
    return bd;
  }

  window.openModal3D = function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    // Hiển thị backdrop
    const bd = getBackdrop();
    bd.style.display = "block";

    // Mở modal dạng flex column căn giữa
    modal.style.display = "flex";
    modal.style.flexDirection = "column";

    // Render dữ liệu tương ứng
    if (modalId === "charModal") renderCharModalUI();
    if (modalId === "bagModal") renderBagModalUI();
    if (modalId === "skillModal") renderSkillModalUI();
    if (modalId === "mailModal") renderMailModalUI();
  };

  window.closeModal3D = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "none";

    // Kiểm tra xem còn modal nào đang mở không
    const anyOpen = ALL_MODAL_IDS.some(id => {
      const el = document.getElementById(id);
      return el && el.style.display !== "none" && el.style.display !== "";
    });

    if (!anyOpen) {
      const bd = getBackdrop();
      bd.style.display = "none";
    }
  };

  window.closeAllModals3D = function() {
    ALL_MODAL_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
    const bd = getBackdrop();
    bd.style.display = "none";
  };

  // Toggle các bảng chức năng
  window.toggleCharModal = function() {
    const el = document.getElementById("charModal");
    if (el && el.style.display === "flex") window.closeModal3D("charModal");
    else window.openModal3D("charModal");
  };

  window.toggleBagModal = function() {
    const el = document.getElementById("bagModal");
    if (el && el.style.display === "flex") window.closeModal3D("bagModal");
    else window.openModal3D("bagModal");
  };

  window.toggleSkillModal = function() {
    const el = document.getElementById("skillModal");
    if (el && el.style.display === "flex") window.closeModal3D("skillModal");
    else window.openModal3D("skillModal");
  };

  window.toggleGuildModal = function() {
    const el = document.getElementById("guildModal");
    if (el && el.style.display === "flex") window.closeModal3D("guildModal");
    else window.openModal3D("guildModal");
  };

  window.toggleAutoModal = function() {
    const el = document.getElementById("autoModal");
    if (el && el.style.display === "flex") window.closeModal3D("autoModal");
    else window.openModal3D("autoModal");
  };

  window.toggleMailModal = function() {
    const el = document.getElementById("mailModal");
    if (el && el.style.display === "flex") window.closeModal3D("mailModal");
    else window.openModal3D("mailModal");
  };

  window.toggleSettingsModal = function() {
    const el = document.getElementById("settingsModal");
    if (el && el.style.display === "flex") window.closeModal3D("settingsModal");
    else window.openModal3D("settingsModal");
  };

  window.toggleRun3D = function() {
    charStats.speedRun = !charStats.speedRun;
    if (window.hero) {
      window.hero.speed = charStats.speedRun ? 22.0 : 13.0;
    }
    const btn = document.getElementById("btnRunToggle");
    if (btn) {
      btn.style.color = charStats.speedRun ? "#8ef0a0" : "#f1e5c9";
      btn.style.borderColor = charStats.speedRun ? "#8ef0a0" : "";
    }
    window.toast3D(charStats.speedRun ? "🏃 Chuyển sang <b>Chạy Bộ Nhanh</b> (Tốc độ 22.0)" : "🚶 Chuyển sang <b>Đi Bộ Thư Thái</b> (Tốc độ 13.0)");
  };

  // =========================================================================
  // 4. BẢNG NHÂN VẬT (CHARACTER MODAL - PHÍM C)
  // =========================================================================
  let currentCharTab = "attr";

  window.switchCharTab = function(tab) {
    currentCharTab = tab;
    renderCharModalUI();
  };

  window.addPotentialPoint = function(attr) {
    if (charStats.unspentPoints <= 0) {
      window.toast3D("Đã hết điểm tiềm năng chưa cộng!");
      return;
    }
    const oldHp = window.hero && window.hero.hp;
    const oldMp = window.hero && window.hero.mp;
    charStats.unspentPoints--;
    charStats[attr] += 5;
    if (window.syncHeroCombatVitals) {
      window.syncHeroCombatVitals();
      if (attr === "vit" && window.hero) window.hero.hp = Math.min(window.hero.maxHp, oldHp + 25);
      if (attr === "eng" && window.hero) window.hero.mp = Math.min(window.hero.maxMp, oldMp + 20);
    } else if (window.hero && attr === "vit") {
      window.hero.maxHp += 25;
      window.hero.hp = Math.min(window.hero.maxHp, window.hero.hp + 25);
    } else if (window.hero && attr === "eng") {
      window.hero.maxMp += 20;
      window.hero.mp = Math.min(window.hero.maxMp, window.hero.mp + 20);
    }
    window.toast3D(`✨ Tăng <b>${attr === 'str' ? 'Sức Mạnh' : attr === 'dex' ? 'Thân Pháp' : attr === 'vit' ? 'Sinh Khí' : 'Nội Công'}</b> +5 điểm!`);
    renderCharModalUI();
    if (window.updateVitalsUI) window.updateVitalsUI();
  };

  window.resetPotentialPoints = function() {
    const total = (charStats.str - 285) + (charStats.dex - 240) + (charStats.vit - 350) + (charStats.eng - 310);
    if (total <= 0 && charStats.unspentPoints >= 15) {
      window.toast3D("Chưa có điểm nào để tẩy!");
      return;
    }
    charStats.unspentPoints += Math.max(0, Math.floor(total / 5));
    charStats.str = 285;
    charStats.dex = 240;
    charStats.vit = 350;
    charStats.eng = 310;
    if (window.syncHeroCombatVitals) window.syncHeroCombatVitals();
    window.toast3D("🔮 <b>Tẩy Điểm Tiềm Năng thành công!</b> Bạn có thể cộng lại toàn bộ điểm.");
    renderCharModalUI();
    if (window.updateVitalsUI) window.updateVitalsUI();
  };

  function renderCharModalUI() {
    const body = document.getElementById("charModalBody");
    if (!body) return;

    const tAttrBtn = document.getElementById("cTabAttr");
    const tEqBtn = document.getElementById("cTabEq");
    if (tAttrBtn && tEqBtn) {
      tAttrBtn.style.background = (currentCharTab === "attr") ? "linear-gradient(180deg,#c8902a,#7a5212)" : "";
      tAttrBtn.style.borderColor = (currentCharTab === "attr") ? "#ffd24a" : "";
      tAttrBtn.style.color = (currentCharTab === "attr") ? "#ffd24a" : "";
      tEqBtn.style.background = (currentCharTab === "eq") ? "linear-gradient(180deg,#c8902a,#7a5212)" : "";
      tEqBtn.style.borderColor = (currentCharTab === "eq") ? "#ffd24a" : "";
      tEqBtn.style.color = (currentCharTab === "eq") ? "#ffd24a" : "";
    }

    const heroObj = window.hero || { hp: 1397, maxHp: 1397, mp: 987, maxMp: 987, lv: 200, faction: "kiem" };
    const curFac = (window.ALL_FACTION_DATA && window.ALL_FACTION_DATA[heroObj.faction]) || { name: "Võ Đang", element: "Thổ", icon: "☯️" };
    const combatStats = getHeroCombatStats();

    if (currentCharTab === "attr") {
      body.innerHTML = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:14px; font-size:12.5px;">
          <!-- Cột Trái: Thông tin cơ bản & Tiềm năng -->
          <div style="background:rgba(20,13,8,0.7); border:1px solid #4a3420; border-radius:8px; padding:12px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px; border-bottom:1px solid #3e2816; padding-bottom:8px;">
              <span style="font-size:26px;">👤</span>
              <div>
                <div style="font-size:15px; font-weight:700; color:#ffd24a;">${charStats.name}</div>
                <div style="font-size:11px; color:#8ef0a0;">${charStats.title} · Cấp ${heroObj.lv}</div>
              </div>
            </div>

            <div style="margin-bottom:6px;"><span style="color:#bfae8c;">Môn phái:</span> <b style="color:#ffd24a;">${curFac.icon} ${curFac.name}</b> (Hệ ${curFac.element})</div>
            <div style="margin-bottom:6px;"><span style="color:#bfae8c;">Xếp hạng:</span> <b style="color:#8ef0a0;">Hạng ${charStats.rank} Toàn Server</b></div>
            <div style="margin-bottom:10px;"><span style="color:#bfae8c;">Kinh nghiệm:</span> <span style="color:#ffd24a;">${charStats.exp.toLocaleString()} / ${charStats.maxExp.toLocaleString()}</span></div>

            <div style="border-top:1px dashed #4a3420; padding-top:8px; margin-top:8px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <b style="color:#ffd24a;">Điểm tiềm năng:</b>
                <span style="color:#8ef0a0; font-weight:700; font-size:14px;">${charStats.unspentPoints} điểm</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin:4px 0;">
                <span>Sức Mạnh (Ngoại công): <b style="color:#ffd24a;">${charStats.str}</b></span>
                <button class="btn sm" onclick="addPotentialPoint('str')" ${charStats.unspentPoints<=0?'disabled style="opacity:0.5;"':''}>+5</button>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin:4px 0;">
                <span>Thân Pháp (Né, Chính xác): <b style="color:#ffd24a;">${charStats.dex}</b></span>
                <button class="btn sm" onclick="addPotentialPoint('dex')" ${charStats.unspentPoints<=0?'disabled style="opacity:0.5;"':''}>+5</button>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin:4px 0;">
                <span>Sinh Khí (Sinh lực): <b style="color:#ffd24a;">${charStats.vit}</b></span>
                <button class="btn sm" onclick="addPotentialPoint('vit')" ${charStats.unspentPoints<=0?'disabled style="opacity:0.5;"':''}>+5</button>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin:4px 0;">
                <span>Nội Công (Nội lực, Nội công): <b style="color:#ffd24a;">${charStats.eng}</b></span>
                <button class="btn sm" onclick="addPotentialPoint('eng')" ${charStats.unspentPoints<=0?'disabled style="opacity:0.5;"':''}>+5</button>
              </div>
              <button class="btn sm" onclick="resetPotentialPoints()" style="margin-top:10px; width:100%; background:linear-gradient(180deg,#8a2818,#441208); border-color:#e05240;">🔮 Tẩy Tiềm Năng (Miễn Phí)</button>
            </div>
          </div>

          <!-- Cột Phải: Chỉ số chiến đấu & Kháng tính -->
          <div style="background:rgba(20,13,8,0.7); border:1px solid #4a3420; border-radius:8px; padding:12px;">
            <b style="color:#ffd24a; font-size:13.5px; display:block; margin-bottom:8px; border-bottom:1px solid #3e2816; padding-bottom:6px;">⚔️ Thuộc Tính Chiến Đấu</b>
            <div style="line-height:1.8;">
              <div>❤️ Sinh lực (HP): <b style="color:#ff6a55;">${heroObj.hp} / ${heroObj.maxHp}</b></div>
              <div>💙 Nội lực (MP): <b style="color:#5fabe6;">${heroObj.mp} / ${heroObj.maxMp}</b></div>
              <div>⚡ Lực công kích: <b style="color:#ffd24a;">${Math.round(combatStats.attackMin).toLocaleString()} - ${Math.round(combatStats.attackMax).toLocaleString()}</b></div>
              <div>🛡️ Phòng thủ vật lý: <b style="color:#8ef0a0;">${(charStats.vit * 2.5 + 450).toFixed(0)}</b></div>
              <div>🎯 Độ chính xác: <b style="color:#ffd24a;">${Math.round(combatStats.accuracy).toLocaleString()}</b></div>
              <div>💨 Né tránh: <b style="color:#8ef0a0;">${(charStats.dex * 3.5 + 150).toFixed(0)}</b></div>
              <div>🏃 Tốc độ di chuyển: <b style="color:#ffd24a;">${heroObj.speed || 13.0} m/s</b> (${charStats.speedRun ? 'Chạy bộ' : 'Đi bộ'})</div>
              <div style="border-top:1px dashed #4a3420; margin-top:8px; padding-top:6px;">
                <b style="color:#ffd24a;">Ngũ Hành Kháng Tính:</b>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px; margin-top:4px;">
                  <div>❄️ Kháng Băng: <b style="color:#7ec8ff;">+45%</b></div>
                  <div>🔥 Kháng Hỏa: <b style="color:#ff7a55;">+50%</b></div>
                  <div>⚡ Kháng Lôi: <b style="color:#ffd24a;">+65%</b></div>
                  <div>☠️ Kháng Độc: <b style="color:#8ef0a0;">+40%</b></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      // Tab Trang Bị Paperdoll
      body.innerHTML = `
        <div style="display:flex; justify-content:space-between; gap:16px;">
          <!-- Cột trái: Mũ, Áo, Đai, Giày -->
          <div style="display:flex; flex-direction:column; gap:10px; width:140px;">
            ${renderEquipSlot("helm", "Mũ", equippedGear.helm)}
            ${renderEquipSlot("armor", "Áo Giáp", equippedGear.armor)}
            ${renderEquipSlot("belt", "Đai Lưng", equippedGear.belt)}
            ${renderEquipSlot("boots", "Giày", equippedGear.boots)}
          </div>

          <!-- Búp bê trung tâm nhân vật Chibi -->
          <div style="flex:1; text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:center; background:radial-gradient(circle at 50% 50%, #3e2617, #130b07 80%); border:1px solid #5a3c22; border-radius:10px; padding:14px;">
            <div style="font-size:75px; filter:drop-shadow(0 6px 12px #000); animation:floatChibi 2.5s infinite alternate ease-in-out;">🧙‍♂️</div>
            <div style="margin-top:10px; font-weight:700; color:#ffd24a; font-size:14px;">${charStats.name}</div>
            <div style="font-size:11px; color:#8ef0a0;">Võ Lâm Chibi 3D · Đầy Đủ Hoàng Kim</div>
            <div style="margin-top:12px; font-size:11px; color:#bfae8c; max-width:180px;">💡 Nhấp vào món trang bị để tháo ra hoặc xem thuộc tính.</div>
          </div>

          <!-- Cột phải: Vũ khí, Hộ uyển, Dây chuyền, Nhẫn, Bội, Phi phong -->
          <div style="display:flex; flex-direction:column; gap:10px; width:140px;">
            ${renderEquipSlot("weapon", "Vũ Khí", equippedGear.weapon)}
            ${renderEquipSlot("bracers", "Hộ Uyển", equippedGear.bracers)}
            ${renderEquipSlot("amulet", "Dây Chuyền", equippedGear.amulet)}
            ${renderEquipSlot("ring1", "Nhẫn 1", equippedGear.ring1)}
            ${renderEquipSlot("pendant", "Ngọc Bội", equippedGear.pendant)}
          </div>
        </div>
      `;
    }
  }

  function renderEquipSlot(slotKey, label, item) {
    if (!item) {
      return `
        <div style="border:1.5px dashed #5a4228; border-radius:6px; padding:6px; display:flex; align-items:center; gap:8px; background:rgba(20,13,8,0.5); min-height:46px;">
          <div style="width:34px; height:34px; border-radius:4px; background:#18100b; display:flex; align-items:center; justify-content:center; color:#5a4228; font-size:18px;">⭕</div>
          <span style="font-size:11px; color:#7a5a3a;">Trống (${label})</span>
        </div>
      `;
    }
    const borderCol = item.tier === "hoangkim" ? "#ffd24a" : "#60a5fa";
    return `
      <div onclick="unequipItem('${slotKey}')" style="border:1.5px solid ${borderCol}; border-radius:6px; padding:6px; display:flex; align-items:center; gap:8px; background:rgba(35,22,14,0.85); cursor:pointer; min-height:46px; transition:transform 0.15s;" title="${item.name}: ${item.stats} (Bấm để gỡ ra)">
        <div style="width:34px; height:34px; border-radius:4px; background:#22140c; border:1px solid ${borderCol}; display:flex; align-items:center; justify-content:center; font-size:18px;">${item.icon}</div>
        <div style="overflow:hidden; text-align:left;">
          <div style="font-size:11.5px; font-weight:700; color:${borderCol}; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${item.name}</div>
          <div style="font-size:9.5px; color:#8ef0a0;">+10 Hoàng Kim</div>
        </div>
      </div>
    `;
  }

  window.unequipItem = function(slotKey) {
    const it = equippedGear[slotKey];
    if (!it) return;
    equippedGear[slotKey] = null;
    inventoryItems.push({
      id: it.id,
      name: it.name,
      kind: "gear",
      type: it.type,
      tier: it.tier,
      icon: it.icon,
      stats: it.stats,
      desc: it.desc,
      count: 1
    });
    if (window.syncHeroCombatVitals) window.syncHeroCombatVitals();
    window.toast3D(`🛡️ Đã tháo <b>${it.name}</b> vào Túi Đồ!`);
    renderCharModalUI();
    renderBagModalUI();
  };

  // =========================================================================
  // 5. BẢNG TÚI ĐỒ / RƯƠNG (INVENTORY MODAL - PHÍM I)
  // =========================================================================
  let selectedBagIndex = -1;

  window.renderBagModalUI = function() {
    const grid = document.getElementById("bagGridContainer");
    if (!grid) return;

    // Cập nhật số tiền
    const mEl = document.getElementById("bagMoneyTxt");
    if (mEl) mEl.textContent = `${charStats.money.toLocaleString()} Lượng`;
    const kEl = document.getElementById("bagKnbTxt");
    if (kEl) kEl.textContent = `${charStats.knb.toLocaleString()} KNB`;

    grid.innerHTML = "";
    // Vẽ 40 ô
    for (let i = 0; i < 40; i++) {
      const it = inventoryItems[i];
      const cell = document.createElement("div");
      cell.className = "bag-cell";
      cell.style.cssText = `
        position:relative; width:44px; height:44px; border-radius:5px;
        background:#1a100c; border:1.5px solid ${i === selectedBagIndex ? '#ffd24a' : '#5a4228'};
        display:flex; align-items:center; justify-content:center; font-size:20px;
        cursor:pointer; user-select:none; transition:border-color 0.15s;
        box-shadow:inset 0 0 6px rgba(0,0,0,0.7);
      `;

      if (it) {
        cell.draggable = true;
        cell.innerHTML = `
          <span>${it.icon || '📦'}</span>
          ${it.count > 1 ? `<span style="position:absolute; right:2px; bottom:1px; font-size:9.5px; font-weight:700; color:#fff; text-shadow:0 1px 2px #000;">${it.count}</span>` : ''}
        `;
        cell.title = `${it.name} ${it.count > 1 ? '('+it.count+')' : ''}\n${it.desc || it.stats || ''}\n(Kéo thả vào ô phím tắt 1-6 để gán)`;

        // Sự kiện Kéo Thả từ Bag ra thanh phím tắt
        cell.ondragstart = (e) => {
          e.dataTransfer.setData("text/plain", JSON.stringify({ source: "bag", index: i, item: it }));
        };

        // Click để xem chi tiết
        cell.onclick = () => {
          selectedBagIndex = i;
          renderBagModalUI();
        };

        // Double click để sử dụng ngay
        cell.ondblclick = () => {
          useBagItem(i);
        };
      } else {
        cell.onclick = () => {
          selectedBagIndex = -1;
          renderBagModalUI();
        };
      }

      grid.appendChild(cell);
    }

    // Chi tiết món đồ được chọn
    const dBox = document.getElementById("bagItemDetailBox");
    if (dBox) {
      const sel = inventoryItems[selectedBagIndex];
      if (sel) {
        dBox.innerHTML = `
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
            <span style="font-size:26px;">${sel.icon}</span>
            <div>
              <b style="color:${sel.tier === 'hoangkim' ? '#ffd24a' : '#8ef0a0'}; font-size:13.5px;">${sel.name}</b>
              <div style="font-size:11px; color:#bfae8c;">${sel.stats || sel.desc}</div>
            </div>
          </div>
          <div style="display:flex; gap:8px; margin-top:8px;">
            <button class="btn sm" onclick="useBagItem(${selectedBagIndex})" style="background:linear-gradient(180deg,#2b7d44,#124522); border-color:#3bb25d;">${sel.kind === 'gear' ? '🛡️ Trang Bị' : '✨ Sử Dụng'}</button>
            <button class="btn sm" onclick="dropBagItem(${selectedBagIndex})" style="background:linear-gradient(180deg,#8a2818,#441208); border-color:#e05240;">🗑️ Vứt Bỏ</button>
          </div>
        `;
      } else {
        dBox.innerHTML = `<span style="color:#7a5a3a; font-size:11.5px;">Chọn một vật phẩm trong hành trang để xem chi tiết, kéo thả vào thanh phím tắt 1-6 hoặc nhấp đúp để dùng.</span>`;
      }
    }
  };

  window.useBagItem = function(idx) {
    const it = inventoryItems[idx];
    if (!it) return;

    if (it.kind === "pot") {
      if (window.usePotion3D) window.usePotion3D(it.potType);
      it.count--;
      if (it.count <= 0) inventoryItems.splice(idx, 1);
    } else if (it.kind === "gear") {
      // Đổi trang bị
      const old = equippedGear[it.type];
      equippedGear[it.type] = { ...it };
      inventoryItems.splice(idx, 1);
      if (old) inventoryItems.push(old);
      if (window.syncHeroCombatVitals) window.syncHeroCombatVitals();
      window.toast3D(`🛡️ Đã trang bị <b>${it.name}</b> thành công!`);
    } else if (it.kind === "box") {
      // Mở rương quà
      it.count--;
      if (it.count <= 0) inventoryItems.splice(idx, 1);
      charStats.money += 50000;
      charStats.knb += 50;
      window.toast3D("🎁 <b>Mở Rương Quà Tân Thủ:</b> Nhận 50,000 Lượng · 50 Kim Nguyên Bảo!");
    } else {
      window.toast3D(`✨ Đã sử dụng <b>${it.name}</b>!`);
      it.count--;
      if (it.count <= 0) inventoryItems.splice(idx, 1);
    }

    renderBagModalUI();
    renderCharModalUI();
  };

  window.dropBagItem = function(idx) {
    const it = inventoryItems[idx];
    if (!it) return;
    window.toast3D(`🗑️ Đã vứt bỏ <b>${it.name}</b>.`);
    inventoryItems.splice(idx, 1);
    selectedBagIndex = -1;
    renderBagModalUI();
  };

  window.sortBagItems = function() {
    inventoryItems.sort((a, b) => {
      const order = { pot: 1, gear: 2, mat: 3, box: 4, item: 5 };
      return (order[a.kind] || 9) - (order[b.kind] || 9);
    });
    window.toast3D("🔄 <b>Đã sắp xếp</b> toàn bộ vật phẩm trong hành trang ngăn nắp!");
    renderBagModalUI();
  };

  window.gatherBagItems = function() {
    const map = {};
    const gathered = [];
    for (const it of inventoryItems) {
      if (it.kind === "pot" || it.kind === "mat" || it.kind === "box") {
        if (map[it.id]) {
          map[it.id].count += it.count;
        } else {
          map[it.id] = { ...it };
          gathered.push(map[it.id]);
        }
      } else {
        gathered.push(it);
      }
    }
    inventoryItems.length = 0;
    inventoryItems.push(...gathered);
    window.toast3D("📦 <b>Gom lại thành công:</b> Các dược phẩm và nguyên liệu cùng loại đã xếp chồng!");
    renderBagModalUI();
  };

  // =========================================================================
  // 6. BẢNG KỸ NĂNG MÔN PHÁI (SKILL MODAL - PHÍM K)
  // =========================================================================
  window.renderSkillModalUI = function() {
    const body = document.getElementById("skillModalBody");
    if (!body) return;

    const heroObj = window.hero || { faction: "kiem" };
    const curFac = (window.ALL_FACTION_DATA && window.ALL_FACTION_DATA[heroObj.faction]) || { name: "Võ Đang", element: "Thổ", icon: "☯️", routes: [] };

    let html = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid #4a3420; padding-bottom:10px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:28px;">${curFac.icon || '⚔️'}</span>
          <div>
            <h3 style="margin:0; font-size:16px; color:#ffd24a;">Môn Phái: ${curFac.name} (Hệ ${curFac.element})</h3>
            <span style="font-size:11.5px; color:#bfae8c;">${curFac.desc || 'Võ học uy chấn giang hồ.'}</span>
          </div>
        </div>
        <button class="btn sm" onclick="window.closeModal3D('skillModal'); window.openFactionModal();" style="background:linear-gradient(180deg,#c8902a,#7a5212); border-color:#ffd24a; color:#ffd24a;">⛩️ Đổi Môn Phái Khác</button>
      </div>
      <div style="font-size:11.5px; color:#8ef0a0; margin-bottom:10px;">💡 Mẹo: Có thể <b>Kéo & Thả</b> thẻ kỹ năng vào các ô phím tắt [Q, W, E, R, Trái, Phải], hoặc bấm các nút gán nhanh!</div>
    `;

    if (curFac.routes && curFac.routes.length > 0) {
      curFac.routes.forEach((route, rIdx) => {
        html += `
          <div style="background:rgba(20,13,8,0.7); border:1px solid #4a3420; border-radius:8px; padding:10px; margin-bottom:12px;">
            <div style="font-weight:700; color:#ffd24a; font-size:13.5px; margin-bottom:8px; border-bottom:1px solid #3e2816; padding-bottom:4px;">
              Nhánh Võ Công: ${route.name}
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        `;
        route.skills.forEach((sk, sIdx) => {
          const isPassive = (sk.kind === "passive");
          html += `
            <div class="skill-card-drag" draggable="${!isPassive}" ondragstart="handleSkillCardDrag(event, '${curFac.id}', ${rIdx}, ${sIdx})" style="border:1.5px solid #5a4228; border-radius:6px; padding:8px; background:rgba(30,19,12,0.85); display:flex; flex-direction:column; gap:4px; cursor:${isPassive ? 'default' : 'grab'};">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <b style="color:${sk.color || '#ffd24a'}; font-size:12.5px;">${curFac.icon || '⚔️'} ${sk.name} <span style="font-size:10px; color:#ffd24a; font-weight:normal;">(${sk.vl > 0 ? 'Cấp ' + sk.vl : 'Cơ Bản'})</span></b>
                <span style="font-size:10px; padding:1px 5px; border-radius:3px; background:${isPassive ? '#4a3a22' : '#2b5a32'}; color:#e8ffe8;">${isPassive ? 'Bị Động' : 'Chủ Động'}</span>
              </div>
              <div style="font-size:11px; color:#bfae8c; line-height:1.4;">${skillDescription(sk)}</div>
              ${!isPassive ? `
                <div style="display:flex; gap:3px; margin-top:4px; flex-wrap:wrap;">
                  <button class="btn sm" onclick="assignSkillToSlot('${sk.name}', 'Q')" style="font-size:9.5px; padding:1px 4px;">Gán [Q]</button>
                  <button class="btn sm" onclick="assignSkillToSlot('${sk.name}', 'W')" style="font-size:9.5px; padding:1px 4px;">Gán [W]</button>
                  <button class="btn sm" onclick="assignSkillToSlot('${sk.name}', 'E')" style="font-size:9.5px; padding:1px 4px;">Gán [E]</button>
                  <button class="btn sm" onclick="assignSkillToSlot('${sk.name}', 'R')" style="font-size:9.5px; padding:1px 4px;">Gán [R]</button>
                  <button class="btn sm" onclick="assignSkillToSlot('${sk.name}', 'left')" style="font-size:9.5px; padding:1px 4px; color:#8ef0a0;">[Trái]</button>
                  <button class="btn sm" onclick="assignSkillToSlot('${sk.name}', 'right')" style="font-size:9.5px; padding:1px 4px; color:#ffd24a;">[Phải]</button>
                </div>
              ` : ''}
            </div>
          `;
        });
        html += `</div></div>`;
      });
    }

    body.innerHTML = html;
  };

  window.handleSkillCardDrag = function(e, facId, rIdx, sIdx) {
    const fac = window.ALL_FACTION_DATA && window.ALL_FACTION_DATA[facId];
    if (!fac) return;
    const skill = fac.routes[rIdx].skills[sIdx];
    e.dataTransfer.setData("text/plain", JSON.stringify({ source: "skill", skillName: skill.name, skill }));
  };

  window.assignSkillToSlot = function(skillName, slotKey) {
    const heroObj = window.hero || { faction: "kiem" };
    const curFac = (window.ALL_FACTION_DATA && window.ALL_FACTION_DATA[heroObj.faction]);
    if (!curFac) return;

    let foundSkill = null;
    for (const r of curFac.routes) {
      const s = r.skills.find(sk => sk.name === skillName);
      if (s) { foundSkill = s; break; }
    }
    if (!foundSkill) return;

    shortcutBarState[slotKey] = {
      type: "skill",
      name: foundSkill.name,
      icon: curFac.icon || "⚔️",
      color: foundSkill.color || "#ffd24a",
      desc: skillDescription(foundSkill),
      skillObj: foundSkill
    };

    window.toast3D(`⚔️ Đã gán tuyệt kỹ <b>[${foundSkill.name}]</b> vào phím tắt <b>[${slotKey}]</b>!`);
    updateShortcutBarUI();
  };

  // =========================================================================
  // 7. MENU CHỌN SKILL NHANH (SKILL SELECTOR POPUP KHI CLICK VÀO Ô SKILL)
  // =========================================================================
  let currentTargetSkillSlot = "Q";

  window.openSkillSelectorPopup = function(slotKey, event) {
    if (event) event.stopPropagation();
    currentTargetSkillSlot = slotKey;

    const popup = document.getElementById("skillSelectorPopup");
    if (!popup) return;

    const heroObj = window.hero || { faction: "kiem" };
    const curFac = (window.ALL_FACTION_DATA && window.ALL_FACTION_DATA[heroObj.faction]) || { name: "Võ Đang", routes: [] };

    const titleEl = document.getElementById("skPopupTitle");
    if (titleEl) titleEl.textContent = `Chọn Chiêu Thức Cho [Phím ${slotKey}]`;

    const listEl = document.getElementById("skPopupList");
    if (listEl) {
      listEl.innerHTML = "";
      const allActive = [];
      curFac.routes.forEach(r => {
        r.skills.forEach(sk => {
          if (sk.kind !== "passive") allActive.push(sk);
        });
      });

      allActive.forEach(sk => {
        const item = document.createElement("div");
        item.style.cssText = `
          display:flex; align-items:center; gap:8px; padding:6px 10px; border-radius:5px;
          background:#22150d; border:1px solid #5a3c22; cursor:pointer; transition:all 0.15s;
        `;
        item.innerHTML = `
          <span style="font-size:20px;">${curFac.icon || '⚔️'}</span>
          <div style="flex:1;">
            <div style="font-size:12px; font-weight:700; color:${sk.color || '#ffd24a'};">${sk.name}</div>
            <div style="font-size:10px; color:#bfae8c; line-height:1.3;">${skillDescription(sk)}</div>
          </div>
        `;
        item.onmouseenter = () => { item.style.borderColor = "#ffd24a"; item.style.background = "#3a2215"; };
        item.onmouseleave = () => { item.style.borderColor = "#5a3c22"; item.style.background = "#22150d"; };
        item.onclick = () => {
          window.assignSkillToSlot(sk.name, currentTargetSkillSlot);
          popup.style.display = "none";
        };
        listEl.appendChild(item);
      });
    }

    // Định vị ngay phía trên thanh hotbar
    popup.style.display = "flex";
    popup.style.flexDirection = "column";
  };

  window.closeSkillSelectorPopup = function() {
    const popup = document.getElementById("skillSelectorPopup");
    if (popup) popup.style.display = "none";
  };

  window.unassignCurrentSkillSlot = function() {
    window.unassignShortcut(currentTargetSkillSlot);
    window.closeSkillSelectorPopup();
  };

  // =========================================================================
  // 8. KÉO THẢ SHORTCUT & CLICK PHẢI GỠ BỎ (SHORTCUT DRAG & DROP & CONTEXTMENU)
  // =========================================================================
  window.unassignShortcut = function(slotKey) {
    if (!shortcutBarState[slotKey]) return;
    shortcutBarState[slotKey] = null;
    window.toast3D(`🗑️ Đã gỡ bỏ phím tắt <b>[${slotKey}]</b>!`);
    updateShortcutBarUI();
  };

  window.handleSlotRightClick = function(e, slotKey) {
    e.preventDefault();
    e.stopPropagation();
    window.unassignShortcut(slotKey);
  };

  window.handleSlotDragStart = function(e, slotKey) {
    if (!shortcutBarState[slotKey]) return;
    e.dataTransfer.setData("text/plain", JSON.stringify({ source: "bar", slotKey, data: shortcutBarState[slotKey] }));
  };

  window.handleSlotDragOver = function(e, slotEl) {
    e.preventDefault();
    if (slotEl) {
      slotEl.style.borderColor = "#ffd24a";
      slotEl.style.boxShadow = "0 0 10px rgba(255,210,74,0.7)";
    }
  };

  window.handleSlotDragLeave = function(e, slotEl) {
    if (slotEl) {
      slotEl.style.borderColor = "";
      slotEl.style.boxShadow = "";
    }
  };

  window.handleSlotDrop = function(e, targetSlotKey, slotEl) {
    e.preventDefault();
    if (slotEl) {
      slotEl.style.borderColor = "";
      slotEl.style.boxShadow = "";
    }

    try {
      const raw = e.dataTransfer.getData("text/plain");
      if (!raw) return;
      const payload = JSON.parse(raw);

      if (payload.source === "bar") {
        // Hoán đổi giữa 2 ô shortcut
        const srcKey = payload.slotKey;
        const temp = shortcutBarState[targetSlotKey];
        shortcutBarState[targetSlotKey] = shortcutBarState[srcKey];
        shortcutBarState[srcKey] = temp;
        window.toast3D(`🔄 Đã hoán đổi phím tắt [${srcKey}] và [${targetSlotKey}]!`);
      } else if (payload.source === "bag") {
        // Kéo từ túi đồ thả vào ô 1..6
        const item = payload.item;
        shortcutBarState[targetSlotKey] = {
          type: "item",
          id: item.id,
          name: item.name,
          icon: item.icon,
          col: item.col,
          potType: item.potType || "hp"
        };
        window.toast3D(`🎯 Đã gán <b>[${item.name}]</b> vào phím tắt <b>[${targetSlotKey}]</b>! Nhấp phải để gỡ bỏ.`);
      } else if (payload.source === "skill") {
        // Kéo từ bảng kỹ năng thả vào ô Q, W, E, R, Trái, Phải
        const sk = payload.skill;
        const heroObj = window.hero || { faction: "kiem" };
        const curFac = (window.ALL_FACTION_DATA && window.ALL_FACTION_DATA[heroObj.faction]) || {};
        shortcutBarState[targetSlotKey] = {
          type: "skill",
          name: sk.name,
          icon: curFac.icon || "⚔️",
          color: sk.color || "#ffd24a",
          desc: skillDescription(sk),
          skillObj: sk
        };
        window.toast3D(`⚔️ Đã gán tuyệt kỹ <b>[${sk.name}]</b> vào phím tắt <b>[${targetSlotKey}]</b>! Nhấp phải để gỡ bỏ.`);
      }
      updateShortcutBarUI();
    } catch(err) {
      console.error(err);
    }
  };

  // Cập nhật giao diện thanh hotbar chuẩn xác
  function updateShortcutBarUI() {
    // 1. Cập nhật 6 ô dược phẩm (1-6)
    for (let i = 1; i <= 6; i++) {
      const sKey = String(i);
      const slotEl = document.getElementById("slot_pot_" + sKey);
      if (!slotEl) continue;

      const state = shortcutBarState[sKey];
      slotEl.oncontextmenu = (e) => window.handleSlotRightClick(e, sKey);
      slotEl.ondragover = (e) => window.handleSlotDragOver(e, slotEl);
      slotEl.ondragleave = (e) => window.handleSlotDragLeave(e, slotEl);
      slotEl.ondrop = (e) => window.handleSlotDrop(e, sKey, slotEl);

      if (state && state.type === "item") {
        slotEl.draggable = true;
        slotEl.ondragstart = (e) => window.handleSlotDragStart(e, sKey);
        slotEl.title = `Phím [${sKey}]: ${state.name} (Bấm dùng · Click phải để gỡ bỏ)`;
        slotEl.onclick = () => {
          if (window.usePotion3D) window.usePotion3D(state.potType);
        };
        const iconSpan = slotEl.querySelector(".pot-ico");
        if (iconSpan) iconSpan.textContent = state.icon || "🧪";
        const lblSpan = slotEl.querySelector(".lbl");
        if (lblSpan) lblSpan.textContent = state.name.slice(0, 5);
      } else {
        slotEl.draggable = false;
        slotEl.title = `Ô Phím [${sKey}] Trống (Kéo dược phẩm từ Túi Đồ vào đây)`;
        slotEl.onclick = () => window.toggleBagModal();
        const iconSpan = slotEl.querySelector(".pot-ico");
        if (iconSpan) iconSpan.textContent = "";
        const lblSpan = slotEl.querySelector(".lbl");
        if (lblSpan) lblSpan.textContent = "";
      }
    }

    // 2. Cập nhật 4 ô kỹ năng Q, W, E, R
    ["Q", "W", "E", "R"].forEach((k, idx) => {
      const slotEl = document.getElementById("slot_sk_" + k);
      if (!slotEl) return;

      const state = shortcutBarState[k];
      slotEl.oncontextmenu = (e) => window.handleSlotRightClick(e, k);
      slotEl.ondragover = (e) => window.handleSlotDragOver(e, slotEl);
      slotEl.ondragleave = (e) => window.handleSlotDragLeave(e, slotEl);
      slotEl.ondrop = (e) => window.handleSlotDrop(e, k, slotEl);

      // Nhấp chuột vào ô kỹ năng để chọn nhanh skill
      slotEl.onclick = (e) => window.openSkillSelectorPopup(k, e);

      if (state) {
        slotEl.draggable = true;
        slotEl.ondragstart = (e) => window.handleSlotDragStart(e, k);
        slotEl.title = `Phím [${k}]: ${state.name || 'Tuyệt kỹ'} (Bấm chuột chọn skill khác · Click phải để gỡ bỏ)`;
        const ico = slotEl.querySelector(".sk-ico");
        if (ico) ico.textContent = state.icon || "⚔️";
        const lbl = slotEl.querySelector(".lbl");
        if (lbl) lbl.textContent = (state.name || "").split(" ").slice(0, 2).join(" ");
      } else {
        slotEl.draggable = false;
        slotEl.title = `Phím [${k}] Trống (Click chuột để chọn skill)`;
        const ico = slotEl.querySelector(".sk-ico");
        if (ico) ico.textContent = "+";
        const lbl = slotEl.querySelector(".lbl");
        if (lbl) lbl.textContent = "Chọn";
      }
    });

    // 3. Cập nhật 2 ô chuột trái & phải
    ["left", "right"].forEach(m => {
      const slotEl = document.getElementById("slot_sk_" + m);
      if (!slotEl) return;

      const state = shortcutBarState[m];
      slotEl.oncontextmenu = (e) => window.handleSlotRightClick(e, m);
      slotEl.ondragover = (e) => window.handleSlotDragOver(e, slotEl);
      slotEl.ondragleave = (e) => window.handleSlotDragLeave(e, slotEl);
      slotEl.ondrop = (e) => window.handleSlotDrop(e, m, slotEl);

      slotEl.onclick = (e) => window.openSkillSelectorPopup(m, e);

      if (state) {
        slotEl.draggable = true;
        slotEl.ondragstart = (e) => window.handleSlotDragStart(e, m);
        slotEl.title = `Chuột [${m === 'left' ? 'Trái' : 'Phải'}]: ${state.name || 'Tuyệt kỹ'} (Bấm chuột chọn skill khác · Click phải để gỡ bỏ)`;
        const ico = slotEl.querySelector(".sk-ico");
        if (ico) ico.textContent = state.icon || (m === "left" ? "⚡" : "❄");
        const lbl = slotEl.querySelector(".lbl");
        if (lbl) lbl.textContent = (state.name || "").split(" ").slice(0, 2).join(" ");
      } else {
        slotEl.draggable = false;
        const ico = slotEl.querySelector(".sk-ico");
        if (ico) ico.textContent = "+";
        const lbl = slotEl.querySelector(".lbl");
        if (lbl) lbl.textContent = "Chọn";
      }
    });
  }

  // Khởi động đồng bộ phím tắt với phái mặc định
  function initDefaultShortcutsForFaction() {
    const heroObj = window.hero || { faction: "kiem" };
    const curFac = (window.ALL_FACTION_DATA && window.ALL_FACTION_DATA[heroObj.faction]) || (window.ALL_FACTION_DATA && window.ALL_FACTION_DATA.kiem) || { icon: "☯️" };

    const equippedSkills = Array.isArray(heroObj.equippedSkills)
      ? heroObj.equippedSkills.filter(Boolean)
      : [];
    const defSkills = equippedSkills.length
      ? equippedSkills
      : (curFac.defaultSkills && curFac.defaultSkills.length > 0) ? [...curFac.defaultSkills] : [];
    if (defSkills.length === 0 && curFac.routes) {
      curFac.routes.forEach(r => {
        r.skills.forEach(sk => {
          if (sk.kind !== "passive") defSkills.push(sk);
        });
      });
    }

    if (defSkills[0]) {
      shortcutBarState["Q"] = { type: "skill", name: defSkills[0].name, icon: curFac.icon || "⚔️", desc: defSkills[0].desc, skillObj: defSkills[0] };
      shortcutBarState["left"] = { type: "skill", name: defSkills[0].name, icon: curFac.icon || "⚡", desc: defSkills[0].desc, skillObj: defSkills[0] };
    } else {
      shortcutBarState["Q"] = null;
      shortcutBarState["left"] = null;
    }
    if (defSkills[1]) {
      shortcutBarState["W"] = { type: "skill", name: defSkills[1].name, icon: curFac.icon || "🗡️", desc: defSkills[1].desc, skillObj: defSkills[1] };
      shortcutBarState["right"] = { type: "skill", name: defSkills[1].name, icon: curFac.icon || "❄", desc: defSkills[1].desc, skillObj: defSkills[1] };
    } else {
      shortcutBarState["W"] = null;
      shortcutBarState["right"] = null;
    }
    if (defSkills[2]) {
      shortcutBarState["E"] = { type: "skill", name: defSkills[2].name, icon: curFac.icon || "✨", desc: defSkills[2].desc, skillObj: defSkills[2] };
    } else shortcutBarState["E"] = null;
    if (defSkills[3]) {
      shortcutBarState["R"] = { type: "skill", name: defSkills[3].name, icon: curFac.icon || "👑", desc: defSkills[3].desc, skillObj: defSkills[3] };
    } else shortcutBarState["R"] = null;

    if (window.hero) {
      window.hero.equippedSkills = defSkills.slice(0, 4);
    }

    updateShortcutBarUI();
  }

  // =========================================================================
  // 9. CÁC BẢNG TIỆN ÍCH KHÁC (BANG HỘI, AUTO, THƯ, CÀI ĐẶT)
  // =========================================================================
  window.claimAllMailReward = function() {
    charStats.money += 50000;
    inventoryItems.push({ id: "tld_mail", name: "Tu Luyện Đan", kind: "item", count: 10, icon: "📜", col: "#a855f7", desc: "Nhân đôi EXP trong 1 giờ." });
    window.toast3D("🎁 <b>Đã nhận toàn bộ quà thư tín:</b> 50,000 Lượng · 10 Tu Luyện Đan!");
    const btn = document.getElementById("btnClaimMail");
    if (btn) { btn.disabled = true; btn.textContent = "✅ Đã Nhận Quà"; }
    renderBagModalUI();
  };

  function renderMailModalUI() {
    // Có sẵn trong HTML
  }

  // Phím tắt toàn cục bổ sung
  window.addEventListener("keydown", function(e) {
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
    const k = e.key.toLowerCase();
    if (k === "c") { e.preventDefault(); window.toggleCharModal(); }
    else if (k === "i") { e.preventDefault(); window.toggleBagModal(); }
    else if (k === "k") { e.preventDefault(); window.toggleSkillModal(); }
    else if (k === "o") { e.preventDefault(); window.toggleAutoModal(); }
    else if (k === "l") { e.preventDefault(); window.toggleMailModal(); }
  });

  // Khởi chạy ngay lập tức & bảo đảm nạp hoàn chỉnh phím tắt
  window.getHeroCombatStats = getHeroCombatStats;
  if (window.syncHeroCombatVitals) window.syncHeroCombatVitals();
  initDefaultShortcutsForFaction();
  setTimeout(initDefaultShortcutsForFaction, 50);
  setTimeout(initDefaultShortcutsForFaction, 250);
  window.addEventListener("load", initDefaultShortcutsForFaction);
  document.addEventListener("DOMContentLoaded", initDefaultShortcutsForFaction);

  // Xuất các hàm ra ngoài window
  window.shortcutBarState = shortcutBarState;
  window.initDefaultShortcutsForFaction = initDefaultShortcutsForFaction;
  window.updateShortcutBarUI = updateShortcutBarUI;
  window.renderCharModalUI = renderCharModalUI;
  window.renderBagModalUI = renderBagModalUI;

})();

