import axios from "axios";
import { useEffect, useState } from "react";
import Singleproject from "./Singleproject";
import { ChevronDown, ChevronUp } from "lucide-react";

const Projects = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get("https://mern-stack-portfolio-backend-bf3p.onrender.com/api/v1/project/getall", { withCredentials: true })
      .then(({ data }) => setProjects(data.projects))
      .catch(() => {});
  }, []);

  const shown = viewAll ? projects : projects.slice(0, 6);

  return (
    <div className="w-full">
      <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3 font-medium">What I've built</p>
          <h2 className="section-title text-4xl sm:text-5xl text-white">My Projects</h2>
        </div>
        {projects.length > 6 && (
          <button className="btn-outline flex items-center gap-2" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? <><ChevronUp size={16} />Show Less</> : <><ChevronDown size={16} />View All</>}
          </button>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shown && shown.map(item => <Singleproject key={item._id} item={item} />)}
      </div>
    </div>
  );
};
export default Projects;
