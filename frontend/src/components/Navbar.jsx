import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../managers/helper.js';
import {
  Home,
  Send,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react';
import logo from '../assets/logo2.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const handleLogout = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    
    if (!token) {
      toast.error("Please login first");
      return;
    }

    toast.loading("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    setTimeout(() => {
      toast.dismiss();
      toast.success("Logged out successfully");
      navigate("/login");
    }, 1000);
  };

  const menuItems = [
    {
      path: '/homepage',
      name: 'Home',
      icon: Home
    },
    {
      path: '/post',
      name: 'Post',
      icon: Send
    },
    {
      path: '/chat',
      name: 'Chat',
      icon: MessageSquare
    },
    {
      path: '/me',
      name: 'Me',
      icon: User
    }
  ];

  const sideMenuItems = [
    {
      path: `/accountProfile/${JSON.parse(localStorage.getItem("user"))?._id}`,
      name: 'Account',
      icon: User
    },
    {
      path: '/chat',
      name: 'Chat',
      icon: MessageSquare
    },
    {
      path: '/accountSettings',
      name: 'System Settings',
      icon: Settings
    }
  ];

  return (
    <div className="fixed w-full top-0 z-50">
      <Toaster />
      
      {/* Side Menu Overlay */}
      <AnimatePresence>
        {sideMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setSideMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Side Menu */}
      <motion.div
        className="fixed top-0 left-0 h-screen w-80 bg-gradient-to-b from-slate-800 to-slate-900 z-50 shadow-xl"
        initial={{ x: "-100%" }}
        animate={{ x: sideMenuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="flex items-center justify-between p-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSideMenuOpen(false)}
            className="text-white hover:text-cyan-400 transition-colors"
          >
            <ChevronLeft size={32} />
          </motion.button>
          <div onClick={()=>{
            setSideMenuOpen(false);
          }} className="flex items-center gap-3 cursor-pointer">
        <img src={logo} className='w-9' alt="" />
            <span className="text-white text-xl font-semibold">Tweetify</span>
          </div>
        </div>

        <div className="px-4 py-6">
          {sideMenuItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                onClick={() => setSideMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            </motion.div>
          ))}

          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setLogoutModalOpen(true)}
            className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full mt-4"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSideMenuOpen(true)}
              className="p-2 text-white hover:text-cyan-400 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </motion.button>

            <div className="flex items-center space-x-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="relative px-6 py-4 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setActiveTab(item.path)}
                >
                  <div className="flex flex-col items-center gap-1">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {activeTab === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                    />
                  )}
                </NavLink>
              ))}
            </div>
            <div className="w-6" /> {/* Spacer for alignment */}
          </div>
        </div>
      </motion.nav>

      {/* Logout Modal */}
      <AnimatePresence>
        {logoutModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setLogoutModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Confirm Logout</h3>
                <button
                  onClick={() => setLogoutModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to log out of your account?
              </p>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium"
                >
                  Logout
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLogoutModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;