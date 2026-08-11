# Modules Plan

**Project:** Today
**Version:** 1.0 (MVP)
**Date:** 11 August 2026
**Status:** Draft

# Purpose

This document defines the implementation roadmap for the Today application. The project is organized into independent modules that can be developed, tested, and integrated incrementally.

The architecture follows an **offline-first, feature-based approach**, where each module owns its UI, business logic, local persistence, and synchronization behavior.

# Development Order

Modules should be implemented in the following sequence:

1. Project Foundation
2. Local Database Layer
3. Task Management
4. Today Dashboard
5. Top 3 Priorities
6. Morning Planning
7. Focus Mode
8. Night Review
9. Synchronization
10. PWA & Mobile Experience

This order ensures that every new feature is built on a stable foundation.

# Module 1: Project Foundation

## Objective

Set up the application infrastructure, tooling, and base architecture.

## Responsibilities

* Create React + Vite + TypeScript project
* Configure Tailwind CSS
* Configure ESLint and Prettier
* Configure absolute imports
* Configure environment variables
* Set up routing
* Set up basic layout system
* Install core dependencies

## Deliverables

* Working React application
* Tailwind configured
* Route structure established
* Development environment documented

## Dependencies

None

# Module 2: Local Database Layer

## Objective

Create the offline-first persistence layer using IndexedDB.

## Responsibilities

* Configure Dexie.js
* Define database schema
* Create repositories
* Implement CRUD helpers
* Handle database initialization
* Support future migrations

## Database Tables

### tasks

* id
* title
* completed
* priority
* estimatedMinutes
* scheduledDate
* timeStart
* timeEnd
* createdAt
* updatedAt
* deleted

### daily_plans

* date
* availableHours
* energyLevel
* reflection
* createdAt
* updatedAt

### sync_queue

* id
* entity
* entityId
* operation
* timestamp

## Deliverables

* Database service
* Repository layer
* IndexedDB persistence working

## Dependencies

Module 1

# Module 3: Task Management

## Objective

Implement complete task CRUD functionality.

## Responsibilities

* Create task
* Update task
* Delete task
* Complete task
* Reorder tasks
* Filter by date
* Persist all changes locally

## Components

* TaskList
* TaskItem
* TaskEditor
* QuickAddInput

## Deliverables

* Functional task management system

## Dependencies

Modules 1–2

# Module 4: Today Dashboard

## Objective

Create the main dashboard used every morning.

## Responsibilities

* Display current date
* Display today’s tasks
* Display progress indicator
* Display quick-add input
* Display task counts

## Components

* DashboardPage
* DateHeader
* ProgressRing
* TaskSummary
* QuickAddInput

## Deliverables

* Fully functional Today screen

## Dependencies

Modules 1–3

# Module 5: Top 3 Priorities

## Objective

Allow the user to identify the three most important tasks of the day.

## Responsibilities

* Mark tasks as priorities
* Limit to three priority tasks
* Display priorities separately
* Support reordering priorities

## Components

* PrioritySection
* PriorityCard

## Business Rules

* Maximum of three priorities
* Priority tasks remain visible at the top
* Completed priorities stay in the priority section

## Deliverables

* Top 3 workflow completed

## Dependencies

Modules 1–4

# Module 6: Morning Planning

## Objective

Create a structured planning workflow completed at the beginning of the day.

## Responsibilities

* Set available work hours
* Set energy level
* Select top priorities
* Save daily planning metadata

## Components

* MorningPlanningPage
* HoursSelector
* EnergySelector
* PrioritySelector

## Data

Stores:

* availableHours
* energyLevel
* selected priorities
* optional planning note

## Deliverables

* Morning planning flow working

## Dependencies

Modules 1–5

# Module 7: Focus Mode

## Objective

Provide a distraction-free environment for working on a single task.

## Responsibilities

* Display one task only
* Hide unrelated UI
* Optional timer
* Pause/resume
* Complete task from focus screen

## Components

* FocusPage
* FocusTimer
* FocusHeader
* FocusActions

## Business Rules

* One active focus task at a time
* Timer state survives refresh
* Completing task exits focus mode

## Deliverables

* Fully functional focus experience

## Dependencies

Modules 1–6

# Module 8: Night Review

## Objective

Close the day and prepare for tomorrow.

## Responsibilities

* Display completed tasks
* Display unfinished tasks
* Write reflection
* Carry forward unfinished tasks

## Components

* NightReviewPage
* CompletedList
* DeferredList
* ReflectionInput

## Business Rules

* Unfinished tasks move to tomorrow
* Reflection stored per day
* Review can be reopened later

## Deliverables

* End-of-day workflow completed

## Dependencies

Modules 1–7

# Module 9: Synchronization

## Objective

Synchronize local data with Supabase.

## Responsibilities

* Upload local changes
* Download remote changes
* Retry failed operations
* Handle connectivity changes
* Resolve conflicts

## Services

* SyncService
* SupabaseService

## Conflict Strategy

Last updated timestamp wins.

## Deliverables

* Multi-device synchronization working

## Dependencies

Modules 1–8

# Module 10: PWA & Mobile Experience

## Objective

Make the application installable and mobile-friendly.

## Responsibilities

* Configure vite-plugin-pwa
* Create manifest
* Configure service worker
* Offline asset caching
* Mobile navigation
* Touch optimization

## Features

* Install on Android
* Install on desktop
* Standalone mode
* Offline launch
* Fast startup

## Deliverables

* Production-ready PWA

## Dependencies

Modules 1–9

# Cross-Cutting Modules

## State Management

### Stores

* task-store
* daily-plan-store
* ui-store
* sync-store

## Utilities

* Date formatting
* Time calculations
* Task sorting
* Priority ranking
* Offline detection

## Hooks

* useTasks
* useDailyPlan
* useFocus
* useSync
* useNetworkStatus

# Dependency Map

```text
Module 1: Foundation
        |
        v
Module 2: Database
        |
        v
Module 3: Tasks
        |
        v
Module 4: Dashboard
        |
        v
Module 5: Top 3
        |
        v
Module 6: Planning
        |
        v
Module 7: Focus
        |
        v
Module 8: Review
        |
        v
Module 9: Sync
        |
        v
Module 10: PWA
```

# Milestones

## Milestone A: Core Functionality

Includes:

* Foundation
* Database
* Tasks
* Dashboard

Result:

A usable offline task manager.

## Milestone B: Daily Workflow

Includes:

* Top 3
* Morning Planning
* Focus Mode
* Night Review

Result:

A complete daily execution system.

## Milestone C: Production Experience

Includes:

* Synchronization
* PWA

Result:

A fast, installable, offline-first application that works across laptop and phone.

# Definition of Done

A module is complete when:

* Feature works offline
* Data persists locally
* UI is responsive
* TypeScript has no errors
* Lint passes
* Manual test completed
* Integration with previous modules verified
* No regression introduced

This module plan intentionally keeps the project **small, sequential, and habit-focused**, ensuring that the application becomes useful after only the first few modules while still supporting future AI and analytics features without architectural changes.
