import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { BASE_URL } from './helper';
import axios from "axios";



const TweetGeneratorPopup = ({ onClose }) => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tweet, settweet] = useState("");
  const [copyText, setCopyText] = useState("Copy");

  const handleCopy = () => {
     navigator.clipboard.writeText(tweet);
     setCopyText("Copied!");
     setTimeout(() => {
        setCopyText("Copy");
      }, 3000);
   };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Topic cannot be empty.");
      settweet("");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const tweet = await generateTweet(topic);
          settweet(tweet);

    } catch (err) {
     console.error(err);
      setError("Failed to generate tweet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={popupStyle}>
      <div style={popupContentStyle}>
        <h2>Generate a Tweet</h2>
        <input
          type="text"
          placeholder="Enter topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={inputStyle}
        />
        {error && <p style={errorStyle}>{error}</p>}
        <button onClick={handleGenerate} disabled={loading} style={buttonStyle}>
          {loading ? "Generating..." : "Generate Tweet"}
        </button>
        <button onClick={onClose} style={closeButtonStyle}>Close</button>
        {tweet && (
          <div style={tweetBoxStyle}>

            <h3 className='font-bold'>Generated Tweet</h3>
            

            <p>{tweet}</p>
            <div className='flex justify-end'>
            <button onClick={handleCopy} style={copyButtonStyle}>
              <FaCopy /> {copyText}
            </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

const generateTweet = async (topic) => {

  // This function simulates Gemini-like text generation.
  // Replace the fetch call with actual API integration for real use.

//   const response = await axios.
     let a = ""
     await axios.post(`${BASE_URL}/api/v1/tweets/generateTweetByAI`, 
          {topic: topic}
     )
     .then((response) => {
          console.log("Success:", response.data.tweet);
          a = response.data.tweet;
     }
     )
     .catch((error) => {
          console.error("Error:", error);
     }
     );




     

//   if (!response.ok) {
//     throw new Error("Failed to fetch generated tweet.");
//   }

//   const data = await response.json();
//   console.log(data);     
  return a;
};



// Example styles (you can replace them with a CSS file or styled-components)
const popupStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const popupContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  width: "400px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "5px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#007BFF",
  color: "#fff",
};

const closeButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#DC3545",
};

const errorStyle = {
  color: "red",
  marginBottom: "10px",
};


const tweetBoxStyle = {
     backgroundColor: "#BFDBFE", // Tailwind's blue-300
     padding: "15px",
     borderRadius: "8px",
     marginTop: "15px",
     textAlign: "left",
   };
   

   
   const copyButtonStyle = {
     padding: "8px 15px",
     borderRadius: "4px",
     cursor: "pointer",
     color: "black",
     display: "flex",
     alignItems: "center",
     gap: "5px",
   };

export default TweetGeneratorPopup;
