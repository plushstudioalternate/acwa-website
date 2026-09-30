"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function FullBleedReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop / tablet only: reveal animation.
      // On mobile nothing is created, so no pinning or scroll distance is added.
      mm.add("(min-width: 768px)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "center center",
              end: "+=100%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          })
          .to(imageWrapRef.current, { inset: "0%", ease: "none", duration: 1 }, 0);
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <>
      {/* MOBILE: static image, full width, natural height */}
      <div className="w-full bg-[#FFFDF8] md:hidden">
        <Image
          src="/images/enlarged image.jpg"
          alt="Full bleed reveal"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* DESKTOP / TABLET: original reveal animation */}
      <div
        ref={sectionRef}
        className="relative hidden h-[60dvh] w-full overflow-hidden bg-[#FFFDF8] md:block"
      >
        <div
          ref={imageWrapRef}
          className="absolute"
          style={{ inset: "5%" }}
        >
          <Image
            src="/images/enlarged image.jpg"
            alt="Full bleed reveal"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
}