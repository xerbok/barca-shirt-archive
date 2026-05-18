"use client";

import Link from "next/link";
import { useActionState } from "react";
import { updateShirtAction } from "@/app/samarretes/[id]/editar/actions";
import type { Shirt } from "@/types/database";

type EditShirtFormProps = {
  shirt: Shirt;
};

const initialEditShirtFormState = {
  message: "",
};

const shirtTypeOptions = [
  "Primera equipació",
  "Segona equipació",
  "Tercera equipació",
  "Quarta equipació",
  "Entrenament",
];

const fabricTypeOptions = ["Rèplica", "Jugador"];

const conditionOptions = [
  "Nova",
  "Excel·lent",
  "Molt bona",
  "Bona",
  "Acceptable",
  "Revisar",
  "Malmesa",
];

const authenticityOptions = ["Oficial", "No oficial"];

export function EditShirtForm({ shirt }: EditShirtFormProps) {
  const updateShirtWithId = updateShirtAction.bind(null, shirt.id);
  const [state, formAction, pending] = useActionState(
    updateShirtWithId,
    initialEditShirtFormState,
  );

  return (
    <form
      action={formAction}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          defaultValue={shirt.season}
          label="Temporada"
          name="season"
          required
        />
        <FormField
          defaultValue={shirt.competition}
          label="Competició"
          name="competition"
        />
        <SelectField
          defaultValue={shirt.shirt_type}
          label="Tipus de samarreta"
          name="shirt_type"
          options={shirtTypeOptions}
          placeholder="Selecciona el tipus"
          required
        />
        <SelectField
          defaultValue={shirt.fabric_type}
          label="Tipus de teixit"
          name="fabric_type"
          options={fabricTypeOptions}
          placeholder="Selecciona rèplica o jugador"
        />
        <SelectField
          defaultValue={shirt.condition}
          label="Estat"
          name="condition"
          options={conditionOptions}
          placeholder="Selecciona l'estat"
        />
        <SelectField
          defaultValue={shirt.authenticity}
          label="Autenticitat"
          name="authenticity"
          options={authenticityOptions}
          placeholder="Selecciona autenticitat"
        />
        <FormField defaultValue={shirt.brand} label="Marca" name="brand" />
        <FormField
          defaultValue={shirt.player_name}
          label="Jugador"
          name="player_name"
        />
        <FormField defaultValue={shirt.size} label="Talla" name="size" />
        <FormField
          defaultValue={shirt.purchase_place}
          label="Lloc de compra"
          name="purchase_place"
        />
        <FormField
          defaultValue={shirt.number === null ? null : String(shirt.number)}
          label="Dorsal"
          name="number"
          type="number"
        />
        <FormField
          defaultValue={
            shirt.purchase_price === null ? null : String(shirt.purchase_price)
          }
          label="Preu de compra"
          name="purchase_price"
          step="0.01"
          type="number"
        />
        <FormField
          defaultValue={shirt.purchase_date}
          label="Data de compra"
          name="purchase_date"
          type="date"
        />
      </div>

      <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-slate-700">
        Notes
        <textarea
          className="min-h-32 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          defaultValue={shirt.notes ?? ""}
          name="notes"
          placeholder="Detalls de conservació, compra o història de la peça"
        />
      </label>

      {state.message ? (
        <p
          aria-live="polite"
          className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
        >
          {state.message}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          className="inline-flex h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          href={`/samarretes/${shirt.id}`}
        >
          Cancel·lar
        </Link>
        <button
          className="inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-blue-300"
          disabled={pending}
          type="submit"
        >
          {pending ? "Desant..." : "Desar canvis"}
        </button>
      </div>
    </form>
  );
}

function SelectField({
  defaultValue,
  label,
  name,
  options,
  placeholder,
  required = false,
}: {
  defaultValue: string | null;
  label: string;
  name: string;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  const normalizedValue = defaultValue ?? "";
  const optionSet = new Set(options);
  const optionsWithCurrent =
    normalizedValue && !optionSet.has(normalizedValue)
      ? [normalizedValue, ...options]
      : options;

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      {label}
      <select
        className="h-11 rounded-md border border-slate-200 bg-slate-50 px-3 text-base text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        defaultValue={normalizedValue}
        name={name}
        required={required}
      >
        <option value="">{placeholder}</option>
        {optionsWithCurrent.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function FormField({
  defaultValue,
  label,
  name,
  required = false,
  step,
  type = "text",
}: {
  defaultValue: string | null;
  label: string;
  name: string;
  required?: boolean;
  step?: string;
  type?: "date" | "number" | "text";
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      {label}
      <input
        className="h-11 rounded-md border border-slate-200 bg-slate-50 px-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        defaultValue={defaultValue ?? ""}
        name={name}
        required={required}
        step={step}
        type={type}
      />
    </label>
  );
}
