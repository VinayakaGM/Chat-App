import User from "../models/Users.js";
import asyncHandler from "express-async-handler";
import { genToken } from "../utils/genToken.js";


export const signup = asyncHandler(async (req, res) => {
  // try {
  // console.log(req.file);
  let { name, email, password, confirmPassword } = req.body;
  let existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "user already exists, try to login",
    });
  }
  let newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
    photo: req.file.path,
  });

  let token = await genToken(newUser._id);

  res.status(200).json({
    success: true,
    user: newUser,
    token,
  });
});
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const login = asyncHandler(async (req, res,next) => {
  // try {
  let { email, password } = req.body;
  let existingUser = await User.find({ email });
  if (!existingUser || !(await existingUser.verifyPassword(password, existingUser.password))) {
    let err = new Error("user does not exist, please signup")
    next(err)
    // return res.status(400).json({
    //   success: false,
    //   message: "user does not exist, please singup",
    // });
  }
  let token = await genToken(existingUser._id);
  res.status(200).json({
    success: true,
    user: existingUser,
    token
  });
});
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
