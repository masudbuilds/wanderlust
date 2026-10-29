"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import type { Destination } from "@/types/Destination";
import { ArrowRight, Check } from "lucide-react";

function formatDateInput(value: string) {
  const dateOnly = /^(\d{4}-\d{2}-\d{2})/.exec(value)?.[1];
  if (dateOnly) {
    return dateOnly;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

const BookingCard = ({ destination }: { destination: Destination }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleBooking = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    if (!user?.email) {
      setErrorMessage("Please sign in before booking this trip.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const departureDate = String(formData.get("departureDate") ?? "");

    if (!departureDate) {
      setErrorMessage("Choose a departure date before booking.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...destination,
          username: user.name,
          email: user.email,
          image: user.image,
          departureDate,
          bookingDate: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error(`Booking creation failed with status ${res.status}`);
      }

      router.push("/bookings");
    } catch (error) {
      console.error("Failed to create booking:", error);
      setErrorMessage("Could not complete this booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const perks = [
    "Free cancellation up to 7 days",
    "Travel insurance included",
    "24/7 customer support",
  ];
  return (
    <div>
      <aside className="self-start rounded-xl border border-border bg-white p-5 lg:sticky lg:top-24">
        <p className="text-sm text-muted-foreground">Starting from</p>
        <p className="mt-1 text-3xl font-bold text-brand">
          ${destination.price}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">per person</p>

        <form onSubmit={handleBooking}>
          <Input
            type="date"
            name="departureDate"
            defaultValue={formatDateInput(destination.departureDate)}
            required
            aria-label="Departure date"
            className="mt-4 h-9! bg-muted!"
          />

          <Button
            type="submit"
            disabled={submitting}
            className="mt-4 h-10 w-full bg-brand! text-white! hover:bg-brand-dark!"
          >
            {submitting ? "Booking..." : "Book Now"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          {errorMessage ? (
            <p className="mt-3 text-sm text-destructive" role="alert">
              {errorMessage}{" "}
              {!user?.email ? (
                <Link href="/login" className="font-medium underline">
                  Sign in
                </Link>
              ) : null}
            </p>
          ) : null}
        </form>

        <ul className="mt-4 space-y-2">
          {perks.map((perk) => (
            <li
              key={perk}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Check
                className="size-4 shrink-0 text-green-600"
                aria-hidden="true"
              />
              {perk}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default BookingCard;
