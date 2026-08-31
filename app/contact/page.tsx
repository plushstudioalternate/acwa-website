import Image from "next/image";
import { FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import FooterSection from "@/components/sections/FooterSection";

export default function ContactPage() {
  const cardClipDesktop =
    "polygon(0% 0%, calc(100% - 80px) 0%, 100% 80px, 100% 100%, 80px 100%, 0% calc(100% - 80px))";
  const cardClipMobile =
    "polygon(0% 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, 40px 100%, 0% calc(100% - 40px))";

  return (
    <main className="relative w-full bg-[#554FF1] flex flex-col">

      <style>{`
        @media (min-width: 768px) {
          .card-wrapper { margin-top: -2.25rem !important; }
          .social-icons {
            position: absolute;
            bottom: 12%;
            left: 64px;
            z-index: 30;
            background: transparent;
            padding-top: 0;
            padding-bottom: 0;
          }
        }
        @media (max-width: 767px) {
          .card-wrapper { margin-top: -0.75rem !important; }
        }
      `}</style>

      {/* Header */}
      <header
        className="absolute top-0 left-0 w-full z-50 flex items-center justify-between"
        style={{ paddingLeft: "64px", paddingRight: "64px", paddingTop: "40px", paddingBottom: "40px" }}
      >
        <a href="/">
  <Image
    src="/images/logo-white.png"
    alt="ACWA"
    width={140}
    height={40}
    className="h-6 w-auto md:h-8"
    priority
  />
</a>
        <nav className="flex text-xs md:text-sm tracking-wide uppercase font-normal">
          <a href="/contact" className="text-white hover:opacity-70 transition-opacity">
            Contact Us
          </a>
        </nav>
      </header>

      {/* Hero section — exactly 100vh */}
      <section
        className="relative w-full overflow-hidden flex flex-col justify-between"
        style={{ height: "100vh" }}
      >
        {/* Marquee */}
        <div className="w-full overflow-hidden z-10 relative" style={{ marginTop: "120px" }}>
          <div className="whitespace-nowrap animate-marquee">
            <span
              className="text-white font-light select-none"
              style={{ fontSize: "clamp(4rem, 9vw, 8rem)", lineHeight: 1.1 }}
            >
              Reach out to us.&nbsp;&nbsp;&nbsp;Reach out to us.&nbsp;&nbsp;&nbsp;Reach out to us.&nbsp;&nbsp;&nbsp;Reach out to us.&nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>

        {/* Form card */}
        <div
          className="card-wrapper relative z-20 flex justify-end flex-1"
          style={{ marginTop: "-0.75rem" }}
        >
          {/* Mobile card */}
          <div
            className="block md:hidden w-full bg-[#E8E8F0]"
            style={{
              clipPath: cardClipMobile,
              padding: "40px 32px 32px 32px",
              height: "100%",
            }}
          >
            <div className="flex flex-col justify-between h-full">
              <input
                type="text"
                placeholder="First Name"
                className="w-full bg-transparent border-b border-[#554FF1] text-[#554FF1] placeholder-[#554FF1] text-base outline-none"
                style={{ paddingBottom: "10px" }}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full bg-transparent border-b border-[#554FF1] text-[#554FF1] placeholder-[#554FF1] text-base outline-none"
                style={{ paddingBottom: "10px" }}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border-b border-[#554FF1] text-[#554FF1] placeholder-[#554FF1] text-base outline-none"
                style={{ paddingBottom: "10px" }}
              />
              <textarea
                placeholder="Type your message here"
                rows={3}
                className="w-full bg-transparent border-b border-[#554FF1] text-[#554FF1] placeholder-[#554FF1] text-base outline-none resize-none"
                style={{ paddingBottom: "10px" }}
              />
              <button
                type="submit"
                className="w-full bg-[#554FF1] text-white uppercase tracking-widest text-sm font-semibold"
                style={{ paddingTop: "14px", paddingBottom: "14px" }}
              >
                Send
              </button>
            </div>
          </div>

          {/* Desktop card */}
          <div
            className="hidden md:flex flex-col w-[70%] bg-[#E8E8F0]"
            style={{
              clipPath: cardClipDesktop,
              padding: "48px 80px 40px 80px",
              height: "100%",
            }}
          >
            <div
              className="grid flex-1"
              style={{ gridTemplateColumns: "1fr 1fr", gap: "0 80px" }}
            >
              {/* Left column */}
              <div className="flex flex-col justify-between" style={{ paddingTop: "2px", paddingBottom: "2px" }}>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-transparent border-b border-[#554FF1] text-[#554FF1] placeholder-[#554FF1] text-base outline-none"
                  style={{ paddingBottom: "14px" }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-transparent border-b border-[#554FF1] text-[#554FF1] placeholder-[#554FF1] text-base outline-none"
                  style={{ paddingBottom: "14px" }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-[#554FF1] text-[#554FF1] placeholder-[#554FF1] text-base outline-none"
                  style={{ paddingBottom: "14px" }}
                />
              </div>

              {/* Right column */}
              <div className="flex flex-col" style={{ paddingTop: "2px", paddingBottom: "2px" }}>
                <textarea
                  placeholder="Type your message here"
                  className="w-full bg-transparent border-b border-[#554FF1] text-[#554FF1] placeholder-[#554FF1] text-base outline-none resize-none flex-1"
                  style={{ paddingBottom: "14px" }}
                />
              </div>
            </div>

            {/* Send button */}
            <div style={{ marginTop: "28px" }}>
              <button
                type="submit"
                className="w-full bg-[#554FF1] text-white uppercase tracking-widest text-sm font-semibold"
                style={{ paddingTop: "15px", paddingBottom: "15px" }}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Social icons — absolute on desktop, normal flow on mobile */}
        <div
          className="social-icons flex items-center gap-8 z-20 bg-[#554FF1] md:bg-transparent"
          style={{ paddingLeft: "64px", paddingTop: "16px", paddingBottom: "16px" }}
        >
          <div className="flex items-center gap-8 w-full justify-center md:justify-start">
            <a
              href="https://in.linkedin.com/company/acwa-reviving-real-estate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:opacity-70 transition-opacity"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/acwa.in?igsh=MWoxZmg3ZGJzbnhl&igsi=MWoxZmg3ZGJzbnhl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:opacity-70 transition-opacity"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/919811303960"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:opacity-70 transition-opacity"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </section>

      {/* Spacer for mobile social icons — only shows on mobile since desktop icons are absolute */}
      <div className="bg-[#554FF1]" style={{ height: "60px" }} />

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
