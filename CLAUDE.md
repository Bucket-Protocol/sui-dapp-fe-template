# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality checks

### Testing Commands

- No test framework currently configured
- When implementing tests, consider adding Jest + React Testing Library or Vitest

## High-Level Architecture

### Application Structure

- **Next.js 15+ App Router** with route groups in `src/app/(main)/`
- **API Routes**: Located in `src/app/api/` for backend functionality

### Key Technology Stack

- **Blockchain**: Sui blockchain integration via `@mysten/dapp-kit`
- **State Management**: Zustand for client state, TanStack Query for server state
- **UI Framework**: Radix UI primitives with Tailwind CSS
- **Multi-Protocol DeFi**: Integrates Cetus, Scallop, and other DeFi protocols
- **Analytics & Monitoring**: Amplitude, Microsoft Clarity, GrowthBook for A/B testing, Sentry for error tracking

### Component Architecture

```
src/components/
├── {feature}/        # Feature-specific components (earn, borrow, market, etc.)
│   ├── cards/        # Feature-specific card components
│   ├── modals/       # Feature-specific modals
│   ├── sections/     # Page section components
│   └── inputs/       # Custom inputs
├── shared/           # Cross-feature reusable components
├── ui/              # Base UI components (Radix-based)
└── layout/          # Layout and navigation components
```

### Data Layer

- **Custom Hooks**: Located in `src/hooks/` with base query/mutation wrappers
- **Stores**: Zustand stores in `src/stores/` for app state and preferences
- **Constants**: Token configurations and app constants in `src/consts/`

### Code Quality Standards

- **ESLint**: Next.js, TypeScript, and Prettier integration
- **Import Ordering**: Strict import order enforced by Prettier plugin
- **No Console Logs**: Only `console.error` allowed
- **Unused Imports**: Automatically removed by ESLint

### Important Development Notes

- Path aliases use `@/` prefix for clean imports
- Tailwind configuration includes custom colors and spacing
- Security headers configured for frame protection and MSafe integration (`next.config.ts`)
- Environment detection prioritizes `SENTRY_ENVIRONMENT` > `VERCEL_ENV` > `NODE_ENV`
- Sentry DSN must be configured via `SENTRY_DSN` environment variable
- Sentry monitoring tunnel configured at `/monitoring` route to bypass ad-blockers
- No test framework currently configured - add testing setup when implementing tests

### Key Libraries to Know

- `@mysten/dapp-kit` - Sui wallet connectivity
- `zustand` - State management
- `@tanstack/react-query` - Server state management
- `@radix-ui/*` - Accessible UI components
- `@sentry/nextjs` - Error tracking and performance monitoring

### Hook Architecture Patterns

- **Base Hooks**: `src/hooks/base/` contains `useQuery` and `useMutation` wrappers with custom logic
- **Query Hooks**: Custom data fetching with dependent query support and debouncing
- **Mutation Hooks**: Organized by feature with consistent error handling
- **Composed Queries**: Higher-level hooks that combine multiple data sources

### Provider Structure

The app uses a nested provider pattern in `src/app/layout.tsx`:

```
SuiDappProvider → GrowthBookProvider → TrackingProvider
```

### Environment Management

The application uses sophisticated environment detection via `src/consts/monitoring.ts`:

```typescript
export const SENTRY_ENVIRONMENT =
  process.env.SENTRY_ENVIRONMENT || // Explicit override
  process.env.VERCEL_ENV || // Vercel deployment environment
  (process.env.NODE_ENV === 'development' ? 'local' : 'production');
```

**Environment Priority**:

1. `SENTRY_ENVIRONMENT` - Manual override
2. `VERCEL_ENV` - Automatic Vercel environment detection (preview, production)
3. `NODE_ENV` fallback - Maps development to 'local', others to 'production'

### Error Tracking & Monitoring

Sentry is integrated across all runtime environments:

- **Client**: `src/instrumentation-client.ts` - Browser error tracking with session replay
- **Server**: `sentry.server.config.ts` - Server-side error capture
- **Edge**: `sentry.edge.config.ts` - Edge runtime monitoring

**Environment-Specific Configuration**:

- **Trace Sample Rate**: 100% in development, 10% in production
- **Session Replay**: 10% sampling rate with 100% error capture
- **Debug Mode**: Controlled via `SENTRY_DEBUG` constant

**Required Environment Variables**:

- `SENTRY_DSN` - Sentry project DSN for error reporting
