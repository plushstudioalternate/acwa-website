"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/*
  NOTE: the classes below only position items from `sm` (640px) upward.
  On phones (< 640px) the items sit in normal flow (see the JSX),
  so there are no un-prefixed top/left/right/width classes here.
*/
const steps = [
  {
    number: "01",
    label: "Identify",
    paragraph:
      "We evaluate distressed and stalled assets with recovery potential.",
    image: "/images/model-1.png",

    imageClass: `
      sm:top-[260px]
      sm:left-[6vw]

      md:top-[280px]
      md:left-[8vw]

      lg:top-[250px]
      lg:left-[8vw]

      xl:top-[250px]
      xl:left-[12vw]

      2xl:top-[250px]
      2xl:left-[10vw]
    `,

    textClass: `
      sm:top-[330px]
      sm:left-[52vw]
      sm:w-[38vw]

      md:top-[380px]
      md:left-[40vw]
      md:w-[280px]

      lg:top-[420px]
      lg:left-[32vw]
      lg:w-[240px]

      xl:top-[450px]
      xl:left-[32vw]
      xl:w-[240px]

      2xl:top-[450px]
      2xl:left-[27vw]
      2xl:w-[240px]
      min-[1688px]:left-[25vw]!
    `,
  },

  {
    number: "02",
    label: "Enter",
    paragraph:
      "We structure legally viable entry routes through settlements, CIRP, partnerships, or strategic capital.",
    image: "/images/model-2.png",

    imageClass: `
      sm:top-[650px]
      sm:right-[6vw]

      md:top-[650px]
      md:right-[8vw]

      lg:top-[270px]
      lg:right-[8vw]

      xl:top-[270px]
      xl:right-[12vw]

      2xl:top-[270px]
      2xl:right-[25vw]
    `,

    textClass: `
      sm:top-[720px]
      sm:right-[52vw]
      sm:left-auto
      sm:w-[38vw]

      md:top-[750px]
      md:right-[40vw]
      md:left-auto
      md:w-[280px]

      lg:top-[600px]
      lg:right-[8vw]
      lg:left-auto
      lg:w-[260px]

      xl:top-[600px]
      xl:right-[12vw]
      xl:left-auto
      xl:w-[260px]

      2xl:top-[600px]
      2xl:right-[25vw]
      2xl:left-auto
      2xl:w-[260px]
    `,
  },

  {
    number: "03",
    label: "Execute",
    paragraph:
      "We restart movement through execution planning, funding, compliance, and operational control.",
    image: "/images/model-3.png",

    imageClass: `
      sm:top-[1050px]
      sm:left-[6vw]

      md:top-[1080px]
      md:left-[8vw]

      lg:top-[940px]
      lg:left-[4vw]

      xl:top-[940px]
      xl:left-[5vw]

      2xl:top-[940px]
      2xl:left-[2vw]
    `,

    textClass: `
      sm:top-[1120px]
      sm:left-[52vw]
      sm:w-[38vw]

      md:top-[1180px]
      md:left-[40vw]
      md:w-[280px]

      lg:top-[1100px]
      lg:left-[27vw]
      lg:w-[260px]

      xl:top-[1100px]
      xl:left-[25vw]
      xl:w-[260px]

      2xl:top-[1100px]
      2xl:left-[20vw]
      2xl:w-[260px]
      min-[1688px]:left-[17vw]!
    `,
  },

  {
    number: "04",
    label: "Exit",
    paragraph:
      "We create structured exits through completion, monetization, or asset stabilization.",
    image: "/images/model-4.png",

    imageClass: `
      sm:top-[1450px]
      sm:right-[6vw]

      md:top-[1500px]
      md:right-[8vw]

      lg:top-[1270px]
      lg:right-[25vw]

      xl:top-[1270px]
      xl:right-[28vw]

      2xl:top-[1270px]
      2xl:right-[25vw]
    `,

    textClass: `
      sm:top-[1520px]
      sm:right-[52vw]
      sm:left-auto
      sm:w-[38vw]

      md:top-[1600px]
      md:right-[40vw]
      md:left-auto
      md:w-[280px]

      lg:top-[1130px]
      lg:right-[2vw]
      lg:left-auto
      lg:w-[240px]

      xl:top-[1150px]
      xl:right-[8vw]
      xl:left-auto
      xl:w-[240px]

      2xl:top-[1150px]
      2xl:right-[10vw]
      2xl:left-auto
      2xl:w-[240px]
    `,
  },
];

