import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Users,
  Mail,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Github,
  MessageSquare,
  Heart,
  Share2,
  ChevronDown,
  ArrowLeft
} from "lucide-react";
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
import { BASE_URL } from "./helper";
import TweetCard from "./TweetCard";
import profile from "../assets/profile.png"

const AccountProfile = () => {
  const { slug } = useParams();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [data, setData] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Fake engagement data for visualization
  const engagementData = [
    { name: 'Posts', value: tweets.length },
    { name: 'Likes', value: tweets.reduce((acc, tweet) => acc + tweet.likes.length, 0) },
    { name: 'Comments', value: tweets.reduce((acc, tweet) => acc + tweet.comments.length, 0) }
  ];

  const COLORS = ['#0ea5e9', '#0284c7', '#0369a1'];

  // Fake activity data
  const activityData = [
    { month: 'Jan', posts: 5 },
    { month: 'Feb', posts: 8 },
    { month: 'Mar', posts: 12 },
    { month: 'Apr', posts: 7 },
    { month: 'May', posts: 15 },
    { month: 'Jun', posts: tweets.length }
  ];

  useEffect(() => {
    const fetchUserData = async (userID) => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.post(
          `${BASE_URL}/api/v1/users/getUserDetails`,
          { userID },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.data) {
          setData(response.data.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error:", err);
        setError(true);
      }
    };

    const fetchTweets = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.post(
          `${BASE_URL}/api/v1/users/showTweets`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const userTweets = response.data.data.filter(
          (tweet) => tweet.user._id === slug
        );
        setTweets(userTweets);
      } catch (err) {
        console.error("Error fetching tweets:", err);
      }
    };

    fetchUserData(slug);
    fetchTweets();
  }, [slug]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-2xl text-gray-700 mb-8">This user doesn't exist in our universe.</p>
          <NavLink to="/Homepage">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Return to Homepage
            </motion.button>
          </NavLink>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

      {/* Navigation */}
      <nav className="bg-slate-900 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <NavLink to="/Homepage" className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </NavLink>
            <h1 className="text-xl font-bold text-white">{data?.fullName}'s Profile</h1>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-64 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
        
        {/* Profile Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-xl p-6"
            >
              <div className="sm:flex sm:items-center sm:space-x-8">
                <img
                  src={`${profile}`}
                  alt={data?.fullName}
                  className="h-32 w-32 rounded-full ring-4 ring-white mx-auto sm:mx-0"
                />
                <div className="mt-6 sm:mt-0">
                  <h2 className="text-3xl font-bold text-gray-900">{data?.fullName}</h2>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-2" />
                      {data?.email}
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2" />
                      {new Date(data?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                      
                    </div>
                  </div>
                </div>
              </div>

             
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {/* Engagement Chart */}
          <div className="bg-white relative z-10 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Engagement Overview</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

         
        </div>
      </motion.div>

      {/* Posts Section */}
      <div className="bg-gradient-to-b from-slate-100 to-slate-200 py-16">
        <div className="px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text"
          >
            Posts & Thoughts
          </motion.h2>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {tweets.length > 0 ? (
              tweets.map((tweet, index) => (
                <motion.div
                className="bg-white relative z-10"
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <TweetCard tweet={tweet} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center py-16"
              >
                <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-2xl text-gray-600">No posts yet!</p>
                <p className="text-gray-500 mt-2">This user hasn't shared any thoughts.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 Tweetify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AccountProfile;