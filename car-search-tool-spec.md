# AutoTracker SG — Car Search & Analysis Tool (Technical Spec)

## 1. Problem Statement

Buying a used car in Singapore means toggling between sgCarMart (legacy UI, constant ad popups, broken back-button, terrible image browsing) and Carro (better UX but limited filtering). Neither site lets you compare across platforms, and Singapore-specific factors like COE expiry, PARF rebates, and annual depreciation are scattered or absent from listings.

This tool unifies search across both sources, adds image browsing, and surfaces Singapore-specific deal analysis — all in a single, clean interface.

### Core Pain Points

- **sgCarMart UX is awful**: Page freezes, forced ads, scroll position resets on back, image zoom is broken
- **No cross-platform view**: Can't compare a sgCarMart listing against a Carro listing side-by-side
- **COE/depreciation math is manual**: Listings show price but rarely show annual depreciation, PARF value, or COE rebate clearly
- **Image triage is painful**: Both sites make it hard to quickly scan photos across multiple listings

---

## 2. Target User

A Singapore-based buyer who has narrowed down to a few makes/models and wants to efficiently scan the market across sgCarMart and Carro, compare deals with COE-aware analysis, and track candidates.

---

## 3. Singapore Market Context

### Key Concepts the Tool Must Handle

| Concept | Description |
|---------|-------------|
| **COE** | Certificate of Entitlement — 10-year right to own a vehicle. Bidded twice monthly. Cat A (≤1600cc, ≤97kW), Cat B (>1600cc or >97kW), Cat C (goods vehicles), Cat E (open) |
| **OMV** | Open Market Value — import cost assessed by Customs, determines ARF |
| **ARF** | Additional Registration Fee — tiered tax on OMV |
| **PARF** | Preferential Additional Registration Fee rebate — partial ARF refund if deregistered within 10 years. 75% (≤5yr), 70% (5-6yr), 65% (6-7yr), 60% (7-8yr), 55% (8-9yr), 50% (9-10yr). Capped at $60,000 for cars registered after Feb 2023 |
| **COE Rebate** | Pro-rated refund of unused COE months |
| **Paper Value** | PARF rebate + COE rebate = minimum recoverable value |
| **Annual Depreciation** | (Purchase Price - Paper Value) / Years of COE left |
| **COE Car** | Vehicle >10 years old with renewed COE, no PARF eligibility |
| **PARF Car** | Vehicle <10 years old on original COE, eligible for PARF rebate |
| **Road Tax** | Based on engine capacity, payable every 6 or 12 months |

### Depreciation Formula

```
Annual Depreciation = (Asking Price - Paper Value) / COE Years Remaining

Where:
  Paper Value = PARF Rebate + COE Rebate
  PARF Rebate = PARF%(age) × ARF  (capped at $60,000 if registered after Feb 2023)
  COE Rebate  = (Months Remaining / 120) × Original COE Premium
```

---

## 4. Feature Specification

### 4.1 Unified Search

Single search form querying both sgCarMart and Carro in parallel.

**Input Fields**:
| Field | Type | Required |
|-------|------|----------|
| Make | Dropdown / autocomplete | Yes |
| Model | Dropdown (filtered by make) | No |
| Year Range | Min / Max | No |
| Price Range (SGD) | Min / Max | No |
| Mileage Max (km) | Number | No |
| COE Type | PARF / COE / Both | No |
| Min COE Left | Months | No |
| Vehicle Type | Sedan / SUV / Hatchback / MPV / etc. | No |
| Sources | sgCarMart / Carro / Both | No |

### 4.2 Image Gallery & Triage

- **Grid view**: Primary photo per listing in a thumbnail grid, with image count badge
- **Lightbox**: Full carousel per listing, all photos, keyboard navigable
- **Swipe triage** (mobile): Card-stack UI — swipe right to shortlist, left to dismiss
- Lazy-load with `IntersectionObserver`
- Proxy and cache all images locally (never hotlink)
- Graceful fallback for missing/broken images

**Image Analysis (stretch)**:
- Use Claude vision API to flag visible damage, mismatched paint, worn interiors
- Auto-tag images: exterior, interior, engine, dashboard, wheels, damage

### 4.3 Deal Analysis Engine (Singapore-Specific)

