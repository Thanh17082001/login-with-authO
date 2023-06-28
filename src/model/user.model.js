import mongoose from "mongoose";
const { Schema } = mongoose;


const userSchema = new Schema({
    email:{type: String},
    fullName: {type: String},
    provider: {type: String , default:"done"},
    avatar:{type:String}
}, {timestamps:true})



export default mongoose.model('user', userSchema);

