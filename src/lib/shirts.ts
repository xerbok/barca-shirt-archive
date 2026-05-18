import { supabase } from "@/lib/supabase/client";
import type { CreateShirtInput, Shirt, UpdateShirtInput } from "@/types/database";

export async function getShirts(): Promise<Shirt[]> {
  const { data, error } = await supabase
    .from("shirts")
    .select(
      "id, season, competition, shirt_type, fabric_type:shirt_fit, brand, player_name, number, size, condition, authenticity, purchase_price, purchase_date, purchase_place, notes, created_at, updated_at",
    )
    .order("created_at", { ascending: false })
    .returns<Shirt[]>();

  if (error) {
    throw new Error("No s'han pogut obtenir les samarretes de Supabase.");
  }

  return data ?? [];
}

export async function getShirtById(id: string): Promise<Shirt | null> {
  const { data, error } = await supabase
    .from("shirts")
    .select(
      "id, season, competition, shirt_type, fabric_type:shirt_fit, brand, player_name, number, size, condition, authenticity, purchase_price, purchase_date, purchase_place, notes, created_at, updated_at",
    )
    .eq("id", id)
    .maybeSingle()
    .returns<Shirt | null>();

  if (error) {
    throw new Error("No s'ha pogut obtenir la samarreta de Supabase.");
  }

  return data;
}

export async function createShirt(input: CreateShirtInput): Promise<void> {
  const { fabric_type: fabricType, ...shirtInput } = input;
  const { error } = await supabase.from("shirts").insert({
    ...shirtInput,
    shirt_fit: fabricType,
  });

  if (error) {
    throw new Error("No s'ha pogut crear la samarreta a Supabase.");
  }
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
