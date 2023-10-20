import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
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
app.listen(portNumber, () => {
  console.log(`Server running on port ${portNumber}..`);
})

app.use('/api/user', userRouter)