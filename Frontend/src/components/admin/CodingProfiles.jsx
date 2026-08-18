import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../services/api';


const initialFormState = {
  platform: "LeetCode",
  handle: "",
  profileUrl: "",
  icon: "",
  metric: [{ label: "", value: "" }],
};


const CodingProfiles = () => {

  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [submitError, setsubmitError] = useState("");
  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    api.get('/codingprofile').then((res) => {
      setLoading(false);
      setProfiles(res.data.data);
    }).catch((err) => {
      setLoading(false);
      setErr("failed to fetched ")
    })
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleAddMetric = () => {
    setFormData({
      ...formData,
      metric: [...formData.metric, { label: "", value: "" }],
    });
  };

  const handleMetricChange = (index, field, value) => {
    const updatedMetrics = [...formData.metric];
    updatedMetrics[index][field] = value;
    setFormData({ ...formData, metric: updatedMetrics });
  };

  const handleRemoveMetric = (index) => {
    const updatedMetrics = formData.metric.filter((_, i) => i !== index);
    setFormData({ ...formData, metric: updatedMetrics });
  };

  const handleSubmit = async () => {

    setsubmitError("");
    const { _id, ...payload } = formData;


    try {

      if (editingId) {
        const update = await api.put(`/admin/codingprofile/${editingId}`, payload);
        setProfiles((prev) => prev.map((p) => p._id === editingId ? update.data.data : p));

      } else {

        const res = await api.post("/admin/codingprofile", payload);
        setProfiles((prev) => [...prev, res.data.data]);
      }

      setFormData(initialFormState);
      setEditingId(null);

    } catch (err) {
      setsubmitError(err.response?.data?.message || "Failed to submit");
    }
  }

  const handleEdit = (item) => {
    setFormData({ ...item });
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleCancelEdit = () => {
    setFormData(initialFormState);
    setEditingId(null);
  }


  const handleDelete = async (id) => {

    setsubmitError("");

    const confirmDelete = window.confirm("Are u really want to delete ");

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/codingprofile/${id}`)

      setProfiles((prev) => prev.filter((p) => p._id !== id));

    } catch (err) {
      setsubmitError(err.response?.data?.message || "Failed to delete");
    }
  }

  return (
    <div>

      <div className="bg-[#0d0d0d] border border-[#262626] rounded-2xl p-5 sm:p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            {editingId ? "Edit Coding Profile" : "Add Coding Profile"}
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
            <label className="text-sm text-gray-400 block mb-1">Platform</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            >
              <option value="LeetCode">LeetCode</option>
              <option value="GitHub">GitHub</option>
              <option value="GeeksforGeeks">GeeksforGeeks</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">Handle / Username</label>
            <input
              type="text"
              name="handle"
              value={formData.handle}
              onChange={handleChange}
              placeholder="e.g. johndoe"
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">Profile URL</label>
            <input
              type="text"
              name="profileUrl"
              value={formData.profileUrl}
              onChange={handleChange}
              placeholder="https://leetcode.com/..."
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">Icon (emoji)</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="⚡"
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Dynamic Metrics Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-400">Metrics (Stats & Achievements)</label>
            <button
              type="button"
              onClick={handleAddMetric}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium"
            >
              + Add Metric
            </button>
          </div>

          <div className="space-y-3">
            {formData.metric && formData.metric.map((m, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Label (e.g. Solved, Rating)"
                  value={m.label}
                  onChange={(e) => handleMetricChange(index, "label", e.target.value)}
                  className="w-1/2 bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. 500+, Top 5%)"
                  value={m.value}
                  onChange={(e) => handleMetricChange(index, "value", e.target.value)}
                  className="w-1/2 bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                />
                {formData.metric.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMetric(index)}
                    className="p-2 text-red-500 hover:text-red-400 text-sm"
                    title="Remove Metric"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {submitError && <p className="text-red-400 text-sm mb-3">{submitError}</p>}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            {editingId ? "Update Profile" : "Add Profile"}
          </button>
        </div>
      </div>


      <div className="bg-[#0d0d0d] border border-[#262626] rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Coding Profiles</h2>

        {loading && <p className="text-gray-500 text-sm">Loading...</p>}
        {err && <p className="text-red-400 text-sm">{err}</p>}

        {!loading && !err && profiles.length === 0 && (
          <p className="text-gray-500 text-sm">No coding profiles added yet.</p>
        )}

        {!loading && !err && profiles.length > 0 && (
          <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
            <table className="w-full text-left border-collapse min-w-160">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-[#262626]">
                  <th className="py-3">Platform</th>
                  <th className="py-3">Handle</th>
                  <th className="py-3">Metrics</th>
                  <th className="py-3">Profile Link</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-[#1a1a1a] hover:bg-[#141414] transition-colors"
                  >
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1.5 font-medium text-white">
                        <span>{item.icon || "💻"}</span>
                        <span>{item.platform}</span>
                      </span>
                    </td>

                    <td className="py-4 text-gray-300 font-medium">{item.handle}</td>

                    <td className="py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {item.metric && item.metric.length > 0 ? (
                          item.metric.map((m, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 text-xs bg-[#1a1a1a] border border-[#262626] px-2 py-0.5 rounded-md text-gray-300"
                            >
                              <span className="text-gray-500">{m.label}:</span>
                              <span className="font-semibold text-white">{m.value}</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-600 text-xs">—</span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 text-sm">
                      {item.profileUrl ? (
                        <a
                          href={item.profileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sky-400 hover:underline inline-flex items-center gap-1"
                        >
                          Visit ↗
                        </a>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>

                    <td className="py-4 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-sky-500/30 text-sky-500 bg-sky-500/10 hover:bg-sky-500/20 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item._id)}
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
  )
}

export default CodingProfiles
