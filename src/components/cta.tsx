import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      <Image
        src="/images/CTA.png"
        alt="Aerial view of an airplane flying over a tropical island"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-white md:py-28">
        <h2 className="font-display text-center text-4xl font-medium sm:text-5xl md:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-center text-lg text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>

        <button
          type="button"
          className="mt-10 flex h-13 items-center gap-5 bg-white px-8 text-sm font-semibold tracking-wider text-foreground uppercase transition-colors hover:bg-white/85"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
