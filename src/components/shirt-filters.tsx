const filters = [
  {
    label: "Temporada",
    value: "Totes les temporades",
  },
  {
    label: "Jugador",
    value: "Tots els jugadors",
  },
  {
    label: "Tipus",
    value: "Tots els tipus",
  },
  {
    label: "Estat",
    value: "Tots els estats",
  },
];

export function ShirtFilters() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-slate-950">Filtres</h2>
        <p className="text-sm text-slate-600">
          Opcions visuals preparades per a la cerca de la col·lecció.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filters.map((filter) => (
          <div
            className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3"
            key={filter.label}
          >
            <p className="text-xs font-semibold uppercase text-slate-500">
              {filter.label}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {filter.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
