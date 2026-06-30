import Header from "@/components/sections/Header";
import HeroPhilosophy from "@/components/sections/HeroPhilosophy";
import MissionVision from "@/components/sections/MissionVision";
import OurTeam from "@/components/sections/OurTeam";
import FullBleedReveal from "@/components/sections/FullBleedReveal";
import OurModel from "@/components/sections/OurModel";
import ProjectsCarousel from "@/components/sections/ProjectsCarousel";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroPhilosophy />
      <MissionVision />
      <OurTeam />
      <FullBleedReveal />
      <OurModel />
      <ProjectsCarousel />
      <FooterSection />
    </main>
  );
}