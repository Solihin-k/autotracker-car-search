import { LRUCache } from "lru-cache";

const DEFAULT_SEARCH_TTL = parseInt(
  process.env.CACHE_TTL_SEARCH ?? "3600",
  10,
) * 1000;

const DEFAULT_MAX_ENTRIES = 500;

export function createSearchCache<V extends NonNullable<unknown>>() {
  return new LRUCache<string, V>({
    max: DEFAULT_MAX_ENTRIES,
    ttl: DEFAULT_SEARCH_TTL,
  });
}

export function createImageCache() {
  const imageTtl = parseInt(
    process.env.CACHE_TTL_IMAGES ?? "86400",
    10,
  ) * 1000;

  return new LRUCache<string, string>({
    max: 2000,
    ttl: imageTtl,
  });
}
