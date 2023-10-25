import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/Error.js'
import jwt from 'jsonwebtoken'


const signupController = async (req, res, next) => {
  const { username, email, password } = req.body
  try {
    await signUp({ username, email, password })
    res.status(201)
    res.json({
      success: true,
      message: "User created successfully"
    })
  } catch (error) {
    next(error)
  }
}

const signinController = async (req, res, next) => {
  try {
    const { user, accessToken } = await signInWithEmail(req.body)
    signInSuccess(res, { user, accessToken })
  } catch (error) {
    next(error)
  }
}

const googleSigninController = async (req, res, next) => {
  const { email, photo } = req.body
  const { user, error: userNotFoundError } = await getUserByEmail(email)
  let validUser = user;
  const username = email.slice(0, email.indexOf('@'))

  try {
    if(userNotFoundError) {
      const password = Math.random().toString(36).slice(-10)
      validUser = await signUp({ username, email, password, avatar: photo })
    }

    const accessToken = createAccessToken({ id: validUser._id })
    const { password: pass, ...rest } = validUser
    signInSuccess(res, { user: rest, accessToken })
  } catch (error) {
    next(error)
  }
}

const signUp = async ({ username, email, password, avatar }) => {
  const hashedPassword = bcryptjs.hashSync(password, 14)
  const newUser = new User(
    { username, email, password: hashedPassword, avatar }
  )
  return await newUser.save()
}

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email })
  let error;
  if (!user) error = errorHandler(404, "User Not Found")
  return { user: user._doc, error }
}

const comparePasswordSync = (password, passwordToCompare) => {
  const isValid = bcryptjs.compareSync(password, passwordToCompare)
  let error;
  if (!isValid) error = errorHandler(401, "Wrong Credientials!")
  return { isValid, error }
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET)
}

const signInWithEmail = async ({ email, password }) => {
  const { user, error: userNotFoundError } = await getUserByEmail(email)
  if (userNotFoundError) throw userNotFoundError

  const { isValid, error: credentialError } = comparePasswordSync(password, user.password)
  if (!isValid) throw credentialError

  const accessToken = createAccessToken({ id: user._id})
  const { password: pass, ...rest } = user

  return { user: rest, accessToken }
}

const signInSuccess = (res, { user, accessToken }) => {
  res.cookie('access_token', accessToken, { httpOnly: true, expires: new Date(Date.now() + (24 * 60 * 60 * 1000)) })
    .status(200)
    .json({
      success: true,
      data: {
        user
      }
    })
}

export { signupController, signinController, googleSigninController }