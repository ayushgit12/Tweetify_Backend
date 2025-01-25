import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "./helper";
import ClipLoader from "react-spinners/ClipLoader";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';

import logo from "../assets/logo2.png"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedInState, setLoggedInState] = useState(false);
  const passRef = useRef(null);
  const passEyeRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Email cannot be empty");
      return;
    }

    if (password === "") {
      toast.error("Please enter password");
      return;
    }

    setLoading(true);
    setLoggedInState(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/users/login`, {
        email: email,
        password: password,
      });

      toast.success("Login Successful. Redirecting to Homepage...");
      localStorage.setItem("token", JSON.stringify(response.data.data.accessToken));
      localStorage.setItem("user", JSON.stringify(response.data.data.user));

      const sendEmail = async () => {
        const userAgent = navigator.userAgent;
        let deviceName = userAgent.match(/(?:iPhone|iPad|iPod|Android|Windows Phone|BlackBerry|Macintosh)/)?.[0] || "Desktop";
        const timeNow = new Date().toLocaleString();

        let dataSend = {
          email: email,
          subject: "Your Tweetify Account Login",
          message: `Hi ${response.data.data.user.fullName},\n\nThis email confirms that your Tweetify account was logged in by ${deviceName} at ${timeNow}.`,
        };

        await axios.post(`${BASE_URL}/api/v1/users/sendEmail`, dataSend);
        console.log("Email sent successfully");
      };

      sendEmail();
      setTimeout(() => {
        setLoading(false);
        window.location.href = "/homepage";
      }, 2000);
    } catch (error) {
      setLoading(false);
      toast.error("Invalid Credentials", { id: "invalid" });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      toast.success("Already Logged In. Redirecting to Homepage...");
      setTimeout(() => {
        window.location.href = "/homepage";
      }, 1500);
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Toaster />
      
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 z-0" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2940")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }}
      />

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-20 right-20 w-16 h-16 rounded-full hidden lg:flex items-center justify-center"
      >
        <img src={logo} className="w-16" alt="" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-20 left-20 w-16 h-16 bg-cyan-500 rounded-full hidden lg:flex items-center justify-center"
      >
        <Mail className="w-8 h-8 text-white" />
      </motion.div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between w-full p-4 bg-white/80 backdrop-blur-lg fixed top-0 z-50 shadow-sm"
      >
        <NavLink 
          to="/" 
          className="flex items-center space-x-2 text-slate-500 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-2xl font-bold">Back to Home</span>
        </NavLink>
      </motion.nav>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mt-20 w-full max-w-md p-8 bg-white rounded-2xl shadow-xl z-10"
      >
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-24 h-24 bg-gradient-to-r from-slate-800 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <LogIn className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-center text-3xl font-bold text-gray-900 mt-8 mb-6">
            Welcome Back
          </h2>

          <form className="space-y-6" onSubmit={handleLogin}>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email Address
              </label>
              <div className="mt-2 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <NavLink 
                  to="/forgotPassword" 
                  className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                >
                  Forgot password?
                </NavLink>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  ref={passRef}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div
                  ref={passEyeRef}
                  className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => {
                    setShowPassword(!showPassword);
                    passRef.current.type = showPassword ? "password" : "text";
                  }}
                >
                  {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                </div>
                <Lock className="absolute right-10 top-3 w-5 h-5 text-gray-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-slate-800 to-cyan-500 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                  loading ? "opacity-75 cursor-not-allowed" : "hover:from-slate-400 hover:to-cyan-600"
                }`}
              >
                {loading ? (
                  <ClipLoader color="#ffffff" loading={loading} size={20} />
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Sign In</span>
                    <LogIn className="w-5 h-5" />
                  </span>
                )}
              </button>
            </motion.div>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            Not a user?{" "}
            <NavLink
              to="/register"
              className="font-semibold text-blue-500 hover:text-blue-600 transition-colors"
            >
              Create your account
            </NavLink>
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-slate-700 to-cyan-500" />
    </div>
  );
};

export default Login;