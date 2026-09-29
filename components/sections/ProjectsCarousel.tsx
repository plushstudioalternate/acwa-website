"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface CarouselItem {
    id: number;
    category: string;
    title: string;
    bgImage: string;
    fgImage: string;
}

// Sample data matching the layout structure in your screenshot
const dummyData: CarouselItem[] = [
    {
        id: 1,
        category: "Pune",
        title: "Miro",
        bgImage: "/images/project-miro-bg.png",
        fgImage: "/images/project-miro-fg.png",
    },
    {
        id: 2,
        category: "Energy & Climate",
        title: "NYMA",
        bgImage: "/images/project-nyma-bg.png",
        fgImage: "/images/project-nyma-fg.png",
    },
    {
        id: 3,
        category: "Eco Architecture",
        title: "Urban Green",
        bgImage: "/images/model-2.png",
        fgImage: "/images/model-2.png",
    },
];

export default function ProjectsCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        const slides = slidesRef.current;

        if (!container || slides.length === 0) return;

        const totalSlides = slides.length;

        // gsap.context so cleanup only removes THIS component's triggers
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: `+=${totalSlides * 100}%`,
                    pin: true,
                    scrub: 0.3,
                    invalidateOnRefresh: true,
                },
            });

            slides.forEach((slide, index) => {
                if (index === 0) return; // Slide 0 starts completely visible

                // Hold the previous slide
                tl.to({}, { duration: 0.5 });

                // Slide transition
                tl.fromTo(
                    slide,
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        ease: "none",
                        duration: 1,
                    }
                );
            });

            // Final hold
            tl.to({}, { duration: 0.5 });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        // Mobile only: negative top margin pulls the section up (adjust -mt-16 as needed).
        // md and above: no change (md:mt-0).
        <div className="-mt-86 md:mt-0">
            <div
                ref={containerRef}
                className="relative w-full h-screen overflow-hidden bg-black select-none"
            >
                {dummyData.map((item, index) => (
                    <div
                        key={item.id}
                        ref={(el) => {
                            if (el) slidesRef.current[index] = el;
                        }}
                        className="absolute inset-0 w-full h-full overflow-hidden will-change-transform bg-black"
                        style={{ zIndex: index + 1 }}
                    >
                        {/* Background Image: full width, auto height, never cropped */}
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                            <img
                                src={item.fgImage}
                                alt={item.title}
                                className="w-full h-auto max-h-full object-contain brightness-[0.7]"
                            />
                        </div>

                        {/* Foreground UI Layer */}
                        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 items-center z-10 px-8 md:px-12 lg:px-20">

                            {/* Left Column */}
                            <div className="flex items-center lg:justify-start! lg:pl-40! pl-0! justify-center! h-full">
                                <div className="text-white mix-blend-difference">
                                    <span className="text-sm md:text-base font-medium opacity-80 uppercase tracking-wider block">
                                        {item.category}
                                    </span>

                                    <h2 className="text-5xl md:text-8xl -ml-[3px]! md:-ml-[8px]! font-[100] max-w-[150px] md:max-w-[250px] tracking-tight">
                                        {item.title}
                                    </h2>

                                    <Link
                                        style={{
                                            display: "block",
                                            marginTop: "100px",
                                        }}
                                        href="/projects"
                                        className="block mt-[100px] md:mt-[120px] lg:mt-[180px] text-[12px] font-light uppercase"
                                    >
                                        VIEW ALL PROJECTS
                                    </Link>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex items-center justify-center h-full">
                                {/* Fixed width, auto height: the full image is always visible */}
                                <div className="w-[280px] sm:w-[350px] lg:w-[450px] shadow-2xl rounded-sm overflow-hidden border border-white/10">
                                    <img
                                        src={item.fgImage}
                                        alt={`${item.title} detail`}
                                        className="block w-full h-auto"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}