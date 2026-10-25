"use client";

import { useRouter } from "next/navigation";
import { Save, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Honeymoon",
  "Cruise",
];

export default function AddDestinationPage() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const newPackage = {
      name: data.get("name"),
      country: data.get("country"),
      category: data.get("category"),
      price: data.get("price"),
      duration: data.get("duration"),
      departureDate: data.get("departureDate"),
      imageUrl: data.get("imageUrl"),
      description: data.get("description"),
    };
    console.log("New travel package:", newPackage);

    // Fake submit for now — redirect to home.
    router.push("/");
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
      <h1 className="font-display text-3xl font-medium md:text-4xl">
        Add New Travel Package
      </h1>

      <Card className="mx-auto mt-10 w-full max-w-lg">
        <CardContent className="px-6 py-6">
          <form
            onSubmit={handleSubmit}
            className="grid gap-x-6 gap-y-4 sm:grid-cols-2"
          >
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="name">Destination Name</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Bali Paradise"
                className="h-9! bg-muted!"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                required
                defaultValue="Indonesia"
                className="h-9! bg-muted!"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue="beach" required>
                <SelectTrigger
                  id="category"
                  className="h-9! w-full! bg-muted!"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem
                      key={category}
                      value={category.toLowerCase()}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                required
                placeholder="e.g., 1299"
                className="h-9! bg-muted!"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                placeholder="e.g., 7 Days/6 Nights"
                className="h-9! bg-muted!"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                name="departureDate"
                type="date"
                required
                className="h-9! bg-muted!"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                className="h-9! bg-muted!"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Describe the travel experience..."
                className="bg-muted!"
              />
            </div>

            <div className="mt-2 flex items-center justify-end gap-3 sm:col-span-2">
              <Button
                type="button"
                variant="outline"
                className="border-destructive/40! gap-2 text-destructive! hover:text-destructive!"
                onClick={() => router.push("/")}
              >
                <Trash2 className="size-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand! gap-2 text-white! hover:bg-brand-dark!"
              >
                <Save className="size-4" />
                Add Travel Package
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
