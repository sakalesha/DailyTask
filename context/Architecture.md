# Architecture Document

**Project:** Today
**Version:** 1.0 (MVP)
**Date:** 11 August 2026
**Status:** Draft

# 1. Architecture Goals

The architecture is designed around four principles:

* **Offline-first:** The application must work fully without internet connectivity.
* **Fast startup:** Opening the app should feel instantaneous on both desktop and mobile.
* **Single-user simplicity:** Optimize for one user and one account.
* **Future extensibility:** Allow AI planning, analytics, and calendar integration later without major rewrites.

# 2. High-Level Architecture

```text
+----------------------+
|      React PWA       |
|  (Vite + TypeScript) |
+----------+-----------+
           |
           |
           v
+----------------------+
|    Zustand Store     |
|  UI + App State      |
+----------+-----------+
           |
           |
           v
+----------------------+
|   IndexedDB (Dexie)  |
|   Local Source       |
+----------+-----------+
           |
   Sync when online
           |
           v
+----------------------+
|     Supabase API     |
|   Auth + Postgres    |
+----------------------+
```

# 3. Technology Stack

| Layer            | Technology             |
| ---------------- | ---------------------- |
| Frontend         | React 18               |
| Build Tool       | Vite                   |
| Language         | TypeScript             |
| Styling          | Tailwind CSS           |
| State Management | Zustand                |
| Local Database   | IndexedDB via Dexie.js |
| Cloud Database   | Supabase PostgreSQL    |
| Authentication   | Supabase Auth          |
| PWA              | vite-plugin-pwa        |
| Deployment       | Vercel                 |

# 4. Architectural Pattern

The application follows a **feature-based modular architecture**.

```text
src/
├── app/
├── components/
├── features/
│   ├── today/
│   ├── planning/
│   ├── focus/
│   └── review/
├── services/
├── store/
├── db/
├── hooks/
├── types/
└── utils/
```

Each feature owns its UI, hooks, services, and business logic.

# 5. Rendering Strategy

The application is a **client-side rendered PWA**.

Reasons:

* Instant offline support
* Minimal infrastructure
* Fast navigation
* Simpler synchronization logic
* No SEO requirements

# 6. Data Flow

## Task Creation

```text
User
  |
  v
React Component
  |
  v
Zustand Action
  |
  v
IndexedDB
  |
  +------> UI Updates Immediately
  |
  v
Sync Queue
  |
  v
Supabase
```

The UI never waits for the network.

# 7. Offline-First Strategy

## Write Path

1. User creates or updates data.
2. Data is written to IndexedDB immediately.
3. UI reflects changes instantly.
4. Record is added to sync queue.
5. Background synchronization uploads changes when online.

## Read Path

All reads come from **IndexedDB**, not directly from Supabase.

Benefits:

* Fast performance
* Offline capability
* Consistent behavior
* Reduced network requests

# 8. Synchronization Architecture

## Sync Trigger

Synchronization occurs:

* On application launch
* When connectivity is restored
* Periodically while online
* After important write operations

## Conflict Resolution

Because the application is single-user, conflict handling is simple.

Strategy:

**Last Updated Timestamp Wins**

```text
Local updatedAt > Remote updatedAt
        |
        +--> Upload Local

Remote updatedAt > Local updatedAt
        |
        +--> Download Remote
```

# 9. State Management

## Zustand Store Structure

```text
store/
├── task-store.ts
├── daily-plan-store.ts
├── ui-store.ts
└── sync-store.ts
```

### task-store

* tasks
* createTask
* updateTask
* deleteTask
* completeTask
* reorderTasks

### daily-plan-store

* currentPlan
* setAvailableHours
* setEnergyLevel
* setReflection
* carryForwardTasks

### ui-store

* currentView
* focusTaskId
* theme
* sidebarOpen

### sync-store

* online
* syncing
* lastSync
* pendingChanges

# 10. Local Database Design

## tasks

```text
id
title
completed
priority
estimatedMinutes
scheduledDate
timeStart
timeEnd
createdAt
updatedAt
deleted
```

## daily_plans

```text
date
availableHours
energyLevel
reflection
createdAt
updatedAt
```

## sync_queue

```text
id
entity
entityId
operation
timestamp
```

# 11. Service Layer

```text
services/
├── task-service.ts
├── daily-plan-service.ts
├── sync-service.ts
├── supabase-service.ts
└── pwa-service.ts
```

Business logic remains outside UI components.

# 12. Component Architecture

## Dashboard

```text
DashboardPage
├── DateHeader
├── TopPriorities
├── ProgressRing
├── TaskList
│   ├── TaskItem
│   └── TaskItem
├── QuickAdd
└── BottomNavigation
```

## Focus Mode

```text
FocusPage
├── TaskHeader
├── Timer
├── Notes
└── CompleteButton
```

# 13. PWA Architecture

## Manifest

* Name: Today
* Short Name: Today
* Display: standalone
* Theme Color
* Background Color
* Icons

## Service Worker

Cached assets:

* HTML
* CSS
* JavaScript
* Fonts
* Icons

Network strategy:

```text
App Shell -> Cache First

Supabase API -> Network First

Static Assets -> Cache First
```

# 14. Security

## Authentication

Single Supabase account.

Authentication flow:

```text
Launch App
     |
     v
Existing Session?
     |
 +---+---+
 |       |
Yes      No
 |       |
 v       v
Dashboard Login
```

## Local Data

* Stored in IndexedDB
* No sensitive secrets in local storage
* Supabase keys handled through environment variables

# 15. Performance Strategy

## Optimizations

* Lazy-loaded routes
* Code splitting
* Memoized task lists
* Virtualization if task count grows
* IndexedDB indexing
* Background synchronization

Target metrics:

| Metric           | Target           |
| ---------------- | ---------------- |
| First Load       | less than 2 s    |
| Dashboard Render | less than 200 ms |
| Task Create      | less than 50 ms  |
| Task Complete    | less than 50 ms  |
| Offline Launch   | less than 1 s    |

# 16. Error Handling

## Database Errors

* Retry automatically
* Preserve local data
* Never block UI

## Sync Errors

* Exponential backoff
* Retry queue
* Offline fallback

## Corruption Recovery

* Validate schema on startup
* Backup before migrations
* Rebuild indexes if needed

# 17. Scalability Considerations

Although built for one user, the architecture supports future features:

* AI planner service
* Calendar integration
* Analytics engine
* Habit tracking
* Multi-device synchronization
* Notification scheduling

No major architectural changes should be required for these additions.

# 18. Architecture Decisions

| Decision              | Reason                                                  |
| --------------------- | ------------------------------------------------------- |
| React + Vite          | Fast development and excellent PWA support              |
| Zustand               | Minimal and scalable state management                   |
| IndexedDB             | Reliable offline persistence                            |
| Dexie.js              | Simplifies IndexedDB interactions                       |
| Supabase              | Authentication and cloud sync with minimal backend work |
| Offline-first         | Daily usability independent of internet                 |
| Feature-based modules | Easier maintenance and future expansion                 |
| Client-side rendering | Simplicity and performance for a personal tool          |

This architecture prioritizes **daily reliability over architectural complexity**. The application should continue functioning even if the network is unavailable, Supabase is temporarily unreachable, or the user switches between laptop and phone throughout the day.
