"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Bookmark,
  Calendar,
  CircleCheck,
  Clock,
  Eye,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Booking } from "@/types/Booking";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

function formatDeparture(departureDate: string) {
  const date = new Date(departureDate);

  if (Number.isNaN(date.getTime())) {
    return departureDate;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function StatusBadge({ status }: { status?: string | null }) {
  if (!status) {
    return null;
  }

  const normalized = status.toLowerCase();

  if (normalized === "pending") {
    return (
      <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-600">
        <Clock className="size-3.5" aria-hidden="true" />
        Pending
      </span>
    );
  }

  if (normalized === "cancelled") {
    return (
      <span className="flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-600">
        <CircleCheck className="size-3.5" aria-hidden="true" />
        Cancelled
      </span>
    );
  }

  if (normalized === "confirmed") {
    return (
      <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
        <CircleCheck className="size-3.5" aria-hidden="true" />
        Confirmed
      </span>
    );
  }

  return null;
}

function BookingCard({ booking }: { booking: Booking }) {
  const router = useRouter();
  const [canceling, setCanceling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const bookingId = booking.id ?? booking._id;

  const handleCancelBooking = async () => {
    const token = await getTokenFromClient();
    if (!bookingId) {
      setCancelError(
        "This booking cannot be cancelled because its ID is missing.",
      );
      return;
    }

    setCanceling(true);
    setCancelError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${encodeURIComponent(bookingId)}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(
          `Booking cancellation failed with status ${res.status}`,
        );
      }

      router.refresh();
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      setCancelError("Could not cancel this booking. Please try again.");
    } finally {
      setCanceling(false);
    }
  };

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-white p-4 shadow-xs md:flex-row md:items-center">
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg md:h-36 md:w-52">
        {/* unoptimized: the URL comes from the backend, so no optimizer config needed */}
        <Image
          src={booking.imageUrl}
          alt={booking.name}
          fill
          unoptimized
          sizes="(min-width: 768px) 208px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <StatusBadge status={booking.status} />
        <h3 className="font-display text-2xl font-medium">{booking.name}</h3>
        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" aria-hidden="true" />
            Departure: {formatDeparture(booking.departureDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <Bookmark className="size-4" aria-hidden="true" />
            Booking ID: {bookingId ?? "Not available"}
          </span>
        </div>
        <p className="text-2xl font-bold text-brand">${booking.price}</p>
      </div>

      {/* Static placeholders — wire confirmation actions later. */}
      <div className="flex shrink-0 flex-col items-end gap-2 self-end md:self-center">
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            onClick={handleCancelBooking}
            disabled={canceling}
            variant="outline"
            className="border-destructive/40! gap-2 text-destructive! hover:text-destructive!"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            {canceling ? "Cancelling..." : "Cancel"}
          </Button>
          <Link href={`/destinations/${booking._id}`}>
            <Button
              type="button"
              className="gap-2 bg-brand! text-white! hover:bg-brand-dark!"
            >
              <Eye className="size-4" aria-hidden="true" />
              View
            </Button>
          </Link>
        </div>
        {cancelError ? (
          <p
            role="alert"
            className="max-w-60 text-right text-sm text-destructive"
          >
            {cancelError}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export default function BookingGrid({ bookings }: { bookings: Booking[] }) {
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        You have no upcoming bookings yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {bookings.map((booking, index) => (
        <BookingCard
          key={
            booking.id ??
            booking._id ??
            `${booking.name}-${booking.departureDate}-${index}`
          }
          booking={booking}
        />
      ))}
    </div>
  );
}
