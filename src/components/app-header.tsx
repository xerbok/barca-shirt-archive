import Link from "next/link";

export function AppHeader() {
  return (
    <header className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div>
        <p className="text-sm font-semibold uppercase text-red-700">
          Col·lecció blaugrana
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
          Arxiu de Samarretes del Barça
        </h1>
      </div>

      <Link
        className="inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900"
        href="/samarretes/nova"
      >
        Afegir samarreta
      </Link>
    </header>
  );
}
