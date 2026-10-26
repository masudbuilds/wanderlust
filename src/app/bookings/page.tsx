import BookingGrid from "@/components/booking/BookingGrid";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { type Booking } from "@/types/Booking";

const BookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const res = await fetch(`http://localhost:5000/bookings/${user?.email}`);
  const bookings = (await res.json()) as Booking[];
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12 md:px-10">
      <h1 className="font-display text-4xl font-medium md:text-5xl">
        My Bookings
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage and view your upcoming travel plans
      </p>

      <div className="mt-10">
        <BookingGrid bookings={bookings} />
      </div>
    </main>
  );
};

export default BookingsPage;
