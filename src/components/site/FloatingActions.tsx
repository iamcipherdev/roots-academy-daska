"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CONTACT } from "@/lib/site-data";

/** Floating action group: WhatsApp admission inquiry + quick call + back-to-top. */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mobile bottom bar (thumb-friendly) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2.5 backdrop-blur md:hidden">
        <div className="flex gap-2.5">
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
              "Assalam-o-Alaikum! I want to ask about admission at Roots Academy of Sciences, Daska."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#1da851] text-[14.5px] font-bold text-white shadow-md active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            WhatsApp Admission
          </a>
          <a
            href={`tel:+92${CONTACT.primaryPhone.replace(/-/g, "").slice(1)}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md active:scale-[0.98]"
            aria-label={`Call ${CONTACT.primaryPhone}`}
          >
            <Phone className="h-5 w-5" aria-hidden />
          </a>
        </div>
      </div>

      {/* Desktop floating buttons */}
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 md:flex">
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-card transition-colors hover:bg-secondary"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" aria-hidden />
            </motion.button>
          )}
        </AnimatePresence>

        <a
          href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
            "Assalam-o-Alaikum! I want to ask about admission at Roots Academy of Sciences, Daska."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-full bg-[#1da851] py-3 pl-4 pr-5 text-white shadow-xl shadow-[#1da851]/30 transition-all hover:-translate-y-0.5 hover:shadow-2xl"
          aria-label="WhatsApp admission inquiry"
        >
          <MessageCircle className="h-6 w-6" aria-hidden />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[14px] font-bold transition-all duration-300 group-hover:max-w-[180px]">
            Admission Inquiry
          </span>
        </a>
      </div>

      {/* spacer so mobile bottom bar never covers footer content */}
      <div className="h-[68px] md:hidden" aria-hidden />
    </>
  );
}
