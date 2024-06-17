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
import './buttonCss.css';
// import dotted1 from "../assets/dotted33.png";

function landingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      
      {/* <img className="absolute w-1/2 -rotate-90 left-72 h-full" src={dotted1} alt="" /> */}
<div className="flex gap-10 m-8 absolute z-10">
      <button
          onClick={() => navigate("/login")}
          className="bg-cyan-400 h-fit px-3 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
        >
          Login Now
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-cyan-400 h-fit px-3 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
        >
          Join us Now
        </button>
        </div>


      <div className="absolute right-5 top-10">
        <Stage width={250} height={window.innerHeight}>
          <Layer>
            <Shape
              width={260}
              height={170}
              sceneFunc={function (context, shape) {
                const width = shape.width();
                const height = shape.height();
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(width - 40, height - 90);
                context.quadraticCurveTo(
                  width - 110,
                  height - 70,
                  width,
                  height
                );
                context.closePath();

                // (!) Konva specific method, it is very important
                context.fillStrokeShape(shape);
              }}
              fill="#00D2FF"
              stroke="black"
              strokeWidth={4}
            />
          </Layer>
        </Stage>
      </div>
      <div className="h-screen flex items-center justify-center flex-col">
        <div className="absolute inset-0 -z-10 h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        <div className="flex items-center flex-wrap">
          <Slide delay={500}>
            <img src={img} className="h-56" alt="" />
          </Slide>
          <div>
            <h1 className="text-center text-6xl md:text-8xl font-serif font-extrabold">
              Tweetify
            </h1>
            <Bounce delay={1500}>
              <h2 className="text-end text-xl text-cyan-600">
                Tweet your heart out, connect with the world
              </h2>
            </Bounce>
          </div>
        </div>
        <Hinge delay={3000} triggerOnce={true} className="mt-10 text-xl">
          <h2>No more restrictions to your Voice!🎤</h2>
        </Hinge>
      </div>

      <div className="flex justify-around bg-slate-300 relative h-screen">
        
        <div className="absolute flex justify-center items-center flex-wrap-reverse pt-36">
          <div className="bg-slate-300">
            <p className="font-bold text-4xl md:text-6xl pt-36">
              Tweet your <span className="text-cyan-400 text-6xl md:text-7xl">truth</span>,
            </p>
            <p className="font-bold text-4xl"> no matter the tech.</p>
          </div>
          <div>
            <Devices />
          </div>
        </div>
        <div className="absolute bottom-36 text-xl">
          <p className="text-center">Available On:</p>
          <br />
          <div className="flex gap-24 flex-wrap justify-center">
          <p className="flex items-center"><FcAndroidOs className="h-8 w-8" />Android</p>
          <p className="flex items-center"><FaApple className="h-8 w-8 pb-1" />iOS</p>
          <p className="flex items-center"><MdLaptop  className="h-8 w-8 pb-1" />Windows</p>
          <p className="flex items-center"><RiMacbookLine  className="h-8 w-8 pb-1" />Macbook</p>

          </div>
          <br />
          <p className="text-center">and all other Platforms...</p>
          </div>
      </div>
      <div className="bg-slate-800 h-96">
        {/* <p>5 main pillars : </p> */}
        <div className="flex justify-around pt-16 pb-64 h-96 flex-wrap">
        < CardForLandingPage title="Spark" desc="Ignite conversations. Spark the next big thing." />
        < CardForLandingPage title="Chirp" desc="Chirp your thoughts. Flock together." />
        < CardForLandingPage title="Pulse" desc="Get the pulse. Stay connected." />
        < CardForLandingPage title="Huddle" desc="Huddle up. Share the buzz." />
        < CardForLandingPage title="Hivemind" desc="Hivemind. Think together. Fly further." />
        </div>

        <div className="h-72  bg-black pt-16">

        <p className="text-3xl text-center font-semibold text-white">
From laughter to learning, <span className="text-cyan-400 text-4xl">Tweetify</span> has it all.


</p>

<p className="text-center  text-4xl mt-16"><button onClick={() => navigate("/register")} id="button1" className="text-center text-white">Join Now!</button></p>
</div>
      </div>

    </div>
  );
}

export default landingPage;
