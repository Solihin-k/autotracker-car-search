export interface ImageAnalysisResult {
  tags: string[];
  damageDetected: boolean;
  notes: string[];
}

/**
 * Analyze a listing image using Claude vision API.
 * Returns tags (exterior, interior, engine, etc.) and damage flags.
 */
export async function analyzeImage(
  _imageUrl: string,
): Promise<ImageAnalysisResult> {
  // TODO: Implement Claude vision API call via @anthropic-ai/sdk
  return {
    tags: [],
    damageDetected: false,
    notes: ["Image analysis not yet implemented"],
  };
}
