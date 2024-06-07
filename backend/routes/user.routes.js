import { Router } from "express";
import { loginUser, logoutUser, registerUser, showTweet } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { postTweet } from "../controllers/user.controllers.js";
import { deleteTweet } from "../controllers/user.controllers.js";
import { likeTweet } from "../controllers/user.controllers.js";
import { showLikeTweet } from "../controllers/user.controllers.js";
import { getUserDetails } from "../controllers/user.controllers.js";
import { changePassword } from "../controllers/user.controllers.js";
import { sendEmail } from "../controllers/email.controllers.js";


const router = Router();
// console.log("user.routes.js");
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT,logoutUser);
router.route('/postTweet').post(verifyJWT,postTweet);
router.route('/showTweets').post(showTweet)
router.route('/deleteTweet').delete(deleteTweet);
router.route('/likeTweet').post(likeTweet);
router.route('/showLikeTweet').post(showLikeTweet);
router.route('/getUserDetails').post(getUserDetails);
router.route('/changePassword').post(verifyJWT,changePassword);
router.route('/sendEmail').post(sendEmail);




export default router;
