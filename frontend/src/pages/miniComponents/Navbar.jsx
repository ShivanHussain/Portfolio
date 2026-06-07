import { useState, useEffect } from "react";
import { Download, Menu, X, Terminal } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data } = await axios.get(
          "https://mern-stack-portfolio-backend-bf3p.onrender.com/api/v1/user/portfolio/me",
          { withCredentials: true }
        );
        const user = data.user[0];
        if (user?.resume?.url) setResumeUrl(user.resume.url);
      } catch (err) {
        console.error("Failed to fetch resume:", err);
      }
    };
    fetchResume();
  }, []);

  const links = ["About", "Skills", "Projects", "Contact"];

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // sirf view — naye tab mein kholo
  const handleResume = () => {
    if (!resumeUrl) return;
    window.open(resumeUrl, "_blank");
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(2,8,23,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,255,200,0.07)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
          className="font-bold text-xl cursor-pointer flex items-center gap-2"
          style={{ fontFamily: "Syne, sans-serif" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--cyan), var(--violet))" }}
          >
            <Terminal size={15} className="text-white" />
          </span>
          <span className="glow-cyan">SH</span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} className="nav-link">
              {l}
            </button>
          ))}
        </div>

        {/* Resume button — desktop */}
        <div className="hidden md:flex items-center">
          {resumeUrl ? (
            <button
              onClick={handleResume}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <Download size={14} />
              Resume
            </button>
          ) : (
            <span className="btn-outline flex items-center gap-2 text-sm opacity-40 cursor-not-allowed">
              <Download size={14} />
              Resume
            </span>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden glass px-6 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} className="nav-link text-left text-base">
              {l}
            </button>
          ))}
          {resumeUrl && (
            <button
              onClick={() => { handleResume(); setMenuOpen(false); }}
              className="btn-primary flex items-center gap-2 text-sm w-fit mt-2"
            >
              <Download size={14} />
              Resume
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;