import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function TweetCard({ tweet }) {
  const [isLiked, setIsLiked] = useState(false);
  // const [start, setstart] = useState(1)


  const date = new Date(tweet.createdAt);

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
        console.log(isLiked);
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
        

        alert("Tweet liked successfully");
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
        <div className="text-gray-700 text-base">
          Posted At {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
        </div>
        <div className="text-gray-700 text-base">
          Dated: {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
        </div>
        {/* <button className='text-left bg-slate-700 w-fit p-2 text-white mt-8 rounded-md' onClick={deleteTweet}>Delete</button> */}
        <button
          className="bg-slate-800 text-white w-fit p-2 rounded-lg my-2"
          onClick={handleLike}
        >
          {isLiked ? "Unlike" : "Like"}
        </button>
      </div>
    </div>
  );
}

export default TweetCard;
