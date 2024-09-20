import React from "react";
import Fade, { Hinge } from "react-awesome-reveal";
import Zoom from "react-awesome-reveal";
import img from "../assets/logo2.png";
import { Slide, Bounce } from "react-awesome-reveal";
import { Stage, Layer, Shape } from "react-konva";
import { useNavigate } from "react-router-dom";
import Devices from "./devices";
import CardForLandingPage from "./cardForLandingPage";
import { FcAndroidOs } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { MdLaptop } from "react-icons/md";
import { RiMacbookLine } from "react-icons/ri";
import "./buttonCss.css";

function landingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Header with Buttons */}
      <div className="flex gap-10 pt-8 pl-8 fixed z-50 w-screen backdrop-blur-lg top-0">
        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-fit px-5 py-2 rounded-lg text-white shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out"
        >
          Login Now
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-fit px-5 py-2 rounded-lg text-white shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out"
        >
          Join us Now
        </button>
      </div>

      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center flex-col">
      
      <div className="absolute inset-0 -z-10 h-screen bg-gradient-to-b from-blue-100 to-cyan-100 w-full "></div>
        <div className="flex items-center flex-wrap">
          <Slide delay={500}>
            <img src={img} className="h-56 drop-shadow-lg" alt="Tweetify Logo" />
          </Slide>
          <div>
            <h1 className="text-center text-6xl md:text-8xl font-serif font-extrabold text-blue-700">
              Tweetify
            </h1>
            <Bounce triggerOnce={true} delay={1500}>
              <h2 className="text-center mt-4 text-2xl md:text-3xl text-cyan-600">
                Tweet your heart out, connect with the world
              </h2>
            </Bounce>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex justify-around bg-gradient-to-r from-cyan-200 to-blue-200 relative h-screen">
        <div className="absolute flex justify-center items-center flex-wrap-reverse pt-36">
          <div className="bg-transparent">
            <p className="font-bold text-5xl md:text-6xl pt-36 text-blue-800">
              Tweet your{" "}
              <span className="text-cyan-500 text-7xl md:text-8xl">truth</span>,
            </p>
            <p className="font-bold text-4xl text-blue-700"> no matter the tech.</p>
          </div>
          <div>
            <Devices />
          </div>
        </div>
        <div className="absolute bottom-36 text-xl">
          <p className="text-center">Available On:</p>
          <div className="flex gap-24 flex-wrap justify-center">
            <p className="flex items-center">
              <FcAndroidOs className="h-8 w-8" />
              Android
            </p>
            <p className="flex items-center">
              <FaApple className="h-8 w-8 pb-1" />
              iOS
            </p>
            <p className="flex items-center">
              <MdLaptop className="h-8 w-8 pb-1" />
              Windows
            </p>
            <p className="flex items-center">
              <RiMacbookLine className="h-8 w-8 pb-1" />
              Macbook
            </p>
          </div>
          <p className="text-center text-gray-700 mt-2">and all other Platforms...</p>
        </div>
      </div>

      {/* Features List */}
      <div className="bg-gradient-to-b from-gray-800 to-black">
        <p className="text-white text-center font-semibold text-5xl pt-8">
          OUR FEATURES :
        </p>
      </div>
      <div className="bg-black h-screen md:h-96">
        <div className="flex md:gap-0 gap-5 justify-around pt-48 md:pt-16 h-screen md:h-96 flex-wrap">
          <CardForLandingPage
            title="Spark"
            desc="Ignite conversations. Spark the next big thing."
          />
          <CardForLandingPage
            title="Chirp"
            desc="Chirp your thoughts. Flock together."
          />
          <CardForLandingPage
            title="Pulse"
            desc="Get the pulse. Stay connected."
          />
          <CardForLandingPage
            title="Huddle"
            desc="Huddle up. Share the buzz."
          />
          <CardForLandingPage
            title="Hivemind"
            desc="Hivemind. Think together. Fly further."
          />
        </div>

        {/* Final CTA */}
        <div className="h-72 bg-slate-800 pt-16">
          <p className="text-3xl text-center font-semibold text-white">
            From laughter to learning,{" "}
            <span className="text-cyan-400 text-4xl">Tweetify</span> has it all.
          </p>
          <p className="text-center text-4xl mt-16">
            <button
              onClick={() => navigate("/register")}
              id="button1"
              className=" text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full text-white font-semibold hover:bg-blue-600 transition-all duration-300 ease-in-out"
            >
              Join Now!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default landingPage;