**Per-listing outputs**:
- Annual depreciation (SGD/year)
- Paper value breakdown (PARF rebate + COE rebate)
- Deal score: 0–100
- Deal label: Great / Good / Fair / Overpriced / Red Flag
- Key reasons (e.g., "Depreciation $12.8k/yr — below average for this model", "COE expiring in 14 months")

**Scoring Factors**:
| Factor | Weight | Logic |
|--------|--------|-------|
| Annual depreciation vs. class average | 30% | Lower depreciation = better score |
| Price vs. similar listings | 20% | Below median for same make/model/age = better |
| COE remaining | 15% | More months left = better (flag if <18 months) |
| Mileage for age | 15% | Below 15,000 km/year benchmark = better |
| Number of owners | 10% | Fewer = better |
| PARF vs COE car | 10% | PARF cars score higher (rebate recoverable) |

### 4.4 Listing Tracker

- **Statuses**: Watching → Contacted → Viewing Scheduled → Negotiating → Passed / Bought
- Side-by-side comparison (up to 4)
- Notes per listing
- Price change tracking (periodic re-check)
- Export to CSV

---

## 5. Data Sources

### 5.1 sgCarMart (`www.sgcarmart.com`)

Singapore's largest used car marketplace (~20,000+ listings).

**Access method**: Web scraping (no public API). There is a third-party PHP wrapper (`jinjie/sgcarmart-api`) but it may be outdated. Prefer direct scraping with Cheerio.

**Key URLs**:
- Search: `https://www.sgcarmart.com/used_cars/listing.php?MOD=...&RPG=...`
- Listing detail: `https://www.sgcarmart.com/used_cars/info.php?ID=...`
- Images: Hosted on sgCarMart CDN, extractable from listing page

**Available data fields**:
- Make, model, price (SGD), depreciation value, registration date
- COE expiry date, COE category, OMV, ARF, engine capacity, power
- Mileage, number of owners, transmission, fuel type
- Dealer name, dealer location
- Multiple photos per listing
- Vehicle type (sedan, SUV, etc.)

**Scraping notes**:
- Check `robots.txt` and respect crawl rules
- Pages are server-rendered HTML — Cheerio is sufficient, no headless browser needed
- Rate limit: Add 1–2 second delay between requests
- Ad popups and interstitials don't affect server-side HTML

### 5.2 Carro (`carro.co/sg`)

Modern platform with inspection reports and transparent pricing.

**Access method**: Likely has internal API endpoints (check network tab for XHR/fetch calls to their API). Prefer API over scraping if available.

**Key URLs**:
- Browse: `https://carro.co/sg/en/buy-car`
- Listing detail: `https://carro.co/sg/en/buy-car/{slug}`
- Likely API: Check for `api.carro.co` or similar endpoints in network requests

**Available data fields**:
- Make, model, price (SGD), registration date, COE expiry
- Mileage, engine capacity, transmission, fuel type
- Inspection report grade (Carro-specific)
- Number of owners, vehicle type
- Photos (usually high quality, Carro-hosted)
- Monthly instalment estimate

**Scraping notes**:
- Carro's site is likely React/Next.js — check for a data API before scraping HTML
- If API exists, prefer it (structured JSON, faster, more reliable)
- If scraping, may need Puppeteer/Playwright for JS-rendered content

---

## 6. Architecture

