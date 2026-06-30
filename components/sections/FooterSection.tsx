"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const footerRef = useRef<HTMLElement | null>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  const clipPathString =
    "polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 15% 100%, 0% 85%)";

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (marqueeTrackRef.current) {
            const distance = self.progress * 1000; // total px travel, 0 -> 1000
            marqueeTrackRef.current.style.transform = `translateX(-${distance}px)`;
          }
        },
      });
    },
    { scope: footerRef }
  );

  const chunk = "Talk to us.\u00A0\u00A0\u00A0";
  const repeated = chunk.repeat(12);

  return (
    <footer
      ref={footerRef as React.RefObject<HTMLElement>}
      className="relative w-full min-h-[100dvh] bg-[#D0DCDC] text-[#0d3d22] overflow-hidden"
    >
      <div className="w-full pt-580">
        <div
          ref={marqueeTrackRef}
          className="whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          <span className="text-[11vw] font-light leading-[1.1] select-none">
            {repeated}
          </span>
        </div>
      </div>

      {/* Ample Tiger block */}
      <div className="absolute left-[15%] top-[45%] flex items-start gap-5 z-10">
        <div
          style={{ clipPath: clipPathString }}
          className="w-14 h-14 bg-[#0d3d22] flex-shrink-0"
        />
        <div>
          <p className="font-semibold text-sm tracking-widest uppercase">
            Ample Tiger
          </p>
          <p className="text-[11px] tracking-widest uppercase opacity-50 mt-0.5">
            Founder
          </p>
          <p className="mt-4 text-lg italic">&quot;Revival is responsibility.&quot;</p>
          <p className="mt-5 text-[11px] tracking-widest uppercase font-semibold border-b border-[#0d3d22]/50 pb-0.5 w-fit cursor-pointer">
            Get in touch
          </p>
        </div>
      </div>

      {/* Contact menu - bottom right */}
      <div className="absolute bottom-16 right-[4vw] z-10">
        <div className="grid grid-cols-2 gap-x-16 gap-y-1.5 text-sm">
          <span>LinkedIn</span> <span>+91 9811303960</span>
          <span>Instagram</span> <span>info@acwa.co.in</span>
          <span>Whatsapp</span> <span>A-152, sector 136, Noida</span>
        </div>
      </div>
    </footer>
  );
}