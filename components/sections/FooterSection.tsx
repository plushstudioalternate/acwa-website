"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHRASE = "Talk to us.";
const GAP = "\u00A0\u00A0\u00A0";
const CHUNK = PHRASE + GAP;
const REPEATS = 14;

export default function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  const clipPathString =
    "polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 15% 100%, 0% 85%)";

  useGSAP(
    () => {
      const track = marqueeTrackRef.current;
      const measure = measureRef.current;
      if (!track || !measure) return;

      let travel = 0;
      let endOffset = 0;
      let progress = 0;

      const apply = () => {
        // slides from (endOffset - travel) to endOffset as progress goes 0 → 1
        const leftGap = 40;
        const x = endOffset - (1 - progress) * travel;
        track.style.transform = `translate3d(${-x + leftGap}px, 0, 0)`;
      };

      /**
       * 1. Sizes the type so exactly two full "Talk to us." phrases
       *    (plus the gap between them) fit the viewport width.
       * 2. Anchors the END position to a chunk boundary, so no matter how
       *    short the travel distance is, the marquee always comes to rest
       *    showing 2 complete phrases.
       */
      const fit = () => {
        track.style.fontSize = ""; // reset to base size before measuring
        const baseChunk = measure.getBoundingClientRect().width; // phrase + gap
        const baseFont = parseFloat(getComputedStyle(track).fontSize);

        const scale = (window.innerWidth * 0.995) / (2 * baseChunk);
        track.style.fontSize = `${baseFont * scale}px`;

        const chunk = baseChunk * scale;

        // Total drift over the whole scroll. Was ~1200px — now 3× slower.
        // This one number is the speed dial: lower = slower.
        travel = 400;

        // End must land exactly on a chunk boundary (2 complete phrases);
        // the start is simply wherever `travel` px before that boundary is.
        endOffset = Math.ceil(travel / chunk) * chunk;
        apply();
      };

      fit();

      ScrollTrigger.create({
        trigger: footerRef.current, // the footer itself — no dependency on <main>
        
        start: "top bottom", // begins as the footer enters the viewport
        end: "bottom bottom", // done once the footer is fully in view
        scrub: true, // movement is driven purely by scroll (faster scroll = faster marquee)
        onRefreshInit: fit, // re-measure on resize / refresh
        onUpdate: (self) => {
          progress = self.progress;
          apply();
        },
        onRefresh: (self) => {
          progress = self.progress;
          apply();
        },
        refreshPriority: 0,
      });

      // Webfont metrics can shift after load — re-measure once fonts are ready
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      ScrollTrigger.sort();
requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: footerRef }
  );

  return (
        <footer
      ref={footerRef}
      className="relative flex h-[75dvh] min-h-[560px] w-full flex-col justify-between overflow-hidden bg-[#D0DCDC] pb-[7dvh]! pt-[5dvh]! text-[#005B36] px-6 md:px-0"
    >
      {/* ───────── Row 1 · "Talk to us." marquee ───────── */}
      <div className="w-full overflow-hidden">
        <div
          ref={marqueeTrackRef}
          className="relative w-max select-none whitespace-nowrap text-[11vw] font-light leading-[1.1] will-change-transform"
        >
          <span
            ref={measureRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 opacity-0"
          >
            {CHUNK}
          </span>
          <span aria-hidden="true">{CHUNK.repeat(REPEATS)}</span>
        </div>
      </div>

     {/* ───────── Row 2 · founder block ───────── */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[25%_75%] md:gap-0 mt-10 md:mt-0">
        {/* col 1 — Centered on mobile, right-aligned on desktop */}
        <div className="flex justify-center md:justify-end md:pr-8!">
          <div
            style={{ clipPath: clipPathString }}
            className="h-14 w-14 flex-shrink-0 bg-[#005B36]"
          />
        </div>

        {/* col 2 — Centered on mobile, left-aligned on desktop */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left md:pt-0.5">
          <p className="mt-1! text-2xl font-bold uppercase tracking-widest">
            Ample Tiger
          </p>
          <p className="mt-0.5 font-semibold uppercase tracking-widest text-[12px] opacity-70 [font-family:var(--font-abacaxi)]!">
            Founder
          </p>

          <p className="mt-7! text-lg font-[400] [font-family:var(--font-abacaxi)]">
            &ldquo;Revival is responsibility.&rdquo;
          </p>

          <a
            href="#"
            className="mt-10! pb-0.5 text-[12px] font-semibold uppercase tracking-widest"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* ───────── Row 3 · socials + contact ───────── */}
      <div className="grid w-full grid-cols-1 gap-10 text-sm md:grid-cols-[80%_20%] md:gap-0 md:pr-[3vw] mt-12 md:mt-0 [font-family:var(--font-abacaxi)]">
        
        {/* col 1 — Centered on mobile, right-aligned on desktop */}
        <div className="flex justify-center font-[400] md:justify-end md:pr-14">
          <ul className="flex flex-col items-center md:items-start gap-y-2.5 md:pr-10!">
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* col 2 — Centered on mobile, left-aligned on desktop */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left font-[400] md:pl-10! [font-family:var(--font-abacaxi)]">
          <a href="tel:+919811303960">+91 9811303960</a>
          <a href="mailto:info@acwa.co.in" className="mt-0.5">
            info@acwa.co.in
          </a>
          <p className="mt-5!">A-152, sector 136, Noida</p>
        </div>
      </div>
    </footer>
  );
}