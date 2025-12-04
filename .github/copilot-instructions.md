# Copilot Instructions - TanStack Filebase

## Project Overview
Modern React 19 app using TanStack Router for file-based routing, Vite 7 for builds, Tailwind CSS v4 for styling, and Biome for code quality.

## Architecture

### TanStack Router (File-Based)
- Routes are files in `src/routes/`: `index.tsx` → `/`, `about.tsx` → `/about`
- `src/routes/__root.tsx` is the root layout component wrapping all routes
- `src/routeTree.gen.ts` is **auto-generated** - never edit manually
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
- TypeScript module augmentation for type safety

## Development Workflow

### Commands
- `pnpm dev` - Start dev server on port 3000
- `pnpm build` - Build + TypeScript type checking
- `pnpm test` - Run Vitest tests
- `pnpm serve` - Preview production build

### Code Quality (Biome)
- **Format:** 2 spaces, single quotes (JS/TS), double quotes (JSX), semicolons as-needed, trailing commas
- **Line width:** 80 characters
- Run checks: `pnpm biome check .`
- Auto-fix: `pnpm biome check --write .`

## Key Conventions

### Path Aliases
- `@/*` maps to `./src/*`
- Example: `import Component from '@/components/Button'`

### TypeScript
- Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`
- `moduleResolution: 'bundler'` for Vite compatibility
- Use `verbatimModuleSyntax` - import types explicitly

### Styling
- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Global styles in `src/styles.css`
- Tailwind directives enabled in CSS parser

### Devtools
- TanStack Devtools integrated in `__root.tsx` (bottom-right position)
- Includes Router devtools panel
- Only visible in development mode

## Critical Files
- `vite.config.ts` - Plugin order matters: devtools → tanstackRouter → viteReact → tailwindcss
- `src/main.tsx` - Router setup with module augmentation
- `biome.json` - Formatter/linter configuration
- `tsconfig.json` - Path aliases and strict TypeScript settings

## Common Patterns

### Adding a New Route
1. Create `src/routes/your-route.tsx`
2. Export route using `createFileRoute('/your-route')`
3. TanStack Router auto-generates route tree
4. Link to it: `<Link to="/your-route">Label</Link>`

### Data Loading
Use TanStack Router's `loader` function in route definitions for pre-rendering data fetches.

## Dependencies Note
Uses React 19 and Vite 7 - ensure plugin compatibility when adding new Vite plugins. All TanStack packages should maintain version alignment.
