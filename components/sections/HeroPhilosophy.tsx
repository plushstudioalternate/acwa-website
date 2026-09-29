"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroPhilosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const createTimeline = () =>
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "bottom bottom",
            end: "+=100%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

      // Desktop: image expands, heading + philosophy slide out
      mm.add("(min-width: 768px)", () => {
        createTimeline()
          .to(
            imageWrapRef.current,
            { left: "0%", width: "100%", ease: "none", duration: 1 },
            0
          )
          .to(
            headingRef.current,
            { x: "-100%", opacity: 0, ease: "none", duration: 1 },
            0
          )
          .to(
            philosophyRef.current,
            { x: "-100%", opacity: 0, ease: "none", duration: 1 },
            0
          );
      });

      // Mobile: philosophy stays centered (no x animation on it)
      mm.add("(max-width: 767px)", () => {
        createTimeline()
          .to(
            imageWrapRef.current,
            { left: "0%", width: "100%", ease: "none", duration: 1 },
            0
          )
          .to(
            headingRef.current,
            { x: "-100%", opacity: 0, ease: "none", duration: 1 },
            0
          );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="relative w-full" style={{ height: "150vh" }}>
      {/* Image — bottom-anchored, full 100vh height, right 50% width */}
      <div
        ref={imageWrapRef}
        className="absolute bottom-0 p-6 z-10"
        style={{ left: "50%", width: "50%", height: "100vh" }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/acwa-building.png"
            alt="ACWA building facade"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Mission + Heading — overlaps top of image, wider max-width */}
      <div
        ref={headingRef}
        className="absolute bottom-[calc(100vh-6rem)] left-1/4 max-w-4xl z-20"
      >
        <p className="text-subheading uppercase font-light text-blue mb-2">
          Mission
        </p>
        <h1 className="text-[80px] font-normal text-blue leading-[1.1]">
          Reviving India&apos;s
          <br />
          Stalled Real Estate
        </h1>
      </div>

      {/* Philosophy text — bottom aligned with image, pushed further left */}
      <div
        ref={philosophyRef}
        className="absolute top-[290px] left-1/2 -translate-x-1/2 w-[72%] max-w-md z-20 text-center md:bottom-12 md:top-auto md:left-16 md:translate-x-0 md:w-auto md:text-left"
      >
        <p className="text-subheading uppercase font-light text-green mb-4">
          Our Philosophy
        </p>
        <p className="text-para font-normal text-green !text-center md:!text-left">
  India doesn&apos;t only need new real estate, it needs promised
  projects completed. Reviving existing developments is faster,
  smarter, and more valuable.
</p>
      </div>
    </div>
  );
}