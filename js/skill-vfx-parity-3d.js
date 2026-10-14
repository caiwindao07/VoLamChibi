/* Exact skill VFX entries from the current Game_2.5D table. Keep 3D-only entries while restoring shared casts, areas and secondary effects. */
(function(){
  const vfx25d = {
  "Vũ Đả Lê Hoa": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "icerain",
      "col": "#8fb8ff",
      "n": 14
    },
    "impact": "ice",
    "shake": 1
  },
  "Thiên Địa Vô Cực": {
    "pose": "cast",
    "area": {
      "t": "tdvc",
      "col": "#fff4b8",
      "dur": 1
    },
    "shake": 3
  },
  "Kim Cang Phá Sơn Chưởng": {
    "pose": "punch",
    "area": {
      "t": "palm",
      "col": "#ffd35a"
    },
    "shake": 7
  },
  "Thiền Âm Chấn Thế": {
    "pose": "stomp",
    "area": {
      "t": "nova",
      "col": "#ffe08a"
    },
    "shake": 6
  },
  "Bá Vương Phá Kim": {
    "pose": "slash",
    "area": {
      "t": "sweep",
      "col": "#ff9a3a"
    },
    "shake": 6
  },
  "Chùy Tảo Bát Phương": {
    "pose": "spin",
    "area": {
      "t": "whirl",
      "col": "#ffb86a",
      "item": "blade",
      "n": 10
    },
    "shake": 5
  },
  "Nhất Trịch Đoạt Mệnh": {
    "pose": "throw",
    "area": {
      "t": "rain",
      "item": "dart",
      "col": "#c8ffd0",
      "n": 36
    },
    "shake": 4
  },
  "Tỏa Tâm Độc Ảnh": {
    "pose": "throw",
    "area": {
      "t": "snakes",
      "col": "#7aff9a"
    },
    "shake": 4
  },
  "Xuyên Vân Phá Nhật": {
    "pose": "bow",
    "area": {
      "t": "pillar",
      "col": "#fff0a0"
    },
    "shake": 6
  },
  "Vạn Tiễn Tề Phát": {
    "pose": "bow",
    "area": {
      "t": "rain",
      "item": "arrow",
      "col": "#fff0c0",
      "n": 56
    },
    "shake": 5
  },
  "Hoa Kiếm Lạc Tinh": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "moon",
      "col": "#ffc0e8"
    },
    "shake": 5
  },
  "Hàn Vũ Tinh Lạc": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "blizzard",
      "col": "#bfe8ff"
    },
    "shake": 5
  },
  "Băng Phong Trảm Nguyệt": {
    "pose": "slash",
    "area": {
      "t": "icenova",
      "col": "#9ad8ff"
    },
    "shake": 5
  },
  "Hàn Yên Ngưng Băng": {
    "pose": "stomp",
    "area": {
      "t": "icenova",
      "col": "#d8f4ff"
    },
    "shake": 6
  },
  "Lục Long Hội Thiên": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "firewheel",
      "col": "#ffb040"
    },
    "shake": 7
  },
  "Côn Chấn Sơn Hà": {
    "pose": "stomp",
    "area": {
      "t": "quake",
      "col": "#d8b070"
    },
    "shake": 8
  },
  "Tật Hỏa Liệu Nguyên": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "flames",
      "col": "#ff5a1a"
    },
    "shake": 7
  },
  "Nộ Hải Cuồng Đào": {
    "pose": "slash",
    "area": {
      "t": "sweep",
      "col": "#6ad0ff"
    },
    "shake": 6
  },
  "Ngân Hà Kiếm Vũ": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "rain",
      "item": "sword",
      "col": "#e6f6ff",
      "n": 48
    },
    "shake": 6
  },
  "Thái Thanh Hóa Vũ": {
    "pose": "punch",
    "area": {
      "t": "taichi",
      "col": "#e8f8ff",
      "dur": 2,
      "hits": 6
    }
  },
  "Hô Phong Đao": {
    "pose": "slash",
    "p": "crescent",
    "impact": "wind"
  },
  "Cuồng Phong Trảm": {
    "pose": "slash",
    "p": "moon",
    "impact": "wind"
  },
  "Phong Quyển Lạc Diệp": {
    "pose": "slash",
    "area": {
      "t": "whirl",
      "col": "#d8f0c8",
      "item": "leaf",
      "n": 12
    },
    "impact": "wind"
  },
  "Tuyết Sơn Phong Bạo": {
    "pose": "slash",
    "impact": "wind"
  },
  "Cương Phong Liệt Thiên": {
    "pose": "slash",
    "impact": "wind"
  },
  "Ngũ Lôi Chưởng": {
    "pose": "cast",
    "cast": 1,
    "snd": "thunder",
    "area": {
      "t": "nova",
      "col": "#c8b0ff"
    }
  },
  "Lôi Hỏa Chấn Địa": {
    "pose": "cast",
    "cast": 1,
    "snd": "quake",
    "area": {
      "t": "erupt",
      "col": "#c8b0ff",
      "hits": 2
    }
  },
  "Lôi Vân Tỏa Địa": {
    "pose": "stomp",
    "snd": "thunder",
    "area": {
      "t": "icenova",
      "col": "#d8c8ff"
    }
  },
  "Kiếm Quyết Phù Vân": {
    "pose": "cast",
    "area": {
      "t": "swordfall",
      "col": "#fff2b0",
      "n": 10,
      "dur": 1.9,
      "hits": 4
    }
  },
  "Cửu Tiêu Lôi Phạt": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "thunder9",
      "col": "#fff0b0",
      "n": 4,
      "dur": 1.6,
      "hits": 3,
      "tot": 0.85
    }
  },
  "Thiên Lôi Phá Nhạc": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "thunder",
      "col": "#e0d0ff",
      "n": 28,
      "dur": 2.4,
      "hits": 6
    }
  },
  "Thần Thủ Phách Không": {
    "pose": "cast",
    "p": "palm",
    "impact": "fire"
  },
  "Thăng Long Chưởng": {
    "pose": "cast",
    "cast": 1,
    "impact": "fire",
    "shake": 3
  },
  "Long Hống Cửu Châu": {
    "pose": "cast",
    "cast": 1,
    "impact": "fire",
    "shake": 5
  },
  "Long Đằng Cửu Tiêu": {
    "pose": "cast",
    "cast": 1,
    "impact": "fire",
    "shake": 6,
    "snd": "fireblast"
  },
  "Khất Bát Côn": {
    "pose": "slash",
    "melee": {
      "t": "arcs",
      "n": 2,
      "col": "#b8e68a",
      "r": 24
    },
    "impact": "leaf"
  },
  "Lục Trúc Côn Trận": {
    "pose": "spin",
    "area": {
      "t": "whirl",
      "col": "#a6e07a",
      "item": "staff",
      "n": 8
    },
    "impact": "leaf",
    "shake": 3
  },
  "Thanh Trúc Phi Côn": {
    "pose": "throw",
    "p": "greenbolt",
    "impact": "ring",
    "shake": 3
  },
  "Trúc Ảnh Truy Hồn": {
    "pose": "cast",
    "cast": 1,
    "impact": "ring",
    "shake": 5
  },
  "Kiếm Tâm Thông Minh": {
    "pose": "thrust",
    "melee": {
      "t": "thrust",
      "col": "#fff0b0"
    },
    "area": {
      "t": "halo",
      "col": "#ffe08a"
    },
    "impact": "gold"
  },
  "Vô Cực Càn Khôn": {
    "pose": "punch",
    "area": {
      "t": "taichi",
      "col": "#e0f0ff",
      "dur": 1.8,
      "hits": 5
    }
  },
  "Thái Cực Kiếm Quang": {
    "pose": "thrust",
    "melee": {
      "t": "thrust",
      "col": "#ffe6a0"
    },
    "area": {
      "t": "halo",
      "col": "#ffe08a"
    },
    "impact": "gold"
  },
  "Bá Vương Thương": {
    "pose": "thrust",
    "impact": "gold",
    "shake": 6
  },
  "Thiết Chùy Phá Quân": {
    "pose": "dualR",
    "melee": {
      "t": "arcs",
      "n": 1,
      "col": "#ffe08a",
      "r": 26
    },
    "impact": "gold",
    "shake": 3
  },
  "Thiên Quân Kỵ Đao": {
    "pose": "slash",
    "melee": {
      "t": "arcs",
      "n": 2,
      "col": "#ffcf8a",
      "r": 26
    },
    "impact": "gold",
    "shake": 3
  },
  "Phá Phong Đao": {
    "pose": "slash",
    "melee": {
      "t": "arcs",
      "col": "#f0e0c0"
    },
    "impact": "gold"
  },
  "Kỵ Đao Hoành Trảm": {
    "pose": "spin",
    "area": {
      "t": "sweep",
      "col": "#ffd9a0"
    },
    "impact": "gold"
  },
  "Thiết Kỵ Đột Kích": {
    "pose": "slash",
    "melee": {
      "t": "cleave",
      "col": "#ffcf8a"
    },
    "impact": "gold",
    "shake": 5
  },
  "Lưu Quang Tam Kiếm": {
    "pose": "thrust",
    "impact": "ice",
    "shake": 3
  },
  "Kiếm Vũ Lưu Quang": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "rain",
      "col": "#9fe0ff"
    },
    "impact": "ice",
    "shake": 2
  },
  "Lê Hoa Độc Vũ": {
    "pose": "throw",
    "p": "needle",
    "impact": "poison",
    "shake": 2
  },
  "Vạn Xà Phệ Tâm": {
    "pose": "cast",
    "cast": 1,
    "impact": "poison",
    "shake": 4
  },
  "Băng Hà Thiên Lý": {
    "pose": "cast",
    "cast": 1,
    "impact": "ice",
    "shake": 5
  },
  "Hàn Băng Tuyệt Vực": {
    "pose": "stomp",
    "area": {
      "t": "icenova",
      "col": "#e6f6ff"
    },
    "impact": "ice",
    "shake": 9
  },
  "Hàn Sương Lạc Nguyệt": {
    "pose": "spin",
    "area": {
      "t": "rain",
      "item": "petal",
      "col": "#ffd6ec",
      "n": 30
    },
    "impact": "petal",
    "snd": "silk",
    "shake": 3
  },
  "Mãn Thiên Nguyệt Hoa": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "moon",
      "col": "#e6e0ff"
    },
    "impact": "moon",
    "snd": "lunar",
    "shake": 5
  },
  "Thiên Hỏa Phần Thành": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "meteor",
      "col": "#ff5a1e"
    },
    "impact": "fire",
    "shake": 12
  },
  "Vân Long Liệt Kích": {
    "pose": "thrust",
    "melee": {
      "t": "thrust",
      "col": "#e8f4ff"
    },
    "shake": 5
  },
  "Thiên Ngoại Lưu Hỏa": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "meteor",
      "col": "#ff5a1e"
    },
    "impact": "fire",
    "shake": 12,
    "crack": "lava"
  },
  "Ma Diễm Thất Sát": {
    "pose": "slash",
    "melee": {
      "t": "slash",
      "col": "#ff3a1e"
    },
    "impact": "fire",
    "shake": 4
  },
  "Nhiếp Hồn Loạn Phách": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "flames",
      "col": "#e04aff"
    },
    "impact": "fire",
    "shake": 5
  },
  "Thiên Sơn Tuyết Đao": {
    "pose": "slash",
    "impact": "ice",
    "shake": 6
  },
  "Băng Tâm Tiên Tử": {
    "pose": "spin",
    "impact": "ice",
    "shake": 3
  },
  "Bích Hải Triều Sinh": {
    "pose": "spin",
    "impact": "ice",
    "shake": 2
  },
  "Huyết Chiến Bát Phương": {
    "pose": "spin",
    "area": {
      "t": "whirl",
      "col": "#ff4a3a",
      "item": "blade",
      "n": 12
    },
    "impact": "blood",
    "shake": 7
  },
  "La Hán Phục Ma": {
    "pose": "punch",
    "impact": "gold",
    "shake": 6
  },
  "Đạt Ma Độ Giang": {
    "pose": "punch",
    "impact": "dust",
    "shake": 1.5
  },
  "Phật Thủ Thiên Chưởng": {
    "pose": "punch",
    "area": {
      "t": "palm",
      "col": "#ffd35a"
    },
    "impact": "rock",
    "shake": 12
  },
  "Lạc Nhật Thần Tiễn": {
    "pose": "bow",
    "p": "bigarrow",
    "impact": "gold",
    "shake": 6,
    "bowGlow": "#fff0a0",
    "area": {
      "t": "pillar",
      "col": "#fff0a0"
    }
  },
  "Thiên La Tiễn Vũ": {
    "pose": "bow",
    "area": {
      "t": "rain",
      "item": "arrow",
      "col": "#fff0c0",
      "n": 48
    },
    "impact": "spark",
    "shake": 4
  },
  "Liên Hoàn Kiếm": {
    "pose": "slash",
    "melee": {
      "t": "arcs",
      "n": 3,
      "col": "#a8dcff",
      "r": 26
    },
    "impact": "spark"
  },
  "Phong Quyển Kiếm": {
    "pose": "spin",
    "area": {
      "t": "whirl",
      "col": "#c9f0ff",
      "item": "sword",
      "n": 8
    },
    "impact": "wind"
  },
  "Vạn Kiếm Triều Thiên": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "rain",
      "item": "sword",
      "col": "#dff4ff",
      "n": 24
    },
    "impact": "spark",
    "shake": 5
  },
  "Thái Cực Chưởng": {
    "pose": "punch",
    "area": {
      "t": "taichi",
      "col": "#cfe8ff",
      "dur": 1.2,
      "hits": 2
    }
  },
  "Lưỡng Nghi Chưởng": {
    "pose": "punch",
    "area": {
      "t": "taichi",
      "col": "#cfe8ff",
      "dur": 1.4,
      "hits": 3
    }
  },
  "Tĩnh Tọa Quy Nguyên": {
    "pose": "punch",
    "area": {
      "t": "taichi",
      "col": "#dff0ff",
      "dur": 1.6,
      "hits": 4
    }
  },
  "Xuyên Tâm Thương": {
    "pose": "thrust",
    "melee": {
      "t": "thrust",
      "col": "#ffd9a0"
    },
    "impact": "spark"
  },
  "Hoành Tảo Thiên Quân": {
    "pose": "chop",
    "area": {
      "t": "goldring",
      "col": "#ffc030"
    },
    "impact": "dust",
    "shake": 3
  },
  "Long Thương Phá Trận": {
    "pose": "thrust",
    "p": "spear",
    "impact": "gold",
    "shake": 3
  },
  "Thiết Chùy Kích": {
    "pose": "dualR",
    "melee": {
      "t": "arcs",
      "n": 1,
      "col": "#e8d6b0"
    },
    "impact": "spark",
    "shake": 3
  },
  "Chùy Chấn Địa": {
    "pose": "stomp",
    "area": {
      "t": "quake",
      "col": "#d9b36a"
    },
    "impact": "rock",
    "shake": 7
  },
  "Lưu Tinh Chùy": {
    "pose": "dualR",
    "melee": {
      "t": "arcs",
      "n": 1,
      "col": "#ff7a5a"
    },
    "impact": "blood"
  },
  "Long Trảo Chưởng": {
    "pose": "cast",
    "cast": 1,
    "impact": "fire",
    "shake": 2
  },
  "Song Long Xuất Hải": {
    "pose": "cast",
    "cast": 1,
    "impact": "fire",
    "shake": 3
  },
  "Tứ Long Truy Hồn": {
    "pose": "cast",
    "cast": 1,
    "impact": "fire",
    "shake": 4
  },
  "Trúc Bổng Kích": {
    "pose": "slash",
    "melee": {
      "t": "arcs",
      "n": 2,
      "col": "#b8e68a",
      "r": 24
    },
    "impact": "leaf"
  },
  "Phi Bổng Truy Phong": {
    "pose": "throw",
    "impact": "leaf"
  },
  "Vạn Bổng Loạn Vũ": {
    "pose": "cast",
    "cast": 1,
    "impact": "leaf"
  },
  "Thanh Xà Châm": {
    "pose": "throw",
    "p": "needle",
    "impact": "poison"
  },
  "Vạn Độc Vũ": {
    "pose": "throw",
    "p": "needle",
    "impact": "poison"
  },
  "Độc Vụ Trận": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "cloud",
      "col": "#6fcf4a"
    },
    "impact": "poison"
  },
  "Xà Nha Chủy": {
    "pose": "throw",
    "melee": {
      "t": "fang",
      "col": "#b8f08a"
    },
    "impact": "poison"
  },
  "Song Xà Loạn Vũ": {
    "pose": "spin",
    "area": {
      "t": "snakes",
      "col": "#9fe07a"
    },
    "impact": "poison"
  },
  "Xà Vương Nhất Kích": {
    "pose": "thrust",
    "melee": {
      "t": "beast",
      "kind": "snake",
      "col": "#c8ff7a"
    },
    "impact": "poison",
    "shake": 4
  },
  "Hàn Băng Tiễn": {
    "pose": "cast",
    "p": "shard",
    "impact": "ice"
  },
  "Băng Phách Liên Châu": {
    "pose": "cast",
    "p": "shard",
    "impact": "ice"
  },
  "Tuyết Lạc Vạn Lý": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "blizzard",
      "col": "#e6f6ff"
    },
    "impact": "ice"
  },
  "Hàn Vụ": {
    "pose": "cast",
    "area": {
      "t": "nova",
      "col": "#cfeeff"
    },
    "impact": "ice"
  },
  "Băng Phong Trụ": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "pillar",
      "col": "#aee0ff"
    },
    "impact": "ice",
    "shake": 4
  },
  "Vạn Niên Hàn Băng": {
    "pose": "stomp",
    "area": {
      "t": "icenova",
      "col": "#e6f6ff"
    },
    "impact": "ice",
    "shake": 6
  },
  "Lưu Vân Tụ": {
    "pose": "slash",
    "melee": {
      "t": "ribbon",
      "col": "#f4b8e8"
    },
    "impact": "petal",
    "snd": "silk"
  },
  "Nguyệt Hoa Vũ": {
    "pose": "spin",
    "area": {
      "t": "silk",
      "col": "#e0b0ff"
    },
    "impact": "petal",
    "snd": "silk"
  },
  "Kinh Hồng Nhất Vũ": {
    "pose": "spin",
    "area": {
      "t": "lotus",
      "col": "#ff8ac8"
    },
    "impact": "petal",
    "snd": "silk",
    "shake": 2
  },
  "Nguyệt Quang Phiêu": {
    "pose": "cast",
    "p": "lunar",
    "impact": "moon",
    "snd": "lunar"
  },
  "Song Nguyệt Liên Hoàn": {
    "pose": "cast",
    "p": "lunar",
    "impact": "moon",
    "snd": "lunar"
  },
  "Mãn Nguyệt Chiếu": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "moonring",
      "col": "#c8d8ff"
    },
    "impact": "moon",
    "snd": "lunar",
    "shake": 2
  },
  "Tàn Dương Như Huyết": {
    "pose": "thrust",
    "melee": {
      "t": "thrust",
      "col": "#ff7a2e"
    },
    "impact": "fire"
  },
  "Liệt Hỏa Phần Thiên": {
    "pose": "chop",
    "area": {
      "t": "flames",
      "col": "#ff5a1e"
    },
    "impact": "fire",
    "shake": 7
  },
  "Thâu Nhật Hoán Thiên": {
    "pose": "spin",
    "area": {
      "t": "firewheel",
      "col": "#ff9a3c"
    },
    "impact": "fire",
    "shake": 4
  },
  "Đơn Đao Liệt Diễm": {
    "pose": "slash",
    "melee": {
      "t": "cleave",
      "col": "#ff8a3a"
    },
    "impact": "fire"
  },
  "Thôi Sơn Đảo Hải": {
    "pose": "stomp",
    "area": {
      "t": "flames",
      "col": "#ff7a2e"
    },
    "impact": "rock",
    "shake": 7
  },
  "Hỏa Liên Phần Tâm": {
    "pose": "cast",
    "p": "fireball",
    "impact": "fire"
  },
  "Ảo Ảnh Hồ Ly": {
    "pose": "cast",
    "cast": 1,
    "impact": "fire"
  },
  "Bi Phong Tán Hồn": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "flames",
      "col": "#c88aff"
    },
    "impact": "fire",
    "shake": 3
  },
  "Lệ Ma Đoạt Hồn": {
    "pose": "cast",
    "p": "orb",
    "impact": "fire"
  },
  "Phá Sơn Đao": {
    "pose": "slash",
    "melee": {
      "t": "cleave",
      "col": "#d8ecff"
    },
    "impact": "rock",
    "shake": 5
  },
  "Toàn Phong Trảm": {
    "pose": "spin",
    "area": {
      "t": "whirl",
      "col": "#c9e6ff",
      "item": "blade",
      "n": 6
    },
    "impact": "spark"
  },
  "Hàn Tuyết Đao Hải": {
    "pose": "spin",
    "area": {
      "t": "whirl",
      "col": "#bfe6ff",
      "item": "blade",
      "n": 10,
      "snow": 1
    },
    "impact": "ice",
    "shake": 4
  },
  "Ẩm Huyết Trảm": {
    "pose": "slash",
    "melee": {
      "t": "arcs",
      "n": 2,
      "col": "#ff5a4a",
      "r": 28
    },
    "impact": "blood"
  },
  "Huyết Lang Kích": {
    "pose": "thrust",
    "melee": {
      "t": "beast",
      "kind": "wolf",
      "col": "#ff5a4a"
    },
    "impact": "blood",
    "shake": 4
  },
  "Bất Tử Cuồng Đao": {
    "pose": "spin",
    "area": {
      "t": "rain",
      "item": "blade",
      "col": "#ff4a3a",
      "n": 20
    },
    "impact": "blood",
    "shake": 4
  },
  "Hàng Long Bất Vũ": {
    "pose": "punch",
    "area": {
      "t": "twindragon",
      "col": "#ffd24a",
      "hits": 2
    },
    "impact": "gold",
    "shake": 3
  },
  "Thiết Sơn Quyền": {
    "pose": "punch",
    "melee": {
      "t": "fist",
      "n": 1,
      "col": "#ffe08a"
    },
    "impact": "gold",
    "shake": 3
  },
  "Liên Hoàn Quyền": {
    "pose": "punch",
    "melee": {
      "t": "fist",
      "n": 4,
      "col": "#ffe8a8"
    },
    "impact": "gold"
  },
  "Phá Thạch Quyền": {
    "pose": "punch",
    "area": {
      "t": "palm",
      "col": "#ffd35a"
    },
    "impact": "rock",
    "shake": 8
  },
  "Chấn Địa Công": {
    "pose": "stomp",
    "area": {
      "t": "quake",
      "col": "#d9b36a"
    },
    "impact": "dust",
    "shake": 5
  },
  "Địa Liệt Chưởng": {
    "pose": "punch",
    "area": {
      "t": "erupt",
      "col": "#c89a5a"
    },
    "impact": "rock",
    "shake": 5
  },
  "Sơn Băng Địa Liệt": {
    "pose": "stomp",
    "area": {
      "t": "quake",
      "col": "#e0b060"
    },
    "impact": "rock",
    "shake": 9
  },
  "Liệt Hỏa Tiễn": {
    "pose": "bow",
    "p": "firearrow",
    "impact": "fire",
    "bowGlow": "#ffb070"
  },
  "Băng Tâm Tiễn": {
    "pose": "bow",
    "p": "icearrow",
    "impact": "ice",
    "bowGlow": "#bfe8ff"
  },
  "Băng Phách Tiễn": {
    "pose": "bow",
    "p": "frostbolt",
    "impact": "ice",
    "shake": 2,
    "bowGlow": "#d8f4ff"
  },
  "Hàn Nguyệt Băng Tiễn": {
    "pose": "bow",
    "p": "frostbolt",
    "impact": "ice",
    "shake": 3,
    "bowGlow": "#bfe8ff"
  },
  "Băng Phong Vạn Lý Tiễn": {
    "pose": "bow",
    "p": "bigarrow",
    "impact": "ice",
    "shake": 5,
    "bowGlow": "#bfe8ff"
  },
  "Thiên La Địa Võng": {
    "pose": "throw",
    "p": "needle",
    "impact": "poison"
  },
  "Truy Tâm Tiễn": {
    "pose": "throw",
    "p": "comet",
    "impact": "spark",
    "shake": 2
  },
  "Tiểu Lý Phi Đao": {
    "pose": "throw",
    "p": "flydagger",
    "impact": "spark"
  },
  "Tán Hoa Tiêu": {
    "pose": "throw",
    "p": "xstar",
    "impact": "spark"
  },
  "Cửu Cung Phi Tinh": {
    "pose": "throw",
    "p": "coin",
    "impact": "gold"
  },
  "Đoạt Hồn Tiêu": {
    "pose": "throw",
    "p": "bigstar",
    "impact": "spark",
    "shake": 3
  },
  "Nhiếp Hồn Nguyệt Ảnh": {
    "pose": "throw",
    "p": "jade",
    "impact": "spark"
  },
  "Bạo Vũ Lê Hoa": {
    "pose": "throw",
    "p": "needle",
    "impact": "spark",
    "shake": 2
  },
  "Mạn Thiên Hoa Vũ": {
    "pose": "cast",
    "cast": 1,
    "area": {
      "t": "rain",
      "item": "petal",
      "col": "#ffc8e0",
      "n": 46,
      "hits": 3
    },
    "impact": "poison",
    "shake": 2
  },
  "Cửu Cung Phượng Tiễn": {
    "pose": "bow",
    "p": "phoenixarrow",
    "impact": "gold",
    "shake": 5,
    "bowGlow": "#ffd24a"
  },
  "Liên Châu Tiễn": {
    "pose": "bow",
    "p": "goldarrow",
    "impact": "gold"
  },
  "Xích Diễm Tiễn": {
    "pose": "bow",
    "p": "bigarrow",
    "impact": "fire",
    "shake": 3,
    "bowGlow": "#ffa060"
  },
  "Tam Hoa Tiễn": {
    "pose": "bow",
    "p": "arrow",
    "impact": "spark"
  },
  "Mãn Thiên Hoa Vũ": {
    "pose": "bow",
    "p": "flowerarrow",
    "impact": "petal"
  },
  "Tiễn Vũ Trận": {
    "pose": "bow",
    "area": {
      "t": "rain",
      "item": "arrow",
      "col": "#f0e0b0",
      "n": 28
    },
    "impact": "spark"
  }
};
  window.VFX = { ...(window.VFX || {}), ...vfx25d };

  // These two Võ Đang skills have dedicated sprite playback in fx2d_engine.js;
  // remove aliases so neither falls back to another skill's generic effect.
  if (window.VFX_ALIAS) {
    delete window.VFX_ALIAS["Kiếm Phi Kinh Thiên"];
    delete window.VFX_ALIAS["Tam Hoàn Thao Nguyệt"];
  }
  window.VFX["Kiếm Phi Kinh Thiên"] = {
    pose: "cast",
    cast: 1,
    area: { t: "rain", item: "sword", col: "#dff4ff", n: 24 },
    area2: { t: "nova", col: "#dff4ff" },
    area2Delay: 0.72,
    impact: null,
    shake: 5
  };
  window.VFX["Tam Hoàn Thao Nguyệt"] = {
    pose: "thrust",
    p: "flysword",
    impact: null,
    shake: 2
  };
})();
