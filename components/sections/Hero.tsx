// components/sections/Hero.tsx
'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({ text, className, wordClass = "" }: { text: string; className?: string, wordClass?: string }) => {
    return (
        <span className={`inline-block ${className}`}>
            {text.split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-2">
                    <span className={`inline-block twist-word opacity-0 translate-y-[120%] rotate-[15deg] origin-bottom-left ${wordClass}`}>
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
    const videoRef = useRef<HTMLVideoElement>(null);
    const fallbackImageRef = useRef<HTMLImageElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    
    const fastRef = useRef<HTMLDivElement>(null);
    const slowRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
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

        // Phase 1: Animate the Media Wrapper (Full screen to 30px margins)
        tl.to(mediaContainerRef.current, {
            top: '30px',
            left: '30px',
            width: 'calc(100vw - 60px)',
            height: 'calc(100vh - 60px)',
            duration: 1.5,
            ease: 'power2.inOut',
        })

        // We add a label right before Phase 2 starts
        .addLabel('startShrink')

        // Phase 2: Lock the wrapper to the right (Takes 1.5 seconds)
        .to(mediaContainerRef.current, {
            top: '25vh', 
            left: '55vw', 
            width: 'calc(45vw - 80px)', 
            height: '100vh', 
            duration: 1.5,
            ease: 'power3.inOut',
        }, 'startShrink')
            
        // 1. FAST FADE: Image appears almost instantly (0.2s) when shrinking starts
        .to(fallbackImageRef.current, {
            opacity: 1,
            duration: 2, 
            ease: 'none',
        }, 'startShrink')

        // 2. Hide the video behind blur instantly as well
        .to(videoRef.current, {
            filter: 'blur(10px) brightness(0.8)',
            duration: 2,
        }, 'startShrink')

       // 3. Pause the video AS SOON AS the 0.2s fade finishes
        .call(() => {
            if (!videoRef.current || !tl.scrollTrigger) return;

            if (tl.scrollTrigger.direction === 1) {
                // User is scrolling DOWN into the shrinked state
                videoRef.current.pause();
            } else {
                // User is scrolling UP back to the unshrinked state
                // If the video already finished playing previously, reset it to the start
                if (videoRef.current.ended) {
                    videoRef.current.currentTime = 0;
                }
                videoRef.current.play();
            }
        }, null, 'startShrink+=0.2')

        // Header Reveal
        .to(document.getElementById('global-header'), {
            opacity: 1,
            // ... rest of your code
                y: 0,
                pointerEvents: 'auto',
                duration: 1,
                ease: 'power3.out',
            }, '<+=0.5')

            // Final Text Reveal 
            .to('.final-twist .twist-word', {
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

    return (
        <>
            <section ref={containerRef} className="relative w-full h-[125vh] bg-[#FCFCFB] overflow-hidden">

                <div 
                    ref={mediaContainerRef} 
                    className="absolute z-10 shadow-2xl overflow-hidden rounded-xl bg-black" 
                    style={{ top: 0, left: 0, width: '100vw', height: '100vh' }}
                >
                    {/* The Video starts with 0 blur */}
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ filter: 'blur(0px) brightness(1)' }}
                        autoPlay
                        muted
                        
                        playsInline
                        src="/videos/heroVideo.mp4"
                    />
                    
                    {/* The crisp image fades in on top */}
                    <img
                        ref={fallbackImageRef}
                        src="/images/hero-bg.jpg" 
                        alt="Hero background"
                        className="absolute inset-0 w-full h-full object-cover opacity-0 z-10"
                    />
                </div>

                <div className="absolute top-0 left-0 w-full h-screen z-20 flex flex-col items-center justify-center pointer-events-none text-[#FCFCFB] text-[16px] font-[300] text-center px-4 drop-shadow-lg tracking-wide">
                    <div className="sent-1 absolute"><SplitText text="This is the first sentence." /></div>
                    <div className="sent-2 absolute"><SplitText text="Here comes the second one." /></div>
                    <div className="sent-3 absolute"><SplitText text="And the final statement." /></div>
                </div>

                <div className="absolute top-[15vh] left-[15vw] z-30 pointer-events-none w-[85vw] flex flex-col h-[100vh]">
                    <div ref={fastRef} className="parallax-fast final-twist relative z-40 w-[65vw]">
                        <div className="mb-10">
                            <SplitText
                                text="Mission"
                                wordClass="text-[#554FF1] font-[300] text-2xl tracking-widest uppercase"
                            />
                        </div>

                        <div className="whitespace-nowrap leading-[1.1]">
                            <SplitText
                                text="Reviving India’s"
                                wordClass="text-[#554FF1] text-[clamp(3rem,6vw,7rem)] font-medium"
                            />
                        </div>
                        <div className="whitespace-nowrap leading-[1.1]">
                            <SplitText
                                text="Stalled Real Estate"
                                wordClass="text-[#554FF1] text-[clamp(3rem,6vw,7rem)] font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex-grow"></div>

                    <div ref={slowRef} className="max-w-[450px] parallax-slow pointer-events-auto final-twist">
                        <div className="mb-8">
                            <SplitText
                                text="Our Philosophy"
                                wordClass="text-[#669C86] font-[300] text-2xl tracking-widest uppercase py-8!"
                            />
                        </div>
                        <div>
                            <SplitText
                                text="India doesn't only need new real estate, it needs promised projects completed. Reviving existing developments is faster, smarter, and more valuable."
                                wordClass="text-[#669C86] text-2xl leading-snug font-medium"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div ref={scrollRef} className="w-full h-[1px] invisible"></div>
        </>
    );
}