```
┌──────────────────────────────────────────────────┐
│              Frontend (Next.js App Router)         │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐ ┌──────┐ │
│  │  Search   │ │  Image   │ │ Analysis│ │Tracker│ │
│  │  + Results│ │  Gallery │ │ Panel   │ │ Board │ │
│  └─────┬────┘ └─────┬────┘ └────┬────┘ └───┬──┘ │
│        └─────────────┼──────────┼───────────┘    │
│                      │ API routes                 │
└──────────────────────┼────────────────────────────┘
                       │
┌──────────────────────┼────────────────────────────┐
│              Backend (Next.js API Routes)          │
│                                                    │
│  ┌────────────────────────────────┐                │
│  │       Search Aggregator        │                │
│  │  (parallel fetch + SSE stream) │                │
│  └────────┬──────────┬────────────┘                │
│           │          │                             │
│  ┌────────┴───┐ ┌────┴────────┐                    │
│  │ sgCarMart  │ │   Carro     │                    │
│  │  Adapter   │ │   Adapter   │                    │
│  │ (Cheerio)  │ │ (API/Puppt) │                    │
│  └────────────┘ └─────────────┘                    │
│                                                    │
│  ┌───────────┐ ┌─────────────┐ ┌────────────────┐ │
│  │  Image    │ │  SG Deal    │ │  Database      │ │
│  │  Proxy +  │ │  Analyzer   │ │  (SQLite +     │ │
│  │  Cache    │ │  (COE/PARF) │ │   Prisma)      │ │
│  └───────────┘ └─────────────┘ └────────────────┘ │
│                                                    │
│  ┌────────────────────────┐                        │
│  │  LRU Cache (in-memory) │                        │
│  └────────────────────────┘                        │
└────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14+ (App Router) | Unified frontend + API routes |
| Language | TypeScript (strict) | Type safety across stack |
| Styling | Tailwind CSS | Fast iteration, mobile-first |
| State | Zustand | Lightweight, no boilerplate |
| Database | SQLite via Prisma | Zero-config, single file, local |
| Cache | LRU in-memory | Simple, no Redis needed for 2 sources |
| Scraping | Cheerio (sgCarMart), Puppeteer (Carro if needed) | Server-rendered vs JS-rendered |
| Images | Sharp | Resize, optimize, WebP conversion |
| AI | `@anthropic-ai/sdk` | Image analysis via Claude vision |

---

## 7. Data Model

```typescript
interface Listing {
  id: string;
  sourceId: string;
  source: "sgcarmart" | "carro";
  url: string;

  // Vehicle
  make: string;
  model: string;
  trim?: string;
  year: number;
  registrationDate?: string;
  mileage?: number;                 // km
  engineCapacity?: number;          // cc
  power?: string;
  transmission?: "auto" | "manual";
  fuelType?: "petrol" | "diesel" | "hybrid" | "electric";
  vehicleType?: string;
  color?: string;
  numOwners?: number;

  // Singapore-specific
  coeExpiryDate?: string;
  coeMonthsLeft?: number;
  coeCategory?: "A" | "B" | "C" | "E";
  coePremium?: number;
  omv?: number;
  arf?: number;
  parfEligible?: boolean;
  parfRebate?: number;
  coeRebate?: number;
  paperValue?: number;
  annualDepreciation?: number;

  // Pricing
  price: number;                    // SGD
  priceHistory?: { date: string; price: number }[];

  // Seller
  sellerType: "dealer" | "direct_owner" | "platform";
  sellerName?: string;

  // Images
  images: ListingImage[];
  imageCount: number;

  // Metadata
  listedDate?: string;
  fetchedAt: string;
  description?: string;

  // Analysis
  dealScore?: number;
  dealLabel?: "great" | "good" | "fair" | "overpriced" | "red_flag";
  analysisNotes?: string[];
  flags?: string[];
}

interface ListingImage {
  url: string;
  cachedPath?: string;
  thumbnailPath?: string;
  tags?: string[];
  analysisNotes?: string;
}

interface SavedListing {
  id: string;
  listingId: string;
  status: "watching" | "contacted" | "viewing" | "negotiating" | "passed" | "bought";
  notes: string;
  tags: string[];
  addedAt: string;
  updatedAt: string;
  priceAtSave: number;
}
```

---

## 8. Search Performance

With only 2 sources, performance is simpler to optimise.

### Strategy

1. **Parallel fetch**: Hit sgCarMart and Carro simultaneously via `Promise.allSettled` with 10-second timeout
2. **SSE streaming**: Push results per source as they arrive
3. **In-memory LRU cache**: Cache search results for 1 hour
4. **Image proxy cache**: Cache images to `./data/images/` indefinitely
5. **Deduplication**: Same make + model + year + similar price (±$1,000) + similar mileage (±1,000km) = likely same car on both platforms. Merge and flag.

---

## 9. Image Pipeline

```
User requests listing images
  → Check ./data/images/{listingId}/
    → HIT: Serve cached WebP
    → MISS: Fetch from source → Sharp resize → save → serve

