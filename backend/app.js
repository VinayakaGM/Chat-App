import express from 'express'
import { db } from './config/db.js';
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js';
import cors from 'cors'
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import chatRoute from './routes/chatRoute.js';
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

app.all("*", (req,res,next) => {
    let err = new Error(`Page not found: ${req.originalUrl}`)
    err.status(404)
    next(err)
})
app.use(globalErrorHandler)

app.get('/', (req, res) => {
    res.send('Welcome')
})

export default app