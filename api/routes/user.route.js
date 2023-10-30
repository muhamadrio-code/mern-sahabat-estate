import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
import verifyToken from "../utils/varifyToken.js";

const router = express.Router();

router.post('/:id', verifyToken, updateUser)
router.delete('/:id', verifyToken, deleteUser)

export default router