import type { Shirt } from "@/types/shirt";

type ShirtTableProps = {
  shirts: Shirt[];
};

export function ShirtTable({ shirts }: ShirtTableProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-950">
          Samarretes destacades
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Primeres peces de mostra per definir el model d’inventari.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-3 font-semibold">Temporada</th>
              <th className="px-5 py-3 font-semibold">Tipus</th>
              <th className="px-5 py-3 font-semibold">Dorsal</th>
              <th className="px-5 py-3 font-semibold">Estat</th>
              <th className="px-5 py-3 font-semibold">Ubicació</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shirts.map((shirt) => (
              <tr key={shirt.id} className="text-slate-700">
                <td className="px-5 py-4 font-medium text-slate-950">
                  {shirt.season}
                </td>
                <td className="px-5 py-4">{shirt.kind}</td>
                <td className="px-5 py-4">{shirt.number}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {shirt.condition}
                  </span>
                </td>
                <td className="px-5 py-4">{shirt.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
