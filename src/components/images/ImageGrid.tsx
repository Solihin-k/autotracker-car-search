import type { ListingImage } from "@/lib/types";

interface ImageGridProps {
  images: ListingImage[];
  onImageClick?: (index: number) => void;
}

export function ImageGrid({ images, onImageClick }: ImageGridProps) {
  if (images.length === 0) {
    return (
      <div className="aspect-video w-full rounded-lg bg-gray-200 flex items-center justify-center">
        <p className="text-sm text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {images.map((image, index) => (
        <button
          key={image.url}
          type="button"
          onClick={() => onImageClick?.(index)}
          className="aspect-square w-full rounded bg-gray-200 overflow-hidden hover:opacity-80 transition-opacity"
        >
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            {index + 1}
          </div>
        </button>
      ))}
    </div>
  );
}
