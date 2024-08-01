import JWT from "jsonwebtoken";
import User from "../models/Users.js";
import asyncHandler from "express-async-handler";

const auth = asyncHandler(async (req, res, next) => {
  try {
    const testToken = req.headers.authorization;
    let token;
    if (testToken || testToken?.startsWith("Bearer")) {
      token = testToken.split(" ")[1];
    }
    //verify token
    const decodedToken = await JWT.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    console.log(user);
    if (!user) {
      let err = new Error("No user found please singup");
      next(err);
    }
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default auth;
