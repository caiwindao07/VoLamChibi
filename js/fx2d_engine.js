/* =====================================================================
   HỆ THỐNG HIỆU ỨNG CHIÊU THỨC & MÔN PHÁI CHUẨN 2.5D 100% (AUTHENTIC ENGINE)
   Trích xuất nguyên bản từ js/game.js (drawFx, drawProj, VFX, FACTIONS)
   Hiển thị trung thực 100% đồ họa 2.5D trên màn hình chiến đấu 3D
   ===================================================================== */

(function(window) {
  "use strict";

  // 1. CẤU HÌNH VÕ CÔNG 12 PHÁI CHUẨN NGUYÊN BẢN 2.5D
  window.FACTIONS_25D = {
  "kiem": {
    "name": "Võ Đang",
    "el": "tho",
    "arch": "melee",
    "wname": "Kiếm",
    "tree": true,
    "uiOrder": [
      1,
      0,
      2
    ],
    "look": {
      "robe": "#55708f",
      "trim": "#ecebe2",
      "sash": "#2a3a4e",
      "head": "daoist",
      "weapon": "sword"
    },
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
    "name": "Thiết Thương Bảo",
    "el": "kim",
    "arch": "tank",
    "wname": "Thương",
    "range": 1.85,
    "wvar": [
      "spear",
      "mace",
      "blade"
    ],
    "tree": true,
    "uiOrder": [
      2,
      0,
      1,
      3
    ],
    "look": {
      "robe": "#7a3f2e",
      "trim": "#e0c28a",
      "sash": "#3a1e14",
      "head": "helm",
      "weapon": "spear"
    },
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
    "name": "Cái Bang",
    "el": "hoa",
    "arch": "healer",
    "wname": "Trượng",
    "tree": true,
    "look": {
      "robe": "#86683f",
      "trim": "#c9b07a",
      "sash": "#4a3a22",
      "head": "messy",
      "weapon": "staff"
    },
    "desc": "Hành khất giang hồ, Hàng Long chưởng hóa rồng lửa, côn pháp Cái Bang xanh biếc, túy quyền khó lường.",
    "basic": {
      "color": "#ffb347",
      "pstyle": "orb"
    },
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
    "name": "Đường Môn",
    "el": "moc",
    "arch": "poison",
    "wname": "Ám Khí",
    "wvar": [
      "dagger",
      "dart",
      "bow"
    ],
    "strictW": true,
    "tree": true,
    "look": {
      "robe": "#2e3350",
      "trim": "#9fd07a",
      "sash": "#181b2c",
      "head": "hood",
      "weapon": "dagger"
    },
    "desc": "Thế gia ám khí đất Thục: phi đao, phi tiêu, tụ tiễn bách phát bách trúng, cạm bẫy ngũ hành chôn dưới đất ai dẫm phải là nổ.",
    "basic": {
      "color": "#8fe06a",
      "pstyle": "needle"
    },
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
    "name": "Côn Lôn",
    "el": "tho",
    "arch": "caster",
    "wname": "Đao",
    "wvar": [
      "saber",
      "sword"
    ],
    "tree": true,
    "look": {
      "robe": "#d8d2c0",
      "trim": "#7a5ac8",
      "sash": "#3a2a5a",
      "head": "daoist",
      "weapon": "saber",
      "hair": "#1d1612"
    },
    "desc": "Đạo sĩ núi Côn Lôn: đao hô phong, kiếm dẫn thiên lôi, bùa chú trói buộc và mê hoặc kẻ địch.",
    "basic": {
      "color": "#d8f0d0",
      "pstyle": "tornado"
    },
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
    "sex": "nu",
    "wvar": [
      "sword"
    ],
    "name": "Nga Mi",
    "el": "thuy",
    "arch": "melee",
    "conv": "healer",
    "wname": "Kiếm",
    "range": 2,
    "tree": true,
    "uiOrder": [
      1,
      0,
      2
    ],
    "look": {
      "robe": "#c9a2c8",
      "trim": "#f4ecf8",
      "sash": "#6a3f78",
      "head": "flower",
      "weapon": "sword"
    },
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
    "wvar": [
      "spear",
      "blade"
    ],
    "name": "Hỏa Vân Cốc",
    "el": "hoa",
    "arch": "caster",
    "wname": "Thương",
    "tree": true,
    "look": {
      "robe": "#a8392a",
      "trim": "#f4cf8a",
      "sash": "#5a1a12",
      "head": "bun",
      "weapon": "spear"
    },
    "desc": "Hỏa Vân Cốc: hỏa thương, hỏa đao cận chiến và bùa chú ma hỏa đánh xa, sát thương lớn nhưng máu mỏng.",
    "basic": {
      "color": "#ff9a3c",
      "pstyle": "orb"
    },
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
    "sex": "nu",
    "name": "Thúy Yên",
    "el": "thuy",
    "arch": "berserk",
    "wname": "Đao",
    "tree": true,
    "look": {
      "robe": "#dfe7ef",
      "trim": "#6f9fcb",
      "sash": "#2e4a6a",
      "head": "bunF",
      "weapon": "blade",
      "hair": "#1a1418"
    },
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
    "name": "Thiên Sơn",
    "el": "thuy",
    "arch": "berserk",
    "wname": "Đao",
    "tree": true,
    "look": {
      "robe": "#f2f5fa",
      "trim": "#c83a5a",
      "sash": "#5a1a2a",
      "head": "topknot",
      "weapon": "blade",
      "hair": "#e9eef3"
    },
    "desc": "Linh Thứu Cung trên đỉnh Thiên Sơn: Lục Dương Chưởng lạnh thấu xương, Chiết Mai Thủ bẻ hoa mai mà đoạt mạng, Sinh Tử Phù khiến kẻ địch sống không bằng chết.",
    "basic": {
      "color": "#cfeeff",
      "pstyle": "palm"
    },
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
              8,
              0.6
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
    "name": "Tiêu Dao",
    "el": "tho",
    "arch": "melee",
    "conv": "healer",
    "wname": "Kiếm",
    "wvar": [
      "sword",
      "qin"
    ],
    "range": 2,
    "tree": true,
    "look": {
      "robe": "#f4f4f6",
      "trim": "#c8d4e2",
      "sash": "#8a98ac",
      "head": "topknot",
      "weapon": "sword",
      "hair": "#1a1612"
    },
    "desc": "Tiêu Dao phái trên hòn đảo phía đông, xa chốn Trung Nguyên: đàn và kiếm hòa cùng nhịp điệu, Cầm Pháp sóng âm đánh xa diện rộng, Kiếm Pháp cận chiến sát thương cao. Chưởng môn Văn Bán Sơn.",
    "basic": {
      "color": "#f4ecd0",
      "pstyle": "orb"
    },
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
              8,
              0.6
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
    "sex": "nam",
    "name": "Thiếu Lâm",
    "el": "kim",
    "arch": "tank",
    "wname": "Côn",
    "wvar": [
      "staff",
      "blade"
    ],
    "tree": true,
    "look": {
      "robe": "#c47a2c",
      "trim": "#f0d8a0",
      "sash": "#7a3a14",
      "head": "bald",
      "weapon": "fist",
      "hair": "#dcb28a"
    },
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
            "stun": 1,
            "color": "#ffd35a",
            "d": "Sư tử hống: Phật môn sư tử hống chấn động tâm mạch, choáng mọi kẻ địch quanh mình."
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
            "wstyle": "gold",
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
    "name": "Ngũ Độc Giáo",
    "el": "moc",
    "arch": "poison",
    "wname": "Đao",
    "wvar": [
      "blade"
    ],
    "tree": true,
    "look": {
      "robe": "#8a2a24",
      "trim": "#e8c890",
      "sash": "#2a1410",
      "head": "bunF",
      "weapon": "blade"
    },
    "desc": "Ngũ Độc Giáo đất Miêu Cương: chưởng độc, đao độc và bùa chú nguyền rủa, độc thấm dần rút cạn sinh lực kẻ địch.",
    "basic": {
      "color": "#8fe06a",
      "pstyle": "orb"
    },
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

  // 2. TỪ ĐIỂN HIỆU ỨNG CHIÊU THỨC CHUẨN 2.5D (VFX DICTIONARY)
  window.VFX = {"Vũ Đả Lê Hoa":{"pose":"cast","cast":1,"area":{"t":"icerain","col":"#8fb8ff","n":14},"impact":"ice","shake":1},"Thiên Địa Vô Cực":{"pose":"cast","area":{"t":"tdvc","col":"#fff4b8","dur":1},"shake":3},"Kim Cang Phá Sơn Chưởng":{"pose":"punch","area":{"t":"palm","col":"#ffd35a"},"shake":7},"Thiền Âm Chấn Thế":{"pose":"stomp","area":{"t":"nova","col":"#ffe08a"},"shake":6,"area2":{"t":"quake","col":"#ffe08a"}},"Bá Vương Phá Kim":{"pose":"slash","area":{"t":"sweep","col":"#ff9a3a"},"shake":6},"Chùy Tảo Bát Phương":{"pose":"spin","area":{"t":"whirl","col":"#ffb86a","item":"blade","n":10},"shake":5,"area2":{"t":"quake","col":"#ffb86a"}},"Nhất Trịch Đoạt Mệnh":{"pose":"throw","area":{"t":"rain","item":"dart","col":"#c8ffd0","n":36},"shake":4},"Tỏa Tâm Độc Ảnh":{"pose":"throw","area":{"t":"snakes","col":"#7aff9a"},"shake":4},"Xuyên Vân Phá Nhật":{"pose":"bow","area":{"t":"pillar","col":"#fff0a0"},"shake":6},"Vạn Tiễn Tề Phát":{"pose":"bow","area":{"t":"rain","item":"arrow","col":"#fff0c0","n":56},"shake":5,"area2":{"t":"pillar","col":"#fff0c0"}},"Hoa Kiếm Lạc Tinh":{"pose":"cast","cast":1,"area":{"t":"moon","col":"#ffc0e8"},"shake":5},"Hàn Vũ Tinh Lạc":{"pose":"cast","cast":1,"area":{"t":"blizzard","col":"#bfe8ff"},"shake":5},"Băng Phong Trảm Nguyệt":{"pose":"slash","area":{"t":"icenova","col":"#9ad8ff"},"shake":5},"Hàn Yên Ngưng Băng":{"pose":"stomp","area":{"t":"icenova","col":"#d8f4ff"},"shake":6},"Lục Long Hội Thiên":{"pose":"cast","cast":1,"area":{"t":"firewheel","col":"#ffb040"},"shake":7},"Côn Chấn Sơn Hà":{"pose":"stomp","area":{"t":"quake","col":"#d8b070"},"shake":8,"area2":{"t":"whirl","col":"#d8b070","item":"staff","n":12}},"Tật Hỏa Liệu Nguyên":{"pose":"cast","cast":1,"area":{"t":"flames","col":"#ff5a1a"},"shake":7,"area2":{"t":"firewheel","col":"#ff5a1a"}},"Nộ Hải Cuồng Đào":{"pose":"slash","area":{"t":"sweep","col":"#6ad0ff"},"shake":6},"Ngân Hà Kiếm Vũ":{"pose":"cast","cast":1,"area":{"t":"rain","item":"sword","col":"#e6f6ff","n":48},"shake":6,"area2":{"t":"moon","col":"#e6f6ff"}},"Thái Thanh Hóa Vũ":{"pose":"punch","area":{"t":"taichi","col":"#e8f8ff","dur":2,"hits":6},"area2":{"t":"thunder","col":"#f0f8ff","n":10,"hits":4,"dur":1.8}},"Hô Phong Đao":{"pose":"slash","p":"crescent","impact":"wind"},"Cuồng Phong Trảm":{"pose":"slash","p":"moon","impact":"wind"},"Phong Quyển Lạc Diệp":{"pose":"slash","area":{"t":"whirl","col":"#d8f0c8","item":"leaf","n":12},"impact":"wind","area2":{"t":"sweep","col":"#e0f4e0"}},"Tuyết Sơn Phong Bạo":{"pose":"slash","impact":"wind"},"Cương Phong Liệt Thiên":{"pose":"slash","impact":"wind"},"Ngũ Lôi Chưởng":{"pose":"cast","cast":1,"snd":"thunder","area":{"t":"nova","col":"#c8b0ff"}},"Lôi Hỏa Chấn Địa":{"pose":"cast","cast":1,"snd":"quake","area":{"t":"erupt","col":"#c8b0ff","hits":2},"area2":{"t":"quake","col":"#c8b0ff"}},"Lôi Vân Tỏa Địa":{"pose":"stomp","snd":"thunder","area":{"t":"icenova","col":"#d8c8ff"},"area2":{"t":"firewheel","col":"#b89aff"}},"Kiếm Quyết Phù Vân":{"pose":"cast","area":{"t":"swordfall","col":"#fff2b0","n":10,"dur":1.9,"hits":4}},"Cửu Tiêu Lôi Phạt":{"pose":"cast","cast":1,"area":{"t":"thunder9","col":"#fff0b0","n":4,"dur":1.6,"hits":3,"tot":0.85}},"Thiên Lôi Phá Nhạc":{"pose":"cast","cast":1,"area":{"t":"thunder","col":"#e0d0ff","n":28,"dur":2.4,"hits":6},"area2":{"t":"pillar","col":"#e0d0ff"}},"Thần Thủ Phách Không":{"pose":"cast","p":"palm","impact":"fire"},"Thăng Long Chưởng":{"pose":"cast","cast":1,"impact":"fire","shake":3},"Long Hống Cửu Châu":{"pose":"cast","cast":1,"impact":"fire","shake":5},"Long Đằng Cửu Tiêu":{"pose":"cast","cast":1,"impact":"fire","shake":6,"snd":"fireblast"},"Khất Bát Côn":{"pose":"slash","melee":{"t":"arcs","n":2,"col":"#b8e68a","r":24},"impact":"leaf"},"Lục Trúc Côn Trận":{"pose":"spin","area":{"t":"whirl","col":"#a6e07a","item":"staff","n":8},"impact":"leaf","shake":3},"Thanh Trúc Phi Côn":{"pose":"throw","p":"greenbolt","impact":"ring","shake":3},"Trúc Ảnh Truy Hồn":{"pose":"cast","cast":1,"impact":"ring","shake":5},"Kiếm Tâm Thông Minh":{"pose":"thrust","melee":{"t":"thrust","col":"#fff0b0"},"area":{"t":"halo","col":"#ffe08a"},"impact":"gold"},"Vô Cực Càn Khôn":{"pose":"punch","area":{"t":"taichi","col":"#e0f0ff","dur":1.8,"hits":5}},"Thái Cực Kiếm Quang":{"pose":"thrust","melee":{"t":"thrust","col":"#ffe6a0"},"area":{"t":"halo","col":"#ffe08a"},"impact":"gold"},"Bá Vương Thương":{"pose":"thrust","impact":"gold","shake":6},"Thiết Chùy Phá Quân":{"pose":"dualR","melee":{"t":"arcs","n":1,"col":"#ffe08a","r":26},"impact":"gold","shake":3},"Thiên Quân Kỵ Đao":{"pose":"slash","melee":{"t":"arcs","n":2,"col":"#ffcf8a","r":26},"impact":"gold","shake":3},"Phá Phong Đao":{"pose":"slash","melee":{"t":"arcs","col":"#f0e0c0"},"impact":"gold"},"Kỵ Đao Hoành Trảm":{"pose":"spin","area":{"t":"sweep","col":"#ffd9a0"},"impact":"gold"},"Thiết Kỵ Đột Kích":{"pose":"slash","melee":{"t":"cleave","col":"#ffcf8a"},"impact":"gold","shake":5},"Lưu Quang Tam Kiếm":{"pose":"thrust","impact":"ice","shake":3},"Kiếm Vũ Lưu Quang":{"pose":"cast","cast":1,"area":{"t":"rain","col":"#9fe0ff"},"impact":"ice","shake":2},"Lê Hoa Độc Vũ":{"pose":"throw","p":"needle","impact":"poison","shake":2},"Vạn Xà Phệ Tâm":{"pose":"cast","cast":1,"impact":"poison","shake":4},"Băng Hà Thiên Lý":{"pose":"cast","cast":1,"impact":"ice","shake":5},"Hàn Băng Tuyệt Vực":{"pose":"stomp","area":{"t":"icenova","col":"#e6f6ff"},"impact":"ice","shake":9},"Hàn Sương Lạc Nguyệt":{"pose":"spin","area":{"t":"rain","item":"petal","col":"#ffd6ec","n":30},"impact":"petal","snd":"silk","shake":3,"area2":{"t":"nova","col":"#ffd6ec"}},"Mãn Thiên Nguyệt Hoa":{"pose":"cast","cast":1,"area":{"t":"moon","col":"#e6e0ff"},"impact":"moon","snd":"lunar","shake":5,"area2":{"t":"moonring","col":"#e6e0ff"}},"Thiên Hỏa Phần Thành":{"pose":"cast","cast":1,"area":{"t":"meteor","col":"#ff5a1e"},"impact":"fire","shake":12},"Vân Long Liệt Kích":{"pose":"thrust","melee":{"t":"thrust","col":"#e8f4ff"},"shake":5},"Thiên Ngoại Lưu Hỏa":{"pose":"cast","cast":1,"area":{"t":"meteor","col":"#ff5a1e"},"impact":"fire","shake":12,"crack":"lava"},"Ma Diễm Thất Sát":{"pose":"slash","melee":{"t":"slash","col":"#ff3a1e"},"impact":"fire","shake":4},"Nhiếp Hồn Loạn Phách":{"pose":"cast","cast":1,"area":{"t":"flames","col":"#e04aff"},"impact":"fire","shake":5},"Thiên Sơn Tuyết Đao":{"pose":"slash","impact":"ice","shake":6},"Băng Tâm Tiên Tử":{"pose":"spin","impact":"ice","shake":3,"area2":{"t":"icenova","col":"#bfe6ff"}},"Bích Hải Triều Sinh":{"pose":"spin","impact":"ice","shake":2,"area2":{"t":"icenova","col":"#bfe6ff"}},"Huyết Chiến Bát Phương":{"pose":"spin","area":{"t":"whirl","col":"#ff4a3a","item":"blade","n":12},"impact":"blood","shake":7,"area2":{"t":"nova","col":"#ff3a2a"}},"La Hán Phục Ma":{"pose":"punch","impact":"gold","shake":6},"Đạt Ma Độ Giang":{"pose":"punch","impact":"dust","shake":1.5},"Phật Thủ Thiên Chưởng":{"pose":"punch","area":{"t":"palm","col":"#ffd35a"},"impact":"rock","shake":12,"area2":{"t":"pillar","col":"#ffe08a"}},"Lạc Nhật Thần Tiễn":{"pose":"bow","p":"bigarrow","impact":"gold","shake":6,"bowGlow":"#fff0a0","area":{"t":"pillar","col":"#fff0a0"}},"Thiên La Tiễn Vũ":{"pose":"bow","area":{"t":"rain","item":"arrow","col":"#fff0c0","n":48},"impact":"spark","shake":4,"area2":{"t":"nova","col":"#fff0c0"}},"Liên Hoàn Kiếm":{"pose":"slash","melee":{"t":"arcs","n":3,"col":"#a8dcff","r":26},"impact":"spark"},"Phong Quyển Kiếm":{"pose":"spin","area":{"t":"whirl","col":"#c9f0ff","item":"sword","n":8},"impact":"wind"},"Vạn Kiếm Triều Thiên":{"pose":"cast","cast":1,"area":{"t":"rain","item":"sword","col":"#dff4ff","n":24},"impact":"spark","shake":5,"area2":{"t":"nova","col":"#dff4ff"}},"Thái Cực Chưởng":{"pose":"punch","area":{"t":"taichi","col":"#cfe8ff","dur":1.2,"hits":2}},"Lưỡng Nghi Chưởng":{"pose":"punch","area":{"t":"taichi","col":"#cfe8ff","dur":1.4,"hits":3},"area2":{"t":"nova","col":"#9fd0ff"}},"Tĩnh Tọa Quy Nguyên":{"pose":"punch","area":{"t":"taichi","col":"#dff0ff","dur":1.6,"hits":4},"area2":{"t":"rain","item":"sword","col":"#e8f4ff","n":10}},"Xuyên Tâm Thương":{"pose":"thrust","melee":{"t":"thrust","col":"#ffd9a0"},"impact":"spark"},"Hoành Tảo Thiên Quân":{"pose":"chop","area":{"t":"goldring","col":"#ffc030"},"impact":"dust","shake":3},"Long Thương Phá Trận":{"pose":"thrust","p":"spear","impact":"gold","shake":3},"Thiết Chùy Kích":{"pose":"dualR","melee":{"t":"arcs","n":1,"col":"#e8d6b0"},"impact":"spark","shake":3},"Chùy Chấn Địa":{"pose":"stomp","area":{"t":"quake","col":"#d9b36a"},"impact":"rock","shake":7},"Lưu Tinh Chùy":{"pose":"dualR","melee":{"t":"arcs","n":1,"col":"#ff7a5a"},"impact":"blood"},"Long Trảo Chưởng":{"pose":"cast","cast":1,"impact":"fire","shake":2},"Song Long Xuất Hải":{"pose":"cast","cast":1,"impact":"fire","shake":3},"Tứ Long Truy Hồn":{"pose":"cast","cast":1,"impact":"fire","shake":4},"Trúc Bổng Kích":{"pose":"slash","melee":{"t":"arcs","n":2,"col":"#b8e68a","r":24},"impact":"leaf"},"Phi Bổng Truy Phong":{"pose":"throw","impact":"leaf"},"Vạn Bổng Loạn Vũ":{"pose":"cast","cast":1,"impact":"leaf"},"Thanh Xà Châm":{"pose":"throw","p":"needle","impact":"poison"},"Vạn Độc Vũ":{"pose":"throw","p":"needle","impact":"poison"},"Độc Vụ Trận":{"pose":"cast","cast":1,"area":{"t":"cloud","col":"#6fcf4a"},"impact":"poison","area2":{"t":"snakes","col":"#6fcf4a"}},"Xà Nha Chủy":{"pose":"throw","melee":{"t":"fang","col":"#b8f08a"},"impact":"poison"},"Song Xà Loạn Vũ":{"pose":"spin","area":{"t":"snakes","col":"#9fe07a"},"impact":"poison"},"Xà Vương Nhất Kích":{"pose":"thrust","melee":{"t":"beast","kind":"snake","col":"#c8ff7a"},"impact":"poison","shake":4},"Hàn Băng Tiễn":{"pose":"cast","p":"shard","impact":"ice"},"Băng Phách Liên Châu":{"pose":"cast","p":"shard","impact":"ice"},"Tuyết Lạc Vạn Lý":{"pose":"cast","cast":1,"area":{"t":"blizzard","col":"#e6f6ff"},"impact":"ice"},"Hàn Vụ":{"pose":"cast","area":{"t":"nova","col":"#cfeeff"},"impact":"ice"},"Băng Phong Trụ":{"pose":"cast","cast":1,"area":{"t":"pillar","col":"#aee0ff"},"impact":"ice","shake":4},"Vạn Niên Hàn Băng":{"pose":"stomp","area":{"t":"icenova","col":"#e6f6ff"},"impact":"ice","shake":6},"Lưu Vân Tụ":{"pose":"slash","melee":{"t":"ribbon","col":"#f4b8e8"},"impact":"petal","snd":"silk"},"Nguyệt Hoa Vũ":{"pose":"spin","area":{"t":"silk","col":"#e0b0ff"},"impact":"petal","snd":"silk"},"Kinh Hồng Nhất Vũ":{"pose":"spin","area":{"t":"lotus","col":"#ff8ac8"},"impact":"petal","snd":"silk","shake":2},"Nguyệt Quang Phiêu":{"pose":"cast","p":"lunar","impact":"moon","snd":"lunar"},"Song Nguyệt Liên Hoàn":{"pose":"cast","p":"lunar","impact":"moon","snd":"lunar"},"Mãn Nguyệt Chiếu":{"pose":"cast","cast":1,"area":{"t":"moonring","col":"#c8d8ff"},"impact":"moon","snd":"lunar","shake":2},"Tàn Dương Như Huyết":{"pose":"thrust","melee":{"t":"thrust","col":"#ff7a2e"},"impact":"fire"},"Liệt Hỏa Phần Thiên":{"pose":"chop","area":{"t":"flames","col":"#ff5a1e"},"impact":"fire","shake":7,"area2":{"t":"erupt","col":"#ff7a2e"}},"Thâu Nhật Hoán Thiên":{"pose":"spin","area":{"t":"firewheel","col":"#ff9a3c"},"impact":"fire","shake":4},"Đơn Đao Liệt Diễm":{"pose":"slash","melee":{"t":"cleave","col":"#ff8a3a"},"impact":"fire"},"Thôi Sơn Đảo Hải":{"pose":"stomp","area":{"t":"flames","col":"#ff7a2e"},"impact":"rock","shake":7},"Hỏa Liên Phần Tâm":{"pose":"cast","p":"fireball","impact":"fire"},"Ảo Ảnh Hồ Ly":{"pose":"cast","cast":1,"impact":"fire"},"Bi Phong Tán Hồn":{"pose":"cast","cast":1,"area":{"t":"flames","col":"#c88aff"},"impact":"fire","shake":3},"Lệ Ma Đoạt Hồn":{"pose":"cast","p":"orb","impact":"fire"},"Phá Sơn Đao":{"pose":"slash","melee":{"t":"cleave","col":"#d8ecff"},"impact":"rock","shake":5},"Toàn Phong Trảm":{"pose":"spin","area":{"t":"whirl","col":"#c9e6ff","item":"blade","n":6},"impact":"spark"},"Hàn Tuyết Đao Hải":{"pose":"spin","area":{"t":"whirl","col":"#bfe6ff","item":"blade","n":10,"snow":1},"impact":"ice","shake":4,"area2":{"t":"icenova","col":"#bfe6ff"}},"Ẩm Huyết Trảm":{"pose":"slash","melee":{"t":"arcs","n":2,"col":"#ff5a4a","r":28},"impact":"blood"},"Huyết Lang Kích":{"pose":"thrust","melee":{"t":"beast","kind":"wolf","col":"#ff5a4a"},"impact":"blood","shake":4},"Bất Tử Cuồng Đao":{"pose":"spin","area":{"t":"rain","item":"blade","col":"#ff4a3a","n":20},"impact":"blood","shake":4},"Hàng Long Bất Vũ":{"pose":"punch","area":{"t":"twindragon","col":"#ffd24a","hits":2},"impact":"gold","shake":3},"Thiết Sơn Quyền":{"pose":"punch","melee":{"t":"fist","n":1,"col":"#ffe08a"},"impact":"gold","shake":3},"Liên Hoàn Quyền":{"pose":"punch","melee":{"t":"fist","n":4,"col":"#ffe8a8"},"impact":"gold"},"Phá Thạch Quyền":{"pose":"punch","area":{"t":"palm","col":"#ffd35a"},"impact":"rock","shake":8,"area2":{"t":"erupt","col":"#ffd35a"}},"Chấn Địa Công":{"pose":"stomp","area":{"t":"quake","col":"#d9b36a"},"impact":"dust","shake":5},"Địa Liệt Chưởng":{"pose":"punch","area":{"t":"erupt","col":"#c89a5a"},"impact":"rock","shake":5},"Sơn Băng Địa Liệt":{"pose":"stomp","area":{"t":"quake","col":"#e0b060"},"impact":"rock","shake":9,"area2":{"t":"erupt","col":"#e0b060"}},"Liệt Hỏa Tiễn":{"pose":"bow","p":"firearrow","impact":"fire","bowGlow":"#ffb070"},"Băng Tâm Tiễn":{"pose":"bow","p":"icearrow","impact":"ice","bowGlow":"#bfe8ff"},"Băng Phách Tiễn":{"pose":"bow","p":"frostbolt","impact":"ice","shake":2,"bowGlow":"#d8f4ff"},"Hàn Nguyệt Băng Tiễn":{"pose":"bow","p":"frostbolt","impact":"ice","shake":3,"bowGlow":"#bfe8ff"},"Băng Phong Vạn Lý Tiễn":{"pose":"bow","p":"bigarrow","impact":"ice","shake":5,"bowGlow":"#bfe8ff"},"Thiên La Địa Võng":{"pose":"throw","p":"needle","impact":"poison"},"Truy Tâm Tiễn":{"pose":"throw","p":"comet","impact":"spark","shake":2},"Tiểu Lý Phi Đao":{"pose":"throw","p":"flydagger","impact":"spark"},"Tán Hoa Tiêu":{"pose":"throw","p":"xstar","impact":"spark"},"Cửu Cung Phi Tinh":{"pose":"throw","p":"coin","impact":"gold"},"Đoạt Hồn Tiêu":{"pose":"throw","p":"bigstar","impact":"spark","shake":3},"Nhiếp Hồn Nguyệt Ảnh":{"pose":"throw","p":"jade","impact":"spark"},"Bạo Vũ Lê Hoa":{"pose":"throw","p":"needle","impact":"spark","shake":2},"Mạn Thiên Hoa Vũ":{"pose":"cast","cast":1,"area":{"t":"rain","item":"petal","col":"#ffc8e0","n":46,"hits":3},"impact":"poison","shake":2},"Cửu Cung Phượng Tiễn":{"pose":"bow","p":"phoenixarrow","impact":"gold","shake":5,"bowGlow":"#ffd24a"},"Liên Châu Tiễn":{"pose":"bow","p":"goldarrow","impact":"gold"},"Xích Diễm Tiễn":{"pose":"bow","p":"bigarrow","impact":"fire","shake":3,"bowGlow":"#ffa060"},"Tam Hoa Tiễn":{"pose":"bow","p":"arrow","impact":"spark"},"Mãn Thiên Hoa Vũ":{"pose":"bow","p":"flowerarrow","impact":"petal"},"Tiễn Vũ Trận":{"pose":"bow","area":{"t":"rain","item":"arrow","col":"#f0e0b0","n":28},"impact":"spark"},"Kiến Nhân Thần Thủ":{"pose":"cast","p":"palm","impact":"fire"},"Giáng Long Chưởng":{"pose":"cast","cast":1,"impact":"fire","shake":3},"Kháng Long Hữu Hối":{"pose":"cast","cast":1,"impact":"fire","shake":5},"Phi Long Tại Thiên":{"pose":"cast","cast":1,"impact":"fire","shake":6,"snd":"fireblast"},"Diên Môn Thác Bát":{"pose":"slash","melee":{"t":"arcs","n":2,"col":"#b8e68a","r":24},"impact":"leaf"},"Đả Cẩu Trận":{"pose":"spin","area":{"t":"whirl","col":"#a6e07a","item":"staff","n":8},"impact":"leaf","shake":3},"Bổng Đả Ác Cẩu":{"pose":"throw","p":"greenbolt","impact":"ring","shake":3},"Thiên Hạ Vô Cẩu":{"pose":"cast","cast":1,"impact":"ring","shake":5},"Độc Thứ Cốt":{"pose":"cast","cast":1,"area":{"t":"cloud","col":"#6fcf4a"},"impact":"poison","area2":{"t":"snakes","col":"#6fcf4a"}},"Hồi Phong Lạc Nhạn":{"pose":"thrust","melee":{"t":"thrust","col":"#ffd9a0"},"impact":"spark"},"Dương Quang Tam Điệp":{"pose":"thrust","p":"spear","impact":"gold","shake":3},"Đoạn Hồn Thích":{"pose":"thrust","melee":{"t":"thrust","col":"#ffd9a0"},"impact":"spark"},"Truy Tinh Trục Nguyệt":{"pose":"thrust","impact":"gold","shake":6},"Trảm Long Quyết":{"pose":"dualR","melee":{"t":"arcs","n":1,"col":"#e8d6b0"},"impact":"spark","shake":3},"Hàng Vân Quyết":{"pose":"stomp","area":{"t":"quake","col":"#d9b36a"},"impact":"rock","shake":7},"Thừa Long Quyết":{"pose":"dualR","melee":{"t":"arcs","n":1,"col":"#ff7a5a"},"impact":"blood"},"Truy Phong Quyết":{"pose":"dualR","melee":{"t":"arcs","n":1,"col":"#ffe08a","r":26},"impact":"gold","shake":3},"Kinh Lôi Trảm":{"pose":"slash","melee":{"t":"arcs","col":"#f0e0c0"},"impact":"gold"},"Bát Phong Trảm":{"pose":"spin","area":{"t":"sweep","col":"#ffd9a0"},"impact":"gold"},"Vô Tâm Trảm":{"pose":"slash","melee":{"t":"cleave","col":"#ffcf8a"},"impact":"gold","shake":5},"Phá Thiên Trảm":{"pose":"slash","melee":{"t":"arcs","n":2,"col":"#ffcf8a","r":26},"impact":"gold","shake":3},"Tàn Dương Như Tuyết":{"pose":"thrust","melee":{"t":"thrust","col":"#ff7a2e"},"impact":"fire"},"Liệt Hỏa Tình Thiên":{"pose":"chop","area":{"t":"flames","col":"#ff5a1e"},"impact":"fire","shake":7,"area2":{"t":"erupt","col":"#ff7a2e"}},"Thâu Thiên Hoán Nhật":{"pose":"spin","area":{"t":"firewheel","col":"#ff9a3c"},"impact":"fire","shake":4},"Vân Long Kích":{"pose":"thrust","melee":{"t":"thrust","col":"#e8f4ff"},"shake":5},"Đơn Chỉ Liệt Diệm":{"pose":"slash","melee":{"t":"cleave","col":"#ff8a3a"},"impact":"fire"},"Thôi Sơn Điền Hải":{"pose":"stomp","area":{"t":"flames","col":"#ff7a2e"},"impact":"rock","shake":7},"Ma Diệm Thất Sát":{"pose":"slash","melee":{"t":"slash","col":"#ff3a1e"},"impact":"fire","shake":4},"Thiên Ngoại Lưu Tinh":{"pose":"cast","cast":1,"area":{"t":"meteor","col":"#ff5a1e"},"impact":"fire","shake":12,"crack":"lava"},"Hỏa Liên Phần Hoa":{"pose":"cast","p":"fireball","impact":"fire"},"Ảo Ảnh Phi Hồ":{"pose":"cast","cast":1,"impact":"fire"},"Bi Tô Thanh Phong":{"pose":"cast","cast":1,"area":{"t":"flames","col":"#c88aff"},"impact":"fire","shake":3},"Lịch Ma Đoạt Hồn":{"pose":"cast","p":"orb","impact":"fire"},"Nhiếp Hồn Loạn Tâm":{"pose":"cast","cast":1,"area":{"t":"flames","col":"#e04aff"},"impact":"fire","shake":5},"Phong Hoa Tuyết Nguyệt":{"pose":"slash","melee":{"t":"cleave","col":"#d8ecff"},"impact":"rock","shake":5},"Mục Dã Lưu Tinh":{"pose":"cast","cast":1,"area":{"t":"rain","col":"#9fe0ff"},"impact":"ice","shake":2},"Băng Tung Vô Ảnh":{"pose":"slash","impact":"ice","shake":6},"Phong Quyển Tàn Tuyết":{"pose":"spin","area":{"t":"whirl","col":"#c9e6ff","item":"blade","n":6},"impact":"spark"},"Phủ Vân Tán Tuyết":{"pose":"spin","area":{"t":"whirl","col":"#c9e6ff","item":"blade","n":6},"impact":"spark"},"Thương Hải Minh Nguyệt":{"pose":"slash","melee":{"t":"arcs","n":3,"col":"#a8dcff","r":26},"impact":"spark"},"Kiếm Phi Kinh Thiên":{"pose":"thrust","melee":{"t":"thrust","col":"#ffe6a0"},"area":{"t":"halo","col":"#ffe08a"},"impact":"gold"},"Tam Hoàn Thao Nguyệt":{"pose":"cast","cast":1,"area":{"t":"rain","item":"sword","col":"#dff4ff","n":24},"impact":"spark","shake":5,"area2":{"t":"nova","col":"#dff4ff"}},"Nhân Kiếm Hợp Nhất":{"pose":"thrust","melee":{"t":"thrust","col":"#fff0b0"},"area":{"t":"halo","col":"#ffe08a"},"impact":"gold"},"Nộ Lôi Chỉ":{"pose":"punch","area":{"t":"taichi","col":"#cfe8ff","dur":1.2,"hits":2}},"Bác Cấp Nhi Phục":{"pose":"punch","area":{"t":"taichi","col":"#cfe8ff","dur":1.4,"hits":3},"area2":{"t":"nova","col":"#9fd0ff"}},"Vô Ngã Vô Kiếm":{"pose":"punch","area":{"t":"taichi","col":"#dff0ff","dur":1.6,"hits":4},"area2":{"t":"rain","item":"sword","col":"#e8f4ff","n":10}},"Phiêu Tuyết Xuyên Vân":{"pose":"slash","melee":{"t":"ribbon","col":"#f4b8e8"},"impact":"petal","snd":"silk"},"Tỷ Tượng Đồng Quy":{"pose":"spin","area":{"t":"silk","col":"#e0b0ff"},"impact":"petal","snd":"silk"},"Phật Quang Phổ Chiếu":{"pose":"spin","area":{"t":"lotus","col":"#ff8ac8"},"impact":"petal","snd":"silk","shake":2},"Phong Sương Toái Ảnh":{"pose":"spin","area":{"t":"rain","item":"petal","col":"#ffd6ec","n":30},"impact":"petal","snd":"silk","shake":3,"area2":{"t":"nova","col":"#ffd6ec"}},"Bất Diệt Bất Tuyệt":{"pose":"cast","cast":1,"area":{"t":"rain","col":"#9fe0ff"},"impact":"ice","shake":2},"Tam Nga Tề Tuyết":{"pose":"thrust","impact":"ice","shake":3},"Thanh Âm Phạn Xướng":{"pose":"stomp","area":{"t":"nova","col":"#ffe08a"},"shake":6,"area2":{"t":"quake","col":"#ffe08a"}},"Hô Phong Pháp":{"pose":"slash","p":"crescent","impact":"wind"},"Nhất Khí Tam Thanh":{"pose":"slash","p":"moon","impact":"wind"},"Cuồng Phong Sậu Điện":{"pose":"slash","area":{"t":"whirl","col":"#d8f0c8","item":"leaf","n":12},"impact":"wind","area2":{"t":"sweep","col":"#e0f4e0"}},"Ngạo Tuyết Tiêu Phong":{"pose":"slash","impact":"wind"},"Cuồng Lôi Chấn Địa":{"pose":"cast","cast":1,"snd":"thunder","area":{"t":"nova","col":"#c8b0ff"}},"Thiên Tế Tấn Lôi":{"pose":"cast","cast":1,"snd":"quake","area":{"t":"erupt","col":"#c8b0ff","hits":2},"area2":{"t":"quake","col":"#c8b0ff"}},"Ngũ Lôi Chính Pháp":{"pose":"stomp","snd":"thunder","area":{"t":"icenova","col":"#d8c8ff"},"area2":{"t":"firewheel","col":"#b89aff"}},"Lôi Động Cửu Thiên":{"pose":"cast","cast":1,"area":{"t":"thunder9","col":"#fff0b0","n":4,"dur":1.6,"hits":3,"tot":0.85}},"Thanh Phong Phù":{"pose":"slash","p":"crescent","impact":"wind"},"Kí Bán Phù":{"pose":"cast","cast":1,"snd":"quake","area":{"t":"erupt","col":"#c8b0ff","hits":2},"area2":{"t":"quake","col":"#c8b0ff"}},"Bắc Minh Đảo Hải":{"pose":"cast","cast":1,"area":{"t":"blizzard","col":"#e6f6ff"},"impact":"ice"},"Khi Hàn Ngạo Tuyết":{"pose":"stomp","area":{"t":"icenova","col":"#e6f6ff"},"impact":"ice","shake":6},"Túy Tiên Tá Cốt":{"pose":"cast","cast":1,"area":{"t":"flames","col":"#e04aff"},"impact":"fire","shake":5},"Thiên Thanh Địa Trọc":{"pose":"cast","cast":1,"area":{"t":"cloud","col":"#6fcf4a"},"impact":"poison","area2":{"t":"snakes","col":"#6fcf4a"}},"Độc Sa Chưởng":{"pose":"cast","p":"palm","impact":"fire"},"U Minh Khô Lâu":{"pose":"cast","cast":1,"area":{"t":"cloud","col":"#6fcf4a"},"impact":"poison","area2":{"t":"snakes","col":"#6fcf4a"}},"Thiên Cương Địa Sát":{"pose":"cast","cast":1,"area":{"t":"cloud","col":"#6fcf4a"},"impact":"poison","area2":{"t":"snakes","col":"#6fcf4a"}},"Âm Phong Thực Cốt":{"pose":"cast","cast":1,"area":{"t":"cloud","col":"#6fcf4a"},"impact":"poison","area2":{"t":"snakes","col":"#6fcf4a"}},"Huyết Đao Độc Sát":{"pose":"throw","melee":{"t":"fang","col":"#b8f08a"},"impact":"poison"},"Bách Độc Xuyên Tâm":{"pose":"thrust","melee":{"t":"beast","kind":"snake","col":"#c8ff7a"},"impact":"poison","shake":4},"Chu Cáp Thanh Minh":{"pose":"spin","area":{"t":"snakes","col":"#9fe07a"},"impact":"poison"},"Huyền Âm Trảm":{"pose":"slash","area":{"t":"sweep","col":"#ff9a3a"},"shake":6},"Cửu Thiên Cuồng Lôi":{"pose":"cast","cast":1,"snd":"thunder","area":{"t":"nova","col":"#c8b0ff"}},"Xích Diệm Thực Thiên":{"pose":"chop","area":{"t":"flames","col":"#ff5a1e"},"impact":"fire","shake":7,"area2":{"t":"erupt","col":"#ff7a2e"}},"Băng Lam Huyền Tinh":{"pose":"cast","cast":1,"area":{"t":"blizzard","col":"#e6f6ff"},"impact":"ice"},"Vạn Cơ Thực Tâm":{"pose":"cast","p":"orb","impact":"fire"},"Xuyên Tâm Độc Thích":{"pose":"throw","p":"needle","impact":"poison"},"Đoạn Cân Hủ Cốt":{"pose":"cast","cast":1,"area":{"t":"cloud","col":"#6fcf4a"},"impact":"poison","area2":{"t":"snakes","col":"#6fcf4a"}},"Kim Cang Phục Ma":{"pose":"punch","melee":{"t":"fist","n":1,"col":"#ffe08a"},"impact":"gold","shake":3},"Sư Tử Hống":{"pose":"cast","cast":1,"area":{"t":"soundwave","col":"#f5d34f","dur":0.78},"shake":1},"Long Trảo Hổ Trảo":{"pose":"punch","melee":{"t":"fist","n":4,"col":"#ffe8a8"},"impact":"gold"},"Hoành Tảo Lục Hợp":{"pose":"chop","area":{"t":"goldring","col":"#ffc030"},"impact":"dust","shake":3},"Ma Ha Vô Lượng":{"pose":"slash","melee":{"t":"arcs","n":2,"col":"#ff5a4a","r":28},"impact":"blood"},"Vô Tướng Trảm":{"pose":"slash","area":{"t":"sweep","col":"#ff9a3a"},"shake":6},"Dương Quan Tam Điệp":{"pose":"thrust","p":"spear","impact":"gold","shake":3},"Độc Thích Cốt":{"pose":"cast","cast":1,"area":{"t":"cloud","col":"#6fcf4a"},"impact":"poison","area2":{"t":"snakes","col":"#6fcf4a"}},"Bá Vương Tạm Kim":{"pose":"slash","area":{"t":"sweep","col":"#ff9a3a"},"shake":6},"Tung Hoành Bát Hoang":{"pose":"spin","area":{"t":"whirl","col":"#ffb86a","item":"blade","n":10},"shake":5,"area2":{"t":"quake","col":"#ffb86a"}},"Vô Ảnh Xuyên":{"pose":"throw","area":{"t":"rain","item":"dart","col":"#c8ffd0","n":36},"shake":4},"Càn Khôn Nhất Trịch":{"pose":"throw","area":{"t":"snakes","col":"#7aff9a"},"shake":4},"Hình Tiêu Cốt Lập":{"pose":"bow","area":{"t":"pillar","col":"#fff0a0"},"shake":6},"U Hồn Phệ Ảnh":{"pose":"bow","area":{"t":"rain","item":"arrow","col":"#fff0c0","n":56},"shake":5,"area2":{"t":"pillar","col":"#fff0c0"}},"Kiếm Hoa Vãn Tinh":{"pose":"cast","cast":1,"area":{"t":"moon","col":"#ffc0e8"},"shake":5},"Băng Vũ Lạc Tinh":{"pose":"cast","cast":1,"area":{"t":"blizzard","col":"#bfe8ff"},"shake":5},"Băng Tước Hoạt Kỳ":{"pose":"slash","area":{"t":"icenova","col":"#9ad8ff"},"shake":5},"Thủy Anh Man Tú":{"pose":"stomp","area":{"t":"icenova","col":"#d8f4ff"},"shake":6},"Thời Thặng Lục Long":{"pose":"cast","cast":1,"area":{"t":"firewheel","col":"#ffb040"},"shake":7},"Bổng Huýnh Lược Địa":{"pose":"stomp","area":{"t":"quake","col":"#d8b070"},"shake":8,"area2":{"t":"whirl","col":"#d8b070","item":"staff","n":12}},"Giang Hải Nộ Lan":{"pose":"slash","area":{"t":"sweep","col":"#6ad0ff"},"shake":6},"Kiếm Thùy Tinh Hà":{"pose":"cast","cast":1,"area":{"t":"rain","item":"sword","col":"#e6f6ff","n":48},"shake":6,"area2":{"t":"moon","col":"#e6f6ff"}},"Tạo Hóa Thái Thanh":{"pose":"punch","area":{"t":"taichi","col":"#e8f8ff","dur":2,"hits":6},"area2":{"t":"thunder","col":"#f0f8ff","n":10,"hits":4,"dur":1.8}},"Cửu Thiên Cương Phong":{"pose":"slash","impact":"wind"},"Thiên Lôi Chấn Nhạc":{"pose":"cast","cast":1,"area":{"t":"thunder","col":"#e0d0ff","n":28,"dur":2.4,"hits":6},"area2":{"t":"pillar","col":"#e0d0ff"}},"Hào Hùng Trảm":{"pose":"slash","melee":{"t":"arcs","n":2,"col":"#ffcf8a","r":26},"impact":"gold","shake":3},"Thiết Liên Tứ Sát":{"pose":"throw","p":"needle","impact":"spark","shake":2},"Vi Đà Hiến Xử":{"pose":"stomp","area":{"t":"nova","col":"#ffe08a"},"shake":6,"area2":{"t":"quake","col":"#ffe08a"}},"Tam Giới Quy Thiền":{"pose":"slash","area":{"t":"sweep","col":"#ff9a3a"},"shake":6},"Đại Lực Kim Cang Chưởng":{"pose":"punch","area":{"t":"palm","col":"#ffd35a"},"shake":7}};
  window.VFX_ALIAS = {"Kiến Nhân Thần Thủ":"Thần Thủ Phách Không","Giáng Long Chưởng":"Thăng Long Chưởng","Kháng Long Hữu Hối":"Long Hống Cửu Châu","Phi Long Tại Thiên":"Long Đằng Cửu Tiêu","Diên Môn Thác Bát":"Khất Bát Côn","Đả Cẩu Trận":"Lục Trúc Côn Trận","Bổng Đả Ác Cẩu":"Thanh Trúc Phi Côn","Thiên Hạ Vô Cẩu":"Trúc Ảnh Truy Hồn","Truy Tâm Tiễn":"Vạn Độc Vũ","Tiểu Lý Phi Đao":"Thanh Xà Châm","Đoạt Hồn Tiêu":"Thanh Xà Châm","Tán Hoa Tiêu":"Vạn Độc Vũ","Cửu Cung Phi Tinh":"Lê Hoa Độc Vũ","Bạo Vũ Lê Hoa":"Lê Hoa Độc Vũ","Độc Thứ Cốt":"Độc Vụ Trận","Hồi Phong Lạc Nhạn":"Xuyên Tâm Thương","Dương Quang Tam Điệp":"Long Thương Phá Trận","Đoạn Hồn Thích":"Xuyên Tâm Thương","Huyết Chiến Bát Phương":"Hoành Tảo Thiên Quân","Truy Tinh Trục Nguyệt":"Bá Vương Thương","Trảm Long Quyết":"Thiết Chùy Kích","Hàng Vân Quyết":"Chùy Chấn Địa","Thừa Long Quyết":"Lưu Tinh Chùy","Truy Phong Quyết":"Thiết Chùy Phá Quân","Kinh Lôi Trảm":"Phá Phong Đao","Bát Phong Trảm":"Kỵ Đao Hoành Trảm","Vô Tâm Trảm":"Thiết Kỵ Đột Kích","Phá Thiên Trảm":"Thiên Quân Kỵ Đao","Tàn Dương Như Tuyết":"Tàn Dương Như Huyết","Liệt Hỏa Tình Thiên":"Liệt Hỏa Phần Thiên","Thâu Thiên Hoán Nhật":"Thâu Nhật Hoán Thiên","Vân Long Kích":"Vân Long Liệt Kích","Đơn Chỉ Liệt Diệm":"Đơn Đao Liệt Diễm","Thôi Sơn Điền Hải":"Thôi Sơn Đảo Hải","Ma Diệm Thất Sát":"Ma Diễm Thất Sát","Thiên Ngoại Lưu Tinh":"Thiên Ngoại Lưu Hỏa","Hỏa Liên Phần Hoa":"Hỏa Liên Phần Tâm","Ảo Ảnh Phi Hồ":"Ảo Ảnh Hồ Ly","Bi Tô Thanh Phong":"Bi Phong Tán Hồn","Lịch Ma Đoạt Hồn":"Lệ Ma Đoạt Hồn","Nhiếp Hồn Loạn Tâm":"Nhiếp Hồn Loạn Phách","Phong Hoa Tuyết Nguyệt":"Phá Sơn Đao","Vũ Đả Lê Hoa":"Tuyết Lạc Vạn Lý","Mục Dã Lưu Tinh":"Kiếm Vũ Lưu Quang","Băng Tung Vô Ảnh":"Thiên Sơn Tuyết Đao","Phong Quyển Tàn Tuyết":"Toàn Phong Trảm","Phủ Vân Tán Tuyết":"Toàn Phong Trảm","Bích Hải Triều Sinh":"Hàn Tuyết Đao Hải","Băng Tâm Tiên Tử":"Hàn Tuyết Đao Hải","Thương Hải Minh Nguyệt":"Liên Hoàn Kiếm","Kiếm Phi Kinh Thiên":"Vạn Kiếm Triều Thiên","Tam Hoàn Thao Nguyệt":"Mãn Thiên Nguyệt Hoa","Nhân Kiếm Hợp Nhất":"Kiếm Tâm Thông Minh","Nộ Lôi Chỉ":"Thái Cực Chưởng","Bác Cấp Nhi Phục":"Lưỡng Nghi Chưởng","Vô Ngã Vô Kiếm":"Tĩnh Tọa Quy Nguyên","Thiên Địa Vô Cực":"Vô Cực Càn Khôn","Phiêu Tuyết Xuyên Vân":"Lưu Vân Tụ","Tỷ Tượng Đồng Quy":"Nguyệt Hoa Vũ","Phật Quang Phổ Chiếu":"Kinh Hồng Nhất Vũ","Phong Sương Toái Ảnh":"Hàn Sương Lạc Nguyệt","Nhất Diệp Tri Thu":"Phiêu Tuyết Phi Kiếm","Thôi Song Vọng Nguyệt":"Song Kiếm Liên Hoàn","Bất Diệt Bất Tuyệt":"Kiếm Vũ Lưu Quang","Tam Nga Tề Tuyết":"Lưu Quang Tam Kiếm","Thanh Âm Phạn Xướng":"Thiền Âm Chấn Thế","Hô Phong Pháp":"Hô Phong Đao","Nhất Khí Tam Thanh":"Cuồng Phong Trảm","Cuồng Phong Sậu Điện":"Phong Quyển Lạc Diệp","Ngạo Tuyết Tiêu Phong":"Tuyết Sơn Phong Bạo","Cuồng Lôi Chấn Địa":"Ngũ Lôi Chưởng","Thiên Tế Tấn Lôi":"Lôi Hỏa Chấn Địa","Ngũ Lôi Chính Pháp":"Lôi Vân Tỏa Địa","Lôi Động Cửu Thiên":"Cửu Tiêu Lôi Phạt","Thanh Phong Phù":"Hô Phong Đao","Kí Bán Phù":"Lôi Hỏa Chấn Địa","Bắc Minh Đảo Hải":"Tuyết Lạc Vạn Lý","Khi Hàn Ngạo Tuyết":"Vạn Niên Hàn Băng","Túy Tiên Tá Cốt":"Nhiếp Hồn Loạn Phách","Thiên Thanh Địa Trọc":"Độc Vụ Trận","Độc Sa Chưởng":"Thần Thủ Phách Không","U Minh Khô Lâu":"Độc Vụ Trận","Thiên Cương Địa Sát":"Độc Vụ Trận","Âm Phong Thực Cốt":"Độc Vụ Trận","Huyết Đao Độc Sát":"Xà Nha Chủy","Bách Độc Xuyên Tâm":"Xà Vương Nhất Kích","Chu Cáp Thanh Minh":"Song Xà Loạn Vũ","Huyền Âm Trảm":"Bá Vương Phá Kim","Cửu Thiên Cuồng Lôi":"Ngũ Lôi Chưởng","Xích Diệm Thực Thiên":"Liệt Hỏa Phần Thiên","Băng Lam Huyền Tinh":"Tuyết Lạc Vạn Lý","Vạn Cơ Thực Tâm":"Lệ Ma Đoạt Hồn","Xuyên Tâm Độc Thích":"Vạn Độc Vũ","Đoạn Cân Hủ Cốt":"Độc Vụ Trận","Kim Cang Phục Ma":"Thiết Sơn Quyền","Sư Tử Hống":"Sơn Băng Địa Liệt","Long Trảo Hổ Trảo":"Liên Hoàn Quyền","Đạt Ma Độ Giang":"La Hán Phục Ma","Hoành Tảo Lục Hợp":"Hoành Tảo Thiên Quân","Ma Ha Vô Lượng":"Ẩm Huyết Trảm","Vô Tướng Trảm":"Bá Vương Phá Kim","Dương Quan Tam Điệp":"Dương Quang Tam Điệp","Độc Thích Cốt":"Độc Thứ Cốt","Tiêu Dao Công":"Tiêu Diêu Công","Côn Lôn Đao Pháp":"Côn Luân Đao Pháp","Côn Lôn Kiếm Pháp":"Côn Luân Kiếm Pháp","Sương Ngạo Côn Lôn":"Sương Ngạo Côn Luân","Tàn Dương Như Huyết":"Tàn Dương Như Tuyết","Băng Tâm Thiến Ảnh":"Băng Tâm Trái Ảnh","Đảo Hư Thiên":"Thiết Bích Tâm Pháp","Bá Vương Tạm Kim":"Bá Vương Phá Kim","Tung Hoành Bát Hoang":"Chùy Tảo Bát Phương","Mê Ảnh Tung":"Mê Tung Ảo Bộ","Vô Ảnh Xuyên":"Nhất Trịch Đoạt Mệnh","Càn Khôn Nhất Trịch":"Tỏa Tâm Độc Ảnh","Hấp Tinh Yểm":"Thần Xạ Tâm Kinh","Hình Tiêu Cốt Lập":"Xuyên Vân Phá Nhật","U Hồn Phệ Ảnh":"Vạn Tiễn Tề Phát","Bế Nguyệt Phất Trần":"Phất Trần Thanh Tâm","Kiếm Hoa Vãn Tinh":"Hoa Kiếm Lạc Tinh","Băng Vũ Lạc Tinh":"Hàn Vũ Tinh Lạc","Ngự Tuyết Ẩn":"Tuyết Ẩn Thân Pháp","Băng Tước Hoạt Kỳ":"Băng Phong Trảm Nguyệt","Thủy Anh Man Tú":"Hàn Yên Ngưng Băng","Hỗn Thiên Khí Công":"Hỗn Nguyên Khí Công","Thời Thặng Lục Long":"Lục Long Hội Thiên","Bổng Huýnh Lược Địa":"Côn Chấn Sơn Hà","Ma Âm Phệ Phách":"Ma Âm Nhiếp Hồn","Giang Hải Nộ Lan":"Nộ Hải Cuồng Đào","Xuất Ứ Bất Nhiễm":"Thanh Tâm Bất Nhiễm","Kiếm Thùy Tinh Hà":"Ngân Hà Kiếm Vũ","Tạo Hóa Thái Thanh":"Thái Thanh Hóa Vũ","Lưỡng Nghi Chân Khí":"Âm Dương Chân Khí","Cửu Thiên Cương Phong":"Cương Phong Liệt Thiên","Thiên Lôi Chấn Nhạc":"Thiên Lôi Phá Nhạc","Hào Hùng Trảm":"Phá Thiên Trảm","Thiết Liên Tứ Sát":"Bạo Vũ Lê Hoa","Vi Đà Hiến Xử":"Thiền Âm Chấn Thế","Tam Giới Quy Thiền":"Bá Vương Phá Kim","Đại Lực Kim Cang Chưởng":"Kim Cang Phá Sơn Chưởng"};;

  // 3. TOÀN BỘ ENGINE VẼ EFFECT 2.5D (drawFx, drawProj, glow, lighter,...)
  let ctx = null;
  let time = 0;
  const TW = 64, TH = 32;

  function clamp(t, min, max) { return Math.max(min, Math.min(max, t)); }

  function hexA(t, e) {
    if (typeof t === "string" && t[0] === "#" && t.length === 7) {
      return "rgba(" + parseInt(t.slice(1, 3), 16) + "," + parseInt(t.slice(3, 5), 16) + "," + parseInt(t.slice(5, 7), 16) + "," + e + ")";
    }
    return t;
  }

  const glowCache = {};
  function glowSprite(t) {
    let e = glowCache[t];
    if (e) return e;
    e = document.createElement("canvas");
    e.width = e.height = 64;
    const n = e.getContext("2d");
    const a = n.createRadialGradient(32, 32, 0, 32, 32, 32);
    a.addColorStop(0, "rgba(255,255,255,1)");
    a.addColorStop(0.2, hexA(t, 1));
    a.addColorStop(0.5, hexA(t, 0.35));
    a.addColorStop(1, hexA(t, 0));
    n.fillStyle = a;
    n.fillRect(0, 0, 64, 64);
    return glowCache[t] = e;
  }

  function glow(t, e, n, a, o = 1) {
    if (!ctx || o <= 0.01 || n <= 0.5) return;
    const oldGco = ctx.globalCompositeOperation;
    const oldAlpha = ctx.globalAlpha;
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = Math.min(1, o);
    try {
      ctx.drawImage(glowSprite(a), t - n, e - n, n * 2, n * 2);
    } catch(err) {}
    ctx.globalCompositeOperation = oldGco;
    ctx.globalAlpha = oldAlpha;
  }

  function mulberry32(a) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  // Chuyển đổi tọa độ thế giới 3D sang tọa độ màn hình 2D
  function scr(wx, wz) {
    if (typeof wx === "object" && wx !== null && wx.x != null && wx.y != null) {
      return wx;
    }
    if (!window.camera3D) return { x: wx || 0, y: wz || 0 };
    const pos = new THREE.Vector3(wx || 0, 1.2, wz || 0);
    pos.project(window.camera3D);
    return {
      x: (pos.x * 0.5 + 0.5) * window.innerWidth,
      y: (-(pos.y * 0.5) + 0.5) * window.innerHeight
    };
  }

  // Area rings and particles sit on the floor; the base projection is reserved for body-height effects.
  function scrGround(wx, wz) {
    if (!window.camera3D) return { x: wx || 0, y: wz || 0 };
    const pos = new THREE.Vector3(wx || 0, 0, wz || 0);
    pos.project(window.camera3D);
    return {
      x: (pos.x * 0.5 + 0.5) * window.innerWidth,
      y: (-(pos.y * 0.5) + 0.5) * window.innerHeight
    };
  }

  // Chuyển đổi hướng di chuyển 3D sang góc xoay 2D
  function iso(dx, dy) {
    if (!window.camera3D) return { x: dx || 0, y: dy || 0 };
    const p0 = new THREE.Vector3(0, 0, 0).project(window.camera3D);
    const p1 = new THREE.Vector3(dx || 0, 0, dy || 0).project(window.camera3D);
    return {
      x: (p1.x - p0.x) * window.innerWidth * 0.5,
      y: (-(p1.y - p0.y)) * window.innerHeight * 0.5
    };
  }

  // Khối hàm vẽ nguyên bản từ 2.5D (drawFx, drawPalm, drawField,...)
  const ease=t=>1-Math.pow(1-clamp(t,0,1),3);function lighter(t){ctx.save();ctx.globalCompositeOperation="lighter";t();ctx.restore()}function crescent(t,e,n,a,o,i,l,r,c=.75){ctx.save();ctx.translate(t,e);ctx.rotate(a);ctx.scale(1,c);ctx.globalCompositeOperation="lighter";ctx.globalAlpha=r;ctx.fillStyle=l;ctx.beginPath();ctx.arc(0,0,n,o,i);ctx.arc(n*.16,0,n*.84,i,o,true);ctx.closePath();ctx.fill();ctx.globalAlpha=r*.9;ctx.strokeStyle="#ffffff";ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(0,0,n*.97,o+(i-o)*.15,i);ctx.stroke();ctx.restore()}function drawItem(t,e,n,a,o,i){ctx.save();ctx.translate(e,n);ctx.rotate(a);ctx.globalAlpha=i;if(t==="sword"){glow(0,0,14,o,i*.6);ctx.globalAlpha=i;ctx.fillStyle="#eef6ff";ctx.beginPath();ctx.moveTo(15,0);ctx.lineTo(0,-2);ctx.lineTo(-5,-1.6);ctx.lineTo(-5,1.6);ctx.lineTo(0,2);ctx.closePath();ctx.fill();ctx.fillStyle="#c69c4d";ctx.fillRect(-6.5,-4,2,8);ctx.fillStyle="#5a3a22";ctx.fillRect(-11,-1.2,4.5,2.4)}else if(t==="blade"){glow(0,0,16,o,i*.6);ctx.globalAlpha=i;ctx.fillStyle="#dfe4ea";ctx.beginPath();ctx.moveTo(-4,-3);ctx.lineTo(14,-5);ctx.quadraticCurveTo(19,0,14,6);ctx.lineTo(-4,3);ctx.closePath();ctx.fill();ctx.fillStyle=o;ctx.fillRect(-7,-4,3,8)}else if(t==="arrow"){ctx.strokeStyle="#e8dcc0";ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(-14,0);ctx.lineTo(6,0);ctx.stroke();ctx.fillStyle="#dfe6ec";ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(4,-3);ctx.lineTo(4,3);ctx.fill();ctx.fillStyle="#c8352a";ctx.beginPath();ctx.moveTo(-14,0);ctx.lineTo(-18,-3);ctx.lineTo(-11,0);ctx.lineTo(-18,3);ctx.fill();glow(8,0,6,o,i*.7)}else if(t==="staff"){glow(0,0,16,o,i*.7);ctx.globalAlpha=i;ctx.strokeStyle="#8fc05a";ctx.lineWidth=3.2;ctx.beginPath();ctx.moveTo(-15,0);ctx.lineTo(15,0);ctx.stroke();ctx.strokeStyle="#3f6428";ctx.lineWidth=1;for(let t=-10;t<=10;t+=6){ctx.beginPath();ctx.moveTo(t,-1.8);ctx.lineTo(t,1.8);ctx.stroke()}}else if(t==="dart"){glow(0,0,12,o,i*.7);ctx.globalAlpha=i;ctx.fillStyle="#e8f0f4";ctx.beginPath();ctx.moveTo(12,0);ctx.lineTo(0,-3);ctx.lineTo(-7,0);ctx.lineTo(0,3);ctx.closePath();ctx.fill();ctx.fillStyle=o;ctx.fillRect(-11,-1,5,2)}else if(t==="petal"){ctx.fillStyle=pick(["#f7b8d8","#ffd6ec"]);ctx.beginPath();ctx.ellipse(0,0,5,2.4,0,0,7);ctx.fill()}ctx.restore();ctx.globalAlpha=1}function drawPalm(t,e,n,a,o){ctx.save();ctx.translate(t,e);ctx.scale(n,n);ctx.globalAlpha=o;glow(0,-4,46,a,o*.9);ctx.globalAlpha=o;const i=ctx.createLinearGradient(0,-40,0,24);i.addColorStop(0,"#fff6c8");i.addColorStop(1,a);ctx.fillStyle=i;ctx.strokeStyle="rgba(140,90,20,.8)";ctx.lineWidth=1.4;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(-16,-10,32,30,9);else ctx.rect(-16,-10,32,30);ctx.fill();ctx.stroke();for(const[t,e,n]of[[-12,20,6.5],[-4,26,6.5],[4,24,6.5],[12,19,6]]){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(t-n/2,-10-e,n,e+4,3);else ctx.rect(t-n/2,-10-e,n,e+4);ctx.fill();ctx.stroke()}ctx.save();ctx.translate(-16,4);ctx.rotate(-.8);ctx.beginPath();if(ctx.roundRect)ctx.roundRect(-3.5,-16,7,18,3);else ctx.rect(-3.5,-16,7,18);ctx.fill();ctx.stroke();ctx.restore();ctx.fillStyle="rgba(140,90,20,.35)";ctx.beginPath();ctx.arc(0,4,6,0,7);ctx.fill();ctx.restore();ctx.globalAlpha=1}function drawBeastHead(t,e,n,a,o,i,l){ctx.save();ctx.translate(e,n);ctx.rotate(a);if(Math.cos(a)<0)ctx.scale(1,-1);ctx.scale(o/20,o/20);glow(0,0,34,i,l*.8);ctx.globalAlpha=l;ctx.globalCompositeOperation="lighter";ctx.fillStyle=hexA(i,.85);ctx.strokeStyle="#ffffff";ctx.lineWidth=1.2;if(t==="wolf"){ctx.beginPath();ctx.moveTo(-18,-8);ctx.lineTo(-10,-20);ctx.lineTo(-4,-10);ctx.lineTo(4,-14);ctx.lineTo(22,-6);ctx.lineTo(26,-2);ctx.lineTo(10,0);ctx.lineTo(24,6);ctx.lineTo(8,8);ctx.lineTo(-12,10);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle="#fff";ctx.beginPath();ctx.moveTo(12,-1);ctx.lineTo(14,3);ctx.lineTo(16,-1);ctx.moveTo(18,1);ctx.lineTo(20,5);ctx.lineTo(22,1);ctx.fill();ctx.fillStyle="#ffe04a";ctx.beginPath();ctx.arc(2,-7,2.2,0,7);ctx.fill()}else{ctx.beginPath();ctx.moveTo(-14,0);ctx.quadraticCurveTo(-6,-14,10,-9);ctx.lineTo(24,-2);ctx.lineTo(12,1);ctx.lineTo(24,5);ctx.quadraticCurveTo(-4,14,-14,0);ctx.fill();ctx.stroke();ctx.fillStyle="#fff";ctx.beginPath();ctx.moveTo(14,-1);ctx.lineTo(15,5);ctx.lineTo(17,0);ctx.fill();ctx.fillStyle="#ff3a2a";ctx.beginPath();ctx.arc(4,-6,2,0,7);ctx.fill();ctx.strokeStyle="#ff5a8a";ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(24,1);ctx.lineTo(31,1);ctx.lineTo(34,-2);ctx.moveTo(31,1);ctx.lineTo(34,4);ctx.stroke()}ctx.restore();ctx.globalAlpha=1}function drawFunnel(t,e,n,a,o,i,l){ctx.save();ctx.globalCompositeOperation="lighter";for(let r=0;r<14;r++){const c=r/13,s=e-c*n,h=a*(.18+.82*Math.pow(c,1.2)),f=Math.sin(l*.7+c*5)*a*.18*c;ctx.globalAlpha=i*(.35+.45*(1-c));ctx.strokeStyle=r%3===0?"#ffffff":o;ctx.lineWidth=2.2-c;ctx.beginPath();ctx.ellipse(t+f,s,h,h*.32,0,l+c*3,l+c*3+Math.PI*1.4);ctx.stroke()}ctx.restore();ctx.globalAlpha=1;glow(t,e-n*.4,a*.9,o,i*.35)}function drawSwordFall(t,e,n,a){const o=mulberry32(n),i=330,l=e-i,r=.36,c=Math.min(1,a/r),s=l+i*c*c,h=a<.62?1:Math.max(0,1-(a-.62)/.38);ctx.save();ctx.globalCompositeOperation="lighter";ctx.lineCap="round";for(const[e,n,o]of[[7,"#ffd860",.18],[3,"#fff2b0",.55],[1.2,"#ffffff",.95]]){ctx.globalAlpha=h*o*(a<r?1:.85);ctx.strokeStyle=n;ctx.lineWidth=e;ctx.beginPath();ctx.moveTo(t,l);ctx.lineTo(t,s-6);ctx.stroke()}for(let e=0;e<7;e++){const n=(o()+a*.8)%1,i=l+(s-l)*n;ctx.globalAlpha=h*(.4+.6*o());ctx.fillStyle=e%2?"#ffffff":"#ffe48a";ctx.beginPath();ctx.arc(t+(o()-.5)*5,i,.9+o()*1.3,0,7);ctx.fill()}const f=a<r?s:e;ctx.globalAlpha=h;ctx.translate(t,f);const d=a<r?26:18*(1-Math.min(1,(a-r)/.5)*.35);ctx.fillStyle="#fff6d0";ctx.beginPath();ctx.moveTo(-1.8,-d);ctx.lineTo(1.8,-d);ctx.lineTo(1.2,-3);ctx.lineTo(0,1.5);ctx.lineTo(-1.2,-3);ctx.closePath();ctx.fill();ctx.fillStyle="#ffd24a";ctx.fillRect(-5,-d-1.6,10,2.2);ctx.fillRect(-1.2,-d-8,2.4,6.5);ctx.beginPath();ctx.arc(0,-d-9,1.8,0,7);ctx.fill();ctx.translate(-t,-f);if(a>=r){const o=(a-r)/(1-r),i=6+o*26;ctx.globalAlpha=(1-o)*.95;ctx.strokeStyle="#fff6c8";ctx.lineWidth=1.6;for(let a=0;a<8;a++){const l=a*Math.PI/4+n%7*.1,r=a%2?i*.6:i;ctx.beginPath();ctx.moveTo(t+Math.cos(l)*i*.2,e+Math.sin(l)*i*.1);ctx.lineTo(t+Math.cos(l)*r,e+Math.sin(l)*r*.45-(a%2?0:4*(1-o)));ctx.stroke()}ctx.restore();glow(t,e-3,22+o*12,"#ffe08a",(1-o)*.9);glow(t,e-2,9,"#ffffff",1-o);return}ctx.restore();glow(t,s,10,"#fff2b0",.8)}function drawBolt9(t,e,n,a){const o=mulberry32(n),i=300,l=e-i,r=12,c=[];let s=(o()-.5)*30,h=o()<.5?-1:1;for(let e=0;e<=r;e++){const n=e/r;if(e&&e<r){h=o()<.75?-h:h;s+=h*(9+o()*16);s=Math.max(-46,Math.min(46,s))}c.push([t+(e===r?0:s*(1-n*.5)),l+i*(n+(e&&e<r?(o()-.5)*.03:0))])}const f=Math.min(1,a/.45),d=a<.7?1:Math.max(0,1-(a-.7)/.3),g=Math.max(1,Math.round(r*f));ctx.save();ctx.globalCompositeOperation="lighter";ctx.lineCap="round";ctx.lineJoin="round";const u=(t,e,n)=>{ctx.globalAlpha=d*n;ctx.strokeStyle=e;ctx.lineWidth=t;ctx.beginPath();for(let t=0;t<=g;t++){const[e,n]=c[t];t?ctx.lineTo(e,n):ctx.moveTo(e,n)}ctx.stroke()};u(8,"#fff0a0",.25);u(3.4,"#fff6c8",.75);u(1.4,"#ffffff",1);for(let t=0;t<2;t++)if(o()<.85){const e=2+(o()*7|0);if(e<g){const n=o()<.5?-1:1;ctx.globalAlpha=d*(.75-t*.2);ctx.strokeStyle="#fff6c8";ctx.lineWidth=1.5-t*.4;ctx.beginPath();ctx.moveTo(c[e][0],c[e][1]);let a=c[e][0],i=c[e][1];for(let t=0;t<4;t++){a+=n*(6+o()*10)*(t%2?.4:1);i+=9+o()*10;ctx.lineTo(a,i)}ctx.stroke()}}const p=Math.min(g,Math.round(r*Math.min(1,a*1.15))),[m,y]=c[p];for(let t=0;t<3;t++){const e=(9-t*2)*(1+a*.4);ctx.globalAlpha=d*(.9-t*.2);ctx.strokeStyle="#fff6c8";ctx.lineWidth=1.4;ctx.beginPath();ctx.ellipse(m,y+t*7,e,e*.38,0,0,7);ctx.stroke()}if(a>.42){const o=Math.min(1,(a-.42)/.58),i=1-o;const l=14+18*Math.sqrt(o),r=ctx.createRadialGradient(t,e-4,0,t,e-4,l);r.addColorStop(0,`rgba(255,255,255,${.7*i})`);r.addColorStop(.35,`rgba(255,240,170,${.45*i})`);r.addColorStop(1,"rgba(255,220,120,0)");ctx.globalAlpha=1;ctx.fillStyle=r;ctx.beginPath();ctx.ellipse(t,e-4,l,l*.62,0,0,7);ctx.fill();for(let n=0;n<2;n++){const a=Math.max(0,o-n*.18),i=8+30*a;if(a<=0)continue;ctx.globalAlpha=(1-a)*(.7-n*.25);ctx.strokeStyle=n?"#fff0a0":"#fff6c8";ctx.lineWidth=2*(1-a)+.5;ctx.beginPath();ctx.ellipse(t,e,i,i*.42,0,0,7);ctx.stroke()}if(o<.7){const a=mulberry32(n^23130),i=1-o/.7;ctx.lineWidth=1.3;ctx.strokeStyle="#fff6c8";ctx.globalAlpha=i;for(let n=0;n<6;n++){const i=n/6*6.283+a()*.6,l=10+a()*8+16*o;let r=t,c=e;ctx.beginPath();ctx.moveTo(r,c);for(let n=1;n<=4;n++){const o=n/4,s=(a()-.5)*8;r=t+Math.cos(i)*l*o-Math.sin(i)*s;c=e+(Math.sin(i)*l*o+Math.cos(i)*s)*.45;ctx.lineTo(r,c)}ctx.stroke()}}}ctx.restore();ctx.globalAlpha=1;if(a>.4)glow(t,e-4,26,"#fff0b0",d*.8)}function drawBolt(t,e,n,a,o){const i=mulberry32(n);let l=t+(i()-.5)*60,r=e-280;ctx.save();ctx.globalCompositeOperation="lighter";ctx.lineCap="round";const c=[[l,r]];for(let n=1;n<=10;n++){const a=n/10;c.push([t+(i()-.5)*26*(1-a)+(l-t)*(1-a),r+(e-r)*a])}for(const[t,e,n]of[[9,o,.35],[4,"#e8e0ff",.7],[1.6,"#ffffff",1]]){ctx.globalAlpha=a*n;ctx.strokeStyle=e;ctx.lineWidth=t;ctx.beginPath();c.forEach(([t,e],n)=>n?ctx.lineTo(t,e):ctx.moveTo(t,e));ctx.stroke()}ctx.globalAlpha=a*.6;ctx.strokeStyle=o;ctx.lineWidth=1.2;const s=3+(i()*4|0);ctx.beginPath();ctx.moveTo(c[s][0],c[s][1]);ctx.lineTo(c[s][0]+(i()-.5)*50,c[s][1]+30+i()*30);ctx.stroke();ctx.restore();ctx.globalAlpha=1;glow(t,e-6,34,o,a);glow(t,e-4,12,"#ffffff",a)}function nmFx(t,e,n,a,o=1,i=1,l){if(!(o>0))return;const r=ctx,c=.42,s=Math.PI*2;r.save();r.globalAlpha*=o;r.translate(e,n);r.scale(i,i);const h=(t,e,n=0)=>{r.save();r.globalCompositeOperation="lighter";r.translate(0,n);r.scale(1,c);const a=r.createRadialGradient(0,0,0,0,0,t);a.addColorStop(0,e);a.addColorStop(1,"rgba(0,0,0,0)");r.fillStyle=a;r.beginPath();r.arc(0,0,t,0,s);r.fill();r.restore()};const f=(t,e,n,a)=>{r.save();r.globalCompositeOperation="lighter";const o=r.createRadialGradient(t,e,0,t,e,n);o.addColorStop(0,"rgba(255,255,255,1)");o.addColorStop(.35,a);o.addColorStop(1,"rgba(0,0,0,0)");r.fillStyle=o;r.beginPath();r.arc(t,e,n,0,s);r.fill();r.restore()};const d=(t,e,n)=>{h(34,n);r.save();r.scale(1,c);const i=32;r.lineCap="round";for(let n=0;n<i;n++){const l=n/i*s+a*1.1,c=14+1.5*Math.sin(a*3+n),h=24+5*Math.sin(a*5.3+n*1.7),f=Math.cos(l)*c,d=Math.sin(l)*c,g=Math.cos(l)*h,u=Math.sin(l)*h;r.globalCompositeOperation="source-over";r.strokeStyle=e;r.globalAlpha=o*.95;r.lineWidth=n%3?2.2:3.2;r.beginPath();r.moveTo(f,d);r.lineTo(g,u);r.stroke();r.globalCompositeOperation="lighter";r.strokeStyle=t;r.globalAlpha=o;r.lineWidth=1.1;r.beginPath();r.moveTo(f,d);r.lineTo(f+(g-f)*.55,d+(u-d)*.55);r.stroke()}r.restore();r.globalAlpha=o;for(let e=0;e<3;e++){const n=a*2.3+e*2.09,o=.75+.3*Math.sin(a*6+e);f(Math.cos(n)*21,Math.sin(n)*21*c,8*o,t)}};if(t==="phatTam"){h(32,"rgba(255,120,40,.7)");r.save();r.scale(1,c);r.rotate(a*.5);for(const[t,e,n,o,i]of[[6,25,0,"#fff2c0","#ff6a18"],[6,16,Math.PI/6,"#ffe6a0","#ff8a2a"]])for(let l=0;l<t;l++){r.save();r.rotate(n+l*s/t);const c=e+2.5*Math.sin(a*4+l),h=r.createLinearGradient(0,0,c,0);h.addColorStop(0,o);h.addColorStop(.55,i);h.addColorStop(1,"rgba(220,60,10,.15)");r.fillStyle=h;r.beginPath();r.moveTo(3,0);r.quadraticCurveTo(c*.5,-c*.3,c,0);r.quadraticCurveTo(c*.5,c*.3,3,0);r.fill();r.strokeStyle="rgba(180,40,0,.55)";r.lineWidth=.8;r.stroke();r.restore()}r.restore();f(0,0,10,"rgba(255,170,80,.9)");for(let t=0;t<4;t++){const e=a*1.6+t*1.57,n=(a*1.3+t*.25)%1;f(Math.cos(e)*14*(.4+n),-n*18+Math.sin(e)*5,3.5*(1-n)+.6,"rgba(255,150,60,.9)")}}else if(t==="luuThuy")d("#fff4e8","#ff3a18","rgba(255,70,30,.6)");else if(t==="mongDiep")d("#f0f0ff","#4a3aff","rgba(80,70,255,.6)");else if(t==="phanXuong"){const t=18;for(let e=0;e<t;e++){const n=a*2.4-e*.11,i=e/t,c=22,s=Math.sin(n),h=Math.cos(n)*c+Math.sin(e*7.3)*2.5,d=-26+s*c*.5+Math.cos(e*5.1)*2.5;const g=l==="back"?s<0?1:0:l==="front"?s>=0?Math.pow(Math.abs(Math.cos(n)),2):0:1;if(g<=.02)continue;r.globalAlpha=o*g*(1-i*.8);r.fillStyle="#3a8aff";r.fillRect(h-2.2,d-2.2,4.4,4.4);f(h,d,5,"rgba(90,170,255,.9)");r.fillStyle="#e8f6ff";r.fillRect(h-1.1,d-1.1,2.2,2.2)}r.globalAlpha=o;if(l!=="front")h(20,"rgba(60,140,255,.45)",-26)}else if(t==="phoDo"){h(42,"rgba(120,80,255,.6)");r.save();r.scale(1,c*1.15);const t=(t,e,n,a,o)=>{r.save();r.rotate(n);const i=r.createRadialGradient(0,0,0,0,0,t);i.addColorStop(0,`rgba(255,255,255,${a})`);i.addColorStop(.3,`rgba(200,180,255,${a})`);i.addColorStop(.75,o);i.addColorStop(1,"rgba(80,40,220,0)");r.fillStyle=i;r.beginPath();for(let n=0;n<8;n++){const a=n*Math.PI/4,o=n%2?e:t;n?r.lineTo(Math.cos(a)*o,Math.sin(a)*o):r.moveTo(Math.cos(a)*o,Math.sin(a)*o)}r.closePath();r.fill();r.strokeStyle="rgba(90,50,230,.7)";r.lineWidth=1;r.stroke();r.restore()};t(48+3*Math.sin(a*4),8,a*.9,1,"rgba(120,80,255,.9)");t(29,5,a*.9+Math.PI/4,.7,"rgba(140,100,255,.7)");r.strokeStyle="rgba(160,130,255,.85)";r.lineWidth=1.4;r.setLineDash([3,4]);r.lineDashOffset=-a*20;r.beginPath();r.arc(0,0,17,0,s);r.stroke();r.setLineDash([]);r.restore();f(0,0,9,"rgba(190,160,255,.95)")}r.restore()}const NM_AURA={"Thanh Âm Phạn Xướng":["phanXuong"],"Phật Tâm Từ Hữu":["phatTam"],"Phổ Độ Chúng Sinh":["phoDo"],"Lưu Thủy":["luuThuy"],"Mộng Điệp":["mongDiep"],"Bế Nguyệt Phất Trần":["mongDiep","phoDo"]};function nmFeet(t,e,n){let a=false;const o=new Set;for(const e in t){const n=ALL_SKILLS[e],a=t[e];if(!n||!(a.t>0)||!NM_AURA[n.name])continue;for(const t of NM_AURA[n.name])o.add(t)}for(const t of["luuThuy","phatTam","mongDiep","phoDo"])if(o.has(t)){nmFx(t,e,n,time+(t==="phoDo"?.37:0),1,1.4);a=true}return a||o.has("phanXuong")}function nmBuffFx(t,e,n){const a=ctx,o=Math.PI*2,i=.42,l=n<.15?n/.15:n>.75?Math.max(0,(1-n)/.25):1;if(l<=0)return;a.save();a.globalCompositeOperation="lighter";a.globalAlpha=l;a.translate(t,e);a.save();a.scale(1,i);const r=a.createRadialGradient(0,0,0,0,0,40);r.addColorStop(0,"rgba(170,200,255,.45)");r.addColorStop(1,"rgba(0,0,0,0)");a.fillStyle=r;a.beginPath();a.arc(0,0,40,0,o);a.fill();a.strokeStyle="rgba(220,235,255,.9)";a.lineWidth=1.6;a.setLineDash([2,3]);a.lineDashOffset=-n*40;a.beginPath();a.arc(0,0,16,0,o);a.stroke();a.setLineDash([]);a.lineWidth=1;a.beginPath();a.arc(0,0,20,0,o);a.stroke();for(let t=0;t<10;t++){const e=t/10*o+n*1.6,i=30;a.save();a.translate(Math.cos(e)*i,Math.sin(e)*i);a.rotate(e);a.fillStyle="rgba(235,245,255,.95)";a.fillRect(-2.5,-2.5,5,5);a.fillStyle="rgba(120,160,255,.8)";a.fillRect(-1,-1,2,2);a.restore()}a.restore();if(n>.25){const t=Math.min(1,(n-.25)/.35);for(let e=0;e<9;e++){const l=e/9*o+.3,r=Math.cos(l)*(10+e%3*7),c=Math.sin(l)*(10+e%3*7)*i,s=(38+e*37%30)*t*(.7+.3*Math.sin(n*20+e)),h=e%2?1.6:2.6;const f=a.createLinearGradient(0,c,0,c-s);f.addColorStop(0,"rgba(240,248,255,.95)");f.addColorStop(.5,"rgba(150,185,255,.7)");f.addColorStop(1,"rgba(100,130,255,0)");a.fillStyle=f;a.fillRect(r-h/2,c-s,h,s)}}a.restore()}function nmFeetIds(t,e,n){const a=new Set;for(const e of t||[]){const t=ALL_SKILLS[e];for(const e of t&&NM_AURA[t.name]||[])a.add(e)}for(const t of["luuThuy","phatTam","mongDiep","phoDo"])if(a.has(t))nmFx(t,e,n,time+(t==="phoDo"?.37:0),.85,1.3)}const myAuraIds=()=>Object.keys(player.buffs||{}).filter(t=>isAura(t)&&player.buffs[t].t>0&&!player.buffs[t].ally);function drawField(t,e,n){const a=16,o=t.hold,i=o?Math.min(1,(t.dur-t.t)/.5,t.t/.08):1-n;for(let l=0;l<a;l++){const r=l*2.39+(t.style==="fire"||t.style==="cloud"?t.t*2:0),c=l*37%a/a*t.r;const s=e.x+Math.cos(r)*c*TW/2,h=e.y+Math.sin(r)*c*TH/2;ctx.globalAlpha=i*.9;if(t.style==="fire"){const e=10+l*7%9+Math.sin(t.t*20+l)*3;const n=ctx.createRadialGradient(s,h-e/2,0,s,h-e/2,e);n.addColorStop(0,"#fff2a8");n.addColorStop(.4,t.color);n.addColorStop(1,"rgba(255,60,0,0)");ctx.fillStyle=n;ctx.beginPath();ctx.arc(s,h-e/2,e,0,7);ctx.fill()}else if(t.style==="cloud"){ctx.fillStyle=t.color;ctx.globalAlpha=i*.35;ctx.beginPath();ctx.arc(s,h-6-Math.sin(t.t*3+l)*3,9+l%3*3,0,7);ctx.fill()}else if(t.style==="ice"){const e=8+l%4*5;const a=o?Math.min(1,t.t*5)*(.9+.1*Math.sin(t.t*9+l)):Math.min(1,n*4);ctx.fillStyle=t.color;ctx.beginPath();ctx.moveTo(s-3,h);ctx.lineTo(s,h-e*a);ctx.lineTo(s+3,h);ctx.closePath();ctx.fill();ctx.strokeStyle="#fff";ctx.lineWidth=.8;ctx.stroke()}else if(t.style==="rocks"){const e=o?4+6*Math.abs(Math.sin(t.t*5+l*1.3)):Math.sin(Math.min(1,n*2)*Math.PI)*10;ctx.fillStyle=l%2?"#8a7a5a":"#a8946a";ctx.beginPath();ctx.moveTo(s-4,h-e);ctx.lineTo(s,h-6-e);ctx.lineTo(s+4,h-e);ctx.lineTo(s,h+2-e);ctx.closePath();ctx.fill()}else{const e=o?((t.t*1.8-l%5*.12)%1+1)%1:clamp(n*2.2-l%5*.12,0,1),a=h-60*(1-e);ctx.strokeStyle=t.color;ctx.fillStyle=t.color;ctx.lineWidth=2;if(t.style==="leaves"||t.style==="petals"){ctx.save();ctx.translate(s,a);ctx.rotate(l+t.t*6);ctx.fillStyle=t.style==="petals"?"#f7b8d8":t.color;ctx.beginPath();ctx.ellipse(0,0,5,2.2,0,0,7);ctx.fill();ctx.restore()}else{ctx.beginPath();ctx.moveTo(s,a-14);ctx.lineTo(s,a);ctx.stroke()}}}ctx.globalAlpha=i*.25;ctx.strokeStyle=t.color;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(e.x,e.y,t.r*TW/2,t.r*TH/2,0,0,7);ctx.stroke();ctx.globalAlpha=1}

function drawIceLotus(t,e,n){const a=ctx,o=t.sc||1,i=e.y-34*o,l=t.seed||0,r=t=>(Math.sin(t*91.7+l)*43758.5%1+1)%1,c=Math.min(1,n/.16),s=1-Math.pow(1-c,3),h=n<.26?0:n<.56?(n-.26)/.3:Math.max(0,1-(n-.56)/.2),f=lowFx();const d=t=>.4+.24*(1-(t+1)/2),g=t=>Math.max(0,Math.min(1,1-(n-d(t))/.13));if(n<.8){glow(e.x,i-4*o,(48+18*s)*o,"#6f72ff",(.2+.15*h)*Math.min(1,(.8-n)/.2));a.save();a.translate(e.x,i+4*o);const t=o*(.7+.3*s);a.scale(t*1.08,t*.84);const l=.3+.7*s;const r=(t,e,n,o,i,r,c)=>{const h=g(c);if(h<=.02)return;a.save();a.globalAlpha=h;a.translate(0,o);a.rotate(t*l);const f=e*(.8+.2*s)*(.85+.15*h);a.beginPath();a.moveTo(0,0);a.lineTo(-n,-f*.46);a.lineTo(0,-f);a.closePath();a.fillStyle=i;a.fill();a.beginPath();a.moveTo(0,0);a.lineTo(n,-f*.46);a.lineTo(0,-f);a.closePath();a.fillStyle=r;a.fill();a.strokeStyle="rgba(225,225,255,.4)";a.lineWidth=.8;a.beginPath();a.moveTo(-n,-f*.46);a.lineTo(0,-f);a.lineTo(n,-f*.46);a.stroke();a.restore()};const c="#aeb1f2",f="#7f83f0",d="#5357dc",u="#4044bd";r(-.4,34,13,0,f,d,-.3);r(.4,34,13,0,c,f,.3);r(0,37,14,0,c,f,0);r(-1.25,38,15,7,c,d,-1);r(1.25,38,15,7,f,u,1);r(-.66,34,15,6,c,f,-.65);r(.66,34,15,6,f,d,.65);const p=Math.min(g(-.4),1);if(p>.02){a.globalAlpha=p;a.beginPath();a.moveTo(-30,8);a.lineTo(-12,20);a.lineTo(12,20);a.lineTo(30,8);a.lineTo(0,13);a.closePath();a.fillStyle=u;a.fill();a.globalAlpha=1}r(-.3,28,16,14,"#c2c4f6",f,-.2);r(.3,28,16,14,c,d,.2);a.globalCompositeOperation="lighter";const m=Math.min(1,(.8-n)/.25),y=a.createRadialGradient(0,-8,0,0,-8,34);y.addColorStop(0,`rgba(235,235,255,${(.12+.35*h)*m})`);y.addColorStop(.5,`rgba(210,210,255,${.15*h*m})`);y.addColorStop(1,"rgba(160,160,255,0)");a.fillStyle=y;a.beginPath();a.arc(0,-8,34,0,7);a.fill();a.restore()}if(n>.3){const t=f?36:110;a.save();a.globalCompositeOperation="lighter";if(!f&&n>.5){const t=Math.min(1,(n-.5)/.12)*Math.max(0,1-(n-.62)/.38);for(let a=0;a<4;a++){glow(e.x+(r(a+200)-.5)*40*o,i+(r(a+300)-.4)*24*o-(n-.5)*14*o,(20+r(a+400)*14)*o,"#6f72ff",.13*t)}}for(let l=0;l<t;l++){const t=r(l),c=r(l+500),s=r(l+900),h=(t-.5)*2,f=d(h)-.06+s*.12,g=(n-f)/(.34+c*.14);if(g<=0||g>=1)continue;const u=e.x+h*34*o*(1+.15*g)+(s-.5)*8*o*g,p=i-(c*30-12)*o-g*(3+s*8)*o;a.globalAlpha=.65*Math.min(1,g*5)*(1-g)*(.5+.5*Math.abs(Math.sin(l*1.7+n*24)));a.fillStyle=l%5?"#9fa2ff":"#dcdcff";a.beginPath();a.arc(u,p,(.8+l%3*.55)*o,0,7);a.fill()}a.restore()}}

const hexRgb=t=>{t=String(t||"#ffffff").replace("#","");if(t.length===3)t=t.split("").map(t=>t+t).join("");const e=parseInt(t.slice(0,6),16)||16777215;return`${e>>16&255},${e>>8&255},${e&255}`};

function mixCol(t,e,n){const a=t=>{t=t.replace("#","");if(t.length===3)t=t.split("").map(t=>t+t).join("");return[0,2,4].map(e=>parseInt(t.slice(e,e+2),16))},o=a(t),i=a(e);return"#"+o.map((t,e)=>Math.round(t+(i[e]-t)*n).toString(16).padStart(2,"0")).join("")}

const PUFF_SPR = {};

function charmPaper(t,e,n,a,o,i){const l=ctx;l.save();l.translate(t,e);l.rotate(n);l.scale(a,a);l.globalAlpha=i==null?1:i;l.shadowColor=o;l.shadowBlur=8;l.fillStyle="#f6e7a8";l.fillRect(-4,-9,8,18);l.shadowBlur=0;l.strokeStyle=o;l.lineWidth=1.2;l.strokeRect(-4,-9,8,18);l.strokeStyle="#c8201a";l.lineWidth=1.1;l.beginPath();l.moveTo(0,-7);l.quadraticCurveTo(3,-4,0,-2);l.quadraticCurveTo(-3,0,0,2);l.quadraticCurveTo(3,4,0,7);l.moveTo(-2.4,-5.5);l.lineTo(2.4,-5.5);l.stroke();l.fillStyle="#c8201a";l.beginPath();l.arc(0,0,1.1,0,7);l.fill();l.restore()}

function puffSprite(t){let e=PUFF_SPR[t];if(e)return e;const n=96;e=document.createElement("canvas");e.width=e.height=n;const a=e.getContext("2d"),o=a.createImageData(n,n),i=mulberry32(t.length*97+t.charCodeAt(2));const l=[];for(let t=0;t<4;t++){const e=4<<t,n=[];for(let t=0;t<(e+1)*(e+1);t++)n.push(i());l.push({n:e,a:n})}const r=(t,e,n)=>{const a=e*t.n,o=n*t.n,i=Math.floor(a),l=Math.floor(o),r=a-i,c=o-l,s=r*r*(3-2*r),h=c*c*(3-2*c),f=t.a,d=t.n+1,g=(e,n)=>f[Math.min(t.n,n)*d+Math.min(t.n,e)];return(g(i,l)*(1-s)+g(i+1,l)*s)*(1-h)+(g(i,l+1)*(1-s)+g(i+1,l+1)*s)*h};const c=parseInt(t.slice(1,3),16),s=parseInt(t.slice(3,5),16),h=parseInt(t.slice(5,7),16);for(let t=0;t<n;t++)for(let e=0;e<n;e++){const a=e/n,i=t/n,f=Math.hypot(a-.5,i-.5)*2;let d=0,g=.5;for(const t of l){d+=r(t,a,i)*g;g*=.5}d/=.9375;const u=Math.max(0,1-f),p=Math.max(0,Math.min(1,Math.pow(u,.9)*(.75+1.8*(d-.45)))),m=.78+.4*d,y=(t*n+e)*4;o.data[y]=Math.min(255,c*m);o.data[y+1]=Math.min(255,s*m);o.data[y+2]=Math.min(255,h*m);o.data[y+3]=p*255}a.putImageData(o,0,0);return PUFF_SPR[t]=e}

function drawGaleFunnel(t,e,n,a,o,i,l=1){const r=ctx,c=puffSprite("#f8e6b4"),s=puffSprite("#dcb468"),h=puffSprite("#9a8458"),f=puffSprite("#fffaf0"),d=16;r.save();r.globalAlpha=.35*i;r.drawImage(s,t-a*.7,e-a*.28,a*1.4,a*.56);const g=[];for(let i=0;i<d;i++){const r=i/(d-1),c=a*(.16+.84*Math.pow(r,1.15)),s=Math.sin(o*2.2+r*4)*a*.16*r,h=o*7*l+r*9;g.push({u:r,rr:c,sw:s,a:h,cx:t+s,cy:e-r*n})}for(const t of[1,0])for(const e of g){for(let n=0;n<2;n++){const a=e.a+n*Math.PI,l=Math.sin(a);if(l<0!==!!t)continue;const f=e.cx+Math.cos(a)*e.rr*.85,d=e.cy+l*e.rr*.3,g=e.rr*(.72+.18*Math.sin(o*3+e.u*7+n));r.globalAlpha=Math.min(1,i*(t?.7:1)*(.7+.5*(1-e.u*.6)));r.drawImage((e.u*13+n)%4<1?h:n?c:s,f-g,d-g*.75,g*2,g*1.5)}}r.globalCompositeOperation="lighter";for(let l=0;l<5;l++){const c=.15+l*.18,s=a*(.3+.5*c);r.globalAlpha=.22*i;r.drawImage(f,t+Math.sin(o*2.2+c*4)*a*.16*c-s,e-c*n-s*.6,s*2,s*1.2)}r.globalCompositeOperation="source-over";r.lineCap="round";for(let t=0;t<18;t++){const e=t/17,n=g[Math.round(e*(d-1))],a=o*8*l+e*6;r.globalAlpha=i*(.22+.3*(1-e));r.strokeStyle=t%3===0?"#fffaf0":"#ecd8a4";r.lineWidth=1.6-e*.7;r.beginPath();r.ellipse(n.cx,n.cy,n.rr*.95,n.rr*.3,0,a,a+Math.PI*1.25);r.stroke()}r.restore();glow(t,e-n*.45,a*1.1,"#ffe2a0",.22*i)}

function drawTongue(t,e,n){const a=t.ws,o=t.color,i=1-n,l=ease(Math.min(1,n*5)),r=-Math.cos(t.ang)*10,c=mulberry32(t.seed*1e6|0),s=t.sz||1;switch(a){case"fire":{const a=(34+c()*22)*s*l*(1-n*.5);for(let n=0;n<6;n++){const o=n/5,l=e.x+r*o*1.6+Math.sin(time*18+n+t.seed*9)*2*o,c=e.y-a*o;glow(l,c,(15-n*1.8)*s,n<2?"#ff5a1e":n<4?"#ff9a3c":"#ffe08a",i*(1-o*.3))}lighter(()=>{ctx.globalAlpha=i*.85;const t=ctx.createLinearGradient(0,e.y,0,e.y-a);t.addColorStop(0,"#ffb347");t.addColorStop(.6,"#ffe08a");t.addColorStop(1,"rgba(255,240,180,0)");ctx.fillStyle=t;ctx.beginPath();ctx.moveTo(e.x-8*s,e.y);ctx.quadraticCurveTo(e.x-6*s+r*.5,e.y-a*.5,e.x+r*1.6,e.y-a);ctx.quadraticCurveTo(e.x+5*s+r*.4,e.y-a*.45,e.x+8*s,e.y);ctx.closePath();ctx.fill()});break}case"sword":{const t=48*s*l;lighter(()=>{ctx.globalAlpha=i;const n=ctx.createLinearGradient(0,e.y,0,e.y-t);n.addColorStop(0,"#ffffff");n.addColorStop(1,hexA(o,0));ctx.fillStyle=n;ctx.beginPath();ctx.moveTo(e.x-4,e.y);ctx.lineTo(e.x,e.y-t);ctx.lineTo(e.x+4,e.y);ctx.closePath();ctx.fill();ctx.strokeStyle=o;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(e.x-16,e.y+2);ctx.lineTo(e.x+16,e.y-2);ctx.stroke()});glow(e.x,e.y-10,18,o,i*.6);break}case"ice":{const t=3;for(let a=0;a<t;a++){const t=(c()-.5)*18,a=(22+c()*26)*s*l*(n>.7?1-(n-.7)/.3:1),o=4+c()*3;const i=ctx.createLinearGradient(0,e.y-a,0,e.y);i.addColorStop(0,"#ffffff");i.addColorStop(1,"rgba(150,210,255,.85)");ctx.fillStyle=i;ctx.globalAlpha=1;ctx.beginPath();ctx.moveTo(e.x+t-o,e.y);ctx.lineTo(e.x+t,e.y-a);ctx.lineTo(e.x+t+o,e.y);ctx.closePath();ctx.fill();ctx.strokeStyle="rgba(255,255,255,.8)";ctx.lineWidth=.8;ctx.stroke()}glow(e.x,e.y-8,20,o,i*.5);break}case"poison":{ctx.globalAlpha=.35*i;ctx.fillStyle="#6fcf4a";ctx.beginPath();ctx.ellipse(e.x,e.y-6,18*l,9*l,0,0,7);ctx.fill();ctx.globalAlpha=1;for(let n=0;n<3;n++){const a=e.y-8-(time*40+n*13+t.seed*50)%30;ctx.globalAlpha=i;ctx.strokeStyle="#b8f08a";ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(e.x+(n-1)*8,a,2.5,0,7);ctx.stroke()}ctx.globalAlpha=1;glow(e.x,e.y-6,20,o,i*.5);break}case"petal":for(let n=0;n<5;n++){const a=time*6+n*1.26+t.seed*9,o=14*l;ctx.save();ctx.globalAlpha=i;ctx.translate(e.x+Math.cos(a)*o,e.y-14-n*5+Math.sin(a)*o*.4);ctx.rotate(a);ctx.fillStyle=n%2?"#f7b8d8":"#ffe6f2";ctx.beginPath();ctx.ellipse(0,0,5,2.3,0,0,7);ctx.fill();ctx.restore()}glow(e.x,e.y-16,18,o,i*.5);break;case"gold":{glow(e.x,e.y-20,26*l,o,i);lighter(()=>{ctx.globalAlpha=i;ctx.strokeStyle="#fff6c8";ctx.lineWidth=2.5;ctx.beginPath();ctx.ellipse(e.x,e.y,8+16*n,4+7*n,0,0,7);ctx.stroke();ctx.fillStyle=hexA(o,.5);ctx.fillRect(e.x-5,e.y-50*l,10,50*l)});break}case"spear":lighter(()=>{ctx.globalAlpha=i;ctx.strokeStyle="#ffd24a";ctx.lineWidth=6*(1-n)+1;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(e.x-Math.cos(t.ang)*14,e.y-Math.sin(t.ang)*7);ctx.lineTo(e.x+Math.cos(t.ang)*14,e.y+Math.sin(t.ang)*7);ctx.stroke()});glow(e.x,e.y-6,16,o,i*.6);break;case"blade":crescent(e.x,e.y-18,20,-Math.PI/2+(Math.cos(t.ang)<0?.4:-.4),-2.2,.2,o,i,1);glow(e.x,e.y-8,16,"#bfe6ff",i*.6);break;case"orb":lighter(()=>{ctx.globalAlpha=i*.8;ctx.strokeStyle=o;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(e.x,e.y,6+18*n,3+8*n,0,0,7);ctx.stroke();ctx.globalAlpha=i*.35;ctx.fillStyle=o;ctx.beginPath();ctx.ellipse(e.x,e.y,10*l,5*l,0,0,7);ctx.fill()});glow(e.x,e.y-8,14,o,i*.5);break;case"arrow":lighter(()=>{ctx.globalAlpha=i;ctx.strokeStyle="#e0f4ff";ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(e.x,e.y-28,4+8*n,12+8*n,t.ang,0,7);ctx.stroke()});break}ctx.globalAlpha=1}

function nameTag(t,e,n,a,o,i){if(i){ctx.save();ctx.font='800 14px "Noto Serif", Georgia, serif';ctx.textAlign="left";ctx.lineJoin="round";ctx.miterLimit=2;ctx.lineWidth=5;ctx.strokeStyle="#000";const o="[GM] ",i=ctx.measureText(o).width,l=i+ctx.measureText(n).width,r=t-l/2;ctx.strokeText(o,r,e);ctx.strokeText(n,r+i,e);ctx.fillStyle="#ffdb52";ctx.fillText(o,r,e);ctx.fillStyle=mixCol(a,"#ff7bff",.5);ctx.fillText(n,r+i,e);ctx.restore();ctx.textAlign="center"}else{ctx.font='600 12px "Noto Serif", Georgia, serif';ctx.textAlign="center";ctx.lineWidth=3;ctx.strokeStyle="rgba(0,0,0,.85)";ctx.strokeText(n,t,e);ctx.fillStyle=a;ctx.fillText(n,t,e)}if(o){ctx.save();ctx.globalAlpha=1;ctx.globalCompositeOperation="source-over";ctx.filter="none";ctx.shadowBlur=0;ctx.font='11px "Noto Serif", Georgia, serif';ctx.textAlign="center";ctx.lineJoin="round";ctx.lineWidth=3;ctx.strokeStyle="rgba(0,0,0,.85)";ctx.strokeText(o,t,e-13);ctx.fillStyle="#f0c060";ctx.fillText(o,t,e-13);ctx.restore()}}

function drawFx(t,e,n){const a=(t.r||1)*TW/2,o=(t.r||1)*TH/2,i=t.color||"#ffffff",l=1-Math.max(0,(n-.7)/.3);switch(t.type){case"nmbuff":nmBuffFx(e.x,e.y,n);break;case"icelotus":{const a=t.tgt;drawIceLotus(t,a&&!a.dead?scr(a.x,a.y):e,n);break}case"tdvc":{const i=mulberry32(t.seed),l=a*.55,r=o*.55,c=n<.08?n/.08:n>.86?1-(n-.86)/.14:1,s=n*.9;ctx.save();const h=(t,e,n,a)=>{const o=mulberry32(a);for(let a=0;a<3;a++){const i=o()<.5,l=(2+o()*4)*n,r=(o()-.5)*4*n,c=(a-1)*3*n;ctx.beginPath();if(i){ctx.moveTo(t+r-l/2,e+c);ctx.lineTo(t+r+l/2,e+c)}else{ctx.moveTo(t+r,e+c-l/2);ctx.lineTo(t+r,e+c+l/2)}ctx.stroke()}};ctx.globalAlpha=c;{const t=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,l);t.addColorStop(0,"rgba(255,250,220,.55)");t.addColorStop(.6,"rgba(255,240,180,.22)");t.addColorStop(1,"rgba(255,230,150,0)");ctx.fillStyle=t;ctx.beginPath();ctx.ellipse(e.x,e.y,l,r,0,0,7);ctx.fill()}ctx.lineWidth=1.5;ctx.strokeStyle="rgba(255,246,200,.95)";ctx.beginPath();ctx.ellipse(e.x,e.y,l,r,0,0,7);ctx.stroke();ctx.lineWidth=1;ctx.strokeStyle="rgba(255,240,190,.7)";ctx.beginPath();ctx.ellipse(e.x,e.y,l*.62,r*.62,0,0,7);ctx.stroke();ctx.lineWidth=1;ctx.strokeStyle="rgba(255,252,225,.9)";for(let n=0;n<8;n++){const a=n*Math.PI/4+s,o=e.x+Math.cos(a)*l*.8,i=e.y+Math.sin(a)*r*.8;h(o,i,.7,t.seed+n)}ctx.fillStyle="rgba(255,255,240,.95)";ctx.beginPath();ctx.ellipse(e.x,e.y,l*.12,r*.12,0,0,7);ctx.fill();{const a=n>.3?Math.min(1,(n-.3)/.6):0,o=c*(1-a*.85);ctx.globalAlpha=o;ctx.strokeStyle="rgba(255,248,205,.9)";ctx.lineWidth=1;for(let n=0;n<10;n++){const o=Math.PI+(n+.5)*Math.PI/10-s*.5,i=e.x+Math.cos(o)*l*1.05,c=e.y+Math.sin(o)*r*1.05-a*60;for(let e=0;e<3;e++){const a=c-8-e*11-n%2*4;h(i,a,.9,t.seed*3+n*7+e)}}}for(const t of[.08,.36]){const i=(n-t)/.24;if(i>0&&i<1){const t=l+(a*1.5-l)*i;ctx.globalAlpha=(1-i)*.95;ctx.lineWidth=2-i;ctx.strokeStyle="#fffbe0";ctx.beginPath();ctx.ellipse(e.x,e.y,t,t*o/a,0,0,7);ctx.stroke()}}if(n>.26){const t=(n-.26)/.74;ctx.globalCompositeOperation="lighter";for(let n=0;n<11;n++){const n=i()*6.283,a=.25+i()*.75,o=Math.round(e.x+Math.cos(n)*l*1.1*a)+.5,c=e.y+Math.sin(n)*r*1.1*a,s=i()*.28,h=Math.min(1,Math.max(0,t-s)/.22),f=(130+i()*110)*h,d=i()<.35?2:1,g=t>.68?(1-t)/.32:1;if(f<2)continue;const u=ctx.createLinearGradient(0,c,0,c-f);u.addColorStop(0,"rgba(255,255,235,1)");u.addColorStop(.55,"rgba(255,246,195,.75)");u.addColorStop(1,"rgba(255,246,195,0)");ctx.globalAlpha=g;ctx.fillStyle=u;ctx.fillRect(o-d/2,c-f,d,f);if(d>1){ctx.globalAlpha=g*.3;ctx.fillRect(o-2.5,c-f*.8,5,f*.8)}}ctx.globalCompositeOperation="source-over"}ctx.restore();break}case"nmfx":nmFx(t.key,e.x,e.y,t.t,1-Math.max(0,(n-.8)/.2),t.sc||1.4);break;case"charmfly":{const a=t.tg,o=a?scr(a.x,a.y):e,i=e.x+(o.x-e.x)*n,l=e.y-34+(o.y-30-(e.y-34))*n-Math.sin(n*Math.PI)*22;for(let a=1;a<=3;a++){const i=Math.max(0,n-a*.07);charmPaper(e.x+(o.x-e.x)*i,e.y-34+(o.y-30-(e.y-34))*i-Math.sin(i*Math.PI)*22,time*14-a,1,t.color,.25/a)}charmPaper(i,l,time*14,1.4,t.color,1);break}case"charmhit":{const a=1-n,o=(t.self?16:10)+n*26;ctx.save();ctx.globalAlpha=a*.8;ctx.strokeStyle=t.color;ctx.lineWidth=2;ctx.shadowColor=t.color;ctx.shadowBlur=8;ctx.beginPath();ctx.ellipse(e.x,e.y-2,o,o*.42,0,0,7);ctx.stroke();ctx.restore();const i=t.self?6:4;for(let o=0;o<i;o++){const l=o/i*6.283+n*4,r=8+n*(t.self?30:20);charmPaper(e.x+Math.cos(l)*r,e.y-24-n*16+Math.sin(l)*r*.45,l+n*6,.85,t.color,a)}break}case"nhgold":{const a=t.seed||1,o=t=>{const e=Math.sin(a*97.3+t*41.7)*43758.5;return e-Math.floor(e)},i=t.big?1.2:1,l=e.x,r=e.y-20*i,c=n*t.dur,s=t.big?10:8;ctx.save();if(c<1.2){const t=c/1.2,e=t<.12?t/.12:1,n=t<.78?1:(1-t)/.22,a=26*i*e;const s=ctx.createRadialGradient(l,r,0,l,r,a*1.5);s.addColorStop(0,`rgba(255,240,170,${n})`);s.addColorStop(.35,`rgba(255,200,40,${n})`);s.addColorStop(.7,`rgba(232,140,10,${n*.85})`);s.addColorStop(1,"rgba(200,100,0,0)");ctx.fillStyle=s;ctx.beginPath();ctx.arc(l,r,a*1.5,0,7);ctx.fill();for(let t=0;t<12;t++){const e=t/12*6.283+time*1.5+o(t)*.8,c=.75+.35*Math.sin(time*18+t*2.1),s=a*(.85+.25*o(t+3)),h=l+Math.cos(e)*s,f=r+Math.sin(e)*s*.85-c*4*i,d=(7+5*o(t+5))*i*c;const g=ctx.createRadialGradient(h,f,0,h,f,d);g.addColorStop(0,`rgba(255,214,60,${n*.95})`);g.addColorStop(1,"rgba(240,150,10,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(h,f,d,0,7);ctx.fill()}ctx.globalAlpha=n*.9;ctx.strokeStyle="#ffcf3a";ctx.lineWidth=1.6;ctx.beginPath();ctx.ellipse(l,r,a*1.12,a*1.12,0,0,7);ctx.stroke();ctx.globalAlpha=1}const h=(t,e,n,a)=>{ctx.globalAlpha=n;if(a>0){const n=t*(.6+1.2*a),o=ctx.createLinearGradient(-t*.45-n,0,-t*.1,0);o.addColorStop(0,"rgba(240,130,10,0)");o.addColorStop(1,"rgba(255,200,50,.55)");ctx.fillStyle=o;ctx.beginPath();ctx.moveTo(-t*.1,-e*.3);ctx.lineTo(-t*.45-n,0);ctx.lineTo(-t*.1,e*.3);ctx.closePath();ctx.fill()}const o=Math.sin(time*20+t)*e*.25;ctx.fillStyle="#d0261c";ctx.beginPath();ctx.moveTo(-t*.5,0);ctx.quadraticCurveTo(-t*.68,-e*.5+o,-t*.88,-e*.15+o);ctx.quadraticCurveTo(-t*.7,e*.05,-t*.5,0);ctx.moveTo(-t*.5,0);ctx.quadraticCurveTo(-t*.66,e*.45-o,-t*.84,e*.3-o);ctx.quadraticCurveTo(-t*.68,e*.1,-t*.5,0);ctx.fill();ctx.strokeStyle="#e8b030";ctx.lineWidth=Math.max(1,e*.13);ctx.beginPath();ctx.arc(-t*.47,0,e*.2,0,7);ctx.stroke();ctx.fillStyle="#7a3010";ctx.fillRect(-t*.43,-e*.17,t*.3,e*.34);ctx.strokeStyle="rgba(255,210,90,.75)";ctx.lineWidth=.8;ctx.beginPath();for(let n=1;n<5;n++){const a=-t*.43+t*.06*n;ctx.moveTo(a,-e*.17);ctx.lineTo(a-t*.025,e*.17)}ctx.stroke();ctx.fillStyle="#c8860c";ctx.beginPath();ctx.moveTo(-t*.08,-e*.5);ctx.lineTo(-t*.13,-e*.42);ctx.lineTo(-t*.13,e*.42);ctx.lineTo(-t*.08,e*.5);ctx.lineTo(-t*.05,0);ctx.closePath();ctx.fill();ctx.shadowColor="rgba(255,190,40,.95)";ctx.shadowBlur=9*i;const l=ctx.createLinearGradient(0,-e*.4,0,e*.4);l.addColorStop(0,"#ffe680");l.addColorStop(.5,"#ffb820");l.addColorStop(1,"#d88a08");ctx.fillStyle=l;ctx.beginPath();ctx.moveTo(t*.5,0);ctx.quadraticCurveTo(t*.18,-e*.42,-t*.07,-e*.3);ctx.lineTo(-t*.07,e*.3);ctx.quadraticCurveTo(t*.18,e*.42,t*.5,0);ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle="rgba(255,252,220,.95)";ctx.lineWidth=Math.max(1,e*.1);ctx.beginPath();ctx.moveTo(t*.44,0);ctx.lineTo(-t*.05,0);ctx.stroke()};for(let t=0;t<s;t++){const e=.06+t*.055,n=(c-e)/.3;if(n<0)continue;const a=t%3!==2,f=a?-Math.PI/2+(o(t)-.5)*1.5:t/s*6.283+o(t)*.6,d=(14+o(t+11)*8)*i,g=Math.max(d,(170+o(t+7)*60)*i*(1-Math.min(1,n))+d);const u=l+Math.cos(f)*g,p=r+Math.sin(f)*g*.62,m=Math.atan2(r-p,l-u),y=n>1?c-e-.3:0,T=y>.55?Math.max(0,1-(y-.55)/.3):1;if(T<=0)continue;ctx.save();ctx.translate(u,p);ctx.rotate(m);h(50*i,15*i,T,n<1?1-n*.6:0);ctx.restore()}if(c>.8){const t=Math.min(1,(c-.8)/.8),n=e.y-2,a=t<.6?1:(1-t)/.4;ctx.globalAlpha=a*.85;ctx.strokeStyle="#5a3a10";ctx.lineWidth=1.6;ctx.beginPath();for(let e=0;e<7;e++){let a=e/7*6.283+o(e+40)*.6,r=l,c=n;ctx.moveTo(r,c);const s=(26+o(e+50)*22)*i*Math.min(1,t*2.5);for(let t=1;t<=4;t++){a+=(o(e*7+t)-.5)*.9;const i=s*t/4;r=l+Math.cos(a)*i;c=n+Math.sin(a)*i*.45;ctx.lineTo(r,c)}}ctx.stroke();ctx.globalAlpha=a*.5;ctx.strokeStyle="#f0b830";ctx.lineWidth=.8;ctx.stroke();for(let e=0;e<2;e++){const a=t-e*.22;if(a<=0)continue;const o=(18+a*55)*i;ctx.globalAlpha=Math.max(0,1-a)*.9;ctx.strokeStyle=e?"#c88a10":"#e0a018";ctx.lineWidth=Math.max(1.4,3.4*(1-a));ctx.beginPath();ctx.ellipse(l,n,o,o*.42,0,0,7);ctx.stroke()}}ctx.restore();ctx.globalAlpha=1;break}case"sawspin":{const t=n*Math.PI*9,a=1+.3*Math.min(1,n*5),o=n<.15?n/.15:l;ctx.save();ctx.translate(e.x,e.y-6);ctx.scale(1,.62);ctx.rotate(t);ctx.globalAlpha=o;ctx.globalCompositeOperation="lighter";glow(0,0,34*a,"#fff6d8",.6);ctx.fillStyle="#fffbe8";ctx.strokeStyle="rgba(255,236,170,.9)";ctx.lineWidth=1.2;for(let t=0;t<5;t++){ctx.save();ctx.rotate(t*Math.PI*2/5);ctx.beginPath();ctx.moveTo(4*a,-2*a);ctx.quadraticCurveTo(20*a,-6*a,30*a,-16*a);ctx.quadraticCurveTo(20*a,0,5*a,5*a);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()}ctx.fillStyle="#ffffff";ctx.beginPath();ctx.arc(0,0,3.4*a,0,7);ctx.fill();ctx.restore();break}case"swordfall":{const a=.6/t.dur;for(const o of t.items||[]){const i=t.follow?{x:e.x+(o.dx-o.dy)*TW/2,y:e.y+(o.dx+o.dy)*TH/2}:scr(t.x+o.dx,t.y+o.dy),l=(n-o.delay)/a;if(l>=0&&l<1)drawSwordFall(i.x,i.y,o.seed,l)}break}case"thunder9":{const o=Math.min(1,n*6)*l;ctx.globalAlpha=o*.22;ctx.fillStyle="#1a1a26";ctx.beginPath();ctx.ellipse(e.x,e.y-300,a*1.2,34,0,0,7);ctx.fill();ctx.globalAlpha=1;glow(e.x,e.y-300,a,"#8a8a70",o*.3);const i=.66/t.dur;for(const a of t.items||[]){const o=t.follow?{x:e.x+(a.dx-a.dy)*TW/2,y:e.y+(a.dx+a.dy)*TH/2}:scr(t.x+a.dx,t.y+a.dy),l=(n-a.delay)/i;if(l>=0&&l<1)drawBolt9(o.x,o.y,a.seed,l)}break}case"thunder":{const o=Math.min(1,n*6)*l;ctx.globalAlpha=o*.25;ctx.fillStyle="#2a2040";ctx.beginPath();ctx.ellipse(e.x,e.y-250,a*1.1,30,0,0,7);ctx.fill();ctx.globalAlpha=1;glow(e.x,e.y-250,a,"#6a5aa0",o*.4);for(const a of t.items||[]){const o=t.follow?{x:e.x+(a.dx-a.dy)*TW/2,y:e.y+(a.dx+a.dy)*TH/2}:scr(t.x+a.dx,t.y+a.dy),l=n-a.delay;if(l>=0&&l<.09)drawBolt(o.x,o.y,a.seed,1-l/.09*.4,i);else if(l>=.09&&l<.3){const t=1-(l-.09)/.21;glow(o.x,o.y-4,20,i,t*.6)}}break}case"taichi":{const t=Math.min(1,n*5),o=l;ctx.save();ctx.translate(e.x,e.y);ctx.scale(1,.5);ctx.rotate(time*3);const r=a*.9*t;ctx.globalAlpha=o*.55;ctx.fillStyle="rgba(255,255,255,.85)";ctx.beginPath();ctx.arc(0,0,r,-Math.PI/2,Math.PI/2);ctx.arc(0,r/2,r/2,Math.PI/2,-Math.PI/2,true);ctx.arc(0,-r/2,r/2,Math.PI/2,-Math.PI/2);ctx.fill();ctx.fillStyle="rgba(30,40,70,.75)";ctx.beginPath();ctx.arc(0,0,r,Math.PI/2,Math.PI*1.5);ctx.arc(0,-r/2,r/2,-Math.PI/2,Math.PI/2,true);ctx.arc(0,r/2,r/2,-Math.PI/2,Math.PI/2);ctx.fill();ctx.globalAlpha=o;ctx.strokeStyle=i;ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.stroke();ctx.restore();ctx.save();ctx.globalCompositeOperation="lighter";for(let n=0;n<7;n++){const l=(time*1.1+n/7)%1,r=e.y-l*(90+a*.5),c=a*(.85-l*.45)*t,s=time*6+n;ctx.globalAlpha=o*(1-l)*.9;ctx.strokeStyle=n%2?"#ffffff":i;ctx.lineWidth=3-l*2;ctx.beginPath();ctx.ellipse(e.x,r,c,c*.32,0,s,s+Math.PI*1.3);ctx.stroke()}ctx.restore();ctx.globalAlpha=1;glow(e.x,e.y-40,a*.7,i,o*.4);break}case"crescent":{const a=ease(Math.min(1,n/.45)),o=n<.45?1:1-(n-.45)/.55,l=46*(t.sz||1),r=2.4,c=-r/2,s=c+r*a;ctx.save();ctx.translate(e.x,e.y-26);ctx.rotate(t.rot||0);ctx.scale(1,.55);ctx.globalCompositeOperation="lighter";for(const[t,e,n]of[[18,.18,i],[9,.45,i],[3.2,.95,"#ffffff"]]){ctx.globalAlpha=o*e;ctx.strokeStyle=n;const a=18;for(let e=0;e<a;e++){const n=e/a,o=(e+1)/a,i=c+(s-c)*n,r=c+(s-c)*o,h=Math.sin(Math.PI*(n+o)/2);ctx.lineWidth=Math.max(.6,t*h);ctx.beginPath();ctx.arc(0,0,l,i,r);ctx.stroke()}}ctx.restore();ctx.globalAlpha=1;break}case"orbit":{const a=ease(Math.min(1,n/.3)),o=n<.5?1:1-(n-.5)/.5,l=(30+30*a)*(t.sz||1),r=time*3+n*2;ctx.save();ctx.translate(e.x,e.y-24);ctx.globalCompositeOperation="lighter";for(let t=0;t<3;t++){ctx.save();ctx.rotate(r*.3+t*Math.PI/3);for(const[t,e,n]of[[8,.18,i],[2.4,.8,i],[1,.9,"#ffffff"]]){ctx.globalAlpha=o*e;ctx.strokeStyle=n;ctx.lineWidth=t;ctx.beginPath();ctx.ellipse(0,0,l,l*.32,0,0,7);ctx.stroke()}const e=r*2+t*2.1,n=Math.cos(e)*l,a=Math.sin(e)*l*.32;ctx.globalAlpha=o;glow(n,a,9,"#ffffff",.9);ctx.restore()}ctx.globalAlpha=o;glow(0,0,18+14*(1-n),i,.8);glow(0,0,8,"#ffffff",1);ctx.restore();ctx.globalAlpha=1;break}case"lavacrack":{if(!t.cr){let e=t.seed>>>0;const n=()=>(e=e*1664525+1013904223>>>0)/4294967296,a=(t.r||2.3)*TW*.55,o=[];const i=(t,e,a,l,r,c,s)=>{const h=c?6:11;let f=t,d=e,g=a,u=s;const p=[[t,e,r,u]];for(let t=1;t<=h;t++){g+=(n()-.5)*(n()<.25?1.3:.55);const e=l/h*(.7+n()*.6);f+=Math.cos(g)*e;d+=Math.sin(g)*e*.5;u+=e;const a=Math.max(.35,r*Math.pow(1-t/h,.6)*(.6+n()*.8));p.push([f,d,a,u]);if(c<2&&t>1&&t<h-1&&n()<(c?.25:.4))i(f,d,g+(n()<.5?-1:1)*(.6+n()*.7),l*(.25+n()*.25),a*.75,c+1,u)}o.push({P:p,d:c})};const l=6+Math.floor(n()*3);for(let t=0;t<l;t++){const e=t/l*Math.PI*2+(n()-.5)*.6;i(0,0,e,a*(.6+n()*.45),a*(.045+n()*.03),0,0)}const r=[];for(let t=0;t<16;t++)r.push([n()*Math.PI*2,n(),n()]);t.cr=o;t.em=r;t.R0=a}const a=Math.min(1,n/.5),o=t.R0*1.1*(1-Math.pow(1-a,2.2))+3,i=n<.7?1:1-(n-.7)/.3,l=n<.55?1:Math.max(.35,1-(n-.55)*1.4),r=.88+.12*Math.sin(time*11);ctx.save();ctx.translate(e.x,e.y);ctx.lineJoin="miter";ctx.miterLimit=3;const c=(t,e)=>{const n=[];for(let e=0;e<t.length;e++){if(t[e][3]<=o){n.push(t[e]);continue}if(e>0){const a=t[e-1],i=t[e],l=(o-a[3])/Math.max(.01,i[3]-a[3]);n.push([a[0]+(i[0]-a[0])*l,a[1]+(i[1]-a[1])*l,.2,o])}break}if(n.length<2)return false;const a=[],i=[];for(let t=0;t<n.length;t++){const o=n[Math.max(0,t-1)],l=n[Math.min(n.length-1,t+1)],r=l[0]-o[0],c=l[1]-o[1],s=Math.hypot(r,c)||1,h=-c/s,f=r/s,d=n[t][2]+e;a.push([n[t][0]+h*d,n[t][1]+f*d]);i.push([n[t][0]-h*d,n[t][1]-f*d])}ctx.beginPath();ctx.moveTo(a[0][0],a[0][1]);for(const t of a.slice(1))ctx.lineTo(t[0],t[1]);for(const t of i.reverse())ctx.lineTo(t[0],t[1]);ctx.closePath();return true};const s=ctx.createRadialGradient(0,0,0,0,0,t.R0*.75*Math.max(.3,a));s.addColorStop(0,`rgba(30,8,4,${.55*i})`);s.addColorStop(.6,`rgba(40,14,6,${.28*i})`);s.addColorStop(1,"rgba(40,14,6,0)");ctx.fillStyle=s;ctx.beginPath();ctx.ellipse(0,0,t.R0*.75*Math.max(.3,a),t.R0*.38*Math.max(.3,a),0,0,7);ctx.fill();ctx.globalAlpha=i*.9;ctx.fillStyle="#1c0503";for(const e of t.cr){if(c(e.P,1.3))ctx.fill()}ctx.globalAlpha=i;ctx.fillStyle=`rgb(${Math.round(150+60*l)},${Math.round(14+16*l)},8)`;for(const e of t.cr){if(c(e.P,0))ctx.fill()}ctx.globalCompositeOperation="lighter";ctx.globalAlpha=i*r*l;ctx.fillStyle="rgba(255,70,20,.75)";for(const e of t.cr){const t=e.P.map(t=>[t[0],t[1],t[2]*.55,t[3]]);if(c(t,0))ctx.fill()}ctx.fillStyle="rgba(255,190,90,.8)";for(const e of t.cr){if(e.d>1)continue;const t=e.P.map(t=>[t[0],t[1],t[2]*.22,t[3]]);if(c(t,0))ctx.fill()}const h=ctx.createRadialGradient(0,0,0,0,0,t.R0*.2);h.addColorStop(0,`rgba(255,200,110,${.85*i*l})`);h.addColorStop(.5,`rgba(255,80,20,${.45*i*l})`);h.addColorStop(1,"rgba(255,30,0,0)");ctx.globalAlpha=1;ctx.fillStyle=h;ctx.beginPath();ctx.ellipse(0,0,t.R0*.2*Math.max(.4,a),t.R0*.11*Math.max(.4,a),0,0,7);ctx.fill();for(const[e,o,l]of t.em){const r=(n*1.6+l)%1,c=t.R0*.8*o*a,s=Math.cos(e)*c,h=Math.sin(e)*c*.5-r*34;ctx.globalAlpha=i*(1-r)*.9;ctx.fillStyle=r<.4?"#ffd27a":"#ff6a2a";ctx.fillRect(s-.8,h-.8,1.6,1.6)}const f=Math.max(0,Math.min(1,n/.25))*(n<.7?1:Math.max(0,1-(n-.7)/.3));if(f>0){const e=t.R0*.5,n=ctx.createLinearGradient(0,0,0,-e);n.addColorStop(0,`rgba(255,110,40,${.3*f})`);n.addColorStop(1,"rgba(255,80,20,0)");ctx.globalAlpha=1;ctx.fillStyle=n;const a=Math.sin(time*5)*2;ctx.beginPath();ctx.moveTo(-t.R0*.12,0);ctx.quadraticCurveTo(-t.R0*.08+a,-e*.5,a,-e);ctx.quadraticCurveTo(t.R0*.08+a,-e*.5,t.R0*.12,0);ctx.closePath();ctx.fill()}ctx.restore();break}case"arrowfly":{const e=scr(t.x,t.y),a=scr(t.ex,t.ey),o=e.x+(a.x-e.x)*n,i=e.y-30+(a.y-30-(e.y-30))*n-Math.sin(n*Math.PI)*18,l=Math.atan2(a.y-e.y,a.x-e.x);ctx.save();ctx.translate(o,i);ctx.rotate(l);ctx.strokeStyle="#5a3a1a";ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(-12,0);ctx.lineTo(6,0);ctx.stroke();ctx.fillStyle="#c8c8c8";ctx.beginPath();ctx.moveTo(9,0);ctx.lineTo(4,-2.4);ctx.lineTo(4,2.4);ctx.fill();ctx.fillStyle="#e8e0d0";ctx.fillRect(-12,-2,4,1.4);ctx.fillRect(-12,.6,4,1.4);ctx.restore();break}case"maceray":{const e=scr(t.x,t.y),a=scr(t.ex,t.ey),o=Math.atan2(a.y-e.y,a.x-e.x),l=n<.65?1:1-(n-.65)/.35,r=hexRgb(i);const c=(t,n,l)=>{const c=e.x+(a.x-e.x)*t,s=e.y+(a.y-e.y)*t-20,h=(19+t*12)*l,f=h*.26,d=Math.acos(-f/(2*h)),g=h*Math.sin(d),u=Math.atan2(g,f/2);ctx.save();ctx.translate(c,s);ctx.rotate(o);ctx.scale(1,.72);ctx.translate(-h*.7,0);ctx.globalAlpha=n;ctx.beginPath();ctx.arc(0,0,h,-d,d);ctx.arc(-f,0,h,u,-u,true);ctx.closePath();const p=ctx.createLinearGradient(-f,0,h,0);p.addColorStop(0,`rgba(${r},.15)`);p.addColorStop(.6,`rgba(${r},.8)`);p.addColorStop(1,"rgba(255,252,230,.98)");ctx.fillStyle=p;ctx.shadowColor=i;ctx.shadowBlur=16;ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle="rgba(255,253,240,.85)";ctx.lineWidth=1.1;ctx.beginPath();ctx.arc(0,0,h,-d*.8,d*.8);ctx.stroke();ctx.restore()};const s=1-Math.pow(1-Math.min(1,n/.85),2);ctx.save();ctx.globalCompositeOperation="lighter";c(Math.max(0,s-.22),l*.16,.92);c(Math.max(0,s-.11),l*.35,.96);c(s,l,1);ctx.restore();break}case"phspear":{const a=scr(t.sx,t.sy),o=e.x>=a.x?1:-1,i=a.x+o*10,l=a.y-120,r=Math.atan2(e.y-14-l,e.x-i),c=-Math.PI/2+o*.25,s=Math.atan2(Math.sin(r-c),Math.cos(r-c)),h=ease(Math.min(1,n/.42)),f=c+s*h,d=Math.max(220,Math.hypot(e.x-i,e.y-l)+40),g=n<.5?1:1-(n-.5)/.5;ctx.save();ctx.globalCompositeOperation="lighter";ctx.lineCap="round";{const e=t.color||"#ffd27a",n=hexRgb(e),a=26,o=[],r=[];for(let t=0;t<a;t++){const e=c+s*h*t/(a-1),n=Math.cos(e),f=Math.sin(e);o.push([i+n*(d+6),l+f*(d+6)]);r.push([i+n*d*.42,l+f*d*.42])}const f=o[0],u=o[a-1],p=ctx.createLinearGradient(f[0],f[1],u[0],u[1]);p.addColorStop(0,`rgba(${n},0)`);p.addColorStop(.6,`rgba(${n},${.25*g})`);p.addColorStop(1,`rgba(${n},${.65*g})`);ctx.globalAlpha=1;ctx.fillStyle=p;ctx.beginPath();o.forEach((t,e)=>e?ctx.lineTo(t[0],t[1]):ctx.moveTo(t[0],t[1]));for(let t=a-1;t>=0;t--)ctx.lineTo(r[t][0],r[t][1]);ctx.closePath();ctx.fill();const m=ctx.createLinearGradient(f[0],f[1],u[0],u[1]);m.addColorStop(0,`rgba(${n},0)`);m.addColorStop(.7,`rgba(${n},${.85*g})`);m.addColorStop(1,`rgba(255,255,255,${g})`);ctx.strokeStyle=m;ctx.lineWidth=4;ctx.lineJoin="round";ctx.shadowColor=e;ctx.shadowBlur=14;ctx.beginPath();o.forEach((t,e)=>e?ctx.lineTo(t[0],t[1]):ctx.moveTo(t[0],t[1]));ctx.stroke();ctx.shadowBlur=0}{const e=Math.cos(f),n=Math.sin(f),a=-n,o=e,r=i+e*(d-70),c=l+n*(d-70);ctx.globalAlpha=g*.9;const s=ctx.createLinearGradient(i,l,r,c);const h=hexRgb(t.color||"#ffd27a");s.addColorStop(0,`rgba(${h},0.2)`);s.addColorStop(1,"rgba(255,250,235,0.95)");ctx.strokeStyle=s;ctx.lineWidth=15;ctx.beginPath();ctx.moveTo(i,l);ctx.lineTo(r,c);ctx.stroke();ctx.fillStyle="rgba(240,250,255,0.95)";ctx.beginPath();ctx.moveTo(r+e*78,c+n*78);ctx.lineTo(r+a*24,c+o*24);ctx.lineTo(r-e*10,c-n*10);ctx.lineTo(r-a*24,c-o*24);ctx.closePath();ctx.fill();ctx.fillStyle="rgba(220,60,60,0.7)";ctx.beginPath();ctx.moveTo(r-e*6,c-n*6);ctx.lineTo(r-e*40+a*16,c-n*40+o*16);ctx.lineTo(r-e*30,c-n*30);ctx.lineTo(r-e*40-a*16,c-n*40-o*16);ctx.fill();glow(r+e*40,c+n*40,70,t.color||"#ffd27a",g*.8)}if(n>.38){const t=Math.min(1,(n-.38)/.5),a=24+t*90;ctx.globalAlpha=(1-t)*.9;ctx.strokeStyle="#e8f4ff";ctx.lineWidth=4*(1-t)+1;ctx.beginPath();ctx.ellipse(e.x,e.y,a,a*.42,0,0,7);ctx.stroke();glow(e.x,e.y-10,60*(1-t)+10,"#ffffff",(1-t)*.7)}ctx.restore();ctx.globalAlpha=1;break}case"nkhn":{const a=mulberry32(t.seed||1),o=.42,i=Math.min(1,n/o),l=e.y-4,r=n<.84?1:1-(n-.84)/.16;const c=n<o?l-250*(1-i*i):l+12,s=c-64,h=c-36;const f="lighter";const d=(t,e,n,a)=>{ctx.beginPath();ctx.moveTo(t,e-a);ctx.bezierCurveTo(t+n*.62,e-a,t+n,e+a*.1,t+n,e+a*.42);ctx.bezierCurveTo(t+n,e+a*.95,t-n,e+a*.95,t-n,e+a*.42);ctx.bezierCurveTo(t-n,e+a*.1,t-n*.62,e-a,t,e-a);ctx.closePath()};ctx.save();ctx.globalCompositeOperation=f;const g=n<o?1:1+Math.min(1,(n-o)/.3)*.25;for(let t=5;t>=1;t--){ctx.globalAlpha=r*.026*(6-t);ctx.fillStyle=t>3?"#8f8a78":"#d8d0b4";d(e.x,h,(10+t*5)*g,(40+t*6)*g);ctx.fill()}const u=ctx.createLinearGradient(e.x-4,0,e.x+4,0);u.addColorStop(0,"#a89c7a");u.addColorStop(.45,"#fffdf2");u.addColorStop(.55,"#fffdf2");u.addColorStop(1,"#a89c7a");ctx.globalCompositeOperation="source-over";ctx.globalAlpha=r;ctx.fillStyle=u;ctx.beginPath();ctx.moveTo(e.x,c);ctx.lineTo(e.x-3.4,c-9);ctx.lineTo(e.x-3,s);ctx.lineTo(e.x+3,s);ctx.lineTo(e.x+3.4,c-9);ctx.closePath();ctx.fill();ctx.strokeStyle="#ffffff";ctx.lineWidth=1.1;ctx.beginPath();ctx.moveTo(e.x,s+2);ctx.lineTo(e.x,c-4);ctx.stroke();ctx.fillStyle="#f6eccc";ctx.beginPath();ctx.ellipse(e.x,s-1.5,8,2.2,0,0,7);ctx.fill();ctx.fillStyle="#e6d8b0";ctx.fillRect(e.x-1.4,s-13,2.8,11.5);ctx.fillStyle="#fff6d8";ctx.beginPath();ctx.moveTo(e.x,s-13);ctx.lineTo(e.x-3.6,s-17.5);ctx.arc(e.x-1.8,s-17.8,1.9,Math.PI,0);ctx.arc(e.x+1.8,s-17.8,1.9,Math.PI,0);ctx.lineTo(e.x+3.6,s-17.5);ctx.closePath();ctx.fill();glow(e.x,s-17,8,"#fffbe8",r*.7);glow(e.x,h,18,"#fff6dc",r*.12);ctx.globalCompositeOperation=f;if(n>=o){const t=(n-o)/(1-o),i=Math.min(1,(n-o)/.34);if(i<1){const t=12+ease(i)*66,n=i<.75?1:(1-i)/.25;ctx.globalAlpha=n*.1;ctx.fillStyle="#fff0c8";ctx.beginPath();ctx.ellipse(e.x,l+2,t,t*.3,0,0,7);ctx.fill();ctx.globalAlpha=n*.22;ctx.strokeStyle="#fff6d8";ctx.lineWidth=6;ctx.stroke();ctx.globalAlpha=n;ctx.strokeStyle="#fffcee";ctx.lineWidth=2.2;ctx.stroke()}if(i<1){ctx.lineWidth=1.6;for(let t=0;t<6;t++){const t=e.x+(a()-.5)*24,n=12+a()*18,o=l-4-a()*8-i*20;ctx.globalAlpha=r*(1-i)*.5;ctx.strokeStyle="#fffbe8";ctx.beginPath();ctx.moveTo(t,o);ctx.lineTo(t+(a()-.5)*2,o-n);ctx.stroke()}}const c=(t,e,n,o)=>{ctx.beginPath();ctx.moveTo(t,e);for(let i=0;i<6;i++){t+=Math.cos(n)*o/6+(a()-.5)*6;e+=Math.sin(n)*o/6*.55+(a()-.5)*6;ctx.lineTo(t,e);n+=(a()-.5)*1.4}ctx.stroke()};const h=ease(Math.min(1,t*1.25)),d=l-6+(s-6-(l-6))*h,g=14+12*(1-Math.abs(h-.5)*2);ctx.strokeStyle="#ffffff";ctx.lineWidth=1;ctx.globalAlpha=r*.9;for(let t=0;t<10;t++){const t=a()*6.283+time*5,n=e.x+Math.cos(t)*3,o=d+(a()-.5)*14;c(n,o,t,g*(.6+a()*.7))}glow(e.x,d,16+8*(1-h),"#fff8e0",r*.35);ctx.globalCompositeOperation=f}ctx.restore();ctx.globalAlpha=1;break}case"nkring":{const t=ease(Math.min(1,n/.62)),a=14+t*56,o=a*.42,i=e.y-34,l=n<.62?1:Math.max(0,1-(n-.62)/.38);ctx.save();ctx.globalCompositeOperation="lighter";for(let t=3;t>=1;t--){ctx.globalAlpha=l*.025*(4-t);ctx.fillStyle="#e8e4a0";ctx.beginPath();ctx.ellipse(e.x,i,o+t*5,a+t*6,0,0,7);ctx.fill()}ctx.globalAlpha=l*.25;ctx.strokeStyle="#fff8a8";ctx.lineWidth=4.5;ctx.beginPath();ctx.ellipse(e.x,i,o,a,0,0,7);ctx.stroke();ctx.globalAlpha=l*.95;ctx.strokeStyle="#fffec0";ctx.lineWidth=1.6;ctx.stroke();ctx.restore();ctx.globalAlpha=1;break}case"skysword":{const a=Math.min(1,n/.3),o=t.sink?Math.max(0,(n-.3)/.6):0,i=e.y-30-(1-ease(a))*200+ease(Math.min(1,o))*150,l=n<.3?1:t.sink?Math.max(0,1-Math.max(0,n-.75)/.25):1-(n-.3)/.7;const r=t.ice;ctx.save();if(t.sink){ctx.beginPath();ctx.rect(e.x-400,e.y-900,800,900+4);ctx.clip()}const c=t.sc||1;ctx.translate(e.x,i);ctx.scale(c,c);ctx.translate(-e.x,-i);ctx.globalCompositeOperation="lighter";ctx.globalAlpha=l;glow(e.x,i-60,46,r?"#7fd8ff":"#ffd24a",l*.8);if(r){glow(e.x,i-60,95,"#bfefff",l*.75);ctx.strokeStyle=`rgba(200,245,255,${l*.8})`;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(e.x,i-62,30,74,0,0,7);ctx.stroke()}const s=ctx.createLinearGradient(e.x-9,0,e.x+9,0);s.addColorStop(0,r?"#bfefff":"#ffe9a0");s.addColorStop(.5,r?"#f4fdff":"#fffbe6");s.addColorStop(1,r?"#4ab0e8":"#d8a830");ctx.fillStyle=s;ctx.beginPath();ctx.moveTo(e.x,i+12);ctx.lineTo(e.x-9,i-8);ctx.lineTo(e.x-8,i-118);ctx.lineTo(e.x+8,i-118);ctx.lineTo(e.x+9,i-8);ctx.closePath();ctx.fill();ctx.fillStyle=r?"#9fe4ff":"#ffd24a";ctx.fillRect(e.x-24,i-126,48,9);ctx.fillStyle=r?"#3a8ac8":"#c8902a";ctx.fillRect(e.x-4,i-160,8,34);glow(e.x,i-164,10,r?"#e0f8ff":"#fff4c8",l);if(n>.28){const t=Math.min(1,(n-.28)/.4),a=(20+t*60)*c;ctx.setTransform(DPR*ZOOM,0,0,DPR*ZOOM,0,0);ctx.globalCompositeOperation="lighter";ctx.globalAlpha=(1-t)*.9;ctx.strokeStyle=r?"#a8e8ff":"#ffe08a";ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(e.x,e.y,a,a*.45,0,0,7);ctx.stroke()}ctx.restore();ctx.globalAlpha=1;break}case"icering":{const a=iso(t.x,t.y),o=iso(t.x+t.R,t.y-t.R),i=Math.max(8,Math.abs(o.x-a.x)),l=n<.6?1:1-(n-.6)/.4;const r=(t,n,a,o)=>{if(t<=2)return;ctx.beginPath();for(let n=0;n<=48;n++){const a=n/48*Math.PI*2,i=t*(1+.035*Math.sin(a*9+o));const l=e.x+Math.cos(a)*i,r=e.y+Math.sin(a)*i*.5;n?ctx.lineTo(l,r):ctx.moveTo(l,r)}ctx.closePath();ctx.globalAlpha=a;ctx.lineWidth=n;ctx.stroke()};ctx.save();ctx.globalCompositeOperation="lighter";const c=ease(Math.min(1,n/.45)),s=i*c;ctx.globalAlpha=l*.45;const h=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,Math.max(1,s));h.addColorStop(0,"rgba(80,160,255,.18)");h.addColorStop(.7,"rgba(100,190,255,.35)");h.addColorStop(1,"rgba(200,240,255,.6)");ctx.fillStyle=h;ctx.beginPath();ctx.ellipse(e.x,e.y,Math.max(1,s),Math.max(1,s*.5),0,0,7);ctx.fill();for(let t=0;t<3;t++){const e=n-t*.12;if(e<=0)continue;const a=i*ease(Math.min(1,e/.45)),o=l*(1-t*.28)*(e<.45?1:Math.max(0,1-(e-.45)/.45));ctx.strokeStyle=t?"rgba(140,215,255,1)":"rgba(235,252,255,1)";r(a,(t?3:4.5)*(1-n*.5),o,n*14+t);ctx.strokeStyle="rgba(90,180,255,1)";r(a*.92,8,o*.35,n*14+t+1)}if(n<.55){ctx.globalAlpha=l;for(let t=0;t<20;t++){const a=t/20*Math.PI*2+.3,o=s*(.96+.06*Math.sin(t*3.1)),i=(1-n/.55)*(8+6*Math.sin(t*2.3));glow(e.x+Math.cos(a)*o,e.y+Math.sin(a)*o*.5-i,7,t%2?"#bfefff":"#ffffff",l*(1-n/.55))}}if(n<.7){const t=1-n/.7;ctx.globalAlpha=t;ctx.fillStyle="rgba(170,130,255,.8)";ctx.translate(e.x,e.y);ctx.scale(1,.5);ctx.beginPath();for(let t=0;t<8;t++){const e=t*Math.PI/4+n,a=t%2?8:26;ctx.lineTo(Math.cos(e)*a,Math.sin(e)*a)}ctx.closePath();ctx.fill()}ctx.restore();ctx.globalAlpha=1;break}case"halo":{const a=ease(Math.min(1,n*2.2)),o=t.small?.42:t.big?1.5:1;if(t.sx!=null){const a=scr(t.sx,t.sy);ctx.save();ctx.globalCompositeOperation="lighter";for(let t=0;t<5;t++){const o=(6-t)*(1-n)*2.2;ctx.globalAlpha=(1-n)*.5;ctx.strokeStyle=t<2?"#ffffff":i;ctx.lineWidth=o;ctx.beginPath();ctx.moveTo(a.x+(t-2)*3,a.y-40);ctx.lineTo(e.x+(t-2)*6,e.y-30);ctx.stroke()}ctx.restore();glow(a.x,a.y-40,30,"#fff4c8",1-n)}ctx.save();ctx.globalCompositeOperation="lighter";for(let t=0;t<3;t++){const l=(18+a*46)*(1+t*.35)*o;ctx.globalAlpha=(1-n)*(.9-t*.25);ctx.strokeStyle=t?"#fff4c8":i;ctx.lineWidth=4-t;ctx.beginPath();ctx.ellipse(e.x,e.y-30,l,l*.7,0,0,7);ctx.stroke()}for(let t=0;t<12;t++){const i=t/12*6.283+time;ctx.globalAlpha=(1-n)*.7;ctx.strokeStyle="#fff0b0";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(e.x+Math.cos(i)*14*o,e.y-30+Math.sin(i)*10*o);ctx.lineTo(e.x+Math.cos(i)*(30+a*50)*o,e.y-30+Math.sin(i)*(22+a*36)*o);ctx.stroke()}ctx.restore();ctx.globalAlpha=1;glow(e.x,e.y-30,60*a*o,i,1-n);break}case"galepuff":{const a=(t.sz||1)*22*(1+n*.9),o=puffSprite(n<.3?"#fff4d8":"#d8c8a0");ctx.save();ctx.globalAlpha=.6*(1-n);ctx.drawImage(o,e.x-a,e.y-40*(t.sz||1)-n*18-a*.85,a*2,a*1.7);ctx.restore();break}case"galeboom":{const a=(t.r||1.8)*TW/2,o=1-Math.pow(1-Math.min(1,n*1.6),2),i=1-Math.max(0,(n-.25)/.75);if(n<.25)glow(e.x,e.y-24,a*1.1*(.5+n*2),"#fff6d8",(1-n*4)*1.2);const l=puffSprite("#fff4d8"),r=puffSprite("#d8b878");ctx.save();for(let c=0;c<14;c++){const s=c/14*6.283+(t.seed||0)*6,h=a*o*(.75+.25*Math.sin(c*2.3)),f=e.x+Math.cos(s)*h,d=e.y-14+Math.sin(s)*h*.5-n*20,g=a*(.36+.3*o);ctx.globalAlpha=.85*i;ctx.drawImage(c%2?l:r,f-g,d-g,g*2,g*2)}ctx.globalAlpha=.6*i;ctx.strokeStyle="#fff2c8";ctx.lineWidth=3*(1-n)+.5;ctx.beginPath();ctx.ellipse(e.x,e.y,a*o,a*o*.5,0,0,7);ctx.stroke();ctx.restore();if(n<.5)drawGaleFunnel(e.x,e.y,92*(1+n*.6),40*(1+n*2.2),time,(1-n/.5)*.9);break}case"tornado":{const t=Math.min(1,n*4),o=l;drawFunnel(e.x,e.y,(60+a*.2)*t,a*.75,i,o,time*12);break}case"flash":glow(e.x,e.y-28,t.r*(1+n*.8),i,(1-n)*1.2);glow(e.x,e.y-28,t.r*.45,"#ffffff",1-n);break;case"arcs":{for(let a=0;a<t.n;a++){const o=clamp((n-a*.6/t.n)/.55,0,1);if(o<=0||o>=1)continue;const l=t.ang-Math.PI/2+(a%3-1)*.8+(a%2?Math.PI:0),r=t.r*(1+.12*a),c=ease(o*1.4);crescent(e.x,e.y-30,r,l,-1.5,-1.5+3*c,i,Math.pow(1-o,.6));const s=-1.5+3*c;glow(e.x+Math.cos(l+s)*r*.9,e.y-30+Math.sin(l+s)*r*.7,10,i,1-o)}break}case"thrust":{const a=scr(t.sx,t.sy),o=ease(n*2.2),l=e.x-a.x,r=e.y-a.y,c=Math.hypot(l,r)||1,s=l/c,h=r/c,f=(c+30)*o,d=1-n;const g=a.x+s*10,u=a.y-38+h*10,p=g+s*f,m=u+h*f,y=-h,T=s;lighter(()=>{ctx.globalAlpha=d;const t=ctx.createLinearGradient(g,u,p,m);t.addColorStop(0,hexA(i,0));t.addColorStop(.7,hexA(i,.9));t.addColorStop(1,"#ffffff");ctx.fillStyle=t;ctx.beginPath();ctx.moveTo(g+y*1.5,u+T*1.5);ctx.lineTo(g+s*f*.78+y*7,u+h*f*.78+T*7);ctx.lineTo(p,m);ctx.lineTo(g+s*f*.78-y*7,u+h*f*.78-T*7);ctx.lineTo(g-y*1.5,u-T*1.5);ctx.fill()});glow(p,m,16,i,d);ctx.globalAlpha=d;ctx.strokeStyle=i;ctx.lineWidth=2;for(const t of[.3,.6]){ctx.beginPath();ctx.ellipse(p-s*f*t*.3,m-h*f*t*.3,4+10*o*t,10+14*o*t,Math.atan2(h,s),0,7);ctx.stroke()}ctx.globalAlpha=1;break}case"fist":case"smash":{const n=t.type==="smash"?1:t.n,a=mulberry32(t.seed);for(let o=0;o<n;o++){const n=o?a()*20-10:0,l=o?a()*16-8:0,r=clamp((t.t-o*.16)/.24,0,1);if(r<=0||r>=1)continue;const c=e.x+n,s=e.y-32+l,h=t.type==="smash"?1.5:1,f=ease(r);glow(c,s,(20+20*f)*h,i,1-r);lighter(()=>{ctx.globalAlpha=1-r;ctx.fillStyle=i;ctx.beginPath();for(let t=0;t<20;t++){const e=t/20*6.283,n=(t%2?6:14+f*18)*h;ctx.lineTo(c+Math.cos(e)*n,s+Math.sin(e)*n*.8)}ctx.closePath();ctx.fill()});ctx.globalAlpha=1-r;ctx.strokeStyle="#ffffff";ctx.lineWidth=2.5*(1-r);ctx.beginPath();ctx.ellipse(c,s+10,(10+32*f)*h,(5+13*f)*h,0,0,7);ctx.stroke();if(r<.45&&t.type==="fist"){ctx.globalAlpha=1-r*2;ctx.fillStyle="#fff3c4";ctx.beginPath();if(ctx.roundRect)ctx.roundRect(c-8,s-7,16,14,5);else ctx.rect(c-8,s-7,16,14);ctx.fill();ctx.strokeStyle="rgba(160,110,30,.8)";ctx.lineWidth=1;for(let t=-1;t<=1;t++){ctx.beginPath();ctx.moveTo(c-8,s+t*3.5);ctx.lineTo(c-2,s+t*3.5);ctx.stroke()}}ctx.globalAlpha=1}break}case"cleave":{const a=ease(n*1.8),o=1-n;crescent(e.x,e.y-44,42,-Math.PI/2+(Math.cos(t.ang)<0?.35:-.35),-2.4,-2.4+2.6*a,i,o,1);glow(e.x,e.y-8,40*a,i,o);lighter(()=>{ctx.globalAlpha=o;ctx.strokeStyle="#ffffff";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(e.x-40*a,e.y);ctx.lineTo(e.x+40*a,e.y);ctx.stroke()});break}case"fang":{const t=ease(Math.min(1,n*2.4)),a=1-n*n,o=(1-t)*22;crescent(e.x,e.y-30-o,26,0,-2.7,-.45,i,a,.55);crescent(e.x,e.y-30+o,26,Math.PI,-2.7,-.45,i,a,.55);ctx.globalAlpha=a;ctx.fillStyle="#ffffff";for(const t of[-1,1])for(const n of[-8,8]){ctx.beginPath();ctx.moveTo(e.x+n-2,e.y-30+t*o-t*6);ctx.lineTo(e.x+n,e.y-30+t*o+t*4);ctx.lineTo(e.x+n+2,e.y-30+t*o-t*6);ctx.fill()}ctx.globalAlpha=1;if(t>.95)glow(e.x,e.y-30,26,i,a);break}case"beast":{const a=scr(t.sx,t.sy),o=ease(Math.min(1,n*1.6)),l=a.x+(e.x-a.x)*o,r=a.y-34+(e.y-a.y)*o,c=Math.sin(Math.PI*Math.min(1,n*1.1));if(t.kind==="snake"){ctx.globalAlpha=c*.8;for(let t=12;t>=1;t--){const l=Math.max(0,o-t*.05),r=a.x+(e.x-a.x)*l,s=a.y-34+(e.y-a.y)*l+Math.sin(t*.9+n*20)*6;glow(r,s,10-t*.5,i,c*.7)}ctx.globalAlpha=1}else{for(let n=1;n<=4;n++){const l=Math.max(0,o-n*.08);drawBeastHead("wolf",a.x+(e.x-a.x)*l,a.y-34+(e.y-a.y)*l,t.ang,26,i,c*.18)}}drawBeastHead(t.kind,l,r,t.ang,24+o*10,i,c);break}case"ribbon":{const a=scr(t.sx,t.sy),o=ease(n*1.6),l=1-n,r=a.x,c=a.y-40,s=Math.hypot(e.x-a.x,e.y-a.y)+10;const h=t.ang-1.4+2.8*o,f=r+Math.cos(t.ang-1.2)*s*.8,d=c+Math.sin(t.ang-1.2)*s*.5,g=r+Math.cos(h)*s,u=c+Math.sin(h)*s*.6+10;lighter(()=>{ctx.globalAlpha=l;ctx.lineCap="round";ctx.strokeStyle=i;ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(r,c);ctx.quadraticCurveTo(f,d,g,u);ctx.stroke();ctx.strokeStyle="#ffffff";ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(r,c);ctx.quadraticCurveTo(f,d-3,g,u-3);ctx.stroke()});glow(g,u,14,i,l);break}case"spiral":{const t=1-n;lighter(()=>{ctx.globalAlpha=t;ctx.strokeStyle=i;ctx.lineWidth=3;ctx.beginPath();for(let t=0;t<=60;t++){const a=t/60,o=a*6.283*2.5+n*8,i=(6+a*30)*ease(n*2);ctx.lineTo(e.x+Math.cos(o)*i,e.y-30+Math.sin(o)*i*.6)}ctx.stroke()});glow(e.x,e.y-30,24,i,t);break}case"circle":{const t=Math.sin(Math.PI*Math.min(1,n*1.2)),a=36;lighter(()=>{ctx.globalAlpha=t*.9;ctx.strokeStyle=i;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(e.x,e.y,a,a*.5,0,0,7);ctx.stroke();ctx.lineWidth=1.2;ctx.beginPath();ctx.ellipse(e.x,e.y,a*.72,a*.36,0,0,7);ctx.stroke();const n=time*2;ctx.beginPath();for(let t=0;t<=6;t++){const e=n+t*2*6.283/6*1+(t%2?Math.PI/3:0)}for(let t=0;t<2;t++){ctx.beginPath();for(let o=0;o<=3;o++){const i=n*(t?-1:1)+t*Math.PI/3+o*2.094;const l=e.x+Math.cos(i)*a*.72,r=e.y+Math.sin(i)*a*.36;o?ctx.lineTo(l,r):ctx.moveTo(l,r)}ctx.stroke()}ctx.fillStyle=i;for(let t=0;t<12;t++){const o=-n*.7+t*.5236;ctx.fillRect(e.x+Math.cos(o)*a*.86-1.2,e.y+Math.sin(o)*a*.43-1.2,2.4,2.4)}});glow(e.x,e.y,a*.9,i,t*.35);break}case"whirl":{const o=ease(n*3),r=time*14;lighter(()=>{for(let t=0;t<6;t++){const n=a*(.35+.65*o)*(1-t*.09),c=e.y-t*10*o;ctx.globalAlpha=l*(.7-t*.08);ctx.strokeStyle=t%2?"#ffffff":i;ctx.lineWidth=3.2-t*.35;ctx.beginPath();ctx.ellipse(e.x,c,n,n*.42,0,r*.3+t,r*.3+t+3.6);ctx.stroke()}});if(t.item){const n=t.n;for(let r=0;r<n;r++){const c=time*9+r*6.283/n,s=a*(.45+.5*o),h=e.x+Math.cos(c)*s,f=e.y-22-Math.sin(time*6+r)*5+Math.sin(c)*s*.45;drawItem(t.item,h,f,c+Math.PI/2,i,l)}}glow(e.x,e.y-20,a*.5,i,l*.35);break}case"lotus":{const i=ease(n*2.2),r=l;lighter(()=>{ctx.globalAlpha=r*.55;const t=ctx.createRadialGradient(e.x,e.y,2,e.x,e.y,a);t.addColorStop(0,hexA("#ffd6ec",.8));t.addColorStop(1,hexA("#ff8ac8",0));ctx.fillStyle=t;ctx.beginPath();ctx.ellipse(e.x,e.y,a,o,0,0,7);ctx.fill()});const c=(t,n,a,o,i,l,c)=>{for(let s=0;s<t;s++){const h=s/t*6.283+i,f=Math.cos(h),d=Math.sin(h)*.5,g=n*Math.hypot(f,d);ctx.save();ctx.translate(e.x+f*n*.5,e.y+d*n*.5-o);ctx.rotate(Math.atan2(d,f));const u=ctx.createLinearGradient(-g/2,0,g/2,0);u.addColorStop(0,l);u.addColorStop(1,c);ctx.fillStyle=u;ctx.globalAlpha=r*.92;ctx.beginPath();ctx.moveTo(-g/2,0);ctx.quadraticCurveTo(0,-a,g/2,0);ctx.quadraticCurveTo(0,a,-g/2,0);ctx.fill();ctx.strokeStyle="rgba(255,255,255,.7)";ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(-g/2,0);ctx.lineTo(g/2,0);ctx.stroke();ctx.restore()}};const s=t.seed%100/50;c(8,a*.95*i,o*.5,0,s,"#ffe6f4","#f070b8");c(6,a*.6*i,o*.48,9*i,s+.4,"#ffffff","#ff9ad2");c(5,a*.3*i,o*.4,17*i,s+.8,"#ffffff","#ffd0ec");glow(e.x,e.y-20*i,a*.32,"#fff4fb",r);glow(e.x,e.y-20*i,8,"#ffe08a",r);if(n>.2&&n<.6)lighter(()=>{const t=(.6-n)*2.5,o=ctx.createLinearGradient(0,e.y-180,0,e.y);o.addColorStop(0,hexA("#ffc0e8",0));o.addColorStop(1,hexA("#ffc0e8",.4*t));ctx.fillStyle=o;ctx.fillRect(e.x-a*.25,e.y-180,a*.5,180)});ctx.globalAlpha=1;break}case"silk":{const t=ease(n*2),o=["#ff9ad8","#c8a0ff","#9ae0ff"];lighter(()=>{for(let i=0;i<3;i++){const r=[];for(let o=0;o<=26;o++){const l=o/26,c=n*10+i*2.094+l*2.6,s=a*t*(.25+.75*l);r.push([e.x+Math.cos(c)*s,e.y-14+Math.sin(c)*s*.5-Math.sin(l*Math.PI)*22*t])}ctx.lineCap="round";for(let t=0;t<26;t++){ctx.globalAlpha=l*(.2+.8*t/26);ctx.lineWidth=1+6*(t/26);ctx.strokeStyle=o[i];ctx.beginPath();ctx.moveTo(r[t][0],r[t][1]);ctx.lineTo(r[t+1][0],r[t+1][1]);ctx.stroke()}ctx.globalAlpha=l*.8;ctx.lineWidth=1;ctx.strokeStyle="#ffffff";ctx.beginPath();ctx.moveTo(r[8][0],r[8][1]);for(let t=9;t<=26;t++)ctx.lineTo(r[t][0],r[t][1]);ctx.stroke();glow(r[26][0],r[26][1],10,"#ffffff",l*.8)}});ctx.globalAlpha=1;glow(e.x,e.y-14,a*.35,"#f0d8ff",l*.4);break}case"moonring":{const t=ease(n*2.5),r=l;()=>{ctx.save();ctx.translate(e.x,e.y);ctx.scale(1,.5);const n=a*t,o=ctx.createRadialGradient(0,0,n*.15,0,0,n);o.addColorStop(0,hexA("#eef2ff",.32*r));o.addColorStop(.75,hexA(i,.22*r));o.addColorStop(1,hexA("#ffffff",.55*r));ctx.fillStyle=o;ctx.beginPath();ctx.arc(0,0,n,0,7);ctx.fill();ctx.strokeStyle=hexA("#ffffff",.7*r);ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,n*.62,0,7);ctx.stroke();ctx.setLineDash([4,6]);ctx.beginPath();ctx.arc(0,0,n*.85,time*2,time*2+6.2);ctx.stroke();ctx.setLineDash([]);ctx.restore()};for(let n=0;n<3;n++){const i=time*5+n*2.094,l=e.x+Math.cos(i)*a*.68*t,c=e.y-10+Math.sin(i)*o*.68*t;crescent(l,c,11,i+1.6,-1.3,1.3,n===1?"#ffc0e8":"#d0dcff",r,1);glow(l,c,12,"#eef2ff",r*.6)}if(n<.5)lighter(()=>{const t=1-n*2,o=ctx.createLinearGradient(0,e.y-200,0,e.y);o.addColorStop(0,hexA("#e6ecff",0));o.addColorStop(1,hexA("#e6ecff",.45*t));ctx.fillStyle=o;ctx.fillRect(e.x-a*.3,e.y-200,a*.6,200)});glow(e.x,e.y-8,a*.4,"#f0f4ff",r*.55);break}case"sweep":{const l=ease(n*1.8),r=1-n;lighter(()=>{ctx.globalAlpha=r;ctx.strokeStyle=i;ctx.lineWidth=12*(1-n*.6);const c=t.ang||0;ctx.beginPath();ctx.ellipse(e.x,e.y-8,a*.9,o*.9,0,c,c+6.283*l);ctx.stroke();ctx.strokeStyle="#ffffff";ctx.lineWidth=2.5;ctx.beginPath();ctx.ellipse(e.x,e.y-8,a*.9,o*.9,0,c+6.283*l-1.2,c+6.283*l);ctx.stroke()});break}case"soundwave":{const p=ease(Math.min(1,n/.78)),f=n<.72?1:Math.max(0,(1-n)/.28),rx=a*(.025+.975*p),ry=o*(.025+.975*p);ctx.save();ctx.globalAlpha=f;ctx.strokeStyle="rgba(255,211,74,.42)";ctx.lineWidth=4.5;ctx.setLineDash([7,6]);ctx.lineDashOffset=-n*22;ctx.beginPath();ctx.ellipse(e.x,e.y,rx,ry,0,0,7);ctx.stroke();ctx.strokeStyle="#fff0a0";ctx.lineWidth=1.8;ctx.setLineDash([3,8]);ctx.lineDashOffset=n*18;ctx.beginPath();ctx.ellipse(e.x,e.y,rx,ry,0,0,7);ctx.stroke();ctx.restore();ctx.globalAlpha=1;glow(e.x,e.y-3,Math.max(rx,ry)*.11,"#ffd94f",f*.38);break}case"quake":{const t=1-n;for(const l of[0,.18]){const r=clamp(n-l,0,1);ctx.globalAlpha=t*(1-r);ctx.strokeStyle=l?i:"#fff2d0";ctx.lineWidth=6*(1-r)+1;ctx.beginPath();ctx.ellipse(e.x,e.y,a*ease(r*1.5),o*ease(r*1.5),0,0,7);ctx.stroke()}ctx.globalAlpha=1;glow(e.x,e.y-6,a*.6*(1-n),i,t*.8);break}case"nova":case"icenova":{const o=ease(n*1.6),l=1-n;ctx.save();ctx.translate(e.x,e.y);ctx.scale(1,.5);const r=a*(.2+.9*o),c=ctx.createRadialGradient(0,0,r*.4,0,0,r);c.addColorStop(0,hexA(i,0));c.addColorStop(.8,hexA(i,.45*l));c.addColorStop(1,hexA("#ffffff",.8*l));ctx.fillStyle=c;ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.fill();ctx.restore();if(t.type==="icenova"){const e=mulberry32(t.seed);for(let a=0;a<14;a++){const o=a/14*6.283+e()*.3,i=t.r*(.35+e()*.55),l=(22+e()*26)*ease(n*4)*(n>.75?1-(n-.75)/.25:1);const r=scr((t.follow?player.x:t.x)+Math.cos(o)*i,(t.follow?player.y:t.y)+Math.sin(o)*i),c=5+e()*3;const s=ctx.createLinearGradient(r.x,r.y-l,r.x,r.y);s.addColorStop(0,"#ffffff");s.addColorStop(1,"rgba(150,210,255,.85)");ctx.fillStyle=s;ctx.beginPath();ctx.moveTo(r.x-c,r.y);ctx.lineTo(r.x-c*.4,r.y-l*.8);ctx.lineTo(r.x,r.y-l);ctx.lineTo(r.x+c*.5,r.y-l*.75);ctx.lineTo(r.x+c,r.y);ctx.closePath();ctx.fill();ctx.strokeStyle="rgba(255,255,255,.8)";ctx.lineWidth=.8;ctx.stroke()}}glow(e.x,e.y-10,a*.5,i,l*.6);break}case"goldring":{const i=ease(Math.min(1,n/.28)),l=n<.55?1:Math.max(0,1-(n-.55)/.45),r=a*(.24+.56*i),c=o*(.24+.56*i),s=typeof time==="number"?time:0,h=(lowFx()?15:21)*(.6+.4*i);const f=t.half2?FX_HALF:0,d=f>0?0:f<0?Math.PI:0,g=f>0?Math.PI:f<0?2*Math.PI:7;if(n<.2&&f>=0){const t=1-n/.2;glow(e.x,e.y-6,40*(.6+.6*(1-t)),"#ffe8a0",.55*t)}ctx.save();ctx.lineCap=f?"butt":"round";for(const[t,n,a]of[[1,"230,120,30",.28],[.72,"245,160,45",.38],[.46,"255,200,80",.45],[.2,"255,230,150",.5]]){ctx.globalAlpha=a*l;ctx.strokeStyle=`rgb(${n})`;ctx.lineWidth=h*t;ctx.beginPath();ctx.ellipse(e.x,e.y,r,c,0,d,g);ctx.stroke()}const u=lowFx()?28:56;for(let n=0;n<u;n++){const a=n/u*6.283;if(f&&Math.sin(a)>=0!==f>0)continue;const o=e.x+Math.cos(a)*r,d=e.y+Math.sin(a)*c,g=(6+5*Math.abs(Math.sin(n*5.7+t.seed)))*(.7+.3*Math.sin(s*18+n*1.3))*(.6+.4*i),p=h*.32;ctx.globalAlpha=.32*l;ctx.fillStyle=n%2?"#f0a030":"#ffcc55";ctx.beginPath();ctx.moveTo(o-p,d);ctx.quadraticCurveTo(o-p*.3,d-g*.6,o+Math.sin(s*9+n)*1.5,d-g);ctx.quadraticCurveTo(o+p*.3,d-g*.6,o+p,d);ctx.closePath();ctx.fill()}ctx.restore();ctx.globalAlpha=1;break}case"icerain":{const n=1.1,i=t.t/1.6;if(i<1){const n=Math.min(1,i/.55),l=i<.55?Math.min(1,i*6):Math.max(0,1-(i-.55)/.45);if(l>.01){const i=a*(.35+.75*ease(n)),r=o*(.35+.75*ease(n));glow(e.x,e.y,i*.9,"#6f90ff",.18*l);ctx.save();ctx.globalCompositeOperation="lighter";for(let n=0;n<34;n++){const a=n/34*6.283+Math.sin(n*7.1)*.12,o=.9+.16*Math.sin(n*3.3+t.seed),c=e.x+Math.cos(a)*i*o,s=e.y+Math.sin(a)*r*o;ctx.globalAlpha=.65*l*(.45+.55*Math.abs(Math.sin(n*1.7+time*6)));ctx.fillStyle=n%3?"#8fa8ff":"#d6e0ff";ctx.beginPath();ctx.arc(c,s,1.2+n%4*.5,0,7);ctx.fill()}const c=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,i*.45);c.addColorStop(0,`rgba(215,225,255,${.28*l})`);c.addColorStop(1,"rgba(120,150,255,0)");ctx.globalAlpha=1;ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(e.x,e.y,i*.45,r*.3,0,0,7);ctx.fill();ctx.restore()}}for(const e of t.items){const a=t.t-e.delay;if(a<0)continue;const o=scr(t.x+e.dx,t.y+e.dy),i=Math.min(1,a/n);if(i<1){const t=o.y-290*(1-ease(i))-6,n=e.sz;glow(o.x,t,16*n,"#7fa6c8",.28);lighter(()=>{for(let a=0;a<7;a++){const i=a/7,l=o.x+Math.sin(e.ph+a*2.1)*4*i,r=t-6-i*34*n;ctx.globalAlpha=.55*(1-i);ctx.fillStyle=a%2?"#cfe8ff":"#e8f4ff";ctx.beginPath();ctx.arc(l,r,(1.6-i)*n,0,7);ctx.fill()}const a=ctx.createRadialGradient(o.x,t,0,o.x,t,7*n);a.addColorStop(0,"rgba(225,240,255,.75)");a.addColorStop(.45,"rgba(110,165,240,.6)");a.addColorStop(1,"rgba(80,140,255,0)");ctx.globalAlpha=1;ctx.fillStyle=a;ctx.beginPath();ctx.arc(o.x,t,7*n,0,7);ctx.fill()})}else{const t=Math.min(1,(a-n)/.6);if(t<1){const n=(10+26*ease(t))*e.sz,a=1-t;lighter(()=>{for(let t=0;t<12;t++){const i=t/12*6.283+e.ph;ctx.globalAlpha=a*.55;ctx.fillStyle=t%3?"#9fb4ff":"#dfe8ff";ctx.beginPath();ctx.arc(o.x+Math.cos(i)*n,o.y+Math.sin(i)*n*.45,1.3,0,7);ctx.fill()}});if(t<.25)glow(o.x,o.y-3,16*e.sz,"#cfe0ff",.45*(1-t/.25))}}}break}case"rain":{const n=.28;ctx.globalAlpha=.35*l;ctx.strokeStyle=i;ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(e.x,e.y,a,o,0,0,7);ctx.stroke();ctx.globalAlpha=1;for(const e of t.items){const a=clamp((t.t-e.delay)/n,0,1);if(a<=0)continue;const o=scr(t.x+e.dx,t.y+e.dy);if(t.item==="petal"){const n=o.y-120*(1-a)-8;ctx.save();ctx.translate(o.x+Math.sin(t.t*6+e.ph)*8,n);ctx.rotate(t.t*5+e.ph);ctx.globalAlpha=l;ctx.fillStyle=e.ph>3?"#f7b8d8":"#ffe6f2";ctx.beginPath();ctx.ellipse(0,0,6*e.sz,2.8*e.sz,0,0,7);ctx.fill();ctx.restore();ctx.globalAlpha=1;continue}const r=o.y-170*(1-ease(a))-4,c=Math.PI/2+.12;if(a<1){lighter(()=>{ctx.globalAlpha=.6;ctx.strokeStyle=i;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(o.x,r-40);ctx.lineTo(o.x,r);ctx.stroke()});drawItem(t.item,o.x,r-8,c,i,1)}else{const a=t.t-e.delay-n;if(a<.12)glow(o.x,o.y-4,22,i,1-a/.12);drawItem(t.item,o.x,o.y-10,c,i,l)}}break}case"cloud":{const o=Math.min(1,n*5)*l;for(const e of t.items){const n=scr(t.x+e.dx+Math.sin(time*1.5+e.ph)*.15,t.y+e.dy),a=18*e.sz*(.8+.3*Math.sin(time*2+e.ph));ctx.globalAlpha=.28*o;ctx.fillStyle=e.ph>3?"#5fbf3a":"#8fe06a";ctx.beginPath();ctx.ellipse(n.x,n.y-10,a,a*.6,0,0,7);ctx.fill()}ctx.globalAlpha=1;glow(e.x,e.y-10,a*.7,i,o*.3);break}case"moon":{const t=Math.min(1,n*4)*l,r=e.y-165,c=26*ease(n*3);glow(e.x,r,80,i,t);ctx.globalAlpha=t;const s=ctx.createRadialGradient(e.x-8,r-8,2,e.x,r,c);s.addColorStop(0,"#ffffff");s.addColorStop(1,"#d8d0f4");ctx.fillStyle=s;ctx.beginPath();ctx.arc(e.x,r,c,0,7);ctx.fill();ctx.fillStyle="rgba(160,150,200,.35)";ctx.beginPath();ctx.arc(e.x+7,r-4,5*c/26,0,7);ctx.arc(e.x-6,r+8,3.5*c/26,0,7);ctx.fill();ctx.globalAlpha=1;if(n>.2){const t=Math.min(1,(n-.2)*5)*l;lighter(()=>{const n=ctx.createLinearGradient(0,r,0,e.y);n.addColorStop(0,hexA(i,.05));n.addColorStop(1,hexA(i,.28*t));ctx.fillStyle=n;ctx.beginPath();ctx.moveTo(e.x-c*.8,r);ctx.lineTo(e.x+c*.8,r);ctx.lineTo(e.x+a,e.y);ctx.lineTo(e.x-a,e.y);ctx.closePath();ctx.fill();ctx.globalAlpha=t;ctx.fillStyle=hexA(i,.18);ctx.beginPath();ctx.ellipse(e.x,e.y,a,o,0,0,7);ctx.fill()})}break}case"palm":{const l=t.hitAt/t.dur;if(n<l){const t=ease(n/l),a=e.y-230*(1-t)-20;lighter(()=>{ctx.globalAlpha=.5;ctx.strokeStyle=i;ctx.lineWidth=2;for(let t=-2;t<=2;t++){ctx.beginPath();ctx.moveTo(e.x+t*12,a-70);ctx.lineTo(e.x+t*12,a-30);ctx.stroke()}});drawPalm(e.x,a,1.6+t*.6,i,1)}else{const t=(n-l)/(1-l);drawPalm(e.x,e.y-18,2.2,i,1-t);for(const n of[0,.2]){const l=clamp(t-n,0,1);ctx.globalAlpha=1-l;ctx.strokeStyle=n?i:"#fff6c8";ctx.lineWidth=7*(1-l)+1;ctx.beginPath();ctx.ellipse(e.x,e.y,a*1.2*ease(l*1.5),o*1.2*ease(l*1.5),0,0,7);ctx.stroke()}ctx.globalAlpha=1}break}case"meteor":{const i=t.hitAt/t.dur;if(n<i){const t=n/i,a=e.x-150*(1-t),o=e.y-260*(1-t)-10;for(let n=1;n<=8;n++){const a=Math.max(0,t-n*.05);glow(e.x-150*(1-a),e.y-260*(1-a)-10,26-n*2.4,"#ff7a2e",.6)}glow(a,o,44,"#ff5a1e",1);glow(a,o,22,"#ffd24a",1);glow(a,o,10,"#ffffff",1)}else{const t=(n-i)/(1-i),l=ease(t*1.4);glow(e.x,e.y-20,a*1.4*(.5+l),"#ff7a2e",(1-t)*1.2);glow(e.x,e.y-20,a*.6,"#fff2c0",Math.max(0,1-t*2.5));ctx.globalAlpha=1-t;ctx.strokeStyle="#ffb347";ctx.lineWidth=8*(1-t)+1;ctx.beginPath();ctx.ellipse(e.x,e.y,a*1.1*l,o*1.1*l,0,0,7);ctx.stroke();ctx.globalAlpha=1;for(let n=0;n<10;n++){const o=n/10*6.283,i=a*.9*l,r=e.x+Math.cos(o)*i,c=e.y+Math.sin(o)*i*.5,s=(30+20*Math.sin(time*20+n))*(1-t);glow(r,c-s*.4,s*.5,"#ff7a2e",1-t)}}break}case"flames":{const o=Math.min(1,n*6)*l;glow(e.x,e.y,a,i,o*.25);for(const e of t.items){const n=scr(t.x+e.dx,t.y+e.dy);for(let t=0;t<5;t++){const a=t*10*e.sz*(1+.25*Math.sin(time*18+e.ph+t)),i=(15-t*2.6)*e.sz;glow(n.x+Math.sin(time*10+t+e.ph)*3,n.y-a-6,i*1.4,t<2?"#ff5a1e":t<4?"#ff9a3c":"#ffe08a",o)}}break}case"pillar":{const e=mulberry32(t.seed);for(const a of t.items){const o=scr(t.x+a.dx,t.y+a.dy),l=ease(Math.min(1,Math.max(0,n-a.delay)/.22)),r=(46+e()*30)*l*a.sz,c=9*a.sz,s=n>.78?1-(n-.78)/.22:1;if(r<1)continue;ctx.globalAlpha=s;const h=ctx.createLinearGradient(o.x-c,0,o.x+c,0);h.addColorStop(0,"rgba(160,210,255,.9)");h.addColorStop(.5,"#ffffff");h.addColorStop(1,"rgba(110,170,230,.9)");ctx.fillStyle=h;ctx.beginPath();ctx.moveTo(o.x-c,o.y);ctx.lineTo(o.x-c*.8,o.y-r*.85);ctx.lineTo(o.x,o.y-r);ctx.lineTo(o.x+c*.8,o.y-r*.85);ctx.lineTo(o.x+c,o.y);ctx.closePath();ctx.fill();ctx.strokeStyle="rgba(255,255,255,.9)";ctx.lineWidth=1;ctx.stroke();ctx.strokeStyle="rgba(120,180,240,.6)";ctx.beginPath();ctx.moveTo(o.x,o.y-r);ctx.lineTo(o.x,o.y);ctx.stroke();ctx.globalAlpha=1;glow(o.x,o.y-r*.5,r*.6,i,s*.5)}break}case"blizzard":{const i=Math.min(1,n*5)*l;ctx.globalAlpha=i*.3;ctx.fillStyle="#e6f6ff";ctx.beginPath();ctx.ellipse(e.x,e.y,a,o,0,0,7);ctx.fill();ctx.globalAlpha=1;drawField({...t,style:"ice",t:t.t},e,Math.min(.99,n));glow(e.x,e.y-30,a*.8,"#bfe6ff",i*.35);break}case"firewheel":{const t=ease(n*3);for(let n=0;n<12;n++){const o=time*12+n*.5236,i=a*.85*t;const r=e.x+Math.cos(o)*i,c=e.y-12+Math.sin(o)*i*.45;glow(r,c-6,14,"#ff7a2e",l);glow(r,c-10,7,"#ffe08a",l)}lighter(()=>{ctx.globalAlpha=l*.7;ctx.strokeStyle="#ffb347";ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(e.x,e.y-12,a*.85*t,o*.85*t,0,0,7);ctx.stroke()});break}case"twindragon":{const t=ease(n*2.5),i=time*6.5,r=a*.66*t,c=o*.66*t,s=e.y-2,h=26,f=2.1;const d=(t,n)=>{const a=e.x+Math.cos(t)*r,o=s+Math.sin(t)*c,i=-Math.sin(t)*r,l=Math.cos(t)*c,h=Math.hypot(i,l)||1,f=-l/h,d=i/h,g=Math.sin(n*.55-time*11)*(1.2+n*.1);return{x:a+f*g,y:o+d*g*.6,tx:i/h,ty:l/h,nx:f,ny:d}};for(const t of[0,1]){const e=i+t*Math.PI,n=[];for(let t=0;t<=h;t++)n.push(d(e-t*f/h,t));ctx.save();ctx.lineCap="round";ctx.shadowColor="#ffd700";ctx.shadowBlur=6;for(let t=h-1;t<h+16;t++){const n=d(e-t*f/h,h),a=d(e-(t+1)*f/h,h),o=(t-h+1)/17;ctx.globalAlpha=l*.45*(1-o)*(1-o);ctx.strokeStyle="#ffe58a";ctx.lineWidth=1.8*(1-o)+.2;ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(a.x,a.y);ctx.stroke()}ctx.restore();const a=t=>t<3?3.6+t*.5:Math.max(.15,5.1*Math.pow(1-(t-3)/(h-3),.85));ctx.save();ctx.globalAlpha=l;ctx.shadowColor="#ffd700";ctx.shadowBlur=12;const o=ctx.createLinearGradient(n[0].x,n[0].y,n[h].x,n[h].y);o.addColorStop(0,"#ffd700");o.addColorStop(.6,"#ffb020");o.addColorStop(1,"#ff8c00");ctx.fillStyle=o;ctx.beginPath();ctx.moveTo(n[0].x+n[0].nx*a(0),n[0].y+n[0].ny*a(0));for(let t=1;t<=h;t++)ctx.lineTo(n[t].x+n[t].nx*a(t),n[t].y+n[t].ny*a(t));for(let t=h;t>=0;t--)ctx.lineTo(n[t].x-n[t].nx*a(t),n[t].y-n[t].ny*a(t));ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle="#ff8c00";ctx.lineWidth=.9;ctx.stroke();ctx.strokeStyle="#ffffe0";ctx.lineCap="round";for(let t=0;t<h-2;t++){ctx.globalAlpha=l*.85*(1-t/h);ctx.lineWidth=Math.max(.5,a(t)*.45);ctx.beginPath();ctx.moveTo(n[t].x,n[t].y);ctx.lineTo(n[t+1].x,n[t+1].y);ctx.stroke()}ctx.globalAlpha=l;ctx.strokeStyle="rgba(200,100,0,.55)";ctx.lineWidth=.7;for(let t=4;t<h-3;t+=3){const e=a(t)*.8;ctx.beginPath();ctx.moveTo(n[t].x+n[t].nx*e,n[t].y+n[t].ny*e);ctx.quadraticCurveTo(n[t].x-n[t].tx*1.5,n[t].y-n[t].ty*1.5,n[t].x-n[t].nx*e,n[t].y-n[t].ny*e);ctx.stroke()}ctx.restore();const r=n[0],c=Math.atan2(r.ty,r.tx);ctx.save();ctx.translate(r.x,r.y);ctx.rotate(c);ctx.scale(1.2,1.2);ctx.globalAlpha=l;ctx.shadowColor="#ffd700";ctx.shadowBlur=10;const s=ctx.createLinearGradient(-4,-4,9,4);s.addColorStop(0,"#ffd700");s.addColorStop(1,"#ff8c00");ctx.fillStyle=s;ctx.beginPath();ctx.moveTo(-3,-4.2);ctx.quadraticCurveTo(3,-5.5,7,-2.6);ctx.lineTo(11,-1.4);ctx.quadraticCurveTo(12.5,0,11,1.2);ctx.lineTo(6,2);ctx.lineTo(9.5,3.6+Math.sin(time*18)*.8);ctx.lineTo(4,4.4);ctx.quadraticCurveTo(-1,4.6,-3,3.6);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle="#ffffe0";ctx.beginPath();ctx.ellipse(5.5,-.6,3.2,1.1,0,0,7);ctx.fill();ctx.fillStyle="#fff";ctx.shadowColor="#fffbd0";ctx.shadowBlur=6;ctx.beginPath();ctx.arc(3.2,-2.2,1.1,0,7);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle="#c81e00";ctx.beginPath();ctx.arc(3.5,-2.2,.5,0,7);ctx.fill();ctx.strokeStyle="#ff9a1a";ctx.lineCap="round";ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(0,-3.8);ctx.quadraticCurveTo(-4,-7,-8,-6.5);ctx.moveTo(1.8,-4.4);ctx.quadraticCurveTo(-1.5,-8.5,-5.5,-9);ctx.stroke();ctx.strokeStyle="#ffffe0";ctx.lineWidth=.75;const g=Math.sin(time*7)*2.2,u=Math.sin(time*7+1.3)*2.2;ctx.beginPath();ctx.moveTo(10,-1);ctx.bezierCurveTo(6,-6,-2,-4+g,-10,-7+g);ctx.moveTo(10,1);ctx.bezierCurveTo(6,6,-2,4+u,-10,6+u);ctx.stroke();ctx.restore();glow(r.x,r.y,10,"#ffd700",l*.45)}break}case"snakes":{const t=ease(n*2.5);for(const n of[0,1]){for(let o=18;o>=0;o--){const r=time*9+n*Math.PI-o*.24,c=a*(.3+.6*t)*(1-o*.012),s=e.x+Math.cos(r)*c,h=e.y-16+Math.sin(r)*c*.45-Math.sin(o*.6+time*10)*3;const f=o===0?7:6-o*.25;ctx.globalAlpha=l;ctx.fillStyle=o%2?"#5fa03a":"#8fe06a";ctx.beginPath();ctx.arc(s,h,Math.max(1.5,f),0,7);ctx.fill();if(o===0){ctx.fillStyle="#ff3a2a";ctx.beginPath();ctx.arc(s+2,h-2,1.4,0,7);ctx.fill();glow(s,h,12,i,l*.6)}}}ctx.globalAlpha=1;break}case"erupt":{const o=t.hitAt/t.dur;for(const e of t.items){const a=scr(t.x+e.dx,t.y+e.dy),i=ease(clamp((n-o*.7)/.15,0,1)),l=34*e.sz*i,r=n>.75?1-(n-.75)/.25:1;if(l<1)continue;ctx.globalAlpha=r;ctx.fillStyle="#7a6a4a";ctx.beginPath();ctx.moveTo(a.x-10*e.sz,a.y);ctx.lineTo(a.x-2,a.y-l);ctx.lineTo(a.x+3,a.y-l*.85);ctx.lineTo(a.x+10*e.sz,a.y);ctx.closePath();ctx.fill();ctx.fillStyle="rgba(255,230,180,.35)";ctx.beginPath();ctx.moveTo(a.x-2,a.y-l);ctx.lineTo(a.x-6*e.sz,a.y);ctx.lineTo(a.x-2*e.sz,a.y);ctx.closePath();ctx.fill();ctx.globalAlpha=1}if(n>o*.7&&n<o*.7+.3)glow(e.x,e.y-10,a,i,.5);break}case"goldring":{const t=ease(n*1.5),a=1-n;lighter(()=>{ctx.globalAlpha=a;ctx.strokeStyle=i;ctx.lineWidth=5*(1-n)+1.5;ctx.beginPath();ctx.ellipse(e.x,e.y-4,10+26*t,5+12*t,0,0,7);ctx.stroke();ctx.strokeStyle="#ffffff";ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(e.x,e.y-4,8+22*t,4+10*t,0,0,7);ctx.stroke()});glow(e.x,e.y-10,26,"#b8f08a",a*.7);break}case"tongue":drawTongue(t,e,n);break;case"bolt":{const a=scr(t.sx,t.sy),o=Math.min(1,n*1.4),l=a.x+(e.x-a.x)*o,r=a.y-30+(e.y-a.y)*o;glow(l,r,12,i,1-n*.5);glow(l,r,5,"#ffffff",1-n);if(n>.6)glow(e.x,e.y-28,18*(n-.5),i,1-n);break}case"slash":{ctx.strokeStyle=t.color;ctx.lineCap="round";const a=t.multi||1;for(let t=0;t<a;t++){const o=clamp(n*a-t*.6,0,1);if(o<=0)continue;ctx.globalAlpha=1-o;ctx.lineWidth=3.5-2*o;ctx.beginPath();ctx.arc(e.x,e.y-24,18+t*3,-2.4+t*.7+o*1.2,-1+t*.7+o*1.2);ctx.stroke()}ctx.globalAlpha=1;break}case"ring":ctx.globalAlpha=1-n;ctx.strokeStyle=t.color;ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(e.x,e.y,t.r*TW/2*(.3+.7*n),t.r*TH/2*(.3+.7*n),0,0,7);ctx.stroke();ctx.globalAlpha=1;break;case"saw":{const cx=e.x,cy=e.y-24,fade=1-n,spin=n*32+(t.seed||0);lighter(()=>glow(cx,cy,34, i,.55*fade));ctx.save();ctx.translate(cx,cy);ctx.rotate(spin);ctx.globalAlpha=fade;ctx.beginPath();for(let k=0;k<32;k++){const ang=k*Math.PI/16,rad=k%2?14:22;ctx.lineTo(Math.cos(ang)*rad,Math.sin(ang)*rad)}ctx.closePath();const g=ctx.createRadialGradient(0,0,4,0,0,23);g.addColorStop(0,"#ffffff");g.addColorStop(.45,"#eaf6ff");g.addColorStop(1,i);ctx.fillStyle=g;ctx.strokeStyle="#ffffff";ctx.lineWidth=1.5;ctx.fill();ctx.stroke();ctx.beginPath();ctx.arc(0,0,9,0,7);ctx.fillStyle="#7890a8";ctx.fill();ctx.strokeStyle="#ffffff";ctx.lineWidth=1.2;ctx.stroke();ctx.rotate(-spin*1.6);ctx.strokeStyle="rgba(255,255,255,.9)";ctx.lineWidth=1;for(let k=0;k<6;k++){const ang=k*Math.PI/3;ctx.beginPath();ctx.moveTo(Math.cos(ang)*10,Math.sin(ang)*10);ctx.lineTo(Math.cos(ang)*17,Math.sin(ang)*17);ctx.stroke()}ctx.restore();for(let k=0;k<4;k++){const ang=spin*.3+k*Math.PI/2;glow(cx+Math.cos(ang)*25,cy+Math.sin(ang)*19,3,i,.8*fade)}break}case"field":drawField(t,e,n);break;case"burst":glow(e.x,e.y-26,10+n*18,t.color,1-n);break;case"aura":case"lvup":ctx.globalAlpha=1-n;ctx.strokeStyle=t.type==="lvup"?"#ffd24a":t.color;ctx.lineWidth=3;for(let t=0;t<3;t++){const a=e.y-n*50-t*14;ctx.beginPath();ctx.ellipse(e.x,a,20+t*2,9,0,0,7);ctx.stroke()}ctx.globalAlpha=1;glow(e.x,e.y-30,40,t.type==="lvup"?"#ffd24a":t.color,(1-n)*.6);if(t.type==="lvup"){ctx.globalAlpha=1-n;nameTag(e.x,e.y-104-n*20,"Thăng cấp!","#ffd24a");ctx.globalAlpha=1}break}}

  // Khối hàm vẽ đạn bay nguyên bản từ 2.5D (flySwordShape, drawProj,...)
  function flySwordShape(t,e,n){ctx.save();ctx.scale(t,t);ctx.globalAlpha=n;lighter(()=>{const t=ctx.createLinearGradient(-70,0,0,0);t.addColorStop(0,"rgba(127,216,255,0)");t.addColorStop(1,"rgba(160,230,255,.55)");ctx.fillStyle=t;ctx.beginPath();ctx.moveTo(0,-3.2);ctx.lineTo(-70,-.6);ctx.lineTo(-70,.6);ctx.lineTo(0,3.2);ctx.fill();const e=ctx.createRadialGradient(-8,0,1,-8,0,22);e.addColorStop(0,"rgba(200,245,255,.55)");e.addColorStop(1,"rgba(120,210,255,0)");ctx.fillStyle=e;ctx.beginPath();ctx.ellipse(-8,0,24,9,0,0,7);ctx.fill()});const a=ctx.createLinearGradient(0,-3,0,3);a.addColorStop(0,"#e8faff");a.addColorStop(.5,"#ffffff");a.addColorStop(1,e);ctx.fillStyle=a;ctx.beginPath();ctx.moveTo(6,0);ctx.lineTo(-2,-2.6);ctx.lineTo(-24,-2.2);ctx.lineTo(-24,2.2);ctx.lineTo(-2,2.6);ctx.closePath();ctx.fill();ctx.strokeStyle="rgba(60,140,200,.7)";ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(4,0);ctx.lineTo(-23,0);ctx.stroke();ctx.fillStyle="#e8c060";ctx.fillRect(-26.5,-5.2,2.6,10.4);ctx.fillStyle="#3a6a9a";ctx.fillRect(-35,-1.5,8.6,3);ctx.fillStyle="#e8c060";ctx.beginPath();ctx.arc(-36,0,1.8,0,7);ctx.fill();ctx.restore();ctx.globalAlpha=1}function drawProj(t){const e=scr(t.x,t.y),n=e.y-28,a=iso(t.vx,t.vy),o=Math.atan2(a.y,a.x)+(t.h0?.5:0),i=t.color||"#ffffff",l=t.style;if(l==="nhshadow"){ctx.save();ctx.translate(e.x,n);ctx.rotate(o);ctx.globalCompositeOperation="lighter";ctx.globalAlpha=.28;const g=ctx.createLinearGradient(-34,0,14,0);g.addColorStop(0,"rgba(28,12,38,0)");g.addColorStop(.5,"rgba(48,28,68,.8)");g.addColorStop(1,"rgba(16,10,26,.35)");ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(-9,0,28,8,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=.9;ctx.shadowColor="#9d78c8";ctx.shadowBlur=10;const b=ctx.createRadialGradient(5,-1,1,5,0,12);b.addColorStop(0,"#eee0ff");b.addColorStop(.3,"#9d78c8");b.addColorStop(.72,"#382544");b.addColorStop(1,"rgba(18,10,24,0)");ctx.fillStyle=b;ctx.beginPath();ctx.ellipse(5,0,14,7,0,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.globalAlpha=.65;ctx.strokeStyle="#d5b2ff";ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(-17,-2);ctx.quadraticCurveTo(-5,-8,9,-3);ctx.stroke();ctx.restore();return}if(l==="dragon"){drawBeastHead("snake",e.x,n,o,28,i,.95);return}if(l==="bamboo"){ctx.save();ctx.translate(e.x,n);ctx.rotate(o);lighter(()=>glow(0,0,12,"#8fe06a",.65));ctx.strokeStyle="#6c9b45";ctx.lineWidth=3.2;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(-14,0);ctx.lineTo(10,0);ctx.stroke();ctx.strokeStyle="#d7f0a0";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-8,-2);ctx.lineTo(-8,2);ctx.moveTo(1,-2);ctx.lineTo(1,2);ctx.stroke();ctx.fillStyle="#9fe07a";ctx.beginPath();ctx.moveTo(-10,0);ctx.quadraticCurveTo(-17,-8,-22,-5);ctx.quadraticCurveTo(-17,1,-10,0);ctx.fill();ctx.beginPath();ctx.moveTo(4,0);ctx.quadraticCurveTo(9,7,15,5);ctx.quadraticCurveTo(10,-1,4,0);ctx.fill();ctx.restore();return}const r=(t,e,n,a)=>{ctx.strokeStyle=n;ctx.lineWidth=e;ctx.beginPath();ctx.moveTo(-t,0);ctx.lineTo(0,0);ctx.stroke();ctx.fillStyle=a;ctx.beginPath();ctx.moveTo(5*e/2,0);ctx.lineTo(-2,-2*e);ctx.lineTo(-2,2*e);ctx.closePath();ctx.fill();ctx.fillStyle="#c8352a";ctx.beginPath();ctx.moveTo(-t,0);ctx.lineTo(-t-4,-2.5*e/1.6);ctx.lineTo(-t+3,0);ctx.lineTo(-t-4,2.5*e/1.6);ctx.fill()};ctx.save();ctx.translate(e.x,n);ctx.rotate(o);if(l==="flysword"){flySwordShape(1,i,1);ctx.restore();return}if(l==="coin"){ctx.rotate(-o);ctx.translate(0,16);const e=Math.abs(Math.cos(time*14+(t.phase||0)))*.5+.5;lighter(()=>glow(0,0,10,"#ffc83a",.7));ctx.strokeStyle="#ffd23a";ctx.lineWidth=2.6;ctx.beginPath();ctx.ellipse(0,0,6.5,3.6*e,0,0,7);ctx.stroke();ctx.strokeStyle="#fff3b0";ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,0,6.5,3.6*e,0,0,7);ctx.stroke();ctx.restore();return}if(l==="comet"){lighter(()=>{for(let t=0;t<6;t++){ctx.globalAlpha=.55-t*.08;ctx.fillStyle=t<2?"#ffffff":"#bfe6ff";ctx.beginPath();ctx.ellipse(-t*11,0,16-t*1.6,8-t*1.1,0,0,7);ctx.fill()}glow(2,0,26,"#9fd8ff",.9);glow(4,0,10,"#ffffff",1)});ctx.restore();return}if(l==="flydagger"){lighter(()=>{ctx.globalAlpha=.45;ctx.strokeStyle="#e8f4ff";ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(-30,0);ctx.lineTo(-6,0);ctx.stroke();glow(4,0,6,"#ffffff",.8)});ctx.fillStyle="#eef4fa";ctx.strokeStyle="#8a94a8";ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(9,0);ctx.lineTo(0,-2.2);ctx.lineTo(-5,0);ctx.lineTo(0,2.2);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle="#6b4a2a";ctx.fillRect(-9,-1,4,2);ctx.restore();return}if(l==="xstar"||l==="ystar"||l==="bigstar"||l==="jade"||l==="goldflame"){const e=time*(l==="bigstar"?16:22)+(t.phase||0);if(l==="jade"){lighter(()=>{ctx.globalAlpha=.35;ctx.strokeStyle="#e6f6ff";ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(-30,0);ctx.lineTo(-8,0);ctx.stroke();glow(3,0,6,"#e6f6ff",.5)});ctx.fillStyle="#f4fbff";ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(-4,-2.4);ctx.lineTo(-8,0);ctx.lineTo(-4,2.4);ctx.closePath();ctx.fill();ctx.restore();return}if(l==="goldflame"){lighter(()=>{for(let t=0;t<4;t++){ctx.globalAlpha=.7-t*.15;ctx.fillStyle=t?"#ff9a3c":"#ffd84a";ctx.beginPath();ctx.ellipse(-t*9,0,14-t*2,5-t,0,0,7);ctx.fill()}glow(4,0,18,"#ffc83a",1);glow(6,0,7,"#ffffff",1)});ctx.restore();return}ctx.rotate(e);const n=l==="bigstar",a=n?11:l==="ystar"?4.5:6.5,o=n?3.2:1.6,i=n?6:l==="ystar"?5:4,r=l==="ystar"?"#ffd84a":"#f4f8ff";lighter(()=>glow(0,0,n?20:10,l==="ystar"?"#ffc83a":"#dfe8ff",.85));ctx.fillStyle=r;ctx.strokeStyle=n?"#b8c4d8":"#ffffff";ctx.lineWidth=.8;ctx.beginPath();for(let t=0;t<i*2;t++){const e=t*Math.PI/i,n=t%2?o:a;ctx.lineTo(Math.cos(e)*n,Math.sin(e)*n)}ctx.closePath();ctx.fill();ctx.stroke();if(n){ctx.fillStyle="#8a94a8";ctx.beginPath();ctx.arc(0,0,2,0,7);ctx.fill()}ctx.restore();return}if(l==="frostbolt"){lighter(()=>{ctx.globalAlpha=.55;ctx.strokeStyle="#9fdcff";ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-46,0);ctx.lineTo(-10,0);ctx.stroke();glow(0,0,18,"#7fc8ff",.9)});const e=time*14+(t.phase||0);ctx.fillStyle="rgba(200,240,255,.95)";ctx.strokeStyle="#ffffff";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(16,0);ctx.lineTo(0,-5-Math.sin(e)*1.5);ctx.lineTo(-12,0);ctx.lineTo(0,5+Math.sin(e)*1.5);ctx.closePath();ctx.fill();ctx.stroke();ctx.save();ctx.translate(-4,0);ctx.rotate(e);ctx.strokeStyle="rgba(255,255,255,.9)";ctx.lineWidth=1.2;for(let t=0;t<3;t++){ctx.rotate(Math.PI/3);ctx.beginPath();ctx.moveTo(-7,0);ctx.lineTo(7,0);ctx.stroke()}ctx.restore();lighter(()=>glow(6,0,7,"#ffffff",1));ctx.restore();return}if(l==="greenbolt"){lighter(()=>{for(const t of[-6,0,6]){const e=ctx.createLinearGradient(-60,0,6,0);e.addColorStop(0,"rgba(140,230,90,0)");e.addColorStop(.7,"rgba(170,240,110,.9)");e.addColorStop(1,"#ffffff");ctx.strokeStyle=e;ctx.lineWidth=t?3:4.5;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(-60+Math.abs(t)*2,t);ctx.lineTo(6-Math.abs(t),t);ctx.stroke()}});glow(4,0,16,"#b8f08a",.9);glow(4,0,6,"#ffffff",1)}else if(l==="arrow"||l==="windarrow"||l==="goldarrow"||l==="flowerarrow"||l==="needle"||l==="icearrow"||l==="firearrow"||l==="poisonarrow"){const e=l==="goldarrow",n={icearrow:["#bfe8ff","#e8f8ff","#7fc8ff"],firearrow:["#ffb070","#fff0c0","#ff6a2a"],poisonarrow:["#b8f08a","#e0ffc8","#5ad04a"]}[l];lighter(()=>{ctx.globalAlpha=.5;ctx.strokeStyle=e?"#ffd24a":n?n[0]:i;ctx.lineWidth=n?3.6:3;ctx.beginPath();ctx.moveTo(-40,0);ctx.lineTo(-12,0);ctx.stroke()});if(l==="needle"){ctx.strokeStyle="#dfffd0";ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(-12,0);ctx.lineTo(4,0);ctx.stroke();glow(2,0,7,i,.9)}else if(n){r(18,2,"#e8dcc0",n[1]);glow(6,0,13,n[2],.95);lighter(()=>{glow(8,0,6,"#ffffff",.7)});if(l==="icearrow"){ctx.strokeStyle="rgba(220,245,255,.85)";ctx.lineWidth=1.1;for(const t of[-1,1]){ctx.beginPath();ctx.moveTo(6,0);ctx.lineTo(1,t*5);ctx.moveTo(2,0);ctx.lineTo(-3,t*4);ctx.stroke()}}else if(l==="firearrow"){const e=Math.sin(time*30+(t.phase||0));lighter(()=>{ctx.fillStyle="rgba(255,140,50,.75)";ctx.beginPath();ctx.moveTo(10,0);ctx.quadraticCurveTo(0,-6-e*2,-14,0);ctx.quadraticCurveTo(0,6+e*2,10,0);ctx.fill()})}else{ctx.fillStyle="rgba(120,220,90,.85)";ctx.beginPath();ctx.arc(4,2.5,1.6,0,7);ctx.arc(-4,-2.5,1.3,0,7);ctx.fill()}}else{r(18,2,"#e8dcc0",e?"#ffd24a":"#dfe6ec");glow(5,0,e?12:7,e?"#ffd24a":i,.9)}if(l==="windarrow"){ctx.strokeStyle="rgba(224,244,255,.7)";ctx.lineWidth=1.2;for(let t=0;t<3;t++){ctx.beginPath();ctx.ellipse(-8-t*9,0,3,6-t,0,0,7);ctx.stroke()}}}else if(l==="phoenixarrow"){const e=Math.sin(time*26+(t.phase||0));lighter(()=>{const t=ctx.createLinearGradient(-46,0,0,0);t.addColorStop(0,"rgba(255,120,40,0)");t.addColorStop(1,"rgba(255,210,74,.85)");ctx.strokeStyle=t;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-46,0);ctx.lineTo(-6,0);ctx.stroke();for(const t of[-1,1]){ctx.fillStyle=t<0?"rgba(255,154,60,.75)":"rgba(255,210,74,.75)";ctx.beginPath();ctx.moveTo(-4,0);ctx.quadraticCurveTo(-12,t*(10+e*4),-26,t*(13+e*5));ctx.quadraticCurveTo(-18,t*5,-14,0);ctx.closePath();ctx.fill()}for(let t=0;t<3;t++){ctx.strokeStyle=`rgba(255,${180-t*40},60,${.7-t*.2})`;ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(-18,0);ctx.quadraticCurveTo(-30-t*4,(t-1)*7,-40-t*5,(t-1)*10+e*2);ctx.stroke()}});r(16,2.2,"#f8e6b0","#ffe27a");glow(6,0,16,"#ffd24a",1);glow(6,0,6,"#ffffff",1)}else if(l==="bigarrow"){glow(0,0,26,"#e0f4ff",.8);ctx.scale(1.9,1.9);r(20,2.4,"#fff6e0","#ffffff");ctx.strokeStyle="rgba(224,244,255,.8)";ctx.lineWidth=1;for(let t=0;t<4;t++){ctx.beginPath();ctx.ellipse(-6-t*6,0,2.5,5+Math.sin(time*20+t)*1.5,0,0,7);ctx.stroke()}}else if(l==="spear"){lighter(()=>{ctx.globalAlpha=.6;ctx.strokeStyle="#ffd24a";ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-50,0);ctx.lineTo(-10,0);ctx.stroke()});ctx.strokeStyle="#6a4a2a";ctx.lineWidth=2.6;ctx.beginPath();ctx.moveTo(-28,0);ctx.lineTo(6,0);ctx.stroke();ctx.fillStyle="#eef4fa";ctx.beginPath();ctx.moveTo(16,0);ctx.lineTo(6,-3.5);ctx.lineTo(6,3.5);ctx.closePath();ctx.fill();ctx.fillStyle="#c8352a";ctx.beginPath();ctx.moveTo(6,0);ctx.lineTo(1,-4);ctx.lineTo(1,4);ctx.fill();glow(10,0,14,"#ffd24a",.9)}else if(l==="shard"){glow(0,0,16,i,.8);const t=ctx.createLinearGradient(-12,0,14,0);t.addColorStop(0,"rgba(150,210,255,.4)");t.addColorStop(1,"#ffffff");ctx.fillStyle=t;ctx.beginPath();ctx.moveTo(14,0);ctx.lineTo(2,-5);ctx.lineTo(-12,0);ctx.lineTo(2,5);ctx.closePath();ctx.fill();ctx.strokeStyle="#ffffff";ctx.lineWidth=.8;ctx.stroke()}else if(l==="crescent"){for(let t=3;t>=0;t--)crescent(-t*9,0,14,0,-1.3,1.3,i,t?.25:.95,1);glow(4,0,16,i,.7)}else if(l==="fireball"){ctx.rotate(-o);for(let t=1;t<=5;t++)glow(-Math.cos(o)*t*7,-Math.sin(o)*t*5,16-t*2,"#ff5a1e",.55);glow(0,0,24,"#ff7a2e",1);glow(0,0,12,"#ffd24a",1);glow(0,0,6,"#ffffff",1)}else if(l==="palm"){ctx.rotate(-o);for(let t=1;t<=4;t++)glow(-Math.cos(o)*t*8,-Math.sin(o)*t*6,14-t*2,"#ff5a1e",.5);ctx.rotate(o+Math.PI/2);drawPalm(0,0,.55,"#ff9a3c",1)}else if(l==="lunar"){ctx.rotate(-o);for(let t=1;t<=5;t++)glow(-Math.cos(o)*t*7,-Math.sin(o)*t*5,13-t*1.8,t%2?"#ffb8e4":"#b8c8ff",.45);ctx.rotate(o+time*10);glow(0,0,22,i,.9);ctx.save();ctx.beginPath();ctx.rect(-20,-20,40,40);ctx.arc(4.5,-2.5,8.5,0,7);ctx.clip("evenodd");const t=ctx.createLinearGradient(-10,-10,10,10);t.addColorStop(0,"#ffffff");t.addColorStop(.5,"#ffe0f6");t.addColorStop(1,i);ctx.fillStyle=t;ctx.beginPath();ctx.arc(0,0,10,0,7);ctx.fill();ctx.restore()}else if(l==="moon"){ctx.rotate(-o);glow(0,0,26,"#e6e0ff",.9);ctx.fillStyle="#f6f2ff";ctx.beginPath();ctx.arc(0,0,8,0,7);ctx.fill();ctx.fillStyle="rgba(170,160,220,.4)";ctx.beginPath();ctx.arc(2.5,-2,2,0,7);ctx.fill();ctx.strokeStyle="rgba(230,224,255,.7)";ctx.lineWidth=1.2;ctx.beginPath();ctx.ellipse(0,0,14,5,time*4,0,7);ctx.stroke()}else{ctx.rotate(-o);for(let t=1;t<=4;t++)glow(-Math.cos(o)*t*6,-Math.sin(o)*t*4,10-t*1.5,i,.5);glow(0,0,(t.r||5)*3.2,i,1);glow(0,0,(t.r||5)*1.2,"#ffffff",1)}ctx.restore();ctx.globalAlpha=1}

  // 4. BỘ QUẢN LÝ HIỆU ỨNG CHIÊU THỨC 2D TRÊN MÀN HÌNH 3D
  const activeFxList = [];
  const activeProjList = [];
  const trapMarks3D = new Set();
  let fxCanvas = null;
  let fxDpr = 1;

  // Particle, ground decal, area-hit and impact behavior ported from the current 2.5D frame loop.
  let parts = [], decals = [], shakeA = 0;
  const fx = activeFxList;
  const rand = (min, max) => min + Math.random() * (max - min);
  const rnd = value => rand(-value, value);
  const pick = values => values[Math.floor(Math.random() * values.length)];
  const lowFx = () => !!window.SAFE_MODE;
  function sfx() {}
  function addFx(record) { record.t = 0; activeFxList.push(record); return record; }

  function emit(t,e,n,a,o={}){const i=lowFx()?240:520;if(parts.length>=i)parts.splice(0,parts.length-i+1);parts.push({kind:t,x:e,y:n,h:a,vx:o.vx||0,vy:o.vy||0,vh:o.vh||0,g:o.g||0,drag:o.drag||0,life:o.life||.6,t:0,size:o.size||3,col:o.col||"#ffffff",rot:rand(0,6.3),vr:o.vr??rand(-8,8),to:o.to||null})}

function burst(t,e,n,a,o,i){for(let l=0;l<o;l++)emit(t,e,n,a,i(l))}

function addShake(t){}

function updateParts(t){for(let e=parts.length-1;e>=0;e--){const n=parts[e];n.t+=t;if(n.t>=n.life){parts.splice(e,1);continue}if(n.to){const a=n.to.x-n.x,o=n.to.y-n.y,i=Math.hypot(a,o),l=Math.min(i,t*(3+n.t*14));if(i<.2){parts.splice(e,1);continue}n.x+=a/i*l;n.y+=o/i*l;n.h+=(36-n.h)*Math.min(1,t*5);continue}const a=Math.max(0,1-n.drag*t);n.vx*=a;n.vy*=a;n.vh=n.vh*a-n.g*t;n.x+=n.vx*t;n.y+=n.vy*t;n.h+=n.vh*t;n.rot+=n.vr*t;if(n.h<0){if(n.kind==="rock"||n.kind==="shard"){n.h=0;n.vh=-n.vh*.35;n.vx*=.55;n.vy*=.55;n.vr*=.5}else{n.h=0;n.vh=0}}}for(let e=decals.length-1;e>=0;e--){decals[e].t+=t;if(decals[e].t>decals[e].life)decals.splice(e,1)}shakeA*=Math.exp(-t*9);if(shakeA<.2)shakeA=0}

function drawParts(){for(const t of parts){const e=scrGround(t.x,t.y),n=e.x,a=e.y-t.h,o=t.t/t.life,i=1-o;switch(t.kind){case"spark":glow(n,a,t.size*3*(1-o*.4),t.col,i);break;case"ember":glow(n,a,t.size*2.8,t.col,i*1.1);glow(n,a,t.size*.8,"#ffffff",i*.7);break;case"orb":glow(n,a,t.size*3.2,t.col,.95);glow(n,a,t.size,"#ffffff",.9);break;case"snow":glow(n,a,t.size*2,"#e8f6ff",i);break;case"flake":{const e=Math.min(1,t.t*6)*(o<.6?1:(1-o)/.4);glow(n,a,t.size*2.4,"#7fa8ff",e*.45);ctx.save();ctx.translate(n,a);ctx.rotate(t.rot);ctx.globalAlpha=e*.9;ctx.strokeStyle="#dfeaff";ctx.lineWidth=1;const i=t.size;ctx.beginPath();for(let t=0;t<3;t++){const e=t*Math.PI/3;ctx.moveTo(-Math.cos(e)*i,-Math.sin(e)*i);ctx.lineTo(Math.cos(e)*i,Math.sin(e)*i)}ctx.stroke();ctx.globalAlpha=1;ctx.restore();break}case"star":{glow(n,a,t.size*2.6,t.col,i);ctx.save();ctx.globalCompositeOperation="lighter";ctx.globalAlpha=i;ctx.fillStyle="#fff";ctx.translate(n,a);ctx.rotate(t.rot);const e=t.size*2.3;ctx.beginPath();for(let t=0;t<8;t++){const n=t%2?e*.22:e,a=t*Math.PI/4;ctx.lineTo(Math.cos(a)*n,Math.sin(a)*n)}ctx.closePath();ctx.fill();ctx.restore();break}case"smoke":ctx.globalAlpha=.3*i;ctx.fillStyle="#3a3430";ctx.beginPath();ctx.arc(n,a,t.size*(1+o*1.6),0,7);ctx.fill();ctx.globalAlpha=1;break;case"dust":ctx.globalAlpha=.34*i;ctx.fillStyle="#b89a70";ctx.beginPath();ctx.ellipse(n,a,t.size*(1+o*2),t.size*(.55+o),0,0,7);ctx.fill();ctx.globalAlpha=1;break;case"mist":ctx.globalAlpha=.24*Math.sin(Math.PI*o);ctx.fillStyle=t.col;ctx.beginPath();ctx.arc(n,a,t.size*(1+o*1.2),0,7);ctx.fill();ctx.globalAlpha=1;break;case"bubble":ctx.globalAlpha=i;ctx.strokeStyle=t.col;ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(n,a,t.size*(.6+o*.6),0,7);ctx.fillStyle=hexA(t.col,.25);ctx.fill();ctx.stroke();ctx.globalAlpha=1;break;case"petal":case"leaf":ctx.save();ctx.globalAlpha=Math.min(1,i*1.6);ctx.translate(n,a);ctx.rotate(t.rot);ctx.scale(1,.55+.45*Math.sin(t.rot*2));ctx.fillStyle=t.col;ctx.beginPath();ctx.ellipse(0,0,t.size,t.size*.45,0,0,7);ctx.fill();ctx.restore();break;case"rock":ctx.save();ctx.globalAlpha=Math.min(1,i*2.2);ctx.translate(n,a);ctx.rotate(t.rot);ctx.fillStyle=t.col;ctx.beginPath();ctx.moveTo(-t.size,0);ctx.lineTo(-t.size*.3,-t.size*.9);ctx.lineTo(t.size,-t.size*.2);ctx.lineTo(t.size*.4,t.size*.8);ctx.closePath();ctx.fill();ctx.fillStyle="rgba(255,255,255,.2)";ctx.fillRect(-t.size*.4,-t.size*.6,t.size*.6,t.size*.3);ctx.restore();break;case"shard":ctx.save();ctx.globalAlpha=Math.min(1,i*1.8);ctx.translate(n,a);ctx.rotate(t.rot);ctx.fillStyle=t.col;ctx.beginPath();ctx.moveTo(0,-t.size*1.5);ctx.lineTo(t.size*.55,0);ctx.lineTo(0,t.size*1.5);ctx.lineTo(-t.size*.55,0);ctx.closePath();ctx.fill();ctx.strokeStyle="rgba(255,255,255,.85)";ctx.lineWidth=.8;ctx.stroke();ctx.restore();break;case"drop":ctx.globalAlpha=i;ctx.fillStyle=t.col;ctx.beginPath();ctx.arc(n,a,t.size,0,7);ctx.fill();ctx.globalAlpha=1;break;case"streak":{const e=scr(t.x-t.vx*.06,t.y-t.vy*.06);ctx.globalCompositeOperation="lighter";ctx.globalAlpha=i;ctx.strokeStyle=t.col;ctx.lineWidth=t.size;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(e.x,e.y-t.h+t.vh*.06);ctx.lineTo(n,a);ctx.stroke();ctx.globalCompositeOperation="source-over";ctx.globalAlpha=1;break}}}}

function addDecal(t,e,n,a,o=3,i){if(decals.length>40)decals.shift();const l=mulberry32(Math.random()*1e9|0),r=[];if(t==="crack"){const t=7+Math.floor(l()*4);for(let e=0;e<t;e++){const n=e/t*6.283+l()*.5,o=a*(.55+l()*.55),i=[[0,0]];for(let t=1;t<=4;t++){const e=o*t/4,a=n+(l()-.5)*.6;i.push([Math.cos(a)*e,Math.sin(a)*e])}r.push(i)}}decals.push({kind:t,x:e,y:n,r:a,t:0,life:o,lines:r,col:i})}

function drawDecals(){for(const t of decals){const e=scrGround(t.x,t.y),n=Math.min(1,(t.life-t.t)/.8)*Math.min(1,t.t*10);if(t.kind==="crack"){const a=t=>{ctx.beginPath();t.forEach(([t,n],a)=>{const o=e.x+(t-n)*TW/2,i=e.y+(t+n)*TH/2;a?ctx.lineTo(o,i):ctx.moveTo(o,i)});ctx.stroke()};ctx.globalAlpha=n*.85;ctx.strokeStyle="#1e140c";ctx.lineWidth=2.6;ctx.lineCap="round";t.lines.forEach(a);ctx.strokeStyle=hexA(t.col||"#ffb060",.55);ctx.lineWidth=1;ctx.globalAlpha=n*Math.max(0,1-t.t/1.2);t.lines.forEach(a);ctx.globalAlpha=1}else{const a={scorch:"rgba(25,12,6,",frost:"rgba(205,238,255,",poison:"rgba(90,170,50,"}[t.kind]||"rgba(0,0,0,";ctx.save();ctx.translate(e.x,e.y);ctx.scale(1,.5);const o=t.r*TW/2;const i=ctx.createRadialGradient(0,0,0,0,0,o);i.addColorStop(0,a+.5*n+")");i.addColorStop(.7,a+.25*n+")");i.addColorStop(1,a+"0)");ctx.fillStyle=i;ctx.beginPath();ctx.arc(0,0,o,0,7);ctx.fill();ctx.restore()}}}

function areaHit(t){const e=t.follow?player.x:t.x,n=t.follow?player.y:t.y,a=t.r,o=lowFx(),i=["#8a7a5a","#6a5a40","#a8946a"],l=["#ffb347","#ff7a2e","#ffd24a","#ff5a1e"];const r=(t,a,o)=>burst(t,e,n,4,a,t=>{const e=t/a*6.283+rnd(.2);return o(e)});switch(t.type){case"quake":case"palm":case"erupt":addDecal("crack",e,n,a*.9,3,t.color);r("rock",o?7:16,t=>({vx:Math.cos(t)*rand(.6,2.2),vy:Math.sin(t)*rand(.6,2.2),vh:rand(80,190),g:420,life:rand(.7,1.1),size:rand(2,4.5),col:pick(i)}));r("dust",o?6:12,t=>({vx:Math.cos(t)*rand(1,2.6),vy:Math.sin(t)*rand(1,2.6),drag:2,life:rand(.6,1),size:rand(6,11)}));break;case"meteor":case"flames":addDecal("scorch",e,n,a,3.5);r("ember",o?12:26,t=>({vx:Math.cos(t)*rand(.5,2.6),vy:Math.sin(t)*rand(.5,2.6),vh:rand(40,170),g:120,drag:.8,life:rand(.5,1),size:rand(1.5,3.5),col:pick(l)}));burst("smoke",e,n,24,o?4:9,()=>({vx:rnd(.7),vy:rnd(.7),vh:rand(20,50),life:rand(.9,1.5),size:rand(8,14)}));break;case"nova":case"icenova":case"pillar":case"blizzard":addDecal("frost",e,n,a,3);r("shard",o?8:18,t=>({vx:Math.cos(t)*rand(1.5,3),vy:Math.sin(t)*rand(1.5,3),vh:rand(30,100),g:260,life:rand(.5,.9),size:rand(2,3.5),col:pick(["#dff4ff","#bfe6ff","#9fd3ff"])}));break;case"cloud":addDecal("poison",e,n,a,2.2);break;case"sweep":r("dust",o?6:12,t=>({vx:Math.cos(t)*rand(1.5,3),vy:Math.sin(t)*rand(1.5,3),drag:2.5,life:rand(.5,.8),size:rand(5,9)}));break;case"moon":r("star",o?6:12,t=>({vx:Math.cos(t)*rand(.5,1.5),vy:Math.sin(t)*rand(.5,1.5),vh:rand(20,80),drag:1,life:rand(.6,1),size:rand(1.5,2.6),col:"#e6e0ff"}));break}if(t.shake)addShake(t.shake)}

function fxEmit(t){const e=lowFx()?.5:1;for(const n of fx){if(!n.emitT&&n.emitT!==0)continue;n.emitT+=t*e;const a=n.follow?player.x:n.x,o=n.follow?player.y:n.y,i=n.r||1;const l=(t,e)=>{while(n.emitT>1/t){n.emitT-=1/t;e()}};if(n.type==="swordfall"&&n.items){const t=n.t/n.dur,e=.22/n.dur;for(const i of n.items)if(!i.hit&&t>=i.delay+e){i.hit=true;const t=a+i.dx,e=o+i.dy;burst("spark",t,e,2,lowFx()?6:12,()=>{const t=rand(0,6.283),e=rand(1.6,3.2);return{vx:Math.cos(t)*e,vy:Math.sin(t)*e,vh:rand(10,70),g:200,drag:1.5,life:rand(.25,.55),size:rand(1.2,2.4),col:pick(["#ffffff","#fff2b0","#ffd860"])}});sfx("hit",.35,{x:t,y:e})}}if((n.type==="thunder"||n.type==="thunder9")&&n.items){const t=n.t/n.dur,e=n.type==="thunder9"?.3/n.dur:0;for(const i of n.items)if(!i.hit&&t>=i.delay+e){i.hit=true;const t=a+i.dx,e=o+i.dy;burst("spark",t,e,4,lowFx()?5:10,()=>({vx:rnd(2),vy:rnd(2),vh:rand(60,160),g:300,life:rand(.25,.5),size:rand(1.2,2.4),col:pick(["#ffffff",n.type==="thunder9"?"#fff6c8":"#e0d0ff",n.color])}));if(n.type==="thunder9"){burst("ember",t,e,6,lowFx()?2:5,()=>{const t=rand(0,6.28),e=rand(1,2.2);return{vx:Math.cos(t)*e,vy:Math.sin(t)*e,vh:rand(50,120),g:420,drag:1,life:rand(.3,.55),size:rand(1.2,2.2),col:pick(["#fff6c8","#ffe27a","#ffffff"])}})}addDecal("scorch",t,e,.5,1.5);sfx("zap",.5,{x:t,y:e})}}switch(n.type){case"taichi":l(30,()=>{const t=rand(0,6.28),e=rand(.2,i*.8);emit("spark",a+Math.cos(t)*e,o+Math.sin(t)*e,rand(2,10),{vx:-Math.sin(t)*2,vy:Math.cos(t)*2,vh:rand(60,130),drag:1.5,life:rand(.5,.9),size:rand(1.2,2.2),col:pick(["#ffffff",n.color])})});break;case"tornado":l(50,()=>{const t=rand(0,6.28),e=rand(.2,i*.8);emit(Math.random()<.3?"leaf":"streak",a+Math.cos(t)*e,o+Math.sin(t)*e,rand(5,90),{vx:-Math.sin(t)*5,vy:Math.cos(t)*5,vh:rand(40,120),drag:2,life:rand(.3,.6),size:rand(1.4,3),col:Math.random()<.5?"#cfe8c0":"#a8b890"})});break;case"whirl":l(40,()=>{const t=rand(0,6.28),e=rand(.4,i);emit(n.item==="petal"?"petal":n.snow?"snow":"streak",a+Math.cos(t)*e,o+Math.sin(t)*e,rand(5,50),{vx:-Math.sin(t)*4,vy:Math.cos(t)*4,vh:rand(20,60),drag:2,life:rand(.3,.6),size:n.item==="petal"?rand(2.5,4):rand(1,2),col:n.item==="petal"?pick(["#f7b8d8","#ffd6ec"]):n.color})});break;case"cloud":l(16,()=>{const t=pick(n.items);emit(Math.random()<.6?"bubble":"mist",a+t.dx,o+t.dy,rand(2,20),{vh:rand(15,40),life:rand(.6,1.1),size:rand(2,5)*(Math.random()<.6?1:3),col:"#8fe06a"})});break;case"flames":l(36,()=>{const t=pick(n.items);emit("ember",a+t.dx+rnd(.2),o+t.dy+rnd(.2),rand(10,40),{vx:rnd(.3),vy:rnd(.3),vh:rand(60,140),drag:.5,life:rand(.4,.8),size:rand(1.5,3),col:pick(["#ffb347","#ff7a2e","#ffd24a"])})});break;case"firewheel":l(40,()=>{const t=rand(0,6.28),e=i*.8;emit("ember",a+Math.cos(t)*e,o+Math.sin(t)*e,rand(5,30),{vx:-Math.sin(t)*2,vy:Math.cos(t)*2,vh:rand(40,100),drag:1,life:rand(.3,.6),size:rand(1.5,3),col:pick(["#ffb347","#ff7a2e","#ffd24a"])})});break;case"blizzard":l(50,()=>{const t=rand(0,6.28),e=Math.sqrt(Math.random())*i;emit("snow",a+Math.cos(t)*e-.6,o+Math.sin(t)*e-.6,rand(90,150),{vx:.9,vy:.9,vh:-rand(90,140),life:rand(.8,1.2),size:rand(1.2,2.4)})});break;case"lotus":l(30,()=>{const t=rand(0,6.28),e=Math.sqrt(Math.random())*i*.8;emit("petal",a+Math.cos(t)*e,o+Math.sin(t)*e,rand(5,30),{vx:Math.cos(t)*.6,vy:Math.sin(t)*.6,vh:rand(40,90),drag:1.2,life:rand(.7,1.1),size:rand(2.5,4),col:pick(["#ffd6ec","#ff9ad2","#ffffff"])})});break;case"silk":l(28,()=>{const t=rand(0,6.28),e=rand(.4,i);emit("petal",a+Math.cos(t)*e,o+Math.sin(t)*e,rand(10,40),{vx:-Math.sin(t)*3,vy:Math.cos(t)*3,vh:rand(20,50),drag:2,life:rand(.4,.7),size:rand(2.2,3.4),col:pick(["#ff9ad8","#c8a0ff","#9ae0ff"])})});break;case"moonring":l(22,()=>{const t=rand(0,6.28),e=Math.sqrt(Math.random())*i;emit("star",a+Math.cos(t)*e,o+Math.sin(t)*e,rand(5,40),{vh:rand(30,80),life:rand(.6,1),size:rand(1.2,2.2),col:pick(["#ffffff","#d0dcff","#ffc0e8"])})});break;case"moon":if(n.t>.25)l(18,()=>{const t=rand(0,6.28),e=Math.sqrt(Math.random())*i;emit("star",a+Math.cos(t)*e,o+Math.sin(t)*e,rand(60,130),{vh:-rand(40,90),life:rand(.8,1.2),size:rand(1.2,2.2),col:"#e6e0ff"})});break;case"twindragon":l(45,()=>{const t=rand(0,6.28),e=i*rand(.45,.75);emit("ember",a+Math.cos(t)*e,o+Math.sin(t)*e*.5,rand(4,16),{vx:rand(-.3,.3),vy:rand(-.3,.3),vh:rand(8,22),drag:2,life:rand(.6,1.1),size:rand(1,2.2),col:pick(["#ffd700","#ffffe0","#ffe58a"])})});break;case"snakes":l(20,()=>{const t=rand(0,6.28);emit("mist",a+Math.cos(t)*i*.6,o+Math.sin(t)*i*.6,rand(5,20),{life:rand(.6,1),size:rand(6,10),col:"#6fcf4a"})});break;case"circle":l(18,()=>{const t=rand(0,6.28);emit("spark",a+Math.cos(t)*.7,o+Math.sin(t)*.7,2,{vh:rand(40,90),life:rand(.4,.7),size:rand(1.2,2),col:n.color})});break;case"meteor":if(n.t<n.dur*.33)l(60,()=>{const t=n.t/(n.dur*.33);emit("ember",a-2.2*(1-t)-rnd(.2),o-2.2*(1-t),200*(1-t)+10,{vx:rnd(.5),vy:rnd(.5),vh:rand(-10,30),life:rand(.3,.6),size:rand(2,4),col:pick(["#ffb347","#ff7a2e","#ffd24a"])})});break;default:n.emitT=0}if(n.hitAt!=null&&!n.hitDone&&n.follow&&n.t>=n.hitAt){n.hitDone=true}if(n.items&&n.type==="icerain"){for(const t of n.items){if(!t.landed&&n.t>=t.delay+1.1){t.landed=true;if(!lowFx()||Math.random()<.5)burst("spark",a+t.dx,o+t.dy,4,5,()=>({vx:rnd(1.4),vy:rnd(1.4),vh:rand(20,80),g:110,life:rand(.25,.55),size:rand(1.2,2.2),col:pick(["#dfeaff","#9fb8ff","#ffffff"])}))}}}if(n.items&&n.type==="rain"){for(const t of n.items){if(!t.landed&&n.t>=t.delay+.28){t.landed=true;const e=n.item==="petal"?"petal":n.item==="blade"?"blood":"spark";if(!lowFx()||Math.random()<.5)burst(e==="spark"?"spark":e==="petal"?"petal":"spark",a+t.dx,o+t.dy,4,3,()=>({vx:rnd(1.2),vy:rnd(1.2),vh:rand(20,70),g:120,life:rand(.25,.5),size:rand(1.5,2.5),col:e==="petal"?"#ffd6ec":n.color}))}}}}}

function impact(t,e,n,a){sfx(a?"crit":"hit",a?.9:.6,{x:e,y:n});t=t||"spark";const o=(a?1.5:1)*(lowFx()?.55:1),i=t=>Math.max(1,Math.round(t*o)),l=IMPACT_COLOR[t]||"#ffffff",r=t=>({vx:rnd(t),vy:rnd(t)});if(!(typeof FOES!=="undefined"&&FOES.some(t=>t&&t.noFlashU>time&&Math.abs(t.x-e)<.8&&Math.abs(t.y-n)<.8)))addFx({type:"flash",x:e,y:n,dur:.24,color:l,r:a?36:24});const c=["#ffb347","#ff7a2e","#ffd24a","#ff5a1e"],s=["#8a7a5a","#6a5a40","#a8946a"];switch(t){case"fire":burst("ember",e,n,28,i(12),()=>({...r(1.8),vh:rand(30,110),g:90,drag:1,life:rand(.4,.8),size:rand(1.5,3),col:pick(c)}));burst("smoke",e,n,34,i(4),()=>({...r(.4),vh:rand(20,40),life:rand(.7,1.1),size:rand(5,8)}));break;case"ice":burst("shard",e,n,28,i(8),()=>({...r(2),vh:rand(40,120),g:300,life:rand(.5,.9),size:rand(2,3.5),col:pick(["#dff4ff","#bfe6ff","#9fd3ff"]),vr:rnd(10)}));burst("snow",e,n,28,i(8),()=>({...r(1.2),vh:rand(10,50),g:20,drag:1.5,life:rand(.6,1),size:rand(1.2,2.2)}));break;case"poison":burst("bubble",e,n,22,i(8),()=>({...r(.6),vh:rand(20,60),life:rand(.6,1.1),size:rand(2,4),col:"#8fe06a"}));burst("mist",e,n,22,i(3),()=>({...r(.3),vh:rand(5,15),life:rand(.8,1.2),size:rand(8,12),col:"#6fcf4a"}));break;case"petal":burst("petal",e,n,30,i(10),()=>({...r(1.6),vh:rand(20,80),g:40,drag:1.5,life:rand(.8,1.3),size:rand(2.5,4),col:pick(["#f7b8d8","#ffd6ec","#ffffff"])}));burst("spark",e,n,30,i(5),()=>({...r(1.2),vh:rand(10,60),life:.4,size:2,col:"#ffd6ec"}));break;case"blood":burst("drop",e,n,28,i(10),()=>({...r(1.8),vh:rand(30,100),g:320,life:rand(.4,.8),size:rand(1.2,2.4),col:pick(["#c8201a","#e0302a","#8a1010"])}));break;case"gold":burst("spark",e,n,30,i(12),()=>({...r(2.4),vh:rand(20,120),g:120,drag:1,life:rand(.3,.6),size:rand(1.5,2.5),col:pick(["#ffd24a","#ffe8a0","#ffffff"])}));burst("star",e,n,36,i(2),()=>({...r(.5),vh:rand(20,40),life:.5,size:3,col:"#ffd24a"}));break;case"rock":case"dust":burst("rock",e,n,6,i(t==="rock"?7:3),()=>({...r(1.8),vh:rand(60,140),g:380,life:rand(.6,1),size:rand(1.8,3.5),col:pick(s)}));burst("dust",e,n,3,i(5),()=>({...r(.9),life:rand(.5,.9),size:rand(5,9)}));break;case"leaf":burst("leaf",e,n,28,i(9),()=>({...r(1.6),vh:rand(20,80),g:40,drag:1.5,life:rand(.8,1.2),size:rand(2.5,4),col:pick(["#8fd060","#a6e07a","#5f9a3a"])}));break;case"wind":burst("streak",e,n,28,i(9),()=>({...r(3.5),vh:rnd(60),drag:3,life:rand(.25,.45),size:rand(1,2),col:"#e0f4ff"}));break;case"ring":addFx({type:"goldring",x:e,y:n,dur:.5,color:"#ffe04a"});burst("spark",e,n,28,i(8),()=>({...r(2),vh:rand(20,90),g:120,drag:1,life:rand(.3,.5),size:rand(1.5,2.4),col:pick(["#9fe07a","#ffe04a","#ffffff"])}));break;case"moon":burst("star",e,n,32,i(6),()=>({...r(1.4),vh:rand(10,70),drag:1,life:rand(.5,.9),size:rand(1.5,2.6),col:"#e6e0ff"}));break;default:burst("spark",e,n,28,i(10),()=>({...r(2.6),vh:rand(20,110),g:150,drag:1,life:rand(.25,.5),size:rand(1.2,2.2),col:pick(["#fff2c0","#ffffff",l])}))}}

  function emitSkillImpactFx(skill, target, critical = false) {
    const vDef = getSkillVfx(skill);
    const pos = target && target.group ? target.group.position : target && target.mesh ? target.mesh.position : target;
    if (!pos || !vDef || !vDef.impact) return;
    impact(vDef.impact, pos.x, pos.z == null ? pos.y : pos.z, critical);
  }
  window.emitSkillImpactFx = emitSkillImpactFx;


  function initFx2DCanvas() {
    if (fxCanvas) return;
    fxCanvas = document.createElement("canvas");
    fxCanvas.id = "fx2dCanvas";
    fxCanvas.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9;";
    document.body.appendChild(fxCanvas);

    function resize() {
      fxDpr = Math.min(window.devicePixelRatio || 1, 2);
      fxCanvas.width = Math.round(window.innerWidth * fxDpr);
      fxCanvas.height = Math.round(window.innerHeight * fxDpr);
      ctx = fxCanvas.getContext("2d");
      ctx.setTransform(fxDpr, 0, 0, fxDpr, 0, 0);
    }
    window.addEventListener("resize", resize);
    resize();
    ctx = fxCanvas.getContext("2d");
  }

  const AREA_DUR = { goldring: .85, soundwave: .78, icerain: 8.6, tdvc: 1, twindragon: 1.3, lotus: 1.1, silk: .9, moonring: 1.2, taichi: 1.4, halo: .7, thunder: 1.6, tornado: 1.3, whirl: .75, sweep: .5, quake: .8, nova: .65, icenova: .95, rain: .95, cloud: 1.8, moon: 1.3, palm: 1, meteor: 1.05, flames: 1.3, pillar: 1.1, blizzard: 1.4, firewheel: .85, snakes: .9, erupt: 1 };
  const IMPACT_COLOR = { ring: "#b8f08a", spark: "#fff2c0", wind: "#e0f4ff", fire: "#ff9a3c", ice: "#bfe6ff", poison: "#8fe06a", petal: "#f7b8d8", blood: "#ff4a3a", gold: "#ffd24a", rock: "#d8b070", leaf: "#a6e07a", moon: "#e6e0ff", dust: "#e0c090" };
  const IMPACT_FX = { ring: "ring", spark: "flash", wind: "galepuff", fire: "flames", ice: "icenova", poison: "cloud", petal: "lotus", blood: "burst", gold: "goldring", rock: "quake", leaf: "whirl", moon: "moonring", dust: "burst" };

  function getSkillVfx(skill) {
    const name = skill && skill.name;
    const known = window.VFX && (window.VFX[name] || window.VFX[window.VFX_ALIAS && window.VFX_ALIAS[name]]);
    if (known) return known;

    const faction = window.FACTION_SKILLS && window.FACTION_SKILLS[window.hero && window.hero.faction];
    let element = String(faction && (faction.elKey || faction.element) || "tho").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase();
    if (element.startsWith("thuy")) element = "thuy";
    else if (element.startsWith("hoa")) element = "hoa";
    else if (element.startsWith("moc")) element = "moc";
    else if (element.startsWith("kim")) element = "kim";
    else element = "tho";
    const impact = { kim: "spark", moc: "leaf", thuy: "ice", hoa: "fire", tho: "dust" }[element];
    const color = skill && skill.color || "#ffd24a";
    const weapon = skill && skill.rwpn || faction && faction.look && faction.look.weapon || "sword";
    const poseByWeapon = { fist: "punch", spear: "thrust", bow: "bow", dagger: "throw", dart: "throw", qin: "cast", ribbon: "twirl", mace: "chop", staff: "thrust", sword: "slash", blade: "slash", saber: "slash" };
    const technique = /chưởng|chỉ|quyền/i.test(skill && skill.name || "");
    const pose = skill && skill.type === "melee" ? (poseByWeapon[weapon] || "slash") : skill && skill.type === "aoeSelf" ? (technique ? "cast" : "spin") : weapon === "bow" ? "bow" : "cast";
    const vfx = { pose, impact };
    if (skill && skill.trap) vfx.pose = "throw";
    if (skill && skill.type === "melee") {
      vfx.melee = { t: weapon === "fist" ? "fist" : weapon === "spear" || weapon === "staff" ? "thrust" : "arcs", n: 1, col: color, r: 22 };
    } else if (skill && ["proj", "wave", "homing", "multi"].includes(skill.type)) {
      vfx.p = skill.pstyle || ({ kim: "flydagger", moc: "greenbolt", thuy: "shard", hoa: "fireball", tho: "spear" }[element]);
    } else if (skill && skill.kind === "curse") {
      vfx.p = "jade";
    }
    if (skill && skill.kind === "heal") vfx.area = { t: "lotus", col: skill.color || "#a8f0bc", dur: 1.1 };
    if (skill && (skill.kind === "buff" || skill.kind === "heal" || skill.kind === "curse" || pose === "cast" || pose === "punch" || technique)) vfx.cast = 1;
    // Các chiêu không có entry VFX riêng trong 2.5D dùng field theo style khai báo của chính chiêu.
    if (skill && skill.style) vfx.field = skill.style;
    return vfx;
  }

  function pushImpactFx(vDef, skill, x, z) {
    const style = vDef && vDef.impact;
    if (!style) return;
    impact(style, x, z, false);
  }

  function pushMeleeFx(vDef, skill, startPos, targetPos) {
    const melee = vDef.melee || { t: "arcs", n: Math.max(1, Number(skill.combo) || 1), col: skill.color };
    const from = scr(startPos.x, startPos.z);
    const to = scr(targetPos.x, targetPos.z);
    const type = melee.t || "arcs";
    const durations = { arcs: .3 + .1 * (melee.n || 1), thrust: .34, fist: .16 * (melee.n || 1) + .2, smash: .45, cleave: .5, fang: .38, beast: .55, ribbon: .5, spiral: .6 };
    activeFxList.push({
      type, x: targetPos.x, y: targetPos.z, sx: startPos.x, sy: startPos.z,
      ang: Math.atan2(to.y - from.y, to.x - from.x), n: melee.n || 1,
      r: melee.r || 24, color: melee.col || skill.color || "#ffffff", kind: melee.kind,
      dur: durations[type] || .4, t: 0, seed: Math.random() * 1e6 | 0
    });
    if (type === "smash" || type === "cleave") {
      addDecal("crack", targetPos.x, targetPos.z, 1.1, 2.5, melee.col || skill.color);
      impact("rock", targetPos.x, targetPos.z, true);
    }
    if (type === "ribbon") {
      burst("petal", targetPos.x, targetPos.z, 28, 8, () => ({
        vx: rnd(1.2), vy: rnd(1.2), vh: rand(10, 60), g: 30, drag: 1.5,
        life: rand(.8, 1.3), size: rand(3, 5), col: pick(["#f7b8d8", "#ffd6ec", "#f4d0f0"])
      }));
    }
  }

  function pushAreaFx(area, skill, center, selfArea) {
    if ((!area && !(skill && skill.style)) || !center) return;
    const fallbackField = !area && !!(skill && skill.style);
    const type = fallbackField ? "field" : area.t || area.type || "burst";
    const seed = Math.random() * 1e6 | 0;
    const fx = {
      ...(area || {}), type, x: center.x, y: center.z, r: Number(area && area.r) || Number(skill.radius) || (selfArea ? 2.4 : 1.6),
      color: area && area.col || skill.color || "#ffffff", item: area && area.item, n: area && area.n || 16,
      style: fallbackField ? skill.style : area && area.style, snow: area && area.snow, follow: false, ground: true,
      dur: Number(area && area.dur) || (fallbackField ? .8 : AREA_DUR[type]) || .9,
      seed, hitAt: selfArea ? .1 : .35, shake: Number(skill.shake) || 0, emitT: 0, t: 0
    };
    if (type === "goldring") fx.half2 = 1;
    const rand = mulberry32(seed);
    if (type === "icerain") {
      fx.items = [];
      const count = Math.max(1, fx.n);
      let placed = 0, delay = 0;
      while (placed < count) {
        const batch = Math.min(count - placed, rand() < .5 ? 2 : 1);
        for (let j = 0; j < batch; j++, placed++) {
          const angle = rand() * Math.PI * 2, radius = (placed ? Math.sqrt(rand()) : 0) * fx.r * .9;
          fx.items.push({ dx: Math.cos(angle) * radius, dy: Math.sin(angle) * radius, delay: delay + (j ? .1 + rand() * .2 : 0), ph: rand() * 6.28, sz: 1.7 + rand() * .5 });
        }
        delay += .8 + rand() * .25;
      }
      const maxDelay = Math.max(...fx.items.map(item => item.delay));
      if (maxDelay > 6.8) for (const item of fx.items) item.delay *= 6.8 / maxDelay;
    } else if (type === "swordfall" || type === "thunder9") {
      fx.items = [];
      const count = Math.max(1, fx.n || (type === "thunder9" ? 18 : 10));
      for (let j = 0; j < count; j++) {
        const angle = rand() * Math.PI * 2, radius = Math.sqrt(rand()) * fx.r * (type === "swordfall" ? .9 : .95);
        fx.items.push({ dx: Math.cos(angle) * radius, dy: Math.sin(angle) * radius, delay: (type === "swordfall" ? .04 : .06) + j / count * .62 + rand() * .04, seed: rand() * 1e6 | 0 });
      }
    } else if (type === "thunder") {
      fx.items = [];
      const count = Math.max(1, Number(area.hits) || 1);
      for (let j = 0; j < count; j++) {
        const angle = rand() * Math.PI * 2, radius = Math.sqrt(rand()) * .35;
        fx.items.push({ dx: Math.cos(angle) * radius, dy: Math.sin(angle) * radius, delay: Math.min(.95, (.3 + j * fx.dur * .75 / count) / fx.dur + rand() * .04), seed: rand() * 1e6 | 0 });
      }
    } else if (["rain", "pillar", "flames", "erupt", "cloud"].includes(type)) {
      fx.items = [];
      const count = type === "rain" ? fx.n : type === "cloud" ? 14 : type === "flames" ? 7 : type === "erupt" ? 9 : 5;
      for (let j = 0; j < count; j++) {
        const angle = rand() * Math.PI * 2, radius = Math.sqrt(rand()) * fx.r * (type === "pillar" ? .7 : .95);
        fx.items.push({ dx: Math.cos(angle) * radius, dy: Math.sin(angle) * radius, delay: type === "rain" ? rand() * .4 : rand() * .15, sz: .7 + rand() * .6, ph: rand() * 6.28 });
      }
    }
    addFx(fx);
    return fx;
  }

  // Sprite assets exported from the original 2.5D client.  The game's SPR
  // animation frames are kept intact and played from their exported sheets.
  const AUTHENTIC_SKILL_SPRITES = {
    wd90Cast: { file: "assets/fx/spr_wd_90_tdwj_a/fly.png", w: 194, h: 180, cols: 15, rows: 1, ax: 97, ay: 154, scale: .62 },
    wd10Swords: { file: "assets/fx/spr_wd_10_jfjt_c/fly.png", w: 172, h: 135, cols: 5, rows: 16, ax: 82, ay: 108, scale: .38 },
    wd10Burst: { file: "assets/fx/spr_wd_10_jfjt_d/fly.png", w: 200, h: 200, cols: 14, rows: 1, ax: 100, ay: 100, scale: .52 },
    m110Ring: { file: "assets/fx/m110/fly.png", w: 320, h: 320, cols: 8, rows: 1, ax: 160, ay: 198, scale: .34 },
    m110Burst: { file: "assets/fx/m110/hit.png", w: 200, h: 200, cols: 14, rows: 1, ax: 100, ay: 100, scale: .48 }
  };
  const authenticSkillSpriteImages = new Map();

  function getAuthenticSkillSpriteImage(key) {
    const spec = AUTHENTIC_SKILL_SPRITES[key];
    if (!spec) return null;
    let image = authenticSkillSpriteImages.get(key);
    if (!image) {
      image = new Image();
      image.src = new URL(spec.file, document.baseURI).href;
      authenticSkillSpriteImages.set(key, image);
    }
    return image.complete && image.naturalWidth > 0 ? image : null;
  }

  function queueAuthenticSkillSprite(key, x, z, delay, dur, options = {}) {
    getAuthenticSkillSpriteImage(key);
    const fx = {
      type: "authenticSkillSprite", spriteKey: key, x, y: z, delay: Math.max(0, delay),
      dur: Math.max(.05, dur), t: 0, ground: true, emitT: 0, ...options
    };
    if (fx.delay > 0) setTimeout(() => addFx(fx), fx.delay * 1000);
    else addFx(fx);
    return fx;
  }

  function drawAuthenticSkillSpriteFx(fx, screenPos, progress) {
    if (fx.type === "skillRing") {
      const t = Math.max(0, Math.min(1, progress));
      const fade = t < .18 ? t / .18 : Math.max(0, 1 - (t - .18) / .82);
      const scale = .18 + .82 * (1 - Math.pow(1 - t, 2));
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = fade * .9;
      ctx.strokeStyle = "#e5f8ff";
      ctx.lineWidth = Math.max(1.5, 5 * (1 - t));
      ctx.beginPath();
      ctx.ellipse(screenPos.x, screenPos.y - 4, fx.rx * scale, fx.ry * scale, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = fade * .56;
      ctx.strokeStyle = "#69dfff";
      ctx.lineWidth = Math.max(1, 2.5 * (1 - t));
      ctx.beginPath();
      ctx.ellipse(screenPos.x, screenPos.y - 4, fx.rx * scale * .78, fx.ry * scale * .78, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      return;
    }

    const spec = AUTHENTIC_SKILL_SPRITES[fx.spriteKey];
    const image = getAuthenticSkillSpriteImage(fx.spriteKey);
    if (!spec || !image) return;
    const t = Math.max(0, Math.min(.999, progress));
    const col = Math.min(spec.cols - 1, Math.floor(t * spec.cols));
    const row = Math.max(0, Math.min(spec.rows - 1, Math.floor(Number(fx.frameRow) || 0)));
    const sx = col * spec.w, sy = row * spec.h;
    const travel = fx.tx == null ? 1 : t;
    const wx = fx.sx == null ? fx.x : fx.sx + (fx.tx - fx.sx) * travel;
    const wz = fx.sz == null ? fx.y : fx.sz + (fx.tz - fx.sz) * travel;
    const p = fx.sx == null ? screenPos : scrGround(wx, wz);
    const height = Math.max(0, Number(fx.height) || 0) * (fx.sx == null ? 1 - t : 1 - travel);
    const scale = (Number(fx.scale) || 1) * spec.scale;
    const alpha = Math.min(1, t * 9) * Math.min(1, (1 - t) * 5);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = alpha * (Number(fx.opacity) || 1);
    ctx.drawImage(image, sx, sy, spec.w, spec.h,
      p.x - spec.ax * scale,
      p.y - spec.ay * scale - height,
      spec.w * scale,
      spec.h * scale);
    ctx.restore();
  }

  function playWudangSpriteSkill(skill, target, startPos, targetPos, complete) {
    const name = String(skill && skill.name || "");
    const center = { x: targetPos.x, z: targetPos.z };
    if (name === "Kiếm Phi Kinh Thiên") {
      const castTime = Math.max(.35, Number(skill.castTime) || .55);
      const radius = Math.max(.8, Number(skill.radius) || 3);
      if (typeof window.setHeroSkillPose3D === "function") window.setHeroSkillPose3D("cast", skill.color || "#dff4ff", castTime);
      queueAuthenticSkillSprite("wd90Cast", startPos.x, startPos.z, 0, castTime, { height: 6, opacity: .82 });

      // A uniform spiral keeps all 24 original sword volleys inside the target area.
      const count = 24;
      for (let i = 0; i < count; i++) {
        const angle = i * 2.399963229728653;
        const spread = radius * .78 * Math.sqrt((i + .5) / count);
        const x = center.x + Math.cos(angle) * spread;
        const z = center.z + Math.sin(angle) * spread;
        queueAuthenticSkillSprite("wd10Swords", x, z, castTime + .025 + i * .018, .34, {
          frameRow: 0, height: 142 + (i % 4) * 9, scale: .9, opacity: .95
        });
      }

      const rainEnd = castTime + .025 + (count - 1) * .018 + .34;
      const blastAt = rainEnd + .015;
      queueAuthenticSkillSprite("wd10Burst", center.x, center.z, blastAt, .48, { scale: 1.1, opacity: .95 });
      queueAuthenticSkillSprite("skillRing", center.x, center.z, blastAt, .48, {
        rx: radius * TW / 2, ry: radius * TH / 2
      });
      const hitAt = Math.max(Number(skill.hitDelay) || 0, blastAt + .12);
      setTimeout(() => complete({ type: skill.type || "aoeTarget", target, impactPos: center }), hitAt * 1000);
      return true;
    }

    if (name === "Tam Hoàn Thao Nguyệt") {
      const dx = targetPos.x - startPos.x, dz = targetPos.z - startPos.z;
      const distance = Math.hypot(dx, dz) || 1;
      const px = -dz / distance, pz = dx / distance;
      const count = 3;
      if (typeof window.setHeroSkillPose3D === "function") window.setHeroSkillPose3D("thrust", skill.color || "#dff4ff", .48);
      const totalScale = Number(skill.tot) || 1.2;
      const eachScale = totalScale / count;
      const shotDuration = .34;
      for (let i = 0; i < count; i++) {
        const offset = (i - 1) * .28;
        const sx = startPos.x + px * offset;
        const sz = startPos.z + pz * offset;
        const tx = center.x + px * offset * .35;
        const tz = center.z + pz * offset * .35;
        const delay = i * .1;
        queueAuthenticSkillSprite("m110Ring", tx, tz, delay, shotDuration, {
          sx, sz, tx, tz, scale: 1.04, opacity: .96
        });
        queueAuthenticSkillSprite("m110Burst", tx, tz, delay + shotDuration, .42, { scale: .86, opacity: .9 });
        setTimeout(() => complete({ type: "projectileHit", target, scale: eachScale }), (delay + shotDuration) * 1000);
      }
      setTimeout(() => complete({ type: "homingComplete", target }), (2 * .1 + shotDuration + .1) * 1000);
      return true;
    }
    return false;
  }

  function addSkillTrapFx3D(x, z, radius, color, duration = 24, glyph = "陷") {
    const mark = { x, z, radius, color: color || "#b8f08a", duration, t: 0, armAt: 0.55, glyph };
    trapMarks3D.add(mark);
    return mark;
  }

  function removeSkillTrapFx3D(mark) { if (mark) trapMarks3D.delete(mark); }

  function emitSkillAreaFx3D(skill, x, z, radius) {
    const vDef = getSkillVfx(skill);
    const center = { x, z };
    if (vDef.area) pushAreaFx({ ...vDef.area, r: radius }, skill, center, false);
    else pushAreaFx(null, { ...skill, radius }, center, false);
    const area2Delay = Number.isFinite(Number(vDef.area2Delay)) ? Math.max(0, Number(vDef.area2Delay)) : 0.16;
    if (vDef.area2) setTimeout(() => pushAreaFx({ ...vDef.area2, r: radius }, skill, center, false), area2Delay * 1000);
    pushImpactFx(vDef, skill, x, z);
  }

  function pushCastFx(vDef, skill, startPos) {
    if (vDef.cast) {
      const castDur = Math.max(0.42, Number(skill.castTime) || 0.55);
      const color = skill.trailFx || skill.color || "#ffd24a";
      activeFxList.push({ type: "circle", x: startPos.x, y: startPos.z, t: 0, dur: castDur, color, follow: false, ground: true, emitT: 0 });
      activeFxList.push({ type: "aura", x: startPos.x, y: startPos.z, t: 0, dur: castDur, color, follow: false, ground: true, emitT: 0 });
    }
    if (vDef.bowGlow) {
      activeFxList.push({ type: "ring", x: startPos.x, y: startPos.z, t: 0, dur: .35, r: .8, color: vDef.bowGlow });
      activeFxList.push({ type: "flash", x: startPos.x, y: startPos.z, t: 0, dur: .35, r: 20, color: vDef.bowGlow });
    }
    if (skill.charm) {
      const mark = { x: startPos.x, y: startPos.z };
      activeFxList.push({ type: "charmfly", x: mark.x, y: mark.y, tg: mark, t: 0, dur: .55, color: skill.color || "#d8f0d0", ground: false, emitT: 0 });
      setTimeout(() => activeFxList.push({ type: "charmhit", x: startPos.x, y: startPos.z, t: 0, dur: .65, color: skill.color || "#d8f0d0", self: true, ground: false, emitT: 0 }), 360);
    }
  }

  function castAuthenticSkill(skill, attacker, target, onHitCallback) {
    initFx2DCanvas();
    let vDef = getSkillVfx(skill);
    // Bùa chú trong bản 2.5D dùng cùng một động tác niệm và lá bùa bay tới
    // đúng mục tiêu. Alias hiệu ứng chỉ là tên cũ; không được biến bùa thành
    // một vùng nổ/bão tuyết của kỹ năng khác.
    if (skill.kind === "curse") vDef = { ...vDef, pose: "cast", cast: 1, area: null, area2: null, impact: null, shake: 0 };
    if (!vDef.cast && (vDef.pose === "cast" || vDef.pose === "punch" || /chưởng|chỉ|quyền/i.test(skill.name || ""))) vDef = { ...vDef, cast: 1 };
    const color = skill.trailFx || skill.color || "#ffd24a";
    const startPos = attacker.mesh ? attacker.mesh.position : attacker;
    const targetPos = target && target.group ? target.group.position : target && target.mesh ? target.mesh.position : (target || startPos);
    if (!startPos || !targetPos) { if (typeof onHitCallback === "function") onHitCallback(); return; }
    const castDelay = vDef.cast ? Math.max(0.12, Number(skill.castTime) || 0.35) : 0;
    const dx = targetPos.x - startPos.x, dz = targetPos.z - startPos.z;
    const targetDistance = Math.hypot(dx, dz);
    const baseAngle = targetDistance > .001 ? Math.atan2(dz, dx) : Math.atan2(attacker.facing ? Math.cos(attacker.facing) : 1, attacker.facing ? Math.sin(attacker.facing) : 0);
    const complete = event => { if (typeof onHitCallback === "function") onHitCallback(event || {}); };
    const rank = typeof window.getSkillRank3D === "function" ? window.getSkillRank3D(skill) : 1;
    if (playWudangSpriteSkill(skill, target, startPos, targetPos, complete)) return;
    pushCastFx(vDef, skill, startPos);
    if (skill.dash && targetDistance > 0.8) activeFxList.push({ type: "maceray", x: startPos.x, y: startPos.z, ex: targetPos.x, ey: targetPos.z, t: 0, dur: .24, color: skill.trailFx || "#ffe6a0", ground: false, emitT: 0 });
    if (["cast", "punch", "throw", "bow"].includes(vDef.pose) && skill.name !== "basic") {
      burst("spark", startPos.x, startPos.z, 44, lowFx() ? 3 : 6, () => ({
        vx: rnd(.8), vy: rnd(.8), vh: rand(10, 50), life: rand(.3, .6), size: rand(1.2, 2.2), col: color
      }));
    }
    if (skill.kind === "curse") {
      const trackingTarget = target && target.group ? {
        get x() { return target.group.position.x; },
        get y() { return target.group.position.z; }
      } : { x: targetPos.x, y: targetPos.z };
      activeFxList.push({
        type: "charmfly", x: startPos.x, y: startPos.z, tg: trackingTarget,
        t: 0, dur: .32, color, ground: false, emitT: 0
      });
      setTimeout(() => {
        if (!target || target.isDead) {
          complete({ type: "curseComplete", target });
          return;
        }
        const hitPos = target.group ? target.group.position : target.mesh ? target.mesh.position : targetPos;
        activeFxList.push({ type: "charmhit", x: hitPos.x, y: hitPos.z, t: 0, dur: .6, color, ground: false, emitT: 0 });
        burst("spark", hitPos.x, hitPos.z, 36, lowFx() ? 4 : 10, () => ({
          vx: rnd(1.2), vy: rnd(1.2), vh: rand(5, 30), drag: 2,
          life: rand(.25, .5), size: rand(1.2, 2.2), col: color
        }));
        complete({ type: "curseHit", target, x: hitPos.x, z: hitPos.z });
      }, 320);
      return;
    }
    const projectileSpeed = style => /arrow|frost|flydagger/.test(style) ? 30 : style === "comet" ? 20 : /needle|spear/.test(style) ? 14 : style === "fireball" || style === "palm" ? 9 : 10;
    const finishWhenDone = (entries, event) => {
      if (!entries.length) { complete(event); return; }
      let remaining = entries.length;
      for (const entry of entries) activeProjList.push({
        ...entry,
        findHits: (x0, z0, x1, z1) => projectileSegmentHits(entry, x0, z0, x1, z1),
        emitContactFx: hit => emitProjectileContactFx(entry, hit),
        onWaveHit: meta => complete({ ...event, ...meta }),
        onHit: meta => {
          if (meta && meta.collided && (entry.contactDamage || entry.contactCurse)) complete({
            ...event, ...meta,
            type: entry.contactCurse ? "curseHit" : "projectileHit",
            target: meta.target || entry.target,
            scale: Number.isFinite(Number(meta.scale)) ? Number(meta.scale) : (Number(entry.hitScale) || 1)
          });
          if (meta && meta.finished) {
            remaining--;
            if (remaining <= 0) complete({ ...event, type: event.type + "Complete" });
          }
        }
      });
    };

    const projectileSegmentHits = (projectile, x0, z0, x1, z1) => {
      const candidates = typeof window.getProjectileCandidates3D === "function" ? window.getProjectileCandidates3D() : [];
      const dx = x1 - x0, dz = z1 - z0, lengthSq = dx * dx + dz * dz;
      if (!lengthSq) return [];
      const length = Math.sqrt(lengthSq), hits = [];
      const hitTargets = projectile.hitTargets || (projectile.hitTargets = new Set());
      for (const mon of candidates) {
        if (!mon || mon.isDead || !mon.group || hitTargets.has(mon)) continue;
        const mx = mon.group.position.x - x0, mz = mon.group.position.z - z0;
        const along = (mx * dx + mz * dz) / length;
        const across = Math.abs(mx * dz - mz * dx) / length;
        const radius = Math.max(0.25, (Number(mon.scale) || 3) * 0.16) + (projectile.goldenShadow ? 0.22 : 0.16);
        if (along < -radius || along > length + radius || across > radius) continue;
        hits.push({ mon, along: Math.max(0, Math.min(length, along)), x: x0 + dx * Math.max(0, Math.min(length, along)) / length, z: z0 + dz * Math.max(0, Math.min(length, along)) / length });
      }
      hits.sort((a, b) => a.along - b.along);
      return projectile.pierce ? hits : hits.slice(0, 1);
    };

    const emitProjectileContactFx = (projectile, hit) => {
      if (projectile.goldenShadow) activeFxList.push({ type: "nhgold", x: hit.x, y: hit.z, t: 0, dur: 1.6, r: 1, color: "#ffd23a", big: rank >= Number(skill.goldLv), seed: Math.random(), ground: false });
      if (skill.saw) {
        activeFxList.push({ type: "saw", x: hit.x, y: hit.z, t: 0, dur: 1.1, r: 1.2, color: "#f4fbff", ground: false, seed: Math.random() });
        if (rank >= (Number(skill.burstLv) || Infinity)) {
          activeFxList.push({ type: "ring", x: hit.x, y: hit.z, t: 0, dur: .35, r: 1.4, color: "#ffffff", ground: true });
          burst("spark", hit.x, hit.z, 30, lowFx() ? 8 : 16, () => ({ vx: rnd(3.2), vy: rnd(3.2), vh: rand(5, 40), drag: 2, life: rand(.25, .5), size: rand(1.4, 2.6), col: pick(["#ffffff", "#f4fbff", "#dff6ff"]) }));
        }
      }
    };

    // Đặt bẫy đúng vị trí chỉ định; sát thương chờ quái bước vào vùng bẫy.
    if (skill.trap) {
      activeFxList.push({ type: "ring", x: targetPos.x, y: targetPos.z, t: 0, dur: .42, r: .65, color, ground: true, emitT: 0 });
      burst("dust", targetPos.x, targetPos.z, 6, lowFx() ? 3 : 6, () => ({ vx: rnd(.6), vy: rnd(.6), vh: rand(10, 30), life: rand(.3, .5), size: rand(2, 3), col: color }));
      setTimeout(() => complete({ type: "trap", x: targetPos.x, z: targetPos.z }), Math.max(80, Number(skill.hitDelay) ? Number(skill.hitDelay) * 1000 : (castDelay + .18) * 1000));
      return;
    }

    if (skill.type === "wave" || skill.free8 || skill.freeDragon) {
      const entries = [];
      const waveStyle = skill.freeDragon ? "fire" : skill.free8 ? "bamboo" : skill.wstyle || "fire";
      const sourceDirX = Math.cos(baseAngle), sourceDirZ = Math.sin(baseAngle);
      let count = 1;
      if (skill.free8) count = 8;
      else if (skill.freeDragon) count = rank >= 9 ? Math.max(1, rank - 8) : 1;
      else if (skill.palmN) count = skill.palmN;
      else if (skill.iceRing) count = rank >= 20 ? 3 : rank >= 15 ? 2 : 1;
      else if (skill.lanceN) count = Math.min(5, 1 + Math.floor(Math.max(1, rank) / 5));
      else if (skill.swordN) count = Math.min(5, 3 + Math.floor(Math.max(1, rank) / 10));
      else count = Math.max(1, Math.min(16, Math.floor(Number(skill.fan) || 1)));
      const travelRange = skill.free8 || skill.freeDragon
        ? Math.max(1, Number(skill.range) || 6) + 1.5
        : Number(skill.wR) || Math.max(Number(skill.range) || 6, targetDistance) + 1.5;
      const fanStep = skill.fanA || (skill.lanceN ? .55 : .26);
      if (skill.iceFall) {
        const x = startPos.x + sourceDirX * 1.3, z = startPos.z + sourceDirZ * 1.3;
        activeFxList.push({ type: "skysword", x, y: z, t: 0, dur: skill.iceRing ? .75 : .42, color: "#7fd8ff", sc: .6, ice: true, sink: !!skill.iceRing, ground: true, emitT: 0 });
        if (skill.iceRing && rank >= 20) {
          const ring = { x: startPos.x, z: startPos.z, radius: Number(skill.iceRing) || 2 };
          activeFxList.push({ type: "icering", x: ring.x, y: ring.z, t: 0, dur: 1.1, R: ring.radius, color: "#cfeaff", ground: true, emitT: 0 });
          setTimeout(() => complete({ type: "iceRing", ...ring }), 700);
        }
      }
      for (let index = 0; index < count; index++) {
        let angle = baseAngle;
        if (skill.free8) angle += index * Math.PI / 4;
        else if (skill.freeDragon && count > 1) angle += (index / (count - 1) - .5) * Math.min(Math.PI * 1.2, .22 * (count - 1));
        else if (count > 1 && !skill.palmN) angle += (index - (count - 1) / 2) * fanStep;
        const dirX = Math.cos(angle), dirZ = Math.sin(angle);
        const originX = startPos.x + dirX * .4, originZ = startPos.z + dirZ * .4;
        const range = travelRange;
        entries.push({
          x: originX, z: originZ, tx: originX + dirX * range, tz: originZ + dirZ * range,
          ox: originX, oz: originZ, vx: dirX, vy: dirZ, color, style: waveStyle === "buddhapalm" ? "palm" : waveStyle === "bamboo" ? "bamboo" : waveStyle === "fire" ? "dragon" : waveStyle === "gale" ? "comet" : waveStyle === "crescent" || waveStyle === "blade" ? "crescent" : waveStyle === "spear" ? "spear" : waveStyle === "fairy" ? "lunar" : waveStyle === "icedart" ? "xstar" : waveStyle.includes("ice") ? "flysword" : waveStyle === "poison" ? "greenbolt" : "comet",
          spd: Math.max(1, Number(skill.wspd) || (waveStyle === "gale" ? 7 : /ice|arrow/.test(waveStyle) ? 24 : count > 1 ? 10 : 9)),
          trav: 0, maxD: range, delay: castDelay + (skill.iceFall ? .14 : index * (skill.palmGap || .04)), skill, target,
          waveWidth: Number(skill.ww) || (count > 1 ? (skill.lanceN ? .7 : skill.swordN ? .6 : waveStyle === "icedart" ? .5 : .6) : .8),
          pulseIndex: index, hitTargets: new Set(), isWave: true,
          waveStyle, wave: true, returning: !!skill.palmN, returnStage: 0, palmLast: index === count - 1,
          pierce: !!skill.pierce, endArea: Number(skill.tier) >= 4 && count === 1 && !skill.lanceN ? vDef.area || null : null,
          vDef, impactDone: false
        });
        if (skill.palmN) { entries[entries.length - 1].ox = originX; entries[entries.length - 1].oz = originZ; }
      }
      if (skill.swordN || skill.snowCast) {
        activeFxList.push({ type: "ring", x: startPos.x, y: startPos.z, t: 0, dur: .5, r: 1.5, color: "#cfeaff", ground: true, emitT: 0 });
        burst("petal", startPos.x, startPos.z, 6, lowFx() ? 8 : 18, () => { const a = rand(0, Math.PI * 2); return { vx: Math.cos(a) * 2.2, vy: Math.sin(a) * 2.2, vh: rand(10, 40), g: 20, drag: 1.8, life: rand(.5, .8), size: rand(2.5, 4), col: pick(["#eaf6ff", "#cfe6ff", "#b8d8ff"]) }; });
      }
      finishWhenDone(entries, { type: "wave", count, waveStyle, target });
      return;
    }

    if (skill.coins) {
      const entries = [], count = Math.max(1, Math.min(9, Math.floor(Number(skill.count) || 5)));
      const range = Math.max(6, Number(skill.range) || 7);
      for (let index = 0; index < count; index++) {
        const angle = baseAngle + (index - (count - 1) / 2) * .22;
        const dirX = Math.cos(angle), dirZ = Math.sin(angle);
        entries.push({ x: startPos.x, z: startPos.z, ox: startPos.x, oz: startPos.z, tx: startPos.x + dirX * range, tz: startPos.z + dirZ * range, vx: dirX, vy: dirZ, color: "#ffd23a", style: "coin", spd: 13, trav: 0, maxD: range, skill, target, returning: true, returnStage: 0, delay: castDelay + index * .04, phase: index, vDef, impactDone: false, isCoin: true, hitTargets: new Set(), waveWidth: .65 });
      }
      finishWhenDone(entries, { type: "coins", target });
      return;
    }

    const projectileType = ["proj", "homing", "multi"].includes(skill.type) || skill.kind === "curse";
    if (projectileType) {
      const goldenShadow = skill.type === "proj" && Number(skill.goldLv) > 0;
      const resolvedTargets = typeof window.getSkillTargets3D === "function" ? window.getSkillTargets3D(skill, target, targetPos) : [];
      const style = goldenShadow ? "nhshadow" : vDef.p || skill.pstyle || (skill.type === "proj" ? "flysword" : "comet");
      const rankShotCount = Math.max(1, Math.floor(Number(skill.count) || 1));
      const dragonShotCount = rankShotCount >= 4 ? 4 : Math.min(4, rankShotCount + Math.floor((Math.max(1, rank) - 1) / 3));
      const shotCount = skill.type === "multi" ? Math.max(1, resolvedTargets.length) : skill.type === "homing" ? (skill.pstyle === "dragon" ? dragonShotCount : Math.max(1, Math.min(24, rankShotCount))) : 1;
      const entries = [];
      for (let index = 0; index < shotCount; index++) {
        let shotTarget = skill.type === "multi" ? resolvedTargets[index] || target : skill.type === "homing" && !["dragon", "bamboo"].includes(skill.pstyle) ? resolvedTargets[index % Math.max(1, resolvedTargets.length)] || target : target;
        const shotPos = shotTarget && shotTarget.group ? shotTarget.group.position : targetPos;
        const shotDx = shotPos.x - startPos.x, shotDz = shotPos.z - startPos.z;
        const shotDist = Math.hypot(shotDx, shotDz);
        let tx = shotPos.x, tz = shotPos.z;
        if (!shotTarget || skill.type === "homing" && ["dragon", "bamboo"].includes(skill.pstyle)) {
          const angleOffset = shotCount > 1 && ["dragon", "bamboo"].includes(skill.pstyle) ? (index - (shotCount - 1) / 2) * .18 : 0;
          const angle = baseAngle + angleOffset;
          const reach = Math.max(shotDist, Number(skill.range) || 6);
          tx = startPos.x + Math.cos(angle) * reach; tz = startPos.z + Math.sin(angle) * reach;
        }
        if (goldenShadow) {
          const reach = (Number(skill.range) || 6) + (rank >= Number(skill.goldLv) ? 1.6 : 1);
          tx = startPos.x + Math.cos(baseAngle) * reach;
          tz = startPos.z + Math.sin(baseAngle) * reach;
        }
        let sx = startPos.x, sz = startPos.z;
        const straightHoming = skill.type === "homing" && ["dragon", "bamboo"].includes(skill.pstyle);
        if (straightHoming && shotCount > 1) {
          const offset = (index - (shotCount - 1) / 2) * .55 * Math.min(1, .45 + shotDist / 4);
          sx += -Math.sin(baseAngle) * offset;
          sz += Math.cos(baseAngle) * offset;
        }
        entries.push({
          x: sx, z: sz, tx, tz, vx: shotDx, vy: shotDz, color,
          style: goldenShadow ? "nhshadow" : skill.pstyle === "dragon" ? "dragon" : skill.pstyle === "bamboo" ? "bamboo" : style, spd: Math.max(1, Number(skill.wspd) || (goldenShadow ? 9 : straightHoming ? skill.pstyle === "dragon" ? 8.5 : 11 : projectileSpeed(style))),
          trav: 0, maxD: Math.max(.1, goldenShadow ? Math.hypot(tx - sx, tz - sz) : shotDist), skill, target: shotTarget, vDef, impactDone: false,
          delay: castDelay + (skill.type === "homing" ? index * .07 : skill.type === "multi" ? index * .06 : 0),
          boomerang: false, contactDamage: skill.kind !== "curse", contactCurse: skill.kind === "curse", straight: straightHoming,
          pierce: goldenShadow || !!skill.pierce, hitTargets: new Set(), goldenShadow,
          hitScale: skill.type === "homing" && skill.one ? (Number(skill.tot) || 1) / shotCount : skill.type === "homing" && index >= resolvedTargets.length && !["dragon", "bamboo"].includes(skill.pstyle) ? .5 : 1
        });
      }
      finishWhenDone(entries, { type: skill.type, targets: resolvedTargets, target });
      return;
    }

    const selfArea = skill.type === "aoeSelf";
    const center = selfArea ? startPos : targetPos;
    if (skill.type === "melee" || vDef.melee) {
      const combo = Math.max(1, Math.floor(Number(skill.combo) || 1));
      const timings = Array.isArray(skill.comboT) ? skill.comboT : Array.from({ length: combo }, (_, i) => i * (Number(skill.comboT) || .2));
      for (let index = 0; index < combo; index++) setTimeout(() => {
        const horsePoses = window.hero && window.hero.isRiding && Array.isArray(skill.comboPosesHorse) ? skill.comboPosesHorse : null;
        const comboPose = horsePoses ? horsePoses[index] : Array.isArray(skill.comboPoses) ? skill.comboPoses[index] : null;
        if (typeof window.setHeroSkillPose3D === "function") window.setHeroSkillPose3D(comboPose || vDef.pose, skill.trailFx || color, .24);
        if (skill.leapFin && index === combo - 2 && typeof window.playHeroSkillHop3D === "function") window.playHeroSkillHop3D(.44);
        if (skill.finSpin && index === combo - 1) {
          activeFxList.push({ type: "phspear", x: targetPos.x, y: targetPos.z, sx: startPos.x, sy: startPos.z, t: 0, dur: .7, color: skill.trailFx || "#ffd27a", ground: false, emitT: 0 });
          activeFxList.push({ type: "ring", x: targetPos.x, y: targetPos.z, t: 0, dur: .55, r: 2.3, color: skill.trailFx || color, ground: true, emitT: 0 });
        }
        const comboMelee = { chop: "smash", thrust: "thrust", punch: "fist", spin: "arcs", slash: "arcs", dualR: "arcs", dualL: "arcs", throw: "fang" };
        const meleeVfx = {
          ...vDef, pose: comboPose || vDef.pose,
          melee: { ...(vDef.melee || {}), t: comboMelee[comboPose] || vDef.melee && vDef.melee.t || "arcs", n: 1 }
        };
        pushMeleeFx(meleeVfx, skill, startPos, targetPos);
        if (!vDef.melee) activeFxList.push({ type: "slash", x: targetPos.x, y: targetPos.z, t: 0, dur: .45, color, multi: 1 });
      }, Math.max(0, Number(timings[index]) || 0) * 1000);
    }
    const createMainArea = () => {
      if (!vDef.area) return skill.style && ["aoeSelf", "aoeTarget"].includes(skill.type)
        ? pushAreaFx(null, skill, center, selfArea)
        : null;
      const areaOrigin = skill.areaOrigin || (selfArea || ["taichi", "firewheel"].includes(vDef.area.t) ? "self" : "target");
      return pushAreaFx(vDef.area, skill, areaOrigin === "self" ? startPos : targetPos, selfArea);
    };
    let mainAreaFx = null;
    if (castDelay > 0) setTimeout(() => { mainAreaFx = createMainArea(); }, castDelay * 1000);
    else mainAreaFx = createMainArea();
    const area2Delay = Number.isFinite(Number(vDef.area2Delay)) ? Math.max(0, Number(vDef.area2Delay)) : .18;
    if (vDef.area2) setTimeout(() => {
      const secondaryAreaFx = pushAreaFx(vDef.area2, skill, center, selfArea);
      if (secondaryAreaFx) areaHit(secondaryAreaFx);
    }, (castDelay + area2Delay) * 1000);
    const hitDelay = Number(skill.hitDelay);
    const delayMs = Number.isFinite(hitDelay) ? Math.max(0, hitDelay * 1000) : (vDef.cast ? (castDelay + .28) * 1000 : vDef.area || skill.style ? 280 : 160);
    setTimeout(() => {
      if (mainAreaFx) areaHit(mainAreaFx);
      complete({ type: skill.type || skill.kind, target, areaFx: mainAreaFx, impactPos: center });
    }, delayMs);
  }

  // Vòng lặp cập nhật & vẽ toàn bộ hiệu ứng 2.5D lên màn hình 3D
  function updateAndRenderFx2D(dt) {
    if (!ctx || !fxCanvas) return;
    time += dt;
    // Keep 2.5D particle bursts, decals, and timed area emissions in the same frame loop.
    updateParts(dt);
    fxEmit(dt);

    ctx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
    drawDecals();
    for (const mark of trapMarks3D) {
      mark.t += dt;
      if (mark.t >= mark.duration) { trapMarks3D.delete(mark); continue; }
      const pos = scrGround(mark.x, mark.z);
      const armed = mark.t >= mark.armAt;
      const fade = Math.min(1, (mark.duration - mark.t) / 2.5);
      ctx.save();
      ctx.globalAlpha = fade * (armed ? 0.7 + 0.22 * Math.sin(time * 7 + mark.x) : 0.32);
      ctx.strokeStyle = mark.color;
      ctx.lineWidth = armed ? 2 : 1.4;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.ellipse(pos.x, pos.y, mark.radius * TW / 2, mark.radius * TH / 2, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha *= 0.35;
      ctx.fillStyle = mark.color;
      ctx.beginPath();
      ctx.ellipse(pos.x, pos.y, mark.radius * TW / 2, mark.radius * TH / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = fade * (armed ? 0.92 : 0.45);
      ctx.fillStyle = mark.color;
      ctx.font = "bold 13px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(armed ? (mark.glyph || "陷") : "·", pos.x, pos.y - 1);
      ctx.restore();
    }

    // 1. Cập nhật & vẽ đạn bay (Projectiles)
    for (let i = activeProjList.length - 1; i >= 0; i--) {
      const p = activeProjList[i];
      if (p.delay > 0) {
        p.delay = Math.max(0, p.delay - dt);
        if (p.delay > 0) continue;
      }
      if (p.skill && p.skill.type === "homing" && !p.straight && p.target && !p.target.isDead && p.target.group) {
        p.tx = p.target.group.position.x;
        p.tz = p.target.group.position.z;
        p.maxD = Math.max(p.trav, Math.hypot(p.tx - p.x, p.tz - p.z));
      }
      const dist = Math.hypot(p.tx - p.x, p.tz - p.z);
      const step = p.spd * dt;

      if (dist <= step || (!p.returning && p.trav >= p.maxD)) {
        if (p.returning && p.returnStage === 0) {
          p.returnStage = 1;
          p.tx = p.ox;
          p.tz = p.oz;
          p.trav = 0;
          p.maxD = Math.max(0.1, Math.hypot(p.tx - p.x, p.tz - p.z));
          if (p.hitTargets) p.hitTargets.clear();
          continue;
        }
        const endX = p.tx, endZ = p.tz;
        const finalHits = (p.contactDamage || p.contactCurse) && typeof p.findHits === "function"
          ? p.findHits(p.x, p.z, endX, endZ)
          : [];
        let stoppedByHit = false;
        for (const hit of finalHits) {
          if (p.hitTargets) p.hitTargets.add(hit.mon);
          if (typeof p.emitContactFx === "function") p.emitContactFx(hit);
          const isFinalHit = !p.pierce;
          if (typeof p.onHit === "function") p.onHit({ type: "projectileImpact", target: hit.mon, x: hit.x, z: hit.z, collided: true, finished: isFinalHit, scale: p.hitScale || 1 });
          if (isFinalHit) { stoppedByHit = true; break; }
        }
        if (stoppedByHit) {
          activeProjList.splice(i, 1);
          continue;
        }

        const vDef = p.vDef || getSkillVfx(p.skill);
        let impactArea = null;
        if (p.isWave && p.endArea) {
          impactArea = pushAreaFx(p.endArea, p.skill, { x: endX, z: endZ }, false);
          if (impactArea) areaHit(impactArea);
        }
        if (typeof p.onHit === "function") p.onHit({ type: "projectileMiss", target: p.target, x: endX, z: endZ, areaFx: impactArea, collided: false, finished: true });
        activeProjList.splice(i, 1);
        continue;
      }

      const oldX = p.x, oldZ = p.z;
      const dirX = (p.tx - p.x) / dist;
      const dirZ = (p.tz - p.z) / dist;
      p.currentVx = dirX;
      p.currentVy = dirZ;
      p.x += dirX * step;
      p.z += dirZ * step;
      p.trav += step;

      if ((p.contactDamage || p.contactCurse) && typeof p.findHits === "function") {
        const contactHits = p.findHits(oldX, oldZ, p.x, p.z);
        let stopProjectile = false;
        for (const hit of contactHits) {
          if (p.hitTargets) p.hitTargets.add(hit.mon);
          if (typeof p.emitContactFx === "function") p.emitContactFx(hit);
          const isFinalHit = !p.pierce;
          if (typeof p.onHit === "function") p.onHit({ type: "projectileImpact", target: hit.mon, x: hit.x, z: hit.z, collided: true, finished: isFinalHit, scale: p.hitScale || 1 });
          if (isFinalHit) { stopProjectile = true; break; }
        }
        if (stopProjectile) {
          activeProjList.splice(i, 1);
          continue;
        }
      }

      if ((p.isWave || p.isCoin) && p.hitTargets && typeof p.onWaveHit === "function" && typeof window.getSkillTargets3D === "function") {
        const candidates = window.getSkillTargets3D(p.skill, p.target, { x: p.tx, y: 0, z: p.tz }) || [];
        const moveX = p.x - oldX, moveZ = p.z - oldZ;
        const moved = Math.max(0.001, Math.hypot(moveX, moveZ));
        const ux = moveX / moved, uz = moveZ / moved;
        const width = Number(p.waveWidth) || 0.65;
        for (const mon of candidates) {
          if (!mon || mon.isDead || !mon.group || p.hitTargets.has(mon)) continue;
          const mx = mon.group.position.x - oldX, mz = mon.group.position.z - oldZ;
          const along = mx * ux + mz * uz;
          const across = Math.abs(mx * uz - mz * ux);
          const radius = Math.max(0.25, (Number(mon.scale) || 3) * 0.16);
          if (along < -radius || along > moved + radius || across > width + radius) continue;
          p.hitTargets.add(mon);
          const palmReturn = !!(p.skill && p.skill.palmN && p.returnStage === 1);
          const noPalmStun = !!(p.skill && p.skill.palmN && (p.returnStage === 1 || p.pulseIndex > 0));
          p.onWaveHit({
            type: p.isCoin ? "coinHit" : "waveHit", target: mon,
            x: mon.group.position.x, z: mon.group.position.z,
            scale: p.isCoin ? 0.35 : p.skill && p.skill.palmN ? (Number(p.skill.palmFrac) || 0.3) : 1,
            pulseIndex: p.pulseIndex || 0, returning: palmReturn,
            knockback: Number(p.skill && p.skill.wkb) || (p.skill && p.skill.palmN ? .25 : .6),
            statusSkill: noPalmStun ? { ...p.skill, stun: 0, stunP: null } : p.skill
          });
          if (p.skill && ["icelance", "frostsword", "icedart"].includes(p.skill.wstyle)) {
            p.forceStop = true;
            break;
          }
        }
      }

      if (p.forceStop) {
        p.tx = p.x;
        p.tz = p.z;
        p.maxD = p.trav + 0.01;
      }

      if (p.isWave) {
        p.trailCarry = (p.trailCarry || 0) + step;
        while (p.trailCarry >= 0.3) {
          p.trailCarry -= 0.3;
          const style = p.waveStyle || "fire";
          const screenDir = iso(p.vx, p.vy);
          activeFxList.push({
            type: "tongue", x: p.x - dirX * p.trailCarry, y: p.z - dirZ * p.trailCarry,
            t: 0, dur: style === "fire" ? 0.7 : 0.55, color: p.color,
            ws: style, ang: Math.atan2(screenDir.y, screenDir.x) + (p.returnStage === 1 ? Math.PI : 0), seed: Math.random(), sz: 1
          });
        }
      }

      // Vẽ đạn bay bằng hàm drawProj nguyên bản của 2.5D
      drawProj({
        x: p.x,
        y: p.z,
        vx: p.currentVx || p.vx,
        vy: p.currentVy || p.vy,
        color: p.color,
        style: p.style,
        phase: p.trav * 0.1
      });
    }

    // 2. Cập nhật & vẽ hiệu ứng (Effects)
    for (let i = activeFxList.length - 1; i >= 0; i--) {
      const fx = activeFxList[i];
      fx.t += dt;
      const progress = Math.min(0.999, fx.t / fx.dur);

      if (progress >= 0.999) {
        activeFxList.splice(i, 1);
        continue;
      }

      const sPos = fx.ground ? scrGround(fx.x, fx.y) : scr(fx.x, fx.y);
      if (fx.type === "authenticSkillSprite" || fx.type === "skillRing") drawAuthenticSkillSpriteFx(fx, sPos, progress);
      else drawFx(fx, sPos, progress);
    }
    drawParts();
  }

  // Export API ra window
  window.initFx2DCanvas = initFx2DCanvas;
  window.castAuthenticSkill = castAuthenticSkill;
  window.updateAndRenderFx2D = updateAndRenderFx2D;
  window.addSkillTrapFx3D = addSkillTrapFx3D;
  window.removeSkillTrapFx3D = removeSkillTrapFx3D;
  window.emitSkillAreaFx3D = emitSkillAreaFx3D;

})(window);
