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

      // Desktop: image expands, heading + philosophy slide out (unchanged)
      mm.add("(min-width: 768px)", () => {
        gsap
          .timeline({
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
      });

      // Mobile: NO pin, NO text animation. Everything scrolls normally,
      // so nothing can look like parallax. Only the image widens
      // as it scrolls into view.
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          imageWrapRef.current,
          { width: "50%" },
          {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 0.5,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="relative w-full max-w-full overflow-x-clip flex flex-col gap-6! pt-8! md:block md:gap-0! md:pt-0! md:h-[150vh] md:overflow-visible"
    >
      {/* Image
          Mobile: normal flow, right-aligned, half width (widens on scroll)
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

      {/* Mission + Heading */}
      <div
        ref={headingRef}
        className="relative order-1 w-full max-w-full px-6 text-center z-20 md:order-none md:absolute md:bottom-[calc(100vh-6rem)] md:left-1/4 md:w-auto md:max-w-4xl md:px-0 md:text-left"
      >
        <p className="text-subheading uppercase font-light text-blue max-md:text-center!">
          Mission
        </p>
        <h1 className="text-[34px] sm:text-[48px] md:text-[80px] font-normal text-blue leading-[1.1] max-md:text-center!">
          Reviving India&apos;s
          <br />
          Stalled Real Estate
        </h1>
      </div>

      {/* Philosophy text
          Mobile: in flow, centered, no animation
          Desktop: bottom aligned with image, pushed left */}
      <div
        ref={philosophyRef}
        className="relative order-2 mx-auto self-center w-[72%] max-w-md text-center z-20 md:order-none md:absolute md:bottom-12 md:left-1/4 md:mx-0 md:w-[28rem] md:max-w-none md:text-left"
      >
        <p className="text-subheading uppercase font-light text-green text-center md:text-left">
          Our Philosophy
        </p>
        <p className="text-para font-normal text-green text-center md:text-left">
          India doesn&apos;t only need new real estate, it needs promised
          projects completed. Reviving existing developments is faster,
          smarter, and more valuable.
        </p>
      </div>
    </div>
  );
}