import type { Listing, SearchParams } from "@/lib/types";

export interface SourceAdapter {
  readonly name: string;
  readonly baseUrl: string;
  readonly delayMs: number;

  search(params: SearchParams): Promise<Listing[]>;
  getListingDetail(sourceId: string): Promise<Listing | null>;
}
