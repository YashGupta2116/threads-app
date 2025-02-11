import mongoose, { Schema } from 'mongoose';


const userSchema = new Schema(
    {
        fullName: {
            type: String, 
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowerCase: true,
        },
        password: {
            type: String, 
            required: true,
        },
        profilePic: {
            type: String, 
            default: '',
        },
    }, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;