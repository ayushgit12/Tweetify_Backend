import React from "react";
import { NavLink } from "react-router-dom";

const Chat = () => {
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

        <div>
          <div className="flex items-center justify-center mt-3 flex-wrap">
            <lord-icon
              src="https://cdn.lordicon.com/ayhtotha.json"
              trigger="hover"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
          <h1 className="text-5xl p-5 font-bold text-center">
            Chat with your friends !
          </h1>
          </div>

          <NavLink to="/worldChat">
            <div className="border-slate-900 rounded-full md:w-1/3 w-48 text-center h-36 hover:bg-slate-900 hover:text-white cursor-pointer text-2xl m-16 flex items-center justify-center border-4">
              <p>World Chat</p>
            </div>
          </NavLink>

          <NavLink to="/chatWithFriends">
          <div className="border-slate-900 rounded-full md:w-1/3 w-48 text-center h-36 hover:bg-slate-900 hover:text-white cursor-pointer text-2xl m-16 flex items-center justify-center border-4">
            <p>Chat With Friends</p>
          </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Chat;
