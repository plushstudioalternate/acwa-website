import Image from "next/image";

export default function MissionVision() {
  return (
    <section className="relative w-full" style={{ paddingTop: "200px" }}>
      {/* Mission - moved down, can overlay image */}
      <div className="absolute top-30  md:top-12 flex flex-col gap-4!  md:gap-6! left-10 xl:top-40   md:left-[60vw]!  xl:left-[50vw]!  xl:translate-x-0  sm:left-[50vw]!  w-1/3! md:w-1/3! lg:w-1/4 z-20">
        <p className="text-[18px] sm:text-subheading md:text-subheading lg:text-subheading xl:text-subheading uppercase font-light text-grey mb-4">
          Mission
        </p>
        <hr className="border-t border-grey/40 w-full mb-8" />
        <p className=" text-[14px] sm:text-thin  md:text-para lg:text-para [font-family:var(--font-abacaxi)] xl:text-para font-normal text-grey">
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

        {/* Vision - overlaid on the image */}
        <div className="absolute w-1/3  flex flex-col gap-4! md:gap-6  -top-20 right-5  md:left-[60vw]!  xl:top-48 xl:left-[50vw]! xl:translate-x-0   sm:top-15 sm:left-1/2!   z-20">
          <p className="text-[18px] sm:text-subheading md:text-subheading lg:text-subheading xl:text-subheading uppercase font-light text-grey mb-4">
            Vision
          </p>
          <hr className="border-t border-grey/40 w-full mb-8" />
          <p className="text-[14px] sm:text-thin md:text-para lg:text-para [font-family:var(--font-abacaxi)] font-normal text-grey">
            To become India&apos;s leading platform for real estate revival
            and project completion.
          </p>
        </div>

        {/* Bottom overlay text */}
        <div className="absolute bottom-10   left-1/2 -translate-x-1/2 xl:left-1/2 xl:translate-x-0 md:-translate-x-1/2 lg:-translate-x-1/2  sm:left-1/2 sm:-translate-x-1/2 w-1/2 lg:w-1/3 z-20">
          <p className="text-[14px] sm:text-thin md:text-para xl:text-para  font-normal text-white">
            We work on India&apos;s most complex real estate situations,
            reviving projects through capital deployment, restructuring, and
            on-ground execution.
          </p>
        </div>
      </div>
    </section>
  );
}