import Image from "next/image";

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between"
      style={{ paddingLeft: "64px", paddingRight: "64px", paddingTop: "40px", paddingBottom: "40px" }}
    >
      <Image
        src="/images/acwalogo.png"
        alt="ACWA"
        width={140}
        height={40}
        className="h-8 w-auto"
        priority
      />
      <nav
        className="flex text-sm tracking-wide uppercase font-normal text-blue"
        style={{ gap: "64px" }}
      >
        <a href="#home" className="hover:opacity-70 transition-opacity">
          Home
        </a>
        <a href="#projects" className="hover:opacity-70 transition-opacity">
          Our Projects
        </a>
        <a href="#contact" className="hover:opacity-70 transition-opacity">
          Contact Us
        </a>
      </nav>
    </header>
  );
}