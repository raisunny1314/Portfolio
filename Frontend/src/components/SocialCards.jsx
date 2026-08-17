import React from "react";

const PLATFORM_ICONS = {
  LeetCode: "⚔️",
  GitHub: "🐙",
  GeeksforGeeks: "🟢",
};

const PlatformCard = ({ social }) => {
  const { platform: name, handle, profileUrl, metric } = social;

  return (
    <div className="flex flex-col items-center text-center px-10 py-10 rounded-2xl bg-[#121212] border border-[#262626] hover:border-[#404040] hover:-translate-y-1 transition-all duration-300">
      
      <div className="text-4xl mb-4">{PLATFORM_ICONS[name] || "🔹"}</div>

      <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>

      
       <a  href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-400 hover:text-blue-300 mb-6 transition-colors"
      >
        {handle}
      </a>

      <div className="w-full flex justify-center gap-10 border-t border-[#262626] pt-6">
        {metric.map((m, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="font-mono text-2xl font-bold text-white">{m.value}</span>
            <span className="text-[11px] uppercase tracking-wider text-zinc-500">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformCard;