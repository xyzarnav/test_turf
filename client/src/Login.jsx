import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "./path/to/your/logo.png"; // Update the path to your logo
import "./Login.css"; // If you have custom styles
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const loginResponse = fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful") {
          localStorage.setItem("UserID", data.user.UserID);
          setEmail("");
          setPassword("");
          toast.success("Login successful!");
          localStorage.setItem("isAdmin", "false");
          localStorage.setItem("userToken", loginResponse.token);
          navigate("/home");
        } else {
          setErrorMessage("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setErrorMessage("An error occurred. Please try again later.");
      });
  };
  const handleAdminLogin = (e) => {
    e.preventDefault();

    const loginResponse = fetch("http://localhost:3001/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: adminEmail, // Ensure this key matches exactly
        Password: adminPassword, // Ensure this key matches exactly
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Admin login successful") {
          localStorage.setItem("AdminID", data.admin.AdminID);
          setAdminEmail("");
          setAdminPassword("");
          localStorage.setItem("isAdmin", "true");
          localStorage.setItem("userToken", loginResponse.token);
          toast.success("Admin login successful!");
          navigate("/home");
        } else {
          setErrorMessage("Invalid admin email or password");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setErrorMessage("An error occurred. Please try again later.");
      });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("path/to/your/background.jpg")' }}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 bg-opacity-90">
        <div className="flex justify-center mb-4">
          <img alt="Logo" className="h-16" />
        </div>
        <div className="flex justify-between mb-4">
          <button
            className={`py-2 px-4 rounded-lg ${
              !isAdminLogin
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsAdminLogin(false)}
          >
            User Login
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${
              isAdminLogin
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsAdminLogin(true)}
          >
            Admin Login
          </button>
        </div>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        {/* User Login Form */}
        {!isAdminLogin && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="text-right">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>
            <p className="text-center">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Signup now
              </a>
            </p>
          </form>
        )}

        {/* Admin Login Form */}
        {isAdminLogin && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Email Address"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>
            <p className="text-center">
              Not an admin?{" "}
              <a
                href="/register_admin"
                className="text-blue-600 hover:underline"
              >
                Signup now
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
