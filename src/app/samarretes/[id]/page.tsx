import { connection } from "next/server";
import Link from "next/link";
import { ShirtDetail } from "@/components/shirt-detail";
import { getShirtById } from "@/lib/shirts";

type ShirtDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ShirtDetailPage({ params }: ShirtDetailPageProps) {
  await connection();

  const { id } = await params;

  let shirt = null;

  try {
    shirt = await getShirtById(id);
  } catch {
    return (
      <DetailMessage message="No s'ha pogut carregar la samarreta. Torna-ho a provar més tard." />
    );
  }

  if (!shirt) {
    return (
      <DetailMessage message="No s'ha trobat cap samarreta amb aquest identificador." />
    );
  }

  return <ShirtDetail shirt={shirt} />;
}

function DetailMessage({ message }: { message: string }) {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-6 sm:px-8 lg:py-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-950">
            Samarreta no disponible
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
