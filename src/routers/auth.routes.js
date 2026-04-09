import { registerUser } from "../controllers/auth.controllers.js";
import { addBlogs, deleteblogs, getBlogs, updateBlogs } from "../controllers/blog.controllers.js";
import { getLikes, toggleLike } from "../controllers/likeunlike.controllers.js";
import { loginController } from "../controllers/login.controllers.js";
import { authMiddlewares } from "../middlewares/auth.middlewares.js";
import { commentController, deleteComment, editComment } from "../controllers/comment.controllers.js";
import { upload } from "../middlewares/upload.js";


import express from 'express'
const router = express.Router()

router.post('/register', registerUser);
router.post('/login',loginController);
router.post( "/addblogs",upload.single("image"),authMiddlewares,addBlogs);
router.get('/blogs', authMiddlewares, getBlogs);
router.get('/getblogs/:blogsId',authMiddlewares,getBlogs);
router.put('/updateblogs/:blogsId',authMiddlewares,updateBlogs);
router.delete('/deleteblogs/:blogsId',authMiddlewares,deleteblogs);
router.post('/likes/:blogsId',authMiddlewares,toggleLike);
router.get('/like/:blogsId',getLikes);
router.post('/comment/:blogsId',authMiddlewares,commentController);
router.put('/blogs/:blogsId/edit/:commentId',authMiddlewares,editComment);
router.delete('/blogs/:blogsId/delete/:commentId',authMiddlewares,deleteComment);

export default router;