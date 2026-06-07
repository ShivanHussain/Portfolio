/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GitMerge, ShieldCheck, RefreshCw } from "lucide-react";

const About = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get("https://mern-stack-portfolio-backend-bf3p.onrender.com/api/v1/user/portfolio/me", { withCredentials: true })
      .then(({ data }) => setUser(data.user[0]))
      .catch(() => {});
  }, []);

  const CloudIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );

  const highlights = [
    { icon: <GitMerge size={20} />, label: "CI/CD Automation", desc: "End-to-end pipeline design & automation" },
    { icon: <CloudIcon size={20} />, label: "Cloud Infrastructure", desc: "AWS / GCP provisioning & management" },
    { icon: <ShieldCheck size={20} />, label: "Security & Reliability", desc: "SRE practices, monitoring & alerts" },
    { icon: <RefreshCw size={20} />, label: "Continuous Delivery", desc: "Zero-downtime deployments & rollbacks" },
  ];

  return (
    <div className="w-full">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3 font-medium">Get to know me</p>
        <h2 className="section-title text-4xl sm:text-5xl text-white">About Me</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="flex flex-col gap-5">
          {user?.avatar?.url && (
            <div className="flex items-center gap-4 mb-2">
              <img src={user.avatar.url} alt={user.fullName}
                className="w-16 h-16 rounded-2xl object-cover"
                style={{ border: "2px solid rgba(0,212,255,0.3)", boxShadow: "0 0 20px rgba(0,212,255,0.15)" }} />
              <div>
                <p className="text-white font-bold text-lg" style={{ fontFamily: "Syne" }}>{user.fullName}</p>
                <p className="text-cyan-400 text-sm">DevOps Engineer</p>
              </div>
            </div>
          )}

          <p className="text-slate-300 text-base leading-relaxed" style={{ fontFamily: "DM Sans" }}>
            I'm <span className="text-white font-semibold">{user?.fullName || "Shivan Hussain"}</span>, a passionate DevOps Engineer
            with a strong foundation in Full-Stack development. I specialize in designing and maintaining
            robust CI/CD pipelines, containerized infrastructure, and cloud-native systems that help
            engineering teams ship faster and more reliably.
          </p>
          <p className="text-slate-400 text-base leading-relaxed" style={{ fontFamily: "DM Sans" }}>
            My development background gives me a unique edge — I understand both sides of the wall.
            I automate everything from build and test to deployment and monitoring, using tools like
            Docker, Kubernetes, Jenkins, GitHub Actions, and Terraform. I thrive in cross-functional
            environments where collaboration and clear communication drive results.
          </p>
          <p className="text-slate-400 text-base leading-relaxed" style={{ fontFamily: "DM Sans" }}>
            Committed to continuous improvement — whether that's reducing deployment time, improving
            system uptime, or adopting the latest DevOps best practices to keep infrastructure
            scalable, secure, and cost-efficient.
          </p>

          {user && (
            <div className="glass rounded-2xl p-5 grid grid-cols-2 gap-4 mt-2">
              {[
                { label: "Email", value: user.email },
                { label: "Phone", value: user.phone },
                { label: "Degree", value: "B.Tech CSE" },
                { label: "Status", value: "Open to work" },
              ].map(i => (
                <div key={i.label}>
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{i.label}</p>
                  <p className="text-white text-sm font-medium truncate">{i.value}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-1">
            {["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "AWS", "Terraform", "Linux", "Nginx"].map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "var(--cyan)", fontFamily: "DM Sans" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {highlights.map(h => (
            <div key={h.label} className="glass glass-hover rounded-2xl p-5 flex items-start gap-4 border-gradient">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,212,255,0.1)", color: "var(--cyan)", border: "1px solid rgba(0,212,255,0.2)" }}>
                {h.icon}
              </div>
              <div>
                <p className="text-white font-semibold mb-1" style={{ fontFamily: "Syne" }}>{h.label}</p>
                <p className="text-slate-400 text-sm">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default About;
