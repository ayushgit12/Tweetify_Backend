import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import img from "../assets/user.png";
import { BASE_URL } from "./helper";
import TweetCard from "./TweetCard";

const AccountProfile = () => {
  const { slug } = useParams();

  const [data, setData] = useState(null); // User data
  const [tweets, setTweets] = useState([]); // User's tweets
  const [error, setError] = useState(false); // Error state

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <h1 className="text-5xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-2xl text-gray-700">No such user exists.</p>
        <NavLink to="/Homepage">
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded">
            Go Back to Homepage
          </button>
        </NavLink>
      </div>
    );
  }

  return (
    <div>
      <nav className="bg-slate-900">
        <ul className="flex justify-around">
          <div className="w-1/3 text-center py-4 text-white">
            <NavLink to="/Homepage">
              <li>Go Back</li>
            </NavLink>
          </div>
          <div className="w-full text-center py-4 text-white">
            <NavLink to={`/accountProfile/${slug}`}>
              <li>{data?.fullName}'s Profile</li>
            </NavLink>
          </div>
        </ul>
      </nav>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-slate-900 mt-6">
          Account Settings
        </h1>
        <div className="flex items-center justify-around flex-wrap">
          <div className="flex-col">
            <img src={img} className="h-96" alt="User" />
          </div>
          <div>
            <form className="flex flex-col items-center justify-center">
              <label className="text-lg text-slate-900 mt-6">
                User's Full Name:
              </label>
              <p className="text-xl font-bold">{data?.fullName}</p>
              <label className="text-lg text-slate-900 mt-6">
                User's Email ID:
              </label>
              <p className="text-xl font-bold">{data?.email}</p>
            </form>
          </div>
        </div>
      </div>

      <div className="h-20 bg-gradient-to-b from-white to-slate-300"></div>

      <div className="bg-slate-300">
        <h1 className="text-5xl text-center font-extrabold pb-20 pt-8">
          User's Posts
        </h1>
        <div>
          {tweets.length > 0 &&
            tweets.map((tweet, index) => (
              <TweetCard key={index} tweet={tweet} />
            ))}
        </div>

        {tweets.length === 0 && (
          <div className="text-center text-2xl pt-1 pb-10">No Posts Yet!</div>
        )}
      </div>
    </div>
  );
};

export default AccountProfile;
