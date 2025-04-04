import { ApiError } from "../utils/Apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";
import axios from "axios";
import { logoutUser } from "../controllers/user.controllers.js";




export const verifyJWT = (async(req, _, next) => {
    try {

          const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        // console.log(req.cookies)
     //    console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next();
    } catch (error) {
        logoutUser(req, null);
        
        throw new ApiError(401, error?.message || "Invalid access token")
        
    }
    
})