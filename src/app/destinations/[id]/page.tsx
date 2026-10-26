import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Check, MapPin, Star } from "lucide-react";
import { type Destination } from "@/types/Destination";
import EditDestinationDialog from "@/components/destination/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/destination/DeleteDestinationDialog";
import BookingCard from "@/components/booking/BookingCard";

// Your backend — adjust if the endpoint differs.
const API_URL = "http://localhost:5000/destinations";

type DestinationDetail = Destination & {
  reviews?: number;
  highlights?: string[];
};

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let destination: DestinationDetail;

  try {
    const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });

    if (!res.ok) {
      notFound();
    }

    destination = (await res.json()) as DestinationDetail;
  } catch {
    notFound();
  }

  const highlights = Array.isArray(destination.highlights)
    ? destination.highlights
    : [];

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-6 md:px-10 md:py-8">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-3">
          <EditDestinationDialog destination={destination} destinationId={id} />
          <DeleteDestinationDialog destinationId={id} />
        </div>
      </div>

      {/* Hero image */}
      <div className="relative mt-5 aspect-[2.2] w-full overflow-hidden rounded-lg">
        {/* unoptimized: the URL comes from the backend, so no optimizer config needed */}
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          unoptimized
          sizes="(min-width: 1080px) 1024px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-6 h-px bg-border" />

      {/* Content */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_300px]">
        <div>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" aria-hidden="true" />
            {destination.country}
          </p>
          <h1 className="font-display mt-1 text-4xl font-medium md:text-5xl">
            {destination.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-5">
            {typeof destination.rating === "number" &&
            destination.rating > 0 ? (
              <span className="flex items-center gap-1.5 text-sm font-medium">
                <Star
                  className="size-4 fill-green-600 text-green-600"
                  aria-hidden="true"
                />
                {destination.rating.toFixed(1)}
                {typeof destination.reviews === "number" ? (
                  <span className="text-muted-foreground">
                    ({destination.reviews} reviews)
                  </span>
                ) : null}
              </span>
            ) : null}
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <Calendar className="size-4" aria-hidden="true" />
              {destination.duration}
            </span>
          </div>

          {destination.description ? (
            <section className="mt-8">
              <h2 className="font-display text-2xl font-medium">Overview</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {destination.description}
              </p>
            </section>
          ) : null}

          {highlights.length > 0 ? (
            <section className="mt-8">
              <h2 className="font-display text-2xl font-medium">Highlights</h2>
              <ul className="mt-3 grid gap-x-10 gap-y-2 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check
                      className="size-4 shrink-0 text-green-600"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        {/* Booking card, stuck under the sticky navbar on desktop */}
        <BookingCard destination={destination} />
      </div>
    </main>
  );
}
