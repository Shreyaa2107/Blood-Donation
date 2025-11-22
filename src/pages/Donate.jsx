import React, { useState } from "react";

export default function Donate() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    location: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Saving...");
    try {
      const res = await fetch("http://localhost:5000/api/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          age: form.age ? Number(form.age) : undefined,
          bloodGroup: form.bloodGroup,
          location: form.location,
          phone: form.phone,
          message: form.message
        })
      });

      if (!res.ok) {
        const err = await res.json();
        setStatus("Error: " + (err.error || res.statusText));
        return;
      }

      const saved = await res.json();
      setStatus("Saved successfully!");
      setForm({ name: "", age: "", bloodGroup: "", location: "", phone: "", message: "" });
    } catch (err) {
      setStatus("Network error");
    }
  }

  return (
  <div className="container">
    <div className="form-container">
      <h2 className="form-title">Become a Donor</h2>

      <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />

      <input className="form-input" name="age" value={form.age} type="number" onChange={handleChange} placeholder="Age" />

      <select className="form-select" name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
        <option value="">Select Blood Group</option>
        <option>A+</option><option>A-</option>
        <option>B+</option><option>B-</option>
        <option>O+</option><option>O-</option>
        <option>AB+</option><option>AB-</option>
      </select>

      <input className="form-input" name="location" value={form.location} onChange={handleChange} placeholder="City / Location" />

      <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />

      <textarea className="form-textarea" name="message" value={form.message} onChange={handleChange} placeholder="Message (optional)" />

      <button className="form-btn" onClick={handleSubmit}>Submit</button>

      {status && (
        <div className={`form-status ${status.includes("success") ? "success" : "error"}`}>
          {status}
        </div>
      )}
    </div>
  </div>
);

}
