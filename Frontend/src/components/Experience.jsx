const experience = [
  {
    icon: "💼",
    role: "Software Engineering Job Simulation",
    company: "Commonwealth Bank — Forage",
    type: "Remote",
    date: "Completed July 2026",
    points: [
      "Extended a .NET/C# backend with MongoDB integration and a React/Redux TypeScript frontend to deliver a new feature end-to-end, including API development (GET/PUT), Axios integration, unit testing, and a full Git/PR workflow.",
      "Worked through a realistic engineering ticket from requirements to code review, following production-style branch, commit, and pull-request conventions.",
    ],
  },
];

const Experience = () => {
  return (
    <section className="border-y border-zinc-800 bg-[#0f0f0f] px-6 py-20 md:px-14">
      <div className="mx-auto max-w-[1000px]">

        <p className="mb-4 font-mono text-[11px] uppercase tracking-[2px] text-zinc-600">
          Experience
        </p>

        <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-white">
          Professional experience.
        </h2>

        <div className="space-y-3.5">
          {experience.map((exp) => (
            <div
              key={exp.role}
              className="rounded-[14px] border border-zinc-800 bg-[#161616] p-6 transition hover:border-zinc-700"
            >
              <div className="flex items-start gap-5">

                {/* Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-[#0f0f0f] text-xl">
                  {exp.icon}
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3 className="text-[16px] font-bold text-white">
                    {exp.role}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    {exp.company} · {exp.type}
                  </p>

                  <p className="mt-2 font-mono text-[11px] text-zinc-600">
                    {exp.date}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {exp.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-[13px] leading-6 text-zinc-500"
                      >
                        <span className="text-zinc-700">→</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;