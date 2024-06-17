import {Router} from 'express'

const userRouter = Router()

userRouter.post("/signup", signup)
userRouter.post("/login", login)

export default userRouter