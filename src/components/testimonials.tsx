"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    photo: "/images/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person1.png",
  },
];

export function Testimonials() {
  // Two slides at 50% width fill the viewport exactly, leaving embla no
  // scroll room (loop also needs >= 3 slides) — repeat the list to give
  // the carousel content to page through.
  const slides = [...testimonials, ...testimonials];

  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mx-auto w-full max-w-7xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-4xl font-semibold md:text-5xl">
              What Travelers Say
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex gap-3">
            <CarouselPrevious className="relative! size-11 border-gray-300! text-gray-400!" />
            <CarouselNext className="relative! size-11 border-gray-300! text-gray-400!" />
          </div>
        </div>

        <CarouselContent className="mt-10">
          {slides.map((t, i) => (
            <CarouselItem key={`${t.name}-${i}`} className="sm:basis-1/2">
              <article className="flex h-full gap-4 border border-border bg-white p-3">
                <div className="flex min-w-0 flex-1 flex-col p-3">
                  <p className="text-[15px] leading-snug text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="mt-auto flex items-start gap-2 pt-8">
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-brand" />
                    <div>
                      <p className="text-[15px] text-brand">{t.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {t.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative w-[38%] max-w-37.5 shrink-0 self-stretch">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    fill
                    sizes="(min-width: 640px) 150px, 38vw"
                    className="object-cover"
                  />
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
