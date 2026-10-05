import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to db");
  } catch (error) {
    console.error("Failed to connect to mongodb!");
    process.exit(-1);
  }
};

export default connectDB;
