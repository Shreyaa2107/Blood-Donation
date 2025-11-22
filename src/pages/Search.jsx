import React, { useState } from "react";

export default function Search() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [donors, setDonors] = useState([]);
  const [status, setStatus] = useState("");

  async function doSearch() {
    setStatus("Searching...");
    const q = new URLSearchParams();
    if (bloodGroup) q.set("bloodGroup", bloodGroup);
    if (location) q.set("location", location);
    if (name) q.set("name", name);

    try {
      const res = await fetch("http://localhost:5000/api/donors/search?" + q.toString());
      if (!res.ok) { setStatus("Search failed"); return; }
      const data = await res.json();
      setDonors(data);
      setStatus(`${data.length} result(s)`);
    } catch (err) {
      setStatus("Network error");
    }
  }

  return (
  <div className="container">
    <div className="form-container">
      <h2 className="form-title">Search Donors</h2>

      <select className="form-select" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
        <option value="">Any Blood Group</option>
        <option>A+</option><option>A-</option>
        <option>B+</option><option>B-</option>
        <option>O+</option><option>O-</option>
        <option>AB+</option><option>AB-</option>
      </select>

      <input className="form-input" placeholder="City" value={location} onChange={(e) => setLocation(e.target.value)} />

      <input className="form-input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

      <button className="form-btn" onClick={doSearch}>Search</button>

      <div className="form-status">{status}</div>
    </div>

    {donors.length > 0 && (
      <div className="section-card" style={{ marginTop: 20 }}>
        <h3>Results</h3>
        <table>
          <thead><tr><th>Name</th><th>Blood</th><th>Location</th><th>Phone</th></tr></thead>
          <tbody>
            {donors.map(d => (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td>{d.bloodGroup}</td>
                <td>{d.location}</td>
                <td>{d.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

}
