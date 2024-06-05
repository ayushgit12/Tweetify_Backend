import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='fixed w-full top-0 z-40'>
      <nav className="bg-slate-900">
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
