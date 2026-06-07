import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    axios.get(`https://mern-stack-portfolio-backend-bf3p.onrender.com/api/v1/project/get/${id}`, { withCredentials: true })
      .then(res => {
        setTitle(res.data.project.title);
        setDescription(res.data.project.description);
        setStack(res.data.project.stack);
        setDeployed(res.data.project.deployed);
        setTechnologies(res.data.project.technologies);
        setGitRepoLink(res.data.project.gitRepoLink);
        setProjectBannerPreview(res.data.project.projectBanner?.url || "");
      })
      .catch(error => toast.error(error.response.data.message));
  }, [id]);

  const descriptionList = description.split(". ").filter(Boolean);
  const technologiesList = technologies.split(", ").filter(Boolean);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <button onClick={() => navigateTo("/")}
          className="flex items-center gap-2 mb-8 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium group"
          style={{ fontFamily: "DM Sans" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Return to Portfolio
        </button>

        <div className="relative w-full rounded-3xl overflow-hidden mb-8" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          <img src={projectBannerPreview || "/avatarHolder.jpg"} alt={title} className="w-full h-72 sm:h-96 object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(2,8,23,0.88) 0%, transparent 60%)" }} />
          {stack && (
            <span className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.35)", color: "var(--cyan)", fontFamily: "Syne" }}>
              {stack}
            </span>
          )}
          <div className="absolute bottom-5 left-6 right-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white"
              style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}>{title}</h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass rounded-2xl p-6 flex flex-col gap-3" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xs uppercase tracking-widest text-cyan-400 mb-1" style={{ fontFamily: "DM Sans" }}>Description</p>
            <ul className="flex flex-col gap-2">
              {descriptionList.map((item, index) => (
                <li key={index} className="flex gap-3 text-slate-300 text-sm leading-relaxed" style={{ fontFamily: "DM Sans" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--cyan)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div className="glass rounded-2xl p-5" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs uppercase tracking-widest text-violet-400 mb-3" style={{ fontFamily: "DM Sans" }}>Technologies</p>
              <div className="flex flex-wrap gap-2">
                {technologiesList.map((tech, index) => (
                  <span key={index} className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", color: "#c4b5fd", fontFamily: "DM Sans" }}>
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5 flex flex-col gap-3" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs uppercase tracking-widest text-amber-400 mb-1" style={{ fontFamily: "DM Sans" }}>Links</p>
              {deployed && (
                <Link to={deployed} target="_blank"
                  className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors" style={{ fontFamily: "DM Sans" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  Live Demo
                </Link>
              )}
              {gitRepoLink && (
                <Link to={gitRepoLink} target="_blank"
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors" style={{ fontFamily: "DM Sans" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub Repo
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button onClick={() => navigateTo("/")} className="btn-primary flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProjectView;
