import express from "express";
// import { router } from './routes/routes';

export const app = express();
app.use(express.json());

// handlers
app.get("/health", (req, res) => res.send("The eXtraordinary meal planner is alive and well!"));

// app.use('/', router);
