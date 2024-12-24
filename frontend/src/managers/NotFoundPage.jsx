import React from "react";
import { NavLink } from "react-router-dom";
import logo2 from "../assets/logo2.png";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex justify-center items-center gap-4 flex-wrap">
<img className="w-52" src={logo2} alt="" />
<div className="text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-6">Oops! Wrong link or link broken.</p>
      {localStorage.getItem("token") ? (
        <NavLink to="/homepage">
          <button className="px-6 py-2 bg-blue-600 text-white rounded">Back to your nest</button>
        </NavLink>
      ) : (
        <NavLink to="/login">
          <button className="px-6 py-2 bg-blue-600 text-white rounded">Back to your nest</button>
        </NavLink>
      )}
      
      </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
