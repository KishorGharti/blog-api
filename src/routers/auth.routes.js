import { registerUser } from "../controllers/auth.controllers.js";
import { addBlogs, deleteblogs, getBlogs, updateBlogs } from "../controllers/blog.controllers.js";
import { loginController } from "../controllers/login.controllers.js";
import { authMiddlewares } from "../middlewares/auth.middlewares.js";
import express from 'express'
const router = express.Router()

router.post('/register', registerUser);
router.post('/login',loginController);
router.post('/addblog',authMiddlewares,addBlogs);
router.get('/getblogs/:blogsId',authMiddlewares,getBlogs);
router.put('/updateblogs/:blogsId',authMiddlewares,updateBlogs);
router.delete('/deleteblogs/:blogsId',authMiddlewares,deleteblogs);

export default router;