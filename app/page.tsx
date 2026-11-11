import Navbar from "@/components/navbar";
import SmoothScroll from "@/components/story/smooth-scroll";
import StoryHero from "@/components/story/hero";
import IdeaBeat from "@/components/story/idea-beat";
import Journey from "@/components/story/journey";
import LaunchGallery from "@/components/story/launch-gallery";
import Quiz from "@/components/story/quiz";
import Why from "@/components/sections/why";
import Stats from "@/components/ui/stats-06";
import VideoSection from "@/components/sections/video";
import Tools from "@/components/sections/tools";
import Testimonials from "@/components/ui/testimonial";
import BlogPreview from "@/components/sections/blog-preview";
import Pricing from "@/components/sections/pricing";
import Faq from "@/components/sections/faq";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main id="home">
        <StoryHero />
        <IdeaBeat />
        <Journey />
        <LaunchGallery />
        <Why />
        <Stats />
        <Quiz />
        <VideoSection />
        <Tools />
        <Testimonials />
        <BlogPreview />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
