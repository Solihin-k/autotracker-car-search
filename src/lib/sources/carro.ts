import type { Listing, SearchParams } from "@/lib/types";
import type { SourceAdapter } from "./base";

const CARRO_DELAY_MS = parseInt(process.env.CARRO_DELAY_MS ?? "1000", 10);

export class CarroAdapter implements SourceAdapter {
  readonly name = "carro";
  readonly baseUrl = "https://carro.co/sg";
  readonly delayMs = CARRO_DELAY_MS;

  async search(_params: SearchParams): Promise<Listing[]> {
    // TODO: Implement Carro API or Puppeteer-based search
    return [];
  }

  async getListingDetail(_sourceId: string): Promise<Listing | null> {
    // TODO: Implement Carro listing detail fetch
    return null;
  }
}
