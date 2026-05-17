import { ShirtCard } from "@/components/shirt-card";
import type { Shirt } from "@/types/database";

type ShirtsGridProps = {
  shirts: Shirt[];
};

export function ShirtsGrid({ shirts }: ShirtsGridProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-950">
          Samarretes registrades
        </h2>
        <p className="text-sm font-medium text-slate-600">
          {shirts.length} peces
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {shirts.map((shirt) => (
          <ShirtCard key={shirt.id} shirt={shirt} />
        ))}
      </div>
    </section>
  );
}
