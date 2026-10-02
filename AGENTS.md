# sui-dapp-fe-template

A starter for Sui dApp frontends: Next.js 16 / React 19 App Router, `@mysten/dapp-kit-react`
v2 + `@mysten/dapp-kit-core` v1 + `@mysten/sui` v2 (gRPC client), Zustand + TanStack Query v5,
Radix + Tailwind v3, Sentry and PostHog (both initialised in `instrumentation-client.ts`), a
`TrackingProvider` for Amplitude, GA4 and Clarity, and GrowthBook flags. It ships a
wallet-connected shell (header, RPC switcher, wallet and terms modals, toasts) and no product
pages. Both Claude Code (v2.1.281+) and Codex read this file. Do not add a CLAUDE.md anywhere in the repo: Claude Code ignores every AGENTS.md at or below a directory that has one.

## Where things live

- `docs/knowledge-hub/`: the lesson store (one lesson per file, summary line at the top; see its
  README). Consult it when entering an unfamiliar area and add a note when you learn something
  the next session would otherwise rediscover.
- `scripts/agent-hooks/check-harness.sh`: the harness layout lint that `harness.yml` runs in CI
  (AGENTS.md only, no CLAUDE.md anywhere, root under 200 lines / 24 KiB, no
  `@path` import lines, `.codex/config.toml`, the knowledge hub). Projects forked from this
  template keep the layout: write `AGENTS.md`, never a `CLAUDE.md`.

## Scope

The request, or the plan the user approved, sets the scope. When the user describes a problem,
asks a question, or asks for an assessment, the deliverable is your findings: report and stop,
and do not apply a fix until asked. Keep changes to what the task needs; a nearby bug, a
cleanup, an extra test file, or a doc the task did not call for is a suggestion for the summary,
not a change. Before any state-changing command outside the working tree (deploys, `git push`),
check that the evidence supports that specific action.

## Build, lint, typecheck

- `pnpm dev` (Turbopack), `pnpm build`, `pnpm start`.
- `pnpm lint` runs `next lint`, which Next.js 16 no longer provides; until `package.json` moves
  to `eslint .`, run `pnpm exec eslint .` (the flat config in `eslint.config.js` is complete).
- `npx tsc --noEmit` is the typecheck; there is no `typecheck` script.
- No test framework is configured. If you add one, prefer Vitest + React Testing Library.
- Done means ESLint and `tsc` are clean. `.github/workflows/lint.yml` runs only on pull
  requests into `dev`; the default branch is `main`.

Report only what a tool result from this session backs: if lint or `tsc` fails, say so with
the output; if a step was skipped or a check could not run, say that; say explicitly what is
unverified.

## Architecture

**Layout.** `src/app/layout.tsx` nests `QueryProvider` (one `QueryClient`, `staleTime` 5
minutes) → `DappProvider` → `GrowthBookProvider` → `TrackingProvider`; `(main)/` is the route
group for product pages and `api/health-check` the one route handler. Components: `layout/`
(providers, header with nav / account / RPC dropdowns, modals, toast), `ui/` (Radix wrappers and
primitives), `shared/` (buttons, inputs, modals, icons). Hooks: `base/` wrappers,
`queries/general/` (`useGetBalances`, `useGetPrices`), `utils/`. Stores in `src/stores/`,
constants in `src/consts/` (`monitoring.ts` reads every `NEXT_PUBLIC_*` key; `network.ts` is
`RPC_NODES`; `tokens.ts` is `ALL_ASSETS`), types in `src/types/`, helpers in `src/libs/`.

**DappProvider** (`src/components/layout/providers/DappProvider.tsx`) creates the `dAppKit`
singleton with `createDAppKit`. `networks` must be exactly `['mainnet']`: installed wallets
advertise `sui:mainnet`, and any other network name stops them being detected. The module
augmentation `declare module '@mysten/dapp-kit-react' { interface Register { dAppKit } }` makes
`useCurrentClient()` return `SuiGrpcClient` project-wide.

**RPC switching.** `createDAppKit` caches its client and only accepts real network names, so
custom node keys (`official`, `blast`, …) cannot be networks. Instead a module-level
`_innerClient: SuiGrpcClient` holds the active client and a `Proxy` over it is what
`createClient` returns: every call is forwarded through `Reflect.get` to the current
`_innerClient`, so `dAppKit` is never recreated. `switchRpcEndpoint(baseUrl)` swaps
`_innerClient`; `RpcSwitcher` calls it and then `setRpcNode(key)` on `preferenceStore`, and
`useGetBalances` keys on `rpcNode`, so the balance query refetches on a switch. No
`dAppKit.switchNetwork()` is involved.

**Hooks** (`src/hooks/base/`, always preferred over raw TanStack Query): `useQuery` adds
debouncing, dependent queries, a silent mode and an `invalidate()` helper; `useMutation` wraps
transaction building, `dAppKit.signAndExecuteTransaction` and error handling. Its result is
`SuiClientTypes.TransactionResult<{ effects: true; transaction: true; bcs: true }>`: check
`result.$kind === 'FailedTransaction'` and `!result.Transaction.status.success`, because a
failed transaction resolves instead of throwing. Naming: `useGet*` for queries, `use*` for
mutations.

**State.** `appStateStore` is ephemeral UI state (search params, marquee, mobile nav, wallet
modal); `preferenceStore` persists the selected RPC node and terms acceptance to
`localStorage`.

**Tracking.** `TrackingProvider` initialises Clarity, GA4 and Amplitude when their keys are set
and sends events two ways: `sendTrackingEvent` from its context, or a click on any element (or
its ancestor) carrying a `data-tracking` JSON attribute (`{ "event": …, …properties }`). Both
add `from` (the first path segment) and the connected address; event types are in
`src/types/tracking.d.ts`.

**Tailwind** (`tailwind.config.ts`): semantic colour palette (`brand`, `red`, `amber`, `green`,
`teal` with `strong/weak/weaker/disabled`, plus `stroke.*`, `fill.*`, `inverse.*`), a named
z-index scale (`marquee` … `toast`) so layers never fight, an `xs` (425px) breakpoint below
`sm`, and the animations in `keyframes`. Use the names, not raw values.

**Environment and monitoring.** Every variable is `NEXT_PUBLIC_`-prefixed and listed in
`.env.example` (copy it to `.env.local`). Sentry runs on client (`instrumentation-client.ts`),
server and edge, tunneled through `/monitoring`; the environment resolves as
`NEXT_PUBLIC_SENTRY_ENVIRONMENT` > `VERCEL_ENV` > `NODE_ENV` in `src/consts/monitoring.ts`, and
the sample rates are set in the three Sentry files. `next.config.ts` sets `X-Frame-Options:
SAMEORIGIN` and `Referrer-Policy: strict-origin-when-cross-origin`.

## Conventions

- Path alias `@/` → `src/`. TypeScript `strict` is on.
- Import order is enforced by `@ianvs/prettier-plugin-sort-imports` (`prettier.config.js`); let
  Prettier sort.
- `no-console` allows only `console.error`; unused imports are an ESLint error (auto-fixed).
