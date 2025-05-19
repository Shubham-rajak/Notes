import express from "express";

import { createNote, getNotes, deleteNotes, updateNotes, getAllNotes, searchNotes } from "../controllers/notes.controller";
import { auth, isAdmin, authenticateToken } from "../middleware/tokens";

const router = express.Router();

router.post("/createnote", authenticateToken, createNote);
router.delete("/deletenotes/:noteId", authenticateToken, deleteNotes);
router.put("/updatenotes/:noteId", authenticateToken, updateNotes);
router.get("/getallnotes", authenticateToken, getAllNotes);
router.get("/searchnotes", authenticateToken, searchNotes);

export default router;