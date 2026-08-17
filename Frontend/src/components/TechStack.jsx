const techStack = {
    Frontend: ["React.js", "Redux Toolkit", "Next.js (App Router)", "React Router", "Tailwind CSS", "HTML5", "JavaScript (ES6+)"],
    Backend: ["Node.js", "Express.js", "REST API Design", "JWT Authentication", "Role-Based Access Control (RBAC)"],
    Databases: ["PostgreSQL", "SQL", "MongoDB", "Mongoose ODM"],
    "Tools & Platforms": ["Git", "GitHub", "Postman", "Vercel", "NextAuth.js", "Cloudinary", "Judge0 API", "Redis"],
    "Core Concepts": ["Data Structures & Algorithms", "Object-Oriented Programming", "Relational Data Modeling"],
};

const CATEGORY_STYLE =
    "rounded-[14px] border border-zinc-800 bg-[#161616] p-5 transition hover:border-zinc-700";
const TAG_STYLE =
    "rounded-md border border-zinc-700 bg-[#0f0f0f] px-3 py-1.5 font-mono text-xs text-zinc-400 transition hover:border-zinc-500 hover:text-white";

export default function TechStack() {
    return (
        <section className="border-y border-zinc-800 bg-[#0f0f0f] px-6 py-20 md:px-14">
            <div className="mx-auto max-w-[1100px]">
                <div className="mb-12 text-center">
                    <p className="mb-3 font-mono text-[11px] uppercase tracking-[2px] text-zinc-600">
                        Tech Stack
                    </p>
                    <h2 className="text-3xl font-extrabold text-white md:text-4xl">
                        What I work with.
                    </h2>
                </div>

                <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(techStack).map(([category, items]) => (
                        <div key={category} className={CATEGORY_STYLE}>
                            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wider text-zinc-600">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {items.map((item) => (
                                    <span key={item} className={TAG_STYLE}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}