"use client";

import Image from "next/image";
import { GraduationCap, BookOpen, Award, Info } from "lucide-react";
import { CONTACT, FACULTY } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

export function Faculty() {
  return (
    <section id="faculty" className="section-pad bg-brand-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Faculty"
          title="Guided by qualified"
          highlight="subject specialists"
          description="Roots Academy's academic programs are supervised by Dr. Mohsin Ali (PhD Physics), with specialist teachers leading each course. Profiles below are verified from the academy's official posters."
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 lg:gap-6">
          {FACULTY.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.1}>
              <article className="group h-full overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
                {/* photo */}
                <div className="relative aspect-[4/3.4] overflow-hidden bg-secondary">
                  <Image
                    src={member.photo}
                    alt={`${member.name} — ${member.qualification}, ${member.subject} teacher at Roots Academy Daska`}
                    fill
                    sizes="(max-width: 640px) 100vw, 420px"
                    className="photo object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary shadow-sm">
                    {member.role}
                  </span>
                </div>

                {/* details */}
                <div className="p-6">
                  <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                    {member.name}
                  </h3>
                  <ul className="mt-3 space-y-2 text-[14px] text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <span className="font-bold text-foreground">{member.qualification}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                      {member.subject}
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                      {CONTACT.shortName} faculty — verified profile
                    </li>
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18} className="mt-8">
          <p className="mx-auto flex max-w-3xl items-start gap-2.5 rounded-2xl bg-white px-5 py-4 text-[13px] leading-relaxed text-muted-foreground ring-1 ring-border">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>
              Only faculty members publicly announced by the academy are shown here. Additional
              subject teachers introduce themselves in class — full profiles will be added as the
              academy publishes them.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
