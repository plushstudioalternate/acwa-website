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
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      }).to(
        imageWrapRef.current,
        { inset: "0%", ease: "none", duration: 1 },
        0
      );
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#FFFDF8]"
    >
      <div
        ref={imageWrapRef}
        className="absolute"
        style={{ inset: "5%" }}
      >
        <Image
          src="/images/full-bleed.png"
          alt="Full bleed reveal"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}