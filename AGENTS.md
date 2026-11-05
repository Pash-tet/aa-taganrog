# AGENTS.md

## Project

Informational website for the Alcoholics Anonymous community in Taganrog, Russia (`aataganrog.ru`). The original website is unavailable to the project team, but archived snapshots can be used as historical references.

The website must help visitors quickly find up-to-date meeting times, locations, and contact details. All public-facing content must be in Russian. Make the site usable on mobile devices, low-bandwidth connections, and without client-side JavaScript.

## Tech stack

- Astro with TypeScript; prefer static site generation (SSG).
- Tailwind CSS 4 + DaisyUI 5 for styling.
- Pages CMS for non-technical content editors.
- GitHub repository and GitHub Pages for initial publishing.
- Do not introduce React, Vue, a server runtime, or a database unless explicitly requested.

## Historical site reference — required

- Wayback Machine snapshot supplied by the project owner: https://web.archive.org/web/20260316052115/https://aataganrog.ru
- The archive may redirect to another captured date. Record which capture and resources were actually inspected.
- Before making significant design decisions, examine the **rendered historical website**, any archived CSS, images, and logos. Treat this material as a **visual reference**, not a requirement to copy the outdated layout pixel-for-pixel.
- The project owner supplied a screenshot of the archived homepage and explicitly confirmed the exact brand colors below. **These values take precedence over guesses from archived CSS.**
- Preserve the site's recognizable identity, but modernize spacing, navigation, typography, and mobile layouts rather than copying the old layout pixel-for-pixel.
- Keep all palette choices as centralized design tokens / DaisyUI themes; avoid arbitrary hard-coded accent colors in components.
- Maintain adequate contrast (WCAG AA where practical), readable typography, and large tap targets, even if the original colors need accessible variants.
- Use archived content as a reference for information architecture, but **do not assume historical schedules, addresses, phone numbers, or announcements are current**. Require human verification before publishing them as current information.

## Approved color palette — required

The project owner confirmed two distinct color themes. Do not replace the colors without approval:

| Theme | Background | Foreground text | Brand accent       |
| ----- | ---------- | --------------- | ------------------ |
| Light | `#FFFFFF`  | `#000000`       | `#273B86` (blue)   |
| Dark  | `#000000`  | `#FFFFFF`       | `#FFD302` (yellow) |

- Light mode: white background, black text, blue primary elements (e.g. links, buttons, headings).
- Dark mode: black background, white text, yellow primary elements.
- Use white text on the blue primary color; use black text on the yellow primary color.
- Support both themes with DaisyUI 5, named `aa-light` and `aa-dark`, ideally respecting `prefers-color-scheme` and allowing an explicit user toggle only if implemented accessibly.
- Define complete DaisyUI theme tokens as required by the installed version; the three colors above are fixed brand anchors, while secondary surfaces, borders, and semantic state colors can be derived for visual harmony and accessibility.
- Meet readable contrast ratios and visible keyboard focus indicators. Don't make all content blue or yellow: accents should emphasize meaningful actions and hierarchy.
- Source: owner-provided screenshot of the archived site (Wayback snapshot dated February 17, 2026) and owner's direct confirmation of the six color values on November 5, 2026.

## Information architecture

Historical navigation includes:

- Новичку
- Новости
- Группы АА / Расписание собраний
- Литература
- Материалы (видео, спикерские, молитвы, на сегодня, девизы, статьи, шаги, традиции, принципы)
- Родственникам
- Профессионалам
- Обслуживание
- Наставничество
- Контакты

Use this as a content inventory, not as a mandate to reproduce a large, complicated navigation menu. Prioritize:

1. Find a meeting: schedule, address, directions, meeting type, and contact.
2. Newcomer information: what AA is and what to expect.
3. Contact details.
4. News and reference materials.

The historical homepage prominently displayed a day-by-day meeting schedule and an AA introduction. Retain the priority of that information in the redesign.

## UI and accessibility

- Prefer DaisyUI components over bespoke component systems; use Tailwind mainly for layout and spacing.
- Use semantic HTML and accessible navigation; avoid unnecessary animations and ornamental UI.
- Aim for a calm, clear, welcoming design. No advertising or tracking by default.
- Do not rely on external font or script CDNs to render critical content.
- Show essential schedule and contact information in the generated HTML (not only after JavaScript loads).
- Distinguish open and closed meetings clearly, with a short explanation.
- Keep a visible 'last verified' date on meeting details where possible.

## CMS and content

- Editors should manage news, meetings, locations, contacts, and ordinary pages through Pages CMS in a browser; no need to edit source code.
- Prefer Markdown, YAML, or Astro Content Collections with explicit schemas; keep content separate from templates.
- Model meetings with structured fields such as: group name, weekday, start time, end time, venue, address, meeting type, public contact, access notes, and last verification date.
- Do not duplicate a location's address across many meeting records if a shared venue reference can be used simply.
- Respect anonymity: never publish participant identities, private phone numbers, photos, or personal stories without explicit authorization.
- Do not copy entire archived articles or copyrighted AA literature into the new site without confirming permission to republish.

## Reliability and deployment

- The initial publishing target is GitHub Pages with a custom domain, but the **public site must be portable** to any static hosting provider.
- `npm run build` must produce self-contained static files in `dist/`.
- Avoid hard dependencies on GitHub APIs, third-party services, or CDNs for public-page rendering.
- Keep the content and assets in version control; document how to back up the repository and deploy `dist/` to alternative hosting.
- Hosting/CMS outages should not prevent already-published meeting and contact pages from loading.

## Development workflow

- Keep components small, reusable, and easy for coding agents to modify.
- Follow Astro conventions; prefer straightforward TypeScript and limited dependencies.
- Do not redesign the palette arbitrarily after historical colors are confirmed.
- Run a production build after significant changes and verify mobile layouts.
- Confirm changes to site architecture or content schemas with the project owner before making broad migrations.
