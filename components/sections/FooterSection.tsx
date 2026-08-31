"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHRASE = "Talk to us.";
const GAP = "\u00A0\u00A0";
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
        const leftGap = 40;
        const x = endOffset - (1 - progress) * travel;
        track.style.transform = `translate3d(${-x + leftGap}px, 0, 0)`;
      };

      const fit = () => {
        track.style.fontSize = "";
        const baseChunk = measure.getBoundingClientRect().width;
        const baseFont = parseFloat(getComputedStyle(track).fontSize);

        const scale = (window.innerWidth * 0.995) / (2 * baseChunk);
        track.style.fontSize = `${baseFont * scale}px`;

        const chunk = baseChunk * scale;
        travel = 400;
        endOffset = Math.ceil(travel / chunk) * chunk;
        apply();
      };

      fit();

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        onRefreshInit: fit,
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

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      ScrollTrigger.sort();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative flex h-auto md:h-[75dvh] min-h-[560px] md:min-h-[560px] w-full flex-col justify-start md:justify-between overflow-hidden bg-[#D0DCDC] pb-[7dvh]! pt-[5dvh]! text-[#005B36] px-6 md:px-0"
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
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[25%_75%] md:gap-0 mt-64 md:mt-0">
        {/* col 1 */}
        <div className="flex justify-center md:justify-end md:pr-8!">
          <div
            style={{ clipPath: clipPathString }}
            className="h-14 w-14 flex-shrink-0 bg-[#005B36]"
          />
        </div>

        {/* col 2 */}
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

            <a href="#" className="mt-10! pb-0.5 text-[12px] font-semibold uppercase tracking-widest">
  Get in touch
</a>
        </div>
      </div>

      {/* ───────── Row 3 · socials + contact ───────── */}
      <div className="grid w-full grid-cols-1 gap-10 text-sm md:grid-cols-[80%_20%] md:gap-x-16 md:gap-y-0 md:pr-[3vw] mt-12 md:mt-0 [font-family:var(--font-abacaxi)]">

        {/* col 1 — on mobile: centered. on desktop: right-aligned but shifted slightly left */}
        <div className="flex justify-center font-[400] md:justify-end">
          <ul className="flex flex-col items-center md:items-start gap-y-2.5">
            <li>
              <a
                href="https://in.linkedin.com/company/acwa-reviving-real-estate"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/acwa.in?igsh=MWoxZmg3ZGJzbnhl&igsi=MWoxZmg3ZGJzbnhl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/919811303960"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* col 2 — on mobile: centered. on desktop: left-aligned, gap matched to col 1 */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left font-[400] [font-family:var(--font-abacaxi)] gap-y-2.5">
          <a href="tel:+919811303960">+91 9811303960</a>
          <a href="mailto:info@acwa.co.in">
            info@acwa.co.in
          </a>
          <a
            href="https://maps.app.goo.gl/EL4VEydP4GK5MqMh8?g_st=iw"
            target="_blank"
            rel="noopener noreferrer"
          >
            A-152, sector 136, Noida
          </a>
        </div>
      </div>
    </footer>
  );
}
