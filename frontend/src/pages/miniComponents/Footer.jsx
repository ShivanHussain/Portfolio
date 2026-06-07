import { Github, Linkedin, Heart } from "lucide-react";

const Footer = () => (
  <footer className="w-full max-w-6xl mx-auto px-6 py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-slate-500 text-sm flex items-center gap-2" style={{ fontFamily: "DM Sans" }}>
        Made with <Heart size={14} className="text-rose-400 fill-rose-400" /> by{" "}
        <span className="glow-cyan font-semibold">Shivan Hussain</span> &copy; {new Date().getFullYear()}
      </p>
      <div className="flex items-center gap-2">
        {[
          { icon: <Github size={16} />, href: "https://github.com/ShivanHussain" },
          { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/shivan-hussain-a1670b253" },
        ].map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noreferrer" className="social-icon">{s.icon}</a>
        ))}
      </div>
    </div>
  </footer>
);
export default Footer;
