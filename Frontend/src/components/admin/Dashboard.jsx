import React from 'react'
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "Projects Hub", path: "projects" },
  { label: "Experience Timeline", path: "experience" },
  { label: "Coding Profiles", path: "coding" },
  { label: "General Info", path: "general" },
  { label: "Social Links", path: "social" },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#262626] p-6">
        <h2 className="text-lg font-bold mb-8">Sunny.admin</h2>

        <p className="text-xs text-gray-500 mb-2">CONTENT</p>
        <nav className="flex flex-col gap-1 mb-6">
          {navItems.slice(0, 3).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm ${isActive
                  ? "bg-[#1a1a1a] text-white"
                  : "text-gray-400 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <p className="text-xs text-gray-500 mb-2">SETTINGS</p>
        <nav className="flex flex-col gap-1">
          {navItems.slice(3).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm ${isActive
                  ? "bg-[#1a1a1a] text-white"
                  : "text-gray-400 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content — changes based on selected route */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard
