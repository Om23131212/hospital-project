import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import "./App.css";

const BASE_URL = "https://hospital-backend-ixtq.onrender.com";

function App() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    disease: "",
    doctorAssigned: ""
  });

  const token = localStorage.getItem("token");

  const fetchPatients = async () => {
    const res = await axios.get(`${BASE_URL}/api/patients`);
    setPatients(res.data);
  };

  useEffect(() => {
    if (token) fetchPatients();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${BASE_URL}/api/patients`, form);
    fetchPatients();
  };

  const deletePatient = async (id) => {
    await axios.delete(`${BASE_URL}/api/patients/${id}`);
    fetchPatients();
  };

  const toggleCured = async (id, current) => {
    await axios.put(`${BASE_URL}/api/patients/${id}`, {
      cured: !current
    });
    fetchPatients();
  };

  if (!token) return <Login />;

  return (
    <div className="container">
      <h1>🏥 Hospital Management System</h1>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>

      {/* FORM */}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <input name="fullName" placeholder="Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="age" placeholder="Age" onChange={handleChange} />
          <input name="gender" placeholder="Gender" onChange={handleChange} />
          <input name="disease" placeholder="Disease" onChange={handleChange} />
          <input name="doctorAssigned" placeholder="Doctor" onChange={handleChange} />

          <button className="add-btn">Add Patient</button>
        </form>
      </div>

      {/* PATIENT LIST */}
      {patients.map((p) => (
        <div className="card" key={p._id}>
          <h3>{p.fullName}</h3>
          <p>{p.disease}</p>

          <p className={p.cured ? "cured" : "not-cured"}>
            {p.cured ? "✅ Cured" : "❌ Not Cured"}
          </p>

          <input
            type="checkbox"
            checked={p.cured}
            onChange={() => toggleCured(p._id, p.cured)}
          />

          <br />

          <button
            className="delete-btn"
            onClick={() => deletePatient(p._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;