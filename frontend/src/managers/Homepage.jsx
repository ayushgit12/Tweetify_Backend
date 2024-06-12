import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import TweetCard from "./TweetCard";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Navbar from "../components/Navbar";
import { Zoom } from "react-awesome-reveal";
import logo2 from "../assets/logo2.png";





const Homepage = () => {
  // const user = localStorage.getItem("user");

  // console.log(response)


  const user = JSON.parse(localStorage.getItem("user"));

  if (
    localStorage.getItem("token") === null ||
    localStorage.getItem("user") === null
  ) {
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

        localStorage.setItem(
          "noOfUsers",
          JSON.stringify(response.data.data.length)
        );
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
        <Navbar />
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        

        <img src={logo2} className="absolute h-16 top-16"  alt="" />
        <Zoom triggerOnce={true} delay={200}><h1 className="text-5xl p-5 font-bold text-center mt-16">
          Welcome {user.fullName}!
        </h1></Zoom>
        <p className="text-3xl font-bold p-5">Today's Feed</p>
      </div>

      <div>
        
        
      {
        tweets.map((tweet, index) => {
          return <TweetCard key={index} tweet={tweet} />;
        })}
      </div>

      <div className="flex justify-center">
        <Popup
          trigger={
            <button className="button bg-red-600 p-2 rounded-lg text-white hover:bg-red-800">
              {" "}
              Logout Now{" "}
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="modal border border-slate-800 w-96 h-48 bg-white">
              <div className="flex bg-slate-800 text-white py-1 items-center">
                <button className="close text-2xl ml-3" onClick={close}>
                  &times;
                </button>
                <div className="header ml-28"> Logout Window </div>
              </div>
              <div className="content mt-5 p-2">
                {" "}
                Are you sure you want to logout?{" "}
              </div>
              <div className="actions flex gap-3 mt-10 ml-3">
                <button
                  className="bg-red-500 px-2 py-1 rounded-lg hover:bg-red-700 hover:text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button
                  className="button bg-slate-400 px-2 py-1 rounded-lg hover:bg-slate-600 hover:text-white"
                  onClick={() => {
                    console.log("modal closed ");
                    close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
      
    </div>
  );
};

export default Homepage;
