"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createShirt,
  deleteShirt,
  isAllowedShirtImageType,
  uploadShirtImages,
} from "@/lib/shirts";
import type { CreateShirtInput, Shirt } from "@/types/database";

type CreateShirtFormState = {
  message: string;
};

export async function createShirtAction(
  _previousState: CreateShirtFormState,
  formData: FormData,
): Promise<CreateShirtFormState> {
  const season = getRequiredText(formData, "season");
  const shirtType = getRequiredText(formData, "shirt_type");
  const imageFiles = getImageFiles(formData, "images");

  if (!season || !shirtType) {
    return {
      message:
        "La temporada i el tipus de samarreta són obligatoris per crear la fitxa.",
    };
  }

  if (imageFiles.some((file) => !isAllowedShirtImageType(file.type))) {
    return {
      message: "Només pots pujar imatges PNG, JPEG o WebP.",
    };
  }

  const input: CreateShirtInput = {
    season,
    shirt_type: shirtType,
    authenticity: getOptionalText(formData, "authenticity"),
    brand: getOptionalText(formData, "brand"),
    competition: getOptionalText(formData, "competition"),
    condition: getOptionalText(formData, "condition"),
    fabric_type: getOptionalText(formData, "fabric_type"),
    notes: getOptionalText(formData, "notes"),
    number: getOptionalInteger(formData, "number"),
    player_name: getOptionalText(formData, "player_name"),
    purchase_date: getOptionalText(formData, "purchase_date"),
    purchase_place: getOptionalText(formData, "purchase_place"),
    purchase_price: getOptionalNumber(formData, "purchase_price"),
    size: getOptionalText(formData, "size"),
  };

  let createdShirt: Shirt;

  try {
    createdShirt = await createShirt(input);
  } catch {
    return {
      message:
        "No s'ha pogut afegir la samarreta. Revisa les dades i torna-ho a provar.",
    };
  }

  try {
    await uploadShirtImages(createdShirt.id, imageFiles);
  } catch (error) {
    await deleteShirt(createdShirt.id).catch(() => undefined);

    return {
      message: getCreateShirtImagesErrorMessage(error),
    };
  }

  revalidatePath("/");
  redirect("/");
}

function getRequiredText(formData: FormData, name: string): string {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function getOptionalText(formData: FormData, name: string): string | null {
  const value = getRequiredText(formData, name);

  return value.length > 0 ? value : null;
}

function getOptionalInteger(formData: FormData, name: string): number | null {
  const value = getRequiredText(formData, name);

  if (!value) {
    return null;
  }

  const parsedValue = Number.parseInt(value, 10);

  return Number.isNaN(parsedValue) ? null : parsedValue;
}

function getOptionalNumber(formData: FormData, name: string): number | null {
  const value = getRequiredText(formData, name);

  if (!value) {
    return null;
  }

  const parsedValue = Number.parseFloat(value);

  return Number.isNaN(parsedValue) ? null : parsedValue;
}

function getImageFiles(formData: FormData, name: string): File[] {
  return formData
    .getAll(name)
    .filter((value): value is File => value instanceof File && value.size > 0);
}

function getCreateShirtImagesErrorMessage(error: unknown): string {
  const message =
    error instanceof Error
      ? error.message
      : "No s'han pogut pujar les imatges.";

  return `${message} No s'ha creat la samarreta.`;
}
