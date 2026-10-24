"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Admin", href: "/admin" },
];

const actionLinks = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/sign-up" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white">
      <nav className="mx-auto grid h-17.5 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 md:px-10">
        {/* Left nav / mobile menu toggle */}
        <ul className="hidden items-center gap-9 justify-self-start lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "text-[15px] transition-colors",
                  link.active
                    ? "font-medium text-brand underline underline-offset-4"
                    : "text-foreground hover:text-brand",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="justify-self-start text-foreground lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        {/* Center logo */}
        <Link
          href="/"
          className="justify-self-center"
          aria-label="Wanderlast home"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Right actions */}
        <ul className="hidden items-center gap-8 justify-self-end lg:flex">
          {actionLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="flex items-center gap-1.5 text-[15px] text-foreground transition-colors hover:text-brand"
              >
                {link.icon ? <link.icon className="size-4.5" /> : null}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile menu */}
      {menuOpen ? (
        <div className="border-y border-border bg-white lg:hidden">
          <div className="mx-auto w-full max-w-7xl px-6">
            <ul className="flex flex-col py-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block py-2.5 text-[15px]",
                      link.active
                        ? "font-medium text-brand underline underline-offset-4"
                        : "text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-border py-2">
              {actionLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 py-2.5 text-[15px] text-foreground"
                >
                  {link.icon ? <link.icon className="size-4.5" /> : null}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
