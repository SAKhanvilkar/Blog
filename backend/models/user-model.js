import {Schema} from "mongoose";
import mongoose from "mongoose";

const userSchem = new Schema({
    clerkUserId:{
       type:String,
       required:true,
       unique:true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    img:{
        type: String,
    },
    savedpost:{
        type: [String],
        default :[],
    },
    
},{timestamps:true}
)

export default mongoose.model("User",userSchem);