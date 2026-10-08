import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { CoursePreview } from "@/components/site/CoursePreview";
import { WhyRoots } from "@/components/site/WhyRoots";
import { AcademicSystem } from "@/components/site/AcademicSystem";
import { Faculty } from "@/components/site/Faculty";
import { FounderPreview } from "@/components/site/FounderPreview";
import { Gallery } from "@/components/site/Gallery";
import { TestimonialBand } from "@/components/site/TestimonialBand";
import { Admissions } from "@/components/site/Admissions";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CoursePreview />
        <WhyRoots />
        <AcademicSystem />
        <Faculty />
        <FounderPreview />
        <Gallery />
        <TestimonialBand />
        <Admissions />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
