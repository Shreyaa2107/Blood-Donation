import { useState } from "react";
import "../styles/form.css";

export default function Request() {

  const API = "http://localhost:5000/api";

  // State for the form fields
  const [form, setForm] = useState({
    name: "",
    hospital: "",
    contact: "",
    bloodGroup: "",
    urgency: "medium",
    notes: ""
  });

  const [status, setStatus] = useState("");

  // Send request to backend
  async function sendRequest() {
    setStatus("");

    const body = {
      requesterName: form.name,
      hospital: form.hospital,
      contact: form.contact,
      bloodGroup: form.bloodGroup,
      urgency: form.urgency,
      notes: form.notes
    };

    try {
      const res = await fetch(API + "/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setStatus("Request submitted successfully.");
        setForm({
          name: "",
          hospital: "",
          contact: "",
          bloodGroup: "",
          urgency: "",
          notes: ""
        });
      } else {
        const err = await res.json();
        setStatus(err.error || "An error occurred.");
      }
    } catch (error) {
      setStatus("Network error. Please try again.");
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Request Blood</h2>

        <input
          className="form-input"
          placeholder="Your Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="form-input"
          placeholder="Hospital"
          value={form.hospital}
          onChange={e => setForm({ ...form, hospital: e.target.value })}
        />

        <input
          className="form-input"
          placeholder="Contact Number"
          value={form.contact}
          onChange={e => setForm({ ...form, contact: e.target.value })}
        />

        <select
          className="form-select"
          value={form.bloodGroup}
          onChange={e => setForm({ ...form, bloodGroup: e.target.value })}
        >
          <option value="">Select Blood Group</option>
          <option>A+</option><option>A-</option>
          <option>B+</option><option>B-</option>
          <option>O+</option><option>O-</option>
          <option>AB+</option><option>AB-</option>
        </select>

        <select
          className="form-select"
          value={form.urgency}
          onChange={e => setForm({ ...form, urgency: e.target.value })}
        >
          <option value="">Select Urgency</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <textarea
          className="form-textarea"
          placeholder="Notes"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
        />

        <button className="form-btn" onClick={sendRequest}>
          Submit Request
        </button>

        {status && (
          <div className="form-status">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
