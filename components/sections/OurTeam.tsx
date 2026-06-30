"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    image: "/images/founder-1.png",
    name: "Name of Founder",
    designation: "Senior Designer",
    paragraph:
      "To become India's leading platform for real estate revival and project completion.",
  },
  {
    image: "/images/founder-2.png",
    name: "Founder Two",
    designation: "Co-Founder",
    paragraph: "Placeholder paragraph for founder two goes here.",
  },
  {
    image: "/images/founder-3.png",
    name: "Founder Three",
    designation: "Head of Operations",
    paragraph: "Placeholder paragraph for founder three goes here.",
  },
  {
    image: "/images/founder-4.png",
    name: "Founder Four",
    designation: "Lead Architect",
    paragraph: "Placeholder paragraph for founder four goes here.",
  },
];

export default function OurTeam() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useGSAP(
    () => {
      // Calculate exact slide distance: bottom of right column - bottom of left text,
      // both measured from their shared top-1/4 starting point
      const leftHeight = leftTextRef.current?.offsetHeight ?? 0;
      const rightHeight = rightColumnRef.current
        ? rightColumnRef.current.querySelector("img")?.parentElement
            ?.parentElement?.offsetHeight ?? 0
        : 0;

      // Simplify: just measure the full right column height vs left text height
      const rightColumnHeight = rightColumnRef.current?.offsetHeight ?? 0;
      const slideDistance = Math.max(rightColumnHeight - leftHeight, 0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        leftTextRef.current,
        { y: slideDistance, ease: "none", duration: 3 },
        0
      );

      founders.forEach((_, i) => {
        if (i === 0) return;
        const stageStart = i - 1;

        tl.to(
          cardRefs.current[i - 1],
          { y: "-40px", opacity: 0, ease: "none", duration: 0.5 },
          stageStart
        )
          .fromTo(
            cardRefs.current[i],
            { y: "40px", opacity: 0 },
            { y: "0px", opacity: 1, ease: "none", duration: 0.5 },
            stageStart
          )
          .to(
            paraRefs.current[i - 1],
            { y: "-20px", opacity: 0, ease: "none", duration: 0.5 },
            stageStart
          )
          .fromTo(
            paraRefs.current[i],
            { y: "20px", opacity: 0 },
            { y: "0px", opacity: 1, ease: "none", duration: 0.5 },
            stageStart
          );
      });
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#FFFDF8]"
    >
      {/* Left - Our Team heading, slides down across the pin */}
      <div ref={leftTextRef} className="absolute top-1/4 left-16 max-w-xl z-20">
        <p className="text-subheading uppercase font-light text-blue mb-4">
          Our Team
        </p>
        <h2 className="text-heading font-normal text-blue leading-tight">
          Lorem ipsum dolor amet, consectetur adipiscing elit. Sed eiusmod
          tempor
        </h2>
      </div>

      {/* Right - stacked founder cards */}
      <div ref={rightColumnRef} className="absolute top-1/4 right-16 w-64 z-20">
        {/* Image - 2:3 aspect ratio */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "2 / 3" }}
        >
          {founders.map((founder, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 px-6 py-5 flex justify-between items-end">
                  <p className="text-white text-xs font-semibold uppercase leading-tight">
                    {founder.name}
                  </p>
                  <p className="text-white text-xs uppercase leading-tight text-right">
                    {founder.designation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paragraph */}
        <div className="relative mt-16 overflow-hidden" style={{ height: "100px" }}>
          {founders.map((founder, i) => (
            <p
              key={i}
              ref={(el) => {
                paraRefs.current[i] = el;
              }}
              className="absolute inset-0 text-para font-normal text-grey"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {founder.paragraph}
            </p>
          ))}
        </div>

        {/* Divider + button */}
        <hr className="border-t border-grey/40 w-full mt-16 mb-8" />
        <button className="border border-grey text-grey text-xs uppercase tracking-wide px-8 py-4">
          Know More
        </button>
      </div>
    </div>
  );
}