"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    label: "Identify",
    paragraph:
      "We evaluate distressed and stalled assets with recovery potential.",
    image: "/images/model-1.png",

    imageClass: `
      top-[220px]
      left-[6vw]

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
      top-[300px]
      left-[52vw]
      w-[42vw]

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
      top-[650px]
      right-[6vw]

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
      top-[900px]
      right-[6vw]
      w-[65vw]

      sm:top-[720px]
      sm:right-[52vw]
      sm:w-[38vw]

      md:top-[750px]
      md:right-[40vw]
      md:w-[280px]

      lg:top-[600px]
      lg:right-[8vw]
      lg:w-[260px]

      xl:top-[600px]
      xl:right-[12vw]
      xl:w-[260px]

      2xl:top-[600px]
      2xl:right-[25vw]
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
      top-[1150px]
      left-[6vw]

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
      top-[1230px]
      left-[52vw]
      w-[42vw]

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
      top-[1650px]
      right-[6vw]

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
      top-[1930px]
      right-[6vw]
      w-[65vw]

      sm:top-[1520px]
      sm:right-[52vw]
      sm:w-[38vw]

      md:top-[1600px]
      md:right-[40vw]
      md:w-[280px]

      lg:top-[1130px]
      lg:right-[2vw]
      lg:w-[240px]

      xl:top-[1150px]
      xl:right-[8vw]
      xl:w-[240px]
    
      2xl:top-[1150px]
      
      2xl:w-[240px]

       min-[1688px]:right-[10vw]!
    `,
  },
];

export default function OurModel() {
  const sectionRef = useRef<HTMLElement>(null);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      steps.forEach((_, index) => {
        const image = imageRefs.current[index];
        const text = textRefs.current[index];

        if (!image || !text) return;

        /*
        ============================================
        STEP 02
        IMAGE + TEXT MOVE UP
        ============================================
        */

        if (index === 1) {
          gsap.fromTo(
            [image, text],
            {
              yPercent: 15,
            },
            {
              yPercent: -15,
              ease: "none",

              scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );

          return;
        }

        /*
        ============================================
        STEP 04
        IMAGE MOVES UP
        TEXT MOVES DOWN
        ============================================
        */

        if (index === 3) {
          gsap.fromTo(
            image,
            {
              yPercent: 15,
            },
            {
              yPercent: -15,
              ease: "none",

              scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );

          gsap.fromTo(
            text,
            {
              yPercent: -15,
            },
            {
              yPercent: 15,
              ease: "none",

              scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );

          return;
        }

        /*
        ============================================
        STEP 01 + STEP 03
        IMAGE MOVES DOWN
        TEXT MOVES UP
        ============================================
        */

        gsap.fromTo(
          image,
          {
            yPercent: -15,
          },
          {
            yPercent: 15,
            ease: "none",

            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        gsap.fromTo(
          text,
          {
            yPercent: 10,
          },
          {
            yPercent: -10,
            ease: "none",

            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
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

        h-[2400px]

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

      {/* STEPS */}

      {steps.map((step, index) => (
        <div key={step.number}>
          {/* IMAGE */}

          <div
            ref={(element) => {
              imageRefs.current[index] = element;
            }}
            className={`
              absolute

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
              absolute

              cursor-pointer

              group

              flex
              flex-col

              gap-3

              md:gap-4

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
      ))}
    </section>
  );
}