export type Source = "sgcarmart" | "carro";

export type Transmission = "auto" | "manual";

export type FuelType = "petrol" | "diesel" | "hybrid" | "electric";

export type CoeCategory = "A" | "B" | "C" | "E";

export type SellerType = "dealer" | "direct_owner" | "platform";

export type DealLabel = "great" | "good" | "fair" | "overpriced" | "red_flag";

export type TrackerStatus =
  | "watching"
  | "contacted"
  | "viewing"
  | "negotiating"
  | "passed"
  | "bought";

export interface ListingImage {
  url: string;
  cachedPath?: string;
  thumbnailPath?: string;
  tags?: string[];
  analysisNotes?: string;
}

export interface PriceHistoryEntry {
  date: string;
  price: number;
}

export interface Listing {
  id: string;
  sourceId: string;
  source: Source;
  url: string;

  // Vehicle
  make: string;
  model: string;
  trim?: string;
  year: number;
  registrationDate?: string;
  mileage?: number;
  engineCapacity?: number;
  power?: string;
  transmission?: Transmission;
  fuelType?: FuelType;
  vehicleType?: string;
  color?: string;
  numOwners?: number;

  // Singapore-specific
  coeExpiryDate?: string;
  coeMonthsLeft?: number;
  coeCategory?: CoeCategory;
  coePremium?: number;
  omv?: number;
  arf?: number;
  parfEligible?: boolean;
  parfRebate?: number;
  coeRebate?: number;
  paperValue?: number;
  annualDepreciation?: number;

  // Pricing
  price: number;
  priceHistory?: PriceHistoryEntry[];

  // Seller
  sellerType: SellerType;
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
  dealLabel?: DealLabel;
  analysisNotes?: string[];
  flags?: string[];
}

export interface SearchParams {
  make: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMax?: number;
  coeType?: "parf" | "coe" | "both";
  minCoeLeftMonths?: number;
  vehicleType?: string;
  sources?: Source[];
}

export interface SearchEvent {
  source: Source;
  listings: Listing[];
}

export interface DealAnalysis {
  listingId: string;
  dealScore: number;
  dealLabel: DealLabel;
  annualDepreciation: number;
  paperValue: number;
  parfRebate: number;
  coeRebate: number;
  notes: string[];
  flags: string[];
  comparisonToMarket?: {
    medianPrice: number;
    percentile: number;
    sampleSize: number;
  };
}

export interface SavedListing {
  id: string;
  listingId: string;
  status: TrackerStatus;
  notes: string;
  tags: string[];
  priceAtSave: number;
  addedAt: string;
  updatedAt: string;
}

export interface CoePremiums {
  fetchedAt: string;
  biddingRound: string;
  categories: Record<
    CoeCategory,
    { premium: number; description: string }
  >;
}
