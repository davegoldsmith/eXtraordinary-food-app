import express from "express";
import { router } from "./routes/routes";
import cors from 'cors';

export const app = express();
console.log('👉 Enabling JSON middleware...');
app.use(express.json());

console.log('👉 Enabling URL-Encoded middleware...');
app.use(express.urlencoded({ extended: true }));

console.log('👉 Enabling CORS...');
app.use(cors());

// handlers
app.get("/health", (req, res) => res.send("The eXtraordinary meal planner is alive and well!"));

app.use('/api/v1/', router);
