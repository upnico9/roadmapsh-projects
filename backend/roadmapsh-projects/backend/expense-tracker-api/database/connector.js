import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let instance = null;

const connectDB = async () => {
    if (instance) {
        return instance;
    }

    try {
        instance = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
        console.log(`Connected to ${instance.connection.host}`);
        console.log(`Database: ${instance.connection.name}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        instance = null;
    }

    return instance;
};

export default connectDB;