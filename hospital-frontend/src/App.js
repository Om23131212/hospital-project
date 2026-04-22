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
    try {
      const res = await axios.get(`${BASE_URL}/api/patients`, config);
      setPatients(res.data);
    } catch (err) {
      console.log(err);
    }
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
    <div style={{ textAlign: "center" }}>
      <h1>🏥 Hospital System</h1>

      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}>
        Logout
      </button>

      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <button>Add</button>
      </form>

      {patients.map(p => (
        <div key={p._id}>
          {p.fullName}
          <button onClick={() => deletePatient(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;