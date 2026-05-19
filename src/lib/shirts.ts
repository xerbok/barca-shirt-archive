import { supabase } from "@/lib/supabase/client";
import type {
  CreateShirtImageInput,
  CreateShirtInput,
  Shirt,
  ShirtImage,
  ShirtWithImages,
  ShirtWithMainImage,
  UpdateShirtInput,
} from "@/types/database";

const SHIRT_IMAGES_BUCKET = "shirt-images";
const ALLOWED_SHIRT_IMAGE_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
]);

const shirtSelect =
  "id, season, competition, shirt_type, fabric_type:shirt_fit, brand, player_name, number, size, condition, authenticity, purchase_price, purchase_date, purchase_place, notes, created_at, updated_at";

const shirtImageSelect =
  "id, shirt_id, image_url, image_path, image_type, is_main, created_at";

export function isAllowedShirtImageType(type: string): boolean {
  return ALLOWED_SHIRT_IMAGE_TYPES.has(type);
}

export async function getShirts(): Promise<ShirtWithMainImage[]> {
  const { data, error } = await supabase
    .from("shirts")
    .select(shirtSelect)
    .order("created_at", { ascending: false })
    .returns<Shirt[]>();

  if (error) {
    throw new Error("No s'han pogut obtenir les samarretes de Supabase.");
  }

  const shirts = data ?? [];

  if (shirts.length === 0) {
    return [];
  }

  const shirtIds = shirts.map((shirt) => shirt.id);
  const { data: images, error: imagesError } = await supabase
    .from("shirt_images")
    .select(shirtImageSelect)
    .in("shirt_id", shirtIds)
    .eq("is_main", true)
    .order("created_at", { ascending: true })
    .returns<ShirtImage[]>();

  if (imagesError) {
    throw new Error(
      "No s'han pogut obtenir les imatges principals de Supabase.",
    );
  }

  const mainImagesByShirtId = new Map<string, ShirtImage>();

  for (const image of images ?? []) {
    if (image.shirt_id && !mainImagesByShirtId.has(image.shirt_id)) {
      mainImagesByShirtId.set(image.shirt_id, image);
    }
  }

  return shirts.map((shirt) => ({
    ...shirt,
    main_image: mainImagesByShirtId.get(shirt.id) ?? null,
  }));
}

export async function getShirtById(id: string): Promise<ShirtWithImages | null> {
  const { data, error } = await supabase
    .from("shirts")
    .select(shirtSelect)
    .eq("id", id)
    .maybeSingle()
    .returns<Shirt | null>();

  if (error) {
    throw new Error("No s'ha pogut obtenir la samarreta de Supabase.");
  }

  if (!data) {
    return null;
  }

  const { data: images, error: imagesError } = await supabase
    .from("shirt_images")
    .select(shirtImageSelect)
    .eq("shirt_id", id)
    .order("is_main", { ascending: false })
    .order("created_at", { ascending: true })
    .returns<ShirtImage[]>();

  if (imagesError) {
    throw new Error(
      "No s'han pogut obtenir les imatges de la samarreta de Supabase.",
    );
  }

  return {
    ...data,
    images: images ?? [],
  };
}

export async function createShirt(input: CreateShirtInput): Promise<Shirt> {
  const { fabric_type: fabricType, ...shirtInput } = input;
  const { data, error } = await supabase
    .from("shirts")
    .insert({
      ...shirtInput,
      shirt_fit: fabricType,
    })
    .select(shirtSelect)
    .single()
    .returns<Shirt>();

  if (error) {
    throw new Error("No s'ha pogut crear la samarreta a Supabase.");
  }

  return data;
}

export async function updateShirt(
  id: string,
  input: UpdateShirtInput,
): Promise<void> {
  const { fabric_type: fabricType, ...shirtInput } = input;
  const { error } = await supabase
    .from("shirts")
    .update({
      ...shirtInput,
      shirt_fit: fabricType,
    })
    .eq("id", id);

  if (error) {
    throw new Error("No s'ha pogut actualitzar la samarreta a Supabase.");
  }
}

export async function deleteShirt(id: string): Promise<void> {
  const { error } = await supabase.from("shirts").delete().eq("id", id);

  if (error) {
    throw new Error("No s'ha pogut eliminar la samarreta a Supabase.");
  }
}

export async function uploadShirtImages(
  shirtId: string,
  files: File[],
): Promise<void> {
  if (files.length === 0) {
    return;
  }

  const uploadedPaths: string[] = [];

  try {
    const images: CreateShirtImageInput[] = [];

    for (const [index, file] of files.entries()) {
      if (!isAllowedShirtImageType(file.type)) {
        throw new Error("El tipus d'imatge no és vàlid.");
      }

      const imagePath = buildShirtImagePath(shirtId, file.name, index);
      const { error: uploadError } = await supabase.storage
        .from(SHIRT_IMAGES_BUCKET)
        .upload(imagePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(getStorageUploadErrorMessage(uploadError.message));
      }

      uploadedPaths.push(imagePath);

      const { data } = supabase.storage
        .from(SHIRT_IMAGES_BUCKET)
        .getPublicUrl(imagePath);

      images.push({
        shirt_id: shirtId,
        image_url: data.publicUrl,
        image_path: imagePath,
        image_type: file.type,
        is_main: index === 0,
      });
    }

    await createShirtImages(images);
  } catch (error) {
    if (uploadedPaths.length > 0) {
      await supabase.storage.from(SHIRT_IMAGES_BUCKET).remove(uploadedPaths);
    }

    throw error;
  }
}

async function createShirtImages(
  images: CreateShirtImageInput[],
): Promise<void> {
  if (images.length === 0) {
    return;
  }

  const { error } = await supabase.from("shirt_images").insert(images);

  if (error) {
    throw new Error(getShirtImagesInsertErrorMessage(error.message));
  }
}

function getStorageUploadErrorMessage(message: string): string {
  if (message.includes("row-level security")) {
    return "Supabase Storage bloqueja la pujada per les polítiques de seguretat del bucket shirt-images. Aplica les policies de supabase/shirt-images-policies.sql i torna-ho a provar.";
  }

  if (message.toLowerCase().includes("bucket not found")) {
    return "No s'ha trobat el bucket shirt-images a Supabase Storage.";
  }

  return "No s'ha pogut pujar una imatge a Supabase Storage.";
}

function getShirtImagesInsertErrorMessage(message: string): string {
  if (message.includes("row-level security")) {
    return "Supabase bloqueja el registre de les imatges a la taula shirt_images. Aplica les policies de supabase/shirt-images-policies.sql i torna-ho a provar.";
  }

  return "No s'han pogut desar les imatges de la samarreta.";
}

function buildShirtImagePath(
  shirtId: string,
  fileName: string,
  index: number,
): string {
  const timestamp = Date.now();
  const safeFileName = sanitizeFileName(fileName);

  return `shirts/${shirtId}/${timestamp}-${index + 1}-${safeFileName}`;
}

function sanitizeFileName(fileName: string): string {
  const extensionStart = fileName.lastIndexOf(".");
  const baseName =
    extensionStart > 0 ? fileName.slice(0, extensionStart) : fileName;
  const extension =
    extensionStart > 0 ? fileName.slice(extensionStart).toLowerCase() : "";

  const safeBaseName = baseName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  const safeExtension = extension.replace(/[^a-z0-9.]/g, "");

  return `${safeBaseName || "imatge"}${safeExtension}`;
}
