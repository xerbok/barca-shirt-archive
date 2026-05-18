import { createClient } from "@supabase/supabase-js";

function requirePublicEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Falta la variable d'entorn ${name}. Defineix-la abans d'inicialitzar el client de Supabase.`,
    );
  }

  return value;
}

function normalizeSupabaseUrl(value: string): string {
  try {
    const url = new URL(value);
    url.pathname = url.pathname.replace(/\/rest\/v1\/?$/, "");
    url.search = "";
    url.hash = "";

    return url.toString().replace(/\/$/, "");
  } catch {
    throw new Error(
      "La variable d'entorn NEXT_PUBLIC_SUPABASE_URL no és una URL vàlida.",
    );
  }
}

const supabaseUrl = normalizeSupabaseUrl(
  requirePublicEnv(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    "NEXT_PUBLIC_SUPABASE_URL",
  ),
);

const supabaseAnonKey = requirePublicEnv(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
