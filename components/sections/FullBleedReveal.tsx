"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function FullBleedReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop / tablet only: small -> large scale reveal.
      // On mobile nothing is created here, so no pinning or scroll
      // distance is ever added on mobile.
      mm.add("(min-width: 768px)", () => {
        gsap.to(imageBoxRef.current, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center center",
            end: "+=100%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <>
      {/* MOBILE: static image, full width, natural height — unchanged */}
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

      {/* DESKTOP / TABLET: small -> large scale reveal */}
      <div
        ref={sectionRef}
        className="relative hidden h-[60dvh] w-full overflow-hidden bg-[#FFFDF8] md:block"
      >
        <div
          ref={imageBoxRef}
          className="absolute inset-0"
          style={{
            transform: "scale(0.75)",
            transformOrigin: "center center",
          }}
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