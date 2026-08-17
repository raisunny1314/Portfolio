import React from "react";
import { useEffect, useState } from "react";

const Intro = () => {

  const texts = ["Open to work", "MERN Stack Developer", "Building scalable systems"];


  const [i, setI] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {

    const full = texts[i];
    
    const deleting = text.length === full.length;
    
    const timer = setTimeout(() => {
      if (deleting) {
        setText("");
        setI((i + 1) % texts.length);
      } else {
        setText(full.slice(0, text.length + 1));
      }
    
    }, deleting ? 1500 : 70);

    return () => clearTimeout(timer);
  }, [text, i]);


  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">

   
      <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
        {text}
        <span className="animate-pulse">|</span>
      </div>

  
      <h1 className="font-extrabold mt-10 leading-[0.95] tracking-tight text-6xl sm:text-7xl md:text-8xl mb-8">
        <span className="text-white block">Sunny</span>
        <span className="text-zinc-600 block">Rajbhar</span>
      </h1>

      <p className="font-mono text-sm sm:text-base tracking-[0.2em] text-zinc-500 uppercase mb-8">
        Full-Stack MERN Developer · Mumbai, India
      </p>

      {/* bio */}
      <p className="text-zinc-400 text-lg max-w-2xl mb-2 leading-relaxed">
        Building <span className="text-white font-semibold">scalable web applications</span> with Node.js, React, MongoDB &amp; Redis.
      </p>
      <p className="text-zinc-500 text-lg max-w-2xl mb-10 leading-relaxed">
        Passionate about clean architecture, real-time systems, and developer tools.
      </p>

      {/* buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <button className="px-6 py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors">
          View Projects →
        </button>
        <button className="px-6 py-3.5 rounded-xl border border-zinc-700 text-white font-semibold hover:bg-zinc-900 transition-colors">
          Get in touch
        </button>
      </div>


    </section>
  );
};

export default Intro;