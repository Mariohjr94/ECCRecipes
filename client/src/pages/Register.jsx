import { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [errMsg, setErrMsg] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    try {
      const res = await axios.post("http://localhost:3001/api/auth/register", formData);
      const { token } = res.data;
      setToken(token);
      localStorage.setItem("token", token);
    } catch (err) {
      setErrMsg(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              name="username"
              className="w-full border border-gray-300 rounded px-3 py-2"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              onChange={handleChange}
              required
            />
          </div>
          {errMsg && <p className="text-red-500 text-sm mb-4">{errMsg}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Register
          </button>
          {token && <p className="text-green-600 mt-4 text-center">Registered and logged in!</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
