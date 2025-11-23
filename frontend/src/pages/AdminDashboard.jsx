import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
  setStatus("Loading...");

  const token = localStorage.getItem("bd_token");
  if (!token) {
    setStatus("Please login first");
    return;
  }

  try {
    // Fetch donors
    const resDonors = await fetch("http://localhost:5000/api/donors", {
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    });
    if (!resDonors.ok) { setStatus("Failed to load donors"); return; }
    const dataDonors = await resDonors.json();
    setDonors(dataDonors);

    // Fetch requests
    const resRequests = await fetch("http://localhost:5000/api/requests", {
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    });
    if (!resRequests.ok) { setStatus("Failed to load requests"); return; }
    const dataRequests = await resRequests.json();
    setRequests(dataRequests);

    setStatus("");
  } catch (err) {
    setStatus("Network error");
  }
}

async function handleDonorRemove(id) {
  const token = localStorage.getItem("bd_token");
  if (!token) return;

  try {
    const res = await fetch(`http://localhost:5000/api/donors/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) {
      setDonors(donors.filter(d => d._id !== id));
    } else {
      alert("Failed to remove donor");
    }
  } catch (err) {
    alert("Network error");
  }
}

async function handleRequestComplete(id) {
  const token = localStorage.getItem("bd_token");
  if (!token) return;

  try {
    const res = await fetch(`http://localhost:5000/api/requests/${id}/fulfill`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
    });
    if (res.ok) {
      setRequests(requests.filter(r => r._id !== id));
    } else {
      alert("Failed to mark request completed");
    }
  } catch (err) {
    alert("Network error");
  }
}


  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <div>{status}</div>

      <div className="section-card">
        <h3>All Donors</h3>
        <table>
          <thead>
            <tr><th>Name</th><th>Age</th><th>Blood</th><th>Location</th><th>Phone</th><th>Action</th></tr>
          </thead>
          <tbody>
            {donors.map(d => (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td>{d.age}</td>
                <td>{d.bloodGroup}</td>
                <td>{d.location}</td>
                <td>{d.phone}</td>
                <td>
                    <button className="btn" onClick={() => handleDonorRemove(d._id)}>Donated</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-card">
        <h3>All Requests</h3>
        <table>
          <thead>
            <tr><th>Name</th><th>Hospital</th><th>Contact</th><th>Blood</th><th>Urgency</th><th>Notes</th><th>Action</th></tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r._id}>
                <td>{r.requesterName}</td>
                <td>{r.hospital}</td>
                <td>{r.contact}</td>
                <td>{r.bloodGroup}</td>
                <td>{r.urgency}</td>
                <td>{r.notes}</td>
                <td>
                    <button className="btn" onClick={() => handleRequestComplete(r._id)}>Completed</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