export default function OurModel() {
  const sectionRef = useRef<HTMLElement>(null);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* ==========================================
         TABLET / DESKTOP (640px and up)
         Original parallax, unchanged
         ========================================== */
      mm.add("(min-width: 640px)", () => {
        const parallax = (
          target: gsap.TweenTarget,
          trigger: Element,
          from: number,
          to: number
        ) =>
          gsap.fromTo(
            target,
            { yPercent: from },
            {
              yPercent: to,
              ease: "none",
              scrollTrigger: {
                trigger,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );

        steps.forEach((_, index) => {
          const image = imageRefs.current[index];
          const text = textRefs.current[index];

          if (!image || !text) return;

          // STEP 02: image + text move up together
          if (index === 1) {
            parallax([image, text], image, 15, -15);
            return;
          }

          // STEP 04: image moves up, text moves down
          if (index === 3) {
            parallax(image, image, 15, -15);
            parallax(text, image, -15, 15);
            return;
          }

          // STEP 01 + 03: image moves down, text moves up
          parallax(image, image, -15, 15);
          parallax(text, image, 10, -10);
        });
      });

      /* ==========================================
         MOBILE (below 640px)
         No image parallax. Only the texts move,
         all with the exact same parallax.
         ========================================== */
      mm.add("(max-width: 639px)", () => {
        textRefs.current.forEach((text) => {
          if (!text) return;

          gsap.fromTo(
            text,
            { y: 20 },
            {
              y: -20,
              ease: "none",
              scrollTrigger: {
                trigger: text,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });

      ScrollTrigger.refresh();

      return () => mm.revert();
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full

        flex
        flex-col
        gap-8
        h-auto
        pt-[200px]
        pb-12

        sm:block
        sm:gap-0
        sm:pt-0
        sm:pb-0

        sm:h-[1900px]

        md:h-[2100px]

        lg:h-[1800px]

        xl:h-[1800px]

        2xl:h-[1800px]

        overflow-hidden

        bg-[#FFFDF8]
      "
    >
      {/* HEADER */}

      <div
        className="
          absolute

          top-6
          left-6

          sm:top-12
          sm:left-10

          md:top-20
          md:left-14

          lg:left-20

          xl:left-24

          2xl:left-25

          z-20
        "
      >
        <p className="text-para uppercase font-light text-orange">
          Our Model
        </p>
      </div>

      {/* MAIN HEADING */}

      <div
        className="
          absolute

          top-20
          left-6
          right-8

          sm:top-20
          sm:left-auto
          sm:right-10
          sm:max-w-[420px]
          sm:text-right

          md:top-12
          md:right-12
          md:max-w-md

          lg:right-[8vw]
          lg:max-w-lg

          xl:right-[10vw]
          xl:max-w-xl

          2xl:right-[12vw]

          z-20
        "
      >
        <h2
          className="
            text-subheading

            sm:text-[22px]

            md:text-heading

            font-normal
            text-orange
            leading-tight
          "
        >
          ACWA focuses on unlocking value from projects.
        </h2>
      </div>

      {/* STEPS
          Mobile: each step is a row (image + text). Even steps flip sides.
          sm and up: `contents` removes the row so the absolute
          positioning works exactly as before. */}

      {steps.map((step, index) => {
        const textOnLeft = index % 2 === 1;

        return (
          <div
            key={step.number}
            className={`
              flex
              items-center
              gap-6
              px-6
              ${textOnLeft ? "flex-row-reverse" : "flex-row"}

              sm:contents
            `}
          >
            {/* IMAGE */}

            <div
              ref={(element) => {
                imageRefs.current[index] = element;
              }}
              className={`
                relative
                shrink-0

                sm:absolute

                overflow-hidden

                w-[150px]
                h-[200px]

                sm:w-[180px]
                sm:h-[230px]

                md:w-[220px]
                md:h-[280px]

                lg:w-[220px]
                lg:h-[280px]

                xl:w-[230px]
                xl:h-[295px]

                2xl:w-[246px]
                2xl:h-[316px]

                will-change-transform

                ${step.imageClass}
              `}
            >
              <Image
                src={step.image}
                alt={step.label}
                fill
                sizes="
                  (max-width: 639px) 150px,
                  (max-width: 767px) 180px,
                  (max-width: 1279px) 220px,
                  (max-width: 1535px) 230px,
                  246px
                "
                className="object-cover"
              />
            </div>

            {/* TEXT */}

            <div
              ref={(element) => {
                textRefs.current[index] = element;
              }}
              className={`
                relative
                flex-1
                min-w-0

                sm:flex-none
                sm:absolute

                cursor-pointer

                group

                flex
                flex-col

                gap-3

                md:gap-4

                ${
                  textOnLeft
                    ? "items-end text-right"
                    : "items-start text-left"
                }

                sm:items-stretch
                sm:text-left

                will-change-transform

                ${step.textClass}
              `}
            >
              <p
                className="
                  text-xs
                  md:text-sm

                  font-light

                  text-grey
                  group-hover:text-orange

                  transition-colors
                  duration-300
                "
              >
                {step.number}
              </p>

              <p
                className="
                  text-base

                  sm:text-xl

                  md:text-2xl

                  uppercase

                  font-light

                  text-grey
                  group-hover:text-orange

                  transition-colors
                  duration-300
                "
              >
                {step.label}
              </p>

              <hr
                className="
                  w-full

                  border-t
                  border-grey/40

                  group-hover:border-orange

                  transition-colors
                  duration-300
                "
              />

              <p
                className="
                  text-sm

                  md:text-para

                  font-light
                  [font-family:var(--font-abacaxi)]
                  text-grey
                  group-hover:text-orange

                  transition-colors
                  duration-300
                "
              >
                {step.paragraph}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}