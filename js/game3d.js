/**
 * VÕ LÂM CHIBI 3D · TRUE 3D WEBGL ENGINE (CHIBI FULL EDITION)
 * 1. Camera bám sát nhân vật (không bao giờ bị thu nhỏ khi đi xa), xoay 360° tự do quanh nhân vật.
 * 2. Vòng tròn click chuột màu vàng bám sát mặt đất 3D với hiệu ứng xung sóng lan tỏa.
 * 3. Dòng sông Liễu Khê uốn lượn ngoằn ngoèo tự nhiên, cản nước (phải qua Cầu Đá hoặc Khinh Công vượt sông).
 * 4. Bầu trời Ngày / Đêm theo đúng giờ thực tế tế (22h: đêm sao huyền ảo, trăng sáng, đèn lồng rực rỡ).
 *    Hệ thống thời tiết: Nắng ấm, Gió lộng, Mưa rào sấm chớp, Tuyết rơi bay lượn (bấm đổi tại topbar).
 * 5. Đầy đủ 14 NPCs như bản 2.5D (Trưởng Trấn, Dược Thương, Thiết Tượng, Tiền Trang, Xa Phu, Mã Phu, Dã Tẩu,
 *    Quốc Sư, Hoa Nương, Nguyệt Lão, Bà Nguyệt, Sứ Giả Thử Nghiệm, Vạn Bảo Lầu, Thủ Tháp Sứ).
 * 6. Mở rộng toàn bộ các bãi quái xa: Sa Mạc Hoang Vu, Tuyết Lĩnh Bắc Cực, Hỏa Diệm Sơn, Đấu Trường Cột Gỗ,
 *    cùng các Đại Boss Hoàng Kim (Kim Mao Sư Vương, Tuyết Sơn Quái Thú, Hỏa Diệm Tà Thần, Độc Lang Vương).
 * 7. Tích hợp trọn vẹn Giao diện Võ Lâm 2.5D (#topbar, #miniWrap, #tgtF, #chat, #bar, #acts).
 */

