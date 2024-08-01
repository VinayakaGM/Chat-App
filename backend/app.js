import express from 'express'
import { db } from './config/db.js';
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js';
import cors from 'cors'
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import chatRoute from './routes/chatRoute.js';
import messageRouter from './routes/messageRoutes.js';
const app = express();
dotenv.config() 
db()

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//user
app.use("/api/v1/user", userRouter)
app.use("/api/v1/chat",chatRoute)
app.use("/api/v1/message",messageRouter)

app.all("*", (req,res,next) => {
    let err = new Error(`Page not found: ${req.originalUrl}`)
    err.statusCode=404
    next(err)
})
app.use(globalErrorHandler)

app.get('/', (req, res) => {
    res.send('Welcome')
})

export default app