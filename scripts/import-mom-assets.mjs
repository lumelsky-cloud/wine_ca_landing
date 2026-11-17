import { cp, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const sourceRoot = path.join(root, 'Mom')
const cdnRoot = path.join(sourceRoot, 'static.tildacdn.com')
const outputRoot = path.join(root, 'public', 'images', 'mom')
const dataRoot = path.join(root, 'data')
const pages = { home: 'index.html', gifts: 'gifts.html', events: 'meropriyatiya.html', partners: 'partners.html', members: 'members.html' }
const imagePattern = /(?:https?:)?(?:\.\.\/)?(?:static|thb)\.tildacdn\.com\/([^"'<> )]+?\.(?:jpe?g|png|webp|gif|svg))/gi
const ignoredContent = /(?:^|\/)(?:menu|instagram|telegram_2|whatsapp_1png|whatsapp_3|tildacopy|logo__|logo18_|Unique_Moments|Goelro_logo|arw_)/i

async function exists(file) { try { return (await stat(file)).isFile() } catch { return false } }
const decode = value => value.replaceAll('&quot;', '"').replaceAll('&amp;', '&')

await mkdir(outputRoot, { recursive: true })
await mkdir(dataRoot, { recursive: true })
await cp(cdnRoot, outputRoot, { recursive: true, force: true })
for (const looseFile of ['DSC09029_3.jpg.webp', 'backblue.gif', 'fade.gif']) {
  const source = path.join(sourceRoot, looseFile)
  if (await exists(source)) await cp(source, path.join(outputRoot, looseFile), { force: true })
}

const manifest = {}
for (const [key, page] of Object.entries(pages)) {
  const html = decode(await readFile(path.join(sourceRoot, 'moments-msc.ru', page), 'utf8'))
  const refs = [...html.matchAll(imagePattern)].map(match => match[1].replace(/\/-\/[^/]+\//, '/'))
  const assets = []
  for (const ref of [...new Set(refs)]) {
    if (await exists(path.join(cdnRoot, ...ref.split('/')))) assets.push(`/images/mom/${ref}`)
  }
  manifest[key] = { all: assets, photos: assets.filter(asset => !ignoredContent.test(asset) && !asset.endsWith('.svg')) }
}

const allFiles = []
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) await walk(full)
    else if (/\.(?:jpe?g|png|webp|gif|svg)$/i.test(entry.name)) allFiles.push(path.relative(outputRoot, full).replaceAll('\\', '/'))
  }
}
await walk(outputRoot)
manifest.inventory = allFiles
await writeFile(path.join(dataRoot, 'gallery-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Imported ${allFiles.length} image files from Mom`)
