
import { Router } from "express";
import { generateTweet } from "../utils/generatetweet.js";

const router = Router();


router.route("/generateTweetByAI").post(generateTweet);

export default router;