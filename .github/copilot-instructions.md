# Copilot Instructions - TanStack Filebase

## Project Overview
Modern React 19 app using TanStack Router for file-based routing, Vite 7 for builds, Tailwind CSS v4 for styling, and Biome for code quality. Package management via **pnpm** (locked at 10.24.0).

## Architecture

### TanStack Router (File-Based)
- Routes are files in `src/routes/`: `index.tsx` → `/`, `about.tsx` → `/about`
- `src/routes/__root.tsx` is the root layout component wrapping all routes
- `src/routeTree.gen.ts` is **auto-generated** by `@tanstack/router-plugin` - never edit manually, excluded from linting
- Use `<Outlet />` in layouts to render child routes
- Use `<Link to="/path" />` from `@tanstack/react-router` for navigation

### Route Creation Pattern
```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/path')({
  component: ComponentName,
})
```

### Router Configuration (`src/main.tsx`)
Router instance created with:
- `defaultPreload: 'intent'` - preloads on hover/focus
- `scrollRestoration: true` - maintains scroll position
- `defaultStructuralSharing: true` - optimizes re-renders
- `defaultPreloadStaleTime: 0` - immediate revalidation
- TypeScript module augmentation via `declare module '@tanstack/react-router'` for type safety

Entry point renders into `<div id="app">` in `index.html` with `StrictMode` enabled.

## Development Workflow

### Commands
- `pnpm dev` - Start dev server on port 3000
- `pnpm build` - Build + TypeScript type checking (runs `vite build && tsc`)
- `pnpm test` - Run Vitest tests
- `pnpm serve` - Preview production build
- `pnpm check` - Run Biome checks with auto-fix (format + lint)

### Code Quality (Biome)
- **Format:** 2 spaces, single quotes (JS/TS), double quotes (JSX), semicolons as-needed, trailing commas, arrow parentheses
- **Line width:** 80 characters
- **VCS Integration:** Git-aware via `.gitignore`
- **Excludes:** `dist/`, `src/routeTree.gen.ts` from linting
- Run checks: `pnpm biome check .`
- Auto-fix: `pnpm biome check --write .`

`.editorconfig` defines base formatting rules: 2-space indent, LF line endings, UTF-8.

## Key Conventions

### Path Aliases
- `@/*` maps to `./src/*` (configured in both `vite.config.ts` and `tsconfig.json`)
- Example: `import Component from '@/components/Button'`

### TypeScript
- Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`
- `moduleResolution: 'bundler'` for Vite compatibility
- Use `verbatimModuleSyntax` - import types explicitly with `import type`
- `noEmit: true` - type checking only, Vite handles transpilation

### Styling
- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Global styles in `src/styles.css` with `@import "tailwindcss"` directive
- Tailwind directives enabled in Biome CSS parser
- Utility classes (e.g., `flex`, `flex-col`, `min-h-screen`) follow Tailwind conventions
- `lucide-react` for icons (see `index.tsx` example: `<TreePalm />`)

### Devtools
- TanStack Devtools integrated in `__root.tsx` (bottom-right position)
- Includes Router devtools panel as plugin
- Only visible in development mode
- Configured via `@tanstack/devtools-vite` in Vite config

## Critical Files
- `vite.config.ts` - **Plugin order matters**: devtools → tanstackRouter (with `autoCodeSplitting: true`) → viteReact → tailwindcss
- `src/main.tsx` - Router setup with module augmentation and `reportWebVitals()` integration
- `biome.json` - Formatter/linter configuration with VCS integration
- `tsconfig.json` - Path aliases and strict TypeScript settings
- `package.json` - Locked to pnpm 10.24.0 via `packageManager` field

## Common Patterns

### Adding a New Route
1. Create `src/routes/your-route.tsx`
2. Export route using `createFileRoute('/your-route')` with component
3. TanStack Router auto-generates route tree on dev server restart
4. Link to it: `<Link to="/your-route">Label</Link>`

### Data Loading
Use TanStack Router's `loader` function in route definitions for pre-rendering data fetches (see README.md for details).

### Component Structure
Routes export a default or named component function. See `index.tsx` for pattern:
- Tailwind utility classes for styling
- Lucide icons imported from `lucide-react`
- Semantic HTML with accessibility in mind

## Testing
- **Framework:** Vitest + React Testing Library + jsdom
- **Run:** `pnpm test`
- Test files: `*.test.ts(x)` or `*.spec.ts(x)` (none currently in codebase)
- Testing deps: `@testing-library/react`, `@testing-library/dom`, `jsdom`

## Dependencies Note
Uses React 19 and Vite 7 - ensure plugin compatibility when adding new Vite plugins. All TanStack packages should maintain version alignment (currently `@tanstack/react-router@1.139.14`). Uses `web-vitals@5.1.0` for performance monitoring via `reportWebVitals()`.
