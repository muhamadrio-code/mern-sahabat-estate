import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config()

mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connect to database");
  })
  .catch((e) => {
    console.error(e);
  })

const app = express()
const portNumber = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(portNumber, () => {
  console.log(`Server running on port ${portNumber}..`);
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  return res.status(statusCode).json({
    success: false,
    message: err.message
  })
})