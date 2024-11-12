import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model("User", userSchema);

export default User;

