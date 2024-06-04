import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { APIresponse } from "../utils/APIresponse.js";
import { Tweet } from "../models/tweets.models.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: 'OK' })

  // console.log(req.body)

  const { fullName, email, password } = await req.body;
  // console.log(username, fullName, email, password)

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
    // console.log('User with email or username already exists')
  }
  // console.log(req.files)
  // const avatarLocalPath = req.files?.avatar[0]?.path
  // const coverImageLocalPath = req.files?.coverImage[0]?.path
  // let coverImageLocalPath;
  // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
  //   coverImageLocalPath = req.files.coverImage[0].path
  // }

  // if (!avatarLocalPath) {
  //   throw new ApiError(400, 'Avatar file is required')
  // }

  // const avatar = await uploadOnCloudinary(avatarLocalPath)
  // const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  // if (!avatar)
  //   throw new ApiError(500, 'Avatar Image required')

  const user = await User.create({
    fullName,
    // avatar: avatar.url,
    // coverImage: coverImage.url ? coverImage.url : "",
    email,
    password,
    // username: username.toLowerCase()
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new APIresponse(201, createdUser, "User registered successfully"));
});

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    // console.log(accessToken, refreshToken)
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // compare email and password
  // generate token

  const { email, username, password } = req.body;

  if (!email && !username) {
    throw new ApiError(400, "Email or username is required");
  }

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // localStorage.setItem('refreshToken', refreshToken)

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  // localStorage.setItem('user', json.stringify(loggedInUser))

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new APIresponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // clear cookies
  // remove refresh token from database
  console.log(req.user._id);
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new APIresponse(200, {}, "User logged out successfully"));
  } catch (error) {
    alert(error);
  }
});

const getUserDetails = asyncHandler(async (req, res) => {
  // console.log(req.user)

  const userID = req.body.userID

  const user = await User.findById(userID).select("-password -refreshToken");

  return res
    .status(200)
    .json(new APIresponse(200, user, "User details fetched successfully"));
});

const postTweet = asyncHandler(async (req, res) => {
  // console.log(req.user)
  // console.log(req.body)
  const { tweet } = req.body;

  const newTweet = await Tweet.create({
    tweet,
    user: req.user._id,
  });

  if (!newTweet) {
    throw new ApiError(500, "Something went wrong while posting the tweet");
  }

  return res
    .status(201)
    .json(new APIresponse(201, newTweet, "Tweet posted successfully"));
});

const showTweet = asyncHandler(async (req, res) => {
  const tweets = await Tweet.find({}).populate("user", "fullName");
  // console.log(tweets)
  if (!tweets) {
    throw new ApiError(404, "No tweets found");
  }

  return res
    .status(200)
    .json(new APIresponse(200, tweets, "Tweets fetched successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const tweetId = req.body.tweetId;

  const tweet = await Tweet.findByIdAndDelete(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  return res
    .status(200)
    .json(new APIresponse(200, {}, "Tweet deleted successfully"));
});

const showLikeTweet = asyncHandler(async (req, res) => {
  const tweetId = req.body.tweetId;
  const user = req.body.user;
  // console.log(user);
  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  let isLiked;
  // console.log("hello")
  // console.log(tweet.likes)
  // console.log(User.findById(user))
  // console.log(tweet.tweet + " returns " + tweet.likes.users.includes(user));
  if (tweet.likes.users.includes(user)) {
    // console.log("yes");
    isLiked = true;
    // console.log(isLiked + "**********")
  } else {
    // console.log(isLiked + "**********")
    // console.log(tweet.likes.users);
    isLiked = false;
  }

  return res
    .status(200)
    .json(new APIresponse(200, { isLiked }, "Like Process Successful"));
});

const likeTweet = asyncHandler(async (req, res) => {
  const tweetId = req.body.tweetId;
  const user = req.body.user;
  // console.log(user);
  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  let isLiked;
  // console.log("hello")
  // console.log(tweet.likes)
  // console.log(User.findById(user))
  console.log(tweet.likes.users.includes(user));
  if (tweet.likes.users.includes(user)) {
    console.log(tweet.likes.users);
    console.log("yes");
    isLiked = false;
    tweet.likes.users.pull(user);
  } else {
    tweet.likes.users.push(user);
    console.log(tweet.likes);
    isLiked = true;
  }

  await tweet.save();

  return res
    .status(200)
    .json(new APIresponse(200, { isLiked }, "Like Process Successful"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  postTweet,
  showTweet,
  deleteTweet,
  likeTweet,
  showLikeTweet,
};
