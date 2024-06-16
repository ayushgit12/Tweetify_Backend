import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './suggestions.css'

import TweetCard from "./TweetCard";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Navbar from "../components/Navbar";
import { Zoom } from "react-awesome-reveal";
import logo2 from "../assets/logo2.png";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "./helper";

const Homepage = () => {
  // const user = localStorage.getItem("user");
  const [email, setEmail] = useState("");
  // const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const possibleValues = [];



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


  const handleInputChange = (e) => {
    setEmail(e.target.value);
    console.log(possibleValues)
    if (e.target.value.length > 0) {
      const filteredSuggestions = possibleValues.filter(suggestion =>
        suggestion[0].toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filteredSuggestions);
      setSuggestions(filteredSuggestions.length > 0 ? filteredSuggestions : ['No matches found']);
    } else {
      setSuggestions([]);
    }
  }

  //  console.log(user)

  const handleSearchUser = async () => {
    if (email === "") {
      toast.error("Please enter email address to search for user");
      return;
    }
    const token = JSON.parse(localStorage.getItem("token"));

    await axios
      .post(
        `${BASE_URL}/api/v1/users/emailToUserID`,
        {
          email: email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // console.log("Success:", response.data);
        toast.success("User found successfully");

        setTimeout(() => {
          navigate(`/accountProfile/${response.data.data._id}`);
        }, 2000);
        // settweet("");
      })
      .catch((error) => {
        toast.error("User not found");
        console.error("Error:", error);
      });
  };

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
        `${BASE_URL}/api/v1/users/logout`,
        {}, // Send empty body (optional)
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // console.log("Success:", response.data);

        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Some error occured while logging out");
      });
  };

  const getTweets = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token);

    await axios
      .post(
        `${BASE_URL}/api/v1/users/showTweets`,
        {}, // Send empty body (optional)
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // console.log("Success:", response.data.data);
        setTweets(response.data.data.reverse());
        // console.log(response.data.data);
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

    const getAllUsers = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(
          `${BASE_URL}/api/v1/users/getAllUsers`,
          {}, // Send empty body (optional)
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          // console.log("Success:", response.data.data);
          response.data.data.map((user) => {
            possibleValues.push([user.email, user._id]);
          });
          // console.log(possibleValues);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    getAllUsers();
  }, []);


  

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center">
        <Navbar />
        <Toaster />
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="flex justify-end">
          <Popup
            trigger={
              <button className="mt-20 mr-10 bg-slate-300 rounded-lg hover:scale-125 transform p-1 hover:bg-red-400 hover:text-white w-fit">
                <lord-icon
                  src="https://cdn.lordicon.com/gwvmctbb.json"
                  trigger="hover"
                  style={{ width: "30px", height: "30px" }}
                ></lord-icon>
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
                      // console.log("modal closed ");
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

        <div className="flex items-center justify-center md:justify-between flex-wrap">
          <img src={logo2} className="w-16 h-16 ml-4 md:static absolute top-20" alt="" />
          <Zoom triggerOnce={true} delay={200}>
            <h1 className="text-5xl p-5 font-bold text-center">
              Welcome {user.fullName}!
            </h1>
          </Zoom>

          <div className="flex flex-col mx-auto md:mx-0 gap-10">
            <div className="flex justify-center">
              <div className="flex w-96 relative md:mr-5">
              <div className="autocomplete-wrapper w-full ml-4 md:ml-0">
                <input
                  type="text"
                  placeholder="Enter Email Address to search for user"
                  value={email}
                  onChange={handleInputChange}
                  className="rounded-full w-96 h-16 pl-6"
                  aria-autocomplete="list"
        aria-controls="autocomplete-list"
                />
                {console.log(suggestions)}
                 {suggestions.length > 0 && (
        <ul id="autocomplete-list" className="suggestions-list" role="listbox">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => navigate('/accountProfile/'+suggestion[1])}
              role="option"
              // Additional props
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
                </div>
                <button
                  className="absolute right-4 top-4"
                  onClick={handleSearchUser}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/kkvxgpti.json"
                    trigger="hover"
                    style={{ width: "30px", height: "30px" }}
                  ></lord-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="text-3xl font-bold p-5">Today's Feed</p>
      </div>

      <div>
        {tweets.map((tweet, index) => {
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
                    // console.log("modal closed ");
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
