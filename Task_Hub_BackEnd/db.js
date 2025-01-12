import mongoose from 'mongoose';
import {config} from 'dotenv';

config()
const {MONGO_URI} = process.env;
export const connectToMongo = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("connected to DB Successfully");
    }
    catch(error){
        console.log("MongoDb connection error :", error.message);
    }
};