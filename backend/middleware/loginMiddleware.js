import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect routes middleware: (check for cookie before proceeding)
const protect = asyncHandler(async (req, res, next) => {
    let token;

    //Read the jwt from the cookie:
    token = req.cookies.jwt;

    if (token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // add user to req.user for teh next route to use.
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed!');
        }

    } else {
        res.status(401);
        throw new Error('Not authorized, no token!')
    }
}); 


// Admin Middleware:
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin)
    {
        next();
    } else{
        res.status(401);
        throw new Error('not Authorized as admin');
    }
}


export { protect, admin };