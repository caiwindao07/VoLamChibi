/* =====================================================================
   CẤU HÌNH TOÀN BỘ 12 MÔN PHÁI & KỸ NĂNG CHUẨN XÁC 100% TỪ BẢN 2.5D
   Nguồn gốc: js/game.js (FACTIONS) & js/cau-hinh-phai.js (FACTION_CFG)
   Bao gồm đầy đủ 12 đại phái: Võ Đang, Thiếu Lâm, Cái Bang, Nga Mi,
   Đường Môn, Côn Lôn, Thiên Vương, Thiên Nhẫn, Thúy Yên, Thiên Sơn, Tiêu Dao, Ngũ Độc.
   ===================================================================== */

window.FACTION_PVE_CFG = {
  quyen: 2.4, thuong: 1.0, xa: 1.0, tien: 1.13, nguyet: 2.0,
  thuy: 1.85, dao: 1.0, tieu: 1.0, truc: 1.0, hoa: 2.8, kiem: 1.9, bang: 1.4
};

// Hệ số cân bằng sát thương PvE theo cấp, lấy từ cấu hình 2.5D hiện tại.
// Các mốc được nội suy tuyến tính; trên cấp cuối giữ hệ số cuối như bản gốc.
window.FACTION_PVE_LEVEL_CFG = {
  quyen: { cap5: .352, cap15: .471, cap30: .426, cap50: .34, cap60: .12, cap90: .075, cap120: .032, cap150: .02 },
  thuong: { cap5: 1.051, cap15: .359, cap30: .116, cap50: .243, cap60: .238, cap90: .224, cap120: .107, cap150: .032 },
  xa: { cap5: .535, cap15: .687, cap30: .678, cap50: .854, cap60: .754, cap90: .456, cap120: .612, cap150: .114 },
  tien: { cap5: 1.352, cap15: 2.769, cap30: 1.386, cap50: 3.738, cap60: 3.304, cap90: 2, cap120: 1.571, cap150: 1.494 },
  nguyet: { cap5: .753, cap15: .849, cap30: .844, cap50: 2.639, cap60: 2.274, cap90: 1.18, cap120: 1.069, cap150: 1 },
  thuy: { cap5: 1.026, cap15: .803, cap30: .855, cap50: .52, cap60: .462, cap90: .287, cap120: .295, cap150: .134 },
  truc: { cap5: 1.049, cap15: 1.377, cap30: .733, cap50: 2.333, cap60: 2.194, cap90: 1.775, cap120: 1.998, cap150: 1.653 },
  hoa: { cap5: 1.542, cap15: 1.165, cap30: 1.095, cap50: .74, cap60: .607, cap90: .209, cap120: .085, cap150: .06 },
  kiem: { cap5: 1.146, cap15: 1.748, cap30: .976, cap50: .999, cap60: .808, cap90: .235, cap120: .142, cap150: .067 },
  bang: { cap5: .762, cap15: 1.144, cap30: .927, cap50: 1.112, cap60: 1.01, cap90: .704, cap120: .897, cap150: .299 }
};

window.getElementMultiplier = function(heroEl, monsterEl) {
  if (!heroEl || !monsterEl) return 1.0;
  const H = heroEl.trim(); const M = monsterEl.trim();
  if ((H === "Kim" && M === "Mộc") || (H === "Mộc" && M === "Thổ") || (H === "Thổ" && M === "Thủy") || (H === "Thủy" && M === "Hỏa") || (H === "Hỏa" && M === "Kim")) return 1.35;
  if ((H === "Mộc" && M === "Kim") || (H === "Thổ" && M === "Mộc") || (H === "Thủy" && M === "Thổ") || (H === "Hỏa" && M === "Thủy") || (H === "Kim" && M === "Hỏa")) return 0.82;
  return 1.0;
};

