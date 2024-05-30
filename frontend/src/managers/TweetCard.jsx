import React from 'react'

function TweetCard({tweet}) {

  const date = new Date(tweet.createdAt);



  return (
    <div>
     
          <div className={`bg-white-600 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2`}>
               <div className="text-gray-900 font-bold text-xl mb-2">{tweet.tweet}</div>
               <div className="text-gray-900 font-bold text-xl mb-2 text-end pr-10">-{tweet.user.fullName}</div>
               <div className="text-gray-700 text-base">Posted At {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</div>
               <div className="text-gray-700 text-base">Dated: {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</div>
               </div>
    </div>
  )
}

export default TweetCard
