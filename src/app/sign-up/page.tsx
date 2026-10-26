"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Image as ImageIcon, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/GoogleIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  async function handleSignUp(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    if (data) {
      redirect("/");
    }
    if (error) {
      console.log(error);
    }
  }

  const inputWithIcon =
    "h-11! bg-muted! pr-3! pl-9! placeholder:text-muted-foreground!";

  return (
    <main className="flex w-full flex-1 items-center justify-center bg-neutral-100 px-6 py-12">
      <div className="w-full max-w-md">
        <h1 className="font-display text-center text-3xl font-medium md:text-4xl">
          Create Account
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Start your adventure with Wanderlust
        </p>

        <div className="mt-8 rounded-xl border border-border bg-white p-6 shadow-xs md:p-8">
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="fullName"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className={inputWithIcon}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="imageUrl">Image URL</Label>
              <div className="relative">
                <ImageIcon
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="url"
                  name="image"
                  type="url"
                  required
                  placeholder="Image URL"
                  className={inputWithIcon}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className={inputWithIcon}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Create a password"
                  className={inputWithIcon}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="confirmPassword"
                  name="password"
                  type="password"
                  required
                  placeholder="Confirm your password"
                  className={inputWithIcon}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="h-11 w-full bg-brand! text-white! hover:bg-brand-dark!"
            >
              Create Account
            </Button>

            <div className="flex items-center gap-3 py-1">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">
                Or sign up with
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-11 w-full gap-2 bg-white! font-medium"
            >
              <GoogleIcon />
              Sign Up With Google
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-brand hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
