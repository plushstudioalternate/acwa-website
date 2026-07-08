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
        const x = endOffset - (1 - progress) * travel;
        track.style.transform = `translate3d(${-x}px, 0, 0)`;
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
      className="relative flex h-[75dvh] min-h-[560px] w-full flex-col justify-between overflow-hidden bg-[#D0DCDC] pb-[7dvh]! pt-[5dvh]! text-[#0d3d22]"
    >
      {/* ───────── Row 1 · "Talk to us." marquee ───────── */}
      <div className="w-full overflow-hidden">
        <div
          ref={marqueeTrackRef}
          className="relative w-max select-none whitespace-nowrap text-[11vw] font-light leading-[1.1] will-change-transform"
        >
          {/* invisible single chunk, used only for measurement */}
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

      {/* ───────── Row 2 · founder block — 25% / 75% ───────── */}
      <div className="grid w-full grid-cols-[25%_75%]">
        {/* col 1 — clip-path mark, right-aligned inside its 25% column */}
        <div className="flex justify-end pr-8!">
          <div
            style={{ clipPath: clipPathString }}
            className="h-14 w-14 flex-shrink-0 bg-[#0d3d22]"
          />
        </div>

        {/* col 2 — left-aligned, vertically stacked */}
        <div className="flex flex-col items-start pt-0.5">
          <p className="text-lg font-bold uppercase tracking-widest mt-2!">
            Ample Tiger
          </p>
          <p className="mt-0.5 text-[11px] uppercase tracking-widest opacity-70 [font-family:var(--font-abacaxi)]!">
            Founder
          </p>

          <p className="mt-7! text-lg font-[200] [font-family:var(--font-abacaxi)]">
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

      {/* ───────── Row 3 · socials + contact — 80% / 20% ───────── */}
      <div className="grid w-full grid-cols-[80%_20%] pr-[3vw] text-sm [font-family:var(--font-abacaxi)]">
        {/* col 1 — links are left-aligned, but the block sits at the end of the column */}
        <div className="flex justify-end pr-14 font-[400]">
          <ul className="flex flex-col items-start gap-y-2.5 pr-10!">
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

        {/* col 2 — contact info, phone + email grouped, address spaced below */}
        <div className="flex flex-col items-start pl-10! font-[400] [font-family:var(--font-abacaxi)]">
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