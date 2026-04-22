import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

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

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios.get("https://hospital-backend-ixtq.onrender.com/api/patients")
      .then(res => setPatients(res.data))
      .catch(err => console.log(err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("https://hospital-backend-ixtq.onrender.com/api/patients", form)
      .then(() => {
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
      })
      .catch(err => console.log(err));
  };

  // DELETE
  const deletePatient = (id) => {
    axios.delete(`https://hospital-backend-ixtq.onrender.com/api/patients/${id}`)
      .then(() => fetchPatients())
      .catch(err => console.log(err));
  };

  // TOGGLE CURED
  const toggleCured = (id, currentStatus) => {
    axios.put(`https://hospital-backend-ixtq.onrender.com/api/patients/${id}`, {
      cured: !currentStatus
    })
    .then(() => fetchPatients())
    .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h1>🏥 Hospital Management System</h1>

      {/* FORM */}
      <form className="form" onSubmit={handleSubmit}>
        <input name="fullName" value={form.fullName} placeholder="Name" onChange={handleChange} />
        <input name="email" value={form.email} placeholder="Email" onChange={handleChange} />
        <input name="phone" value={form.phone} placeholder="Phone" onChange={handleChange} />
        <input name="age" value={form.age} placeholder="Age" onChange={handleChange} />
        <input name="gender" value={form.gender} placeholder="Gender" onChange={handleChange} />
        <input name="disease" value={form.disease} placeholder="Disease" onChange={handleChange} />
        <input name="doctorAssigned" value={form.doctorAssigned} placeholder="Doctor" onChange={handleChange} />

        <button type="submit">Add Patient</button>
      </form>

      {/* CARDS */}
      <div className="card-container">
        {patients.map((p) => (
          <div className="card" key={p._id}>
            <h3>{p.fullName}</h3>

            <p><b>Email:</b> {p.email}</p>
            <p><b>Phone:</b> {p.phone}</p>
            <p><b>Age:</b> {p.age}</p>
            <p><b>Disease:</b> {p.disease}</p>
            <p><b>Doctor:</b> {p.doctorAssigned}</p>

            {/* STATUS COLOR */}
            <p className={p.cured ? "status green" : "status red"}>
              {p.cured ? "✅ Cured" : "❌ Not Cured"}
            </p>

            {/* CHECKBOX */}
            <label>
              <input
                type="checkbox"
                checked={p.cured}
                onChange={() => toggleCured(p._id, p.cured)}
              />
              Mark as Cured
            </label>

            {/* DELETE */}
            <button className="delete-btn" onClick={() => deletePatient(p._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;