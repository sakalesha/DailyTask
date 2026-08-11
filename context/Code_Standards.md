# Code Standards

**Project:** Today
**Version:** 1.0 (MVP)
**Date:** 11 August 2026
**Status:** Draft

## Purpose

This document defines coding standards for the Today project.

The goals are:

* Consistent code style
* High readability
* Easy maintenance
* Predictable project structure
* Effective AI-assisted development
* Low cognitive overhead for a solo developer

## Core Principles

### Simplicity First

Prefer simple solutions over clever ones.

Avoid unnecessary abstractions, premature optimization, and complex patterns.

### Readability Over Brevity

Code is read far more often than it is written.

Choose descriptive names even if they are longer.

Good:

```ts
calculateCompletionPercentage(tasks)
```

Avoid:

```ts
calcPct(t)
```

### Single Responsibility

Each function, component, and module should have one clear purpose.

## Technology Standards

### Language

TypeScript only.

Avoid JavaScript files unless required by tooling.

### React

Use:

* Functional components
* React hooks
* Composition over inheritance
* Controlled components where appropriate

Avoid:

* Class components
* Unnecessary context usage
* Prop drilling beyond reasonable limits

## Folder Structure

The project follows a **feature-based modular architecture**.

```text
today/
├── frontend/
│   ├── public/
│   │   ├── icons/
│   │   ├── manifest.webmanifest
│   │   └── favicon.ico
│   ├── src/
│   │   ├── app/
│   │   │   ├── router.tsx
│   │   │   ├── providers.tsx
│   │   │   └── app.tsx
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── layout/
│   │   │   └── common/
│   │   ├── features/
│   │   │   ├── dashboard/
│   │   │   ├── tasks/
│   │   │   ├── priorities/
│   │   │   ├── planning/
│   │   │   ├── focus/
│   │   │   ├── review/
│   │   │   └── sync/
│   │   ├── db/
│   │   │   ├── database.ts
│   │   │   ├── schema.ts
│   │   │   └── repositories/
│   │   ├── services/
│   │   │   ├── task-service.ts
│   │   │   ├── daily-plan-service.ts
│   │   │   ├── sync-service.ts
│   │   │   └── supabase-service.ts
│   │   ├── store/
│   │   │   ├── task-store.ts
│   │   │   ├── daily-plan-store.ts
│   │   │   ├── ui-store.ts
│   │   │   └── sync-store.ts
│   │   ├── hooks/
│   │   │   ├── use-tasks.ts
│   │   │   ├── use-daily-plan.ts
│   │   │   ├── use-focus.ts
│   │   │   └── use-network-status.ts
│   │   ├── types/
│   │   │   ├── task.ts
│   │   │   ├── daily-plan.ts
│   │   │   └── sync.ts
│   │   ├── utils/
│   │   │   ├── date-utils.ts
│   │   │   ├── task-utils.ts
│   │   │   ├── time-utils.ts
│   │   │   └── constants.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── assets/
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── tests/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── vite.config.ts
│   └── vercel.json
└── docs/
    ├── PRD.md
    ├── ARCHITECTURE.md
    ├── MODULES.md
    ├── CODE_STANDARDS.md
    └── AI_WORKFLOW_RULES.md
```

### Folder Rules

* `components/` → Shared UI components only
* `features/` → Feature-specific components and logic
* `services/` → Business logic and workflows
* `db/` → IndexedDB and repository layer
* `store/` → Global application state
* `hooks/` → Reusable React hooks
* `types/` → Shared TypeScript models
* `utils/` → Pure helper functions

## Naming Conventions

### Files

Use **kebab-case**.

Examples:

```text
task-list.tsx
task-item.tsx
morning-planning-page.tsx
daily-plan-service.ts
use-focus.ts
```

### React Components

Use **PascalCase**.

Examples:

```ts
TaskList
TaskItem
FocusPage
ProgressRing
```

File name:

```text
task-list.tsx
```

Component:

```ts
export function TaskList() {}
```

### Hooks

Use **camelCase** with `use` prefix.

Examples:

```ts
useTasks
useDailyPlan
useFocus
useNetworkStatus
```

### Services

Suffix with `Service`.

Examples:

```ts
TaskService
DailyPlanService
SyncService
```

Files:

```text
task-service.ts
daily-plan-service.ts
sync-service.ts
```

### Stores

Suffix with `Store`.

Examples:

```ts
useTaskStore
useDailyPlanStore
useUIStore
useSyncStore
```

## TypeScript Standards

### Always Type Public APIs

Functions, service methods, and exported values must have explicit types.

Good:

