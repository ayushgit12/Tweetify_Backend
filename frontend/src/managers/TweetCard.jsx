import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

import sound1 from "../assets/like.wav";
import Dropdown from 'react-bootstrap/Dropdown';


function TweetCard({ tweet }) {
  
  // console.log(tweet.user.fullName);
  const [isLiked, setIsLiked] = useState(false);
  const tweetRef = useRef(0);
  const readMoreRef = useRef(0);
  const refLike = useRef(0)
  const buttonRef = useRef(0)
  const navigate = useNavigate();
  const [likedUsers, setlikedUsers] = useState([])
  // console.log(tweet)
  
  // const [start, setstart] = useState(1)
  const sound = new Audio(sound1);


  const date = new Date(tweet.createdAt);

  // useEffect(() => {
  //   window.location.reload();
  // });
  


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
        // console.log("Success:", response.data.data.isLiked);
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

  // console.log(tweet);



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
        // console.log("Success:", response.data.data.isLiked);
        setIsLiked(response.data.data.isLiked);

        if(response.data.data.isLiked){
          buttonRef.current.style.backgroundColor = "red";
          sound.play();
        }
        else{
          buttonRef.current.style.backgroundColor = "black";
        }

        

        // alert("Tweet liked successfully");
        const loc = useLocation();

        navigate(loc);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };



  const handleReadMore  = () => {

    if(tweetRef.current.style.height === "auto"){
      tweetRef.current.style.height = "40px";
      tweetRef.current.style.overflow = "hidden";
      readMoreRef.current.innerHTML = "Read More...";
    }
    else{
        tweetRef.current.style.height = "auto";
      tweetRef.current.style.overflow = "auto";
      readMoreRef.current.innerHTML = "Read Less...";
    }

  }

  const getUser = async (userID) => {

    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token);

    await axios
      .post(
        "http://localhost:8000/api/v1/users/getUserDetails",
        {
          userID: userID,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // console.log("Success:", response.data.data.fullName)
        setlikedUsers((likedUsers) => [...likedUsers, [response.data.data.fullName,response.data.data._id]]);

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }



  useEffect(() => {

    tweet.likes.users.map((user, index) => {
      
      getUser(user);
    })




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
        <div ref={tweetRef} className="text-gray-900 h-10 font-bold text-xl mb-2 overflow-hidden">
          {tweet.tweet}
        </div>
        <p ref={readMoreRef} className={`${readMoreRef.current.scrollHeight > readMoreRef.current.setHeight?"opacity-100 cursor-pointer ": "opacity-0 cursor-default"}`} onClick={handleReadMore}>Read More...</p>
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
        <div className="w-32">
        

        <Popup
          trigger={
            <button className="text-gray-700 text-base text-start">
          <u>Likes</u>: {tweet.likes.users.length}
        </button>
          }
          modal
          nested
        >
          {(close,index) => (
            <div key={index} className="modal border border-slate-800 w-96 min-h-48 overflow-scroll max-h-80 bg-white">
              <div className="flex bg-slate-800 text-white py-1 items-center">
                <button className="close text-2xl ml-3" onClick={close}>
                  &times;
                </button>
                <div className="header ml-28"> Liked Users </div>
              </div>
              {
                
                tweet.likes.users.length>0 && likedUsers.map((user, index) => { 
                  // console.log(tweet.likes.users)
                  
                  // console.log(user);
                  // console.log(getUser(user));
                  // console.log(user)
                  return <button className="w-full text-start" key={index}  onClick={()=>window.location.href =`/accountProfile/${user[1]}` } ><div className="content p-1"> {user[0]} </div></button>
                })
                
              }
              {tweet.likes.users.length === 0 && <div className="content p-1 text-center pt-14"> No Likes Yet! </div>}
            </div> 
          )}
        </Popup>





        </div>
        
        <div className="text-gray-700 text-base">
          Posted At {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
        </div>
        <div className="text-gray-700 text-base">
          Dated: {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
        </div>
        <div>
        <Dropdown>
      <Dropdown.Toggle className="bg-orange-400 flex items-center p-1 rounded-lg mt-2" variant="success" id="dropdown-basic">
      <lord-icon
    src="https://cdn.lordicon.com/abvsilxn.json"
    trigger="hover"
    style={{ width: "25px", height: "25px" }}>
</lord-icon>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Report this Tweet?</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
        </div>
        {/* <button className='text-left bg-slate-700 w-fit p-2 text-white mt-8 rounded-md' onClick={deleteTweet}>Delete</button> */}

      </div>
    </div>
  );
}

export default TweetCard;
