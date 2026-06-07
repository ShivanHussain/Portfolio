import PropTypes from "prop-types";
import { MdArrowOutward } from "react-icons/md";
import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SingleProject = ({ item }) => {
  const { _id, title, gitRepoLink, deployed, projectBanner, stack, technologies } = item;
  const navigate = useNavigate();

  const handleLive = (e) => {
    e.stopPropagation();
    if (deployed?.length > 0) window.open(deployed, "_blank");
    else alert("Project not live yet.");
  };

  return (
    <div onClick={() => navigate(`/project/${_id}`)} className="project-card glass flex flex-col"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="relative w-full h-48 overflow-hidden">
        <img src={projectBanner?.url} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
        <div className="overlay" />
        <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full font-semibold"
          style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.3)", color: "var(--cyan)", fontFamily: "Syne" }}>
          {stack}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-white font-bold text-base mb-2 line-clamp-2" style={{ fontFamily: "Syne" }}>{title}</h3>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {technologies.split(",").slice(0, 4).map((tech, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#c4b5fd", fontFamily: "DM Sans" }}>
              {tech.trim()}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <button onClick={handleLive} className="flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
            <MdArrowOutward size={16} />Live Demo
          </button>
          <a href={gitRepoLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
            <Github size={14} />Code
          </a>
        </div>
      </div>
    </div>
  );
};

SingleProject.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    gitRepoLink: PropTypes.string.isRequired,
    deployed: PropTypes.string,
    stack: PropTypes.string.isRequired,
    technologies: PropTypes.string.isRequired,
    projectBanner: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};
export default SingleProject;
