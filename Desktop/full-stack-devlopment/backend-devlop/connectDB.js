import mongoose from "mongoose";

let isConnected = false;

let connectDB = async () =>{
    if (isConnected) return;

    try{

        await mongoose.connect(process.env.MONGO_URI)
         console.log("MongDB Atlas Connected")
    }catch(error){
        console.log("mongodb error", error)
    }
};

export default connectDB;
