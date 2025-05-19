import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import usersRouter from "./routers/users.router.js";
import notesRouter from "./routers/notes.router.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get('/', (req, res) => {
    res.send("Hello");
})

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Database connected successfully")).catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.use(usersRouter);
app.use(notesRouter);