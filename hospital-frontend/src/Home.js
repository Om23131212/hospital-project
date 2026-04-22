import React from "react";

function Home({ setIsLoggedIn }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      
      <h1>🏥 Hospital Management System</h1>

      <button onClick={handleLogout}>Logout</button>

      <br /><br />

      <button>Add Patient</button>

      <br /><br />

      <div>
        <p>- Patient 1 <button>Delete</button></p>
        <p>- Patient 2 <button>Delete</button></p>
      </div>

    </div>
  );
}

export default Home;