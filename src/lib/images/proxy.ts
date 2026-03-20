export interface CachedImage {
  path: string;
  contentType: string;
}

/**
 * Fetch an image from a source URL, cache it locally, and return
 * the cached file path.
 */
export async function fetchAndCacheImage(
  _imageUrl: string,
  _listingId: string,
): Promise<CachedImage | null> {
  // TODO: Implement fetch → Sharp resize → cache to ./data/images/
  return null;
}
