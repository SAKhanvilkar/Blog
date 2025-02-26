import commentModel from "../models/comment-model.js"
import userModel from "../models/user-model.js";

export const getPostComments = async(req,res)=>{
    const comments = await commentModel.find({post:req.params.postId})
    .populate("user","username img")
    .sort({createdAt:-1})
    
    res.json(comments)
};

export const addComments = async(req,res)=>{
    const clerkUserId = req.auth.userId
    const postId = req.auth.postId

    if(!clerkUserId){
        return res.status(401).json("not authenticated")
    }
    
    const user = userModel.findOne({clerkUserId}) 

    const newComment = new Comment({
        ...req.body,
        user: user._id,
        post: postId
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
};

export const deleteComments = async(req,res)=>{

    const clerkUserId = req.auth.userId
    const id = req.auth.postId

    if(!clerkUserId){
        return res.status(401).json("not authenticated")
    }

      const role = req.auth.sessionClaims?.metadata?.role || "user"
    
      if(role==="admin"){
        await Comment.findByIdAndDelete(req.params.id)
        return res.status(200).json("Comment has been deleted")
      }
    
    const user = await userModel.findOne({clerkUserId})
    
    const deletedComment = await Comment.findOneAndDelete({_id:id, user:user._id})

    if(!deletedComment){
        res.status(403).json("You can delete only your command!")
    }

    res.status(200).json("comment deleted")
}