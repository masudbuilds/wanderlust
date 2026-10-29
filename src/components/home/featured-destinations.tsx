"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  CalendarDays,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  rating?: number;
};

function DestinationCard({ destination }: { destination: Destination }) {
  const rating = destination.rating ?? 4.5;

  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card shadow-sm">
      {/* Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-sm bg-white px-2 py-1 text-xs font-semibold text-foreground shadow">
          {rating}
          <Star className="size-3 fill-amber-400 text-amber-400" />
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-2.5 p-4">
        {/* Country */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3" />
          <span>{destination.country}</span>
        </div>

        {/* Name + Price row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-snug text-foreground">
            {destination.name}
          </h3>
          <div className="shrink-0 text-right">
            <span className="text-base font-bold text-foreground">
              ${destination.price.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">/person</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarDays className="size-3" />
          <span>{destination.duration}</span>
        </div>

        {/* Book Now */}
        <Link
          href={`/destinations/${destination._id}`}
          className="mt-1 inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-brand uppercase hover:underline"
        >
          Book Now
          <ArrowUpRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}

/** Slide counter + nav controls — rendered inside Carousel context */
function CarouselControls({ total }: { total: number }) {
  const { api, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!api) return;
    const update = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", update);
    update();
    return () => {
      api.off("select", update);
    };
  }, [api]);

  return (
    <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
      <span className="text-sm text-muted-foreground">
        {current}/{total}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className={cn(
            "flex size-9 items-center justify-center rounded-full border border-border transition-colors",
            canScrollPrev ? "hover:bg-muted" : "cursor-not-allowed opacity-40",
          )}
          aria-label="Previous destination"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className={cn(
            "flex size-9 items-center justify-center rounded-full border border-border transition-colors",
            canScrollNext ? "hover:bg-muted" : "cursor-not-allowed opacity-40",
          )}
          aria-label="Next destination"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

const FeaturedDestination = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-destinations`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch destinations");
        return res.json();
      })
      .then((data: { value: Destination[] } | Destination[]) => {
        setDestinations(Array.isArray(data) ? data : data.value);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-semibold text-foreground">
              Featured Destinations
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-semibold tracking-widest text-foreground uppercase transition-colors hover:bg-muted"
          >
            All Destinations
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-95 animate-pulse rounded-sm bg-muted" />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="-ml-5">
              {destinations.map((dest) => (
                <CarouselItem
                  key={dest._id}
                  className="pl-5 sm:basis-1/2 lg:basis-1/3"
                >
                  <DestinationCard destination={dest} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselControls total={destinations.length} />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default FeaturedDestination;
