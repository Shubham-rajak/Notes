import mongoose from "mongoose";

const schema = mongoose.Schema;

const noteSchema = new schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    },
    date: { type: Date, default: new Date().getTime() },
});

export default mongoose.model("notes", noteSchema);