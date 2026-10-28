import { Banner } from "@/components/home/banner";
import { Features } from "@/components/home/features";
import { Testimonials } from "@/components/home/testimonials";
import { Cta } from "@/components/home/cta";
import FeaturedDestination from "@/components/home/featured-destinations";

export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturedDestination />
      <Features />
      <Testimonials />
      <Cta />
    </main>
  );
}
