import { Navbar } from "@/components/navbar";
import { Banner } from "@/components/banner";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <Features />
        <Testimonials />
      </main>
    </>
  );
}
