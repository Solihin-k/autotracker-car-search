import type { Listing, SavedListing, TrackerStatus } from "@/lib/types";

/**
 * Upsert a listing into the database.
 */
export async function upsertListing(_listing: Listing): Promise<void> {
  // TODO: Implement with Prisma client
}

/**
 * Get a listing by its internal ID.
 */
export async function getListingById(
  _id: string,
): Promise<Listing | null> {
  // TODO: Implement with Prisma client
  return null;
}

/**
 * Save a listing to the tracker.
 */
export async function saveToTracker(
  _listingId: string,
  _priceAtSave: number,
): Promise<SavedListing> {
  // TODO: Implement with Prisma client
  return {
    id: "",
    listingId: _listingId,
    status: "watching",
    notes: "",
    tags: [],
    priceAtSave: _priceAtSave,
    addedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Update the status of a saved listing.
 */
export async function updateTrackerStatus(
  _savedId: string,
  _status: TrackerStatus,
): Promise<void> {
  // TODO: Implement with Prisma client
}

/**
 * Get all saved listings, optionally filtered by status.
 */
export async function getSavedListings(
  _status?: TrackerStatus,
): Promise<SavedListing[]> {
  // TODO: Implement with Prisma client
  return [];
}

/**
 * Delete a saved listing from the tracker.
 */
export async function deleteSavedListing(_savedId: string): Promise<void> {
  // TODO: Implement with Prisma client
}
