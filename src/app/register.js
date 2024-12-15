import React, { useState } from "react";

export default function Register() {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"), // Add role
    };

    try {
      const response = await fetch("https://rwa-ca-1-sxyn.vercel.app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("User registered successfully");
        setError(""); // Clear errors
        event.target.reset(); // Reset the form
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <select
          name="role"
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        >
          <option value="">Select Role</option>
          <option value="customer">Customer</option>
          <option value="manager">Manager</option>
        </select>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}
