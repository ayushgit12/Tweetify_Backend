import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function TweetCard({ tweet }) {
  const [isLiked, setIsLiked] = useState(false);
  const refLike = useRef(0)
  const buttonRef = useRef(0)
  const navigate = useNavigate();
  // const [start, setstart] = useState(1)


  const date = new Date(tweet.createdAt);
  console.log(tweet.likes.users.length);

  // const deleteTweet = async () => {
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   // console.log(token);
  //   if(!token){
  //     alert("User token expired, please login again");
  //     window.location.href = "/login";
  //     return;
  //   }

  //   await axios
  //     .delete(
  //       "http://localhost:8000/api/v1/users/deleteTweet",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //         data: { tweetId: tweet._id },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("Success:", response.data);
  //       alert("Tweet deleted successfully");
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      return; // No need to fetch like status if not logged in
    }

    axios
      .post(
        "http://localhost:8000/api/v1/users/showLikeTweet",
        {
          tweetId: tweet._id,
          user: user._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Success:", response.data.data.isLiked);
        setIsLiked(response.data.data.isLiked);

        if(response.data.data.isLiked){
          buttonRef.current.style.backgroundColor = "red";
        }
        else{
          buttonRef.current.style.backgroundColor = "black";
        }

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);



  const handleLike = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token);
    if (!token) {
      alert("User token expired, please login again");
      window.location.href = "/login";
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    await axios
      .post(
        "http://localhost:8000/api/v1/users/likeTweet",
        {
          tweetId: tweet._id,
          user: user._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Success:", response.data.data.isLiked);
        setIsLiked(response.data.data.isLiked);

        if(response.data.data.isLiked){
          buttonRef.current.style.backgroundColor = "red";
        }
        else{
          buttonRef.current.style.backgroundColor = "black";
        }

        

        // alert("Tweet liked successfully");

        navigate("/homepage");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };



  useEffect(() => {
    const handleHover = () => {
      refLike.current.style.opacity = 1;
    };
    const handleLeave = () => {
      refLike.current.style.opacity = 0;
    };
    buttonRef.current.addEventListener('mouseover', handleHover);
    buttonRef.current.addEventListener('mouseout', handleLeave);
  
    // Cleanup function to remove event listeners on unmount
    return () => {
      try {
        
        buttonRef.current.removeEventListener('mouseover', handleHover);
        buttonRef.current.removeEventListener('mouseout', handleLeave);
      } catch (error) {
        
      }
    };
  }, []);

  return (
    <div>
      <div
        className={`bg-white-600 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2`}
      >
        <div className="text-gray-900 font-bold text-xl mb-2">
          {tweet.tweet}
        </div>
        <div className="text-gray-900 font-bold text-xl mb-2 text-end pr-10">
          -{tweet.user.fullName}
        </div>
        <div className="relative w-32">
        <button
        ref={buttonRef}
          className=" text-white w-fit p-2 rounded-lg my-2"
          onClick={handleLike}
        >
          {isLiked ? <div className="flex "><BiSolidLike className="w-6 h-6" /><div className="opacity-0 absolute w-20 p-1 rounded-lg right-0 top-0 bg-red-500" ref={refLike}>I Like this!</div></div> : <div className="flex"><BiLike className="w-6 h-6" /><div className="opacity-0 absolute w-20 p-1 rounded-lg right-0 top-0 bg-slate-600" ref={refLike}>I Don't Like this!</div></div>}
        </button>
        </div>
        <div className="text-gray-700 text-base text-start">
          Likes: {tweet.likes.users.length}
        </div>
        
        <div className="text-gray-700 text-base">
          Posted At {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
        </div>
        <div className="text-gray-700 text-base">
          Dated: {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
        </div>
        {/* <button className='text-left bg-slate-700 w-fit p-2 text-white mt-8 rounded-md' onClick={deleteTweet}>Delete</button> */}

      </div>
    </div>
  );
}

export default TweetCard;
