import axios from "axios";
import { useEffect, useState } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    axios.get("https://mern-stack-portfolio-backend-bf3p.onrender.com/api/v1/skill/getall", { withCredentials: true })
      .then(({ data }) => setSkills(data.skills))
      .catch(() => {});
  }, []);

  return (
    <div className="w-full">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3 font-medium">Tools &amp; Technologies</p>
        <h2 className="section-title text-4xl sm:text-5xl text-white">Skills</h2>
      </div>

      {skills && skills.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
          {skills.map((element, idx) => (
            <div key={element._id} className="skill-card glass glass-hover border-gradient" style={{ animationDelay: `${idx * 0.05}s` }}>
              <img src={element.svg?.url} alt={element.title} className="w-12 h-12 object-contain"
                style={{ filter: "drop-shadow(0 0 8px rgba(0,212,255,0.3))" }} />
              <p className="text-slate-300 text-xs text-center font-medium" style={{ fontFamily: "DM Sans" }}>{element.title}</p>
            </div>
          ))}
        </div>
      )}

      <div>
        <p className="text-slate-500 text-xs uppercase tracking-widest mb-5">DevOps Stack</p>
        <div className="flex flex-wrap gap-3">
          {["Docker","Kubernetes","Jenkins","GitHub Actions","AWS","Terraform","Linux","Nginx","Prometheus","Grafana","Ansible","Git","CI/CD","Bash","Python"].map(tag => (
            <span key={tag} className="text-sm px-4 py-2 rounded-full font-medium cursor-default transition-all duration-300"
              style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.18)", color: "rgba(0,212,255,0.85)", fontFamily: "DM Sans" }}
              onMouseEnter={e => { e.target.style.background="rgba(0,212,255,0.15)"; e.target.style.borderColor="rgba(0,212,255,0.4)"; e.target.style.boxShadow="0 0 15px rgba(0,212,255,0.15)"; }}
              onMouseLeave={e => { e.target.style.background="rgba(0,212,255,0.07)"; e.target.style.borderColor="rgba(0,212,255,0.18)"; e.target.style.boxShadow="none"; }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Skills;
