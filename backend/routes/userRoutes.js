import { Router } from "express";
import { login, signup } from "../controllers/userControllers.js";
import upload from "../middlewares/uploadFile.js";

const userRouter = Router();

userRouter.post("/signup", upload.single("photo"), signup);
userRouter.post("/login", login)

export default userRouter;
