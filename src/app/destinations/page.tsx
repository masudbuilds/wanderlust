"use client";

import { useEffect, useState } from "react";
import { DestinationCard } from "@/components/Cards/DestinationCard";
import type { Destination } from "@/types/Destination";

// Your backend — adjust if the endpoint differs.
const API_URL = "http://localhost:5000/destinations";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseDestination(value: unknown): Destination | null {
  if (!isRecord(value)) return null;

  const id = typeof value._id === "string" ? value._id : value.id;
  const {
    name,
    country,
    category,
    price,
    duration,
    departureDate,
    imageUrl,
    rating,
    description,
  } = value;

  if (
    typeof id !== "string" ||
    typeof name !== "string" ||
    typeof country !== "string" ||
    typeof category !== "string" ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    typeof duration !== "string" ||
    typeof departureDate !== "string" ||
    typeof description !== "string"
  ) {
    return null;
  }

  return {
    id,
    name,
    country,
    category,
    price,
    duration,
    departureDate,
    imageUrl:
      typeof imageUrl === "string" && imageUrl.length > 0
        ? imageUrl
        : "/images/Banner.png",
    ...(typeof rating === "number" && Number.isFinite(rating) ? { rating } : {}),
    description,
  };
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadDestinations() {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error(`Destinations API returned HTTP ${res.status}`);
        }

        const data: unknown = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Destinations API returned an unexpected response");
        }

        const parsed = data
          .map(parseDestination)
          .filter((destination): destination is Destination => destination !== null);

        if (parsed.length !== data.length) {
          console.warn(
            `Skipped ${data.length - parsed.length} invalid destination record(s)`,
          );
        }

        if (!cancelled) {
          setDestinations(parsed);
        }
      } catch (error) {
        console.error("Failed to load destinations:", error);
        if (!cancelled) {
          setError("Destinations could not be loaded. Please try again later.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
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

      {loading ? (
        <p className="mt-10 text-sm text-muted-foreground">
          Loading destinations...
        </p>
      ) : error ? (
        <p className="mt-10 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : destinations.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          No destinations are available right now.
        </p>
      ) : (
        <>
          <p className="mt-10 text-sm text-muted-foreground">
            Showing {destinations.length} destinations
          </p>

          <div className="mt-4 grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
