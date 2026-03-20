# AutoTracker SG — Used Car Search & Analysis

Next.js 14 app (App Router) for Singapore used car search across sgCarMart and Carro. Local development environment.

See @car-search-tool-spec.md for full architecture, data models, source adapter details, and SG market context.

## Market Context

This tool is Singapore-only. All pricing is in SGD. The deal analysis engine must account for COE (Certificate of Entitlement), PARF rebates, ARF, OMV, and paper value. Annual depreciation = (Price - Paper Value) / COE years remaining. See the spec for the full formula and PARF rebate tiers.

## Data Sources (2 only)

- **sgCarMart** (`www.sgcarmart.com`): Scrape with Cheerio. Server-rendered HTML, no headless browser needed. Respect `robots.txt`, 1.5s delay between requests.
- **Carro** (`carro.co/sg`): Check for internal API endpoints first (inspect network tab). If no API, use Puppeteer. 1s delay between requests.

Both adapters implement the `SourceAdapter` interface in `lib/sources/base.ts`. Search hits both in parallel via `Promise.allSettled` with a 10-second timeout. Results stream to frontend via SSE.

## Commands

- `npm run dev`: Start dev server (port 3000)
- `npm run build`: Production build
- `npm run lint`: ESLint
- `npm test`: Jest tests
- `npx prisma generate`: Generate Prisma client
- `npx prisma db push`: Sync schema to SQLite

## Tech Stack

- **Framework**: Next.js 14+, App Router, TypeScript strict
- **Styling**: Tailwind CSS
- **State**: Zustand
- **DB**: SQLite via Prisma (`./data/autotracker.db`)
- **Cache**: In-memory LRU (no Redis)
- **Scraping**: Cheerio (sgCarMart), Puppeteer if needed (Carro)
- **Images**: Sharp for resize/optimize, cache to `./data/images/`
- **AI**: `@anthropic-ai/sdk` for image analysis

## Architecture

```
src/
├── app/                        # Pages + API routes
│   ├── page.tsx                # Search + results
│   ├── listing/[id]/           # Detail view
│   ├── tracker/                # Saved listings
│   └── api/
│       ├── search/stream/      # SSE streaming search
│       ├── listing/[id]/       # Detail + analyze
│       ├── images/proxy/       # Image proxy + cache
│       ├── tracker/            # CRUD
│       └── coe/latest/         # COE premiums
├── components/
│   ├── search/                 # SearchForm, ResultsGrid, ResultCard
│   ├── images/                 # ImageGrid, Lightbox, SwipeTriage
│   ├── analysis/               # DealScore, DepreciationBreakdown, CompareTable
│   └── tracker/                # TrackerBoard, StatusPipeline
└── lib/
    ├── sources/                # base.ts, sgcarmart.ts, carro.ts
    ├── analysis/               # sg-deal-scorer.ts, depreciation.ts, image-analyzer.ts
    ├── cache/                  # lru.ts
    ├── images/                 # proxy.ts, processor.ts
    ├── db/                     # queries.ts
    └── types.ts
```

## Key Patterns

- **SSE streaming search**: `/api/search/stream` pushes `{ source, listings[] }` events per source as they resolve. Frontend appends and deduplicates.
- **Image proxy**: Never hotlink. Fetch → resize with Sharp (400px thumb, 1200px full, WebP) → cache to `./data/images/` → serve from `/api/images/proxy`.
- **SG depreciation calc**: Always compute annual depreciation, paper value, PARF rebate, and COE rebate for every listing. Display prominently on cards.
- **Deduplication**: Same make + model + year + price within $1,000 + mileage within 1,000km = likely duplicate. Merge, keep richer listing, flag "Listed on both sources".

## Rules

- NEVER commit `.env` — contains `ANTHROPIC_API_KEY`
- All prices in SGD, no currency conversion needed
- All source adapter errors must be caught and logged, never crash the search
- Handle missing/broken images with a placeholder
- TypeScript strict mode, no `any`
- Named exports over default exports
- Components under 200 lines — split if larger
- `data/` directory is gitignored (DB + image cache)

## Testing on Mobile

Run the dev server with `npm run dev` then access from your phone via local network:
1. Find your machine's local IP: `hostname -I` or check network settings
2. Access `http://<your-ip>:3000` from your phone's browser
3. Ensure both devices are on the same WiFi network
