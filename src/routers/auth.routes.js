import { registerUser } from "../controllers/auth.controllers.js";
import { loginController } from "../controllers/login.controllers.js";
import express from 'express'
const router = express.Router()

router.post('/register', registerUser);
router.post('/login',loginController);

export default router;