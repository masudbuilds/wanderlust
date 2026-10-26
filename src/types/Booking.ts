export type Booking = {
  id?: string;
  _id?: string;
  name: string;
  imageUrl: string;
  price: number;
  departureDate: string;
  status?: string | null;
};
