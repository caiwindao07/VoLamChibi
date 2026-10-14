const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let PORT = 8081;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webmanifest': 'application/manifest+json',
};

function createServer(port) {
  const server = http.createServer((req, res) => {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    let pathname = reqUrl.pathname;

    if (pathname === '/' || pathname === '') {
      pathname = '/index.html';
    }

    const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    const filePath = path.join(ROOT_DIR, safePath);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found: ' + pathname);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
      });

      fs.createReadStream(filePath).pipe(res);
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`[CẢNH BÁO] Cổng ${port} đang bận, tự động chuyển sang ${port + 1}...`);
      createServer(port + 1);
    } else {
      console.error('[LỖI MÁY CHỦ]:', err);
    }
  });

  server.listen(port, '127.0.0.1', () => {
    const url = `http://localhost:${port}`;
    console.log('========================================================');
    console.log(`  VÕ LÂM CHIBI 3D - MÁY CHỦ RIÊNG (GAME 3D)`);
    console.log(`  Đang chạy tại: ${url}`);
    console.log('  Nhấn Ctrl+C để dừng máy chủ.');
    console.log('========================================================');

    if (process.platform === 'win32') {
      exec(`start ${url}`);
    }
  });
}

createServer(PORT);
