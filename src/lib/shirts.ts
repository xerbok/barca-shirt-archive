import { supabase } from "@/lib/supabase/client";
import type { CreateShirtInput, Shirt } from "@/types/database";

export async function getShirts(): Promise<Shirt[]> {
  const { data, error } = await supabase
    .from("shirts")
    .select(
      "id, season, competition, shirt_type, brand, player_name, number, size, condition, authenticity, purchase_price, purchase_date, purchase_place, notes, created_at, updated_at",
    )
    .order("created_at", { ascending: false })
    .returns<Shirt[]>();

  if (error) {
    throw new Error("No s'han pogut obtenir les samarretes de Supabase.");
  }

  return data ?? [];
}

export async function createShirt(input: CreateShirtInput): Promise<void> {
  const { error } = await supabase.from("shirts").insert(input);

  if (error) {
    throw new Error("No s'ha pogut crear la samarreta a Supabase.");
  }
}
