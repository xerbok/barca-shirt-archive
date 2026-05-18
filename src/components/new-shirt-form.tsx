"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createShirtAction } from "@/app/samarretes/nova/actions";

const initialCreateShirtFormState = {
  message: "",
};

const mainTextFields = [
  {
    label: "Temporada",
    name: "season",
    placeholder: "2024/25",
    required: true,
  },
  {
    label: "Competició",
    name: "competition",
    placeholder: "Lliga",
  },
];

const detailTextFields = [
  {
    label: "Marca",
    name: "brand",
    placeholder: "Nike",
  },
  {
    label: "Jugador",
    name: "player_name",
    placeholder: "Nom del jugador",
  },
  {
    label: "Talla",
    name: "size",
    placeholder: "M",
  },
  {
    label: "Lloc de compra",
    name: "purchase_place",
    placeholder: "Botiga del club",
  },
];

export function NewShirtForm() {
  const [state, formAction, pending] = useActionState(
    createShirtAction,
    initialCreateShirtFormState,
  );

  return (
    <form
      action={formAction}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {mainTextFields.map((field) => (
          <FormField
            key={field.name}
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
          />
        ))}

        <SelectField
          label="Tipus de samarreta"
          name="shirt_type"
          options={[
            "Primera equipació",
            "Segona equipació",
            "Tercera equipació",
            "Quarta equipació",
            "Entrenament",
          ]}
          placeholder="Selecciona el tipus"
          required
        />
        <SelectField
          label="Tipus de teixit"
          name="fabric_type"
          options={["Rèplica", "Jugador"]}
          placeholder="Selecciona rèplica o jugador"
        />
        <SelectField
          label="Estat"
          name="condition"
          options={[
            "Nova",
            "Excel·lent",
            "Molt bona",
            "Bona",
            "Acceptable",
            "Revisar",
            "Malmesa",
          ]}
          placeholder="Selecciona l'estat"
        />
        <SelectField
          label="Autenticitat"
          name="authenticity"
          options={["Oficial", "No oficial"]}
          placeholder="Selecciona autenticitat"
        />
        {detailTextFields.map((field) => (
          <FormField
            key={field.name}
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
          />
        ))}
        <FormField label="Dorsal" name="number" placeholder="10" type="number" />
        <FormField
          label="Preu de compra"
          name="purchase_price"
          placeholder="89"
          step="0.01"
          type="number"
        />
        <FormField
          label="Data de compra"
          name="purchase_date"
          type="date"
        />
      </div>

      <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-slate-700">
        Notes
        <textarea
          className="min-h-32 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
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
          href="/"
        >
          Cancel·lar
        </Link>
        <button
          className="inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-blue-300"
          disabled={pending}
          type="submit"
        >
          {pending ? "Desant..." : "Desar samarreta"}
        </button>
      </div>
    </form>
  );
}

function SelectField({
  label,
  name,
  options,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      {label}
      <select
        className="h-11 rounded-md border border-slate-200 bg-slate-50 px-3 text-base text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        name={name}
        required={required}
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

function FormField({
  label,
  name,
  placeholder,
  required = false,
  step,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  step?: string;
  type?: "date" | "number" | "text";
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      {label}
      <input
        className="h-11 rounded-md border border-slate-200 bg-slate-50 px-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        name={name}
        placeholder={placeholder}
        required={required}
        step={step}
        type={type}
      />
    </label>
  );
}
