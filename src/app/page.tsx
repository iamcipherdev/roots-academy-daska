import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { WhyRoots } from "@/components/site/WhyRoots";
import { AcademicSystem } from "@/components/site/AcademicSystem";
import { CoursePreview } from "@/components/site/CoursePreview";
import { Faculty } from "@/components/site/Faculty";
import { FounderPreview } from "@/components/site/FounderPreview";
import { StudentAssessment } from "@/components/site/StudentAssessment";
import { Gallery } from "@/components/site/Gallery";
import { WhyChoose } from "@/components/site/WhyChoose";
import { Admissions } from "@/components/site/Admissions";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

import { ParentPortalCTA } from "@/components/portal/ParentPortalCTA";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ParentPortalCTA />
        <WhyRoots />
        <AcademicSystem />
        <CoursePreview />
        <Faculty />
        <FounderPreview />
        <StudentAssessment />
        <Gallery />
        <WhyChoose />
        <Admissions />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
