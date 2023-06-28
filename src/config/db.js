import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/learn-more');
        console.log('connected to db successfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;