import Link from "next/link";
import { NewShirtForm } from "@/components/new-shirt-form";

export default function NewShirtPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-6 sm:px-8 lg:py-8">
        <header className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <Link
            className="text-sm font-semibold text-blue-800 transition hover:text-blue-950"
            href="/"
          >
            Tornar a l&apos;arxiu
          </Link>
          <p className="mt-5 text-sm font-semibold uppercase text-red-700">
            Nova fitxa
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
            Afegir samarreta
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Registra les dades principals de la peça i afegeix una o més
            imatges de la samarreta.
          </p>
        </header>

        <NewShirtForm />
      </div>
    </main>
  );
}
