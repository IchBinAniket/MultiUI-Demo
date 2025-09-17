import React, { useEffect, useState } from "react";

function App() {
  const [globalCount, setGlobalCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  // simple user id generated and kept in localStorage
  const userIdKey = "myApp_userId";
  let userId = localStorage.getItem(userIdKey);

  if (!userId) {
    userId = crypto.randomUUID(); // generates a unique ID
    localStorage.setItem(userIdKey, userId);
  }

  // Fetch global counter on load
  useEffect(() => {
    debugger
    fetch("http://localhost:5136/api/counter/global")
      .then((res) => res.json())
      .then((data) => setGlobalCount(data));
  }, []);

  // Fetch user counter on load
  useEffect(() => {
    fetch(`http://localhost:5136/api/counter/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setUserCount(data));
  }, [userId]);

  // Increment global counter
  const incrementGlobal = () => {
    fetch("http://localhost:5136/api/counter/global/increment", {
      method: "POST"
    })
      .then((res) => res.json())
      .then((data) => setGlobalCount(data));
  };

  // Increment user counter
  const incrementUser = () => {
    fetch(`http://localhost:5136/api/counter/user/${userId}/increment`, {
      method: "POST"
    })
      .then((res) => res.json())
      .then((data) => setUserCount(data));
  };

  return (
  <div style={{ padding: "40px", display: "flex", gap: "30px", justifyContent: "center" }}>
    <h1>React app</h1>
      <div style={{
        border: "1px solid #ccc",
        padding: "30px",
        width: "220px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}>
        <h2 style={{ marginBottom: "15px" }}>Global Counter</h2>
        <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>{globalCount}</p>
        <button style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }} onClick={incrementGlobal}>Increment Global</button>
      </div>

      <div style={{
        border: "1px solid #ccc",
        padding: "30px",
        width: "220px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}>
        <h2 style={{ marginBottom: "15px" }}>User Counter</h2>
        <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>{userCount}</p>
        <button style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }} onClick={incrementUser}>Increment User</button>
      </div>
    </div>
  );
}

export default App;
