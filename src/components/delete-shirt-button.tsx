"use client";

import { useActionState } from "react";
import { deleteShirtAction } from "@/app/samarretes/[id]/actions";

type DeleteShirtButtonProps = {
  shirtId: string;
};

const initialDeleteShirtFormState = {
  message: "",
};

export function DeleteShirtButton({ shirtId }: DeleteShirtButtonProps) {
  const deleteShirtWithId = deleteShirtAction.bind(null, shirtId);
  const [state, formAction, pending] = useActionState(
    deleteShirtWithId,
    initialDeleteShirtFormState,
  );

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          "Segur que vols eliminar aquesta samarreta? Aquesta acció no es pot desfer.",
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <button
        className="inline-flex h-11 w-full items-center justify-center rounded-md border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        {pending ? "Eliminant..." : "Eliminar"}
      </button>
      {state.message ? (
        <p
          aria-live="polite"
          className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
