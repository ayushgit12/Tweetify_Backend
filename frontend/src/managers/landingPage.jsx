import React from "react";
import Fade, { Hinge } from "react-awesome-reveal";
import Zoom from "react-awesome-reveal";
import img from "../assets/logo2.png";
import { Slide, Bounce } from "react-awesome-reveal";
import { Stage, Layer, Shape } from "react-konva";
import { useNavigate } from "react-router-dom";
// import dotted1 from "../assets/dotted33.png";


function landingPage() {

  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="h-4 bg-cyan-400 md:opacity-100 opacity-0 absolute w-20 top-56 left-0 -rotate-45"></div>
      <div className="h-4 bg-cyan-400 md:opacity-100 opacity-0 absolute w-20 top-72 right-0 rotate-45"></div>
      <div className="h-4 bg-cyan-400 md:opacity-100 opacity-0 absolute w-12 top-4 left-1/2 -rotate-12"></div>
      <div className="h-4 bg-cyan-400 md:opacity-100 opacity-0 absolute w-12 bottom-48 left-1/4 -rotate-45"></div>
      <div className="h-4 bg-cyan-400 md:opacity-100 opacity-0 absolute w-12 bottom-32 left-16 -rotate-12"></div>
      <div className="h-4 bg-cyan-400 md:opacity-100 opacity-0 absolute w-12 bottom-48 right-36"></div>
      <div className="h-4 bg-cyan-400 md:opacity-100 opacity-0 absolute w-12 top-48 left-52 rotate-45"></div>
      <div className="h-4 bg-cyan-400 md:opacity-100 opacity-0 absolute w-12 bottom-56 right-1/4 -rotate-45"></div>
      <div className="h-4 bg-cyan-400 absolute md:opacity-100 opacity-0 w-12 bottom-1/2 left-1/4 -rotate-45"></div>
      <div className="h-4 bg-cyan-400 absolute md:opacity-100 opacity-0 w-12 bottom-1/2 right-1/4 rotate-45"></div>
      {/* <img className="absolute w-1/2 -rotate-90 left-72 h-full" src={dotted1} alt="" /> */}
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
              context.quadraticCurveTo(width - 110, height - 70, width, height);
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
        <div class="absolute inset-0 -z-10 h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        <div className="flex items-center flex-wrap">
          <Slide delay={500}>
            <img src={img} className="h-56" alt="" />
          </Slide>
          <div>
            <h1 className="text-center text-6xl md:text-8xl font-serif font-extrabold">Tweetify</h1>
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

      <div className="flex justify-around bg-slate-700 p-3">
        <button onClick={()=>navigate('/login')} className="bg-cyan-400 px-3 py-2 rounded-lg hover:bg-blue-600 hover:text-white">Login Now</button>
        <button onClick={()=>navigate('/register')} className="bg-cyan-400 px-3 py-2 rounded-lg hover:bg-blue-600 hover:text-white">Join us Now</button>
      </div>
    </div>
  );
}

export default landingPage;
