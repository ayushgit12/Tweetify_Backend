import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  MessageSquare, 
  Users, 
  Zap, 
  Globe, 
  ArrowRight, 
  Clock,
  MessageCircle,
  Hash,
  Sparkles,
  Languages,
  TrendingUp,
  Shield,
  Heart,
  Bot,
  Wand2,
  Pencil,
  CheckCircle2
} from 'lucide-react';
import {useNavigate} from "react-router-dom"
import logo from "../assets/logo2.png"
import bg from "../assets/bgtw.avif"

// Counter component for animated statistics
const Counter = ({ from = 0, to, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(from);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      let startTime;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * (to - from) + from));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

function landingPage() {
  const navigate = useNavigate()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Express Yourself",
      description: "Share your thoughts with the world in real-time"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Connect",
      description: "Build meaningful connections with like-minded people"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Stay Updated",
      description: "Get instant updates on what matters to you"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Your voice can reach millions across the globe"
    }
  ];

  const chatFeatures = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: "24/7 Engagement",
      description: "The conversation never stops. Connect with people around the clock."
    },
    {
      icon: <Languages className="w-12 h-12" />,
      title: "Global Chat",
      description: "Break language barriers with real-time translation in over 100 languages."
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: "Rich Conversations",
      description: "Share media, GIFs, and polls in your conversations."
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Safe Space",
      description: "Advanced moderation tools to keep conversations respectful."
    }
  ];

  const aiFeatures = [
    {
      icon: <Bot className="w-12 h-12" />,
      title: "AI-Powered Tweets",
      description: "Generate engaging tweets with our advanced AI assistant.",
      example: "Writer's block? Let AI spark your creativity!"
    },
    {
      icon: <Wand2 className="w-12 h-12" />,
      title: "Smart Suggestions",
      description: "Get real-time suggestions to improve your tweets' impact.",
      example: "Optimize your message for better engagement."
    },
    {
      icon: <Pencil className="w-12 h-12" />,
      title: "Grammar Enhancement",
      description: "Auto-correct grammar and enhance readability instantly.",
      example: "Perfect grammar, every time."
    },
    {
      icon: <CheckCircle2 className="w-12 h-12" />,
      title: "Content Optimization",
      description: "AI analyzes your content for maximum reach and engagement.",
      example: "Reach the right audience at the right time."
    }
  ];

  const stats = [
    { number: 50, label: "Active Users", suffix: "+" },
    { number: 10, label: "Daily Posts", suffix: "+" },
    { number: 30, label: "AI-Generated Tweets", suffix: "+" }
  ];

  return (
    <div className="relative">
      {/* Hero Background */}
      <div 
        className="fixed inset-0 z-0" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2940")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg shadow-sm z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <motion.div
              onClick={()=>window.location.reload()}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <img src={logo} className='w-10' alt="" />
                <span className="text-2xl font-bold text-slate-800">Tweetify</span>
              </motion.div>
              <div className="flex space-x-4">
                <motion.button
                onClick={() => navigate('/login')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full bg-slate-800 text-white hover:bg-slate-600 transition-colors cursor-pointer"
                >
                  Sign In
                </motion.button>
                <motion.button
                onClick={() => navigate('/register')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full bg-white text-slate-500 border border-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Sign Up
                </motion.button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div
  className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 bg-slate-600"
  style={{
    // backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-center bg-white/80 backdrop-blur-sm p-10 rounded-lg"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center"
    >
      <img src={logo} alt="" />
    </motion.div>
    <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 mb-6">
      Share Your Story
      <br />
      <span className="text-slate-800">With The World</span>
    </h1>
    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      Join others who use our platform to connect, share, and make their voice heard.
    </p>
    <motion.button
    onClick={()=>navigate("/register")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-4 rounded-full bg-slate-900 text-white text-lg font-semibold hover:bg-slate-600 transition-colors inline-flex items-center space-x-2 cursor-pointer"
    >
      <span>Get Started</span>
      <ArrowRight className="w-5 h-5" />
    </motion.button>
  </motion.div>
</div>


        {/* World Chat Section */}
        <div className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Connect Globally, Chat Instantly</h2>
              <p className="text-xl text-gray-600">Break down barriers and join conversations that matter.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {chatFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="text-slate-500 mb-4"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div ref={ref} className="py-20 bg-white/80 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
              <p className="text-xl text-gray-600">Everything you need to express yourself and connect with others.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-slate-500 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Debate Section */}
        <div className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Engage in Meaningful Debates</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Hash className="w-6 h-6 text-slate-500 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Topic-based Discussions</h3>
                      <p className="text-gray-600">Join conversations about topics that matter to you.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Sparkles className="w-6 h-6 text-slate-500 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                      <p className="text-gray-600">Connect with people who share your interests.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <TrendingUp className="w-6 h-6 text-slate-500 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Trending Topics</h3>
                      <p className="text-gray-600">Stay updated with what's hot in your community.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800"
                  alt="People discussing"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-slate-500 text-white p-4 rounded-lg shadow-lg">
                  <p className="text-lg font-semibold">24/7 Active Community</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* AI Features Section */}
        <div className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <Bot className="w-16 h-16 text-slate-800 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Experience</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Enhance your social media presence with our cutting-edge AI features
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aiFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="text-slate-900 mb-4"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 mb-4">{feature.description}</p>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-700">{feature.example}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Demo Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-slate-500 to-slate-600 p-8 rounded-xl text-white"
              >
                <h3 className="text-2xl font-bold mb-6">Watch AI in Action</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-lg">
                    <p className="text-sm opacity-75">Original Tweet</p>
                    <p className="font-medium">"just had coffee its amazing but grammer is bad"</p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg backdrop-blur-lg">
                    <p className="text-sm opacity-75">AI-Enhanced Tweet</p>
                    <p className="font-medium">"Just had an amazing cup of coffee! ☕✨ #CoffeeLover"</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-bold mb-6">AI-Powered Improvements</h3>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span>Grammar and spelling correction</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span>Emoji suggestions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span>Hashtag recommendations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span>Style enhancement</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="py-20 bg-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="p-8 rounded-lg bg-slate-600 backdrop-blur-lg"
                >
                  <div className="text-5xl font-bold mb-2">
                    <Counter to={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-xl">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Section */}
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>© 2024 Tweetify. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default landingPage;