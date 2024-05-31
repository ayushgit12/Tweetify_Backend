import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Post = () => {

  if(localStorage.getItem("token") === null || localStorage.getItem("user") === null){
   window.location.href = "/login";
}
     const navigate = useNavigate();
     const user = JSON.parse(localStorage.getItem("user"));
     const [tweet, settweet] = useState("");



     const handleTweetChange = (e) => {
           settweet(e.target.value);
     }
     

     const handlePost = async(e) => {

          e.preventDefault();

          const token = JSON.parse(localStorage.getItem("token"));
          // console.log(token);

          if (token === null) {
               alert("Please login first");
               navigate("/login");
               return;
          }
          await axios
               .post(
                    "http://localhost:8000/api/v1/users/postTweet",
                    {
                         tweet: tweet,
                         user: user._id,

                    }, // Send empty body (optional)
                    {
                         headers: { Authorization: `Bearer ${token}` },
                    }
               )
               .then((response) => {
                    console.log("Success:", response.data);
                    alert("Tweet posted successfully");
               
               })
               .catch((error) => {
                    console.error("Error:", error);
               });

     }


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
             <NavLink to="/me">
               <li>Me</li>
             </NavLink>
           </div>
         </ul>
       </nav>

       <div className="main m-10">
         <h1 className="text-5xl p-5 font-bold text-center">
           POST HERE!
         </h1>
        

         <div>
           <label
             htmlFor="tweet"
             className="block text-sm font-medium leading-6 text-gray-900"
           >
             Tweet Here
           </label>
           <div className="mt-2">
             <textarea
               id="tweet"
               name="tweet"
               type="text"
               value={tweet}
               onChange={handleTweetChange}
               required
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-80 "
             > </textarea>
             <div className='flex gap-5 items-center mt-5'>
          <button className='p-3 bg-blue-700 rounded-lg text-white' onClick={handlePost}>POST</button>
          
          </div>
           </div>
         </div>
        

     </div>
     </div>
     
   </div>
  )
}

export default Post
