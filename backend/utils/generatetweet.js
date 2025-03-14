import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const generateTweet = async (req, res) => {
  try {
    console.log(req.body);
    const { topic } = req.body;
    console.log(topic);

    if (!topic) {
      res.status(400).json({ error: "Topic is required." });
      return;
    }

    const promptTopic = `Write a short about 50-60 words tweet about the topic: ${topic}. Don't start or end with any salutation or anything, just write a tweet, with some popular hashtags.`;

    const apiKey = process.env.gemini_api_key;

    if (!apiKey) {
      res.status(500).json({ error: "API key not found." });
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

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

    if (response.error) {
      throw new Error(response.error);
    }

    const tweetText = response.response.text();
    console.log(tweetText);

    res.status(200).json({ tweet: tweetText });
  } catch (error) {
    console.error("Error generating tweet:", error.message);
    res.status(500).json({ error: "Failed to generate tweet." });
  }
};
