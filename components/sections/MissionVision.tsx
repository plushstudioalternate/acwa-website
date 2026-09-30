import Image from "next/image";

export default function MissionVision() {
  return (
    <section className="relative w-full sm:pt-[180px] md:pt-[200px]">
      {/* MOBILE ONLY: Mission + Vision side by side in one row */}
      <div className="flex items-start gap-4 px-5 pt-2 pb-6 sm:hidden">
        <div className="flex w-1/2 flex-col gap-3 text-center">
          <p className="text-[18px] uppercase font-light text-grey mb-2 text-center">
            Mission
          </p>
          <hr className="border-t border-grey/40 w-full mb-4" />
          <p className="text-[14px] [font-family:var(--font-abacaxi)] font-normal text-grey text-center">
            To revive viable stalled projects through structured execution and
            responsible recovery.
          </p>
        </div>

        <div className="flex w-1/2 flex-col gap-3 text-center">
          <p className="text-[18px] uppercase font-light text-grey mb-2 text-center">
            Vision
          </p>
          <hr className="border-t border-grey/40 w-full mb-4" />
          <p className="text-[14px] [font-family:var(--font-abacaxi)] font-normal text-grey text-center">
            To become India&apos;s leading platform for real estate revival
            and project completion.
          </p>
        </div>
      </div>

      {/* Mission (sm and up) */}
      <div className="absolute top-2 md:top-12 hidden sm:flex flex-col gap-3! left-5 xl:top-40 md:left-[55vw]! xl:left-[55vw]! xl:translate-x-0 sm:left-[55vw]! w-[42%]! md:w-1/3! lg:w-1/3 z-20 text-left">
        <p className="text-[18px] sm:text-subheading md:text-subheading lg:text-subheading xl:text-subheading uppercase font-light text-grey text-left">
          Mission
        </p>
        <hr className="border-t border-grey/40 w-full" />
        <p className="text-[14px] sm:text-thin md:text-para lg:text-para [font-family:var(--font-abacaxi)] xl:text-para font-normal text-grey text-left">
          To revive viable stalled projects through structured execution and
          responsible recovery.
        </p>
      </div>

      {/* Image - full width, natural height */}
      <div className="relative w-full">
        <Image
          src="/images/construction-site.png"
          alt="Construction site"
          width={1920}
          height={1080}
          className="w-full h-auto"
        />

        {/* Vision (sm and up) */}
        <div className="absolute w-[42%] md:w-1/3 hidden sm:flex flex-col gap-3! -top-[172px] right-5 md:left-[55vw]! xl:top-48 xl:left-[55vw]! xl:translate-x-0 sm:top-15 sm:left-[55vw]! z-20 text-left">
          <p className="text-[18px] sm:text-subheading md:text-subheading lg:text-subheading xl:text-subheading uppercase font-light text-grey text-left">
            Vision
          </p>
          <hr className="border-t border-grey/40 w-full" />
          <p className="text-[14px] sm:text-thin md:text-para lg:text-para [font-family:var(--font-abacaxi)] font-normal text-grey text-left">
            To become India&apos;s leading platform for real estate revival
            and project completion.
          </p>
        </div>

        {/* Bottom overlay text */}
        <div className="absolute bottom-10 md:left-[55vw]! xl:left-[55vw]! xl:translate-x-0 sm:left-[55vw]! sm:-translate-x-0 left-1/2 -translate-x-1/2 w-[85%] lg:w-[36%] z-20 text-center sm:text-left">
          <p className="text-[14px] sm:text-thin md:text-para xl:text-para font-normal text-white text-center sm:text-left">
            We work on India&apos;s most complex real estate situations,
            reviving projects through capital deployment, restructuring, and
            on-ground execution.
          </p>
        </div>
      </div>
    </section>
  );
}