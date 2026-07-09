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
    image: "/images/founder-1.png",
    name: "Founder Two",
    designation: "Co-Founder",
    paragraph: "Placeholder paragraph for founder two goes here.",
  },
  {
    image: "/images/founder-1.png",
    name: "Founder Three",
    designation: "Head of Operations",
    paragraph: "Placeholder paragraph for founder three goes here.",
  },
  {
    image: "/images/founder-1.png",
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
      let slideDistance = 0;
      const ease = gsap.parseEase("power2.inOut");

      // Calculate total movement distance dynamically
      const calculateDistance = () => {
        if (!leftTextRef.current || !rightColumnRef.current) return;

        // Reset left heading transform to y: 0 so previous GSAP transforms do not affect the calculation
        gsap.set(leftTextRef.current, { y: 0 });

        const leftRect = leftTextRef.current.getBoundingClientRect();
        const imageContainer = rightColumnRef.current.querySelector(".image-container") as HTMLElement | null;
        const imageRect = imageContainer?.getBoundingClientRect();

        if (imageRect && leftRect) {
          // Total distance is the difference between right image bottom and left heading bottom
          slideDistance = Math.max(imageRect.bottom - leftRect.bottom, 0);
        }
      };

      // Run initial calculation
      calculateDistance();

      // ONE ScrollTrigger as the single source of truth
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: calculateDistance, // Recalculate measurements automatically when layout changes


        onUpdate: (self) => {
          const p = self.progress; // Normalized scroll progress (0 to 1)

          // 1. Progress left-side heading movement continuously
          if (window.innerWidth >= 1024) {
            gsap.set(leftTextRef.current, {
              y: slideDistance * p,
            });
          } else {
            gsap.set(leftTextRef.current, {
              y: 0,
            });
          }


          // 2. Progress right-side founder sequence continuously
          const totalTransitions = founders.length - 1;
          const scaledProgress = p * totalTransitions;

          founders.forEach((_, i) => {
            // Image transition reveal (linear / ease: none)
            if (i > 0) {
              const imgDist = scaledProgress - (i - 1);
              if (imgDist <= 0) {
                // Not yet entered
                gsap.set(cardRefs.current[i], { clipPath: "inset(100% 0% 0% 0%)" });
              } else if (imgDist >= 1) {
                // Fully entered
                gsap.set(cardRefs.current[i], { clipPath: "inset(0% 0% 0% 0%)" });
              } else {
                // Transitioning
                gsap.set(cardRefs.current[i], { clipPath: `inset(${(1 - imgDist) * 100}% 0% 0% 0%)` });
              }
            }

            // Paragraph transition crossfade (ease: power2.inOut)
            const pDist = scaledProgress - i;
            if (pDist <= -1) {
              // Not yet entered
              gsap.set(paraRefs.current[i], { opacity: 0, y: 20 });
            } else if (pDist > -1 && pDist < 0) {
              // Entering sequence
              const progressIn = ease(pDist + 1);
              gsap.set(paraRefs.current[i], { opacity: progressIn, y: 20 * (1 - progressIn) });
            } else if (pDist >= 0 && pDist <= 1) {
              // Leaving sequence
              const progressOut = ease(pDist);
              gsap.set(paraRefs.current[i], { opacity: 1 - progressOut, y: -20 * progressOut });
            } else {
              // Fully left
              gsap.set(paraRefs.current[i], { opacity: 0, y: -20 });
            }
          });
        },
      });
    },
    { scope: sectionRef } // Handles GSAP cleanup naturally
  );

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#FCFCFB]"
    >
      {/* Left - Horizontal padding left-48 */}
      <div ref={leftTextRef} className="
    absolute
    top-[10vh]
    left-8
    right-8
    max-w-xl
    z-20

    md:top-[10vh]
    md:left-[18vw]
    md:right-[18vw]

    lg:top-1/4
    lg:left-[20vw]
    lg:right-auto
  ">
        <p className="text-para! lg:text-3xl! text-center lg:text-left md:text-subheading uppercase font-light text-[#9995f7] mb-4">
          Our Team
        </p>
        <h2 className="text-subheading! lg:text-5xl! text-center lg:text-left pt-5! md:text-heading font-normal text-[#9995f7] leading-tight">
          Lorem ipsum dolor amet,<br/> consectetur adipiscing <br/>elit. Sed eiusmod
          tempor
        </h2>
      </div>

      {/* Right - Switched to a flex column with a responsive gap for strict spacing */}
      <div
        ref={rightColumnRef}
        className="
    absolute

    top-[30vh]
    left-1/2
    -translate-x-1/2

    w-[min(72vw,288px)]

    z-20
    flex
    flex-col
    gap-5

    md:top-[40vh]
    md:w-72

    lg:top-1/4
    lg:left-auto
    lg:translate-x-0
    lg:right-[20vw]
  "
      >
        {/* Image - .image-container class for accurate GSAP height measurement */}
        <div
          className="image-container relative w-full overflow-hidden"
          style={{ aspectRatio: "4 / 5" }}
        >
          {founders.map((founder, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{
                zIndex: i + 1,
                clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  sizes="320px"
                  className="object-cover"
                  onLoad={() => ScrollTrigger.refresh()} // Refresh triggers recalculation on layout completion
                />
                <div className="absolute bottom-5 left-4 right-4 px-6 py-5 flex justify-between items-end">
                  <p className="text-white text-xl uppercase leading-tight w-[100px] font-[200] ">
                    {founder.name}
                  </p>
                  <p className="text-white text-s uppercase leading-tight text-right w-[80px] [font-family:var(--font-abacaxi)] font-[100] ">
                    {founder.designation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paragraph - Removed fixed margin-top; relies on parent's gap for consistent spacing */}
        <div className="relative overflow-hidden w-full" style={{ height: "90px" }}>
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
        <div className="flex flex-col items-start w-full gap-8">
          <hr className="border-t border-[#666666]/40 w-full" />
          <button
            className="
    flex items-center justify-center
    w-[110px] h-[36px]
    sm:w-[125px] sm:h-[38px]
    md:w-[150px] md:h-[40px]
    px-3 sm:px-4 md:px-5
    text-[14px] sm:text-[16px] md:text-[18px]
    border border-gray-300
    bg-transparent text-gray-500
    uppercase tracking-wider
    rounded-none
    transition-colors duration-300
    hover:border-gray-400 hover:bg-black/5
  "
          >
            Know More
          </button>
        </div>
      </div>
    </div>
  );
}