window.ALL_FACTION_DATA = {
  "kiem": {
    "id": "kiem",
    "name": "Võ Đang",
    "element": "Thổ",
    "elKey": "tho",
    "icon": "⚔️",
    "desc": "Đạo sĩ núi Võ Đang: kiếm pháp thái cực cận chiến và quyền pháp nội công âm dương.",
    "routes": [
      {
        "name": "Kiếm Pháp",
        "desc": "Thái cực kiếm pháp",
        "wpn": "sword",
        "skills": [
          {
            "kind": "atk",
            "name": "Thương Hải Minh Nguyệt",
            "type": "melee",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "color": "#a8dcff",
            "d": "Thương hải minh nguyệt: kiếm quang như trăng sáng trên biển, chém liên tiếp một mục tiêu."
          },
          {
            "kind": "passive",
            "name": "Võ Đang Kiếm Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "critAdd": [
                1,
                0.3
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Kiếm pháp căn bản của Võ Đang, tăng uy lực các chiêu kiếm."
          },
          {
            "kind": "atk",
            "name": "Kiếm Phi Kinh Thiên",
            "type": "aoeTarget",
            "tier": 2,
            "mult": [
              1.9,
              0.12
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "range": 4.5,
            "radius": 3,
            "castTime": 0.55,
            "hitDelay": 1.35,
            "needSword": true,
            "stun": 1.6,
            "color": "#dff4ff",
            "d": "Niệm phép gọi 24 thanh kiếm rơi quanh mục tiêu, sau đó kiếm khí khép thành vòng nổ."
          },
          {
            "kind": "atk",
            "name": "Tam Hoàn Thao Nguyệt",
            "type": "homing",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 60,
            "range": 2.2,
            "count": 3,
            "one": true,
            "tot": 1.2,
            "pstyle": "flysword",
            "color": "#dff4ff",
            "d": "Phóng liên tiếp 3 kiếm khí vào mục tiêu; mỗi kiếm chạm tạo một đợt nổ."
          },
          {
            "kind": "atk",
            "name": "Nhân Kiếm Hợp Nhất",
            "type": "melee",
            "tier": 4,
            "mult": [
              3.8,
              0.24
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "range": 2.3,
            "halo": true,
            "noLunge": true,
            "needSword": true,
            "stun": 2,
            "color": "#fff0b0",
            "d": "Nhân kiếm hợp nhất (bắt buộc cầm kiếm): người và kiếm làm một, từ mũi kiếm tỏa hào quang chói lòa tầm ngắn, khiến đối phương choáng váng."
          }
        ]
      },
      {
        "name": "Quyền Pháp",
        "desc": "Thái cực quyền nội công",
        "noi": true,
        "skills": [
          {
            "kind": "atk",
            "name": "Nộ Lôi Chỉ",
            "type": "aoeTarget",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "radius": 1,
            "areaOrigin": "target",
            "color": "#cfe8ff",
            "d": "Nộ lôi chỉ: một chỉ điểm ra, vòng xoáy âm dương bốc lên ngay dưới chân kẻ địch."
          },
          {
            "kind": "passive",
            "name": "Võ Đang Quyền Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "mpPct": [
                3,
                0.6
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Quyền pháp căn bản của Võ Đang, tăng uy lực các chiêu quyền nội công."
          },
          {
            "kind": "atk",
            "name": "Bác Cấp Nhi Phục",
            "type": "aoeTarget",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "radius": 1.3,
            "areaOrigin": "target",
            "color": "#cfe8ff",
            "d": "Bác cấp nhi phục: lưỡng nghi xoay chuyển, vòng khí cuộn liên tục từ đất lên."
          },
          {
            "kind": "atk",
            "name": "Vô Ngã Vô Kiếm",
            "type": "aoeTarget",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 60,
            "radius": 1.6,
            "slow": [
              30,
              2
            ],
            "areaOrigin": "target",
            "color": "#dff0ff",
            "d": "Vô ngã vô kiếm: thái cực đồ hiện dưới chân địch, khí xoáy bốc lên đánh nhiều đợt."
          },
          {
            "kind": "atk",
            "name": "Thiên Địa Vô Cực",
            "type": "aoeTarget",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "radius": 2.6,
            "stun": 0.8,
            "color": "#e0f0ff",
            "d": "Thiên địa vô cực: thái cực đồ xoay dưới chân địch, vòng khí xoáy từ dưới cuộn lên liên hồi."
          }
        ]
      },
      {
        "name": "Hỗ Trợ",
        "desc": "Đạo gia tâm pháp",
        "skills": [
          {
            "kind": "passive",
            "name": "Thất Tinh Trận",
            "req": 0,
            "stats": {
              "accPct": [
                24,
                23.5
              ],
              "defPt": [
                97,
                37
              ]
            },
            "nid": "0",
            "vl": 20,
            "d": "Thất tinh trận (wudang.lua): bước theo thất tinh, chính xác +24→470%, phòng thủ +97→800 điểm."
          },
          {
            "kind": "passive",
            "name": "Thê Vân Tung",
            "req": 0,
            "stats": {
              "speedPct": [
                18,
                2.2
              ]
            },
            "nid": "1",
            "vl": 40,
            "d": "Thê vân tung (wudang.lua, bị động): khinh công đạp mây, tốc chạy +18→60%."
          },
          {
            "kind": "buff",
            "name": "Tọa Vọng Vô Ngã",
            "req": 0,
            "stats": {
              "mpShield": [
                [
                  1,
                  25
                ],
                [
                  20,
                  75
                ],
                [
                  40,
                  75
                ]
              ]
            },
            "dur": 150,
            "mp": [
              60,
              5
            ],
            "cd": 20,
            "nid": "2",
            "vl": 50,
            "color": "#d8e8ff",
            "d": "Tọa vọng vô ngã: chân khí hộ thể 150 giây, bát quái hiện trên đầu. 25→75% sát thương nhận vào trừ thẳng vào Nội lực thay cho Sinh lực, biến nội lực dồi dào của Võ Đang thành lớp giáp thứ hai. Nội lực cạn thì giáp vỡ, sát thương lại trừ vào máu: nhớ bơm thuốc nội lực khi bị đánh hội đồng."
          },
          {
            "kind": "passive",
            "name": "Thái Cực Thần Công",
            "req": 0,
            "stats": {
              "atkPct": [
                12,
                2
              ],
              "defPct": [
                12,
                2
              ],
              "critAdd": [
                4,
                0.5
              ]
            },
            "nid": "tp",
            "vl": 60,
            "tp": true,
            "color": "#c9f0ff",
            "d": "Tuyệt kỹ trấn phái (bị động theo wudang.lua): tốc đánh, tốc xuất chiêu, lôi sát, nội lực tối đa, hồi nội, chí mạng, tăng hiệu quả lôi. Cộng điểm là có hiệu lực."
          }
        ]
      }
    ]
  },
  "thuong": {
    "id": "thuong",
    "name": "Thiết Thương Bảo",
    "element": "Kim",
    "elKey": "kim",
    "icon": "🔱",
    "desc": "Thiên Vương bang chúng mặc giáp: đao, thương, chùy đều tinh, giữ vững trận tuyến.",
    "routes": [
      {
        "name": "Thương Pháp",
        "desc": "Trường thương đâm xa, quét rộng",
        "wpn": "spear",
        "skills": [
          {
            "kind": "atk",
            "name": "Hồi Phong Lạc Nhạn",
            "type": "melee",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "color": "#ffd9a0",
            "d": "Hồi phong lạc nhạn: mũi thương xoay như gió cuốn, đâm hạ kẻ địch như bắn rơi nhạn."
          },
          {
            "kind": "passive",
            "name": "Thiên Vương Thương Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "critAdd": [
                1,
                0.3
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Thương pháp căn bản của Thiên Vương Bang, tăng uy lực các chiêu thương."
          },
          {
            "kind": "atk",
            "name": "Dương Quan Tam Điệp",
            "type": "multi",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "count": 3,
            "range": 3,
            "color": "#ffcf8a",
            "pstyle": "spear",
            "d": "Dương quang tam điệp: ba đạo thương quang như nắng gắt, trúng ba kẻ địch."
          },
          {
            "kind": "atk",
            "name": "Đoạn Hồn Thích",
            "type": "melee",
            "tier": 2,
            "mult": [
              1.9,
              0.12
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "dh",
            "vl": 40,
            "stun": 1,
            "noW": true,
            "share": [
              2,
              0,
              1
            ],
            "color": "#ffe0a0",
            "d": "Đoạn hồn thích: một đòn đâm xuyên hồn phách, đánh choáng. Chiêu chung của cả ba lộ Đao, Thương, Chùy, dùng vũ khí nào cũng được."
          },
          {
            "kind": "atk",
            "name": "Huyết Chiến Bát Phương",
            "type": "aoeSelf",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 60,
            "radius": 2.9,
            "leech": 8,
            "slow": [
              30,
              2
            ],
            "color": "#ffb86a",
            "d": "Huyết chiến bát phương: múa thương quét tám hướng giữa vòng vây, hút máu kẻ địch."
          },
          {
            "kind": "atk",
            "name": "Truy Tinh Trục Nguyệt",
            "type": "wave",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "wstyle": "spear",
            "fan": 3,
            "ww": 1.1,
            "range": 8,
            "color": "#ffcf8a",
            "d": "Truy tinh trục nguyệt: ba đạo thương khí đuổi sao đuổi trăng xòe hình quạt, xuyên qua mọi kẻ địch."
          }
        ]
      },
      {
        "name": "Chùy Pháp",
        "desc": "Song chùy làm choáng, hút máu",
        "wpn": "mace",
        "skills": [
          {
            "kind": "atk",
            "name": "Trảm Long Quyết",
            "type": "melee",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "stun": 0.8,
            "combo": 2,
            "color": "#e8d6b0",
            "d": "Trảm long quyết: song chùy hai tay nện liền hai đòn, đánh choáng mục tiêu."
          },
          {
            "kind": "passive",
            "name": "Thiên Vương Chùy Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "defPct": [
                2,
                0.5
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Chùy pháp căn bản của Thiên Vương Bang."
          },
          {
            "kind": "atk",
            "name": "Hàng Vân Quyết",
            "type": "aoeSelf",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "radius": 2.4,
            "stun": 0.8,
            "color": "#d9b36a",
            "d": "Hàng vân quyết: nện chùy xuống đất, mây tan đất chấn, choáng kẻ địch xung quanh."
          },
          {
            "kind": "atk",
            "name": "Thừa Long Quyết",
            "type": "melee",
            "tier": 3,
            "mult": [
              2.8,
              0.18
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 60,
            "leech": 15,
            "combo": 3,
            "color": "#ff9a7a",
            "d": "Thừa long quyết: song chùy luân phiên giáng liền ba đòn như cưỡi rồng, hút máu kẻ địch."
          },
          {
            "kind": "atk",
            "name": "Truy Phong Quyết",
            "type": "melee",
            "tier": 4,
            "mult": [
              3.8,
              0.24
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "combo": 4,
            "root": 1.6,
            "range": 1.9,
            "color": "#ffd27a",
            "d": "Truy phong quyết: song chùy đuổi gió, bốn đòn liên hoàn để lại luồng sáng vàng và trói chân kẻ địch."
          }
        ]
      },
      {
        "name": "Đao Pháp",
        "desc": "Kỵ đao, ra chiêu được trên lưng ngựa",
        "wpn": "blade",
        "skills": [
          {
            "kind": "atk",
            "name": "Kinh Lôi Trảm",
            "type": "melee",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "color": "#f0e0c0",
            "d": "Kinh lôi trảm: đao chém như sét đánh."
          },
          {
            "kind": "passive",
            "name": "Thiên Vương Đao Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "aspdPct": [
                2,
                0.5
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Đao pháp căn bản của Thiên Vương Bang."
          },
          {
            "kind": "atk",
            "name": "Bát Phong Trảm",
            "type": "aoeSelf",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "radius": 2.4,
            "color": "#ffd9a0",
            "d": "Bát phong trảm: quét đao tám hướng gió quanh mình."
          },
          {
            "kind": "atk",
            "name": "Vô Tâm Trảm",
            "type": "melee",
            "tier": 3,
            "mult": [
              2.8,
              0.18
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 60,
            "range": 4.2,
            "dash": true,
            "color": "#ffcf8a",
            "d": "Vô tâm trảm: phi thân xông tới chém một đao vô tình, đánh lan kẻ địch quanh mục tiêu."
          },
          {
            "kind": "atk",
            "name": "Phá Thiên Trảm",
            "type": "melee",
            "tier": 4,
            "mult": [
              3.8,
              0.24
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "combo": 4,
            "leech": 6,
            "range": 2.1,
            "color": "#ffcf8a",
            "d": "Phá thiên trảm: kỵ đao chém liên hoàn bốn nhát rung trời, hút sinh lực."
          }
        ]
      },
      {
        "name": "Hỗ Trợ",
        "desc": "Tâm pháp và giáp trụ",
        "skills": [
          {
            "kind": "buff",
            "name": "Tĩnh Tâm Quyết",
            "req": 0,
            "stats": {
              "defPct": [
                10,
                2
              ],
              "hpRegen": [
                0.2,
                0.04
              ]
            },
            "dur": 90,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "0",
            "vl": 20,
            "color": "#cfe0ff",
            "d": "Tĩnh tâm quyết: tâm tĩnh như nước, khí huyết lưu thông, phòng thủ tăng."
          },
          {
            "kind": "buff",
            "name": "Kim Chung Tráo",
            "req": 0,
            "stats": {
              "defPct": [
                20,
                3
              ],
              "hpPct": [
                6,
                1
              ]
            },
            "dur": 90,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "1",
            "vl": 50,
            "color": "#ffd35a",
            "d": "Kim chung tráo: chuông vàng bao phủ thân thể, đao thương khó phạm."
          },
          {
            "kind": "buff",
            "name": "Thiên Vương Chiến Ý",
            "req": 0,
            "stats": {
              "atkPct": [
                15,
                2.5
              ],
              "defPct": [
                15,
                2
              ],
              "critAdd": [
                4,
                0.5
              ]
            },
            "dur": 60,
            "mp": [
              30,
              2
            ],
            "cd": 20,
            "nid": "tp",
            "vl": 60,
            "tp": true,
            "color": "#ffcf8a",
            "d": "Tuyệt kỹ trấn phái: chiến ý Thiên Vương ngút trời, công thủ đều tăng mạnh."
          }
        ]
      }
    ]
  },
  "truc": {
    "id": "truc",
    "name": "Cái Bang",
    "element": "Hỏa",
    "elKey": "hoa",
    "icon": "🎋",
    "desc": "Hành khất giang hồ, Hàng Long chưởng hóa rồng lửa, côn pháp Cái Bang xanh biếc, túy quyền khó lường.",
    "routes": [
      {
        "name": "Chưởng Pháp",
        "desc": "Hàng Long thập bát chưởng",
        "skills": [
          {
            "kind": "atk",
            "name": "Kiến Nhân Thần Thủ",
            "type": "proj",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "n",
            "vl": 0,
            "color": "#ffb347",
            "pstyle": "palm",
            "d": "Kiến nhân thần thủ: tung một chưởng, chưởng lực hóa bàn tay lửa lao tới kẻ địch."
          },
          {
            "kind": "passive",
            "name": "Cái Bang Chưởng Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "critAdd": [
                1,
                0.3
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Tâm pháp chưởng lực bí truyền của Cái Bang, tăng uy lực các chiêu chưởng."
          },
          {
            "kind": "atk",
            "name": "Giáng Long Chưởng",
            "type": "homing",
            "tier": 2,
            "mult": [
              1.9,
              0.12
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "g",
            "vl": 30,
            "count": 1,
            "color": "#ff9a3c",
            "pstyle": "dragon",
            "d": "Giáng long chưởng: chưởng lực hóa rồng lửa lượn quanh thân rồi lao vào kẻ địch."
          },
          {
            "kind": "atk",
            "name": "Kháng Long Hữu Hối",
            "type": "wave",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "k",
            "vl": 50,
            "wstyle": "fire",
            "freeDragon": true,
            "color": "#ffb347",
            "dot": [
              25,
              3
            ],
            "d": "Kháng long hữu hối: rồng lửa gầm thét lao về phía trước, không truy đuổi. Cấp càng cao rồng càng nhiều, tỏa hình quạt."
          },
          {
            "kind": "atk",
            "name": "Phi Long Tại Thiên",
            "type": "homing",
            "tier": 4,
            "mult": [
              1.35,
              0.1
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "f",
            "vl": 90,
            "count": 4,
            "color": "#ff7a2e",
            "pstyle": "dragon",
            "d": "Phi long tại thiên: bốn rồng lửa bay lượn khắp trời rồi cùng lao xuống kẻ địch."
          }
        ]
      },
      {
        "name": "Bổng Pháp",
        "desc": "Đả cẩu bổng pháp",
        "wpn": "staff",
        "skills": [
          {
            "kind": "atk",
            "name": "Diên Môn Thác Bát",
            "type": "melee",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "n",
            "vl": 0,
            "range": 1.8,
            "color": "#b8e68a",
            "d": "Diên môn thác bát: chìa bát xin ăn, gậy trúc gõ nhanh như chớp."
          },
          {
            "kind": "passive",
            "name": "Cái Bang Bổng Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "aspdPct": [
                2,
                0.5
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Căn bản Đả Cẩu Bổng Pháp, tăng uy lực và tốc đánh côn pháp."
          },
          {
            "kind": "atk",
            "name": "Đả Cẩu Trận",
            "type": "aoeSelf",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "d",
            "vl": 30,
            "radius": 2.6,
            "color": "#a6e07a",
            "d": "Đả cẩu trận: múa gậy thành trận, gậy trúc xoay tít đánh mọi kẻ địch quanh mình."
          },
          {
            "kind": "atk",
            "name": "Bổng Đả Ác Cẩu",
            "type": "homing",
            "tier": 3,
            "mult": [
              1.3,
              0.1
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "b",
            "vl": 50,
            "count": 8,
            "free8": true,
            "color": "#9fe07a",
            "pstyle": "bamboo",
            "d": "Bổng đả ác cẩu: tám thanh trúc tỏa ra tám hướng quanh người, trúng ai thì trúng."
          },
          {
            "kind": "atk",
            "name": "Thiên Hạ Vô Cẩu",
            "type": "homing",
            "tier": 4,
            "mult": [
              1.7,
              0.12
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "t",
            "vl": 90,
            "count": 3,
            "stun": 0.6,
            "color": "#8fe06a",
            "pstyle": "bamboo",
            "d": "Thiên hạ vô cẩu: ba thanh trúc xanh song song cùng lao vào một kẻ địch, đánh choáng."
          }
        ]
      },
      {
        "name": "Hỗ Trợ",
        "desc": "Thân pháp và túy quyền",
        "skills": [
          {
            "kind": "buff",
            "name": "Hóa Hiểm Vi Di",
            "req": 0,
            "stats": {
              "defPct": [
                15,
                2.5
              ],
              "hpRegen": [
                0.3,
                0.05
              ]
            },
            "dur": 90,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "h",
            "vl": 20,
            "color": "#c9b07a",
            "d": "Hóa hiểm vi di: biến nguy thành an, thân thể cứng cáp, hồi phục nhanh."
          },
          {
            "kind": "buff",
            "name": "Hoạt Bát Lưu Thủ",
            "req": 0,
            "stats": {
              "aspdPct": [
                12,
                1.5
              ],
              "speedPct": [
                10,
                1.5
              ]
            },
            "dur": 90,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "l",
            "vl": 40,
            "color": "#9be8a8",
            "d": "Hoạt bát lưu thủ: tay chân trơn như cá, ra đòn và di chuyển nhanh hơn."
          },
          {
            "kind": "passive",
            "name": "Tiêu Dao Công",
            "req": 0,
            "stats": {
              "speedPct": [
                8,
                1
              ],
              "critAdd": [
                2,
                0.5
              ]
            },
            "nid": "x",
            "vl": 60,
            "d": "Tiêu diêu công: khinh công tiêu dao, bước chân phiêu hốt."
          },
          {
            "kind": "buff",
            "name": "Túy Điệp Cuồng Vũ",
            "req": 0,
            "stats": {
              "atkPct": [
                15,
                2.5
              ],
              "critAdd": [
                6,
                0.8
              ],
              "aspdPct": [
                8,
                1
              ]
            },
            "dur": 60,
            "mp": [
              30,
              2
            ],
            "cd": 20,
            "nid": "tp",
            "vl": 60,
            "tp": true,
            "color": "#ffb347",
            "d": "Tuyệt kỹ trấn phái: say như bướm múa, đòn đánh cuồng bạo khó lường."
          }
        ]
      }
    ]
  },
  "xa": {
    "id": "xa",
    "name": "Đường Môn",
    "element": "Mộc",
    "elKey": "moc",
    "icon": "🎯",
    "desc": "Thế gia ám khí đất Thục: phi đao, phi tiêu, tụ tiễn bách phát bách trúng, cạm bẫy ngũ hành chôn dưới đất ai dẫm phải là nổ.",
    "routes": [
      {
        "name": "Phi Đao",
        "desc": "Phi đao đoạt mệnh. Phải cầm Phi Đao",
        "wpn": "dagger",
        "skills": [
          {
            "kind": "atk",
            "name": "Truy Tâm Tiễn",
            "type": "proj",
            "tier": 2,
            "mult": [
              1.9,
              0.12
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "g",
            "vl": 30,
            "color": "#dff4ff",
            "pstyle": "comet",
            "d": "Truy tâm tiễn: phi đao vận nội lực hóa thành luồng sáng trắng như sao chổi, kéo vệt sương dài lao thẳng vào tim kẻ địch."
          },
          {
            "kind": "atk",
            "name": "Tiểu Lý Phi Đao",
            "type": "proj",
            "tier": 3,
            "mult": [
              2.8,
              0.18
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "k",
            "vl": 60,
            "critAdd": 15,
            "color": "#e8f4ff",
            "pstyle": "flydagger",
            "d": "Tiểu Lý phi đao, lệ bất hư phát: một đao duy nhất, cực dễ chí mạng."
          },
          {
            "kind": "atk",
            "name": "Nhiếp Hồn Nguyệt Ảnh",
            "type": "proj",
            "tier": 4,
            "mult": [
              3.8,
              0.24
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "goldLv": 12,
            "slow": [
              30,
              2
            ],
            "color": "#e6f6ff",
            "pstyle": "jade",
            "d": "Nhiếp hồn nguyệt ảnh: phóng một cái bóng lướt dưới mặt đất xuyên qua kẻ địch, ai bị chạm đều hiện cầu vàng và bị phi đao vàng bốn phía ghim vào, mặt đất nứt vỡ. Từ cấp 12 bóng đi xa hơn, cầu vàng lớn hơn."
          }
        ]
      },
      {
        "name": "Phi Tiêu",
        "desc": "Phi tiêu ám khí. Phải cầm Phi Tiêu",
        "wpn": "dart",
        "skills": [
          {
            "kind": "atk",
            "name": "Phích Lịch Đơn",
            "type": "aoeTarget",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "n",
            "vl": 0,
            "radius": 1.6,
            "color": "#ffb060",
            "style": "fire",
            "share": [
              0,
              1,
              2
            ],
            "d": "Phích lịch đơn: ném đạn phích lịch nổ tung cả một vùng. Võ công nhập môn của cả ba lộ ám khí Phi Đao, Phi Tiêu, Tụ Tiễn."
          },
          {
            "kind": "atk",
            "name": "Đoạt Hồn Tiêu",
            "type": "proj",
            "tier": 2,
            "mult": [
              1.9,
              0.12
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "g",
            "vl": 30,
            "critAdd": 10,
            "dot": [
              35,
              4
            ],
            "color": "#ffffff",
            "pstyle": "bigstar",
            "d": "Đoạt hồn tiêu: một chiếc phi tiêu hoa trắng lớn xoay tít lao thẳng vào kẻ địch, đoạt hồn tức khắc."
          },
          {
            "kind": "atk",
            "name": "Tán Hoa Tiêu",
            "type": "multi",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "k",
            "vl": 60,
            "count": 5,
            "dot": [
              25,
              3
            ],
            "color": "#f4f8ff",
            "pstyle": "xstar",
            "d": "Tán hoa tiêu: phóng một loạt phi tiêu chữ thập trắng tỏa ra như hoa nở, trúng tối đa năm kẻ địch."
          },
          {
            "kind": "atk",
            "name": "Cửu Cung Phi Tinh",
            "type": "multi",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "count": 5,
            "coins": true,
            "dot": [
              30,
              4
            ],
            "color": "#ffd23a",
            "d": "Cửu cung phi tinh: tung năm đồng tiền tiêu vàng bay hết tầm theo hướng ném rồi đổi chiều bay ngược đúng đường cũ về, đi và về đều trúng kẻ trên đường bay."
          }
        ]
      },
      {
        "name": "Tụ Tiễn",
        "desc": "Ám tiễn bắn bằng cung, ngồi trên ngựa vẫn thi triển được. Phải cầm Cung",
        "wpn": "bow",
        "skills": [
          {
            "kind": "atk",
            "name": "Mạn Thiên Hoa Vũ",
            "type": "aoeTarget",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "g",
            "vl": 30,
            "radius": 2.6,
            "splitHits": true,
            "dot": [
              35,
              4
            ],
            "color": "#9fe0b0",
            "style": "petals",
            "d": "Mạn thiên hoa vũ: tụ khí toàn thân rồi bắn tụ tiễn lên trời, rơi xuống như mưa hoa phủ kín cả một vùng, đánh nhiều lượt."
          },
          {
            "kind": "atk",
            "name": "Thiên La Địa Võng",
            "type": "proj",
            "tier": 3,
            "mult": [
              2.8,
              0.18
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "k",
            "vl": 60,
            "root": 1.2,
            "color": "#cfe8ff",
            "pstyle": "needle",
            "d": "Thiên la địa võng: tụ tiễn phóng ra một mũi ám tiễn bung thành lưới, kẻ trúng tên bị trói chân."
          },
          {
            "kind": "atk",
            "name": "Bạo Vũ Lê Hoa",
            "type": "proj",
            "tier": 4,
            "mult": [
              3.8,
              0.24
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "burstLv": 12,
            "saw": true,
            "dot": [
              30,
              4
            ],
            "color": "#f4fbff",
            "pstyle": "needle",
            "d": "Bạo vũ lê hoa: mũi ám tiễn trúng đích hóa bánh răng cưa trắng xoáy tít tại chỗ khoảng 1 giây, cắt liên tục kẻ đứng sát tâm (trúng 40% + 4 lần × 20% sức chiêu). Kẻ bị bánh răng chạm phải bị xoáy hút vào tâm khoảng 1,1 giây, không tự đi ra được; chỉ dòng Giảm thời gian làm chậm rút ngắn được hiệu ứng này (boss không bị hút). Từ cấp 12 mảnh tiễn văng ra xung quanh, trúng thêm kẻ địch gần đó (sát thương nhỏ). Cưỡi ngựa vẫn thi triển được."
          }
        ]
      },
      {
        "name": "Cạm Bẫy",
        "desc": "Chôn bẫy dưới đất, kẻ địch dẫm phải là nổ, vùng nổ duy trì 2,5 giây, cứ 0,5 giây đốt thêm kẻ địch còn trong vùng. Bẫy tàng hình chỉ người đặt thấy, giữ 10 giây. Sát thương nội công, phải xuống ngựa mới đặt bẫy",
        "noMount": true,
        "trap": true,
        "noi": true,
        "skills": [
          {
            "kind": "atk",
            "name": "Địa Diệm Hỏa",
            "type": "aoeTarget",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "a",
            "vl": 10,
            "radius": 1.8,
            "dot": [
              30,
              4
            ],
            "glyph": "火",
            "color": "#ff7a3a",
            "style": "fire",
            "d": "Địa diệm hỏa (Hỏa): chôn bẫy lửa dưới đất, kẻ địch dẫm phải lửa phun lên thiêu đốt."
          },
          {
            "kind": "atk",
            "name": "Độc Thích Cốt",
            "type": "aoeTarget",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "b",
            "vl": 20,
            "radius": 1.9,
            "dot": [
              40,
              5
            ],
            "glyph": "木",
            "color": "#7ad04a",
            "style": "cloud",
            "d": "Độc thứ cốt (Mộc): chôn bẫy độc, kẻ địch dẫm phải gai độc mọc lên, trúng độc bào mòn máu."
          },
          {
            "kind": "atk",
            "name": "Xuyên Tâm Thích",
            "type": "aoeTarget",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "c",
            "vl": 30,
            "radius": 2,
            "leech": 6,
            "glyph": "金",
            "color": "#e8d890",
            "style": "blades",
            "d": "Xuyên tâm thích (Kim): chôn bẫy chông sắt, kẻ địch dẫm phải bị đâm xuyên, hút máu."
          },
          {
            "kind": "atk",
            "name": "Hàn Băng Thích",
            "type": "aoeTarget",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "d",
            "vl": 40,
            "radius": 2.1,
            "slow": [
              45,
              3
            ],
            "glyph": "水",
            "color": "#9fe0ff",
            "style": "ice",
            "d": "Hàn băng thích (Thủy): chôn bẫy băng, kẻ địch dẫm phải gai băng trồi lên, đông cứng chậm chạp."
          },
          {
            "kind": "atk",
            "name": "Lôi Kích Thuật",
            "type": "aoeTarget",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "e",
            "vl": 50,
            "radius": 2.2,
            "stun": 0.8,
            "glyph": "土",
            "color": "#e0c890",
            "style": "rocks",
            "d": "Lôi kích thuật (Lôi): chôn bẫy địa lôi, kẻ địch dẫm phải sét nổ tung, đất đá văng lên làm choáng."
          },
          {
            "kind": "atk",
            "name": "Loạn Hoàn Kích",
            "type": "aoeTarget",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "radius": 3.2,
            "dot": [
              40,
              4
            ],
            "stun": 0.6,
            "chain": 5,
            "glyph": "陣",
            "color": "#c8ff8a",
            "style": "fire",
            "d": "Loạn hoàn kích: chôn trận bẫy ngũ hành, kẻ địch dẫm phải thì lửa, băng, sét, độc, chông nổ liên hoàn năm lượt, phá tan cả một vùng."
          }
        ]
      },
      {
        "name": "Hỗ Trợ",
        "desc": "Ám khí tâm pháp",
        "skills": [
          {
            "kind": "passive",
            "name": "Ám Khí Đường Môn",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "critAdd": [
                2,
                0.4
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Tâm pháp ám khí Đường Môn: thủ pháp nhanh, ra tay chuẩn xác."
          },
          {
            "kind": "buff",
            "name": "Tâm Nhãn",
            "req": 0,
            "stats": {
              "critAdd": [
                8,
                0.8
              ],
              "atkPct": [
                12,
                2
              ],
              "speedPct": [
                6,
                0.6
              ]
            },
            "dur": 60,
            "mp": [
              30,
              2
            ],
            "cd": 20,
            "nid": "tp",
            "vl": 60,
            "tp": true,
            "color": "#9fe07a",
            "d": "Tuyệt kỹ trấn phái: tâm nhãn thông suốt, nhìn thấu sơ hở, ám khí phóng ra trăm phát trăm trúng."
          }
        ]
      }
    ]
  },
  "bang": {
    "id": "bang",
    "name": "Côn Lôn",
    "element": "Thổ",
    "elKey": "tho",
    "icon": "⚡",
    "desc": "Đạo sĩ núi Côn Lôn: đao hô phong, kiếm dẫn thiên lôi, bùa chú trói buộc và mê hoặc kẻ địch.",
    "routes": [
      {
        "name": "Đao Pháp",
        "desc": "Đao chém lốc xoáy",
        "wpn": "saber",
        "skills": [
          {
            "kind": "atk",
            "name": "Hô Phong Pháp",
            "type": "proj",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "color": "#d8f0d0",
            "pstyle": "tornado",
            "d": "Hô phong pháp: vung đao gọi gió, một cơn lốc xoáy bay tới kẻ địch."
          },
          {
            "kind": "passive",
            "name": "Côn Lôn Đao Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "critAdd": [
                1,
                0.3
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Đao pháp căn bản của Côn Lôn."
          },
          {
            "kind": "atk",
            "name": "Nhất Khí Tam Thanh",
            "type": "multi",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "count": 3,
            "color": "#d8f0d0",
            "pstyle": "tornado",
            "d": "Nhất khí tam thanh: một nhát đao tung ra ba cơn lốc cuốn nhiều mục tiêu."
          },
          {
            "kind": "atk",
            "name": "Cuồng Phong Sậu Điện",
            "type": "aoeTarget",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 50,
            "radius": 2.6,
            "slow": [
              35,
              2
            ],
            "color": "#e0f4e0",
            "d": "Cuồng phong sậu điện: gió cuồng chớp giật, vòi rồng hút kẻ địch vào tâm lốc."
          },
          {
            "kind": "atk",
            "name": "Ngạo Tuyết Tiêu Phong",
            "type": "wave",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "wstyle": "gale",
            "pierce": true,
            "color": "#fff0c8",
            "slow": [
              40,
              2
            ],
            "d": "Ngạo tuyết tiêu phong: khối cuồng phong cuộn tròn như mây tuyết lao tới, xuyên qua mọi kẻ địch trên đường, đến cuối tầm thì nổ tung."
          }
        ]
      },
      {
        "name": "Kiếm Pháp",
        "desc": "Kiếm dẫn thiên lôi",
        "wpn": "sword",
        "anyW": true,
        "noi": true,
        "skills": [
          {
            "kind": "atk",
            "name": "Cuồng Lôi Chấn Địa",
            "type": "aoeTarget",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "radius": 1.6,
            "color": "#c8b0ff",
            "d": "Cuồng lôi chấn địa: chỉ kiếm lên trời, sét đánh xuống mục tiêu."
          },
          {
            "kind": "passive",
            "name": "Côn Lôn Kiếm Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "mpPct": [
                3,
                0.6
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Kiếm pháp căn bản của Côn Lôn, tăng uy lực các chiêu lôi."
          },
          {
            "kind": "atk",
            "name": "Thiên Tế Tấn Lôi",
            "type": "aoeTarget",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "radius": 2.2,
            "stun": 0.8,
            "color": "#c8b0ff",
            "d": "Thiên tế tấn lôi: nhiều tia sét liên tiếp từ chân trời giáng xuống, kẻ địch tê liệt."
          },
          {
            "kind": "atk",
            "name": "Ngũ Lôi Chính Pháp",
            "type": "aoeSelf",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 60,
            "radius": 3,
            "stun": 1.2,
            "color": "#d8c8ff",
            "d": "Ngũ lôi chính pháp: năm đạo sấm sét giáng quanh thân, đánh bật mọi kẻ địch áp sát."
          },
          {
            "kind": "atk",
            "name": "Lôi Động Cửu Thiên",
            "type": "aoeTarget",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "radius": 3.4,
            "boltHit": 0.25,
            "hitMax": 30,
            "stun": 1,
            "color": "#c8b0ff",
            "d": "Lôi động cửu thiên: vô số tia sét từ chín tầng trời giáng xuống khắp vùng, đánh liên hồi."
          }
        ]
      },
      {
        "name": "Bùa Chú",
        "desc": "Bùa chú: yểm bùa lên kẻ địch hoặc lên chính mình, không gây sát thương",
        "skills": [
          {
            "kind": "curse",
            "name": "Thúc Phược Chú",
            "req": 0,
            "range": 6,
            "cd": 1.5,
            "nid": "tb",
            "vl": 10,
            "curse": {
              "refl": [
                [
                  1,
                  5
                ],
                [
                  20,
                  35
                ]
              ],
              "dur": [
                [
                  1,
                  45
                ],
                [
                  20,
                  120
                ]
              ]
            },
            "mp": [
              [
                1,
                30
              ],
              [
                20,
                40
              ]
            ],
            "color": "#b8f0c8",
            "d": "Thúc phược chú: lá bùa trói buộc dán lên kẻ địch, giảm phản đòn tầm xa của đối phương."
          },
          {
            "kind": "buff",
            "name": "Thanh Phong Phù",
            "req": 0,
            "stats": {
              "speedPct": [
                [
                  1,
                  22
                ],
                [
                  20,
                  60
                ]
              ]
            },
            "dur": 120,
            "mp": [
              [
                1,
                40
              ],
              [
                20,
                40
              ]
            ],
            "cd": 2,
            "nid": "tf",
            "vl": 10,
            "color": "#d8f0d0",
            "charm": true,
            "d": "Thanh phong phù: dán bùa gió lên mình, thân nhẹ như gió, tăng tốc độ di chuyển."
          },
          {
            "kind": "curse",
            "name": "Kí Bán Phù",
            "req": 0,
            "range": 6,
            "cd": 1.5,
            "nid": "kb",
            "vl": 20,
            "curse": {
              "spd": [
                [
                  1,
                  20
                ],
                [
                  20,
                  40
                ]
              ],
              "dur": [
                [
                  1,
                  20
                ],
                [
                  20,
                  90
                ]
              ]
            },
            "mp": [
              [
                1,
                60
              ],
              [
                20,
                60
              ]
            ],
            "color": "#e0d0ff",
            "d": "Kí bán phù: bùa vướng chân dán lên kẻ địch, giảm tốc độ di chuyển của đối phương."
          },
          {
            "kind": "curse",
            "name": "Bắc Minh Đảo Hải",
            "req": 0,
            "range": 6,
            "cd": 1.5,
            "nid": "bm",
            "vl": 30,
            "curse": {
              "drain": [
                [
                  1,
                  1
                ],
                [
                  20,
                  10
                ]
              ],
              "mdrain": [
                [
                  1,
                  1
                ],
                [
                  20,
                  10
                ]
              ],
              "dur": [
                [
                  1,
                  45
                ],
                [
                  20,
                  120
                ]
              ]
            },
            "mp": [
              [
                1,
                30
              ],
              [
                20,
                40
              ]
            ],
            "color": "#9fd8ff",
            "d": "Bắc minh đảo hải: yểm bùa khiến kẻ địch liên tục mất sinh lực và nội lực mỗi nửa giây."
          },
          {
            "kind": "buff",
            "name": "Thiên Thanh Địa Trọc",
            "req": 0,
            "stats": {
              "resLoiP": [
                [
                  1,
                  13
                ],
                [
                  20,
                  32
                ]
              ],
              "resHanP": [
                [
                  1,
                  13
                ],
                [
                  20,
                  32
                ]
              ],
              "resHoaP": [
                [
                  1,
                  9
                ],
                [
                  20,
                  28
                ]
              ],
              "physRes": [
                [
                  1,
                  9
                ],
                [
                  20,
                  28
                ]
              ]
            },
            "dur": 120,
            "mp": [
              [
                1,
                12
              ],
              [
                20,
                90
              ]
            ],
            "cd": 2,
            "nid": "tt",
            "vl": 30,
            "color": "#c8e0a0",
            "charm": true,
            "d": "Thiên thanh địa trọc: dán bùa hộ thân, tăng kháng lôi, kháng băng, kháng hỏa và phòng thủ vật lý."
          },
          {
            "kind": "curse",
            "name": "Khi Hàn Ngạo Tuyết",
            "req": 0,
            "range": 6,
            "cd": 1.5,
            "nid": "kh",
            "vl": 40,
            "curse": {
              "aspd": [
                [
                  1,
                  6
                ],
                [
                  20,
                  39
                ]
              ],
              "dur": [
                [
                  1,
                  20
                ],
                [
                  20,
                  60
                ]
              ]
            },
            "mp": [
              [
                1,
                30
              ],
              [
                20,
                40
              ]
            ],
            "color": "#e6f6ff",
            "d": "Khi hàn ngạo tuyết: bùa hàn khí yểm lên kẻ địch, giảm tốc độ xuất chiêu của đối phương."
          },
          {
            "kind": "curse",
            "name": "Khí Tâm Phù",
            "req": 0,
            "range": 6,
            "cd": 3,
            "nid": "kt",
            "vl": 40,
            "curse": {
              "stunP": [
                [
                  1,
                  16
                ],
                [
                  20,
                  35
                ]
              ],
              "stunT": [
                [
                  1,
                  0.3
                ],
                [
                  20,
                  2
                ]
              ],
              "dur": [
                [
                  1,
                  0
                ],
                [
                  20,
                  0
                ]
              ]
            },
            "mp": [
              [
                1,
                100
              ],
              [
                20,
                100
              ]
            ],
            "color": "#d0b0ff",
            "d": "Khí tâm phù: lá bùa đoạt khí, có xác suất làm kẻ địch hôn mê."
          },
          {
            "kind": "curse",
            "name": "Mê Tung Ảo Ảnh",
            "req": 0,
            "range": 6,
            "cd": 1.5,
            "nid": "mt",
            "vl": 50,
            "curse": {
              "ext": [
                [
                  1,
                  5
                ],
                [
                  20,
                  50
                ]
              ],
              "dur": [
                [
                  1,
                  45
                ],
                [
                  20,
                  120
                ]
              ]
            },
            "mp": [
              [
                1,
                30
              ],
              [
                20,
                40
              ]
            ],
            "color": "#d8c8ff",
            "d": "Mê tung ảo ảnh: bùa nhiếp tâm, kẻ địch bị choáng hay làm chậm sẽ lâu hồi lại hơn."
          },
          {
            "kind": "curse",
            "name": "Túy Tiên Tá Cốt",
            "req": 0,
            "range": 6,
            "cd": 2,
            "nid": "u",
            "vl": 90,
            "curse": {
              "spd": [
                [
                  1,
                  12
                ],
                [
                  20,
                  52
                ]
              ],
              "ext": [
                [
                  1,
                  5
                ],
                [
                  20,
                  50
                ]
              ],
              "drain": [
                [
                  1,
                  1
                ],
                [
                  20,
                  15
                ]
              ],
              "mdrain": [
                [
                  1,
                  1
                ],
                [
                  20,
                  20
                ]
              ],
              "refl": [
                [
                  1,
                  5
                ],
                [
                  20,
                  35
                ]
              ],
              "dur": [
                [
                  1,
                  45
                ],
                [
                  20,
                  120
                ]
              ]
            },
            "mp": [
              [
                1,
                100
              ],
              [
                20,
                160
              ]
            ],
            "color": "#e0b0ff",
            "d": "Túy tiên tá cốt: bùa say tiên rã xương, kẻ địch chậm chạp, mất sinh lực nội lực, bị choáng hay làm chậm lâu hơn, giảm phản đòn."
          }
        ]
      },
      {
        "name": "Hỗ Trợ",
        "desc": "Tuyệt kỹ trấn phái",
        "skills": [
          {
            "kind": "buff",
            "name": "Sương Ngạo Côn Lôn",
            "req": 0,
            "stats": {
              "atkPct": [
                14,
                2
              ],
              "mpPct": [
                15,
                2
              ]
            },
            "dur": 60,
            "mp": [
              30,
              2
            ],
            "cd": 20,
            "nid": "tp",
            "vl": 60,
            "tp": true,
            "color": "#bfe6ff",
            "d": "Tuyệt kỹ trấn phái: sương ngạo Côn Luân, tâm như tuyết sơn, nội lực dồi dào."
          },
          {
            "kind": "passive",
            "name": "Huyền Thiên Vô Cực",
            "req": 0,
            "stats": {
              "noiHo": [
                [
                  1,
                  50
                ],
                [
                  20,
                  430
                ]
              ],
              "reflRes": [
                [
                  1,
                  5
                ],
                [
                  20,
                  24
                ]
              ]
            },
            "nid": "ht",
            "vl": 90,
            "d": "Côn Lôn cao cấp tâm pháp, giảm hiệu quả sát thương của đối phương: mỗi đòn trúng, nội lực hộ thân đỡ bớt một phần sát thương (trừ vào nội lực), và giảm sát thương phản đòn phải nhận."
          }
        ]
      }
    ]
  },
  "nguyet": {
    "id": "nguyet",
    "name": "Nga Mi",
    "element": "Thủy",
    "elKey": "thuy",
    "icon": "🌸",
    "desc": "Nữ đệ tử núi Nga Mi: kiếm pháp băng thanh, chưởng pháp Phật môn, hào quang hộ trì và chữa thương cho đồng đội.",
    "routes": [
      {
        "name": "Chưởng Pháp",
        "desc": "Phật môn chưởng, phiêu tuyết",
        "skills": [
          {
            "kind": "atk",
            "name": "Phiêu Tuyết Xuyên Vân",
            "type": "melee",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "range": 2.2,
            "color": "#f4d0f0",
            "d": "Phiêu tuyết xuyên vân: chưởng phong như tuyết bay xuyên mây, đánh trúng kẻ địch tầm trung."
          },
          {
            "kind": "passive",
            "name": "Nga My Chưởng",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "mpPct": [
                3,
                0.6
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Chưởng pháp căn bản của Nga My, tăng uy lực các chiêu chưởng."
          },
          {
            "kind": "atk",
            "name": "Tỷ Tượng Đồng Quy",
            "type": "aoeSelf",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "radius": 2.2,
            "color": "#e0b0ff",
            "d": "Tỷ tượng đồng quy: chưởng lực xoáy tròn quanh thân, quét kẻ địch xung quanh."
          },
          {
            "kind": "atk",
            "name": "Phật Quang Phổ Chiếu",
            "type": "aoeTarget",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 60,
            "radius": 2,
            "range": 3,
            "color": "#ff8ac8",
            "d": "Phật quang phổ chiếu: đóa sen Phật quang nở bung dưới chân kẻ địch, cánh sen ánh sáng xé tan đối phương."
          },
          {
            "kind": "atk",
            "name": "Phong Sương Toái Ảnh",
            "type": "aoeTarget",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "radius": 1.9,
            "style": "petals",
            "color": "#ffd6ec",
            "d": "Phong sương toái ảnh: muôn cánh hoa sương từ trời trút xuống như mưa, vòng khí bùng nổ quét sạch cả vùng."
          }
        ]
      },
      {
        "name": "Kiếm Pháp",
        "desc": "Phi kiếm băng thanh",
        "wpn": "sword",
        "skills": [
          {
            "kind": "atk",
            "name": "Nhất Diệp Tri Thu",
            "type": "proj",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "color": "#8fdcff",
            "pstyle": "flysword",
            "d": "Nhất diệp tri thu: một thanh phi kiếm xanh biển bay thẳng tới mục tiêu như chiếc lá báo thu."
          },
          {
            "kind": "passive",
            "name": "Nga My Kiếm Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "critAdd": [
                1,
                0.3
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Kiếm pháp căn bản của Nga My, tăng uy lực các chiêu kiếm."
          },
          {
            "kind": "atk",
            "name": "Thôi Song Vọng Nguyệt",
            "type": "multi",
            "tier": 2,
            "mult": [
              1.6,
              0.1
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "count": 2,
            "color": "#a8e4ff",
            "pstyle": "flysword",
            "d": "Thôi song vọng nguyệt: hai thanh phi kiếm cùng lúc lao tới hai kẻ địch."
          },
          {
            "kind": "atk",
            "name": "Bất Diệt Bất Tuyệt",
            "type": "aoeTarget",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 60,
            "radius": 2.2,
            "color": "#9fe0ff",
            "style": "blades",
            "d": "Bất diệt bất tuyệt: mưa phi kiếm xanh biển trút xuống quanh mục tiêu không dứt."
          },
          {
            "kind": "atk",
            "name": "Tam Nga Tề Tuyết",
            "type": "wave",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "wstyle": "icesword",
            "fan": 3,
            "iceFall": true,
            "iceRing": 2,
            "slow": [
              35,
              2.5
            ],
            "pullIn": true,
            "hitMax": 24,
            "color": "#7fd8ff",
            "d": "Tam nga tề tuyết: kiếm băng từ trời cắm xuyên xuống đất rồi phóng phi kiếm về phía trước (cấp 1–14 một kiếm, cấp 15 hai kiếm, cấp 20 ba kiếm hình quạt). Cấp 20 thêm vòng nổ băng lan từ chỗ đứng gây sát thương, kẻ địch sát thân bị hút nhẹ vào. Trúng băng sát chậm di chuyển."
          }
        ]
      },
      {
        "name": "Hỗ Trợ",
        "desc": "Phật môn hộ trì bản thân và đồng đội đứng gần",
        "skills": [
          {
            "kind": "heal",
            "name": "Từ Hàng Phổ Độ",
            "req": 0,
            "heal": [
              18,
              1.8
            ],
            "mp": [
              14,
              1
            ],
            "cd": 8,
            "nid": "0",
            "vl": 20,
            "party": true,
            "color": "#f4d0f0",
            "d": "Từ hàng phổ độ: ánh từ bi chữa lành vết thương cho bản thân và đồng đội trong tổ đội đứng gần."
          },
          {
            "kind": "buff",
            "name": "Mộng Điệp",
            "req": 0,
            "stats": {
              "speedPct": [
                10,
                1
              ],
              "aspdPct": [
                6,
                0.6
              ]
            },
            "dur": 600,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "1",
            "vl": 30,
            "aura": true,
            "radius": 3.5,
            "color": "#9fe0ff",
            "d": "Mộng điệp (hào quang): bản thân và đồng đội đứng gần (3,5 ô) tăng tốc chạy và tốc độ xuất chiêu."
          },
          {
            "kind": "buff",
            "name": "Lưu Thủy",
            "req": 0,
            "stats": {
              "resAll": [
                8,
                1.2
              ]
            },
            "dur": 600,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "2",
            "vl": 40,
            "aura": true,
            "radius": 3.5,
            "color": "#bfefff",
            "d": "Lưu thủy (hào quang): bản thân và đồng đội đứng gần (3,5 ô) tăng kháng tất cả."
          },
          {
            "kind": "buff",
            "name": "Phật Tâm Từ Hữu",
            "req": 0,
            "stats": {
              "hpPct": [
                20,
                4
              ]
            },
            "dur": 600,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "3",
            "vl": 50,
            "aura": true,
            "radius": 3.5,
            "color": "#ffd6f0",
            "d": "Phật tâm từ hữu (hào quang): bản thân và đồng đội đứng gần (3,5 ô) tăng sinh lực tối đa, cấp 20 gần gấp đôi sinh lực."
          },
          {
            "kind": "buff",
            "name": "Thanh Âm Phạn Xướng",
            "req": 0,
            "stats": {
              "atkPct": [
                6,
                0.6
              ],
              "critAdd": [
                3,
                0.25
              ]
            },
            "dur": 600,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "tv",
            "vl": 60,
            "aura": true,
            "radius": 3.5,
            "color": "#9fd0ff",
            "d": "Thanh âm phạn xướng (hào quang): tiếng tụng kinh trợ uy, bản thân và người cùng phe đứng gần (3,5 ô) tăng sát thương và bạo kích."
          },
          {
            "kind": "passive",
            "name": "Phật Pháp Vô Biên",
            "req": 0,
            "stats": {
              "hpPct": [
                15,
                2.5
              ],
              "hpRegen": [
                0.6,
                0.08
              ]
            },
            "nid": "tp",
            "vl": 60,
            "tp": true,
            "color": "#f4d0f0",
            "d": "Tuyệt kỹ trấn phái (bị động): Phật pháp vô biên, Phật quang chiếu rọi, thương thế tự lành. Cộng điểm là có hiệu lực, không cần thi triển."
          },
          {
            "kind": "buff",
            "name": "Phổ Độ Chúng Sinh",
            "req": 0,
            "stats": {
              "hpRegHalf": [
                [
                  1,
                  1
                ],
                [
                  20,
                  15
                ]
              ],
              "mpRegHalf": [
                [
                  1,
                  1
                ],
                [
                  20,
                  10
                ]
              ],
              "recoverP": [
                [
                  1,
                  1
                ],
                [
                  20,
                  10
                ]
              ],
              "resAll": [
                [
                  1,
                  1
                ],
                [
                  20,
                  40
                ]
              ]
            },
            "dur": 600,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "u",
            "vl": 90,
            "preBuff": true,
            "aura": true,
            "radius": 3.5,
            "color": "#ffe0f4",
            "d": "Phổ độ chúng sinh (hào quang): Phật quang tỏa khắp, bản thân và người cùng phe đứng gần (3,5 ô) liên tục hồi sinh lực, nội lực, giảm thời gian thọ thương và tăng kháng tất cả."
          }
        ]
      }
    ]
  },
  "hoa": {
    "id": "hoa",
    "name": "Hỏa Vân Cốc",
    "element": "Hỏa",
    "elKey": "hoa",
    "icon": "🔥",
    "desc": "Hỏa Vân Cốc: hỏa thương, hỏa đao cận chiến và bùa chú ma hỏa đánh xa, sát thương lớn nhưng máu mỏng.",
    "routes": [
      {
        "name": "Mâu Pháp",
        "desc": "Hỏa thương: đâm, bổ, xoay quét",
        "wpn": "spear",
        "skills": [
          {
            "kind": "atk",
            "name": "Tàn Dương Như Huyết",
            "type": "melee",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "n",
            "vl": 0,
            "dot": [
              18,
              3
            ],
            "color": "#ff7a2e",
            "d": "Hỏa thương đâm thẳng như ánh tà dương đỏ máu, lửa bám thiêu đốt."
          },
          {
            "kind": "passive",
            "name": "Thiên Nhẫn Mâu Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "critAdd": [
                1,
                0.3
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Tâm pháp thương pháp của Hỏa Vân Cốc."
          },
          {
            "kind": "atk",
            "name": "Liệt Hỏa Tình Thiên",
            "type": "aoeTarget",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "k",
            "vl": 30,
            "radius": 2.6,
            "range": 2.6,
            "dot": [
              30,
              4
            ],
            "color": "#ff5a1e",
            "style": "fire",
            "d": "Đâm thương xuống đất, lửa ngút trời bùng lên quanh kẻ địch, cháy âm ỉ."
          },
          {
            "kind": "atk",
            "name": "Thâu Thiên Hoán Nhật",
            "type": "aoeSelf",
            "tier": 3,
            "mult": [
              2.3,
              0.15
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "d",
            "vl": 60,
            "radius": 2.8,
            "color": "#ff9a3c",
            "d": "Xoay hỏa thương một vòng che cả mặt trời, vòng lửa quét mọi kẻ địch quanh mình."
          },
          {
            "kind": "atk",
            "name": "Vân Long Kích",
            "type": "melee",
            "tier": 4,
            "mult": [
              3.8,
              0.24
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "trailFx": "#ffd27a",
            "range": 2.4,
            "combo": 5,
            "comboPoses": [
              "chop",
              "thrust",
              "thrust",
              "spin",
              "chop"
            ],
            "comboPosesHorse": [
              "chop",
              "thrust",
              "thrust",
              "twirl",
              "chop"
            ],
            "comboT": [
              0,
              0.22,
              0.44,
              0.66,
              1.12
            ],
            "leapFin": true,
            "finSpin": true,
            "stun": 0.5,
            "color": "#e8f4ff",
            "d": "Thương bổ từ trên xuống, hai đòn đâm thẳng, xoay người quét một vòng rồi tung mình lên cao bổ xuống: ảo ảnh cây thương khổng lồ từ trời giáng xuống mục tiêu, chấn động mọi kẻ địch xung quanh. Khi cưỡi ngựa: giơ thương xoay trên cao rồi bổ xuống."
          }
        ]
      },
      {
        "name": "Đao Pháp",
        "desc": "Hỏa đao nội công: hỏa sát thiêu đốt, không cần cầm vũ khí",
        "wpn": "blade",
        "noi": true,
        "skills": [
          {
            "kind": "atk",
            "name": "Đơn Chỉ Liệt Diệm",
            "type": "melee",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "n",
            "vl": 0,
            "trailFx": "#ffb050",
            "color": "#ff8a3a",
            "d": "Một nhát hỏa đao chém xuống, lửa tóe tung."
          },
          {
            "kind": "passive",
            "name": "Thiên Nhẫn Đao Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "aspdPct": [
                2,
                0.5
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Tâm pháp đao pháp của Hỏa Vân Cốc."
          },
          {
            "kind": "atk",
            "name": "Thôi Sơn Điền Hải",
            "type": "aoeTarget",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "k",
            "vl": 30,
            "radius": 2.4,
            "range": 2.2,
            "stun": 0.6,
            "color": "#ff7a2e",
            "style": "rocks",
            "d": "Đao khí đẩy núi lấp biển, chém nứt mặt đất làm choáng kẻ địch."
          },
          {
            "kind": "atk",
            "name": "Ma Diệm Thất Sát",
            "type": "melee",
            "tier": 3,
            "mult": [
              2.8,
              0.18
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "d",
            "vl": 60,
            "trailFx": "#ff4a3a",
            "combo": 4,
            "range": 2.1,
            "leech": 4,
            "color": "#ff3a1e",
            "d": "Ma diễm nhập đao, chém liên hoàn bốn nhát, mỗi nhát hút sinh lực."
          },
          {
            "kind": "atk",
            "name": "Thiên Ngoại Lưu Tinh",
            "type": "aoeTarget",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "radius": 3.2,
            "dot": [
              40,
              4
            ],
            "color": "#ff5a1e",
            "d": "Lưu tinh lửa từ ngoài trời giáng xuống, thiêu rụi cả một vùng."
          }
        ]
      },
      {
        "name": "Bùa Chú",
        "desc": "Bùa chú ma hỏa đánh xa, nguyền rủa",
        "skills": [
          {
            "kind": "atk",
            "name": "Hỏa Liên Phần Hoa",
            "type": "proj",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "n",
            "vl": 10,
            "color": "#ffb347",
            "pstyle": "fireball",
            "d": "Bùa chú hóa đóa sen lửa bay tới thiêu đốt kẻ địch."
          },
          {
            "kind": "atk",
            "name": "Ảo Ảnh Phi Hồ",
            "type": "homing",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "g",
            "vl": 20,
            "count": 3,
            "color": "#ff9a3c",
            "pstyle": "firebird",
            "d": "Ba ảo ảnh hồ ly lửa bay lượn rồi lao vào kẻ địch."
          },
          {
            "kind": "buff",
            "name": "Phi Hồng Vô Tích",
            "req": 0,
            "stats": {
              "speedPct": [
                10,
                1.5
              ],
              "critAdd": [
                3,
                0.5
              ]
            },
            "dur": 90,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "h",
            "vl": 30,
            "color": "#ffb0a0",
            "d": "Thân như cầu vồng bay, không để lại dấu vết: tăng tốc độ và chí mạng."
          },
          {
            "kind": "atk",
            "name": "Bi Tô Thanh Phong",
            "type": "aoeTarget",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "b",
            "vl": 40,
            "radius": 2.6,
            "slow": [
              45,
              3
            ],
            "color": "#c88aff",
            "style": "fire",
            "d": "Bùa chú gió bi ai, kẻ địch trong vùng bị làm chậm."
          },
          {
            "kind": "atk",
            "name": "Lịch Ma Đoạt Hồn",
            "type": "proj",
            "tier": 3,
            "mult": [
              2.8,
              0.18
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "l",
            "vl": 50,
            "leech": 8,
            "color": "#d84aff",
            "pstyle": "orb",
            "d": "Lệ ma đoạt hồn: bùa chú hút sinh lực của kẻ địch trả về cho mình."
          },
          {
            "kind": "atk",
            "name": "Nhiếp Hồn Loạn Tâm",
            "type": "aoeTarget",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "t",
            "vl": 90,
            "radius": 3,
            "stun": 1.4,
            "color": "#e04aff",
            "d": "Nhiếp hồn loạn phách: kẻ địch trong vùng mê man, choáng váng."
          }
        ]
      },
      {
        "name": "Hỗ Trợ",
        "desc": "Tuyệt kỹ trấn phái",
        "skills": [
          {
            "kind": "buff",
            "name": "Thiên Ma Giải Thể",
            "req": 0,
            "stats": {
              "atkPct": [
                18,
                2.5
              ],
              "critAdd": [
                5,
                0.7
              ],
              "defPct": [
                -8,
                0
              ]
            },
            "dur": 60,
            "mp": [
              30,
              2
            ],
            "cd": 20,
            "nid": "tp",
            "vl": 60,
            "tp": true,
            "color": "#ff3a1e",
            "d": "Tuyệt kỹ trấn phái: giải thể thiên ma, công lực tăng vọt nhưng phòng thủ giảm."
          }
        ]
      }
    ]
  },
  "thuy": {
    "id": "thuy",
    "name": "Thúy Yên",
    "element": "Thủy",
    "elKey": "thuy",
    "icon": "❄️",
    "desc": "Nữ hiệp Thúy Yên Môn giữa rừng tuyết: đơn đao, song đao lạnh như băng tuyết, làm chậm và đóng băng kẻ địch.",
    "routes": [
      {
        "name": "Đơn Đao",
        "desc": "Đơn đao phong hoa tuyết nguyệt",
        "wpn": "blade",
        "skills": [
          {
            "kind": "atk",
            "name": "Phong Hoa Tuyết Nguyệt",
            "type": "melee",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "slow": [
              15,
              1.5
            ],
            "color": "#d8ecff",
            "d": "Phong hoa tuyết nguyệt: đơn đao nhẹ như gió, lạnh như tuyết, kẻ trúng đòn chậm lại."
          },
          {
            "kind": "passive",
            "name": "Thúy Yên Đao Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "critAdd": [
                1,
                0.3
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Đao pháp căn bản của Thúy Yên, tăng uy lực các chiêu đơn đao."
          },
          {
            "kind": "atk",
            "name": "Vũ Đả Lê Hoa",
            "type": "aoeTarget",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "radius": 2.4,
            "dropHit": 0.25,
            "hitMax": 60,
            "hitWin": 9.5,
            "slow": [
              30,
              2
            ],
            "color": "#e0f2ff",
            "style": "petals",
            "d": "Vũ đả lê hoa: đao khí như mưa đập hoa lê, rơi xuống cả một vùng, kẻ địch chậm lại."
          },
          {
            "kind": "atk",
            "name": "Mục Dã Lưu Tinh",
            "type": "aoeTarget",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 60,
            "radius": 2.6,
            "slow": [
              35,
              2
            ],
            "color": "#bfe6ff",
            "style": "blades",
            "d": "Mục dã lưu tinh: đao quang như sao băng trên đồng hoang trút xuống quanh mục tiêu."
          },
          {
            "kind": "atk",
            "name": "Băng Tung Vô Ảnh",
            "type": "wave",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "wstyle": "icelance",
            "lanceN": true,
            "fanA": 0.15,
            "wspd": 13,
            "color": "#d8ecff",
            "slow": [
              40,
              2
            ],
            "d": "Băng tung vô ảnh: đao khí băng giá xé dọc mặt đất, không để lại hình bóng, đóng băng kẻ địch trên đường."
          }
        ]
      },
      {
        "name": "Song Đao",
        "desc": "Song đao nội công băng sát, không cần cầm vũ khí",
        "wpn": "blade",
        "noi": true,
        "skills": [
          {
            "kind": "atk",
            "name": "Phong Quyển Tàn Tuyết",
            "type": "melee",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "combo": 2,
            "color": "#c9e6ff",
            "d": "Phong quyển tàn tuyết: song đao cuốn gió quét tuyết, chém liền hai nhát."
          },
          {
            "kind": "passive",
            "name": "Thúy Yên Song Đao",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "aspdPct": [
                2,
                0.5
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Song đao căn bản của Thúy Yên, tăng uy lực và tốc độ song đao."
          },
          {
            "kind": "atk",
            "name": "Phủ Vân Tán Tuyết",
            "type": "aoeSelf",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "radius": 2.5,
            "slow": [
              30,
              2
            ],
            "color": "#c9e6ff",
            "d": "Phủ vân tán tuyết: xoay song đao như mây phủ tuyết bay quanh thân."
          },
          {
            "kind": "atk",
            "name": "Bích Hải Triều Sinh",
            "type": "wave",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 60,
            "wstyle": "icedart",
            "fan": 16,
            "fanA": 0.3927,
            "wspd": 6,
            "wR": 6,
            "hitMax": 24,
            "snowCast": true,
            "slow": [
              40,
              2.5
            ],
            "leech": 6,
            "color": "#9fd8ff",
            "d": "Bích hải triều sinh: sương tuyết xoay quanh thân rồi bung 16 tia băng kiếm tỏa tròn ra bốn phía (tầm khoảng 6 ô), hút sinh lực kẻ trúng. Mỗi tia trúng kẻ địch đầu tiên rồi tan: đứng xa mỗi kẻ dính một tia, kẻ áp sát tâm dính nhiều tia cùng lúc."
          },
          {
            "kind": "atk",
            "name": "Băng Tâm Tiên Tử",
            "type": "wave",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "wstyle": "fairy",
            "wspd": 10.5,
            "ww": 0.9,
            "snowCast": true,
            "slow": [
              60,
              3
            ],
            "color": "#e6f6ff",
            "d": "Băng tâm tiên tử: hóa thân thành tiên tử băng trong suốt chỉ kiếm về phía trước, bay thẳng xuyên qua mọi kẻ địch trên đường (tầm khoảng 8 ô, mỗi kẻ trúng một lần), bông tuyết rơi phủ dọc đường bay."
          }
        ]
      },
      {
        "name": "Hỗ Trợ",
        "desc": "Băng tâm tuyết cốt",
        "skills": [
          {
            "kind": "heal",
            "name": "Băng Tâm Thiến Ảnh",
            "req": 0,
            "heal": [
              12,
              1.2
            ],
            "mp": [
              21,
              1
            ],
            "cd": 8,
            "nid": "0",
            "vl": 20,
            "healPt": [
              [
                1,
                130
              ],
              [
                20,
                700
              ]
            ],
            "color": "#bfe6ff",
            "d": "Băng tâm thiến ảnh (cuiyan.lua): hồi 130–700 sinh lực tức thì cho bản thân; rê chuột lên người cùng phe rồi bấm phím chiêu để hồi cho người đó."
          },
          {
            "kind": "buff",
            "name": "Hộ Thể Hàn Băng",
            "req": 0,
            "stats": {
              "reflectP": [
                5,
                0.8
              ],
              "defPct": [
                6,
                1
              ]
            },
            "dur": 120,
            "mp": [
              40,
              1
            ],
            "cd": 20,
            "nid": "1",
            "vl": 40,
            "color": "#cfeeff",
            "d": "Hộ thể hàn băng (cuiyan.lua): lớp băng mỏng bao quanh thân 120 giây, phản đòn 5–20% sát thương cận chiến và tầm xa về kẻ tấn công, phòng thủ tăng nhẹ."
          },
          {
            "kind": "buff",
            "name": "Tuyết Ảnh",
            "req": 0,
            "stats": {
              "resAll": [
                1,
                1.5
              ],
              "aspdPct": [
                12,
                2.8
              ],
              "speedPct": [
                17,
                2
              ]
            },
            "dur": 150,
            "mp": [
              40,
              5
            ],
            "cd": 20,
            "nid": "2",
            "vl": 50,
            "color": "#eaf6ff",
            "d": "Tuyết ảnh (cuiyan.lua): sương tuyết vây quanh thân 150 giây, kháng tất cả +1–30%, tốc độ xuất chiêu +12–65%, tốc chạy +17–55%."
          },
          {
            "kind": "buff",
            "name": "Băng Cốt Tuyết Tâm",
            "req": 0,
            "stats": {
              "atkPct": [
                16,
                2.5
              ],
              "critAdd": [
                5,
                0.6
              ],
              "aspdPct": [
                6,
                1
              ]
            },
            "dur": 60,
            "mp": [
              30,
              2
            ],
            "cd": 20,
            "nid": "tp",
            "vl": 60,
            "tp": true,
            "color": "#bfe6ff",
            "d": "Tuyệt kỹ trấn phái: băng cốt tuyết tâm, đao pháp lạnh lùng tuyệt tình, công lực tăng mạnh."
          }
        ]
      }
    ]
  },
  "dao": {
    "id": "dao",
    "name": "Thiên Sơn",
    "element": "Thủy",
    "elKey": "thuy",
    "icon": "🏔️",
    "desc": "Linh Thứu Cung trên đỉnh Thiên Sơn: Lục Dương Chưởng lạnh thấu xương, Chiết Mai Thủ bẻ hoa mai mà đoạt mạng, Sinh Tử Phù khiến kẻ địch sống không bằng chết.",
    "routes": [
      {
        "name": "Lục Dương Chưởng",
        "desc": "Thiên Sơn Lục Dương Chưởng",
        "skills": [
          {
            "kind": "atk",
            "name": "Thiên Sơn Chưởng",
            "type": "proj",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "pstyle": "palm",
            "slow": [
              15,
              1.5
            ],
            "color": "#cfeeff",
            "d": "Thiên sơn chưởng: chưởng lực hàn băng hóa bàn tay băng lao tới kẻ địch, kẻ trúng chậm lại."
          },
          {
            "kind": "passive",
            "name": "Thiên Sơn Chưởng Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "critAdd": [
                1,
                0.3
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Tâm pháp chưởng lực Thiên Sơn, tăng uy lực các chiêu chưởng."
          },
          {
            "kind": "atk",
            "name": "Hàn Băng Miên Chưởng",
            "type": "aoeTarget",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "radius": 2.3,
            "slow": [
              30,
              2
            ],
            "style": "ice",
            "color": "#bfe6ff",
            "d": "Hàn băng miên chưởng: chưởng lực mềm như bông mà lạnh như băng, phủ hàn khí cả một vùng."
          },
          {
            "kind": "atk",
            "name": "Sinh Tử Phù",
            "type": "multi",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 60,
            "count": 4,
            "slow": [
              35,
              2
            ],
            "dot": [
              30,
              4
            ],
            "pstyle": "needle",
            "color": "#e6f6ff",
            "d": "Sinh tử phù: phiến băng mỏng gieo vào huyệt đạo bốn kẻ địch, đau buốt tận xương, sống không bằng chết."
          },
          {
            "kind": "atk",
            "name": "Thiên Sơn Lục Dương Chưởng",
            "type": "wave",
            "tier": 4,
            "mult": [
              4,
              0.18
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "multFix": true,
            "wstyle": "ice",
            "slow": [
              50,
              2.5
            ],
            "color": "#d8f0ff",
            "d": "Thiên Sơn Lục Dương Chưởng: sáu đạo chưởng lực dương cương hóa băng hàn, cuộn thành sóng băng xé mặt đất, đóng băng mọi kẻ địch trên đường."
          }
        ]
      },
      {
        "name": "Chiết Mai Thủ",
        "desc": "Thiên Sơn Chiết Mai Thủ",
        "wpn": "blade",
        "skills": [
          {
            "kind": "atk",
            "name": "Chiết Mai Thủ",
            "type": "melee",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "combo": 2,
            "color": "#ffd8e8",
            "d": "Chiết mai thủ: tay như bẻ cành mai, đao theo tay chém liền hai nhát."
          },
          {
            "kind": "passive",
            "name": "Thiên Sơn Đao Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "aspdPct": [
                2,
                0.5
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Đao pháp Thiên Sơn, tăng uy lực và tốc độ ra đao."
          },
          {
            "kind": "atk",
            "name": "Mai Hoa Tuyết Ảnh",
            "type": "aoeSelf",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "radius": 2.5,
            "slow": [
              25,
              2
            ],
            "color": "#ffe0ec",
            "d": "Mai hoa tuyết ảnh: thân ảnh xoay giữa hoa mai và tuyết bay, đao khí quét quanh mình."
          },
          {
            "kind": "atk",
            "name": "Thiên Vũ Phi Tuyết",
            "type": "aoeTarget",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 60,
            "radius": 2.7,
            "slow": [
              35,
              2
            ],
            "style": "petals",
            "color": "#f0f8ff",
            "d": "Thiên vũ phi tuyết: đao quang như tuyết trời bay đầy, trút xuống cả một vùng."
          },
          {
            "kind": "atk",
            "name": "Bát Hoang Lục Hợp",
            "type": "melee",
            "tier": 4,
            "mult": [
              3.8,
              0.24
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "combo": 3,
            "leech": 6,
            "range": 2.2,
            "color": "#e6f4ff",
            "d": "Bát hoang lục hợp: đao pháp tối thượng Linh Thứu Cung, ba nhát liền như tám cõi sáu phương cùng sụp, hút sinh lực kẻ địch."
          }
        ]
      },
      {
        "name": "Hỗ Trợ",
        "desc": "Linh Thứu tâm pháp",
        "skills": [
          {
            "kind": "buff",
            "name": "Tiểu Vô Tướng Công",
            "req": 0,
            "stats": {
              "defPct": [
                16,
                2.5
              ],
              "hpRegen": [
                0.2,
                0.04
              ]
            },
            "dur": 90,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "0",
            "vl": 20,
            "color": "#cfeeff",
            "d": "Tiểu vô tướng công: nội công vô hình vô tướng hộ thân, phòng thủ tăng, tự hồi phục."
          },
          {
            "kind": "buff",
            "name": "Thiên Sơn Tuyết Ảnh",
            "req": 0,
            "stats": {
              "speedPct": [
                8,
                1
              ],
              "critAdd": [
                3,
                0.5
              ]
            },
            "dur": 90,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "1",
            "vl": 40,
            "color": "#e6f4ff",
            "d": "Thiên sơn tuyết ảnh: bước chân như tuyết bay trên đỉnh Thiên Sơn, tốc chạy và chí mạng tăng."
          },
          {
            "kind": "passive",
            "name": "Bắc Minh Thần Công",
            "req": 0,
            "stats": {
              "mpPct": [
                6,
                1
              ],
              "hpPct": [
                4,
                1
              ]
            },
            "nid": "2",
            "vl": 50,
            "d": "Bắc minh thần công: nội lực như biển Bắc Minh, sinh lực và nội lực dồi dào."
          },
          {
            "kind": "buff",
            "name": "Duy Ngã Độc Tôn Công",
            "req": 0,
            "stats": {
              "atkPct": [
                16,
                2.5
              ],
              "critAdd": [
                5,
                0.6
              ],
              "aspdPct": [
                6,
                1
              ]
            },
            "dur": 60,
            "mp": [
              30,
              2
            ],
            "cd": 20,
            "nid": "tp",
            "vl": 60,
            "tp": true,
            "color": "#ffd8e8",
            "d": "Tuyệt kỹ trấn phái: Bát Hoang Lục Hợp Duy Ngã Độc Tôn Công, thiên thượng thiên hạ duy ngã độc tôn, công lực tăng mạnh."
          }
        ]
      }
    ]
  },
  "tieu": {
    "id": "tieu",
    "name": "Tiêu Dao",
    "element": "Thổ",
    "elKey": "tho",
    "icon": "🎵",
    "desc": "Tiêu Dao phái trên hòn đảo phía đông, xa chốn Trung Nguyên: đàn và kiếm hòa cùng nhịp điệu, Cầm Pháp sóng âm đánh xa diện rộng, Kiếm Pháp cận chiến sát thương cao. Chưởng môn Văn Bán Sơn.",
    "routes": [
      {
        "name": "Kiếm Pháp",
        "desc": "Tiêu Dao kiếm pháp",
        "wpn": "sword",
        "skills": [
          {
            "kind": "atk",
            "name": "Ngô Câu Sương Tuyết",
            "type": "aoeSelf",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "radius": 2,
            "color": "#e8f4ff",
            "d": "Ngô câu sương tuyết: Tiêu Dao Kiếm Pháp sơ cấp, múa kiếm tạo kiếm khí quanh người tấn công kẻ địch."
          },
          {
            "kind": "passive",
            "name": "Tiêu Dao Kiếm Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "critAdd": [
                1,
                0.4
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Nâng cao năng lực sử dụng kiếm, tăng sát thương vật lý ngoại công và tấn công chí mạng."
          },
          {
            "kind": "atk",
            "name": "Táp Đạp Lưu Tinh",
            "type": "melee",
            "tier": 2,
            "mult": [
              1.9,
              0.12
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "dash": true,
            "range": 4.6,
            "color": "#fff0c8",
            "d": "Táp đạp lưu tinh: bí thuật Tiêu Dao Kiếm Pháp, hóa thân thành kiếm ảnh lao về phía trước chém kẻ địch."
          },
          {
            "kind": "atk",
            "name": "Ỷ Kiếm Phất Thiên",
            "type": "aoeTarget",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 40,
            "radius": 2.4,
            "stun": 0.6,
            "style": "blades",
            "color": "#e6f0ff",
            "d": "Ỷ kiếm phất thiên: Tiêu Dao Kiếm Pháp trung cấp, kiếm rơi xuống khu vực chỉ định, gây sát thương và choáng."
          },
          {
            "kind": "atk",
            "name": "Kiếm Quyết Phù Vân",
            "type": "aoeTarget",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "radius": 3.2,
            "stun": 0.8,
            "style": "blades",
            "color": "#f4f8ff",
            "d": "Kiếm quyết phù vân: Tiêu Dao Kiếm Pháp cao cấp, nhiều thanh kiếm từ mây rơi xuống tấn công kẻ địch, gây sát thương lớn và làm choáng."
          }
        ]
      },
      {
        "name": "Cầm Pháp",
        "desc": "Tiêu Dao cầm pháp",
        "wpn": "qin",
        "skills": [
          {
            "kind": "atk",
            "name": "Tùy Ý Khúc",
            "type": "proj",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "pstyle": "orb",
            "color": "#f4ecd0",
            "d": "Tùy ý khúc: Tiêu Dao Cầm Pháp sơ cấp, gảy đàn tạo sóng âm tấn công kẻ địch."
          },
          {
            "kind": "passive",
            "name": "Tiêu Dao Cầm Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "mpPct": [
                3,
                0.6
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Nâng cao năng lực sử dụng đàn, tăng sát thương nội công."
          },
          {
            "kind": "atk",
            "name": "Lạc Nhạn Bình Sa",
            "type": "aoeSelf",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "radius": 3,
            "color": "#f8f0d8",
            "d": "Lạc nhạn bình sa: bí thuật Tiêu Dao Cầm Pháp, khúc nhạc lan tỏa quanh thân tấn công mọi kẻ địch đứng gần."
          },
          {
            "kind": "atk",
            "name": "Quảng Lăng Tán",
            "type": "wave",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 40,
            "wstyle": "gale",
            "fan": 3,
            "color": "#f4ecd0",
            "d": "Quảng lăng tán: Tiêu Dao Cầm Pháp trung cấp, ba luồng sóng âm liên tục tỏa hình quạt tấn công kẻ địch."
          },
          {
            "kind": "atk",
            "name": "Cao Sơn Lưu Thủy",
            "type": "wave",
            "tier": 4,
            "mult": [
              4,
              0.18
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "multFix": true,
            "wstyle": "orb",
            "stun": 0.6,
            "color": "#fff4d8",
            "d": "Cao sơn lưu thủy: khúc đàn cao sơn lưu thủy tạo luồng sóng âm mạnh mẽ, xuyên qua kẻ địch trên đường và làm choáng."
          }
        ]
      },
      {
        "name": "Hỗ Trợ",
        "desc": "Tiêu Dao tâm pháp",
        "skills": [
          {
            "kind": "passive",
            "name": "Di Cung Hoán Vũ",
            "req": 0,
            "stats": {
              "aspdPct": [
                6,
                1
              ],
              "critAdd": [
                2,
                0.4
              ]
            },
            "nid": "0",
            "vl": 20,
            "d": "Di cung hoán vũ: bí kỹ phái Tiêu Dao, âm luật tích tụ theo nhịp đàn kiếm, ra chiêu nhanh hơn và hiểm hơn."
          },
          {
            "kind": "buff",
            "name": "Ngân Yên Bạch Mã",
            "req": 0,
            "stats": {
              "speedPct": [
                10,
                1.5
              ]
            },
            "dur": 90,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "1",
            "vl": 50,
            "color": "#f4f4f6",
            "d": "Ngân yên bạch mã: tâm pháp cao cấp, thân pháp linh hoạt như ngựa trắng yên bạc, tốc độ di chuyển tăng."
          },
          {
            "kind": "passive",
            "name": "Hiệp Cốt Nhu Tình",
            "req": 0,
            "stats": {
              "hpPct": [
                8,
                1.5
              ]
            },
            "nid": "2",
            "vl": 60,
            "d": "Hiệp cốt nhu tình: tâm pháp cao cấp, tăng sinh mệnh."
          },
          {
            "kind": "buff",
            "name": "Thiên Lý Độc Hành",
            "req": 0,
            "stats": {
              "atkPct": [
                15,
                2.5
              ],
              "critAdd": [
                5,
                0.6
              ],
              "speedPct": [
                5,
                1
              ]
            },
            "dur": 60,
            "mp": [
              30,
              2
            ],
            "cd": 20,
            "nid": "tp",
            "vl": 60,
            "tp": true,
            "color": "#f4ecd0",
            "d": "Tuyệt kỹ trấn phái: Thiên Lý Độc Hành, ngàn dặm một mình phiêu du, khả năng chiến đấu tăng mạnh."
          },
          {
            "kind": "passive",
            "name": "Mai Danh Ẩn Tính",
            "req": 0,
            "stats": {
              "resAll": [
                6,
                0.8
              ],
              "defPct": [
                8,
                1
              ],
              "hpRegen": [
                0.3,
                0.05
              ]
            },
            "nid": "mdat",
            "vl": 150,
            "reqLv": 180,
            "d": "Mai danh ẩn tính: Tiêu Dao dị kỹ (cấp 180), giấu tên ẩn tính giữa giang hồ, thân pháp phiêu hốt khó bị đánh trúng hiểm, kháng tất cả và phòng thủ tăng, tự hồi phục."
          }
        ]
      }
    ]
  },
  "quyen": {
    "id": "quyen",
    "name": "Thiếu Lâm",
    "element": "Kim",
    "elKey": "kim",
    "icon": "👊",
    "desc": "Võ tăng chùa Thiếu Lâm: quyền, côn, đao đều tinh, mình đồng da sắt, Phật lực làm choáng.",
    "routes": [
      {
        "name": "Quyền Pháp",
        "desc": "Thiếu Lâm chưởng: sát thương vật lý nội công tầm xa, không cần cầm hay tháo vũ khí",
        "wpn": "fist",
        "anyW": true,
        "noi": true,
        "skills": [
          {
            "kind": "atk",
            "name": "Hàng Long Bất Vũ",
            "type": "aoeSelf",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "radius": 2.2,
            "stun": 0.5,
            "color": "#ffd24a",
            "d": "Hàng long bát vũ: quyền phong hóa hai con rồng vàng xoay vòng quanh thân, đánh hai lượt và làm choáng mọi kẻ địch đứng gần."
          },
          {
            "kind": "passive",
            "name": "Thiếu Lâm Quyền Pháp",
            "req": 0,
            "stats": {
              "atkOutPct": [
                25,
                20,
                10
              ],
              "accPct": [
                35,
                6,
                6
              ],
              "critDmg": [
                6,
                2,
                0.5
              ]
            },
            "nid": "p",
            "vl": 10,
            "pw": "fist",
            "jr": "Quyền pháp (Hỗ trợ)",
            "d": "Tăng hiệu quả công kích tay không."
          },
          {
            "kind": "atk",
            "name": "Sư Tử Hống",
            "type": "aoeSelf",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 40,
            "radius": 3,
            "stunP": [
              50,
              18
            ],
            "castTime": 0.55,
            "hitDelay": 0.58,
            "color": "#ffd35a",
            "d": "Sư Tử Hống: gồng khí rồi phát một vòng âm thanh vàng lan quanh thân; kẻ địch trong phạm vi chịu sát thương và có 50% xác suất choáng, hôn mê."
          },
          {
            "kind": "atk",
            "name": "Long Trảo Hổ Trảo",
            "type": "melee",
            "tier": 3,
            "mult": [
              2.8,
              0.18
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 50,
            "combo": 2,
            "leech": 6,
            "color": "#ffe8a8",
            "d": "Long trảo hổ trảo: song trảo rồng hổ liên hoàn, xé toạc phòng thủ."
          },
          {
            "kind": "atk",
            "name": "Đạt Ma Độ Giang",
            "type": "wave",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "range": 3,
            "palmN": 3,
            "palmGap": 0.2,
            "palmFrac": 0.3,
            "wspd": 11,
            "wR": 3.2,
            "ww": 0.75,
            "hitMax": 24,
            "wstyle": "buddhapalm",
            "color": "#ffd35a",
            "stun": 0.8,
            "d": "Đạt Ma độ giang: nhất vĩ độ giang, quyền kình cuộn thành sóng vàng đánh choáng mọi kẻ địch trên đường."
          }
        ]
      },
      {
        "name": "Côn Pháp",
        "desc": "La Hán côn trận",
        "wpn": "staff",
        "skills": [
          {
            "kind": "atk",
            "name": "Kim Cang Phục Ma",
            "type": "melee",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              2,
              0
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "noW": true,
            "share": [
              1,
              2
            ],
            "dmgPct": [
              15,
              2
            ],
            "khac": [
              1,
              0
            ],
            "noMount": true,
            "jr": "Côn pháp, Đao pháp · Ngoại công",
            "boost": {
              "Vô Tướng Trảm": [
                1,
                3
              ],
              "Hoành Tảo Thiên Quân": [
                1,
                3
              ],
              "Hoành Tảo Lục Hợp": [
                1,
                1
              ],
              "Ma Ha Vô Lượng": [
                1,
                1
              ],
              "Vi Đà Hiến Xử": [
                1,
                2
              ],
              "Tam Giới Quy Thiện": [
                1,
                2
              ]
            },
            "color": "#ffd35a",
            "d": "Võ công nhập môn của Côn pháp và Đao pháp: Phật lực kim cang hàng phục yêu ma, đánh một mục tiêu."
          },
          {
            "kind": "passive",
            "name": "Thiếu Lâm Côn Pháp",
            "req": 0,
            "stats": {
              "atkOutPct": [
                25,
                3,
                10
              ],
              "accPct": [
                35,
                12,
                6
              ],
              "critDmg": [
                6,
                0,
                0.5
              ]
            },
            "nid": "p",
            "vl": 10,
            "pw": "staff",
            "jr": "Côn pháp (Hỗ trợ)",
            "d": "Tăng hiệu quả sử dụng côn."
          },
          {
            "kind": "atk",
            "name": "Hoành Tảo Lục Hợp",
            "type": "aoeSelf",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 50,
            "radius": 2.7,
            "slow": [
              30,
              2
            ],
            "color": "#e0b060",
            "d": "Hoành tảo lục hợp: quét côn khắp sáu phương, kẻ địch quanh mình chậm lại."
          },
          {
            "kind": "atk",
            "name": "Hoành Tảo Thiên Quân",
            "type": "aoeSelf",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "radius": 3.6,
            "stun": 1,
            "color": "#ffd35a",
            "d": "Hoành tảo thiên quân: một côn quét ngàn quân, đánh choáng cả vùng."
          }
        ]
      },
      {
        "name": "Đao Pháp",
        "desc": "Giới đao Thiếu Lâm",
        "wpn": "blade",
        "skills": [
          {
            "kind": "passive",
            "name": "Thiếu Lâm Đao Pháp",
            "req": 0,
            "stats": {
              "atkOutPct": [
                25,
                10,
                10
              ],
              "critDmg": [
                5,
                0,
                0.5
              ]
            },
            "nid": "p",
            "vl": 10,
            "pw": "blade",
            "jr": "Đao pháp (Hỗ trợ)",
            "d": "Tăng hiệu quả sử dụng đao."
          },
          {
            "kind": "atk",
            "name": "Ma Ha Vô Lượng",
            "type": "melee",
            "tier": 3,
            "mult": [
              2.8,
              0.18
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 50,
            "combo": 3,
            "color": "#ffe8a8",
            "d": "Ma ha vô lượng: giới đao chém liền ba nhát, Phật pháp vô lượng."
          },
          {
            "kind": "atk",
            "name": "Vô Tướng Trảm",
            "type": "wave",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "wstyle": "crescent",
            "wspd": 16,
            "wR": 7.5,
            "ww": 0.75,
            "wkb": 1.4,
            "stun": 0.35,
            "splashK": 0.5,
            "hitMax": 24,
            "color": "#ffd27a",
            "d": "Vô tướng trảm: đao quang hoàng kim hình trăng khuyết xé gió bay thẳng về phía trước (tầm khoảng 7 ô), xuyên qua mọi kẻ địch trên đường. Mỗi kẻ trúng bị đẩy lùi, khựng choáng ngắn, kẻ đứng sát bên cạnh bị chém lan 50%."
          }
        ]
      },
      {
        "name": "Hỗ Trợ",
        "desc": "Phật môn tâm pháp",
        "skills": [
          {
            "kind": "buff",
            "name": "Bất Động Minh Vương",
            "req": 0,
            "stats": {
              "defPct": [
                18,
                2.5
              ]
            },
            "dur": 60,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "0",
            "vl": 20,
            "color": "#ffd35a",
            "d": "Bất động minh vương: thân bất động như núi, phòng thủ tăng mạnh."
          },
          {
            "kind": "passive",
            "name": "La Hán Trận",
            "req": 0,
            "stats": {
              "hpPct": [
                8,
                2
              ],
              "defPct": [
                4,
                1.2
              ]
            },
            "nid": "1",
            "vl": 30,
            "d": "La Hán trận: thân pháp La Hán, khí huyết dồi dào."
          },
          {
            "kind": "buff",
            "name": "Dịch Cân Kinh",
            "req": 0,
            "stats": {
              "defPct": [
                18,
                2.5
              ],
              "hpPct": [
                12,
                2
              ],
              "hpRegen": [
                0.3,
                0.05
              ],
              "dmgHan": [
                20,
                3
              ]
            },
            "dur": 90,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "dc",
            "vl": 60,
            "color": "#ffd35a",
            "d": "Dịch cân kinh: dịch cân tẩy tủy, mình đồng da sắt; nội kình lạnh như băng, mọi đòn đánh kèm băng sát."
          },
          {
            "kind": "buff",
            "name": "Như Lai Thiên Diệp",
            "req": 0,
            "stats": {
              "atkOutPct": [
                65,
                5
              ],
              "hpPct": [
                3,
                2
              ],
              "dmgHan": [
                10,
                7
              ],
              "critDmg": [
                5,
                0
              ],
              "aspdPct": [
                35,
                3
              ]
            },
            "dur": 60,
            "mp": [
              15,
              1
            ],
            "cd": 20,
            "nid": "tp",
            "vl": 60,
            "tp": true,
            "jr": "Hỗ trợ · Trấn phái",
            "color": "#ffe08a",
            "d": "Cao cấp Tâm pháp, tăng năng lực chiến đấu toàn diện."
          }
        ]
      }
    ]
  },
  "tien": {
    "id": "tien",
    "name": "Ngũ Độc Giáo",
    "element": "Mộc",
    "elKey": "moc",
    "icon": "🐍",
    "desc": "Ngũ Độc Giáo đất Miêu Cương: chưởng độc, đao độc và bùa chú nguyền rủa, độc thấm dần rút cạn sinh lực kẻ địch.",
    "routes": [
      {
        "name": "Chưởng Pháp",
        "desc": "Độc chưởng",
        "skills": [
          {
            "kind": "atk",
            "name": "Độc Sa Chưởng",
            "type": "proj",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "dot": [
              25,
              3
            ],
            "color": "#8fe06a",
            "pstyle": "palm",
            "d": "Độc sa chưởng: chưởng lực mang cát độc bay tới kẻ địch, độc thấm dần."
          },
          {
            "kind": "passive",
            "name": "Ngũ Độc Chưởng Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "mpPct": [
                3,
                0.6
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Chưởng pháp căn bản của Ngũ Độc Giáo."
          },
          {
            "kind": "atk",
            "name": "U Minh Khô Lâu",
            "type": "aoeTarget",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "radius": 2.2,
            "dot": [
              35,
              4
            ],
            "color": "#9adc7a",
            "style": "cloud",
            "d": "U minh khô lâu: đầu lâu u minh nổ tung thành sương độc phủ kín một vùng."
          },
          {
            "kind": "atk",
            "name": "Thiên Cương Địa Sát",
            "type": "aoeTarget",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 60,
            "radius": 2.6,
            "dot": [
              40,
              4
            ],
            "slow": [
              30,
              2
            ],
            "color": "#6fcf4a",
            "style": "cloud",
            "d": "Thiên cương địa sát: độc khí từ trời giáng, từ đất bốc lên, kẻ địch chậm lại và trúng độc nặng."
          },
          {
            "kind": "atk",
            "name": "Âm Phong Thực Cốt",
            "type": "aoeTarget",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "radius": 3.2,
            "dot": [
              50,
              5
            ],
            "color": "#7ae04a",
            "style": "cloud",
            "d": "Âm phong thực cốt: gió âm mang độc ăn mòn tận xương, phủ kín cả một vùng."
          }
        ]
      },
      {
        "name": "Đao Pháp",
        "desc": "Độc đao",
        "wpn": "blade",
        "skills": [
          {
            "kind": "atk",
            "name": "Huyết Đao Độc Sát",
            "type": "melee",
            "tier": 1,
            "mult": [
              1.5,
              0.1
            ],
            "mp": [
              5,
              0.5
            ],
            "cd": 0,
            "req": 1,
            "nid": "0",
            "vl": 0,
            "dot": [
              25,
              3
            ],
            "color": "#c8f08a",
            "d": "Huyết đao độc sát: lưỡi đao tẩm độc chém xuống, độc ngấm vào máu."
          },
          {
            "kind": "passive",
            "name": "Ngũ Độc Đao Pháp",
            "req": 0,
            "stats": {
              "atkPct": [
                5,
                1.5
              ],
              "critAdd": [
                1,
                0.3
              ]
            },
            "nid": "p",
            "vl": 10,
            "d": "Đao pháp căn bản của Ngũ Độc Giáo."
          },
          {
            "kind": "atk",
            "name": "Bách Độc Xuyên Tâm",
            "type": "melee",
            "tier": 2,
            "mult": [
              1.9,
              0.12
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "1",
            "vl": 30,
            "combo": 2,
            "dot": [
              30,
              4
            ],
            "color": "#b8f08a",
            "d": "Bách độc xuyên tâm: hai nhát đao trăm độc xuyên thẳng vào tim."
          },
          {
            "kind": "atk",
            "name": "Chu Cáp Thanh Minh",
            "type": "aoeSelf",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "2",
            "vl": 60,
            "radius": 2.6,
            "dot": [
              35,
              4
            ],
            "leech": 6,
            "color": "#9fe07a",
            "d": "Chu cáp thanh minh: xoay đao như cóc độc kêu vang, độc tỏa quanh thân, hút máu kẻ địch."
          },
          {
            "kind": "atk",
            "name": "Huyền Âm Trảm",
            "type": "wave",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "wstyle": "blade",
            "dot": [
              40,
              5
            ],
            "color": "#8fe06a",
            "d": "Huyền âm trảm: đao khí huyền âm xé đất lao về phía trước, xuyên qua mọi kẻ địch, độc ngấm theo vết chém."
          }
        ]
      },
      {
        "name": "Bùa Chú",
        "desc": "Bùa nguyền rủa ngũ hành",
        "skills": [
          {
            "kind": "atk",
            "name": "Cửu Thiên Cuồng Lôi",
            "type": "aoeTarget",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "cl",
            "vl": 10,
            "radius": 1.8,
            "stun": 0.6,
            "color": "#c8b0ff",
            "d": "Cửu thiên cuồng lôi: bùa gọi sét giáng xuống mục tiêu."
          },
          {
            "kind": "atk",
            "name": "Xích Diệm Thực Thiên",
            "type": "aoeTarget",
            "tier": 2,
            "mult": [
              1.25,
              0.09
            ],
            "mp": [
              12,
              1
            ],
            "cd": 1.2,
            "req": 6,
            "nid": "xd",
            "vl": 20,
            "radius": 2,
            "dot": [
              30,
              4
            ],
            "color": "#ff7a3a",
            "style": "fire",
            "d": "Xích diệm thực thiên: lửa đỏ thiêu đốt cả một vùng."
          },
          {
            "kind": "atk",
            "name": "Băng Lam Huyền Tinh",
            "type": "aoeTarget",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "bl",
            "vl": 30,
            "radius": 2.2,
            "slow": [
              45,
              3
            ],
            "color": "#9fe0ff",
            "style": "ice",
            "d": "Băng lam huyền tinh: tinh thể băng lam đông cứng kẻ địch trong vùng."
          },
          {
            "kind": "buff",
            "name": "Xuyên Y Phá Giáp",
            "req": 0,
            "stats": {
              "atkPct": [
                10,
                1.5
              ],
              "critAdd": [
                3,
                0.5
              ]
            },
            "dur": 90,
            "mp": [
              18,
              1
            ],
            "cd": 4,
            "nid": "xy",
            "vl": 40,
            "color": "#e0c890",
            "d": "Xuyên y phá giáp: độc công xuyên áo phá giáp, đòn đánh mạnh và hiểm hơn."
          },
          {
            "kind": "atk",
            "name": "Vạn Cơ Thực Tâm",
            "type": "proj",
            "tier": 3,
            "mult": [
              2.8,
              0.18
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "vc",
            "vl": 40,
            "leech": 8,
            "dot": [
              30,
              4
            ],
            "color": "#9adc7a",
            "pstyle": "orb",
            "d": "Vạn cơ thực tâm: bùa độc gặm tim, hút sinh lực kẻ địch."
          },
          {
            "kind": "atk",
            "name": "Xuyên Tâm Độc Thích",
            "type": "multi",
            "tier": 3,
            "mult": [
              2.1,
              0.14
            ],
            "mp": [
              24,
              1.5
            ],
            "cd": 3,
            "req": 12,
            "nid": "xt",
            "vl": 50,
            "count": 4,
            "dot": [
              35,
              4
            ],
            "color": "#b8f08a",
            "pstyle": "needle",
            "d": "Xuyên tâm độc thích: gai độc bắn trúng bốn kẻ địch."
          },
          {
            "kind": "atk",
            "name": "Đoạn Cân Hủ Cốt",
            "type": "aoeTarget",
            "tier": 4,
            "mult": [
              2.9,
              0.19
            ],
            "mp": [
              40,
              2
            ],
            "cd": 6,
            "req": 16,
            "nid": "u",
            "vl": 90,
            "radius": 3,
            "dot": [
              45,
              5
            ],
            "slow": [
              50,
              3
            ],
            "color": "#a8e07a",
            "style": "cloud",
            "d": "Đoạn cân hủ cốt: độc chú đứt gân mục xương, kẻ địch trong vùng chậm hẳn và trúng kịch độc."
          }
        ]
      },
      {
        "name": "Hỗ Trợ",
        "desc": "Độc kinh",
        "skills": [
          {
            "kind": "passive",
            "name": "Tạp Nan Dược Kinh",
            "req": 0,
            "stats": {
              "hpRegen": [
                0.2,
                0.04
              ],
              "resAll": [
                4,
                0.6
              ]
            },
            "nid": "0",
            "vl": 20,
            "d": "Tạp nan dược kinh: thông hiểu trăm loại thuốc, kháng độc và tự hồi phục."
          },
          {
            "kind": "passive",
            "name": "Vô Hình Độc",
            "req": 0,
            "stats": {
              "atkPct": [
                4,
                1.2
              ],
              "critAdd": [
                2,
                0.4
              ]
            },
            "nid": "1",
            "vl": 30,
            "d": "Vô hình độc: độc vô hình theo mỗi đòn đánh, sát thương tăng."
          },
          {
            "kind": "buff",
            "name": "Ngũ Độc Kỳ Kinh",
            "req": 0,
            "stats": {
              "atkPct": [
                15,
                2
              ],
              "critAdd": [
                6,
                0.8
              ]
            },
            "dur": 60,
            "mp": [
              30,
              2
            ],
            "cd": 20,
            "nid": "tp",
            "vl": 60,
            "tp": true,
            "color": "#8fe06a",
            "d": "Tuyệt kỹ trấn phái: ngũ độc kỳ kinh, trăm độc hợp nhất, công lực tăng mạnh."
          }
        ]
      }
    ]
  }
};

window.FACTION_SKILLS = window.ALL_FACTION_DATA;
