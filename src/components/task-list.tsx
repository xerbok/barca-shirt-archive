import type { CollectionTask } from "@/types/shirt";

type TaskListProps = {
  tasks: CollectionTask[];
};

export function TaskList({ tasks }: TaskListProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-950">Properes accions</h2>
        <p className="mt-1 text-sm text-slate-600">
          Tasques habituals per tenir la col·lecció controlada.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {tasks.map((task) => (
          <article
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            key={task.title}
          >
            <p className="text-sm font-semibold text-slate-950">{task.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {task.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
