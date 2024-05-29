import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const Register = () => {

  const [fullName, setfullName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();






  const handleRegisterEmailChange = (e) => {
    setRegisterEmail(e.target.value);
  };
  const handleRegisterPasswordChange = (e) => {
    setRegisterPassword(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setfullName(e.target.value);
  };




     const handleRegister = async (e) => {
          e.preventDefault();
      
      
          console.log(fullName, registerEmail, registerPassword);
      
          await axios
            .post("http://localhost:8000/api/v1/users/register", {
              fullName: fullName,
              email: registerEmail,
              password: registerPassword,
            })
            .then((response) => {
              console.log("Success:", response.data);
              toast.success("Registration Successful!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                toastId: "registerSuccess", // Optional unique ID for the toast


              });
              navigate("/login");
      

      
      
              
            })
            .catch((error) => {
              console.error("Error:", error);
              toast.error("Registration Failed!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                toastId: "registerError", // Optional unique ID for the toast
              });
            });
        };



  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                value={fullName}
                onChange={handleFullNameChange}
                id="fullname"
                name="email"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
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
                value={registerEmail}
                onChange={handleRegisterEmailChange}
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
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={registerPassword}
                onChange={handleRegisterPasswordChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a user?{" "}
          <NavLink
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login Now!
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
