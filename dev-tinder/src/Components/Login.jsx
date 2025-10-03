import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessage] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something went wrong");
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something went wrong");
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {isLoginForm ? "Welcome Back 👋" : "Create Account ✨"}
        </h2>

        <div className="space-y-4">
          {!isLoginForm && (
            <>
              {/* First Name */}
              <div>
                <label className="block text-gray-200 mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Enter your first name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-gray-200 mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Enter your last name"
                />
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-gray-200 mb-1">Email ID</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-200 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-800/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your password"
              />
              {/* Eye icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white cursor-pointer"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {showError && (
          <div className="mt-4 text-red-400 text-sm font-medium text-center">
            {error}
          </div>
        )}

        {/* Switch */}
        <p
          className="text-indigo-300 text-sm mt-4 text-center cursor-pointer hover:underline"
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm ? "New User? Sign Up" : "Existing User? Login"}
        </p>

        {/* Buttons */}
        <div className="mt-6">
          {isLoginForm ? (
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-md hover:from-indigo-600 hover:to-purple-700 transition cursor-pointer"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleSignUp}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold shadow-md hover:from-pink-600 hover:to-rose-700  cursor-pointer transition"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
