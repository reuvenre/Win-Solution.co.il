import { serveDir } from '../.ds-sync/storybook/http-serve.mjs'
import { createServer } from 'node:http'
import { readFileSync, statSync, existsSync } from 'node:fs'
import { resolve, extname } from 'node:path'
const root = resolve('ds-bundle')
const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2' }
createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0])
  if (p === '/') p = '/.review.html'
  const f = resolve(root + p)
  if (!f.startsWith(root) || !existsSync(f) || statSync(f).isDirectory()) { res.writeHead(404); return res.end('not found') }
  res.writeHead(200, { 'content-type': MIME[extname(f)] || 'application/octet-stream' })
  res.end(readFileSync(f))
}).listen(5599, '127.0.0.1', () => console.log('READY http://127.0.0.1:5599/'))