```ts
function calculateProgress(tasks: Task[]): number
```

Avoid:

```ts
function calculateProgress(tasks)
```

### Prefer Interfaces for Domain Models

```ts
interface Task {
  id: string;
  title: string;
  completed: boolean;
}
```

Use `type` for unions, mapped types, and utility types.

## Import Order

Imports should be grouped.

Order:

1. React
2. External libraries
3. Internal absolute imports
4. Relative imports
5. Types

Example:

```ts
import { useMemo } from 'react';

import { useLiveQuery } from 'dexie-react-hooks';
import { Check } from 'lucide-react';

import { db } from '@/db/database';
import { useTaskStore } from '@/store/task-store';

import { TaskItem } from './task-item';

import type { Task } from '@/types/task';
```

## React Component Standards

### Component Structure

```ts
type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  const handleComplete = () => {
    // logic
  };

  return (
    <div>
      ...
    </div>
  );
}
```

Order:

1. Types
2. Component
3. Hooks
4. Derived values
5. Handlers
6. Effects
7. Return

### Component Size

Target: **30–150 lines**

Split components when they become difficult to scan.

## State Management

### Zustand Rules

Stores should contain:

* state
* actions
* minimal business logic

Complex logic belongs in services.

Good:

```ts
completeTask(id)
```

Avoid placing large workflow orchestration inside stores.

## Service Layer Standards

Services contain business logic.

Example:

```ts
TaskService.createTask()
TaskService.completeTask()
TaskService.reorderTasks()
```

Services should not contain UI code.

## Database Standards

All IndexedDB access goes through the repository layer.

Good:

```ts
await TaskRepository.create(task);
```

Avoid:

```ts
db.tasks.add(task);
```

inside UI components.

## Async Standards

Use `async/await`.

Good:

```ts
const tasks = await TaskRepository.getToday();
```

Avoid:

```ts
TaskRepository.getToday().then(...)
```

## Error Handling

Handle errors at boundaries.

UI:

```ts
try {
  await TaskService.createTask(...);
} catch (error) {
  showToast('Unable to create task');
}
```

Services should throw meaningful errors.

## Date Handling

Store dates in ISO format.

Example:

```text
2026-08-11
```

Use utility functions for:

* today
* tomorrow
* formatting
* comparisons

Avoid manual string manipulation.

## Styling Standards

### Tailwind

Use utility classes directly.

Extract reusable patterns into components.

Good:

```tsx
<Button variant="primary">Save</Button>
```

Avoid large repeated Tailwind blocks across multiple files.

### Class Order

Order:

* layout
* spacing
* sizing
* typography
* colors
* borders
* effects
* transitions

Example:

```tsx
className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white transition-colors"
```

## Accessibility

All interactive elements require:

* `aria-label` when needed
* keyboard accessibility
* visible focus state
* minimum touch target of 44px

Example:

```tsx
<button aria-label="Complete task">
```

## Comments

Write comments only when the intent is not obvious.

Good:

```ts
// Carry unfinished tasks to the next day during nightly review
```

Avoid:

```ts
// Increment i
i++;
```

## TODO Convention

Use:

```ts
// TODO: Add recurring task support
```

Include only actionable future work.

## File Organization

Order inside files:

1. Imports
2. Types
3. Constants
4. Component/function
5. Helpers
6. Exports

## Testing Conventions

Test files:

```text
task-service.test.ts
daily-plan-store.test.ts
progress-utils.test.ts
```

Focus on:

* business logic
* date calculations
* task reordering
* carry-forward behavior
* synchronization

## Performance Guidelines

Use memoization only when necessary.

Prefer:

* React.memo
* useMemo
* useCallback

only after identifying re-render issues.

Avoid premature optimization.

## Git Conventions

### Branch Naming

```text
feature/task-management
feature/focus-mode
fix/progress-calculation
refactor/database-layer
```

### Commit Format

```text
feat: add task completion
fix: correct carry-forward logic
refactor: simplify task store
style: improve dashboard spacing
docs: update architecture
```

## AI Collaboration Rules

Generated code must:

* follow this folder structure
* use TypeScript
* avoid unnecessary dependencies
* avoid inline business logic in components
* use services for workflows
* use repositories for database access
* preserve offline-first behavior

## Definition of Good Code

Code in this project is considered good when it is:

* Easy to read
* Easy to modify
* Easy to test
* Easy for future AI sessions to understand
* Consistent with the rest of the codebase
* Small enough to reason about quickly

The project should feel **boringly predictable**, where every new file looks exactly where you expect it to be and behaves exactly how similar files behave elsewhere in the codebase.
