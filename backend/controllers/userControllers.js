import User from "../models/Users.js";
import asyncHandler from "express-async-handler";
import { genToken } from "../utils/genToken.js";
// import { validationResult } from "express-validator";

export const signup = asyncHandler(async (req, res) => {
  // try {
  // console.log(req.file);
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  let { name, email, password, confirmPassword } = req.body;
  let existingUser = await User.findOne({ email });
  // console.log(name, email, password, confirmPassword);
  if (existingUser) {
    // return res.status(400).json({
    //   success: false,
    //   message: "user already exists, try to login",
    // });
    throw new Error("User already exists");
  }

  let newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
    photo: req.file.path,
  });

  let token = await genToken(newUser._id);
  newUser = await User.findById(newUser._id).select({
    password: 0,
    confirmPassword: 0,
  });

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

export const login = asyncHandler(async (req, res, next) => {
  // try {
  let { email, password } = req.body;
  let existingUser = await User.findOne({ email });
  // console.log(existingUser);
  if (
    !existingUser ||
    !(await existingUser.verifyPassword(password, existingUser.password))
  ) {
    let err = new Error("user does not exist, please signup");
    next(err);
    // return res.status(400).json({
    //   success: false,
    //   message: "user does not exist, please singup",
    // });
  }
  let token = await genToken(existingUser._id);
  existingUser = await User.findById(existingUser._id).select({
    password: 0,
    confirmPassword: 0,
  });
  res.status(200).json({
    success: true,
    user: existingUser,
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

export const searchUsers = async (req, res, next) => {
  let userId = req.userId;
  let keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  console.log(req.query.search);
  let users = await User.find(keyword)
    .find({
      _id: { $ne: userId },
    })
    .exec();

  if (!users) {
    let err = new Error("Users not found");
    next(err);
  }
  res.status(200).json(users);
};
