"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
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
import { getTokenFromClient } from "@/lib/getTokenFromClient";

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const token = await getTokenFromClient();
    event.preventDefault();
    if (submitting) return;

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      country: String(formData.get("country") ?? "").trim(),
      category: String(formData.get("category") ?? ""),
      price: Number(formData.get("price")),
      duration: String(formData.get("duration") ?? "").trim(),
      departureDate: String(formData.get("departureDate") ?? ""),
      imageUrl: String(formData.get("imageUrl") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
    };

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/add-destination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(
          `Destination creation failed with status ${res.status}`,
        );
      }

      router.push("/destinations");
    } catch (error) {
      console.error("Failed to add travel package:", error);
      setError("Could not add this destination. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
      <h1 className="font-display text-3xl font-medium md:text-4xl">
        Add New Travel Package
      </h1>

      <Card className="mx-auto mt-10 w-full max-w-lg py-0!">
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
                placeholder="Enter a country"
                className="h-9! bg-muted!"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category">Category</Label>
              <Select name="category" required>
                <SelectTrigger id="category" className="h-9! w-full! bg-muted!">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
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
                required
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

            <div className="mt-2 flex flex-col justify-end gap-3 sm:col-span-2">
              {error ? (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              ) : null}
              <Button
                type="submit"
                disabled={submitting}
                className="bg-brand! gap-2 text-white! hover:bg-brand-dark!"
              >
                <Save className="size-4" />
                {submitting ? "Adding..." : "Add Travel Package"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
