import {asyncHandler} from '../utils/asyncHandler.js';
import {Tweet} from '../models/tweets.models.js';

const imageToCloudinary = asyncHandler(async (req, res) => {
     const { image } = req.body;
     console.log(image);
     res.status(200).send('Image uploaded');
     }
)

const noOfTweets = asyncHandler(async (req, res) => {
    const tweets = await Tweet.find({});
    res.status(200).json({tweetsSize: tweets.length});
})

export { imageToCloudinary, noOfTweets };