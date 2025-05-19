
import notesModel from "../models/notes.model";

export const createNote = async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;
    if(!title){
        return res.status(400).json({
            error: true,
            message: "Title is required"
        })
    }
    if(!content){
        return res.status(400).json({
            error: true,
            message: "Content is required"
        })
    }
    try{
        const note = new notesModel({
            title,
            content,
            tags: tags || [],
            userId: user._id
        })
        await note.save();
        return res.json({
            error: false,
            note,
            message: "Note saved successfully"
        })
    }catch(err){
        return res.status(400).json({
            error: true,
            message: err.message
        })
    }
}

export const getNotes = async (req, res) => {
    try {
        const data = await notesModel.find();

        return res.status(200).json({
            data: data,
            message: "Notes fetched successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const deleteNotes = async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;
    console.log(user);
    try {
        const note = await notesModel.findOne({ _id: noteId, userId: user._id });
        if(!note){
            return res.status(404).json({
                error: true,
                message: 'Note not found'
            })
        }
        await notesModel.deleteOne({ _id: noteId, userId: user._id });
        return res.status(200).json({
            error: true,
            message: 'Note deleted successfully'
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error: " + error.message
        })
    }
}

export const updateNotes = async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;
    if(!title && !content && !tags){
        return res.status(400).json({
            error: true,
            message: "No changes provided"
        })
    }
    try {
        const note = await notesModel.findOne({ _id: noteId, userId: user._id })
        if(!note){
            return res.status(404).json({
                error: true, 
                message: "Note not found"
            })
        }
        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;
        await note.save();
        return res.json({
            error: false,
            note,
            message: "Note updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
}

export const getAllNotes = async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await notesModel.find({ userId: user._id }).sort({ isPinned: -1 })

        return res.json({
            error: false,
            notes,
            message: "All notes fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
}

export const searchNotes = async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;
    if(!query){
        return res.status(400).json({
            error: true,
            message: "Search query is required"
        })
    }
    try {
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } },
            ],
        })
        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes Found and retrieved successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"+ error.message
        })
    }
}