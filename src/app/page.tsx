import { connection } from "next/server";
import { AppHeader } from "@/components/app-header";
import { ShirtFilters } from "@/components/shirt-filters";
import { ShirtsGrid } from "@/components/shirts-grid";
import { getShirts } from "@/lib/shirts";
import type { Shirt } from "@/types/database";

export default async function Home() {
  await connection();

  let shirts: Shirt[] = [];
  let errorMessage: string | null = null;

  try {
    shirts = await getShirts();
  } catch {
    errorMessage =
      "No s'han pogut carregar les samarretes. Revisa la connexió amb Supabase i torna-ho a provar.";
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-6 sm:px-8 lg:py-8">
        <AppHeader />
        <ShirtFilters />
        <ShirtsGrid errorMessage={errorMessage} shirts={shirts} />
      </div>
    </main>
  );
}
