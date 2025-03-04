import mongoose from "mongoose";
import * as dotenv from'dotenv';

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        if(!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB database connected");

    } catch (error) {
        console.log('Error connecting to MongoDB database:', error);

    };

};