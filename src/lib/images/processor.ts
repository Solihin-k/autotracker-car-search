export interface ResizeOptions {
  width: number;
  quality: number;
  format: "webp";
}

export const THUMB_OPTIONS: ResizeOptions = {
  width: 400,
  quality: 80,
  format: "webp",
};

export const FULL_OPTIONS: ResizeOptions = {
  width: 1200,
  quality: 85,
  format: "webp",
};

/**
 * Resize an image buffer using Sharp and return the processed buffer.
 */
export async function resizeImage(
  _inputBuffer: Buffer,
  _options: ResizeOptions,
): Promise<Buffer> {
  // TODO: Implement Sharp resize/optimize/WebP conversion
  return Buffer.alloc(0);
}
