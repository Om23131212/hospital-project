import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";

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

  // 🔥 FETCH
  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/patients`);
      setPatients(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) fetchPatients();
  }, [token]);

  // 🔥 INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 ADD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/patients`, form);
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
      await axios.delete(`${BASE_URL}/api/patients/${id}`);
      fetchPatients();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 TOGGLE
  const toggleCured = async (id, current) => {
    try {
      await axios.put(`${BASE_URL}/api/patients/${id}`, {
        cured: !current
      });
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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🏥 Hospital Management System</h1>

      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}>
        Logout
      </button>

      <hr />

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input name="fullName" value={form.fullName} placeholder="Name" onChange={handleChange} /><br /><br />
        <input name="email" value={form.email} placeholder="Email" onChange={handleChange} /><br /><br />
        <input name="phone" value={form.phone} placeholder="Phone" onChange={handleChange} /><br /><br />
        <input name="age" value={form.age} placeholder="Age" onChange={handleChange} /><br /><br />
        <input name="gender" value={form.gender} placeholder="Gender" onChange={handleChange} /><br /><br />
        <input name="disease" value={form.disease} placeholder="Disease" onChange={handleChange} /><br /><br />
        <input name="doctorAssigned" value={form.doctorAssigned} placeholder="Doctor" onChange={handleChange} /><br /><br />

        <button type="submit">Add Patient</button>
      </form>

      <hr />

      {/* LIST */}
      {patients.map((p) => (
        <div key={p._id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          margin: "10px",
          borderRadius: "10px"
        }}>
          <h3>{p.fullName}</h3>
          <p>{p.disease}</p>

          <p style={{ color: p.cured ? "green" : "red" }}>
            {p.cured ? "✅ Cured" : "❌ Not Cured"}
          </p>

          <input
            type="checkbox"
            checked={p.cured}
            onChange={() => toggleCured(p._id, p.cured)}
          />
          Mark as cured

          <br /><br />

          <button onClick={() => deletePatient(p._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;