import { getCollection, type CollectionEntry } from "astro:content"

export type AAMeetingEntry = CollectionEntry<"aa-meetings">
export type AAMeeting = AAMeetingEntry["data"]

export type AlanonMeetingEntry = CollectionEntry<"alanon-meetings">
export type AlanonMeeting = AlanonMeetingEntry["data"]

export async function getSortedAAMeetings(): Promise<AAMeetingEntry[]> {
  const all = await getCollection("aa-meetings")
  return all.sort((a, b) => {
    if (a.data.dayIndex !== b.data.dayIndex) {
      return a.data.dayIndex - b.data.dayIndex
    }
    return a.data.timeStart.localeCompare(b.data.timeStart)
  })
}

export async function getUpcomingAAMeeting(now: Date = new Date()): Promise<{
  meeting: AAMeeting
  label: string
}> {
  const meetings = await getSortedAAMeetings()

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Moscow",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  })
  const parts = formatter.formatToParts(now)
  const weekdayPart = parts.find((p) => p.type === "weekday")?.value
  const hourPart = parseInt(
    parts.find((p) => p.type === "hour")?.value || "12",
    10
  )
  const minutePart = parseInt(
    parts.find((p) => p.type === "minute")?.value || "0",
    10
  )
  const currentMinutes = hourPart * 60 + minutePart

  const dayMap: Record<string, number> = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7
  }

  const currentDayIndex = dayMap[weekdayPart || "Mon"] || 1

  // Find if there is a meeting today that hasn't finished yet
  const todayMeetings = meetings.filter(
    (m) => m.data.dayIndex === currentDayIndex
  )
  const nextTodayMeeting = todayMeetings.find((m) => {
    const [endH, endM] = m.data.timeEnd.split(":").map((v) => parseInt(v, 10))
    const endMinutes = endH * 60 + (endM || 0)
    return endMinutes > currentMinutes
  })

  if (nextTodayMeeting) {
    return { meeting: nextTodayMeeting.data, label: "Сегодня" }
  }

  // Otherwise, find the next day that has a meeting
  for (let offset = 1; offset <= 7; offset++) {
    const nextDayIndex = ((currentDayIndex - 1 + offset) % 7) + 1
    const nextDayMeetings = meetings.filter(
      (m) => m.data.dayIndex === nextDayIndex
    )
    if (nextDayMeetings.length > 0) {
      const label = offset === 1 ? "Завтра" : nextDayMeetings[0].data.day
      return { meeting: nextDayMeetings[0].data, label }
    }
  }

  return { meeting: meetings[0].data, label: "Сегодня" }
}

export async function getSortedAlanonMeetings(): Promise<AlanonMeetingEntry[]> {
  const all = await getCollection("alanon-meetings")
  return all.sort((a, b) => a.data.dayIndex - b.data.dayIndex)
}
