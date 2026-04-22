import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";

const BASE_URL = "https://hospital-backend-ixtq.onrender.com";

function App() {
  const [patients, setPatients] = useState([]);
  const token = localStorage.getItem("token");

  // 🔥 GET DATA
  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/patients`);
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

  // 🔥 ADD PATIENT
  const addPatient = async () => {
    const name = prompt("Enter name");
    const age = prompt("Enter age");

    try {
      await axios.post(`${BASE_URL}/api/patients`, { name, age });
      fetchPatients();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 DELETE PATIENT
  const deletePatient = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/patients/${id}`);
      fetchPatients();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 अगर login नहीं है
  if (!token) {
    return <Login />;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>🏥 Hospital Management System</h1>

      {/* 🔥 Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>

      <br /><br />

      {/* 🔥 Add */}
      <button onClick={addPatient}>Add Patient</button>

      <br /><br />

      {/* 🔥 List */}
      {patients.map((p) => (
        <div key={p._id}>
          {p.name} - {p.age}
          <button onClick={() => deletePatient(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;