import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { WhyRoots } from "@/components/site/WhyRoots";
import { AcademicSystem } from "@/components/site/AcademicSystem";
import { Programs } from "@/components/site/Programs";
import { Faculty } from "@/components/site/Faculty";
import { Results } from "@/components/site/Results";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
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
        <WhyRoots />
        <AcademicSystem />
        <Programs />
        <Faculty />
        <Results />
        <Gallery />
        <Testimonials />
        <Admissions />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
