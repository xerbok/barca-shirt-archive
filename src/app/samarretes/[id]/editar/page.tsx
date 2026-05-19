import { connection } from "next/server";
import Link from "next/link";
import { EditShirtForm } from "@/components/edit-shirt-form";
import { EditShirtImagesManager } from "@/components/edit-shirt-images-manager";
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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-6 sm:px-8 lg:py-8">
        <header className="relative overflow-hidden rounded-lg border border-[#01176a]/15 bg-white p-5 pt-6 shadow-sm sm:p-6 sm:pt-7">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#01176a_0_50%,#c30044_50%_100%)]" />
          <Link
            className="text-sm font-semibold text-[#01176a] transition hover:text-[#c30044]"
            href={`/samarretes/${shirt.id}`}
          >
            Tornar al detall
          </Link>
          <p className="mt-5 text-sm font-semibold uppercase text-[#c30044]">
            Edició de la fitxa
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#01176a] sm:text-4xl">
            Editar samarreta
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Actualitza les dades principals de la peça i gestiona les imatges
            associades a aquesta samarreta.
          </p>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
          <EditShirtForm shirt={shirt} />
          <EditShirtImagesManager images={shirt.images} shirtId={shirt.id} />
        </div>
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
            className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-[#01176a] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c30044] focus:outline-none focus:ring-4 focus:ring-[#c30044]/20"
            href="/"
          >
            Tornar a l&apos;arxiu
          </Link>
        </section>
      </div>
    </main>
  );
}
