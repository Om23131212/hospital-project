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

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchPatients = async () => {
    const res = await axios.get(`${BASE_URL}/api/patients`, config);
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
    await axios.post(`${BASE_URL}/api/patients`, form, config);
    fetchPatients();
  };

  const deletePatient = async (id) => {
    await axios.delete(`${BASE_URL}/api/patients/${id}`, config);
    fetchPatients();
  };

  if (!token) return <Login />;

  return (
    <div className="container">
      <div className="card">
        <h1>🏥 Hospital Management System</h1>

        <button onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}>
          Logout
        </button>

        <hr />

        {/* FULL FORM */}
        <form onSubmit={handleSubmit}>
          <input name="fullName" placeholder="Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="age" placeholder="Age" onChange={handleChange} />
          <input name="gender" placeholder="Gender" onChange={handleChange} />
          <input name="disease" placeholder="Disease" onChange={handleChange} />
          <input name="doctorAssigned" placeholder="Doctor" onChange={handleChange} />

          <button type="submit">Add Patient</button>
        </form>

        <hr />

        {/* LIST */}
        {patients.map((p) => (
          <div key={p._id} className="patient-card">
            <h3>{p.fullName}</h3>
            <p>{p.disease}</p>

            <button onClick={() => deletePatient(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;