import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async ()=>{

    try{
       await mongoose.connect(process.env.MONGO);
        console.log("mongodb is connected")
    }catch(err){
        console.log(err)
    }
}
export default connectDB;