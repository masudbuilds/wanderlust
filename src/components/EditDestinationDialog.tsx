"use client";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";

import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
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
import type { Destination } from "@/types/Destination";

const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Honeymoon",
  "Cruise",
];

const EditDestinationDialog = ({
  destination,
  destinationId,
}: {
  destination: Destination;
  destinationId: string;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      country: String(formData.get("country") ?? ""),
      category: String(formData.get("category") ?? ""),
      price: Number(formData.get("price")),
      duration: String(formData.get("duration") ?? ""),
      departureDate: String(formData.get("departureDate") ?? ""),
      imageUrl: String(formData.get("imageUrl") ?? ""),
      ...(destination.rating !== undefined
        ? { rating: destination.rating }
        : {}),
      description: String(formData.get("description") ?? ""),
    };

    try {
      const res = await fetch(
        `http://localhost:5000/destinations/${encodeURIComponent(destinationId)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        throw new Error(`Destination update failed with status ${res.status}`);
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to update travel package:", error);
      setError("Could not save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const categories = [...new Set([...CATEGORIES, destination.category])];

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button variant="outline" className="gap-2" type="button">
            <SquarePen className="size-4" aria-hidden="true" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="mx-auto mt-10 w-full max-w-lg">
          <DialogHeader>
            <DialogTitle>Update Travel Package</DialogTitle>
            <DialogDescription>
              Make changes to the travel package details below
            </DialogDescription>
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
                  defaultValue={destination.name}
                  className="h-9! bg-muted!"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  required
                  defaultValue={destination.country}
                  className="h-9! bg-muted!"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="category">Category</Label>
                <Select
                  key={destination.id}
                  name="category"
                  defaultValue={destination.category}
                  required
                >
                  <SelectTrigger
                    id="category"
                    className="h-9! w-full! bg-muted!"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
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
                  defaultValue={destination.price}
                  className="h-9! bg-muted!"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  defaultValue={destination.duration}
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
                  defaultValue={destination.departureDate.slice(0, 10)}
                  className="h-9! bg-muted!"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  defaultValue={destination.imageUrl}
                  className="h-9! bg-muted!"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  defaultValue={destination.description}
                  className="bg-muted!"
                />
              </div>

              {error ? (
                <p
                  className="text-sm text-destructive sm:col-span-2"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              <div className="mt-2 flex items-center justify-end gap-3 sm:col-span-2">
                <DialogClose
                  render={
                    <Button type="button" variant="outline" disabled={saving} />
                  }
                >
                  Cancel
                </DialogClose>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-brand! gap-2 text-white! hover:bg-brand-dark!"
                >
                  <Save className="size-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditDestinationDialog;
