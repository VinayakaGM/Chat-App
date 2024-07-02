import {Router} from "express"
import auth from "../middlewares/auth.js"
import { accessChat,createGroup,fetchChats } from "../controllers/chatControllers.js"

const chatRoute = Router()

chatRoute.post("/",auth,accessChat)
chatRoute.get("/",auth,fetchChats)
chatRoute.post("/group",auth,createGroup)

export default chatRoute