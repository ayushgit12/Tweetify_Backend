import React, { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "./helper";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
import { Twitter, UserPlus, Mail, Lock, ArrowLeft } from 'lucide-react';
import logo from "../assets/logo2.png"

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registeringState, setRegisteringState] = useState(false);
  const navigate = useNavigate();
  const passRef = useRef(null);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleRegisterEmailChange = (e) => {
    setRegisterEmail(e.target.value);
  };

  const handleRegisterPasswordChange = (e) => {
    setRegisterPassword(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      toast.success("Already Logged In. Redirecting to Homepage...");
      setTimeout(() => {
        window.location.href = "/homepage";
      }, 1500);
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisteringState(true);

    try {
      await axios.post(`${BASE_URL}/api/v1/users/register`, {
        fullName,
        email: registerEmail,
        password: registerPassword,
      });

      toast.success("Registration Successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Email already in use!");
    } finally {
      setRegisteringState(false);
    }
  };

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
        <img src={logo} alt="" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-20 left-20 w-16 h-16 bg-slate-800 rounded-full hidden lg:flex items-center justify-center"
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
          className="flex items-center space-x-2 text-slate-800 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-2xl font-bold">Back to Home</span>
        </NavLink>
      </motion.nav>

      {/* Register Form */}
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
            className="w-24 h-24 bg-gradient-to-r from-slate-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg"
          >
            <UserPlus className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-center text-3xl font-bold text-gray-900 mt-8 mb-6">
            Create Your Account
          </h2>

          <form className="space-y-6" onSubmit={handleRegister}>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-900">
                Full Name
              </label>
              <div className="mt-2 relative">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={fullName}
                  onChange={handleFullNameChange}
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                />
                <UserPlus className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email Address
              </label>
              <div className="mt-2 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={registerEmail}
                  onChange={handleRegisterEmailChange}
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  ref={passRef}
                  type={showPassword ? "text" : "password"}
                  value={registerPassword}
                  onChange={handleRegisterPasswordChange}
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                </div>
                <Lock className="absolute right-10 top-3 w-5 h-5 text-gray-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-slate-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                disabled={registeringState}
              >
                {registeringState ? (
                  <ClipLoader color="#ffffff" loading={registeringState} size={20} />
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Create Account</span>
                    <UserPlus className="w-5 h-5" />
                  </span>
                )}
              </button>
            </motion.div>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            Already a user?{" "}
            <NavLink
              to="/login"
              className="font-semibold text-slate-800 hover:text-slate-600 transition-colors"
            >
              Sign in to your account
            </NavLink>
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-slate-500 to-cyan-500" />
    </div>
  );
};

export default Register;