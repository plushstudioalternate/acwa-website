import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import MissionVision from "@/components/sections/MissionVision";
// import OurTeam from "@/components/sections/OurTeam";
import OurModel from "@/components/sections/OurModel";
// import ProjectsCarousel from "@/components/sections/ProjectsCarousel";
import FullBleedReveal from "@/components/sections/FullBleedReveal";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main className="relative bg-[#FCFCFB]">
      <Header />
      <Hero />
      <MissionVision />
      <OurModel />
      <FullBleedReveal />
      <FooterSection />
    </main>
  );
}