import type { Listing, SearchParams } from "@/lib/types";
import type { SourceAdapter } from "./base";

const SGCARMART_DELAY_MS = parseInt(
  process.env.SGCARMART_DELAY_MS ?? "1500",
  10,
);

export class SgCarMartAdapter implements SourceAdapter {
  readonly name = "sgcarmart";
  readonly baseUrl = "https://www.sgcarmart.com";
  readonly delayMs = SGCARMART_DELAY_MS;

  async search(_params: SearchParams): Promise<Listing[]> {
    // TODO: Implement Cheerio-based scraping of sgCarMart search results
    return [];
  }

  async getListingDetail(_sourceId: string): Promise<Listing | null> {
    // TODO: Implement Cheerio-based scraping of sgCarMart listing detail
    return null;
  }
}
