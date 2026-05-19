"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  deleteShirtImage,
  getShirtById,
  isAllowedShirtImageType,
  setMainShirtImage,
  updateShirt,
  uploadShirtImages,
} from "@/lib/shirts";
import type { UpdateShirtInput } from "@/types/database";

type EditShirtFormState = {
  message: string;
};

export type EditShirtImagesActionResult = {
  message: string;
  status: "error" | "success";
};

export async function updateShirtAction(
  id: string,
  _previousState: EditShirtFormState,
  formData: FormData,
): Promise<EditShirtFormState> {
  const season = getRequiredText(formData, "season");
  const shirtType = getRequiredText(formData, "shirt_type");

  if (!season || !shirtType) {
    return {
      message:
        "La temporada i el tipus de samarreta són obligatoris per desar els canvis.",
    };
  }

  const input: UpdateShirtInput = {
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

  try {
    await updateShirt(id, input);
  } catch {
    return {
      message:
        "No s'han pogut desar els canvis. Revisa les dades i torna-ho a provar.",
    };
  }

  revalidatePath("/");
  revalidatePath(`/samarretes/${id}`);
  redirect(`/samarretes/${id}`);
}

export async function uploadAdditionalShirtImagesAction(
  shirtId: string,
  formData: FormData,
): Promise<EditShirtImagesActionResult> {
  const imageFiles = getImageFiles(formData, "images");

  if (imageFiles.length === 0) {
    return {
      message: "Selecciona almenys una imatge per pujar.",
      status: "error",
    };
  }

  if (imageFiles.some((file) => !isAllowedShirtImageType(file.type))) {
    return {
      message: "Només pots pujar imatges PNG, JPEG o WebP.",
      status: "error",
    };
  }

  try {
    const shirt = await getShirtById(shirtId);

    if (!shirt) {
      return {
        message: "No s'ha trobat la samarreta per afegir-hi imatges.",
        status: "error",
      };
    }

    const firstImageIsMain =
      shirt.images.length === 0 ||
      !shirt.images.some((image) => image.is_main === true);

    await uploadShirtImages(shirtId, imageFiles, { firstImageIsMain });
  } catch (error) {
    return {
      message: getImageActionErrorMessage(
        error,
        "No s'han pogut pujar les imatges. Torna-ho a provar.",
      ),
      status: "error",
    };
  }

  revalidateShirtPages(shirtId);

  return {
    message: "Les imatges s'han pujat correctament.",
    status: "success",
  };
}

export async function deleteShirtImageAction(
  shirtId: string,
  imageId: string,
): Promise<EditShirtImagesActionResult> {
  try {
    await deleteShirtImage(shirtId, imageId);
  } catch (error) {
    return {
      message: getImageActionErrorMessage(
        error,
        "No s'ha pogut eliminar la imatge. Torna-ho a provar.",
      ),
      status: "error",
    };
  }

  revalidateShirtPages(shirtId);

  return {
    message: "La imatge s'ha eliminat correctament.",
    status: "success",
  };
}

export async function setMainShirtImageAction(
  shirtId: string,
  imageId: string,
): Promise<EditShirtImagesActionResult> {
  try {
    await setMainShirtImage(shirtId, imageId);
  } catch (error) {
    return {
      message: getImageActionErrorMessage(
        error,
        "No s'ha pogut marcar la imatge com a principal. Torna-ho a provar.",
      ),
      status: "error",
    };
  }

  revalidateShirtPages(shirtId);

  return {
    message: "La imatge principal s'ha actualitzat correctament.",
    status: "success",
  };
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

function getImageActionErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
  return error instanceof Error ? error.message : fallbackMessage;
}

function revalidateShirtPages(shirtId: string): void {
  revalidatePath("/");
  revalidatePath(`/samarretes/${shirtId}`);
  revalidatePath(`/samarretes/${shirtId}/editar`);
}
