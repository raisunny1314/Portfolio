import { useState, useEffect } from "react";
import api from "../../services/api";

const initialFormState = {
  fullName: "",
  title: "",
  location: "",
  statusBanner: "",
  bio: "",
  resume: "",
  metrics: [{ label: "", value: "" }],
};

const GeneralInfoHub = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [docId, setDocId] = useState(null); // existing record hai to uski _id
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api
      .get("/generalinfo")
      .then((res) => {
        const data = res.data.data;
        // agar array aaya hai toh pehla item, agar single object hai toh seedha use karo
        const doc = Array.isArray(data) ? data[0] : data;
        if (doc) {
          setFormData({
            fullName: doc.fullName || "",
            title: doc.title || "",
            location: doc.location || "",
            statusBanner: doc.statusBanner || "",
            bio: doc.bio || "",
            resume: doc.resume || "",
            metrics: doc.metrics?.length ? doc.metrics : [{ label: "", value: "" }],
          });
          setDocId(doc._id);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErr("Failed to load General Info");
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMetricChange = (index, field, value) => {
    const updated = [...formData.metrics];
    updated[index][field] = value;
    setFormData({ ...formData, metrics: updated });
  };

  const handleAddMetric = () => {
    setFormData({
      ...formData,
      metrics: [...formData.metrics, { label: "", value: "" }],
    });
  };

  const handleRemoveMetric = (index) => {
    setFormData({
      ...formData,
      metrics: formData.metrics.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    setSubmitError("");
    setSuccess("");
    try {
      const res = await api.put("/admin/generalinfo", formData);
      setFormData(res.data.data);
      setDocId(res.data.data._id);
      setSuccess("Saved successfully");
    } catch (error) {
      setSubmitError(error.response?.data?.message || "Failed to save");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">General Info</h1>
      <p className="text-gray-500 mb-6">Your core profile details shown across the site.</p>

      {err && <p className="text-red-400 mb-4">{err}</p>}

      <div className="bg-[#0d0d0d] border border-[#262626] rounded-2xl p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Status Banner</label>
            <input
              name="statusBanner"
              value={formData.statusBanner}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Resume URL</label>
            <input
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-400 block mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white"
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-400">Metrics</label>
            <button
              type="button"
              onClick={handleAddMetric}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium"
            >
              + Add Metric
            </button>
          </div>

          <div className="space-y-3">
            {formData.metrics.map((m, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  placeholder="Label"
                  value={m.label}
                  onChange={(e) => handleMetricChange(index, "label", e.target.value)}
                  className="w-1/2 bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white"
                />
                <input
                  placeholder="Value"
                  value={m.value}
                  onChange={(e) => handleMetricChange(index, "value", e.target.value)}
                  className="w-1/2 bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white"
                />
                {formData.metrics.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMetric(index)}
                    className="p-2 text-red-500 hover:text-red-400 text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {submitError && <p className="text-red-400 text-sm mb-3">{submitError}</p>}
        {success && <p className="text-green-400 text-sm mb-3">{success}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
         Save Info
        </button>
      </div>
    </div>
  );
};

export default GeneralInfoHub;