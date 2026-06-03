import { readFile, readdir, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

const distDir = 'dist'
const publicDir = 'public'
const basePath = '/cluster-presentation/'
const mimeTypes = {
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const toDataUri = (fileName, buffer) => {
  const mimeType = mimeTypes[extname(fileName).toLowerCase()] ?? 'application/octet-stream'
  return `data:${mimeType};base64,${buffer.toString('base64')}`
}

let html = await readFile(join(distDir, 'index.html'), 'utf8')

for (const [tag, src] of html.matchAll(/<script type="module" crossorigin src="([^"]+)"><\/script>/g)) {
  const filePath = src.replace(basePath, '')
  const js = (await readFile(join(distDir, filePath), 'utf8')).replace(/<\/script/gi, '<\\/script')
  html = html.replace(tag, () => `<script type="module">\n${js}\n</script>`)
}

for (const [tag, href] of html.matchAll(/<link rel="stylesheet" crossorigin href="([^"]+)">/g)) {
  const filePath = href.replace(basePath, '')
  const css = await readFile(join(distDir, filePath), 'utf8')
  html = html.replace(tag, () => `<style>\n${css}\n</style>`)
}

html = html.replaceAll(basePath, './')

for (const fileName of await readdir(publicDir)) {
  const extension = extname(fileName).toLowerCase()

  if (!mimeTypes[extension]) {
    continue
  }

  const dataUri = toDataUri(fileName, await readFile(join(publicDir, fileName)))
  const baseAssetPath = `${basePath}${fileName}`
  const relativePath = `./${fileName}`
  const directPath = `/${fileName}`

  html = html.replace(new RegExp(escapeRegExp(baseAssetPath), 'g'), () => dataUri)
  html = html.replace(new RegExp(escapeRegExp(relativePath), 'g'), () => dataUri)
  html = html.replace(new RegExp(escapeRegExp(directPath), 'g'), () => dataUri)
}

await writeFile(join(distDir, 'standalone.html'), html)

console.log('Created dist/standalone.html')
