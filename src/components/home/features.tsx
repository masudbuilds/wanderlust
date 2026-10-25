import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function Features() {
  return (
    <section className="bg-brand-soft px-6 py-20 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="bg-white p-6 shadow-xs">
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="size-11"
              />
              <h3 className="mt-5 text-2xl font-medium text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
