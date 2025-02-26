import express, { Router } from 'express';
import { createPosts, deletePosts, getPost, getPosts, uploadAuth ,featurePost } from '../controllers/post.controller.js';
import { requireAuth } from '@clerk/express'
import increaseVisit from '../middleware/increaseVisit.js';
const router = express.Router()

router.get("/upload-auth", uploadAuth);
router.get("/", getPosts);
router.get("/:slug",increaseVisit, getPost);
router.post("/", createPosts);
router.delete("/:id", deletePosts);
router.patch("/feature",featurePost);



export default router
