import type { ReactNode } from "react";

type DashboardShellProps = {
  children: ReactNode;
};

const navigationItems = ["Inventari", "Temporades", "Estat", "Ubicacions"];

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-red-700">
              FC Barcelona
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-950">
              Arxiu de Samarretes
            </p>
          </div>

          <nav aria-label="Navegació principal">
            <ul className="flex flex-wrap gap-2">
              {navigationItems.map((item) => (
                <li key={item}>
                  <a
                    className="inline-flex rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
                    href="#"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-6 sm:px-8 lg:py-8">
        {children}
      </div>
    </main>
  );
}
