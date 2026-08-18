import React, { useEffect, useState } from 'react'
import api from '../../services/api';
const initialFormState = {
  type: "work",       
  title: "",             
  institution: "",       
  startDate: "",         
  endDate: "",           
  description: "",      
  order: 0,
};


const ExperienceHub = () => {

  const [experiences, setExperience] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    api.get('/experience').then((res) => {
      setLoading(false);
      setExperience(res.data.data);
    }).catch((err) => {
      setLoading(false);
      setErr("failed to fetched ")
    })
  }, [])

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? (value === "" ? 0 : Number(value)) : value,
    }));
  }

  const handleSubmit = async () => {
    setSubmitError("");

    try {
      const { _id, ...payload } = formData;

      if (editingId) {
        const res = await api.put(`/admin/experience/${editingId}`, payload);
        setExperience((prev) =>
          prev.map((p) => (p._id === editingId ? res.data.data : p))
        );
      }else{
        
              const res = await api.post("/admin/experience", payload);
        
              setExperience((prev) => [...prev, res.data.data]);

      }


      setFormData(initialFormState);


    } catch (error) {
      setSubmitError(error.response?.data?.message || "failed to save experience")
    }

  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are u sure to delete ")
    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/experience/${id}`)
      setExperience((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      window.message("failed to delete");
    }
  }


  
    const handleEdit = (item) => {
      setFormData({
        type: item.type || "work",
        title: item.title || "",
        institution: item.institution || "",
        startDate: item.startDate || "",
        endDate: item.endDate || "",
        description: item.description || "",
        order: item.order || 0,
      });
      setEditingId(item._id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
const handleCancelEdit = ()=>{
  setFormData(initialFormState);
}
  return (
    <>

      {/* Add/Edit Experience form */}
      <div className="bg-[#0d0d0d] border border-[#262626] rounded-2xl p-5 sm:p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit Experience" : "Add Experience / Education"}
          </h2>
          {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="text-xs text-gray-400 hover:text-gray-200 underline"
          >
            Cancel edit
          </button>
       ) } 
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            >
              <option value="work">Work Experience</option>
              <option value="education">Education</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Title / Role</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Full Stack Developer / B.E. Computer"
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Institution / Company</label>
            <input
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="e.g. Google / Mumbai University"
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Start Date</label>
            <input
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="e.g. Aug 2024"
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">End Date</label>
            <input
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              placeholder="e.g. Present / May 2025"
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Order (Priority Index)</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              placeholder="0"
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-400 block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Explain responsibilities, achievements, and impact..."
            rows={4}
            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
          />
        </div>

        {submitError && <p className="text-red-400 text-sm mb-3">{submitError}</p>}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            {editingId ? "Update Experience" : "Add Experience"} 
          </button>
        </div>
      </div>

      {/* Published / Added Experiences & Education List */}
      <div className="bg-[#0d0d0d] border border-[#262626] rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold mb-4">Experience & Education List</h2>

        {loading && <p className="text-gray-500 text-sm">Loading...</p>}
        {err && <p className="text-red-400 text-sm">{err}</p>}

        {!loading && !err && experiences.length === 0 && (
          <p className="text-gray-500 text-sm">No records found.</p>
        )}

        {!loading && !err && experiences.length > 0 && (
          <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
            <table className="w-full text-left border-collapse min-w-160">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-[#262626]">
                  <th className="py-3">Type</th>
                  <th className="py-3">Title / Role</th>
                  <th className="py-3">Institution / Company</th>
                  <th className="py-3">Duration</th>
                  <th className="py-3">Order</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-[#1a1a1a] hover:bg-[#141414] transition-colors"
                  >
                    {/* Type */}
                    <td className="py-4">
                      {item.type === "work" ? (
                        <span className="inline-flex items-center gap-1 text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded-full text-xs font-medium border border-sky-400/20">
                          ● Work
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full text-xs font-medium border border-purple-400/20">
                          ● Education
                        </span>
                      )}
                    </td>

                    {/* Title */}
                    <td className="py-4 font-medium text-white">{item.title}</td>

                    {/* Institution */}
                    <td className="py-4 text-gray-400">{item.institution}</td>

                    {/* Duration */}
                    <td className="py-4 text-gray-400 text-sm">
                      {item.startDate} — {item.endDate || "Present"}
                    </td>

                    {/* Order */}
                    <td className="py-4 text-gray-500 text-sm">{item.order}</td>

                    {/* Actions */}
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
    </>
  )
}

export default ExperienceHub
