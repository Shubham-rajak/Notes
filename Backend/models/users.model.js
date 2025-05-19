import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now 
    },
})

export default mongoose.model("users", userSchema);