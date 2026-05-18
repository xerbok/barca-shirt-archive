import { connection } from "next/server";
import Link from "next/link";
import { EditShirtForm } from "@/components/edit-shirt-form";
import { getShirtById } from "@/lib/shirts";

type EditShirtPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditShirtPage({ params }: EditShirtPageProps) {
  await connection();

  const { id } = await params;

  let shirt = null;

  try {
    shirt = await getShirtById(id);
  } catch {
    return (
      <EditMessage message="No s'ha pogut carregar la samarreta per editar-la. Torna-ho a provar més tard." />
    );
  }

  if (!shirt) {
    return (
      <EditMessage message="No s'ha trobat cap samarreta amb aquest identificador." />
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-6 sm:px-8 lg:py-8">
        <header className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <Link
            className="text-sm font-semibold text-blue-800 transition hover:text-blue-950"
            href={`/samarretes/${shirt.id}`}
          >
            Tornar al detall
          </Link>
          <p className="mt-5 text-sm font-semibold uppercase text-red-700">
            Edició de la fitxa
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
            Editar samarreta
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Actualitza les dades principals de la peça. Les imatges i
            l&apos;eliminació real es gestionaran més endavant.
          </p>
        </header>

        <EditShirtForm shirt={shirt} />
      </div>
    </main>
  );
}

function EditMessage({ message }: { message: string }) {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-6 sm:px-8 lg:py-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-950">
            Edició no disponible
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{message}</p>
          <Link
            className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900"
            href="/"
          >
            Tornar a l&apos;arxiu
          </Link>
        </section>
      </div>
    </main>
  );
}
