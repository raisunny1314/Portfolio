import { useEffect, useState } from "react"
import api from "../services/api"
import ProjectCard from "./ProjectCard";



const ProjectsGrid = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        api.get('/projects')
            .then((res) => {
                setProjects(res.data.data);
                setLoading(false);
            }).catch((err) => {
                setErr('Failed To load Projects');
                setLoading(false);

            })
    }, []);


    if (loading) return (
<>
    <div className="bg-[#0d0d0d] border border-[#262626] rounded-2xl p-5 overflow-hidden">
      <div className="animate-pulse">
        <div className="w-12 h-12 bg-[#1a1a1a] rounded-xl mb-4" />
        <div className="h-5 bg-[#1a1a1a] rounded-md w-3/4 mb-3" />
        <div className="h-3 bg-[#1a1a1a] rounded-md w-full mb-2" />
        <div className="h-3 bg-[#1a1a1a] rounded-md w-5/6 mb-4" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-[#1a1a1a] rounded-full" />
          <div className="h-6 w-16 bg-[#1a1a1a] rounded-full" />
          <div className="h-6 w-16 bg-[#1a1a1a] rounded-full" />
        </div>
      </div>
    </div>
 </>

)
    if (err) return <p className="text-white">{err}</p>


    return (
        <div className=" grid gap-6 md:grid-cols-3 pt-5">
            {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
            ))}
        </div>

    )
}

export default ProjectsGrid
