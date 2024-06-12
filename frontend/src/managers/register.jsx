import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";


const Register = () => {


  const [fullName, setfullName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();

  const handleRegisterEmailChange = (e) => {
    setRegisterEmail(e.target.value);
  };
  const handleRegisterPasswordChange = (e) => {
    setRegisterPassword(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setfullName(e.target.value);
  };



  useEffect(() => {
    if(localStorage.getItem("token")){
     setTimeout(() => {
       
       toast.success("Already Logged In. Redirecting to Homepage...");
     }, 1000);
     setTimeout(() => {
      window.location.href = '/homepage'
     }, 3500);
    }
  
    
  }, )

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log(fullName, registerEmail, registerPassword);

    await axios
      .post("http://localhost:8000/api/v1/users/register", {
        fullName: fullName,
        email: registerEmail,
        password: registerPassword,
      })
      .then((response) => {
        console.log("Success:", response.data);
        toast.success("Registration Successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          toastId: "registerSuccess", // Optional unique ID for the toast
        });

        const sendEmail = async () => {
          let dataSend = {
            email: registerEmail,
            subject: "Welcome to Tweetify!",
            message: `Hi ${fullName},\n\nThanks for signing up for Tweetify, your one-stop platform for tweeting, messaging, and posting! We're thrilled to have you on board and can't wait for you to connect with the world.\n\nGetting Started with Tweetify\n\nOnce you've logged in to your account, you can:\n\nCraft compelling tweets: Share your thoughts, experiences, and updates with the world in 280 characters or less.\nDirect message your friends: Have private conversations with your followers through direct messages.\nEngage in discussions: Reply to tweets, retweet interesting content, and join conversations happening around the world.\nPost multimedia content: Spruce up your tweets with images, videos, and GIFs.\nDiscover new voices: Follow friends, family, influencers, and thought leaders to stay updated on what interests you.\nExplore Tweetify's Features\n\nWe offer a variety of features to make your tweeting experience enjoyable and engaging. Explore your profile, personalize your settings, and discover new communities through hashtags and trending topics.\n\nStay Connected\n\nWe're here to help you get the most out of Tweetify.\n\nHappy tweeting!\n\nThe Tweetify Team`,
          };

          const res = await axios
            .post("http://localhost:8000/api/v1/users/sendEmail", {
              headers: {
                "Content-Type": "application/json",
              },
              data: JSON.stringify(dataSend),
            })
            .then((res) => {
              console.log("Email sent successfully");
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        };

        sendEmail();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Registration Failed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          toastId: "registerError", // Optional unique ID for the toast
        });
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative">
      <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                value={fullName}
                onChange={handleFullNameChange}
                id="fullname"
                name="email"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={registerEmail}
                onChange={handleRegisterEmailChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={registerPassword}
                onChange={handleRegisterPasswordChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a user?{" "}
          <NavLink
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login Now!
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
