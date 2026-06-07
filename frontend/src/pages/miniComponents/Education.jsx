import axios from "axios";
import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";

const Education = () => {
  const [timeline, setTimeline] = useState([]);
  useEffect(() => {
    axios.get("https://mern-stack-portfolio-backend-bf3p.onrender.com/api/v1/timeline/getall", { withCredentials: true })
      .then(({ data }) => setTimeline(data.timelines))
      .catch(() => {});
  }, []);

  return (
    <div className="w-full">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-3 font-medium">My Journey</p>
        <h2 className="section-title text-4xl sm:text-5xl text-white">Education</h2>
      </div>
      <div className="relative pl-16">
        <div className="timeline-line" />
        <div className="flex flex-col gap-8">
          {timeline && timeline.map((element, idx) => (
            <div key={element._id} className="relative fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="timeline-dot absolute -left-[52px] top-0">
                <GraduationCap size={16} className="text-white" />
              </div>
              <div className="glass glass-hover rounded-2xl p-6 border-l-2" style={{ borderColor: "var(--violet)" }}>
                <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: "Syne" }}>{element.title}</h3>
                  <span className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}>
                    {element.timeline.from} — {element.timeline.to || "Present"}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed" style={{ fontFamily: "DM Sans" }}>
                  {element.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Education;
