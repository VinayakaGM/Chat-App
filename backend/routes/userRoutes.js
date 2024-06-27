import { Router } from "express";
import { login, searchUsers, signup } from "../controllers/userControllers.js";
import upload from "../middlewares/uploadFile.js";
import auth from "../middlewares/auth.js";
// import { body } from "express-validator";
// import { signupSanitization } from "../middlewares/sanitize.js";

const userRouter = Router();

// userRouter.post("/signup", upload.single("photo"), body('name').isLength({ min: 4 }).withMessage('Username must be at least 4 characters').notEmpty().trim().escape(),body(['password','confirmPassword']).isLength({min:8}).withMessage('Password must be atleast 8 characters').notEmpty().trim().escape(), signup);
userRouter.post("/signup", upload.single("photo"), signup);
userRouter.post("/login", login);

userRouter.get("/", auth, searchUsers);

export default userRouter;
