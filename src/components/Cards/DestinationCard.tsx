import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Star } from "lucide-react";
import type { Destination } from "@/types/Destination";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="group">
      <div className="relative h-52 w-full overflow-hidden rounded-lg md:h-56">
        {/* unoptimized: the URL comes from the backend, so no optimizer config needed */}
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {destination.rating !== undefined ? (
          <span className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-white/85 px-2 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
            {destination.rating.toFixed(1)}
            <Star className="size-3.5 fill-current" aria-hidden="true" />
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-4" aria-hidden="true" />
        {destination.country}
      </div>

      <div className="mt-1 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl">{destination.name}</h3>
        <p>
          <span className="text-lg font-bold">${destination.price}</span>
          <span className="text-xs text-muted-foreground">/Person</span>
        </p>
      </div>

      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Calendar className="size-4" aria-hidden="true" />
        {destination.duration}
      </p>

      <Link
        href={`/destinations/${destination.id}`}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand underline underline-offset-2 transition-colors hover:text-brand-dark"
      >
        Book Now
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
