import Image from "next/image";

export default function MissionVision() {
  return (
    <section className="relative w-full" style={{ paddingTop: "200px" }}>
      {/* Mission - moved down, can overlay image */}
      <div className="absolute top-40 left-1/2 w-1/4 z-20">
        <p className="text-subheading uppercase font-light text-grey mb-4">
          Mission
        </p>
        <hr className="border-t border-grey/40 w-full mb-8" />
        <p className="text-para font-normal text-grey">
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
        <div className="absolute top-48 left-1/2 w-1/4 z-20">
          <p className="text-subheading uppercase font-light text-grey mb-4">
            Vision
          </p>
          <hr className="border-t border-grey/40 w-full mb-8" />
          <p className="text-para font-normal text-grey">
            To become India&apos;s leading platform for real estate revival
            and project completion.
          </p>
        </div>

        {/* Bottom overlay text */}
        <div className="absolute bottom-20 left-1/2 w-1/3 z-20">
          <p className="text-para font-normal text-white">
            We work on India&apos;s most complex real estate situations,
            reviving projects through capital deployment, restructuring, and
            on-ground execution.
          </p>
        </div>
      </div>
    </section>
  );
}