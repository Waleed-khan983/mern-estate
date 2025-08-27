import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .trim()
        .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
        .required("Username is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Must contain a lowercase letter")
        .matches(/[A-Z]/, "Must contain an uppercase letter")
        .matches(/[0-9]/, "Must contain a number")
        .matches(/[@$!%*?&]/, "Must contain a special character")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/register",
          values
        );

        if (response.data.success) {
          alert(response.data.message || "User registered successfully");
          navigate("/login");
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message || "Registration failed");
        } else {
          alert("Something went wrong. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>

      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        {/* Username */}
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username && (
          <div className="text-red-600 text-sm">{formik.errors.username}</div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-600 text-sm">{formik.errors.email}</div>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-600 text-sm">{formik.errors.password}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-xl font-bold uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      <div className="flex gap-3 mt-5">
        <p>Have an account?</p>
        <Link to={"/login"}>
          <span className="text-blue-700">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
