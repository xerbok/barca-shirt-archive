"use client";

import type {
  ShirtFilterState,
  ShirtSortOption,
} from "@/components/shirt-archive-browser";

type ShirtFiltersProps = {
  filters: ShirtFilterState;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onFilterChange: (name: keyof ShirtFilterState, value: string) => void;
  onQueryChange: (value: string) => void;
  onSortChange: (value: ShirtSortOption) => void;
  options: {
    authenticity: string[];
    brand: string[];
    condition: string[];
    fabricType: string[];
    season: string[];
    shirtType: string[];
    size: string[];
  };
  query: string;
  resultCount: number;
  sortOption: ShirtSortOption;
};

const filterFields: Array<{
  label: string;
  name: keyof ShirtFilterState;
  placeholder: string;
}> = [
  {
    label: "Temporada",
    name: "season",
    placeholder: "Totes",
  },
  {
    label: "Tipus de samarreta",
    name: "shirtType",
    placeholder: "Tots",
  },
  {
    label: "Tipus de teixit",
    name: "fabricType",
    placeholder: "Tots",
  },
  {
    label: "Talla",
    name: "size",
    placeholder: "Totes",
  },
  {
    label: "Estat",
    name: "condition",
    placeholder: "Tots",
  },
  {
    label: "Autenticitat",
    name: "authenticity",
    placeholder: "Totes",
  },
  {
    label: "Marca",
    name: "brand",
    placeholder: "Totes",
  },
];

const sortOptions: Array<{
  label: string;
  value: ShirtSortOption;
}> = [
  {
    label: "Data de creació: més recents primer",
    value: "created_at_desc",
  },
  {
    label: "Data de creació: més antigues primer",
    value: "created_at_asc",
  },
  {
    label: "Temporada",
    value: "season",
  },
  {
    label: "Jugador",
    value: "player_name",
  },
  {
    label: "Preu de compra: més alt primer",
    value: "purchase_price_desc",
  },
  {
    label: "Preu de compra: més baix primer",
    value: "purchase_price_asc",
  },
];

export function ShirtFilters({
  filters,
  hasActiveFilters,
  onClearFilters,
  onFilterChange,
  onQueryChange,
  onSortChange,
  options,
  query,
  resultCount,
  sortOption,
}: ShirtFiltersProps) {
  return (
    <section className="relative overflow-hidden rounded-lg border border-[#01176a]/15 bg-white p-4 pt-5 shadow-sm sm:p-5 sm:pt-6">
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#01176a_0_50%,#c30044_50%_100%)]" />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#01176a]">Filtres</h2>
          <p className="mt-0.5 text-xs text-slate-600">
            Cerca, filtra i ordena les samarretes de la col·lecció.
          </p>
        </div>
        <p className="text-sm font-semibold text-[#c30044]">
          {resultCount} {resultCount === 1 ? "resultat" : "resultats"}
        </p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Cerca
          <input
            className="h-10 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#01176a] focus:bg-white focus:ring-4 focus:ring-[#01176a]/15"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Temporada, jugador, dorsal, marca..."
            type="search"
            value={query}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Ordenació
          <select
            className="h-10 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-[#01176a] focus:bg-white focus:ring-4 focus:ring-[#01176a]/15"
            onChange={(event) =>
              onSortChange(event.target.value as ShirtSortOption)
            }
            value={sortOption}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filterFields.map((field) => (
          <SelectFilter
            key={field.name}
            label={field.label}
            onChange={(value) => onFilterChange(field.name, value)}
            options={options[field.name]}
            placeholder={field.placeholder}
            value={filters[field.name]}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className="inline-flex h-9 items-center justify-center rounded-md border border-[#01176a]/20 bg-white px-3 text-sm font-semibold text-[#01176a] shadow-sm transition hover:border-[#c30044]/30 hover:bg-[#c30044]/5 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!hasActiveFilters && sortOption === "created_at_desc"}
          onClick={onClearFilters}
          type="button"
        >
          Netejar filtres
        </button>
      </div>
    </section>
  );
}

function SelectFilter({
  label,
  onChange,
  options,
  placeholder,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  value: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-700">
      {label}
      <select
        className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-[#01176a] focus:bg-white focus:ring-4 focus:ring-[#01176a]/15"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
