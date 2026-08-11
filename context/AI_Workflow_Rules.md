# AI Workflow Rules

**Project:** Today
**Version:** 1.0 (MVP)
**Date:** 11 August 2026
**Status:** Draft

## Purpose

This document defines the mandatory workflow that any AI coding assistant must follow when working on the Today project.

The objective is to ensure that every generated change is:

* Consistent with the architecture
* Safe for an offline-first application
* Modular
* Testable
* Easy to maintain
* Compatible with future AI sessions

These rules override convenience or shortcut implementations.

## Project Context

Today is a **personal offline-first Progressive Web App (PWA)** built for a single user.

Primary workflow:

* Morning planning
* Daily execution
* Focus sessions
* Night review

The application is **not** a team collaboration platform.

## Source of Truth

Before modifying any code, the AI must use the project documentation.

Priority order:

1. `docs/PRD.md`
2. `docs/ARCHITECTURE.md`
3. `docs/MODULES.md`
4. `docs/CODE_STANDARDS.md`
5. `docs/AI_WORKFLOW_RULES.md`

If a requested implementation conflicts with these documents, the AI must explicitly identify the conflict before proceeding.

## Required Workflow

### Step 1: Read Context

Before writing code:

* Understand the target module
* Identify dependencies
* Check related services
* Check related stores
* Check related database schema

### Step 2: Plan

The AI should briefly determine:

* Which files must change
* Which files must be created
* Which modules are affected
* Whether the change impacts offline behavior
* Whether synchronization is affected

### Step 3: Implement

Implement only the requested scope.

Avoid unrelated refactoring.

### Step 4: Validate

Before finishing, verify:

* TypeScript compatibility
* Import correctness
* Folder structure compliance
* Naming consistency
* Offline-first behavior preservation

## Architecture Rules

### Offline-First is Mandatory

Every user action must work without internet.

Correct flow:

```text
UI
 ↓
Zustand
 ↓
IndexedDB
 ↓
Sync Queue
 ↓
Supabase
```

Never implement:

```text
UI
 ↓
Supabase
 ↓
UI Update
```

The UI must never depend on network availability.

### Reads Come From Local Storage

UI components should read from IndexedDB through repositories/hooks.

Supabase is used for synchronization only.

## Folder Rules

Use the established project structure.

```text
src/
├── app/
├── components/
├── features/
├── db/
├── services/
├── store/
├── hooks/
├── types/
└── utils/
```

### Shared UI

Place in:

```text
components/
```

### Feature UI

Place in:

```text
features/<feature>/
```

### Business Logic

Place in:

```text
services/
```

### Persistence

Place in:

```text
db/
```

### Global State

Place in:

```text
store/
```

## Component Rules

### Keep Components Small

Target:

30–150 lines.

Split large components into smaller components.

### No Business Logic in UI

Avoid:

```tsx
const overdue = tasks.filter(...)
```

Prefer:

```ts
TaskService.getOverdueTasks()
```

Components should primarily render UI and trigger actions.

## Service Rules

Services own workflows.

Examples:

* createTask
* completeTask
* reorderTasks
* carryForwardTasks
* syncChanges

Services may call repositories.

Services should not render UI.

## Repository Rules

Repositories own database access.

UI components must not call Dexie directly.

Correct:

```ts
await TaskRepository.create(task);
```

Incorrect:

```ts
db.tasks.add(task);
```

inside React components.

## Store Rules

Zustand stores should contain:

* state
* actions
* minimal orchestration

Complex algorithms belong in services.

## Naming Rules

### Files

Use kebab-case.

Examples:

```text
task-list.tsx
focus-page.tsx
daily-plan-service.ts
task-repository.ts
```

### Components

PascalCase.

### Hooks

useCamelCase.

### Services

Suffix with Service.

### Stores

Suffix with Store.

## TypeScript Rules

Always use TypeScript.

Public functions require explicit types.

Example:

```ts
function calculateProgress(tasks: Task[]): number
```

Avoid implicit any.

## Import Rules

Order:

1. React
2. External libraries
3. Internal absolute imports
4. Relative imports
5. Types

Use absolute imports whenever configured.

## State Mutation Rules

Do not mutate objects directly.

Correct:

```ts
set(state => ({
  tasks: [...state.tasks, task],
}));
```

Avoid direct mutation.

## Date Rules

Store dates as ISO strings.

Example:

```text
2026-08-11
```

Use utility functions for:

* today
* tomorrow
* formatting
* comparisons

Avoid manual string parsing.

## Synchronization Rules

Any feature that modifies persistent data must consider synchronization.

Required steps:

1. Update local database
2. Update UI
3. Queue sync operation
4. Trigger background synchronization

Never block the UI while waiting for network.

## Error Handling Rules

Services should throw meaningful errors.

UI should handle user feedback.

Example:

```ts
try {
  await TaskService.createTask(...);
} catch {
  showToast('Unable to create task');
}
```

Do not swallow errors silently.

## Performance Rules

Optimize only when necessary.

Prefer:

* useMemo
* useCallback
* React.memo

only after identifying re-render problems.

Avoid premature optimization.

## Accessibility Rules

Every interactive element must be:

* keyboard accessible
* screen-reader friendly
* properly labeled
* visually focusable

Minimum touch target:

44px.

## Refactoring Rules

The AI must not perform broad refactoring unless explicitly requested.

When implementing a feature:

* modify only necessary files
* preserve existing APIs
* avoid renaming unrelated files
* avoid restructuring folders

## Testing Expectations

For non-trivial logic, add or update tests.

Priority areas:

* task completion
* carry-forward behavior
* priority selection
* date calculations
* synchronization

## Forbidden Patterns

Do not introduce:

* Redux
* MobX
* Context-based global state
* Class components
* Direct Supabase access from UI
* Direct IndexedDB access from UI
* Massive utility files
* God components
* Circular dependencies

## Preferred Patterns

Prefer:

* Zustand stores
* Repository pattern
* Service layer
* Feature-based organization
* Pure utility functions
* Small reusable components
* Explicit TypeScript types

## Code Generation Checklist

Before returning generated code, verify:

* Uses TypeScript
* Follows folder structure
* Uses repository/service/store layers correctly
* Preserves offline-first behavior
* Uses existing naming conventions
* Avoids unnecessary dependencies
* Keeps components reasonably small
* Includes required imports
* Does not break existing modules

## Communication Rules

When responding, the AI should:

* State which files are affected
* Explain architectural decisions briefly
* Mention any assumptions
* Identify any documentation conflicts
* Keep changes scoped to the requested feature

## Long-Term Goal

The project should remain understandable even after hundreds of AI-generated changes.

A new AI session should be able to open the repository, read the documentation, and continue development without architectural drift or hidden assumptions.

The guiding principle is:

**Every feature should feel like it was built by the same developer on the same day.**
