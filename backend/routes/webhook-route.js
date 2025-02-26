import express from 'express';
import { clerkWebHook } from '../controllers/webhook-controller.js';


const router = express.Router()

router.post("/clerk", clerkWebHook);

export default router;
