# SUI Dapp Frontend Template

A modern DeFi application template built on Sui blockchain.

## Features

- TBD

## Technology Stack

- **Framework**: Next.js 15+ with App Router and Turbopack
- **Blockchain**: Sui blockchain integration via `@mysten/dapp-kit`
- **State Management**: Zustand + TanStack Query for optimal data handling
- **UI/UX**: Radix UI primitives with Tailwind CSS
- **Analytics**: Amplitude, Microsoft Clarity, GrowthBook A/B testing
- **Monitoring**: Sentry for error tracking and performance monitoring

## Quick Start

### Prerequisites

- Node.js 18+
- Pnpm package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sui-dapp-fe-template

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Configure your database and API keys in .env.local

# Start development server
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Development Commands

```bash
# Development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Project Structure

```
src/
├── app/                # Next.js App Router pages and API routes
│   ├── (main)/         # Main application routes
│   └── api/            # Backend API endpoints
├── components/         # React components organized by feature
│   ├── {feature}/      # Feature-specific components
│   ├── shared/         # Cross-feature reusable components
│   ├── ui/             # Base UI components (Radix-based)
│   └── layout/         # Layout and navigation components
├── hooks/              # Custom React hooks for data fetching and mutations
├── stores/             # Zustand stores for app state management
├── libs/               # Utility functions and configurations
└── consts/             # Constants and configuration values
```

## Key Integrations

- **Sui Wallets**: Support for major Sui wallets via dApp Kit

## Environment Variables

Key environment variables to configure:

```bash
# Blockchain
NEXT_PUBLIC_SUI_NETWORK="mainnet" # or "testnet", "devnet"

# Analytics & Monitoring
SENTRY_DSN="https://..."
NEXT_PUBLIC_AMPLITUDE_API_KEY="..."
NEXT_PUBLIC_CLARITY_PROJECT_ID="..."

# Feature Flags
NEXT_PUBLIC_GROWTHBOOK_API_HOST="..."
NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY="..."
```

## Deployment

The application is optimized for deployment on Vercel with automatic environment detection:

1. **Environment Detection**: Automatic via `VERCEL_ENV` or manual via `SENTRY_ENVIRONMENT`
2. **Build Process**: Next.js optimization
3. **Performance Monitoring**: Sentry integration across all runtime environments
4. **Analytics**: Production-ready tracking and A/B testing infrastructure

## Contributing

1. Follow the existing code style and patterns
2. Run `pnpm lint` before committing
3. Test thoroughly across different wallet connections and network conditions

## Security

- Never commit sensitive environment variables
- All user inputs are validated and sanitized
- Smart contract interactions use secure transaction patterns
- Regular security audits by MoveBytes and OtterSec

## License

Private repository - All rights reserved.
