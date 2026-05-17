import { CollectionStats } from "@/components/collection-stats";
import { DashboardShell } from "@/components/dashboard-shell";
import { ShirtTable } from "@/components/shirt-table";
import { TaskList } from "@/components/task-list";
import { featuredShirts, stats, tasks } from "@/lib/sample-data";

export default function Home() {
  return (
    <DashboardShell>
      <section className="grid gap-6 lg:grid-cols-[1.45fr_0.9fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase text-blue-700">
            Col·lecció física
          </p>
          <div className="mt-4 max-w-3xl">
            <h1 className="text-4xl font-semibold text-slate-950 sm:text-5xl">
              Arxiu de Samarretes del Barça
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Un espai per catalogar, revisar i mantenir ordenada una
              col·lecció de samarretes del FC Barcelona, amb dades de temporada,
              estat, ubicació física i detalls pendents.
            </p>
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-8">
          <p className="text-sm font-medium text-blue-200">Vista ràpida</p>
          <p className="mt-4 text-3xl font-semibold">Inventari inicial</p>
          <p className="mt-3 leading-7 text-slate-300">
            Dades locals de mostra preparades per evolucionar cap a formularis,
            filtres i persistència quan el projecte ho demani.
          </p>
        </aside>
      </section>

      <CollectionStats stats={stats} />

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <ShirtTable shirts={featuredShirts} />
        <TaskList tasks={tasks} />
      </section>
    </DashboardShell>
  );
}
