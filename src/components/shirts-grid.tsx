import { ShirtCard } from "@/components/shirt-card";
import type { ShirtWithMainImage } from "@/types/database";

type ShirtsGridProps = {
  emptyMessage?: string;
  errorMessage?: string | null;
  resultCount?: number;
  shirts: ShirtWithMainImage[];
};

export function ShirtsGrid({
  emptyMessage = "Encara no has afegit cap samarreta.",
  errorMessage,
  resultCount,
  shirts,
}: ShirtsGridProps) {
  const displayedResultCount = resultCount ?? shirts.length;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-950">
          Samarretes registrades
        </h2>
        <p className="text-sm font-medium text-slate-600">
          {displayedResultCount}{" "}
          {displayedResultCount === 1 ? "peça" : "peces"}
        </p>
      </div>

      {errorMessage ? (
        <StatusPanel message={errorMessage} tone="error" />
      ) : shirts.length === 0 ? (
        <StatusPanel message={emptyMessage} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {shirts.map((shirt) => (
            <ShirtCard key={shirt.id} shirt={shirt} />
          ))}
        </div>
      )}
    </section>
  );
}

function StatusPanel({
  message,
  tone = "empty",
}: {
  message: string;
  tone?: "empty" | "error";
}) {
  const toneClasses =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-800"
      : "border-slate-200 bg-white text-slate-700";

  return (
    <div className={`rounded-lg border p-8 text-center shadow-sm ${toneClasses}`}>
      <p className="text-base font-medium">{message}</p>
    </div>
  );
}
