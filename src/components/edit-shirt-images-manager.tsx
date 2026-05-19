"use client";

import { type FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  deleteShirtImageAction,
  setMainShirtImageAction,
  uploadAdditionalShirtImagesAction,
  type EditShirtImagesActionResult,
} from "@/app/samarretes/[id]/editar/actions";
import type { ShirtImage } from "@/types/database";

type EditShirtImagesManagerProps = {
  images: ShirtImage[];
  shirtId: string;
};

const acceptedImageTypes = new Set(["image/png", "image/jpeg", "image/webp"]);
const maxImageUploadBytes = 45 * 1024 * 1024;
const maxImageUploadMb = 45;

export function EditShirtImagesManager({
  images,
  shirtId,
}: EditShirtImagesManagerProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [actionMessage, setActionMessage] =
    useState<EditShirtImagesActionResult | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const uploadPending = pendingAction === "upload";

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("images");

    if (!(input instanceof HTMLInputElement) || !input.files) {
      setActionMessage({
        message: "Selecciona almenys una imatge per pujar.",
        status: "error",
      });
      return;
    }

    const files = Array.from(input.files);
    const validationMessage = validateImageFiles(files);

    if (validationMessage) {
      setActionMessage({ message: validationMessage, status: "error" });
      return;
    }

    setPendingAction("upload");
    setActionMessage(null);

    try {
      const formData = new FormData(form);
      const result = await uploadAdditionalShirtImagesAction(shirtId, formData);
      setActionMessage(result);

      if (result.status === "success") {
        formRef.current?.reset();
        router.refresh();
      }
    } finally {
      setPendingAction(null);
    }
  }

  async function handleSetMainImage(imageId: string) {
    setPendingAction(`main-${imageId}`);
    setActionMessage(null);

    try {
      const result = await setMainShirtImageAction(shirtId, imageId);
      setActionMessage(result);

      if (result.status === "success") {
        router.refresh();
      }
    } finally {
      setPendingAction(null);
    }
  }

  async function handleDeleteImage(imageId: string) {
    const confirmed = window.confirm(
      "Segur que vols eliminar aquesta imatge? Aquesta acció no es pot desfer.",
    );

    if (!confirmed) {
      return;
    }

    setPendingAction(`delete-${imageId}`);
    setActionMessage(null);

    try {
      const result = await deleteShirtImageAction(shirtId, imageId);
      setActionMessage(result);

      if (result.status === "success") {
        router.refresh();
      }
    } finally {
      setPendingAction(null);
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-red-700">
            Imatges
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-950">
            Gestionar imatges
          </h2>
        </div>
        <p className="text-sm font-medium text-slate-600">
          {images.length} {images.length === 1 ? "imatge" : "imatges"}
        </p>
      </div>

      <form className="mt-5" onSubmit={handleUpload} ref={formRef}>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Afegir imatges
          <input
            accept="image/png,image/jpeg,image/webp"
            className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition file:mr-4 file:rounded-md file:border-0 file:bg-blue-800 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            disabled={uploadPending}
            multiple
            name="images"
            type="file"
          />
          <span className="text-xs font-normal text-slate-500">
            Formats acceptats: PNG, JPEG o WebP. Mida màxima total:{" "}
            {maxImageUploadMb} MB.
          </span>
        </label>
        <div className="mt-4 flex justify-end">
          <button
            className="inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-blue-300"
            disabled={uploadPending}
            type="submit"
          >
            {uploadPending ? "Pujant imatges..." : "Pujar imatges"}
          </button>
        </div>
      </form>

      {images.length === 0 ? (
        <div className="mt-5 rounded-md bg-slate-50 px-4 py-6 text-center">
          <p className="text-sm font-medium text-slate-600">
            Aquesta samarreta encara no té imatges.
          </p>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => {
            const deletePending = pendingAction === `delete-${image.id}`;
            const mainPending = pendingAction === `main-${image.id}`;

            return (
              <article
                className="overflow-hidden rounded-md border border-slate-200 bg-slate-50"
                key={image.id}
              >
                <div
                  aria-label={`Imatge ${index + 1} de la samarreta`}
                  className="relative aspect-[4/3] bg-slate-100 bg-cover bg-center"
                  role="img"
                  style={{
                    backgroundImage: `url(${JSON.stringify(image.image_url)})`,
                  }}
                >
                  {image.is_main ? (
                    <span className="absolute left-3 top-3 rounded-md bg-white/90 px-3 py-1 text-xs font-semibold uppercase text-blue-800">
                      Principal
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2 p-3">
                  <button
                    className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-2 text-xs font-semibold leading-tight text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={Boolean(image.is_main) || mainPending}
                    onClick={() => handleSetMainImage(image.id)}
                    type="button"
                  >
                    {image.is_main
                      ? "Imatge principal"
                      : mainPending
                        ? "Actualitzant..."
                        : "Fer principal"}
                  </button>
                  <button
                    className="inline-flex h-12 items-center justify-center rounded-md border border-red-200 bg-red-50 px-2 text-xs font-semibold leading-tight text-red-700 shadow-sm transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={deletePending}
                    onClick={() => handleDeleteImage(image.id)}
                    type="button"
                  >
                    {deletePending ? "Eliminant..." : "Eliminar imatge"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {actionMessage ? (
        <p
          aria-live="polite"
          className={`mt-5 rounded-md border px-4 py-3 text-sm font-medium ${
            actionMessage.status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {actionMessage.message}
        </p>
      ) : null}
    </section>
  );
}

function validateImageFiles(files: File[]): string | null {
  if (files.length === 0) {
    return "Selecciona almenys una imatge per pujar.";
  }

  if (files.some((file) => !acceptedImageTypes.has(file.type))) {
    return "Només pots pujar imatges PNG, JPEG o WebP.";
  }

  const totalSize = files.reduce((size, file) => size + file.size, 0);

  if (totalSize > maxImageUploadBytes) {
    return `La selecció d'imatges no pot superar els ${maxImageUploadMb} MB. Redueix la mida o tria menys imatges.`;
  }

  return null;
}