(function() {
  "use strict";

  // ==========================================
  // 1. KHỞI TẠO THREE.JS SCENE, CAMERA, RENDERER
  // ==========================================
  const container = document.getElementById("canvas3d");
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.5, 1500);
  camera.position.set(0, 16, 88 + 23);

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  container.appendChild(renderer.domElement);

  // OrbitControls: Đè chuột phải xoay 360°, cuộn chuột zoom
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.maxPolarAngle = Math.PI / 2 - 0.04;
  controls.minDistance = 6;
  controls.maxDistance = 140;
  controls.mouseButtons = {
    LEFT: null,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE
  };
  controls.target.set(0, 1.6, 88);
  controls.update();

  // ==========================================
  // 2. HỆ THỐNG ÂM THANH OFFLINE (WEB AUDIO SYNTH)
  // ==========================================
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function playSfx(type) {
    try {
      const ctx = getAudioCtx();
      const now = ctx.currentTime;
      if (type === "slash") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.15);
      } else if (type === "ice") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(980, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.2);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.2);
      } else if (type === "fire") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(60, now + 0.3);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.3);
      } else if (type === "lightning") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(680, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.22);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.22);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.22);
      } else if (type === "poison") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.25);
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.25);
      } else if (type === "jump") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(680, now + 0.22);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.22);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.22);
      } else if (type === "hit") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(40, now + 0.12);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.12);
      } else if (type === "potion") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.18);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.18);
      } else if (type === "splash") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.25);
      } else if (type === "thunder") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.linearRampToValueAtTime(30, now + 0.8);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.8);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.8);
      }
    } catch(e) {}
  }

  // ==========================================
  // 3. THỜI GIAN THẬT & BẦU TRỜI NGÀY / ĐÊM / THỜI TIẾT
  // ==========================================
  const ambientLight = new THREE.AmbientLight(0xffeedb, 0.85);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xfffaea, 1.4);
  sunLight.position.set(65, 95, 45);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 1;
  sunLight.shadow.camera.far = 380;
  const sd = 150;
  sunLight.shadow.camera.left = -sd; sunLight.shadow.camera.right = sd;
  sunLight.shadow.camera.top = sd; sunLight.shadow.camera.bottom = -sd;
  sunLight.shadow.bias = -0.0004;
  scene.add(sunLight);

  const moonLight = new THREE.DirectionalLight(0x789ac8, 0.45);
  moonLight.position.set(-65, 90, -45);
  moonLight.castShadow = false;
  scene.add(moonLight);

  // Vầng trăng đêm
  const moonGroup = new THREE.Group();
  const moonMesh = new THREE.Mesh(
    new THREE.SphereGeometry(6, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xfff6d0 })
  );
  moonGroup.add(moonMesh);
  const moonHalo = new THREE.Mesh(
    new THREE.RingGeometry(6.2, 11, 32),
    new THREE.MeshBasicMaterial({ color: 0xfffae0, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
  );
  moonHalo.rotation.x = Math.PI / 4;
  moonGroup.add(moonHalo);
  moonGroup.position.set(-140, 150, -180);
  scene.add(moonGroup);

  // Vòm sao đêm
  const starCount = 600;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 0.42;
    const rad = 420;
    starPos[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = rad * Math.cos(phi);
    starPos[i * 3 + 2] = rad * Math.sin(phi) * Math.sin(theta);
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, transparent: true, opacity: 0.85 });
  const starSystem = new THREE.Points(starGeo, starMat);
  scene.add(starSystem);

  // Hệ thống thời tiết (Sunny, Windy, Rain, Snow)
  const WEATHERS = ["sunny", "windy", "rain", "snow"];
  const WEATHER_NAMES = { sunny: "Nắng", windy: "Gió", rain: "Mưa", snow: "Tuyết" };
  const WEATHER_ICONS = { sunny: "☀️", windy: "🍃", rain: "🌧️", snow: "❄️" };
  let currentWeather = "sunny";

  // Hạt Mưa
  const rainCount = 1400;
  const rainGeo = new THREE.BufferGeometry();
  const rainPos = new Float32Array(rainCount * 3);
  for (let i = 0; i < rainCount; i++) {
    rainPos[i * 3] = (Math.random() - 0.5) * 320;
    rainPos[i * 3 + 1] = Math.random() * 80 + 2;
    rainPos[i * 3 + 2] = (Math.random() - 0.5) * 320;
  }
  rainGeo.setAttribute("position", new THREE.BufferAttribute(rainPos, 3));
  const rainMat = new THREE.PointsMaterial({ color: 0x90c8ff, size: 0.45, transparent: true, opacity: 0.75 });
  const rainSystem = new THREE.Points(rainGeo, rainMat);
  rainSystem.visible = false;
  scene.add(rainSystem);

  // Hạt Tuyết
  const snowCount = 1000;
  const snowGeo = new THREE.BufferGeometry();
  const snowPos = new Float32Array(snowCount * 3);
  for (let i = 0; i < snowCount; i++) {
    snowPos[i * 3] = (Math.random() - 0.5) * 320;
    snowPos[i * 3 + 1] = Math.random() * 80 + 2;
    snowPos[i * 3 + 2] = (Math.random() - 0.5) * 320;
  }
  snowGeo.setAttribute("position", new THREE.BufferAttribute(snowPos, 3));
  const snowMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, transparent: true, opacity: 0.85 });
  const snowSystem = new THREE.Points(snowGeo, snowMat);
  snowSystem.visible = false;
  scene.add(snowSystem);

  // Cánh hoa / Lá gió
  const petalCount = 350;
  const petalGeo = new THREE.BufferGeometry();
  const petalPos = new Float32Array(petalCount * 3);
  for (let i = 0; i < petalCount; i++) {
    petalPos[i * 3] = (Math.random() - 0.5) * 300;
    petalPos[i * 3 + 1] = Math.random() * 30 + 1;
    petalPos[i * 3 + 2] = (Math.random() - 0.5) * 300;
  }
  petalGeo.setAttribute("position", new THREE.BufferAttribute(petalPos, 3));
  const petalMat = new THREE.PointsMaterial({ color: 0xffb8d2, size: 0.4, transparent: true, opacity: 0.85 });
  const petalSystem = new THREE.Points(petalGeo, petalMat);
  scene.add(petalSystem);

  // Áp dụng Ngày / Đêm theo GIỜ THẬT BÊN NGOÀI
  function updateSkyAndDayNight() {
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60;
    let isNight = false, periodName = "Ngày", icon = "☀️";

    if (hour >= 18.5 || hour < 5.5) {
      // BAN ĐÊM (Night)
      isNight = true;
      periodName = "Đêm";
      icon = "🌙";
      scene.background = new THREE.Color(0x070b16);
      scene.fog = new THREE.Fog(0x0a1020, 200, 620);
      sunLight.intensity = 0.08;
      moonLight.intensity = 0.65;
      ambientLight.color.setHex(0x5a78a0);
      ambientLight.intensity = 0.55;
      moonGroup.visible = true;
      starSystem.visible = true;
    } else if (hour >= 5.5 && hour < 7.5) {
      // BÌNH MINH (Dawn)
      periodName = "Bình Minh";
      icon = "🌅";
      scene.background = new THREE.Color(0x4a2e40);
      scene.fog = new THREE.Fog(0x5a3a4c, 240, 680);
      sunLight.intensity = 0.95;
      moonLight.intensity = 0.1;
      ambientLight.color.setHex(0xffddb8);
      ambientLight.intensity = 0.75;
      moonGroup.visible = false;
      starSystem.visible = false;
    } else if (hour >= 16.8 && hour < 18.5) {
      // HOÀNG HÔN (Dusk)
      periodName = "Hoàng Hôn";
      icon = "🌇";
      scene.background = new THREE.Color(0x8a2c16);
      scene.fog = new THREE.Fog(0x9a3e22, 240, 680);
      sunLight.intensity = 1.1;
      moonLight.intensity = 0.1;
      ambientLight.color.setHex(0xffaa66);
      ambientLight.intensity = 0.8;
      moonGroup.visible = false;
      starSystem.visible = false;
    } else {
      // BAN NGÀY (Day)
      periodName = "Ngày";
      icon = "☀️";
      scene.background = new THREE.Color(0x386ea8);
      scene.fog = new THREE.Fog(0x3e72ac, 240, 680);
      sunLight.intensity = 1.45;
      moonLight.intensity = 0.0;
      ambientLight.color.setHex(0xffeedb);
      ambientLight.intensity = 0.88;
      moonGroup.visible = false;
      starSystem.visible = false;
    }

    // Cập nhật nhãn thời tiết trên thanh topbar
    const tbW = document.getElementById("tbWeather");
    if (tbW) {
      tbW.textContent = `${icon} ${periodName} · ${WEATHER_NAMES[currentWeather]}`;
    }
  }

  // Đổi thời tiết nhanh
  window.toggleWeather3D = function() {
    const nextIdx = (WEATHERS.indexOf(currentWeather) + 1) % WEATHERS.length;
    currentWeather = WEATHERS[nextIdx];
    rainSystem.visible = (currentWeather === "rain");
    snowSystem.visible = (currentWeather === "snow");
    if (currentWeather === "rain") {
      playSfx("thunder");
      toast3D("🌧️ Trời đổ cơn <b>Mưa rào Liễu Khê</b>!");
    } else if (currentWeather === "snow") {
      toast3D("❄️ Bông tuyết trắng bay lượn ngập tràn không trung!");
    } else if (currentWeather === "windy") {
      toast3D("🍃 Gió lộng giang hồ cuốn lá bay rào rạt!");
    } else {
      toast3D("☀️ Nắng ấm cổ trang rạng rỡ cõi nhân gian!");
    }
    updateSkyAndDayNight();
  };

  updateSkyAndDayNight();
  setInterval(updateSkyAndDayNight, 30000);

  // ==========================================
  // 4. MẶT ĐẤT & CẢNH QUAN 3D THEO MAP
  // ==========================================
  const currentMapGroup = new THREE.Group();
  scene.add(currentMapGroup);

  // Tạo Texture mặt đất theo từng chủ đề
  function generateGrassTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#3e6c38"; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 1800; i++) {
      const x = Math.random() * 512, y = Math.random() * 512;
      const r = 2 + Math.random() * 4;
      ctx.fillStyle = (i % 2 === 0) ? "#4a7f43" : "#355e30";
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(36, 36);
    return tex;
  }

  function generateCityStoneTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#6e665d"; ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = "#463f37"; ctx.lineWidth = 2.5;
    for (let y = 0; y < 512; y += 32) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
      const ox = (y % 64 === 0) ? 0 : 16;
      for (let x = ox; x < 512; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 32); ctx.stroke();
      }
    }
    for (let i = 0; i < 600; i++) {
      ctx.fillStyle = (i % 2 === 0) ? "#82796e" : "#564e45";
      ctx.fillRect(Math.random() * 510, Math.random() * 510, 4, 4);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(24, 24);
    return tex;
  }

  function generateDesertSandTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#c89f55"; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 2200; i++) {
      ctx.fillStyle = (i % 2 === 0) ? "#d8b268" : "#b68e46";
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 3, 3);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(32, 32);
    return tex;
  }

  function generateSnowTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#e5f0f8"; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 1600; i++) {
      ctx.fillStyle = (i % 2 === 0) ? "#ffffff" : "#c6def0";
      ctx.beginPath(); ctx.arc(Math.random() * 512, Math.random() * 512, 2.2, 0, Math.PI * 2); ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(30, 30);
    return tex;
  }

  function generateLavaRockTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1e0f0c"; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 1300; i++) {
      ctx.fillStyle = (i % 3 === 0) ? "#ff4411" : (i % 3 === 1) ? "#331612" : "#982008";
      ctx.fillRect(Math.random() * 512, Math.random() * 512, (i%3===0?2.5:5), (i%3===0?2.5:5));
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(28, 28);
    return tex;
  }

  function generateDarkEarthTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#160e1c"; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 1400; i++) {
      ctx.fillStyle = (i % 2 === 0) ? "#281634" : "#0d0812";
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 4, 4);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(30, 30);
    return tex;
  }

  const TEXTURES = {
    grass: generateGrassTexture(),
    city: generateCityStoneTexture(),
    desert: generateDesertSandTexture(),
    snow: generateSnowTexture(),
    lava: generateLavaRockTexture(),
    dark: generateDarkEarthTexture()
  };

  const groundGeo = new THREE.PlaneGeometry(900, 900, 64, 64);
  const groundMat = new THREE.MeshStandardMaterial({
    map: TEXTURES.grass,
    roughness: 0.9,
    metalness: 0.05
  });
  const groundMesh = new THREE.Mesh(groundGeo, groundMat);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  // ĐƯỜNG CONG TÂM DÒNG SÔNG LIỄU KHÊ (Chỉ áp dụng ở Ba Lăng Huyện)
  function getRiverCenterZ(x) {
    return 36 + 14 * Math.sin(x * 0.035) + 6 * Math.cos(x * 0.07);
  }

  // Kiểm tra tọa độ có nằm trong lòng sông sâu hay không
  function isInRiverWater(x, z) {
    if (!currentMapDef || currentMapDef.id !== "balang") return false;
    const rz = getRiverCenterZ(x);
    const dist = Math.abs(z - rz);
    if (dist > 7.4) return false;
    // Khu vực Cầu đá & Dốc cầu (x trong khoảng [-5.5, 5.5], z từ 23 đến 61)
    if (Math.abs(x) <= 5.5 && z >= 23 && z <= 61) return false;
    return true;
  }

  // ==========================================
  // HỆ THỐNG VẬT CẢN & VÙNG BLOCKED (COLLISION)
  // ==========================================
  const mapObstacles = [];

  function clearObstacles() {
    mapObstacles.length = 0;
  }

  function addCircleObstacle(x, z, radius, name = "Vật cản") {
    mapObstacles.push({ type: "circle", x, z, r: radius, name });
  }

  function addBoxObstacle(minX, maxX, minZ, maxZ, name = "Công trình") {
    mapObstacles.push({ type: "box", minX, maxX, minZ, maxZ, name });
  }

  // Tính toán độ cao mặt đất / mặt cầu tại (x, z)
  function getSurfaceElevation(x, z) {
    if (currentMapDef && currentMapDef.id === "balang") {
      // Trên mặt Cầu Đá Liễu Khê (chiều ngang [-5.5, 5.5])
      if (Math.abs(x) <= 5.5) {
        if (z >= 28 && z <= 56) {
          return 1.20; // Mặt cầu đá phẳng
        }
        if (z > 56 && z <= 61) {
          // Dốc cầu phía Nam (tiến về làng Ba Lăng Huyện)
          return 1.20 * (1 - (z - 56) / 5.0);
        }
        if (z < 28 && z >= 23) {
          // Dốc cầu phía Bắc (tiến ra bãi quái Liễu Khê)
          return 1.20 * (1 - (28 - z) / 5.0);
        }
      }
    }
    return 0.0;
  }

  // Kiểm tra điểm (x, z) có bị vướng vật cản hay không
  // Hỗ trợ curX, curZ: Nếu nhân vật đang chạm/ở trong vật cản nhưng đang BƯỚC RA XA (dNext >= dCur),
  // hệ thống sẽ cho phép bước tiếp để thoát kẹt, tuyệt đối không bao giờ bị kẹt cứng!
  function isBlocked(x, z, curX, curZ, heroR = 0.8) {
    // 1. Kiểm tra danh sách vật cản công trình, hồ nước, cây cối, đá tảng
    for (const ob of mapObstacles) {
      if (ob.type === "circle") {
        const d = Math.hypot(x - ob.x, z - ob.z);
        if (d < ob.r + heroR) {
          if (curX !== undefined && curZ !== undefined) {
            const dCur = Math.hypot(curX - ob.x, curZ - ob.z);
            if (dCur <= ob.r + heroR && d >= dCur) {
              continue; // Đang bước ra xa khỏi tâm vật cản -> cho phép thoát hiểm!
            }
          }
          return ob;
        }
      } else if (ob.type === "box") {
        if (x >= ob.minX - heroR && x <= ob.maxX + heroR &&
            z >= ob.minZ - heroR && z <= ob.maxZ + heroR) {
          if (curX !== undefined && curZ !== undefined) {
            const insideCur = (
              curX >= ob.minX - heroR && curX <= ob.maxX + heroR &&
              curZ >= ob.minZ - heroR && curZ <= ob.maxZ + heroR
            );
            if (insideCur) {
              const cx = (ob.minX + ob.maxX) / 2;
              const cz = (ob.minZ + ob.maxZ) / 2;
              const dCur = Math.hypot(curX - cx, curZ - cz);
              const dNext = Math.hypot(x - cx, z - cz);
              if (dNext >= dCur) {
                continue; // Đang bước ra xa khỏi tâm khối công trình -> cho phép thoát hiểm!
              }
            }
          }
          return ob;
        }
      }
    }

    // 2. Nước sông sâu (nếu không ở trên cầu và không nhảy khinh công)
    if (isInRiverWater(x, z) && !hero.isJumping) {
      return { name: "Nước sông sâu" };
    }

    return null;
  }

  // CÁC HÀM XÂY DỰNG CẢNH QUAN 3D (Được thêm vào currentMapGroup)
  function createRoad(w, l, x, z, col = 0xd8c29d) {
    const roadMat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.9 });
    const r = new THREE.Mesh(new THREE.PlaneGeometry(w, l), roadMat);
    r.rotation.x = -Math.PI / 2;
    r.position.set(x, 0.02, z);
    r.receiveShadow = true;
    currentMapGroup.add(r);
  }

  function createWindingRiver() {
    const segments = 120;
    const halfWidth = 8.0;
    const geom = new THREE.BufferGeometry();
    const vertices = [], uvs = [];

    for (let i = 0; i <= segments; i++) {
      const x = -210 + (i / segments) * 420;
      const zMid = getRiverCenterZ(x);
      vertices.push(x, 0.05, zMid - halfWidth);
      vertices.push(x, 0.05, zMid + halfWidth);
      const u = i / segments * 20;
      uvs.push(u, 0, u, 1);
    }
    const indices = [];
    for (let i = 0; i < segments; i++) {
      const a = i * 2, b = i * 2 + 1, c = (i + 1) * 2, d = (i + 1) * 2 + 1;
      indices.push(a, b, c); indices.push(b, d, c);
    }
    geom.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();

    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x276e8e, roughness: 0.15, metalness: 0.45, transparent: true, opacity: 0.88
    });
    const riverMesh = new THREE.Mesh(geom, riverMat);
    currentMapGroup.add(riverMesh);
  }

  function createStoneBridge(x = 0, z = 42) {
    const group = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x8a847a, roughness: 0.75 });
    const deck = new THREE.Mesh(new THREE.BoxGeometry(11, 1.1, 28), stoneMat);
    deck.position.y = 0.65; deck.castShadow = true; deck.receiveShadow = true;
    group.add(deck);

    // 1. Dốc cầu phía Nam (nối từ đường làng z=61 lên mặt cầu z=56)
    const rampLen = 5.0;
    const rampAngle = Math.atan2(1.2, rampLen);
    const southRamp = new THREE.Mesh(new THREE.BoxGeometry(11, 0.45, rampLen + 0.15), stoneMat);
    southRamp.position.set(0, 0.58, 14 + rampLen / 2);
    southRamp.rotation.x = -rampAngle;
    southRamp.castShadow = true; southRamp.receiveShadow = true;
    group.add(southRamp);

    // 2. Dốc cầu phía Bắc (nối từ mặt cầu z=28 xuống đường rừng z=23)
    const northRamp = new THREE.Mesh(new THREE.BoxGeometry(11, 0.45, rampLen + 0.15), stoneMat);
    northRamp.position.set(0, 0.58, -14 - rampLen / 2);
    northRamp.rotation.x = rampAngle;
    northRamp.castShadow = true; northRamp.receiveShadow = true;
    group.add(northRamp);

    // 3. Lan can đá hai bên cầu chạy dọc toàn bộ thân cầu và dốc cầu
    for (const sx of [-5.6, 5.6]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.2, 38), stoneMat);
      rail.position.set(sx, 1.5, 0); rail.castShadow = true; group.add(rail);
      for (let pz = -18; pz <= 18; pz += 4.5) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.8, 8), stoneMat);
        pillar.position.set(sx, 1.6, pz); pillar.castShadow = true; group.add(pillar);
      }
    }

    group.position.set(x, 0, z);
    currentMapGroup.add(group);

    // Đăng ký vật cản lan can cầu đá hai bên (chống rơi xuống vực sông)
    addBoxObstacle(x - 6.5, x - 5.0, z - 19, z + 19, "Lan can cầu trái");
    addBoxObstacle(x + 5.0, x + 6.5, z - 19, z + 19, "Lan can cầu phải");
  }

  function createWoodenBridge(x, z, len = 24) {
    const group = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5a3c22, roughness: 0.8 });
    const deck = new THREE.Mesh(new THREE.BoxGeometry(7, 0.8, len), woodMat);
    deck.position.y = 0.5; deck.castShadow = true; group.add(deck);
    for (const sx of [-3.6, 3.6]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.0, len), woodMat);
      rail.position.set(sx, 1.2, 0); group.add(rail);
    }
    group.position.set(x, 0, z);
    currentMapGroup.add(group);
  }

  function createWuxiaShop(name, signColor, x, z, rotY = 0) {
    const house = new THREE.Group();
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf2ebd9, roughness: 0.8 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x4a2c16, roughness: 0.6 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x8a3a2a, roughness: 0.5 });

    const wall = new THREE.Mesh(new THREE.BoxGeometry(11, 4.2, 8), wallMat);
    wall.position.y = 2.1; wall.castShadow = true; wall.receiveShadow = true;
    house.add(wall);

    for (const sx of [-5.5, 5.5]) {
      for (const sz of [-4.0, 4.0]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 4.4, 8), woodMat);
        post.position.set(sx, 2.2, sz); post.castShadow = true; house.add(post);
      }
    }
    const roof = new THREE.Mesh(new THREE.ConeGeometry(8.5, 3.2, 4), roofMat);
    roof.position.y = 5.6; roof.rotation.y = Math.PI / 4; roof.castShadow = true;
    house.add(roof);

    const signCanvas = document.createElement("canvas");
    signCanvas.width = 256; signCanvas.height = 64;
    const sCtx = signCanvas.getContext("2d");
    sCtx.fillStyle = "#22140c"; sCtx.fillRect(0, 0, 256, 64);
    sCtx.strokeStyle = signColor; sCtx.lineWidth = 4; sCtx.strokeRect(4, 4, 248, 56);
    sCtx.font = "bold 25px 'Noto Serif', serif"; sCtx.textAlign = "center"; sCtx.textBaseline = "middle";
    sCtx.fillStyle = signColor; sCtx.fillText(name, 128, 32);
    const signTex = new THREE.CanvasTexture(signCanvas);
    const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.0), new THREE.MeshBasicMaterial({ map: signTex }));
    signMesh.position.set(0, 3.6, 4.05); house.add(signMesh);

    for (const lx of [-4.2, 4.2]) {
      const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.45, 8, 8), new THREE.MeshBasicMaterial({ color: 0xff3b30 }));
      lantern.position.set(lx, 3.2, 4.4); house.add(lantern);
    }
    house.position.set(x, 0, z);
    house.rotation.y = rotY;
    currentMapGroup.add(house);

    // Đăng ký vùng vật cản công trình nhà cửa (chặn không cho đi xuyên tường)
    if (Math.abs(rotY) > 1.0) {
      addBoxObstacle(x - 4.5, x + 4.5, z - 5.8, z + 5.8, name);
    } else {
      addBoxObstacle(x - 5.8, x + 5.8, z - 4.5, z + 4.5, name);
    }
  }

  function createTownGate(z, title = "BA LĂNG HUYỆN") {
    const gate = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x4a2a14 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x8a3a2a });
    for (const x of [-6, 6]) {
      const col = new THREE.Mesh(new THREE.BoxGeometry(1.6, 7.5, 1.6), woodMat);
      col.position.set(x, 3.75, 0); col.castShadow = true; gate.add(col);
    }
    const beam = new THREE.Mesh(new THREE.BoxGeometry(16, 1.2, 2.2), woodMat);
    beam.position.y = 7.2; beam.castShadow = true; gate.add(beam);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(9.5, 2.2, 4), roofMat);
    roof.position.y = 8.6; roof.rotation.y = Math.PI / 4; roof.castShadow = true;
    gate.add(roof);
    gate.position.set(0, 0, z);
    currentMapGroup.add(gate);

    // Đăng ký 2 trụ cột cổng làng là vật cản, chừa khoảng giữa [-5, 5] để người chơi đi qua
    addBoxObstacle(-7.0, -5.0, z - 1.2, z + 1.2, "Cột cổng trái");
    addBoxObstacle(5.0, 7.0, z - 1.2, z + 1.2, "Cột cổng phải");
  }

  function createCityWall(x, z, len = 120, rotY = 0) {
    const group = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x5e5850, roughness: 0.8 });
    const wall = new THREE.Mesh(new THREE.BoxGeometry(len, 9.0, 4.0), stoneMat);
    wall.position.y = 4.5; wall.castShadow = true; group.add(wall);
    for (let px = -len/2 + 6; px <= len/2 - 6; px += 8) {
      const btl = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.5, 4.2), stoneMat);
      btl.position.set(px, 9.6, 0); group.add(btl);
    }
    group.position.set(x, 0, z);
    group.rotation.y = rotY;
    currentMapGroup.add(group);

    // Đăng ký vật cản tường thành
    if (Math.abs(rotY) > 1.0) {
      addBoxObstacle(x - 2.5, x + 2.5, z - len/2, z + len/2, "Thành tường");
    } else {
      addBoxObstacle(x - len/2, x + len/2, z - 2.5, z + 2.5, "Thành tường");
    }
  }

  function createPagodaTower(x, z) {
    const group = new THREE.Group();
    const towerMat = new THREE.MeshStandardMaterial({ color: 0x5a2420, roughness: 0.6 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x2d3a46, roughness: 0.5 });
    let curY = 0, curSize = 9.5;
    for (let tier = 0; tier < 5; tier++) {
      const body = new THREE.Mesh(new THREE.CylinderGeometry(curSize * 0.9, curSize, 5, 8), towerMat);
      body.position.y = curY + 2.5; body.castShadow = true; group.add(body);
      const roof = new THREE.Mesh(new THREE.ConeGeometry(curSize * 1.4, 2, 8), roofMat);
      roof.position.y = curY + 5.6; roof.castShadow = true; group.add(roof);
      curY += 6.2; curSize *= 0.82;
    }
    const tip = new THREE.Mesh(new THREE.SphereGeometry(1.0, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffd24a }));
    tip.position.y = curY + 6.2; group.add(tip);
    group.position.set(x, 0, z);
    currentMapGroup.add(group);

    // Đăng ký vật cản tháp cổ
    addCircleObstacle(x, z, 9.8, "Thiên Tầng Tháp");
  }

  function createBanditCampDecor(cx, cz) {
    const group = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5a3e2a });
    for (let a = 0; a < Math.PI * 2; a += 0.3) {
      if (a > 1.2 && a < 2.0) continue;
      const px = Math.cos(a) * 16, pz = Math.sin(a) * 16;
      const spike = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.25, 3.5, 5), woodMat);
      spike.position.set(px, 1.75, pz); spike.castShadow = true; group.add(spike);
    }
    for (const [lx, lz] of [[-6, -6], [7, -5]]) {
      const tent = new THREE.Mesh(new THREE.ConeGeometry(3.8, 4.2, 6), new THREE.MeshStandardMaterial({ color: 0x8a6a48 }));
      tent.position.set(lx, 2.1, lz); tent.castShadow = true; group.add(tent);
    }
    const fireMesh = new THREE.Mesh(new THREE.ConeGeometry(0.8, 2.2, 6), new THREE.MeshBasicMaterial({ color: 0xff4a1a }));
    fireMesh.position.y = 1.2; group.add(fireMesh);
    group.position.set(cx, 0, cz);
    currentMapGroup.add(group);
  }

  function createDesertAreaDecor(cx, cz) {
    const group = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const ox = (Math.random() - 0.5) * 60, oz = (Math.random() - 0.5) * 60;
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(2.5 + Math.random() * 3), new THREE.MeshStandardMaterial({ color: 0xb48248, roughness: 0.9 }));
      rock.position.set(ox, 2.5, oz); group.add(rock);
    }
    for (let i = 0; i < 8; i++) {
      const ox = (Math.random() - 0.5) * 70, oz = (Math.random() - 0.5) * 70;
      const cactus = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 5.5, 6), new THREE.MeshStandardMaterial({ color: 0x486b3a }));
      cactus.position.set(ox, 2.7, oz); group.add(cactus);
    }
    group.position.set(cx, 0, cz);
    currentMapGroup.add(group);
  }

  function createSnowAreaDecor(cx, cz) {
    const group = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const ox = (Math.random() - 0.5) * 60, oz = (Math.random() - 0.5) * 60;
      const ice = new THREE.Mesh(new THREE.ConeGeometry(2.5, 8, 5), new THREE.MeshStandardMaterial({ color: 0x98d4f8, roughness: 0.2, transparent: true, opacity: 0.85 }));
      ice.position.set(ox, 4, oz); group.add(ice);
    }
    group.position.set(cx, 0, cz);
    currentMapGroup.add(group);
  }

  function createLavaAreaDecor(cx, cz) {
    const group = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const pit = new THREE.Mesh(new THREE.CircleGeometry(5, 16), new THREE.MeshBasicMaterial({ color: 0xff3b10 }));
      pit.rotation.x = -Math.PI / 2;
      pit.position.set((Math.random() - 0.5) * 60, 0.06, (Math.random() - 0.5) * 60);
      group.add(pit);
    }
    group.position.set(cx, 0, cz);
    currentMapGroup.add(group);
  }

  function createAltarDecor(cx, cz) {
    const group = new THREE.Group();
    const altar = new THREE.Mesh(new THREE.CylinderGeometry(14, 16, 2.5, 8), new THREE.MeshStandardMaterial({ color: 0x24182a, roughness: 0.7 }));
    altar.position.y = 1.25; group.add(altar);
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 2) {
      const px = Math.cos(a) * 11, pz = Math.sin(a) * 11;
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.2, 7.5, 6), new THREE.MeshStandardMaterial({ color: 0x3a2044 }));
      pillar.position.set(px, 4.5, pz); group.add(pillar);
      const fire = new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 8), new THREE.MeshBasicMaterial({ color: 0xda42ff }));
      fire.position.set(px, 8.5, pz); group.add(fire);
    }
    group.position.set(cx, 0, cz);
    currentMapGroup.add(group);
  }

  const trees = [];

  // ==========================================
  // HỆ THỐNG CÂY CỐI & CẢNH QUAN 3D CHIBI (THEO MẪU BẢN ĐỒ)
  // ==========================================

  // 1. CÂY THÔNG TẦNG HÌNH CHÓP (Stepped Conical Pine Tree - Ảnh 1 & 2)
  function createSteppedPineTree(x, z, scale = 1, tint = 0x277a3d) {
    const group = new THREE.Group();
    // Thân cây gỗ tròn mịn
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x54361e, roughness: 0.85 });
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.38 * scale, 0.65 * scale, 3.6 * scale, 10), trunkMat);
    trunk.position.y = 1.8 * scale;
    trunk.castShadow = true;
    group.add(trunk);

    // 4 tầng tán lá hình nón xếp tầng với mép vành rõ nét
    const c1 = tint;
    const c2 = new THREE.Color(tint).multiplyScalar(1.12).getHex();
    const c3 = new THREE.Color(tint).multiplyScalar(0.86).getHex();

    const tiers = [
      { rBottom: 3.2 * scale, height: 2.2 * scale, y: 3.2 * scale, color: c3 },
      { rBottom: 2.5 * scale, height: 2.0 * scale, y: 4.6 * scale, color: c1 },
      { rBottom: 1.8 * scale, height: 1.8 * scale, y: 5.8 * scale, color: c2 },
      { rBottom: 1.1 * scale, height: 1.6 * scale, y: 6.9 * scale, color: c2 }
    ];

    tiers.forEach((tier) => {
      const mat = new THREE.MeshStandardMaterial({
        color: tier.color,
        roughness: 0.55,
        flatShading: true
      });
      const cone = new THREE.Mesh(new THREE.ConeGeometry(tier.rBottom, tier.height, 10), mat);
      cone.position.y = tier.y;
      cone.castShadow = true;
      cone.receiveShadow = true;
      group.add(cone);
    });

    group.position.set(x, 0, z);
    currentMapGroup.add(group);
    trees.push({ group, speed: 1.2 + Math.random() * 0.6, type: "pine", ox: x, oz: z });
    // Đăng ký vật cản thân cây
    addCircleObstacle(x, z, 0.85 * scale, "Cây thông");
    return group;
  }

  // 2. CÂY TÁN TRÒN CHIBI BỔNG BỀNH (Stylized Multi-Lobe Deciduous Tree - Chuẩn 2.5D)
  function createStylizedRoundTree(x, z, palette = "green", scale = 1) {
    const group = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3b24, roughness: 0.8 });
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.42 * scale, 0.7 * scale, 4.0 * scale, 10), trunkMat);
    trunk.position.y = 2.0 * scale;
    trunk.castShadow = true;
    group.add(trunk);

    let colors = [0x52aa34, 0x6ec438, 0x3d8c25];
    if (palette === "sakura" || palette === "peach") colors = [0xf5a5cb, 0xfca0c4, 0xf288b4, 0xffd8e8];
    if (palette === "maple") colors = [0xdb442b, 0xba2b18, 0xeb6442, 0xff7a36];
    if (palette === "ginkgo" || palette === "golden") colors = [0xf0ba2e, 0xdb9f1e, 0xfcd04b, 0xffe274];
    if (palette === "wisteria" || palette === "purple") colors = [0x7454b6, 0x8e70cf, 0xa084dc, 0xddd0ff];
    if (palette === "snow") colors = [0xd6ebfa, 0xb8daf0, 0xe8f4fc, 0xffffff];
    if (palette === "willow") colors = [0x4d8c42, 0x3d7634, 0x5c9e50, 0x6eb458];
    if (palette === "lime") colors = [0x66bb33, 0x88dd44, 0x4f9922, 0x99ee55];

    // Cụm 5 khối dodecahedron đan xen tạo thành tán cây bồng bềnh như đám mây
    const lobes = [
      { x: 0, y: 4.8 * scale, z: 0, r: 2.4 * scale, col: colors[0] },
      { x: -1.2 * scale, y: 4.4 * scale, z: 0.6 * scale, r: 1.8 * scale, col: colors[2] },
      { x: 1.3 * scale, y: 4.5 * scale, z: -0.5 * scale, r: 1.9 * scale, col: colors[1] },
      { x: 0.2 * scale, y: 5.6 * scale, z: 0.5 * scale, r: 1.7 * scale, col: colors[1] },
      { x: -0.4 * scale, y: 5.2 * scale, z: -1.0 * scale, r: 1.6 * scale, col: colors[0] }
    ];

    lobes.forEach((l) => {
      const mat = new THREE.MeshStandardMaterial({
        color: l.col,
        roughness: 0.6,
        flatShading: true
      });
      const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(l.r, 1), mat);
      mesh.position.set(l.x, l.y, l.z);
      mesh.castShadow = true;
      group.add(mesh);
    });

    group.position.set(x, 0, z);
    currentMapGroup.add(group);
    trees.push({ group, speed: 1.4 + Math.random() * 0.7, type: "round", ox: x, oz: z });
    // Đăng ký vật cản thân cây cổ thụ
    addCircleObstacle(x, z, 0.9 * scale, "Cây cổ thụ");
    return group;
  }

  // 2.5 BỤI TRÚC / TRE XANH ĐẶC TRƯNG VÕ LÂM (Bamboo Grove - Chuẩn 2.5D Ảnh Mẫu)
  function createBambooGrove(x, z, count = 7, scale = 1) {
    const group = new THREE.Group();
    const caneMat1 = new THREE.MeshStandardMaterial({ color: 0x5e8a3c, roughness: 0.65 });
    const caneMat2 = new THREE.MeshStandardMaterial({ color: 0x6f9a47, roughness: 0.65 });
    const jointMat = new THREE.MeshStandardMaterial({ color: 0x3f6428, roughness: 0.8 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x88b35a, roughness: 0.5, side: THREE.DoubleSide });

    for (let i = 0; i < count; i++) {
      const ang = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const r = (0.35 + Math.random() * 1.1) * scale;
      const bx = Math.cos(ang) * r;
      const bz = Math.sin(ang) * r;
      const caneH = (5.2 + Math.random() * 2.6) * scale;
      const segCount = 5;
      const segH = caneH / segCount;
      const mat = (i % 2 === 0) ? caneMat1 : caneMat2;

      for (let s = 0; s < segCount; s++) {
        const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.08 * scale, 0.09 * scale, segH - 0.04 * scale, 6), mat);
        seg.position.set(bx, (s + 0.5) * segH, bz);
        seg.castShadow = true;
        group.add(seg);

        // Vòng khớp đốt tre (Bamboo Joint Ring)
        const joint = new THREE.Mesh(new THREE.CylinderGeometry(0.11 * scale, 0.11 * scale, 0.06 * scale, 6), jointMat);
        joint.position.set(bx, (s + 1) * segH, bz);
        group.add(joint);

        // Chùm lá tre ở các đốt trên cùng
        if (s >= segCount - 2) {
          for (let l = 0; l < 3; l++) {
            const lAng = l * (Math.PI * 2 / 3) + s;
            const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.18 * scale, 0.9 * scale, 3), leafMat);
            leaf.position.set(bx + Math.cos(lAng) * 0.25 * scale, (s + 1) * segH + 0.1 * scale, bz + Math.sin(lAng) * 0.25 * scale);
            leaf.rotation.z = Math.cos(lAng) * 0.7;
            leaf.rotation.x = Math.sin(lAng) * 0.7;
            group.add(leaf);
          }
        }
      }
    }

    // Bóng tròn nhẹ dưới gốc tre
    const shadowGeo = new THREE.CircleGeometry(1.5 * scale, 12);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x162214, transparent: true, opacity: 0.35 });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.04;
    group.add(shadow);

    group.position.set(x, 0, z);
    currentMapGroup.add(group);
    trees.push({ group, speed: 2.2 + Math.random() * 0.6, type: "bamboo", ox: x, oz: z });
    addCircleObstacle(x, z, 1.1 * scale, "Bụi trúc xanh");
    return group;
  }

  // Cầu nối hàm tạo cây 3D linh hoạt
  function create3DTree(x, z, palette = "sakura", scale = 1) {
    if (palette === "bamboo") {
      return createBambooGrove(x, z, 7, scale);
    } else if (palette === "pine") {
      return createSteppedPineTree(x, z, scale, 0x277a3d);
    } else if (palette === "snow_pine") {
      return createSteppedPineTree(x, z, scale, 0xa8d4f0);
    } else {
      return createStylizedRoundTree(x, z, palette, scale);
    }
  }

  // 3. CỤM NẤM ĐỎ ĐỐM TRẮNG DỄ THƯƠNG (Red Polka-Dot Mushrooms - Ảnh 1 & 2)
  function createMushroomCluster(x, z, scale = 1) {
    const group = new THREE.Group();
    const stemMat = new THREE.MeshStandardMaterial({ color: 0xf5f0e6, roughness: 0.6 });
    const capMat = new THREE.MeshStandardMaterial({ color: 0xd42a20, roughness: 0.35 });
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const mushroomOffsets = [
      { ox: 0, oz: 0, s: 1.0 },
      { ox: 0.8 * scale, oz: -0.4 * scale, s: 0.65 },
      { ox: -0.6 * scale, oz: 0.5 * scale, s: 0.5 }
    ];

    mushroomOffsets.forEach(m => {
      const ms = scale * m.s;
      // Thân nấm
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * ms, 0.28 * ms, 0.9 * ms, 8), stemMat);
      stem.position.set(m.ox, 0.45 * ms, m.oz);
      stem.castShadow = true;
      group.add(stem);

      // Mũ nấm đỏ cong tròn
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.75 * ms, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), capMat);
      cap.position.set(m.ox, 0.85 * ms, m.oz);
      cap.castShadow = true;
      group.add(cap);

      // 4 đốm trắng trên mũ
      for (let a = 0; a < 4; a++) {
        const ang = a * Math.PI * 0.5 + 0.3;
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.12 * ms, 6, 6), dotMat);
        dot.position.set(
          m.ox + Math.cos(ang) * 0.45 * ms,
          0.95 * ms + 0.25 * ms,
          m.oz + Math.sin(ang) * 0.45 * ms
        );
        group.add(dot);
      }
    });

    group.position.set(x, 0, z);
    currentMapGroup.add(group);
  }

  // 4. KHÚC GỖ MỤC ĐÃ ĐỐN (Chopped Wood Logs - Ảnh 1 & 2)
  function createChoppedLog(x, z, rotY = 0, scale = 1) {
    const group = new THREE.Group();
    const barkMat = new THREE.MeshStandardMaterial({ color: 0x5a3a22, roughness: 0.85 });
    const logMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.35 * scale, 0.38 * scale, 2.2 * scale, 8), barkMat);
    logMesh.rotation.z = Math.PI / 2;
    logMesh.position.y = 0.35 * scale;
    logMesh.castShadow = true;
    group.add(logMesh);

    group.position.set(x, 0, z);
    group.rotation.y = rotY;
    currentMapGroup.add(group);
  }

  // 5. TẢNG ĐÁ VÀ SỎI LĂNG QUANH (Smooth Rocks - Ảnh 1 & 2)
  function createSmoothRock(x, z, scale = 1, color = 0x768285) {
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.9, flatShading: true });
    const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(1.2 * scale, 1), mat);
    mesh.position.set(x, 0.8 * scale, z);
    mesh.scale.set(1.2, 0.75, 1.0);
    mesh.rotation.set(Math.random(), Math.random(), Math.random());
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    currentMapGroup.add(mesh);
    // Đăng ký vật cản tảng đá
    addCircleObstacle(x, z, 1.2 * scale, "Tảng đá");
  }

  // 6. BỤI HOA CỎ & QUẢ RỪNG (Flower / Berry Bush - Ảnh 1 & 2)
  function createFlowerBush(x, z, scale = 1, berryColor = 0xff3b30) {
    const group = new THREE.Group();
    const bushMat = new THREE.MeshStandardMaterial({ color: 0x3d8c32, roughness: 0.7, flatShading: true });
    const bush = new THREE.Mesh(new THREE.SphereGeometry(1.1 * scale, 8, 8), bushMat);
    bush.position.y = 0.85 * scale;
    bush.scale.set(1.2, 0.8, 1.2);
    bush.castShadow = true;
    group.add(bush);

    const bMat = new THREE.MeshBasicMaterial({ color: berryColor });
    for (let i = 0; i < 5; i++) {
      const ang = (i / 5) * Math.PI * 2;
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.18 * scale, 6, 6), bMat);
      b.position.set(Math.cos(ang) * 0.9 * scale, 1.0 * scale, Math.sin(ang) * 0.9 * scale);
      group.add(b);
    }
    group.position.set(x, 0, z);
    currentMapGroup.add(group);
  }

  // 7. HỒ NƯỚC / GIẾNG ĐÁ TRUNG TÂM LÀNG (Central Village Pond with Ripple Rings - Ảnh 3)
  function createVillageCentralPond(x = 0, z = 78) {
    const group = new THREE.Group();

    // Vành đá tròn xếp xung quanh hồ nước
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x78726a, roughness: 0.85, flatShading: true });
    const rimRadius = 7.0;
    const stoneCount = 20;
    for (let i = 0; i < stoneCount; i++) {
      const a = (i / stoneCount) * Math.PI * 2;
      const sx = Math.cos(a) * rimRadius;
      const sz = Math.sin(a) * rimRadius;
      const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.85, 1), rimMat);
      stone.position.set(sx, 0.45, sz);
      stone.scale.set(1.1, 0.6, 1.1);
      stone.rotation.y = a;
      stone.castShadow = true;
      group.add(stone);
    }

    // Mặt nước trong xanh phẳng lặng
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x32a8a4,
      roughness: 0.15,
      metalness: 0.35,
      transparent: true,
      opacity: 0.92,
      depthWrite: false
    });
    const water = new THREE.Mesh(new THREE.CircleGeometry(rimRadius - 0.2, 32), waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.25;
    group.add(water);

    // Vòng sóng gợn đồng tâm (Concentric ripple rings)
    const rippleMat = new THREE.MeshBasicMaterial({
      color: 0xc8ffff,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const ripple1 = new THREE.Mesh(new THREE.RingGeometry(2.0, 2.3, 32), rippleMat);
    ripple1.rotation.x = -Math.PI / 2;
    ripple1.position.y = 0.27;
    group.add(ripple1);

    const ripple2 = new THREE.Mesh(new THREE.RingGeometry(4.2, 4.5, 32), rippleMat);
    ripple2.rotation.x = -Math.PI / 2;
    ripple2.position.y = 0.27;
    group.add(ripple2);

    // Bệ đá hoặc đài sen ở chính giữa hồ
    const lotusPed = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 0.6, 8), rimMat);
    lotusPed.position.y = 0.35;
    group.add(lotusPed);

    const lotusFlower = new THREE.Mesh(new THREE.ConeGeometry(0.9, 0.8, 6), new THREE.MeshBasicMaterial({ color: 0xff85b8 }));
    lotusFlower.position.y = 0.85;
    group.add(lotusFlower);

    group.position.set(x, 0, z);
    currentMapGroup.add(group);

    // Đăng ký vùng vật cản hồ nước trung tâm (chặn vùng nước sâu, chừa bờ đá để người chơi tự do đi lại)
    addCircleObstacle(x, z, 5.0, "Hồ nước trung tâm");

    // Thêm các phiến đá dăm/đá hoa cuội tỏa tròn quanh hồ
    for (let r = 8.5; r <= 13.5; r += 2.2) {
      const stepCount = Math.floor(r * 2.8);
      for (let s = 0; s < stepCount; s++) {
        if (Math.random() < 0.45) continue;
        const sa = (s / stepCount) * Math.PI * 2;
        const px = x + Math.cos(sa) * r + (Math.random() - 0.5) * 0.4;
        const pz = z + Math.sin(sa) * r + (Math.random() - 0.5) * 0.4;
        createCobblePebble(px, pz, 0.5 + Math.random() * 0.3);
      }
    }
  }

  // 8. TỪNG VIÊN ĐÁ LÁT CUỘI / PHIẾN ĐÁ BƯỚC ĐI (Cobble Pebble)
  function createCobblePebble(x, z, scale = 1) {
    const mat = new THREE.MeshStandardMaterial({
      color: 0x8a847a,
      roughness: 0.9,
      flatShading: true
    });
    const pebble = new THREE.Mesh(new THREE.CylinderGeometry(0.55 * scale, 0.65 * scale, 0.12, 6), mat);
    pebble.position.set(x, 0.06, z);
    pebble.rotation.y = Math.random() * Math.PI;
    pebble.receiveShadow = true;
    currentMapGroup.add(pebble);
  }

  // 9. THÁP CANH & CHÒI GÁC BIÊN CƯƠNG NGOẠI VI
  function createDistantWatchtower(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5a3d24, roughness: 0.9 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x8a2c16, roughness: 0.8 });

    for (let dx of [-1.5, 1.5]) {
      for (let dz of [-1.5, 1.5]) {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 9, 6), woodMat);
        pole.position.set(dx, 4.5, dz);
        group.add(pole);
      }
    }

    const floor = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.35, 4.2), woodMat);
    floor.position.y = 8.5;
    group.add(floor);

    const roof = new THREE.Mesh(new THREE.ConeGeometry(3.6, 2.2, 4), roofMat);
    roof.position.y = 11.2;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    currentMapGroup.add(group);
    addCircleObstacle(x, z, 2.2, "Tháp canh biên cương");
  }

  // 10. DÃY NÚI HÙNG VĨ 360 ĐỘ & VÀNH ĐAI RỪNG RẬM NGOẠI THÀNH (BẢO ĐẢM NHÌN XA ĐẦY ĐỦ CẢNH QUAN)
  function createDistantLandscape() {
    // 1. Dãy Núi Hùng Vĩ 360 Độ Bao Quanh Chân Trời (Bán kính 190m - 270m)
    const mountainColors = [0x4a585a, 0x5a6668, 0x3d4a4c, 0x526062, 0x445254];
    for (let i = 0; i < 36; i++) {
      const ang = (i / 36) * Math.PI * 2 + (Math.random() - 0.5) * 0.12;
      const dist = 190 + (i % 3) * 28 + Math.random() * 20;
      const mx = Math.cos(ang) * dist;
      const mz = Math.sin(ang) * dist;
      const height = 36 + (i % 5) * 9 + Math.random() * 12;
      const radius = 25 + (i % 4) * 6;

      const mGeo = new THREE.ConeGeometry(radius, height, 7);
      const mMat = new THREE.MeshStandardMaterial({
        color: mountainColors[i % mountainColors.length],
        roughness: 0.95,
        flatShading: true
      });
      const mMesh = new THREE.Mesh(mGeo, mMat);
      mMesh.position.set(mx, height / 2 - 2, mz);
      mMesh.rotation.y = Math.random() * Math.PI;
      currentMapGroup.add(mMesh);

      // Đỉnh núi phủ tuyết / mây mờ huyền ảo
      if (height > 42) {
        const snowGeo = new THREE.ConeGeometry(radius * 0.38, height * 0.35, 7);
        const snowMat = new THREE.MeshStandardMaterial({
          color: 0xdaeef8,
          roughness: 0.85,
          flatShading: true
        });
        const snowMesh = new THREE.Mesh(snowGeo, snowMat);
        snowMesh.position.set(mx, height - (height * 0.35) / 2 - 2, mz);
        snowMesh.rotation.y = mMesh.rotation.y;
        currentMapGroup.add(snowMesh);
      }
    }

    // 2. Vành Đai Cây Cổ Thụ Ngoại Vi (Bán kính 105m - 180m)
    const outerPines = [
      [115, -45], [125, -60], [135, -40], [145, -70], [155, -50], [165, -80],
      [120, 45], [130, 60], [140, 50], [150, 75], [160, 60], [170, 85],
      [-115, -55], [-125, -70], [-135, -50], [-145, -80], [-155, -65], [-165, -90],
      [-120, 45], [-130, 65], [-140, 55], [-150, 80], [-160, 70], [-170, 95],
      [-50, -145], [-25, -155], [0, -160], [25, -155], [50, -145],
      [-55, 145], [-30, 155], [0, 160], [30, 155], [55, 145]
    ];
    outerPines.forEach(([px, pz], idx) => {
      const treeType = (idx % 3 === 0) ? "maple" : (idx % 3 === 1) ? "ginkgo" : "pine";
      if (treeType === "pine") {
        createSteppedPineTree(px, pz, 1.35 + (idx % 3) * 0.2, 0x1e5a2c);
      } else {
        createStylizedRoundTree(px, pz, treeType, 1.3 + (idx % 3) * 0.25);
      }
    });

    // 3. Các Trạm Canh & Chòi Gác Ngoại Thành
    createDistantWatchtower(135, -20);
    createDistantWatchtower(-140, -15);
    createDistantWatchtower(0, -165);
    createDistantWatchtower(0, 155);
  }

  // ==========================================
  // 5. CHẤM TRÒN VÀNG CLICK CHUỘT BÁM MẶT ĐẤT 3D
  // ==========================================
  const groundClickRing = new THREE.Mesh(
    new THREE.RingGeometry(0.8, 1.25, 32),
    new THREE.MeshBasicMaterial({ color: 0xffd24a, side: THREE.DoubleSide, transparent: true, opacity: 0.95 })
  );
  groundClickRing.rotation.x = -Math.PI / 2;
  groundClickRing.position.y = 0.06;
  groundClickRing.visible = false;
  scene.add(groundClickRing);
  let groundClickTimer = 0;



  // ==========================================
  // 7. BẢNG TÊN & MÁU 3D CHUẨN VÕ LÂM CHIBI
  // ==========================================
  const ELEMENT_INFO = {
    "Kim": { name: "Kim", color: "#e3c46a", dark: "#6a521a" },
    "Mộc": { name: "Mộc", color: "#72c25e", dark: "#2a5218" },
    "Thủy": { name: "Thủy", color: "#5fabe6", dark: "#183e6a" },
    "Hỏa": { name: "Hỏa", color: "#e8703f", dark: "#6a2210" },
    "Thổ": { name: "Thổ", color: "#c3955a", dark: "#543818" }
  };

  // BẢNG TÊN QUÁI VẬT 3D CHUẨN ĐÚNG THEO ẢNH CHỤP 2.5D:
  // Dòng 1: Hệ Thổ (chữ vàng #f0c060, viền đen strokeText sắc nét, không viền hộp đen)
  // Dòng 2: Chấm tròn ngũ hành + Tên quái - Cấp (ví dụ: o Mãnh Hổ - 47)
  // Dòng 3: Thanh máu đỏ mini (headBar) chỉ hiện khi bị đánh mất máu hoặc được nhắm
  function createMonsterBillboard(mon) {
    const canvas = document.createElement("canvas");
    canvas.width = 256; canvas.height = 96;
    const ctx = canvas.getContext("2d");
    const elInfo = ELEMENT_INFO[mon.element] || ELEMENT_INFO["Thổ"];
    const isBoss = (mon.type === "boss" || mon.type.includes("boss"));

    function renderTexture(hpPercent = 1, isTarget = false) {
      ctx.clearRect(0, 0, 256, 96);

      // DÒNG 1: "Hệ Thổ" (chữ vàng #f0c060, viền đen sắc nét, không khung hộp đen)
      ctx.font = "bold 15.5px 'Noto Serif', Georgia, serif";
      ctx.textAlign = "center";
      ctx.lineJoin = "round";
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#000000";
      ctx.strokeText(`Hệ ${mon.element || 'Thổ'}`, 128, 22);
      ctx.fillStyle = "#f0c060";
      ctx.fillText(`Hệ ${mon.element || 'Thổ'}`, 128, 22);

      // DÒNG 2: Chấm tròn ngũ hành + "Tên quái - Cấp" (ví dụ: "o Mãnh Hổ - 47")
      const nameText = `${mon.name} - ${mon.lv}`;
      ctx.font = "bold 18px 'Noto Serif', Georgia, serif";
      const textWidth = ctx.measureText(nameText).width;
      const startX = 128 - textWidth / 2;

      // Chấm tròn nhỏ ngũ hành màu sắc theo hệ
      ctx.beginPath();
      ctx.arc(startX - 11, 46, 5, 0, Math.PI * 2);
      ctx.fillStyle = elInfo.color;
      ctx.fill();
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = "#000000";
      ctx.stroke();

      // Màu tên quái dựa theo độ chênh lệch cấp so với hiệp khách
      const diff = mon.lv - (hero ? hero.lv : 200);
      const nameCol = isBoss ? "#ff3b30" : (diff >= 3 ? "#ff6a55" : (diff >= 1 ? "#ffd24a" : (diff <= -4 ? "#a0a0a0" : "#f1e5c9")));

      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#000000";
      ctx.strokeText(nameText, 128, 52);
      ctx.fillStyle = nameCol;
      ctx.fillText(nameText, 128, 52);

      // DÒNG 3: Thanh máu đỏ mini (headBar) chỉ hiện khi bị mất máu hoặc đang được nhắm làm mục tiêu
      if (hpPercent < 1 || isTarget) {
        const barW = isBoss ? 150 : 96;
        const barH = 5.5;
        const barX = 128 - barW / 2;
        const barY = 66;

        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(barX, barY, barW, barH);
        ctx.fillStyle = "#d8442f";
        ctx.fillRect(barX, barY, Math.max(0, barW * hpPercent), barH);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1.2;
        ctx.strokeRect(barX, barY, barW, barH);
      }
    }

    renderTexture(1, false);
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      depthTest: false
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(4.0, 1.5, 1);
    return {
      sprite,
      canvas,
      updateHp: (p, isTgt = false) => {
        renderTexture(p, isTgt);
        texture.needsUpdate = true;
      }
    };
  }

  // Bảng tên dành cho Hiệp Khách và NPC
  function createEntityBillboard(name, subText) {
    const canvas = document.createElement("canvas");
    canvas.width = 256; canvas.height = 64;
    const ctx = canvas.getContext("2d");

    function renderTexture() {
      ctx.clearRect(0, 0, 256, 64);
      ctx.font = "bold 17px 'Noto Serif', Georgia, serif";
      ctx.textAlign = "center";
      ctx.lineJoin = "round";
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#000000";
      ctx.strokeText(name, 128, 25);
      ctx.fillStyle = "#ffd24a";
      ctx.fillText(name, 128, 25);

      if (subText) {
        ctx.font = "bold 13px 'Noto Serif', Georgia, serif";
        ctx.lineWidth = 3.0;
        ctx.strokeStyle = "#000000";
        ctx.strokeText(subText, 128, 48);
        ctx.fillStyle = "#8ef0a0";
        ctx.fillText(subText, 128, 48);
      }
    }

    renderTexture();
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(3.8, 0.95, 1);
    return { sprite, updateHp: () => {} };
  }

  // Vòng chọn mục tiêu dưới chân
  const targetRing = new THREE.Mesh(
    new THREE.RingGeometry(1.4, 1.7, 32),
    new THREE.MeshBasicMaterial({ color: 0xff3b30, side: THREE.DoubleSide })
  );
  targetRing.rotation.x = -Math.PI / 2;
  targetRing.position.y = 0.08;
  targetRing.visible = false;
  scene.add(targetRing);

  // ==========================================
  // 8. KHỞI TẠO HIỆP KHÁCH, QUÁI VẬT & 14 ĐẠI NPCS
  // ==========================================
  const clickableObjects = [];
  const monsters = [];
  const skillTraps3D = [];
  const skillTrapBurns3D = [];
  const npcs = [];
  const floatingTexts = [];
  let currentTarget = null;

  // Dữ liệu Hiệp Khách
  const hero = {
    hp: 1397, maxHp: 1397, baseMaxHp: 1397,
    mp: 987, maxMp: 987, baseMaxMp: 987,
    lv: 200,
    skillLevels: {},
    buffs: {},
    critChance: 5,
    critDamage: 80,
    faction: "kiem", // Võ Đang (Mặc định)
    speed: 13.0,
    facing: 0,
    isMoving: false,
    isAttacking: false,
    isCasting: false,
    castTimer: 0,
    castDuration: 0,
    castColor: "#a8dcff",
    pendingSkillCast: null,
    isJumping: false,
    attackTimer: 0,
    skillPose: "slash",
    skillPoseTimer: 0,
    skillHopTimer: 0,
    skillHopDuration: 0,
    walkPhase: 0,
    mesh: null,
    sprite: null,
    canvas: null,
    ctx: null,
    tex: null,
    pos: new THREE.Vector3(0, 0, 88),
    targetPos: new THREE.Vector3(0, 0, 88),
    isRiding: false,
    isMeditating: false,
    autoFight: false,
    pkMode: "peace",
    potions: { hp: 17, mp: 11, all: 3, antidote: 5 }
  };
  window.hero = hero;

  // Vị trí trước đó của hero dùng để dịch chuyển camera 100% bám sát
  const lastHeroPos = hero.pos.clone();

  function initChibiHero() {
    const group = new THREE.Group();
    const canvas = document.createElement("canvas");
    canvas.width = 160; canvas.height = 160;
    const ctx = canvas.getContext("2d");
    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: true, alphaTest: 0.05 });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(4.2, 4.2, 1);
    sprite.position.y = 1.9;
    group.add(sprite);

    const bb = createEntityBillboard("Hiệp Khách [GM]", "Võ Đang · Cấp 200");
    bb.sprite.position.y = 4.2;
    group.add(bb.sprite);

    group.position.copy(hero.pos);
    scene.add(group);

    hero.mesh = group;
    hero.sprite = sprite;
    hero.canvas = canvas;
    hero.ctx = ctx;
    hero.tex = tex;
    hero.billboard = bb;

    // Căn chỉnh camera và tâm ngắm vào chính giữa nhân vật
    controls.target.set(hero.pos.x, 1.6, hero.pos.z);
    camera.position.set(hero.pos.x, 16, hero.pos.z + 23);
    lastHeroPos.copy(hero.pos);
    controls.update();
  }
  initChibiHero();

  function createMonster(type, name, lv, maxHp, element, x, z) {
    const group = new THREE.Group();
    const canvas = document.createElement("canvas");
    canvas.width = 160; canvas.height = 160;
    const ctx = canvas.getContext("2d");
    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: true, alphaTest: 0.05 });
    const sprite = new THREE.Sprite(mat);

    const isBoss = (type === "boss" || type.includes("boss"));
    const isDummy = (type === "dummy");
    const scale = isBoss ? 6.2 : isDummy ? 4.6 : 4.0;
    sprite.scale.set(scale, scale, 1);
    sprite.position.y = isBoss ? 2.8 : 1.7;
    group.add(sprite);

    group.position.set(x, 0, z);
    scene.add(group);

    const mon = {
      id: Math.random().toString(),
      type, name, lv, maxHp, hp: maxHp, element: element || "Thổ",
      def: Math.round((Number(lv) || 1) * 0.72),
      stunTimer: 0,
      rootTimer: 0,
      slowTimer: 0,
      slowPct: 0,
      dot: null,
      homeX: x, homeZ: z,
      group, sprite, canvas, ctx, tex,
      billboard: null, colMesh: null,
      scale, isDead: false, deadTimer: 0,
      hitTimer: 0,
      state: "idle",
      stateTimer: 2.0 + Math.random() * 3.0,
      targetPos: new THREE.Vector3(x, 0, z),
      curAngle: Math.random() * Math.PI * 2,
      facing: Math.random() * Math.PI * 2,
      walkPhase: 0,
      isMoving: false,
      backstepTimer: 0,
      backstepCooldown: 0,
      backstepDir: new THREE.Vector3()
    };

    // Bảng tên quái vật hiển thị chuẩn 2.5D (Dòng 1: Hệ Thổ, Dòng 2: o Mãnh Hổ - 47)
    const billboard = createMonsterBillboard(mon);
    billboard.sprite.position.y = isBoss ? 6.4 : 3.8;
    group.add(billboard.sprite);
    mon.billboard = billboard;

    // Hộp va chạm click chuột bao trùm trọn vẹn từ chân tới đỉnh bảng tên (chiều cao 6.5m, bán kính 2.4m)
    const colGeo = new THREE.CylinderGeometry(2.4 * (scale / 4), 2.4 * (scale / 4), 6.5, 8);
    const colMesh = new THREE.Mesh(colGeo, new THREE.MeshBasicMaterial({ visible: false }));
    colMesh.position.y = 2.5;
    group.add(colMesh);
    mon.colMesh = colMesh;

    colMesh.userData = { entity: mon, isMonster: true };
    billboard.sprite.userData = { entity: mon, isMonster: true };
    sprite.userData = { entity: mon, isMonster: true };

    clickableObjects.push(colMesh);
    clickableObjects.push(billboard.sprite);
    clickableObjects.push(sprite);
    monsters.push(mon);
    return mon;
  }

  // ==========================================
  // HỆ THỐNG NHIỆM VỤ CHÍNH TUYẾN 3D VÕ LÂM CHIBI
  // ==========================================
  const QUEST_DATABASE = [
    {
      id: 0,
      title: "Tân Thủ · Trừ Diệt Bầy Sói",
      npc: "Trưởng Trấn Lý",
      targetType: "wolf",
      targetMatch: ["soi", "sói", "wolf", "lang"],
      need: 5,
      introQuote: "Chào mừng thiếu hiệp đã đến với Ba Lăng Huyện! Dạo gần đây ngoài bìa rừng Liễu Khê xuất hiện bầy Sói Xám hung dữ cắn phá gia súc và đe dọa thôn dân. Thiếu hiệp hãy sang cầu vượt sông tiêu diệt 5 con Sói Xám giúp dân làng!",
      progressQuote: "Thiếu hiệp đã tiêu diệt được {count}/{need} Sói Xám. Hãy chú ý giữ khoảng cách và tung chiêu Lôi Lôi Chùy [Q] hoặc Băng Liên Kiếm [W]!",
      doneQuote: "Đa tạ thiếu hiệp đại ân đại đức! Bầy sói đã tan tác, dân làng Ba Lăng Huyện vô cùng cảm kích. Đây là chút lộ phí và dược phẩm tạ ơn!",
      reward: {
        exp: 6000,
        gold: 1500,
        hpPot: 5,
        mpPot: 5,
        fame: 50,
        desc: "6,000 EXP · 1,500 lượng · 5 Bình Kim Sáng Dược · 5 Bình Nội Lực"
      }
    },
    {
      id: 1,
      title: "Trừ Bạo · Dẹp Đàn Heo Rừng",
      npc: "Trưởng Trấn Lý",
      targetType: "boar",
      targetMatch: ["heo", "boar", "trư"],
      need: 6,
      introQuote: "Lũ Heo Rừng nanh dài đang ủi nát hoa màu ruộng lúa của thôn dân. Thiếu hiệp hãy tiếp tục ra tay trượng nghĩa tiễu trừ 6 con Heo Rừng hung hãn!",
      progressQuote: "Tiến độ: Đã hạ {count}/{need} Heo Rừng. Cố gắng lên hiệp khách!",
      doneQuote: "Thật là hào kiệt xuất chúng! Ruộng đồng của bá tánh nay đã an toàn. Hãy nhận lấy phần thưởng xứng đáng này!",
      reward: {
        exp: 15000,
        gold: 3000,
        hpPot: 8,
        mpPot: 8,
        fame: 100,
        desc: "15,000 EXP · 3,000 lượng · 8 Bình Dược Phẩm · 100 Danh Vọng"
      }
    },
    {
      id: 2,
      title: "Tiễu Phỉ · Dẹp Loạn Thảo Khấu",
      npc: "Trưởng Trấn Lý",
      targetType: "bandit",
      targetMatch: ["thảo khấu", "bandit", "sơn tặc", "đao khách"],
      need: 8,
      introQuote: "Đám Thảo Khấu Sơn Tặc lập doanh trại cướp bóc khách buôn và thương đoàn qua lại bờ Liễu Khê. Ngươi hãy đến dẹp tan 8 tên Thảo Khấu để giữ yên sơn hà!",
      progressQuote: "Tiến độ: Đã trừ {count}/{need} Thảo Khấu. Đao kiếm vô tình, chớ khinh suất!",
      doneQuote: "Hảo kiếm pháp! Đám thổ phỉ đã khiếp sợ trước oai phong của hiệp khách. Uy danh của ngươi đã vang lừng khắp chốn giang hồ!",
      reward: {
        exp: 30000,
        gold: 8000,
        hpPot: 12,
        mpPot: 12,
        fame: 250,
        desc: "30,000 EXP · 8,000 lượng · 12 Bình Dược Phẩm · Giáp Chibi Hoàng Kim"
      }
    },
    {
      id: 3,
      title: "Trảm Yêu · Tiêu Diệt Hắc Lang Chúa",
      npc: "Trưởng Trấn Lý",
      targetType: "boss",
      targetMatch: ["boss", "độc lang", "vương", "chúa"],
      need: 1,
      introQuote: "Sâu trong cấm địa rừng rậm, con Đại Boss Độc Lang Vương đã thức tỉnh và gầm rú rung chuyển núi đồi. Thiếu hiệp hãy vận hết công lực tuyệt kỹ để trừ khử mối đại họa này!",
      progressQuote: "Đang truy kích Độc Lang Vương ({count}/{need}). Hãy dự trữ đầy đủ Kim Sáng Dược!",
      doneQuote: "Trời ơi, Độc Lang Vương bách chiến bách thắng đã bị ngươi hạ gục! Đúng là kỳ tài ngút trời của võ lâm đương đại! Xin nhận của ta một lạy!",
      reward: {
        exp: 80000,
        gold: 25000,
        hpPot: 20,
        mpPot: 20,
        fame: 600,
        desc: "80,000 EXP · 25,000 lượng · Thần Binh Hoàng Kim Chibi VLTK"
      }
    }
  ];

  hero.quest = {
    id: 0,
    active: false,
    count: 0
  };

  // Cập nhật khung nhiệm vụ trên màn hình
  function updateQuestHud() {
    const questEl = document.getElementById("quest");
    if (!questEl) return;
    const q = QUEST_DATABASE[hero.quest.id];
    if (!q) {
      questEl.innerHTML = `<b>📜 Nhiệm vụ - Hoàn Thành</b><div style="color:var(--paper-dim);">Thiếu hiệp đã hoàn thành toàn bộ chuỗi nhiệm vụ chính tuyến!</div>`;
      return;
    }
    if (!hero.quest.active) {
      questEl.innerHTML = `<b>📜 Nhiệm vụ (Chưa Nhận)</b><div style="color:#ffd24a;">Đến gặp <b>Trưởng Trấn Lý</b> nhận [${q.title}]</div>`;
    } else {
      const isDone = hero.quest.count >= q.need;
      questEl.innerHTML = `<b>📜 ${q.title}</b><div style="color:${isDone ? '#8ef0a0' : '#f1e5c9'};">${isDone ? '✨ Đã hoàn thành! Mau về gặp Trưởng Trấn Lý' : `Tiến độ: <b>${hero.quest.count} / ${q.need}</b>`}</div>`;
    }
  }

  // Tạo huy hiệu Quest Marker ("?" hoặc "!") lơ lửng trên đầu NPC
  function createQuestMarker() {
    const canvas = document.createElement("canvas");
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext("2d");
    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(1.4, 1.4, 1);
    sprite.position.y = 5.2;
    sprite.visible = false;
    return { canvas, ctx, tex, sprite };
  }

  // Vẽ dấu "?" hoặc "!" lên Texture của huy hiệu
  function drawQuestMarkerTexture(qm, symbol, color) {
    const ctx = qm.ctx;
    ctx.clearRect(0, 0, 128, 128);

    // Vầng hào quang tỏa sáng phía sau
    const rad = ctx.createRadialGradient(64, 64, 10, 64, 64, 56);
    rad.addColorStop(0, color === "#ffd24a" ? "rgba(255, 210, 74, 0.85)" : "rgba(142, 240, 160, 0.85)");
    rad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(64, 64, 56, 0, Math.PI * 2);
    ctx.fill();

    // Khung kim cương viền vàng
    ctx.save();
    ctx.translate(64, 64);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = "#1e140b";
    ctx.fillRect(-22, -22, 44, 44);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3.5;
    ctx.strokeRect(-22, -22, 44, 44);
    ctx.restore();

    // Chữ số/Ký tự '?' hoặc '!'
    ctx.font = "bold 44px 'Noto Serif', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#000000";
    ctx.strokeText(symbol, 64, 66);
    ctx.fillStyle = color;
    ctx.fillText(symbol, 64, 66);

    qm.tex.needsUpdate = true;
  }

  // Cập nhật trạng thái hiển thị dấu "?" và "!" trên đầu NPC
  function updateNpcQuestMarker(npc) {
    if (!npc || !npc.questMarker) return;
    if (npc.name !== "Trưởng Trấn Lý") {
      npc.questMarker.sprite.visible = false;
      return;
    }

    const curQuest = QUEST_DATABASE[hero.quest.id];
    if (!curQuest) {
      npc.questMarker.sprite.visible = false;
      return;
    }

    if (!hero.quest.active) {
      // Có nhiệm vụ mới để nhận -> Dấu "?" Vàng
      drawQuestMarkerTexture(npc.questMarker, "?", "#ffd24a");
      npc.questMarker.sprite.visible = true;
    } else if (hero.quest.count >= curQuest.need) {
      // Đã hoàn thành nhiệm vụ -> Dấu "!" Vàng/Xanh lá phát sáng
      drawQuestMarkerTexture(npc.questMarker, "!", "#8ef0a0");
      npc.questMarker.sprite.visible = true;
    } else {
      // Đang làm nhưng chưa xong -> Ẩn
      npc.questMarker.sprite.visible = false;
    }
  }

  // Mở Bảng Đối Thoại NPC Chibi (Dialogue Modal)
  window.openNpcDialog = function(npc) {
    if (!npc) return;
    const modal = document.getElementById("npcDialogModal");
    if (!modal) return;

    // 1. Cập nhật Tiêu đề & Thông tin NPC
    document.getElementById("npcDlgTitle").textContent = npc.name;
    document.getElementById("npcDlgRole").textContent = npc.role;
    document.getElementById("npcDlgSubName").textContent = currentMapDef ? currentMapDef.name : "Ba Lăng Huyện";

    // 2. Vẽ Avatar Chibi của NPC lên Canvas
    const cv = document.getElementById("npcDlgCanvas");
    if (cv) {
      const ctx = cv.getContext("2d");
      ctx.clearRect(0, 0, cv.width, cv.height);
      if (window.ChibiRenderer && typeof window.ChibiRenderer.drawNpc === "function") {
        window.ChibiRenderer.drawNpc(ctx, 80, 140, npc.roleType, { time: performance.now() * 0.002 });
      }
    }

    // 3. Hiển thị Lời thoại & Khung Nhiệm Vụ
    const quoteEl = document.getElementById("npcDlgQuote");
    const questBox = document.getElementById("npcDlgQuestBox");
    const optContainer = document.getElementById("npcDlgOptions");
    optContainer.innerHTML = "";

    const curQuest = QUEST_DATABASE[hero.quest.id];

    if (npc.name === "Trưởng Trấn Lý") {
      if (!curQuest) {
        quoteEl.textContent = `"Nhờ có thiếu hiệp mà toàn cõi Ba Lăng Huyện đã thái bình thịnh trị. Danh tiếng của thiếu hiệp lưu danh ngàn đời!"`;
        questBox.style.display = "none";
      } else if (!hero.quest.active) {
        // Chưa nhận nhiệm vụ
        quoteEl.textContent = `"${curQuest.introQuote}"`;
        questBox.style.display = "block";
        document.getElementById("npcDlgQuestTitle").textContent = `📜 Nhiệm vụ: ${curQuest.title} (0/${curQuest.need})`;
        document.getElementById("npcDlgQuestDesc").textContent = `Tiêu diệt ${curQuest.need} ${curQuest.targetMatch[0].toUpperCase()} ngoài bìa rừng Liễu Khê.`;
        document.getElementById("npcDlgQuestReward").textContent = `🎁 Phần thưởng: ${curQuest.reward.desc}`;

        // Nút Nhận Nhiệm Vụ
        const btnAccept = document.createElement("button");
        btnAccept.className = "npc-opt-btn primary";
        btnAccept.innerHTML = `<span>📜</span> <span><b>Nhận nhiệm vụ</b>: ${curQuest.title}</span>`;
        btnAccept.onclick = () => {
          hero.quest.active = true;
          hero.quest.count = 0;
          updateQuestHud();
          closeNpcDialog();
          toast3D(`📜 Nhận nhiệm vụ: <b style="color:#ffd24a">${curQuest.title}</b>!`);
          playSfx("potion");
          updateNpcQuestMarker(npc);
        };
        optContainer.appendChild(btnAccept);
      } else if (hero.quest.count < curQuest.need) {
        // Đang thực hiện nhiệm vụ
        const pQuote = curQuest.progressQuote.replace("{count}", hero.quest.count).replace("{need}", curQuest.need);
        quoteEl.textContent = `"${pQuote}"`;
        questBox.style.display = "block";
        document.getElementById("npcDlgQuestTitle").textContent = `📜 Nhiệm vụ: ${curQuest.title} (${hero.quest.count}/${curQuest.need})`;
        document.getElementById("npcDlgQuestDesc").textContent = `Tiếp tục tiêu diệt thêm ${curQuest.need - hero.quest.count} ${curQuest.targetMatch[0].toUpperCase()}.`;
        document.getElementById("npcDlgQuestReward").textContent = `🎁 Phần thưởng: ${curQuest.reward.desc}`;

        const btnProg = document.createElement("button");
        btnProg.className = "npc-opt-btn";
        btnProg.innerHTML = `<span>⏳</span> <span>Tiến độ hiện tại: <b>${hero.quest.count}/${curQuest.need}</b></span>`;
        btnProg.onclick = () => {
          toast3D(`Tiến độ nhiệm vụ: <b>${hero.quest.count}/${curQuest.need}</b>!`);
          closeNpcDialog();
        };
        optContainer.appendChild(btnProg);
      } else {
        // Đã hoàn thành nhiệm vụ -> Trả thưởng!
        quoteEl.textContent = `"${curQuest.doneQuote}"`;
        questBox.style.display = "block";
        document.getElementById("npcDlgQuestTitle").textContent = `✨ ĐÃ HOÀN THÀNH: ${curQuest.title}!`;
        document.getElementById("npcDlgQuestDesc").textContent = `Đã tiêu diệt đủ ${curQuest.need} quái thú. Hãy nhận lấy phần thưởng!`;
        document.getElementById("npcDlgQuestReward").textContent = `🎁 Nhận ngay: ${curQuest.reward.desc}`;

        const btnDone = document.createElement("button");
        btnDone.className = "npc-opt-btn reward";
        btnDone.innerHTML = `<span>✨</span> <span><b>Hoàn thành nhiệm vụ - Nhận thưởng lớn!</b></span>`;
        btnDone.onclick = () => {
          // Trả thưởng
          hero.potions.hp += (curQuest.reward.hpPot || 5);
          hero.potions.mp += (curQuest.reward.mpPot || 5);
          document.getElementById("p1Num").textContent = hero.potions.hp;
          document.getElementById("p2Num").textContent = hero.potions.mp;

          toast3D(`🎉 <b style="color:#ffd24a">Hoàn thành ${curQuest.title}</b>! Nhận ${curQuest.reward.desc}`);
          playSfx("hit");

          // Chuyển sang nhiệm vụ tiếp theo
          hero.quest.id++;
          hero.quest.active = false;
          hero.quest.count = 0;
          updateQuestHud();
          updateNpcQuestMarker(npc);
          closeNpcDialog();
        };
        optContainer.appendChild(btnDone);
      }
    } else {
      // Các NPC khác (Xa Phu, Dược Thương, Thiết Tượng, Mã Phu, Tiền Trang, v.v.)
      quoteEl.textContent = `"${npc.quote || 'Kính chào thiếu hiệp!'}"`;
      questBox.style.display = "none";

      if (npc.roleType === "xaphu") {
        const btnXp = document.createElement("button");
        btnXp.className = "npc-opt-btn primary";
        btnXp.innerHTML = `<span>🐎</span> <span><b>Dịch Trạm Xa Phu</b> - Đi các Thôn Trấn, Thành Thị & Bãi Train</span>`;
        btnXp.onclick = () => {
          closeNpcDialog();
          window.openXaPhuModal();
        };
        optContainer.appendChild(btnXp);

        const btnMap = document.createElement("button");
        btnMap.className = "npc-opt-btn";
        btnMap.innerHTML = `<span>🗺️</span> <span>Xem <b>Bản Đồ Toàn Cảnh Giang Sơn Cửu Châu (M)</b></span>`;
        btnMap.onclick = () => {
          closeNpcDialog();
          window.openMapModal();
        };
        optContainer.appendChild(btnMap);
      } else if (npc.roleType === "doctor") {
        const btnBuyHp = document.createElement("button");
        btnBuyHp.className = "npc-opt-btn";
        btnBuyHp.innerHTML = `<span>🧪</span> <span>Mua <b>Kim Sáng Dược (+600 HP)</b> × 10 bình</span>`;
        btnBuyHp.onclick = () => {
          hero.potions.hp += 10;
          document.getElementById("p1Num").textContent = hero.potions.hp;
          toast3D("🧪 Mua thành công 10 Bình Kim Sáng Dược!");
          playSfx("potion");
        };
        optContainer.appendChild(btnBuyHp);

        const btnBuyMp = document.createElement("button");
        btnBuyMp.className = "npc-opt-btn";
        btnBuyMp.innerHTML = `<span>🔮</span> <span>Mua <b>Cửu Chuyển Hồi Khí (+500 MP)</b> × 10 bình</span>`;
        btnBuyMp.onclick = () => {
          hero.potions.mp += 10;
          document.getElementById("p2Num").textContent = hero.potions.mp;
          toast3D("🔮 Mua thành công 10 Bình Hồi Nội Lực!");
          playSfx("potion");
        };
        optContainer.appendChild(btnBuyMp);

        const btnHeal = document.createElement("button");
        btnHeal.className = "npc-opt-btn reward";
        btnHeal.innerHTML = `<span>🩸</span> <span><b>Trị Thương Miễn Phí</b> - Phục hồi đầy đủ Khí Huyết & Nội Lực</span>`;
        btnHeal.onclick = () => {
          hero.hp = hero.maxHp;
          hero.mp = hero.maxMp;
          updateTopBars();
          toast3D("🩸 Đại phu đã châm cứu thông kinh mạch! Sinh lực và nội lực đã hồi phục 100%!");
          playSfx("potion");
        };
        optContainer.appendChild(btnHeal);
      } else if (npc.roleType === "smith") {
        const btnUpgrade = document.createElement("button");
        btnUpgrade.className = "npc-opt-btn primary";
        btnUpgrade.innerHTML = `<span>⚔️</span> <span><b>Rèn & Cường Hóa Binh Khí</b> (+15% Sát thương ngoại công)</span>`;
        btnUpgrade.onclick = () => {
          toast3D("⚒️ Đinh đang... Binh khí đã được tôi luyện bằng huyền thiết sáng bóng!");
          playSfx("hit");
        };
        optContainer.appendChild(btnUpgrade);

        const btnRepair = document.createElement("button");
        btnRepair.className = "npc-opt-btn";
        btnRepair.innerHTML = `<span>🛡️</span> <span><b>Sửa Chữa Giáp Trụ</b> - Độ bền phục hồi tối đa</span>`;
        btnRepair.onclick = () => {
          toast3D("🛡️ Giáp trụ và nón mũ đã được gia cố hoàn hảo như mới!");
          playSfx("hit");
        };
        optContainer.appendChild(btnRepair);
      } else if (npc.roleType === "horse") {
        const btnRide = document.createElement("button");
        btnRide.className = "npc-opt-btn primary";
        btnRide.innerHTML = `<span>🐎</span> <span><b>Cưỡi Ngựa / Xuống Ngựa (Phím T)</b></span>`;
        btnRide.onclick = () => {
          closeNpcDialog();
          window.toggleRide3D();
        };
        optContainer.appendChild(btnRide);
      } else if (npc.roleType === "bank") {
        const btnBank = document.createElement("button");
        btnBank.className = "npc-opt-btn";
        btnBank.innerHTML = `<span>💰</span> <span><b>Tiền Trang Quán</b> - Gửi và cất giữ bảo vật giang hồ</span>`;
        btnBank.onclick = () => {
          toast3D("💰 Đã mở hòm rương tiền trang an toàn tuyệt đối!");
        };
        optContainer.appendChild(btnBank);
      } else if (npc.roleType === "tester") {
        const btnGift = document.createElement("button");
        btnGift.className = "npc-opt-btn reward";
        btnGift.innerHTML = `<span>🎁</span> <span><b>Nhận Quà Thử Nghiệm</b> (50 Bình Dược Phẩm + Đầy Máu/Nội Lực)</span>`;
        btnGift.onclick = () => {
          hero.potions.hp += 50;
          hero.potions.mp += 50;
          hero.hp = hero.maxHp;
          hero.mp = hero.maxMp;
          document.getElementById("p1Num").textContent = hero.potions.hp;
          document.getElementById("p2Num").textContent = hero.potions.mp;
          updateTopBars();
          toast3D("🎁 Nhận thành công gói hỗ trợ thử nghiệm Võ Lâm Chibi 3D!");
          playSfx("potion");
        };
        optContainer.appendChild(btnGift);
      }
    }

    // Nút Tán gẫu chung
    const btnChat = document.createElement("button");
    btnChat.className = "npc-opt-btn";
    btnChat.innerHTML = `<span>💬</span> <span>Hỏi thăm tin tức giang hồ</span>`;
    btnChat.onclick = () => {
      toast3D(`[${npc.name}] "Giang hồ hiểm ác, thiếu hiệp bôn tẩu hãy giữ gìn thân thể!"`);
    };
    optContainer.appendChild(btnChat);

    if (window.openModal3D) {
      window.openModal3D("npcDialogModal");
    } else {
      modal.style.display = "block";
    }
  };

  window.closeNpcDialog = function() {
    if (window.closeModal3D) {
      window.closeModal3D("npcDialogModal");
    } else {
      const modal = document.getElementById("npcDialogModal");
      if (modal) modal.style.display = "none";
    }
  };

  // Tạo NPC hoàn chỉnh với Chibi Sprite, Bảng Tên & Huy Hiệu Quest Marker
  function createNpc(name, role, quote, roleType, x, z) {
    const group = new THREE.Group();
    const canvas = document.createElement("canvas");
    canvas.width = 160; canvas.height = 160;
    const ctx = canvas.getContext("2d");

    // Vẽ Sprite NPC Chibi ngay từ đầu
    if (window.ChibiRenderer && typeof window.ChibiRenderer.drawNpc === "function") {
      window.ChibiRenderer.drawNpc(ctx, 80, 140, roleType, { time: 0 });
    }

    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: true, alphaTest: 0.05 });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(4.0, 4.0, 1);
    sprite.position.y = 1.8;
    group.add(sprite);

    const billboard = createEntityBillboard(name, role, false);
    billboard.sprite.position.y = 3.9;
    group.add(billboard.sprite);

    // Huy hiệu nhiệm vụ "?" và "!" lơ lửng trên đầu
    const questMarker = createQuestMarker();
    group.add(questMarker.sprite);

    const colMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 3.5, 8), new THREE.MeshBasicMaterial({ visible: false }));
    colMesh.position.y = 1.7;
    group.add(colMesh);

    group.position.set(x, getSurfaceElevation(x, z), z);
    scene.add(group);

    const npc = { id: name, name, role, quote, roleType, group, sprite, canvas, ctx, tex, colMesh, questMarker };
    colMesh.userData = { entity: npc, isNpc: true };
    clickableObjects.push(colMesh);
    npcs.push(npc);

    // Cập nhật trạng thái quest marker ban đầu
    updateNpcQuestMarker(npc);
    return npc;
  }

  // ==========================================
  // 9. ĐỊNH NGHĨA 15 BẢN ĐỒ THẾ GIỚI 3D (THÔN TRẤN, THÀNH THỊ & BÃI TRAIN)
  // ====================================================================
  const MAP_DEFINITIONS = {
    // A. TÂN THỦ THÔN & THÔN TRẤN
    balang: {
      id: "balang", name: "Ba Lăng Huyện", category: "village", icon: "🌾",
      lvRange: "Cấp 1 - 10 (Tân Thủ)",
      desc: "Tân thủ thôn bên dòng Liễu Khê xanh ngát, nơi sơ khởi của mọi bậc hiệp khách.",
      theme: "balang", texKey: "grass", spawn: [0, 88]
    },
    bichthuy: {
      id: "bichthuy", name: "Bích Thủy Thôn", category: "village", icon: "🌊",
      lvRange: "Cấp 10 - 20",
      desc: "Thôn trang ven sông Bích Thủy sóng biếc dập dờn, nhiều đám thủy tặc hoành hành.",
      theme: "bichthuy", texKey: "grass", spawn: [0, 50]
    },
    hanhhoa: {
      id: "hanhhoa", name: "Hạnh Hoa Thôn", category: "village", icon: "🌸",
      lvRange: "Cấp 20 - 30",
      desc: "Thôn hoa đào hồng thắm rực rỡ, nổi danh với Hạnh Hoa Tửu và đàn hổ hoang dã.",
      theme: "hanhhoa", texKey: "grass", spawn: [0, 50]
    },
    lacnhan: {
      id: "lacnhan", name: "Lạc Nhạn Trấn", category: "village", icon: "🦅",
      lvRange: "Cấp 30 - 40",
      desc: "Trấn cổ giao thương sầm uất giữa sơn lộ hiểm yếu, sơn trại đầu mục rình rập cướp tiêu.",
      theme: "lacnhan", texKey: "grass", spawn: [0, 50]
    },

    // B. ĐẠI THÀNH THỊ
    bienkinh: {
      id: "bienkinh", name: "Biện Kinh", category: "city", icon: "🏯",
      lvRange: "Cấp 40 - 50 (Kinh Đô)",
      desc: "Đại kinh đô Đại Tống phồn hoa tráng lệ, thành cao hào sâu, lầu gác cung điện nguy nga.",
      theme: "bienkinh", texKey: "city", spawn: [0, 50]
    },
    hangchau: {
      id: "hangchau", name: "Hàng Châu", category: "city", icon: "🛶",
      lvRange: "Cấp 50 - 60 (Tây Hồ)",
      desc: "Thắng cảnh Tây Hồ hữu tình, liễu rủ ven hồ, hội tụ kiếm khách thi nhân giang hồ.",
      theme: "hangchau", texKey: "city", spawn: [0, 50]
    },
    thanhdo: {
      id: "thanhdo", name: "Thành Đô", category: "city", icon: "🎋",
      lvRange: "Cấp 70 - 80 (Thục Đạo)",
      desc: "Thục đạo danh thành trù phú cổ kính, cửa ngõ tiến vào chốn rừng trúc và núi non hiểm trở.",
      theme: "thanhdo", texKey: "city", spawn: [0, 50]
    },
    tuongduong: {
      id: "tuongduong", name: "Tương Dương", category: "city", icon: "🛡️",
      lvRange: "Cấp 90 - 100 (Biên Ải)",
      desc: "Chiến thành phòng thủ biên ải kiên cố, tháp canh sừng sững, thao trường rèn binh vĩ đại.",
      theme: "tuongduong", texKey: "city", spawn: [0, 50]
    },

    // C. BẢN ĐỒ LUYỆN CÔNG (TRAIN FIELDS)
    samac: {
      id: "samac", name: "Sa Mạc Hoang Vu", category: "train", icon: "🏜️",
      lvRange: "Train Cấp 25 - 40",
      desc: "Biển cát vàng bão cát mù mịt, Sa Mạc Lang và Kim Mao Sư Vương thống lĩnh.",
      theme: "samac", texKey: "desert", spawn: [0, 60]
    },
    thachlam: {
      id: "thachlam", name: "Thạch Lâm Động", category: "train", icon: "🪨",
      lvRange: "Train Cấp 30 - 50",
      desc: "Hang động thạch nhũ đá vôi kỳ bí dưới lòng núi, sào huyệt Thạch Lâm Yêu Vương.",
      theme: "thachlam", texKey: "city", spawn: [0, 60]
    },
    tuyetlinh: {
      id: "tuyetlinh", name: "Tuyết Lĩnh Băng Phong", category: "train", icon: "❄️",
      lvRange: "Train Cấp 50 - 65",
      desc: "Đỉnh núi tuyết trắng xóa lạnh giá buốt xương, bão tuyết và Tuyết Sơn Quái Thú.",
      theme: "tuyetlinh", texKey: "snow", spawn: [0, 60]
    },
    hoadiem: {
      id: "hoadiem", name: "Hỏa Diệm Sơn", category: "train", icon: "🌋",
      lvRange: "Train Cấp 70 - 85",
      desc: "Vùng đất nham thạch lửa cháy rực trời, hố dung nham và Hỏa Diệm Tà Thần viễn cổ.",
      theme: "hoadiem", texKey: "lava", spawn: [0, 60]
    },
    hoason: {
      id: "hoason", name: "Hoa Sơn Tuyệt Đỉnh", category: "train", icon: "⛰️",
      lvRange: "Train Cấp 85 - 99",
      desc: "Vách đá dựng đứng mây mù bồng bềnh, nơi diễn ra Hoa Sơn Luận Kiếm lưu danh thiên hạ.",
      theme: "hoason", texKey: "grass", spawn: [0, 60]
    },
    magiao: {
      id: "magiao", name: "Ma Giáo Cấm Địa", category: "train", icon: "🔮",
      lvRange: "Train Cấp 100 - 120",
      desc: "Cấm địa ma phái tà khí bao trùm u linh, tế đàn ma pháp và Ma Giáo Giáo Chủ tối thượng.",
      theme: "magiao", texKey: "dark", spawn: [0, 60]
    },
    vothuong: {
      id: "vothuong", name: "Võ Trường Luyện Công", category: "train", icon: "🪵",
      lvRange: "Cột Gỗ Bất Tử",
      desc: "Đấu trường luyện chiêu võ lâm với dàn Cột Gỗ Bất Tử (1,000,000 HP) đo DPS cực chuẩn.",
      theme: "vothuong", texKey: "city", spawn: [0, 50]
    }
  };

  let currentMapId = "balang";
  let currentMapDef = MAP_DEFINITIONS.balang;
  const HERO_LOCATION_KEY = "volamchibi_3d_last_location";
  let locationSaveTimer = 0;
  let lastLocationSave = "";

  function saveHeroLocation() {
    if (!hero.mesh || hero.isMapTransitioning || !MAP_DEFINITIONS[currentMapId]) return;
    const pos = hero.mesh.position;
    try {
      const snapshot = JSON.stringify({
        map: currentMapId,
        x: Number(pos.x.toFixed(2)),
        z: Number(pos.z.toFixed(2)),
        facing: Number(hero.facing) || 0
      });
      if (snapshot === lastLocationSave) return;
      localStorage.setItem(HERO_LOCATION_KEY, snapshot);
      lastLocationSave = snapshot;
    } catch (_) {}
  }

  function restoreHeroLocation() {
    try {
      const saved = JSON.parse(localStorage.getItem(HERO_LOCATION_KEY) || "null");
      if (!saved || !MAP_DEFINITIONS[saved.map] || !Number.isFinite(saved.x) || !Number.isFinite(saved.z)) return false;
      const mapDef = MAP_DEFINITIONS[saved.map];
      currentMapId = saved.map;
      currentMapDef = mapDef;
      buildMapEnvironment(mapDef);
      spawnMapNpcs(mapDef);
      spawnMapMonsters(mapDef);
      hero.mesh.position.set(saved.x, getSurfaceElevation(saved.x, saved.z), saved.z);
      hero.pos.copy(hero.mesh.position);
      hero.targetPos.copy(hero.mesh.position);
      hero.facing = Number.isFinite(saved.facing) ? saved.facing : 0;
      hero.isMoving = false;
      camera.position.set(saved.x, 16, saved.z + 23);
      controls.target.set(saved.x, 1.6, saved.z);
      lastHeroPos.copy(hero.mesh.position);
      controls.update();
      const zone = document.getElementById("zone");
      if (zone) zone.textContent = `${mapDef.name} · ${mapDef.category === "train" ? "Bãi Luyện Công" : mapDef.category === "city" ? "Thành Thị" : "Thôn Trấn"}`;
      const mapName = document.getElementById("mapCurrentName");
      if (mapName) mapName.textContent = mapDef.name;
      lastLocationSave = JSON.stringify({ map: currentMapId, x: Number(hero.mesh.position.x.toFixed(2)), z: Number(hero.mesh.position.z.toFixed(2)), facing: Number(hero.facing) || 0 });
      return true;
    } catch (_) { return false; }
  }

  window.addEventListener("pagehide", saveHeroLocation);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") saveHeroLocation();
  });

  // DỰNG CẢNH QUAN 3D THEO MAP
  function buildMapEnvironment(mapDef) {
    currentMapGroup.clear();
    trees.length = 0;
    clearObstacles();

    // Cập nhật chất liệu mặt đất
    groundMesh.material.map = TEXTURES[mapDef.texKey] || TEXTURES.grass;
    groundMesh.material.needsUpdate = true;

    if (mapDef.id === "balang") {
      // BA LĂNG HUYỆN (Tân Thủ Thôn Cổ Điển)
      createWindingRiver();
      createStoneBridge(0, 42);
      createRoad(11, 110, 0, 85);
      createRoad(80, 11, 0, 85);
      createRoad(8, 140, 0, -35);
      createTownGate(42, "BA LĂNG HUYỆN");

      createWuxiaShop("PHỦ TRƯỞNG TRẤN", "#ffd24a", -20, 104);
      createWuxiaShop("HIỆU THUỐC ĐÔNG Y", "#8ef0a0", 20, 104);
      createWuxiaShop("TIỆM RÈN BINH KHÍ", "#ff9a4a", -24, 75, Math.PI / 2);
      createWuxiaShop("TIỀN TRANG QUÁN", "#ffd86a", 24, 75, -Math.PI / 2);
      createWuxiaShop("DỊCH TRẠM NGỰA", "#7ec8ff", -14, 52);
      createWuxiaShop("KỲ NHÂN QUÁN", "#da70d6", 16, 52);

      createPagodaTower(0, -105);
      createBanditCampDecor(-75, -20);

      // 1. Hồ Nước Đá Trung Tâm Làng Với Vòng Sóng Gợn & Hoa Sen (Chuẩn Mẫu Ảnh 3)
      createVillageCentralPond(0, 78);

      // 2. Cây Cối Làng Quê Theo Đúng Mẫu 2.5D (Rừng Trúc, Hoa Đào, Phong Đỏ, Ngân Hạnh, Liễu Rủ)
      // Vòng Cây Hoa Đào Sakura quanh Làng Trung Tâm
      for (let i = 0; i < 18; i++) {
        const ang = (i / 18) * Math.PI * 2, rad = 38 + (i % 3) * 6;
        if (i % 3 === 0) {
          createStylizedRoundTree(Math.cos(ang) * rad, 80 + Math.sin(ang) * 30, "sakura", 1.25 + (i % 2) * 0.2);
        } else if (i % 3 === 1) {
          createSteppedPineTree(Math.cos(ang) * rad, 80 + Math.sin(ang) * 30, 1.2 + (i % 3) * 0.2, 0x277a3d);
        } else {
          createStylizedRoundTree(Math.cos(ang) * rad, 80 + Math.sin(ang) * 30, "ginkgo", 1.15 + (i % 2) * 0.2);
        }
      }

      // RỪNG TRÚC LIỄU KHÊ (Bamboo Groves mọc rậm rạp dọc hai bờ sông và các lối mòn - Chuẩn 2.5D)
      const bambooLocs = [
        [-18, 36], [-28, 34], [-38, 38], [-48, 35], [-58, 39], [-68, 36], [-78, 40],
        [18, 36], [28, 35], [38, 38], [48, 34], [58, 37], [68, 35], [78, 39],
        [-88, 55], [-92, 65], [-95, 78], [-85, 85], [-75, 95], // Gần bãi cột gỗ tập võ
        [35, 65], [45, 75], [55, 85], [65, 95], [75, 65], // Bìa rừng Đông Nam
        [-25, -5], [-35, 10], [-45, -15], [-55, 5], [25, -10], [35, 5], [45, -15] // Bờ sông phía Bắc
      ];
      bambooLocs.forEach(pt => createBambooGrove(pt[0], pt[1], 7 + Math.floor(Math.random() * 3), 1.0 + Math.random() * 0.3));

      // HÀNG LIỄU RỦ VEN SÔNG LIỄU KHÊ
      const willowLocs = [
        [-12, 44], [-24, 46], [-36, 43], [-52, 45], [-66, 44], [-80, 47],
        [14, 44], [26, 45], [42, 43], [56, 46], [70, 44], [82, 46]
      ];
      willowLocs.forEach(pt => createStylizedRoundTree(pt[0], pt[1], "willow", 1.2 + Math.random() * 0.3));

      // CÂY PHONG LÁ ĐỎ & RỪNG THÔNG TÂY BẮC (Đồi núi dã ngoại & Tây Sơn Trại)
      const mapleLocs = [
        [-45, -35], [-55, -45], [-65, -30], [-75, -50], [-85, -35], [-95, -55],
        [-60, -70], [-70, -80], [-80, -65], [-90, -75], [-100, -60],
        [-35, -55], [-40, -75], [-50, -85], [-65, -95], [-80, -90]
      ];
      mapleLocs.forEach(pt => {
        if (Math.random() < 0.6) createStylizedRoundTree(pt[0], pt[1], "maple", 1.2 + Math.random() * 0.35);
        else createSteppedPineTree(pt[0], pt[1], 1.25 + Math.random() * 0.4, 0x1f6630);
      });

      // CÂY NGÂN HẠNH LÁ VÀNG & TỬ ĐẰNG TÍM (Thảo nguyên Đông Bắc & Rừng phong Liễu Khê)
      const eastTrees = [
        [35, -25], [45, -35], [55, -20], [65, -40], [75, -25], [85, -45], [95, -30],
        [40, -55], [50, -65], [60, -50], [70, -70], [80, -55], [90, -65], [100, -50],
        [30, -75], [45, -85], [60, -95], [75, -80], [85, -90], [95, -75],
        [45, 10], [55, 18], [65, 5], [75, 15], [85, 2], [95, 12]
      ];
      eastTrees.forEach((pt, idx) => {
        const pal = (idx % 3 === 0) ? "ginkgo" : (idx % 3 === 1) ? "wisteria" : "sakura";
        createStylizedRoundTree(pt[0], pt[1], pal, 1.15 + Math.random() * 0.35);
      });

      // Rừng thông dày đặc quanh Thiên Tầng Tháp phía Bắc
      for (let i = 0; i < 18; i++) {
        const ang = (i / 18) * Math.PI * 2, rad = 18 + (i % 3) * 6;
        createSteppedPineTree(Math.cos(ang) * rad, -105 + Math.sin(ang) * 16, 1.3 + (i % 3) * 0.25, 0x1e6630);
      }

      // 3. Cụm Nấm Đỏ Đốm Trắng, Khúc Gỗ Đốn, Tảng Đá Nhẵn Cuội (Chuẩn Mẫu Ảnh 1 & 2)
      createMushroomCluster(-15, 88, 1.0);
      createMushroomCluster(18, 86, 0.9);
      createMushroomCluster(-28, 58, 1.1);
      createMushroomCluster(26, 56, 1.0);
      createMushroomCluster(12, 35, 1.2);
      createMushroomCluster(-14, 38, 1.0);
      createMushroomCluster(48, 15, 1.1);
      createMushroomCluster(-65, -25, 1.2);

      createChoppedLog(-12, 85, 0.4, 1.1);
      createChoppedLog(22, 70, -0.6, 1.0);
      createChoppedLog(16, 40, 0.8, 1.2);
      createChoppedLog(-18, -15, -0.3, 1.1);
      createChoppedLog(52, -30, 0.5, 1.2);
      createChoppedLog(-58, -45, -0.7, 1.1);

      createSmoothRock(-8, 92, 1.1);
      createSmoothRock(14, 88, 1.2);
      createSmoothRock(-22, 60, 1.3);
      createSmoothRock(25, 62, 1.0);
      createSmoothRock(10, 42, 1.4);
      createSmoothRock(-22, 44, 1.2);
      createSmoothRock(62, -20, 1.5);
      createSmoothRock(-68, -35, 1.4);

      createFlowerBush(-6, 86, 1.1, 0xff3b30);
      createFlowerBush(10, 92, 1.0, 0xffcc00);
      createFlowerBush(-20, 52, 1.2, 0xff4081);
      createFlowerBush(22, 50, 1.1, 0xff3b30);
      createFlowerBush(45, 12, 1.2, 0xff3b30);
      createFlowerBush(-52, -10, 1.1, 0xffcc00);

      // Tạo cảnh quan núi non hùng vĩ 360 độ và vành đai rừng xa ngoại thành
      createDistantLandscape();
    } else if (mapDef.category === "city") {
      // ĐẠI THÀNH THỊ (Biện Kinh, Tương Dương, Thành Đô, Hàng Châu)
      createRoad(22, 160, 0, 50, 0x8a8278);
      createRoad(160, 22, 0, 50, 0x8a8278);
      createCityWall(0, 120, 180, 0);
      createCityWall(0, -20, 180, 0);
      createTownGate(115, mapDef.name.toUpperCase());
      createTownGate(-15, mapDef.name.toUpperCase());

      createWuxiaShop("PHỦ QUÂN DOANH", "#ffd24a", -26, 75);
      createWuxiaShop("HIỆU THUỐC THÀNH THỊ", "#8ef0a0", 26, 75);
      createWuxiaShop("THẦN BINH BẢO ĐIỆN", "#ff9a4a", -30, 40, Math.PI / 2);
      createWuxiaShop("TIỀN TRANG ĐẠI TỐNG", "#ffd86a", 30, 40, -Math.PI / 2);
      createWuxiaShop("DỊCH TRẠM QUAN SỨ", "#7ec8ff", -16, 25);

      for (let i = 0; i < 14; i++) {
        create3DTree(50 + (i % 2 ? 10 : -10), 30 + i * 6, "willow", 1.2);
        create3DTree(-50 + (i % 2 ? 10 : -10), 30 + i * 6, "pine", 1.2);
      }
    } else if (mapDef.theme === "samac") {
      // SA MẠC HOANG VU (Train)
      createDesertAreaDecor(0, 0);
      createWuxiaShop("DỊCH TRẠM SA MẠC", "#ffd24a", -10, 65);
      createRoad(12, 50, 0, 60, 0xcaa35a);
    } else if (mapDef.theme === "tuyetlinh") {
      // TUYẾT LĨNH BĂNG PHONG (Train)
      createSnowAreaDecor(0, 0);
      createWuxiaShop("TRẠI BĂNG TUYẾT", "#7ec8ff", -10, 65);
      for (let i = 0; i < 24; i++) {
        create3DTree((Math.random() - 0.5) * 160, (Math.random() - 0.5) * 160, "snow_pine", 1.2);
      }
    } else if (mapDef.theme === "hoadiem") {
      // HỎA DIỆM SƠN (Train)
      createLavaAreaDecor(0, 0);
      createWuxiaShop("TIỀN ĐỒN HỎA SƠN", "#ff5a36", -10, 65);
      createRoad(12, 50, 0, 60, 0x4a1e16);
    } else if (mapDef.theme === "hoason") {
      // HOA SƠN TUYỆT ĐỈNH (Train)
      createWuxiaShop("HOA SƠN ĐẠO QUÁN", "#ffd24a", -10, 65);
      createPagodaTower(0, -60);
      for (let i = 0; i < 20; i++) {
        create3DTree((Math.random() - 0.5) * 140, (Math.random() - 0.5) * 140, "pine", 1.3);
      }
    } else if (mapDef.theme === "magiao") {
      // MA GIÁO CẤM ĐỊA (Train)
      createAltarDecor(0, -20);
      createWuxiaShop("BẠCH CỐT TRẠM", "#da70d6", -10, 65);
    } else if (mapDef.theme === "vothuong") {
      // VÕ TRƯỜNG LUYỆN CÔNG
      createRoad(80, 80, 0, 0, 0x6e665d);
      createWuxiaShop("VÕ SƯ ĐƯỜNG", "#ffd24a", -15, 55);
    } else {
      // CÁC THÔN TRẤN KHÁC (Bích Thủy, Hạnh Hoa, Lạc Nhạn)
      createRoad(12, 100, 0, 50);
      createRoad(100, 12, 0, 50);
      createTownGate(42, mapDef.name.toUpperCase());
      createWuxiaShop("THÔN TRƯỞNG PHỦ", "#ffd24a", -18, 65);
      createWuxiaShop("HIỆU THUỐC", "#8ef0a0", 18, 65);
      createWuxiaShop("TIỆM RÈN", "#ff9a4a", -20, 40);
      createWuxiaShop("DỊCH TRẠM", "#7ec8ff", -12, 30);
      for (let i = 0; i < 22; i++) {
        create3DTree((Math.random() - 0.5) * 140, (Math.random() - 0.5) * 140, mapDef.theme === "hanhhoa" ? "sakura" : "willow", 1.1);
      }
    }
  }

  // SINH NPCS THEO MAP
  function spawnMapNpcs(mapDef) {
    if (mapDef.id === "balang") {
      // 14 NPC Tân Thủ Thôn
      createNpc("Trưởng Trấn Lý", "〈Nhiệm Vụ Chính〉", "Thiếu hiệp hãy vượt Cầu Đá Liễu Khê sang rừng dã ngoại để dẹp tan đàn yêu thú bảo vệ bá tánh!", "elder", -20, 94);
      createNpc("Dược Thương", "〈Dược Điếm〉", "Hiệu thuốc có đủ Kim Sáng Dược, Cửu Chuyển Hoàn Hồn Đan bổ huyết ích khí!", "doctor", 20, 94);
      createNpc("Thiết Tượng", "〈Binh Khí Phổ〉", "Vũ khí và giáp trụ của lão phu rèn bằng huyền thiết ngàn năm, chém sắt như chém bùn!", "smith", -24, 65);
      createNpc("Chủ Tiền Trang", "〈Ngân Hàng Tiền Trang〉", "Cất giữ tiền tài và kỳ trân dị bảo? Cứ để tiền trang bảo quản chu đáo an toàn tuyệt đối!", "bank", 24, 65);
      createNpc("Xa Phu", "〈Dịch Trạm - Chuyển Map〉", "Lão phu chuyên chở ngựa trạm đi khắp Biện Kinh, Sa Mạc, Tuyết Lĩnh, Hỏa Diệm Sơn!", "xaphu", -8, 44);
      createNpc("Mã Phu", "〈Bán Ngựa〉", "Tuấn mã ngàn dặm, phi nhanh như gió, cưỡi vào hành tẩu giang hồ oai phong lẫm liệt!", "horse", 8, 44);
      createNpc("Dã Tẩu", "〈Kỳ Nhân Dị Sĩ〉", "Một bàn cờ thế, nửa đời giang hồ. Thiếu hiệp có muốn giải ván cờ này cùng lão phu?", "scholar", 16, 78);
      createNpc("Sứ Giả Thử Nghiệm", "〈Nhận Cấp & Đồ〉", "Chào mừng thiếu hiệp tham gia thử nghiệm Võ Lâm Chibi 3D Cổ Điển!", "tester", 4, 72);
      createNpc("Vạn Bảo Lầu", "〈Bảo Vật Tiền Xu〉", "Kỳ trân dị bảo thiên hạ tụ hội về Vạn Bảo Lầu, tha hồ chiêm ngưỡng!", "bank", 14, 65);
      createNpc("Hoa Nương", "〈Sự Kiện 20-10〉", "Thiếu hiệp có quà tặng giai nhân nhân dịp lễ hội 20-10 không?", "lady", -4, 72);
      createNpc("Quốc Sư", "〈Quốc Gia & Quân Công〉", "Bình định thiên hạ, bảo vệ biên cương, lập nên chiến công hiển hách muôn đời!", "scholar", 0, 95);
      createNpc("Nguyệt Lão", "〈Tơ Duyên - Thành Thân〉", "Dây tơ hồng buộc chặt nhân duyên, chúc cho đôi lứa trăm năm hạnh phúc!", "cupid", -8, 108);
      createNpc("Bà Nguyệt", "〈Tơ Duyên〉", "Hôn nhân là duyên trời định, thiếu hiệp đã tìm được tri kỷ cùng bôn tẩu chưa?", "lady", 8, 108);
      createNpc("Thủ Tháp Sứ", "〈Thiên Tầng Tháp〉", "Thiên Tầng Tháp phong ấn Đại Boss Độc Lang Vương và ác thú viễn cổ!", "monk", 0, -85);
    } else if (mapDef.category === "city") {
      // NPC Thành Thị
      createNpc("Xa Phu", "〈Dịch Trạm Thành Thị〉", "Ngựa trạm sẵn sàng đưa thiếu hiệp đến khắp các thành thị và bãi train!", "xaphu", -12, 45);
      createNpc("Dược Thương", "〈Dược Điếm Kinh Thành〉", "Thuốc bổ cao cấp trị thương phục hồi sinh lực tức thì!", "doctor", 22, 65);
      createNpc("Thiết Tượng", "〈Thần Binh Phổ〉", "Rèn giũa bảo kiếm, gia cố giáp trụ hoàng kim!", "smith", -25, 40);
      createNpc("Chủ Tiền Trang", "〈Đại Tiền Trang〉", "Giao dịch ngân lượng, vàng thoi an toàn nhất thiên hạ!", "bank", 25, 40);
      createNpc("Mã Phu", "〈Chiến Mã〉", "Tuấn mã ngàn dặm cho chư vị anh hùng!", "horse", -4, 45);
      createNpc("Tuần Thành Quan", "〈Triều Đình〉", "Trật tự kinh kỳ nghiêm cẩn, cấm mọi hành vi gây rối!", "scholar", 0, 70);
    } else if (mapDef.category === "train") {
      // NPC Tiền Đồn Bãi Train
      createNpc("Xa Phu Tiền Đồn", "〈Trở Về Thành Phố〉", "Thiếu hiệp có muốn ngựa trạm đưa trở về thành nghỉ ngơi không?", "xaphu", -8, 55);
      createNpc("Dược Thương Tiếp Tế", "〈Tiếp Tế Dược Phẩm〉", "Bổ sung Kim Sáng Dược để tiếp tục luyện công diệt quái!", "doctor", 8, 55);
    } else {
      // NPC Thôn Trấn Khác
      createNpc("Xa Phu", "〈Dịch Trạm Thôn〉", "Ngựa trạm nối liền các nẻo đường non nước!", "xaphu", -10, 40);
      createNpc("Dược Thương", "〈Dược Điếm Thôn Trang〉", "Cây thuốc hái trên đỉnh núi thanh khiết hữu hiệu!", "doctor", 16, 60);
      createNpc("Thiết Tượng", "〈Lò Rèn Thôn Dã〉", "Binh khí sắt bén cho thợ săn và hiệp khách!", "smith", -18, 40);
      createNpc("Thôn Trưởng", "〈Trưởng Làng〉", "Chào mừng thiếu hiệp ghé thăm thôn trang thanh bình!", "elder", 0, 65);
    }
  }

  // SINH QUÁI VẬT THEO CẤP ĐỘ MAP CHUẨN XÁC
  function spawnMapMonsters(mapDef) {
    if (mapDef.id === "balang") {
      // ========================================================
      // 🌾 MAP TÂN THỦ BA LĂNG HUYỆN: CHỈ CÓ QUÁI CẤP 1 -> 10!
      // ========================================================
      // Bãi 1: Thỏ Trắng Tinh Nghịch (Lv 1 - 3, HP 160) - Đông Nam dã ngoại
      for (let i = 0; i < 6; i++) {
        createMonster("rabbit", "Thỏ Trắng Tân Thủ", 1 + Math.floor(i / 2), 140 + i * 20, "Thổ", 48 + (Math.random() - 0.5) * 18, 10 + (Math.random() - 0.5) * 18);
      }

      // Bãi 2: Nhím Núi Gai Nhọn (Lv 3 - 5, HP 350) - Đông Bắc bờ sông
      for (let i = 0; i < 6; i++) {
        createMonster("boar", "Nhím Núi Gai Nhọn", 3 + Math.floor(i / 2), 320 + i * 30, "Thổ", 65 + (Math.random() - 0.5) * 18, -20 + (Math.random() - 0.5) * 18);
      }

      // Bãi 3: Heo Rừng Nhỏ (Lv 4 - 6, HP 550) - Rừng phong dã ngoại
      for (let i = 0; i < 6; i++) {
        createMonster("boar", "Heo Rừng Liễu Khê", 4 + Math.floor(i / 2), 520 + i * 40, "Thổ", 75 + (Math.random() - 0.5) * 20, -60 + (Math.random() - 0.5) * 20);
      }

      // Bãi 4: Dã Lang Tân Thủ & Sói Xám (Lv 6 - 8, HP 850) - Rừng thông Tây Bắc
      for (let i = 0; i < 6; i++) {
        createMonster("wolf", "Dã Lang Tân Thủ", 6 + Math.floor(i / 2), 820 + i * 60, "Kim", -70 + (Math.random() - 0.5) * 20, -65 + (Math.random() - 0.5) * 20);
      }

      // Bãi 5: Sơn Tặc Du Đãng (Lv 8 - 10, HP 1200) - Tây Sơn Trại
      for (let i = 0; i < 6; i++) {
        createMonster("bandit", "Sơn Tặc Du Đãng", 8 + Math.floor(i / 2), 1150 + i * 80, "Hỏa", -75 + (Math.random() - 0.5) * 18, -18 + (Math.random() - 0.5) * 18);
      }

      // Bãi 6: Thảo Khấu Cung Thủ (Lv 7 - 9, HP 980) - Dọc bờ sông Liễu Khê phía Nam
      for (let i = 0; i < 5; i++) {
        createMonster("bandit", "Thảo Khấu Cung Thủ", 7 + Math.floor(i / 2), 980 + i * 70, "Kim", -48 + (Math.random() - 0.5) * 18, 22 + (Math.random() - 0.5) * 16);
      }

      // Bãi 7: Sói Xám Hoang Dã (Lv 5 - 7, HP 760) - Ven Rừng Trúc Liễu Khê
      for (let i = 0; i < 5; i++) {
        createMonster("wolf", "Sói Xám Liễu Khê", 5 + Math.floor(i / 2), 760 + i * 50, "Kim", 28 + (Math.random() - 0.5) * 18, -8 + (Math.random() - 0.5) * 16);
      }

      // Bãi 8: Dã Trư Bờ Hồ (Lv 5 - 7, HP 820) - Đông Nam Thảo Nguyên
      for (let i = 0; i < 5; i++) {
        createMonster("boar", "Dã Trư Thảo Nguyên", 5 + Math.floor(i / 2), 820 + i * 60, "Thổ", 60 + (Math.random() - 0.5) * 20, 75 + (Math.random() - 0.5) * 20);
      }

      // Bãi 9: Thảo Khấu Đầu Lĩnh (Lv 10, HP 2800) - Tiền đồn phía Bắc
      createMonster("bandit", "Thảo Khấu Đầu Lĩnh", 10, 2800, "Kim", -35, -45);

      // Bãi 10: Boss Tân Thủ Độc Lang Vương (Lv 10, HP 5800) - Thiên Tầng Tháp
      createMonster("boss", "Độc Lang Vương", 10, 5800, "Thủy", 0, -95);

      // Bãi 11: 4 Cột Gỗ Luyện Công Tân Thủ (Bất tử 1,000,000 HP) - Trường võ Tây Thôn
      createMonster("dummy", "Cột Gỗ Luyện Công 1", 1, 1000000, "Mộc", -84, 70);
      createMonster("dummy", "Cột Gỗ Luyện Công 2", 1, 1000000, "Mộc", -90, 70);
      createMonster("dummy", "Cột Gỗ Luyện Công 3", 1, 1000000, "Mộc", -96, 70);
      createMonster("dummy", "Cột Gỗ Luyện Công 4", 1, 1000000, "Mộc", -90, 78);

      // Bãi 12: Bầy Mãnh Hổ (Lv 45 - 49, HP 28,000, Hệ Thổ) - Vùng bìa rừng sâu Đông Bắc
      for (let i = 0; i < 5; i++) {
        createMonster("tiger", "Mãnh Hổ", 45 + i, 28000 + i * 1800, "Thổ", 88 + (Math.random() - 0.5) * 18, -45 + (Math.random() - 0.5) * 18);
      }

      // ========================================================
      // 🌲 CÁC BÃI QUÁI NGOẠI VI & BIÊN CƯƠNG XA (BÁN KÍNH 110m - 170m)
      // ========================================================
      // Bãi 13: Đông Ngoại Thành - Thảo Nguyên Rừng Sâu (x: 110..135, z: -20..35)
      for (let i = 0; i < 6; i++) {
        createMonster("boar", "Dã Trư Hoang Dã", 11 + Math.floor(i / 2), 1600 + i * 150, "Thổ", 120 + (Math.random() - 0.5) * 22, -10 + (Math.random() - 0.5) * 22);
      }
      for (let i = 0; i < 5; i++) {
        createMonster("wolf", "Thảo Nguyên Độc Lang", 12 + Math.floor(i / 2), 2200 + i * 180, "Kim", 132 + (Math.random() - 0.5) * 18, 15 + (Math.random() - 0.5) * 18);
      }
      createMonster("boss", "Dã Trư Vương", 15, 6800, "Thổ", 125, 5);

      // Bãi 14: Tây Ngoại Thành - Hắc Phong Trại Hiểm Địa (x: -115..-145, z: -35..20)
      for (let i = 0; i < 6; i++) {
        createMonster("bandit", "Sơn Tặc Đao Phủ", 12 + Math.floor(i / 2), 2400 + i * 200, "Hỏa", -125 + (Math.random() - 0.5) * 22, -20 + (Math.random() - 0.5) * 20);
      }
      for (let i = 0; i < 5; i++) {
        createMonster("bandit", "Hắc Phong Thần Tiễn", 13 + Math.floor(i / 2), 2800 + i * 220, "Mộc", -135 + (Math.random() - 0.5) * 18, 5 + (Math.random() - 0.5) * 18);
      }
      createMonster("boss", "Hắc Phong Trại Chủ", 16, 9500, "Hỏa", -130, -8);

      // Bãi 15: Bắc Sâu - Tuyết Sơn Tiền Cảnh (x: -35..35, z: -140..-170)
      for (let i = 0; i < 6; i++) {
        createMonster("tiger", "Tuyết Sơn Bạch Hổ", 16 + Math.floor(i / 2), 4800 + i * 350, "Thủy", -20 + (Math.random() - 0.5) * 25, -150 + (Math.random() - 0.5) * 20);
      }
      for (let i = 0; i < 5; i++) {
        createMonster("wolf", "Tuyết Lĩnh Lang Chúa", 15 + Math.floor(i / 2), 4200 + i * 300, "Thủy", 20 + (Math.random() - 0.5) * 25, -150 + (Math.random() - 0.5) * 20);
      }
      createMonster("boss", "Viễn Cổ Yêu Thú Tướng", 20, 22000, "Kim", 0, -165);

      // Bãi 16: Nam Ngoại Thôn - Đầm Lầy Nam Sơn (x: -45..45, z: 135..165)
      for (let i = 0; i < 6; i++) {
        createMonster("wolf", "Hắc Xạ Độc Lang", 11 + Math.floor(i / 2), 2100 + i * 180, "Thủy", -25 + (Math.random() - 0.5) * 22, 145 + (Math.random() - 0.5) * 20);
      }
      for (let i = 0; i < 5; i++) {
        createMonster("boar", "Nam Sơn Man Trư", 12 + Math.floor(i / 2), 2500 + i * 200, "Thổ", 25 + (Math.random() - 0.5) * 22, 145 + (Math.random() - 0.5) * 20);
      }
      createMonster("boss", "Nam Sơn Thú Vương", 15, 8200, "Thổ", 0, 155);

    } else if (mapDef.id === "bichthuy") {
      // 🌊 BÍCH THỦY THÔN (CẤP 10 - 20)
      for (let i = 0; i < 5; i++) {
        createMonster("bandit", "Thủy Tặc Lâu La", 12 + i, 2200 + i * 200, "Thủy", 50 + (Math.random() - 0.5) * 20, -10 + (Math.random() - 0.5) * 20);
      }
      for (let i = 0; i < 5; i++) {
        createMonster("boar", "Sơn Trư Bờ Hồ", 15 + i, 3400 + i * 250, "Thổ", -50 + (Math.random() - 0.5) * 20, -20 + (Math.random() - 0.5) * 20);
      }
      createMonster("boss", "Thủy Tặc Đầu Lĩnh", 20, 18000, "Thủy", 0, -60);

    } else if (mapDef.id === "hanhhoa") {
      // 🌸 HẠNH HOA THÔN (CẤP 20 - 30)
      for (let i = 0; i < 5; i++) {
        createMonster("wolf", "Hắc Lang Rừng Đào", 22 + i, 5800 + i * 400, "Mộc", 60 + (Math.random() - 0.5) * 20, -20 + (Math.random() - 0.5) * 20);
      }
      for (let i = 0; i < 5; i++) {
        createMonster("tiger", "Bạch Hổ Rừng Trúc", 25 + i, 8200 + i * 500, "Kim", -60 + (Math.random() - 0.5) * 20, -30 + (Math.random() - 0.5) * 20);
      }
      createMonster("boss", "Hắc Hổ Vương", 30, 38000, "Mộc", 0, -65);

    } else if (mapDef.id === "lacnhan") {
      // 🦅 LẠC NHẠN TRẤN (CẤP 30 - 40)
      for (let i = 0; i < 5; i++) {
        createMonster("bandit", "Phi Đao Khách", 32 + i, 12500 + i * 800, "Hỏa", 55 + (Math.random() - 0.5) * 20, -30 + (Math.random() - 0.5) * 20);
      }
      for (let i = 0; i < 5; i++) {
        createMonster("tiger", "Kim Tiền Báo", 35 + i, 16000 + i * 1000, "Kim", -55 + (Math.random() - 0.5) * 20, -30 + (Math.random() - 0.5) * 20);
      }
      createMonster("boss", "Lạc Nhạn Kiếm Ma", 40, 60000, "Kim", 0, -70);

    } else if (mapDef.id === "bienkinh") {
      // 🏯 BIỆN KINH NGOẠI THÀNH (CẤP 40 - 50)
      for (let i = 0; i < 5; i++) {
        createMonster("tiger", "Mãnh Hổ", 45 + i, 28000 + i * 1800, "Thổ", -42 + (Math.random() - 0.5) * 18, 30 + (Math.random() - 0.5) * 18);
      }
      for (let i = 0; i < 5; i++) {
        createMonster("bandit", "Kim Binh Tuần Tra", 42 + i, 24000 + i * 1500, "Kim", 65 + (Math.random() - 0.5) * 20, -40 + (Math.random() - 0.5) * 20);
      }
      for (let i = 0; i < 5; i++) {
        createMonster("bandit", "Thiết Giáp Vệ", 45 + i, 30000 + i * 2000, "Thổ", -65 + (Math.random() - 0.5) * 20, -40 + (Math.random() - 0.5) * 20);
      }
      createMonster("boss", "Kim Binh Thống Lĩnh", 50, 120000, "Kim", 0, -80);

    } else if (mapDef.id === "hangchau") {
      // 🛶 HÀNG CHÂU NGOẠI Ô (CẤP 50 - 60)
      for (let i = 0; i < 5; i++) {
        createMonster("bandit", "Giang Hồ Lãng Khách", 52 + i, 38000 + i * 2500, "Thủy", 65 + (Math.random() - 0.5) * 20, -40 + (Math.random() - 0.5) * 20);
      }
      for (let i = 0; i < 5; i++) {
        createMonster("bandit", "Tây Hồ Đao Tặc", 55 + i, 46000 + i * 3000, "Thủy", -65 + (Math.random() - 0.5) * 20, -40 + (Math.random() - 0.5) * 20);
      }
      createMonster("boss", "Tây Hồ Đao Thần", 60, 150000, "Thủy", 0, -75);

    } else if (mapDef.id === "thanhdo") {
      // 🎋 THÀNH ĐÔ (CẤP 70 - 80)
      for (let i = 0; i < 5; i++) {
        createMonster("bandit", "Nam Man Dũng Sĩ", 72 + i, 85000 + i * 4000, "Mộc", 65 + (Math.random() - 0.5) * 20, -40 + (Math.random() - 0.5) * 20);
      }
      for (let i = 0; i < 5; i++) {
        createMonster("bandit", "Thục Trung Ám Vệ", 75 + i, 98000 + i * 5000, "Kim", -65 + (Math.random() - 0.5) * 20, -40 + (Math.random() - 0.5) * 20);
      }
      createMonster("boss", "Thục Sơn Kiếm Hiệp", 80, 280000, "Mộc", 0, -75);

    } else if (mapDef.id === "tuongduong") {
      // 🛡️ TƯƠNG DƯƠNG (CẤP 90 - 100)
      for (let i = 0; i < 5; i++) {
        createMonster("bandit", "Mông Cổ Tinh Kỵ", 92 + i, 170000 + i * 8000, "Kim", 70 + (Math.random() - 0.5) * 22, -40 + (Math.random() - 0.5) * 22);
      }
      for (let i = 0; i < 5; i++) {
        createMonster("bandit", "Tương Dương Phản Tướng", 95 + i, 210000 + i * 9000, "Thổ", -70 + (Math.random() - 0.5) * 22, -40 + (Math.random() - 0.5) * 22);
      }
      createMonster("boss", "Tương Dương Trấn Thủ Sứ", 100, 650000, "Thổ", 0, -80);

    } else if (mapDef.id === "samac") {
      // 🏜️ SA MẠC HOANG VU (TRAIN CẤP 25 - 40)
      for (let i = 0; i < 6; i++) {
        createMonster("wolf", "Sa Mạc Dã Lang", 26 + i * 2, 7200 + i * 600, "Kim", 50 + (Math.random() - 0.5) * 30, -20 + (Math.random() - 0.5) * 30);
      }
      for (let i = 0; i < 6; i++) {
        createMonster("bandit", "Sa Mạc Đao Khách", 30 + i * 2, 11000 + i * 800, "Thổ", -50 + (Math.random() - 0.5) * 30, -20 + (Math.random() - 0.5) * 30);
      }
      createMonster("boss", "Kim Mao Sư Vương", 40, 68000, "Kim", 0, -70);

    } else if (mapDef.id === "thachlam") {
      // 🪨 THẠCH LÂM ĐỘNG (TRAIN CẤP 30 - 50)
      for (let i = 0; i < 6; i++) {
        createMonster("wolf", "Thạch Cương Lang", 32 + i * 2, 13000 + i * 1000, "Thổ", 50 + (Math.random() - 0.5) * 30, -20 + (Math.random() - 0.5) * 30);
      }
      for (let i = 0; i < 6; i++) {
        createMonster("bandit", "Thạch Giáp Yêu Binh", 38 + i * 2, 22000 + i * 1500, "Thổ", -50 + (Math.random() - 0.5) * 30, -20 + (Math.random() - 0.5) * 30);
      }
      createMonster("boss", "Thạch Lâm Yêu Vương", 50, 110000, "Thổ", 0, -70);

    } else if (mapDef.id === "tuyetlinh") {
      // ❄️ TUYẾT LĨNH BĂNG PHONG (TRAIN CẤP 50 - 65)
      for (let i = 0; i < 6; i++) {
        createMonster("wolf", "Tuyết Dã Lang", 52 + i * 2, 39000 + i * 2000, "Thủy", 55 + (Math.random() - 0.5) * 30, -20 + (Math.random() - 0.5) * 30);
      }
      for (let i = 0; i < 6; i++) {
        createMonster("tiger", "Tuyết Sơn Mãnh Hổ", 56 + i * 2, 54000 + i * 2500, "Thủy", -55 + (Math.random() - 0.5) * 30, -20 + (Math.random() - 0.5) * 30);
      }
      createMonster("boss", "Tuyết Sơn Quái Thú", 65, 230000, "Thủy", 0, -70);

    } else if (mapDef.id === "hoadiem") {
      // 🌋 HỎA DIỆM SƠN (TRAIN CẤP 70 - 85)
      for (let i = 0; i < 6; i++) {
        createMonster("bandit", "Hỏa Diệm Tà Binh", 72 + i * 2, 92000 + i * 4000, "Hỏa", 55 + (Math.random() - 0.5) * 30, -20 + (Math.random() - 0.5) * 30);
      }
      for (let i = 0; i < 6; i++) {
        createMonster("tiger", "Hỏa Kỳ Hổ", 76 + i * 2, 118000 + i * 5000, "Hỏa", -55 + (Math.random() - 0.5) * 30, -20 + (Math.random() - 0.5) * 30);
      }
      createMonster("boss", "Hỏa Diệm Tà Thần", 85, 460000, "Hỏa", 0, -75);

    } else if (mapDef.id === "hoason") {
      // ⛰️ HOA SƠN TUYỆT ĐỈNH (TRAIN CẤP 85 - 99)
      for (let i = 0; i < 6; i++) {
        createMonster("bandit", "Hoa Sơn Phản Đồ", 88 + i * 2, 165000 + i * 8000, "Kim", 55 + (Math.random() - 0.5) * 30, -20 + (Math.random() - 0.5) * 30);
      }
      for (let i = 0; i < 6; i++) {
        createMonster("bandit", "Hoa Sơn Kiếm Ma", 92 + i * 2, 220000 + i * 9000, "Kim", -55 + (Math.random() - 0.5) * 30, -20 + (Math.random() - 0.5) * 30);
      }
      createMonster("boss", "Hoa Sơn Kiếm Thánh", 99, 780000, "Kim", 0, -75);

    } else if (mapDef.id === "magiao") {
      // 🔮 MA GIÁO CẤM ĐỊA (TRAIN CẤP 100 - 120)
      for (let i = 0; i < 6; i++) {
        createMonster("bandit", "Ma Giáo Đệ Tử", 102 + i * 2, 290000 + i * 12000, "Thổ", 55 + (Math.random() - 0.5) * 30, -20 + (Math.random() - 0.5) * 30);
      }
      for (let i = 0; i < 6; i++) {
        createMonster("bandit", "Ma Giáo Hộ Pháp", 108 + i * 2, 380000 + i * 15000, "Thổ", -55 + (Math.random() - 0.5) * 30, -20 + (Math.random() - 0.5) * 30);
      }
      createMonster("boss", "Ma Giáo Giáo Chủ", 120, 1250000, "Thổ", 0, -75);

    } else if (mapDef.id === "vothuong") {
      // 🪵 VÕ TRƯỜNG LUYỆN CÔNG (DÀN 8 CỘT GỖ BẤT TỬ)
      for (let i = 0; i < 8; i++) {
        const gx = (i % 4) * 16 - 24;
        const gz = Math.floor(i / 4) * 20 - 10;
        createMonster("dummy", `Cột Gỗ Luyện Công ${i + 1}`, 120, 1000000, "Mộc", gx, gz);
      }
    }
  }

  // HÀM CHUYỂN MAP 3D HOÀN CHỈNH
  window.switchMap3D = function(mapId) {
    const mapDef = MAP_DEFINITIONS[mapId];
    if (!mapDef) return;
    hero.isMapTransitioning = true;

    const overlay = document.getElementById("mapTransitionOverlay");
    const title = document.getElementById("transitionMapTitle");
    const sub = document.getElementById("transitionMapSub");

    if (title) title.textContent = `${mapDef.icon || "🗺️"} ${mapDef.name}`;
    if (sub) sub.textContent = `${mapDef.lvRange} · ${mapDef.desc}`;
    if (overlay) {
      overlay.style.display = "flex";
      requestAnimationFrame(() => overlay.style.opacity = "1");
    }

    playSfx("jump");

    setTimeout(() => {
      // 1. Dọn dẹp quái và NPC map cũ
      monsters.forEach(m => scene.remove(m.group));
      monsters.length = 0;

      npcs.forEach(n => scene.remove(n.group));
      npcs.length = 0;

      clickableObjects.length = 0;
      currentTarget = null;
      targetRing.visible = false;
      const tf = document.getElementById("tgtF");
      if (tf) tf.classList.remove("show");

      // 2. Thiết lập ID map mới
      currentMapId = mapId;
      currentMapDef = mapDef;
      hero.pendingSkillCast = null;

      // 3. Xây dựng môi trường & sinh NPC, Quái vật
      buildMapEnvironment(mapDef);
      spawnMapNpcs(mapDef);
      spawnMapMonsters(mapDef);

      // 4. Đặt hiệp khách tại điểm xuất hiện an toàn
      const [sx, sz] = mapDef.spawn || [0, 50];
      hero.mesh.position.set(sx, 0, sz);
      hero.pos.copy(hero.mesh.position);
      hero.targetPos.set(sx, 0, sz);
      hero.isMoving = false;
      hero.facing = Math.PI;

      camera.position.set(sx, 16, sz + 23);
      controls.target.set(sx, 1.6, sz);
      lastHeroPos.set(sx, 0, sz);
      controls.update();
      hero.isMapTransitioning = false;
      saveHeroLocation();

      // 5. Cập nhật UI
      const zn = document.getElementById("zone");
      if (zn) zn.textContent = `${mapDef.name} · ${mapDef.category === "train" ? "Bãi Luyện Công" : mapDef.category === "city" ? "Thành Thị" : "Thôn Trấn"}`;
      const curNm = document.getElementById("mapCurrentName");
      if (curNm) curNm.textContent = mapDef.name;

      // 6. Tắt overlay chuyển cảnh
      if (overlay) {
        overlay.style.opacity = "0";
        setTimeout(() => overlay.style.display = "none", 350);
      }

      toast3D(`🐎 Chào mừng đại hiệp đến với <b>${mapDef.name}</b> (${mapDef.lvRange})!`);
    }, 400);
  };

  // Khởi tạo bản đồ mặc định ban đầu: Ba Lăng Huyện (Tân Thủ Thôn)
  if (!restoreHeroLocation()) {
    buildMapEnvironment(currentMapDef);
    spawnMapNpcs(currentMapDef);
    spawnMapMonsters(currentMapDef);
  }

  // ==========================================
  // 10. ĐIỀU KHIỂN CHUỘT, MỤC TIÊU & CHIẾN ĐẤU// ==========================================
  // 11. ĐIỀU KHIỂN CHUỘT, MỤC TIÊU & CHIẾN ĐẤU
  // ==========================================
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const tgtF = document.getElementById("tgtF");
  const tgtNm = document.getElementById("tgtNm");
  const tgtEl = document.getElementById("tgtEl");
  const tgtHpFill = document.getElementById("tgtHpFill");
  const tgtHpTxt = document.getElementById("tgtHpTxt");

  function setTarget(entity, isMon) {
    if (currentTarget && currentTarget !== entity && currentTarget.billboard && typeof currentTarget.billboard.updateHp === "function") {
      currentTarget.billboard.updateHp(currentTarget.hp / currentTarget.maxHp, false);
    }
    currentTarget = entity;
    if (isMon) {
      targetRing.material.color.setHex(0xff3b30);
      targetRing.visible = true;
      tgtF.classList.add("show");
      tgtNm.textContent = `${entity.name} · Cấp ${entity.lv}`;
      tgtEl.textContent = entity.element || "Thổ";
      const hpPct = Math.max(0, (entity.hp / entity.maxHp) * 100);
      tgtHpFill.style.width = hpPct + "%";
      tgtHpTxt.textContent = Math.round(hpPct) + "%";
      if (entity.billboard && typeof entity.billboard.updateHp === "function") {
        entity.billboard.updateHp(hpPct / 100, true);
      }
      toast3D(`🎯 Mục tiêu: <b style='color:#ffd24a'>${entity.name}</b> (Cấp ${entity.lv})`);
    } else {
      hero.pendingSkillCast = null;
      targetRing.material.color.setHex(0xffd24a);
      targetRing.visible = true;
      tgtF.classList.remove("show");
      toast3D(`💬 <b>${entity.name}</b>: "${entity.quote}"`);

      // Nếu là Xa Phu: mở bảng dịch chuyển
      if (entity.roleType === "xaphu") {
        setTimeout(openXaPhuModal, 250);
      }

      hero.targetPos.set(entity.group.position.x, getSurfaceElevation(entity.group.position.x, entity.group.position.z + 2.5), entity.group.position.z + 2.5);
      hero.isMoving = true;
    }
  }

  window.addEventListener("pointerdown", function(e) {
    if (e.target.closest("#topbar, #miniWrap, #gkTrack, #quest, #tgtF, #chat, #bar, #acts, #camPill, #btnGuide, #helpGuideModal, #factionModal, #xaPhuModal, #mapModal, #npcDialogModal")) return;

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    if (e.button === 0) {
      // ===== 1. CHUỘT TRÁI (LEFT CLICK) =====
      const hitEntities = raycaster.intersectObjects(clickableObjects);
      // Lọc bỏ thực thể đã chết, chỉ chọn thực thể còn sống gần raycaster nhất
      const validHit = hitEntities.find(h => {
        const ent = h.object.userData && h.object.userData.entity;
        return ent && !ent.isDead;
      });

      if (validHit) {
        const hit = validHit.object.userData;
        if (hit.isMonster) {
          // Click chuột trái vào quái: CHỌN MỤC TIÊU & ĐÁNH CHIÊU CHUỘT TRÁI CỦA PHÁI
          setTarget(hit.entity, true);
          castSkill3D("left", hit.entity);
          return;
        }
        if (hit.isNpc) {
          hero.pendingSkillCast = null;
          setTarget(hit.entity, false);
          const dx = hit.entity.group.position.x - hero.mesh.position.x;
          const dz = hit.entity.group.position.z - hero.mesh.position.z;
          hero.facing = Math.atan2(dx, dz);
          openNpcDialog(hit.entity);
          return;
        }
      }

      // Click vào mặt đất: Di chuyển nhân vật
      const intersects = raycaster.intersectObject(groundMesh);
      if (intersects.length > 0) {
        const pt = intersects[0].point;
        const groundY = getSurfaceElevation(pt.x, pt.z);
        groundClickRing.position.set(pt.x, groundY + 0.06, pt.z);
        groundClickRing.scale.set(0.4, 0.4, 0.4);
        groundClickRing.material.opacity = 0.95;
        groundClickRing.visible = true;
        groundClickTimer = 0.5;

        hero.pendingSkillCast = null;
        hero.targetPos.set(pt.x, groundY, pt.z);
        hero.isMoving = true;
        hero.isMeditating = false;
      }
    } else if (e.button === 2) {
      // ===== 2. CHUỘT PHẢI (RIGHT CLICK) =====
      const hitEntities = raycaster.intersectObjects(clickableObjects);
      const validHit = hitEntities.find(h => {
        const ent = h.object.userData && h.object.userData.entity;
        return ent && !ent.isDead;
      });

      if (validHit) {
        const hit = validHit.object.userData;
        if (hit.isMonster) {
          // Click chuột phải vào quái: CHỌN MỤC TIÊU & TUNG TUYỆT KỸ CHUỘT PHẢI CỦA PHÁI
          e.preventDefault();
          setTarget(hit.entity, true);
          castSkill3D("right", hit.entity);
          return;
        }
        if (hit.isNpc) {
          e.preventDefault();
          setTarget(hit.entity, false);
          const dx = hit.entity.group.position.x - hero.mesh.position.x;
          const dz = hit.entity.group.position.z - hero.mesh.position.z;
          hero.facing = Math.atan2(dx, dz);
          openNpcDialog(hit.entity);
          return;
        }
      }
    }
  });

  // Chặn menu chuột phải mặc định của trình duyệt để thao tác võ lâm mượt mà
  window.addEventListener("contextmenu", function(e) {
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
    e.preventDefault();
  });

  // Chữ số sát thương nổi 3D
  function spawnDamageText(x, y, z, text, color = "#ff4433", isCrit = false) {
    const canvas = document.createElement("canvas");
    canvas.width = 256; canvas.height = 80;
    const ctx = canvas.getContext("2d");
    ctx.font = isCrit ? "bold 38px 'Noto Serif', serif" : "bold 28px 'Noto Serif', serif";
    ctx.textAlign = "center";
    ctx.lineWidth = 5; ctx.strokeStyle = "#000000";
    ctx.strokeText(text, 128, 50);
    ctx.fillStyle = color; ctx.fillText(text, 128, 50);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, depthTest: false, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.set(x + (Math.random() - 0.5) * 0.8, y + 2.2, z + (Math.random() - 0.5) * 0.8);
    sprite.scale.set(3.2, 1.0, 1);
    scene.add(sprite);
    floatingTexts.push({ sprite, vy: 0.05, life: 1.0 });
  }

  // ==========================================
  // ==========================================
  // HỆ THỐNG KỸ NĂNG VÕ CÔNG 12 ĐẠI MÔN PHÁI (PORT CHUẨN 100% TỪ BẢN 2.5D)
  // ==========================================
  const FACTION_SKILLS = (typeof window.ALL_FACTION_DATA !== "undefined") ? window.ALL_FACTION_DATA : {};
  window.FACTION_SKILLS = FACTION_SKILLS;
  hero.activeRouteIndex = 0;
  if (!hero.equippedSkills && FACTION_SKILLS[hero.faction]) {
    hero.equippedSkills = FACTION_SKILLS[hero.faction].defaultSkills ? [...FACTION_SKILLS[hero.faction].defaultSkills] : null;
  }

  // ==========================================
  // HỆ THỐNG HIỆU ỨNG CHIÊU THỨC 3D (SKILL FX SYSTEM) - CHUẨN 2.5D
  // ==========================================
  const activeSkillFX = [];
  const activeImpactFX = [];

  // BỘ ĐỆM TEXTURE CANVAS CHO HIỆU ỨNG KỸ NĂNG 3D
  const SKILL_TEXTURE_CACHE = {};

  function getTaiChiTexture() {
    if (SKILL_TEXTURE_CACHE.taichi) return SKILL_TEXTURE_CACHE.taichi;
    const canvas = document.createElement("canvas");
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const cx = 128, cy = 128, r = 118;

    // Vòng tròn nền
    ctx.fillStyle = "#0c0d12";
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();

    // Nửa trắng (Dương)
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2, false);
    ctx.arc(cx, cy + r / 2, r / 2, Math.PI / 2, -Math.PI / 2, true);
    ctx.arc(cx, cy - r / 2, r / 2, Math.PI / 2, -Math.PI / 2, false);
    ctx.closePath();
    ctx.fill();

    // Nửa đen (Âm)
    ctx.fillStyle = "#12141c";
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI / 2, -Math.PI / 2, false);
    ctx.arc(cx, cy - r / 2, r / 2, -Math.PI / 2, Math.PI / 2, true);
    ctx.arc(cx, cy + r / 2, r / 2, -Math.PI / 2, Math.PI / 2, false);
    ctx.closePath();
    ctx.fill();

    // Hai mắt cá Âm Dương
    ctx.fillStyle = "#12141c";
    ctx.beginPath(); ctx.arc(cx, cy - r / 2, r / 5.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath(); ctx.arc(cx, cy + r / 2, r / 5.5, 0, Math.PI * 2); ctx.fill();

    // Vành Bát Quái hoàng kim
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 8;
    ctx.beginPath(); ctx.arc(cx, cy, r - 4, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = "#ffe57f";
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(cx, cy, r - 12, 0, Math.PI * 2); ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    SKILL_TEXTURE_CACHE.taichi = tex;
    return tex;
  }

  function getLotusTexture() {
    if (SKILL_TEXTURE_CACHE.lotus) return SKILL_TEXTURE_CACHE.lotus;
    const canvas = document.createElement("canvas");
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const cx = 128, cy = 128;

    // 8 cánh sen lớn
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ang);
      const grad = ctx.createRadialGradient(0, -60, 10, 0, -40, 70);
      grad.addColorStop(0, "rgba(255, 180, 220, 0.95)");
      grad.addColorStop(0.6, "rgba(128, 222, 234, 0.85)");
      grad.addColorStop(1, "rgba(0, 188, 212, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(0, -55, 26, 52, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 8 cánh sen lớp trong
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2 + Math.PI / 8;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ang);
      ctx.fillStyle = "rgba(255, 245, 180, 0.9)";
      ctx.beginPath();
      ctx.ellipse(0, -32, 16, 32, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Nhụy sen hoàng kim rực rỡ
    const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 28);
    coreGrad.addColorStop(0, "#ffffff");
    coreGrad.addColorStop(0.5, "#ffd700");
    coreGrad.addColorStop(1, "rgba(255, 193, 7, 0)");
    ctx.fillStyle = coreGrad;
    ctx.beginPath(); ctx.arc(cx, cy, 28, 0, Math.PI * 2); ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    SKILL_TEXTURE_CACHE.lotus = tex;
    return tex;
  }

  function getVajraPalmTexture() {
    if (SKILL_TEXTURE_CACHE.vajra) return SKILL_TEXTURE_CACHE.vajra;
    const canvas = document.createElement("canvas");
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const cx = 128, cy = 138;

    // Hào quang vàng rực
    const glow = ctx.createRadialGradient(cx, cy, 20, cx, cy, 120);
    glow.addColorStop(0, "rgba(255, 235, 59, 0.85)");
    glow.addColorStop(0.6, "rgba(255, 160, 0, 0.65)");
    glow.addColorStop(1, "rgba(255, 143, 0, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(cx, cy, 120, 0, Math.PI * 2); ctx.fill();

    // Lòng bàn tay
    ctx.fillStyle = "#ffe082";
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 20, 48, 55, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // 5 Ngón tay
    const fingers = [
      { x: -38, y: -20, w: 14, h: 52, ang: -0.28 },
      { x: -18, y: -45, w: 14, h: 72, ang: -0.1 },
      { x: 3, y: -55, w: 14, h: 80, ang: 0.02 },
      { x: 24, y: -45, w: 14, h: 70, ang: 0.12 },
      { x: 42, y: -25, w: 13, h: 54, ang: 0.26 }
    ];
    for (const f of fingers) {
      ctx.save();
      ctx.translate(cx + f.x, cy + f.y);
      ctx.rotate(f.ang);
      ctx.beginPath();
      ctx.roundRect(-f.w / 2, -f.h / 2, f.w, f.h, 7);
      ctx.fillStyle = "#ffe082"; ctx.fill();
      ctx.strokeStyle = "#ffd700"; ctx.stroke();
      ctx.restore();
    }

    // Chữ VẠN (卍) phát sáng giữa lòng bàn tay
    ctx.strokeStyle = "#c62828";
    ctx.lineWidth = 7;
    ctx.lineCap = "square";
    const s = 20;
    ctx.beginPath();
    ctx.moveTo(cx - s, cy + 18); ctx.lineTo(cx + s, cy + 18);
    ctx.moveTo(cx, cy + 18 - s); ctx.lineTo(cx, cy + 18 + s);
    ctx.moveTo(cx - s, cy + 18); ctx.lineTo(cx - s, cy + 18 - s * 0.7);
    ctx.moveTo(cx + s, cy + 18); ctx.lineTo(cx + s, cy + 18 + s * 0.7);
    ctx.moveTo(cx, cy + 18 - s); ctx.lineTo(cx + s * 0.7, cy + 18 - s);
    ctx.moveTo(cx, cy + 18 + s); ctx.lineTo(cx - s * 0.7, cy + 18 + s);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    SKILL_TEXTURE_CACHE.vajra = tex;
    return tex;
  }

  function getPoisonSkullTexture() {
    if (SKILL_TEXTURE_CACHE.skull) return SKILL_TEXTURE_CACHE.skull;
    const canvas = document.createElement("canvas");
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const cx = 128, cy = 118;

    const pGlow = ctx.createRadialGradient(cx, cy, 30, cx, cy, 118);
    pGlow.addColorStop(0, "rgba(118, 255, 3, 0.85)");
    pGlow.addColorStop(0.5, "rgba(46, 125, 50, 0.65)");
    pGlow.addColorStop(1, "rgba(27, 94, 32, 0)");
    ctx.fillStyle = pGlow;
    ctx.beginPath(); ctx.arc(cx, cy, 118, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#b9f6ca";
    ctx.strokeStyle = "#00e676";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy - 10, 52, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(cx - 30, cy + 28, 60, 42, 8);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = "#d50000";
    ctx.beginPath(); ctx.ellipse(cx - 22, cy - 12, 15, 20, -0.15, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx + 22, cy - 12, 15, 20, 0.15, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#ffea00";
    ctx.beginPath(); ctx.arc(cx - 20, cy - 10, 6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 20, cy - 10, 6, 0, Math.PI * 2); ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    SKILL_TEXTURE_CACHE.skull = tex;
    return tex;
  }

  // Phân loại chính xác hiệu ứng kỹ năng theo môn phái & tên chiêu thức
  function resolveSkillFXCategory(skill) {
    if (!skill) return "flying_sword";
    const name = (skill.name || "").toLowerCase();
    const fx = (skill.fxType || skill.type || "").toLowerCase();
    const style = (skill.style || "").toLowerCase();
    const fac = (hero.faction || "kiem").toLowerCase();

    if (fx === "twindragon" || fx === "fire_dragon" || fx === "dragon" || style === "twindragon") return "twindragon";
    if (fx === "taichi" || fx === "yin_yang" || style === "taichi") return "taichi";
    if (fx === "thunder_bolt" || fx === "five_thunders" || fx === "thunder_storm" || fx === "lightning" || style === "lightning") return "lightning";
    if (fx === "ice_palm" || fx === "ice_blast" || fx === "ice_avalanche" || fx === "snow_plum" || fx === "lotus" || style === "ice") return "ice_lotus";
    if (fx === "fire_palm" || fx === "flame_meteor" || fx === "firewheel" || fx === "flames" || style === "fire") return "hell_fire";
    if (fx === "poison_sand" || fx === "skull_curse" || fx === "poison_storm" || fx === "toad_wave" || fx === "snakes" || style === "poison") return "poison_skull";
    if (fx === "vajra" || fx === "fist" || fx === "palm" || fx === "hammer_crush" || style === "fist") return "vajra_palm";
    if (fx === "flying_dart" || fx === "arrowfly" || fx === "dart" || style === "darts") return "multi_darts";
    if (fx === "spear_thrust" || fx === "spear_sweep" || fx === "golden_dragon" || fx === "lance" || style === "spear") return "spear_thrust";
    if (fx === "bamboo_whirl" || fx === "stick") return "bamboo_whirl";
    if (fx === "blade" || fx === "slash" || fx === "crescent" || style === "blade") return "crescent_blade";

    if (name.includes("long") || name.includes("rồng") || name.includes("phi long") || name.includes("hàng long")) return "twindragon";
    if (name.includes("thái cực") || name.includes("âm dương") || name.includes("bát quái") || name.includes("vô cực")) return "taichi";
    if (name.includes("lôi") || name.includes("sét") || name.includes("điện") || name.includes("thiên lôi") || name.includes("cuồng lôi")) return "lightning";
    if (name.includes("sen") || name.includes("liên") || name.includes("băng") || name.includes("tuyết") || name.includes("hàn")) return "ice_lotus";
    if (name.includes("phật") || name.includes("kim cang") || name.includes("chưởng") || name.includes("quyền") || name.includes("la hán") || name.includes("ấn")) return "vajra_palm";
    if (name.includes("châm") || name.includes("tiêu") || name.includes("ám khí") || name.includes("tiễn") || name.includes("bách vũ") || name.includes("phi đao")) return "multi_darts";
    if (name.includes("độc") || name.includes("xà") || name.includes("cốt") || name.includes("thi") || name.includes("hủ") || name.includes("trùng")) return "poison_skull";
    if (name.includes("thương") || name.includes("kích") || name.includes("mâu")) return "spear_thrust";
    if (name.includes("hỏa") || name.includes("diệm") || name.includes("lửa") || name.includes("cháy") || name.includes("thiêu")) return "hell_fire";
    if (name.includes("đao") || name.includes("trảm") || name.includes("nguyệt") || name.includes("phong nhận")) return "crescent_blade";
    if (name.includes("bổng") || name.includes("trúc") || name.includes("côn")) return "bamboo_whirl";
    if (name.includes("kiếm") || name.includes("phi kiếm") || name.includes("thần kiếm")) return "flying_sword";

    if (fac === "kiem") return "taichi";
    if (fac === "bang") return "twindragon";
    if (fac === "dao") return "lightning";
    if (fac === "thuy" || fac === "nguyet") return "ice_lotus";
    if (fac === "quyen") return "vajra_palm";
    if (fac === "tien") return "multi_darts";
    if (fac === "xa") return "poison_skull";
    if (fac === "thuong") return "spear_thrust";
    if (fac === "hoa") return "hell_fire";
    if (fac === "truc") return "flying_sword";
    if (fac === "tieu") return "crescent_blade";

    return "flying_sword";
  }

  // TẠO MODEL HIỆU ỨNG CHIÊU THỨC 3D ĐỘC BẢN THEO PHONG CÁCH VÕ LÂM 2.5D
  function createSkillMesh(fxType, colorHex, skill) {
    const cat = resolveSkillFXCategory(skill || { fxType });
    const fxGroup = new THREE.Group();

    if (cat === "taichi") {
      // 1. THÁI CỰ ĐỒ VÕ ĐANG (Đĩa Âm Dương Bát Quái + 4 Phi Kiếm Hoàng Kim Luân Chuyển)
      const disc = new THREE.Mesh(
        new THREE.PlaneGeometry(2.4, 2.4),
        new THREE.MeshBasicMaterial({ map: getTaiChiTexture(), transparent: true, side: THREE.DoubleSide })
      );
      disc.rotation.x = Math.PI / 2;
      fxGroup.add(disc);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(1.2, 1.45, 32),
        new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
      );
      ring.rotation.x = Math.PI / 2;
      fxGroup.add(ring);

      const coreOrb = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), new THREE.MeshBasicMaterial({ color: 0x80d8ff }));
      fxGroup.add(coreOrb);

      const swordGeo = new THREE.ConeGeometry(0.12, 1.2, 4);
      const swordMat = new THREE.MeshBasicMaterial({ color: 0xffd24a });
      const swords = [];
      for (let i = 0; i < 4; i++) {
        const sw = new THREE.Mesh(swordGeo, swordMat);
        sw.rotation.x = Math.PI / 2;
        swords.push(sw);
        fxGroup.add(sw);
      }

      fxGroup.userData.onUpdate = function(dt, timer) {
        disc.rotation.z += dt * 6.5;
        ring.rotation.z -= dt * 4.5;
        const ang = timer * 7.5;
        const rad = 1.6;
        for (let i = 0; i < 4; i++) {
          const a = ang + (i * Math.PI / 2);
          swords[i].position.set(Math.cos(a) * rad, Math.sin(a) * 0.3, Math.sin(a) * rad);
          swords[i].rotation.z = -a;
        }
      };
      playSfx("slash");

    } else if (cat === "twindragon") {
      // 2. SONG LONG HÍ CHÂU CÁI BANG (2 Thần Long Hỏa Xoắn Ốc Lao Vút)
      const dragonA = new THREE.Group();
      const dragonB = new THREE.Group();

      const headMatA = new THREE.MeshBasicMaterial({ color: 0xffd700 });
      const headMatB = new THREE.MeshBasicMaterial({ color: 0xff3b10 });

      const headA = new THREE.Mesh(new THREE.ConeGeometry(0.48, 1.4, 6), headMatA);
      headA.rotation.x = Math.PI / 2;
      dragonA.add(headA);

      const eyeL_A = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
      eyeL_A.position.set(-0.25, 0.18, 0.1);
      dragonA.add(eyeL_A);
      const eyeR_A = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
      eyeR_A.position.set(0.25, 0.18, 0.1);
      dragonA.add(eyeR_A);

      const orbsA = [];
      for (let i = 0; i < 5; i++) {
        const r = 0.42 - i * 0.06;
        const ob = new THREE.Mesh(new THREE.SphereGeometry(r, 6, 6), new THREE.MeshBasicMaterial({ color: (i % 2 === 0 ? 0xffb300 : 0xff7043) }));
        dragonA.add(ob);
        orbsA.push(ob);
      }

      const headB = new THREE.Mesh(new THREE.ConeGeometry(0.48, 1.4, 6), headMatB);
      headB.rotation.x = Math.PI / 2;
      dragonB.add(headB);

      const eyeL_B = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), new THREE.MeshBasicMaterial({ color: 0xffea00 }));
      eyeL_B.position.set(-0.25, 0.18, 0.1);
      dragonB.add(eyeL_B);
      const eyeR_B = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), new THREE.MeshBasicMaterial({ color: 0xffea00 }));
      eyeR_B.position.set(0.25, 0.18, 0.1);
      dragonB.add(eyeR_B);

      const orbsB = [];
      for (let i = 0; i < 5; i++) {
        const r = 0.42 - i * 0.06;
        const ob = new THREE.Mesh(new THREE.SphereGeometry(r, 6, 6), new THREE.MeshBasicMaterial({ color: (i % 2 === 0 ? 0xff5722 : 0xffa726) }));
        dragonB.add(ob);
        orbsB.push(ob);
      }

      fxGroup.add(dragonA);
      fxGroup.add(dragonB);

      fxGroup.userData.onUpdate = function(dt, timer) {
        const helixSpeed = 14;
        const helixRadius = 0.95;
        const ang = timer * helixSpeed;

        dragonA.position.set(Math.cos(ang) * helixRadius, Math.sin(ang) * helixRadius, 0);
        dragonB.position.set(Math.cos(ang + Math.PI) * helixRadius, Math.sin(ang + Math.PI) * helixRadius, 0);

        for (let i = 0; i < 5; i++) {
          const lag = (i + 1) * 0.28;
          const lagAngA = ang - lag;
          const lagAngB = ang + Math.PI - lag;
          orbsA[i].position.set(Math.cos(lagAngA) * helixRadius, Math.sin(lagAngA) * helixRadius, -(i + 1) * 0.65);
          orbsB[i].position.set(Math.cos(lagAngB) * helixRadius, Math.sin(lagAngB) * helixRadius, -(i + 1) * 0.65);
        }
      };
      playSfx("fire");

    } else if (cat === "lightning") {
      // 3. CUỒNG LÔI ĐIỆN GIÁNG CÔN LÔN (Tia Chớp Tím Trắng Zigzag & Quả Cầu Sét Bão Táp)
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.72, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      fxGroup.add(core);

      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.09, 6, 16), new THREE.MeshBasicMaterial({ color: 0xda70d6 }));
      fxGroup.add(ring1);

      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.07, 6, 16), new THREE.MeshBasicMaterial({ color: 0x00ffff }));
      ring2.rotation.x = Math.PI / 2;
      fxGroup.add(ring2);

      const boltMat = new THREE.MeshBasicMaterial({ color: 0xda70d6 });
      const bolts = [];
      for (let i = 0; i < 4; i++) {
        const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.25, 2.8, 4), boltMat);
        bolt.rotation.x = Math.PI / 2;
        fxGroup.add(bolt);
        bolts.push(bolt);
      }

      fxGroup.userData.onUpdate = function(dt, timer) {
        ring1.rotation.y += dt * 14;
        ring1.rotation.z += dt * 10;
        ring2.rotation.x += dt * 12;
        ring2.rotation.y += dt * 16;
        for (let i = 0; i < 4; i++) {
          const a = timer * 16 + (i * Math.PI / 2);
          bolts[i].position.set(Math.cos(a) * 0.65, Math.sin(a) * 0.65, -0.6);
          bolts[i].rotation.z = Math.sin(timer * 25 + i) * 0.6;
        }
      };
      playSfx("lightning");

    } else if (cat === "ice_lotus") {
      // 4. BĂNG TÂM LIÊN HOA NGA MI / THÚY YÊN (Hoa Sen Tuyết Nở Rộ Xoay Tròn Phát Sáng)
      const disc = new THREE.Mesh(
        new THREE.PlaneGeometry(2.2, 2.2),
        new THREE.MeshBasicMaterial({ map: getLotusTexture(), transparent: true, side: THREE.DoubleSide })
      );
      disc.rotation.x = Math.PI / 2;
      fxGroup.add(disc);

      const petalMat = new THREE.MeshBasicMaterial({ color: 0x80d8ff, transparent: true, opacity: 0.85 });
      const petalGeo = new THREE.OctahedronGeometry(0.45, 0);
      const petals = [];
      for (let i = 0; i < 6; i++) {
        const pt = new THREE.Mesh(petalGeo, petalMat);
        pt.scale.set(0.6, 1.8, 0.3);
        pt.rotation.x = Math.PI / 2;
        fxGroup.add(pt);
        petals.push(pt);
      }

      const frostRing = new THREE.Mesh(
        new THREE.RingGeometry(1.2, 1.4, 6),
        new THREE.MeshBasicMaterial({ color: 0xe0f7fa, side: THREE.DoubleSide, transparent: true, opacity: 0.9 })
      );
      frostRing.rotation.x = Math.PI / 2;
      fxGroup.add(frostRing);

      fxGroup.userData.onUpdate = function(dt, timer) {
        disc.rotation.z += dt * 7.5;
        frostRing.rotation.z -= dt * 5.0;
        const ang = timer * 8.0;
        for (let i = 0; i < 6; i++) {
          const a = ang + (i * Math.PI / 3);
          petals[i].position.set(Math.cos(a) * 1.35, 0, Math.sin(a) * 1.35);
          petals[i].rotation.z = -a;
        }
      };
      playSfx("ice");

    } else if (cat === "vajra_palm") {
      // 5. KIM CANG PHẬT THỦ THIẾU LÂM (Bàn Tay Phật Bằng Vàng In Dấu Chữ Vạn & Vòng Hào Quang)
      const palm = new THREE.Mesh(
        new THREE.PlaneGeometry(2.4, 2.6),
        new THREE.MeshBasicMaterial({ map: getVajraPalmTexture(), transparent: true, side: THREE.DoubleSide })
      );
      palm.rotation.x = Math.PI / 2;
      fxGroup.add(palm);

      const halo = new THREE.Mesh(
        new THREE.RingGeometry(1.2, 1.55, 24),
        new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
      );
      halo.rotation.x = Math.PI / 2;
      fxGroup.add(halo);

      const shockwave = new THREE.Mesh(
        new THREE.TorusGeometry(1.5, 0.1, 6, 16),
        new THREE.MeshBasicMaterial({ color: 0xffecb3, transparent: true, opacity: 0.7 })
      );
      shockwave.position.z = -0.8;
      fxGroup.add(shockwave);

      fxGroup.userData.onUpdate = function(dt, timer) {
        halo.rotation.z += dt * 4.5;
        shockwave.scale.set(1 + Math.sin(timer * 12) * 0.25, 1 + Math.sin(timer * 12) * 0.25, 1);
      };
      playSfx("hit");

    } else if (cat === "multi_darts") {
      // 6. BẠO VŨ LÊ HOA CHÂM ĐƯỜNG MÔN (Quạt 5 Mũi Ám Khí Kim Sắc Xòe Cánh Phi Nhanh)
      const dartGeo = new THREE.ConeGeometry(0.09, 1.2, 4);
      const dartMat = new THREE.MeshBasicMaterial({ color: 0xe0e0e0 });
      const tipMat = new THREE.MeshBasicMaterial({ color: 0x76ff03 });

      const angles = [-0.35, -0.18, 0, 0.18, 0.35];
      for (const a of angles) {
        const dGroup = new THREE.Group();
        const blade = new THREE.Mesh(dartGeo, dartMat);
        blade.rotation.x = Math.PI / 2;
        dGroup.add(blade);

        const tip = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.35, 4), tipMat);
        tip.rotation.x = Math.PI / 2;
        tip.position.z = 0.65;
        dGroup.add(tip);

        dGroup.position.x = Math.sin(a) * 1.5;
        dGroup.position.z = Math.cos(a) * 0.6;
        dGroup.rotation.y = a;
        fxGroup.add(dGroup);
      }
      playSfx("slash");

    } else if (cat === "poison_skull") {
      // 7. VẠN CỔ XÀ ĐỘC NGŨ ĐỘC (Đầu Lâu Xanh Lục Phát Sáng & Song Xà Uốn Lượn)
      const skull = new THREE.Mesh(
        new THREE.PlaneGeometry(2.0, 2.0),
        new THREE.MeshBasicMaterial({ map: getPoisonSkullTexture(), transparent: true, side: THREE.DoubleSide })
      );
      skull.rotation.x = Math.PI / 2;
      fxGroup.add(skull);

      const snakeGeo = new THREE.CylinderGeometry(0.1, 0.05, 2.4, 6);
      const snakeMat1 = new THREE.MeshBasicMaterial({ color: 0x76ff03 });
      const snakeMat2 = new THREE.MeshBasicMaterial({ color: 0x2e7d32 });

      const snake1 = new THREE.Mesh(snakeGeo, snakeMat1);
      const snake2 = new THREE.Mesh(snakeGeo, snakeMat2);
      fxGroup.add(snake1);
      fxGroup.add(snake2);

      fxGroup.userData.onUpdate = function(dt, timer) {
        const sAng = timer * 9.0;
        snake1.position.set(Math.cos(sAng) * 0.9, Math.sin(sAng) * 0.3, Math.sin(sAng) * 0.9);
        snake1.rotation.z = sAng;
        snake2.position.set(Math.cos(sAng + Math.PI) * 0.9, Math.sin(sAng + Math.PI) * 0.3, Math.sin(sAng + Math.PI) * 0.9);
        snake2.rotation.z = sAng + Math.PI;
      };
      playSfx("poison");

    } else if (cat === "spear_thrust") {
      // 8. BÁ VƯƠNG THƯƠNG THIÊN VƯƠNG (Hoàng Kim Thương 3.4m Kèm Vòng Xoáy Khí Kình)
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 8), new THREE.MeshBasicMaterial({ color: 0xd4af37 }));
      shaft.rotation.x = Math.PI / 2;
      fxGroup.add(shaft);

      const head = new THREE.Mesh(new THREE.ConeGeometry(0.32, 1.4, 6), new THREE.MeshBasicMaterial({ color: 0xffd700 }));
      head.rotation.x = Math.PI / 2;
      head.position.z = 1.9;
      fxGroup.add(head);

      const tassel = new THREE.Mesh(new THREE.SphereGeometry(0.32, 6, 6), new THREE.MeshBasicMaterial({ color: 0xd50000 }));
      tassel.position.z = 1.2;
      fxGroup.add(tassel);

      const spiral = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.08, 6, 16), new THREE.MeshBasicMaterial({ color: 0xffe082 }));
      spiral.position.z = 0.5;
      fxGroup.add(spiral);

      fxGroup.userData.onUpdate = function(dt) {
        spiral.rotation.z += dt * 15;
      };
      playSfx("slash");

    } else if (cat === "hell_fire") {
      // 9. MA DIỆM HỎA CẦU THIÊN NHẪN (Thiên Ngoại Lưu Tinh & 3 Hỏa Châu Xoay Quanh)
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.85, 12, 12), new THREE.MeshBasicMaterial({ color: 0xff3b10 }));
      const inner = new THREE.Mesh(new THREE.SphereGeometry(0.48, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffea00 }));
      const tail = new THREE.Mesh(new THREE.ConeGeometry(0.65, 2.5, 8), new THREE.MeshBasicMaterial({ color: 0xff5722 }));
      tail.rotation.x = -Math.PI / 2;
      tail.position.z = -1.2;
      fxGroup.add(core);
      fxGroup.add(inner);
      fxGroup.add(tail);

      const orbs = [];
      const orbMat = new THREE.MeshBasicMaterial({ color: 0xffa726 });
      for (let i = 0; i < 3; i++) {
        const ob = new THREE.Mesh(new THREE.SphereGeometry(0.26, 6, 6), orbMat);
        fxGroup.add(ob);
        orbs.push(ob);
      }

      fxGroup.userData.onUpdate = function(dt, timer) {
        const ang = timer * 11;
        for (let i = 0; i < 3; i++) {
          const a = ang + (i * Math.PI * 2 / 3);
          orbs[i].position.set(Math.cos(a) * 1.25, Math.sin(a) * 1.25, 0);
        }
      };
      playSfx("fire");

    } else if (cat === "crescent_blade") {
      // 10. BÁN NGUYỆT PHONG ĐAO TIÊU DAO (Đao Khí Bán Nguyệt Lượn Cắt Không Gian)
      const crescent = new THREE.Mesh(
        new THREE.TorusGeometry(1.6, 0.18, 6, 24, Math.PI * 0.9),
        new THREE.MeshBasicMaterial({ color: 0x00e5ff })
      );
      crescent.rotation.x = Math.PI / 2;
      fxGroup.add(crescent);

      const glow = new THREE.Mesh(
        new THREE.TorusGeometry(1.4, 0.09, 6, 20, Math.PI * 0.9),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      glow.rotation.x = Math.PI / 2;
      fxGroup.add(glow);
      playSfx("slash");

    } else if (cat === "bamboo_whirl") {
      // 11. ĐẢ CẨU BỔNG CÁI BANG (Bổng Trúc Lục Bích Xoay Tít)
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 3.2, 6), new THREE.MeshBasicMaterial({ color: 0x7cb342 }));
      stick.rotation.z = Math.PI / 2;
      fxGroup.add(stick);

      const ring = new THREE.Mesh(new THREE.RingGeometry(0.9, 1.4, 16), new THREE.MeshBasicMaterial({ color: 0x81c784, side: THREE.DoubleSide, transparent: true, opacity: 0.7 }));
      ring.rotation.x = Math.PI / 2;
      fxGroup.add(ring);

      fxGroup.userData.onUpdate = function(dt) {
        stick.rotation.z += dt * 14;
      };
      playSfx("slash");

    } else {
      // 12. VẠN KIẾM QUY TÔNG (Kiếm Khí Hoàng Kim & 2 Phi Kiếm Hộ Vệ)
      const swordMat = new THREE.MeshBasicMaterial({ color: colorHex || 0xffd24a });
      const mainBlade = new THREE.Mesh(new THREE.ConeGeometry(0.32, 2.6, 4), swordMat);
      mainBlade.rotation.x = Math.PI / 2;
      const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.8, 4), new THREE.MeshBasicMaterial({ color: 0x8a6234 }));
      hilt.rotation.z = Math.PI / 2;
      hilt.position.z = -1.2;
      fxGroup.add(mainBlade);
      fxGroup.add(hilt);

      // 2 Kiếm hộ vệ hai bên sườn
      const subMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
      const sub1 = new THREE.Mesh(new THREE.ConeGeometry(0.18, 1.6, 4), subMat);
      sub1.rotation.x = Math.PI / 2;
      sub1.position.set(-0.75, 0.1, -0.4);
      const sub2 = new THREE.Mesh(new THREE.ConeGeometry(0.18, 1.6, 4), subMat);
      sub2.rotation.x = Math.PI / 2;
      sub2.position.set(0.75, 0.1, -0.4);
      fxGroup.add(sub1);
      fxGroup.add(sub2);
      playSfx("slash");
    }

    return fxGroup;
  }

  function spawnSkill3DFX(skill, attacker, target, onImpactCallback) {
    if (!target || !target.group || target.isDead) return;

    const startPos = attacker.mesh.position.clone();
    startPos.y += 1.6;
    const targetPos = target.group.position.clone();
    targetPos.y += (target.scale ? target.scale * 0.38 : 1.5);

    const colorHex = parseInt((skill.color || "#ffd24a").replace("#", "0x"), 16);
    const fxGroup = createSkillMesh(null, colorHex, skill);
    fxGroup.position.copy(startPos);
    fxGroup.lookAt(targetPos);
    scene.add(fxGroup);

    const dist = startPos.distanceTo(targetPos);
    const flightSpeed = 44.0;
    const flightTime = Math.max(0.1, dist / flightSpeed);

    activeSkillFX.push({
      mesh: fxGroup,
      startPos,
      targetPos,
      target,
      skill,
      timer: 0,
      totalTime: flightTime,
      onImpact: () => {
        spawnImpactBurstFX(target, skill);
        if (typeof onImpactCallback === "function") onImpactCallback();
        else resolveSkillImpact(skill, attacker, target, targetPos);
      }
    });
  }

  function spawnDirectionalSkill3DFX(skill, attacker, impactPos, onImpactCallback) {
    const startPos = attacker.mesh.position.clone();
    startPos.y += 1.6;

    const angle = attacker.facing;
    const range = 24.0;
    const targetPos = impactPos
      ? impactPos.clone()
      : new THREE.Vector3(
          startPos.x + Math.sin(angle) * range,
          startPos.y,
          startPos.z + Math.cos(angle) * range
        );
    if (impactPos) targetPos.y += 1.2;

    const colorHex = parseInt((skill.color || "#ffd24a").replace("#", "0x"), 16);
    const fxGroup = createSkillMesh(null, colorHex, skill);
    fxGroup.position.copy(startPos);
    fxGroup.lookAt(targetPos);
    scene.add(fxGroup);

    const flightTime = 0.55;
    activeSkillFX.push({
      mesh: fxGroup,
      startPos,
      targetPos,
      skill,
      timer: 0,
      totalTime: flightTime,
      onImpact: () => {
        if (typeof onImpactCallback === "function") onImpactCallback();
        else resolveSkillImpact(skill, attacker, null, targetPos);
      }
    });
  }

  function spawnSelfAuraFX(skill) {
    const pos = hero.mesh.position.clone();
    const group = new THREE.Group();
    group.position.copy(pos);

    const colorHex = parseInt((skill.color || "#ffd24a").replace("#", "0x"), 16);
    const auraRadius = skill.aura ? Math.max(1, Number(skill.radius) || 3.5) : 1.4;
    const ringGeo = new THREE.RingGeometry(skill.aura ? auraRadius * 0.88 : 0.8, auraRadius, 24);
    const ringMat = new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide, transparent: true, opacity: 0.95 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.15;
    group.add(ring);

    const pillarGeo = new THREE.CylinderGeometry(1.2, 1.2, 3.5, 16, 1, true);
    const pillarMat = new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide, transparent: true, opacity: 0.45 });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.y = 1.75;
    group.add(pillar);

    scene.add(group);
    activeImpactFX.push({
      group,
      ring,
      pillar,
      timer: 0,
      maxTime: 0.9,
      update: function(dt) {
        this.timer += dt;
        const p = this.timer / this.maxTime;
        const spread = skill.aura ? 1 + p * 0.22 : 1 + p * 2.5;
        ring.scale.set(spread, spread, 1);
        ringMat.opacity = Math.max(0, 1 - p);
        pillarMat.opacity = Math.max(0, 0.45 * (1 - p));
        if (p >= 1) {
          scene.remove(group);
          return false;
        }
        return true;
      }
    });
  }

  function spawnImpactBurstFX(target, skill) {
    if (!target || !target.group) return;
    const impactPos = target.group.position.clone();
    impactPos.y += 0.15;

    const group = new THREE.Group();
    group.position.copy(impactPos);

    const colorHex = parseInt((skill.color || "#ffd24a").replace("#", "0x"), 16);

    // Vòng sóng xung kích lan tỏa trên mặt đất
    const ringMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      depthWrite: false
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.6, 1.2, 24), ringMat);
    ring.rotation.x = -Math.PI / 2;
    group.add(ring);

    // 8 tia hạt năng lượng nổ tung tóe
    const particles = [];
    const pMat = new THREE.MeshBasicMaterial({ color: colorHex });
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2;
      const pMesh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 4, 4), pMat);
      pMesh.position.set(0, 1.0, 0);
      group.add(pMesh);
      particles.push({
        mesh: pMesh,
        vel: new THREE.Vector3(Math.cos(ang) * (4.0 + Math.random() * 2), 2.5 + Math.random() * 2, Math.sin(ang) * (4.0 + Math.random() * 2))
      });
    }

    scene.add(group);

    activeImpactFX.push({
      group,
      ring,
      particles,
      timer: 0,
      maxTime: 0.35
    });
  }

  // Công thức và nhịp thi triển bám theo dữ liệu skill của bản 2.5D.
  function skillKey(skill) {
    return `${hero.faction || "kiem"}:${skill && skill.name || "unknown"}`;
  }

  function skillValue(value, rank) {
    const lv = Math.max(1, Number(rank) || 1);
    if (Array.isArray(value)) {
      if (!value.length) return 0;
      if (Array.isArray(value[0])) {
        if (lv <= Number(value[0][0])) return Number(value[0][1]) || 0;
        for (let i = 1; i < value.length; i++) {
          const prev = value[i - 1], next = value[i];
          if (lv <= Number(next[0])) {
            const span = Math.max(1, Number(next[0]) - Number(prev[0]));
            const p = (lv - Number(prev[0])) / span;
            return (Number(prev[1]) || 0) + ((Number(next[1]) || 0) - (Number(prev[1]) || 0)) * p;
          }
        }
        return Number(value[value.length - 1][1]) || 0;
      }
      if (value.length === 1) return Number(value[0]) || 0;
      if (value.length === 2) return (Number(value[0]) || 0) + (Number(value[1]) || 0) * (lv - 1);
      return lv < 2 ? (Number(value[0]) || 0) : (Number(value[0]) || 0) + (Number(value[1]) || 0) + (Number(value[2]) || 0) * (lv - 2);
    }
    if (value && typeof value === "object") {
      if (Array.isArray(value.p)) {
        return (Number(value.b) || 0) + (Number(value.k) || 0) * skillValue(value.p, lv);
      }
      if (Number.isFinite(Number(value.b))) return Number(value.b) + (Number(value.k) || 0) * (lv - 1);
      return 0;
    }
    return Number.isFinite(Number(value)) ? Number(value) : 0;
  }

  function getSkillRank(skill) {
    const key = skillKey(skill);
    const saved = hero.skillLevels && (hero.skillLevels[key] ?? hero.skillLevels[skill.name]);
    const maxRank = Math.max(1, Number(skill && skill.max) || 20);
    if (Number.isFinite(Number(saved))) return Math.max(1, Math.min(maxRank, Math.floor(Number(saved))));
    const req = Math.max(1, Number(skill.req || skill.reqLv) || 1);
    return Math.max(1, Math.min(maxRank, Math.floor(Number(hero.lv || 1) - req + 1)));
  }
  window.getSkillRank3D = getSkillRank;

  function activeBuffStats() {
    const totals = Object.create(null);
    const faction = FACTION_SKILLS[hero.faction] || FACTION_SKILLS.kiem;
    const route = faction && faction.routes && faction.routes[hero.activeRouteIndex || 0];
    if (route) {
      for (const skill of route.skills || []) {
        if (skill.kind !== "passive" || Number(skill.req || 0) > Number(hero.lv || 1)) continue;
        const rank = getSkillRank(skill);
        for (const [key, value] of Object.entries(skill.stats || {})) {
          totals[key] = (totals[key] || 0) + skillValue(value, rank);
        }
      }
    }
    for (const entry of Object.values(hero.buffs || {})) {
      if (!entry || entry.remaining <= 0 || !entry.skill || !entry.skill.stats) continue;
      for (const [key, value] of Object.entries(entry.skill.stats)) {
        totals[key] = (totals[key] || 0) + skillValue(value, entry.rank);
      }
    }
    if (typeof window.getHeroCombatStats === "function") {
      const sheet = window.getHeroCombatStats() || {};
      for (const key of ["atkPct", "atkPt", "atkOutPct", "atkInPct", "dmgPct", "critAdd", "critDmg", "accPct", "aspdPct", "castPct", "speedPct", "hpPct", "mpPct", "hpPt", "mpPt", "hpRegen", "mpRegen", "hpRegPt", "mpRegPt", "hpRegHalf", "mpRegHalf", "dmgHan", "dmgHoaO", "dmgLoiO", "dmgDocO", "mFire", "mIce", "mLoi", "mPhys", "mPoison", "dmgPoison", "fireEnh", "loiEnh", "poisonEnh", "coldEnh", "leech", "mpLeech"]) {
        const value = Number(sheet[key]) || 0;
        if (value) totals[key] = (totals[key] || 0) + value;
      }
    }
    totals.hpRegPt = (Number(totals.hpRegPt) || 0) + (Number(totals.hpRegHalf) || 0) * 2;
    totals.mpRegPt = (Number(totals.mpRegPt) || 0) + (Number(totals.mpRegHalf) || 0) * 2;
    return totals;
  }

  function syncBuffVitals() {
    const stats = activeBuffStats();
    hero.maxHp = Math.max(1, Math.round((hero.baseMaxHp || 1397) * (1 + (stats.hpPct || 0) / 100) + (stats.hpPt || 0)));
    hero.maxMp = Math.max(1, Math.round((hero.baseMaxMp || 987) * (1 + (stats.mpPct || 0) / 100) + (stats.mpPt || 0)));
    hero.hp = Math.min(hero.hp, hero.maxHp);
    hero.mp = Math.min(hero.mp, hero.maxMp);
    updateVitalsUI();
  }
  window.syncHeroCombatVitals = syncBuffVitals;

  function commitMonsterDamage(target, damage, skill, isCrit) {
    if (!target || target.isDead || !target.group || damage <= 0) return false;
    const dmg = Math.max(1, Math.round(damage));
    target.hp = Math.max(0, target.hp - dmg);
    target.hitTimer = 0.25;
    target.backstepTimer = 0;
    playSfx("hit");
    spawnDamageText(
      target.group.position.x,
      target.group.position.y + (target.scale ? target.scale * 0.5 : 1.6),
      target.group.position.z,
      isCrit ? `💥 -${dmg.toLocaleString()} Bạo Kích!` : `-${dmg.toLocaleString()}`,
      isCrit ? "#ffd24a" : (skill && skill.color || "#ff3b30"),
      !!isCrit
    );

    if (target.billboard) target.billboard.updateHp(target.hp / target.maxHp, target === currentTarget);
    if (currentTarget === target && tgtF.classList.contains("show")) {
      const hpPct = Math.max(0, (target.hp / target.maxHp) * 100);
      tgtHpFill.style.width = hpPct + "%";
      tgtHpTxt.textContent = Math.round(hpPct) + "%";
    }

    if (target.hp <= 0 && target.type !== "dummy") {
      target.isDead = true;
      target.deadTimer = 8.0;
      target.dot = null;
      toast3D(`☠ Đã tiêu diệt <b style='color:#8ef0a0'>${target.name}</b>! Nhận ${target.lv * 180} Kinh nghiệm.`);
      if (target.colMesh) target.colMesh.visible = false;
      if (target.billboard && target.billboard.sprite) target.billboard.sprite.visible = false;
      if (target.sprite) target.sprite.visible = false;
      if (currentTarget === target) {
        targetRing.visible = false;
        tgtF.classList.remove("show");
        currentTarget = null;
      }
      checkQuestProgressOnMonsterKill(target);
    } else if (target.type === "dummy" && target.hp <= 0) {
      target.hp = target.maxHp;
      if (target.billboard) target.billboard.updateHp(1, target === currentTarget);
      if (currentTarget === target && tgtF.classList.contains("show")) {
        tgtHpFill.style.width = "100%";
        tgtHpTxt.textContent = "100%";
      }
    }
    return true;
  }

  function factionPveLevelBonus(faction, level) {
    const points = window.FACTION_PVE_LEVEL_CFG && window.FACTION_PVE_LEVEL_CFG[faction];
    if (!points) return 1;
    const entries = Object.entries(points)
      .map(([key, value]) => [Number(key.replace(/^cap/i, "")), Number(value)])
      .filter(([cap, value]) => Number.isFinite(cap) && Number.isFinite(value))
      .sort((a, b) => a[0] - b[0]);
    if (!entries.length) return 1;
    const lv = Math.max(1, Number(level) || 1);
    if (lv <= entries[0][0]) return entries[0][1];
    for (let i = 1; i < entries.length; i++) {
      const [nextLv, nextValue] = entries[i], [prevLv, prevValue] = entries[i - 1];
      if (lv <= nextLv) return prevValue + (nextValue - prevValue) * (lv - prevLv) / (nextLv - prevLv);
    }
    return entries[entries.length - 1][1];
  }

  function skillMasteryBonus(skill) {
    if (!skill || !skill.name) return 0;
    const faction = FACTION_SKILLS[hero.faction] || FACTION_SKILLS.kiem;
    const routes = faction && faction.routes || [];
    let bonus = 0;
    for (const route of routes) {
      for (const candidate of route.skills || []) {
        const mastery = candidate.boost && candidate.boost[skill.name];
        if (mastery) bonus += skillValue(mastery, getSkillRank(candidate)) / 100;
      }
    }
    if (Number(skill.vl) === 90 && !skill.jxd) {
      for (const route of routes) {
        const containing = (route.skills || []).includes(skill);
        if (!containing) continue;
        for (const candidate of route.skills || []) {
          if (candidate.vl >= 10 && candidate.vl <= 60) bonus += getSkillRank(candidate) * .5 / 100;
        }
        break;
      }
    }
    return Math.max(0, bonus);
  }

  function applySkillDamage(skill, target, scale = 1, knockbackOverride = null) {
    if (!skill || !target || target.isDead) return null;
    const facKey = hero.faction || "kiem";
    const faction = FACTION_SKILLS[facKey] || FACTION_SKILLS.kiem;
    const buffs = activeBuffStats();
    const rank = getSkillRank(skill);
    const characterStats = typeof window.getHeroCombatStats === "function" ? (window.getHeroCombatStats() || {}) : {};
    const physical = skill.dmgT === "best"
      ? (Number(characterStats.atkN) || 0) >= (Number(characterStats.atkI) || 0)
      : skill.dmgT !== "noi";
    const accuracyBonus = skillValue(skill.accP || 0, rank) + (buffs.accPct || 0);
    if (physical) {
      const accuracy = (Number(characterStats.accuracy) || 0) * (1 + accuracyBonus / 100);
      const level = Number(target.lv) || 1;
      let hitChance = Math.max(.55, Math.min(.97, accuracy / (accuracy + level * 8 + 10) + .15));
      hitChance += (1 - hitChance) * Math.max(0, skillValue(skill.ign || 0, rank)) / 100;
      if (Math.random() > hitChance) {
        spawnDamageText(target.group.position.x, target.group.position.y + (target.scale || 3) * .5, target.group.position.z, "Né", "#b8b0a0", false);
        if (Array.isArray(skill.psn)) applySkillPoison(skill, target);
        return { damage: 0, critical: false, hit: false };
      }
    }

    const masteryBonus = skillMasteryBonus(skill);
    const baseMult = Math.max(0, skillValue(skill.mult == null ? 1 : skill.mult, rank));
    const mult = Math.max(0, skill.jxd ? baseMult + masteryBonus : baseMult * (1 + masteryBonus));
    const skillScale = Math.max(0, Number(scale) || 0);
    const atkPct = (Number(buffs.atkPct) || 0) + (Number(buffs.dmgPct) || 0);
    const atkM = (Number(characterStats.atkM) || 1) * (1 + atkPct / 100);
    const attackStat = physical ? Number(characterStats.atkN) || 0 : Number(characterStats.atkI) || 0;
    const attackPct = physical
      ? (Number(characterStats.atkOutPct) || 0) + (Number(buffs.atkOutPct) || 0)
      : (Number(characterStats.atkInPct) || 0) + (Number(buffs.atkInPct) || 0);
    const coefficient = mult * skillScale + attackPct / 100;
    const strFlat = physical ? Math.max(0, Number(skill.strFlat) || 0) : 0;
    const sourceStrength = Number(characterStats.strength) || 0;
    const baseDamage = strFlat
      ? Math.max(0, attackStat - .3 * sourceStrength + 48) * coefficient * atkM + sourceStrength * strFlat
      : (attackStat + 48) * coefficient * atkM;
    const variance = .9 + Math.random() * .2;
    const defense = Math.max(0, Number(target.def) || (Number(target.lv) || 1) * .72);
    const heroElement = String(faction && (faction.elKey || faction.element) || "tho").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase();
    const monsterElement = String(target.element || "tho").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase();
    const counter = { kim: "moc", moc: "tho", tho: "thuy", thuy: "hoa", hoa: "kim" };
    let elemMult = counter[heroElement] === monsterElement ? 1.5 : counter[monsterElement] === heroElement ? .7 : 1;
    if (elemMult > 1 && skill.khac) elemMult += skillValue(skill.khac, rank) / 100;
    const elementResistance = Math.max(0, Math.min(75, Number(target.elementResist) || 0));
    let jxDamage = 0;
    const rollSkillRange = value => {
      if (!Array.isArray(value) || value.length < 2) return skillValue(value || 0, rank);
      const low = skillValue(value[0], rank), high = skillValue(value[1], rank);
      return Math.min(low, high) + Math.random() * Math.abs(high - low);
    };
    if (skill.flat) jxDamage += rollSkillRange(skill.flat);
    if (skill.fire) jxDamage += rollSkillRange(skill.fire) * (1 + (Number(buffs.fireEnh) || 0) / 100);
    if (skill.loi) jxDamage += rollSkillRange(skill.loi) * (1 + (Number(buffs.loiEnh) || 0) / 100);
    const physicalElementBonus = (Number(characterStats.eleDmg) || 0)
      + (Number(buffs.dmgHan) || 0)
      + (Number(buffs.dmgHoaO) || 0)
      + (Number(buffs.dmgLoiO) || 0);
    const internalElementBonus = (Number(characterStats.eleIn) || 0)
      + (Number(buffs.mIce) || 0)
      + (Number(buffs.mFire) || 0)
      + (Number(buffs.mLoi) || 0)
      + (Number(buffs.mPhys) || 0);
    const typedBonus = physical
      ? physicalElementBonus + jxDamage
      : (internalElementBonus + jxDamage) * (1 + attackPct / 100);
    let damage = Math.max(1, Math.round((baseDamage * variance - defense * .5) * elemMult * (1 - elementResistance / 100) + (physical ? Number(characterStats.atkOut) || 0 : Number(characterStats.atkIn) || 0) + typedBonus));

    const critBonus = skillValue(skill.critP || 0, rank) + skillValue(skill.critAdd || 0, rank) + (buffs.critAdd || 0);
    const critChance = Math.max(Number(hero.critChance) || 0, Number(characterStats.critFromAttributes) || 0) + critBonus;
    const isCrit = Math.random() * 100 < critChance;
    if (isCrit) damage = Math.round(damage * (1.8 + ((Number(hero.critDamage) || 0) + (Number(characterStats.critDmg) || 0) + (Number(buffs.critDmg) || 0)) / 100));
    const pveBonus = Number((window.FACTION_PVE_CFG || {})[facKey] ?? 1);
    damage = Math.max(1, Math.round(damage * pveBonus * factionPveLevelBonus(facKey, hero.lv)));
    const iceMin = skillValue(skill.ice || 0, rank);
    const iceMax = skill.iceMax ? skillValue(skill.iceMax, rank) : iceMin;
    // 2.5D averages the two learned ice curves first, then applies its ±15% roll.
    const iceBonus = (iceMin + iceMax) / 2;
    if (iceBonus > 0) damage += Math.round(iceBonus * (.85 + Math.random() * .3));
    const hit = commitMonsterDamage(target, damage, skill, isCrit);
    if (hit && target.group && target.type !== "dummy") {
      let knockback = knockbackOverride == null
        ? skill.wkb == null
          ? skill.type === "melee" ? (Number(skill.combo) > 1 ? 0.04 : 0.22 + 0.12 * (Number(skill.tier) || 1))
            : skill.type === "aoeSelf" ? 0.45
              : skill.type === "aoeTarget" ? 0.3
                : skill.type === "wave" ? 0.6 : 0
          : Number(skill.wkb) || 0
        : Number(knockbackOverride) || 0;
      if (String(target.type || "").includes("boss")) knockback *= 0.25;
      if (knockback > 0) {
        const awayX = target.group.position.x - hero.mesh.position.x;
        const awayZ = target.group.position.z - hero.mesh.position.z;
        const length = Math.hypot(awayX, awayZ);
        if (length > 0.001) target.group.position.set(target.group.position.x + awayX / length * knockback, target.group.position.y, target.group.position.z + awayZ / length * knockback);
      }
    }
    if (hit && window.emitSkillImpactFx) {
      window.emitSkillImpactFx(skill, target, isCrit);
    }
    const hpLeechPct = skillValue(skill.leech || 0, rank) + (buffs.leech || 0);
    if (hit && hpLeechPct > 0) {
      const heal = Math.round(damage * Math.max(0, hpLeechPct) / 100);
      if (heal > 0) {
        hero.hp = Math.min(hero.maxHp, hero.hp + heal);
        spawnDamageText(hero.mesh.position.x, hero.mesh.position.y + 2.2, hero.mesh.position.z, `+${heal} Sinh Lực`, "#8ef0a0", false);
        updateVitalsUI();
      }
    }
    const mpLeechPct = skillValue(skill.mpL || 0, rank) + (buffs.mpLeech || 0);
    if (hit && mpLeechPct > 0) {
      const mpGain = Math.round(damage * Math.max(0, mpLeechPct) / 100);
      hero.mp = Math.min(hero.maxMp, hero.mp + mpGain);
      if (mpGain > 0) updateVitalsUI();
    }
    return { damage, critical: isCrit, hit };
  }

  function applySkillPoison(skill, target) {
    if (!Array.isArray(skill && skill.psn) || !target || target.isDead) return;
    const rank = getSkillRank(skill);
    const tickFrames = Math.max(1, skillValue(skill.psn[2], rank));
    const tickDamage = Math.max(1, skillValue(skill.psn[0], rank) * 18 / tickFrames);
    const duration = Math.max(.5, skillValue(skill.psn[1], rank) / 18);
    const characterStats = typeof window.getHeroCombatStats === "function" ? (window.getHeroCombatStats() || {}) : {};
    const buffs = activeBuffStats();
    const poisonEnh = (Number(characterStats.poisonEnh) || 0) + (Number(buffs.poisonEnh) || 0);
    const pveBonus = Number((window.FACTION_PVE_CFG || {})[hero.faction] ?? 1) * factionPveLevelBonus(hero.faction, hero.lv);
    const dps = Math.max(1, Math.round(tickDamage * pveBonus));
    const existing = target.dot;
    const base = Math.max(dps, Number(existing && existing.base) || Number(existing && existing.dps) || 0);
    target.dot = {
      remaining: Math.max(duration * (1 + poisonEnh / 100), existing && existing.remaining || 0),
      tickIn: existing ? Math.min(existing.tickIn, .5) : .5,
      dps: Math.min(dps + (existing && existing.dps || 0), base * 5),
      base, color: skill.color || "#8fe06a", skill
    };
  }

  function applyBonusPoison(skill, target) {
    if (!skill || !target || target.isDead) return;
    const characterStats = typeof window.getHeroCombatStats === "function" ? (window.getHeroCombatStats() || {}) : {};
    const physical = skill.dmgT === "best"
      ? (Number(characterStats.atkN) || 0) >= (Number(characterStats.atkI) || 0)
      : skill.dmgT !== "noi";
    if (!physical) return;
    const buffs = activeBuffStats();
    const poisonAttack = Math.max(0,
      (Number(characterStats.dmgPoison) || 0)
      + (Number(buffs.dmgDocO) || 0)
      + (Number(buffs.mPoison) || 0));
    if (poisonAttack <= 0) return;

    // The 2.5D gear/inner-power poison adds half its value as a 3-second poison.
    const dps = Math.max(1, Math.round(poisonAttack * .5));
    const existing = target.dot;
    const base = Math.max(dps, Number(existing && existing.base) || Number(existing && existing.dps) || 0);
    target.dot = {
      remaining: Math.max(3, existing && existing.remaining || 0),
      tickIn: existing ? Math.min(existing.tickIn, .5) : .5,
      dps: Math.min(dps + (existing && existing.dps || 0), base * 5),
      base,
      color: skill.color || "#8fe06a",
      skill
    };
  }

  function applySkillStatus(skill, target, damageResult) {
    if (!skill || !target || target.isDead) return;
    const rank = getSkillRank(skill);
    if (skill.stun) target.stunTimer = Math.max(target.stunTimer || 0, skillValue(skill.stun, rank));
    if (Array.isArray(skill.stunP)) {
      const stunChance = Math.max(0, Math.min(100, skillValue(skill.stunP[0], rank)));
      // Bản 2.5D lưu thời gian khống chế theo frame ở 18 FPS.
      const stunDuration = Math.max(0, skillValue(skill.stunP[1], rank) / 18);
      if (stunDuration > 0 && !String(target.type || "").includes("boss") && Math.random() * 100 < stunChance) {
        target.stunTimer = Math.max(target.stunTimer || 0, stunDuration);
        if (target.group) {
          spawnDamageText(
            target.group.position.x,
            target.group.position.y + 1.8,
            target.group.position.z,
            "Choáng!",
            "#ffe27a",
            false
          );
        }
      }
    }
    if (skill.slow) {
      const pct = Math.max(0, Math.min(90, skillValue(skill.slow[0], rank)));
      const duration = Math.max(0, skillValue(skill.slow[1], rank));
      target.slowPct = Math.max(target.slowPct || 0, pct);
      target.slowTimer = Math.max(target.slowTimer || 0, duration);
    }
    if (skill.root) target.rootTimer = Math.max(target.rootTimer || 0, skillValue(skill.root, rank));
    if (skill.ice && damageResult && damageResult.hit) {
      const characterStats = typeof window.getHeroCombatStats === "function" ? (window.getHeroCombatStats() || {}) : {};
      const physical = skill.dmgT !== "noi";
      const baseDuration = skill.coldT
        ? skillValue(skill.coldT, rank) / 18
        : physical ? 1.5 : 2;
      const coldEnh = (Number(characterStats.coldEnh) || 0) + (Number(activeBuffStats().coldEnh) || 0);
      const duration = baseDuration * (1 + Math.max(0, coldEnh) / 100);
      target.slowPct = Math.max(target.slowPct || 0, 45 * (1 - Math.min(75, Number(characterStats.iceResist) || 0) / 100));
      target.slowTimer = Math.max(target.slowTimer || 0, duration);
    }
    if (damageResult && damageResult.hit) {
      if (Array.isArray(skill.psn)) applySkillPoison(skill, target);
      else applyBonusPoison(skill, target);
    }
    if (skill.dot && damageResult && damageResult.damage > 0) {
      const pct = Math.max(0, (Number(skill.dot[0]) || 0) * (1 + 0.08 * (rank - 1)));
      const duration = Math.max(0.5, Number(skill.dot[1]) || 0);
      const buffs = activeBuffStats();
      const characterStats = typeof window.getHeroCombatStats === "function" ? (window.getHeroCombatStats() || {}) : {};
      const dotAttack = ((Number(characterStats.atkN) || 0) + 48)
        * (1 + ((characterStats.atkOutPct || 0) + (buffs.atkOutPct || 0)) / 100)
        * (Number(characterStats.atkM) || 1)
        * (1 + ((buffs.atkPct || 0) + (buffs.dmgPct || 0)) / 100);
      const dps = Math.max(1, Math.round(dotAttack * pct / 100));
      const existing = target.dot;
      target.dot = {
        remaining: Math.max(duration, existing && existing.remaining || 0),
        tickIn: existing ? Math.min(existing.tickIn, 0.5) : 0.5,
        dps: Math.min(dps * 5, dps + (existing && existing.dps || 0)),
        color: skill.color || "#7aff9a",
        skill
      };
    }
    if (skill.kind === "curse" && skill.curse) {
      target.debuffs = target.debuffs || {};
      const curseDuration = Math.max(0, skillValue(skill.curse.dur == null ? 0 : skill.curse.dur, rank));
      if (curseDuration > 0) target.debuffs[skillKey(skill)] = { skill, rank, remaining: curseDuration };
      else delete target.debuffs[skillKey(skill)];
      if (skill.curse.spd) {
        target.slowPct = Math.max(target.slowPct || 0, Math.min(90, skillValue(skill.curse.spd, rank)));
        target.slowTimer = Math.max(target.slowTimer || 0, curseDuration);
      }
      if (skill.curse.stunT && !skill.curse.stunP) target.stunTimer = Math.max(target.stunTimer || 0, skillValue(skill.curse.stunT, rank));
      if (skill.curse.stunP && !String(target.type || "").includes("boss") && Math.random() * 100 < skillValue(skill.curse.stunP, rank)) {
        target.stunTimer = Math.max(target.stunTimer || 0, skillValue(skill.curse.stunT || 0.5, rank));
        if (target.group) spawnDamageText(
          target.group.position.x,
          target.group.position.y + 1.8,
          target.group.position.z,
          "Hôn mê!",
          "#d0b0ff",
          false
        );
      }
    }
  }

  function skillControlDurationScale(target) {
    let extension = 0;
    for (const debuff of Object.values(target && target.debuffs || {})) {
      const curse = debuff && debuff.skill && debuff.skill.curse;
      if (curse && curse.ext) extension = Math.max(extension, skillValue(curse.ext, debuff.rank));
    }
    return 1 + Math.max(0, extension) / 100;
  }

  function skillAimVector(skill, attacker, primaryTarget, impactPos) {
    const origin = attacker.mesh.position;
    const aim = primaryTarget && primaryTarget.group ? primaryTarget.group.position : impactPos;
    let dx = aim ? aim.x - origin.x : 0;
    let dz = aim ? aim.z - origin.z : 0;
    let length = Math.hypot(dx, dz);
    if (length < 0.001) {
      dx = Math.sin(attacker.facing || 0);
      dz = Math.cos(attacker.facing || 0);
      length = Math.hypot(dx, dz) || 1;
    }
    return { dx: dx / length, dz: dz / length, length };
  }

  function skillWaveRays(skill, attacker, primaryTarget, impactPos) {
    const aim = skillAimVector(skill, attacker, primaryTarget, impactPos);
    const rank = getSkillRank(skill);
    const directionAngle = Math.atan2(aim.dz, aim.dx);
    let count = 1, step = Number(skill.fanA) || 0.26;
    if (skill.free8) count = 8;
    else if (skill.freeDragon) count = rank >= 9 ? Math.max(1, rank - 8) : 1;
    else if (skill.palmN) count = Math.max(1, Math.floor(Number(skill.palmN) || 1));
    else if (skill.iceRing) count = rank >= 20 ? 3 : rank >= 15 ? 2 : 1;
    else if (skill.lanceN) count = Math.min(5, 1 + Math.floor(Math.max(1, rank) / 5));
    else if (skill.swordN) count = Math.min(5, 3 + Math.floor(Math.max(1, rank) / 10));
    else count = Math.max(1, Math.min(24, Math.floor(Number(skill.fan) || 1)));

    const radius = Math.max(0.5, Number(skill.wR) || (skill.free8 || skill.freeDragon
      ? (Number(skill.range) || 6) + 1.5
      : Math.max(Number(skill.range) || 6, aim.length) + 1.5));
    let width = Number(skill.ww) || (count > 1 ? 0.6 : 0.8);
    if (skill.lanceN) width = Number(skill.ww) || 0.7;
    if (skill.swordN) width = Number(skill.ww) || 0.6;
    if (skill.wstyle === "icedart") width = Number(skill.ww) || 0.5;

    const rays = [];
    for (let i = 0; i < count; i++) {
      let angle = directionAngle;
      if (skill.free8) angle += i * Math.PI / 4;
      else if (skill.freeDragon && count > 1) angle += (i / (count - 1) - 0.5) * Math.min(Math.PI * 1.2, 0.22 * (count - 1));
      else if (count > 1 && !skill.palmN) angle += (i - (count - 1) / 2) * step;
      rays.push({ dx: Math.cos(angle), dz: Math.sin(angle), range: radius, width, index: i });
    }
    return rays;
  }

  function resolveSkillTargets(skill, attacker, primaryTarget, impactPos) {
    if (!skill || !attacker || !attacker.mesh) return [];
    const live = monsters.filter(mon => !mon.isDead && mon.group);
    const origin = attacker.mesh.position;
    const center = skill.type === "aoeSelf" ? origin : (impactPos || primaryTarget && primaryTarget.group && primaryTarget.group.position || origin);
    const distanceToCenter = mon => Math.hypot(mon.group.position.x - center.x, mon.group.position.z - center.z);
    const cap = Math.max(1, Math.floor(Number(skill.hitMax) || 64));
    const sizeRadius = mon => Math.max(0.25, (Number(mon.scale) || 3) * 0.16);

    if (skill.type === "wave" || skill.free8 || skill.freeDragon) {
      const rays = skillWaveRays(skill, attacker, primaryTarget, impactPos);
      const hits = new Map();
      const firstHitOnly = ["icelance", "frostsword", "icedart"].includes(skill.wstyle);
      for (const ray of rays) {
        const crossed = live.map(mon => {
          const mx = mon.group.position.x - origin.x, mz = mon.group.position.z - origin.z;
          const along = mx * ray.dx + mz * ray.dz;
          const across = Math.abs(mx * ray.dz - mz * ray.dx);
          return { mon, along, across };
        }).filter(({ mon, along, across }) => along >= 0 && along <= ray.range + sizeRadius(mon) && across <= ray.width + sizeRadius(mon))
          .sort((a, b) => a.along - b.along);
        for (const { mon } of (firstHitOnly ? crossed.slice(0, 1) : crossed)) hits.set(mon, (hits.get(mon) || 0) + 1);
      }
      return [...hits.keys()].slice(0, cap);
    }

    if (skill.type === "aoeSelf" || skill.type === "aoeTarget") {
      const radius = Math.max(0.5, Number(skill.radius) || (skill.type === "aoeSelf" ? 2.4 : 2.2));
      return live.filter(mon => distanceToCenter(mon) <= radius + sizeRadius(mon))
        .sort((a, b) => distanceToCenter(a) - distanceToCenter(b)).slice(0, cap);
    }

    if (skill.coins) {
      const reach = Math.max(6, Number(skill.range) || 7);
      return live.filter(mon => mon.group.position.distanceTo(origin) <= reach + sizeRadius(mon))
        .sort((a, b) => a.group.position.distanceTo(origin) - b.group.position.distanceTo(origin)).slice(0, cap);
    }

    if (skill.type === "multi" && primaryTarget) {
      const count = Math.max(1, Math.min(24, Math.floor(Number(skill.count) || 1)));
      return [primaryTarget, ...live.filter(mon => mon !== primaryTarget && mon.group.position.distanceTo(primaryTarget.group.position) < 5)
        .sort((a, b) => a.group.position.distanceTo(primaryTarget.group.position) - b.group.position.distanceTo(primaryTarget.group.position))]
        .filter((mon, index, all) => !mon.isDead && all.indexOf(mon) === index).slice(0, Math.min(count, cap));
    }

    if (skill.type === "homing" && primaryTarget) {
      if (skill.one || skill.pstyle === "dragon" || skill.pstyle === "bamboo") return [primaryTarget];
      const count = Math.max(1, Math.min(24, Math.floor(Number(skill.count) || 1)));
      return [primaryTarget, ...live.filter(mon => mon !== primaryTarget && mon.group.position.distanceTo(primaryTarget.group.position) < 5)
        .sort((a, b) => a.group.position.distanceTo(primaryTarget.group.position) - b.group.position.distanceTo(primaryTarget.group.position))]
        .filter((mon, index, all) => !mon.isDead && all.indexOf(mon) === index).slice(0, Math.min(count, cap));
    }

    if (primaryTarget && !primaryTarget.isDead) return [primaryTarget];
    return [];
  }
  window.getSkillTargets3D = (skill, target, impactPos) => resolveSkillTargets(skill, hero, target, impactPos);
  window.getProjectileCandidates3D = () => monsters.filter(mon => !mon.isDead && mon.group && mon.type !== "dummy");

  function skillDragonShotCount(skill, rank) {
    const count = Math.max(1, Math.floor(Number(skill.count) || 1));
    return count >= 4 ? 4 : Math.min(4, count + Math.floor((Math.max(1, rank) - 1) / 3));
  }

  function armSkillTrap3D(skill, x, z) {
    const radius = Math.max(0.9, (Number(skill.radius) || 2) * 0.5);
    const trap = {
      skill, x, z, radius, rank: getSkillRank(skill), armIn: 0.5, remaining: 10,
      chain: Math.max(1, Math.min(6, Math.floor(Number(skill.chain) || 1))),
    mark: window.addSkillTrapFx3D ? window.addSkillTrapFx3D(x, z, radius, skill.color, 10, skill.glyph || "陷") : null
    };
    if (skillTraps3D.length >= 6) {
      const oldest = skillTraps3D.shift();
      if (window.removeSkillTrapFx3D) window.removeSkillTrapFx3D(oldest.mark);
    }
    skillTraps3D.push(trap);
    toast3D(`🪤 Đã đặt <b style='color:${skill.color || "#b8f08a"}'>${skill.name}</b>; bẫy sẽ nổ khi quái bước vào.`);
  }

  function detonateSkillTrap3D(trap, pulse = 0) {
    if (window.emitSkillAreaFx3D) window.emitSkillAreaFx3D(trap.skill, trap.x, trap.z, trap.radius);
    const scale = trap.chain > 1 ? 0.5 : 1;
    for (const mon of monsters) {
      if (mon.isDead || !mon.group) continue;
      const distance = Math.hypot(mon.group.position.x - trap.x, mon.group.position.z - trap.z);
      if (distance > trap.radius + (Number(mon.scale) || 3) * 0.16) continue;
      const result = applySkillDamage(trap.skill, mon, scale);
      if (result && result.hit) applySkillStatus(trap.skill, mon, result);
    }
    if (pulse === 0) skillTrapBurns3D.push({
      skill: trap.skill, x: trap.x, z: trap.z, radius: Math.max(1, Number(trap.skill.radius) || 2),
      remaining: 2.5, next: 0.5, nextIn: 0.5, statusSkill: { ...trap.skill, stun: 0, stunP: null, wkb: null }
    });
  }

  function updateSkillTraps(dt) {
    for (let i = skillTrapBurns3D.length - 1; i >= 0; i--) {
      const burn = skillTrapBurns3D[i];
      burn.remaining -= dt;
      burn.nextIn -= dt;
      while (burn.nextIn <= 0 && burn.remaining > 0) {
        burn.nextIn += 0.5;
        for (const mon of monsters) {
          if (mon.isDead || !mon.group || Math.hypot(mon.group.position.x - burn.x, mon.group.position.z - burn.z) > burn.radius + (Number(mon.scale) || 3) * 0.16) continue;
          const result = applySkillDamage(burn.skill, mon, 0.15);
          if (result && result.hit) applySkillStatus(burn.statusSkill, mon, result);
        }
      }
      if (burn.remaining <= 0) skillTrapBurns3D.splice(i, 1);
    }
    for (let i = skillTraps3D.length - 1; i >= 0; i--) {
      const trap = skillTraps3D[i];
      trap.remaining -= dt;
      trap.armIn -= dt;
      if (trap.remaining <= 0) {
        if (window.removeSkillTrapFx3D) window.removeSkillTrapFx3D(trap.mark);
        skillTraps3D.splice(i, 1);
        continue;
      }
      if (trap.armIn > 0) continue;
      const triggered = monsters.some(mon => !mon.isDead && mon.group && Math.hypot(mon.group.position.x - trap.x, mon.group.position.z - trap.z) <= trap.radius);
      if (!triggered) continue;
      if (window.removeSkillTrapFx3D) window.removeSkillTrapFx3D(trap.mark);
      skillTraps3D.splice(i, 1);
      detonateSkillTrap3D(trap, 0);
      for (let pulse = 1; pulse < trap.chain; pulse++) setTimeout(() => detonateSkillTrap3D(trap, pulse), pulse * 260);
    }
  }

  function resolveSkillImpact(skill, attacker, target, impactPos, event = {}) {
    if (!skill || !attacker || !attacker.mesh) return;
    if (event && event.type === "trap") {
      armSkillTrap3D(skill, Number(event.x) || 0, Number(event.z) || 0);
      return;
    }
    if (event && event.type === "iceRing") {
      const radius = Math.max(0.5, Number(event.radius) || Number(skill.iceRing) || 2);
      const centerX = Number.isFinite(Number(event.x)) ? Number(event.x) : attacker.mesh.position.x;
      const centerZ = Number.isFinite(Number(event.z)) ? Number(event.z) : attacker.mesh.position.z;
      for (const mon of monsters) {
        if (!mon || mon.isDead || !mon.group || mon.type === "dummy") continue;
        const dx = mon.group.position.x - centerX, dz = mon.group.position.z - centerZ;
        const distance = Math.hypot(dx, dz);
        if (distance > radius + (Number(mon.scale) || 3) * 0.16) continue;
        const close = distance < 1.3;
        if (close && distance > 0.7 && !String(mon.type || "").includes("boss")) {
          const pull = Math.min(0.45, distance - 0.7) / distance;
          mon.group.position.x -= dx * pull;
          mon.group.position.z -= dz * pull;
        }
        const ringSkill = { ...skill, slow: [35, 2.5], pullIn: false, wkb: 0 };
        const result = applySkillDamage(skill, mon, close ? 0.6 : 0.4, 0);
        if (result && result.hit) applySkillStatus(ringSkill, mon, result);
      }
      return;
    }
    if (event && ["waveComplete", "coinsComplete", "projComplete", "homingComplete", "multiComplete", "undefinedComplete"].includes(event.type)) return;
    if (event && ["waveHit", "coinHit", "projectileHit"].includes(event.type)) {
      const hitTarget = event.target;
      if (!hitTarget || hitTarget.isDead) return;
      if (skill.saw && event.type === "projectileHit") {
        const first = applySkillDamage(skill, hitTarget, 0.4);
        if (first && first.hit) applySkillStatus(skill, hitTarget, first);
        const centerX = Number.isFinite(Number(event.x)) ? Number(event.x) : hitTarget.group.position.x;
        const centerZ = Number.isFinite(Number(event.z)) ? Number(event.z) : hitTarget.group.position.z;
        for (const mon of monsters) {
          if (mon.isDead || !mon.group || mon.type === "dummy" || String(mon.type || "").includes("boss")) continue;
          if (Math.hypot(mon.group.position.x - centerX, mon.group.position.z - centerZ) <= 1.6) {
            mon.pullTarget3D = { x: centerX, z: centerZ };
            mon.pullTimer3D = 1.1;
          }
        }
        for (let i = 0; i < 4; i++) setTimeout(() => {
          const pulseTargets = monsters.filter(mon => !mon.isDead && mon.group
            && Math.hypot(mon.group.position.x - centerX, mon.group.position.z - centerZ) <= 1.4 + (Number(mon.scale) || 3) * 0.16)
            .sort((a, b) => Math.hypot(a.group.position.x - centerX, a.group.position.z - centerZ) - Math.hypot(b.group.position.x - centerX, b.group.position.z - centerZ))
            .slice(0, 2);
          for (const mon of pulseTargets) {
            const result = applySkillDamage(skill, mon, 0.2);
            if (result && result.hit) applySkillStatus(skill, mon, result);
          }
        }, 250 * (i + 1));
        if (getSkillRank(skill) >= (Number(skill.burstLv) || Infinity)) {
          const shards = monsters.filter(mon => mon !== hitTarget && !mon.isDead && mon.group
            && Math.hypot(mon.group.position.x - centerX, mon.group.position.z - centerZ) <= 2.6 + (Number(mon.scale) || 3) * 0.16)
            .sort((a, b) => Math.hypot(a.group.position.x - centerX, a.group.position.z - centerZ) - Math.hypot(b.group.position.x - centerX, b.group.position.z - centerZ))
            .slice(0, 3);
          for (const mon of shards) {
            const shardSkill = { ...skill, type: "proj", pstyle: "needle", saw: false, burstLv: null, goldLv: null };
            const onShardHit = shardEvent => {
              if (!shardEvent || shardEvent.type !== "projectileHit") return;
              const shardTarget = shardEvent.target;
              const result = applySkillDamage(skill, shardTarget, 0.1);
              if (result && result.hit) applySkillStatus(skill, shardTarget, result);
            };
            if (window.castAuthenticSkill) window.castAuthenticSkill(shardSkill, attacker, mon, onShardHit);
            else {
              const result = applySkillDamage(skill, mon, 0.1);
              if (result && result.hit) applySkillStatus(skill, mon, result);
            }
          }
        }
        return;
      }
      const statusSkill = event.statusSkill || (event.returning ? { ...skill, stun: 0, stunP: null } : skill);
      const result = applySkillDamage(skill, hitTarget, Number(event.scale) || (event.type === "coinHit" ? 0.35 : skill.palmN ? Number(skill.palmFrac) || 0.3 : 1), event.knockback);
      if (result && result.hit) {
        applySkillStatus(statusSkill, hitTarget, result);
      }
      if (event.type === "waveHit" && skill.splashK && skill.wstyle === "crescent") {
        for (const nearby of monsters) {
          if (nearby === hitTarget || nearby.isDead || !nearby.group) continue;
          if (nearby.group.position.distanceTo(hitTarget.group.position) <= 2.3) applySkillDamage(skill, nearby, Number(skill.splashK) || 0.5);
        }
      }
      return;
    }
    const targets = resolveSkillTargets(skill, attacker, target, impactPos);
    const areaStrikesExist = event && event.areaFx && Array.isArray(event.areaFx.items) && (Number(skill.boltHit) > 0 || Number(skill.dropHit) > 0);
    if (!targets.length && !areaStrikesExist) return;
    const rank = getSkillRank(skill);
    const visual = window.VFX && (window.VFX[skill.name] || window.VFX[window.VFX_ALIAS && window.VFX_ALIAS[skill.name]]) || {};
    const area = visual.area || {};
    const hitMax = Math.max(1, Math.floor(Number(skill.hitMax) || 64));
    const schedule = [];
    const push = (mon, scale = 1, delay = 0, statusSkill = skill, knockbackOverride = null) => {
      if (!mon || mon.isDead || schedule.length >= hitMax * 24) return;
      schedule.push({ mon, scale: Math.max(0, Number(scale) || 0), delay: Math.max(0, Number(delay) || 0), statusSkill, knockbackOverride });
    };

    if (skill.type === "melee") {
      const combo = Math.max(1, Math.floor(Number(skill.combo) || 1));
      const times = Array.isArray(skill.comboT) ? skill.comboT : Array.from({ length: combo }, (_, i) => i * 0.2);
      const comboScale = combo > 1 ? 1.2 / combo : 1;
      for (const mon of targets.slice(0, hitMax)) {
        for (let i = 0; i < combo; i++) push(mon, comboScale, Number(times[i]) || 0);
        if (skill.finSpin && mon.group) {
          const finTime = Number(times[combo - 1]) || 0;
          for (const nearby of monsters) {
            if (nearby === mon || nearby.isDead || !nearby.group) continue;
            if (nearby.group.position.distanceTo(mon.group.position) <= 2.3) push(nearby, comboScale, finTime, { ...skill, wkb: 0.45, pullIn: false }, 0.45);
          }
        }
        if (skill.dash && mon.group) {
          for (const nearby of monsters) {
            if (nearby === mon || nearby.isDead || !nearby.group) continue;
            if (nearby.group.position.distanceTo(mon.group.position) <= 1.6) push(nearby, 0.6, 0);
          }
        }
      }
    } else if (skill.palmN && skill.type === "wave") {
      const pulseCount = Math.max(1, Math.floor(Number(skill.palmN) || 1));
      const frac = Number(skill.palmFrac) || 0.3;
      for (const mon of targets.slice(0, hitMax)) for (let i = 0; i < pulseCount; i++) {
        const delay = i * (Number(skill.palmGap) || 0.2);
        push(mon, frac, delay, i === 0 ? skill : { ...skill, stun: 0, stunP: null });
        push(mon, frac, delay + (Number(skill.wR) || 3.2) * 2 / Math.max(1, Number(skill.wspd) || 13), { ...skill, stun: 0, stunP: null });
      }
    } else if (skill.type === "wave" || skill.free8 || skill.freeDragon) {
      const rays = skillWaveRays(skill, attacker, target, impactPos);
      const firstHitOnly = ["icelance", "frostsword", "icedart"].includes(skill.wstyle);
      const rayHits = new Map();
      for (const ray of rays) {
        const crossed = targets.map(mon => {
          const dx = mon.group.position.x - attacker.mesh.position.x, dz = mon.group.position.z - attacker.mesh.position.z;
          return { mon, along: dx * ray.dx + dz * ray.dz, across: Math.abs(dx * ray.dz - dz * ray.dx) };
        }).filter(({ mon, along, across }) => along >= 0 && along <= ray.range + (Number(mon.scale) || 3) * 0.16 && across <= ray.width + (Number(mon.scale) || 3) * 0.16)
          .sort((a, b) => a.along - b.along);
        for (const { mon } of (firstHitOnly ? crossed.slice(0, 1) : crossed)) rayHits.set(mon, (rayHits.get(mon) || 0) + 1);
      }
      const palmN = skill.palmN ? Math.floor(Number(skill.palmN) || 1) : 1;
      for (const mon of targets.slice(0, hitMax)) {
        const hits = skill.free8 ? (rayHits.get(mon) || 0) : (rayHits.get(mon) || 1);
        const repeats = Math.max(1, Math.min(24, hits));
        for (let i = 0; i < repeats; i++) push(mon, 1, i * 0.04);
      }
      if (skill.splashK && skill.wstyle === "crescent") {
        const primary = target && target.group ? target : null;
        if (primary) for (const mon of monsters) if (mon !== primary && !mon.isDead && mon.group && mon.group.position.distanceTo(primary.group.position) <= 2.3) push(mon, Number(skill.splashK), 0);
      }
    } else if (skill.coins) {
      const count = Math.max(1, Math.min(12, Math.floor(Number(skill.count) || 5)));
      const range = Math.max(6, Number(skill.range) || 7);
      const aim = skillAimVector(skill, attacker, target, impactPos);
      const base = Math.atan2(aim.dz, aim.dx);
      for (let i = 0; i < count; i++) {
        const angle = base + (i - (count - 1) / 2) * 0.22;
        const dx = Math.cos(angle), dz = Math.sin(angle);
        for (const mon of targets.slice(0, hitMax)) {
          const mx = mon.group.position.x - attacker.mesh.position.x, mz = mon.group.position.z - attacker.mesh.position.z;
          const along = mx * dx + mz * dz, across = Math.abs(mx * dz - mz * dx);
          if (along >= 0 && along <= range && across <= 0.65 * Math.max(1, (Number(mon.scale) || 3) / 3)) {
            push(mon, 0.35, i * 0.04);
            push(mon, 0.35, i * 0.04 + range * 2 / 13);
          }
        }
      }
    } else if (skill.type === "homing") {
      const count = skill.pstyle === "dragon" ? skillDragonShotCount(skill, rank) : Math.max(1, Math.min(24, Math.floor(Number(skill.count) || 1)));
      const shotTargets = skill.one || skill.pstyle === "dragon" || skill.pstyle === "bamboo" ? [target].filter(Boolean) : targets;
      for (let i = 0; i < count; i++) {
        const mon = shotTargets[i % Math.max(1, shotTargets.length)];
        if (!mon) continue;
        const scale = skill.one ? (Number(skill.tot) || 1) / count : i >= shotTargets.length && skill.pstyle !== "dragon" && skill.pstyle !== "bamboo" ? 0.5 : 1;
        push(mon, scale, skill.one ? 0 : i * 0.07);
      }
    } else if (skill.type === "aoeSelf" || skill.type === "aoeTarget") {
      const hits = Math.max(1, Math.min(24, Math.floor(Number(area.hits) || 1)));
      const total = Number(area.tot) || 1.2;
      const each = hits > 1 ? total / hits : 1;
      const duration = Math.max(0.2, Number(area.dur) || 1);
      for (const mon of targets.slice(0, hitMax)) for (let i = 0; i < hits; i++) {
        push(mon, each, i * duration * 0.75 / Math.max(1, hits - 1));
      }
      if (event && event.areaFx && Array.isArray(event.areaFx.items)) {
        const coeff = Number(skill.boltHit) || Number(skill.dropHit) || 0;
        if (coeff > 0) for (const item of event.areaFx.items) {
          const x = event.areaFx.x + (Number(item.dx) || 0), z = event.areaFx.y + (Number(item.dy) || 0);
          const radius = skill.boltHit ? 1 : 1.1;
          for (const mon of monsters) if (!mon.isDead && mon.group && Math.hypot(mon.group.position.x - x, mon.group.position.z - z) <= radius + (Number(mon.scale) || 3) * 0.16) {
            push(mon, coeff, (Number(item.delay) || 0) * (skill.dropHit ? 1 : duration) + (skill.dropHit ? 1.1 : 0.3));
          }
        }
      }
    } else if (skill.saw && target) {
      push(target, 0.4, 0);
      for (let i = 0; i < 4; i++) push(target, 0.2, 0.14 * (i + 1));
    } else if (skill.type === "homing" && skill.one) {
      // Kept for data sets where one-target homing is expressed without pstyle metadata.
      const count = Math.max(1, Math.floor(Number(skill.count) || 1));
      const total = Number(skill.tot) || 1;
      for (let i = 0; i < count; i++) push(target, total / count, i * 0.07);
    } else {
      for (const mon of targets.slice(0, hitMax)) push(mon, 1, 0);
    }

    if (skill.kind === "curse") {
      for (const mon of targets.slice(0, hitMax)) applySkillStatus(skill, mon, { damage: 0, hit: true });
      return;
    }
    const seen = new Set();
    for (const hit of schedule) setTimeout(() => {
      if (hit.mon.isDead) return;
      const result = applySkillDamage(skill, hit.mon, hit.scale, hit.knockbackOverride);
      if (result && result.hit) {
        // Repeated hits refresh damage-over-time and control, matching the 2.5D hit events.
        applySkillStatus(hit.statusSkill || skill, hit.mon, result);
        seen.add(hit.mon);
      }
    }, hit.delay * 1000);
  }

  function updateSkillCombat(dt) {
    let vitalsChanged = false;
    for (const [key, entry] of Object.entries(hero.buffs || {})) {
      entry.remaining -= dt;
      if (entry.remaining <= 0) {
        delete hero.buffs[key];
        vitalsChanged = true;
      }
    }
    if (vitalsChanged) syncBuffVitals();
    const regen = activeBuffStats();
    const hpRecoveryPerSecond = hero.maxHp * (Number(regen.hpRegen) || 0) / 100 + (Number(regen.hpRegPt) || 0);
    const mpRecoveryPerSecond = hero.maxMp * (Number(regen.mpRegen) || 0) / 100 + (Number(regen.mpRegPt) || 0);
    if (hpRecoveryPerSecond > 0) {
      hero._hpRegenCarry = (hero._hpRegenCarry || 0) + hpRecoveryPerSecond * dt;
      const gain = Math.floor(hero._hpRegenCarry);
      if (gain > 0) {
        hero.hp = Math.min(hero.maxHp, hero.hp + gain);
        hero._hpRegenCarry -= gain;
      }
    }
    if (mpRecoveryPerSecond > 0) {
      hero._mpRegenCarry = (hero._mpRegenCarry || 0) + mpRecoveryPerSecond * dt;
      const gain = Math.floor(hero._mpRegenCarry);
      if (gain > 0) {
        hero.mp = Math.min(hero.maxMp, hero.mp + gain);
        hero._mpRegenCarry -= gain;
      }
    }
    if (hpRecoveryPerSecond || mpRecoveryPerSecond) {
      hero._regenUiTimer = (hero._regenUiTimer || 0) + dt;
      if (hero._regenUiTimer >= 0.5) { hero._regenUiTimer = 0; updateVitalsUI(); }
    }
    for (const mon of monsters) {
      if (mon.isDead) continue;
      if (mon.debuffs) {
        for (const key of Object.keys(mon.debuffs)) {
          mon.debuffs[key].remaining -= dt;
          if (mon.debuffs[key].remaining <= 0) delete mon.debuffs[key];
        }
      }
      const controlDt = dt / skillControlDurationScale(mon);
      mon.stunTimer = Math.max(0, (mon.stunTimer || 0) - controlDt);
      mon.rootTimer = Math.max(0, (mon.rootTimer || 0) - dt);
      mon.slowTimer = Math.max(0, (mon.slowTimer || 0) - controlDt);
      if (mon.slowTimer <= 0) mon.slowPct = 0;
      if (mon.debuffs) {
        let drain = 0, drainSkill = null;
        for (const debuff of Object.values(mon.debuffs)) {
          const curse = debuff && debuff.skill && debuff.skill.curse;
          if (curse && curse.drain) {
            drain += Math.max(0, skillValue(curse.drain, debuff.rank));
            drainSkill = drainSkill || debuff.skill;
          }
        }
        if (drain > 0) {
          mon.curseDrainTickIn = (mon.curseDrainTickIn || 0) + dt;
          while (mon.curseDrainTickIn >= 0.5 && !mon.isDead) {
            mon.curseDrainTickIn -= 0.5;
            // The 2.5D curse drains HP but cannot deliver the final blow.
            commitMonsterDamage(mon, Math.min(drain, Math.max(0, mon.hp - 1)), drainSkill, false);
          }
        } else {
          mon.curseDrainTickIn = 0;
        }
      }
      if (mon.dot) {
        mon.dot.remaining -= dt;
        mon.dot.tickIn -= dt;
        while (mon.dot && mon.dot.tickIn <= 0 && !mon.isDead) {
          mon.dot.tickIn += 0.5;
          commitMonsterDamage(mon, Math.max(1, Math.round(mon.dot.dps * 0.5)), mon.dot.skill, false);
        }
        if (mon.dot && mon.dot.remaining <= 0) mon.dot = null;
      }
    }
    updateSkillTraps(dt);
  }

  function canCastSkill(skill) {
    const cost = Math.max(0, Math.round(skillValue(skill.mp || 0, getSkillRank(skill))));
    if (hero.mp < cost) {
      const now = performance.now();
      if (!hero._skillNoticeAt || now - hero._skillNoticeAt > 1200) {
        toast3D(`💧 Không đủ nội lực để thi triển <b>${skill.name}</b> (cần ${cost}).`);
        hero._skillNoticeAt = now;
      }
      return false;
    }
    hero.mp = Math.max(0, hero.mp - cost);
    updateVitalsUI();
    return true;
  }

  function skillAimRange(skill) {
    const range = Number(skill && skill.range) || 0;
    const waveRange = Number(skill && skill.wR) || 0;
    if (skill && skill.type === "aoeSelf") return Math.max(0.8, Number(skill.radius) || 2.4);
    return Math.max(1, skill && skill.type === "melee" ? range || 4.5 : waveRange || range || 6);
  }

  function hasRequiredWeapon(required) {
    if (!required) return true;
    const gear = window.getEquippedGear3D && window.getEquippedGear3D();
    const weapon = gear && gear.weapon;
    const normalize = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase();
    // The current paperdoll includes a display/demo item. Only explicit weapon
    // metadata is authoritative, so its showcase sword cannot lock out the
    // other factions' class skills.
    const markers = [
      hero.weaponType, hero.weaponWpn,
      hero.equippedWeapon && (hero.equippedWeapon.weaponType || hero.equippedWeapon.wpn || hero.equippedWeapon.wlook),
      weapon && (weapon.weaponType || weapon.wpn || weapon.wlook)
    ].filter(Boolean);
    if (!markers.length) return true;
    const description = normalize(markers.join(" "));
    const names = {
      sword: ["sword", "kiem"], blade: ["blade", "dao"], saber: ["saber", "dao"], staff: ["staff", "con", "gay"],
      bow: ["bow", "cung"], spear: ["spear", "thuong", "mau", "kich"], fist: ["fist", "quyen", "tru", "trong thu", "bao tay"],
      dagger: ["dagger", "tieu", "phi dao", "am khi"], dart: ["dart", "tieu", "phi tieu"], ribbon: ["ribbon", "lua"],
      qin: ["qin", "cam", "dan"], mace: ["mace", "chuy", "chuy"], blade2: ["song dao"]
    };
    const expected = names[normalize(required)] || [normalize(required)];
    return expected.some(name => description.includes(name));
  }

  function getSkillAnimation(skill) {
    const visual = window.VFX && (window.VFX[skill.name] || window.VFX[window.VFX_ALIAS && window.VFX_ALIAS[skill.name]]);
    const pose = skill.kind === "curse"
      ? "cast"
      : Array.isArray(skill.comboPoses) && skill.comboPoses[0] || visual && visual.pose || (skill.type === "melee" ? "slash" : "cast");
    const palmTechnique = visual && visual.area && ["palm", "taichi"].includes(visual.area.t);
    const namedTechnique = /chưởng|chỉ|quyền/i.test(skill.name || "");
    return { visual, pose, casting: skill.kind === "curse" || pose === "cast" || pose === "punch" || !!(visual && visual.cast) || !!palmTechnique || !!namedTechnique };
  }

  function startSkillAnimation(skill) {
    const animation = getSkillAnimation(skill);
    const castStats = activeBuffStats();
    // In 2.5D, casting speed uses the stronger of attack-speed and cast-speed bonuses.
    const castSpeed = Math.max(0, Number(castStats.aspdPct) || 0, Number(castStats.castPct) || 0);
    const duration = Math.max(0.2, Number(skill.castTime) || 0.35) / (1 + castSpeed / 100);
    hero.pendingSkillCast = null;
    hero.isMoving = false;
    hero.targetPos.copy(hero.mesh.position);
    hero.isAttacking = true;
    hero.attackTimer = duration;
    hero.isCasting = animation.casting;
    hero.castDuration = animation.casting ? Math.max(0.35, duration) : 0;
    hero.castTimer = hero.castDuration;
    hero.castColor = skill.trailFx || skill.color || "#a8dcff";
    hero.skillPose = animation.pose;
    hero.skillPoseTimer = duration;
    hero.skillHopTimer = 0;
    hero.skillHopDuration = 0;
    return animation;
  }

  window.setHeroSkillPose3D = function(pose, color, duration = 0.25) {
    hero.skillPose = pose || "slash";
    hero.castColor = color || hero.castColor;
    hero.skillPoseTimer = Math.max(hero.skillPoseTimer || 0, Number(duration) || 0.25);
    hero.isAttacking = true;
    hero.attackTimer = Math.max(hero.attackTimer || 0, Number(duration) || 0.25);
  };
  window.playHeroSkillHop3D = function(duration = 0.44) {
    hero.skillHopDuration = Math.max(0.1, Number(duration) || 0.44);
    hero.skillHopTimer = hero.skillHopDuration;
  };

  function castSupportSkill(skill, key, target) {
    const rank = getSkillRank(skill);
    if (!canCastSkill(skill)) return;
    startSkillAnimation(skill);
    hero.isMeditating = false;
    if (skill.kind === "heal") {
      const healAmount = skill.healPt
        ? Math.round(skillValue(skill.healPt, rank))
        : Math.round((target && target.maxHp || hero.maxHp) * skillValue(skill.heal || 0, rank) / 100);
      const healed = Math.max(0, Math.min((target && target.maxHp || hero.maxHp) - (target && target.hp || hero.hp), healAmount));
      if (target && target !== hero) target.hp = Math.min(target.maxHp, target.hp + healAmount);
      else hero.hp = Math.min(hero.maxHp, hero.hp + healAmount);
      spawnSelfAuraFX(skill);
      if (window.castAuthenticSkill) window.castAuthenticSkill(skill, hero, hero);
      updateVitalsUI();
      const healedTarget = target && target !== hero ? target : hero;
      spawnDamageText(healedTarget.mesh ? healedTarget.mesh.position.x : hero.mesh.position.x, (healedTarget.mesh ? healedTarget.mesh.position.y : hero.mesh.position.y) + 2.2, healedTarget.mesh ? healedTarget.mesh.position.z : hero.mesh.position.z, `+${healed} Sinh Lực`, "#8ef0a0", false);
      playSfx("potion");
      toast3D(`🌸 <b style='color:#8ef0a0'>${skill.name}</b>: Hồi phục ${healed} Sinh Lực.`);
      return;
    }

    if (skill.kind === "buff") {
      const duration = Math.max(1, skill.durP ? skillValue(skill.durP, rank) / 18 : skillValue(skill.dur || 60, rank));
      hero.buffs[key] = { skill, rank, remaining: duration };
      syncBuffVitals();
      spawnSelfAuraFX(skill);
      if (window.castAuthenticSkill) window.castAuthenticSkill(skill, hero, hero);
      toast3D(`🛡️ Đã kích hoạt <b style='color:${skill.color || "#ffd24a"}'>${skill.name}</b> trong ${duration} giây.`);
      playSfx("slash");
      return;
    }

    if (skill.kind === "curse") {
      const onImpact = event => {
        if (event && event.type && event.type.endsWith("Complete")) return;
        const hitTarget = event && event.target || target;
        if (hitTarget && !hitTarget.isDead) applySkillStatus(skill, hitTarget, { damage: 0, hit: true });
      };
      if (window.castAuthenticSkill) {
        window.castAuthenticSkill(skill, hero, target, onImpact);
      } else {
        spawnSkill3DFX(skill, hero, target, onImpact);
      }
      toast3D(`☯️ <b style='color:${skill.color || "#c8a0ff"}'>${skill.name}</b>: ${skill.d || skill.desc || "Hiệu ứng khống chế đã trúng mục tiêu."}`);
      return;
    }
  }

  // Thi triển chiêu: tiêu hao nội lực, chọn mục tiêu và đồng bộ hoạt ảnh / hiệu ứng / sát thương.
  window.castSkill3D = function(slot, explicitTarget) {
    let slotKey = "Q", keyName = "Phím Q";
    if (slot === "left" || (slot === 1 && explicitTarget)) { slotKey = "left"; keyName = "Chuột Trái"; }
    else if (slot === "right" || (slot === 2 && explicitTarget)) { slotKey = "right"; keyName = "Chuột Phải"; }
    else if (slot === 1 || slot === "Q" || slot === "q") { slotKey = "Q"; keyName = "Phím Q"; }
    else if (slot === 2 || slot === "W" || slot === "w") { slotKey = "W"; keyName = "Phím W"; }
    else if (slot === 3 || slot === "E" || slot === "e") { slotKey = "E"; keyName = "Phím E"; }
    else if (slot === 4 || slot === "R" || slot === "r") { slotKey = "R"; keyName = "Phím R"; }
    else if (typeof slot === "string") { slotKey = slot; keyName = `Phím [${slot}]`; }

    const faction = FACTION_SKILLS[hero.faction] || FACTION_SKILLS.kiem;
    const skills = hero.equippedSkills || faction.defaultSkills || faction.skills || [];
    let skill = window.shortcutBarState && window.shortcutBarState[slotKey] && window.shortcutBarState[slotKey].skillObj;
    if (!skill && slotKey === "left" && window.shortcutBarState && window.shortcutBarState.Q) skill = window.shortcutBarState.Q.skillObj;
    if (!skill && slotKey === "right" && window.shortcutBarState && window.shortcutBarState.W) skill = window.shortcutBarState.W.skillObj;
    if (!skill) {
      const index = ({ Q: 0, W: 1, E: 2, R: 3, left: 0, right: 1 })[slotKey] || 0;
      skill = skills[index] || skills[0];
    }
    if (!skill) { toast3D(`⚠️ Ô ${keyName} chưa được gán võ công.`); return; }
    if (skill.kind === "passive") { toast3D(`<b>${skill.name}</b> là tâm pháp bị động, không thể chủ động thi triển.`); return; }
    if (Number(skill.req || skill.reqLv) > Number(hero.lv || 1)) { toast3D(`🔒 Cần cấp ${skill.req || skill.reqLv} để dùng <b>${skill.name}</b>.`); return; }
    if (skill.needW && !hasRequiredWeapon(skill.needW)) {
      toast3D(`🗡️ <b>${skill.name}</b> yêu cầu trang bị ${skill.needW}; vũ khí hiện tại không phù hợp.`);
      return;
    }

    const aimRange = skillAimRange(skill);
    let target = explicitTarget && !explicitTarget.isDead ? explicitTarget : currentTarget && !currentTarget.isDead ? currentTarget : null;
    if (!target && skill.kind !== "buff" && skill.kind !== "heal" && skill.type !== "aoeSelf") {
      const maxDist = aimRange + 0.8;
      let nearest = null, nearestDist = maxDist;
      for (const mon of monsters) {
        if (mon.isDead || !mon.group) continue;
        const dist = mon.group.position.distanceTo(hero.mesh.position);
        if (dist < nearestDist) { nearest = mon; nearestDist = dist; }
      }
      target = nearest;
    }
    if (skill.kind === "curse" && target && target.group.position.distanceTo(hero.mesh.position) > (Number(skill.range) || 6)) {
      toast3D(`📍 ${skill.name}: mục tiêu đang ở ngoài tầm ${Number(skill.range) || 6}.`);
      return;
    }
    if (target && target.group && skill.type !== "melee" && skill.type !== "aoeSelf") {
      const castRange = Number(skill.wR) || Number(skill.range) || 6;
      if (target.group.position.distanceTo(hero.mesh.position) > castRange + (Number(target.scale) || 3) * 0.16) {
        toast3D(`📍 ${skill.name}: mục tiêu đang ở ngoài tầm ${castRange}.`);
        return;
      }
    }
    if (explicitTarget && target) setTarget(target, true);

    if (skill.kind === "buff" || skill.kind === "heal") {
      castSupportSkill(skill, key, hero);
      return;
    }
    if (skill.kind === "curse") {
      if (!target) { toast3D(`⚠️ ${skill.name}: cần khóa một mục tiêu.`); return; }
      castSupportSkill(skill, key, target);
      return;
    }
    if (skill.type !== "aoeSelf" && !target) {
      // Kỹ năng định hướng vẫn có thể đánh trúng quái đứng trước mặt.
      target = null;
    }
    if (target && skill.type === "melee") {
      const dx = target.group.position.x - hero.mesh.position.x;
      const dz = target.group.position.z - hero.mesh.position.z;
      const dist = Math.hypot(dx, dz);
      const meleeRange = Math.max(1.5, Number(skill.range) || 4.5);
      if (dist > meleeRange + (target.scale || 3) * 0.16) {
        hero.facing = Math.atan2(dx, dz);
        hero.pendingSkillCast = { slot: slotKey, target, skill };
        const stopDist = Math.max(0.9, meleeRange * 0.72);
        hero.targetPos.set(
          target.group.position.x - Math.sin(hero.facing) * stopDist,
          getSurfaceElevation(target.group.position.x, target.group.position.z),
          target.group.position.z - Math.cos(hero.facing) * stopDist
        );
        hero.isMoving = true;
        return;
      }
    }
    hero.pendingSkillCast = null;
    if (!canCastSkill(skill)) return;

    startSkillAnimation(skill);
    hero.isMeditating = false;
    if (target && target.group && skill.type === "melee" && (skill.dash || !skill.noLunge)) {
      const dx = target.group.position.x - hero.mesh.position.x;
      const dz = target.group.position.z - hero.mesh.position.z;
      const dist = Math.hypot(dx, dz);
      if (dist > 0.65) {
        const advance = skill.dash ? Math.max(0, dist - 0.8) : Math.min(0.24, Math.max(0, dist - 0.6));
        if (advance > 0) {
          hero.mesh.position.x += dx / dist * advance;
          hero.mesh.position.z += dz / dist * advance;
          hero.mesh.position.y = getSurfaceElevation(hero.mesh.position.x, hero.mesh.position.z);
          hero.targetPos.copy(hero.mesh.position);
          hero.isMoving = false;
          hero.facing = Math.atan2(dx, dz);
        }
      }
    }
    const impactPos = skill.type === "aoeSelf"
      ? hero.mesh.position.clone()
      : target && target.group
        ? target.group.position.clone()
        : new THREE.Vector3(
            hero.mesh.position.x + Math.sin(hero.facing) * aimRange,
            hero.mesh.position.y,
            hero.mesh.position.z + Math.cos(hero.facing) * aimRange
          );
    if (target && target.group) {
      const dx = target.group.position.x - hero.mesh.position.x;
      const dz = target.group.position.z - hero.mesh.position.z;
      hero.facing = Math.atan2(dx, dz);
    }

    toast3D(`${faction.icon || "⚔️"} <b style='color:${skill.color || "#ffd24a"}'>[${keyName}] ${skill.name}</b>: ${skill.d || skill.desc || "Xuất chiêu!"}`);
    const onImpact = event => resolveSkillImpact(skill, hero, target, impactPos, event || {});
    if (window.castAuthenticSkill) {
      window.castAuthenticSkill(skill, hero, target || impactPos, onImpact);
    } else if (target) {
      spawnSkill3DFX(skill, hero, target);
    } else if (skill.type === "aoeSelf") {
      spawnSelfAuraFX(skill);
      onImpact();
    } else {
      spawnDirectionalSkill3DFX(skill, hero, impactPos);
    }
  };

  // Cập nhật giao diện thanh phím tắt kỹ năng theo phái & nhánh võ công
  function updateSkillBarUI() {
    if (window.initDefaultShortcutsForFaction) {
      window.initDefaultShortcutsForFaction();
    } else if (window.updateShortcutBarUI) {
      window.updateShortcutBarUI();
    }

    const curFac = FACTION_SKILLS[hero.faction] || FACTION_SKILLS.kiem;
    // Cập nhật nhãn phái trên topbar
    const tbFac = document.getElementById("tbFaction");
    if (tbFac) {
      tbFac.textContent = `${curFac.icon} ${curFac.name} (${curFac.element})`;
    }
  }

  // Quản lý Bảng Môn Phái Võ Lâm
  window.openFactionModal = function() {
    if (window.openModal3D) {
      window.openModal3D("factionModal");
    } else {
      const modal = document.getElementById("factionModal");
      if (modal) modal.style.display = "flex";
    }
    renderFactionList();
  };

  window.closeFactionModal = function() {
    if (window.closeModal3D) {
      window.closeModal3D("factionModal");
    } else {
      const modal = document.getElementById("factionModal");
      if (modal) modal.style.display = "none";
    }
  };

  window.selectFaction = function(facKey, routeIdx) {
    if (!FACTION_SKILLS[facKey]) return;
    hero.faction = facKey;
    const curFac = FACTION_SKILLS[facKey];
    const allFactionActives = curFac.routes
      ? curFac.routes.flatMap(route => (route.skills || []).filter(skill => skill.kind !== "passive"))
      : (curFac.skills || []);
    const factionDefaults = curFac.defaultSkills && curFac.defaultSkills.length
      ? curFac.defaultSkills
      : allFactionActives;

    if (routeIdx != null && curFac.routes && curFac.routes[routeIdx]) {
      hero.activeRouteIndex = Number(routeIdx);
      const route = curFac.routes[routeIdx];
      const activeInRoute = route.skills.filter(s => s.kind !== "passive");
      const routeSkills = [...activeInRoute];
      for (const skill of factionDefaults) {
        if (routeSkills.length >= 4) break;
        if (!routeSkills.includes(skill)) routeSkills.push(skill);
      }
      hero.equippedSkills = routeSkills.slice(0, 4);
      toast3D(`⚔️ Tu luyện nhánh <b>${route.name}</b> của <b>${curFac.name}</b>!`);
    } else {
      hero.activeRouteIndex = 0;
      hero.equippedSkills = factionDefaults.slice(0, 4);
      toast3D(`⚔️ <b>Bái nhập ${curFac.name}</b> thành công! Hệ ${curFac.element} · Bộ tuyệt kỹ 3D đã sẵn sàng!`);
    }

    syncBuffVitals();
    updateSkillBarUI();
    if (window.renderSkillModalUI) window.renderSkillModalUI();
    renderFactionList();
    playSfx("slash");
  };

  function renderFactionList() {
    const container = document.getElementById("factionList");
    if (!container) return;
    container.innerHTML = "";

    Object.values(FACTION_SKILLS).forEach(fac => {
      const isCur = (hero.faction === fac.id);
      const card = document.createElement("div");
      card.style.cssText = `
        background: ${isCur ? 'linear-gradient(180deg,#3e2612,#1a1008)' : 'linear-gradient(180deg,#241810,#140d08)'};
        border: 2px solid ${isCur ? '#ffd24a' : '#5a4228'};
        border-radius: 8px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        box-shadow: 0 4px 14px rgba(0,0,0,0.6);
      `;

      // Danh sách các nhánh võ công
      const routesHtml = fac.routes ? fac.routes.map((r, rIdx) => `
        <button onclick="event.stopPropagation(); selectFaction('${fac.id}', ${rIdx});" style="background:${isCur ? '#5c3e1a' : '#2d1e12'}; border:1px solid #7a5830; color:#ffd24a; border-radius:4px; font-size:10.5px; padding:2px 6px; cursor:pointer;" title="Luyện nhánh ${r.name}">
          ${r.name}
        </button>
      `).join(' ') : '';

      // Bộ 4 chiêu thức hiển thị
      const displaySkills = (isCur && hero.equippedSkills) ? hero.equippedSkills : (fac.defaultSkills || fac.skills || []);

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #4a3420; padding-bottom:4px;">
          <div style="font-size:14px; font-weight:700; color:${fac.color};">
            ${fac.icon} ${fac.name} <span style="font-size:11px; color:#c9b89a;">(Hệ ${fac.element})</span>
          </div>
          ${isCur ? '<span style="font-size:10px; background:#4a3212; color:#ffd24a; padding:1px 6px; border-radius:8px; border:1px solid #ffd24a;">Đang Luyện</span>' : ''}
        </div>
        <div style="font-size:10.5px; color:#a89880; line-height:1.3;">
          ${fac.desc || ''}
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:4px; margin:2px 0;">
          <small style="color:#d4a024; font-size:10px; width:100%;">Nhánh võ công:</small>
          ${routesHtml}
        </div>
        <div style="display:flex; flex-direction:column; gap:3px; font-size:11px; color:#e0d2bd; background:rgba(0,0,0,0.25); padding:5px; border-radius:4px;">
          ${displaySkills.map((sk, i) => `
            <div style="display:flex; align-items:center; gap:5px;">
              <span style="font-size:11px;">${fac.icon}</span>
              <b style="color:#ffd24a; width:45px;">[${['Q/Trái', 'W/Phải', 'E', 'R'][i]}]:</b>
              <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${sk.name}</span>
            </div>
          `).join('')}
        </div>
        <button class="btn" onclick="selectFaction('${fac.id}')" style="margin-top:4px; font-size:11.5px; padding:4px 0; background:${isCur ? 'linear-gradient(180deg,#8a6020,#4a3210)' : 'linear-gradient(180deg,#c8902a,#7a5212)'}; color:#fff; border-color:#ffd24a;">
          ${isCur ? '✓ Đang Gia Nhập' : '⚔️ Bái Nhập Môn Phái'}
        </button>
      `;
      container.appendChild(card);
    });
  }

  // Cập nhật tiến độ nhiệm vụ khi hạ gục quái vật
  function checkQuestProgressOnMonsterKill(mon) {
    if (!hero.quest || !hero.quest.active) return;
    const q = QUEST_DATABASE[hero.quest.id];
    if (!q) return;

    const monNameLower = (mon.name || "").toLowerCase();
    const monTypeLower = (mon.type || "").toLowerCase();
    const isMatch = q.targetMatch.some(k => monNameLower.includes(k) || monTypeLower.includes(k));

    if (isMatch && hero.quest.count < q.need) {
      hero.quest.count++;
      updateQuestHud();

      // Cập nhật dấu ? hoặc ! trên đầu Trưởng Trấn Lý
      const elder = npcs.find(n => n.name === "Trưởng Trấn Lý");
      if (elder) updateNpcQuestMarker(elder);

      if (hero.quest.count >= q.need) {
        toast3D(`✨ <b style="color:#8ef0a0">[Nhiệm Vụ Hoàn Thành]</b> <b>${q.title}</b>! Mau về gặp Trưởng Trấn Lý nhận thưởng!`);
        playSfx("hit");
      } else {
        toast3D(`📜 [Nhiệm Vụ] <b>${q.title}</b>: <b>${hero.quest.count}/${q.need}</b>`);
      }
    }
  }

  // Khinh công vượt chướng ngại vật & sông
  window.khinhCong3D = function() {
    playSfx("jump");
    hero.isJumping = true;
    const baseElev = getSurfaceElevation(hero.mesh.position.x, hero.mesh.position.z);
    hero.mesh.position.y = baseElev + 8.5;
    toast3D("🕊️ <b>Khinh Công</b>: Thân nhẹ như chim én, lướt gió vượt sông!");
    setTimeout(() => {
      hero.mesh.position.y = getSurfaceElevation(hero.mesh.position.x, hero.mesh.position.z);
      hero.isJumping = false;
    }, 450);
  };

  // Uống thuốc
  window.usePotion3D = function(type) {
    if (type === "hp") {
      if (hero.potions.hp <= 0) { toast3D("Đã hết Bình Sinh Lực!"); return; }
      hero.potions.hp--;
      hero.hp = Math.min(hero.maxHp, hero.hp + 600);
      document.getElementById("p1Num").textContent = hero.potions.hp;
      playSfx("potion");
      toast3D("🧪 Uống <b>Bình Sinh Lực</b> (+600 Sinh Lực)");
    } else if (type === "mp") {
      if (hero.potions.mp <= 0) { toast3D("Đã hết Bình Nội Lực!"); return; }
      hero.potions.mp--;
      hero.mp = Math.min(hero.maxMp, hero.mp + 500);
      document.getElementById("p2Num").textContent = hero.potions.mp;
      playSfx("potion");
      toast3D("🧪 Uống <b>Bình Nội Lực</b> (+500 Nội Lực)");
    } else if (type === "all") {
      if (hero.potions.all <= 0) { toast3D("Đã hết Cửu Chuyển Đan!"); return; }
      hero.potions.all--;
      hero.hp = hero.maxHp; hero.mp = hero.maxMp;
      document.getElementById("p3Num").textContent = hero.potions.all;
      playSfx("potion");
      toast3D("✨ Dùng <b>Cửu Chuyển Hoàn Hồn Đan</b> (Hồi 100% Sinh lực & Nội lực)");
    } else if (type === "antidote") {
      if (hero.potions.antidote <= 0) { toast3D("Đã hết Giải Độc Dược!"); return; }
      hero.potions.antidote--;
      document.getElementById("p4Num").textContent = hero.potions.antidote;
      playSfx("potion");
      toast3D("🌿 Dùng <b>Giải Độc Dược</b> (Hóa giải mọi độc tính)");
    }
    updateVitalsUI();
  };

  // Nút PK, Ngựa, Ngồi thiền, Auto
  window.togglePk3D = function() {
    const modes = ["peace", "fight", "kill"];
    const labels = { peace: "Hòa bình", fight: "Chiến đấu", kill: "Đồ sát" };
    const colors = { peace: "#8ef0a0", fight: "#ffb070", kill: "#ff5a4a" };
    const nextIdx = (modes.indexOf(hero.pkMode) + 1) % modes.length;
    hero.pkMode = modes[nextIdx];
    const btn = document.getElementById("aPk");
    btn.textContent = hero.pkMode === "peace" ? "Hòa" : hero.pkMode === "fight" ? "Chiến" : "Sát";
    btn.style.color = colors[hero.pkMode];
    document.getElementById("pkLbl").textContent = labels[hero.pkMode];
    toast3D(`⚔ Chuyển chế độ PK: <b style='color:${colors[hero.pkMode]}'>${labels[hero.pkMode]}</b>`);
  };

  window.toggleRide3D = function() {
    hero.isRiding = !hero.isRiding;
    hero.speed = hero.isRiding ? 19.5 : 13.0;
    toast3D(hero.isRiding ? "🐎 <b>Lên Ngựa</b>: Tốc độ di chuyển tăng mạnh!" : "🚶 <b>Xuống Ngựa</b>");
  };

  window.toggleSit3D = function() {
    hero.isMeditating = !hero.isMeditating;
    hero.isMoving = false;
    toast3D(hero.isMeditating ? "🧘 <b>Ngồi Thiền</b>: Khí huyết và nội lực hồi phục nhanh chóng!" : "Đứng dậy tiếp tục hành tẩu giang hồ.");
  };

  window.toggleAutoFight = function() {
    hero.autoFight = !hero.autoFight;
    document.getElementById("autoMi").style.color = hero.autoFight ? "#8ef0a0" : "";
    document.getElementById("autoLbl").style.color = hero.autoFight ? "#8ef0a0" : "";
    toast3D(hero.autoFight ? "⚙ <b>Bật Tự Động Đánh</b>: Tự tìm quái và xuất chiêu!" : "Tắt tự động đánh.");
  };

  window.heroGoToCoord = function() {
    const x = parseFloat(document.getElementById("cgX").value) || 0;
    const y = parseFloat(document.getElementById("cgY").value) || 0;
    const wx = (x - 94) * 2.5;
    const wz = 85 - (y - 97) * 2.5;
    hero.pendingSkillCast = null;
    hero.targetPos.set(wx, 0, wz);
    hero.isMoving = true;
    toast3D(`Tự chạy đến tọa độ (${x}, ${y})...`);
  };

  window.toast3D = function(msg) {
    const log = document.getElementById("log");
    const item = document.createElement("div");
    item.innerHTML = msg;
    log.appendChild(item);
    setTimeout(() => { item.style.opacity = "0"; setTimeout(() => item.remove(), 600); }, 3800);
  };

  // Chat
  window.setChatTab = function(tab) {
    const tabs = document.querySelectorAll("#chatTabs button");
    tabs.forEach(b => b.classList.remove("on"));
    event.target.classList.add("on");
  };

  window.handleChatKey = function(e) {
    if (e.key === "Enter") sendChatMsg();
  };

  window.sendChatMsg = function() {
    const input = document.getElementById("chatText");
    const txt = input.value.trim();
    if (!txt) return;
    const log = document.getElementById("chatLog");
    const d = document.createElement("div");
    d.innerHTML = `<b style="color:#ffd24a;">[Thành Thị] Hiệp Khách:</b> ${txt}`;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
    input.value = "";
  };

  // Phím tắt bàn phím
  window.addEventListener("keydown", function(e) {
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
    const k = e.key.toLowerCase();

    // 1. Phím tắt Kỹ Năng Võ Công (Q, W, E, R hoặc F1, F2, F3, F4)
    if (k === "q" || k === "f1") { e.preventDefault(); castSkill3D("Q"); }
    else if (k === "w" || k === "f2") { e.preventDefault(); castSkill3D("W"); }
    else if (k === "e" || k === "f3") { e.preventDefault(); castSkill3D("E"); }
    else if (k === "r" || k === "f4") { e.preventDefault(); castSkill3D("R"); }

    // 2. Phím tắt Dược Phẩm (1 - 6) - Hỗ trợ kéo thả item từ túi đồ
    else if (k >= "1" && k <= "6") {
      if (window.shortcutBarState && window.shortcutBarState[k] && window.shortcutBarState[k].potType) {
        usePotion3D(window.shortcutBarState[k].potType);
      } else {
        const defPots = { "1": "hp", "2": "mp", "3": "all", "4": "antidote", "5": "speed", "6": "buff" };
        usePotion3D(defPots[k]);
      }
    }

    // 3. Phím tắt Giao Diện & Tiện Ích Port Chuẩn 2.5D
    else if (k === "c") { e.preventDefault(); if (window.toggleCharModal) window.toggleCharModal(); }
    else if (k === "i") { e.preventDefault(); if (window.toggleBagModal) window.toggleBagModal(); }
    else if (k === "k") { e.preventDefault(); if (window.toggleSkillModal) window.toggleSkillModal(); else openFactionModal(); }
    else if (k === "h") { e.preventDefault(); if (window.toggleGuildModal) window.toggleGuildModal(); else openHelpGuideModal(); }
    else if (k === "o") { e.preventDefault(); if (window.toggleAutoModal) window.toggleAutoModal(); }
    else if (k === "l") { e.preventDefault(); if (window.toggleMailModal) window.toggleMailModal(); }
    else if (k === "t" || k === "g") toggleRide3D(); // Lên/xuống Ngựa
    else if (k === "b") toggleSit3D(); // Tọa thiền
    else if (k === "z") togglePk3D(); // Trạng thái PK
    else if (k === "a") toggleAutoFight(); // Tự động đánh
    else if (k === "m") openMapModal(); // Bản đồ thế giới
    else if (k === " ") { e.preventDefault(); khinhCong3D(); } // Khinh công
    else if (k === "escape") {
      if (window.closeAllModals3D) {
        window.closeAllModals3D();
      } else {
        closeNpcDialog();
        closeXaPhuModal();
        closeMapModal();
        closeHelpGuideModal();
        closeFactionModal();
      }
    }
  });

  // ==========================================
  // 12. DỊCH TRẠM XA PHU (CHUYỂN MAP 3D ĐA KHU VỰC)
  // ==========================================
  let currentXaPhuTab = "train";

  window.switchXaPhuTab = function(tab) {
    currentXaPhuTab = tab;
    ["village", "city", "train"].forEach(t => {
      const btn = document.getElementById("xpTab" + t.charAt(0).toUpperCase() + t.slice(1));
      if (!btn) return;
      if (t === tab) {
        btn.style.background = (t === "train") ? "linear-gradient(180deg,#8a2c16,#4a1008)" : "linear-gradient(180deg,#c8902a,#7a5212)";
        btn.style.borderColor = "#ffd24a";
        btn.style.color = "#ffd24a";
      } else {
        btn.style.background = "";
        btn.style.borderColor = "";
        btn.style.color = "";
      }
    });

    const list = document.getElementById("xaPhuList");
    if (!list) return;
    list.innerHTML = "";

    const entries = Object.values(MAP_DEFINITIONS).filter(m => m.category === tab);
    entries.forEach(m => {
      const isCur = (m.id === currentMapId);
      const card = document.createElement("div");
      card.style.background = isCur ? "rgba(90, 60, 20, 0.45)" : "rgba(30, 20, 14, 0.65)";
      card.style.border = isCur ? "1.5px solid #ffd24a" : "1px solid #5a422a";
      card.style.borderRadius = "5px";
      card.style.padding = "10px 12px";
      card.style.display = "flex";
      card.style.justifyContent = "space-between";
      card.style.alignItems = "center";
      card.style.gap = "8px";

      card.innerHTML = `
        <div>
          <div style="font-size:13.5px; font-weight:700; color:${isCur ? '#ffd24a' : '#fff'};">
            ${m.icon} ${m.name} ${isCur ? "<span style='color:#7ec8ff; font-size:11px; margin-left:6px;'>(Đang ở đây)</span>" : ""}
          </div>
          <div style="font-size:11.5px; color:#ffb03a; margin-top:2px;">${m.lvRange}</div>
          <div style="font-size:11px; color:var(--paper-dim); margin-top:2px;">${m.desc}</div>
        </div>
        <button class="btn" style="min-width:85px; font-size:11.5px; ${isCur ? 'opacity:0.6; pointer-events:none;' : ''}">
          ${isCur ? 'Hiện tại' : 'Di Chuyển 🐎'}
        </button>
      `;

      if (!isCur) {
        card.querySelector("button").onclick = () => {
          closeXaPhuModal();
          switchMap3D(m.id);
        };
      }
      list.appendChild(card);
    });
  };

  window.openXaPhuModal = function() {
    switchXaPhuTab(currentXaPhuTab);
    if (window.openModal3D) {
      window.openModal3D("xaPhuModal");
    } else {
      const m = document.getElementById("xaPhuModal");
      if (m) m.style.display = "block";
    }
  };

  window.closeXaPhuModal = function() {
    if (window.closeModal3D) {
      window.closeModal3D("xaPhuModal");
    } else {
      const m = document.getElementById("xaPhuModal");
      if (m) m.style.display = "none";
    }
  };

  // BẢN ĐỒ TOÀN CẢNH GIANG SƠN CỬU CHÂU (WORLD MAP INTERACTIVE MODAL)
  window.openMapModal = function() {
    if (window.openModal3D) {
      window.openModal3D("mapModal");
    } else {
      const modal = document.getElementById("mapModal");
      if (modal) modal.style.display = "block";
    }
    const cv = document.getElementById("worldMapCv");
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const w = cv.width, h = cv.height;

    // Tọa độ các địa danh trên bản đồ thế giới cổ trang
    const MAP_COORDS = {
      balang: { x: 320, y: 310, col: "#4a7f43" },
      bichthuy: { x: 440, y: 290, col: "#38788a" },
      hanhhoa: { x: 200, y: 290, col: "#9a4a68" },
      lacnhan: { x: 120, y: 240, col: "#8a6a3a" },
      bienkinh: { x: 320, y: 210, col: "#b8902a" },
      hangchau: { x: 480, y: 210, col: "#2a7ab8" },
      thanhdo: { x: 150, y: 170, col: "#4a8a4a" },
      tuongduong: { x: 320, y: 130, col: "#7a5a3a" },
      samac: { x: 90, y: 90, col: "#c89f55" },
      thachlam: { x: 220, y: 80, col: "#5a5048" },
      tuyetlinh: { x: 420, y: 55, col: "#7eb8da" },
      hoadiem: { x: 120, y: 40, col: "#c83820" },
      hoason: { x: 270, y: 60, col: "#4a6a5a" },
      magiao: { x: 540, y: 45, col: "#7a2a8a" },
      vothuong: { x: 320, y: 260, col: "#8a5a2a" }
    };

    function renderWorldMapCanvas() {
      ctx.fillStyle = "#120e0a"; ctx.fillRect(0, 0, w, h);

      // Vẽ họa tiết sông ngòi & địa hình nền
      ctx.fillStyle = "#1a140e";
      ctx.fillRect(8, 8, w - 16, h - 16);
      ctx.strokeStyle = "#4a3824"; ctx.lineWidth = 1.5;
      ctx.strokeRect(8, 8, w - 16, h - 16);

      // Đường thủy hoàng hà / trường giang
      ctx.strokeStyle = "rgba(40, 80, 110, 0.4)"; ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(60, 200);
      ctx.bezierCurveTo(200, 180, 280, 240, 420, 220);
      ctx.bezierCurveTo(480, 210, 560, 240, 600, 260);
      ctx.stroke();

      // Vẽ các node địa danh
      Object.entries(MAP_COORDS).forEach(([mid, pt]) => {
        const m = MAP_DEFINITIONS[mid];
        if (!m) return;
        const isCur = (mid === currentMapId);

        // Hào quang nếu là map hiện tại
        if (isCur) {
          ctx.strokeStyle = "#ffd24a"; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 14, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = "rgba(255, 210, 74, 0.3)";
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 14, 0, Math.PI * 2); ctx.fill();
        }

        ctx.fillStyle = pt.col;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2); ctx.stroke();

        ctx.font = isCur ? "bold 12px serif" : "11px serif";
        ctx.fillStyle = isCur ? "#ffd24a" : "#e0d4c2";
        ctx.textAlign = "center";
        ctx.fillText(`${m.icon} ${m.name}`, pt.x, pt.y - 12);
        ctx.font = "9.5px sans-serif";
        ctx.fillStyle = isCur ? "#fff" : "#a89a84";
        ctx.fillText(m.lvRange.split(" ")[0] + " " + (m.lvRange.split(" ")[1] || ""), pt.x, pt.y + 18);
      });
    }

    renderWorldMapCanvas();

    // Click vào node trên bản đồ để chuyển map tức thì
    cv.onclick = function(e) {
      const rect = cv.getBoundingClientRect();
      const scaleX = cv.width / rect.width;
      const scaleY = cv.height / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;

      for (const [mid, pt] of Object.entries(MAP_COORDS)) {
        const dist = Math.hypot(mx - pt.x, my - pt.y);
        if (dist <= 22) {
          closeMapModal();
          switchMap3D(mid);
          break;
        }
      }
    };
  };

  window.closeMapModal = function() {
    if (window.closeModal3D) {
      window.closeModal3D("mapModal");
    } else {
      const modal = document.getElementById("mapModal");
      if (modal) modal.style.display = "none";
    }
  };

  // ==========================================
  // 12B. HỘP THOẠI HƯỚNG DẪN BÔN TẨU TOÀN TẬP
  // ==========================================
  const GUIDE_SECTIONS = {
    move: `
      <div style="margin-bottom:12px;">
        <h3 style="color:#ffd24a; margin:0 0 6px; font-size:14px;">🎮 Chuột & Thao Tác Di Chuyển 3D</h3>
        <p style="margin:0 0 8px; color:#e2d5c3;">Game hỗ trợ góc nhìn 3D đẳng cự chuẩn Võ Lâm với camera luôn bám sát theo nhân vật:</p>
        <ul style="margin:0 0 10px; padding-left:18px;">
          <li><b>Chuột Trái vào mặt đất</b>: Hiệp khách di chuyển tới vị trí chỉ định. Dưới chân xuất hiện vòng hoàng kim bám sát địa hình.</li>
          <li><b>Chuột Phải giữ & kéo</b>: Tự do xoay góc nhìn camera 360° quanh nhân vật để quan sát cảnh vật và bãi quái.</li>
          <li><b>Cuộn bánh xe chuột</b>: Phóng to (Zoom In) chiêm ngưỡng trang phục hoặc Thu nhỏ (Zoom Out) bao quát chiến trường.</li>
          <li><b>Phím [Space / Cách] - Khinh Công</b>: Nhảy vút lên không trung vượt qua sông sâu hiểm trở, phi thân lên mặt cầu hoặc vượt chướng ngại vật!</li>
        </ul>
      </div>
      <div style="background:rgba(218,66,66,0.12); border-left:3px solid #ff4433; padding:8px 10px; border-radius:4px;">
        <b style="color:#ff6655;">⚠️ Lưu ý Vùng Vật Cản (Collision):</b> Nhân vật không thể đi xuyên qua tường nhà, hồ nước trung tâm làng, tảng đá lớn hoặc lội qua sông sâu (cần đi qua Cầu Đá hoặc dùng Khinh Công).
      </div>
    `,
    skill: `
      <div style="margin-bottom:12px;">
        <h3 style="color:#ffd24a; margin:0 0 6px; font-size:14px;">⚔️ Võ Công Tuyệt Kỹ & Chiến Đấu</h3>
        <ul style="margin:0 0 10px; padding-left:18px;">
          <li><b>Click Chuột Trái vào Quái</b>: Khóa mục tiêu và tự động tung chiêu <b>Lôi Lôi Chùy</b> (Sát thương Lôi hệ).</li>
          <li><b>Click Chuột Phải vào Quái</b>: Khóa mục tiêu và xuất tuyệt kỹ cực mạnh <b>Băng Liên Kiếm</b> (Băng sát diện rộng).</li>
          <li><b>Phím tắt chiêu thức [Q, W, E, R] hoặc [F1, F2, F3, F4]</b>: Tung nhanh chiêu thức vào mục tiêu đang nhắm:
            <br>• <b style="color:#ffd24a;">[Q / F1] Lôi Chùy</b>: Đánh chớp nhoáng sét giật.
            <br>• <b style="color:#7ec8ff;">[W / F2] Băng Liên</b>: Đóng băng kẻ thù.
            <br>• <b style="color:#ff784a;">[E / F3] Liệt Hỏa</b>: Hỏa thiêu sát thương cao.
            <br>• <b style="color:#a8e6cf;">[R / F4] Phong Trảm</b>: Bão lốc sát thương liên hoàn.
          </li>
          <li><b>Phím tắt Dược Phẩm [1, 2, 3, 4]</b>: Uống nhanh Bình Sinh Lực (phím 1), Bình Nội Lực (phím 2), Bách Hóa Linh Dược (phím 3).</li>
          <li><b>Phím [A] - Tự Động Đánh (Auto)</b>: Nhân vật tự động tìm quái gần nhất và xuất chiêu liên tục.</li>
          <li><b>Phím [B] - Tọa Thiền</b>: Ngồi xuống đả tọa vận công, hồi phục sinh lực và nội lực cực nhanh.</li>
        </ul>
      </div>
    `,
    quest: `
      <div style="margin-bottom:12px;">
        <h3 style="color:#ffd24a; margin:0 0 6px; font-size:14px;">📜 Hệ Thống Nhiệm Vụ & Dấu Hiệu NPC</h3>
        <p style="margin:0 0 8px; color:#e2d5c3;">Hành tẩu giang hồ qua hệ thống cốt truyện tương tác sâu sắc:</p>
        <ul style="margin:0 0 10px; padding-left:18px;">
          <li><b>Dấu hỏi vàng (?)</b> lơ lửng trên đầu NPC: NPC đang có nhiệm vụ mới đang chờ thiếu hiệp tiếp nhận!</li>
          <li><b>Dấu chấm than xanh (!)</b> phát sáng trên đầu NPC: Nhiệm vụ đã hoàn thành mục tiêu, mau tới đối thoại để nhận thưởng!</li>
          <li><b>Đối thoại NPC</b>: Nhấp chuột trái vào NPC bất kỳ để mở bảng hội thoại Chibi sống động, chọn các hướng nhiệm vụ hoặc chức năng mua bán, rèn trang bị, gửi tiền trang.</li>
          <li><b>Bảng theo dõi bên phải</b>: Hiển thị mục tiêu hiện tại (Ví dụ: Tiêu diệt Sói Xám 0/5) và tự động cập nhật khi quái bị hạ gục.</li>
        </ul>
      </div>
    `,
    map: `
      <div style="margin-bottom:12px;">
        <h3 style="color:#ffd24a; margin:0 0 6px; font-size:14px;">🐎 Dịch Trạm Xa Phu & 15 Bản Đồ Thế Giới</h3>
        <p style="margin:0 0 8px; color:#e2d5c3;">Gặp NPC <b>Xa Phu</b> (đứng ngay đầu cầu làng) hoặc nhấn phím <b>M</b> để xem bản đồ:</p>
        <ul style="margin:0 0 10px; padding-left:18px;">
          <li><b>4 Thôn Trấn</b>: Ba Lăng Huyện (Cấp 1 - 10), Bích Thủy Thôn, Hạnh Hoa Thôn, Lạc Nhạn Trấn.</li>
          <li><b>4 Đại Thành Thị</b>: Biện Kinh (Kinh Đô Cổ Điển), Tương Dương, Thành Đô, Hàng Châu.</li>
          <li><b>7 Bãi Luyện Công (Train)</b>:
            <br>• Sa Mạc Cổ (Cấp 40 - 55)
            <br>• Tuyết Lĩnh Băng Phong (Cấp 55 - 70)
            <br>• Hỏa Diệm Sơn (Cấp 70 - 85)
            <br>• Hoa Sơn Tuyệt Đỉnh (Cấp 85 - 99)
            <br>• Ma Giáo Cấm Địa (Cấp 100 - 120)
            <br>• Võ Trường Luyện Công: Dàn Cột Gỗ Bất Tử 1,000,000 HP để thử nghiệm DPS combo kỹ năng!
          </li>
        </ul>
      </div>
    `
  };

  window.openHelpGuideModal = function() {
    if (window.openModal3D) {
      window.openModal3D("helpGuideModal");
    } else {
      const modal = document.getElementById("helpGuideModal");
      if (modal) modal.style.display = "flex";
    }
    switchGuideTab("move");
  };

  window.closeHelpGuideModal = function() {
    if (window.closeModal3D) {
      window.closeModal3D("helpGuideModal");
    } else {
      const modal = document.getElementById("helpGuideModal");
      if (modal) modal.style.display = "none";
    }
  };

  window.switchGuideTab = function(tab) {
    ["move", "skill", "quest", "map"].forEach(t => {
      const btn = document.getElementById("hgTab" + t.charAt(0).toUpperCase() + t.slice(1));
      if (!btn) return;
      if (t === tab) {
        btn.style.background = "linear-gradient(180deg,#c8902a,#7a5212)";
        btn.style.borderColor = "#ffd24a";
        btn.style.color = "#ffd24a";
      } else {
        btn.style.background = "";
        btn.style.borderColor = "";
        btn.style.color = "";
      }
    });

    const content = document.getElementById("hgContent");
    if (content && GUIDE_SECTIONS[tab]) {
      content.innerHTML = GUIDE_SECTIONS[tab];
    }
  };
  // 13. CẬP NHẬT HUD & VẼ RADAR BẢN ĐỒ NHỎ
  // ==========================================
  function updateVitalsUI() {
    const hpPct = Math.max(0, (hero.hp / hero.maxHp) * 100);
    const mpPct = Math.max(0, (hero.mp / hero.maxMp) * 100);
    document.getElementById("hpbar").querySelector("i").style.width = hpPct + "%";
    document.getElementById("hpText").textContent = `${hero.hp} / ${hero.maxHp}`;
    document.getElementById("mpbar").querySelector("i").style.width = mpPct + "%";
    document.getElementById("mpText").textContent = `${hero.mp} / ${hero.maxMp}`;
  }

  setInterval(() => {
    const d = new Date();
    const str = `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
    const clk = document.getElementById("tbClock");
    if (clk) clk.textContent = str;
  }, 1000);

  const miniCanvas = document.getElementById("mini");
  const mCtx = miniCanvas ? miniCanvas.getContext("2d") : null;
  function renderMinimap() {
    if (!mCtx) return;
    const w = miniCanvas.width, h = miniCanvas.height;
    mCtx.clearRect(0, 0, w, h);

    mCtx.fillStyle = "#16100c"; mCtx.fillRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const scale = 0.42;

    // Dòng sông Liễu Khê uốn lượn (Nếu ở Ba Lăng Huyện)
    if (currentMapDef && currentMapDef.id === "balang") {
      mCtx.strokeStyle = "rgba(47, 107, 136, 0.75)";
      mCtx.lineWidth = 6;
      mCtx.beginPath();
      for (let x = -180; x <= 180; x += 15) {
        const z = getRiverCenterZ(x);
        const mx = cx + x * scale;
        const my = cy + (z - 85) * scale;
        if (x === -180) mCtx.moveTo(mx, my); else mCtx.lineTo(mx, my);
      }
      mCtx.stroke();

      // Cầu Đá
      mCtx.fillStyle = "#8a847a";
      mCtx.fillRect(cx - 3, cy + (42 - 85) * scale - 2, 6, 8);
    }

    // Vị trí NPCs (Chấm xanh lá)
    mCtx.fillStyle = "#8ef0a0";
    for (const npc of npcs) {
      const nx = cx + npc.group.position.x * scale;
      const ny = cy + (npc.group.position.z - (currentMapDef.spawn ? currentMapDef.spawn[1] : 60)) * scale;
      mCtx.beginPath(); mCtx.arc(nx, ny, 2.0, 0, Math.PI * 2); mCtx.fill();
    }

    // Vị trí Quái vật (Chấm đỏ / tím)
    for (const mon of monsters) {
      if (mon.isDead) continue;
      const mx = cx + mon.group.position.x * scale;
      const my = cy + (mon.group.position.z - (currentMapDef.spawn ? currentMapDef.spawn[1] : 60)) * scale;
      mCtx.fillStyle = (mon.type.includes("boss")) ? "#da42ff" : (mon.type === "dummy") ? "#7ec8ff" : "#ff3b30";
      mCtx.beginPath();
      mCtx.arc(mx, my, (mon.type.includes("boss")) ? 3.5 : 2.0, 0, Math.PI * 2);
      mCtx.fill();
    }

    // Vị trí Hiệp Khách (Chấm vàng + Hướng nhìn)
    const hx = cx + hero.mesh.position.x * scale;
    const hy = cy + (hero.mesh.position.z - (currentMapDef.spawn ? currentMapDef.spawn[1] : 60)) * scale;
    mCtx.fillStyle = "#ffd24a";
    mCtx.beginPath(); mCtx.arc(hx, hy, 3.2, 0, Math.PI * 2); mCtx.fill();
    mCtx.strokeStyle = "#ffffff"; mCtx.lineWidth = 1;
    mCtx.beginPath();
    mCtx.moveTo(hx, hy);
    mCtx.lineTo(hx + Math.sin(hero.facing) * 6, hy + Math.cos(hero.facing) * 6);
    mCtx.stroke();

    // Cập nhật tọa độ thực
    const hxPos = hero.mesh.position.x, hzPos = hero.mesh.position.z;
    const logX = Math.round(94 + hxPos / 2.5);
    const logY = Math.round(97 - (hzPos - (currentMapDef.spawn ? currentMapDef.spawn[1] : 60)) / 2.5);
    const miniTitle = document.getElementById("miniTitle");
    if (miniTitle) miniTitle.textContent = `${currentMapDef.name} (${logX},${logY})`;
  }

  function initIcons() {
    function drawVial(id, col) {
      const cv = document.getElementById(id);
      if (!cv) return;
      cv.width = 46; cv.height = 46;
      const ctx = cv.getContext("2d");
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(23, 27, 12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#8a5a2a"; ctx.fillRect(19, 9, 8, 8);
    }
    drawVial("p1Cv", "#d42a20");
    drawVial("p2Cv", "#2060d4");
    drawVial("p3Cv", "#ffd24a");
    drawVial("p4Cv", "#2d8a4e");

    function drawSkillIcon(id, sym, bg) {
      const cv = document.getElementById(id);
      if (!cv) return;
      cv.width = 50; cv.height = 50;
      const ctx = cv.getContext("2d");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, 50, 50);
      ctx.font = "26px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff"; ctx.fillText(sym, 25, 22);
    }
    drawSkillIcon("msLCv", "⚡", "#4a321a");
    drawSkillIcon("msRCv", "❄", "#1a324a");
  }
  initIcons();
  syncBuffVitals();
  updateSkillBarUI();
  updateQuestHud();

  // ==========================================
  // 14. GAME LOOP: CAMERA TRACKING, CHIBI SPRITES, FSM
  // ==========================================
  let lastTime = performance.now();
  let miniMapTimer = 0;

  function gameLoop(now) {
    requestAnimationFrame(gameLoop);
    const dt = Math.min((now - lastTime) / 1000, 0.08);
    lastTime = now;
    const timeSec = now / 1000;

    // 1. Xử lý di chuyển Hiệp Khách, Vùng Vật Cản & Độ Cao Mặt Đất / Cầu
    if (hero.isMoving && !hero.isMeditating) {
      const dist = hero.mesh.position.distanceTo(hero.targetPos);
      if (dist > 0.4) {
        const dir = new THREE.Vector3().subVectors(hero.targetPos, hero.mesh.position).normalize();
        const moveSpeed = hero.speed * (1 + Math.max(0, activeBuffStats().speedPct || 0) / 100);
        const step = Math.min(dist, moveSpeed * dt);
        const nextX = hero.mesh.position.x + dir.x * step;
        const nextZ = hero.mesh.position.z + dir.z * step;

        // KIỂM TRA VẬT CẢN (Công trình, hồ nước, vách tường, cây cối, đá tảng, nước sông)
        const obstacle = isBlocked(nextX, nextZ, hero.mesh.position.x, hero.mesh.position.z);
        if (obstacle && !hero.isJumping) {
          hero.isMoving = false;
          playSfx("hit");
          toast3D(`🚫 Vướng vật cản: <b>${obstacle.name}</b>! Hãy đi đường khác hoặc nhảy Khinh Công.`);
        } else {
          hero.mesh.position.x = nextX;
          hero.mesh.position.z = nextZ;
          hero.facing = Math.atan2(dir.x, dir.z);
          hero.walkPhase += dt * 6.5;
        }
      } else {
        hero.isMoving = false;
      }
    }

    const pendingCast = hero.pendingSkillCast;
    if (pendingCast) {
      const target = pendingCast.target;
      const skill = pendingCast.skill;
      if (!target || target.isDead || !target.group || !monsters.includes(target)) {
        hero.pendingSkillCast = null;
      } else {
        const dx = target.group.position.x - hero.mesh.position.x;
        const dz = target.group.position.z - hero.mesh.position.z;
        const dist = Math.hypot(dx, dz);
        const range = Math.max(1.5, Number(skill.range) || 4.5) + (target.scale || 3) * 0.16;
        if (dist <= range) {
          hero.pendingSkillCast = null;
          hero.isMoving = false;
          castSkill3D(pendingCast.slot, target);
        } else if (!hero.isMoving || hero.mesh.position.distanceTo(hero.targetPos) <= 0.45) {
          hero.facing = Math.atan2(dx, dz);
          const stopDist = Math.max(0.9, Math.max(1.5, Number(skill.range) || 4.5) * 0.72);
          hero.targetPos.set(
            target.group.position.x - Math.sin(hero.facing) * stopDist,
            getSurfaceElevation(target.group.position.x, target.group.position.z),
            target.group.position.z - Math.cos(hero.facing) * stopDist
          );
          hero.isMoving = true;
        }
      }
    }

    // Cập nhật độ cao mặt đất / mặt dốc cầu 3D (nếu không đang nhảy khinh công)
    if (!hero.isJumping) {
      const targetY = getSurfaceElevation(hero.mesh.position.x, hero.mesh.position.z);
      hero.mesh.position.y += (targetY - hero.mesh.position.y) * Math.min(1, dt * 14);
    }

    // 2. CAMERA TRACKING TRIỆT ĐỂ: KHÔNG BAO GIỜ BỊ THU NHỎ KHI ĐI XA
    // Khi nhân vật di chuyển delta, camera và controls.target di chuyển theo y hệt delta đó
    const heroCurrentPos = hero.mesh.position.clone();
    const heroDelta = heroCurrentPos.clone().sub(lastHeroPos);

    if (heroDelta.lengthSq() > 0.000001) {
      camera.position.add(heroDelta);
      controls.target.add(heroDelta);
      lastHeroPos.copy(heroCurrentPos);
    }
    controls.update();

    locationSaveTimer += dt;
    if (locationSaveTimer >= 0.5) {
      locationSaveTimer = 0;
      saveHeroLocation();
    }

    // 3. Hiệu ứng Vòng tròn vàng click chuột bám mặt đất
    if (groundClickRing.visible && groundClickTimer > 0) {
      groundClickTimer -= dt;
      const progress = 1 - (groundClickTimer / 0.5);
      const s = 0.4 + progress * 0.9;
      groundClickRing.scale.set(s, s, s);
      groundClickRing.material.opacity = Math.max(0, 1 - progress);
      if (groundClickTimer <= 0) groundClickRing.visible = false;
    }

    if (hero.attackTimer > 0) {
      hero.attackTimer -= dt;
      if (hero.attackTimer <= 0) {
        hero.isAttacking = false;
        hero.skillPose = "slash";
      }
    }
    hero.skillPoseTimer = Math.max(0, (hero.skillPoseTimer || 0) - dt);
    hero.skillHopTimer = Math.max(0, (hero.skillHopTimer || 0) - dt);
    if (hero.castTimer > 0) {
      hero.castTimer = Math.max(0, hero.castTimer - dt);
      if (hero.castTimer <= 0) hero.isCasting = false;
    }

    updateSkillCombat(dt);

    if (hero.isMeditating) {
      hero.hp = Math.min(hero.maxHp, hero.hp + Math.round(180 * dt));
      hero.mp = Math.min(hero.maxMp, hero.mp + Math.round(150 * dt));
      updateVitalsUI();
    }

    // Tự động đánh
    if (hero.autoFight && (!currentTarget || currentTarget.isDead)) {
      let nearest = null, minDist = 26;
      for (const m of monsters) {
        if (m.isDead || m.type === "dummy") continue;
        const d = m.group.position.distanceTo(hero.mesh.position);
        if (d < minDist) { minDist = d; nearest = m; }
      }
      if (nearest) {
        setTarget(nearest, true);
        hero.targetPos.copy(nearest.group.position);
        hero.isMoving = true;
      }
    }
    if (hero.autoFight && currentTarget && !currentTarget.isDead) {
      const d = hero.mesh.position.distanceTo(currentTarget.group.position);
      if (d > 4.5) {
        hero.targetPos.copy(currentTarget.group.position);
        hero.isMoving = true;
      } else {
        hero.isMoving = false;
        if (!hero.isAttacking) castSkill3D(1);
      }
    }

    // 4. Render Chibi Hero Canvas Sprite
    const camYaw = Math.atan2(camera.position.x - hero.mesh.position.x, camera.position.z - hero.mesh.position.z);
    hero.ctx.clearRect(0, 0, 160, 160);
    const relHeroAng = hero.facing - camYaw;
    ChibiRenderer.drawHero(hero.ctx, 80, 140, {
      ang: relHeroAng,
      walk: hero.walkPhase,
      moving: hero.isMoving,
      attacking: hero.isAttacking,
      casting: hero.isCasting,
      castCharge: hero.castDuration > 0 ? 1 - hero.castTimer / hero.castDuration : 0,
      castColor: hero.castColor,
      attackPose: hero.skillPose,
      hop: hero.skillHopDuration > 0 ? Math.sin((1 - hero.skillHopTimer / hero.skillHopDuration) * Math.PI) * Math.min(34, 34 * hero.skillHopDuration / 0.44) : 0,
      time: timeSec
    });
    hero.tex.needsUpdate = true;

    // Vòng tròn mục tiêu
    if (targetRing.visible && currentTarget && currentTarget.group) {
      targetRing.position.set(currentTarget.group.position.x, 0.08, currentTarget.group.position.z);
    }

    // 5. Update Quái Vật FSM & Render Chibi Sprites
    for (const mon of monsters) {
      if (mon.isDead) {
        mon.deadTimer -= dt;
        mon.group.visible = (mon.deadTimer > 0);
        if (mon.deadTimer <= 0) {
          mon.isDead = false;
          mon.hp = mon.maxHp;
          mon.group.position.set(mon.homeX, 0, mon.homeZ);
          mon.group.visible = true;
        mon.state = "idle";
        mon.stateTimer = 2 + Math.random() * 3;
        mon.targetPos.set(mon.homeX, 0, mon.homeZ);
        mon.isMoving = false;
        mon.hitTimer = 0;
        mon.stunTimer = 0;
        mon.rootTimer = 0;
        mon.slowTimer = 0;
        mon.slowPct = 0;
        mon.dot = null;
        mon.debuffs = null;
        if (mon.sprite) mon.sprite.visible = true;
        if (mon.billboard && mon.billboard.sprite) mon.billboard.sprite.visible = true;
        if (mon.colMesh) mon.colMesh.visible = true;
        if (mon.tex) mon.tex.needsUpdate = true;
        if (mon.billboard) mon.billboard.updateHp(1);
        }
        continue;
      }

      if (mon.hitTimer > 0) mon.hitTimer -= dt;

      // Cột gỗ luyện công đứng yên
      if (mon.type === "dummy") {
        mon.ctx.clearRect(0, 0, 160, 160);
        ChibiRenderer.drawDummy(mon.ctx, 80, 140, { hit: mon.hitTimer });
        mon.tex.needsUpdate = true;
        continue;
      }

      // Choáng và trói chân ngắt di chuyển; làm chậm giảm tốc chạy.
      if (mon.pullTimer3D > 0 && mon.pullTarget3D && !String(mon.type || "").includes("boss")) {
        mon.pullTimer3D = Math.max(0, mon.pullTimer3D - dt);
        const pullDirection = new THREE.Vector3(mon.pullTarget3D.x - mon.group.position.x, 0, mon.pullTarget3D.z - mon.group.position.z);
        const pullDistance = pullDirection.length();
        if (pullDistance > 0.06) {
          pullDirection.normalize();
          mon.group.position.addScaledVector(pullDirection, Math.min(pullDistance, dt * 4.5));
          mon.facing = Math.atan2(pullDirection.x, pullDirection.z);
          mon.curAngle = mon.facing;
          mon.walkPhase += dt * 7;
          mon.isMoving = true;
        } else {
          mon.isMoving = false;
        }
        mon.state = "stunned";
        if (mon.pullTimer3D <= 0 || pullDistance <= 0.06) mon.pullTarget3D = null;
      } else if (mon.stunTimer > 0) {
        mon.state = "stunned";
        mon.isMoving = false;
      } else if (mon.rootTimer > 0) {
        mon.isMoving = false;
      } else {
      // FSM Quái Vật tự nhiên, mượt mà (Không đi giật lùi, không rung giật)
      if (mon.state === "stunned") mon.state = "idle";
      mon.stateTimer -= dt;
      const distToHero = mon.group.position.distanceTo(hero.mesh.position);

      if (distToHero < 11 && mon.type !== "rabbit") {
        mon.state = "chase";
      } else if (mon.state === "chase" && distToHero > 20) {
        mon.state = "return";
      } else if (mon.stateTimer <= 0) {
        mon.state = (Math.random() < 0.45) ? "idle" : "patrol";
        mon.stateTimer = 2.5 + Math.random() * 3.5;
        if (mon.state === "patrol") {
          const wanderAng = Math.random() * Math.PI * 2;
          const wanderDist = 4 + Math.random() * 8;
          mon.targetPos.set(mon.homeX + Math.cos(wanderAng) * wanderDist, 0, mon.homeZ + Math.sin(wanderAng) * wanderDist);
        }
      }

      let moveTarget = null;
      if (mon.state === "chase") moveTarget = hero.mesh.position;
      else if (mon.state === "patrol") moveTarget = mon.targetPos;
      else if (mon.state === "return") moveTarget = new THREE.Vector3(mon.homeX, 0, mon.homeZ);

      if (moveTarget) {
        const mDist = mon.group.position.distanceTo(moveTarget);
        const stopDist = (mon.state === "chase" ? 2.2 : 0.6);
        if (mDist > stopDist) {
          const dir = new THREE.Vector3().subVectors(moveTarget, mon.group.position);
          dir.y = 0;
          dir.normalize();
          const targetAng = Math.atan2(dir.x, dir.z);

          let diff = targetAng - mon.curAngle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          mon.curAngle += diff * dt * 5.5;
          mon.facing = mon.curAngle;

          const mSpd = (mon.state === "chase" ? 5.2 : 3.0) * (1 - Math.min(90, mon.slowPct || 0) / 100);
          mon.group.position.addScaledVector(dir, mSpd * dt);
          mon.walkPhase += dt * (mon.state === "chase" ? 7.5 : 4.5);
          mon.isMoving = true;
        } else {
          mon.isMoving = false;
          // Khi đã áp sát chiến đấu (cận chiến), quái luôn quay mặt thẳng vào hiệp khách để ra đòn
          if (mon.state === "chase") {
            const dirToHero = new THREE.Vector3().subVectors(hero.mesh.position, mon.group.position);
            mon.facing = Math.atan2(dirToHero.x, dirToHero.z);
            mon.curAngle = mon.facing;
          }
        }
      } else {
        mon.isMoving = false;
      }
      }

      mon.ctx.clearRect(0, 0, 160, 160);
      const relMonAng = mon.facing - camYaw;
      const drawOpt = {
        ang: relMonAng,
        walk: mon.walkPhase,
        moving: mon.isMoving,
        hit: mon.hitTimer,
        boss: mon.type.includes("boss"),
        time: timeSec
      };

      if (mon.type === "rabbit") ChibiRenderer.drawRabbit(mon.ctx, 80, 140, drawOpt);
      else if (mon.type === "wolf" || mon.type === "boss") ChibiRenderer.drawWolf(mon.ctx, 80, 140, drawOpt);
      else if (mon.type === "boar") ChibiRenderer.drawBoar(mon.ctx, 80, 140, drawOpt);
      else if (mon.type === "bandit") ChibiRenderer.drawBandit(mon.ctx, 80, 140, drawOpt);
      else if (mon.type === "tiger") ChibiRenderer.drawTiger(mon.ctx, 80, 140, drawOpt);

      mon.tex.needsUpdate = true;
    }

    // 6. Render NPCs Chibi & Hoạt ảnh dấu "?" và "!" lơ lửng trên đầu
    for (const npc of npcs) {
      npc.ctx.clearRect(0, 0, 160, 160);
      ChibiRenderer.drawNpc(npc.ctx, 80, 140, npc.roleType, { time: timeSec });
      npc.tex.needsUpdate = true;

      // Hiệu ứng nhấp nhô lơ lửng cho dấu ? và !
      if (npc.questMarker && npc.questMarker.sprite.visible) {
        npc.questMarker.sprite.position.y = 5.2 + Math.sin(timeSec * 4.5) * 0.18;
      }
    }

    // 7. Chữ số sát thương nổi
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
      const ft = floatingTexts[i];
      ft.sprite.position.y += ft.vy;
      ft.life -= dt;
      ft.sprite.material.opacity = Math.max(0, ft.life);
      if (ft.life <= 0) {
        scene.remove(ft.sprite);
        floatingTexts.splice(i, 1);
      }
    }

    // 7.5 Cập nhật Đường đạn Chiêu thức 3D & Sóng Xung Kích Bạo Kích
    for (let i = activeSkillFX.length - 1; i >= 0; i--) {
      const fx = activeSkillFX[i];
      fx.timer += dt;
      const p = Math.min(1, fx.timer / fx.totalTime);
      fx.mesh.position.lerpVectors(fx.startPos, fx.targetPos, p);

      // Cập nhật hoạt ảnh xoay / lượn riêng biệt theo từng loại võ công
      if (fx.mesh.userData && typeof fx.mesh.userData.onUpdate === "function") {
        fx.mesh.userData.onUpdate(dt, fx.timer);
      } else {
        fx.mesh.rotateZ(dt * 8);
      }

      if (p >= 1) {
        scene.remove(fx.mesh);
        if (typeof fx.onImpact === "function") fx.onImpact();
        activeSkillFX.splice(i, 1);
      }
    }

    for (let i = activeImpactFX.length - 1; i >= 0; i--) {
      const imp = activeImpactFX[i];
      if (typeof imp.update === "function") {
        if (!imp.update(dt)) activeImpactFX.splice(i, 1);
        continue;
      }
      imp.timer += dt;
      const p = imp.timer / imp.maxTime;
      if (imp.ring) {
        imp.ring.scale.set(1 + p * 3.2, 1 + p * 3.2, 1);
        imp.ring.material.opacity = Math.max(0, 1 - p);
      }
      if (imp.particles) {
        for (const pt of imp.particles) {
          pt.mesh.position.addScaledVector(pt.vel, dt);
          pt.vel.y -= dt * 9.8;
        }
      }
      if (imp.timer >= imp.maxTime) {
        scene.remove(imp.group);
        activeImpactFX.splice(i, 1);
      }
    }

    // 8. Cập nhật Hạt Thời Tiết (Mưa, Tuyết, Gió, Hoa)
    if (currentWeather === "rain") {
      const rArr = rainGeo.attributes.position.array;
      for (let i = 0; i < rainCount; i++) {
        rArr[i * 3 + 1] -= 1.8;
        rArr[i * 3] += 0.2;
        if (rArr[i * 3 + 1] < 0.2) rArr[i * 3 + 1] = 80;
      }
      rainGeo.attributes.position.needsUpdate = true;
    } else if (currentWeather === "snow") {
      const sArr = snowGeo.attributes.position.array;
      for (let i = 0; i < snowCount; i++) {
        sArr[i * 3 + 1] -= 0.18;
        sArr[i * 3] += Math.sin(timeSec + i) * 0.08;
        if (sArr[i * 3 + 1] < 0.2) sArr[i * 3 + 1] = 80;
      }
      snowGeo.attributes.position.needsUpdate = true;
    } else {
      const pArr = petalGeo.attributes.position.array;
      const windSpeed = (currentWeather === "windy") ? 0.35 : 0.04;
      for (let i = 0; i < petalCount; i++) {
        pArr[i * 3 + 1] -= 0.04;
        pArr[i * 3] += Math.sin(timeSec + i) * 0.04 + windSpeed;
        if (pArr[i * 3 + 1] < 0.2) pArr[i * 3 + 1] = 28;
      }
      petalGeo.attributes.position.needsUpdate = true;
    }

    // 8.5 Cập nhật Cây Cối & Bụi Trúc Lắc Lư Theo Gió Như Thật (Wind Sway Physics)
    const isWindy = (currentWeather === "windy");
    const windSpeed = isWindy ? 3.2 : 1.8;
    const windAmp = isWindy ? 0.055 : 0.025;
    for (let i = 0; i < trees.length; i++) {
      const tr = trees[i];
      if (!tr || !tr.group) continue;
      const phase = timeSec * (tr.speed || windSpeed) + (tr.ox || 0) * 0.07 + (tr.oz || 0) * 0.05;
      tr.group.rotation.z = Math.sin(phase) * windAmp;
      tr.group.rotation.x = Math.cos(phase * 0.85) * (windAmp * 0.55);
    }

    // 9. Cập nhật Minimap
    miniMapTimer += dt;
    if (miniMapTimer > 0.12) {
      miniMapTimer = 0;
      renderMinimap();
    }

    renderer.render(scene, camera);

    // Cập nhật & Vẽ hiệu ứng chiêu thức chuẩn 100% bản 2.5D lên màn hình
    if (window.updateAndRenderFx2D) {
      window.camera3D = camera;
      window.updateAndRenderFx2D(dt);
    }
  }

  requestAnimationFrame(gameLoop);

  // Resize window
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

})();
