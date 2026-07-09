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

    // Mobile -> Tablet -> Desktop
    imageClass:
      "top-[220px] left-[6vw] md:top-[250px] md:left-[8vw] lg:top-[250px] lg:left-[10vw]",

    textClass:
      "top-[300px] left-[52vw] w-[42vw] md:top-[400px] md:left-[25vw] md:w-[240px] lg:top-[450px] lg:left-[25vw] lg:w-[240px]",
  },

  {
    number: "02",
    label: "Enter",
    paragraph:
      "We structure legally viable entry routes through settlements, CIRP, partnerships, or strategic capital.",
    image: "/images/model-2.png",

    imageClass:
      "top-[650px] right-[6vw] md:top-[620px] md:right-[10vw] lg:top-[270px] lg:right-[25vw]",

    textClass:
      "top-[930px] right-[6vw] w-[65vw] md:top-[900px] md:right-[10vw] md:w-[260px] lg:top-[600px] lg:right-[25vw] lg:w-[260px]",
  },

  {
    number: "03",
    label: "Execute",
    paragraph:
      "We restart movement through execution planning, funding, compliance, and operational control.",
    image: "/images/model-3.png",

    imageClass:
      "top-[1150px] left-[6vw] md:top-[1100px] md:left-[5vw] lg:top-[940px] lg:left-[2vw]",

    textClass:
      "top-[1230px] left-[52vw] w-[42vw] md:top-[1250px] md:left-[42vw] md:w-[260px] lg:top-[1100px] lg:left-[17vw] lg:w-[260px]",
  },

  {
    number: "04",
    label: "Exit",
    paragraph:
      "We create structured exits through completion, monetization, or asset stabilization.",
    image: "/images/model-4.png",

    imageClass:
      "top-[1650px] right-[6vw] md:top-[1600px] md:right-[12vw] lg:top-[1270px] lg:right-[25vw]",

    textClass:
      "top-[1930px] right-[6vw] w-[65vw] md:top-[1880px] md:right-[12vw] md:w-[240px] lg:top-[1150px] lg:right-[10vw] lg:w-[240px]",
  },
];

export default function OurModel() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      steps.forEach((_, index) => {
        const image = imageRefs.current[index];
        const text = textRefs.current[index];

        if (!image || !text) return;

        // SECOND ITEM: IMAGE + TEXT BOTH MOVE UP
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


        if (index === 3) {
          // FOURTH IMAGE → UP
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

          // FOURTH TEXT → DOWN
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
        // OTHER IMAGES MOVE DOWN
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

        // OTHER TEXTS MOVE UP
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
        md:h-[2600px]
        lg:h-[1800px]

        overflow-hidden

        bg-[#FFFDF8]
      "
    >
      {/* ============================
          HEADER
      ============================ */}

      <div
        className="
          absolute
          top-6!
          left-6
          md:top-20!
          md:left-14
          lg:left-25
          z-20
        "
      >
        <p className="text-para uppercase font-light text-orange">
          Our Model
        </p>
      </div>

      <div
        className="
          absolute

          top-20!
          left-6
          right-8

         

          md:top-12
          md:left-auto
          md:right-12
          md:max-w-md

          lg:right-[12vw]
          lg:max-w-xl

          md:text-right

          z-20
        "
      >
        <h2
          className="
            text-subheading
            md:text-heading
            lg:text-heading
            font-normal
            text-orange
            leading-tight
          "
        >
          ACWA focuses on unlocking value from projects.
        </h2>
      </div>

      {/* ============================
          STEPS
      ============================ */}

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

              lg:w-[246px]
              lg:h-[316px]

              will-change-transform

              ${step.imageClass}
            `}
          >
            <Image
              src={step.image}
              alt={step.label}
              fill
              sizes="
                (max-width: 640px) 150px,
                (max-width: 768px) 180px,
                (max-width: 1024px) 220px,
                246px
              "
              className="object-cover"
            />
          </div>

          {/* TEXT */}

          <div
            ref={(element) => {
              textRefs.current[index] = element
            }}
            className={`
              absolute

              flex!
              flex-col!
              gap-8!

              ${step.textClass}
            `}
          >
            <p className="text-grey text-xs md:text-sm mb-3 md:mb-5">
              {step.number}
            </p>

            <p
              className="
                text-base
                md:text-subheading
                uppercase
                font-light
                text-2xl!
                text-grey
                mb-2
                md:mb-3
              "
            >
              {step.label}
            </p>

            <hr className="border-t border-grey/40 w-full mb-3 md:mb-4" />

            <p
              className="
                text-sm
                md:text-para
                font-light
                text-grey
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