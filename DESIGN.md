# Design System — DailyTask

## Product Context
- **What this is:** A solo productivity tool that keeps the person disciplined every day.
- **Who it's for:** Individual users who need structure and strict rhythm over soft habit tracking.
- **Space/industry:** Productivity, Daily Planners, Habit Trackers.
- **Project type:** Web App

## Aesthetic Direction
- **Direction:** Brutalist / Industrial
- **Decoration level:** Minimal
- **Mood:** Authoritative, high-stakes, strict, unyielding. It rejects the soft, dopamine-driven aesthetics of modern productivity apps. Tasks are not checked off; they are executed.
- **Reference sites:** None (Deliberate departure from category norms like Todoist/Notion).

## Typography
- **Display/Hero:** `Space Mono` — Monospace implies code, strictness, and unyielding rules.
- **Body:** `Geist Sans` — Exceptional legibility for long-form reading and task descriptions without being distracting.
- **UI/Labels:** `Geist Sans` (Uppercase, small text for metadata).
- **Data/Tables:** `Geist Mono` — For strict alignment of times, dates, and streaks (tabular-nums).
- **Loading:** Google Fonts (`<link href="https://fonts.googleapis.com/css2..." rel="stylesheet">`)
- **Scale:** Base 16px. h1(3rem) h2(2rem) h3(1.5rem) body(1rem) small(0.875rem) tiny(0.75rem).

## Color
- **Approach:** Restrained (Terminal-inspired High Contrast)
- **Primary / Background:** `#0A0A0A` (Dark mode default) — The void.
- **Secondary / Surface:** `#171717` — For cards and sidebars.
- **Primary Text:** `#F5F5F5`
- **Muted Text:** `#A3A3A3`
- **Border:** `#333333`
- **Accent:** `#FF3366` — High-visibility neon red/pink. Missed streaks and active states feel like severe alerts.
- **Semantic:** success (`#CCFF00`), warning (`#FFB800`), error (`#FF3366`), info (`#00E5FF`)
- **Light mode:** Inverts to `#FFFFFF` background, `#F5F5F5` surface, `#0A0A0A` text, keeping the harsh neon accent (`#E60039`).

## Spacing
- **Base unit:** 4px
- **Density:** Compact
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64)

## Layout
- **Approach:** Grid-disciplined
- **Grid:** Rigid columns. Sidebars and tables are heavily boxed with solid borders.
- **Max content width:** 1200px
- **Border radius:** 0px (Brutalist sharp corners everywhere)

## Motion
- **Approach:** Minimal-functional
- **Easing:** Linear or tight ease-in-out.
- **Duration:** 100ms (Micro). Snappy, immediate transitions. No slow, bouncing easing. Actions feel instant and deliberate.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| Today | Initial design system created | Created by /design-consultation based on brutalist/discipline context |
