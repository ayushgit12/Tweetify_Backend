import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");


const ChatRoom = () => {
     // console.log(window.location.pathname.split("/")[2])
     const world = window.location.pathname.split("/")[2]

  const [messageList, setMessageList] = useState([])
  const keepDown = useRef(0)

  const handleLeftTheChat = () => {
    setMessageList([...messageList, { author: "System", message: `${user.fullName} left ${world}`, time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()}])

    
  }

  useEffect(() => {
    keepDown.current.scrollIntoView({ behavior: "smooth" });
  }, [messageList])
  



  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user.fullName);
    const fullName = user.fullName;
    setMessageList([...messageList, { author: "System", message: `${user.fullName} joined ${world}`, time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()}])

    socket.emit("join_room", fullName, world);
    socket.on("message", (message) => {
      console.log(message);
    });



  }, []);


  useEffect(() => {
    
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    })
  }, [socket])
  


  const [message, setMessage] = useState("");
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async() => {
    if (message !== "") {
      const messageData = {
        author: user.fullName,
        message: message,
        room: world,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      };
      setMessageList((list) => [...list, messageData]);

      await socket.emit("send_message", messageData);

      setMessage("");
    }
  };

  return (
    <div className="w-screen ">
      <div className="flex flex-1 flex-col justify-center">
        <nav className="bg-slate-900 ">
          <ul className="flex justify-around">
            <div className="w-1/3 text-center py-4 text-white">
              <NavLink onClick={handleLeftTheChat} to="/chat">
                <li>Go Back</li>
              </NavLink>
            </div>
            <div className="w-full text-center py-4 text-white">
              <NavLink to={window.location}>
                <li>Private Chat</li>
              </NavLink>
            </div>
          </ul>
        </nav>


        <div className="messages min-h-[calc(100vh-80px)]">
          {messageList.map((message, index) => {
            return (
              <div key={index} className={`flex my-4 ${message.author === user.fullName ? 'justify-end' : 'justify-start'}`}>
              <div key={index} className={`message p-3 mx-1 rounded-e-xl max-w-2/3 break-words ${message.author === user.fullName ? 'bg-green-500 ' : 'bg-pink-400'}`}>
              <p className="text-xl text-wrap w-96 py-2 break-words">{message.message}</p>
              <p className="text-sm font-bold">{message.author}</p>
              <p className="text-sm">{message.time}</p>
            </div>
            </div>
            
            );
          })}
        </div>


        <div className="sendMessage flex gap-2 bottom-8 fixed left-1/3 w-screen">
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            className="w-1/3 border p-2 rounded-lg border-slate-900"
            placeholder="Type your message here"
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-slate-900 p-2 text-white rounded-lg px-3"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
      <div ref={keepDown} className="bg-slate-800 text-white text-center">Copyright</div>

    </div>
  );
};

export default ChatRoom;
