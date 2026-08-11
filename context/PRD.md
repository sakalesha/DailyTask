# Product Requirements Document (PRD)

**Product Name:** Today
**Version:** 1.0 (MVP)
**Author:** Ronada Sakalesha
**Date:** 11 August 2026
**Status:** Draft

## 1. Product Vision

Today is a personal daily execution dashboard designed to help a single user plan, execute, and review their day. Unlike traditional task managers that accumulate endless tasks, Today focuses only on **what matters today**.

The product should become the first application opened every morning and the last one checked before ending the day.

**Core Principle:** Reduce cognitive load and improve execution consistency.

## 2. Problem Statement

Current productivity tools are often optimized for teams, projects, collaboration, and long-term task storage. This creates unnecessary complexity for a single user who simply wants to:

* Plan the day quickly
* Identify the most important tasks
* Stay focused during work
* Review progress at night
* Maintain consistency over time

The user currently manages multiple ongoing priorities (software projects, interview preparation, DSA practice, learning, and personal goals), making it easy to lose focus due to task switching.

## 3. Goals

### Primary Goals

* Complete morning planning in **under 3 minutes**
* Clearly identify **Top 3 priorities**
* Track completion of daily tasks
* Support focused work sessions
* Encourage daily and weekly consistency

### Success Metrics

* User opens the app every morning
* User completes at least one Top 3 priority daily
* Daily completion rate is visible
* Weekly review is completed regularly

## 4. Target User

### Primary User

**Ronada Sakalesha**

Characteristics:

* Computer Science student
* Builds software projects
* Prepares for interviews and DSA
* Works primarily on laptop
* Also wants phone access
* Prefers clean and minimal interfaces
* Wants offline reliability

## 5. Product Scope

### In Scope (MVP)

* Daily task management
* Morning planning workflow
* Top 3 priorities
* Task completion tracking
* Progress visualization
* Focus mode
* Night review
* Offline support
* PWA installation
* Automatic cloud synchronization

### Out of Scope (MVP)

* Multi-user accounts
* Team collaboration
* Shared projects
* File attachments
* Comments
* Notifications
* Calendar integration
* AI planning
* Habit tracking
* Goal management
* Journaling beyond short reflections

## 6. User Stories

### Morning Planning

As a user, I want to quickly create today’s task list so that I can start work without thinking about what to do next.

As a user, I want to choose my Top 3 priorities so that I know what absolutely must be completed today.

As a user, I want to estimate my available work hours so that I create a realistic plan.

### Daily Execution

As a user, I want to mark tasks complete so that I can track progress.

As a user, I want to add tasks quickly during the day so that I do not forget new work.

As a user, I want to reorder tasks so that changing priorities is effortless.

As a user, I want a distraction-free focus mode so that I can work on one task at a time.

### Night Review

As a user, I want unfinished tasks moved to tomorrow automatically so that I do not manually recreate them.

As a user, I want to write a short reflection note so that I can improve future planning.

## 7. Functional Requirements

### FR1. Daily Task List

* Create task
* Edit task
* Delete task
* Complete task
* Reorder tasks
* Persist tasks locally

### FR2. Top 3 Priorities

* Mark up to three tasks as priorities
* Display priorities separately
* Priorities appear at the top of the dashboard

### FR3. Morning Planning

Fields:

* Available work hours
* Energy level (1–5)
* Daily note (optional)

### FR4. Progress Tracking

Display:

* Total tasks
* Completed tasks
* Remaining tasks
* Completion percentage
* Visual progress indicator

### FR5. Focus Mode

* Open a single task
* Hide unrelated tasks
* Optional timer
* Mark task complete from focus screen

### FR6. Night Review

* Reflection note
* Completed summary
* Deferred tasks
* Automatic carry-forward of unfinished tasks

### FR7. Offline Support

* App must work without internet
* All actions stored locally
* Sync automatically when online

### FR8. PWA Installation

* Installable on Android
* Installable on desktop
* App launches full-screen
* Fast startup

## 8. Non-Functional Requirements

### Performance

* Initial load under 2 seconds
* Task operations under 100 ms
* Smooth mobile interactions

### Reliability

* No data loss offline
* Automatic recovery after refresh
* Local-first persistence

### Usability

* Morning planning under 3 minutes
* Large touch targets
* Mobile responsive
* Keyboard-friendly on desktop

### Accessibility

* High contrast
* Readable typography
* Focus indicators
* Screen-reader friendly labels

## 9. UX Principles

### Minimalism

Only show information required for the current moment.

### Execution over Organization

Prioritize completing work rather than organizing work.

### Low Friction

Every common action should require minimal interaction.

### Calm Interface

Avoid clutter, excessive colors, unnecessary animations, and distracting elements.

## 10. Core Screens

### Dashboard

Displays:

* Current date
* Top 3 priorities
* Today’s tasks
* Progress indicator
* Quick add input

### Morning Planning

Displays:

* Available hours
* Energy level
* Priority selection
* Schedule overview

### Focus Mode

Displays:

* One task only
* Timer
* Notes
* Completion action

### Night Review

Displays:

* Completed tasks
* Deferred tasks
* Reflection
* Tomorrow preview

## 11. Data Model

### Task

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

### DailyPlan

* date
* availableHours
* energyLevel
* topPriorityIds
* reflection

## 12. Technical Architecture

### Frontend

* React
* Vite
* TypeScript
* Tailwind CSS
* Zustand

### Local Storage

* IndexedDB using Dexie.js

### Cloud Sync

* Supabase PostgreSQL

### Deployment

* Vercel

### PWA

* vite-plugin-pwa

## 13. MVP Milestones

### Milestone 1

* Project setup
* PWA configuration
* IndexedDB integration

### Milestone 2

* Task CRUD
* Dashboard
* Progress tracking

### Milestone 3

* Top 3 priorities
* Morning planning

### Milestone 4

* Focus mode
* Night review

### Milestone 5

* Supabase synchronization
* Mobile optimization

## 14. Future Roadmap (Post-MVP)

### Version 2

* AI daily planner
* Smart prioritization
* Calendar integration
* Analytics dashboard
* Weekly planning

### Version 3

* Habit tracking
* Long-term goals
* Knowledge notes
* Voice task capture
* Wearable integrations

## 15. Acceptance Criteria

The MVP is considered complete when:

* The app can be installed on phone and desktop
* It works fully offline
* Morning planning takes less than 3 minutes
* Tasks can be created, completed, and carried forward
* Top 3 priorities are supported
* Night review is available
* Data synchronizes automatically when internet becomes available
* The user can comfortably use the application as their primary daily planning tool for 30 consecutive days
