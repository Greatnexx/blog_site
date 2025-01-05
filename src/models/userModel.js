import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },   
},{timestamps: true})

userSchema.virtual("blogs", {
    ref: "Blog",
    localField: "_id",
    foreignField: "user_id"
});

 const User = mongoose.model('User', userSchema);
export default User;




