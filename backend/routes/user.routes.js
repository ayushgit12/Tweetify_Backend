import { Router } from "express";
import { loginUser, logoutUser, registerUser, showTweet } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { postTweet } from "../controllers/user.controllers.js";
import { deleteTweet } from "../controllers/user.controllers.js";

const router = Router();
// console.log("user.routes.js");
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT,logoutUser);
router.route('/postTweet').post(verifyJWT,postTweet);
router.route('/showTweets').post(showTweet);
router.route('/deleteTweet').delete(deleteTweet);


export default router;
