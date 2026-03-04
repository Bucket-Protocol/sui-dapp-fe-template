# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality checks

No test framework is currently configured. Add Jest + React Testing Library or Vitest when implementing tests.

## Technology Stack

- **Framework**: Next.js 16+ App Router, React 19
- **Blockchain**: Sui via `@mysten/dapp-kit-react` v2 + `@mysten/dapp-kit-core` v1 + `@mysten/sui` v2 (gRPC client)
- **State**: Zustand (client state) + TanStack Query v5 (server/async state)
- **UI**: Radix UI primitives + Tailwind CSS v3 + `tailwindcss-animate`
- **Analytics**: Amplitude, Google Analytics 4, Microsoft Clarity, PostHog
- **A/B Testing**: GrowthBook
- **Error Tracking**: Sentry (`@sentry/nextjs`)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout — provider nesting lives here
│   ├── globals.css
│   ├── global-error.tsx     # Top-level error boundary
│   ├── api/health-check/    # Health check API route
│   └── (main)/              # Route group for main pages
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   ├── layout/              # App shell: Header, Footer, Marquee, nav, modals
│   │   ├── providers/       # DappProvider, TrackingProvider, GrowthBookProvider
│   │   ├── header/          # NavBar, mobile nav, dropdowns (account, RPC)
│   │   ├── modals/          # WalletModal, TermOfServiceModal
│   │   └── toast/           # ToastContainer, ToastLink
│   ├── ui/                  # Base UI components (Radix wrappers + primitives)
│   └── shared/              # Cross-feature reusable components
│       ├── buttons/         # ActionButton, SelectTokenButton
│       ├── modals/          # SelectTokenModal
│       ├── inputs/          # TokenAmountInput, SimpleTokenAmountInput
│       └── icons/           # ShiningIcon, FadeInArrow, etc.
├── hooks/
│   ├── base/                # useQuery.ts, useMutation.ts — core wrappers
│   ├── queries/general/     # useGetBalances.ts, useGetPrices.ts
│   └── utils/               # useDebounce, useTimer, useUpdateEffect, etc.
├── stores/
│   ├── appStateStore.ts     # searchParams, isMarqueeShown, isMobileNavOpen, isWalletModalOpen
│   └── preferenceStore.ts   # rpcNode (persisted), termOfServiceAccepted (persisted)
├── consts/
│   ├── monitoring.ts        # All analytics/Sentry keys from env
│   ├── network.ts           # RPC_NODES config
│   ├── tokens.ts            # Supported token list (ALL_ASSETS)
│   ├── navigation.ts        # Route definitions
│   ├── wallets.ts           # Wallet configs
│   ├── errors.ts            # Error messages
│   ├── metadata.ts          # Page metadata
│   └── keys.ts              # Misc API keys/constants
├── types/
│   ├── index.d.ts           # RpcNode, Coin, TokenInfo, CoinBalance, CoinPrices, Wallet
│   └── tracking.d.ts        # TrackingEvents, EventPayload
├── libs/
│   ├── utils.ts             # General utilities
│   ├── format.ts            # Number/address/date formatters
│   └── price.ts             # Price calculation helpers
└── fonts/                   # Custom font files (TTInterphasesPro)
```

## Provider Nesting

Defined in `src/app/layout.tsx`:

```
SuiDappProvider         # QueryClient + DappProvider (DAppKitProvider)
  → GrowthBookProvider  # A/B testing
    → TrackingProvider  # GA4, Amplitude, Clarity — exposes sendTrackingEvent
