"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from "lucide-react";
import { GALLERY, GALLERY_CATEGORIES, type GalleryItem } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [category, setCategory] = useState<(typeof GALLERY_CATEGORIES)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo<GalleryItem[]>(
    () => (category === "All" ? GALLERY : GALLERY.filter((g) => g.category === category)),
    [category]
  );

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((cur) =>
        cur === null ? cur : (cur + dir + items.length) % items.length
      );
    },
    [items.length]
  );

  // keyboard navigation + scroll lock for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, close, step]);

  return (
    <section id="gallery" className="section-pad bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Gallery"
          title="Real photos from"
          highlight="Roots Academy Daska"
          description="Photographs and official posters from the academy's own public channels — its campuses, computer lab, classes and announcements."
        />

        {/* category filter */}
        <Reveal className="mt-10">
          <div
            className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
            role="tablist"
            aria-label="Gallery categories"
          >
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={category === cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "shrink-0 rounded-full px-4.5 py-2.5 text-[13.5px] font-bold transition-all",
                  category === cat
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-white text-foreground/65 ring-1 ring-border hover:text-primary hover:ring-primary/40"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* masonry grid */}
        <div className="masonry mt-8">
          {items.map((item, i) => (
            <Reveal key={item.src + item.caption} delay={(i % 3) * 0.06}>
              <button
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-secondary text-left shadow-card ring-1 ring-border transition-shadow hover:shadow-card-hover"
                aria-label={`Open photo: ${item.caption}`}
              >
                <Image
                  src={item.src}
                  alt={`${item.caption} — Roots Academy of Sciences Daska`}
                  width={720}
                  height={item.tall ? 960 : 540}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="photo h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                  <span className="text-[13px] font-bold leading-snug text-white drop-shadow">
                    {item.caption}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors group-hover:bg-primary">
                    <ZoomIn className="h-4 w-4" aria-hidden />
                  </span>
                </span>
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-brand-deep">
                  {item.category}
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-8">
          <p className="flex items-center justify-center gap-2 text-center text-[13px] font-semibold text-muted-foreground">
            <Images className="h-4 w-4 text-primary" aria-hidden />
            All photos above are from Roots Academy&apos;s own public posts and Google Maps listing.
          </p>
        </Reveal>
      </div>

      {/* Lightbox */}
      {lightbox !== null && items[lightbox] && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
        >
          <button
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary"
            onClick={close}
            aria-label="Close viewer"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>

          <button
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary sm:left-6"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>

          <figure
            className="relative max-h-[86vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[lightbox].src}
              alt={`${items[lightbox].caption} — Roots Academy Daska`}
              width={900}
              height={1200}
              sizes="90vw"
              className="mx-auto max-h-[78vh] w-auto rounded-xl object-contain"
              priority
            />
            <figcaption className="mt-4 text-center">
              <p className="text-[14.5px] font-bold text-white">{items[lightbox].caption}</p>
              <p className="mt-1 text-[12px] font-semibold uppercase tracking-wider text-white/50">
                {items[lightbox].category} — {lightbox + 1} / {items.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
