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
    paragraph: "We evaluate distressed and stalled assets with recovery potential.",
    image: "/images/model-1.png",
    imageStyle: { top: "250px", left: "80px" },
    textStyle: { top: "270px", left: "380px", width: "240px" },
  },
  {
    number: "02",
    label: "Enter",
    paragraph:
      "We structure legally viable entry routes through settlements, CIRP, partnerships, or strategic capital.",
    image: "/images/model-2.png",
    imageStyle: { top: "270px", left: "960px" },
    textStyle: { top: "650px", left: "960px", width: "260px" },
  },
  {
    number: "03",
    label: "Execute",
    paragraph:
      "We restart movement through execution planning, funding, compliance, and operational control.",
    image: "/images/model-3.png",
    imageStyle: { top: "940px", left: "20px" },
    textStyle: { top: "980px", left: "320px", width: "260px" },
  },
  {
    number: "04",
    label: "Exit",
    paragraph:
      "We create structured exits through completion, monetization, or asset stabilization.",
    image: "/images/model-4.png",
    imageStyle: { top: "1270px", left: "740px" },
    textStyle: { top: "1300px", left: "1020px", width: "240px" },
  },
];

export default function OurModel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
  () => {
    imageRefs.current.forEach((img) => {
      if (!img) return;
      gsap.to(img, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  },
  { scope: sectionRef }
);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-[#FFFDF8]"
      style={{ height: "1600px" }}
    >
      {/* Header */}
      <div className="absolute top-12 left-16 z-20">
        <p className="text-subheading uppercase font-light text-orange">
          Our Model
        </p>
      </div>
      <div className="absolute top-12 right-16 max-w-xl text-right z-20">
        <h2 className="text-heading font-normal text-orange leading-tight">
          ACWA focuses on unlocking value from projects.
        </h2>
      </div>

      {/* Steps */}
      {steps.map((step, i) => (
        <div key={i}>
          {/* Image - parallax */}
          <div
  ref={(el) => {
    imageRefs.current[i] = el;
  }}
  className="absolute overflow-hidden"
  style={{
    top: step.imageStyle.top,
    left: step.imageStyle.left,
    width: "246px",
    height: "316px",
  }}
>
            <Image
              src={step.image}
              alt={step.label}
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>

          {/* Text block - normal scroll, no parallax */}
          <div
            className="absolute"
            style={{
              top: step.textStyle.top,
              left: step.textStyle.left,
              width: step.textStyle.width,
            }}
          >
            <p className="text-grey text-sm mb-2">{step.number}</p>
            <p className="text-subheading uppercase font-light text-grey mb-3">
              {step.label}
            </p>
            <hr className="border-t border-grey/40 w-full mb-4" />
            <p className="text-para font-normal text-grey">{step.paragraph}</p>
          </div>
        </div>
      ))}
    </div>
  );
}