Thumbnail: 400px wide, WebP, quality 80
Full: 1200px wide, WebP, quality 85
```

### Frontend Image Gallery

- Virtualized grid (`react-virtuoso`)
- Lightbox with arrow-key navigation
- Swipe triage on mobile (`@use-gesture/react` + `react-spring`)
- Prefetch full images on hover/tap

---

## 10. API Endpoints

```
GET  /api/search/stream?make=toyota&model=camry&yearMin=2020&priceMax=100000
     → SSE stream: { source, listings[] } per source

GET  /api/listing/:id
GET  /api/listing/:id/analyze

GET  /api/images/proxy?url=...&size=thumb|full

GET    /api/tracker/listings
POST   /api/tracker/listings
PATCH  /api/tracker/listings/:id
DELETE /api/tracker/listings/:id

GET  /api/tracker/compare?ids=a,b,c

GET  /api/coe/latest
     → Latest COE premiums
```

---

## 11. File Structure

```
autotracker-sg/
├── CLAUDE.md
├── package.json
├── .env.example
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── listing/[id]/page.tsx
│   │   ├── tracker/page.tsx
│   │   ├── compare/page.tsx
│   │   └── api/
│   │       ├── search/stream/route.ts
│   │       ├── listing/[id]/route.ts
│   │       ├── listing/[id]/analyze/route.ts
│   │       ├── images/proxy/route.ts
│   │       ├── tracker/route.ts
│   │       └── coe/latest/route.ts
│   ├── components/
│   │   ├── search/
│   │   ├── images/
│   │   ├── analysis/
│   │   └── tracker/
│   └── lib/
│       ├── sources/
│       │   ├── base.ts
│       │   ├── sgcarmart.ts
│       │   └── carro.ts
│       ├── analysis/
│       │   ├── sg-deal-scorer.ts
│       │   ├── depreciation.ts
│       │   └── image-analyzer.ts
│       ├── cache/
│       │   └── lru.ts
│       ├── images/
│       │   ├── proxy.ts
│       │   └── processor.ts
│       ├── db/
│       │   └── queries.ts
│       └── types.ts
├── data/
│   ├── autotracker.db
│   └── images/
└── tests/
    ├── sources/
    └── analysis/
```

---

## 12. Environment Variables

```bash
# .env.example
DATABASE_URL="file:./data/autotracker.db"
IMAGE_CACHE_DIR="./data/images"
ANTHROPIC_API_KEY=sk-ant-...
ANALYSIS_MODEL=claude-sonnet-4-20250514
CACHE_TTL_SEARCH=3600
CACHE_TTL_IMAGES=86400
SGCARMART_DELAY_MS=1500
CARRO_DELAY_MS=1000
PORT=3000
```

---

## 13. Build Phases

### Phase 1 — Core Search + Display (MVP)
- Search form with SG-relevant filters
- sgCarMart adapter (Cheerio)
- Carro adapter (API discovery or Puppeteer)
- Result cards with primary image, price, depreciation
- In-memory cache + SQLite

### Phase 2 — SG Deal Analysis
- COE/PARF-aware depreciation calculator
- Deal scoring engine
- Paper value breakdown UI
- COE expiry warnings + deduplication

### Phase 3 — Image Pipeline + Gallery
- Image proxy + Sharp caching
- Thumbnail grid, lightbox, lazy loading
- Swipe triage on mobile

### Phase 4 — Image Analysis
- Claude vision integration
- Damage detection, image tagging

### Phase 5 — Polish
- Price change tracking
- COE premium trends
- CSV export
- Mobile refinement

---

## 14. Key Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "zustand": "^4.0.0",
    "@anthropic-ai/sdk": "latest",
    "sharp": "^0.33.0",
    "cheerio": "^1.0.0",
    "puppeteer": "^22.0.0",
    "prisma": "^5.0.0",
    "@prisma/client": "^5.0.0",
    "lru-cache": "^10.0.0",
    "react-virtuoso": "^4.0.0",
    "@use-gesture/react": "^10.0.0",
    "react-spring": "^9.0.0"
  }
}
```

---

## 15. Legal & Ethical Notes

- Respect `robots.txt` for both sgCarMart and Carro
- Rate limit all requests (1.5s for sgCarMart, 1s for Carro)
- Cache aggressively to minimise requests
- Images cached for personal use only
- All data stays local (SQLite + filesystem)
- Prefer Carro's API over scraping if discoverable
