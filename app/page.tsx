import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import Stories from "@/components/sections/stories";
import Program from "@/components/sections/program";
import Why from "@/components/sections/why";
import VideoSection from "@/components/sections/video";
import Tools from "@/components/sections/tools";
import Testimonials from "@/components/sections/testimonials";
import BlogPreview from "@/components/sections/blog-preview";
import Pricing from "@/components/sections/pricing";
import Faq from "@/components/sections/faq";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stories />
        <Program />
        <Why />
        <VideoSection />
        <Tools />
        <Testimonials />
        <BlogPreview />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
