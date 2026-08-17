const education = [
  {
    icon: "🎓",
    degree: "B.E. in Computer Engineering",
    college: "University of Mumbai",
    year: "2021 – 2025",
    score: "CGPA: 7.31 / 10",
  },
  {
    icon: "📗",
    degree: "HSC — 12th Standard",
    college: "Maharashtra State Board",
    year: "2019 – 2020",
    score: "HSC",
  },
  {
    icon: "📘",
    degree: "SSC — 10th Standard",
    college: "Maharashtra State Board",
    year: "2017 – 2018",
    score: "SSC",
  },
];

const Education = () => {
  return (
    <section className="border-t border-zinc-800 bg-[#0f0f0f] px-6 py-20 md:px-14">
      <div className="mx-auto max-w-[1000px]">

        <p className="mb-4 font-mono text-[11px] uppercase tracking-[2px] text-zinc-600">
          Education
        </p>

        <h2 className="mb-16 text-4xl font-extrabold tracking-tight text-white">
          Academic background.
        </h2>

        <div className="space-y-3.5">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="flex items-start gap-5 rounded-[14px] border border-zinc-800 bg-[#161616] p-6 transition hover:border-zinc-700"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-[#0f0f0f] text-xl">
                {edu.icon}
              </div>

              <div>
                <h3 className="text-[16px] font-bold text-white">
                  {edu.degree}
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  {edu.college}
                </p>

                <div className="mt-2 flex gap-4 font-mono text-[11px]">
                  <span className="text-zinc-600">{edu.year}</span>
                  <span className="text-zinc-500">{edu.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;