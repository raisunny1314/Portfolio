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
                setErr('Fauled To load Projects');
                setLoading(false);

            })
    }, []);


    if (loading) return <p className="text-white">Loading...</p>;
    if (err) return <p className="text-white">{err}</p>


    return (
        <div className=" flex gap-2">
            {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
            ))}
        </div>

    )
}

export default ProjectsGrid
