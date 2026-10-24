import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { ArrowRight } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip", type: "text" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days", type: "text" },
  { label: "Budget", placeholder: "$0-$3000", type: "text" },
  { label: "People", placeholder: "5-10", type: "text" },
];

export function Banner() {
  return (
    <section
      className={`${playfair.variable} relative flex min-h-[calc(100svh-4.375rem)] flex-col`}
    >
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a coastal bay surrounded by lush forest"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-20 text-white">
        <h1 className="text-center font-[family-name:var(--font-playfair)] text-5xl leading-[1.1] font-medium sm:text-6xl md:text-7xl xl:text-8xl">
          Discover Your
          <br />
          Next Adventure
        </h1>

        <p className="mt-8 max-w-xl text-center text-lg text-white/90 sm:text-xl">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="flex h-14 items-center gap-6 bg-brand px-7 text-sm font-semibold tracking-wider text-white uppercase transition-colors hover:bg-brand-dark"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </button>
          <button
            type="button"
            className="h-14 border border-white/20 bg-white/20 px-7 text-sm font-semibold tracking-wider text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/35"
          >
            View Destination
          </button>
        </div>
      </div>

      {/* Search bar pinned to the bottom of the banner */}
      <form className="relative z-10 grid w-full grid-cols-1 border-t border-white/15 bg-white/10 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto]">
        {searchFields.map((field, index) => (
          <label
            key={field.label}
            className={`flex h-[70px] flex-col justify-center gap-0.5 border-b border-white/15 px-6 py-3.5 lg:border-b-0 ${
              index > 0 ? "lg:border-l" : ""
            }`}
          >
            <span className="text-lg font-semibold text-white">
              {field.label}
            </span>
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/75"
            />
          </label>
        ))}
        <button
          type="submit"
          className="h-[70px] bg-brand px-12 text-lg font-semibold text-white transition-colors hover:bg-brand-dark sm:col-span-2 lg:col-span-1 lg:border-l lg:border-white/15"
        >
          Search
        </button>
      </form>
    </section>
  );
}
