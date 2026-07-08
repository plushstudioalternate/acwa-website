// components/sections/Header.tsx
import Image from "next/image";

export default function Header() {
  return (
    <header
      id="global-header" 
      // Flattened structure: flex with justify-between evenly spaces all direct children.
      // Generous padding around the entire header.
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16! py-6! opacity-0 translate-y-4 pointer-events-none bg-[#FCFCFB]"
    >
      <Image
        src="/images/acwalogo.png"
        alt="ACWA"
        width={140}
        height={40}
        className="h-8 w-auto"
        priority
      />
      
      <a href="#home" className="text-sm tracking-wide uppercase font-normal text-[#554FF1] hover:opacity-70 transition-opacity">
        Home
      </a>
      
      <a href="#projects" className="text-sm tracking-wide uppercase font-normal text-[#554FF1] hover:opacity-70 transition-opacity">
        Our Projects
      </a>
      
      <a href="#contact" className="text-sm tracking-wide uppercase font-normal text-[#554FF1] hover:opacity-70 transition-opacity">
        Contact Us
      </a>
    </header>
  );
}