import express, { Router } from 'express';
import { getUserSavedPost, SavePost } from '../controllers/user-controller.js';

const router = express.Router()

router.get("/saved",getUserSavedPost);
router.patch("/save",SavePost);


export default router
