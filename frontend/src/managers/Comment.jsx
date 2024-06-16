import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import profile from "../assets/profile.png";
import { IoSend } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const Comment = () => {
  const tweet = useLocation().state;
 const date = new Date();


  // console.log(date);
  const [commentAdded, setCommentAdded] = useState("");
  const [userFullNameId, setUserFullNameId] = useState([]);

  const getUser = async (userID, comment, date, time) => {
    console.log(date,time);

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
        console.log("Success:", response.data.data.fullName);
        setUserFullNameId((userFullNameId) => [
          ...userFullNameId,
          [response.data.data.fullName, response.data.data._id, comment, date, time],
        ]);
        // return response.data.data.fullName
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCommentAdded = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      alert("Please login to comment");
      window.location.href = "/login";
    }

    if (commentAdded === "") {
      toast.error("Comment cannot be empty");
      return;
    }

    const tweetId = tweet._id;
    const comment = commentAdded;
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(tweetId)
//     console.log(comment);
//     console.log(user);
    await axios
      .post(
        "http://localhost:8000/api/v1/users/commentAdded",
        {
          tweetId,
          comment,
          user
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const getComments = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const tweetId = tweet._id;
      await axios
        .post(
          "http://localhost:8000/api/v1/users/getComments",
          {
            tweetId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response.data.data);

          response.data.data.map((comm, index) => {
          getUser(comm.user, comm.comment, comm.date, comm.time);
          })
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getComments();
  }, []);



function convertTime(time) {
     // Split the time string into hours, minutes, and seconds (optional)
     const [hours, minutes, seconds] = time.split(":");
   
     // Convert hours to 12-hour format
     const newHours = hours % 12 || 12;  // Get remainder for hour in 12-hour format, or 12 if 0
   
     // Set AM or PM indicator
     const amPm = hours >= 12 ? "PM" : "AM";
   
     // Create the formatted time string
    //  console.log(minutes)
     const formattedTime = `${newHours.toString().padStart(2, "0")}:${minutes.length==1?"0"+minutes: minutes}:${seconds ? seconds : "00"} ${amPm}`;
   
     return formattedTime;
   }



  return (
    <div>
      <Toaster />
      <nav className="bg-slate-900 ">
        <ul className="flex justify-around">
          <div className="w-1/3 text-center py-4 text-white">
            <NavLink to="/homepage">
              <li>Go Back</li>
            </NavLink>
          </div>
          <div className="w-full text-center py-4 text-white">
            <li>Comment Here</li>
          </div>
        </ul>
      </nav>

      <div>
        <div>
          <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white p-4 m-4 rounded-lg">
              <div>
                <div>
                  <h1 className="text-lg font-bold flex items-center gap-2">
                    <img src={profile} className="h-10" alt="" />{" "}
                    {tweet.user.fullName}
                  </h1>
                </div>
                <div>
                  <h1 className="text-lg">{tweet.tweet}</h1>
                </div>
                <div>
                  <h1 className="text-sm mt-2">
                    {date.getHours() > 12
                      ? date.getHours() - 12
                      : date.getHours()}
                    :{date.getMinutes()} {date.getHours() > 12 ? "PM" : "AM"} •{" "}
                    {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                  </h1>
                  <hr className="mt-4" />
                  <h1 className="text-sm pt-4">
                    Likes : {tweet.likes.users.length}
                  </h1>
                  <hr className="mt-4" />
                  <div className="relative">
                    <img
                      src={profile}
                      className="h-10 absolute top-3 left-1"
                      alt=""
                    />
                    <input
                      value={commentAdded}
                      onChange={(e) => setCommentAdded(e.target.value)}
                      type="text"
                      className="mt-2 w-full rounded-full pl-12"
                      placeholder="Post your reply"
                    />
                    <button
                      onClick={handleCommentAdded}
                      className="absolute top-4 right-3"
                    >
                      <IoSend className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <div>
                    {console.log(userFullNameId)}
                  {userFullNameId.map((comment, index) => {
                    return (
                      <div key={index} className="mt-4 border rounded-lg p-3">
                        <div>
                          <h1 className={`text-lg font-bold flex items-center gap-2 ${comment[1]===tweet.user._id? "text-red-600" : ""}`}>
                              {/* {console.log(comment[1], tweet.user._id)} */}
                            <img src={profile} className={`h-10`} alt="" />{" "}
                            <p className="cursor-pointer pb-1" onClick={() =>
                          (window.location.href = `/accountProfile/${comment[1]}`)
                        }>{comment[0]}</p>
                          </h1>
                        </div>
                        <div>
                          <h1 className="text-lg pl-2">{comment[2]}</h1>
                          <h1 className="text-end text-sm mt-3">{convertTime(comment[4])}</h1>
                          <h1 className="text-end text-sm">{comment[3].split("T")[0]} </h1>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
