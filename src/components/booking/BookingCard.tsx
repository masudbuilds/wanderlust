"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Destination } from "@/types/Destination";
import { ArrowRight, Check } from "lucide-react";

const BookingCard = ({ destination }: { destination: Destination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBooking = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const departureDate = e.target.departureDate.value;

    const data = {
      username: user?.name,
      email: user?.email,
      image: user?.image,
      ...destination,
      departureDate: departureDate,
      bookingDate: new Date(),
    };

    const res = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const bookingData = await res.json();
    console.log(bookingData);
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
            defaultValue={destination.departureDate}
            aria-label="Departure date"
            className="mt-4 h-9! bg-muted!"
          />

          <Button
            type="submit"
            className="mt-4 h-10 w-full bg-brand! text-white! hover:bg-brand-dark!"
          >
            Book Now
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
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
