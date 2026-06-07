/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Linkedin, Github, Download, ArrowDown, Server, GitBranch, Cloud } from "lucide-react";
import SpecialLoadingButton from "./SpecialLoadingButton";

const Hero = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("https://mern-stack-portfolio-backend-bf3p.onrender.com/api/v1/user/portfolio/me", { withCredentials: true })
      .then(({ data }) => setUser(data.user[0]))
      .catch(console.error);
  }, []);

  const handleResume = () => {
    const url = user?.resume?.url;
    if (!url) return;
    window.open(url, "_blank");
    const a = document.createElement("a");
    a.href = url;
    a.download = "Shivan_Hussain_Resume";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!user) return (
    <div className="w-full flex items-center justify-center min-h-[60vh]">
      <SpecialLoadingButton width={"70"} content={"Initializing..."} />
    </div>
  );

  const socials = [
    { url: user.linkedInURL, icon: <Linkedin size={18} /> },
    { url: user.githubURL, icon: <Github size={18} /> },
  ].filter(s => s.url);

  return (
    <div className="w-full grid lg:grid-cols-2 gap-16 items-center">
      {/* LEFT */}
      <div className="flex flex-col gap-6">
        <div className="fade-in-up delay-1 flex items-center gap-2 w-fit">
          <div className="pulse-dot" />
          <span className="text-sm text-emerald-400 font-medium" style={{ fontFamily: "DM Sans" }}>
            Open to DevOps / Cloud roles
          </span>
        </div>

        <div className="fade-in-up delay-2">
          <p className="text-slate-400 text-base mb-2" style={{ fontFamily: "DM Sans" }}>Hi, I'm</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.03em" }}>
            {user.fullName || user.name}
          </h1>
        </div>

        <div className="fade-in-up delay-3">
          <div className="text-xl sm:text-2xl font-semibold" style={{ fontFamily: "Syne, sans-serif", color: "var(--cyan)" }}>
            <Typewriter
              words={["DevOps Engineer", "Cloud Infrastructure Engineer", "CI/CD Pipeline Architect", "Site Reliability Engineer"]}
              loop={50} cursor typeSpeed={60} deleteSpeed={35} delaySpeed={1500}
            />
          </div>
        </div>

        <p className="fade-in-up delay-4 text-slate-400 text-base leading-relaxed max-w-md" style={{ fontFamily: "DM Sans" }}>
          Building scalable infrastructure, automating pipelines and bridging Dev &amp; Ops for faster, reliable software delivery.
        </p>

        <div className="fade-in-up delay-5 flex flex-wrap gap-3 mt-2">
          {user.githubURL && (
            <Link to={user.githubURL} target="_blank">
              <button className="btn-primary flex items-center gap-2"><Github size={16} />GitHub</button>
            </Link>
          )}
          {user.resume?.url && (
            <button onClick={handleResume} className="btn-outline flex items-center gap-2">
              <Download size={16} />Resume
            </button>
          )}
        </div>

        <div className="fade-in-up delay-6 flex items-center gap-3 mt-1">
          <span className="text-xs text-slate-500 uppercase tracking-widest">Connect</span>
          {socials.map((s, i) => (
            <Link to={s.url} key={i} target="_blank">
              <div className="social-icon">{s.icon}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* RIGHT — DevOps pipeline card */}
      <div className="hidden lg:flex justify-center items-center">
        <div className="relative float">
          <div className="glass rounded-3xl p-7 w-80" style={{ border: "1px solid rgba(0,212,255,0.15)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ background: "linear-gradient(135deg,var(--cyan),var(--violet))", fontFamily: "Syne" }}>
                {(user.fullName || user.name || "S")[0]}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{user.fullName || user.name}</p>
                <p className="text-slate-400 text-xs">DevOps Engineer</p>
              </div>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }}>
                ● Online
              </span>
            </div>

            <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">CI/CD Pipeline</p>
            <div className="flex flex-col gap-2 mb-5">
              {[
                { stage: "Code", icon: <GitBranch size={13} />, status: "passed", color: "#10b981" },
                { stage: "Build", icon: <Server size={13} />, status: "passed", color: "#10b981" },
                { stage: "Test", icon: <Server size={13} />, status: "passed", color: "#10b981" },
                { stage: "Deploy", icon: <Cloud size={13} />, status: "running", color: "var(--cyan)" },
              ].map((s) => (
                <div key={s.stage} className="flex items-center justify-between rounded-xl px-3 py-2"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex items-center gap-2 text-slate-300 text-xs">
                    <span style={{ color: s.color }}>{s.icon}</span>{s.stage}
                  </div>
                  <span className="text-xs font-medium" style={{ color: s.color }}>
                    {s.status === "running"
                      ? <span className="flex items-center gap-1"><span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />running</span>
                      : "✓ passed"}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[{ label: "Uptime", value: "99.9%" }, { label: "Deploys", value: "200+" }, { label: "Repos", value: "20+" }].map(s => (
                <div key={s.label} className="glass rounded-xl p-2.5 text-center">
                  <p className="glow-cyan font-bold text-base" style={{ fontFamily: "Syne" }}>{s.value}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl opacity-20 blur-md" style={{ background: "var(--violet)" }} />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl opacity-20 blur-md" style={{ background: "var(--cyan)" }} />
        </div>
      </div>

      <div className="lg:col-span-2 flex justify-center mt-4 fade-in-up delay-6">
        <div className="flex flex-col items-center gap-2 text-slate-600 text-xs uppercase tracking-widest animate-bounce">
          <span>Scroll</span><ArrowDown size={13} />
        </div>
      </div>
    </div>
  );
};
export default Hero;
