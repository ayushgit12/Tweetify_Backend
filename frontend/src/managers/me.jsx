import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TweetCard from "./TweetCard";
import { useRef } from "react";

const Me = () => {
     const ref = useRef(0)


     if(localStorage.getItem("token") === null || localStorage.getItem("user") === null){
          window.location.href = "/login";
     }
  const user = JSON.parse(localStorage.getItem("user"));

  const slideUp = () => {
     ref.current.scrollIntoView({ behavior: "smooth" });
  };

     const [tweets, setTweets] = useState([]);


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
     //     console.log(user._id);

         for (let i = 0; i < response.data.data.length; i++) {
              if(response.data.data[i].user._id === user._id){
                console.log(response.data.data[i].user._id , user._id );
                if(tweets.includes(response.data.data[i]) === false)
                    setTweets((tweets) => [...tweets, response.data.data[i]]);
           }
           
         } 
         console.log(tweets);


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
            <NavLink to="/me">
              <li>Me</li>
            </NavLink>
          </div>
        </ul>
      </nav>

      <div className="relative min-h-screen w-full bg-white">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <p className="text-center pr-96 pt-24 text-6xl font-extrabold ">
          Welcome
        </p>
        <p className="text-center text-8xl font-extrabold ">
          {user.fullName} !
        </p>
        <button className="absolute bottom-48 right-1/2" onClick={slideUp}>
          <lord-icon
            style={{ width: "130px", height: "130px" }}
            src="https://cdn.lordicon.com/xcrjfuzb.json"
            trigger="hover"
          ></lord-icon>
        </button>
      </div>
     <div className="h-24 bg-gradient-to-b from-white to-slate-300"></div>
      <div className="bg-slate-300" ref={ref}>

          <h1 className="text-5xl text-center font-extrabold pb-20 pt-8">Your Posts</h1>


          <div>
          {tweets.map((tweet, index) => {
            
            return <TweetCard key={index} tweet={tweet} />;
          })}
        </div>

        
      </div>
    </div>
  );
};

export default Me;
