import Link from "next/link";
import { NewShirtForm } from "@/components/new-shirt-form";

export default function NewShirtPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-6 sm:px-8 lg:py-8">
        <header className="relative overflow-hidden rounded-lg border border-[#01176a]/15 bg-white p-5 pt-6 shadow-sm sm:p-6 sm:pt-7">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#01176a_0_50%,#c30044_50%_100%)]" />
          <Link
            className="text-sm font-semibold text-[#01176a] transition hover:text-[#c30044]"
            href="/"
          >
            Tornar a l&apos;arxiu
          </Link>
          <p className="mt-5 text-sm font-semibold uppercase text-[#c30044]">
            Nova fitxa
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#01176a] sm:text-4xl">
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
