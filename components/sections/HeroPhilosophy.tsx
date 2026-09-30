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

      const createTimeline = (end: string, scrub: number) =>
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "bottom bottom",
            end,
            scrub,
            pin: true,
            anticipatePin: 1,
          },
        });

      // Desktop: image expands, heading + philosophy slide out
      mm.add("(min-width: 768px)", () => {
        createTimeline("+=100%", 1)
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

      // Mobile: shorter scroll distance + tighter scrub so the image
      // expansion feels quick and smooth. Image is in normal flow here,
      // so only width is animated (it grows to the left because of ml-auto).
      mm.add("(max-width: 767px)", () => {
        createTimeline("+=40%", 0.5)
          .to(
            imageWrapRef.current,
            { width: "100%", ease: "none", duration: 1 },
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
    <div
      ref={sectionRef}
      className="relative w-full max-w-full overflow-x-clip flex flex-col gap-10 pt-10 md:block md:gap-0 md:pt-0 md:h-[150vh] md:overflow-visible"
    >
      {/* Image
          Mobile: normal flow, right-aligned, half width (expands on scroll)
          Desktop: bottom-anchored, full 100vh height, right 50% width */}
      <div
        ref={imageWrapRef}
        className="relative order-3 ml-auto w-1/2 h-screen px-6 z-10 md:order-none md:absolute md:bottom-0 md:left-1/2 md:ml-0 md:p-6"
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

      {/* Mission + Heading
          Mobile: centered, in flow at the top, smaller heading so it fits the screen
          Desktop: overlaps top of image, wider max-width */}
      <div
        ref={headingRef}
        className="relative order-1 w-full max-w-full px-6 text-center z-20 md:order-none md:absolute md:bottom-[calc(100vh-6rem)] md:left-1/4 md:w-auto md:max-w-4xl md:px-0 md:text-left"
      >
        <p className="text-subheading uppercase font-light text-blue mb-2">
          Mission
        </p>
        <h1 className="text-[34px] sm:text-[48px] md:text-[80px] font-normal text-blue leading-[1.1]">
          Reviving India&apos;s
          <br />
          Stalled Real Estate
        </h1>
      </div>

      {/* Philosophy text
          Mobile: in flow, centered on the screen, sits between heading and image (no parallax)
          Desktop: bottom aligned with image, pushed left */}
      <div
        ref={philosophyRef}
        className="relative order-2 mx-auto w-[72%] max-w-md text-center z-20 md:order-none md:absolute md:bottom-12 md:left-16 md:mx-0 md:w-[28rem] md:max-w-none"
      >
        <p className="text-subheading uppercase font-light text-green mb-4 text-center">
          Our Philosophy
        </p>
        <p className="text-para font-normal text-green !text-center">
          India doesn&apos;t only need new real estate, it needs promised
          projects completed. Reviving existing developments is faster,
          smarter, and more valuable.
        </p>
      </div>
    </div>
  );
}