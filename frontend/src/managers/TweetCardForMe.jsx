import React from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Popup from "reactjs-popup";

function TweetCardForMe({ tweet }) {
  const date = new Date(tweet.createdAt);

  const deleteTweet = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token);
    if (!token) {
      alert("User token expired, please login again");
      window.location.href = "/login";
      return;
    }

    await axios
      .delete("http://localhost:8000/api/v1/users/deleteTweet", {
        headers: { Authorization: `Bearer ${token}` },
        data: { tweetId: tweet._id },
      })
      .then((response) => {
        console.log("Success:", response.data);
        toast.success("Tweet deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>

  <Toaster position="top-center" reverseOrder={false} />
      <div
        className={`bg-white-600 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2`}
      >
        <div className="text-gray-900 font-bold text-xl mb-2">
          {tweet.tweet}
        </div>
        <div className="text-gray-900 font-bold text-xl mb-2 text-end pr-10">
          -{tweet.user.fullName}
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

        <Popup
          trigger={
            <button
          className="text-left bg-slate-700 w-fit p-2 text-white mt-8 rounded-md"
        >
          Delete
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
                <div className="header ml-28"> Delete Tweet </div>
              </div>
              <div className="content mt-5 p-2">
                {" "}
                Are you sure you want to delete this tweet?{" "}
              </div>
              <div className="actions flex gap-3 mt-10 ml-3">
                <button
                  className="bg-red-500 px-2 py-1 rounded-lg hover:bg-red-700 hover:text-white"
                  onClick={deleteTweet}
                >
                  Delete
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
}

export default TweetCardForMe;
