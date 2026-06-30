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
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "+=100%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
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
        className="absolute bottom-12 left-16 max-w-md z-20"
      >
        <p className="text-subheading uppercase font-light text-green mb-4">
          Our Philosophy
        </p>
        <p className="text-para font-normal text-green">
          India doesn&apos;t only need new real estate, it needs promised
          projects completed. Reviving existing developments is faster,
          smarter, and more valuable.
        </p>
      </div>
    </div>
  );
}