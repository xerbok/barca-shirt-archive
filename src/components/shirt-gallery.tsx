"use client";

import { type KeyboardEvent, useState } from "react";
import type { ShirtImage } from "@/types/database";

type ShirtGalleryProps = {
  images: ShirtImage[];
  title: string;
};

export function ShirtGallery({ images, title }: ShirtGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(false);

  if (images.length === 0) {
    return (
      <section className="overflow-hidden rounded-lg border border-[#01176a]/15 bg-white shadow-sm">
        <div
          aria-label="Imatge placeholder de la samarreta"
          className="relative aspect-[4/3] overflow-hidden bg-slate-900"
          role="img"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#01176a_0_34%,#c30044_34%_66%,#01176a_66%_100%)]" />
          <div className="absolute inset-x-10 top-10 h-32 rounded-b-full border-x-8 border-b-8 border-white/25" />
          <div className="absolute bottom-5 left-5 rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-[#01176a]">
            Imatge pendent
          </div>
        </div>
        <p className="px-5 py-4 text-sm font-medium text-slate-600">
          Aquesta samarreta encara no té imatges.
        </p>
      </section>
    );
  }

  const activeImage = images[activeIndex];
  const hasMultipleImages = images.length > 1;

  function showPreviousImage() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  }

  function showNextImage() {
    setActiveIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1,
    );
  }

  function handleGalleryKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!hasMultipleImages) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousImage();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextImage();
    }
  }

  return (
    <section className="rounded-lg border border-[#01176a]/15 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-[#01176a]">
          Galeria d&apos;imatges
        </h2>
        {hasMultipleImages ? (
          <p className="text-sm font-medium text-[#c30044]">
            {activeIndex + 1} de {images.length}
          </p>
        ) : null}
      </div>

      <figure
        className="mt-4"
        onFocus={() => setControlsVisible(true)}
        onKeyDown={handleGalleryKeyDown}
        onMouseEnter={() => setControlsVisible(true)}
        onMouseLeave={() => setControlsVisible(false)}
        tabIndex={0}
      >
        <div
          aria-label={`${title}, imatge ${activeIndex + 1}`}
          className="relative aspect-[4/3] overflow-hidden rounded-md bg-slate-100 bg-cover bg-center outline-none"
          role="img"
          style={{
            backgroundImage: `url(${JSON.stringify(activeImage.image_url)})`,
          }}
        >
          {hasMultipleImages ? (
            <>
              <CarouselButton
                controlsVisible={controlsVisible}
                direction="previous"
                label="Veure la imatge anterior"
                onClick={showPreviousImage}
              />
              <CarouselButton
                controlsVisible={controlsVisible}
                direction="next"
                label="Veure la imatge següent"
                onClick={showNextImage}
              />
            </>
          ) : null}

          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {activeImage.is_main ? (
              <figcaption className="rounded-md bg-white/90 px-3 py-1 text-xs font-semibold uppercase text-[#01176a]">
                Imatge principal
              </figcaption>
            ) : null}
            {hasMultipleImages ? (
              <span className="rounded-md bg-slate-950/75 px-3 py-1 text-xs font-semibold text-white">
                Imatge {activeIndex + 1} de {images.length}
              </span>
            ) : null}
          </div>
        </div>
      </figure>

      {hasMultipleImages ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {images.map((image, index) => (
            <button
              aria-label={`Veure la imatge ${index + 1}`}
              aria-pressed={index === activeIndex}
              className="h-2.5 w-2.5 rounded-full bg-slate-300 transition hover:bg-[#c30044] aria-pressed:bg-[#01176a]"
              key={image.id}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function CarouselButton({
  controlsVisible,
  direction,
  label,
  onClick,
}: {
  controlsVisible: boolean;
  direction: "next" | "previous";
  label: string;
  onClick: () => void;
}) {
  const positionClass = direction === "previous" ? "left-3" : "right-3";
  const symbol = direction === "previous" ? "‹" : "›";

  return (
    <button
      aria-label={label}
      className={`absolute top-1/2 ${positionClass} flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-3xl font-semibold leading-none text-[#01176a] shadow-sm transition hover:bg-white hover:text-[#c30044] focus:opacity-100 focus:outline-none focus:ring-4 focus:ring-[#01176a]/15`}
      onClick={onClick}
      style={{ opacity: controlsVisible ? 1 : 0 }}
      type="button"
    >
      <span aria-hidden="true">{symbol}</span>
    </button>
  );
}
