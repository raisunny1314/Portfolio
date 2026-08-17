const Contact = () => {
    return (
        <div>
            <section className="border-t border-zinc-800 px-6 py-5 mb-5 text-center">
                <div className="mx-auto max-w-175">
                    <p className="mb-4 font-mono text-[11px] uppercase tracking-[2px] text-zinc-600">
                        Contact
                    </p>

                    <h2 className="mb-6 text-5xl font-black leading-none tracking-tight text-white md:text-6xl">
                        Let's work
                        <br />
                        together.
                    </h2>

                    <p className="mx-auto mb-9 max-w-162.5 text-[15px] leading-7 text-zinc-600">
                        I'm currently open to Backend and Full-Stack MERN roles. Feel free
                        to reach out via email or connect on LinkedIn.
                    </p>

                    <div className="flex flex-wrap justify-center gap-2.5">
                        <a
                            href="mailto:raisunny1314@gmail.com"
                            className="rounded-[9px] border border-white bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                        >
                            📧 raisunny1314@gmail.com
                        </a>

                        <a
                            href="https://www.linkedin.com/in/5unnyrai/"
                            className="rounded-[9px] border border-zinc-800 bg-[#161616] px-5 py-3 text-sm text-zinc-400 transition hover:-translate-y-0.5 hover:border-zinc-600 hover:text-white"
                        >
                            💼 LinkedIn ↗
                        </a>

                        <a
                            href="https://github.com/raisunny1314"
                            className="rounded-[9px] border border-zinc-800 bg-[#161616] px-5 py-3 text-sm text-zinc-400 transition hover:-translate-y-0.5 hover:border-zinc-600 hover:text-white"
                        >
                            🐙 GitHub ↗
                        </a>

                        <a
                            href="https://drive.google.com/file/d/1CibCLks3kprzbPOyuaxMht1Gx0T0sFmv/view?usp=drive_link"
                            className="rounded-[9px] border border-zinc-800 bg-[#161616] px-5 py-3 text-sm text-zinc-400 transition hover:-translate-y-0.5 hover:border-zinc-600 hover:text-white"
                        >
                            📄 Resume ↗
                        </a>
                    </div>
                </div>
            </section>
            <footer className="flex flex-col gap-3 border-t border-zinc-800 px-6 py-6 font-mono text-[11px] text-zinc-600 sm:flex-row sm:items-center sm:justify-between md:px-14">
                <span>© 2025 Sunny Rajbhar · Built with ❤️ in Mumbai</span>

                <span>sunny.profyle</span>
            </footer>

        </div>
    );
};







export default Contact;