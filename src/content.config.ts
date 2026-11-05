import { defineCollection, z } from "astro:content"
import { file, glob } from "astro/loaders"

const aaMeetings = defineCollection({
  loader: file("src/content/aa-meetings.json"),
  schema: z.object({
    id: z.string(),
    day: z.string(),
    dayShort: z.string(),
    dayIndex: z.number(),
    group: z.string(),
    time: z.string(),
    timeStart: z.string(),
    timeEnd: z.string(),
    address: z.string(),
    office: z.string().optional(),
    type: z.string().default("Закрытое"),
    typeNote: z.string().optional(),
    lastVerified: z.string().optional()
  })
})

const alanonMeetings = defineCollection({
  loader: file("src/content/alanon-meetings.json"),
  schema: z.object({
    id: z.string(),
    day: z.string(),
    dayShort: z.string().optional(),
    dayIndex: z.number(),
    group: z.string(),
    time: z.string(),
    timeStart: z.string().optional(),
    timeEnd: z.string().optional(),
    address: z.string(),
    office: z.string().optional()
  })
})

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    image: z.string().optional(),
    author: z.string().default("Сообщество АА Таганрога")
  })
})

export const collections = {
  "aa-meetings": aaMeetings,
  "alanon-meetings": alanonMeetings,
  news
}
