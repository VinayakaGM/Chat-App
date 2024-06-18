import User from "../models/Users.js";

export const signup = async (req, res) => {
  try {
    let { name, email, password, confirmPassword} = req.body;
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
    });

     res.status(200).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// export const login = async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     let existingUser = await User.find({ email });
//     if (!existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "user does not exist",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       user: existingUser,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
