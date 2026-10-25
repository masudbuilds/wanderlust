import { Banner } from "@/components/home/banner";
import { Features } from "@/components/home/features";
import { Testimonials } from "@/components/home/testimonials";
import { Cta } from "@/components/home/cta";

export default function Home() {
  return (
    <main>
      <Banner />
      <Features />
      <Testimonials />
      <Cta />
    </main>
  );
}
