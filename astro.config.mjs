// @ts-check
import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import icon from "astro-icon"
import { writeFile } from "node:fs/promises"

const site = "https://aataganrog.ru/"

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: "always",
  integrations: [
    icon(),
    {
      name: "static-seo-files",
      hooks: {
        "astro:build:done": async ({ pages, dir }) => {
          const urls = pages
            .filter(({ pathname }) => !/^(404|500)(\/|\.html)?$/.test(pathname))
            .map(({ pathname }) => {
              const url = new URL(pathname, site).href
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
              return `<url><loc>${url}</loc></url>`
            })
          await writeFile(
            new URL("sitemap.xml", dir),
            `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`
          )
          await writeFile(
            new URL("robots.txt", dir),
            `User-agent: *\nAllow: /\n\nSitemap: ${site}sitemap.xml\n`
          )
        }
      }
    }
  ],
  vite: {
    plugins: [tailwindcss()]
  }
})
