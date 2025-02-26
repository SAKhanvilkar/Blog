import User from "../models/user-model.js"
export const getUserSavedPost = async (req,res)=>{
    const clerkUserId = req.auth.userId;

    if(!clerkUserId){
        return res.status(401).json("not authenticated")
    }

    const user = await User.findOne({clerkUserId});

    res.status(200).json(user.savedpost);
} 

export const SavePost = async(req,res)=>{
    const clerkUserId = req.auth.userId;
    const postId = req.body.postId; 

    if(!clerkUserId){
        return res.status(401).json("not authenticated")
    }

    const user = await User.findOne({clerkUserId});

    const  isSaved = user.savedpost.some((p)=> p === postId);

    if(!isSaved){
        await User.findByIdAndUpdate(user._id,{
            $pull:{savedpost:postId},
        });
    }

    setTimeout(() => {
        res.status(200).json(isSaved ? "post unsaved":"post saved");  
    }, 3000);

    
} 