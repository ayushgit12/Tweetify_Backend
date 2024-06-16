import React from 'react'
import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from './helper';
import { Spinner } from '../components/loader';


const Login = () => {

     const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loggedInState, setLoggedInState] = useState(false);




  const handleEmailChange = (e) => {
    setemail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
  };


  const handleLogin = async(e) => {
     e.preventDefault();
     // console.log("HI")
     // console.log(email, password);

     if (email === "") {
       toast.error("Email cannot be empty");
       return;
     }

      if (password === "") {
        toast.error("Please enter password");

        return;
      }
      setLoggedInState(true);
      toast('Authenticating User...', {
        icon: '⏳',
      });


 
     axios
       .post(`${BASE_URL}/api/v1/users/login`, {
         email: email,
         password: password,
       })
       .then((response) => {
         console.log("Success:", response.data);
         toast.success("Login Successful. Redirecting to Homepage...");

         console.log(response.data.data.user);
         localStorage.setItem("token", JSON.stringify(response.data.data.accessToken));
         localStorage.setItem("user", JSON.stringify(response.data.data.user));




         const sendEmail = async () => {
          const userAgent = navigator.userAgent;
          console.log(userAgent);


          let deviceName = await userAgent.match(/(?:iPhone|iPad|iPod|Android|Windows Phone|BlackBerry|Macintosh)/)[0];
          if(!deviceName)
            deviceName = "Desktop";
          const timeNow = new Date().toLocaleString();
          





          let dataSend = {
            email: email,
            subject: "Your Tweetify Account Login",
            message: `Hi ${response.data.data.user.fullName},\n\nThis email confirms that your Tweetify account was logged in by ${deviceName} at ${timeNow}.\n\nImportant: If you did not log in to your account at this time, please take immediate action to secure your account:\n\Change your password by logging in to your account. \n\nIf you believe your account may have been compromised, please contact our support team at tweetifyserver@gmail.com as soon as possible.\n\nThank you for using Tweetify.\nStay Connected\n\nThe Tweetify Security Team.\n\nHappy tweeting!`,
          };

          const res = await axios
            .post(`${BASE_URL}/api/v1/users/sendEmail`, {
              headers: {
                "Content-Type": "application/json",
              },
              data: JSON.stringify(dataSend),
            })
            .then((res) => {
              console.log("Email sent successfully");
            })
            .catch((error) => {
              console.error("Error:", error);
              return;
            });
        };

        sendEmail();
        setTimeout(() => {
          
          window.location.href = '/homepage'
        }, 2000);

         //  console.log(response.data);
          // console.log(response.data.data);
       })
       .catch((error) => {
         toast.error("Invalid Credentials");
         return;
       });




   };


   useEffect(() => {
     if(localStorage.getItem("token")){
      setTimeout(() => {
        
        toast.success("Already Logged In. Redirecting to Homepage...");
      }, 1000);
      
      setTimeout(() => {
       window.location.href = '/homepage'
      }, 3500);
     }
   
     
   }, )
   


 




  return (
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative">
      <Toaster />

      {loggedInState && <Spinner />}
     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
         Log Into your account
       </h2>
     </div>

     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
       <form className="space-y-6" action="#" method="POST">

           
         <div>
           <label
             htmlFor="email"
             className="block text-sm font-medium leading-6 text-gray-900"
           >
             Email address
           </label>
           <div className="mt-2">
             <input
               id="email"
               name="email"
               type="email"
               value={email}
               onChange={handleEmailChange}
               required
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             />
           </div>
         </div>

         <div>
           <div className="flex items-center justify-between">
             <label
               htmlFor="password"
               className="block text-sm font-medium leading-6 text-gray-900"
             >
               Password
             </label>
             <div className="text-sm">
               <NavLink
                 to="/forgotPassword"
                 className="font-semibold text-indigo-600 hover:text-indigo-500"
               >
                 Forgot password?
               </NavLink>
             </div>
           </div>
           <div className="mt-2">
             <input
               id="password"
               name="password"
               type="password"
               value={password}
               onChange={handlePasswordChange}
               required
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             />
           </div>
         </div>

         <div>
           <button
             type="submit"
             className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             onClick={handleLogin}
           >
             Login Now!
           </button>
         </div>
       </form>

       <p className="mt-10 text-center text-sm text-gray-500">
         Not a user?{" "}
         <NavLink
           to="/register"
           className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
         >
           Create your Account Now!
         </NavLink>
       </p>
     </div>


   </div>
  )
}

export default Login
