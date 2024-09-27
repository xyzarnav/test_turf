import React, { useState } from "react";
import axios from "axios";


const AdminSignup = () => {
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Password: "",
    Role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/admin/signup",
        formData
      );
      setSuccess(response.data.message);
      setError(""); // Clear error if successful
    } catch (err) {
      setError(err.response?.data?.error || "Failed to register admin");
      setSuccess(""); // Clear success message if there's an error
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-5 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Signup</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Full Name</label>
          <input
            type="text"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter full name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Role</label>
          <select
            name="Role"
            value={formData.Role}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="SuperAdmin">Super Admin</option>
            <option value="Treasurer">Treasurer</option>
            <option value="Editor">Editor</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;
