"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createShirt } from "@/lib/shirts";
import type { CreateShirtInput } from "@/types/database";

type CreateShirtFormState = {
  message: string;
};

export async function createShirtAction(
  _previousState: CreateShirtFormState,
  formData: FormData,
): Promise<CreateShirtFormState> {
  const season = getRequiredText(formData, "season");
  const shirtType = getRequiredText(formData, "shirt_type");

  if (!season || !shirtType) {
    return {
      message:
        "La temporada i el tipus de samarreta són obligatoris per crear la fitxa.",
    };
  }

  const input: CreateShirtInput = {
    season,
    shirt_type: shirtType,
    authenticity: getOptionalText(formData, "authenticity"),
    brand: getOptionalText(formData, "brand"),
    competition: getOptionalText(formData, "competition"),
    condition: getOptionalText(formData, "condition"),
    notes: buildNotesWithShirtFit(
      getOptionalText(formData, "notes"),
      getOptionalText(formData, "shirt_fit"),
    ),
    number: getOptionalInteger(formData, "number"),
    player_name: getOptionalText(formData, "player_name"),
    purchase_date: getOptionalText(formData, "purchase_date"),
    purchase_place: getOptionalText(formData, "purchase_place"),
    purchase_price: getOptionalNumber(formData, "purchase_price"),
    size: getOptionalText(formData, "size"),
  };

  try {
    await createShirt(input);
  } catch {
    return {
      message:
        "No s'ha pogut afegir la samarreta. Revisa les dades i torna-ho a provar.",
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

function buildNotesWithShirtFit(
  notes: string | null,
  shirtFit: string | null,
): string | null {
  if (!shirtFit) {
    return notes;
  }

  const shirtFitNote = `Tipus de confecció: ${shirtFit}`;

  return notes ? `${shirtFitNote}\n\n${notes}` : shirtFitNote;
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
