"use client";

import { useEffect, useState } from "react";
import { DestinationCard } from "@/components/Cards/DestinationCard";
import { type Destination } from "@/types/Destination";

// Your backend — adjust if the endpoint differs.
const API_URL = "http://localhost:5000/destinations";

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadDestinations() {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          console.error("Failed to load destinations:", res.status);
          return;
        }

        const data: unknown = await res.json();

        if (!Array.isArray(data)) {
          console.error("Destinations API returned unexpected data");
          return;
        }

        const parsed = data
          .map((item): Destination | null => {
            if (typeof item !== "object" || item === null) return null;

            const {
              id,
              name,
              country,
              category,
              price,
              duration,
              departureDate,
              imageUrl,
              rating,
              description,
            } = item as Record<string, unknown>;

            if (typeof id !== "string" || typeof imageUrl !== "string") {
              return null;
            }

            return {
              id,
              name: typeof name === "string" ? name : "",
              country: typeof country === "string" ? country : "",
              category: typeof category === "string" ? category : "",
              price: typeof price === "number" ? price : 0,
              duration: typeof duration === "string" ? duration : "",
              departureDate:
                typeof departureDate === "string" ? departureDate : "",
              imageUrl,
              rating: typeof rating === "number" ? rating : 0,
              description: typeof description === "string" ? description : "",
            };
          })
          .filter(
            (destination): destination is Destination => destination !== null,
          );

        if (!cancelled) {
          setDestinations(parsed);
        }
      } catch (error) {
        console.error("Failed to load destinations:", error);
      }
    }

    loadDestinations();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10">
      <h1 className="font-display text-4xl font-medium md:text-5xl">
        Explore All Destinations
      </h1>
      <p className="mt-2 text-sm text-muted-foreground md:text-base">
        Find your perfect travel experience from our curated collection
      </p>

      <p className="mt-10 text-sm text-muted-foreground">
        {destinations.length === 0
          ? "Loading destinations..."
          : `Showing ${destinations.length} destinations`}
      </p>

      {destinations.length > 0 ? (
        <div className="mt-4 grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      ) : null}
    </main>
  );
}
