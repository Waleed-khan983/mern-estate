import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
 

const Register = () => {
  const [formData, setFormData] = useState({});
   const [loading, setLoading] = useState(false);
  const handleChage = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData
      );

      if (response.data.success) {
        alert(response.data.message || "User registered successfully");
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Registeration failed");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
          onChange={handleChage}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
          onChange={handleChage}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
          onChange={handleChage}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-xl font-bold uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "sign Up"}
        </button>
      </form>
      <div className="flex gap-3 mt-5">
        <p>Have and account?</p>
        <Link to={"/login"}>
          <span className="text-blue-700">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
