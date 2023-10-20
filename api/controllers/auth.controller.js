import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
const signupController = async (req, res) => {
  const { username, email, password } = req.body
  const newUser = new User(
    { username, email, password }
  )
  await newUser.save()
    .then(() => {
      res.status(201)
      res.json({
        status: 'ok',
        message: "User created successfully"
      })
    }).catch((e) => {
      console.log(e);
      res.status(400)
      res.json({
        status: e.message,
      })
    })
}

export default signupController