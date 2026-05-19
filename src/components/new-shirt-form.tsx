"use client";

import Link from "next/link";
import { type FormEvent, useActionState, useState } from "react";
import { createShirtAction } from "@/app/samarretes/nova/actions";

const initialCreateShirtFormState = {
  message: "",
};

const MAX_IMAGE_UPLOAD_BYTES = 45 * 1024 * 1024;
const MAX_IMAGE_UPLOAD_MB = 45;

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
  const [clientMessage, setClientMessage] = useState("");
  const [state, formAction, pending] = useActionState(
    createShirtAction,
    initialCreateShirtFormState,
  );
  const errorMessage = clientMessage || state.message;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const input = event.currentTarget.elements.namedItem("images");

    if (!(input instanceof HTMLInputElement) || !input.files) {
      setClientMessage("");
      return;
    }

    const totalSize = Array.from(input.files).reduce(
      (size, file) => size + file.size,
      0,
    );

    if (totalSize > MAX_IMAGE_UPLOAD_BYTES) {
      event.preventDefault();
      setClientMessage(
        `La selecció d'imatges no pot superar els ${MAX_IMAGE_UPLOAD_MB} MB. Redueix la mida o tria menys imatges.`,
      );
      return;
    }

    setClientMessage("");
  }

  return (
    <form
      action={formAction}
      className="rounded-lg border border-[#01176a]/15 bg-white p-5 shadow-sm sm:p-6"
      onSubmit={handleSubmit}
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
        Imatges de la samarreta
        <input
          accept="image/png,image/jpeg,image/webp"
          className="rounded-md border border-dashed border-[#01176a]/25 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition file:mr-4 file:rounded-md file:border-0 file:bg-[#01176a] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-[#c30044]/40 focus:border-[#01176a] focus:bg-white focus:ring-4 focus:ring-[#01176a]/15 disabled:cursor-not-allowed disabled:bg-slate-100"
          disabled={pending}
          multiple
          name="images"
          type="file"
        />
        <span className="text-xs font-normal text-slate-500">
          Pots seleccionar més d&apos;una imatge. Formats acceptats: PNG, JPEG o
          WebP. Mida màxima total: {MAX_IMAGE_UPLOAD_MB} MB.
        </span>
      </label>

      <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-slate-700">
        Notes
        <textarea
          className="min-h-32 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#01176a] focus:bg-white focus:ring-4 focus:ring-[#01176a]/15"
          name="notes"
          placeholder="Detalls de conservació, compra o història de la peça"
        />
      </label>

      {errorMessage ? (
        <p
          aria-live="polite"
          className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          className="inline-flex h-11 items-center justify-center rounded-md border border-[#01176a]/20 bg-white px-4 text-sm font-semibold text-[#01176a] shadow-sm transition hover:border-[#c30044]/30 hover:bg-[#c30044]/5"
          href="/"
        >
          Cancel·lar
        </Link>
        <button
          className="inline-flex h-11 items-center justify-center rounded-md bg-[#01176a] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c30044] focus:outline-none focus:ring-4 focus:ring-[#c30044]/20 disabled:cursor-not-allowed disabled:bg-[#01176a]/35"
          disabled={pending}
          type="submit"
        >
          {pending ? "Creant i pujant imatges..." : "Desar samarreta"}
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
        className="h-11 rounded-md border border-slate-200 bg-slate-50 px-3 text-base text-slate-950 outline-none transition focus:border-[#01176a] focus:bg-white focus:ring-4 focus:ring-[#01176a]/15"
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
        className="h-11 rounded-md border border-slate-200 bg-slate-50 px-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#01176a] focus:bg-white focus:ring-4 focus:ring-[#01176a]/15"
        name={name}
        placeholder={placeholder}
        required={required}
        step={step}
        type={type}
      />
    </label>
  );
}
