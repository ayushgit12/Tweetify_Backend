import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { FiShoppingBag } from "react-icons/fi";
import { TbFileAnalytics } from "react-icons/tb";
import { LuTag } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import { GoGift } from "react-icons/go";
import { GoPersonAdd } from "react-icons/go";
import { MdOutlineSettings } from "react-icons/md";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();


  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handleLogout = async () => {

    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);

    if (token === null) {
      alert("Please login first");
      return;
    }
    toast("Logging Out!", {
      icon: "⏳",
    });
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

        setTimeout(() => {
          navigate("/login");
        }, 3500);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Some error occured while logging out");
      });
  };


  return (
    <div className='absolute w-full top-0 z-50'>

<div
        className={`h-screen w-80 fixed z-50 bg-slate-700 ${
          sideMenuOpen ? "left-0" : "-left-80"
        }`}
        style={{
          transition: "all 0.3s ease-in-out",
        }}
      >
        <div className="ml-3 mt-3 justify-between flex items-center">
          <MdKeyboardArrowLeft
            size={60}
            color="white"
            className="cursor-pointer"
            onClick={() => setSideMenuOpen(false)}
          />
          <p className='text-white text-xl pr-24 text-center'>Tweetify</p>
          
        </div>

        <ul className="flex flex-col ml-8 text-white text-lg gap-2 justify-around mt-6">
          <li onClick={()=>navigate(`/accountProfile/${JSON.parse(localStorage.getItem("user"))._id}`)} className="flex hover:bg-white rounded-xl cursor-pointer hover:text-slate-600 h-full w-full p-3 items-center gap-4">
            <FaUserCircle size={20} />
            Account
          </li>
          <li className="flex hover:bg-white rounded-xl cursor-pointer hover:text-slate-600 h-full w-full p-3 items-center gap-4">
            <TiMessages size={20} />
            Inbox
          </li>
          <li className="flex hover:bg-white rounded-xl cursor-pointer hover:text-slate-600 h-full w-full p-3 items-center gap-4">
            <FiShoppingBag size={20} />
            Orders
          </li>
          <li className="flex hover:bg-white rounded-xl cursor-pointer hover:text-slate-600 h-full w-full p-3 items-center gap-4">
            <TbFileAnalytics size={20} />
            Analytics
          </li>
          <li className="flex hover:bg-white rounded-xl cursor-pointer hover:text-slate-600 h-full w-full p-3 items-center gap-4">
            <LuTag size={20} />
            Offers
          </li>
          <li className="flex hover:bg-white rounded-xl cursor-pointer hover:text-slate-600 h-full w-full p-3 items-center gap-4">
            <SlBadge size={20} />
            Rewards
          </li>
          <li className="flex hover:bg-white rounded-xl cursor-pointer hover:text-slate-600 h-full w-full p-3 items-center gap-4">
            <GoGift size={20} />
            Gift Cards
          </li>
          <li className="flex hover:bg-white rounded-xl cursor-pointer hover:text-slate-600 h-full w-full p-3 items-center gap-4">
            <GoPersonAdd size={20} />
            Refer & Earn
          </li>
          <li onClick={()=>navigate("/accountSettings")} className="flex hover:bg-white rounded-xl cursor-pointer hover:text-slate-600 h-full w-full p-3 items-center gap-4">
            <MdOutlineSettings size={20} />
            System Settings
          </li>
          <li className="flex hover:bg-white rounded-xl cursor-pointer hover:text-slate-600 h-full w-full p-3 items-center gap-4">
            <AiOutlineUserSwitch size={20} />
            Switch Account
          </li>
          <li onClick={()=>handleLogout} className="flex hover:bg-white rounded-xl cursor-pointer hover:text-slate-600 h-full w-full p-3 items-center gap-4">
            <MdLogout size={20} />
            Logout
          </li>
        </ul>
      </div>



      <nav className="bg-slate-900">
        <span onClick={()=>setSideMenuOpen(true)} className='top-2 left-4 cursor-pointer absolute'><BiMenuAltLeft size={35} color='white' /></span>
          <ul className="flex justify-around">
            <div className="w-full text-center py-4 text-white">
              <NavLink to="/homepage">
                <li>Home</li>
              </NavLink>
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
    </div>
  )
}

export default Navbar
