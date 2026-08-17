const ProjectCard = ({ project }) => {

  return (
    <div className="bg-white  dark:bg-[#121212] border border-zinc-200 dark:border-[#262626] hover:border-zinc-300 dark:hover:border-[#404040] rounded-2xl p-4 flex flex-col hover:-translate-y-1 hover:shadow-2xl transition-all duration-200">

      <div className="flex justify-between items-start mb-5">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-[#262626] text-xl">
          {project.icon}
        </div>
        <div className="flex gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} className="text-sm text-zinc-500 dark:text-[#a3a3a3] hover:text-black dark:hover:text-white transition-colors">
              Github ↗
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className="text-sm text-zinc-500 dark:text-[#a3a3a3] hover:text-black dark:hover:text-white transition-colors">
              Live ↗
            </a>
          )}
        </div>
      </div>


      <h3 className="text-xl font-semibold mb-3 text-black dark:text-white">
        {project.title}
      </h3>


      <p className="text-sm text-zinc-500 dark:text-[#a3a3a3]  mb-6 leading-7">
        {project.description}
      </p>


      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tag, i) => (
          <span
            key={i}
            className="font-mono text-xs px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-[#262626] text-zinc-500 dark:text-[#a3a3a3]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;