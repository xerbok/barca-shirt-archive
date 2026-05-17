import type { CollectionStat } from "@/types/shirt";

type CollectionStatsProps = {
  stats: CollectionStat[];
};

export function CollectionStats({ stats }: CollectionStatsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          key={stat.label}
        >
          <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">
            {stat.value}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{stat.detail}</p>
        </article>
      ))}
    </section>
  );
}
