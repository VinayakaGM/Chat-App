import express from 'express'
import { db } from './config/db.js';
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js';
const app = express();
dotenv.config()
db()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//user
app.use("/api/v1/user", userRouter)

app.get('/', (req, res) => {
    res.send('Welcome')
})

export default app