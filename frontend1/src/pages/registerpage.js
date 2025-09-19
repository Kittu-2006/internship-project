import { useState } from "react";
import API from "../api";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully! Please login.");
    } catch (err) {
      setError(err.response?.data?.message || "Error registering");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          name="name"
          placeholder="Name"
          className="w-full p-2 mb-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          className="w-full p-2 mb-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          className="w-full p-2 mb-2 border rounded"
          onChange={handleChange}
        />
        <select name="role" className="w-full p-2 mb-2 border rounded" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
          <option value="placement_cell">Admin</option>
        </select>
        <button className="bg-blue-600 text-white w-full p-2 rounded">Register</button>
      </form>
    </div>
  );
}
