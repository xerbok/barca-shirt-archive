import Link from "next/link";
import { DeleteShirtButton } from "@/components/delete-shirt-button";
import type { ShirtImage, ShirtWithImages } from "@/types/database";

type ShirtDetailProps = {
  shirt: ShirtWithImages;
};

const currencyFormatter = new Intl.NumberFormat("ca-ES", {
  currency: "EUR",
  maximumFractionDigits: 2,
  style: "currency",
});

export function ShirtDetail({ shirt }: ShirtDetailProps) {
  const title = `${shirt.season} · ${shirt.shirt_type}`;

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-6 sm:px-8 lg:py-8">
        <header className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <Link
            className="text-sm font-semibold text-blue-800 transition hover:text-blue-950"
            href="/"
          >
            Tornar a l&apos;arxiu
          </Link>

          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-red-700">
                Detall de la samarreta
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
                {title}
              </h1>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm"
                href={`/samarretes/${shirt.id}/editar`}
              >
                Editar
              </Link>
              <DeleteShirtButton shirtId={shirt.id} />
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <ShirtGallery images={shirt.images} title={title} />

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-semibold text-slate-950">
              Informació de la peça
            </h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <DetailItem label="Temporada" value={shirt.season} />
              <DetailItem label="Competició" value={shirt.competition} />
              <DetailItem label="Tipus de samarreta" value={shirt.shirt_type} />
              <DetailItem label="Tipus de teixit" value={shirt.fabric_type} />
              <DetailItem label="Marca" value={shirt.brand} />
              <DetailItem label="Jugador" value={shirt.player_name} />
              <DetailItem
                label="Dorsal"
                value={shirt.number === null ? null : String(shirt.number)}
              />
              <DetailItem label="Talla" value={shirt.size} />
              <DetailItem label="Estat" value={shirt.condition} />
              <DetailItem label="Autenticitat" value={shirt.authenticity} />
              <DetailItem
                label="Preu de compra"
                value={
                  shirt.purchase_price === null
                    ? null
                    : currencyFormatter.format(shirt.purchase_price)
                }
              />
              <DetailItem
                label="Data de compra"
                value={formatDate(shirt.purchase_date)}
              />
              <DetailItem label="Lloc de compra" value={shirt.purchase_place} />
              <DetailItem
                label="Data de creació"
                value={formatDateTime(shirt.created_at)}
              />
            </dl>

            <div className="mt-6 rounded-md bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-500">Notes</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-900">
                {displayValue(shirt.notes)}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ShirtGallery({
  images,
  title,
}: {
  images: ShirtImage[];
  title: string;
}) {
  if (images.length === 0) {
    return (
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div
          aria-label="Imatge placeholder de la samarreta"
          className="relative aspect-[4/3] overflow-hidden bg-slate-900"
          role="img"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b3b82_0_34%,#991b1b_34%_66%,#0b3b82_66%_100%)]" />
          <div className="absolute inset-x-10 top-10 h-32 rounded-b-full border-x-8 border-b-8 border-white/25" />
          <div className="absolute bottom-5 left-5 rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-slate-950">
            Imatge pendent
          </div>
        </div>
        <p className="px-5 py-4 text-sm font-medium text-slate-600">
          Aquesta samarreta encara no té imatges.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">
        Galeria d&apos;imatges
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {images.map((image, index) => (
          <figure
            className={
              index === 0 ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : ""
            }
            key={image.id}
          >
            <div
              aria-label={`${title}, imatge ${index + 1}`}
              className="aspect-[4/3] overflow-hidden rounded-md bg-slate-100 bg-cover bg-center"
              role="img"
              style={{
                backgroundImage: `url(${JSON.stringify(image.image_url)})`,
              }}
            />
            {image.is_main ? (
              <figcaption className="mt-2 text-xs font-semibold uppercase text-blue-800">
                Imatge principal
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className="rounded-md bg-slate-50 px-4 py-3">
      <dt className="text-xs font-semibold uppercase text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-slate-950">
        {displayValue(value)}
      </dd>
    </div>
  );
}

function displayValue(value: string | null): string {
  return value && value.trim().length > 0 ? value : "No especificat";
}

function formatDate(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-");

  return year && month && day ? `${day}/${month}/${year}` : value;
}

function formatDateTime(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("ca-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
