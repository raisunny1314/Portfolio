import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
const AdminLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        api.post("admin/login", { email, password }).then(() => {
            navigate("/admin/dashboard/projects");
        }).catch((err) => {
            setError(err.response?.data?.message || "Login Fail");
        })

    }

    return (
        <div className="max-h-screen w-full flex items-center justify-center bg-[#0a0a0a] p-6 font-mono relative overflow-hidden">

            {/* Background Grid Pattern for Brutalist Vibe */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-size-[32px_32px] opacity-40"></div>

            {/* Main Wrapper */}
            <div className="relative w-full max-w-md bg-[#121212] border-4 border-[#262626] shadow-[12px_12px_0px_0px_#262626] transition-all">

                {/* Decorative Header Bar */}
                <div className="bg-[#1a1a1a] border-b-4 border-[#262626] px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 border border-black"></div>
                        <div className="w-3 h-3 bg-yellow-500 border border-black"></div>
                        <div className="w-3 h-3 bg-green-500 border border-black"></div>
                    </div>
                    <span className="text-[11px] font-black tracking-widest text-zinc-400 uppercase">
                        SYS_AUTH_V2
                    </span>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    {/* Top Banner Image Section */}
                    <div className="relative mb-8 border-4 border-[#262626] bg-[#1a1a1a] overflow-hidden shadow-[4px_4px_0px_0px_#262626]">
                        <img
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                            alt="Brutalist Banner"
                            className="w-full h-36 object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                        />
                        <div className="absolute bottom-2 left-2 bg-black text-white text-[10px] font-black px-2 py-0.5 border border-white/20 uppercase">
                            SECURE_NODE
                        </div>
                    </div>

                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                            Admin Login
                        </h2>
                        <p className="text-xs font-bold text-zinc-500 mt-1 uppercase">
                            Enter credentials to access root access
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="bg-red-500 text-black font-black text-xs p-3.5 mb-6 border-2 border-white shadow-[4px_4px_0px_0px_#ffffff] uppercase">
                            ⚠️ ERROR: {error}
                        </div>
                    )}

                    {/* Inputs */}
                    <div className="space-y-5 mb-8">
                        <div>
                            <label className="text-xs font-black text-white mb-2 block uppercase tracking-wider">
                                [1] Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-[#262626] text-white text-sm font-bold focus:outline-none focus:border-white focus:bg-black focus:shadow-[4px_4px_0px_0px_#ffffff] transition-all placeholder:text-zinc-600"
                                placeholder="admin@system.local"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-xs font-black text-white mb-2 block uppercase tracking-wider">
                                [2] Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-[#262626] text-white text-sm font-bold focus:outline-none focus:border-white focus:bg-black focus:shadow-[4px_4px_0px_0px_#ffffff] transition-all placeholder:text-zinc-600"
                                placeholder="••••••••••••"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-white text-black font-black text-base uppercase tracking-widest border-2 border-white shadow-[6px_6px_0px_0px_#262626] hover:-translate-x-0.75` hover:-translate-y-0.75 hover:shadow-[9px_9px_0px_0px_#262626] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_#262626] transition-all"
                    >
                        Authenticate ↵
                    </button>

                    {/* Footer System Status */}
                    <div className="mt-8 pt-4 border-t-2 border-[#262626] flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                            System Online
                        </span>
                        <span>Encrypted SSL 256-Bit</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin
