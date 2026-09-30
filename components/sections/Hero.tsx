// components/sections/Hero.tsx
'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({
    text,
    className,
    wordClass = ""
}: {
    text: string;
    className?: string;
    wordClass?: string;
}) => {
    return (
        <span className={`inline-block ${className}`}>
            {text.split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-2">
                    <span
                        className={`inline-block twist-word opacity-0 translate-y-[120%] rotate-[15deg] origin-bottom-left ${wordClass}`}
                    >
                        {word}&nbsp;
                    </span>
                </span>
            ))}
        </span>
    );
};

export default function Hero() {

    const containerRef = useRef<HTMLDivElement>(null);
    const mediaContainerRef = useRef<HTMLDivElement>(null);
    const fallbackImageRef = useRef<HTMLImageElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const fastRef = useRef<HTMLDivElement>(null);
    const slowRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add({
            isLargeDesktop: "(min-width: 1300px)",
            isMedium: "(min-width: 768px) and (max-width: 1299px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {

            let {
                isLargeDesktop,
                isMedium
            } = context.conditions as {
                isLargeDesktop: boolean,
                isMedium: boolean,
                isMobile: boolean
            };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=5000',
                    scrub: 1,
                    pin: true,
                }
            });

            const sentences = ['.sent-1', '.sent-2', '.sent-3'];

            // Keep the existing sentence-by-sentence animation
            sentences.forEach((sentence) => {
                tl.to(`${sentence} .twist-word`, {
                    y: '0%',
                    rotation: 0,
                    opacity: 1,
                    ease: 'back.out(1.2)',
                    duration: 0.4,
                })
                    .to({}, { duration: 0.6 })
                    .to(`${sentence} .twist-word`, {
                        y: '-120%',
                        rotation: -15,
                        opacity: 0,
                        ease: 'power2.in',
                        duration: 0.4,
                    });
            });

            // Phase 1: Animate the Media Wrapper
            // Full screen to 30px margins
            tl.to(mediaContainerRef.current, {
                top: '30px',
                left: '30px',
                width: 'calc(100vw - 60px)',
                height: 'calc(100vh - 60px)',
                duration: 1.5,
                ease: 'power2.inOut',
            })
                .addLabel('startShrink');

            // Phase 2: RESPONSIVE SHRINK LOGIC
            if (isLargeDesktop) {
                // Large Desktop (>= 1300px): Original right-side lock
                tl.to(mediaContainerRef.current, {
                    top: '25vh',
                    left: '55vw',
                    width: 'calc(45vw - 80px)',
                    height: '100vh',
                    duration: 1.5,
                    ease: 'power3.inOut',
                }, 'startShrink');

            } else if (isMedium) {
                // Medium screens (< 1300px and >= 768px): Wider image
                tl.to(mediaContainerRef.current, {
                    top: '25vh',
                    left: '45vw',
                    width: 'calc(55vw - 40px)',
                    height: '100vh',
                    duration: 1.5,
                    ease: 'power3.inOut',
                }, 'startShrink');

            } else {
                // Mobile/Tablet (< 768px): Centered horizontal banner
                tl.to(mediaContainerRef.current, {
                    top: '40vh',
                    left: '10vw',
                    width: '80vw',
                    height: '35vh',
                    duration: 1.5,
                    ease: 'power3.inOut',
                }, 'startShrink');
            }

            // Header Reveal
            tl.to(document.getElementById('global-header'), {
                opacity: 1,
                y: 0,
                pointerEvents: 'auto',
                duration: 1,
                ease: 'power3.out',
            }, '<+=0.5');

            // Final Text Reveal
            tl.to('.final-twist .twist-word', {
                y: '0%',
                rotation: 0,
                opacity: 1,
                stagger: 0.03,
                ease: 'back.out(1.2)',
                duration: 0.8,
            }, '<');

            // Parallax Effects
            if (scrollRef.current && fastRef.current && slowRef.current) {

                gsap.to(fastRef.current, {
                    y: -500,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: scrollRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                });

                gsap.to(slowRef.current, {
                    y: -300,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: scrollRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                });
            }
        });

    }, { scope: containerRef });

    return (
        <>
            <section
                ref={containerRef}
                className="relative w-full h-[125vh] bg-[#FCFCFB] overflow-hidden"
            >

                <div
                    ref={mediaContainerRef}
                    className="absolute z-10 shadow-2xl overflow-hidden bg-black"
                    style={{
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh'
                    }}
                >

                    {/* Constant Hero Background Image */}
                    <img
                        ref={fallbackImageRef}
                        src="/images/acwa-building.png"
                        alt="Hero background"
                        className="absolute inset-0 w-full h-full object-cover opacity-100 z-10"
                    />

                </div>

                {/* Three Scroll-Triggered Sentences */}
                <div className="absolute top-0 left-0 w-full h-screen z-20 flex flex-col items-center justify-center pointer-events-none text-[#FCFCFB] text-[28px] font-[300] text-center px-4 drop-shadow-lg tracking-wide">

                    <div className="sent-1 absolute w-[80vw] text-center">
                        <SplitText text="We carry forward the dreams of homebuyers." />
                    </div>

                    <div className="sent-2 absolute w-[80vw] text-center">
                        <SplitText text="The effort of builders who ran out of time or cash." />
                    </div>

                    <div className="sent-3 absolute w-[80vw] text-center">
                        <SplitText text="And the hopes of communities waiting for progress." />
                    </div>

                </div>

                <div className="absolute top-[15vh] md:left-[3vw] lg:left-[15vw] left-[15vw] z-30 pointer-events-none w-[85vw] flex flex-col h-[100vh]">

                    <div
                        ref={fastRef}
                        className="parallax-fast final-twist relative z-40 w-[65vw] max-md:text-center md:text-left"
                    >

                        <div className="mb-3 md:mb-4">
                            <SplitText
                                text="Mission"
                                wordClass="text-[#554FF1] font-[300] text-[20px]! md:text-2xl tracking-widest uppercase"
                            />
                        </div>

                        <div className="whitespace-nowrap leading-[1.1]">
                            <SplitText
                                text="Reviving India’s"
                                wordClass="text-[#554FF1] text-[clamp(2rem,6vw,7rem)] font-medium"
                            />
                        </div>

                        <div className="whitespace-nowrap leading-[1.1]">
                            <SplitText
                                text="Stalled Real Estate"
                                wordClass="text-[#554FF1] text-[clamp(2rem,6vw,7rem)] font-medium"
                            />
                        </div>

                    </div>

                    <div className="flex-grow"></div>

                    {/*
                      Philosophy block.
                      Alignment: centered on mobile (max-md), left on web (md+).
                      Left edge now matches the Mission block exactly on web:
                      md -> translate-x-0 (already), lg -> translate-x-0 (was -5vw).
                      Spacing: eyebrow -> paragraph gap via mb-3 / md:mb-4.
                    */}
                    <div
                        ref={slowRef}
                        className="w-[80vw] max-w-[450px] mx-auto -translate-x-[7.5vw] parallax-slow pointer-events-auto final-twist max-md:text-center md:text-left md:mx-0 md:translate-x-0 md:w-[40vw] lg:w-full lg:translate-x-0"
                    >

                        <div className="mb-3 md:mb-4 max-md:text-center md:text-left">
                            <SplitText
                                text="Our Philosophy"
                                wordClass="text-[#669C86] font-[300] text-[20px]! md:text-2xl tracking-widest uppercase"
                            />
                        </div>

                        <div className="max-md:text-center md:text-left">
                            <SplitText
                                text="India doesn't only need new real estate, it needs promised projects completed. Reviving existing developments is faster, smarter, and more valuable."
                                wordClass="text-[#669C86] text-[18px]! md:text-2xl leading-snug font-medium"
                            />
                        </div>

                    </div>

                </div>

            </section>

            <div
                ref={scrollRef}
                className="w-full h-[1px] invisible"
            ></div>
        </>
    );
}