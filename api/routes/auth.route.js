import express from "express";
import { signupController, signinController, googleSigninController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup', signupController)
router.post('/signin', signinController)
router.post('/google', googleSigninController)

export default router