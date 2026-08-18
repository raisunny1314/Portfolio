import { useState, useEffect } from "react";
import api from "../../services/api";

const initialFormState = {
  platform: "",
  url: "",
  icon: "",
};

const SocialLinkHub = () => {
  const [links, setLinks] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    api
      .get("/sociallink")
      .then((res) => {
        setLinks(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErr("Failed to load Social Links");
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSubmitError("");
    try {
      if (editingId) {
        const res = await api.put(`/admin/sociallink/${editingId}`, formData);
        setLinks((prev) => prev.map((l) => (l._id === editingId ? res.data.data : l)));
      } else {
        const res = await api.post("/admin/sociallink", formData);
        setLinks((prev) => [...prev, res.data.data]);
      }
      setFormData(initialFormState);
      setEditingId(null);
    } catch (error) {
      setSubmitError(error.response?.data?.message || "Failed to submit");
    }
  };

  const handleEdit = (item) => {
    setFormData({ platform: item.platform, url: item.url, icon: item.icon || "" });
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setFormData(initialFormState);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/sociallink/${id}`);
      setLinks((prev) => prev.filter((l) => l._id !== id));
    } catch (error) {
      setErr("Failed to delete");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Social Links</h1>
      <p className="text-gray-500 mb-6">Manage your social/profile links.</p>

      <div className="bg-[#0d0d0d] border border-[#262626] rounded-2xl p-5 sm:p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            {editingId ? "Edit Social Link" : "Add Social Link"}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-xs text-gray-400 hover:text-gray-200 underline"
            >
              Cancel edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Platform</label>
            <input
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              placeholder="e.g. LinkedIn"
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">URL</label>
            <input
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Icon (emoji)</label>
            <input
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="🔗"
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
        </div>

        {submitError && <p className="text-red-400 text-sm mb-3">{submitError}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          {editingId ? "Update Link" : "Add Link"}
        </button>
      </div>

      <div className="bg-[#0d0d0d] border border-[#262626] rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Your Social Links</h2>

        {loading && <p className="text-gray-500 text-sm">Loading...</p>}
        {err && <p className="text-red-400 text-sm">{err}</p>}

        {!loading && !err && links.length === 0 && (
          <p className="text-gray-500 text-sm">No social links added yet.</p>
        )}

        {!loading && !err && links.length > 0 && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-[#262626]">
                <th className="py-3">Platform</th>
                <th className="py-3">URL</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((item) => (
                <tr key={item._id} className="border-b border-[#1a1a1a] hover:bg-[#141414]">
                  <td className="py-4 font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <span>{item.icon || "🔗"}</span>
                      <span>{item.platform}</span>
                    </span>
                  </td>
                  <td className="py-4 text-sm">
                    
                    <a  href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-400 hover:underline"
                    >
                      Visit ↗
                    </a>
                  </td>
                  <td className="py-4 text-right">
                    <div className="inline-flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-sky-500/30 text-sky-500 bg-sky-500/10 hover:bg-sky-500/20"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-500/30 text-red-500 bg-red-500/10 hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SocialLinkHub;