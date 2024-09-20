import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";

const socket = io();

const WorldChat = () => {
  const world = "world";
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const keepDown = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const joinMessageKey = `joinMessage_${world}_${user?.fullName}`;

  // Handle the event when a user leaves the chat
  const handleLeftTheChat = () => {
    const leaveMessage = {
      author: "System",
      message: `${user.fullName} left the world`,
      time: new Date().toLocaleTimeString(),
    };
    setMessageList((prev) => [...prev, leaveMessage]);
    localStorage.removeItem(joinMessageKey); // Remove the join message flag
    socket.emit("leave_room", { fullName: user.fullName, room: world });
  };

  // Scroll to bottom on new message
  useEffect(() => {
    if (keepDown.current) {
      keepDown.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(`messages${world}`);
    if (savedMessages) {
      setMessageList(JSON.parse(savedMessages));
    }
  }, []);

  // Handle user joining and socket events
  useEffect(() => {
    if (!user) return;

    const fullName = user.fullName;

    // Check if the join message has already been sent
    const joinMessageExists = localStorage.getItem(joinMessageKey);

    if (!joinMessageExists) {
      const joinMessage = {
        author: "System",
        message: `${fullName} joined the world`,
        time: new Date().toLocaleTimeString(),
      };

      setMessageList((prev) => [...prev, joinMessage]);
      localStorage.setItem(`messages${world}`, JSON.stringify([...messageList, joinMessage]));
      localStorage.setItem(joinMessageKey, true); // Set the join message flag

      socket.emit("join_room", { fullName, room: world });

      socket.on("receive_message", (data) => {
        setMessageList((prev) => {
          const updatedMessages = [...prev, data];
          localStorage.setItem(`messages${world}`, JSON.stringify(updatedMessages));
          return updatedMessages;
        });
      });

      socket.on("user_joined", ({ user: newUser }) => {
        const joinNotification = {
          author: "System",
          message: `${newUser} joined the world`,
          time: new Date().toLocaleTimeString(),
        };
        setMessageList((prev) => {
          const updatedMessages = [...prev, joinNotification];
          localStorage.setItem(`messages${world}`, JSON.stringify(updatedMessages));
          return updatedMessages;
        });
      });
    }

    return () => {
      socket.emit("leave_room", { fullName, room: world });
      socket.off("receive_message");
      socket.off("user_joined");
    };
  }, [user, messageList, joinMessageKey]);

  // Handle message input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Send a message
  const sendMessage = async () => {
    if (message.trim() === "") return;

    const messageData = {
      author: user.fullName,
      message,
      room: world,
      time: new Date().toLocaleTimeString(),
    };

    setMessageList((prev) => {
      const updatedMessages = [...prev, messageData];
      localStorage.setItem(`messages${world}`, JSON.stringify(updatedMessages));
      return updatedMessages;
    });

    await socket.emit("send_message", messageData);
    setMessage("");
  };

  return (
    <div className="w-screen">
      <div className="flex flex-1 flex-col justify-center">
        <nav className="bg-slate-900">
          <ul className="flex justify-around">
            <div className="w-1/3 text-center py-4 text-white">
              <NavLink onClick={handleLeftTheChat} to="/chat">
                <li>Go Back</li>
              </NavLink>
            </div>
            <div className="w-full text-center py-4 text-white">
              <NavLink to="/worldChat">
                <li>World Chat</li>
              </NavLink>
            </div>
          </ul>
        </nav>

        <div className="messages min-h-[calc(100vh-80px)]">
          {messageList.map((msg, index) => (
            <div key={index} className={`flex my-4 ${msg.author === user.fullName ? 'justify-end' : 'justify-start'}`}>
              <div className={`message p-3 mx-1 rounded-e-xl max-w-2/3 break-words ${msg.author === user.fullName ? 'bg-green-500' : 'bg-pink-400'}`}>
                <p className="text-xl text-wrap w-96 py-2 break-words">{msg.message}</p>
                <p className="text-sm font-bold">{msg.author}</p>
                <p className="text-sm">{msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={keepDown} />
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

export default WorldChat;
