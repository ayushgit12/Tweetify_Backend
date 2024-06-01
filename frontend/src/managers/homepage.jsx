import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import TweetCard from "./TweetCard";
import { useEffect, useState } from "react";

const Homepage = () => {
  // const user = localStorage.getItem("user");

  // console.log(response)

  const user = JSON.parse(localStorage.getItem("user"));

  if(localStorage.getItem("token") === null || localStorage.getItem("user") === null){
    window.location.href = "/login";
}
  const navigate = useNavigate();
  const [tweets, setTweets] = useState([]);

  
  //  console.log(user)

  const handleLogout = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token);

    if (token === null) {
      alert("Please login first");
      return;
    }
    await axios
      .post(
        "http://localhost:8000/api/v1/users/logout",
        {}, // Send empty body (optional)
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("Success:", response.data);
        alert("You have been logged out successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getTweets = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token);

    await axios
      .post(
        "http://localhost:8000/api/v1/users/showTweets",
        {}, // Send empty body (optional)
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Success:", response.data.data);
        setTweets(response.data.data.reverse());
        console.log(response.data.data);
        // const noOfActiveUsers = response.data.data.length;

        localStorage.setItem("noOfUsers", JSON.stringify(response.data.data.length));
        // alert("Tweets fetched successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center">
        <nav className="bg-slate-900 ">
          <ul className="flex justify-around">
            <div className="w-full text-center py-4 text-white">
              <a href="/homepage">
                <li>Home</li>
              </a>
            </div>
            <div className="w-full text-center py-4 text-white">
              <NavLink to="/post">
                <li>Post</li>
              </NavLink>
            </div>
            <div className="w-full text-center py-4 text-white">
              <NavLink to="/chat">
                <li>Chat</li>
              </NavLink>
            </div>
            <div className="w-full text-center py-4 text-white">
              <NavLink to="/me">
                <li>Me</li>
              </NavLink>
            </div>
          </ul>
        </nav>

        
          <h1 className="text-5xl p-5 font-bold text-center">
            Welcome {user.fullName}!
          </h1>
          <p className="text-3xl font-bold p-5">Today's Feed</p>
        </div>

        <div>
          {tweets.map((tweet, index) => {
            
            return <TweetCard key={index} color={tweet.color} tweet={tweet} />;
          })}
        </div>

        <div className="flex justify-center">
          <button
            className="bg-green-500 p-2 rounded-xl text-whit4 hover:bg-green-700"
            onClick={handleLogout}
          >
            Logout Now
          </button>
        </div>
      </div>

  );
};

export default Homepage;
