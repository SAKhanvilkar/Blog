import express from 'express';
import connectDB from './lib/connectDB.js'
import userRouter from './routes/user-route.js'
import postRouter from './routes/post-route.js'
import commentRouter from './routes/comment-route.js'
import webhookRouter from './routes/webhook-route.js'
import dotenv from 'dotenv';
import { clerkMiddleware,requireAuth} from '@clerk/express'

import cors from 'cors'
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // More specific origin
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept']
  }));
app.use(express.json());
app.use(clerkMiddleware());
app.use((req, res, next) => {
    console.log('Auth Debug Middleware:');
    console.log('- Headers:', req.headers);
    console.log('- Auth Object:', req.auth);
    next();
  });
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// app.get('/test',(req,res)=>{
//     res.status(200).send("it works")
// })

// app.get('/auth-state',(req,res)=>{
//     const authState = req.auth
//     res.json(authState);
// })

// app.get('/protect',(req,res)=>{
//     const {userId} = req.auth
//     if(!userId){
//         return res.status(401).json("not authenticated")
//     }
//     res.status(200).json("content")
// })
app.use('/webhooks', webhookRouter);
app.use('/users',userRouter)
app.use('/post',postRouter)
app.use('/comment',commentRouter)

app.get('/test', (req, res) => {
    console.log("req.auth.userId:", req.auth.userId);
    console.log()
    res.json({ message: "Test route" });
});

// app.use((error,req,res,next)=>{

//     res.status(error.status || 500)

//     res.json({
//         message:error.message || "something went wrong",
//         status:error.status,
//         stack: error.stack,
//     })
// })

// app.get('/test-auth', (req, res) => {
//   console.log("req.auth:", req.auth);
//   console.log("req.headers:", req.headers); // Log ALL headers
//   if (req.auth.userId) {
//       res.status(200).json({ message: "Authenticated!", userId: req.auth.userId });
//   } else {
//       res.status(401).json({ message: "Not authenticated" });
//   }
// });

app.get('/test-auth-bare', requireAuth, (req, res) => {  // Protect with requireAuth
    if (req.auth.userId) {
        res.status(200).json({ message: "Authenticated (Bare)!" }); // Simplified message
    } else {
        res.status(401).json({ message: "Not authenticated (Bare)" }); // Simplified message
    }
});

const startServer = async () => {
   try {
       await connectDB();
       app.listen(5333, () => {
           console.log("server is running on port 5333");
           console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);

           
       });
   } catch (error) {
       console.error("Failed to start server:", error);
       process.exit(1);
   }
};

startServer();
