import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const generateTweet =  (async(req,res) => {
     console.log(req.body)
     const {topic} = req.body;
     console.log(topic);
     // const topic = "world"
     const promptTopic = `Write a short about 50-60 words tweet about the topic: ${topic}. Don't start or end with any satulation or anything, just write a tweet, with some popular hashtags.`;

     // const apikey = "AIzaSyDKEqQTBJqR6lbZGIcpq0Vg6-DfsCyuMuU"
     const apikey = process.env.gemini_api_key;

     // console.log(apikey);
     const genAI = new GoogleGenerativeAI(apikey);

     const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: promptTopic, 
        });

        const generationConfig = {
          temperature: 1,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        };

        const chatSession = model.startChat({
          generationConfig,
        });
        const response = await chatSession.sendMessage(promptTopic);

        

        

     


     if(response.error) {
          res.status(400);
          throw new Error(response.error);
          return;
     }

     console.log(response.response.text());

     res.status(200).json({ tweet: response.response.text() });


});


