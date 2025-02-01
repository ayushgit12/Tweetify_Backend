import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "../components/Navbar";
import { BASE_URL } from "./helper";
import {
  ImagePlus,
  Send,
  X,
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
  AlertCircle
} from "lucide-react";
import { ClipLoader } from "react-spinners";
import TweetGeneratorPopup from "./TweetGenerator";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Post = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 280; // Twitter-like character limit

  if (!localStorage.getItem("token") || !localStorage.getItem("user")) {
    window.location.href = "/login";
  }

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [tweet, setTweet] = useState("");
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleTweetChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setTweet(text);
      setCharCount(text.length);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleImageFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      toast.error("Please upload an image file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageFile(file);
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const uploadToCloudinary = async (file) => {
    try {
      const CLOUD_NAME = "dktqwjd5t";
      const UPLOAD_PRESET = "tweetify";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      toast.error("Failed to upload image");
      return null;
    }
  };

  const handlePost = async () => {
    if (tweet.trim().length === 0) {
      toast.error("Please write something to post");
      return;
    }

    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    let imageUrl = null;
    if (image) {
      imageUrl = await uploadToCloudinary(image);
      if (imageUrl === null) return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/v1/users/postTweet`,
        {
          tweet: tweet,
          user: user._id,
          image: imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Tweet posted successfully");
      setTweet("");
      setImage(null);
      setPreviewUrl(null);
      setCharCount(0);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to post the tweet");
    }
  };

  const handlePostClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handlePost();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 pt-32 pb-16"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text"
        >
          Share Your Thoughts
        </motion.h1>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 relative"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-cyan-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Create Post</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPopup(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              <span>AI Assist</span>
            </motion.button>
          </div>

          <div className="space-y-6">
            <div>
              <textarea
                value={tweet}
                onChange={handleTweetChange}
                placeholder="What's on your mind?"
                className="w-full h-40 p-4 text-lg text-gray-900 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-none"
              />
              <div className="flex justify-end mt-2">
                <span className={`text-sm ${charCount > MAX_CHARS * 0.8 ? 'text-orange-500' : 'text-gray-500'}`}>
                  {charCount}/{MAX_CHARS}
                </span>
              </div>
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${
                isDragging ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {previewUrl ? (
                <div className="relative">
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
                  <div className="space-y-2">
                    <p className="text-gray-600">Drag and drop an image, or</p>
                    <label className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                      <ImagePlus className="w-5 h-5 mr-2" />
                      <span>Browse</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading || tweet.trim().length === 0}
              onClick={handlePostClick}
              className={`w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                tweet.trim().length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Post</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TweetGeneratorPopup onClose={() => setShowPopup(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Post;