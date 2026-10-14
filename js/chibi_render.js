/**
 * CHIBI SPRITES RENDERER FOR VÕ LÂM CHIBI (Võ Lâm Truyền Kỳ Chibi Edition)
 * Vẽ nhân vật, quái vật (Thỏ, Sói, Heo, Thảo Khấu, Boss), NPC theo đúng phong cách Chibi Cổ Điển siêu đẹp!
 */

(function(global) {
  "use strict";

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function shade(hex, percent) {
    if (typeof hex !== "string" || hex[0] !== "#" || hex.length !== 7) return hex;
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    const target = percent < 0 ? 0 : 255;
    const p = Math.abs(percent);
    r = Math.round(r + (target - r) * p);
    g = Math.round(g + (target - g) * p);
    b = Math.round(b + (target - b) * p);
    return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
  }

  // ==========================================================
  // 1. VẼ THỎ TRẮNG CHIBI (Cực kỳ dễ thương, tai dài, mắt ngọc)
  // ==========================================================
  function drawChibiRabbit(ctx, cx, cy, opt) {
    opt = opt || {};
    const ang = opt.ang || 0; // góc nhìn tương đối
    const walk = opt.walk || 0;
    const isMoving = !!opt.moving;
    const hit = opt.hit || 0;
    const time = opt.time || 0;

    const hop = isMoving ? Math.abs(Math.sin(walk * 2.5)) * 10 : Math.sin(time * 3) * 1.5;
    const earTwitch = Math.sin(time * 4.5) * 0.12;
    const facingRight = Math.cos(ang) >= 0;
    const frontFactor = Math.sin(ang); // 1 = nhìn thẳng, -1 = nhìn sau

    ctx.save();
    ctx.translate(cx, cy - hop);
    if (!facingRight) ctx.scale(-1, 1);

    if (hit > 0) {
      ctx.fillStyle = "rgba(255, 60, 40, 0.4)";
    }

    // Bóng đổ dưới chân
    ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
    ctx.beginPath();
    ctx.ellipse(0, hop + 2, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Đuôi bông gòn tròn
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(-11, -8, 5, 0, Math.PI * 2);
    ctx.fill();

    // Chân sau
    ctx.fillStyle = "#ece8e2";
    ctx.beginPath();
    ctx.ellipse(-6, -2, 6, 4, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Thân thỏ mũm mĩm hình quả trứng
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(-2, -10, 13, 11, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Chân trước
    const legSwing = isMoving ? Math.sin(walk * 3) * 3 : 0;
    ctx.fillStyle = "#f5f3ef";
    ctx.beginPath();
    ctx.ellipse(6 + legSwing, -3, 4, 3, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Đầu thỏ Chibi to tròn
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(6, -22, 12, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tai Thỏ (2 chiếc tai dài viền trắng trong hồng)
    for (let i = 0; i < 2; i++) {
      ctx.save();
      const earX = 3 + i * 5;
      const earY = -30;
      ctx.translate(earX, earY);
      ctx.rotate((i === 0 ? -0.15 : 0.15) + earTwitch + (isMoving ? -0.15 : 0));
      // Tai ngoài
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(0, -9, 4, 11, 0, 0, Math.PI * 2);
      ctx.fill();
      // Tai trong hồng phấn
      ctx.fillStyle = "#ffb6c8";
      ctx.beginPath();
      ctx.ellipse(0, -9, 2.2, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Má hồng Chibi
    ctx.fillStyle = "rgba(255, 150, 160, 0.55)";
    ctx.beginPath();
    ctx.arc(8, -19, 3.2, 0, Math.PI * 2);
    ctx.fill();

    // Mắt ngọc đỏ ruby long lanh
    if (frontFactor > -0.6) {
      ctx.fillStyle = "#d8223d";
      ctx.beginPath();
      ctx.ellipse(11, -22, 2.8, 3.5, 0.05, 0, Math.PI * 2);
      ctx.fill();
      // Tròng sáng
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(12, -23.5, 1.2, 0, Math.PI * 2);
      ctx.arc(10.5, -20.5, 0.7, 0, Math.PI * 2);
      ctx.fill();

      // Mũi tam giác hồng nhỏ & miệng
      ctx.fillStyle = "#ff8fa3";
      ctx.beginPath();
      ctx.moveTo(16, -20); ctx.lineTo(17.5, -18.8); ctx.lineTo(16, -17.8);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  // ==========================================================
  // 2. VẼ SÓI XÁM & ĐỘC LANG VƯƠNG (Oai phong, Chibi dũng mãnh)
  // ==========================================================
  function drawChibiWolf(ctx, cx, cy, opt) {
    opt = opt || {};
    const ang = opt.ang || 0;
    const walk = opt.walk || 0;
    const isMoving = !!opt.moving;
    const isBoss = !!opt.boss;
    const hit = opt.hit || 0;
    const time = opt.time || 0;

    const scale = isBoss ? 1.55 : 1.05;
    const baseCol = isBoss ? "#2c1a40" : "#727882";
    const darkCol = shade(baseCol, -0.35);
    const bellyCol = isBoss ? "#4c2872" : "#9ca4af";
    const eyeCol = isBoss ? "#ff36d4" : "#ffcc00";

    const breath = Math.sin(time * 3) * 1.2;
    const legPhase = walk * 1.8;
    const facingRight = Math.cos(ang) >= 0;
    const frontFactor = Math.sin(ang);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale * (facingRight ? 1 : -1), scale);

    // Vòng hào quang tím ma quái nếu là Boss Độc Lang Vương
    if (isBoss) {
      ctx.save();
      const auraPulse = Math.sin(time * 4) * 0.15 + 0.85;
      const grad = ctx.createRadialGradient(0, -18, 5, 0, -18, 35 * auraPulse);
      grad.addColorStop(0, "rgba(180, 50, 255, 0.35)");
      grad.addColorStop(0.7, "rgba(120, 20, 200, 0.15)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, -18, 35 * auraPulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Bóng đổ
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.beginPath();
    ctx.ellipse(0, 2, 22, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Đuôi lông xù xì quẫy mạnh
    const tailWag = Math.sin(time * (isMoving ? 7 : 3)) * 0.25;
    ctx.save();
    ctx.translate(-18, -16);
    ctx.rotate(-0.4 + tailWag);
    ctx.fillStyle = darkCol;
    ctx.beginPath();
    ctx.ellipse(-10, 4, 13, 6, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = baseCol;
    ctx.beginPath();
    ctx.ellipse(-12, 4, 10, 4, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2 Chân sau
    for (let side = -1; side <= 1; side += 2) {
      const sw = isMoving ? Math.sin(legPhase + (side > 0 ? 0 : Math.PI)) * 5 : 0;
      ctx.fillStyle = darkCol;
      ctx.beginPath();
      ctx.ellipse(-11, -3 + sw * 0.3, 4.5, 7, -0.15, 0, Math.PI * 2);
      ctx.fill();
      // Bàn chân
      ctx.fillStyle = "#222222";
      ctx.beginPath();
      ctx.ellipse(-10 + sw, 1, 4, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Thân sói cơ bắp
    ctx.fillStyle = darkCol;
    ctx.beginPath();
    ctx.ellipse(0, -15 + breath * 0.3, 19, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = baseCol;
    ctx.beginPath();
    ctx.ellipse(1, -15 + breath * 0.3, 17, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    // Bụng sáng màu
    ctx.fillStyle = bellyCol;
    ctx.beginPath();
    ctx.ellipse(2, -12, 12, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2 Chân trước
    for (let side = -1; side <= 1; side += 2) {
      const sw = isMoving ? Math.sin(legPhase + (side > 0 ? Math.PI : 0)) * 6 : 0;
      ctx.fillStyle = side > 0 ? baseCol : darkCol;
      ctx.beginPath();
      ctx.ellipse(10, -5 + sw * 0.3, 4, 8, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#222222";
      ctx.beginPath();
      ctx.ellipse(11 + sw, 1, 4, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Bờm lông cổ xù lên oai dũng
    ctx.fillStyle = darkCol;
    ctx.beginPath();
    ctx.moveTo(8, -25);
    ctx.lineTo(3, -13);
    ctx.lineTo(13, -15);
    ctx.lineTo(8, -7);
    ctx.lineTo(18, -12);
    ctx.lineTo(15, -24);
    ctx.closePath();
    ctx.fill();

    // Đầu Sói Chibi
    ctx.fillStyle = baseCol;
    ctx.beginPath();
    ctx.ellipse(13, -24, 12, 10, 0.15, 0, Math.PI * 2);
    ctx.fill();

    // Mõm sói sắc nhọn & Răng nanh trắng
    ctx.fillStyle = darkCol;
    ctx.beginPath();
    ctx.moveTo(17, -25);
    ctx.lineTo(26, -21);
    ctx.lineTo(18, -17);
    ctx.closePath();
    ctx.fill();
    // Mũi đen
    ctx.fillStyle = "#111111";
    ctx.beginPath();
    ctx.arc(26, -21, 2.2, 0, Math.PI * 2);
    ctx.fill();
    // Răng nanh trắng
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(21, -19); ctx.lineTo(22.5, -15.5); ctx.lineTo(23.5, -19);
    ctx.closePath();
    ctx.fill();

    // Hai tai sói nhọn vểnh
    for (let i = 0; i < 2; i++) {
      ctx.fillStyle = darkCol;
      ctx.beginPath();
      const earX = 8 + i * 6;
      ctx.moveTo(earX - 3, -31);
      ctx.lineTo(earX + 1, -41 - (isBoss ? 3 : 0));
      ctx.lineTo(earX + 5, -30);
      ctx.closePath();
      ctx.fill();
      // Lòng tai hồng tối
      ctx.fillStyle = isBoss ? "#6c2850" : "#a86868";
      ctx.beginPath();
      ctx.moveTo(earX - 1, -32);
      ctx.lineTo(earX + 1, -38);
      ctx.lineTo(earX + 3, -31);
      ctx.closePath();
      ctx.fill();
    }

    // Mắt sói sắc lẹm rực sáng
    if (frontFactor > -0.65) {
      ctx.fillStyle = eyeCol;
      ctx.beginPath();
      ctx.moveTo(15, -26);
      ctx.lineTo(21, -24);
      ctx.lineTo(17, -22);
      ctx.closePath();
      ctx.fill();
      // Con ngươi sói
      ctx.fillStyle = "#111111";
      ctx.beginPath();
      ctx.ellipse(18, -24, 1.0, 2.0, 0.1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Hiệu ứng chớp đỏ khi trúng đòn
    if (hit > 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.fill();
    }

    ctx.restore();
  }

  // ==========================================================
  // 3. VẼ HEO RỪNG CHIBI (Mập mạp, nanh cong, cực ngộ nghĩnh)
  // ==========================================================
  function drawChibiBoar(ctx, cx, cy, opt) {
    opt = opt || {};
    const ang = opt.ang || 0;
    const walk = opt.walk || 0;
    const isMoving = !!opt.moving;
    const hit = opt.hit || 0;
    const time = opt.time || 0;

    const baseCol = "#6c4028";
    const darkCol = "#4a2a18";
    const snoutCol = "#c47a66";
    const trot = isMoving ? Math.sin(walk * 2.2) * 4 : 0;
    const facingRight = Math.cos(ang) >= 0;
    const frontFactor = Math.sin(ang);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1.2 * (facingRight ? 1 : -1), 1.2);

    // Bóng
    ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
    ctx.beginPath();
    ctx.ellipse(0, 2, 20, 6.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Đuôi xoăn tít
    ctx.strokeStyle = darkCol;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(-16, -14, 4, 0, Math.PI * 1.6);
    ctx.stroke();

    // 4 Chân ngắn cũn cỡn bước lon ton
    for (const [lx, sgn] of [[-10, -1], [-7, 1], [8, -1], [11, 1]]) {
      const sw = isMoving ? Math.sin(walk * 2.5 + sgn * Math.PI * 0.5) * 4.5 : 0;
      ctx.fillStyle = darkCol;
      ctx.beginPath();
      ctx.rect(lx + sw * 0.4, -6, 5, 8);
      ctx.fill();
      // Móng guốc đen
      ctx.fillStyle = "#1e140d";
      ctx.beginPath();
      ctx.rect(lx + sw * 0.4, 0, 5, 2.5);
      ctx.fill();
    }

    // Thân heo tròn ủm như chiếc bánh mì nướng
    ctx.fillStyle = darkCol;
    ctx.beginPath();
    ctx.ellipse(0, -14, 18, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = baseCol;
    ctx.beginPath();
    ctx.ellipse(0, -14, 16.5, 11.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lông bờm dựng trên lưng
    ctx.fillStyle = "#2e180c";
    ctx.beginPath();
    ctx.moveTo(-10, -25);
    for (let i = -10; i <= 10; i += 4) {
      ctx.lineTo(i + 2, -28 - (i % 3));
      ctx.lineTo(i + 4, -25);
    }
    ctx.closePath();
    ctx.fill();

    // Đầu heo to
    ctx.fillStyle = baseCol;
    ctx.beginPath();
    ctx.ellipse(11, -16, 11, 10, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Mũi to tròn hồng hào đặc trưng
    ctx.fillStyle = snoutCol;
    ctx.beginPath();
    ctx.ellipse(20, -14, 5.5, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    // 2 Lỗ mũi tròn đen
    ctx.fillStyle = "#4a1c12";
    ctx.beginPath();
    ctx.ellipse(21, -16, 1.3, 1.8, 0, 0, Math.PI * 2);
    ctx.ellipse(21, -12, 1.3, 1.8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cặp nanh trắng cong vút lên ngầu lòi
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(17, -13);
    ctx.quadraticCurveTo(20, -7, 24, -18);
    ctx.quadraticCurveTo(21, -12, 18, -11);
    ctx.closePath();
    ctx.fill();

    // Tai vểnh hình lá gập
    ctx.fillStyle = darkCol;
    ctx.beginPath();
    ctx.ellipse(6, -24, 4.5, 6, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#8a5238";
    ctx.beginPath();
    ctx.ellipse(6, -24, 2.5, 4, -0.4, 0, Math.PI * 2);
    ctx.fill();

    // Mắt ti hí đen nhánh
    if (frontFactor > -0.7) {
      ctx.fillStyle = "#111111";
      ctx.beginPath();
      ctx.arc(14, -19, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(14.8, -19.8, 0.9, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // ==========================================================
  // 4. VẼ THẢO KHẤU CHIBI (Sơn Tặc khăn đỏ, cầm đại đao)
  // ==========================================================
  function drawChibiBandit(ctx, cx, cy, opt) {
    opt = opt || {};
    const ang = opt.ang || 0;
    const walk = opt.walk || 0;
    const isMoving = !!opt.moving;
    const hit = opt.hit || 0;
    const time = opt.time || 0;

    const facingRight = Math.cos(ang) >= 0;
    const swing = isMoving ? Math.sin(walk * 2.2) * 5 : 0;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1.2 * (facingRight ? 1 : -1), 1.2);

    // Bóng
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.beginPath();
    ctx.ellipse(0, 2, 16, 5.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hai chân đi ủng da
    for (const [lx, sgn] of [[-4, -1], [4, 1]]) {
      const sw = isMoving ? Math.sin(walk * 2.2 + sgn * Math.PI * 0.5) * 4 : 0;
      ctx.fillStyle = "#2a1e16";
      ctx.beginPath();
      ctx.rect(lx + sw * 0.3, -8, 4, 9);
      ctx.fill();
      ctx.fillStyle = "#160e0a";
      ctx.beginPath();
      ctx.ellipse(lx + 1 + sw, 1, 3.5, 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Áo giáp da nâu thảo khấu
    ctx.fillStyle = "#4a3222";
    ctx.beginPath();
    ctx.ellipse(0, -18, 9, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    // Đai lưng đỏ
    ctx.fillStyle = "#b82b18";
    ctx.fillRect(-8, -13, 16, 3.5);

    // Đầu Chibi to tròn
    ctx.fillStyle = "#e0b088";
    ctx.beginPath();
    ctx.arc(0, -32, 11, 0, Math.PI * 2);
    ctx.fill();

    // Khăn quấn đầu đỏ Sơn Tặc
    ctx.fillStyle = "#c82618";
    ctx.beginPath();
    ctx.ellipse(0, -38, 11.5, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Vạt khăn bay phấp phới
    ctx.beginPath();
    ctx.moveTo(-10, -38); ctx.lineTo(-18, -32 + Math.sin(time * 4) * 2); ctx.lineTo(-14, -40);
    ctx.closePath();
    ctx.fill();

    // Mắt bịt một bên cướp biển ngầu lòi
    ctx.fillStyle = "#1a120c";
    ctx.beginPath();
    ctx.arc(-3, -33, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#1a120c";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-10, -35); ctx.lineTo(4, -30);
    ctx.stroke();

    // Mắt còn lại trợn trừng
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(4, -33, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#111111";
    ctx.beginPath();
    ctx.arc(4.5, -33, 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Râu kẽm hung tợn
    ctx.fillStyle = "#2a1a10";
    ctx.beginPath();
    ctx.arc(0, -25, 4.5, 0, Math.PI);
    ctx.fill();

    // Tay cầm Đại Đao thép sáng loáng
    ctx.save();
    ctx.translate(9, -20);
    ctx.rotate(0.3 + swing * 0.05);
    // Cán đao gỗ
    ctx.fillStyle = "#4a2a14";
    ctx.fillRect(-2, -18, 3, 26);
    // Lưỡi đao thép cong bản to
    ctx.fillStyle = "#e0e6ed";
    ctx.beginPath();
    ctx.moveTo(1, -18);
    ctx.lineTo(8, -26);
    ctx.quadraticCurveTo(12, -16, 2, -4);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  // ==========================================================
  // 5. VẼ HIỆP KHÁCH CHIBI (Võ Đang kiếm hiệp siêu ngầu)
  // ==========================================================
  function drawChibiHero(ctx, cx, cy, opt) {
    opt = opt || {};
    const ang = opt.ang || 0;
    const walk = opt.walk || 0;
    const isMoving = !!opt.moving;
    const isAttacking = !!opt.attacking;
    const isCasting = !!opt.casting;
    const castCharge = Math.max(0, Math.min(1, Number(opt.castCharge) || 0));
    const castColor = opt.castColor || "#a8dcff";
    const attackPose = opt.attackPose || "slash";
    const hop = Math.max(0, Number(opt.hop) || 0);
    const time = opt.time || 0;

    const facingRight = Math.cos(ang) >= 0;
    const swing = isMoving ? Math.sin(walk * 2.5) * 5 : 0;
    const breath = Math.sin(time * 3) * 1.0;

    ctx.save();
    ctx.translate(cx, cy - hop);
    ctx.scale(1.25 * (facingRight ? 1 : -1), 1.25);

    // Vòng tròn bóng đổ
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.beginPath();
    ctx.ellipse(0, 2 + hop, 17, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Khí tụ quanh thân và tay cầm kiếm trong nhịp gồng chiêu, theo tư thế cast của bản 2.5D.
    if (isCasting) {
      const pulse = 0.72 + Math.sin(time * 14) * 0.18;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.22 + castCharge * 0.2;
      ctx.fillStyle = castColor;
      ctx.shadowColor = castColor;
      ctx.shadowBlur = 14 + castCharge * 12;
      ctx.beginPath();
      ctx.ellipse(0, -22, 13 + pulse * 3, 21 + pulse * 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.65 + castCharge * 0.25;
      ctx.lineWidth = 1.4;
      for (let ring = 0; ring < 2; ring++) {
        const phase = time * (ring ? -2.8 : 3.4) + ring * Math.PI;
        ctx.beginPath();
        ctx.ellipse(0, -20, 15 + ring * 4, 8 + ring * 3, phase, 0, Math.PI * 1.55);
        ctx.strokeStyle = castColor;
        ctx.stroke();
      }
      for (let mote = 0; mote < 5; mote++) {
        const angle = time * 2.5 + mote * Math.PI * 2 / 5;
        const x = Math.cos(angle) * (10 + castCharge * 4);
        const y = -22 + Math.sin(angle) * (12 + castCharge * 3);
        ctx.globalAlpha = 0.45 + 0.45 * Math.sin(time * 8 + mote);
        ctx.beginPath();
        ctx.arc(x, y, 1.2 + castCharge * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Hai chân bước võ học
    for (const [lx, sgn] of [[-4.5, -1], [4.5, 1]]) {
      const sw = isMoving ? Math.sin(walk * 2.5 + sgn * Math.PI * 0.5) * 4 : 0;
      ctx.fillStyle = "#1e2a38";
      ctx.beginPath();
      ctx.rect(lx + sw * 0.3, -8, 4, 9);
      ctx.fill();
      ctx.fillStyle = "#0c1218";
      ctx.beginPath();
      ctx.ellipse(lx + 1 + sw, 1, 3.8, 2.2, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Tà áo đạo bào xanh ngọc Võ Đang
    ctx.fillStyle = "#2b547e";
    ctx.beginPath();
    ctx.ellipse(0, -18 + breath * 0.2, 10, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    // Viền áo trắng ngà
    ctx.strokeStyle = "#f0ebd8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -30); ctx.lineTo(-4, -12);
    ctx.moveTo(0, -30); ctx.lineTo(4, -12);
    ctx.stroke();

    // Đai lưng gấm vàng óng
    ctx.fillStyle = "#d4a024";
    ctx.fillRect(-9, -13, 18, 3.5);
    // Ngọc bội đeo hông
    ctx.fillStyle = "#3c9a68";
    ctx.beginPath();
    ctx.arc(-6, -8, 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Đầu Chibi đáng yêu
    ctx.fillStyle = "#f5d0aa";
    ctx.beginPath();
    ctx.arc(0, -33, 12, 0, Math.PI * 2);
    ctx.fill();

    // Tóc đen búi củ tỏi cổ trang & trâm ngọc
    ctx.fillStyle = "#181412";
    ctx.beginPath();
    ctx.arc(0, -42, 6, 0, Math.PI * 2);
    ctx.fill();
    // Trâm ngọc đỏ
    ctx.fillStyle = "#c82618";
    ctx.fillRect(-8, -43, 16, 2);

    // Nón lá trúc / nón giang hồ trên lưng
    ctx.fillStyle = "#c8aa68";
    ctx.beginPath();
    ctx.ellipse(-10, -22, 6, 12, 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Mắt Chibi to tròn long lanh, phong thái chính trực
    ctx.fillStyle = "#1a120c";
    ctx.beginPath();
    ctx.ellipse(4, -33, 2.8, 4.2, 0.05, 0, Math.PI * 2);
    ctx.fill();
    // Đốm sáng phản chiếu trong mắt
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(5, -35, 1.4, 0, Math.PI * 2);
    ctx.arc(3.5, -31.5, 0.8, 0, Math.PI * 2);
    ctx.fill();

    // Lông mày kiếm cương nghị
    ctx.strokeStyle = "#1a120c";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(1, -38); ctx.lineTo(8, -36);
    ctx.stroke();

    // Tay cầm Thanh Kiếm phát quang (Bảo Kiếm Võ Lâm Chibi)
    ctx.save();
    const poseAngles = { chop: 0.82, thrust: 1.35, punch: 0.62, throw: -1.1, dualR: 0.55, dualL: 1.55, twirl: -1.8 };
    const poseAngle = poseAngles[attackPose] ?? 0;
    const atkAngle = isCasting
      ? -0.85 + Math.sin(time * 7) * 0.08
      : isAttacking
        ? attackPose === "spin" || attackPose === "twirl" ? poseAngle + Math.sin(time * 22) * 1.15 : poseAngle + Math.sin(time * 16) * 0.24
        : -0.3 + swing * 0.06;
    ctx.translate(10, -20);
    ctx.rotate(atkAngle);

    // Chuôi kiếm vàng & bao kiếm
    ctx.fillStyle = "#c89a3a";
    ctx.fillRect(-2, -8, 4, 8);
    // Đốc kiếm hoa văn
    ctx.fillRect(-5, -8, 10, 2.5);

    // Lưỡi kiếm thép sắc bén tỏa ánh lam ngọc
    const swordGrad = ctx.createLinearGradient(0, -38, 0, -8);
    swordGrad.addColorStop(0, "#ffffff");
    swordGrad.addColorStop(0.5, "#a8d8ff");
    swordGrad.addColorStop(1, "#5ea2e4");
    ctx.fillStyle = swordGrad;
    ctx.beginPath();
    ctx.moveTo(-1.8, -8);
    ctx.lineTo(-1.8, -34);
    ctx.lineTo(0, -39);
    ctx.lineTo(1.8, -34);
    ctx.lineTo(1.8, -8);
    ctx.closePath();
    ctx.fill();
    // Sống kiếm phản quang
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Vệt hào quang kiếm khí nếu đang đánh
    if (isAttacking) {
      ctx.strokeStyle = castColor;
      ctx.globalAlpha = 0.82;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, -22, 22, -Math.PI * 0.4, Math.PI * 0.4);
      ctx.stroke();
    }

    ctx.restore();
    ctx.restore();
  }

  // ==========================================================
  // 6. VẼ CÁC NPC THÔN TRẤN CHIBI (Trưởng Trấn, Thầy Thuốc, Thợ Rèn...)
  // ==========================================================
  function drawChibiNpc(ctx, cx, cy, type, opt) {
    opt = opt || {};
    const time = opt.time || 0;
    const breath = Math.sin(time * 2.5) * 1.0;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1.2, 1.2);

    // Bóng
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.beginPath();
    ctx.ellipse(0, 2, 16, 5.5, 0, 0, Math.PI * 2);
    ctx.fill();

    if (type === "elder") {
      // Trưởng Trấn: Áo quan gấm đỏ, râu dài trắng muốt, tay cầm gậy trúc
      ctx.fillStyle = "#8a241e";
      ctx.beginPath(); ctx.ellipse(0, -18 + breath * 0.2, 11, 14, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#e0be88";
      ctx.beginPath(); ctx.arc(0, -33, 11, 0, Math.PI * 2); ctx.fill();
      // Mũ quan cánh chuồn
      ctx.fillStyle = "#1e140d";
      ctx.fillRect(-8, -44, 16, 5);
      ctx.fillRect(-16, -42, 32, 2.5);
      // Râu dài trắng
      ctx.fillStyle = "#f5f5f5";
      ctx.beginPath();
      ctx.moveTo(-6, -28); ctx.quadraticCurveTo(0, -14, 6, -28);
      ctx.closePath(); ctx.fill();
      // Mắt hiền từ
      ctx.strokeStyle = "#222222"; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(-3, -33, 2, Math.PI, 0); ctx.stroke();
      ctx.beginPath(); ctx.arc(3, -33, 2, Math.PI, 0); ctx.stroke();
      // Gậy trúc
      ctx.strokeStyle = "#4fa07c"; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(11, -38); ctx.lineTo(13, 2); ctx.stroke();
    } else if (type === "smith") {
      // Thiết Tượng: Thợ rèn lực lưỡng, tạp dề da, búa rèn
      ctx.fillStyle = "#3d2a1c";
      ctx.beginPath(); ctx.ellipse(0, -18 + breath * 0.2, 12, 14, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#8a5a32"; ctx.fillRect(-8, -26, 16, 18);
      ctx.fillStyle = "#d8a67a"; ctx.beginPath(); ctx.arc(0, -33, 11, 0, Math.PI * 2); ctx.fill();
      // Băng quấn đầu
      ctx.fillStyle = "#f0ebd8"; ctx.fillRect(-11, -38, 22, 3);
      // Mắt kiên nghị
      ctx.fillStyle = "#111111"; ctx.beginPath(); ctx.arc(4, -33, 2, 0, Math.PI * 2); ctx.fill();
      // Búa rèn to bản
      ctx.fillStyle = "#4a2a14"; ctx.fillRect(9, -24, 3, 24);
      ctx.fillStyle = "#687280"; ctx.fillRect(6, -30, 9, 8);
    } else if (type === "doctor") {
      // Hiệu Thuốc: Áo xanh lá y sư, hồ lô thuốc
      ctx.fillStyle = "#2d6a4f";
      ctx.beginPath(); ctx.ellipse(0, -18 + breath * 0.2, 10, 14, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#f2cfab"; ctx.beginPath(); ctx.arc(0, -33, 11, 0, Math.PI * 2); ctx.fill();
      // Khăn the
      ctx.fillStyle = "#1b4332"; ctx.fillRect(-9, -42, 18, 5);
      // Mắt vui vẻ
      ctx.strokeStyle = "#111111"; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(3, -33, 2.5, Math.PI, 0); ctx.stroke();
      // Hồ lô thuốc vàng
      ctx.fillStyle = "#d4a024";
      ctx.beginPath(); ctx.arc(10, -14, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(10, -20, 2.5, 0, Math.PI * 2); ctx.fill();
    } else if (type === "bank") {
      // Chủ Tiền Trang: Áo gấm vàng kim, mũ chóp, thỏi vàng thỏi bạc trên tay
      ctx.fillStyle = "#c8942a";
      ctx.beginPath(); ctx.ellipse(0, -18 + breath * 0.2, 11, 14, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#e0be88"; ctx.beginPath(); ctx.arc(0, -33, 11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#2a1a0a"; ctx.fillRect(-7, -43, 14, 4.5);
      ctx.fillStyle = "#ffd24a"; ctx.beginPath(); ctx.ellipse(8, -18, 4.5, 3, 0, 0, Math.PI * 2); ctx.fill();
    } else if (type === "horse") {
      // Mã Phu: Áo nâu thắt lưng gọn gàng, roi ngựa
      ctx.fillStyle = "#5c3d28";
      ctx.beginPath(); ctx.ellipse(0, -18 + breath * 0.2, 10, 14, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#dfb282"; ctx.beginPath(); ctx.arc(0, -33, 11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#8a623a"; ctx.beginPath(); ctx.ellipse(0, -41, 13, 3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#4a2c14"; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(9, -24); ctx.lineTo(14, 2); ctx.stroke();
    } else if (type === "monk") {
      // Thủ Tháp Sứ: Cà sa phật môn vàng cam, tràng hạt, đầu cạo
      ctx.fillStyle = "#c87a24";
      ctx.beginPath(); ctx.ellipse(0, -18 + breath * 0.2, 11, 14, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#dfb488"; ctx.beginPath(); ctx.arc(0, -33, 11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#e84a2a"; for (const [ox, oy] of [[-2,-37],[2,-37],[0,-34]]) { ctx.beginPath(); ctx.arc(ox, oy, 0.8, 0, Math.PI*2); ctx.fill(); }
      ctx.strokeStyle = "#5a3a14"; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.ellipse(0, -20, 8, 8, 0, 0, Math.PI * 2); ctx.stroke();
    } else if (type === "scholar") {
      // Dã Tẩu & Quốc Sư: Áo dài thư sinh xanh tím, quạt lông vũ
      ctx.fillStyle = "#3a4a6e";
      ctx.beginPath(); ctx.ellipse(0, -18 + breath * 0.2, 10, 14, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#e5c098"; ctx.beginPath(); ctx.arc(0, -33, 11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#223355"; ctx.fillRect(-6, -44, 12, 6);
      ctx.fillStyle = "#f5f0e6"; ctx.beginPath(); ctx.arc(9, -20, 6, -Math.PI*0.3, Math.PI*0.3); ctx.fill();
    } else if (type === "lady") {
      // Hoa Nương / Bà Nguyệt: Áo lụa hồng phấn kiều diễm, đóa hoa cài tóc
      ctx.fillStyle = "#d44b6c";
      ctx.beginPath(); ctx.ellipse(0, -18 + breath * 0.2, 9, 13, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#f8d5b8"; ctx.beginPath(); ctx.arc(0, -33, 10.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#181412"; ctx.beginPath(); ctx.arc(-2, -40, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ff5588"; ctx.beginPath(); ctx.arc(8, -38, 3.5, 0, Math.PI * 2); ctx.fill();
    } else if (type === "cupid") {
      // Nguyệt Lão: Râu tóc bạc phơ, cầm chỉ hồng kết duyên
      ctx.fillStyle = "#a82020";
      ctx.beginPath(); ctx.ellipse(0, -18 + breath * 0.2, 11, 14, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#e8c298"; ctx.beginPath(); ctx.arc(0, -33, 11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#f8f8f8"; ctx.beginPath(); ctx.arc(0, -42, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-6, -28); ctx.quadraticCurveTo(0, -12, 6, -28); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#ff2222"; ctx.beginPath(); ctx.arc(8, -18, 4, 0, Math.PI * 2); ctx.fill();
    } else if (type === "tester") {
      // Sứ Giả Thử Nghiệm: Áo choàng hoàng kim rực rỡ
      ctx.fillStyle = "#e8b835";
      ctx.beginPath(); ctx.ellipse(0, -18 + breath * 0.2, 11, 14, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ffdcb4"; ctx.beginPath(); ctx.arc(0, -33, 11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#8a2414"; ctx.fillRect(-8, -44, 16, 5);
      ctx.fillStyle = "#55ee88"; ctx.beginPath(); ctx.arc(8, -18, 3.5, 0, Math.PI * 2); ctx.fill();
    } else {
      // Mặc định: Npc dân làng
      ctx.fillStyle = "#6a4a2a";
      ctx.beginPath(); ctx.ellipse(0, -18, 10, 13, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#e0be88"; ctx.beginPath(); ctx.arc(0, -32, 10, 0, Math.PI * 2); ctx.fill();
    }

    ctx.restore();
  }

  // ==========================================================
  // 7. VẼ CỘT GỖ LUYỆN CÔNG (Target Training Dummy)
  // ==========================================================
  function drawChibiDummy(ctx, cx, cy, opt) {
    opt = opt || {};
    const hit = opt.hit || 0;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1.2, 1.2);

    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.beginPath(); ctx.ellipse(0, 2, 16, 5.5, 0, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#3d2212";
    ctx.fillRect(-14, -2, 28, 4);
    ctx.fillRect(-3, -5, 6, 8);

    ctx.fillStyle = hit > 0 ? "#ff8877" : "#7a4825";
    ctx.beginPath(); ctx.ellipse(0, -22, 7, 20, 0, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#5c3318";
    ctx.fillRect(-18, -26, 36, 4);
    ctx.fillRect(-12, -14, 24, 3.5);

    ctx.fillStyle = "#d8c4a0";
    ctx.fillRect(-7, -23, 14, 10);
    ctx.strokeStyle = "#4a2a14"; ctx.lineWidth = 1;
    ctx.strokeRect(-7, -23, 14, 10);

    ctx.fillStyle = hit > 0 ? "#ff9988" : "#8c552e";
    ctx.beginPath(); ctx.arc(0, -44, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#b82414"; ctx.fillRect(-8, -48, 16, 3);

    ctx.restore();
  }

  // ==========================================================
  // 8. VẼ HỔ CHIBI (Tuyết Hổ, Hỏa Kỳ Hổ, Bạch Hổ)
  // ==========================================================
  function drawChibiTiger(ctx, cx, cy, opt) {
    opt = opt || {};
    const ang = opt.ang || 0;
    const walk = opt.walk || 0;
    const isMoving = !!opt.moving;
    const hit = opt.hit || 0;
    const time = opt.time || 0;
    const element = opt.element || "thuy";

    let baseCol = "#f0f4f8", stripeCol = "#3a4a58", eyeCol = "#38bdf8";
    if (element === "hoa") { baseCol = "#c83818"; stripeCol = "#2a0a06"; eyeCol = "#ffdd44"; }
    else if (element === "kim") { baseCol = "#d89428"; stripeCol = "#2a1608"; eyeCol = "#22c55e"; }

    const facingRight = Math.cos(ang) >= 0;
    const legPhase = walk * 1.8;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1.3 * (facingRight ? 1 : -1), 1.3);

    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.beginPath(); ctx.ellipse(0, 2, 22, 7, 0, 0, Math.PI * 2); ctx.fill();

    ctx.save();
    ctx.translate(-16, -14);
    ctx.rotate(Math.sin(time * 4) * 0.2 - 0.3);
    ctx.strokeStyle = baseCol; ctx.lineWidth = 3.8; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-14, -8, -18, -20); ctx.stroke();
    ctx.strokeStyle = stripeCol; ctx.lineWidth = 3.8; ctx.setLineDash([3, 5]);
    ctx.stroke();
    ctx.restore();

    for (const [lx, sgn] of [[-10, -1], [-6, 1], [8, -1], [12, 1]]) {
      const sw = isMoving ? Math.sin(legPhase + sgn * Math.PI * 0.5) * 5 : 0;
      ctx.fillStyle = baseCol;
      ctx.beginPath(); ctx.ellipse(lx + sw * 0.3, -4, 4.5, 7, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#1e140d";
      ctx.beginPath(); ctx.ellipse(lx + sw * 0.3, 1, 4, 2.5, 0, 0, Math.PI * 2); ctx.fill();
    }

    ctx.fillStyle = baseCol;
    ctx.beginPath(); ctx.ellipse(0, -15, 18, 12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = stripeCol; ctx.lineWidth = 2.2;
    for (const sx of [-8, -2, 4]) {
      ctx.beginPath(); ctx.moveTo(sx, -25); ctx.lineTo(sx - 1, -12); ctx.stroke();
    }

    ctx.fillStyle = baseCol;
    ctx.beginPath(); ctx.arc(12, -22, 12, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = stripeCol;
    ctx.font = "bold 9px serif"; ctx.textAlign = "center";
    ctx.fillText("王", 12, -28);

    for (const sx of [7, 17]) {
      ctx.fillStyle = baseCol; ctx.beginPath(); ctx.arc(sx, -33, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = stripeCol; ctx.beginPath(); ctx.arc(sx, -33, 2, 0, Math.PI * 2); ctx.fill();
    }

    ctx.fillStyle = eyeCol;
    ctx.beginPath(); ctx.arc(16, -22, 2.8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#111"; ctx.beginPath(); ctx.arc(16.5, -22, 1.2, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.moveTo(19, -17); ctx.lineTo(21, -13); ctx.lineTo(22, -17); ctx.closePath(); ctx.fill();

    ctx.restore();
  }

  // Xuất ra global scope
  global.ChibiRenderer = {
    drawRabbit: drawChibiRabbit,
    drawWolf: drawChibiWolf,
    drawBoar: drawChibiBoar,
    drawBandit: drawChibiBandit,
    drawTiger: drawChibiTiger,
    drawDummy: drawChibiDummy,
    drawHero: drawChibiHero,
    drawNpc: drawChibiNpc,
    shade: shade
  };

})(window);
