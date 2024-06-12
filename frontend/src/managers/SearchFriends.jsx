import React from 'react'
import { NavLink } from 'react-router-dom'


const SearchFriends = () => {
  return (
    <div>
      <nav className="bg-slate-900 ">
          <ul className="flex justify-around">
            <div className="w-1/3 text-center py-4 text-white">
              <NavLink to="/chatWithFriends">
                <li>Go Back</li>
              </NavLink>
            </div>
            <div className="w-full text-center py-4 text-white">
              <NavLink to={window.location}>
                <li>Search For Friends</li>
              </NavLink>
            </div>
          </ul>
        </nav>
    </div>
  )
}

export default SearchFriends
