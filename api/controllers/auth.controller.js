import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/Error.js'
import jwt from 'jsonwebtoken'

const signupController = async (req, res, next) => {
  const { username, email, password } = req.body
  const hashedPassword = bcryptjs.hashSync(password, 14)
  const newUser = new User(
    { username, email, password: hashedPassword }
  )
  await newUser.save()
    .then(() => {
      res.status(201)
      res.json({
        success: true,
        message: "User created successfully"
      })
    }).catch((e) => {
      next(e)
    })
}

const signinController = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const validUser = await User.findOne({ email })
    if(!validUser) return next(errorHandler(404, "User Not Found")) 
    const validPassword = bcryptjs.compareSync(password, validUser.password) 
    if(!validPassword) return next(errorHandler(401, "Wrong Credientials!"))
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    res
    .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + (24 * 60 * 60 * 1000)) })
    .status(200)
    .json({
      success: true
    })
  } catch (error) {
    next(error)
  }
}

export { signupController, signinController }