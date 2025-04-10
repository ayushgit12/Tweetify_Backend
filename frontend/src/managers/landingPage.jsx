import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bird, Twitter, ChevronDown, Users, MessageSquare, TrendingUp, Globe, Heart, Share2, Smartphone } from 'lucide-react';
import { Phone, Laptop, Computer} from 'lucide-react';
import logo2 from '../assets/logo2.png';
import bird from "../assets/bird.gif"

function Preloader() {
  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-600 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-white/30"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-t-white border-r-white border-b-transparent border-l-transparent absolute top-0"
          animate={{
            rotate: [0, 720],
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img src={logo2} alt="" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>

      <div className="relative min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-40 py-4 px-6 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <motion.div 
            onClick={()=>window.location.href = "/"}
              className="flex items-center gap-2 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5 }}
            >
              <img src={logo2} alt="Tweetify" className="h-8" />
              <span className="text-2xl font-bold text-gray-800">Tweetify</span>
            </motion.div>
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5 }}
            >
              <button onClick={()=>{
                window.location.href = "/login";
              }} className="bg-cyan-400 h-fit px-3 py-2 rounded-lg hover:bg-blue-600 hover:text-white">
                Login Now
              </button>
              <button onClick={()=>{
                window.location.href = "/register";
              }} className="bg-cyan-400 h-fit px-3 py-2 rounded-lg hover:bg-blue-600 hover:text-white">
                Join us Now
              </button>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7 }}
            >
              <h1 className="text-6xl md:text-8xl font-serif font-extrabold mb-6">
                Tweetify
              </h1>
              <p className="text-xl text-cyan-600 mb-8">
                Tweet your heart out, connect with the world
              </p>
              <motion.h2
                className="text-xl mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                No more restrictions to your Voice!🎤
              </motion.h2>
            </motion.div>
          </div>
        </section>

        {/* Tech Section */}
        <section className="bg-slate-300 py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-bold text-4xl md:text-6xl">
                Tweet your <span className="text-cyan-400 text-6xl md:text-7xl">truth</span>,
              </h2>
              <p className="font-bold text-4xl">no matter the tech.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-cyan-400 p-3 rounded-full">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Cross-Platform</h3>
                    <p className="text-gray-600">Available on all your devices</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-cyan-400 p-3 rounded-full">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">User-Friendly</h3>
                    <p className="text-gray-600">Intuitive interface for everyone</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-cyan-400 p-3 rounded-full">
                    <Share2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Easy Sharing</h3>
                    <p className="text-gray-600">Share content across platforms</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><Phone />Android</h4>
                  <p className="text-gray-600">Native app experience</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><Smartphone />iOS</h4>
                  <p className="text-gray-600">Seamless integration</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><Computer />Windows</h4>
                  <p className="text-gray-600">Desktop power</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><Laptop />MacBook</h4>
                  <p className="text-gray-600">Premium experience</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-slate-800 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Spark",
                  desc: "Ignite conversations. Spark the next big thing.",
                  icon: <TrendingUp className="w-8 h-8 text-cyan-400" />
                },
                {
                  title: "Chirp",
                  desc: "Chirp your thoughts. Flock together.",
                  icon: <MessageSquare className="w-8 h-8 text-cyan-400" />
                },
                {
                  title: "Pulse",
                  desc: "Get the pulse. Stay connected.",
                  icon: <Heart className="w-8 h-8 text-cyan-400" />
                },
                {
                  title: "Huddle",
                  desc: "Huddle up. Share the buzz.",
                  icon: <Users className="w-8 h-8 text-cyan-400" />
                },
                {
                  title: "Hivemind",
                  desc: "Hivemind. Think together. Fly further.",
                  icon: <Globe className="w-8 h-8 text-cyan-400" />
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-700 p-6 rounded-xl text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-black py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-white mb-8">
                From laughter to learning, <span className="text-cyan-400 text-4xl">Tweetify</span> has it all.
              </h2>
              <button onClick={()=>{
                window.location.href = "/register";
              }} className="bg-cyan-400 px-8 py-4 rounded-lg text-white hover:bg-blue-600 transition-colors text-xl font-medium">
                Join Now!
              </button>
            </motion.div>
          </div>
        </section>

        {/* Flying Birds Background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ x: -100, y: Math.random() * window.innerHeight }}
              animate={{
                x: window.innerWidth + 100,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear"
              }}
            >
              <Bird className="w-6 h-6 text-cyan-200" />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;