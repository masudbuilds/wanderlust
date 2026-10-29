"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DeleteDestinationDialog = ({
  destinationId,
}: {
  destinationId: string;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDeleteDestination() {
    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destinations/${encodeURIComponent(destinationId)}`,
        { method: "DELETE" },
      );

      if (!res.ok) {
        throw new Error(
          `Destination deletion failed with status ${res.status}`,
        );
      }

      setOpen(false);
      router.replace("/destinations");
    } catch (error) {
      console.error("Failed to delete destination:", error);
      setError("Could not delete this destination. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            className="border-destructive/40! gap-2 text-destructive! hover:text-destructive!"
            type="button"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            Delete
          </Button>
        }
      >
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this destination?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The destination will be permanently
            removed.
          </AlertDialogDescription>
          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            disabled={deleting}
            onClick={handleDeleteDestination}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {deleting ? "Deleting..." : "Delete destination"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDestinationDialog;
