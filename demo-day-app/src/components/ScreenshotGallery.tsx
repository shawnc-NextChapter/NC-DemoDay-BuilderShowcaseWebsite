"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import type { Presenter } from "@/types/presenter";

interface ScreenshotGalleryProps {
  presenter: Presenter;
}

export default function ScreenshotGallery({ presenter }: ScreenshotGalleryProps) {
  const { screenshots, name } = presenter.project;
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; type: "desktop" | "mobile" } | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  // Close on Escape key
  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll while lightbox is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox]);

  return (
    <>
      <section className="px-6 sm:px-10 lg:px-14 py-10" aria-label="Product screenshots">
        <div className="kicker mb-6">Screenshots</div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 md:items-stretch">
          {/* Desktop screenshot */}
          <div className="card p-2 overflow-hidden flex flex-col">
            <div
              className="relative aspect-video rounded-[calc(var(--radius-lg)-8px)] overflow-hidden bg-cream flex items-center justify-center cursor-pointer group"
              onClick={() =>
                screenshots.desktop &&
                setLightbox({ src: screenshots.desktop, alt: `${name} desktop view`, type: "desktop" })
              }
            >
              {screenshots.desktop ? (
                <>
                  <Image
                    src={screenshots.desktop}
                    alt={`${name} desktop view`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-paper/90 backdrop-blur-sm text-ink text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                      Click to expand
                    </span>
                  </div>
                </>
              ) : (
                <span className="text-ink-muted text-sm">No desktop screenshot available</span>
              )}
            </div>
            <div className="text-center py-2">
              <span className="text-label text-ink-muted">Desktop</span>
            </div>
          </div>

          {/* Mobile screenshot */}
          <div className="card p-2 overflow-hidden flex flex-col">
            <div
              className="relative aspect-[9/19.5] md:aspect-auto md:flex-1 md:min-h-0 rounded-[calc(var(--radius-lg)-8px)] overflow-hidden bg-cream mx-auto w-full max-w-[250px] md:max-w-none flex items-center justify-center cursor-pointer group"
              onClick={() =>
                screenshots.mobile &&
                setLightbox({ src: screenshots.mobile, alt: `${name} mobile view`, type: "mobile" })
              }
            >
              {screenshots.mobile ? (
                <>
                  <Image
                    src={screenshots.mobile}
                    alt={`${name} mobile view`}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-paper/90 backdrop-blur-sm text-ink text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                      Click to expand
                    </span>
                  </div>
                </>
              ) : (
                <span className="text-ink-muted text-sm text-center px-4">No mobile screenshot available</span>
              )}
            </div>
            <div className="text-center py-2">
              <span className="text-label text-ink-muted">Mobile</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-lightbox-in"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" />

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-paper/15 hover:bg-paper/25 transition-colors duration-200 text-white"
            aria-label="Close lightbox"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>

          {/* Image container */}
          <div
            className={`relative z-10 ${
              lightbox.type === "desktop"
                ? "w-full max-w-5xl aspect-video"
                : "h-full max-h-[90vh] aspect-[9/19.5]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              className={`${lightbox.type === "desktop" ? "object-cover" : "object-contain"} rounded-xl`}
              sizes="100vw"
              priority
            />
          </div>

          {/* Label */}
          <div className="absolute bottom-4 sm:bottom-6 z-10 text-white/70 text-xs font-medium tracking-wide uppercase">
            {lightbox.type === "desktop" ? "Desktop" : "Mobile"} · Click anywhere to close
          </div>
        </div>
      )}
    </>
  );
}
