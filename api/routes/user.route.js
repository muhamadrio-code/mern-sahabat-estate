import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import verifyToken from "../utils/varifyToken.js";

const router = express.Router();

router.post('/:id', verifyToken, updateUser)

export default router