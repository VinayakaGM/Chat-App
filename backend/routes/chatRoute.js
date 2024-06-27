import {Router} from "express"

const chatRoute = Router()

chatRoute.post("/", accessChat)

export default chatRoute