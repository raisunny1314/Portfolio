import { useState, useEffect } from "react";
import api from "../../services/api";

const initialFormState = {
    title: "",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
    description: "",
    icon: "",
};

const ProjectsHub = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(initialFormState);
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        api
            .get("/projects")
            .then((res) => {
                setProjects(res.data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError("Failed to load Project");
            });
    }, []);

    const activeCount = projects.filter((p) => p.status === "live").length;
    const totalViews = projects.reduce((sum, p) => sum + p.views, 0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (status) => {
        setSubmitError("");
        const { _id, ...rest } = formData;

        const payload = {
            ...rest,
            techStack: formData.techStack.split(",").map((t) => t.trim()),
            status,
        };

        try {
            if (editingId) {
                const res = await api.put(`/admin/projects/${editingId}`, payload);
                setProjects((prev) =>
                    prev.map((p) => (p._id === editingId ? res.data.data : p))
                );
            } else {
                const res = await api.post("/admin/projects", payload);
                setProjects((prev) => [...prev, res.data.data]);
            }

            setFormData(initialFormState);
            setEditingId(null);

        } catch (error) {

            setSubmitError(error.response?.data?.message || "Failed to save project");

        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/admin/projects/${id}`);
            setProjects((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            setSubmitError(err.response?.data?.message || "Failed to delete project");
        }
    };

    const handleEdit = (proj) => {
        setFormData({
            ...proj,
            techStack: proj.techStack.join(", "),
        });
        setEditingId(proj._id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setFormData(initialFormState);
        setEditingId(null);
    };

    return (
        <div className="px-4 sm:px-6 py-6 max-w-6xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Projects Hub</h1>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
                Manage and organize your portfolio case studies.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#0d0d0d] border border-[#262626] rounded-2xl p-5 sm:p-6">
                    <p className="text-sm text-gray-500">Active Projects</p>
                    <p className="text-2xl sm:text-3xl font-bold text-white mt-2">{activeCount}</p>
                </div>
                <div className="bg-[#0d0d0d] border border-[#262626] rounded-2xl p-5 sm:p-6">
                    <p className="text-sm text-gray-500">Total Views</p>
                    <p className="text-2xl sm:text-3xl font-bold text-white mt-2">{totalViews}</p>
                </div>
            </div>

            {/* Add/Edit Project form */}
            <div className="bg-[#0d0d0d] border border-[#262626] rounded-2xl p-5 sm:p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">
                        {editingId ? "Edit Project" : "Add New Project"}
                    </h2>
                    {editingId && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="text-xs text-gray-400 hover:text-gray-200 underline transition-colors"
                        >
                            Cancel edit
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Project Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Next.js E-Commerce"
                            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Tech Stack</label>
                        <input
                            type="text"
                            name="techStack"
                            value={formData.techStack}
                            onChange={handleChange}
                            placeholder="React, Tailwind, Node"
                            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 block mb-1">GitHub URL</label>
                        <input
                            type="text"
                            name="githubUrl"
                            value={formData.githubUrl}
                            onChange={handleChange}
                            placeholder="https://github.com/..."
                            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Live Demo URL</label>
                        <input
                            type="text"
                            name="liveUrl"
                            value={formData.liveUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="text-sm text-gray-400 block mb-1">Icon (emoji)</label>
                        <input
                            type="text"
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            placeholder="🧠"
                            className="w-full sm:w-1/2 bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="text-sm text-gray-400 block mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Explain architecture and impact..."
                        rows={4}
                        className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                    />
                </div>

                {submitError && <p className="text-red-400 text-sm mb-3">{submitError}</p>}

                <div className="flex flex-col sm:flex-row gap-3">
                    {!editingId && (
                        <button
                            type="button"
                            onClick={() => handleSubmit("draft")}
                            className="bg-[#1a1a1a] border border-[#262626] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#262626] transition-colors"
                        >
                            Save Draft
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => handleSubmit("live")}
                        className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                        {editingId ? "Update Project" : "Publish Project"}
                    </button>
                </div>
            </div>

            {/* Published Projects table */}
            <div className="bg-[#0d0d0d] border border-[#262626] rounded-2xl p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Published Projects</h2>

                {loading && <p className="text-gray-500 text-sm">Loading...</p>}
                {err && <p className="text-red-400 text-sm">{err}</p>}

                {!loading && !err && (
                    <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
                        <table className="w-full text-left border-collapse min-w-[640px]">
                            <thead>
                                <tr className="text-gray-500 text-sm border-b border-[#262626]">
                                    <th className="py-3">Project Name</th>
                                    <th className="py-3">Tech Stack</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((proj) => (
                                    <tr key={proj._id} className="border-b border-[#1a1a1a] hover:bg-[#141414] transition-colors">
                                        <td className="py-4 font-medium text-white">{proj.title}</td>
                                        <td className="py-4 text-gray-400 text-sm">{proj.techStack.join(", ")}</td>
                                        <td className="py-4">
                                            {proj.status === "live" ? (
                                                <span className="inline-flex items-center gap-1 text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full text-xs font-medium border border-green-400/20">
                                                    ● Live
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-gray-400 bg-gray-400/10 px-2 py-0.5 rounded-full text-xs font-medium border border-gray-400/20">
                                                    ● Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 text-right">
                                            <div className="inline-flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleEdit(proj)}
                                                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-sky-500/30 text-sky-500 bg-sky-500/10 hover:bg-sky-500/20 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(proj._id)}
                                                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-500/30 text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsHub;