import { AppHeader } from "@/components/app-header";
import { ShirtFilters } from "@/components/shirt-filters";
import { ShirtsGrid } from "@/components/shirts-grid";
import { mockShirts } from "@/lib/sample-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-6 sm:px-8 lg:py-8">
        <AppHeader />
        <ShirtFilters />
        <ShirtsGrid shirts={mockShirts} />
      </div>
    </main>
  );
}
