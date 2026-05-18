import type { Shirt } from "@/types/database";

type ShirtCardProps = {
  shirt: Shirt;
};

export function ShirtCard({ shirt }: ShirtCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        aria-label="Imatge placeholder de la samarreta"
        className="relative aspect-[4/3] overflow-hidden bg-slate-900"
        role="img"
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b3b82_0_34%,#991b1b_34%_66%,#0b3b82_66%_100%)]" />
        <div className="absolute inset-x-8 top-8 h-24 rounded-b-full border-x-8 border-b-8 border-white/25" />
        <div className="absolute bottom-4 left-4 rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-slate-950">
          Imatge pendent
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <p className="text-sm font-semibold text-blue-700">{shirt.season}</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">
            {shirt.shirt_type}
          </h2>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm">
          <InfoItem label="Jugador" value={shirt.player_name ?? "Sense nom"} />
          <InfoItem
            label="Dorsal"
            value={shirt.number === null ? "Sense dorsal" : String(shirt.number)}
          />
          <InfoItem label="Talla" value={shirt.size ?? "Sense talla"} />
          <InfoItem label="Estat" value={shirt.condition ?? "Sense estat"} />
          <InfoItem label="Marca" value={shirt.brand ?? "Sense marca"} />
          <InfoItem
            label="Autenticitat"
            value={shirt.authenticity ?? "Sense autenticitat"}
          />
        </dl>
      </div>
    </article>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase text-slate-500">{label}</dt>
      <dd className="mt-1 font-medium text-slate-900">{value}</dd>
    </div>
  );
}