```

**SuiDappProvider** (`src/components/layout/providers/SuiDappProvider.tsx`):

- `QueryClientProvider` with `staleTime: 5 minutes`
- Renders `DappProvider` (see below) for Sui wallet/client integration

**DappProvider** (`src/components/layout/providers/DappProvider.tsx`):

- Creates the `dAppKit` singleton via `createDAppKit` from `@mysten/dapp-kit-react`
- `networks: ['mainnet']` — must be exactly `'mainnet'` for installed wallets to be detected (wallets advertise `sui:mainnet`)
- Uses a `Proxy`-based RPC switching pattern (see **RPC Switching** below)
- Module augmentation: `declare module '@mysten/dapp-kit-react' { interface Register { dAppKit: typeof dAppKit } }` — makes `useCurrentClient()` return `SuiGrpcClient` project-wide

**TrackingProvider** (`src/components/layout/providers/TrackingProvider.tsx`):

- Initializes Clarity, GA4, Amplitude on mount
- Provides `sendTrackingEvent` context function
- Tracks clicks via `data-tracking` attributes on elements

## RPC Switching

**Problem**: `createDAppKit` caches its client and only accepts real network names (`'mainnet'` etc.) — custom RPC keys like `'official'`/`'blast'` break wallet chain detection.

**Solution** (in `DappProvider.tsx`):

1. A module-level `_innerClient: SuiGrpcClient` holds the active gRPC client
2. A `Proxy` wrapping `_innerClient` is passed to `createClient` — every call is forwarded to the current `_innerClient` via `Reflect.get`, so `dAppKit` never needs to be recreated
3. `switchRpcEndpoint(baseUrl)` replaces `_innerClient` with a new `SuiGrpcClient`
4. `RpcSwitcher` calls `switchRpcEndpoint(baseUrl)` + `setRpcNode(key)` — no `dAppKit.switchNetwork()` needed
5. Query keys in `useGetBalances` include `rpcNode` from `preferenceStore` so TanStack Query re-fetches on node switch

```typescript
// How to switch RPC nodes from any component:
import { switchRpcEndpoint } from '@/components/layout/providers/DappProvider';
switchRpcEndpoint(RPC_NODES[key].baseUrl);
setRpcNode(key); // persists to localStorage + invalidates query cache
```

## Hook Architecture

**Base hooks** (`src/hooks/base/`) — always prefer these over raw TanStack Query:

- `useQuery`: Wraps `@tanstack/react-query` with debouncing, dependent query support, silent mode, and `invalidate()` helper
- `useMutation`: Wraps Sui transaction building, `dAppKit.signAndExecuteTransaction`, and error handling. Result type: `SuiClientTypes.TransactionResult<{effects:true,transaction:true,bcs:true}>` — check `result.$kind === 'FailedTransaction'` or `!result.Transaction.status.success` for errors

**Naming convention**: `useGet*` for queries, `use*` for mutations.

## State Management

**Zustand stores** (`src/stores/`):

- `appStateStore` — ephemeral UI state (nav open, wallet modal, search params)
- `preferenceStore` — persisted to `localStorage` (selected RPC node, ToS acceptance)

## Code Quality Standards

- **Import order**: Enforced by Prettier plugin — violations will fail lint
- **No `console.log`**: Only `console.error` is allowed
- **Unused imports**: Auto-removed by ESLint
- **Path aliases**: Always use `@/` (maps to `src/`)
- **TypeScript strict mode**: Enabled — no implicit `any`

## Tailwind Configuration

Custom layers in `tailwind.config.ts`:

- **Colors**: Semantic palette (`brand`, `red`, `amber`, `green`, `teal`) with `strong/weak/weaker/disabled` variants; `stroke.*`, `fill.*`, `inverse.*` groups
- **Z-index scale**: `marquee:5`, `header:10`, `footer:10`, `fab:20`, `dropdown:30`, `modal:40`, `tooltip:50`, `toast:60`
- **Breakpoints**: Adds `xs` (425px) below the default `sm`
- **Animations**: `accordion-down/up`, `border-move`, `rotate`, `floating`

## Environment Variables

All variables are `NEXT_PUBLIC_` prefixed and available in the browser. Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SENTRY_DSN
NEXT_PUBLIC_SENTRY_ORG
NEXT_PUBLIC_SENTRY_PROJECT
NEXT_PUBLIC_SENTRY_ENVIRONMENT   # Overrides auto-detection
NEXT_PUBLIC_SENTRY_AUTH_TOKEN
NEXT_PUBLIC_SENTRY_DEBUG
NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_AMPLITUDE_API_KEY
NEXT_PUBLIC_CLARITY_PROJECT_ID
NEXT_PUBLIC_POSTHOG_HOST
NEXT_PUBLIC_POSTHOG_KEY
NEXT_PUBLIC_GROWTHBOOK_API_HOST
NEXT_PUBLIC_GROWTHBOOK_API_KEY
```

**Sentry environment detection** (in `src/consts/monitoring.ts`):

```
NEXT_PUBLIC_SENTRY_ENVIRONMENT → VERCEL_ENV → NODE_ENV ('development' → 'local')
```

## Sentry Configuration

- **Client**: `src/instrumentation-client.ts` — browser tracking + session replay (10% sample, 100% on error)
- **Server**: `sentry.server.config.ts`
- **Edge**: `sentry.edge.config.ts`
- **Tunnel**: `/monitoring` route bypasses ad-blockers (configured in `next.config.ts`)
- **Trace rate**: 100% in development, 10% in production

## Security Headers (next.config.ts)

- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
