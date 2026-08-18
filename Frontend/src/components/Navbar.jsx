import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ darkMode, setDarkMode }) => {
    const handleWork = ()=>{
        document.getElementById('projects')?.scrollIntoView({behavior:"smooth"})
    }
     const handlePlatform = ()=>{
        document.getElementById('platform')?.scrollIntoView({behavior:"smooth"})
    }
     const handleExperience = ()=>{
        document.getElementById('work')?.scrollIntoView({behavior:"smooth"})
    }
      const handleIntro = ()=>{
        document.getElementById('intro')?.scrollIntoView({behavior:"smooth"})
    }
    return (
        <div className='fixed top-0 left-0 right-0 z-50'>
            <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-950 text-black dark:text-white border-b border-zinc-200 dark:border-zinc-900">
                <div className=" font-bold tracking-tight">
                    Sunny.<span className="text-zinc-500 dark:text-zinc-500">Profyle</span>
                </div>
                <div className="flex gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    <button onClick={handleIntro} className="hover:text-black dark:hover:text-white hover:-translate-y-0.5 transition-all duration-300">About</button>
                    <button onClick={handleWork} className="hover:text-black dark:hover:text-white hover:-translate-y-0.5 transition-all duration-300">Work</button>
                    <button onClick={handlePlatform} className="hover:text-black dark:hover:text-white hover:-translate-y-0.5 transition-all duration-300">Platforms</button>
                    <button onClick={handleExperience} className="hover:text-black dark:hover:text-white hover:-translate-y-0.5 transition-all duration-300">Experience</button>
                </div>

                <button onClick={() => setDarkMode(!darkMode)} className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-full hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 hover:scale-105 hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] active:scale-95 transition-all duration-300">
                    {

                        darkMode ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-zinc-600 dark:text-zinc-400 ml-0.5"
                            >
                                <circle cx="12" cy="12" r="4"></circle>
                                <path d="M12 2v2"></path>
                                <path d="M12 20v2"></path>
                                <path d="m4.93 4.93 1.41 1.41"></path>
                                <path d="m17.66 17.66 1.41 1.41"></path>
                                <path d="M2 12h2"></path>
                                <path d="M20 12h2"></path>
                                <path d="m6.34 17.66-1.41 1.41"></path>
                                <path d="m19.07 4.93-1.41 1.41"></path>
                            </svg>
                        ) : (<svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-black dark:text-white"
                        >
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        </svg>)

                    }




                </button>
                <Link to='/admin/login' className="px-5 py-2 text-sm font-medium text-white dark:text-black bg-black dark:bg-white rounded-full hover:bg-zinc-800 dark:hover:bg-gray-100 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] active:scale-95 transition-all duration-300">
                    Admin Login
                </Link>
            </div>
        </div>
    )
}

export default Navbar