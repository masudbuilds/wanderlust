import { Banner } from "@/components/banner";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { Cta } from "@/components/cta";

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
