import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import TweetCardForMe from "./TweetCardForMe";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./helper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  ChevronDown,
  Users,
  UserPlus,
  MessageSquare,
  Share2,
  Info
} from "lucide-react";

const Me = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const statsRef = useRef(null);
  const navigate = useNavigate();
  const [showStatsTooltip, setShowStatsTooltip] = useState(false);

  // Authentication check
  if (!localStorage.getItem("token") || !localStorage.getItem("user")) {
    window.location.href = "/login";
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const slideUp = () => {
    statsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Chart data
  const socialData = [
    { name: "Followers", value: user.followers.users.length },
    { name: "Following", value: user.following.users.length }
  ];

  const COLORS = ["#0ea5e9", "#0284c7"];

  const getTweets = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.post(
        `${BASE_URL}/api/v1/users/showTweets`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const userTweets = response.data.data
        .filter(tweet => tweet.user._id === user._id)
        .reverse();
      
      setTweets(userTweets);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100">
      <Navbar />

      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-32 pb-16 text-center relative z-10"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold text-gray-900 mb-4"
        >
          Welcome Back
        </motion.h1>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-7xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text"
        >
          {user.fullName}!
        </motion.h2>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 py-12"
      >
        {[
          {
            title: "Spark Ideas",
            icon: MessageSquare,
            description: "Share your thoughts with the world",
            color: "from-cyan-400 to-blue-500"
          },
          {
            title: "Connect",
            icon: Share2,
            description: "Build meaningful connections",
            color: "from-blue-400 to-indigo-500"
          },
          {
            title: "Grow Together",
            icon: Users,
            description: "Learn and grow with the community",
            color: "from-indigo-400 to-purple-500"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <feature.icon className="w-12 h-12 mb-4 text-gray-700" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll Button */}
      <motion.button
        onClick={slideUp}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="mx-auto block mb-16"
        title="View Your Stats"
      >
        <ChevronDown className="w-12 h-12 text-gray-400 animate-bounce" />
      </motion.button>

      {/* Stats Section */}
      <div ref={statsRef} className="bg-white py-16 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Social Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Social Overview</h3>
                <motion.button
                  onHoverStart={() => setShowStatsTooltip(true)}
                  onHoverEnd={() => setShowStatsTooltip(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Info className="w-5 h-5" />
                </motion.button>
              </div>
              <AnimatePresence>
                {showStatsTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bg-gray-900 text-white p-2 rounded text-sm"
                  >
                    Your network growth statistics
                  </motion.div>
                )}
              </AnimatePresence>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={socialData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {socialData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-gray-600">Followers</p>
                  <p className="text-3xl font-bold text-cyan-500">{user.followers.users.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Following</p>
                  <p className="text-3xl font-bold text-blue-500">{user.following.users.length}</p>
                </div>
              </div>
            </div>

            {/* Activity Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tweet Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[{ name: 'Tweets', count: tweets.length }]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tweets Section */}
      <div className="bg-slate-100 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="px-4 bg-gray-50 "
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r pt-8 from-cyan-500 to-blue-600 text-transparent bg-clip-text">
            Your Posts
          </h2>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500" />
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {tweets.map((tweet, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white relative z-10"
                >
                  <TweetCardForMe tweet={tweet} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-slate-800 text-white py-8"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <NavLink
            to="/aboutApp"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <Info className="w-4 h-4" />
            <span>About App</span>
          </NavLink>
        </div>
      </motion.footer>
    </div>
  );
};

export default Me;