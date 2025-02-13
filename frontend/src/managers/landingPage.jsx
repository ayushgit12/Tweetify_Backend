import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import logo from "../assets/logo2.png"
import { 
  Bird, 
  MessageSquare, 
  Users, 
  Zap, 
  Globe, 
  ArrowRight, 
  Bot, 
  Sparkles,
  Hash,
  TrendingUp,
  Shield,
  Heart,
  Wand2,
  Pencil,
  CheckCircle2,
  Clock,
  MessageCircle,
  Languages
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

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

// Flying Bird Component
const FlyingBird = ({ delay = 0 }) => {
  const pathVariants = {
    start: { x: -100, y: Math.random() * 500 },
    end: { 
      x: window.innerWidth + 100,
      y: Math.random() * 500,
      transition: {
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div
      className="absolute"
      variants={pathVariants}
      initial="start"
      animate="end"
    >
      <Bird className="w-6 h-6 text-slate-400" />
    </motion.div>
  );
};

// Message Cloud Component
const MessageCloud = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-4 bg-white rounded-2xl shadow-lg cursor-pointer ${className}`}
    >
      <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white transform rotate-45" />
      {children}
    </motion.div>
  );
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0 }) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay
      }}
    >
      {children}
    </motion.div>
  );
};

// Bubble Component
const Bubble = ({ size = 'w-4 h-4', delay = 0, duration = 20 }) => {
  return (
    <motion.div
      className={`absolute ${size} rounded-full bg-white/10 backdrop-blur-sm`}
      initial={{ y: '100vh', x: Math.random() * 100 - 50 }}
      animate={{ 
        y: '-100vh',
        x: Math.random() * 200 - 100
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
    />
  );
};

function LandingPage() {
  const navigate = useNavigate();
  const [birds, setBirds] = useState([]);
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    setBirds(Array.from({ length: 5 }, (_, i) => i));
    setBubbles(Array.from({ length: 15 }, (_, i) => i));
  }, []);

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
    { number: 50, label: "Active Users", suffix: "M+" },
    { number: 10, label: "Daily Posts", suffix: "M+" },
    { number: 30, label: "AI-Generated Tweets", suffix: "M+" }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Content */}
      <div className="relative">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-lg shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <FloatingElement>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <img src={logo} className='h-10' alt="" />
                  <span className="text-2xl font-bold text-slate-800">
                    Tweetify
                  </span>
                </div>
              </FloatingElement>
              <div className="flex space-x-4">
                <motion.button
                  onClick={() => navigate('/login')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-full bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  Sign In
                </motion.button>
                <motion.button
                  onClick={() => navigate('/register')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-full bg-white text-slate-800 border-2 border-slate-800 hover:bg-slate-50 transition-all"
                >
                  Join Free
                </motion.button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="min-h-screen relative overflow-hidden">
          {/* Hero Background */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2944")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay',
            }}
          />

          {/* Animated Bubbles */}
          {bubbles.map((_, index) => (
            <Bubble 
              key={index}
              size={index % 3 === 0 ? 'w-8 h-8' : index % 3 === 1 ? 'w-6 h-6' : 'w-4 h-4'}
              delay={index * 2}
              duration={15 + Math.random() * 10}
            />
          ))}

          {/* Flying Birds */}
          {birds.map((_, index) => (
            <FlyingBird key={index} delay={index * 2} />
          ))}

          <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Decorative Message Clouds */}
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-20 left-20"
                >
                  <MessageCloud className="bg-white/90">
                    <p className="text-slate-800">Hello! 👋</p>
                  </MessageCloud>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-10 right-40"
                >
                  <MessageCloud className="bg-white/90">
                    <p className="text-slate-800">Join the fun! ✨</p>
                  </MessageCloud>
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <FloatingElement>
                  <h1 className="text-6xl sm:text-7xl font-bold mb-6 text-white">
                    Share Your Story
                  </h1>
                </FloatingElement>
                <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
                  Join our vibrant community where every tweet sparkles with possibility! ✨
                </p>
                <motion.button
                  onClick={() => navigate("/register")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-white text-slate-800 text-lg font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center space-x-2"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>
          </div>
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
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Connect Globally, Chat Instantly</h2>
              <p className="text-xl text-slate-600">Break down barriers and join conversations that matter.</p>
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
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose Us?</h2>
              <p className="text-xl text-slate-600">Everything you need to express yourself and connect with others.</p>
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
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
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
                <h2 className="text-4xl font-bold text-slate-800 mb-6">Engage in Meaningful Debates</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Hash className="w-6 h-6 text-slate-500 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Topic-based Discussions</h3>
                      <p className="text-slate-600">Join conversations about topics that matter to you.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Sparkles className="w-6 h-6 text-slate-500 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                      <p className="text-slate-600">Connect with people who share your interests.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <TrendingUp className="w-6 h-6 text-slate-500 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Trending Topics</h3>
                      <p className="text-slate-600">Stay updated with what's hot in your community.</p>
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
              <h2 className="text-4xl font-bold text-slate-800 mb-4">AI-Powered Experience</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
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
                    className="text-slate-800 mb-4"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
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
                className="bg-slate-800 p-8 rounded-xl text-white"
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

       

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
              <p>© 2024 Tweetify. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;