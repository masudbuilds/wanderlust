import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/help-center" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const socials = [
  {
    label: "X",
    href: "https://x.com",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm tracking-wide text-white/90 uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[15px] text-white/85 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
        <Image
          src="/images/Wanderlast-1.png"
          alt="Wanderlast"
          width={542}
          height={80}
          className="h-14 w-auto md:h-19"
        />
        <p className="mt-2 text-sm text-white/85">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <h3 className="text-sm tracking-wide text-white/90 uppercase">
              Newsletter
            </h3>
            <p className="mt-3 text-sm text-white/85">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-4 flex items-center bg-white/20 sm:max-w-69">
              <input
                type="email"
                required
                placeholder="Enter email"
                aria-label="Email address"
                className="h-10.5 w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/70"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex h-10.5 w-10 shrink-0 items-center justify-center text-white transition-colors hover:text-brand-light"
              >
                <ArrowUpRight className="size-4.5" />
              </button>
            </form>
          </div>

          <LinkColumn title="Quick Links" links={quickLinks} />
          <LinkColumn title="Support" links={supportLinks} />

          <div>
            <h3 className="text-sm tracking-wide text-white/90 uppercase">
              Contact Us
            </h3>
            <a
              href="tel:+17869011622"
              className="mt-4 block text-[15px] text-white/85 transition-colors hover:text-white"
            >
              786 901 1622
            </a>
            <a
              href="mailto:info@wandariland.com"
              className="mt-3 block text-[15px] text-white/85 transition-colors hover:text-white"
            >
              info@wandariland.com
            </a>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-white/15 pt-5">
          <p className="text-xs text-white/70">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-white transition-colors hover:text-brand-light"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
