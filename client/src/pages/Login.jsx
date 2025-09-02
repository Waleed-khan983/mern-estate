import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {loginStart, loginSuccess, loginFailure} from '../redux/user/user.js'
import Oauth from "../components/Oauth.jsx";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const {loading , error} = useSelector((state) => state.user)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
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
       // tell redux we are starting
       dispatch(loginStart())
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/login",
          values
        );
        if (response.data.success) {
          dispatch(loginSuccess(response.data.user));
          console.log(response.data.token)
           navigate("/");
        }else{
          dispatch(loginFailure(response.data.message || "Login failed"))
        }
      } catch (error) {
         dispatch(loginFailure(error.response?.data?.message || "Something went wrong"))
      } 
    },
  });

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Login</h1>

      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        {/* Email Field */}
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}

        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-xl font-bold uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <Oauth />
      </form>

      <div className="flex gap-3 mt-5">
        <p>Don't have an account?</p>
        <Link to={"/register"}>
          <span className="text-blue-700">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
