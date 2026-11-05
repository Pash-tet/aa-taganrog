import assert from "node:assert/strict"
import { readFile, readdir, access } from "node:fs/promises"

const root = new URL("../dist/", import.meta.url)
const sitemap = await readFile(new URL("sitemap.xml", root), "utf8")
const robots = await readFile(new URL("robots.txt", root), "utf8")
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1]
)
const files = (await readdir(root, { recursive: true })).filter(
  (file) => file.endsWith(".html") && !/^(404|500)\.html$/.test(file)
)
assert.equal(
  urls.length,
  files.length,
  "Карта сайта должна включать все страницы"
)
assert.equal(new Set(urls).size, urls.length, "В карте сайта есть дубликаты")
assert.ok(
  robots.includes("Sitemap: https://aataganrog.ru/sitemap.xml")
)
assert.doesNotMatch(robots, /Disallow:\s*\//)
const titles = new Set()
const descriptions = new Set()
for (const file of files) {
  const html = await readFile(new URL(file, root), "utf8")
  for (const [, path] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    if (path.startsWith("//")) continue
    assert.ok(
      !path.startsWith("/aa-taganrog/"),
      `Неверный путь в ${file}: ${path}`
    )
    await access(new URL(path.slice(1), root))
  }
  const expected = new URL(
    file.replace(/index\.html$/, ""),
    "https://aataganrog.ru/"
  ).href
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  assert.equal(canonical, expected, file)
  assert.ok(urls.includes(canonical), `Нет в карте сайта: ${file}`)
  assert.match(html, /<html lang="ru"/)
  assert.doesNotMatch(html, /noindex/)
  assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1, file)
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1]
  const description = html.match(
    /<meta name="description" content="([^"]+)"/
  )?.[1]
  assert.ok(
    title && !titles.has(title),
    `Повторяющийся или пустой заголовок: ${file}`
  )
  assert.ok(
    description && !descriptions.has(description),
    `Повторяющееся или пустое описание: ${file}`
  )
  titles.add(title)
  descriptions.add(description)
  assert.ok(html.includes(`property="og:url" content="${canonical}"`), file)
  const image = new URL(
    html.match(/property="og:image" content="([^"]+)"/)?.[1]
  )
  if (image.origin === "https://aataganrog.ru")
    await access(new URL(image.pathname.slice(1), root))
  for (const match of html.matchAll(
    /type="application\/ld\+json">(.*?)<\/script>/gs
  ))
    JSON.parse(match[1])
}
console.log(`SEO: проверено страниц — ${files.length}`)
