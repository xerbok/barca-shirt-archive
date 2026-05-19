import Link from "next/link";

export function AppHeader() {
  return (
    <header className="relative flex flex-col gap-4 overflow-hidden rounded-lg border border-[#01176a]/15 bg-white p-5 pt-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6 sm:pt-7">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#01176a_0_50%,#c30044_50%_100%)]" />
      <div>
        <p className="text-sm font-semibold uppercase text-[#c30044]">
          Col·lecció blaugrana
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[#01176a] sm:text-4xl">
          Arxiu de Samarretes del Barça
        </h1>
      </div>

      <Link
        className="inline-flex h-11 items-center justify-center rounded-md bg-[#01176a] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c30044] focus:outline-none focus:ring-4 focus:ring-[#c30044]/20"
        href="/samarretes/nova"
      >
        Afegir samarreta
      </Link>
    </header>
  );
}
