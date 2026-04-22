import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import "./App.css"; // 🔥 CSS add

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

  // 🔥 axios config with token
  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // 🔥 FETCH PATIENTS
  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/patients`, authConfig);
      setPatients(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPatients();
    }
  }, [token]);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 ADD PATIENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/api/patients`, form, authConfig);
      fetchPatients();

      setForm({
        fullName: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        disease: "",
        doctorAssigned: ""
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 DELETE
  const deletePatient = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/patients/${id}`, authConfig);
      fetchPatients();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 TOGGLE CURED
  const toggleCured = async (id, current) => {
    try {
      await axios.put(
        `${BASE_URL}/api/patients/${id}`,
        { cured: !current },
        authConfig
      );
      fetchPatients();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔒 LOGIN CHECK
  if (!token) {
    return <Login />;
  }

  return (
    <div className="container">
      <div className="card">
        <h1>🏥 Hospital Management System</h1>

        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>

        <hr />

        {/* 🔥 FORM */}
        <form onSubmit={handleSubmit}>
          <input name="fullName" value={form.fullName} placeholder="Name" onChange={handleChange} />
          <input name="email" value={form.email} placeholder="Email" onChange={handleChange} />
          <input name="phone" value={form.phone} placeholder="Phone" onChange={handleChange} />
          <input name="age" value={form.age} placeholder="Age" onChange={handleChange} />
          <input name="gender" value={form.gender} placeholder="Gender" onChange={handleChange} />
          <input name="disease" value={form.disease} placeholder="Disease" onChange={handleChange} />
          <input name="doctorAssigned" value={form.doctorAssigned} placeholder="Doctor" onChange={handleChange} />

          <button type="submit">Add Patient</button>
        </form>

        <hr />

        {/* 🔥 PATIENT LIST */}
        {patients.map((p) => (
          <div key={p._id} className="patient-card">
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
            Mark as cured

            <br /><br />

            <button onClick={() => deletePatient(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;