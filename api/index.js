import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connect to database");
  })
  .catch((e) => {
    console.error(e);
  })

const app = express()
app.listen(3030, () => {

  console.log("Server running on port 3030..");
})