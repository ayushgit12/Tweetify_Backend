import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'


const worldChat = () => {


  const [message, setMessage] = useState("")
  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const sendMessage = () => {
    console.log(message)
    setMessage("")
  }

  return (
    <div>
      <div className="flex flex-1 flex-col justify-center">
        <nav className="bg-slate-900 ">
          <ul className="flex justify-around">
            
            <div className="w-1/3 text-center py-4 text-white">
              <NavLink to="/chat">
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


        <div className="messages min-h-full">





        </div>

          <div className="sendMessage absolute bottom-3 left-1/3 w-full ">
               <input type="text" value={message} onChange={handleMessageChange} className='w-1/3 border p-2 rounded-lg border-slate-900' placeholder="Type your message here" />
               <button className='bg-slate-900 p-2 text-white rounded-lg px-3' onClick={sendMessage}>Send</button>

          </div>

        </div>
    </div>
  )
}

export default worldChat
