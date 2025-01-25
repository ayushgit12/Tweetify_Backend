import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Users,
  MessageSquare,
  Heart,
  Share2,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import ayush from "../assets/ayush.jpeg"
import { BASE_URL } from '../managers/helper';

const AboutApp = () => {
  const [noOfTweets, setNoOfTweets] = useState(0);
  const [noOfUsers, setNoOfUsers] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Fake growth data for visualization
  const growthData = [
    { month: 'Jan', users: 120, tweets: 450 },
    { month: 'Feb', users: 250, tweets: 780 },
    { month: 'Mar', users: 380, tweets: 1200 },
    { month: 'Apr', users: 580, tweets: 1800 },
    { month: 'May', users: 750, tweets: 2400 },
    { month: 'Jun', users: noOfUsers, tweets: noOfTweets }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Tech Enthusiast",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      comment: "This platform has transformed how I connect with fellow developers. The real-time chat feature is amazing!",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      comment: "The community here is incredibly supportive. I've learned so much from the discussions.",
      rating: 5
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "UX Designer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      comment: "Clean interface and great user experience. Love the dark mode feature!",
      rating: 4
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tweetsResponse, usersResponse] = await Promise.all([
          axios.get(`${BASE_URL}/api/v1/users/noOfTweets`),
          axios.get(`${BASE_URL}/api/v1/users/noOfUsers`)
        ]);
        
        setNoOfTweets(tweetsResponse.data.tweetsSize);
        setNoOfUsers(usersResponse.data.noOfUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
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
        className="pt-32 pb-16 text-center relative z-10"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text"
        >
          About Tweetify
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto px-4"
        >
          A next-generation social platform built with the MERN stack, designed to connect developers and tech enthusiasts worldwide.
        </motion.p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4 mb-16"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <Users className="w-8 h-8 mb-4 text-cyan-500" />
          <h3 className="text-2xl font-semibold mb-2">Active Users</h3>
          <p className="text-5xl font-bold text-cyan-500">{noOfUsers}</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <MessageSquare className="w-8 h-8 mb-4 text-blue-500" />
          <h3 className="text-2xl font-semibold mb-2">Total Tweets</h3>
          <p className="text-5xl font-bold text-blue-500">{noOfTweets}</p>
        </motion.div>
      </motion.div>

      {/* Growth Chart */}
      <div className="bg-white py-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Platform Growth</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTweets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorUsers)" />
                <Area type="monotone" dataKey="tweets" stroke="#0284c7" fillOpacity={1} fill="url(#colorTweets)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-16 px-4"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: MessageSquare,
              title: "Real-time Chat",
              description: "Connect instantly with other users through our lightning-fast chat system"
            },
            {
              icon: Heart,
              title: "Social Engagement",
              description: "Like, comment, and share posts with your network"
            },
            {
              icon: Share2,
              title: "Global Reach",
              description: "Connect with developers and tech enthusiasts worldwide"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <feature.icon className="w-8 h-8 mb-4 text-cyan-500" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl shadow-lg cursor-pointer"
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.comment}</p>
                <div className="mt-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Creator Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="py-16 bg-gradient-to-b from-slate-100 to-slate-200"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <img
            src={ayush}
            alt="Creator"
            className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
          />
          <h2 className="text-2xl font-bold mb-4">Built with ❤️ by Ayush Raj Baranwal</h2>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/ayushrbaranwal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500 hover:text-cyan-600 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/ayushgit12"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500 hover:text-cyan-600 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/ayushraj1205"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500 hover:text-cyan-600 transition-colors"
              title="Twitter Profile"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Testimonial Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center mb-6">
                <img
                  src={selectedTestimonial.avatar}
                  alt={selectedTestimonial.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{selectedTestimonial.name}</h3>
                  <p className="text-gray-600">{selectedTestimonial.role}</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-6">{selectedTestimonial.comment}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="text-cyan-500 hover:text-cyan-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Star = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default AboutApp;