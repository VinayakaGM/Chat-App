import express from "express"
import {createMessage,getMessages} from "../controllers/messageControllers.js"
const messageRouter = express.Router()

messageRouter.post("/", createMessage)
messageRouter.get("/:chatId",getMessages)

export default messageRouter

