"use client";

import { useMemo, useState } from "react";
import { ShirtFilters } from "@/components/shirt-filters";
import { ShirtsGrid } from "@/components/shirts-grid";
import type { ShirtWithMainImage } from "@/types/database";

type ShirtArchiveBrowserProps = {
  errorMessage?: string | null;
  shirts: ShirtWithMainImage[];
};

export type ShirtFilterState = {
  authenticity: string;
  brand: string;
  condition: string;
  fabricType: string;
  season: string;
  shirtType: string;
  size: string;
};

export type ShirtSortOption =
  | "created_at_asc"
  | "created_at_desc"
  | "player_name"
  | "purchase_price_asc"
  | "purchase_price_desc"
  | "season";

const emptyFilters: ShirtFilterState = {
  authenticity: "",
  brand: "",
  condition: "",
  fabricType: "",
  season: "",
  shirtType: "",
  size: "",
};

const searchableFields = [
  "season",
  "competition",
  "shirt_type",
  "fabric_type",
  "brand",
  "player_name",
  "number",
  "size",
  "condition",
  "authenticity",
  "purchase_place",
  "notes",
] as const;

export function ShirtArchiveBrowser({
  errorMessage,
  shirts,
}: ShirtArchiveBrowserProps) {
  const [filters, setFilters] = useState<ShirtFilterState>(emptyFilters);
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] =
    useState<ShirtSortOption>("created_at_desc");

  const filterOptions = useMemo(() => buildFilterOptions(shirts), [shirts]);
  const filteredShirts = useMemo(
    () => sortShirts(filterShirts(shirts, query, filters), sortOption),
    [filters, query, shirts, sortOption],
  );

  const hasActiveFilters = Boolean(
    query.trim() || Object.values(filters).some((value) => value),
  );

  function updateFilter(name: keyof ShirtFilterState, value: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  }

  function clearFilters() {
    setFilters(emptyFilters);
    setQuery("");
    setSortOption("created_at_desc");
  }

  return (
    <>
      <ShirtFilters
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
        onFilterChange={updateFilter}
        onQueryChange={setQuery}
        onSortChange={setSortOption}
        options={filterOptions}
        query={query}
        resultCount={filteredShirts.length}
        sortOption={sortOption}
      />
      <ShirtsGrid
        emptyMessage={
          hasActiveFilters
            ? "No s'ha trobat cap samarreta amb aquests filtres."
            : "Encara no has afegit cap samarreta."
        }
        errorMessage={errorMessage}
        resultCount={filteredShirts.length}
        shirts={filteredShirts}
      />
    </>
  );
}

function buildFilterOptions(shirts: ShirtWithMainImage[]) {
  return {
    authenticity: getUniqueValues(shirts, "authenticity"),
    brand: getUniqueValues(shirts, "brand"),
    condition: getUniqueValues(shirts, "condition"),
    fabricType: getUniqueValues(shirts, "fabric_type"),
    season: getUniqueValues(shirts, "season"),
    shirtType: getUniqueValues(shirts, "shirt_type"),
    size: getUniqueValues(shirts, "size"),
  };
}

function getUniqueValues(
  shirts: ShirtWithMainImage[],
  field: keyof ShirtWithMainImage,
): string[] {
  const values = shirts
    .map((shirt) => shirt[field])
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean);

  return Array.from(new Set(values)).sort((firstValue, secondValue) =>
    firstValue.localeCompare(secondValue, "ca", {
      numeric: true,
      sensitivity: "base",
    }),
  );
}

function filterShirts(
  shirts: ShirtWithMainImage[],
  query: string,
  filters: ShirtFilterState,
): ShirtWithMainImage[] {
  const normalizedQuery = normalizeSearchText(query);

  return shirts.filter((shirt) => {
    if (normalizedQuery && !matchesSearchQuery(shirt, normalizedQuery)) {
      return false;
    }

    return (
      matchesFilter(shirt.season, filters.season) &&
      matchesFilter(shirt.shirt_type, filters.shirtType) &&
      matchesFilter(shirt.fabric_type, filters.fabricType) &&
      matchesFilter(shirt.size, filters.size) &&
      matchesFilter(shirt.condition, filters.condition) &&
      matchesFilter(shirt.authenticity, filters.authenticity) &&
      matchesFilter(shirt.brand, filters.brand)
    );
  });
}

function matchesSearchQuery(
  shirt: ShirtWithMainImage,
  normalizedQuery: string,
): boolean {
  return searchableFields.some((field) => {
    const value = shirt[field];

    return normalizeSearchText(value).includes(normalizedQuery);
  });
}

function matchesFilter(value: string | null, filterValue: string): boolean {
  return !filterValue || value === filterValue;
}

function sortShirts(
  shirts: ShirtWithMainImage[],
  sortOption: ShirtSortOption,
): ShirtWithMainImage[] {
  return [...shirts].sort((firstShirt, secondShirt) => {
    switch (sortOption) {
      case "created_at_asc":
        return compareDate(firstShirt.created_at, secondShirt.created_at, true);
      case "created_at_desc":
        return compareDate(
          firstShirt.created_at,
          secondShirt.created_at,
          false,
        );
      case "player_name":
        return compareText(firstShirt.player_name, secondShirt.player_name);
      case "purchase_price_asc":
        return compareNumber(
          firstShirt.purchase_price,
          secondShirt.purchase_price,
          true,
        );
      case "purchase_price_desc":
        return compareNumber(
          firstShirt.purchase_price,
          secondShirt.purchase_price,
          false,
        );
      case "season":
        return compareText(secondShirt.season, firstShirt.season);
      default:
        return 0;
    }
  });
}

function compareText(firstValue: string | null, secondValue: string | null) {
  const firstText = firstValue?.trim();
  const secondText = secondValue?.trim();

  if (!firstText && !secondText) {
    return 0;
  }

  if (!firstText) {
    return 1;
  }

  if (!secondText) {
    return -1;
  }

  return firstText.localeCompare(secondText, "ca", {
    numeric: true,
    sensitivity: "base",
  });
}

function compareDate(
  firstValue: string | null,
  secondValue: string | null,
  ascending: boolean,
) {
  return compareNumber(
    parseDateForSort(firstValue),
    parseDateForSort(secondValue),
    ascending,
  );
}

function compareNumber(
  firstValue: number | null,
  secondValue: number | null,
  ascending: boolean,
) {
  if (firstValue === null && secondValue === null) {
    return 0;
  }

  if (firstValue === null) {
    return 1;
  }

  if (secondValue === null) {
    return -1;
  }

  return ascending ? firstValue - secondValue : secondValue - firstValue;
}

function parseDateForSort(value: string | null): number | null {
  if (!value) {
    return null;
  }

  const time = new Date(value).getTime();

  return Number.isNaN(time) ? null : time;
}

function normalizeSearchText(value: unknown): string {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
