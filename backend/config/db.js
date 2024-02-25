import mongoose from "mongoose";

const connectDB = async () => {
    try 
    {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to db");
    } 
    catch (error) 
    {
        console.log("failed");
        process.exit(-1);
    }
};

export default connectDB;