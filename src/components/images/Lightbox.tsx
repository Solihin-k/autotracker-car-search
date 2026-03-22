"use client";

import { useCallback, useEffect, useState } from "react";
import type { ListingImage } from "@/lib/types";

interface LightboxProps {
  images: ListingImage[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goNext, goPrev]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
      >
        &times;
      </button>

      <button
        type="button"
        onClick={goPrev}
        className="absolute left-4 text-white text-3xl hover:text-gray-300"
      >
        &lsaquo;
      </button>

      <div className="max-w-4xl max-h-[80vh] flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
          <p>Image {currentIndex + 1} of {images.length}</p>
          <p className="text-xs mt-2 text-gray-500">
            {images[currentIndex]?.url ?? "No URL"}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={goNext}
        className="absolute right-4 text-white text-3xl hover:text-gray-300"
      >
        &rsaquo;
      </button>

      <div className="absolute bottom-4 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
